import { colorMatrixFilter } from '../../utils/pixel-handler'

Component({

  /** 组件的属性列表 */
  properties: {
    config: {
      type: Object,
      value: null
    }
  },

  /** 组件的初始数据 */
  data: {
    /** 是否已经初始化 */
    inited: false,
    /** 画布容器大小 */
    containerSize: [200, 200],
    /** 画布容器样式 */
    containerStyle: '',
    /** 签名图坐标 */
    pos: [0, 0],
    /** 触控点偏移量 */
    offset: [0, 0],
    /** 是否显示调色板 */
    showPanel: false,
    /** 底图尺寸 */
    baseSize: [200, 300],
  },

  /** 组件的方法列表 */
  methods: {
    /** 进入和退出的缓动动画 */
    setFrame() { },
    /** 页面进入 */
    setEnter() {
      if (!this.data.inited) {
        this.setData({ inited: true })
        this.initRender()
      }
    },
    /** 页面退出 */
    setExit() { },
    initRender() {
      wx.showLoading({ title: '', mask: true })
      const {
        base_pic,
        sign_pic
      } = this.data.config
      if (base_pic && sign_pic) {
        Promise.all([
          this.getStageSize(),
          this.getImgSize(base_pic),
          this.getImgSize(sign_pic),
        ]).then(arr => {
          this.setData({
            /** 舞台尺寸 */
            stageSize: arr[0],
            /** 底图尺寸 */
            baseSize: arr[1],
            /** 签名图尺寸 */
            signSize: arr[2],
            /** 底图本地地址 */
            baseUrl: arr[1][2],
            /** 签名图本地地址 */
            signUrl: arr[2][2],
          })
          this.setCanvasContainer()
        }).catch(err => {
          console.warn('getImgInfo error:', err)
        })
      }
    },
    /** 获取图片信息 */
    getImgSize(url) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: url,
          success({ width, height, path }) {
            resolve([width, height, path])
          },
          fail: reject,
        })
      })
    },
    /** 获取舞台尺寸 */
    getStageSize() {
      return new Promise((resolve, reject) => {
        wx.getSystemInfo({
          success({ windowWidth, windowHeight }) {
            resolve([windowWidth, windowHeight])
          },
          fail: reject
        })
      })
    },
    /** 初始化画布容器 */
    setCanvasContainer() {
      this.setContainerSize()
      this.setContext()
    },
    /** 设置画布容器大小 */
    setContainerSize() {
      const {
        stageSize,
        baseSize,
        signSize,
      } = this.data
      // container
      const [cw, ch] = [
        stageSize[0],
        ~~(baseSize[1] * stageSize[0] / baseSize[0])
      ]
      this.setData({
        containerSize: [cw, ch],
        containerStyle: [
          `width:${cw}px;`,
          `height:${ch}px;`,
        ].join('')
      })
      // sign
      const scale = stageSize[0] / baseSize[0]
      const [sdw, sdh] = [
        ~~(scale * signSize[0]),
        ~~(scale * signSize[1]),
      ]
      this.setData({
        signDisplaySize: [sdw, sdh],
        signStyle: [
          `width:${sdw}px;`,
          `height:${sdh}px;`,
        ].join('')
      })
    },
    /** 初始化签名图绘图上下文环境 */
    setContext() {
      const {
        baseSize,
        containerSize,
        signSize,
        signDisplaySize,
      } = this.data
      const [bw, bh] = baseSize
      // const [cw, ch] = containerSize
      const [sw, sh] = signSize
      const [sdw, sdh] = signDisplaySize
      const that = this
      // baseCtx
      const baseCtx = wx.createCanvasContext(`base-${this.data.config.id}`, this)
      this.setData({ baseCtx })
      baseCtx.drawImage(this.data.baseUrl, 0, 0, bw, bh, 0, 0, bw, bh)
      baseCtx.draw(false)
      // signCtx
      const signCtx = wx.createCanvasContext(`sign-${this.data.config.id}`, this)
      this.setData({ signCtx })
      signCtx.drawImage(this.data.signUrl, 0, 0, sw, sh, 0, 0, sdw, sdh)
      signCtx.draw(false, function () {
        that.saveOriginData()
        that.onFirstDraw()
      })
    },
    /** 保存原始像素 */
    saveOriginData() {
      const {
        signDisplaySize,
      } = this.data
      const [sdw, sdh] = signDisplaySize
      const that = this
      wx.canvasGetImageData({
        canvasId: `sign-${this.data.config.id}`,
        x: 0,
        y: 0,
        width: sdw,
        height: sdh,
        success(res) {
          console.log('imgdata size : ' + res.width + 'X' + res.height) // 100
          that.signData = res.data
          that.signDataSize = [res.width, res.height]
        }
      }, this)
    },
    /** 首次绘制成功导出显示用图片 */
    onFirstDraw() {
      const {
        signDisplaySize,
      } = this.data
      const [sdw, sdh] = signDisplaySize
      const that = this
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: sdw,
        height: sdh,
        quality: 1,
        canvasId: `sign-${this.data.config.id}`,
        success({ tempFilePath }) {
          that.setData({
            tempSignUrl: tempFilePath
          })
          wx.getImageInfo({
            src: tempFilePath,
            success(res) {
              that.setData({
                tempSize: [res.width, res.height]
              })
              wx.hideLoading()
            },
            fail() {
              wx.hideLoading()
            }
          })
        },
        fail(err) {
          wx.hideLoading()
          console.warn('tempFilePath error:', err)
        }
      }, this)
    },
    /** onTouchStart */
    onTouchStart(e) {
      const [posX, posY] = this.data.pos
      const { pageX, pageY } = e.touches[0]
      const { offsetLeft, offsetTop } = e.currentTarget
      const x = ~~(pageX - offsetLeft)
      const y = ~~(pageY - offsetTop)
      const [sdw, sdh] = this.data.signDisplaySize
      let isMovingSign = false
      if (
        posX <= x &&
        x <= posX + sdw &&
        posY <= y &&
        y <= posY + sdh
      ) {
        isMovingSign = true
      }
      const [offsetX, offsetY] = [x - posX, y - posY]
      this.setData({
        isMovingSign,
        offset: [offsetX, offsetY],
        touchTs: Date.now(),
        touchPos: [pageX, pageY],
      })
    },
    /** onTouchMove */
    onTouchMove(e) {
      if (!this.data.isMovingSign) {
        return
      }
      const [offsetX, offsetY] = this.data.offset
      const x = ~~(e.touches[0].pageX - e.currentTarget.offsetLeft)
      const y = ~~(e.touches[0].pageY - e.currentTarget.offsetTop)
      const [sdw, sdh] = this.data.signDisplaySize
      const [cw, ch] = this.data.containerSize
      let [posX, posY] = [x - offsetX, y - offsetY]
      posX = Math.max(0, posX)
      posX = Math.min(cw - sdw, posX)
      posY = Math.max(0, posY)
      posY = Math.min(ch - sdh, posY)
      this.setData({
        pos: [posX, posY]
      })
    },
    /** onTouchEnd */
    onTouchEnd(e) {
      const { pageX, pageY } = e.changedTouches[0]
      const { touchTs, touchPos } = this.data
      const dis = Math.sqrt(
        Math.pow((pageX - touchPos[0]), 2) +
        Math.pow((pageY - touchPos[1]), 2)
      )
      if (Date.now() - touchTs < 300 && dis < 30) {
        this.onSwitchPanel()
      }
    },
    /** 选择颜色 */
    onPickColor({ detail }) {
      let rgb = [0, 0, 0]
      try {
        rgb = detail.replace('rgb(', '').replace(')', '').split(',').map(c => +c)
      } catch (e) {
        console.warn('convert color error:', e)
      }
      this.renderSignImg(rgb)
    },
    /** 渲染签名图 */
    renderSignImg(rgb) {
      wx.showLoading({ title: '保存中', mask: true })
      const that = this
      const pixels = colorMatrixFilter(this.signData, rgb)
      wx.canvasPutImageData({
        canvasId: `sign-${this.data.config.id}`,
        x: 0,
        y: 0,
        width: this.signDataSize[0],
        height: this.signDataSize[1],
        data: pixels,
        success() {
          that.onFirstDraw()
        }
      }, this)
    },
    /** 点击保存按钮 */
    onSaveImg() {
      wx.showLoading({ title: '保存中', mask: true })
      const {
        baseSize,
        signSize,
        containerSize,
        tempSize,
        pos,
      } = this.data
      const [bw, bh] = baseSize
      const [sw, sh] = signSize
      const [cw] = containerSize
      const [tw, th] = tempSize
      const scale = cw / bw
      if (this.data.baseCtx) {
        this.data.baseCtx.drawImage(this.data.baseUrl, 0, 0, bw, bh, 0, 0, bw, bh)
        /** 
         * 理论上参数 4，5 应该是 sdw和swh，模拟器也是sdw和sdh，真机必须根据临时图片实际尺寸进行设置
         */
        this.data.baseCtx.drawImage(this.data.tempSignUrl, 0, 0, tw, th, ~~(pos[0] / scale), ~~(pos[1] / scale), sw, sh)
        this.data.baseCtx.draw(false, () => {
          this.convertCanvas2TempFile()
        })
      }
    },
    /** 将合成图转换为临时图片文件 */
    convertCanvas2TempFile() {
      const {
        baseSize
      } = this.data
      const [bw, bh] = baseSize
      const that = this
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: bw,
        height: bh,
        quality: 1,
        canvasId: `base-${this.data.config.id}`,
        success({ tempFilePath }) {
          that.saveImageFile2Album(tempFilePath)
        },
        fail(err) {
          console.warn('tempFilePath error:', err)
          wx.hideLoading()
        }
      }, this)
    },
    /** 保存图片到相册 */
    saveImageFile2Album(filePath) {
      wx.saveImageToPhotosAlbum({
        filePath,
        success() {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1000
          })
        },
        complete() {
          wx.hideLoading()
        }
      })
    },
    /** 切换调色板显示状态 */
    onSwitchPanel() {
      this.setData({
        showPanel: !this.data.showPanel
      })
    },
  },

})

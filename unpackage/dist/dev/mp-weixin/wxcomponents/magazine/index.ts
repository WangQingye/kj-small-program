import { loadRes } from './utils/res-loader'

Component({

  /** 组件的属性列表 */
  properties: {
    book: {
      type: Number,
      value: 11
    }
  },

  /** 组件的初始数据 */
  data: {
    /** retry */
    retry: 3,
    /** 资源总数 */
    totalResCount: 1,
    /** 资源加载进度 */
    progress: '0',
    /** 资源是否加载完毕 */
    loaded: false,
    /** 是否存在video */
    hasVideo: false,
    /** 当前layout下标 */
    current: 0,
    /** 滑动函数节流标记 */
    throttleFlag: 0,
    /** 页面切换timeout标记 */
    timeout: null,
    /** bgm地址 */
    bgm: '',
    bgmLocal: '',
    /** 封面地址 */
    cover: '',
    /** layout信息数组 */
    pages: [],
    pagesLocal: [],
    /** 是否在播放视频 */
    isVideoPlaying: false,
    /** 视频样式 */
    videoStyle: 'left:1000px;',
    videoHeight: 300,
    videoSrc: ''
  },

  /** 组件的方法列表 */
  methods: {
    /** 获取杂志信息 */
    getMagazineData() {
      if (!this.data.book && !(this.data.book === 0)) {
        this.showNetError()
        return
      }
      const that = this
      wx.request({
        url: 'https://xgbapi.zcoming.com/api/magazine/show',
        method: 'POST',
        data: {
          'magazine_id': this.data.book
        },
        success(res) {
          const data = res.data.data
          that.setData({ magazine: data })
          that.handleMagazineData()
        },
        fail(err) {
          if (that.data.retry > 0) {
            that.setData({ retry: that.data.retry - 1 })
            setTimeout(() => {
              that.getMagazineData()
            }, 0)
          } else {
            that.showNetError()
          }
        }
      })
    },
    /** 网络故障 */
    showNetError() {
      wx.showModal({
        title: '网络错误',
        content: '未获取到杂志信息',
        showCancel: false,
        confirmText: '返回',
        confirmColor: '#000000',
        success() {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    },
    /** 处理杂志数据以便渲染 */
    handleMagazineData() {
      const {
        // id,
        title,
        audio_url,
        tail_pic,
        page_join,
      } = this.data.magazine
      wx.setNavigationBarTitle({
        title
      })
      this.setData({
        pages: page_join,
        bgm: audio_url,
        cover: tail_pic,
        isVideoPlaying: false,
        videoStyle: `left:${this.data.windowWidth}px;`,
      })
      this.initVideoContext()
      this.loadRes()
    },
    /** 初始化视频上下文 */
    initVideoContext() {
      let hasVideo = false
      this.data.pages.forEach(page => {
        if (page.type === 4 || page.type === 3) {
          hasVideo = true
        }
      })
      this.setData({
        hasVideo,
      })
      if (hasVideo) {
        this.videoContext = wx.createVideoContext('common-video', this)
      }
    },
    /** 预加载图片资源 */
    loadRes() {
      const pages = this.data.pages as Array<any>
      let resList = [this.data.cover]
      if (this.data.bgm) {
        resList.push(this.data.bgm)
      }
      pages.forEach(page => {
        [
          'pic',
          'video_cover',
          'base_pic',
          'sign_pic',
          'video_url',
        ].forEach(key => {
          if (page[key]) {
            resList.push(page[key])
          }
        })
        if (page.pic_join.length) {
          page.pic_join.forEach(item => {
            resList.push(item.pic)
          })
        }
      })
      this.setData({
        totalResCount: resList.length
      })
      loadRes(resList.concat(), this.onProgress, this.onResLoaded, this)
    },
    onProgress(current) {
      let total = this.data.totalResCount
      let progress = Number(100 * current / total).toFixed(0)
      this.setData({ progress })
    },
    /** 图片预加载完毕 */
    onResLoaded(loadedResList: Array<{ origin, local }>) {
      const getLocal = url => {
        for (let i = loadedResList.length - 1; i >= 0; i--) {
          if (loadedResList[i].origin === url) {
            return loadedResList[i].local
          }
        }
      }
      if (this.data.bgm) {
        const bgmLocal = getLocal(this.data.bgm)
        this.setData({ bgmLocal })
      }
      const pages = this.data.pages
      let pagesLocal = JSON.parse(JSON.stringify(pages))
      pagesLocal.forEach(page => {
        [
          'pic',
          'video_cover',
          'base_pic',
          'sign_pic',
          'video_url',
        ].forEach(key => {
          if (page[key]) {
            page[key] = getLocal(page[key])
          }
        })
        if (page.pic_join.length) {
          page.pic_join.forEach(item => {
            item.pic = getLocal(item.pic)
          })
        }
      })
      this.setData({ pagesLocal, loaded: true })
      setTimeout(() => {
        this.selectComponent(`.layout-${this.data.current}`).setEnter()
      }, 0)
    },
    /** swiper切换事件 */
    onFinish({ detail }) {
      let { current } = detail
      let previous = this.data.current
      if (previous !== current) {
        if (this.data.timeout) {
          clearTimeout(this.data.timeout)
          this.data.timeout = null
        }
        // timeout属性不参与渲染，因此采用直接赋值的方式
        this.data.timeout = setTimeout(() => {
          // setExit
          this.selectComponent(`.layout-${previous}`).setExit()
          // setEnter
          this.selectComponent(`.layout-${current}`).setEnter()
        }, 0)
      }
      this.setData({ current })
    },
    /** 
     * swiper滑动事件
     * @date 2019-10-24
     * @author chengxu1973
     * @desc 采用各种节流方法的真机滑动效果都不好，因此暂时不节流
     */
    onSwipe({ detail }) {
      this.setItemAnim(~~detail.dx)
      if (this.data.hasVideo) {
        this.stopPlay()
      }
    },
    /** swiper滑动事件节流后响应 */
    setItemAnim(dx) {
      let sign = Math.sign(dx)
      let current = this.data.current
      let next = sign + current
      let step = Number(dx / this.data.windowWidth).toFixed(2)
      let abs = Math.abs(step)
      // 当前页面滑动未完成的时候继续滑动可能出现step绝对值大于一的情况
      // 此时bindanimationfinish事件尚未触发，current未改变
      // 需要计算当前显示页面的index进行渲染
      if (abs > 1) {
        let dis = sign * ~~abs
        next += dis
        current += dis
        step -= dis
      }
      if (0 <= next && next < this.data.pages.length) {
        this.selectComponent(`.layout-${next}`).setFrame(step, true)
      }
      this.selectComponent(`.layout-${current}`).setFrame(step, false)
    },
    /** 子组件视频播放 */
    onVideoPlay({ detail }) {
      const videoContext = this.videoContext
      if (!videoContext) {
        this.setData({
          isVideoPlaying: false
        })
        return
      }
      // 获取视频信息
      let config: any = null
      this.data.pagesLocal.forEach(page => {
        if (page.id === +detail) {
          config = page
        }
      })
      const { type, video_url, video_cover } = config
      const videoHeight = this.data.videoHeight
      const videoStyle = type === 3 ?
        'height:100vh;top:0px;margin-top:0px;' :
        `height:${videoHeight}px;margin-top:-${~~(videoHeight / 2)}px;`
      this.setData({
        isVideoPlaying: true,
        videoSrc: video_url,
        videoCover: video_cover,
        videoStyle,
      })
      wx.nextTick(() => {
        videoContext.seek(0)
        videoContext.play()
      })
    },
    stopPlay() {
      let windowWidth = this.data.windowWidth
      this.setData({
        /** 是否在播放视频 */
        isVideoPlaying: false,
        /** 视频样式 */
        videoStyle: `left:${windowWidth}px;`,
      })
      if (this.videoContext) {
        this.videoContext.pause()
      }
    },
  },

  /** 组件生命周期勾子 */
  lifetimes: {
    // 添加到舞台初始化事件
    attached() {
      let that = this
      // 获取屏幕尺寸
      wx.getSystemInfo({
        success({ windowWidth, windowHeight }) {
          const videoHeight = ~~(windowWidth * 9 / 16)
          that.setData({
            windowWidth,
            windowHeight,
            videoHeight
          })
        }
      })
      wx.setNavigationBarTitle({
        title: '加载中'
      })
      // 获取杂志信息
      this.getMagazineData()
    }
  }

})

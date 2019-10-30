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
    contents: [],
    showPop: false,
    /** 箭头动画样式 */
    arrowStyle: '',
    /** pop动画类 */
    popAnim: '',
    parallaxAnim: '',
    /** pop基础样式 */
    popStyle: '',
  },

  observers: {
    'config': function ({ content, text_style }) {
      const isBottom = text_style === 5
      const posName = isBottom ? 'bottom' : 'top'
      const per = isBottom ? '100%' : '-100%'
      const popStyle = `${posName}:0rpx;transform:translate(0,${per});`
      const contents = content.split('\n')
      this.setData({
        contents,
        popStyle,
        isBottom
      })
      this.setArrowStyle()
    },
    'showPop': function (b) {
      const isBottom = this.data.isBottom
      const posName = isBottom ? 'bottom' : 'top'
      const name = `${b ? 'show' : 'hide'}-${posName}`
      const popAnim = `animation: ${name} 0.5s ease 1 forwards;`
      const parallaxAnim = `animation: parallax-${name} 0.5s ease 1 forwards;`
      this.setData({
        popAnim,
        parallaxAnim
      })
    },
  },

  /** 组件的方法列表 */
  methods: {
    /** 进入和退出的缓动动画 */
    setFrame() { },
    /** 页面进入 */
    setEnter() { },
    /** 页面退出 */
    setExit() {
      // if (this.data.showPop) {
      //   this.onSwitchPop()
      // }
    },
    /** 展开或收起pop */
    onSwitchPop() {
      this.setData({
        showPop: !this.data.showPop
      })
      this.setArrowStyle()
    },
    /** 设置箭头样式 */
    setArrowStyle() {
      const s = this.data.showPop
      const isBottom = this.data.isBottom
      const posName = isBottom ? 'bottom' : 'top'
      const scale = ((s && isBottom) || !(s || isBottom)) ? 1 : -1
      const arrowStyle = `${posName}:100%;transform: scaleY(${scale});`
      this.setData({
        arrowStyle
      })
    },
    /** 滑动开始 */
    onTouchStart(e) {
      const { pageY } = e.touches[0]
      this.setData({
        touchPos: pageY,
        touchTs: Date.now(),
      })
    },
    /** 滑动结束 */
    onTouchEnd(e) {
      const { pageY } = e.changedTouches[0]
      const ts = Date.now()
      const { touchPos, touchTs } = this.data
      let dis = pageY - touchPos
      if ((ts - touchTs < 1000) && Math.abs(dis) > 60) {
        this.handleSlide(dis > 0)
      }
    },
    /** 处理滑动事件 */
    handleSlide(isDown: boolean) {
      const s = this.data.showPop
      const isBottom = this.data.isBottom
      const isArrowDown = ((s && isBottom) || !(s || isBottom))
      if (isArrowDown === isDown) {
        this.onSwitchPop()
      }
    },
  }

})

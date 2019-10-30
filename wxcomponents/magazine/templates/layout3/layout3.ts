Component({

  /** 组件的属性列表 */
  properties: {
    config: {
      type: Object,
      value: null
    },
    playing: {
      type: Boolean,
      value: false
    },
  },

  /** 组件的初始数据 */
  data: {
    imgStyle: 'visibility:visible;',
  },

  observers: {
    'playing': function (show) {
      this.setData({
        imgStyle: show ? 'visibility:hidden;' : 'visibility:visible;',
      })
    }
  },

  /** 组件的方法列表 */
  methods: {
    /** 进入和退出的缓动动画 */
    setFrame() { },
    /** 页面进入 */
    setEnter() { },
    /** 页面退出 */
    setExit() { },
    /** 点击图片 */
    onTapImg() {
      this.triggerEvent('play', this.data.config.id)
    },
  },

})

Component({

  /** 组件的属性列表 */
  properties: {
    bgm: {
      type: String,
      value: ''
    },
    video: {
      type: Boolean,
      value: false,
    },
  },

  /** 组件的初始数据 */
  data: {
    imgSrc: "../../assets/volume.png",
    mute: false,
    shouldPlay: true,
  },

  observers: {
    'bgm': function (url) {
      if (url) {
        let audioContext = this.audioContext
        if (!audioContext) {
          audioContext = wx.createInnerAudioContext()
        }
        audioContext.autoplay = true
        audioContext.loop = true
        audioContext.src = url
        audioContext.onPlay(() => {
          console.log('bgm start')
        })
        audioContext.onError((res) => {
          console.warn('bgm error:', res)
        })
        if (this.data.shouldPlay) {
          audioContext.play()
        }
        else {
          audioContext.pause()
        }
        this.audioContext = audioContext
      }
    },
    'mute, video': function (mute, video) {
      let shouldPlay = (!mute) && (!video)
      const imgSrc = shouldPlay ? '../../assets/volume.png' : '../../assets/mute.png'
      if (this.audioContext) {
        if (shouldPlay) {
          this.audioContext.play()
        }
        else {
          this.audioContext.pause()
        }
      }
      this.setData({
        shouldPlay,
        imgSrc
      })
    },
  },

  /** 组件的方法列表 */
  methods: {
    onTapSwitch() {
      let mute = !this.data.mute
      if (this.data.video) {
        mute = false
      }
      this.setData({
        mute,
      })
    }
  },

  lifetimes: {
    attached() {
      wx.onAppHide(() => {
        this.setData({
          mute: true
        })
      })
    },
    detached() {
      if (this.audioContext) {
        this.audioContext.pause()
        this.audioContext.destroy()
        this.audioContext = null
      }
    }
  }

})

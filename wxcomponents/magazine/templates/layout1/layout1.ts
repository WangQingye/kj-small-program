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
    anims: [],
    animsNames: []
  },

  observers: {
    'config': function (config) {
      const contents = config.content_join.map(item => {
        let weight = item.bold ? 'bold' : 'normal'
        let size = +item.word_size
        // let indent = ~~(Math.random() * 60)
        let content = item.content
        let spaceCount = Math.max(content.split(' ').length - 1, 0)
        let style = [
          `font-weight:${weight};`,
          `font-size:${size}px;`,
          `text-indent:${size * spaceCount}px;`,
        ].join('')
        return {
          style,
          content,
          anim: item.cartoon_style
        }
      })
      this.setData({ contents })
      this.getAnimNames()
    },
    'anims': function (arr) {
      let floating: Array<string> = []
      if (arr.length) {
        for (let i = arr.length - 1; i >= 0; i--) {
          let time = Number(3.5 + Math.random()).toFixed(1)
          let dir = i % 2 === 0 ? 'reverse' : 'normal'
          floating.push(`animation: floating ${time}s ease 2s infinite ${dir};`)
        }
      }
      this.setData({
        floating
      })
    }
  },

  /** 组件的方法列表 */
  methods: {
    /** 进入和退出的缓动动画 */
    setFrame() { },
    /** 页面进入 */
    setEnter() {
      this.setData({
        anims: this.data.animsNames
      })
    },
    /** 页面退出 */
    setExit() {
      this.setData({
        anims: []
      })
    },
    /** 计算contents对应动画类名 */
    getAnimNames() {
      const contents = this.data.contents
      let animsNames: Array<string> = []
      let leftNum = 0
      for (let i = 0; i < contents.length; i++) {
        let { anim } = contents[i]
        if (+anim === 1) {
          leftNum++
          animsNames[i] = leftNum % 2 === 0 ? 'anim-1-left' : 'anim-1-right'
        }
        else {
          animsNames[i] = 'anim-2'
        }
      }
      this.setData({ animsNames })
    }
  }

})

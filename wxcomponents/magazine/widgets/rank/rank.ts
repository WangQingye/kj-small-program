Component({
  /** 组件的属性列表 */
  properties: {},

  /** 组件的初始数据 */
  data: {
    rank: [],
    retry: 3
  },

  /** 组件的方法列表 */
  methods: {
    getRankData() {
      let that = this
      wx.request({
        url: 'https://xgbapi.zcoming.com/api/magazine/magazineTop',
        method: 'POST',
        success(res) {
          const data = res.data.data
          if (data.length) {
            const rank = data.map(item => {
              return {
                id: item.id,
                title: item.title,
                img: item.cover_pic,
                hot: item.subscribe_num
              }
            })
            that.setData({ rank })
          }
        },
        fail() {
          if (that.data.retry > 0) {
            that.setData({ retry: that.data.retry - 1 })
            setTimeout(() => {
              that.getRankData()
            }, 0)
          }
        }
      })
    }
  },

  lifetimes: {
    attached() {
      this.getRankData()
    },
    detached() { },
  },
})

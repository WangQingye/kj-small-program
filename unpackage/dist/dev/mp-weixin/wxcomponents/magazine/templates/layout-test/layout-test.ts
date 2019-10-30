Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    top: 100,
    pos: [100, 500, 900],
    bg: "#363"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /** 
     * 进入和退出的缓动动画
     * @param {number} step 取值-1到1，负数表示方向向左
     * @param {boolean} isNext 当前是进入还是退出，true表示进入
     */
    setFrame(step, isNext) {
      let [pos1, pos2, pos3] = this.data.pos
      let [start, end] = [null, null];
      // 从右进入 (手指向左滑动时的新页面)
      if (step >= 0 && isNext) {
        [start, end] = [pos1, pos2]
      }
      // 从左离开 (手指向左滑动时的旧页面)
      else if (step >= 0 && !isNext) {
        [start, end] = [pos2, pos3]
      }
      // 从左进入 (手指向右滑动时的新页面)
      else if (step < 0 && isNext) {
        [start, end] = [pos3, pos2]
      }
      // 从右离开 (手指向右滑动时的旧页面)
      else if (step < 0 && !isNext) {
        [start, end] = [pos2, pos1]
      }
      step = Math.abs(step) // important!!!
      // 插帧动画
      this.setInterpolation(step, start, end)
    },
    /** 
     * 插值计算当前动画状态
     */
    setInterpolation(step, start, end) {
      let top = (end - start) * step + start
      this.setData({ top })
    },
    /** 页面进入 */
    setEnter() {
      this.setFrame(1, true)
      this.setData({
        bg: "#636"
      })
    },
    /** 页面退出 */
    setExit() {
      this.setData({
        bg: "#363"
      })
    },
  }
})

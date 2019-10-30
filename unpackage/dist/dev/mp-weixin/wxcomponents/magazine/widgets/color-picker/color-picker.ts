Component({
  /** 组件的属性列表 */
  properties: {},

  /** 组件的初始数据 */
  data: {
    colors: []
  },

  /** 组件的方法列表 */
  methods: {
    onPickColor(e) {
      const { color } = e.currentTarget.dataset
      this.triggerEvent('color', color)
    }
  },

  /** 
   * 00 00 00 - ff ff ff
   * 
   * 00 66 33 - 99 ff cc
   * 00 66 00 - 99 ff 99
   * 33 66 00 - cc ff 99
   * 
   * 66 33 00 - ff cc 99
   * 66 00 00 - ff 99 99
   * 66 00 33 - ff 99 cc
   * 
   * 33 00 66 - cc 99 ff
   * 00 00 66 - 99 99 ff
   * 00 33 66 - 99 cc ff
   * 
   * 0123456789abcdef
   */

  lifetimes: {
    attached() {
      const initColors = [
        [0xff, 0xff, 0xff],
        [0x99, 0xff, 0xcc],
        [0x99, 0xff, 0x99],
        [0xcc, 0xff, 0x99],
        [0xff, 0xcc, 0x99],
        [0xff, 0x99, 0x99],
        [0xff, 0x99, 0xcc],
        [0xcc, 0x99, 0xff],
        [0x99, 0x99, 0xff],
        [0x99, 0xcc, 0xff],
      ]
      let colors: Array<string> = []
      for (let x = 0; x < 12; x++) {
        for (let y = 0; y < 10; y++) {
          const index = y * 12 + x
          const origin = initColors[y].concat()
          const final = origin.map(c => {
            const step = y === 0 ? 23 : 16
            let phase = ~~(c - x * step)
            phase = Math.max(0, phase)
            phase = Math.min(255, phase)
            return phase
          })
          const color = `rgb(${final.join(',')})`
          colors[index] = color
        }
      }
      this.setData({ colors })
    }
  },

})

"use strict";
Component({
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
    data: {
        imgStyle: 'visibility:visible;',
    },
    observers: {
        'playing': function (show) {
            this.setData({
                imgStyle: show ? 'visibility:hidden;' : 'visibility:visible;',
            });
        }
    },
    methods: {
        setFrame() { },
        setEnter() { },
        setExit() { },
        onTapImg() {
            this.triggerEvent('play', this.data.config.id);
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0My5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxheW91dDMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsQ0FBQztJQUdSLFVBQVUsRUFBRTtRQUNWLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLEtBQUs7U0FDYjtLQUNGO0lBR0QsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFLHFCQUFxQjtLQUNoQztJQUVELFNBQVMsRUFBRTtRQUNULFNBQVMsRUFBRSxVQUFVLElBQUk7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMscUJBQXFCO2FBQzlELENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUdELE9BQU8sRUFBRTtRQUVQLFFBQVEsS0FBSyxDQUFDO1FBRWQsUUFBUSxLQUFLLENBQUM7UUFFZCxPQUFPLEtBQUssQ0FBQztRQUViLFFBQVE7WUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNoRCxDQUFDO0tBQ0Y7Q0FFRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJDb21wb25lbnQoe1xuXG4gIC8qKiDnu4Tku7bnmoTlsZ7mgKfliJfooaggKi9cbiAgcHJvcGVydGllczoge1xuICAgIGNvbmZpZzoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgdmFsdWU6IG51bGxcbiAgICB9LFxuICAgIHBsYXlpbmc6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9LFxuICB9LFxuXG4gIC8qKiDnu4Tku7bnmoTliJ3lp4vmlbDmja4gKi9cbiAgZGF0YToge1xuICAgIGltZ1N0eWxlOiAndmlzaWJpbGl0eTp2aXNpYmxlOycsXG4gIH0sXG5cbiAgb2JzZXJ2ZXJzOiB7XG4gICAgJ3BsYXlpbmcnOiBmdW5jdGlvbiAoc2hvdykge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgaW1nU3R5bGU6IHNob3cgPyAndmlzaWJpbGl0eTpoaWRkZW47JyA6ICd2aXNpYmlsaXR5OnZpc2libGU7JyxcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIC8qKiDnu4Tku7bnmoTmlrnms5XliJfooaggKi9cbiAgbWV0aG9kczoge1xuICAgIC8qKiDov5vlhaXlkozpgIDlh7rnmoTnvJPliqjliqjnlLsgKi9cbiAgICBzZXRGcmFtZSgpIHsgfSxcbiAgICAvKiog6aG16Z2i6L+b5YWlICovXG4gICAgc2V0RW50ZXIoKSB7IH0sXG4gICAgLyoqIOmhtemdoumAgOWHuiAqL1xuICAgIHNldEV4aXQoKSB7IH0sXG4gICAgLyoqIOeCueWHu+WbvueJhyAqL1xuICAgIG9uVGFwSW1nKCkge1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ3BsYXknLCB0aGlzLmRhdGEuY29uZmlnLmlkKVxuICAgIH0sXG4gIH0sXG5cbn0pXG4iXX0=
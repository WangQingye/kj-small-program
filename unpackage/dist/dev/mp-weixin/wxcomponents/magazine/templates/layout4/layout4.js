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
        videoHeight: 300,
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
    lifetimes: {
        attached() {
            const that = this;
            wx.getSystemInfo({
                success({ windowWidth }) {
                    const videoHeight = ~~(windowWidth * 9 / 16);
                    that.setData({ videoHeight });
                }
            });
        },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0NC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxheW91dDQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsQ0FBQztJQUdSLFVBQVUsRUFBRTtRQUNWLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLEtBQUs7U0FDYjtLQUNGO0lBR0QsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixXQUFXLEVBQUUsR0FBRztLQUNqQjtJQUVELFNBQVMsRUFBRTtRQUNULFNBQVMsRUFBRSxVQUFVLElBQUk7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMscUJBQXFCO2FBQzlELENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUdELE9BQU8sRUFBRTtRQUVQLFFBQVEsS0FBSyxDQUFDO1FBRWQsUUFBUSxLQUFLLENBQUM7UUFFZCxPQUFPLEtBQUssQ0FBQztRQUViLFFBQVE7WUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNoRCxDQUFDO0tBQ0Y7SUFFRCxTQUFTLEVBQUU7UUFDVCxRQUFRO1lBQ04sTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFBO1lBQ2pCLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ2YsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFO29CQUNyQixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO29CQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQTtnQkFDL0IsQ0FBQzthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtDQUVGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIkNvbXBvbmVudCh7XG5cbiAgLyoqIOe7hOS7tueahOWxnuaAp+WIl+ihqCAqL1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgY29uZmlnOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICB2YWx1ZTogbnVsbFxuICAgIH0sXG4gICAgcGxheWluZzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0sXG4gIH0sXG5cbiAgLyoqIOe7hOS7tueahOWIneWni+aVsOaNriAqL1xuICBkYXRhOiB7XG4gICAgaW1nU3R5bGU6ICd2aXNpYmlsaXR5OnZpc2libGU7JyxcbiAgICB2aWRlb0hlaWdodDogMzAwLFxuICB9LFxuXG4gIG9ic2VydmVyczoge1xuICAgICdwbGF5aW5nJzogZnVuY3Rpb24gKHNob3cpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGltZ1N0eWxlOiBzaG93ID8gJ3Zpc2liaWxpdHk6aGlkZGVuOycgOiAndmlzaWJpbGl0eTp2aXNpYmxlOycsXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICAvKiog57uE5Lu255qE5pa55rOV5YiX6KGoICovXG4gIG1ldGhvZHM6IHtcbiAgICAvKiog6L+b5YWl5ZKM6YCA5Ye655qE57yT5Yqo5Yqo55S7ICovXG4gICAgc2V0RnJhbWUoKSB7IH0sXG4gICAgLyoqIOmhtemdoui/m+WFpSAqL1xuICAgIHNldEVudGVyKCkgeyB9LFxuICAgIC8qKiDpobXpnaLpgIDlh7ogKi9cbiAgICBzZXRFeGl0KCkgeyB9LFxuICAgIC8qKiDngrnlh7vlm77niYcgKi9cbiAgICBvblRhcEltZygpIHtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdwbGF5JywgdGhpcy5kYXRhLmNvbmZpZy5pZClcbiAgICB9LFxuICB9LFxuXG4gIGxpZmV0aW1lczoge1xuICAgIGF0dGFjaGVkKCkge1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgIHd4LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzKHsgd2luZG93V2lkdGggfSkge1xuICAgICAgICAgIGNvbnN0IHZpZGVvSGVpZ2h0ID0gfn4od2luZG93V2lkdGggKiA5IC8gMTYpXG4gICAgICAgICAgdGhhdC5zZXREYXRhKHsgdmlkZW9IZWlnaHQgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICB9XG5cbn0pXG4iXX0=
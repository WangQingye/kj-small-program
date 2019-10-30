"use strict";
Component({
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
    data: {
        imgSrc: "../../assets/volume.png",
        mute: false,
        shouldPlay: true,
    },
    observers: {
        'bgm': function (url) {
            if (url) {
                let audioContext = this.audioContext;
                if (!audioContext) {
                    audioContext = wx.createInnerAudioContext();
                }
                audioContext.autoplay = true;
                audioContext.loop = true;
                audioContext.src = url;
                audioContext.onPlay(() => {
                    console.log('bgm start');
                });
                audioContext.onError((res) => {
                    console.warn('bgm error:', res);
                });
                if (this.data.shouldPlay) {
                    audioContext.play();
                }
                else {
                    audioContext.pause();
                }
                this.audioContext = audioContext;
            }
        },
        'mute, video': function (mute, video) {
            let shouldPlay = (!mute) && (!video);
            const imgSrc = shouldPlay ? '../../assets/volume.png' : '../../assets/mute.png';
            if (this.audioContext) {
                if (shouldPlay) {
                    this.audioContext.play();
                }
                else {
                    this.audioContext.pause();
                }
            }
            this.setData({
                shouldPlay,
                imgSrc
            });
        },
    },
    methods: {
        onTapSwitch() {
            let mute = !this.data.mute;
            if (this.data.video) {
                mute = false;
            }
            this.setData({
                mute,
            });
        }
    },
    lifetimes: {
        attached() { },
        detached() {
            if (this.audioContext) {
                this.audioContext.pause();
                this.audioContext.destroy();
                this.audioContext = null;
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmdtLXN3aXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJnbS1zd2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsQ0FBQztJQUdSLFVBQVUsRUFBRTtRQUNWLEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLEtBQUs7U0FDYjtLQUNGO0lBR0QsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLHlCQUF5QjtRQUNqQyxJQUFJLEVBQUUsS0FBSztRQUNYLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsU0FBUyxFQUFFO1FBQ1QsS0FBSyxFQUFFLFVBQVUsR0FBRztZQUNsQixJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO2dCQUNwQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNqQixZQUFZLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQUE7aUJBQzVDO2dCQUNELFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO2dCQUM1QixZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtnQkFDeEIsWUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7Z0JBQ3RCLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO29CQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUMxQixDQUFDLENBQUMsQ0FBQTtnQkFDRixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUNqQyxDQUFDLENBQUMsQ0FBQTtnQkFDRixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUN4QixZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7aUJBQ3BCO3FCQUNJO29CQUNILFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtpQkFDckI7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUE7YUFDakM7UUFDSCxDQUFDO1FBQ0QsYUFBYSxFQUFFLFVBQVUsSUFBSSxFQUFFLEtBQUs7WUFDbEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNwQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQTtZQUMvRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLElBQUksVUFBVSxFQUFFO29CQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7aUJBQ3pCO3FCQUNJO29CQUNILElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUE7aUJBQzFCO2FBQ0Y7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFVBQVU7Z0JBQ1YsTUFBTTthQUNQLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUdELE9BQU8sRUFBRTtRQUNQLFdBQVc7WUFDVCxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1lBQzFCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ25CLElBQUksR0FBRyxLQUFLLENBQUE7YUFDYjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsSUFBSTthQUNMLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUVELFNBQVMsRUFBRTtRQUNULFFBQVEsS0FBSyxDQUFDO1FBQ2QsUUFBUTtZQUNOLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtnQkFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtnQkFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7YUFDekI7UUFDSCxDQUFDO0tBQ0Y7Q0FFRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJDb21wb25lbnQoe1xuXG4gIC8qKiDnu4Tku7bnmoTlsZ7mgKfliJfooaggKi9cbiAgcHJvcGVydGllczoge1xuICAgIGJnbToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfSxcbiAgICB2aWRlbzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICB9LFxuICB9LFxuXG4gIC8qKiDnu4Tku7bnmoTliJ3lp4vmlbDmja4gKi9cbiAgZGF0YToge1xuICAgIGltZ1NyYzogXCIuLi8uLi9hc3NldHMvdm9sdW1lLnBuZ1wiLFxuICAgIG11dGU6IGZhbHNlLFxuICAgIHNob3VsZFBsYXk6IHRydWUsXG4gIH0sXG5cbiAgb2JzZXJ2ZXJzOiB7XG4gICAgJ2JnbSc6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgbGV0IGF1ZGlvQ29udGV4dCA9IHRoaXMuYXVkaW9Db250ZXh0XG4gICAgICAgIGlmICghYXVkaW9Db250ZXh0KSB7XG4gICAgICAgICAgYXVkaW9Db250ZXh0ID0gd3guY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQoKVxuICAgICAgICB9XG4gICAgICAgIGF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IHRydWVcbiAgICAgICAgYXVkaW9Db250ZXh0Lmxvb3AgPSB0cnVlXG4gICAgICAgIGF1ZGlvQ29udGV4dC5zcmMgPSB1cmxcbiAgICAgICAgYXVkaW9Db250ZXh0Lm9uUGxheSgoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2JnbSBzdGFydCcpXG4gICAgICAgIH0pXG4gICAgICAgIGF1ZGlvQ29udGV4dC5vbkVycm9yKChyZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2JnbSBlcnJvcjonLCByZXMpXG4gICAgICAgIH0pXG4gICAgICAgIGlmICh0aGlzLmRhdGEuc2hvdWxkUGxheSkge1xuICAgICAgICAgIGF1ZGlvQ29udGV4dC5wbGF5KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBhdWRpb0NvbnRleHQucGF1c2UoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gYXVkaW9Db250ZXh0XG4gICAgICB9XG4gICAgfSxcbiAgICAnbXV0ZSwgdmlkZW8nOiBmdW5jdGlvbiAobXV0ZSwgdmlkZW8pIHtcbiAgICAgIGxldCBzaG91bGRQbGF5ID0gKCFtdXRlKSAmJiAoIXZpZGVvKVxuICAgICAgY29uc3QgaW1nU3JjID0gc2hvdWxkUGxheSA/ICcuLi8uLi9hc3NldHMvdm9sdW1lLnBuZycgOiAnLi4vLi4vYXNzZXRzL211dGUucG5nJ1xuICAgICAgaWYgKHRoaXMuYXVkaW9Db250ZXh0KSB7XG4gICAgICAgIGlmIChzaG91bGRQbGF5KSB7XG4gICAgICAgICAgdGhpcy5hdWRpb0NvbnRleHQucGxheSgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5hdWRpb0NvbnRleHQucGF1c2UoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBzaG91bGRQbGF5LFxuICAgICAgICBpbWdTcmNcbiAgICAgIH0pXG4gICAgfSxcbiAgfSxcblxuICAvKiog57uE5Lu255qE5pa55rOV5YiX6KGoICovXG4gIG1ldGhvZHM6IHtcbiAgICBvblRhcFN3aXRjaCgpIHtcbiAgICAgIGxldCBtdXRlID0gIXRoaXMuZGF0YS5tdXRlXG4gICAgICBpZiAodGhpcy5kYXRhLnZpZGVvKSB7XG4gICAgICAgIG11dGUgPSBmYWxzZVxuICAgICAgfVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgbXV0ZSxcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIGxpZmV0aW1lczoge1xuICAgIGF0dGFjaGVkKCkgeyB9LFxuICAgIGRldGFjaGVkKCkge1xuICAgICAgaWYgKHRoaXMuYXVkaW9Db250ZXh0KSB7XG4gICAgICAgIHRoaXMuYXVkaW9Db250ZXh0LnBhdXNlKClcbiAgICAgICAgdGhpcy5hdWRpb0NvbnRleHQuZGVzdHJveSgpXG4gICAgICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gbnVsbFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG59KVxuIl19
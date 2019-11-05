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
        attached() {
            wx.onAppHide(() => {
                this.setData({
                    mute: true
                });
            });
        },
        detached() {
            if (this.audioContext) {
                this.audioContext.pause();
                this.audioContext.destroy();
                this.audioContext = null;
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmdtLXN3aXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJnbS1zd2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsQ0FBQztJQUdSLFVBQVUsRUFBRTtRQUNWLEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLEtBQUs7U0FDYjtLQUNGO0lBR0QsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLHlCQUF5QjtRQUNqQyxJQUFJLEVBQUUsS0FBSztRQUNYLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsU0FBUyxFQUFFO1FBQ1QsS0FBSyxFQUFFLFVBQVUsR0FBRztZQUNsQixJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO2dCQUNwQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNqQixZQUFZLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQUE7aUJBQzVDO2dCQUNELFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO2dCQUM1QixZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtnQkFDeEIsWUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7Z0JBQ3RCLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO29CQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUMxQixDQUFDLENBQUMsQ0FBQTtnQkFDRixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUNqQyxDQUFDLENBQUMsQ0FBQTtnQkFDRixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUN4QixZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7aUJBQ3BCO3FCQUNJO29CQUNILFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtpQkFDckI7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUE7YUFDakM7UUFDSCxDQUFDO1FBQ0QsYUFBYSxFQUFFLFVBQVUsSUFBSSxFQUFFLEtBQUs7WUFDbEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNwQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQTtZQUMvRSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLElBQUksVUFBVSxFQUFFO29CQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7aUJBQ3pCO3FCQUNJO29CQUNILElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUE7aUJBQzFCO2FBQ0Y7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFVBQVU7Z0JBQ1YsTUFBTTthQUNQLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUdELE9BQU8sRUFBRTtRQUNQLFdBQVc7WUFDVCxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1lBQzFCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ25CLElBQUksR0FBRyxLQUFLLENBQUE7YUFDYjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsSUFBSTthQUNMLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUVELFNBQVMsRUFBRTtRQUNULFFBQVE7WUFDTixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxJQUFJLEVBQUUsSUFBSTtpQkFDWCxDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxRQUFRO1lBQ04sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFBO2dCQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTthQUN6QjtRQUNILENBQUM7S0FDRjtDQUVGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIkNvbXBvbmVudCh7XG5cbiAgLyoqIOe7hOS7tueahOWxnuaAp+WIl+ihqCAqL1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgYmdtOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJydcbiAgICB9LFxuICAgIHZpZGVvOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG5cbiAgLyoqIOe7hOS7tueahOWIneWni+aVsOaNriAqL1xuICBkYXRhOiB7XG4gICAgaW1nU3JjOiBcIi4uLy4uL2Fzc2V0cy92b2x1bWUucG5nXCIsXG4gICAgbXV0ZTogZmFsc2UsXG4gICAgc2hvdWxkUGxheTogdHJ1ZSxcbiAgfSxcblxuICBvYnNlcnZlcnM6IHtcbiAgICAnYmdtJzogZnVuY3Rpb24gKHVybCkge1xuICAgICAgaWYgKHVybCkge1xuICAgICAgICBsZXQgYXVkaW9Db250ZXh0ID0gdGhpcy5hdWRpb0NvbnRleHRcbiAgICAgICAgaWYgKCFhdWRpb0NvbnRleHQpIHtcbiAgICAgICAgICBhdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpXG4gICAgICAgIH1cbiAgICAgICAgYXVkaW9Db250ZXh0LmF1dG9wbGF5ID0gdHJ1ZVxuICAgICAgICBhdWRpb0NvbnRleHQubG9vcCA9IHRydWVcbiAgICAgICAgYXVkaW9Db250ZXh0LnNyYyA9IHVybFxuICAgICAgICBhdWRpb0NvbnRleHQub25QbGF5KCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnYmdtIHN0YXJ0JylcbiAgICAgICAgfSlcbiAgICAgICAgYXVkaW9Db250ZXh0Lm9uRXJyb3IoKHJlcykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUud2FybignYmdtIGVycm9yOicsIHJlcylcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5zaG91bGRQbGF5KSB7XG4gICAgICAgICAgYXVkaW9Db250ZXh0LnBsYXkoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGF1ZGlvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdWRpb0NvbnRleHQgPSBhdWRpb0NvbnRleHRcbiAgICAgIH1cbiAgICB9LFxuICAgICdtdXRlLCB2aWRlbyc6IGZ1bmN0aW9uIChtdXRlLCB2aWRlbykge1xuICAgICAgbGV0IHNob3VsZFBsYXkgPSAoIW11dGUpICYmICghdmlkZW8pXG4gICAgICBjb25zdCBpbWdTcmMgPSBzaG91bGRQbGF5ID8gJy4uLy4uL2Fzc2V0cy92b2x1bWUucG5nJyA6ICcuLi8uLi9hc3NldHMvbXV0ZS5wbmcnXG4gICAgICBpZiAodGhpcy5hdWRpb0NvbnRleHQpIHtcbiAgICAgICAgaWYgKHNob3VsZFBsYXkpIHtcbiAgICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dC5wbGF5KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHNob3VsZFBsYXksXG4gICAgICAgIGltZ1NyY1xuICAgICAgfSlcbiAgICB9LFxuICB9LFxuXG4gIC8qKiDnu4Tku7bnmoTmlrnms5XliJfooaggKi9cbiAgbWV0aG9kczoge1xuICAgIG9uVGFwU3dpdGNoKCkge1xuICAgICAgbGV0IG11dGUgPSAhdGhpcy5kYXRhLm11dGVcbiAgICAgIGlmICh0aGlzLmRhdGEudmlkZW8pIHtcbiAgICAgICAgbXV0ZSA9IGZhbHNlXG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBtdXRlLFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgbGlmZXRpbWVzOiB7XG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICB3eC5vbkFwcEhpZGUoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIG11dGU6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBkZXRhY2hlZCgpIHtcbiAgICAgIGlmICh0aGlzLmF1ZGlvQ29udGV4dCkge1xuICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dC5wYXVzZSgpXG4gICAgICAgIHRoaXMuYXVkaW9Db250ZXh0LmRlc3Ryb3koKVxuICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IG51bGxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufSlcbiJdfQ==
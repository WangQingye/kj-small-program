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
                const audioContext = wx.createInnerAudioContext();
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
                this.setData({
                    audioContext
                });
            }
        },
        'mute, video': function (mute, video) {
            let shouldPlay = (!mute) && (!video);
            const imgSrc = shouldPlay ? '../../assets/volume.png' : '../../assets/mute.png';
            if (this.data.audioContext) {
                if (shouldPlay) {
                    this.data.audioContext.play();
                }
                else {
                    this.data.audioContext.pause();
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
        attached() { }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmdtLXN3aXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJnbS1zd2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsQ0FBQztJQUdSLFVBQVUsRUFBRTtRQUNWLEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLEtBQUs7U0FDYjtLQUNGO0lBR0QsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLHlCQUF5QjtRQUNqQyxJQUFJLEVBQUUsS0FBSztRQUNYLFVBQVUsRUFBRSxJQUFJO0tBQ2pCO0lBRUQsU0FBUyxFQUFFO1FBQ1QsS0FBSyxFQUFFLFVBQVUsR0FBRztZQUNsQixJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBQTtnQkFDakQsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7Z0JBQzVCLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO2dCQUN4QixZQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtnQkFDdEIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7b0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQzFCLENBQUMsQ0FBQyxDQUFBO2dCQUNGLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFBO2dCQUNGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ3hCLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtpQkFDcEI7cUJBQ0k7b0JBQ0gsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFBO2lCQUNyQjtnQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFlBQVk7aUJBQ2IsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDO1FBQ0QsYUFBYSxFQUFFLFVBQVUsSUFBSSxFQUFFLEtBQUs7WUFDbEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNwQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQTtZQUMvRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUMxQixJQUFJLFVBQVUsRUFBRTtvQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtpQkFDOUI7cUJBQ0k7b0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUE7aUJBQy9CO2FBQ0Y7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFVBQVU7Z0JBQ1YsTUFBTTthQUNQLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUdELE9BQU8sRUFBRTtRQUNQLFdBQVc7WUFDVCxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1lBQzFCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ25CLElBQUksR0FBRyxLQUFLLENBQUE7YUFDYjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsSUFBSTthQUNMLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUVELFNBQVMsRUFBRTtRQUNULFFBQVEsS0FBSyxDQUFDO0tBQ2Y7Q0FFRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJDb21wb25lbnQoe1xuXG4gIC8qKiDnu4Tku7bnmoTlsZ7mgKfliJfooaggKi9cbiAgcHJvcGVydGllczoge1xuICAgIGJnbToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfSxcbiAgICB2aWRlbzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICB9LFxuICB9LFxuXG4gIC8qKiDnu4Tku7bnmoTliJ3lp4vmlbDmja4gKi9cbiAgZGF0YToge1xuICAgIGltZ1NyYzogXCIuLi8uLi9hc3NldHMvdm9sdW1lLnBuZ1wiLFxuICAgIG11dGU6IGZhbHNlLFxuICAgIHNob3VsZFBsYXk6IHRydWUsXG4gIH0sXG5cbiAgb2JzZXJ2ZXJzOiB7XG4gICAgJ2JnbSc6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgY29uc3QgYXVkaW9Db250ZXh0ID0gd3guY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQoKVxuICAgICAgICBhdWRpb0NvbnRleHQuYXV0b3BsYXkgPSB0cnVlXG4gICAgICAgIGF1ZGlvQ29udGV4dC5sb29wID0gdHJ1ZVxuICAgICAgICBhdWRpb0NvbnRleHQuc3JjID0gdXJsXG4gICAgICAgIGF1ZGlvQ29udGV4dC5vblBsYXkoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdiZ20gc3RhcnQnKVxuICAgICAgICB9KVxuICAgICAgICBhdWRpb0NvbnRleHQub25FcnJvcigocmVzKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdiZ20gZXJyb3I6JywgcmVzKVxuICAgICAgICB9KVxuICAgICAgICBpZiAodGhpcy5kYXRhLnNob3VsZFBsYXkpIHtcbiAgICAgICAgICBhdWRpb0NvbnRleHQucGxheSgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYXVkaW9Db250ZXh0LnBhdXNlKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGF1ZGlvQ29udGV4dFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgJ211dGUsIHZpZGVvJzogZnVuY3Rpb24gKG11dGUsIHZpZGVvKSB7XG4gICAgICBsZXQgc2hvdWxkUGxheSA9ICghbXV0ZSkgJiYgKCF2aWRlbylcbiAgICAgIGNvbnN0IGltZ1NyYyA9IHNob3VsZFBsYXkgPyAnLi4vLi4vYXNzZXRzL3ZvbHVtZS5wbmcnIDogJy4uLy4uL2Fzc2V0cy9tdXRlLnBuZydcbiAgICAgIGlmICh0aGlzLmRhdGEuYXVkaW9Db250ZXh0KSB7XG4gICAgICAgIGlmIChzaG91bGRQbGF5KSB7XG4gICAgICAgICAgdGhpcy5kYXRhLmF1ZGlvQ29udGV4dC5wbGF5KClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRhdGEuYXVkaW9Db250ZXh0LnBhdXNlKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgc2hvdWxkUGxheSxcbiAgICAgICAgaW1nU3JjXG4gICAgICB9KVxuICAgIH0sXG4gIH0sXG5cbiAgLyoqIOe7hOS7tueahOaWueazleWIl+ihqCAqL1xuICBtZXRob2RzOiB7XG4gICAgb25UYXBTd2l0Y2goKSB7XG4gICAgICBsZXQgbXV0ZSA9ICF0aGlzLmRhdGEubXV0ZVxuICAgICAgaWYgKHRoaXMuZGF0YS52aWRlbykge1xuICAgICAgICBtdXRlID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIG11dGUsXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpIHsgfVxuICB9XG5cbn0pXG4iXX0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const res_loader_1 = require("./utils/res-loader");
Component({
    properties: {
        book: {
            type: Number,
            value: 11
        }
    },
    data: {
        retry: 3,
        totalResCount: 1,
        progress: '0',
        loaded: false,
        hasVideo: false,
        current: 0,
        throttleFlag: 0,
        timeout: null,
        bgm: '',
        bgmLocal: '',
        cover: '',
        pages: [],
        pagesLocal: [],
        isVideoPlaying: false,
        videoStyle: 'left:1000px;',
        videoHeight: 300,
        videoSrc: ''
    },
    methods: {
        getMagazineData() {
            if (!this.data.book && !(this.data.book === 0)) {
                this.showNetError();
                return;
            }
            const that = this;
            wx.request({
                url: 'https://xgbapi.zcoming.com/api/magazine/show',
                method: 'POST',
                data: {
                    'magazine_id': this.data.book
                },
                success(res) {
                    const data = res.data.data;
                    that.setData({ magazine: data });
                    that.handleMagazineData();
                },
                fail(err) {
                    if (that.data.retry > 0) {
                        that.setData({ retry: that.data.retry - 1 });
                        setTimeout(() => {
                            that.getMagazineData();
                        }, 0);
                    }
                    else {
                        that.showNetError();
                    }
                }
            });
        },
        showNetError() {
            wx.showModal({
                title: '网络错误',
                content: '未获取到杂志信息',
                showCancel: false,
                confirmText: '返回',
                confirmColor: '#000000',
                success() {
                    wx.navigateBack({
                        delta: 1
                    });
                }
            });
        },
        handleMagazineData() {
            const { title, audio_url, tail_pic, page_join, } = this.data.magazine;
            wx.setNavigationBarTitle({
                title
            });
            this.setData({
                pages: page_join,
                bgm: audio_url,
                cover: tail_pic,
                isVideoPlaying: false,
                videoStyle: `left:${this.data.windowWidth}px;`,
            });
            this.initVideoContext();
            this.loadRes();
        },
        initVideoContext() {
            let hasVideo = false;
            this.data.pages.forEach(page => {
                if (page.type === 4 || page.type === 3) {
                    hasVideo = true;
                }
            });
            this.setData({
                hasVideo,
            });
            if (hasVideo) {
                this.videoContext = wx.createVideoContext('common-video', this);
            }
        },
        loadRes() {
            const pages = this.data.pages;
            let resList = [this.data.cover];
            if (this.data.bgm) {
                resList.push(this.data.bgm);
            }
            pages.forEach(page => {
                [
                    'pic',
                    'video_cover',
                    'base_pic',
                    'sign_pic',
                    'video_url',
                ].forEach(key => {
                    if (page[key]) {
                        resList.push(page[key]);
                    }
                });
                if (page.pic_join.length) {
                    page.pic_join.forEach(item => {
                        resList.push(item.pic);
                    });
                }
            });
            this.setData({
                totalResCount: resList.length
            });
            res_loader_1.loadRes(resList.concat(), this.onProgress, this.onResLoaded, this);
        },
        onProgress(current) {
            let total = this.data.totalResCount;
            let progress = Number(100 * current / total).toFixed(0);
            this.setData({ progress });
        },
        onResLoaded(loadedResList) {
            const getLocal = url => {
                for (let i = loadedResList.length - 1; i >= 0; i--) {
                    if (loadedResList[i].origin === url) {
                        return loadedResList[i].local;
                    }
                }
            };
            if (this.data.bgm) {
                const bgmLocal = getLocal(this.data.bgm);
                this.setData({ bgmLocal });
            }
            const pages = this.data.pages;
            let pagesLocal = JSON.parse(JSON.stringify(pages));
            pagesLocal.forEach(page => {
                [
                    'pic',
                    'video_cover',
                    'base_pic',
                    'sign_pic',
                    'video_url',
                ].forEach(key => {
                    if (page[key]) {
                        page[key] = getLocal(page[key]);
                    }
                });
                if (page.pic_join.length) {
                    page.pic_join.forEach(item => {
                        item.pic = getLocal(item.pic);
                    });
                }
            });
            this.setData({ pagesLocal, loaded: true });
            setTimeout(() => {
                this.selectComponent(`.layout-${this.data.current}`).setEnter();
            }, 0);
        },
        onFinish({ detail }) {
            let { current } = detail;
            let previous = this.data.current;
            if (previous !== current) {
                if (this.data.timeout) {
                    clearTimeout(this.data.timeout);
                    this.data.timeout = null;
                }
                this.data.timeout = setTimeout(() => {
                    this.selectComponent(`.layout-${previous}`).setExit();
                    this.selectComponent(`.layout-${current}`).setEnter();
                }, 0);
            }
            this.setData({ current });
        },
        onSwipe({ detail }) {
            this.setItemAnim(~~detail.dx);
            if (this.data.hasVideo) {
                this.stopPlay();
            }
        },
        setItemAnim(dx) {
            let sign = Math.sign(dx);
            let current = this.data.current;
            let next = sign + current;
            let step = Number(dx / this.data.windowWidth).toFixed(2);
            let abs = Math.abs(step);
            if (abs > 1) {
                let dis = sign * ~~abs;
                next += dis;
                current += dis;
                step -= dis;
            }
            if (0 <= next && next < this.data.pages.length) {
                this.selectComponent(`.layout-${next}`).setFrame(step, true);
            }
            this.selectComponent(`.layout-${current}`).setFrame(step, false);
        },
        onVideoPlay({ detail }) {
            const videoContext = this.videoContext;
            if (!videoContext) {
                this.setData({
                    isVideoPlaying: false
                });
                return;
            }
            let config = null;
            this.data.pagesLocal.forEach(page => {
                if (page.id === +detail) {
                    config = page;
                }
            });
            const { type, video_url, video_cover } = config;
            const videoHeight = this.data.videoHeight;
            const videoStyle = type === 3 ?
                'height:100vh;top:0px;margin-top:0px;' :
                `height:${videoHeight}px;margin-top:-${~~(videoHeight / 2)}px;`;
            this.setData({
                isVideoPlaying: true,
                videoSrc: video_url,
                videoCover: video_cover,
                videoStyle,
            });
            wx.nextTick(() => {
                videoContext.seek(0);
                videoContext.play();
            });
        },
        stopPlay() {
            let windowWidth = this.data.windowWidth;
            this.setData({
                isVideoPlaying: false,
                videoStyle: `left:${windowWidth}px;`,
            });
            if (this.videoContext) {
                this.videoContext.pause();
            }
        },
    },
    lifetimes: {
        attached() {
            let that = this;
            wx.getSystemInfo({
                success({ windowWidth, windowHeight }) {
                    const videoHeight = ~~(windowWidth * 9 / 16);
                    that.setData({
                        windowWidth,
                        windowHeight,
                        videoHeight
                    });
                }
            });
            wx.setNavigationBarTitle({
                title: '加载中'
            });
            this.getMagazineData();
        },
        detached() {
            this.setData({
                retry: 3,
                totalResCount: 1,
                progress: '0',
                loaded: false,
                hasVideo: false,
                current: 0,
                throttleFlag: 0,
                timeout: null,
                bgm: '',
                bgmLocal: '',
                cover: '',
                pages: [],
                pagesLocal: [],
                isVideoPlaying: false,
                videoStyle: 'left:1000px;',
                videoHeight: 300,
                videoSrc: ''
            });
        },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUE0QztBQUU1QyxTQUFTLENBQUM7SUFHUixVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxFQUFFO1NBQ1Y7S0FDRjtJQUdELElBQUksRUFBRTtRQUVKLEtBQUssRUFBRSxDQUFDO1FBRVIsYUFBYSxFQUFFLENBQUM7UUFFaEIsUUFBUSxFQUFFLEdBQUc7UUFFYixNQUFNLEVBQUUsS0FBSztRQUViLFFBQVEsRUFBRSxLQUFLO1FBRWYsT0FBTyxFQUFFLENBQUM7UUFFVixZQUFZLEVBQUUsQ0FBQztRQUVmLE9BQU8sRUFBRSxJQUFJO1FBRWIsR0FBRyxFQUFFLEVBQUU7UUFDUCxRQUFRLEVBQUUsRUFBRTtRQUVaLEtBQUssRUFBRSxFQUFFO1FBRVQsS0FBSyxFQUFFLEVBQUU7UUFDVCxVQUFVLEVBQUUsRUFBRTtRQUVkLGNBQWMsRUFBRSxLQUFLO1FBRXJCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLFdBQVcsRUFBRSxHQUFHO1FBQ2hCLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFHRCxPQUFPLEVBQUU7UUFFUCxlQUFlO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO2dCQUNuQixPQUFNO2FBQ1A7WUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUE7WUFDakIsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxHQUFHLEVBQUUsOENBQThDO2dCQUNuRCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUU7b0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtp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RWIsR0FBRyxFQUFFLEVBQUU7Z0JBQ1AsUUFBUSxFQUFFLEVBQUU7Z0JBRVosS0FBSyxFQUFFLEVBQUU7Z0JBRVQsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsVUFBVSxFQUFFLEVBQUU7Z0JBRWQsY0FBYyxFQUFFLEtBQUs7Z0JBRXJCLFVBQVUsRUFBRSxjQUFjO2dCQUMxQixXQUFXLEVBQUUsR0FBRztnQkFDaEIsUUFBUSxFQUFFLEVBQUU7YUFDYixDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0Y7Q0FFRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2FkUmVzIH0gZnJvbSAnLi91dGlscy9yZXMtbG9hZGVyJ1xuXG5Db21wb25lbnQoe1xuXG4gIC8qKiDnu4Tku7bnmoTlsZ7mgKfliJfooaggKi9cbiAgcHJvcGVydGllczoge1xuICAgIGJvb2s6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAxMVxuICAgIH1cbiAgfSxcblxuICAvKiog57uE5Lu255qE5Yid5aeL5pWw5o2uICovXG4gIGRhdGE6IHtcbiAgICAvKiogcmV0cnkgKi9cbiAgICByZXRyeTogMyxcbiAgICAvKiog6LWE5rqQ5oC75pWwICovXG4gICAgdG90YWxSZXNDb3VudDogMSxcbiAgICAvKiog6LWE5rqQ5Yqg6L296L+b5bqmICovXG4gICAgcHJvZ3Jlc3M6ICcwJyxcbiAgICAvKiog6LWE5rqQ5piv5ZCm5Yqg6L295a6M5q+VICovXG4gICAgbG9hZGVkOiBmYWxzZSxcbiAgICAvKiog5piv5ZCm5a2Y5ZyodmlkZW8gKi9cbiAgICBoYXNWaWRlbzogZmFsc2UsXG4gICAgLyoqIOW9k+WJjWxheW91dOS4i+aghyAqL1xuICAgIGN1cnJlbnQ6IDAsXG4gICAgLyoqIOa7keWKqOWHveaVsOiKgua1geagh+iusCAqL1xuICAgIHRocm90dGxlRmxhZzogMCxcbiAgICAvKiog6aG16Z2i5YiH5o2idGltZW91dOagh+iusCAqL1xuICAgIHRpbWVvdXQ6IG51bGwsXG4gICAgLyoqIGJnbeWcsOWdgCAqL1xuICAgIGJnbTogJycsXG4gICAgYmdtTG9jYWw6ICcnLFxuICAgIC8qKiDlsIHpnaLlnLDlnYAgKi9cbiAgICBjb3ZlcjogJycsXG4gICAgLyoqIGxheW91dOS/oeaBr+aVsOe7hCAqL1xuICAgIHBhZ2VzOiBbXSxcbiAgICBwYWdlc0xvY2FsOiBbXSxcbiAgICAvKiog5piv5ZCm5Zyo5pKt5pS+6KeG6aKRICovXG4gICAgaXNWaWRlb1BsYXlpbmc6IGZhbHNlLFxuICAgIC8qKiDop4bpopHmoLflvI8gKi9cbiAgICB2aWRlb1N0eWxlOiAnbGVmdDoxMDAwcHg7JyxcbiAgICB2aWRlb0hlaWdodDogMzAwLFxuICAgIHZpZGVvU3JjOiAnJ1xuICB9LFxuXG4gIC8qKiDnu4Tku7bnmoTmlrnms5XliJfooaggKi9cbiAgbWV0aG9kczoge1xuICAgIC8qKiDojrflj5bmnYLlv5fkv6Hmga8gKi9cbiAgICBnZXRNYWdhemluZURhdGEoKSB7XG4gICAgICBpZiAoIXRoaXMuZGF0YS5ib29rICYmICEodGhpcy5kYXRhLmJvb2sgPT09IDApKSB7XG4gICAgICAgIHRoaXMuc2hvd05ldEVycm9yKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8veGdiYXBpLnpjb21pbmcuY29tL2FwaS9tYWdhemluZS9zaG93JyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAnbWFnYXppbmVfaWQnOiB0aGlzLmRhdGEuYm9va1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgdGhhdC5zZXREYXRhKHsgbWFnYXppbmU6IGRhdGEgfSlcbiAgICAgICAgICB0aGF0LmhhbmRsZU1hZ2F6aW5lRGF0YSgpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgICAgaWYgKHRoYXQuZGF0YS5yZXRyeSA+IDApIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7IHJldHJ5OiB0aGF0LmRhdGEucmV0cnkgLSAxIH0pXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhhdC5nZXRNYWdhemluZURhdGEoKVxuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhhdC5zaG93TmV0RXJyb3IoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIC8qKiDnvZHnu5zmlYXpmpwgKi9cbiAgICBzaG93TmV0RXJyb3IoKSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+e9kee7nOmUmeivrycsXG4gICAgICAgIGNvbnRlbnQ6ICfmnKrojrflj5bliLDmnYLlv5fkv6Hmga8nLFxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgY29uZmlybVRleHQ6ICfov5Tlm54nLFxuICAgICAgICBjb25maXJtQ29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgLyoqIOWkhOeQhuadguW/l+aVsOaNruS7peS+v+a4suafkyAqL1xuICAgIGhhbmRsZU1hZ2F6aW5lRGF0YSgpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgLy8gaWQsXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBhdWRpb191cmwsXG4gICAgICAgIHRhaWxfcGljLFxuICAgICAgICBwYWdlX2pvaW4sXG4gICAgICB9ID0gdGhpcy5kYXRhLm1hZ2F6aW5lXG4gICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgICB0aXRsZVxuICAgICAgfSlcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHBhZ2VzOiBwYWdlX2pvaW4sXG4gICAgICAgIGJnbTogYXVkaW9fdXJsLFxuICAgICAgICBjb3ZlcjogdGFpbF9waWMsXG4gICAgICAgIGlzVmlkZW9QbGF5aW5nOiBmYWxzZSxcbiAgICAgICAgdmlkZW9TdHlsZTogYGxlZnQ6JHt0aGlzLmRhdGEud2luZG93V2lkdGh9cHg7YCxcbiAgICAgIH0pXG4gICAgICB0aGlzLmluaXRWaWRlb0NvbnRleHQoKVxuICAgICAgdGhpcy5sb2FkUmVzKClcbiAgICB9LFxuICAgIC8qKiDliJ3lp4vljJbop4bpopHkuIrkuIvmlocgKi9cbiAgICBpbml0VmlkZW9Db250ZXh0KCkge1xuICAgICAgbGV0IGhhc1ZpZGVvID0gZmFsc2VcbiAgICAgIHRoaXMuZGF0YS5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgICBpZiAocGFnZS50eXBlID09PSA0IHx8IHBhZ2UudHlwZSA9PT0gMykge1xuICAgICAgICAgIGhhc1ZpZGVvID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgaGFzVmlkZW8sXG4gICAgICB9KVxuICAgICAgaWYgKGhhc1ZpZGVvKSB7XG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0ID0gd3guY3JlYXRlVmlkZW9Db250ZXh0KCdjb21tb24tdmlkZW8nLCB0aGlzKVxuICAgICAgfVxuICAgIH0sXG4gICAgLyoqIOmihOWKoOi9veWbvueJh+i1hOa6kCAqL1xuICAgIGxvYWRSZXMoKSB7XG4gICAgICBjb25zdCBwYWdlcyA9IHRoaXMuZGF0YS5wYWdlcyBhcyBBcnJheTxhbnk+XG4gICAgICBsZXQgcmVzTGlzdCA9IFt0aGlzLmRhdGEuY292ZXJdXG4gICAgICBpZiAodGhpcy5kYXRhLmJnbSkge1xuICAgICAgICByZXNMaXN0LnB1c2godGhpcy5kYXRhLmJnbSlcbiAgICAgIH1cbiAgICAgIHBhZ2VzLmZvckVhY2gocGFnZSA9PiB7XG4gICAgICAgIFtcbiAgICAgICAgICAncGljJyxcbiAgICAgICAgICAndmlkZW9fY292ZXInLFxuICAgICAgICAgICdiYXNlX3BpYycsXG4gICAgICAgICAgJ3NpZ25fcGljJyxcbiAgICAgICAgICAndmlkZW9fdXJsJyxcbiAgICAgICAgXS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKHBhZ2Vba2V5XSkge1xuICAgICAgICAgICAgcmVzTGlzdC5wdXNoKHBhZ2Vba2V5XSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChwYWdlLnBpY19qb2luLmxlbmd0aCkge1xuICAgICAgICAgIHBhZ2UucGljX2pvaW4uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHJlc0xpc3QucHVzaChpdGVtLnBpYylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdG90YWxSZXNDb3VudDogcmVzTGlzdC5sZW5ndGhcbiAgICAgIH0pXG4gICAgICBsb2FkUmVzKHJlc0xpc3QuY29uY2F0KCksIHRoaXMub25Qcm9ncmVzcywgdGhpcy5vblJlc0xvYWRlZCwgdGhpcylcbiAgICB9LFxuICAgIG9uUHJvZ3Jlc3MoY3VycmVudCkge1xuICAgICAgbGV0IHRvdGFsID0gdGhpcy5kYXRhLnRvdGFsUmVzQ291bnRcbiAgICAgIGxldCBwcm9ncmVzcyA9IE51bWJlcigxMDAgKiBjdXJyZW50IC8gdG90YWwpLnRvRml4ZWQoMClcbiAgICAgIHRoaXMuc2V0RGF0YSh7IHByb2dyZXNzIH0pXG4gICAgfSxcbiAgICAvKiog5Zu+54mH6aKE5Yqg6L295a6M5q+VICovXG4gICAgb25SZXNMb2FkZWQobG9hZGVkUmVzTGlzdDogQXJyYXk8eyBvcmlnaW4sIGxvY2FsIH0+KSB7XG4gICAgICBjb25zdCBnZXRMb2NhbCA9IHVybCA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSBsb2FkZWRSZXNMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxvYWRlZFJlc0xpc3RbaV0ub3JpZ2luID09PSB1cmwpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2FkZWRSZXNMaXN0W2ldLmxvY2FsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kYXRhLmJnbSkge1xuICAgICAgICBjb25zdCBiZ21Mb2NhbCA9IGdldExvY2FsKHRoaXMuZGF0YS5iZ20pXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IGJnbUxvY2FsIH0pXG4gICAgICB9XG4gICAgICBjb25zdCBwYWdlcyA9IHRoaXMuZGF0YS5wYWdlc1xuICAgICAgbGV0IHBhZ2VzTG9jYWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBhZ2VzKSlcbiAgICAgIHBhZ2VzTG9jYWwuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgICAgW1xuICAgICAgICAgICdwaWMnLFxuICAgICAgICAgICd2aWRlb19jb3ZlcicsXG4gICAgICAgICAgJ2Jhc2VfcGljJyxcbiAgICAgICAgICAnc2lnbl9waWMnLFxuICAgICAgICAgICd2aWRlb191cmwnLFxuICAgICAgICBdLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAocGFnZVtrZXldKSB7XG4gICAgICAgICAgICBwYWdlW2tleV0gPSBnZXRMb2NhbChwYWdlW2tleV0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZiAocGFnZS5waWNfam9pbi5sZW5ndGgpIHtcbiAgICAgICAgICBwYWdlLnBpY19qb2luLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLnBpYyA9IGdldExvY2FsKGl0ZW0ucGljKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLnNldERhdGEoeyBwYWdlc0xvY2FsLCBsb2FkZWQ6IHRydWUgfSlcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChgLmxheW91dC0ke3RoaXMuZGF0YS5jdXJyZW50fWApLnNldEVudGVyKClcbiAgICAgIH0sIDApXG4gICAgfSxcbiAgICAvKiogc3dpcGVy5YiH5o2i5LqL5Lu2ICovXG4gICAgb25GaW5pc2goeyBkZXRhaWwgfSkge1xuICAgICAgbGV0IHsgY3VycmVudCB9ID0gZGV0YWlsXG4gICAgICBsZXQgcHJldmlvdXMgPSB0aGlzLmRhdGEuY3VycmVudFxuICAgICAgaWYgKHByZXZpb3VzICE9PSBjdXJyZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEudGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRhdGEudGltZW91dClcbiAgICAgICAgICB0aGlzLmRhdGEudGltZW91dCA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICAvLyB0aW1lb3V05bGe5oCn5LiN5Y+C5LiO5riy5p+T77yM5Zug5q2k6YeH55So55u05o6l6LWL5YC855qE5pa55byPXG4gICAgICAgIHRoaXMuZGF0YS50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgLy8gc2V0RXhpdFxuICAgICAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KGAubGF5b3V0LSR7cHJldmlvdXN9YCkuc2V0RXhpdCgpXG4gICAgICAgICAgLy8gc2V0RW50ZXJcbiAgICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChgLmxheW91dC0ke2N1cnJlbnR9YCkuc2V0RW50ZXIoKVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgICAgdGhpcy5zZXREYXRhKHsgY3VycmVudCB9KVxuICAgIH0sXG4gICAgLyoqIFxuICAgICAqIHN3aXBlcua7keWKqOS6i+S7tlxuICAgICAqIEBkYXRlIDIwMTktMTAtMjRcbiAgICAgKiBAYXV0aG9yIGNoZW5neHUxOTczXG4gICAgICogQGRlc2Mg6YeH55So5ZCE56eN6IqC5rWB5pa55rOV55qE55yf5py65ruR5Yqo5pWI5p6c6YO95LiN5aW977yM5Zug5q2k5pqC5pe25LiN6IqC5rWBXG4gICAgICovXG4gICAgb25Td2lwZSh7IGRldGFpbCB9KSB7XG4gICAgICB0aGlzLnNldEl0ZW1BbmltKH5+ZGV0YWlsLmR4KVxuICAgICAgaWYgKHRoaXMuZGF0YS5oYXNWaWRlbykge1xuICAgICAgICB0aGlzLnN0b3BQbGF5KClcbiAgICAgIH1cbiAgICB9LFxuICAgIC8qKiBzd2lwZXLmu5Hliqjkuovku7boioLmtYHlkI7lk43lupQgKi9cbiAgICBzZXRJdGVtQW5pbShkeCkge1xuICAgICAgbGV0IHNpZ24gPSBNYXRoLnNpZ24oZHgpXG4gICAgICBsZXQgY3VycmVudCA9IHRoaXMuZGF0YS5jdXJyZW50XG4gICAgICBsZXQgbmV4dCA9IHNpZ24gKyBjdXJyZW50XG4gICAgICBsZXQgc3RlcCA9IE51bWJlcihkeCAvIHRoaXMuZGF0YS53aW5kb3dXaWR0aCkudG9GaXhlZCgyKVxuICAgICAgbGV0IGFicyA9IE1hdGguYWJzKHN0ZXApXG4gICAgICAvLyDlvZPliY3pobXpnaLmu5HliqjmnKrlrozmiJDnmoTml7blgJnnu6fnu63mu5Hliqjlj6/og73lh7rnjrBzdGVw57ud5a+55YC85aSn5LqO5LiA55qE5oOF5Ya1XG4gICAgICAvLyDmraTml7ZiaW5kYW5pbWF0aW9uZmluaXNo5LqL5Lu25bCa5pyq6Kem5Y+R77yMY3VycmVudOacquaUueWPmFxuICAgICAgLy8g6ZyA6KaB6K6h566X5b2T5YmN5pi+56S66aG16Z2i55qEaW5kZXjov5vooYzmuLLmn5NcbiAgICAgIGlmIChhYnMgPiAxKSB7XG4gICAgICAgIGxldCBkaXMgPSBzaWduICogfn5hYnNcbiAgICAgICAgbmV4dCArPSBkaXNcbiAgICAgICAgY3VycmVudCArPSBkaXNcbiAgICAgICAgc3RlcCAtPSBkaXNcbiAgICAgIH1cbiAgICAgIGlmICgwIDw9IG5leHQgJiYgbmV4dCA8IHRoaXMuZGF0YS5wYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoYC5sYXlvdXQtJHtuZXh0fWApLnNldEZyYW1lKHN0ZXAsIHRydWUpXG4gICAgICB9XG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChgLmxheW91dC0ke2N1cnJlbnR9YCkuc2V0RnJhbWUoc3RlcCwgZmFsc2UpXG4gICAgfSxcbiAgICAvKiog5a2Q57uE5Lu26KeG6aKR5pKt5pS+ICovXG4gICAgb25WaWRlb1BsYXkoeyBkZXRhaWwgfSkge1xuICAgICAgY29uc3QgdmlkZW9Db250ZXh0ID0gdGhpcy52aWRlb0NvbnRleHRcbiAgICAgIGlmICghdmlkZW9Db250ZXh0KSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgaXNWaWRlb1BsYXlpbmc6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgLy8g6I635Y+W6KeG6aKR5L+h5oGvXG4gICAgICBsZXQgY29uZmlnOiBhbnkgPSBudWxsXG4gICAgICB0aGlzLmRhdGEucGFnZXNMb2NhbC5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgICBpZiAocGFnZS5pZCA9PT0gK2RldGFpbCkge1xuICAgICAgICAgIGNvbmZpZyA9IHBhZ2VcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNvbnN0IHsgdHlwZSwgdmlkZW9fdXJsLCB2aWRlb19jb3ZlciB9ID0gY29uZmlnXG4gICAgICBjb25zdCB2aWRlb0hlaWdodCA9IHRoaXMuZGF0YS52aWRlb0hlaWdodFxuICAgICAgY29uc3QgdmlkZW9TdHlsZSA9IHR5cGUgPT09IDMgP1xuICAgICAgICAnaGVpZ2h0OjEwMHZoO3RvcDowcHg7bWFyZ2luLXRvcDowcHg7JyA6XG4gICAgICAgIGBoZWlnaHQ6JHt2aWRlb0hlaWdodH1weDttYXJnaW4tdG9wOi0ke35+KHZpZGVvSGVpZ2h0IC8gMil9cHg7YFxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgaXNWaWRlb1BsYXlpbmc6IHRydWUsXG4gICAgICAgIHZpZGVvU3JjOiB2aWRlb191cmwsXG4gICAgICAgIHZpZGVvQ292ZXI6IHZpZGVvX2NvdmVyLFxuICAgICAgICB2aWRlb1N0eWxlLFxuICAgICAgfSlcbiAgICAgIHd4Lm5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdmlkZW9Db250ZXh0LnNlZWsoMClcbiAgICAgICAgdmlkZW9Db250ZXh0LnBsYXkoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN0b3BQbGF5KCkge1xuICAgICAgbGV0IHdpbmRvd1dpZHRoID0gdGhpcy5kYXRhLndpbmRvd1dpZHRoXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAvKiog5piv5ZCm5Zyo5pKt5pS+6KeG6aKRICovXG4gICAgICAgIGlzVmlkZW9QbGF5aW5nOiBmYWxzZSxcbiAgICAgICAgLyoqIOinhumikeagt+W8jyAqL1xuICAgICAgICB2aWRlb1N0eWxlOiBgbGVmdDoke3dpbmRvd1dpZHRofXB4O2AsXG4gICAgICB9KVxuICAgICAgaWYgKHRoaXMudmlkZW9Db250ZXh0KSB7XG4gICAgICAgIHRoaXMudmlkZW9Db250ZXh0LnBhdXNlKClcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuXG4gIC8qKiDnu4Tku7bnlJ/lkb3lkajmnJ/li77lrZAgKi9cbiAgbGlmZXRpbWVzOiB7XG4gICAgLy8g5re75Yqg5Yiw6Iie5Y+w5Yid5aeL5YyW5LqL5Lu2XG4gICAgYXR0YWNoZWQoKSB7XG4gICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgIC8vIOiOt+WPluWxj+W5leWwuuWvuFxuICAgICAgd3guZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3MoeyB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0IH0pIHtcbiAgICAgICAgICBjb25zdCB2aWRlb0hlaWdodCA9IH5+KHdpbmRvd1dpZHRoICogOSAvIDE2KVxuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICB3aW5kb3dXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd0hlaWdodCxcbiAgICAgICAgICAgIHZpZGVvSGVpZ2h0XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJ1xuICAgICAgfSlcbiAgICAgIC8vIOiOt+WPluadguW/l+S/oeaBr1xuICAgICAgdGhpcy5nZXRNYWdhemluZURhdGEoKVxuICAgIH0sXG4gICAgZGV0YWNoZWQoKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAvKiogcmV0cnkgKi9cbiAgICAgICAgcmV0cnk6IDMsXG4gICAgICAgIC8qKiDotYTmupDmgLvmlbAgKi9cbiAgICAgICAgdG90YWxSZXNDb3VudDogMSxcbiAgICAgICAgLyoqIOi1hOa6kOWKoOi9vei/m+W6piAqL1xuICAgICAgICBwcm9ncmVzczogJzAnLFxuICAgICAgICAvKiog6LWE5rqQ5piv5ZCm5Yqg6L295a6M5q+VICovXG4gICAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICAgIC8qKiDmmK/lkKblrZjlnKh2aWRlbyAqL1xuICAgICAgICBoYXNWaWRlbzogZmFsc2UsXG4gICAgICAgIC8qKiDlvZPliY1sYXlvdXTkuIvmoIcgKi9cbiAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgLyoqIOa7keWKqOWHveaVsOiKgua1geagh+iusCAqL1xuICAgICAgICB0aHJvdHRsZUZsYWc6IDAsXG4gICAgICAgIC8qKiDpobXpnaLliIfmjaJ0aW1lb3V05qCH6K6wICovXG4gICAgICAgIHRpbWVvdXQ6IG51bGwsXG4gICAgICAgIC8qKiBiZ23lnLDlnYAgKi9cbiAgICAgICAgYmdtOiAnJyxcbiAgICAgICAgYmdtTG9jYWw6ICcnLFxuICAgICAgICAvKiog5bCB6Z2i5Zyw5Z2AICovXG4gICAgICAgIGNvdmVyOiAnJyxcbiAgICAgICAgLyoqIGxheW91dOS/oeaBr+aVsOe7hCAqL1xuICAgICAgICBwYWdlczogW10sXG4gICAgICAgIHBhZ2VzTG9jYWw6IFtdLFxuICAgICAgICAvKiog5piv5ZCm5Zyo5pKt5pS+6KeG6aKRICovXG4gICAgICAgIGlzVmlkZW9QbGF5aW5nOiBmYWxzZSxcbiAgICAgICAgLyoqIOinhumikeagt+W8jyAqL1xuICAgICAgICB2aWRlb1N0eWxlOiAnbGVmdDoxMDAwcHg7JyxcbiAgICAgICAgdmlkZW9IZWlnaHQ6IDMwMCxcbiAgICAgICAgdmlkZW9TcmM6ICcnXG4gICAgICB9KVxuICAgIH0sXG4gIH1cblxufSlcbiJdfQ==
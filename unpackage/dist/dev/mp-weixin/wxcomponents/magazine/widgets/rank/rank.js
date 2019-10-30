"use strict";
Component({
    properties: {},
    data: {
        rank: [],
        retry: 3
    },
    methods: {
        getRankData() {
            let that = this;
            wx.request({
                url: 'https://xgbapi.zcoming.com/api/magazine/magazineTop',
                method: 'POST',
                success(res) {
                    const data = res.data.data;
                    if (data.length) {
                        const rank = data.map(item => {
                            return {
                                id: item.id,
                                title: item.title,
                                img: item.cover_pic,
                                hot: item.subscribe_num
                            };
                        });
                        that.setData({ rank });
                    }
                },
                fail() {
                    if (that.data.retry > 0) {
                        that.setData({ retry: that.data.retry - 1 });
                        setTimeout(() => {
                            that.getRankData();
                        }, 0);
                    }
                }
            });
        }
    },
    lifetimes: {
        attached() {
            this.getRankData();
        },
        detached() { },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsQ0FBQztJQUVSLFVBQVUsRUFBRSxFQUFFO0lBR2QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixLQUFLLEVBQUUsQ0FBQztLQUNUO0lBR0QsT0FBTyxFQUFFO1FBQ1AsV0FBVztZQUNULElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtZQUNmLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLHFEQUFxRDtnQkFDMUQsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxDQUFDLEdBQUc7b0JBQ1QsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7b0JBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDZixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUMzQixPQUFPO2dDQUNMLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQ0FDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0NBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUztnQ0FDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhOzZCQUN4QixDQUFBO3dCQUNILENBQUMsQ0FBQyxDQUFBO3dCQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO3FCQUN2QjtnQkFDSCxDQUFDO2dCQUNELElBQUk7b0JBQ0YsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7d0JBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTt3QkFDNUMsVUFBVSxDQUFDLEdBQUcsRUFBRTs0QkFDZCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7d0JBQ3BCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtxQkFDTjtnQkFDSCxDQUFDO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0lBRUQsU0FBUyxFQUFFO1FBQ1QsUUFBUTtZQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNwQixDQUFDO1FBQ0QsUUFBUSxLQUFLLENBQUM7S0FDZjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIkNvbXBvbmVudCh7XG4gIC8qKiDnu4Tku7bnmoTlsZ7mgKfliJfooaggKi9cbiAgcHJvcGVydGllczoge30sXG5cbiAgLyoqIOe7hOS7tueahOWIneWni+aVsOaNriAqL1xuICBkYXRhOiB7XG4gICAgcmFuazogW10sXG4gICAgcmV0cnk6IDNcbiAgfSxcblxuICAvKiog57uE5Lu255qE5pa55rOV5YiX6KGoICovXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRSYW5rRGF0YSgpIHtcbiAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8veGdiYXBpLnpjb21pbmcuY29tL2FwaS9tYWdhemluZS9tYWdhemluZVRvcCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCByYW5rID0gZGF0YS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgaW1nOiBpdGVtLmNvdmVyX3BpYyxcbiAgICAgICAgICAgICAgICBob3Q6IGl0ZW0uc3Vic2NyaWJlX251bVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHsgcmFuayB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICBpZiAodGhhdC5kYXRhLnJldHJ5ID4gMCkge1xuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHsgcmV0cnk6IHRoYXQuZGF0YS5yZXRyeSAtIDEgfSlcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGF0LmdldFJhbmtEYXRhKClcbiAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpIHtcbiAgICAgIHRoaXMuZ2V0UmFua0RhdGEoKVxuICAgIH0sXG4gICAgZGV0YWNoZWQoKSB7IH0sXG4gIH0sXG59KVxuIl19
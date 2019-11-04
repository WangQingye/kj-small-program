"use strict";
Component({
    properties: {
        config: {
            type: Object,
            value: null
        }
    },
    data: {
        contents: [],
        anims: [],
        animsNames: []
    },
    observers: {
        'config': function (config) {
            const contents = config.content_join.map(item => {
                let weight = item.bold ? 'bold' : 'normal';
                let size = +item.word_size;
                let style = [
                    `font-weight:${weight};`,
                    `font-size:${size}px;`,
                ].join('');
                return {
                    style,
                    content: item.content,
                    anim: item.cartoon_style
                };
            });
            this.setData({ contents });
            this.getAnimNames();
        },
        'anims': function (arr) {
            let floating = [];
            if (arr.length) {
                for (let i = arr.length - 1; i >= 0; i--) {
                    let time = Number(3.5 + Math.random()).toFixed(1);
                    let dir = i % 2 === 0 ? 'reverse' : 'normal';
                    floating.push(`animation: floating ${time}s ease 2s infinite ${dir};`);
                }
            }
            this.setData({
                floating
            });
        }
    },
    methods: {
        setFrame() { },
        setEnter() {
            this.setData({
                anims: this.data.animsNames
            });
        },
        setExit() {
            this.setData({
                anims: []
            });
        },
        getAnimNames() {
            const contents = this.data.contents;
            let animsNames = [];
            let leftNum = 0;
            for (let i = 0; i < contents.length; i++) {
                let { anim } = contents[i];
                if (+anim === 1) {
                    leftNum++;
                    animsNames[i] = leftNum % 2 === 0 ? 'anim-1-left' : 'anim-1-right';
                }
                else {
                    animsNames[i] = 'anim-2';
                }
            }
            this.setData({ animsNames });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0MS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxheW91dDEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsQ0FBQztJQUdSLFVBQVUsRUFBRTtRQUNWLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGO0lBR0QsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFLEVBQUU7UUFDWixLQUFLLEVBQUUsRUFBRTtRQUNULFVBQVUsRUFBRSxFQUFFO0tBQ2Y7SUFFRCxTQUFTLEVBQUU7UUFDVCxRQUFRLEVBQUUsVUFBVSxNQUFNO1lBQ3hCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtnQkFDMUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFBO2dCQUUxQixJQUFJLEtBQUssR0FBRztvQkFDVixlQUFlLE1BQU0sR0FBRztvQkFDeEIsYUFBYSxJQUFJLEtBQUs7aUJBRXZCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUNWLE9BQU87b0JBQ0wsS0FBSztvQkFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYTtpQkFDekIsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7WUFDMUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBQ3JCLENBQUM7UUFDRCxPQUFPLEVBQUUsVUFBVSxHQUFHO1lBQ3BCLElBQUksUUFBUSxHQUFrQixFQUFFLENBQUE7WUFDaEMsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDeEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2pELElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtvQkFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxzQkFBc0IsR0FBRyxHQUFHLENBQUMsQ0FBQTtpQkFDdkU7YUFDRjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUTthQUNULENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUdELE9BQU8sRUFBRTtRQUVQLFFBQVEsS0FBSyxDQUFDO1FBRWQsUUFBUTtZQUNOLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTthQUM1QixDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQsT0FBTztZQUNMLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLEVBQUU7YUFDVixDQUFDLENBQUE7UUFDSixDQUFDO1FBRUQsWUFBWTtZQUNWLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO1lBQ25DLElBQUksVUFBVSxHQUFrQixFQUFFLENBQUE7WUFDbEMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFBO1lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO29CQUNmLE9BQU8sRUFBRSxDQUFBO29CQUNULFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUE7aUJBQ25FO3FCQUNJO29CQUNILFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUE7aUJBQ3pCO2FBQ0Y7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtRQUM5QixDQUFDO0tBQ0Y7Q0FFRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJDb21wb25lbnQoe1xuXG4gIC8qKiDnu4Tku7bnmoTlsZ7mgKfliJfooaggKi9cbiAgcHJvcGVydGllczoge1xuICAgIGNvbmZpZzoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgdmFsdWU6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgLyoqIOe7hOS7tueahOWIneWni+aVsOaNriAqL1xuICBkYXRhOiB7XG4gICAgY29udGVudHM6IFtdLFxuICAgIGFuaW1zOiBbXSxcbiAgICBhbmltc05hbWVzOiBbXVxuICB9LFxuXG4gIG9ic2VydmVyczoge1xuICAgICdjb25maWcnOiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICBjb25zdCBjb250ZW50cyA9IGNvbmZpZy5jb250ZW50X2pvaW4ubWFwKGl0ZW0gPT4ge1xuICAgICAgICBsZXQgd2VpZ2h0ID0gaXRlbS5ib2xkID8gJ2JvbGQnIDogJ25vcm1hbCdcbiAgICAgICAgbGV0IHNpemUgPSAraXRlbS53b3JkX3NpemVcbiAgICAgICAgLy8gbGV0IGluZGVudCA9IH5+KE1hdGgucmFuZG9tKCkgKiA2MClcbiAgICAgICAgbGV0IHN0eWxlID0gW1xuICAgICAgICAgIGBmb250LXdlaWdodDoke3dlaWdodH07YCxcbiAgICAgICAgICBgZm9udC1zaXplOiR7c2l6ZX1weDtgLFxuICAgICAgICAgIC8vIGB0ZXh0LWluZGVudDoke2luZGVudH1weDtgLFxuICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3R5bGUsXG4gICAgICAgICAgY29udGVudDogaXRlbS5jb250ZW50LFxuICAgICAgICAgIGFuaW06IGl0ZW0uY2FydG9vbl9zdHlsZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5zZXREYXRhKHsgY29udGVudHMgfSlcbiAgICAgIHRoaXMuZ2V0QW5pbU5hbWVzKClcbiAgICB9LFxuICAgICdhbmltcyc6IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgIGxldCBmbG9hdGluZzogQXJyYXk8c3RyaW5nPiA9IFtdXG4gICAgICBpZiAoYXJyLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgbGV0IHRpbWUgPSBOdW1iZXIoMy41ICsgTWF0aC5yYW5kb20oKSkudG9GaXhlZCgxKVxuICAgICAgICAgIGxldCBkaXIgPSBpICUgMiA9PT0gMCA/ICdyZXZlcnNlJyA6ICdub3JtYWwnXG4gICAgICAgICAgZmxvYXRpbmcucHVzaChgYW5pbWF0aW9uOiBmbG9hdGluZyAke3RpbWV9cyBlYXNlIDJzIGluZmluaXRlICR7ZGlyfTtgKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBmbG9hdGluZ1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqIOe7hOS7tueahOaWueazleWIl+ihqCAqL1xuICBtZXRob2RzOiB7XG4gICAgLyoqIOi/m+WFpeWSjOmAgOWHuueahOe8k+WKqOWKqOeUuyAqL1xuICAgIHNldEZyYW1lKCkgeyB9LFxuICAgIC8qKiDpobXpnaLov5vlhaUgKi9cbiAgICBzZXRFbnRlcigpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGFuaW1zOiB0aGlzLmRhdGEuYW5pbXNOYW1lc1xuICAgICAgfSlcbiAgICB9LFxuICAgIC8qKiDpobXpnaLpgIDlh7ogKi9cbiAgICBzZXRFeGl0KCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYW5pbXM6IFtdXG4gICAgICB9KVxuICAgIH0sXG4gICAgLyoqIOiuoeeul2NvbnRlbnRz5a+55bqU5Yqo55S757G75ZCNICovXG4gICAgZ2V0QW5pbU5hbWVzKCkge1xuICAgICAgY29uc3QgY29udGVudHMgPSB0aGlzLmRhdGEuY29udGVudHNcbiAgICAgIGxldCBhbmltc05hbWVzOiBBcnJheTxzdHJpbmc+ID0gW11cbiAgICAgIGxldCBsZWZ0TnVtID0gMFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgeyBhbmltIH0gPSBjb250ZW50c1tpXVxuICAgICAgICBpZiAoK2FuaW0gPT09IDEpIHtcbiAgICAgICAgICBsZWZ0TnVtKytcbiAgICAgICAgICBhbmltc05hbWVzW2ldID0gbGVmdE51bSAlIDIgPT09IDAgPyAnYW5pbS0xLWxlZnQnIDogJ2FuaW0tMS1yaWdodCdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBhbmltc05hbWVzW2ldID0gJ2FuaW0tMidcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zZXREYXRhKHsgYW5pbXNOYW1lcyB9KVxuICAgIH1cbiAgfVxuXG59KVxuIl19
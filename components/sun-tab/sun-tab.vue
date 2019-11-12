<template>
	<view :class="{'uni-scroll-tab': scroll === true }" class="uni-tab">
		<view v-for="(tab,index) in tabList" :key="index" :class="{ 'uni-tab-active': index === value, 'uni-tab-scroll-item': scroll === true, ' uni-tab-scroll-active': index === value && scroll === true }"
		 :style="[{color:index === value ? activeColor : defaultColor,backgroundColor: bgColor}]" @tap="itemClick(index,tab)"
		 class="uni-tab-item">
			<span v-if="tab.icon != undefined" class="iconfont mr5" :class="tab.icon"></span>
			<text style="display: inline-block;line-height: 72rpx;boder:4rpx solid red !important" :class="{' uni-tab-text-active': index === value && scroll === true }">{{rangeKey == '' ? tab : tab[rangeKey]}}</text>
		</view>
		<view v-if="!scroll" :style="[{ right: barRight + '%', left : barLeft + '%', borderColor: activeColor }]" class="uni-tab-bar"
		 :class="back ? 'uni-tab-bar-backward' : 'uni-tab-bar-forward'"></view>
	</view>
</template>
<script>
	export default {
		name: 'uni-tab',
		data() {
			return {
				average: 0,
				back: false
			};
		},
		props: {
			value: {
				type: Number, //当前选中下标
				default () {
					return 0;
				}
			},
			tabList: {
				type: Array,
				default () {
					return [];
				}
			},
			bgColor: { //背景颜色
				type: String,
				default () {
					return '#FFFFFF';
				}
			},
			defaultColor: { //默认未选中文字颜色
				type: String,
				default () {
					return '#000000';
				}
			},
			activeColor: { //选中时文字颜色 线条颜色
				type: String,
				default () {
					return '#1e9fff';
				}
			},
			rangeKey: { // 当tabList为对象时 显示指定下标值
				type: String,
				default () {
					return '';
				}
			},
			scroll: { //横向滑动
				type: Boolean,
				default () {
					return false;
				}
			},
		},
		computed: {
			barLeft() {
				return this.value * this.average;
			},
			barRight() {
				let index = this.tabList.length - this.value - 1;
				return index * this.average;
			},
		},
		created() {
			this.average = 100 / this.tabList.length;
		},
		methods: {
			itemClick(index, tab) {
				if (this.value == index) return false;
				if (this.value > index) {
					this.back = true;
				} else {
					this.back = false;
				}
				// this.value = index;
				this.$emit('update:value', index);
				this.$emit('change', {
					tab: tab
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.uni-tab {
		position: relative;
		display: flex;
		font-size: 28rpx;
		height: 80rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #E5E5E5;
		.uni-tab-item {
			flex: 1;
			height: 100%;
			text-align: center;
			box-sizing: border-box;
			overflow: hidden;
		}

		.uni-tab-scroll-item {
			flex: none;
			margin: 0px 12px;
		}

		.uni-tab-active {
			color: #1e9fff;
		}

		.uni-tab-scroll-active {
			border-bottom: 4rpx solid #006CB7;
		}

		.uni-tab-bar {
			display: block;
			height: 3px;
			position: absolute;
			bottom: 0;
			border-bottom: 3px solid #1e9fff;
		}

		.uni-tab-bar-forward {
			transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;
		}

		.uni-tab-bar-backward {
			transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);
		}
	}

	.uni-scroll-tab {
		overflow-x: scroll;
	}
	.uni-scroll-tab::-webkit-scrollbar {
    display: none;
}
</style>

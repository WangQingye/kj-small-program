<template>
	<view class="content">
		<view class="head">
			<image class="bg" src="/static/1.png"></image>
			<view class="text-area">
				<text class="title">{{title}}\n</text>
				<text class="subscribe">已有 238472 订阅</text>
				<image class="cover-img" src="/static/2.jpg"></image>
				<view class="buttons">
					<button class="button-1" type="default" plain="true">开始阅读</button>
					<button class="button-1 button-2" type="default" plain="true" hover-class="button-2-hover" @click="goUserRank">读者排行榜</button>
				</view>
			</view>
		</view>
		<view class="main">
			<wuc-tab :tab-list="tabList" :tabCur.sync="tabCur" @change="tabChange" tab-class="tab" select-class="tab-select"></wuc-tab>
			<view class="magazines" v-if="tabCur == 0">
				<magazine v-for="(item,index) in magazines" :key="index"></magazine>
			</view>
			<view class="readcodes" v-if="tabCur == 2">
				<read-code-item v-for="(item,index) in readCodes" :key="index"></read-code-item>
			</view>
			<load-more :status="status"></load-more>
		</view>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import Magazine from '@/components/magazine.vue';
	import ReadCodeItem from '@/components/read-code-item.vue';
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				title: '肖战-多面棱角蜕变锋芒',
				tabList: [{
						name: '全部杂志'
					},
					{
						name: '我的杂志'
					},
					{
						name: '阅读码'
					}
				],
				tabCur: 2,
				magazines: 6,
				status: 'more',
				readCodes: 6
			}
		},
		onLoad() {

		},
		onReachBottom() {
			console.log(444);
			this.getMagList();
		},
		methods: {
			tabChange(index) {
				console.log(index)
				this.tabCur = index;
			},
			getMagList() {
				this.status = 'loading';
				setTimeout(() => {
					this.status = 'more';
					this.magazines += 6;
				}, 1000)
			},
			goUserRank() {
				uni.navigateTo({
				    url: '/pages/userrank/userrank?id=1&name=uniapp'
				});
			}
		},
		components: {
			WucTab,
			Magazine,
			LoadMore,
			ReadCodeItem
		},
	}
</script>

<style lang="scss">
	.content {
		background: #F0F3F5;
	}

	.head {
		padding-bottom: 60rpx;
		background: white;

		.bg {
			position: absolute;
			top: 0;
			height: 589rpx;
			width: 750rpx;
			z-index: 0;
		}

		.text-area {
			margin-top: 60rpx;
			padding: 0 30rpx;
			position: relative;
			z-index: 1;

			.title {
				font-size: 46rpx;
				color: white;
			}

			.subscribe {
				font-size: 23rpx;
				color: #cccccc;
			}

			.cover-img {
				width: 670rpx;
				height: 860rpx;
				display: block;
				margin: 0 auto;
				margin-top: 50rpx;
			}

			.buttons {
				display: flex;
				justify-content: space-around;
				margin-top: 40rpx;

				.button-2 {
					color: white;
					background: black;
				}

				.button-2-hover {
					color: #C8C7CC
				}
			}
		}
	}

	.main {
		background: white;
		margin-top: 20rpx;
		padding: 0 30rpx;

		.tab {
			text-align: center;
			color: #666666;
			font-size: 28rpx;
			height: 100rpx;

			.wuc-tab-item {
				margin: 0 40rpx;
				font-weight: bold;
			}
		}

		.tab-select {
			color: black;
		}

		.main-scoll {
			height: 500rpx;

			::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
			}
		}

		.magazines {
			border-top: 1rpx solid rgba(230, 230, 230, 1);
			padding-top: 30rpx;
			margin-top: -10rpx;
			width: 690rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}

		.readcodes {
			border-top: 1rpx solid rgba(230, 230, 230, 1);
			padding-top: 30rpx;
			margin-top: -10rpx;
			width: 690rpx;
		}
	}

	.button-1 {
		width: 320rpx;
		height: 80rpx;
		border: 2rpx solid rgba(0, 0, 0, 1);
		text-align: center;
		line-height: 80rpx;
		font-size: 30rpx;
		border-radius: 0;
	}
</style>

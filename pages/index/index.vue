<template>
	<view class="index-content">
		<view class="search-input">
			<search-input />
		</view>
		<view class="swiper-warpper">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" indicator-color='rgb(139,187,218)'
			 indicator-active-color='#006CB7'>
				<swiper-item v-for="(item,index) in 3" :key="index">
					<image class="swiper-img" src="../../static/banner.png" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="swiper-text">
				<view class="swiper-text-item">
					<view class="swiper-text-item-dot"></view>
					全球一流品种保障
				</view>
				<view class="swiper-text-item">
					<view class="swiper-text-item-dot"></view>
					专业完善服务团队
				</view>
				<view class="swiper-text-item">
					<view class="swiper-text-item-dot"></view>
					便捷订购流程支持
				</view>
			</view>
		</view>
		<view class="main-content">
			<scroll-view class="main-type main-scroll" scroll-x="true">
				<view class="type-item" v-for="(item,index) in 12" :key="index">
					<image class="type-img" src="../../static/b10.png" mode="aspectFill"></image>
					<text class="type-text">样本制备</text>
				</view>
			</scroll-view>
			<view class="star-goods">
				<view class="star-title">明星商品</view>
				<scroll-view class="main-scroll" scroll-x="true">
					<good-item class="item" style="display:inline-block;margin-right: 30rpx;" v-for="(item,index) in starItems" :key="index"
					 :goodData="item" :type="2"></good-item>
				</scroll-view>
			</view>
			<view class="flash-sell">
				<view class="flash-item" v-for="(item,index) in 1" :key="index">
					<image src="../../static/qiangou.png" mode="aspectFill" class="item-img"></image>
					<view class="flash-count">
						<text class="count-title">限时抢购</text>
						<text class="count-time"><text class="count-time-1">14</text>:<text class="count-time-1">22</text>:<text class="count-time-1">11</text></text>
						<text class="count-num">剩余199件</text>
					</view>
				</view>
			</view>
			<image src="../../static/jifen.png" mode="aspectFill" style="width: 702rpx;height: 160rpx;margin-bottom: 20rpx;"></image>
			<view class="activity">
				<view class="activity-item" v-for="(item,index) in 2" :key="index">
					<view class="activity-ad" @click="clickActivity">
						<image class="activity-bg" src="../../static/cuxiao.png" mode="aspectFill"></image>
						<image class="activity-frame" src="../../static/cuxiaok.png" mode="aspectFill"></image>
						<text class="activity-title">夏季促销双重礼</text>
					</view>
					<scroll-view class="main-scroll" scroll-x="true">
						<good-item class="item" style="display:inline-block;margin-right: 30rpx;" v-for="(goodItem,goodIndex) in starItems"
						 :key="goodIndex" :goodData="goodItem" :type="2"></good-item>
					</scroll-view>
				</view>
			</view>
			<view class="recommend">
				<view class="title">推荐商品</view>
				<good-item class="item" v-for="(item,index) in recommendItems" :key="index" :goodData="item"></good-item>
			</view>
			<load-more :status="status"></load-more>
		</view>
	</view>
</template>

<script>
	import {
		SearchInput
	} from "@/components/search-input.vue";
	import GoodItem from "@/components/good-item.vue";
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				starItems: [],
				recommendItems: [],
				recommendPage: 1,
				status: 'more'
			}
		},
		onLoad() {
			this.getStarGoods();
			this.getRecomGoods(1);
		},
		onPullDownRefresh() {
			this.getStarGoods();
			this.getRecomGoods(1);
		},
		onShow() {
			uni.showTabBar();
		},
		onReachBottom() {
			if (this.status == 'more') {
				this.recommendPage++;
				this.getRecomGoods(this.recommendPage);
			}
		},
		methods: {
			async getStarGoods() {
				let res = await this.myRequest('/api/goods/starGoods', {
					page: 1,
					per_page: 20
				}, 'GET', false);
				if (res.data.data.length) {
					this.starItems = res.data.data
				}
			},
			async getRecomGoods(page) {
				if (page != 1) {
					this.status = 'loading';
				}
				let res = await this.myRequest('/api/goods/newestGoods', {
					page: page,
					per_page: 8
				}, 'GET', false);
				if (res.data.data.length) {
					this.recommendItems = this.recommendItems.concat(res.data.data);
					if (res.data.data.length < 8) {
						this.status = 'noMore'
					} else {
						this.status = 'more'
					}
				}
			},
			clickActivity() {
				uni.navigateTo({
					url: `/pages/good/good-activity/good-activity`
				});
			}
		},
		components: {
			SearchInput,
			GoodItem,
			LoadMore
		}
	}
</script>

<style lang="scss">
	.index-content {
		background: #F6F6F6;

		.search-input {
			background: white;
			padding-bottom: 20rpx;
		}

		.swiper-warpper {
			margin-top: -20rpx;
			background: white;
			padding-bottom: 28rpx;

			.swiper {
				margin-top: 20rpx;
				width: 100%;
				height: 400rpx;

				.swiper-img {
					width: 100%;
				}
			}

			.swiper-text {
				display: flex;
				justify-content: space-around;
				margin-top: 28rpx;

				.swiper-text-item {
					font-size: 24rpx;

					.swiper-text-item-dot {
						width: 8rpx;
						height: 8rpx;
						background: #006CB7;
						border-radius: 50%;
						display: inline-block;
						vertical-align: middle;
						margin-right: 8rpx;
					}
				}
			}
		}

		.main-content {
			background: white;
			margin-top: 20rpx;
			padding: 40rpx 24rpx;
			color: #47443F;

			.main-scroll {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				white-space: nowrap;
			}

			.main-type {
				.type-item {
					display: inline-block;
					margin-right: 45rpx;

					.type-img {
						width: 80rpx;
						height: 80rpx;
						display: block;
						margin: 0 auto;
						margin-bottom: -5rpx;
					}

					.type-text {
						font-size: 28rpx;
					}
				}
			}

			.star-goods {
				margin-top: 55rpx;

				.star-title {
					width: 676rpx;
					height: 88rpx;
					line-height: 88rpx;
					font-weight: bold;
					background: #E5EFF9;
					font-size: 32rpx;
					border-radius: 10rpx;
					padding-left: 26rpx;
					margin-bottom: 20rpx;
				}
			}

			.flash-sell {
				margin-top: 68rpx;

				.flash-item {
					width: 702rpx;
					height: 280rpx;
					position: relative;
					margin-bottom: 20rpx;

					.item-img {
						position: absolute;
						z-index: 1;
						top: 0;
						left: 0;
						width: 702rpx;
						height: 280rpx;
					}

					.flash-count {
						position: absolute;
						z-index: 2;
						width: 200rpx;
						height: 200rpx;
						border-radius: 50%;
						background: #ED193A;
						left: 30rpx;
						top: 40rpx;

						.count-title {
							font-size: 28rpx;
							color: white;
							display: block;
							font-weight: bold;
							margin-top: 32rpx;
							margin-left: 46rpx;
						}

						.count-time {
							font-size: 24rpx;
							display: block;
							text-align: center;
							color: white;
							margin-top: 12rpx;

							.count-time-1 {
								display: inline-block;
								width: 40rpx;
								height: 40rpx;
								border-radius: 6rpx;
								background: white;
								color: #ED193A;
								text-align: center;
								line-height: 40rpx;
							}
						}

						.count-num {
							display: inline-block;
							color: white;
							font-size: 20rpx;
							margin-top: 10rpx;
							text-align: center;
							width: 100%;
						}

					}
				}
			}

			.activity {
				.activity-item {
					margin-bottom: 68rpx;

					.activity-ad {
						width: 702rpx;
						height: 160rpx;
						background: #F5F7FA;
						position: relative;
						margin-bottom: 20rpx;

						.activity-bg {
							width: 390rpx;
							height: 160rpx;
						}

						.activity-frame {
							width: 340rpx;
							height: 120rpx;
							margin-top: 20rpx;
							margin-left: -90rpx;
							vertical-align: top;
						}

						.activity-title {
							position: absolute;
							display: block;
							font-size: 36rpx;
							color: #006CB7;
							right: 30rpx;
							top: 54rpx;
						}
					}
				}
			}

			.recommend {
				.title {
					color: #47443F;
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 28rpx;
				}

				.item {
					display: inline-block;
					margin-bottom: 40rpx;
				}

				.item:nth-child(even) {
					margin-right: 30rpx;
				}
			}
		}
	}
</style>

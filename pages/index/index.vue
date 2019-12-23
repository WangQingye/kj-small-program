<template>
	<view class="index-content" v-if="!this.$store.state.needGoOrder">
		<view class="search-input">
			<search-input />
		</view>
		<view class="swiper-warpper">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" indicator-color='rgb(139,187,218)'
			 indicator-active-color='#006CB7'>
				<swiper-item v-for="(item,index) in banners" :key="index">
					<image class="swiper-img" :src="item.pic" mode="aspectFill" @click="clickBanner(item)"></image>
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
			<scroll-view class="main-type main-scroll" scroll-x="true" v-if="recomTypes.length">
				<view class="type-item" v-for="(item,index) in recomTypes" :key="index" @click="clickRecomType(item.id)">
					<image class="type-img" :src="item.cover_pic" mode="aspectFill"></image>
					<text class="type-text">{{item.title}}</text>
				</view>
			</scroll-view>
			<view class="star-goods" v-if="starItems.length">
				<view class="star-title">明星商品</view>
				<scroll-view class="main-scroll" scroll-x="true">
					<good-item class="item" style="display:inline-block;margin-right: 30rpx;" v-for="(item,index) in starItems" :key="index"
					 :goodData="item" :type="2"></good-item>
				</scroll-view>
			</view>
			<view class="flash-sell" v-if="seckillInfo.length">
				<view class="flash-item" v-for="(item,index) in seckillInfo" :key="index" @click="goGoodDesc(item)">
					<image :src="item.cover_pic" mode="aspectFill" class="item-img"></image>
					<view class="flash-count">
						<text class="count-title">限时抢购</text>
						<!-- <text class="count-time"><text class="count-time-1">14</text>:<text citemlass="count-time-1">22</text>:<text class="count-time-1">11</text></text> -->
						<uni-Countdown
							color="#ED193A" 
							background-color="#FFF" 
							border-color="#ED193A" 
							:show-day="true"
							:day="item.d"
							:hour="item.h" 
							:minute="item.m" 
							:second="item.s" :reset="true"
							class="countDown"
						></uni-Countdown>
						<text class="count-num">剩余{{item.surplus_num}}件</text>
					</view>
				</view>
			</view>
			<image src="../../static/jifen.png" @click="clickScoreMall" mode="aspectFill" style="width: 702rpx;height: 160rpx;margin-bottom: 20rpx;"></image>
			<view class="activity">
				<view class="activity-item" v-for="(item,index) in activities" :key="index">
					<view class="activity-ad" @click="clickActivity(item)">
						<image class="activity-bg" :src="item.cover_pic" mode="aspectFill"></image>
						<image class="activity-frame" src="../../static/cuxiaok.png" mode="aspectFill"></image>
						<text class="activity-title">{{item.title}}</text>
					</view>
					<scroll-view class="main-scroll" scroll-x="true">
						<good-item class="item" style="display:inline-block;margin-right: 30rpx;" v-for="(goodItem,goodIndex) in item.type_goods_join"
						 :key="goodIndex" :goodData="goodItem.goods_join" :type="2"></good-item>
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
	import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue"
	import GoodItem from "@/components/good-item.vue";
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				starItems: [],
				recommendItems: [],
				recommendPage: 1,
				status: 'more',
				banners: [],
				recomTypes: [],
				activities: [],
				seckillInfo:[],//秒杀商品信息
				seckillTime:{
					d:'',
					h:'',
					m:'',
					s:''
				}
			}
		},
		onLoad() {
			this.getBanner();
			this.getRecomTypes();
			this.getStarGoods();
			this.getActivities();
			this.getSeckill();
			this.getRecomGoods(1);
		},
		onPullDownRefresh() {
			this.getBanner();
			this.getSeckill();
			this.getRecomTypes();
			this.getStarGoods();
			this.getActivities();
			this.getRecomGoods(1);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
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
			async getBanner() {
				let res = await this.myRequest('/api/home/banner-list', {}, 'GET', false, false);
				if (res.data) {
					this.banners = res.data
				}
			},
			async getRecomTypes() {
				let res = await this.myRequest('/api/home/recommendType', {
					page: 1,
					per_page: 1000
				}, 'GET', false, false);
				if (res.data.data) {
					this.recomTypes = res.data.data
				}
			},
			async getStarGoods() {
				let res = await this.myRequest('/api/goods/starGoods', {
					page: 1,
					per_page: 20
				}, 'GET', false);
				if (res.data.data.length) {
					this.starItems = res.data.data
				}
			},
			async getActivities() {
				let res = await this.myRequest('/api/home/activity', {}, 'GET', false, false);
				if (res.data) {
					this.activities = res.data
				}
			},
			async getRecomGoods(page) {
				if (page != 1) {
					this.status = 'loading';
				} else {
					this.recommendItems = [];
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
			async getSeckill() { //获取秒杀数据	
				let res = await this.myRequest('/api/home/seckill', {}, 'GET', false, false);
				if (res.message == "success") {
					
					this.seckillInfo = res.data.map(item=>{
						item.stop_time = item.stop_time *1000;
						item.d = new Date(item.stop_time).getDate() -new Date().getDate()
						item.h = new Date(item.stop_time).getHours()-new Date().getHours()
						item.m = new Date(item.stop_time).getMinutes()-new Date().getMinutes()
						item.s = new Date(item.stop_time).getSeconds()-new Date().getSeconds()
						return item;
					})
				}
			},
			
			clickBanner(data) {
				switch (data.type) {
					case 1:
						break;
					case 2:
						uni.navigateTo({
							url: `/pages/good/good-desc/good-desc?goodId=${data.goods_id}`
						});
						break;
					case 3:
						uni.navigateTo({
							url: `/pages/good/good-activity/good-activity?activityId=${data.activity_id}`
						});
						break;
					case 4:
						break;
				}
			},
			clickRecomType(id) {

			},
			goGoodDesc(item) {
				let goodId = item.goods_id
				uni.navigateTo({
					url: `/pages/good/good-desc/good-desc?goodId=${goodId}&seckillId=${item.id}`
				});
			},
			clickScoreMall() {
				uni.navigateTo({
					url: `/pages/score/score-mall/score-mall`
				});				
			},
			clickActivity(item) {
				uni.navigateTo({
					url: `/pages/good/good-activity/good-activity?activityId=${item.id}&activityImg=${item.cover_pic}`
				});
			}
		},
		components: {
			SearchInput,
			GoodItem,
			LoadMore,
			uniCountdown
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
						width: 240rpx;
						height: 240rpx;
						border-radius: 50%;
						background: #ED193A;
						left: 30rpx;
						top: 20rpx;
						text-align: center;;
						.count-title {
							font-size: 28rpx;
							color: white;
							display: block;
							font-weight: bold;
							margin-top: 32rpx;
							margin-bottom: 20rpx;;
							
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
							font-size: 24rpx;
							margin-top: 20rpx;
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
	.uni-countdown__number {
		margin:0 !important ;
		padding:0 5rpx !important;
	}
		
</style>

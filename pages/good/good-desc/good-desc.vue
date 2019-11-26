<template>
	<view class="good-desc" v-if="JSON.stringify(listData) !='{}'">
		<view class="body" >
			<!-- 轮播 -->
			<view class="carousel">
				<swiper circular=true duration="400" class="carousel-box" @change="swiperChange">
					<swiper-item class="swiper-item" v-for="(item,index) in listData.pic_join" :key="index">
						<view class="image-wrapper">
							<image :src="item.pic" class="w100"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="pages">
					<text>{{swiperCurrent + 1}}&nbsp; </text>/
					<text>&nbsp; {{swiperLength}}</text>
				</view>
			</view>
			<!-- 价格详情 -->
			<view class="goods-price">
				<view class="t1">
					{{listData.title}}
				</view>
				<view class="t2">
					{{listData.depict}}
				</view>
				<!-- <view class="t3">
					<text>货号：</text>
					<text>DP362-01</text>
				</view> -->
				<view class="t4">
					<view class="price">
						<text>￥</text>
						<text class="num">{{listData.show_price}}</text>
						<text>起</text>
					</view>
					<view class="person">
						<text>{{listData.sales}}</text>
						<text>人购买</text>
					</view>
				</view>
			</view>
			<!-- 选择规格 -->
			<view class="gg" @click="openMc('choose')">
				<text>选择规格</text>
				<image src="/static/c/c30gg.png" mode="" class="toRight"></image>
			</view>
			<!-- 奖励商品 -->
			<view class="goods" v-if="listData.gift_join.length > 0">
				<view class="g-t">
					奖励商品
				</view>
				<view class="goods-box">
					<scroll-view class="s-box" scroll-x="true">
						<view class="s-item" v-for="(item,key) in listData.gift_join" :key="key">
							<view class="s-imgbox">
								<image :src="item.cover_pic" mode="" class="s-img"></image>
							</view>
							<view class="s-p">
								{{item.title}}
							</view>
						</view>

					</scroll-view>
				</view>


			</view>
			<view class="goods-details">
				<view class="goodsDetails-title">
					商品详情
				</view>
				<rich-text :nodes="listData.content">
				</rich-text>
			</view>
		</view>
		<view class="footer">
			<view class="f-l">
				<navigator url="/pages/car/good-car/good-car" open-type="switchTab" class="p-b-btn">
					<image src="/static/c/c30gwc.png" class="p-b-car"></image>
					<text>购物车</text>
				</navigator>
				<view class="p-b-btn">
					<image class="p-b-zx" src="/static/c/c30zx.png" mode=""></image>
					<text>咨询</text>
				</view>
				<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
					<image class="p-b-zx" src="/static/c/c30sc.png" mode=""></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="f-r">
				<view class="addCar" @click="openMc('shopCar')">{{'加入购物车'}}</view>
				<view class="order" @click="openMc('order')">{{'预约下单'}}</view>
			</view>
		</view>
		<login-page :showFlag="showLoginPage" v-if="showLoginPage" @login-over="loginOver"></login-page>
		<uniPopup ref="buyCode" type="bottom" class="buy-wrapper">
			<specification :listData="listData" :type="type" @closeWin="closeWin" v-if="showTc"></specification>
		</uniPopup>
		
	</view>
</template>

<script>
	import LoginPage from '@/components/login-page.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import specification from '@/components/specification.vue'
	export default {
		components: {
			uniPopup,
			specification,
			LoginPage
		},
		data() {
			return {
				listData: {},
				swiperCurrent: 0,
				swiperLength: 0,
				goodId: 0,
				showTc: false,
				showLoginPage:false,
				type:''
			};
		},
		onLoad(option) {
			this.goodId = option.goodId;
			
		},
		onShow () {
			this.getList();
		},
		methods: {
			async getList() {
				let res = await this.myRequest('/api/goods/show', {
					goods_id: this.goodId
				}, 'GET', false);
				if (res.message == "success") {
					if (res.data.content) res.data.content = res.data.content.replace(/\<img/gi,
						"<img class='rich-text-img'");
					this.listData = { ...res.data};
					this.swiperLength = this.listData.pic_join.length;
				}

			},
			swiperChange(e) { //获取swiper Index
				this.swiperCurrent = e.detail.current;
			},
			openMc(item) {
				if(this.$store.state.userToken.api_token == "" && item != "choose"){
					this.showLoginPage = true;
					return
				}
				this.type = item;
				this.showTc = true;
				this.$refs['buyCode'].open()
			},
			closeWin() {
				this.showTc = false;
				this.$refs['buyCode'].close()
			},
			loginOver(err) {
				console.log(err)
				// 自动登录失败，显示登录框
				if (err === 1) {
					uni.hideTabBar();
					this.showLoginPage = true;
					return;
				}
				// 登录失败返回首页
				if (err) {
					uni.switchTab({
						url: '/pages/index/index'
					});
					return;
				}
				// if (this.$store.state.userToken.api_token) {
				// 	this.getUserInfo();
				// }
				this.showLoginPage = false;
				// uni.showTabBar();
			},
		},
		onPullDownRefresh: function() { //下拉刷新
			this.getList();
			setTimeout(function () {
			    uni.stopPullDownRefresh();
			}, 500);
		}
	}
</script>

<style lang="scss">
	.rich-text-img {
		max-width: 100%;
	}
	.good-desc {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.body {
			flex: 1;
			width: 100%;
			background: #eee;
			overflow: auto;

			.carousel {
				width: 100%;
				height: 425rpx;
				position: relative;

				.carousel-box {
					height: 100%;

					.swiper-item {
						width: 100%;
						height: 100%;

						.w100 {
							width: 100%;
						}
					}
				}

				.pages {
					position: absolute;
					right: 20rpx;
					bottom: 20rpx;
					width: 70rpx;
					height: 32rpx;
					border-radius: 16rpx;
					background: rgba(0, 0, 0, 0.6);
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					font-size: 24rpx;
					text-align: center;
					line-height: 32rpx;
				}

			}

			.goods-price {
				width: 100%;
				padding: 30rpx;
				box-sizing: border-box;
				;
				background-color: #fff;
				margin-bottom: 20rpx;
				;

				.t1 {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					line-height: 40rpx;
					margin-bottom: 20rpx;
					;
				}

				.t2 {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					margin-bottom: 20rpx;
					;
				}

				.t3 {
					padding: 8rpx 28rpx;
					box-sizing: border-box;
					background: rgba(246, 246, 246, 1);
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					display: inline-block;
					margin-bottom: 30rpx;
					;
				}

				.t4 {
					width: 100%;
					display: flex;
					;
					justify-content: space-between;
					align-items: center;
					;

					.price {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(237, 25, 58, 1);

						.num {
							font-size: 40rpx;
						}
					}

					.person {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}
				}
			}

			.gg {
				display: flex;
				width: 100%;
				height: 96rpx;
				background-color: #fff;
				align-items: center;
				padding: 0 30rpx;
				box-sizing: border-box;
				justify-content: space-between;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				margin-bottom: 20rpx;
				;

				.toRight {
					width: 16rpx;
					height: 26rpx;
				}
			}

			.goods {
				width: 100%;
				height: 202rpx;
				padding: 20rpx 0rpx;
				box-sizing: border-box;
				;
				background-color: #FFFFFF;
				display: flex;
				margin-bottom: 20rpx;
				;

				.g-t {
					width: 180rpx;
					height: 100%;
					display: flex;
					align-items: center;
					padding-left: 30rpx;
					box-sizing: border-box;
					padding-bottom: 82rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.goods-box {
					flex: 1;
					height: 100%;
					overflow: hidden;

					.s-box {
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;
						white-space: nowrap;

						.s-item {
							width: 120rpx;
							height: 100%;
							margin-right: 60rpx;
							;
							box-sizing: border-box;
							display: inline-block;

							.s-imgbox {
								width: 100%;
								height: 120rpx;
								// background-color: #F6F6F6;
								// padding:20rpx 15rpx;
								box-sizing: border-box;
								margin-bottom: 10rpx;

								.s-img {
									width: 100%;
									height: 100%;

								}
							}

							.s-p {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								text-align: center;
								color: rgba(51, 51, 51, 1);
							}
						}
					}
				}
			}

			.goods-details {
				width: 100%;
				padding: 0 30rpx;
				// overflow: hidden;
				box-sizing: border-box;
				background: #fff;

				.goodsDetails-title {
					width: 100%;
					height: 96rpx;
					border-bottom: 1rpx solid #E6E6E6;
					box-sizing: border-box;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 96rpx;
					margin-bottom: 27rpx;
				}

			}
		}

		.footer {
			width: 100%;
			height: 96rpx;
			display: flex;

			.f-l {
				width: 350rpx;
				height: 100%;
				padding: 14rpx 0 8rpx 35rpx;
				box-sizing: border-box;
				;
				display: flex;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);

				.p-b-btn {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					width: 70rpx;
					height: 100%;
					margin-right: 30rpx;
					;

					.p-b-car {
						width: 42rpx;
						height: 38rpx;
					}

					.p-b-zx {
						width: 40rpx;
						height: 40rpx;
						;
					}
				}
			}

			.f-r {
				width: 400rpx;
				height: 100%;
				display: flex;

				.addCar {
					width: 50%;
					height: 100%;
					text-align: center;
					line-height: 96rpx;
					;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					background: rgba(237, 25, 58, 1);
				}

				.order {
					width: 50%;
					height: 100%;
					text-align: center;
					line-height: 96rpx;
					;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					background: rgba(0, 108, 183, 1);
				}
			}

		}

	}
</style>

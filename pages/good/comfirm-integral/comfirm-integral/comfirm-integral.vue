<template>
	<view class="main">
		<view class="body">
			<view class="add-address" @click="goAddressEdit">
				<view class="h-person" v-if="address">{{address.addressee + ' ' + address.mobile}}
				</view>
				<view class="h-address" v-if="address">{{address.area_join.city_join.zh_name + address.area_join.zh_name + address.site}}</view>
				<view class="full" v-if="!address">
					请填写收货地址
				</view>

			</view>
			<view class="goods-box">
				<view class="goods-item">
					<view class="goods-content">
						<view class="goods-imgbox">
							<image class="w100" :src="goodData.cover_pic"></image>
						</view>
						<view class="goods-dis">
							<view class="g1">
								{{goodData.title}}
							</view>
							<!--              <view class="g2">
                干血斑;DP362-01
              </view> -->
							<view class="g3">
								<text class="gx-p">{{goodData.need_integral}}积分</text>
								<!-- <text class="gy-p" v-show="tabIndex == 0">￥1999</text> -->
							</view>
							<!-- <view class="logistics" v-show="tabIndex == 1">
									物流信息:1543265486545
								</view> -->

						</view>
					</view>
					<text class="num"> x2</text>
				</view>

			</view>
			<view class="xiye">
				<view @click="isWatch = !isWatch" style="display: flex;align-items: center;height: 100%;">
					<van-checkbox :value="isWatch" style="margin-right: 20rpx;"></van-checkbox><text>我已阅读并同意</text><text style="color:#006CB7"
					 @click="goArgreeMent">《用户协议》</text>
				</view>
			</view>
		</view>
		<view class="footer" @click="comfirmOrder">
			{{Ftitle}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Ftitle: "确认预订",
				address: null,
				isWatch: false,
				goodData: null
			};
		},
		onShow() {
			this.goodData = this.$store.state.scoreGood;
			this.getScoreAddress();
		},
		methods: {
			async getScoreAddress() {
				let res = await this.myRequest("/api/integral/address", {}, "GET", true);
				console.log(res);
				if (res.data.addressee) {
					this.$store.commit("saveScoreAddress", res.data);
					this.address = res.data;
				}
			},
			goAddressEdit() {
				uni.navigateTo({
					url: `/pages/my/add-address/add-address?isScore=${true}`
				});
			},
			goArgreeMent() {
				uni.navigateTo({
					url: `/pages/score/score-desc/score-desc?singlePageId=1`
				});
			},
			async comfirmOrder() {
				if (!this.isWatch) {
					this.myToast('请勾选用户协议');
					return;
				}
				let res = await this.myRequest("/api/integral/exchange", {
					user_address_id: this.address.id,
					integral_goods_id: this.goodData.id
				}, "POST", true);
				if (res.message == 'success') {
					this.myToast('兑换成功', 1000, () => {
						uni.navigateTo({
							url: `/pages/my/my-order/my-order/my-order?orderList=2`
						})
					})
				} else {
					this.myToast(res.message)
				}
			}
		}
	};
</script>

<style lang="scss">
	.main {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: #eee;

		.body {
			width: 100%;
			flex: 1;
			overflow: auto;

			.add-address {
				width: 100%;
				height: 163rpx;
				background: #fff;
				padding: 0 46rpx 0 30rpx;
				box-sizing: border-box;
				position: relative;
				margin-bottom: 20rpx;

				&:before {
					content: "";
					width: 16rpx;
					height: 25rpx;
					background: url(../../../../static/c/c30gg.png) no-repeat;
					background-size: cover;
					position: absolute;
					top: 0;
					bottom: 0;
					right: 30rpx;
					margin: auto;
				}

				.full {
					width: 100%;
					height: 100%;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
					line-height: 163rpx;
				}

				.h-person {
					margin-bottom: 29rpx;
					line-height: 1;
					padding-top: 39rpx;
				}

				.h-address {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
			}

			.goods-box {
				width: 100%;
				background: #fff;
				margin-bottom: 30rpx;
				padding: 0 30rpx;
				box-sizing: border-box;

				.goods-item {
					width: 100%;
					padding: 30rpx 0;
					min-height: 210rpx;
					box-sizing: border-box;
					display: flex;
					background: #fff;
					position: relative;
					border-bottom: 1rpx solid #e6e6e6;

					&:last-child {
						border-bottom: 0;
					}

					.goods-content {
						flex: 1;
						display: flex;

						.goods-imgbox {
							width: 240rpx;
							height: 135rpx;
							// background:red;
							margin-right: 20rpx;

							.w100 {
								width: 100%;
								height: 100%;
							}
						}

						.goods-dis {
							flex: 1;

							.g1 {
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(51, 51, 51, 1);
								line-height: 38rpx;
								margin-bottom: 10rpx;
							}

							.g2 {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(153, 153, 153, 1);
								line-height: 44rpx;
								margin-bottom: 10rpx;
							}

							.g3 {
								.gx-p {
									font-size: 28rpx;
									font-family: PingFang SC;
									font-weight: 500;
									color: rgba(237, 25, 58, 1);
									line-height: 44rpx;
								}

								.gy-p {
									font-size: 20rpx;
									font-family: PingFang SC;
									font-weight: 400;
									text-decoration: line-through;
									color: rgba(153, 153, 153, 1);
									line-height: 44rpx;
								}
							}

							.logistics {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(153, 153, 153, 1);
								margin-top: 10rpx;
							}
						}
					}

					.num {
						position: absolute;
						right: 0rpx;
						bottom: 30rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}
				}
			}

			.xiye {
				width: 100%;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 44rpx;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
			}
		}

		.footer {
			width: 100%;
			height: 96rpx;
			text-align: center;
			line-height: 96rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			background: #006cb7;
		}
	}
</style>

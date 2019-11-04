<template>
	<view class="magazine-first" v-if="magTitle">
		<swiper class="swiper" :interval="0" :duration="500" @change="onSwiperChange">
			<swiper-item class="swiper-item" v-for="(item,index) in perviewImgs" :key="index">
				<image class="swiper-img" :src="item.pic" mode="aspectFill"></image>
				<!-- <image class="swiper-img" src="../../static/2.jpg" mode="aspectFill"></image> -->
			</swiper-item>
		</swiper>
		<view class="bottom">
			<view class="page">
				<text>{{perviewCurrent}}/{{perviewImgs.length}}</text>
			</view>
			<view class="button" v-if="isIos">
				<text v-if="isBuy == 0" @click="useReadCode">使用阅读码</text>
				<text v-else @click="goRead">开始阅读</text>
			</view>
			<view class="button" v-else>
				<text v-if="isBuy == 0" class="use" @click="useReadCode">使用阅读码</text>
				<text v-if="isBuy == 1" class="use" @click="goRead">开始阅读</text>
				<text class="buy" @click="clickBuy">购买阅读码</text>
			</view>
		</view>
		<chunLei-modal v-model="showReadcodeInput" :mData="mData" type="input" @onConfirm="onReadcodeInputConfirm" navMask>
		</chunLei-modal>
		<uni-popup ref="buyCode" type="bottom" class="buy-wrapper">
			<view class="top">
				<text class="buy-text">购买阅读码</text>
				<image src="../../static/question.png" class="buy-desc-icon" @click="showDesc"></image>
				<text class="buy-desc" @click="showDesc">购买说明\n</text>
				<text class="title">{{magTitle}}</text>
			</view>
			<view class="content">
				<text class="title">选择数量</text>
				<view class="type">
					<text :class="choosenIndex == index ? 'type-text type-text-choosen':'type-text' " v-for="(item,index) in buyTypes"
					 :key="index" @click="clickType(index)">{{item.num}}本/{{item.price}}元</text>
				</view>
				<view :class="choosenIndex == 4 ? 'ordinary-type ordinary-type-choosen':'ordinary-type'" @click.stop="clickType(4)">
					<text class="text">自定义数量：</text>
					<text @click.stop="clickOrdinary(false)" class="icon" :style="ordinaryNum == 0 ? 'background:#C0C0C0':''">-</text>
					<input class="input" type="number" v-model="ordinaryNum" />
					<text @click.stop="clickOrdinary(true)" class="icon">+</text>
				</view>
			</view>
			<view class="buy-bottom">
				<view class="button" @click="goPay">
					<text>共{{price}}元，去支付</text>
				</view>
			</view>
		</uni-popup>
		<chunLei-modal v-model="showDescModal" :mData="descData" type="default" navMask>
		</chunLei-modal>
		<login-page :showFlag="showLoginPage" @login-over="loginOver"></login-page>
	</view>
</template>

<script>
	import chunLeiModal from '@/components/chunLei-modal/chunLei-modal.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import LoginPage from '@/components/login-page.vue';
	export default {
		data() {
			return {
				showReadcodeInput: false,
				mData: {
					title: '输入阅读码',
					content: [{
						content: '',
						type: 'text',
						placeholder: '请输入阅读码'
					}, ]
				},
				descData: {
					title: '购买说明',
					content: '1. 购买成功后可直接点击查看阅读期刊内容， 或在“ 我的杂志” 列表查看；\r\n2. 电子刊为虚拟商品， 如无系统问题， 购买后不可退换；\r\n3. 每次购买成功后， 阅读码将显示在阅读码列表中；\r\n4. 一个阅读码只可以被激活一次， 未激活的阅读码可赠与好友；\r\n5. 如有其他使用问题可私信官方账号获取支持；',
					cancelText: 'cancel'
				},
				buyTypes: [],
				ordinaryNum: 0,
				choosenIndex: 0,
				showDescModal: false,
				isIos: false,
				magId: "",
				isBuy: false,
				perviewCurrent: 1,
				perviewImgs: [],
				magTitle: "",
				showLoginPage: false
			};
		},
		onLoad(option) {
			this.magId = option.magId;
			this.getMagInfo();
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					if (res.platform == 'ios') {
						that.isIos = true;
					}
				}
			})
		},
		methods: {
			async getMagInfo() {
				let res;
				if (this.$store.state.token) {
					res = await this.myRequest('/api/magazine/preview', {
						magazine_id: this.magId
					}, 'POST');
				} else {
					res = await this.myRequest('/api/magazine/preview', {
						magazine_id: this.magId
					}, 'POST', false);
				}
				if (res.error_code == 0) {
					this.isBuy = res.data.is_buy;
					this.perviewImgs = res.data.preview_join;
					this.magTitle = res.data.title;
					uni.setNavigationBarTitle({
						title: res.data.title
					});
				}
			},
			async clickBuy() {
				if (this.$store.state.token) {
					let res = await this.myRequest('/common/getSpecs', {}, 'GET', false);
					if (res.error_code == 0) {
						this.buyTypes = res.data;
						this.$refs.buyCode.open()
					}
				} else {
					this.showLoginPage = true;
				}
			},
			onSwiperChange(e) {
				this.perviewCurrent = e.detail.current + 1
			},
			async onReadcodeInputConfirm(content) {
				if (content[0].content) {
					let res = await this.myRequest('/api/magazine/active', {
						magazine_id: this.magId,
						code: content[0].content
					}, 'POST');
					if (res.error_code == 0) {
						this.$store.commit('saveNeedFresh', true);
						this.goRead();
					}
				}
			},
			clickType(index) {
				this.choosenIndex = index;
			},
			clickOrdinary(flag) {
				if (this.choosenIndex !== 4) {
					this.choosenIndex = 4;
					return;
				}
				if (flag) {
					this.ordinaryNum++;
				} else {
					if (this.ordinaryNum == 0) return;
					this.ordinaryNum--;
				}
			},
			showDesc() {
				this.showDescModal = true;
			},
			async goPay() {
				let num = this.choosenIndex == 4 ? this.ordinaryNum : this.buyTypes[this.choosenIndex].price;
				num = parseInt(num);
				let res = await this.myRequest('/api/order/appletPay', {
					magazine_id: this.magId,
					buy_num: num
				}, 'POST');
				if (res.error_code == 0) {
					uni.requestPayment({
						timeStamp: res.data.timestamp,
						nonceStr: res.data.nonceStr,
						package: res.data.package,
						signType: 'MD5',
						paySign: res.data.paySign,
						success: (res) => {
							uni.showToast({
								title: "购买成功"
							})
							this.$store.commit('saveNeedFresh', true);
							setTimeout(() => {
								uni.redirectTo({
									url: `/pages/magazinefirst/magazinefirst?magId=${this.magId}`
								})
							}, 1500)
						},
						fail: (res) => {
							console.log("支付失败,原因为: " + res
								.errMsg)
						},
						complete: () => {}
					})
				}
			},
			useReadCode() {
				if (this.$store.state.token) {
					this.showReadcodeInput = true;
				} else {
					this.showLoginPage = true;
				}
			},
			goRead() {
				uni.navigateTo({
					url: `/pages/read/read?magId=${this.magId}`
				});
			},
			loginOver() {
				this.showLoginPage = false;
				this.getMagInfo()
			}
		},
		computed: {
			price: function() {
				if (this.choosenIndex == 4) {
					let single = 0;
					if (this.ordinaryNum < 10) {
						single = 8;
					} else if (this.ordinaryNum >= 10 && this.ordinaryNum <= 50) {
						single = 7;
					} else if (this.ordinaryNum > 50) {
						single = 6;
					}
					return this.ordinaryNum * single;
				} else {
					return this.buyTypes[this.choosenIndex] && this.buyTypes[this.choosenIndex].price;
				}
			}
		},
		components: {
			chunLeiModal,
			uniPopup,
			LoginPage
		}
	}
</script>

<style lang="scss">
	.magazine-first {
		.swiper {
			width: 100%;
			height: 100vh;
			background: white;
			padding-bottom: 110rpx;
			box-sizing: border-box;

			.swiper-item {
				display: flex;
				align-items: center;
				justify-content: space-around;

				.swiper-img {
					// width: 750rpx;
					width: 100%;
					height: 100%;
				}
			}
		}

		.cover-img {
			width: 750rpx;
			height: 100vh;
			position: absolute;
			top: 0;
			z-index: -1;
		}

		.bottom {
			position: fixed;
			bottom: 0;

			.page {
				width: 80rpx;
				height: 40rpx;
				margin: 0 auto;
				background: #000000;
				line-height: 40rpx;
				font-size: 24rpx;
				color: white;
				text-align: center;
				margin-bottom: 20rpx;
			}

			.button {
				height: 110rpx;
				width: 750rpx;
				background: #000000;
				color: white;
				font-size: 36rpx;
				text-align: center;
				line-height: 110rpx;

				.use {
					width: 374rpx;
					line-height: 50rpx;
					border-right: 1rpx solid #FFFFFF;
					padding-right: 102rpx;
				}

				.buy {
					padding-left: 102rpx;
				}

				text:hover {
					color: #C8C7CC;
				}
			}
		}

		.buy-wrapper {
			color: #333333;

			.top {
				margin-bottom: 50rpx;

				.buy-text {
					font-size: 28rpx;
					margin-right: 420rpx;
				}

				.buy-desc-icon {
					width: 28rpx;
					height: 28rpx;
					vertical-align: middle;
					margin-right: 6rpx;
				}

				.buy-desc {
					font-size: 24rpx;
					line-height: 28rpx;
					color: #999999;
				}

				.title {
					font-size: 32rpx;
					margin-top: 20rpx;
					font-weight: bold;
				}
			}

			.content {
				font-size: 28rpx;

				.type {
					margin-top: 30rpx;

					.type-text {
						display: inline-block;
						width: 280rpx;
						height: 64rpx;
						text-align: center;
						line-height: 64rpx;
						border: 1px solid #E6E6E6;
						margin-bottom: 30rpx;
						color: #999999;
					}

					.type-text-choosen {
						border: 1px solid #1D1D1E;
						color: black;
					}

					.type-text:nth-child(odd) {
						margin-right: 30rpx;
					}
				}

				.ordinary-type {
					display: inline-block;
					width: 440rpx;
					height: 64rpx;
					border: 1px solid #E6E6E6;
					color: #999999;
					line-height: 64rpx;
					text-align: center;

					.input {
						display: inline-block;
						width: 80rpx;
						height: 40rpx;
						line-height: 40rpx;
						vertical-align: middle;
						margin: 0 20rpx
					}

					.icon {
						display: inline-block;
						vertical-align: middle;
						color: white;
						width: 40rpx;
						height: 40rpx;
						line-height: 35rpx;
						font-size: 40rpx;
						background: #C0C0C0;
					}
				}

				.ordinary-type-choosen {
					border: 1px solid #1D1D1E;
					color: black;

					.icon {
						background: #000000;
					}
				}
			}

			.buy-bottom {
				margin-left: -30rpx;
				margin-top: 30rpx;
				font-size: 36rpx;
				opacity: 0.8;
			}
		}

		.uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
			padding-bottom: 0rpx;
		}
	}
</style>

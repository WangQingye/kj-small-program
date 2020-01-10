<template>
	<view class="bind-phone">
		<view class="tip">
			根据国家相关政策，请先完善您的账户信息
		</view>
		<view class="info-list">
			<view class="list-item">
				<input class="list-input" style="width: 690rpx;height: 110rpx;" type="number" value="" v-model="phone"
				 placeholder-style="color:#999999" placeholder="请输入手机号" />
			</view>
			<view class="list-item">
				<input class="list-input" style="margin-top: 23rpx" type="text" value="" placeholder-style="color:#999999"
				 placeholder="请输入验证码" v-model="verifyCode" />
				<view class="list-button" @click="getCode">{{buttonText}}</view>
			</view>
			<view class="list-item list-item-1">
				<label>
					<checkbox-group @change="checkBoxChange">
						<checkbox value="1" :checked="userProto" style="transform:scale(0.7)" color="#999999" />我已阅读并同意<text style="color: #006CB7;"
						 @click.stop="goAgreement">《用户协议》</text>
					</checkbox-group>
				</label>
			</view>
			<view class="save-button" @click="updatePhone">保存</view>
			<!-- <view class="save-button disable-button" v-else>保存</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userProto: false,
				buttonText: "获取验证码",
				phone: "",
				verifyCode: "",
				from: 1
			};
		},
		onLoad(option) {
			this.from = option.from;
			this.needGoComfirm = option.needGoComfirm
		},
		methods: {
			async getCode() {
				if (this.buttonText != "获取验证码") return;
				if (!/^1[3456789]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: "请输入正确格式手机号",
						duration: 2000,
						icon: "none"
					});
					return false;
				}
				let res = await this.myRequest(
					"/common/getCode", {
						mobile: this.phone,
						type: 1
					},
					"POST"
				);
				if (res) {
					uni.showToast({
						title: "获取成功",
						duration: 2000,
						icon: "none"
					});
					this.startCount();
				}
			},
			async updatePhone() {
				if (!/^1[3456789]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: "请输入正确格式手机号",
						duration: 2000,
						icon: "none"
					});
					return false;
				} else if (!this.verifyCode) {
					uni.showToast({
						title: "请输入验证码",
						duration: 2000,
						icon: "none"
					});
					return false;
				} else if (!this.userProto) {
					uni.showToast({
						title: "请先勾选用户协议",
						duration: 2000,
						icon: "none"
					});
					return false;
				}
				let res = await this.myRequest(
					"/api/user/upMobile", {
						mobile: this.phone,
						code: this.verifyCode
					},
					"POST"
				);
				if (res.message == "success") {
					let userInfo = this.$store.state.userInfo;
					userInfo.mobile = this.phone;
					this.$store.commit("saveUserInfo", userInfo);
					this.myToast("绑定成功", 1500, () => {
						if (this.needGoComfirm) {
							uni.navigateTo({
								url: `/pages/car/confirm-order/confirm-order`
							});
						} else {
							uni.navigateBack({
								delta: 1
							});
						}
					});
				} else {
					this.myToast(res.message);
				}
			},
			startCount() {
				let time = 60;
				let interval = setInterval(() => {
					time--;
					if (time == 0) {
						clearInterval(interval);
						this.buttonText = "获取验证码";
					} else {
						this.buttonText = time + "s";
					}
				}, 1000);
			},
			checkBoxChange(e) {
				var values = e.detail.value;
				if (values.includes("1")) {
					this.userProto = true;
				} else {
					this.userProto = false;
				}
			},
			goAgreement() {
				uni.navigateTo({
					url: `/pages/score/score-desc/score-desc?singlePageId=1`
				});
			}
		}
	};
</script>

<style lang="scss">
	.bind-phone {
		.tip {
			width: 750rpx;
			height: 80rpx;
			background: #ffeff1;
			color: #ed193a;
			line-height: 80rpx;
			font-size: 24rpx;
			text-align: center;
		}

		.info-list {
			width: 100%;
			height: 100vh;
			padding: 0 30rpx;

			.list-item {
				height: 110rpx;
				width: 690rpx;
				border-bottom: 1px solid #e6e6e6;

				.list-input {
					display: inline-block;
					vertical-align: middle;
					font-size: 32rpx;
					line-height: 110rpx;
					width: 500rpx;
				}

				.list-button {
					vertical-align: middle;
					display: inline-block;
					width: 180rpx;
					height: 64rpx;
					border: 1px solid #006cb7;
					color: #006cb7;
					border-radius: 10rpx;
					font-size: 28rpx;
					line-height: 64rpx;
					text-align: center;
					margin-top: 23rpx;
				}
			}

			.list-item-1 {
				height: auto;
				font-size: 24rpx;
				color: #999999;
				border: none;
				margin-top: 24rpx;
			}

			checkbox {
				border-radius: 0;
			}

			.save-button {
				width: 640rpx;
				height: 88rpx;
				margin-top: 80rpx;
				margin-left: 25rpx;
				background: #006cb7;
				color: white;
				text-align: center;
				border-radius: 10rpx;
				line-height: 88rpx;
				font-size: 32rpx;
			}

			.disable-button {
				background: #999999;
			}
		}
	}
</style>

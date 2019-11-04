<template>
	<view v-show="showFlag" class="login-page">
		<image src="../static/logo.png" class="logo-img"></image>
		<button class="get-userinfo-button" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">微信登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginInfo: {},
			};
		},
		props: ['showFlag'],
		mounted() {
			this.wxLogin();
		},
		methods: {
			wxLogin() {
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						that.loginInfo.code = loginRes.code;
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log(infoRes)
								that.loginInfo.encryptedData = infoRes.encryptedData;
								that.loginInfo.iv = infoRes.iv;
								that.myLogin();
							},
							fail: function() {
								console.log(111);
							}
						})
					}
				});
			},
			async myLogin() {
				let res = await this.myRequest('/api/user/appletLogin', this.loginInfo, 'POST', false);
				if (res && res.error_code == 0) {
					this.$store.commit('saveToken', res.data.token)
					this.$store.commit('saveIsLogin', true);
					this.$emit('login-over')
				}
			},
			onGotUserInfo(res) {
				if (res.detail.errMsg == 'getUserInfo:ok') {
					let infoRes = res.detail
					this.loginInfo.encryptedData = infoRes.encryptedData;
					this.loginInfo.iv = infoRes.iv;
					this.myLogin();
				} else {
					this.$emit('login-over');
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-page {
		width: 750rpx;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: white;
		z-index: 99;

		.logo-img {
			width: 542rpx;
			height: 60rpx;
			display: block;
			margin: 0 auto;
			margin-top: 240rpx;
			margin-bottom: 311rpx;
		}

		.get-userinfo-button {
			width: 640rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 0;
			background: #070607;
			color: white;
		}
	}
</style>

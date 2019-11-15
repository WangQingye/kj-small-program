<template>
	<view v-if="showFlag" class="login-page">
		<image src="../static/logo.png" class="logo-img"></image>
		<button class="get-userinfo-button" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">登录</button>
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
			uni.hideTabBar();
			console.log(312231)
			// this.wxLogin();
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
								that.loginInfo.encryptedData = infoRes.encryptedData;
								that.loginInfo.iv = infoRes.iv;
								that.$emit('login-over')
								// that.myLogin();
							},
							fail: function() {
								console.log('无授权');
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
					this.$emit('login-over');
					// this.myLogin();
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
			width: 240rpx;
			height: 200rpx;
			display: block;
			margin: 0 auto;
			margin-top: 180rpx;
			margin-bottom: 228rpx;
		}

		.get-userinfo-button {
			width: 640rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 10rpx;
			background: #006CB7;
			color: white
		}
	}
</style>

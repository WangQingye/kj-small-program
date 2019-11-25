<template>
	<view v-show="showFlag" class="login-page">
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
		props: ['showFlag', 'isTabBar'],
		mounted() {
			this.wxLogin();
		},
		methods: {
			wxLogin() {
				let that = this;
				console.log(222);
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						that.loginInfo.code = loginRes.code;
						uni.getUserInfo({
							provider: 'weixin',
							lang: 'zh_CN',
							success: function(infoRes) {
								console.log(infoRes)
								// console.log(JSON.parse(infoRes.rawData));
								that.loginInfo.encryptedData = infoRes.encryptedData;
								that.loginInfo.iv = infoRes.iv;
								// that.$emit('login-over')
								that.myLogin();
							},
							fail: function() {
								that.$store.commit('saveIsLogin', false);
								that.$emit('login-over', 1);
							}
						})
					}
				});
			},
			async myLogin() {
				let res = await this.myRequest('/api/user/applet-login', this.loginInfo, 'POST', false);
				if (res) {
					this.$store.commit('saveUserToken', res.data)
					this.$store.commit('saveIsLogin', true);
					this.$emit('login-over')
				} else {
					this.$emit('login-over', true);
				}
			},
			onGotUserInfo(res) {
				console.log(res);
				if (res.detail.errMsg == 'getUserInfo:ok') {
					let infoRes = res.detail
					this.loginInfo.encryptedData = infoRes.encryptedData;
					this.loginInfo.iv = infoRes.iv;
					this.myLogin();
				} else {
					this.$emit('login-over', true);
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

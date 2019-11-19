<template>
	<view class="my-index">
		<view v-if="showPage">
			<view class="my-info">
				<view class="info" @click="goMyInfo">
					<image class="avatar" :src="avatar" mode="aspectFill"></image>
					<view class="middle">
						<view class="name">{{nickName}}</view>
						<view class="company">{{company}}</view>
					</view>
					<image class="right-arrow" src="../../../static/right-arrow.png" mode=""></image>
				</view>
				<view class="my-button">
					<view class="subscribe" @click="goCollect">我的收藏</view>
					<view class="subscribe" @click="goOrder">我的订单</view>
				</view>
			</view>
			<view class="my-list">
				<view class="list-item" @click="goList(1)">
					<image src="../../../static/list-1.png" mode="" class="list-img"></image>
					<view class="list-text">问题咨询</view>
					<image class="right-arrow" src="../../../static/right-arrow.png" mode=""></image>
				</view>
				<view class="list-item" @click="goList(2)">
					<image src="../../../static/list-2.png" mode="" class="list-img"></image>
					<view class="list-text">地址管理</view>
					<image class="right-arrow" src="../../../static/right-arrow.png" mode=""></image>
				</view>
				<view class="list-item" @click="goList(3)">
					<image src="../../../static/list-3.png" mode="" class="list-img"></image>
					<view class="list-text">我的积分</view>
					<image class="right-arrow" src="../../../static/right-arrow.png" mode=""></image>
				</view>
				<view class="list-item" @click="goList(4)">
					<image src="../../../static/list-4.png" mode="" class="list-img"></image>
					<view class="list-text">订单管理</view>
					<image class="right-arrow" src="../../../static/right-arrow.png" mode=""></image>
				</view>
				<view class="list-item" style="border:none" @click="goList(5)">
					<image src="../../../static/list-5.png" mode="" class="list-img"></image>
					<view class="list-text">关于凯杰</view>
					<image class="right-arrow" src="../../../static/right-arrow.png" mode=""></image>
				</view>
			</view>
			<view class="my-out">
				注销登录
			</view>
		</view>
		<login-page :showFlag="showLoginPage" @login-over="loginOver"></login-page>
	</view>
</template>

<script>
	import LoginPage from '@/components/login-page.vue';
	export default {
		data() {
			return {
				showLoginPage: false,
				showPage: false,
				nickName: '',
				avatar: '',
				company: ''
			};
		},
		onShow() {
			if (this.$store.state.userToken.api_token) {
				this.showPage = true;
			}
			if (this.showLoginPage) {
				uni.hideTabBar();
			}
			if (this.$store.state.userInfo) {
				this.nickName = this.$store.state.userInfo.nickname;
			}
			uni.$on('updateName',
				() => {
					console.log(111);
					this.nickName = this.$store.state.userInfo.nickname;
				})
		},
		methods: {
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
				if (this.$store.state.userToken.api_token) {
					this.getUserInfo();
				}
				this.showLoginPage = false;
				uni.showTabBar();
			},
			async getUserInfo() {
				let res = await this.myRequest('/api/user/info', {}, 'POST');
				if (res) {
					this.$store.commit('saveUserInfo', res.data);
					this.nickName = res.data.nickname;
					this.avatar = res.data.avatar;
					this.company = (res.data.organization_join && res.data.organization_join.name) || '暂无机构'
					this.showPage = true;
				} else {}
			},
			goMyInfo() {
				uni.navigateTo({
					url: `/pages/my/my-info/my-info`
				});
			},
			goOrder() {
				uni.navigateTo({
					url: `/pages/my/my-order/my-order/my-order`
				});
			},
			goCollect() { //我的收藏
				uni.navigateTo({
					url: `/pages/my/my-collect/my-collect/my-collect`
				});
			},
			goList(index) {
				let url;
				switch (index) {
					case 1:
						url = '/pages/my/question-list/question-list'
						break;
					case 2:
						url = '/pages/my/my-address/my-address'
						break;
					case 3:
						url = '/pages/score/score-mall/score-mall'
						break;
					case 4:
						url = '/pages/my/order-list/order-list/order-list'
						break;
					case 5:
						url = '/pages/score/score-desc/score-desc'
						break;
					default:
						break;
				}
				uni.navigateTo({
					url
				});
			}
		},
		components: {
			LoginPage
		}
	}
</script>

<style lang="scss">
	.my-index {
		background: #F6F6F6;
		width: 750rpx;
		height: 100vh;

		.my-info {
			width: 690rpx;
			height: 270rpx;
			background: white;
			padding: 0 30rpx;
			padding-top: 40rpx;

			.info {
				width: 690rpx;
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.avatar {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin-right: 30rpx;
				}

				.middle {
					width: 523rpx;

					.name {
						font-size: 36rpx;
						color: #333333;
					}

					.company {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.right-arrow {
					width: 16rpx;
					height: 26rpx;
				}
			}
		}

		.my-button {
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;

			.subscribe {
				background: url(../../../static/button-bg.png);
				width: 330rpx;
				height: 70rpx;
				font-size: 28rpx;
				color: #006CB7;
				text-align: center;
				background-size: 330rpx 70rpx;
				line-height: 70rpx;
			}
		}

		.my-list {
			width: 690rpx;
			height: 554rpx;
			background: white;
			padding: 0 30rpx;
			margin-top: 20rpx;

			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 110rpx;
				border-bottom: 1rpx solid #E6E6E6;

				.list-img {
					width: 32rpx;
					height: 32rpx;
					margin-right: 20rpx;
				}

				.list-text {
					color: #333333;
					font-size: 32rpx;
					width: 662rpx;
				}

				.right-arrow {
					width: 16rpx;
					height: 26rpx;
				}
			}
		}

		.my-out {
			width: 100%;
			text-align: center;
			height: 110rpx;
			color: #333333;
			line-height: 110rpx;
			margin-top: 40rpx;
			background: white;
		}
	}
</style>

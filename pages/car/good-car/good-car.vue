<template>
	<view class="main">
		<view class="body"></view>
		<view class="footer">
			<view class="action">
				<view class="all-check"></view>
				<view class="total"></view>
			</view>
			<view class="confirm">提交订单</view>
		</view>
		
		
		
		
		<login-page :showFlag="showLoginPage" @login-over="loginOver"></login-page>
	</view>
</template>

<script>
	import LoginPage from '@/components/login-page.vue';
	export default {
		data() {
			return {
				showLoginPage: true
			};
		},
		onLoad() {
			
		},
		methods: {
			loginOver() {
				this.showLoginPage = false;
				uni.showTabBar();
			}
		},
		components: {
			LoginPage
		}
	}
</script>

<style lang="scss">
	.main{
		width: 100%;
		height: 100vh;
		background-color: #eee;
		display: flex;
		flex-direction: column;
		.body{
			width: 100%;
			flex: 1;
		}
		.footer{
			width: 100%;
			height: 96rpx;
			background-color: #fff;
			display: flex;
			.confirm{
				width: 200rpx;
				height: 100%;
				background: #006CB7;
				line-height: 96rpx;
				text-align: center;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(255,255,255,1);
			}
			.action{
				flex: 1;
				padding :0 30rpx;
				box-sizing: border-box;
				
			}
			
		}
	}
</style>

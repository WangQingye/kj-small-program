<template>
	<view class="main">
		<view class="body">
			
			<uni-Swipe-Action :option="option">
				<view class="goods-item">
						<label class='goods-check'>
							<checkbox class="check-box"/>
						</label>
						<view class="goods-content">
							<view class="goods-imgbox">
								<image class="w100"></image>
							</view>
							<view class="goods-dis">
								<view class="g1">
									GeneRead DNA FFPE Kit2019 款
								</view>
								<view class="g2">
									干血斑;DP362-01
								</view>
								<view class="g3">
									<text class="gx-p">¥980</text>
									<text class="gy-p">￥1999</text>
								</view>
							</view>
						</view>
						<uniNumberBox :min="1" :max="99"  :value="1" @change="bindChange" class="num-box"></uniNumberBox>
				</view>
			</uni-Swipe-Action>
			<uni-swipe-action :options="options"  @change="change">
			    <view class='cont'>SwipeAction 基础使用场景</view>
			</uni-swipe-action>
		</view>
		<view class="footer">
			<view class="action">
				<label class="all-box">
					<checkbox class="all-checkbox"/>
					<text class="allcheck">全选</text>
				</label>
				<view class="total">
					<view class="tw">合计：</view>
					<view class="t-price">￥4056</view>
				</view>
			</view>
			<view class="confirm">提交订单</view>
		</view>
		
		<login-page :showFlag="showLoginPage" @login-over="loginOver"></login-page>
	</view>
</template>

<script>
	import {uniSwipeAction} from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import LoginPage from '@/components/login-page.vue';
	export default {
		data() {
			return {
				showLoginPage: true,
				option:[
						{
							text: '取消',
							style: {
								backgroundColor: '#007aff'
							}
						},{
							text: '取消',
							style: {
								backgroundColor: '#007aff'
							}
						}
					]				
			}
		},
		
		onLoad() {
			
		},
		onPullDownRefresh() {
		        console.log('refresh');
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
		},
		methods: {
			loginOver() {
				this.showLoginPage = false;
				uni.showTabBar();
			},
			bindChange (e) {
				
			}
		},
		components: {
			LoginPage,
			uniNumberBox,
			uniSwipeAction
		}
	}
</script>

<style lang="scss">
	.w100{
		width: 100%;
		height: 100%;
	}
	.main{
		width: 100%;
		height: 100vh;
		background-color: #eee;
		display: flex;
		flex-direction: column;
		.body{
			width: 100%;
			flex: 1;
			.goods-item{
				width: 100%;
				padding:30rpx;
				min-height: 238rpx;
				box-sizing: border-box;
				display: flex;
				background: #fff;
				position: relative;
				.goods-check{
					width:70rpx;
					height: 100%;
					display: flex;
					align-items: center;
				}
				.goods-content{
					flex: 1;
					display: flex;
					.goods-imgbox{
						width:240rpx;
						height: 135rpx;
						background:red;
						margin-right: 20rpx;
					}
					.goods-dis{
						flex: 1;
						.g1{
							font-size:28rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(51,51,51,1);
							line-height:38rpx;
							margin-bottom: 10rpx;
						}
						.g2{
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height:44rpx;
							margin-bottom: 10rpx;
						}
						.g3{
							.gx-p{
								font-size:28rpx;
								font-family:PingFang SC;
								font-weight:500;
								color:rgba(237,25,58,1);
								line-height:44rpx;
							}
							.gy-p{
								font-size:20rpx;
								font-family:PingFang SC;
								font-weight:400;
								text-decoration:line-through;
								color:rgba(153,153,153,1);
								line-height:44rpx;
							}
						}
					}
				}
				.num-box{
					width:180rpx;
					height: 48rpx;
					position: absolute;
					right:30rpx;
					bottom:30rpx;
					z-index: 6;
					.uni-numbox{
						width:100%;
						height: 100%;
					}
				}	
			}
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
				display: flex;
				justify-content: space-between;
				
				.all-box{
					display: flex;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					align-items: center;
					.all-checkbox{
						width: 40rpx;
						height: 40rpx;
						margin-right: 32rpx;
					}
				}
				
			}
			.total{
				display: flex;
				align-items: center;;
				.t-price{
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:#ED193A;
				}
				.tw{
					font-size:24rpx;
					font-family:PingFang SC;
					color:#333333
				}
			}
			
		}
	}
</style>

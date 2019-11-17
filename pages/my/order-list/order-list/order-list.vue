<template>
	<view class="main">
		<view class="body">
			<view class="order-box" v-for="item in 2" :key="item" >
				<view class="order-title">
					<text class="order-num">
						订单编号:1826432
					</text>
					<text class="order-status">
						待确认
					</text>
				</view>
				<view class="goods-box">
					<view class="goods-item" v-for="item in 2" :key="item">
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
										<text class="gy-p" >￥1999</text>
									</view>
									
								</view>
							</view>
							<text class="num"> x2</text>
					</view>
					<view class="order-total" >
						<view class="order-content">
							<view class="order-company">新墨（北京）科技有限公司</view>
							<view class="order-add">时振川  17600220747</view>
						</view>
						<view class="btn" @click="godetails">审核订单</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	export default {
		components:{
			sunTab
		},
		data() {
			return {
				tabIndex:0,
				tabList:['商品订单',"积分订单"],
			};
		},
		methods:{
			godetails () {
				uni.navigateTo({
					url: `/pages/my/order-des/order-des/order-des`
				});
			}
		}
	}
</script>

<style lang="scss">
	.w100{
		width: 100%;
		height: 100%;
	}
	.main{
		background: #eee;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		
	
		.body{
			width:100%;
			height: 100%;
			overflow: auto;
			box-sizing: border-box;
			padding-bottom: 50rpx;
			.order-box{
				padding:0 30rpx;
				box-sizing: border-box;
				background: #fff;
				width: 100%;
				margin-bottom: 20rpx;;
				.order-title{
					width: 100%;
					display: flex;
					height: 80rpx;
					border-bottom:1px solid #ccc;
					box-sizing: border-box;;
					justify-content: space-between;
					align-items: center;;
					.order-num{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(51,51,51,1);
					}
					.order-status{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(0,108,183,1);
					}
				}
				.goods-box{
					width: 100%;
					.goods-item{
						width: 100%;
						padding:30rpx 0;
						min-height: 210rpx;
						box-sizing: border-box;
						display: flex;
						background: #fff;
						position: relative;
						border-bottom: 1rpx solid #E6E6E6;
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
								.logistics{
									font-size:24rpx;
									font-family:PingFang SC;
									font-weight:400;
									color:rgba(153,153,153,1);
									margin-top:10rpx;
								}
							}
						}
						.num{
							position:absolute;
							right:0rpx;
							bottom:30rpx;
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
						}	
					}
					
				}
				.order-total{
					height: 120rpx;
					width: 100%;
					padding:25rpx 140rpx 25rpx 0rpx;
					box-sizing:border-box;
					position: relative;
					.order-content{
						width: 100%;
						height: 100%;
						.order-company{
							font-size:28rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(51,51,51,1);
							margin-bottom: 20rpx;
							line-height: 1;
						}
						.order-add{
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height: 1;
						}
					}
					.btn{
						width:140rpx;
						height: 60rpx;
						border:1rpx solid rgba(0,108,183,1);
						border-radius:10rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(0,108,183,1);
						text-align: center;
						line-height: 60rpx;
						position: absolute;
						top:0;bottom:0;right:0rpx;
						margin:auto;
					}
				}
			}
			
		}
	}
</style>

<template>
	<view class="main">
		<view class="body">
			<view class="order-address">
				<view class="order-person">时振川  16610039071</view>
				<view class="order-com-add">北京市丰台区宋家庄位子坑149号庄子写字楼北楼一层</view>
				<view class="order-add-btn"></view>
			</view>
			<view class="kf-code">
				<view class="kf-content">客户代码：1234567</view>
				<view class="kf-btn" @click="openMc(2)"></view>
			</view>
			<view class="goods-box">
				<view class="goods-item" v-for="item in 2" :key="item">
						<view class="goods-content">
							<view class="goods-imgbox">
								<image class="w100"></image>
							</view>
							<view class="goods-dis">
								<view class="g1">
									GeneRead DNA FFPE Kit FFPE2019 款  
								</view>
								<view class="g2" @click="openMc(1)">
									干血斑;DP362-01
								</view>
							</view>
						</view>
						<view class="goods-des">
							<view class="goods-prices">
								<text>单价：</text>
								<input type="number" class="goods-inputs">
							</view>
							<view class="goods-num">
								<uniNumberBox class="goods-numbox"></uniNumberBox>
								<text>数量：</text>
							</view>
						</view>
				</view>
			</view>
			<view class="remark">
				<text>备注信息：</text>
				<textarea class="remark-box" value=" " placeholder="请输入备注信息" />
			</view>
			<view class="last-info">
				<view class="order-num">订单编号：180916093124</view>
				<view class="order-company">所属公司：新墨（北京）科技有限公司</view>
			</view>
		</view>
		<view class="footer">
			<view class="order-refuse">拒绝订单</view>
			<view class="order-pass">确认订单</view>
		</view>
		<uniPopup ref="buyCode" type="bottom" class="buy-wrapper">
			<view class="guige" v-if = "showTc == 1">
				<view class="body">
					<view class="m1">
						<view class="m1-imgbox">
							<image :src="subData.cover_pic" mode="" class="w100"></image>
						</view>
						<view class="m1-price">
							<view class="m1-p">
								¥{{1956}}
							</view>
							<view class="m1-d">
								已选：“干血斑”“DP362-01”
							</view>
							
						</view>
						<image src="../../../../static/c/c31close.png" mode="" class="m1-close" @click="closeMc"></image>
					</view>
					<view class="m2">
						<view class="m2-title">
							颜色
						</view>
						<viwe class="m2-box">  
						<!-- :class="{active:subData.mId == item.id}" -->
							<view class="m2-item">
								白色
							</view>
						</viwe>
					</view>
					<view class="m3">
						<view class="m3-title" >
							编号
						</view>
						<viwe class="m3-box">  
							<view class="m3-item"  >
								DP362-01
							</view>
						</viwe>
						<view class="m3-tips">
							对应规格：100次
						</view>
					</view>
				</view>
				
				<view class="footer">确认</view>
			</view>
			<view class="code" v-if = "showTc == 2">
				<view class="code-title">编辑客户代码</view>
				<view class="code-box">
					<input type="text" value="12345678" class="code-input"/>
				</view>
				<view class="code-footer">确认</view>
				<view class="close" @click="closeMc">	</view>
			</view>
		</uniPopup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components:{
			uniNumberBox,
			uniPopup
		},
		data() {
			return {
				showTc:''
			};
		},
		methods:{
			openMc (type) {
				this.showTc = type;
				this.$refs['buyCode'].open()
			},
			closeMc () {
				this.showTc = false;
				this.$refs['buyCode'].close()
			}
		}
	}
</script>

<style lang="scss">
	.w100{
		max-width:100%;
		max-height: 100%;
		text-align: center;;
	}
	.main{
		width: 100%;
		height: 100vh;
		display: flex;
		background-color: #eee;
		flex-direction: column;
		overflow: hidden;
		.body{
			width: 100%;
			flex: 1;
			overflow: auto;
			.order-address{
				width: 100%;
				height: 180rpx;
				background: #fff;
				position: relative;
				padding:40rpx 30rpx;
				box-sizing: border-box;
				margin-bottom: 20rpx;
				.order-person{
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height: 1;
					margin-bottom: 30rpx;
				}
				.order-com-add{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height: 1;
				}
				.order-add-btn{
					width: 40rpx;
					height: 40rpx;
					background: url(../../../../static/edit.png) no-repeat;
					background-size: cover;
					position: absolute;
					top:0;bottom:0;
					right:30rpx;
					margin:auto;
				}
			}
			.kf-code{
				width: 100%;
				height: 110rpx;
				padding:0 70rpx 0 30rpx;
				box-sizing: border-box;
				
				background-color: #FFF;
				margin-bottom: 20rpx;
				position: relative;
				.kf-btn{
					width: 40rpx;
					height: 40rpx;
					background: url(../../../../static/edit.png) no-repeat;
					background-size: cover;
					position: absolute;
					top:0;bottom:0;
					right:30rpx;
					margin:auto;
				}
				.kf-content{
					width: 100%;
					height: 100%;
					line-height: 110rpx;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
			}
			.goods-box{
				width: 100%;
				background-color: #fff;
				margin-bottom: 20rpx;
				padding:0 30rpx;
				box-sizing: border-box;
				.goods-item{
					width: 100%;
					padding:30rpx 0;
					min-height: 210rpx;
					box-sizing: border-box;
					background: #fff;
					position: relative;
					border-bottom: 1rpx solid #E6E6E6;
					.goods-content{
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
								padding:8rpx 42rpx 8rpx 11rpx;
								box-sizing:border-box;
								display: inline-block;
								background:rgba(246,246,246,1);
								position: relative;
								line-height: 1;
								&:after{
									content: '';
									position: absolute;
									width: 14rpx;
									height: 7rpx;
									right: 14rpx;
									top:0;bottom:0;
									margin:auto;
									background: url(../../../../static/down.png) no-repeat;
									background-size: cover;
									
								}
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
					.goods-des{
						width: 100%;
						height: 114rpx;
						pdding-top:40rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(51,51,51,1);
						.goods-prices{
							flex: 1;
							height: 100%;
							display: flex;
							align-items: center;;
							.goods-inputs{
								width:240rpx;
								height: 64rpx;
								border:1px solid rgba(153,153,153,1);
								border-radius:10rpx;
								box-sizing: border-box;
								display: block;
								border: 1px solid #ccc;
								box-sizing: border-box;
							}
						}
						.goods-num{
							flex: 1;
							height: 100%;
							display: flex;
							align-items: center;;
							flex-direction:row-reverse;
							.goods-numbox{
								width:240rpx;
								height: 64rpx;
							}
						}
					}
				}
				
			}
			.remark{
				width: 100%;
				height: 110rpx;
				padding:0 30rpx;
				box-sizing: border-box;
				margin-bottom: 20rpx;
				line-height: 110rpx;
				background-color: #fff;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				display: flex;
				.remark-box{
					flex: 1;
					height: 100%;
					line-height: 40rpx;
					padding-top:35rpx;
					box-sizing: border-box;
				}
			}
			.last-info{
				wdith:100%;
				height: 133rpx;
				background: #FFF;
				padding:30rpx;
				box-sizing: border-box;;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height: 1;
				margin-bottom: 30rpx;
				.order-num{
					margin-bottom: 20rpx;
				}
			}
		}
		.footer{
			width: 100%;
			height: 88rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;;
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			.order-pass{
				flex: 1;
				height: 100%;
				line-height: 88rpx;
				text-align: center;;
				background:rgba(0,108,183,1);
			}
			.order-refuse{
				flex: 1;
				height: 100%;
				line-height: 88rpx;
				text-align: center;;
				background:rgba(237,25,58,1);
			}
		}
	}
	.code {
		width: 100%;
		height: 360rpx;
		background: #fff;
		padding-bottom:96rpx;
		box-sizing: border-box;
		position: relative;
		.close{
			width: 28rpx;
			height: 28rpx;
			background: url(../../../../static/c/c31close.png) no-repeat;
			background-size: cover;
			position: absolute;
			right:0rpx;top:0rpx;
		}
		.code-title{
			font-size:36rpx;
			font-family:PingFang SC;
			font-weight:600;
			color:rgba(51,51,51,1);
			margin-bottom: 60rpx;
			text-align: center;
		}
		.code-box{
			width:100%;
			height: 88rpx;
			background:rgba(246,246,246,1);
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			text-align: center;
			.code-input{
				width: 100%;
				height: 100%;
			}
		}
		.code-footer{
			width: 100%;
			height: 96rpx;
			position: fixed;
			left: 0;bottom: 0;
			text-align: center;
			line-height: 96rpx;
			background: #006CB7;
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
	}
	.guige{
		
		.body{
			overflow: auto;
			width:100%;
			box-sizing: border-box;
			background: white;
			padding-bottom: 96rpx;
			.m1{
				width: 100%;
				height: 173rpx;
				display: flex;
				margin-bottom: 60rpx;
				background: #fff;
				padding:30rpx 0;
				box-sizing: border-box;
				z-index: 99;
				.m1-close{
					width:28rpx;
					height: 28rpx;
					position: absolute;
					top:30rpx;
					right: 30rpx;
					z-index: 66;
				}
				.m1-imgbox{
					width:200rpx;
					height: 100%;
					margin-right: 30rpx;
					background: #F34B0B;
				}
				.m1-price{
					flex:1;			
					.m1-p{
						font-size:38rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(237,25,58,1);
						margin-top:10rpx;
						line-height: 1;
						margin-bottom: 20rpx;
					}
					.m1-d{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(51,51,51,1);
						line-height:1;
					}
				}
				
			}
			
			.m2{
				width: 100%;
				margin-bottom: 40rpx;
				.m2-title{
					font-size:28rpx;
					margin-bottom: 20rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					
				}
				.m2-box{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					.m2-item{
						padding:20rpx 40rpx; 
						background:rgba(255,255,255,1);
						border:1px solid rgba(205,205,205,1);
						color:#999999;
						border-radius:10rpx;
						margin-bottom: 30rpx;
						font-size: 28rpx;
						text-align: center;
						line-height: 1;
						box-sizing: border-box;
						margin-right: 30rpx;
						&.active{
							color:#006CB7;
							border:1px solid rgba(0,108,183,1);
						}
					}
				}
				
			}
			.m3{
				width: 100%;
				margin-bottom: 40rpx;
				.m3-title{
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-bottom: 20rpx;
				}
				.m3-box{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					
					.m3-item{
						padding:20rpx 40rpx; 
						margin-bottom: 30rpx;
						background:rgba(255,255,255,1);
						border:1px solid rgba(205,205,205,1);
						color:#999999;
						border-radius:10rpx;
						font-size: 28rpx;
						margin-right: 30rpx;;
						text-align: center;
						line-height: 1;
						box-sizing: border-box;
						&.active{
							color:#006CB7;
							border:1px solid rgba(0,108,183,1);
						}
					}
				}
				.m3-tips{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:1;
					margin-bottom: 40rpx;
				}
			}
			
			
		}
		.footer{
			width:100%;
			height: 96rpx;
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			background:rgba(0,108,183,1);
			text-align: center;
			line-height: 96rpx;
			position:fixed;
			left:0;bottom:0;
			z-index: 665;
			display: block;
		}
	}
</style>

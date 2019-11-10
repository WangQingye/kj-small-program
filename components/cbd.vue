<template>
	<view class="main">
		<view class="body">
			<view class="m1">
				<view class="m1-imgbox">
					<image src="" mode="" class="w100"></image>
				</view>
				<view class="m1-price">
					<view class="m1-p">
						¥980
					</view>
					<view class="m1-d">
						已选：“干血斑”“DP362-01”
					</view>
					
				</view>
				<image src="../../static/c/c31close.png" mode="" class="m1-close"></image>
			</view>
			<view class="m2">
				<view class="m2-title">
					颜色
				</view>
				<viwe class="m2-box">  
					<view class="m2-item">
						黑色
					</view>
				</viwe>
			</view>
			<view class="m3">
				<view class="m3-title">
					编号
				</view>
				<viwe class="m3-box">  
					<view class="m3-item">
						DP362-01
					</view>
				</viwe>
				<view class="m3-tips">
					对应规格：100次
				</view>
			</view>
			<view class="m4">
				<view class="m4-title">
					数量
				</view>
				<view class="m4-numbox">
					<uniNumberBox :min="1" :max="9" :value="num" @change="bindChange"></uniNumberBox>
				</view>
			</view>
			<view class="m5">
				<view class="m5-title">
					组合商品
				</view>
				<view class="m5-box">
					<view class="m5-item">
						<label class="m5-checkbox">
								<checkbox class="m5-cb" />
						</label>
						<view class="m5-goods">
							<view class="m5-imgbox"></view>
							<view class="m5-ds">
								<view class="m5-d1">
									QIAamp Circulating Nucleic Acid Kit Acid Kit             
								</view>
								<view class="m5-d2">
									<xflSelect>
										
									</xflSelect>
								</view>
								<view class="m5-d3">
									<text>组合价：</text>
									<text class="m5-sj">¥19807 </text>
									<text class="m5-yj">￥2000</text>
								</view>
							</view>
						</view>
					</view>
					<view class="m5-item">
						<label class="m5-checkbox">
								<checkbox class="m5-cb" />
						</label>
						<view class="m5-goods">
							<view class="m5-imgbox"></view>
							<view class="m5-ds">
								<view class="m5-d1">
									QIAamp Circulating Nucleic Acid Kit Acid Kit             
								</view>
								<view class="m5-d2">
									<xflSelect>
										
									</xflSelect>
								</view>
								<view class="m5-d3">
									<text>组合价：</text>
									<text class="m5-sj">¥19807 </text>
									<text class="m5-yj">￥2000</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">确认</view>
	</view>
</template>

<script>
	import xflSelect from '@/components/xfl-select/xfl-select.vue'; 
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		
		name: 'c31',
		components: {
			uniNumberBox,
			xflSelect
		},
	
		data() {
			return {
				num:5
			};
		},
		methods:{
			bindChange (e) {
				if(isNaN(e)){
					this.num = 1
				}else{
					this.num = e;
				}
				
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
		flex-direction: column;;
		.body{
			flex: 1;
			overflow: auto;
			width:100%;
			padding: 30rpx;
			box-sizing: border-box;
			.m1{
				width: 100%;
				height: 113rpx;
				display: flex;
				margin-bottom: 60rpx;
				position: relative;
				.m1-close{
					width:28rpx;
					height: 28rpx;
					position: absolute;
					top:0rpx;
					right: 0rpx;
					z-index: 66;
				}
				.m1-imgbox{
					width:200rpx;
					height: 100%;
					background: red;
					margin-right: 30rpx;
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
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-bottom: 20rpx;
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
						font-size: 28rpx;
						text-align: center;
						line-height: 1;
						box-sizing: border-box;
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
					margin-bottom: 20rpx;
					.m3-item{
						padding:20rpx 40rpx; 
						background:rgba(255,255,255,1);
						border:1px solid rgba(205,205,205,1);
						color:#999999;
						border-radius:10rpx;
						font-size: 28rpx;
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
			.m4{
				width: 100%;
				margin-bottom: 40rpx;
				.m4-title{
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-bottom: 20rpx;
				}
				
			}
			.m5{
				width: 100%;
				margin-bottom: 40rpx;
				.m5-title{
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-bottom: 30rpx;
				}
				.m5-box{
					width: 100%;
					.m5-item{
						width: 100%;
						margin-bottom: 30rpx;
						// height: 150rpx;
						padding-bottom: 30rpx;
						display: flex;
						border-bottom:1px solid rgba(230,230,230,1);
						box-sizing: border-box;
						.m5-checkbox{
							width: 70rpx;
							height: 100%;
							.m5-cb{
								margin-top:37rpx;
								.wx-checkbox-input{
									width:39rpx;
									height:39rpx;
									border-radius: 50%;
								}
							}
						}
						.m5-goods{
							flex: 1;
							display: flex;
							.m5-imgbox{
								width:200rpx;
								height: 113rpx;
								margin-right: 20rpx;
								background: red;
							}
							.m5-ds{
								flex: 1;
								.m5-d1{
									width: 100%;
									font-size:28rpx;
									font-family:PingFang SC;
									font-weight:400;
									color:rgba(51,51,51,1);
									line-height:36rpx;
								}
								.m5-d2{
									width: 240rpx;
									height: 40rpx;
									margin-bottom: 20rpx;
									font-size: 24rpx;
									color:rgba(153,153,153,1);
									background:rgba(246,246,246,1);
									margin-top: 20rpx;
									.show-box{
										width: 100%;
										height: 100%;
									}
								}
								.m5-d3{
									font-size:24rpx;
									font-family:PingFang SC;
									font-weight:400;
									color:rgba(153,153,153,1);
									line-height: 1;
									.m5-sj{
										font-size: 28rpx;
										color:#ED193A;
									}
									.m5-yj{
											text-decoration:line-through;
									}
								}
							}
						}
					}
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
		}
	}
</style>

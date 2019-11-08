<template>
	<view class="main">
		<view class="body">
			<!-- 轮播 -->
			<view class="carousel">
				<swiper  circular=true duration="400" @change="swiperChange">
					<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
						<view class="image-wrapper">
							<image
								:src="item" 
								class="w100" 
							></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="pages">
					<text>{{swiperCurrent + 1}}&nbsp; </text>/
					<text>&nbsp; {{swiperLength}}</text>
				</view>
			</view>
			<!-- 价格详情 -->
			<view class="goods-price">
				<view class="t1">
					QIAsymphony SP for FFPE sample prepa-ration Print
				</view>
				<view class="t2">
					For automated, high throughput DNA prep from
				</view>
				<view class="t3">
					<text>货号：</text>
					<text>DP362-01</text>
				</view>
				<view class="t4">
					<view class="price">
						<text>￥</text>
						<text class="num">980</text>
						<text>起</text>
					</view>
					<view class="person">
						<text>2097</text>
						<text>人购买</text>
					</view>
				</view>
			</view>
			<!-- 选择规格 -->
			<view class="gg">
				<text>选择规格</text>
				<image src="/static/c/c30gg.png" mode="" class="toRight"></image>
			</view>
			<!-- 奖励商品 -->
			<view class="goods">
				<view class="g-t">
					奖励商品
				</view>
				<view class="goods-box">
					<movable-area class="scroll-box">
						<moveable-view direction="horizontal" class="scroll-item">
							<view class="s-imgbox">
								<!-- <image src="" class="s-img"></image> -->
							</view>
							<view class="s-price"></view>
						</moveable-view>
					</movable-area>
				</view>
			</view>
			<view class="goods-details"></view>
		</view>
		<view class="footer">
			<view class="f-l">
				<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
					<image src="/static/c/c30gwc.png" class="p-b-car"></image>
					<text>购物车</text>
				</navigator>
				<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
					<image class="p-b-zx" src="/static/c/c30zx.png" mode=""></image>
					<text>咨询</text>
				</navigator>
				<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
					<image class="p-b-zx" src="/static/c/c30sc.png" mode=""></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="f-r">
				<view class="addCar">{{'加入购物车'}}</view>
				<view class="order">{{'预约下单'}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[
					'/static/hear-1.png',
					'/static/hear-2.png',
					'/static/hear-3.png',
				],
				swiperCurrent: 0,
				swiperLength: 0,
			};
		},
		onLoad () {
			this.getList()
		},
		methods:{
			getList () { 
				this.swiperLength = this.imgList.length;
			},
			swiperChange (e) { //获取swiper Index
				this.swiperCurrent = e.detail.current ;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.main{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		.body{
			flex: 1;
			width: 100%;
			background: #eee;
			overflow: auto;
			.carousel{
				width: 100%;
				height: 425rpx;
				position: relative;
				background-color:#007AFF;
				.pages{
					position: absolute;
					right: 20rpx;
					bottom: 20rpx;
					width: 70rpx;
					height: 32rpx;
					border-radius: 16rpx;
					background:rgba(0,0,0,0.6);
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
					font-size: 24rpx;
					text-align: center;
					line-height: 32rpx;
				}
				.swiper-item{
					width:100%;
					height: 100%;
					.w100{
						width: 100%;
					}
				}
			}
			.goods-price{
				width:100%;
				padding:30rpx;
				box-sizing: border-box;;
				background-color: #fff;
				margin-bottom: 20rpx;;
				.t1{
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:40rpx;
					margin-bottom: 20rpx;;
				}
				.t2{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height: 1;
					margin-bottom: 20rpx;;
				}
				.t3{
					padding:8rpx 28rpx;
					box-sizing: border-box;
					background:rgba(246,246,246,1);
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					display: inline-block;
					margin-bottom: 30rpx;;
				}
				.t4{
					width:100%;
					display: flex;;
					justify-content: space-between;
					align-items: center;;
					.price{
						font-size:32rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(237,25,58,1);
						.num{
							font-size: 40rpx;
						}
					}
					.person{
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(153,153,153,1);
					}
				}
			}
			.gg{
				display: flex;
				width:100%;
				height: 96rpx;
				background-color: #fff;
				align-items: center;
				padding:0 30rpx;
				box-sizing: border-box;
				justify-content: space-between;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				margin-bottom: 20rpx;;
				.toRight{
					width:16rpx;
					height: 26rpx;
				}
			}
			.goods{
				width:100%;
				height:202rpx;
				padding:20 0rpx;
				box-sizing: border-box;;
				background-color: #FFFFFF;
				display: flex;
				margin-bottom: 20rpx;;
				.g-t{
					width:180rpx;
					height: 100%;
					display: flex;
					align-items: center;
					padding-left:30rpx;
					box-sizing: border-box;
					padding-bottom:82rpx;
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				.goods-box{
						flex: 1;
						height: 100%;
						overflow-x: hidden;;
						.scroll-box{
							height: 100%;
							width: 100%;
						}
				}
			}
		
		}
		.footer{
			width: 100%;
			height:96rpx;
			display: flex;
			.f-l{
				width:350rpx;
				height: 100%;
				padding:14rpx 0 8rpx 35rpx;
				box-sizing: border-box;;
				display: flex;
				font-size: 22rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				.p-b-btn{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;	
					width: 70rpx;
					height: 100%;
					margin-right: 30rpx;;
					.p-b-car{
						width:42rpx;
						height: 38rpx;
					}
					.p-b-zx{
						width:40rpx;
						height: 40rpx;;
					}
				}
			}
			.f-r{
				width: 400rpx;
				height: 100%;
				display: flex;
				.addCar{
					width: 50%;
					height: 100%;
					text-align: center;
					line-height: 96rpx;;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
					background:rgba(237,25,58,1);
				}
				.order{
					width: 50%;
					height: 100%;
					text-align: center;
					line-height: 96rpx;;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
					background:rgba(0,108,183,1);
				}
			}
			
		}
		
	}
</style>

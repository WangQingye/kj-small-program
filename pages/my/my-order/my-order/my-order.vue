<template>
	<view class="main">
		<view class="header">
			<sun-tab :value.sync="tabIndex" :tabList="tabList" :scroll="true"  @update:value="onTabChange" defaultColor="#333333" activeColor="#006CB7"></sun-tab>
			<view class="h">
			</view>
		</view>
		<view class="body">
			<view class="order-box" v-for="(item,index) in listItems" :key="index" >
				<view class="order-title">
					<text class="order-num">
						订单编号:{{item.sn}}
					</text>
					<text class="order-status">
						{{item.status == 1 ? '待处理' : item.status == 2 ? '已取消' : '已完成'}}
					</text>
				</view>
				<view class="goods-box">
					<view class="goods-item" v-for="(good,goodIndex) in item.goods_join" :key="goodIndex">
							<view class="goods-content">
								<view class="goods-imgbox">
									<image class="w100" :src="good.cover_pic"></image>
								</view>
								<view class="goods-dis">
									<view class="g1">
										{{good.title}}
									</view>
									<view class="g2" v-show="tabIndex == 0">
										{{good.two_type_title + ';' + good.two_specs_title}}
									</view>
									<view class="g3">
										<text class="gx-p">￥ {{good.clinch_price}}</text>
										<text class="gy-p" v-show="tabIndex == 0">￥ {{good.original_price}}</text>
									</view>
									<view class="logistics" v-show="tabIndex == 1">
										物流信息:{{item.ship_sn}}
									</view>
								</view>
							</view>
							<text class="num" v-show="tabIndex == 0"> x{{good.num}}</text>
					</view>
					
					<view class="order-total" v-show="tabIndex == 0">
						<text>合计:</text>
						<text class="order-money">￥{{item.price_total}}</text>
					</view>
				</view>
			</view>
			<view class="integral-box">
				
			</view>
		</view>
		<load-more :status="status" v-if="hasList"></load-more>
	</view>
</template>

<script>
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components:{
			sunTab,
			LoadMore
		},
		data() {
			return {
				tabIndex:0,
				tabList:['商品订单',"积分订单"],
				status: 'more',
				listPage: 1,
				listItems: [],
				hasList: false,
				url: '/api/user/myOrder/goodsList'
			};
		},
		onShow() {
			this.getOrderList(1);
		},
		onReachBottom() {
			if (this.status == 'more') {
				this.listPage++;
				this.getOrderList(this.listPage);
			}
		},
		methods:{
			async getOrderList(page) {
				if (page != 1) {
					this.status = 'loading';
				} else {
					this.listItems = [];
				}
				let perPage = 8;
				let res = await this.myRequest(this.url, {
					page,
					per_page: perPage
				}, 'POST');
				if (res.data.data) {
					this.listItems = this.listItems.concat(res.data.data);
					if (res.data.data.length < perPage) {
						this.status = 'noMore'
					} else {
						this.status = 'more'
					}
				}
				this.hasList = true;
			},
			onTabChange(index) {
				if (index == 0) {
					this.url = '/api/user/myOrder/goodsList';
				} else if (index == 1) {
					this.url = '/api/integral/order';
				}
				this.listPage = 1;
				this.getOrderList(1);
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
		display: flex;
		flex-direction: column;
		background: #eee;
		width: 100%;
		.header{
			width: 100%;
			height: 80rpx;
			padding:0 125rpx;
			background: #fff;
			box-sizing: border-box;
			position:relative;
			margin-bottom: 20rpx;
			.h{
				width:1rpx;
				height:40rpx;
				background:rgba(230,230,230,1);
				position: absolute;
				left:0;right:0;top:0;bottom:0;
				margin:auto;
			}
			.uni-tab {
				justify-content: space-between;
				height: 100%;
				.uni-tab-item{
					line-height:80rpx;
				}
			}
		}
		.body{
			flex: 1;
			width:100%;
			box-sizing: border-box;
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
					padding:0 30rpx;
					box-sizing: border-box;
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
					height: 90rpx;
					width: 100%;
					text-align: right;
					line-height: 90rpx;;
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					.order-money{
						font-size: 32rpx;
						font-weight: bold;;
					}
				}
			}
			
		}
	}
</style>

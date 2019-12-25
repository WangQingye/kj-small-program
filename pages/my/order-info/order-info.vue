<template>
	<view class="order-info">
		<view class="order-status">
			订单状态：{{orderData.status == 1 ? '待处理' : orderData.status == 2 ? '已取消' : '已完成'}}
		</view>
		<view class="order-address">
			<view class="single-address" v-for="(item,index) in orderData.address_join" :key="index">
				<view class="top">
					<text class="company">{{item.type == 1 ? '公司地址' : item.type == 2 ? '收货地址' :'发票地址'}}</text>
					<text class="name">{{item.addressee}}</text>
					<text class="name">{{item.mobile}}</text>
				</view>
				<view class="bottom">
					{{`${item.province_zh}${item.city_zh}${item.area_zh}${item.site}`}}
				</view>
			</view>
		</view>
		<view class="order-remark">
			客户留言：{{orderData.remark}}
		</view>
		<view class="order-goods">
			<view class="good-item" v-for="(item,index) in orderData.goods_join" :key="index">
				<image :src="item.cover_pic" mode="aspectFill" class="good-img"></image>
				<view class="good-info">
					<view class="good-name">{{item.title}}</view>
					<view class="good-type">
						<view class="good-type-1">{{item.two_type_title}};{{item.two_specs_title}}</view>
						<view class="good-num">x{{item.num}}</view>
					</view>
					<view class="good-price">
						成交价格：<text class="good-price-1">￥{{item.clinch_price}}</text>
					</view>
				</view>
			</view>
			<view class="good-all">
				合计：<text class="good-price-1">￥{{totalPrice}}</text>
			</view>
		</view>
		<view class="order-code">
			<view class="order-code-item">订单编号：{{orderData.sn}}</view>
			<view class="order-code-item">创建时间：{{orderData.created_at}}</view>
			<view class="order-code-item">下单用户：{{orderData.user_name}}</view>
			<view class="order-code-item">所属机构：{{orderData.organ_name}}</view>
			<view class="order-code-item">机构编码：{{orderData.organ_code}}</view>
			<view class="order-code-item">业务经理：{{orderData.business_name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderData: {},
				totalPrice: 0
			};
		},
		onLoad(option) {
			this.orderId = option.orderId;
		},
		onShow() {
			this.getOrderData()
		},
		methods: {
			async getOrderData() {
				let res = await this.myRequest('/api/user/myOrder/goodsOrderShow', {
					goods_order_id: this.orderId
				}, 'POST');
				if (res.data) {
					this.orderData = res.data;
				}
				this.orderData.goods_join.forEach(item => {
					this.totalPrice += (item.clinch_price * item.num)
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.order-info {
		background: #eee;
		font-size: 32rpx;
		color: #333333;
		min-height: 100vh;

		.order-status {
			width: 750rpx;
			height: 110rpx;
			background: rgba(0, 108, 183, 1);
			line-height: 110rpx;
			padding-left: 30rpx;
			color: white;
		}

		.order-address {
			background: white;
			padding: 0 30rpx;

			.single-address {
				border-bottom: 1rpx solid rgba(230, 230, 230, 1);
				padding: 30rpx 0;

				.top {
					margin-bottom: 20rpx;

					.company {
						font-size: 24rpx;
						width: 114px;
						height: 32px;
						background: rgba(0, 108, 183, 1);
						line-height: 32rpx;
						color: white;
						margin-right: 20rpx;
						padding: 0 10rpx;
					}

					.name {
						margin-right: 20rpx;
					}
				}

				.bottom {
					font-size: 24rpx;
					color: #999;
				}
			}
		}

		.order-remark {
			width: 750rpx;
			height: 110rpx;
			background: white;
			line-height: 110rpx;
			padding-left: 30rpx;
			margin: 20rpx 0;
		}

		.order-goods {
			padding: 0 30rpx;
			padding-bottom: 30rpx;
			background: white;
			margin-bottom: 20rpx;

			.good-item {
				padding: 30rpx 0;
				border-bottom: 1rpx solid rgba(230, 230, 230, 1);

				.good-img {
					width: 240rpx;
					height: 135rpx;
					margin-right: 30rpx;
				}

				.good-info {
					display: inline-block;
					width: 400rpx;
					.good-name {
						color: #333333;
						font-size: 28rpx;
						margin-bottom: 20rpx;
					}

					.good-type {
						color: #999999;
						font-size: 24rpx;
						display: flex;
						justify-content: space-between;
						margin-bottom: 20rpx;

						.good-type-1 {}

						.good-num {}
					}

					.good-price {
						font-size: 24rpx;
						color: #999999;

						.good-price-1 {
							color: #ED193A;
						}
					}

				}

			}

			.good-all {
				margin-top: 30rpx;
				text-align: right;
				font-size: 24rpx;

				.good-price-1 {
					color: #ED193A;
					font-size: 32rpx;
				}
			}
		}

		.order-code {
			width: 750rpx;
			height: 320rpx;
			padding: 30rpx 36rpx;
			font-size: 28rpx;
			color: #999999;
			background: white;

			.order-code-item {
				margin-bottom: 20rpx
			}
		}
	}
</style>

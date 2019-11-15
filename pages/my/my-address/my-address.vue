<template>
	<view class="my-address">
		<uni-swipe-action v-for="(item,index) in detailList" :key="index" class="detail-item" :options="options">
			<view class="left">
				<view class="left-top"><text class="address-name">公司地址</text>{{item.title}}</view>
				<view class="left-bottom">{{item.time}}</view>
			</view>
			<image src="../../../static/edit.png" class="right" mode=""></image>
		</uni-swipe-action>
		<view class="save-button" @click="goAddAddress">新建地址</view>
	</view>
</template>

<script>
	import {
		uniSwipeAction
	} from "@/components/uni-swipe-action/uni-swipe-action.vue"
	export default {
		data() {
			return {
				detailList: [{
					title: '奖励',
					time: '2019-06-24 09:25',
					num: 300
				}, {
					title: '消费',
					time: '2019-06-24 09:25',
					num: -300
				}, {
					title: '奖励',
					time: '2019-06-24 09:25',
					num: 300
				}],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#ED193A'
					}
				}]
			};
		},
		components: {
			uniSwipeAction
		},
		methods: {
			goAddAddress() {
				uni.navigateTo({
					url: `/pages/my/add-address/add-address`
				});
			}
		}
	}
</script>

<style lang="scss">
	.my-address {
		padding: 0 30rpx;

		.detail-item {
			width: 690rpx;
			height: 128rpx;

			.left {
				width: 640rpx;
				display: inline-block;
				vertical-align: middle;
				border-bottom: 1rpx solid #E5E5E5;

				.left-top {
					font-size: 32rpx;
					color: #333333;
					margin-top: 24rpx;
					margin-bottom: 14rpx;

					.address-name {
						font-size: 24rpx;
						line-height: 30rpx;
						background: #006CB7;
						color: white;
						padding: 11rpx;
						margin-right: 12rpx;
					}
				}

				.left-bottom {
					color: #999999;
					font-size: 24rpx;
					margin-bottom: 26rpx;
				}
			}

			.right {
				display: inline-block;
				vertical-align: middle;
				text-align: right;
				width: 40rpx;
				height: 40rpx;
				padding-bottom: 50rpx;
				margin-top: 50rpx;
				border-bottom: 1rpx solid #E5E5E5;
			}

		}

		.save-button {
			width: 100%;
			height: 88rpx;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #006CB7;
			color: white;
			text-align: center;
			line-height: 88rpx;
			font-size: 32rpx;
		}
	}
</style>

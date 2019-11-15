<template>
	<view>
		<view class="question-desc">
			<view class="list-item">
				<view class="list-text" style="margin-top:30rpx"><text style="color: #ED193A;margin-right: 12rpx;">Q: </text> 小程序下单和线下下单有什么区别？</view>
				<view class="list-text" style="margin-top:25rpx"><text style="color: #006CB7;margin-right: 12rpx;">A: </text> 您好，没有任何区别？</view>
			</view>
			<view class="list-item">
				<view class="list-text" style="margin-top:30rpx"><text style="color: #ED193A;margin-right: 12rpx;">Q: </text> 小程序下单和线下下单有什么区别？</view>
				<view class="list-text" style="margin-top:25rpx"><text style="color: #006CB7;margin-right: 12rpx;">A: </text> 您好，没有任何区别？</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.question-desc {
		width: 690rpx;
		height: 442rpx;
		background: white;
		padding: 0 30rpx;
		margin-top: 20rpx;

		.list-item {
			height: 144rpx;
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
</style>

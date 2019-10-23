<template>
	<view class="magazine">
		<image class="cover-img" src="/static/2.jpg"></image>
		<text class="title">雷嘉音-睿士ELLEMEN\n</text>
		<text class="subscribe">5275订阅</text>
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

<style lang="scss">
	.magazine {
		width: 332rpx;
		// display: inline-block;
		margin-bottom: 40rpx;
		.cover-img {
			width: 332rpx;
			height: 432rpx;
		}
		.title {
			font-size: 27rpx;
			font-weight: bold;
			margin: 20rpx 0;
		}
		.subscribe {
			color: #999999;
			font-size: 23rpx;
		}
	}
</style>

<template>
	<view class="magazine">
		<image class="cover-img" :src="magData.cover_pic" mode="aspectFill"></image>
		<text class="title">{{magData.title}}\n</text>
		<text class="subscribe">{{magData.subscribe_num}}订阅</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: ['magData'],
		methods: {},
	}
</script>

<style lang="scss">
	.magazine {
		width: 332rpx;
		display: inline-block;
		margin-bottom: 40rpx;
		position: relative;

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

		.userinfo-button {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
	}
</style>

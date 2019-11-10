<template>
	<view>
		<view class="good-item" v-if="!type">
			<image class="good-img" src="../static/2.jpg" mode="aspectFill"></image>
			<text class="good-name">{{goodData.name}}\n</text>
			<text class="good-price">¥{{goodData.price}}<text style="font-size: 22rpx;font-weight: normal;">起</text></text>
		</view>
		<view class="good-item-1" v-if="type == 1">
			<image class="good-img" src="../static/2.jpg" mode="aspectFill"></image>
			<view class="good-info">
				<text class="good-name">{{goodData.name}}\n</text>
				<text class="good-price">¥{{goodData.price}}<text style="font-size: 22rpx;font-weight: normal;">起</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goodData','type'],
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.good-item {
		width: 336rpx;
		display: inline-block;

		.good-img {
			width: 336rpx;
			height: 190rpx;
		}

		.good-name {
			font-size: 28rpx;
		}

		.good-price {
			color: #ED193A;
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	.good-item-1 {
		width: 100%;
		display: flex;
		align-items: top;
		border-bottom: 1rpx solid #E6E6E6;
		padding-bottom: 20rpx;
		margin-top:30rpx;
		.good-img {
			width: 240rpx;
			height: 136rpx;
			vertical-align: top;
			margin-right: 20rpx;
		}
		.good-info {
			vertical-align: top;
		}
		.good-name {
			display: block;
			font-size: 28rpx;
			margin-bottom:20rpx;
		}

		.good-price {
			color: #ED193A;
			font-size: 28rpx;
			font-weight: bold;
		}
	}
</style>

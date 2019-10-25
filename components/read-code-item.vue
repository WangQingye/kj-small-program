<template>
	<view class="read-code-item">
		<image class="cover-img" src="/static/2.jpg"></image>
		<view class="info">

			<text class="title">{{codeData.magazine_join.title}}\n</text>
			<text class="subscribe">已购买<text class="text-red">{{codeData.buy_num}}</text>个，还剩<text class="text-red">{{codeData.surplus_num}}</text>个</text>
			<button class="button-1 button-check-read-code" type="default" plain="true" @click="goReadCode(item)">查看阅读码</button>
		</view>
	</view>
</template>

<script>
	export default {
		props:['codeData'],
		data() {
			return {

			};
		},
		methods: {
			
			goReadCode() {
				console.log(111)
				uni.navigateTo({
				    url: '/pages/readcodes/readcodes?id=1&name=uniapp'
				});
			}
		}
	}
</script>

<style lang="scss">
	.read-code-item {
		width: 690rpx;
		// display: inline-block;
		margin-bottom: 40rpx;
		display: flex;

		.cover-img {
			width: 200rpx;
			height: 260rpx;
			margin-right: 30rpx;
		}

		.info {
			text-align: left;

			.title {
				font-size: 27rpx;
				font-weight: bold;
			}

			.subscribe {
				color: #999999;
				font-size: 24rpx;
			}

			.button-check-read-code {
				width: 180rpx;
				height: 64rpx;
				line-height: 64rpx;
				margin-top: 96rpx;
				font-size: 27rpx;
				text-align: center;
				margin-left: 0rpx;
				padding: 0 22rpx;
			}
		}
	}
	.text-red {
		color:#FF1616;
	}
</style>

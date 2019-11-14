<template>
	<view class="score-detail">
		<view v-for="(item,index) in detailList" :key="index" class="detail-item">
			<view class="left">
				<view class="left-top">{{item.title}}</view>
				<view class="left-bottom">{{item.time}}</view>
			</view>
			<view class="right" :style="'color:' + (item.num > 0 ? '#ED193A' : '#333333')">{{(item.num > 0 ? '+' : '') + item.num}}
			</view>
		</view>
	</view>
</template>

<script>
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
				}]
			};
		}
	}
</script>

<style lang="scss">
	.score-detail {
		padding: 0 30rpx;

		.detail-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 128rpx;
			border-bottom: 1rpx solid #E5E5E5;
			.left {
				.left-top {
					font-size: 28rpx;
					color: #333333;
					margin-top: 24rpx;
					margin-bottom: 14rpx;
				}

				.left-bottom {
					color: #999999;
					font-size: 24rpx;
					margin-bottom: 26rpx;
				}
			}

			.right {
				font-size: 40rpx;
			}

		}
	}
</style>

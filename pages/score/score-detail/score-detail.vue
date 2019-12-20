<template>
	<view class="score-detail">
		<view v-for="(item,index) in detailList" :key="index" class="detail-item">
			<view class="left">
				<view class="left-top">{{item.type == 1 ? '奖励' : item.type == 2 ? '订单抵扣' : '消费'}}</view>
				<view class="left-bottom">{{item.created_at}}</view>
			</view>
<!-- 			<view class="right" :style="'color:' + (item.type == 1 ? '#ED193A' : '#333333')">{{(item.type == 1 ? '+' : '-') + item.score}}
			</view> -->
			<view class="right" :style="'color:' + (item.type == 1 ? '#ED193A' : '#333333')">{{item.score}}
			</view>
		</view>
		<load-more :status="status"></load-more>
	</view>
</template>

<script>
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				detailList: [],
				status: 'more'
			};
		},
		onShow() {
			this.getScoreDetail(1);
		},
		methods: {
			async getScoreDetail(page) {
				if (page != 1) {
					this.status = 'loading';
				} else {
					this.detailList = [];
				}
				let perPage = 10;
				let res = await this.myRequest('/api/integral/log', {}, 'GET');
				if (res.data.data.length) {
					this.detailList = this.detailList.concat(res.data.data);
					if (res.data.data.length < perPage) {
						this.status = 'noMore'
					} else {
						this.status = 'more'
					}
				} else {
					this.status = 'noMore'
				}
			},
		},
		components: {
			LoadMore
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

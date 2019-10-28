<template>
	<view class="readcodes">
		<view class="tip">
			<text class="tip-text">温馨提示：阅读码只能被激活一次。当您收到阅读码后，系统会自动为您激活一个阅读码。若您拥有多个阅读码，您可以将阅读码复制后赠与好友。</text>
		</view>
		<view class="readcodes-wrapper">
			<view class="readcode-item" v-for="(item,index) in readcodes" :key="index">
				<view :class="'info' + (item.use_id == 0 ? '' : ' opacity')">
					<text class="code">阅读码：{{item.code}}\n</text>
					<text class="date">{{item.created_at}}</text>
				</view>
				<button v-if="item.use_id == 0" class="button-1 button-copy-read-code" type="default" plain="true" @click="clipCode(item.code)">复制阅读码</button>
				<view v-else class="user-avatar">
					<image class="img" :src="item.use_join.avatar"></image>
					<text class="name">{{item.use_join.nickname}}</text>
				</view>
			</view>
		</view>
		<load-more :status="loadStatus" v-if="readcodes.length"></load-more>
	</view>
</template>

<script>
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				readcodes: [],
				readcodesPage: 1,
				loadStatus: 'more',
			};
		},
		onLoad(option) {
			this.orderId = option.orderId;
			this.getMagCodes(1);
		},
		onReachBottom() {
			this.readcodesPage++;
			this.getMagCodes(this.readcodesPage);
		},
		methods: {
			async getMagCodes(page) {
				if (page !== 1) this.loadStatus = 'loading';
				let res = await this.myRequest('/api/magazine/showReadCode', {
					order_id: this.orderId,
					page,
					per_page: 6
				}, 'POST');
				if (res.error_code == 0) {
					if (!res.data.data.length) {
						this.loadStatus = 'noMore';
						this.readcodesPage;
					} else {
						this.readcodes = this.readcodes.concat(res.data.data);
					}
				}
			},
			clipCode(content) {
				uni.setClipboardData({
					data: content,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 2000
						});
					}
				});
			}
		},
		components: {
			LoadMore
		},
	}
</script>

<style lang="scss">
	.readcodes {
		.tip {
			background: #FFF4F4;
			height: 150rpx;
			width: 750rpx;
			color: #999999;
			font-size: 25rpx;
			padding: 26rpx 30rpx;
			line-height: 50rpx;
			margin-bottom: 20rpx;

			.tip-text {
				display: block;
				width: 690rpx;
			}

		}

		.readcodes-wrapper {
			padding: 0 30rpx;

			.readcode-item {
				height: 160rpx;
				border-bottom: 1rpx solid #E6E6E6;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.info {
					.code {
						display: block;
						background: black;
						color: white;
						width: 330rpx;
						text-align: center;
						line-height: 36rpx;
						height: 36rpx;
						font-size: 32rpx;
						margin-bottom: 10rpx;
					}

					.date {
						font-size: 20rpx;
						color: #999999;
					}
				}

				.opacity {
					opacity: 0.5;
				}

				.button-copy-read-code {
					width: 180rpx;
					height: 64rpx;
					line-height: 64rpx;
					margin-top: 96rpx;
					font-size: 27rpx;
					text-align: center;
					margin-left: 0rpx;
					padding: 0 22rpx;
					border-radius: 0;
					margin: 0;
				}

				.user-avatar {
					height: 100rpx;
					width: 180rpx;
					border-left: 1px solid #E6E6E6;

					.img {
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						display: block;
						margin: 0 auto;
						margin-bottom: 12rpx;
					}

					.name {
						font-size: 23rpx;
						color: #999999;
						width: 100%;
						display: block;
						text-align: center;
					}
				}
			}
		}
	}
</style>

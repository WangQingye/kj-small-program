<template>
	<view class="user-rank">
		<view class="top-user">
			<view class="user user2" v-if="headUsers[1]">
				<image class="hat1" src="../../static/hear-2.png"></image>
				<image class="avatar1" :src="headUsers[1].user_join.avatar"></image>
				<!-- <image class="girl1" src="../../static/girl.png"></image> -->
				<text class="name">{{headUsers[1].user_join.nickname}}\n</text>
				<text class="subscribe">订阅量\t<text class="text-red">{{headUsers[1].subscribe_num}}</text></text>
			</view>
			<view class="user" v-if="headUsers[0]">
				<image class="hat2" src="../../static/hear-1.png"></image>
				<image class="avatar2" :src="headUsers[0].user_join.avatar"></image>
				<!-- <image class="girl2" src="../../static/girl.png"></image> -->
				<text class="name">{{headUsers[0].user_join.nickname}}\n</text>
				<text class="subscribe">订阅量\t<text class="text-red">{{headUsers[0].subscribe_num}}</text></text>
			</view>
			<view class="user user3" v-if="headUsers[2]">
				<image class="hat3" src="../../static/hear-3.png"></image>
				<image class="avatar3" :src="headUsers[2].user_join.avatar"></image>
				<!-- <image class="girl3" src="../../static/girl.png"></image> -->
				<text class="name">{{headUsers[2].user_join.nickname}}\n</text>
				<text class="subscribe">订阅量\t<text class="text-red">{{headUsers[2].subscribe_num}}</text></text>
			</view>
		</view>
		<view class="user-list">
			<view class="user" v-for="(item,index) in otherUsers" :key="index">
				<text class="rank">{{index+3}}</text>
				<view class="avatars">
					<image class="avatar" :src="item.user_join.avatar"></image>
					<!-- <image class="gender" src="../../static/girl.png"></image> -->
				</view>
				<text class="name">{{item.user_join.nickname}}</text>
				<text class="subscribe">订阅量\t<text class="text-red">{{item.subscribe_num}}</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				magId: '',
				headUsers:[],
				otherUsers:[],
			};
		},
		onLoad(option) {
			this.magId = option.magId;
			this.getUserRank();
		},
		methods: {
			async getUserRank() {
				let res = await this.myRequest('/api/magazine/fansTop', {
					magazine_id: this.magId
				}, 'POST', false);
				if (res.error_code == 0) {
					this.headUsers = res.data.slice(0,3);
					this.otherUsers = res.data.slice(3);
				}
			}
		}
	}
</script>

<style lang="scss">
	.user-rank {
		padding: 0 30rpx;

		.top-user {
			display: flex;
			justify-content: space-around;
			margin-top: 34rpx;
			border-bottom: 1rpx solid #E6E6E6;
			padding-bottom: 55rpx;

			.user {
				position: relative;
				text-align: center;

				.hat1 {
					position: absolute;
					z-index: -1;
					top: 0;
					left: 0;
					width: 54rpx;
					height: 46rpx;
				}

				.hat2 {
					position: absolute;
					z-index: -1;
					top: 0;
					left: 0;
					width: 68rpx;
					height: 58rpx;
				}

				.hat3 {
					position: absolute;
					z-index: -1;
					top: 0;
					left: 0;
					width: 44rpx;
					height: 37rpx;
				}

				.avatar1 {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin-left: 12rpx;
					margin-top: 22rpx;
					display: block;
				}

				.avatar2 {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
					margin-left: 12rpx;
					margin-top: 30rpx;
					display: block;
				}

				.avatar3 {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-left: 12rpx;
					margin-top: 16rpx;
					display: block;
				}

				.girl1 {
					width: 36rpx;
					height: 36rpx;
					position: absolute;
					top: 110rpx;
					left: 95rpx;
				}

				.girl2 {
					width: 36rpx;
					height: 36rpx;
					position: absolute;
					top: 156rpx;
					left: 135rpx;
				}

				.girl3 {
					width: 36rpx;
					height: 36rpx;
					position: absolute;
					top: 80rpx;
					left: 80rpx;
				}

				.name {
					font-size: 27rpx;
					color: #333333;
				}

				.subscribe {
					font-size: 24rpx;
					color: #999999;
				}
			}

			.user2 {
				margin-top: 48rpx;
			}

			.user3 {
				margin-top: 72rpx;
			}
		}

		.user-list {
			.user {
				height: 168rpx;
				width: 690rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #E6E6E6;

				.rank {
					font-size: 32rpx;
					font-weight: bold;
					color: #1D1D1E;
					width: 60rpx;
					text-align: center;
				}

				.avatars {
					.avatar {
						width: 88rpx;
						height: 88rpx;
						border-radius: 50%;
					}

					.gender {
						width: 30rpx;
						height: 30rpx;
						margin-left: -30rpx;
					}
				}

				.name {
					font-size: 28rpx;
					color: #1D1D1E;
					width: 300rpx;
				}

				.subscribe {
					font-size: 28rpx;
					color: #999999;
				}
			}
		}

		.text-red {
			color: #FF1616;
			font-weight: bold;
		}
	}
</style>

<template>
	<view>
		<view class="question-list">
			<view class="list-item" @click="goDesc(item.id)" v-for="(item,index) in questionList" :key="index">
				<view class="list-text">{{item.title}}</view>
				<image class="right-arrow" src="../../../static/right-arrow.png" mode=""></image>
			</view>
		</view>
		<view class="support">
			<view class="support-item">
				<view class="title">技术支持</view>
				<view class="text">Tel: 800-988-0325</view>
				<view class="text">Tel: 400-880-0325</view>
				<view class="text">Email: TechService-CN@qiagen.com</view>
			</view>
			<view class="support-item" style="margin-bottom: 63rpx;">
				<view class="title">客服服务</view>
				<view class="text">Tel: 800-988-0326</view>
				<view class="text">Tel: 400-820-4368</view>
				<view class="text">Email: Orders-cn@qiagen.com</view>
			</view>
			<view class="text">工作时间：周一至周五 9:00-12:00 13:00-17:30</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				questionList: []
			};
		},
		onLoad() {
			this.getQuestionList();
		},
		methods: {
			async getQuestionList() {
				let res = await this.myRequest('/common/issue/getType', {
					page:1,
					per_page:1000
				}, 'GET', false, false);
				if (res.data.data) {
					this.questionList = res.data.data
				}
			},
			goDesc(id) {
				uni.navigateTo({
					url: `/pages/my/question-desc/question-desc?questionId=${id}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.question-list {
		width: 690rpx;
		// height: 442rpx;
		background: white;
		padding: 0 30rpx;
		margin-top: 20rpx;

		.list-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 110rpx;
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

	.support {
		margin-top: 128rpx;
		padding: 0 30rpx;

		.support-item {
			margin-bottom: 72rpx;

			.title {
				font-size: 32rpx;
				color: #333333;
				margin-bottom: 16rpx;
			}
		}

		.text {
			color: #666666;
			font-size: 24rpx;
			line-height: 36rpx;
		}
	}
</style>

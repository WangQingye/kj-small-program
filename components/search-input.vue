<template>
	<view class="search-input-wrapper">
		<icon type="search" size="13" />
		<input v-if="needCancel" class="search-input" type="text" v-model="searchText" placeholder="输入关键词进行搜索"
		 placeholder-class="placeholder" @confirm="goSearch" />
		<text v-else class="search-input-text" @click="goSearch">输入关键词进行搜索</text>
		<text class="cancel-text" v-if="needCancel" @click="cancel">取消</text>
	</view>
</template>

<script>
	export default {
		props: ['needCancel'],
		data() {
			return {
				searchText: ""
			};
		},
		methods: {
			goSearch() {
				this.$emit('goSearch', this.searchText);
			},
			cancel() {
				this.searchText = ""
				uni.navigateBack({
					delta: 1
				});
			},
			setSearchText(text) {
				this.searchText = text;
			}
		}
	}
</script>

<style lang="scss">
	.search-input-wrapper {
		width: 650rpx;
		height: 64rpx;
		background: rgba(245, 245, 245, 1);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		font-size: 28rpx;

		.search-input {
			margin-left: 12rpx;
			width: 510rpx;
		}

		.search-input-text {
			margin-left: 12rpx;
			width: 510rpx;
			color: #CCCCCC;
		}

		.placeholder {
			color: #CCCCCC;
		}

		.cancel-text {
			font-size: 28rpx;
			color: #007AFF;
			padding-left: 28rpx;
			border-left: 2rpx solid #E5E5E5;
		}
	}
</style>

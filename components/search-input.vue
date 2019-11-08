<template>
	<view class="search-input-wrapper">
		<icon type="search" size="14" />
		<input class="search-input" type="text" v-model="searchText" placeholder="输入关键词进行搜索" placeholder-class="placeholder" @confirm="goSearch"/>
		<text class="cancel-text" v-if="searchText" @click="cancel">取消</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText: ""
			};
		},
		methods:{
			goSearch() {
				console.log(this.searchText)
			},
			cancel() {
				this.searchText = ""
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

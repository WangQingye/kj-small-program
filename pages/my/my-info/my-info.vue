<template>
	<view class="info-list">
		<view class="list-item">
			<view class="list-label">姓名</view>
			<input class="list-input" type="text" value="" placeholder-style="color:#999999" placeholder="请输入姓名" />
		</view>
		<view class="list-item">
			<view class="list-label">绑定手机</view>
			<input class="list-input" type="text" value="" placeholder-style="color:#999999" placeholder="请输入绑定手机" />
		</view>
		<view class="list-item">
			<view class="list-label">机构类型</view>
			<input class="list-input" type="text" value="" placeholder-style="color:#999999" placeholder="请输入机构类型" />
		</view>
		<view class="list-item">
			<view class="list-label">所属机构</view>
			<input class="list-input" type="text" value="" placeholder-style="color:#999999" placeholder="请输入所属机构" />
		</view>
		<view class="list-item">
			<view class="list-label">业务经理</view>
			<input class="list-input" type="text" value="" placeholder-style="color:#999999" placeholder="请输入业务经理" />
		</view>
		<view class="save-button">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			uni.hideTabBar();
		}
	}
</script>

<style lang="scss">
.info-list {
	width: 100%;
	height: 100vh;
	padding: 0 30rpx;
	.list-item {
		height: 110rpx;
		border-bottom: 1px solid #E6E6E6;
		
		.list-label {
			color: #333333;
			width: 150rpx;
			line-height: 110rpx;
			text-align: left;
			display: inline-block;
			vertical-align: middle;
			font-size: 32rpx;
		}
		.list-input {
			display: inline-block;
			vertical-align: middle;
			font-size: 32rpx;
			line-height: 110rpx;
		}
	}
	.save-button {
		width: 100%;
		height: 88rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #006CB7;
		color: white;
		text-align: center;
		line-height: 88rpx;
		font-size: 32rpx;
	}
}
</style>

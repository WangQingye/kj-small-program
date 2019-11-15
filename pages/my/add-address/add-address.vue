<template>
	<view class="add-address-wrapper">
		<view class="add-address">
			<view class="list-radio">
				<label class="radio" style="margin-right: 60rpx;">
					<radio value="r1" checked="true" color="#006CB7" style="transform:scale(0.8)" />公司地址</label>
				<label class="radio" style="margin-right: 60rpx;">
					<radio value="r2" color="#006CB7" />发货地址</label>
				<label class="radio">
					<radio value="r2" color="#006CB7" />发票邮寄地址</label>
			</view>
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
			<view class="list-item" style="height: 240rpx;padding-top: 32rpx;">
				<textarea style="font-size: 32rpx;" placeholder="请输入详细地址" placeholder-style="color:#999999" auto-height />
				</view>
		</view>
		<view class="list-item list-item-1" style="height: 240rpx;">
			<label><checkbox value="cb" checked="true" style="transform:scale(0.7)" color="#999999"/>设为默认地址</label>
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
	.add-address-wrapper {
		
	.add-address {
		width: 100%;
		padding: 0 30rpx;
		padding-top:30rpx;
		overflow: hidden;
		.list-radio {
			width: 690rpx;
			.radio {
				font-size: 28rpx;
				color: #333333;
			}
			border-bottom: 1px solid #E6E6E6;
			padding-bottom:30rpx;
		}

		.list-item {
			width: 690rpx;
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
	}
		.list-item-1 {
			background: #F6F6F6;
			height: 210rpx;
			font-size: 24rpx;
			color: #999999;
			padding: 30rpx;
		}
		checkbox {
			background: transparent;
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

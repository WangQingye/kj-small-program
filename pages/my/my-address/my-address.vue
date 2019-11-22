<template>
	<view class="my-address">
		<uni-swipe-action v-if="addressList.length" v-for="(item,index) in addressList" :key="index" class="detail-item" :options="options" @click="clickDelete(index)">
			<view class="left">
				<view class="left-top"><text class="address-name">{{addType[item.type]}}</text>{{item.addressee + ' ' + item.mobile}}</view>
				<view class="left-bottom">{{item.area_join.city_join.zh_name + item.area_join.zh_name + item.site}}</view>
			</view>
			<image src="../../../static/edit.png" class="right" mode="" @click="goEdit(index)"></image>
		</uni-swipe-action>
		<view class="save-button" @click="goAddAddress">新建地址</view>
	</view>
</template>

<script>
	import {
		uniSwipeAction
	} from "@/components/uni-swipe-action/uni-swipe-action.vue"
	export default {
		data() {
			return {
				addressList: [],
				addType:['','公司地址','收货地址','邮寄地址','积分商品地址'],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#ED193A'
					}
				}]
			};
		},
		onShow() {
			this.getAddressList();
		},
		components: {
			uniSwipeAction
		},
		methods: {
			async getAddressList() {
				let res = await this.myRequest('/api/user/address/list', {
					page:1,
					per_page:100
				}, 'POST');
				console.log(res)
				if (res) {
					this.addressList = res.data.data;
				}
			},
			async clickDelete(index) {
				let res = await this.myRequest('/api/user/address/destroy', {
					user_address_id: this.addressList[index].id
				}, 'POST');
				if (res) {
					this.myToast('删除成功');
					this.getAddressList();
				}
			},
			goAddAddress() {
				uni.navigateTo({
					url: `/pages/my/add-address/add-address`
				});
			},
			goEdit(index) {
				console.log(index);
				let id = this.addressList[index].id;
				uni.navigateTo({
					url: `/pages/my/add-address/add-address?id=${id}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.my-address {
		padding: 0 30rpx;

		.detail-item {
			width: 690rpx;
			height: 128rpx;

			.left {
				width: 640rpx;
				display: inline-block;
				vertical-align: middle;
				border-bottom: 1rpx solid #E5E5E5;

				.left-top {
					font-size: 32rpx;
					color: #333333;
					margin-top: 24rpx;
					margin-bottom: 14rpx;

					.address-name {
						font-size: 24rpx;
						line-height: 30rpx;
						background: #006CB7;
						color: white;
						padding: 11rpx;
						margin-right: 12rpx;
					}
				}

				.left-bottom {
					color: #999999;
					font-size: 24rpx;
					margin-bottom: 26rpx;
				}
			}

			.right {
				display: inline-block;
				vertical-align: middle;
				text-align: right;
				width: 40rpx;
				height: 40rpx;
				padding-bottom: 50rpx;
				margin-top: 50rpx;
				border-bottom: 1rpx solid #E5E5E5;
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

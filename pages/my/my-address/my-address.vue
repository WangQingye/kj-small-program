<template>
	<view class="my-address">
		<uni-swipe-action v-if="addressList.length" v-for="(item,index) in addressList" :key="index" class="detail-item"
		 :options="options" @click="clickDelete(index)">
			<view class="left" @click="clickAddress(index)">
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
				addType: ['', '公司地址', '收货地址', '发票邮寄地址', '积分商品地址'],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#ED193A'
					}
				}],
				choosenType: null
			};
		},
		onLoad(option) {
			this.choosenType = option.choosenType;
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
					page: 1,
					per_page: 100
				}, 'POST');
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
					// 如果这时候正在选择，那么要看一下是否删除了已经选择过的地址
					if (this.choosenType) {
						let addrs = this.$store.state.userAddress;
						for (var i = 0; i < addrs.length; i++) {
							if (addrs[i]) {
								if (this.addressList[index].id == addrs[i].id) {
									this.$store.commit('saveUserAddress', {
										index: i,
										address: ""
									});
								}
							}
						}
					}
				}
			},
			clickAddress(index) {
				if (!this.choosenType) return;
				if (this.addressList[index].type != this.choosenType) {
					this.myToast('请选择相应类型的地址');
					return;
				}
				let address = {
					index: this.choosenType,
					address: this.addressList[index]
				}
				this.$store.commit('saveUserAddress', address);
				uni.navigateBack({
					delta: 1
				})
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
		.uni-swipe {
			border-bottom: 1rpx solid #E5E5E5;
		}
		.detail-item {
			width: 690rpx;
			height: 128rpx;
			.left {
				width: 640rpx;
				display: inline-block;
				vertical-align: middle;

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

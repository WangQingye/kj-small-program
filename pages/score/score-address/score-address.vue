<template>
	<view class="score-add-address-wrapper">
		<view class="add-address">
			<view class="list-item">
				<view class="list-label">姓名</view>
				<input class="list-input" type="text" v-model="name" value="" placeholder-style="color:#999999" placeholder="请输入姓名" />
			</view>
			<view class="list-item">
				<view class="list-label">手机号码</view>
				<input class="list-input" type="number" v-model="phone" placeholder-style="color:#999999" placeholder="请输入手机号" />
			</view>
			<view class="list-item">
				<view class="list-label">省市区</view>
				<area-picker @changeArea="ararChange"></area-picker>
			</view>
			<view class="list-item" style="height: 240rpx;padding-top: 32rpx;">
				<textarea style="font-size: 32rpx;" v-model="addressDetail" placeholder="请输入详细地址" placeholder-style="color:#999999"
				 auto-height />
				</view>
		</view>
		<view class="save-button" @click="saveAddress">保存</view>
	</view>
</template>

<script>
	import AreaPicker from '@/components/area-picker.vue';
	export default {
		data() {
			return {
				orgPickers:[],
				name: "",
				phone: "",
				areaId: "",
				addressDetail: ""
			};
		},
		onLoad() {
			uni.hideTabBar();
			// this.getOrgs()
		},
		methods: {
			ararChange(region) {
				console.log(region);
				this.areaId = region[3];
			},
			async getOrgs() {
				let res = await this.myRequest('/common/getOrganType', {}, 'GET', true, false);
				console.log(res);
				if (res) {
					this.orgs = res.data.map(item => {
						return item.zh_name;
					});
					// this.showPicker = false;
					// this.$nextTick(() =>{
					// 	this.showPicker = true;
					// })
				}
			},
			orgChange(e) {
				console.log(e.detail.value);
			},
			async saveAddress() {
				if (!this.name.length) {
					uni.showToast({
						title: '请输入姓名',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					uni.showToast({
						title: '请输入正确格式手机号',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (this.areaId == '') {
					uni.showToast({
						title: '请选择省市区',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (!this.addressDetail) {
					uni.showToast({
						title: '请输入详细地址',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				let res = await this.myRequest('/api/integral/update-address', {
					addressee: this.name,
					mobile: this.phone,
					area_id: this.areaId,
					site: this.addressDetail
				}, 'GET');
				if (res) {
					uni.showToast({
						title: '保存成功',
						duration: 1000,
						icon: 'none'
					});
					uni.navigateTo({
						url: `/pages/my/my-info/my-info`
					});
				}
			}
		},
		components: {
			AreaPicker
		}
	}
</script>

<style lang="scss">
	.score-add-address-wrapper {
		background: #F6F6F6;
		height: 100vh;
	.add-address {
		width: 100%;
		padding: 0 30rpx;
		overflow: hidden;
		background: white;
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

<template>
	<view class="add-address-wrapper" v-if="showForm">
		<view class="add-address">
			<view class="list-radio">
				<radio-group @change="radioChange">
					<label class="radio" style="margin-right: 60rpx;">
						<radio value="1" checked="true" color="#006CB7" style="transform:scale(0.8)" />公司地址</label>
					<label class="radio" style="margin-right: 60rpx;">
						<radio value="2" color="#006CB7" style="transform:scale(0.8)" />发货地址</label>
					<label class="radio">
						<radio value="3" color="#006CB7" style="transform:scale(0.8)" />发票邮寄地址</label>
				</radio-group>
			</view>
			<view class="list-item">
				<view class="list-label">姓名</view>
				<input class="list-input" v-model="name" type="text" value="" placeholder-style="color:#999999" placeholder="请输入姓名" />
			</view>
			<view class="list-item">
				<view class="list-label">手机号码</view>
				<input class="list-input" v-model="phone" type="number" value="" placeholder-style="color:#999999" placeholder="请输入手机号码" />
			</view>
			<view class="list-item">
				<view class="list-label">通知邮箱</view>
				<input class="list-input" v-model="mail" type="text" value="" placeholder-style="color:#999999" placeholder="请输入通知邮箱" />
			</view>
			<view class="list-item">
				<view class="list-label">省市区</view>
				<area-picker @changeArea="ararChange" :areaIds="areaIds"></area-picker>
				</picker>
			</view>
			<view class="list-item list-picker">
				<view class="list-label">机构类型</view>
				<picker class="list-input" @change="orgChange" :range="orgs">
					<view class="list-input ellipsis" style="width: 520rpx" v-if="orgIndex !== null">{{orgs[orgIndex]}}</view>
					<view v-else style="min-width: 520rpx;color: #999999;">
						请选择机构类型
					</view>
				</picker>
				<image class="right-arrow" src="../../../static/right-arrow.png" mode=""></image>
			</view>
			<view class="list-item" style="height: 240rpx;padding-top: 32rpx;">
				<textarea style="font-size: 32rpx;" v-model="addressDetail" placeholder="请输入详细地址" placeholder-style="color:#999999"
				 auto-height />
				</view>
		</view>
		<view class="list-item list-item-1" style="height: 240rpx;">
			<label><checkbox value="cb" :checked="status" style="transform:scale(0.7)" color="#999999"/>设为默认地址</label>
		</view>
		<view class="save-button" @click="saveAddress">保存</view>
	</view>
</template>

<script>
	import AreaPicker from '@/components/area-picker.vue';
	export default {
		data() {
			return {
				orgs: [],
				addType: 1,
				orgIndex: null,
				name: "",
				phone: "",
				mail: "",
				addressDetail: "",
				areaId: null,
				status: true,
				// 编辑时有ID
				addressId: null,
				// 如果是编辑那么等待数据请求后再渲染
				showForm: false,
				areaIds: null
			};
		},
		onLoad(option) {
			uni.hideTabBar();
			this.getOrgs();
			if (option.id) {
				this.addressId = option.id;
				this.getAddressById(option.id);
			} else{
				this.showForm = true;
			}
		},
		methods: {
			ararChange(region) {
				console.log(region);
				this.areaId = region[3];
			},
			radioChange(e) {
				this.addType = e.detail.value;
			},
			orgChange(e) {
				this.orgIndex = e.detail.value;
			},
			async getAddressById(id) {
				let res = await this.myRequest('/api/user/address/show', {
					user_address_id: id
				}, 'POST', true);
				if (res) {
					let data = res.data;
					this.name = data.addressee;
					this.addType = data.type;
					this.phone = data.mobile;
					this.mail = data.email;
					this.areaIds = [data.area_join.city_join.province_id,data.area_join.city_id,data.area_id];
					this.addressDetail = data.site;
					this.status = Boolean(data.status);
					this.showForm = true;
				}
			},
			async getOrgs() {
				let res = await this.myRequest('/common/getOrganType', {}, 'GET', true, false);
				console.log(res);
				if (res) {
					this.orgs = res.data.map(item => {
						return item.zh_name;
					});
				}
			},
			async saveAddress() {
				if (!this.testForm()) return;
				let data = {
					addressee: this.name,
					type: this.addType,
					mobile: this.phone,
					email: this.mail,
					area_id: this.areaId,
					site: this.addressDetail,
					status: ~~this.status
				};
				let url;
				if (this.addressId) {
					url = '/api/user/address/update';
					data.user_address_id = this.addressId;
				} else {
					url = '/api/user/address/store'
				}
				let res = await this.myRequest(url, data , 'POST');
				if (res) {
					this.myToast('保存成功',1500,()=>{
						console.log(312321);
						uni.navigateTo({
							url:'/pages/my/my-address/my-address'
						})
					})
				}
			},
			testForm() {
				if (!this.name.length) {
					this.myToast('请输入姓名')
					return false;
				}
				if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					this.myToast('请输入正确格式手机号')
					return false;
				}				
				if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.mail)) {
				    this.myToast("请输入有效邮箱");
				    return false;
				}
				if (this.areaId == null) {
					this.myToast('请选择省市区')
					return false;
				}
				if (this.orgIndex == null) {
					this.myToast('请选择机构类型')
					return false;
				}
				if (!this.addressDetail) {
					this.myToast('请输入详细地址')
					return false;
				}
				return true;
			}
		},
		components:{
			AreaPicker
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
		.right-arrow {
			width: 16rpx;
			height: 26rpx;
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

<template>
	<view class="info-list">
		<view class="list-item">
			<view class="list-label">{{nameLabel}}</view>
			<input class="list-input-1" @blur="onNameBlur" type="text" v-model="name" placeholder-style="color:#999999" placeholder="请输入姓名" />
		</view>
		<view class="list-item" @click="goBindPhone">
			<view class="list-label">绑定手机</view>
			<!-- <input class="list-input" type="text" v-model="phone" placeholder-style="color:#999999" placeholder="请输入绑定手机" /> -->
			<view class="list-input">{{phone}}</view>
		</view>
		<view class="list-item">
			<view class="list-label">机构类型</view>
			<view class="list-input" style="color:#999999">{{orgType}}</view>
		</view>
		<view class="list-item">
			<view class="list-label">所属机构</view>
			<view class="list-input" style="color:#999999">{{orgName}}</view>
		</view>
		<view class="list-item">
			<view class="list-label">业务经理</view>
			<view class="list-input" style="color:#999999">{{bussinessMan || '等待后台分配'}}</view>
		</view>
		<!-- <view class="save-button" @click="saveName">保存</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nameLabel: '姓名',
				name: '',
				phone: '',
				orgType: '',
				orgName: '',
				bussinessMan: ''
			};
		},
		onShow() {
			uni.hideTabBar();
			this.getUserInfo();
			this.name = this.$store.state.userInfo.nickname;
			this.phone = this.$store.state.userInfo.mobile;
			if (this.$store.state.userInfo.organization_join) {
				this.orgType = this.$store.state.userInfo.organization_join.organ_type_join && this.$store.state.userInfo.organization_join
					.organ_type_join.zh_name;
				this.orgName = this.$store.state.userInfo.organization_join.name;
				this.bussinessMan = this.$store.state.userInfo.organization_join.business_join && this.$store.state.userInfo.organization_join
					.business_join.name
			}
		},
		onUnload() {
		},
		methods: {
			goBindPhone() {
				uni.navigateTo({
					url: `/pages/my/my-phone/my-phone?from=${1}`
				});
			},
			onNameBlur() {
				this.saveName();
			},
			async getUserInfo() {
				let res = await this.myRequest('/api/user/info', {}, 'POST');
				if (res) {
					this.$store.commit('saveUserInfo', res.data);
					this.nickName = res.data.nickname;
					this.avatar = res.data.avatar;
					this.company = (res.data.organization_join && res.data.organization_join.name) || '暂无机构'
					this.showPage = true;
				} else {}
			},
			async saveName() {
				if (this.name != this.$store.state.userInfo.nickname) {
					let res = await this.myRequest('/api/user/upNickname', {
						nickname: this.name
					}, 'POST', true, false);
					console.log(res);
					if (res) {
						let userInfo = this.$store.state.userInfo;
						userInfo.nickname = this.name;
						this.$store.commit('saveUserInfo', userInfo);
						uni.$emit('updateName',{})
					}
				} else {
					uni.switchTab({
						url: '/pages/my/my-main/my-main'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.info-list {
		width: 100%;
		height: 100vh;
		padding: 0 30rpx;

		.list-item {
			min-height: 110rpx;
			border-bottom: 1px solid #E6E6E6;

			.list-label {
				color: #333333;
				width: 150rpx;
				line-height: 110rpx;
				min-height: 110rpx;
				text-align: left;
				display: inline-block;
				vertical-align: top;
				font-size: 32rpx;
			}

			.list-input {
				display: inline-flex;
				align-items: center;
				vertical-align: middle;
				font-size: 32rpx;
				min-height: 110rpx;
				width: 500rpx;
				line-height: 60rpx;
			}
			
			
			.list-input-1 {
				display: inline-block;
				align-items: center;
				vertical-align: middle;
				font-size: 32rpx;
				width: 500rpx;
				line-height: 110rpx;
				min-height: 110rpx;
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

<template>
	<view class="main">
		<view class="header">
			<view class="header-title">
				<sun-tab :value.sync="tabIndex" :tabList="tabList" :scroll="true" defaultColor="#333333" activeColor="#006CB7"></sun-tab>
			</view>
			<view class="header-content" @click="goAddressList">
				<view class="h-person" v-if="addreses[tabIndex+1]">{{addreses[tabIndex+1].addressee + ' ' + addreses[tabIndex+1].mobile}}
				</view>
				<view class="h-address" v-if="addreses[tabIndex+1]">{{addreses[tabIndex+1].area_join.city_join.zh_name + addreses[tabIndex+1].area_join.zh_name + addreses[tabIndex+1].site}}</view>
				<view class="h-person" v-if="!addreses[tabIndex+1]">暂无地址</view>
				<image src="../../../static/c/c30gg.png" mode="" class="goOn h-img"></image>
			</view>
		</view>
		<view class="content-box">
			<!-- 客户代码 -->
			<view class="code-wrapper">
				<view class="list-item list-picker">
					<view class="list-label">机构类型</view>
					<view class="list-input ellipsis" style="width: 520rpx; font-size: 32rpx;" @click="showOrgSelect" v-if="orgIndex !== null && originOrgs.length">{{originOrgs[orgIndex].label}}</view>
					<view v-else class="list-input" @click="showOrgSelect" style="min-width: 520rpx;color: #999999;">
						请选择机构类型
					</view>
					<image v-if="!hasOwnOrg" class="right-arrow" src="../../../static/right-arrow.png" mode=""></image>
					<w-picker mode="selector" @confirm="orgChange" @cancel="hasOpenModel = false" ref="selector" themeColor="#006CB7"
					 :selectList="orgs"></w-picker>
				</view>
				<view class="code">
					<text class="c-t" style="width: 150rpx;">机构名称</text>
					<input class="c-input" v-model="subData.organ_name" type="text" placeholder="请输入..." v-if="!hasOwnOrg">
					<view class="c-input" v-else>{{subData.organ_name}}</view>
				</view>
			</view>
			<view class="goods-box">
				<view class="" v-for="(item,index) in goodsInfo" :key="index">
					<view class="goods-item">
						<view class="goods-content">
							<view class="goods-imgbox">
								<image class="w100" :src="item.goods_cover_pic"></image>
							</view>
							<view class="goods-dis">
								<view class="g1">
									{{item.goods_title}}
								</view>
								<view class="g2">
									{{item.one_specs_title}};{{item.two_specs_title}}
								</view>
								<view class="g3">
									<text class="gx-p">¥{{item.price}}</text>
									<text class="gy-p"></text>
								</view>
							</view>
						</view>
						<text class="num"> x{{item.num}}</text>
					</view>
					<view class="goods-item" v-for="(val,idx) in item.attach_join" :key="idx">
						<view class="goods-content">
							<view class="goods-imgbox">
								<image class="w100" :src="val.goods_cover_pic"></image>
							</view>
							<view class="goods-dis">
								<view class="g1">
									{{val.goods_title}}
								</view>
								<view class="g2">
									{{val.one_specs_title}};{{val.two_specs_title}}
								</view>
								<view class="g3">
									<text class="gx-p">¥{{val.price}}</text>
									<text class="gy-p"></text>
								</view>
							</view>
						</view>
						<text class="num"> x{{val.num}}</text>
					</view>
				</view>

			</view>
			<!-- 隐藏优惠券 -->
			<!-- 			<view class="discount" v-if="false"> 
				<view class="dis-title">优惠</view>
				<view class="dis-content">
					0积分，抵扣
					<text style="color:#ED193A">￥0</text>
				</view>
				<image src="../../../static/c/c30gg.png" class="goOn d-img" mode=""></image>
			</view> -->
			<view class="remark">
				<view class="re-title">备注信息：</view>
				<textarea class="re-content" v-if="platform == 'ios'" v-model="subData.remark" v-show="!hasOpenModel" placeholder="填写留言信息"
				 style="padding-top: 9rpx;" />
				<textarea class="re-content" v-else style="padding-top: 20rpx;"  v-model="subData.remark" v-show="!hasOpenModel" placeholder="填写留言信息" />
			</view>
		</view>
		<view class="footer">
			<view class="agreement">
				<view @click="checks" style="display: flex;align-items: center;height: 100%;">
					<van-checkbox :value="isWatch" style="margin-right: 20rpx;"></van-checkbox>
					<text>
						我已阅读并同意
					</text>
				</view>


				<text style="color: #006CB7;" @click.stop="Goagreement">《用户协议》</text>


			</view>
			<view class="comfirm-box">
				<view class="total">
					合计：
					<text class="totalNum">￥{{total}}</text>
				</view>
				<view class="com-btn" @click="confirm">确认订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			sunTab,
			wPicker
		},
		data() {
			return {
				total: 0,
				tabIndex: 0,
				isWatch: true,
				tabList: ['公司地址', "收货地址", "发票邮寄地址"],
				goodsInfo: [],
				orgs: [],
				originOrgs: [],
				selectList: [{
					label: "男",
					value: 0
				}, {
					label: "女",
					value: 1
				}],
				orgIndex: null,
				// 用户是否本身有机构，如果有的话则不能再选
				hasOwnOrg: false,
				subData: {
					remark: '',
					organ_name: '',
					deduct_id: '',
					cart_id_arr: [],
					address_id_arr: [1],
				},
				isOrder: false,
				addreses: ["", "", "", ""],
				// 如果有弹出层，隐藏输入框
				hasOpenModel: false,
				platform: ''
			};
		},
		methods: {
			calcTotal() { //计算总价
				if (this.goodsInfo.length == 0) {
					this.total = 0;
					return;
				}
				let total = 0;
				this.goodsInfo.forEach(item => {
					total += item.price * item.num;
					if (item.attach_join && item.attach_join.length > 0) {
						item.attach_join.map(res => {
							total += res.price * res.num;
						})
					}
				})
				this.total = Number(total);
				this.total = this.total.toFixed(2)
			},
			checks() {
				this.isWatch = !this.isWatch;
			},
			Goagreement() {
				uni.navigateTo({
					url: `/pages/score/score-desc/score-desc?singlePageId=1`
				});
			},
			confirm() {
				if (this.isWatch == false) {
					this.myToast('请勾选用户协议');
					return;
				}
				if (this.orgIndex == null) {
					this.myToast('请选择机构类型');
					return;
				}
				if (this.subData.organ_name == '') {
					this.myToast('请输入机构名称');
					return;
				}
				this.buyGoods();

			},
			async buyGoods() {
				let res;
				this.subData.address_id_arr = [this.addreses[1].id, this.addreses[2].id, this.addreses[3].id];
				this.subData.organ_type_id = ~~this.orgIndex + 1;
				if (this.isOrder) {
					let orderInfo = { ...this.subData
					}
					let value = uni.getStorageSync('orderInfo');
					value = JSON.parse(value);
					for (let i in value) {
						orderInfo[i] = value[i]
					}
					delete orderInfo.cart_id_arr;
					res = await this.myRequest('/api/goods/order/goodsStore', orderInfo, 'POST', false);
				} else {
					this.goodsInfo.map(item => {
						this.subData.cart_id_arr.push(item.id)
					})
					res = await this.myRequest('/api/goods/order/cartStore', this.subData, 'POST', false);
				}
				if (res.message == "success") {
					this.myToast('购买成功', 1000, () => {
						// uni.navigateTo({
						// 	url:`/pages/my/my-order/my-order/my-order`
						// })
						this.$store.commit('saveNeedGoOrder', 1);
						uni.switchTab({
							url: `/pages/my/my-main/my-main`
						})
					})

				} else {
					this.myToast(res.message)
				}
			},
			async getAddress() {
				let res = await this.myRequest('/api/user/address/list', {
					page: 1,
					per_page: 100
				}, 'POST');
				if (res) {
					let allAddress = res.data.data;
					for (let i = 1; i < 4; i++) {
						if (!this.$store.state.userAddress[i]) {
							let address = allAddress.find(item => {
								return item.type == i
							});
							this.$store.commit('saveUserAddress', {
								index: i,
								address: address
							})
						}
					}
					this.addreses = this.$store.state.userAddress;
					console.log(this.addreses)
					this.$forceUpdate();
				}
			},
			goAddressList() {
				uni.navigateTo({
					url: `/pages/my/my-address/my-address?choosenType=${this.tabIndex+1}`
				})
			},
			async getOrgs() {
				if (!this.addreses[1]) {
					this.orgs = [];
					return;
				}
				let res = await this.myRequest('/common/getOrganType', {}, 'GET', true, false);
				if (res) {
					// 如果公司地址是北京地区，那么显示所有机构类型，否则只显示前5个
					// if (this.addreses[1].area_join.city_join.province_id == 1) {
					// 	this.orgs = res.data.map((item,index) => {
					// 		return {label:item.zh_name, value:index};
					// 	});
					// } else {
						// 所有机构，用于展示
					this.originOrgs = res.data.map((item, index) => {
					return {
						label: item.zh_name,
						value: index
					};
					});;
					this.orgs = res.data.slice(0, 5).map((item, index) => {
						return {
							label: item.zh_name,
							value: index
						};
					});
					// }
				}
			},
			showOrgSelect() {
				if (this.hasOwnOrg) return;
				this.$refs.selector.show();
				this.hasOpenModel = true;
			},
			orgChange(e) {
				this.orgIndex = e.checkArr.value;
				this.hasOpenModel = false;
			},
			async getUserOrg() {
				if (this.$store.state.userInfo.nickname) {
					if (this.$store.state.userInfo.organization_join) {
						this.orgIndex = ~~this.$store.state.userInfo.organization_join.organ_type_id - 1;
						this.subData.organ_name = this.$store.state.userInfo.organization_join.name
					}
				} else {
					let res = await this.myRequest('/api/user/info', {}, 'POST');
					if (res) {
						this.$store.commit('saveUserInfo', res.data);
						if (res.data.organization_join) {
							this.orgIndex = res.data.organization_join.organ_type_id - 1
							this.subData.organ_name = res.data.organization_join.name
						}
					}
				}
				if (this.orgIndex !== null) {
					this.hasOwnOrg = true;
				}
			},
		},

		async onShow() {
			this.platform = uni.getSystemInfoSync().platform;
			console.log(this.platform)
			await this.getAddress();
			this.addreses = this.$store.state.userAddress;
			this.getOrgs();
			this.getUserOrg();
			this.$forceUpdate();
			try {
				const value = uni.getStorageSync('goodsInfo');
				if (value) {
					this.goodsInfo = JSON.parse(value)
					this.calcTotal()
				}
			} catch (e) {
				// error
			}
		},
		async onLoad(option) {
			if (option) {
				this.isOrder = option.order;
			}
			// await this.getAddress();
			// this.getOrgs();
		}
	}
</script>

<style lang="scss">
	.goOn {
		width: 16rpx;
		height: 25rpx;
	}

	.w100 {
		width: 100%;
		height: 100%;
	}

	.main {
		width: 100%;
		height: 100vh;
		background-color: #eee;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		justify-content: space-between;

		.header {
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			background: #fff;
			margin-bottom: 20rpx;

			.header-title {
				height: 102rpx;
				width: 100%;

				.uni-tab {
					justify-content: space-between;
					height: 100%;

					.uni-tab-item {
						line-height: 102rpx;
					}
				}
			}

			.header-content {
				width: 100%;
				padding: 39rpx 46rpx 26rpx 8rpx;
				box-sizing: border-box;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				position: relative;

				.h-person {
					margin-bottom: 29rpx;
					line-height: 1;
				}

				.h-address {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1)
				}

				.h-img {
					position: absolute;
					right: 0rpx;
					top: 0;
					bottom: 0;
					margin: auto;
				}
			}

		}

		.footer {
			width: 100%;
			height: 190rpx;

			.agreement {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				width: 100%;
				height: 95rpx;
				padding: 0 30rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
			}

			.comfirm-box {
				width: 100%;
				height: 95rpx;
				background-color: #fff;
				padding-right: 300rpx;
				box-sizing: border-box;
				position: relative;

				.com-btn {
					position: absolute;
					z-index: 66;
					;
					top: 0;
					right: 0;
					width: 200rpx;
					height: 100%;
					background: #006CB7;
					color: #fff;
					border-radius: 0;
					text-align: center;
					line-height: 95rpx;
				}

				.total {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					padding-left: 30rpx;
					box-sizing: border-box;

					.totalNum {
						font-size: 36rpx;
						color: #ED193A;
					}
				}
			}
		}

		.content-box {
			width: 100%;
			flex: 1;

			// overflow: auto;
			.code-wrapper {
				width: 100%;
				padding: 0 30rpx;
				height: 220rpx;
				box-sizing: border-box;
				background-color: #fff;
				margin-bottom: 20rpx;

				.code {
					width: 100%;
					height: 110rpx;
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);

					.c-input {
						flex: 1;
					}
				}

				.list-item {
					width: 690rpx;
					height: 110rpx;

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

					.right-arrow {
						width: 16rpx;
						height: 26rpx;
					}
				}
			}

			.goods-box {
				width: 100%;
				padding: 0 30rpx;
				box-sizing: border-box;
				background-color: #fff;

				.goods-item {
					width: 100%;
					padding: 30rpx 0;
					min-height: 210rpx;
					box-sizing: border-box;
					display: flex;
					background: #fff;
					position: relative;
					border-bottom: 1rpx solid #E6E6E6;

					.goods-content {
						flex: 1;
						display: flex;

						.goods-imgbox {
							width: 240rpx;
							height: 135rpx;
							margin-right: 20rpx;
						}

						.goods-dis {
							flex: 1;

							.g1 {
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(51, 51, 51, 1);
								line-height: 38rpx;
								margin-bottom: 10rpx;
							}

							.g2 {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: rgba(153, 153, 153, 1);
								line-height: 44rpx;
								margin-bottom: 10rpx;
							}

							.g3 {
								.gx-p {
									font-size: 28rpx;
									font-family: PingFang SC;
									font-weight: 500;
									color: rgba(237, 25, 58, 1);
									line-height: 44rpx;
								}

								.gy-p {
									font-size: 20rpx;
									font-family: PingFang SC;
									font-weight: 400;
									text-decoration: line-through;
									color: rgba(153, 153, 153, 1);
									line-height: 44rpx;
								}
							}
						}
					}

					.num {
						position: absolute;
						right: 0rpx;
						bottom: 30rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}
				}
			}

			.discount {
				width: 100%;
				padding: 0 67rpx 0 30rpx;
				box-sizing: border-box;
				height: 110rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				background-color: #fff;
				margin-bottom: 20rpx;
				position: relative;

				.d-img {
					position: absolute;
					right: 30rpx;
					top: 30rpx;
					bottom: 30rpx;
					margin: auto;
				}
			}

			.remark {
				width: 100%;
				height: 280rpx;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				display: flex;
				align-items: top;

				.re-title {
					padding-top: 20rpx !important;
				}

				.re-content {
					flex: 1;
					height: 100%;
				}

			}

		}
	}
</style>

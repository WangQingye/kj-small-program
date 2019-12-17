<template>
	<view class="main">
		<view class="body">
			<view class="" v-for="(item,index) in goodsInfo" :key="index">
				<uni-Swipe-Action :options="option" @click="delClick(item)">
					<view class="goods-item">
						<label class='goods-check' @click="check('item',index)">
							<van-checkbox class="check-box" :value="item.checked" :disabled="item.goods_is_buy == 0"></van-checkbox>
						</label>
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
						<uniNumberBox :min="1" :max="99" :index="index" :value="item.num" @change="bindChange" class="num-box">
						</uniNumberBox>
					</view>

				</uni-Swipe-Action>
				<view class="goods-item" v-for="(val,idx) in item.attach_join" :key='idx'>
					<label class='goods-check'>
						<!-- <van-checkbox class="check-box" :value="item.checked"  :disabled="item.goods_is_buy == 0" v-show ='false'></van-checkbox> -->
					</label>
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
					<uniNumberBox :min="1" :max="99" :index="index" :groupNum="idx" :value="val.num" @change="bindChange" class="num-box">
					</uniNumberBox>
				</view>

			</view>

			<load-more :status="status"></load-more>
		</view>
		<view class="footer">
			<view class="action">
				<label class="all-box" @click="check('all')">
					<van-checkbox class="all-checkbox" :value="allChecked"></van-checkbox>
					<text class="allcheck">全选</text>
				</label>
				<view class="total">
					<view class="tw">合计：</view>
					<view class="t-price">￥{{total}}</view>
				</view>
			</view>
			<view class="confirm" @click="confirm">提交订单</view>
		</view>
		<login-page :showFlag="showLoginPage" @login-over="loginOver"></login-page>

	</view>
</template>

<script>
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		uniSwipeAction
	} from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import LoginPage from '@/components/login-page.vue';
	export default {
		data() {
			return {
				showLoginPage: false,
				index: 1,
				goodsInfo: [],
				total: 0,
				empty: '',
				allChecked: false,
				status: 'more',
				option: [{
					text: '删除',
					style: {
						backgroundColor: '#ED193A'
					}
				}]
			}
		},
		onLoad() {

		},

		beforeCreate() {
			if (this.$store.state.userToken.api_token == '') {
				this.showLoginPage = true;
			}
		},
		onShow() {
			this.index = 1;
			this.goodsInfo.length = 0;
			this.total = 0;
			this.allChecked = false;
			if (this.$store.state.userToken.api_token) {
				this.getList();
			}

		},
		onReachBottom() {
			if (this.status == 'more') {
				this.index++;
				this.getList();
			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.index = 1;
			this.goodsInfo.length = 0;
			this.getList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 500);
		},
		methods: {
			loginOver(err) {
				console.log(err)
				// 自动登录失败，显示登录框
				if (err === 1) {
					uni.hideTabBar();
					this.showLoginPage = true;
					return;
				}
				// 登录失败返回首页
				if (err) {
					uni.switchTab({
						url: '/pages/index/index'
					});
					return;
				}
				if (this.$store.state.userToken.api_token) {
					this.index = 1;
					this.goodsInfo.length = 0;
					this.getList();
				}
				this.showLoginPage = false;
				uni.showTabBar();
			},
			bindChange(data) {
				// this.goodsInfo[data.index].num = data.num;
				// this.calcTotal(this.goodsInfo[data.index],data.num);
				console.log(data)
				this.changeNum(this.goodsInfo[data.index], data.num, data.group)



			},
			async changeNum(item, num, group = -1) { //修改商品数量
				let data = {
					shop_cart_id: item.id,
					shop_cart_attach_id: '',
					num: num
				}
				if (group != -1) {
					data.shop_cart_attach_id = item.attach_join[group].id
				}
				let res = await this.myRequest('/api/user/cart/upNum', data, 'POST', false);
				if (res.message == "success") {
					if (group != -1) {
						item.attach_join[group].num = num
					} else {
						item.num = num;
					}

					this.calcTotal();
				}
			},
			delClick(item) {
				let that = this;
				uni.showModal({
					title: '确定删除',
					content: '',
					success: function(res) {
						if (res.confirm) {
							that.delGoods(item.id)
						} else if (res.cancel) {

						}
					}
				});
			},
			async delGoods(id) { //删除商品
				let res = await this.myRequest('/api/user/cart/destroy', {
					api_token: this.$store.state.userToken.api_token,
					shop_cart_id: id
				}, 'POST', false);
				if (res.message == "success") {
					uni.showToast({
						title: '删除商品成功'
					});
					this.index = 1;
					this.goodsInfo.length = 0;
					this.getList()
				}
			},
			async getList() { //获取购物车列表
				this.status = 'loading';
				let res = await this.myRequest('/api/user/cart/list', {
					api_token: this.$store.state.userToken.api_token,
					page: this.index,
					per_page: 10
				}, 'POST', false, false);
				if (res.message == "success") {
					if (res.data.data.length < 9) {
						this.status = "noMore";
					} else {
						this.status = "more"
					}
					if (this.index == 1) {
						this.goodsInfo = res.data.data;
					} else {
						this.goodsInfo = this.goodsInfo.concat(res.data.data);
					}
					this.goodsInfo.map(item => {
						item.checked = false;
						if (item.attach_join && item.attach_join.length > 0) { //判断是否有组合商品
							item.attach_join.map(res => {
								res.checked = false;
							})
						}
					})
				}
				console.log(this.goodsInfo.length)

			},
			calcTotal() { //计算总价
				if (this.goodsInfo.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				this.goodsInfo.forEach(item => {
					if (item.checked === true) {
						total += item.price * item.num;
						if (item.attach_join && item.attach_join.length > 0) { //判断是否有组合商品
							item.attach_join.map(res => {
								if (res.checked === true) {
									total += res.price * res.num;
								}
							})
						}
					} else {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total);
				this.total = this.total.toFixed(2)
			},
			check(type, index) { //选择单个商品 、全选
				if (type === 'item') {
					let ischeck = !this.goodsInfo[index].checked;
					this.goodsInfo[index].checked = ischeck;
					if (this.goodsInfo[index].attach_join.length > 0) {
						this.goodsInfo[index].attach_join.map(res => {
							res.checked = ischeck;
						})
					}


				} else {
					const checked = !this.allChecked
					this.goodsInfo.forEach(item => {
						item.checked = checked;
						if (item.attach_join.length > 0) {
							item.attach_join.map(res => {
								res.checked = checked;
							})
						}
					})
					this.allChecked = checked;
				}
				this.calcTotal();
			},
			async confirm() {
				if (!await this.testUserPhone()) return;
				console.log('333')
				let arr = [];
				this.goodsInfo.map(res => {
					if (res.checked == true) {
						arr.push(res)
					}
				})
				if (arr.length == 0) {
					uni.showToast({
						title: '请选择您要下单的商品',
						icon: 'none'
					})
					return;
				}
				uni.setStorageSync("goodsInfo", JSON.stringify(arr));
				uni.navigateTo({
					url: `/pages/car/confirm-order/confirm-order`
				});
			},
			async testUserPhone() { //获取用户信息
				if (this.$store.state.userInfo.mobile) {
					return true;
				}
				let res = await this.myRequest('/api/user/info', {}, 'POST');
				if (res.message == "success") {
					if (res.data.mobile) {
						return true;
					} else {
						uni.navigateTo({
							url: `/pages/my/my-phone/my-phone`
						});
						return false;
					}
				} else {
					this.myToast(res.message)
				}
			},
		},
		components: {
			LoginPage,
			uniNumberBox,
			uniSwipeAction,
			LoadMore
		}
	}
</script>

<style lang="scss">
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

		.body {
			width: 100%;
			flex: 1;
			overflow: auto;

			.goods-item {
				width: 100%;
				padding: 30rpx;
				min-height: 238rpx;
				box-sizing: border-box;
				display: flex;
				background: #fff;
				position: relative;

				.goods-check {
					width: 70rpx;
					margin-top: 40rpx;
					height: 100%;
					display: flex;
					align-items: center;
				}

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

				.num-box {
					width: 180rpx;
					height: 48rpx;
					position: absolute;
					right: 30rpx;
					bottom: 30rpx;
					z-index: 6;

					.uni-numbox {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.footer {
			width: 100%;
			height: 96rpx;
			background-color: #fff;
			display: flex;

			.confirm {
				width: 200rpx;
				height: 100%;
				background: #006CB7;
				line-height: 96rpx;
				text-align: center;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);

			}

			.action {
				flex: 1;
				padding: 0 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;

				.all-box {
					display: flex;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					align-items: center;

					.all-checkbox {
						width: 42rpx;
						height: 42rpx;
						margin-right: 32rpx;
					}
				}

			}

			.total {
				display: flex;
				align-items: center;
				;

				.t-price {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #ED193A;
				}

				.tw {
					font-size: 24rpx;
					font-family: PingFang SC;
					color: #333333
				}
			}

		}
	}
</style>

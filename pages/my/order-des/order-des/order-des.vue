<template>
	<view class="main" v-if="orderData">
		<view class="body">
			<view class="header">
				<view class="header-title">
					<sun-tab :value.sync="tabIndex" :tabList="tabList" :scroll="true" defaultColor="#333333" activeColor="#006CB7"></sun-tab>
				</view>
				<view class="header-content">
					<view class="order-address">
						<view class="order-person">{{areaData[tabIndex].addressee + ' ' + areaData[tabIndex].mobile}}</view>
						<view class="order-com-add">{{areaData[tabIndex].province_zh + areaData[tabIndex].city_zh + areaData[tabIndex].area_zh + areaData[tabIndex].site}}</view>
						<view class="order-add-btn" @click="goEdit(areaData[tabIndex].id)"></view>
					</view>
				</view>
			</view>

			<view class="kf-code">
				<view class="kf-content">客户代码：{{orderData.organ_code}}</view>
				<view class="kf-btn" @click="openMc(2)"></view>
			</view>
			<view class="goods-box">
				<view class="goods-item" v-for="(item,index) in orderData.goods_join" :key="index">
					<view class="goods-content">
						<view class="goods-imgbox">
							<image class="w100" :src="item.cover_pic"></image>
						</view>
						<view class="goods-dis">
							<view class="g1">
								{{item.title}}
							</view>
							<view class="g2" @click="openMc(item)">
								{{item.two_type_title + ';' + item.two_specs_title}}
							</view>
							<image src="../../../../static/delete.png" class="delete-img" @click="deleteGood(item.id)"></image>
						</view>
					</view>
					<view class="goods-des">
						<view class="goods-prices">
							<text>单价：</text>
							<view class="goods-inputs" @click="showChangeDiscount(index)">{{prices[index]}}</view>
						</view>
						<view class="goods-num">
							<uniNumberBox class="goods-numbox" v-model="nums[index]" @change="numChange($event,index)" :min="1" :max="99"></uniNumberBox>
							<text>数量：</text>
						</view>
					</view>
					<view class="goods-des" v-if="discount[index] !== 1">
						<view class="goods-prices">
							<text>修改后单价：</text>
							<view class="goods-inputs">{{changedPrices[index]}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="remark-wrapper">
				<view class="remark">
					<text>客户备注：</text>
					<view class="remark-box">{{orderData.remark || '无'}}</view>
				</view>
				<view class="remark">
					<text>备注信息：</text>
					<textarea class="remark-box" v-model="businessRemark" placeholder="请输入备注信息" @blur="remarkChange" />
					</view>
				</view>
			<view class="last-info">
				<view class="order-num">订单编号：{{orderData.sn}}</view>
				<view class="order-company">所属公司：{{orderData.organ_name}}</view>
			</view>
		</view>
		<view class="footer">
			<view class="order-refuse" @click="changeOrderStatus(2)">拒绝订单</view>
			<view class="order-pass" @click="changeOrderStatus(3)">确认订单</view>
		</view>
		<uniPopup ref="buyCode" type="bottom" class="buy-wrapper">
			<cover-view class="guige" v-if = "showTc == 1">
				<cover-view class="body">
					<cover-view class="m1">
						<cover-view class="m1-imgbox">
							<cover-image :src="chooseData.img" mode="" class="w100"></cover-image>
						</cover-view>
						<cover-view class="m1-price">
							<cover-view class="m1-p">
								¥{{chooseData.price}}
							</cover-view>
							<cover-view class="m1-d">
								已选：“{{chooseData.Ftitle}}”“{{chooseData.Ttitle}}”
							</cover-view>
						</cover-view>
						<cover-image src="../../../../static/c/c31close.png" mode="" class="m1-close" @click="closeMc"></cover-image>
					</cover-view>
					<cover-view class="m2">
						<cover-view class="m2-title">
							颜色
						</cover-view>
						<cover-view class="m2-box">
						<!-- " -->
							<cover-view class="m2-item" :class="{active:chooseData.Fid == item.id}" v-for="(item,index) in typeInfo" :key="index" @click="chooseOne(item)">
								{{item.title}}
							</cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="m3">
						<cover-view class="m3-title" >
							编号
						</cover-view>
						<cover-view class="m3-box">
							<cover-view class="m3-item" :class="{active:chooseData.Tid == item.id}" v-for="(item,index) in chooseData.twoInfo" :key="index" @click="chooseTwo(item)">
								{{item.title}}
							</cover-view>
						</cover-view>
						<cover-view class="m3-tips">
							对应规格：{{chooseData.depict}}
						</cover-view>
					</cover-view>
				</cover-view>

				<cover-view class="footer" @click="confimType">确认</cover-view>
			</cover-view>
			<view class="code" v-if="showTc == 2">
				<view class="code-title">编辑客户代码</view>
				<view class="code-box">
					<input type="text" v-model="organCode" class="code-input"/>
				</view>
				<view class="code-footer" @click="editOrganCode">确认</view>
				<view class="close" @click="closeMc">	</view>
			</view>
			<view class="code" v-if="showTc == 3">
				<view class="code-title">修改商品折扣</view>
				<view class="code-box">
					<input type="text" v-model="changedDiscount" class="code-input"/>
				</view>
				<view class="code-footer" @click="discountChange">确认</view>
				<view class="close" @click="closeMc">	</view>
			</view>
		</uniPopup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	export default {
		components:{
			uniNumberBox,
			uniPopup,
			sunTab
		},
		data() {
			return {
				tabIndex:0,
				tabList:['公司地址',"收货地址","发票邮寄地址"],
				showTc:'',
				orderId: null,
				businessRemark: "",
				orderData: null,
				organCode: null,
				prices: [],
				changedPrices: [],
				nums: [],
				discount: [],
				changedDiscount: 1,
				changingDiscountIndex: 0,
				typeInfo:[],
				areaData: null,
				chooseData:{
					Fid:'',//一级id
					Tid:'',//二级id
					price:'',
					depict:'',//规格
					Ftitle:'',
					Ttitle:'',
					twoInfo:[]
				},
				chooseItem:{},//选择的goodsitem
				orgInfos: []
			};
		},
		onLoad(option) {
			this.orderId = option.orderId;
			// this.getOrderDesc();
		},
		onShow() {
			if (this.orderId) this.getOrderDesc();
		},
		methods:{
			async getOrderDesc() {
				let res = await this.myRequest('/api/user/manage/show', {
					order_id: this.orderId
				}, 'POST');
				if (res) {
					this.orderData = res.data;
					this.businessRemark = res.data.business_remark;
					this.organCode = res.data.organ_code;
					this.prices = res.data.goods_join.map(item => {
						return item.clinch_price;
					})
					// 修改前价格都是一样的,注意要拷贝一下
					this.changedPrices = this.prices.slice();
					this.nums = res.data.goods_join.map(item => {
						return item.num;
					})
					// 初始化的折扣都是1
					this.discount = res.data.goods_join.map(item => {
						return 1;
					})
					this.areaData = res.data.address_join;
				}
			},
			async editOrganCode() {
				if (!this.organCode) {
					this.myToast('客户代码不能为空');
				}
				let res = await this.myRequest('/api/user/manage/upOrgan', {
					order_id: this.orderId,
					organ_code: this.organCode
				}, 'POST');
				if (res.message != 'success') {
					this.myToast(res.message);
				} else {
					this.myToast('修改成功');
					this.orderData.organ_code = this.organCode;
					// 修改了客户代码后需要更新下方所属公司
					this.getOrgInfo();
					this.closeMc();
				}
			},
			async getOrgInfo() {
				let res = await this.myRequest('/common/getOrgan', {
					keyword: this.orderData.organ_code,
					page:1,
					per_page:10
				}, 'GET', true, false);
				if (res.message != 'success') {
					this.myToast(res.message);
				} else {
					if (res.data.data.length) {						
						this.orderData.organ_name = res.data.data[0].name
					}
				}
			},
			async numChange(value,index) {
				if (!value.num) return;
				if (value.num < 1 || value.num > 99) {
					this.myToast('数量必须在1-99之间');
					return;
				}
				this.nums[index] = value.num;
				let res = await this.myRequest('/api/user/manage/upNum', {
					order_goods_id: this.orderData.goods_join[index].id,
					num: this.nums[index]
				}, 'POST', true, false);
				if (res.message != 'success') {
					this.myToast(res.message);
				}
			},
			showChangeDiscount(index) {
				this.changingDiscountIndex = index;
				this.changedDiscount = this.discount[index];
				this.$refs['buyCode'].open()
				this.showTc = 3;
			},
			discountChange() {
				if (this.changedDiscount < 0.01 || this.changedDiscount > 1) {
					this.myToast('折扣区间必须在0.01-1之间');
					return;
				}
				this.discount[this.changingDiscountIndex] = this.changedDiscount;
				this.changedPrices[this.changingDiscountIndex] =  this.prices[this.changingDiscountIndex] * this.changedDiscount;
				this.priceChange(this.changingDiscountIndex);
				this.closeMc();
			},
			async priceChange(index) {
				if (!this.changedPrices[index]) return;
				if (this.changedPrices[index] < 0.01 || this.changedPrices[index] > 99999999.99) {
					this.myToast('价格必须在0.01-99999999.99之间');
					return;
				}
				let score = Math.round(this.orderData.goods_join[index].clinch_integral * this.discount[index]);
				let res = await this.myRequest('/api/user/manage/upClinchPrice', {
					order_goods_id: this.orderData.goods_join[index].id,
					clinch_price: this.changedPrices[index],
					clinch_integral: score
				}, 'POST', true, false);
				if (res.message != 'success') {
					this.myToast(res.message);
				}
			},
			async deleteGood(id) {
				let res = await this.myRequest('/api/user/manage/delGoods', {
					order_goods_id: id
				}, 'POST', true, false);
				if (res.message != 'success') {
					this.myToast(res.message);
				} else {
					this.prices = [];
					this.nums = [];
					this.getOrderDesc();
				}
			},
			async remarkChange() {
				if (!this.businessRemark) return;
				let res = await this.myRequest('/api/user/manage/upRemark', {
					order_id: this.orderId,
					business_remark: this.businessRemark
				}, 'POST', true, false);
				if (res.message != 'success') {
					this.myToast(res.message);
				}
			},
			async changeOrderStatus(status) {
				if (!this.organCode) {
					this.myToast('客户代码不能为空');
					return;
				}
				if (!this.orderData.organ_name) {
					this.myToast('客户所属公司不能为空');
					return;
				}				
				let res = await this.myRequest('/api/user/manage/upStatus', {
					order_id: this.orderId,
					status
				}, 'POST', true, false);
				if (res.message == 'success') {
					this.myToast('操作成功', 1000, ()=>{
						uni.navigateBack({
							delta:1
						})
					});
				} else {
					this.myToast(res.message);
				}
			},
			async getType (souceData) {
				let res = await this.myRequest('/api/goods/getSpesc', {goods_id:souceData.goods_id}, 'GET', true, true);
				if(res.message == "success") {
					this.typeInfo = [...res.data];
					this.chooseOne(this.typeInfo[0]);
					this.$refs['buyCode'].open()
					this.showTc = 1;
				}
			},
			async confimType () {
				let data ={
					order_goods_id:this.chooseItem.id
				};
				console.log(this.chooseData)
				if(this.chooseItem.pid == 0){
					data.two_specs_id  = this.chooseData.Tid
				}
				let res = await this.myRequest('/api/user/manage/upSpecs', data, 'POST', true, true);
				this.closeMc();
				if(res.message == 'success'){
					this.getOrderDesc();
				}else{
					this.myToast(res.message)
				}
			},
			openMc (item) {
				if (item == 2) {
					this.showTc = 2;
					this.$refs['buyCode'].open()
					return;
				}
				this.chooseItem = item;
				this.getType(item);
			},
			closeMc () {
				this.showTc = false;
				this.$refs['buyCode'].close()
			},
			goEdit(id) {
				this.$store.commit('saveOrderAddress', this.areaData[this.tabIndex]);
				uni.navigateTo({
					url: `/pages/my/add-address/add-address?orderAddressId=${id}`
				});
			},
			chooseOne (item) {
				this.chooseData.Fid = item.id;
				this.chooseData.twoInfo = item.two_specs_join;
				this.chooseData.Ftitle = item.title
				this.chooseTwo(item.two_specs_join[0])
			},
			chooseTwo (item) {
				this.chooseData.Tid = item.id;
				this.chooseData.price = item.price;
				this.chooseData.depict = item.depict;
				this.chooseData.img = item.cover_pic;
				this.chooseData.Ttitle = item.title
				this.chooseData.goods_id = item.goods_id;
			}

		}
	}
</script>

<style lang="scss">
	.w100{
		max-width:100%;
		max-height: 100%;
		text-align: center;;
	}
	.main{
		width: 100%;
		height: 100vh;
		display: flex;
		background-color: #eee;
		flex-direction: column;
		overflow: hidden;
		.body{
			width: 100%;
			flex: 1;
			overflow: auto;
			.header{
				width: 100%;
				box-sizing: border-box;
				background: #fff;
				margin-bottom: 20rpx;
				.header-title{
					height: 102rpx;
					width: 100%;
					padding: 0 30rpx;
					box-sizing: border-box;
					.uni-tab {
						justify-content: space-between;
						height: 100%;
						.uni-tab-item{
							line-height:102rpx;
						}
					}
				}
				.header-content{
					width:100%;
					box-sizing: border-box;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					position:relative;
					.h-person{
						margin-bottom: 29rpx;
						line-height: 1;
					}
					.h-address{
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(153,153,153,1)
					}
					.h-img{
						position:absolute;
						right:0rpx;
						top:0;bottom:0;margin:auto;
					}
				}

			}
			.order-address{
				width: 100%;
				height: 180rpx;
				background: #fff;
				position: relative;
				padding:40rpx 30rpx;
				box-sizing: border-box;
				margin-bottom: 20rpx;
				.order-person{
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height: 1;
					margin-bottom: 30rpx;
				}
				.order-com-add{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height: 1;
				}
				.order-add-btn{
					width: 40rpx;
					height: 40rpx;
					background: url(../../../../static/edit.png) no-repeat;
					background-size: cover;
					position: absolute;
					top:0;bottom:0;
					right:30rpx;
					margin:auto;
				}
			}
			.kf-code{
				width: 100%;
				height: 110rpx;
				padding:0 70rpx 0 30rpx;
				box-sizing: border-box;

				background-color: #FFF;
				margin-bottom: 20rpx;
				position: relative;
				.kf-btn{
					width: 40rpx;
					height: 40rpx;
					background: url(../../../../static/edit.png) no-repeat;
					background-size: cover;
					position: absolute;
					top:0;bottom:0;
					right:30rpx;
					margin:auto;
				}
				.kf-content{
					width: 100%;
					height: 100%;
					line-height: 110rpx;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
			}
			.goods-box{
				width: 100%;
				background-color: #fff;
				margin-bottom: 20rpx;
				padding:0 30rpx;
				box-sizing: border-box;
				.goods-item{
					width: 100%;
					padding:30rpx 0;
					min-height: 210rpx;
					box-sizing: border-box;
					background: #fff;
					position: relative;
					border-bottom: 1rpx solid #E6E6E6;
					.goods-content{
						display: flex;
						.goods-imgbox{
							width:240rpx;
							height: 135rpx;
							// background:red;
							margin-right: 20rpx;
						}
						.goods-dis{
							flex: 1;
							.g1{
								font-size:28rpx;
								font-family:PingFang SC;
								font-weight:400;
								color:rgba(51,51,51,1);
								line-height:38rpx;
								min-height: 76rpx;
								margin-bottom: 10rpx;
							}
							.g2{
								font-size:24rpx;
								font-family:PingFang SC;
								font-weight:400;
								color:rgba(153,153,153,1);
								line-height:44rpx;
								margin-bottom: 10rpx;
								padding:8rpx 42rpx 8rpx 11rpx;
								box-sizing:border-box;
								display: inline-block;
								background:rgba(246,246,246,1);
								position: relative;
								line-height: 1;
								&:after{
									content: '';
									position: absolute;
									width: 14rpx;
									height: 7rpx;
									right: 14rpx;
									top:0;bottom:0;
									margin:auto;
									background: url(../../../../static/down.png) no-repeat;
									background-size: cover;

								}
							}
							.delete-img {
								width: 40rpx;
								height: 40rpx;
								float: right;
							}
							.g3{
								.gx-p{
									font-size:28rpx;
									font-family:PingFang SC;
									font-weight:500;
									color:rgba(237,25,58,1);
									line-height:44rpx;
								}
								.gy-p{
									font-size:20rpx;
									font-family:PingFang SC;
									font-weight:400;
									text-decoration:line-through;
									color:rgba(153,153,153,1);
									line-height:44rpx;
								}
							}
							.logistics{
								font-size:24rpx;
								font-family:PingFang SC;
								font-weight:400;
								color:rgba(153,153,153,1);
								margin-top:10rpx;
							}
						}
					}
					.goods-des{
						width: 100%;
						height: 114rpx;
						pdding-top:40rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(51,51,51,1);
						.goods-prices{
							flex: 1;
							height: 100%;
							display: flex;
							align-items: center;;
							.goods-inputs{
								width:240rpx;
								height: 64rpx;
								line-height: 64rpx;
								border:1px solid rgba(153,153,153,1);
								border-radius:10rpx;
								box-sizing: border-box;
								display: block;
								border: 1px solid #ccc;
								box-sizing: border-box;
								text-align: center;
								color: #ED193A;
							}
						}
						.goods-num{
							flex: 1;
							height: 100%;
							display: flex;
							align-items: center;;
							flex-direction:row-reverse;
							.goods-numbox{
								width:240rpx;
								height: 64rpx;
							}
						}
					}
				}

			}
			.remark-wrapper {
				width: 100%;
				background-color: #fff;
				margin-bottom: 20rpx;
				padding:0 30rpx;
				box-sizing: border-box;
			}
			.remark{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				display: flex;
				.remark-box{
					flex: 1;
					height: 100%;
					line-height: 40rpx;
					padding-top:20rpx;
					box-sizing: border-box;
				}
			}
			.last-info{
				wdith:100%;
				height: 133rpx;
				background: #FFF;
				padding:30rpx;
				box-sizing: border-box;;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height: 1;
				margin-bottom: 30rpx;
				.order-num{
					margin-bottom: 20rpx;
				}
			}
		}
		.footer{
			width: 100%;
			height: 88rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;;
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			.order-pass{
				flex: 1;
				height: 100%;
				line-height: 88rpx;
				text-align: center;;
				background:rgba(0,108,183,1);
			}
			.order-refuse{
				flex: 1;
				height: 100%;
				line-height: 88rpx;
				text-align: center;;
				background:rgba(237,25,58,1);
			}
		}
	}
	.code {
		width: 100%;
		height: 360rpx;
		background: #fff;
		padding-bottom:96rpx;
		box-sizing: border-box;
		position: relative;
		.close{
			width: 28rpx;
			height: 28rpx;
			background: url(../../../../static/c/c31close.png) no-repeat;
			background-size: cover;
			position: absolute;
			right:0rpx;top:0rpx;
		}
		.code-title{
			font-size:36rpx;
			font-family:PingFang SC;
			font-weight:600;
			color:rgba(51,51,51,1);
			margin-bottom: 60rpx;
			text-align: center;
		}
		.code-box{
			width:100%;
			height: 88rpx;
			background:rgba(246,246,246,1);
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			text-align: center;
			.code-input{
				width: 100%;
				height: 100%;
			}
		}
		.code-footer{
			width: 100%;
			height: 96rpx;
			position: fixed;
			left: 0;bottom: 0;
			text-align: center;
			line-height: 96rpx;
			background: #006CB7;
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
		}
	}
	.guige{

		.body{
			overflow: auto;
			width:100%;
			box-sizing: border-box;
			background: white;
			padding-bottom: 96rpx;
			.m1{
				width: 100%;
				height: 173rpx;
				display: flex;
				margin-bottom: 60rpx;
				background: #fff;
				padding:30rpx 0;
				box-sizing: border-box;
				z-index: 99;
				.m1-close{
					width:28rpx;
					height: 28rpx;
					position: absolute;
					top:30rpx;
					right: 30rpx;
					z-index: 66;
				}
				.m1-imgbox{
					width:200rpx;
					height: 100%;
					margin-right: 30rpx;

				}
				.m1-price{
					flex:1;
					.m1-p{
						font-size:38rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(237,25,58,1);
						margin-top:10rpx;
						line-height: 1;
						margin-bottom: 20rpx;
					}
					.m1-d{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(51,51,51,1);
						line-height:1;
					}
				}

			}

			.m2{
				width: 100%;
				margin-bottom: 40rpx;
				.m2-title{
					font-size:28rpx;
					margin-bottom: 20rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);

				}
				.m2-box{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					.m2-item{
						padding:20rpx 40rpx;
						background:rgba(255,255,255,1);
						border:1px solid rgba(205,205,205,1);
						color:#999999;
						border-radius:10rpx;
						margin-bottom: 30rpx;
						font-size: 28rpx;
						text-align: center;
						line-height: 1;
						box-sizing: border-box;
						margin-right: 30rpx;
						&.active{
							color:#006CB7;
							border:1px solid rgba(0,108,183,1);
						}
					}
				}

			}
			.m3{
				width: 100%;
				margin-bottom: 40rpx;
				.m3-title{
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-bottom: 20rpx;
				}
				.m3-box{
					width: 100%;
					display: flex;
					flex-wrap: wrap;

					.m3-item{
						padding:20rpx 40rpx;
						margin-bottom: 30rpx;
						background:rgba(255,255,255,1);
						border:1px solid rgba(205,205,205,1);
						color:#999999;
						border-radius:10rpx;
						font-size: 28rpx;
						margin-right: 30rpx;;
						text-align: center;
						line-height: 1;
						box-sizing: border-box;
						&.active{
							color:#006CB7;
							border:1px solid rgba(0,108,183,1);
						}
					}
				}
				.m3-tips{
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:1;
					margin-bottom: 40rpx;
				}
			}


		}
		.footer{
			width:100%;
			height: 96rpx;
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			background:rgba(0,108,183,1);
			text-align: center;
			line-height: 96rpx;
			position:fixed;
			left:0;bottom:0;
			z-index: 665;
			display: block;
		}
	}
</style>

<template>
	<view class="main">
		<view class="m1">
			<view class="m1-imgbox">
				<image :src="subData.cover_pic" mode="" class="w100"></image>
			</view>
			<view class="m1-price">
				<view class="m1-p">
					¥{{subData.show_price}}
				</view>
				<view class="m1-d" v-if="chooseStr">
					已选：{{chooseStr}}
				</view>
			</view>
			<image src="../static/c/c31close.png" mode="" class="m1-close" @click="close"></image>
		</view>
		<view class="body">
			<view class="m2" v-if="goodsInfo.length > 0">
				<view class="m2-title">
					{{listData.one_specs}}
				</view>
				<viwe class="m2-box">  
					<view class="m2-item" :class="{active:subData.colorId == item.id}" v-for="(item,index) in goodsInfo" :key="index" @click="changeColor(item)">
						{{item.title}}
					</view>
				</viwe>
			</view>
			<view class="m3">
				<view class="m3-title" >
					{{listData.two_specs}}
				</view>
				<viwe class="m3-box">  
					<view class="m3-item" :class="{active:subData.mId == item.id}" v-for="(item,index) in subData.mlist" :key="index" @click="changeSize(item)">
						{{item.title}}
					</view>
				</viwe>
				<view class="m3-tips">
					对应规格：100次
				</view>
			</view>
			<view class="m4">
				<view class="m4-title">
					数量
				</view>
				<view class="m4-numbox">
					<uniNumberBox :min="1" :max="9"  @change="bindChange"></uniNumberBox>
				</view>
			</view>
		<!-- v-if="goodsInfo.attach_goods.length > 0" -->
			<view class="m5" >
				<view class="m5-title">
					组合商品
				</view>
				<view class="m5-box">
					<view class="m5-item" v-for="(item,index) in attach_goods" :key="index">
						<label class="m5-checkbox" >
								<checkbox class="m5-cb" @click="checkItem(item)"  />
						</label>
						<view class="m5-goods">
							<view class="m5-imgbox">
								<image :src="item.img" mode="" class="w100"></image>
							</view>
							<view class="m5-ds">
								<view class="m5-d1">
									{{item.goods_attach_join.title}}            
								</view>
								<view class="m5-d2" @click="openMc(item)">
									{{item.discription}}
								</view>
								<view class="m5-d3">
									<text>组合价：</text>
									<text class="m5-sj">¥{{item.price}} </text>
									<text class="m5-yj">￥{{item.yPrice}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer" @click="addShopCar">确认</view>
		<uniPopup ref="buyCode" type="bottom" class="buy-wrapper" >
			<view class="m2" v-if=" showTwo ">
				<view class="m2-title">
					{{listData.one_specs}}
				</view>
				<viwe class="m2-box">  
					<view class="m2-item" :class="{active:zhgoods.Oid == item.id}" v-for="(item,index) in zhgoods.goods_attach_join.one_specs_join" :key="index" @click="changeOne(item,zhgoods)">
						{{item.title}}
					</view>
				</viwe>
			</view>
			<view class="m3">
				<view class="m3-title" >
					{{listData.two_specs}}
				</view>
				<viwe class="m3-box">  
					<view class="m3-item" :class="{active:zhgoods.Tid == val.id}" v-for="(val,index) in zht_goods" :key="index" @click="changeTwo(val,zhgoods)">
						{{val.title}}
						<!-- {{'a' + zhgoods.Tid +"b" +val.id }} -->
					</view>
				</viwe>
			</view>
			
		</uniPopup>
	</view>
</template>

<script>
	import LoginPage from '@/components/login-page.vue';
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		props:['listData','type'],
		name: 'specification',
		components: {
			uniNumberBox,
			uniPopup,
			LoginPage
		},
		data() {
			return {
				showLoginPage:false,
				subData:{ //下单信息 加入购物车
					num:1,
					colorId:'', //颜色Id 一级id
					colorTitle:'', //颜色名字
					models:'',//规格
					mId:'',  //二级id
					mlist:[],
					show_price:'',
					cover_pic:'',
					attach_goods:[]
				},
				goodsInfo:[], //页面回显信息,
				zhgoods:[],
				zht_goods:[],
				attach_goods:[],//组合商品
				showTwo :false,
				orderData:{ //预约下单
					address_id_arr:[],	
					organ_code:'',	
					deduct_id:'',	
					remark:'',	
					goods_id:'',	
					two_specs_id:'',	
					cart_attach_arr:[{
						goods_attach_id:'',
						attach_goods_id	:'',
						attach_price_id	:'',
						num:'',
					}]
					
				}
				
			};
		},
		computed:{
			chooseStr () {
				return this.subData.colorTitle +" " + this.subData.models 
			}
		},
		onLoad (option) {
			
		},
		onShow () {
			this.getInfo();
		},
		methods:{
			async getInfo () { //获取列表
				let res = await this.myRequest('/api/goods/getSpesc', {goods_id:this.listData.id}, 'GET', false);
				if(res.message == "success"){
					this.goodsInfo = [...res.data];
					this.changeColor(this.goodsInfo[0]);
					this.goodsGroups();
				}
			},
			async goodsGroups () { //获取组合商品列表
				let res = await this.myRequest('/api/goods/attachGoods', {goods_id:this.listData.id}, 'GET', false);
				if(res.message == "success"){
					this.attach_goods = [...res.data];	
					this.attach_goods.map(item=>{
						item.img = '' ; 
						item.price = ''; //现价
						item.yPrice = '';//原价
						item.discription = ''; 
						item.Oid = ''; //一级id
						item.Tid =''; //二级id
						item.price_id = '';
						item.goods_attach_id = '';
						this.zhgoods = item;
						this.changeOne(item.goods_attach_join.one_specs_join[0],item)
					})
				}
			},
			async addShopCar () { //加入购物车
				if(this.type == 'choose'){
					this.$emit('closeWin')
					return;
				}else if(this.type == 'order'){
					let arr =[{
						goods_title:this.listData.title,
						goods_cover_pic:this.listData.cover_pic,
						price:this.subData.show_price,
						num:this.subData.num,
						one_specs_title:this.subData.colorTitle,
						two_specs_title:this.subData.models,
						id:this.listData.id
					}];
					
					
					let orderData = {
						goods_id: this.listData.id,
						two_specs_id:this.subData.mId,
						num:this.subData.num,
						cart_attach_arr:[]						
					}
					
				 	this.subData.attach_goods && this.subData.attach_goods.map(item=>{
						let obj = {}
						obj.goods_attach_id = item.goods_attach_id;
						obj.attach_goods_id = item.attach_goods_id;
						obj.attach_price_id = item.attach_price_id;
						obj.num = 1
						orderData.cart_attach_arr.push(obj)
					});
					uni.setStorageSync("orderInfo",JSON.stringify(orderData));
					uni.setStorageSync("goodsInfo",JSON.stringify(arr));
					uni.navigateTo({
						url: `/pages/car/confirm-order/confirm-order?order=true`
					});
					this.$emit('closeWin')
					return;
				}else{
					let arr = [];
					if(this.subData.attach_goods.length > 0) {
						for(let i = 0,len = this.subData.attach_goods.length;i < len;i++){
							let item = this.subData.attach_goods[i];
							let obj = {};
							obj.goods_attach_id =item.goods_attach_id;
							obj.attach_goods_id =item.attach_goods_id;
							obj.attach_price_id =item.price_id;
							obj.num = 1;
							arr.push(obj);
						}
					}
					
					let data = {
						api_token:this.$store.state.userToken.api_token,
						goods_id:this.listData.id,
						two_specs_id:this.subData.mId,
						num:this.subData.num,
					};
					if(arr.length > 0 ){
						data.cart_attach_arr = arr;
					}
					let res = await this.myRequest('/api/user/cart/store', data , 'POST', false);
					if(res.message =="success"){
						uni.showToast({
							title:'加入购物车成功',
							
						})
						this.$emit('closeWin')
					}
				}
				
				
			},
			close () {
				this.$emit('closeWin')
			},
			bindChange (data) {
				if(isNaN(data.num)){
					this.subData.num = 1
				}else{
					this.subData.num = data.num;
				}
			},
			changeOne (data,item) { //组合商品 一级
				item.discription = data.title;
				item.Oid =  data.id;
				this.zht_goods = data.two_specs_join;
				this.changeTwo(data.two_specs_join[0],item)
			},
			changeTwo (item,data) { //组合商品 二级
				data.price = item.attach_price;
				data.yPrice = item.price;
				data.img = item.cover_pic;
				data.Tid = item.id;
				data.price_id = item.attach_price_id;
				data.goods_attach_id = item.goods_attach_id;
				data.discription = data.discription + ";" + item.title
			},
			changeColor (item) { //选择颜色
				this.subData.colorTitle = item.title
				this.subData.colorId = item.id
				this.subData.mlist = item.two_specs_join;
				this.changeSize(item.two_specs_join[0])
			},
			changeSize (item) { //选择规格
				this.subData.mId = item.id;
				this.subData.models = item.title;
				this.subData.show_price = item.price;
				this.subData.cover_pic = item.cover_pic;
				
			},
			openMc (item) {
				this.zhgoods = item;
				this.changeOne(item.goods_attach_join.one_specs_join[0],item)
				this.showTwo =true
				this.$refs['buyCode'].open()
			},
			closeMc () {
				this.$refs['buyCode'] && this.$refs['buyCode'].close();
				this.showTwo =false;
			},
			checkItem (val) { //选择组合商品
				let idx ;
				if(this.subData.attach_goods.length == 0 ){
					this.subData.attach_goods.push(val)
				}else{
					if(!this.subData.attach_goods.every((item,index)=>{
						if(item.attach_goods_id == val.attach_goods_id){
							idx = index;
							return true
						}else{
							return false
						}
						
					})){
						this.subData.attach_goods.push(val)
					}else{
						this.subData.attach_goods.splice(idx,1)
					}
				}
				
			},
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
					// uni.switchTab({
					// 	url: '/pages/index/index'
					// });
					// return;
				}
				if (this.$store.state.userToken.api_token) {
					this.getUserInfo();
				}
				this.showLoginPage = false;
				// uni.showTabBar();
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
		},
		
		mounted () {
			this.getInfo()
			
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
		height: 100%;
		display: flex;
		flex-direction: column;;
		position: relative;
		overflow: hidden;
		padding-top:173rpx;
		background: #fff;
		padding-bottom:96rpx;
		.m1{
			width: 100%;
			height: 173rpx;
			display: flex;
			margin-bottom: 60rpx;
			position: fixed;
			top:0;left:0;
			background: #fff;
			padding:30rpx;
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
		.body{
			flex: 1;
			overflow: auto;
			width:100%;
			box-sizing: border-box;
			background: white;
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
			.m4{
				width: 100%;
				margin-bottom: 40rpx;
				.m4-title{
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-bottom: 20rpx;
				}
				
			}
			.m5{
				width: 100%;
				margin-bottom: 40rpx;
				.m5-title{
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					margin-bottom: 30rpx;
				}
				.m5-box{
					width: 100%;
					.m5-item{
						width: 100%;
						margin-bottom: 30rpx;
						// height: 150rpx;
						padding-bottom: 30rpx;
						display: flex;
						border-bottom:1px solid rgba(230,230,230,1);
						box-sizing: border-box;
						.m5-checkbox{
							width: 70rpx;
							height: 100%;
							.m5-cb{
								margin-top:37rpx;
								width:39rpx;
								height:39rpx;
								border-radius: 50%;
								.wx-checkbox-input{
									width:39rpx;
									height:39rpx;
									border-radius: 50%;
								}
							}
						}
						.m5-goods{
							flex: 1;
							display: flex;
							.m5-imgbox{
								width:200rpx;
								height: 113rpx;
								margin-right: 20rpx;
								// background: red;
							}
							.m5-ds{
								flex: 1;
								.m5-d1{
									width: 100%;
									font-size:28rpx;
									font-family:PingFang SC;
									font-weight:400;
									color:rgba(51,51,51,1);
									line-height:36rpx;
								}
								.m5-d2{
									padding:8rpx 42rpx 11px;
									line-height: 1;
									margin-bottom: 20rpx;
									font-size: 24rpx;
									color:rgba(153,153,153,1);
									background:rgba(246,246,246,1);
									margin-top: 20rpx;
									position: relative;
									display: inline-block;
									&:after{
										content: '';
										width:15rpx;
										height: 8rpx;
										position: absolute;
										right: 13rpx;
										top:0;
										bottom:0;
										margin:auto;
										//background: url('../static/down.png') no-repeat;
										background-size: cover;
									}
								}
								.m5-d3{
									font-size:24rpx;
									font-family:PingFang SC;
									font-weight:400;
									color:rgba(153,153,153,1);
									line-height: 1;
									.m5-sj{
										font-size: 28rpx;
										color:#ED193A;
									}
									.m5-yj{
											text-decoration:line-through;
									}
								}
							}
						}
					}
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
		.buy-wrapper{
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
	}
</style>

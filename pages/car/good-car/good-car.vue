<template>
	<view class="main">
		<view class="body">
			<uni-Swipe-Action :options="option" @click="delClick(item)"  v-for="(item,index) in goodsInfo" :key="index">
				<view class="goods-item">
						<label class='goods-check'>
							<checkbox class="check-box" :checked="item.checked" @click="check('item',index)" :disabled="item.goods_is_buy == 0"/>
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
						<uniNumberBox 
							:min="1" 
							:max="99"  
							:index="index"
							:value="item.num" 
							@change="bindChange"
							class="num-box">
						</uniNumberBox>
				</view>
			</uni-Swipe-Action>
		</view>
		<view class="footer">
			<view class="action">
				<label class="all-box" @click="check('all')">
					<checkbox class="all-checkbox" :checked="allChecked"/>
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
	import {uniSwipeAction} from "@/components/uni-swipe-action/uni-swipe-action.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import LoginPage from '@/components/login-page.vue';
	export default {
		data() {
			return {
				showLoginPage: false,
				index:1,
				goodsInfo:[],
				total:0,
				empty:'',
				allChecked:false,
				option:[
					{
						text: '删除',
						style: {
							backgroundColor: '#ED193A'
						}
					}
				]				
			}
		},
		onLoad() {
			
		},
		onShow () {
			
		},
		onPullDownRefresh() {
		        console.log('refresh');
				this.getList();
		        setTimeout(function () {
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
				this.getList();
			}
			this.showLoginPage = false;
			uni.showTabBar();
			},
			bindChange (data) {
				// this.goodsInfo[data.index].num = data.num;
				// this.calcTotal(this.goodsInfo[data.index],data.num);
				this.changeNum(this.goodsInfo[data.index],data.num)
				
			},
			async changeNum (item,num) { //修改商品数量
				let res = await this.myRequest('/api/user/cart/upNum', {
					shop_cart_id:item.id,
					shop_cart_attach_id:'',
					num:num
				}, 'POST', false);
				if(res.message == "success"){
					item.num = num;
					this.calcTotal();
				}
			},
			delClick (item) {
				let that = this;
				uni.showModal({
				    title: '确定删除',
				    content: '这是一个模态弹窗',
				    success: function (res) {
				        if (res.confirm) {
				           that.delGoods(item.id)
				        } else if (res.cancel) {
				            
				        }
				    }
				});
			},
			async delGoods (id) { //删除商品
				let res = await this.myRequest('/api/user/cart/destroy', {
					api_token:this.$store.state.userToken.api_token,
					shop_cart_id:id
				}, 'POST', false);
				if(res.message == "success"){
					uni.showToast({
						title:'删除商品成功'
					})
					this.getList()
				}
			},
			async getList () { //获取购物车列表
					let res = await this.myRequest('/api/user/cart/list', {
						api_token:this.$store.state.userToken.api_token,
						page:this.index,
						per_page:10
					}, 'POST', false);
					if (res.message == "success") {
						this.goodsInfo = [...res.data.data];
						this.goodsInfo.map(item=>{
							item.checked = false;
						})
					}
				
			},
			calcTotal(){ //计算总价
				if(this.goodsInfo.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				this.goodsInfo.forEach(item=>{
					if(item.checked === true){
						total += item.price * item.num;
					}else {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total);
				this.total = this.total.toFixed(2)
			},
			check(type, index){ //选择单个商品 、全选
				if(type === 'item'){
					this.goodsInfo[index].checked = !this.goodsInfo[index].checked;
				}else{
					const checked = !this.allChecked
					this.goodsInfo.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal();
			},
			confirm () {
				let arr = [];
				this.goodsInfo.map(res=>{
					if(res.checked == true){
						arr.push(res)
					}
				})
				if(arr.length == 0){
					uni.showToast({
						title:'请选择你要下单的商品'
					})
					return ;
				}
				uni.setStorageSync("goodsInfo",JSON.stringify(arr));
				uni.navigateTo({
					url: `/pages/car/confirm-order/confirm-order`
				});
			}
		},
		components: {
			LoginPage,
			uniNumberBox,
			uniSwipeAction
		}
	}
</script>

<style lang="scss">
	.w100{
		width: 100%;
		height: 100%;
	}
	.main{
		width: 100%;
		height: 100vh;
		background-color: #eee;
		display: flex;
		flex-direction: column;
		.body{
			width: 100%;
			flex: 1;
			.goods-item{
				width: 100%;
				padding:30rpx;
				min-height: 238rpx;
				box-sizing: border-box;
				display: flex;
				background: #fff;
				position: relative;
				.goods-check{
					width:70rpx;
					margin-top:40rpx;
					height: 100%;
					display: flex;
					align-items: center;
				}
				.goods-content{
					flex: 1;
					display: flex;
					.goods-imgbox{
						width:240rpx;
						height: 135rpx;
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
							margin-bottom: 10rpx;
						}
						.g2{
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height:44rpx;
							margin-bottom: 10rpx;
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
					}
				}
				.num-box{
					width:180rpx;
					height: 48rpx;
					position: absolute;
					right:30rpx;
					bottom:30rpx;
					z-index: 6;
					.uni-numbox{
						width:100%;
						height: 100%;
					}
				}	
			}
		}
		.footer{
			width: 100%;
			height: 96rpx;
			background-color: #fff;
			display: flex;
			.confirm{
				width: 200rpx;
				height: 100%;
				background: #006CB7;
				line-height: 96rpx;
				text-align: center;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(255,255,255,1);
				
			}
			.action{
				flex: 1;
				padding :0 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				
				.all-box{
					display: flex;
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					align-items: center;
					.all-checkbox{
						width: 40rpx;
						height: 40rpx;
						margin-right: 32rpx;
					}
				}
				
			}
			.total{
				display: flex;
				align-items: center;;
				.t-price{
					font-size:32rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:#ED193A;
				}
				.tw{
					font-size:24rpx;
					font-family:PingFang SC;
					color:#333333
				}
			}
			
		}
	}
	
	
</style>

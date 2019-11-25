<template>
	<view class="main">
		<view class="header">
			<view class="header-title">
				<sun-tab :value.sync="tabIndex" :tabList="tabList" :scroll="true" defaultColor="#333333" activeColor="#006CB7"></sun-tab>
			</view>
			<view class="header-content">
				<view class="h-person">时先生 16610039071</view>
				<view class="h-address">北京市丰台区宋家庄位子坑149号庄子写字楼北楼一层</view>
				<image src="../../../static/c/c30gg.png" mode="" class="goOn h-img"></image>
			</view>
		</view>
		<view class="content-box">
			<!-- 客户代码 -->
			<view class="code">
				<text class="c-t">客户代码：</text>
				<input class="c-input" v-model="subData.organ_code" type="text" placeholder="请输入...">
			</view>
			<view class="goods-box">
				<view class="goods-item" v-for="(item,index) in goodsInfo" :key="index">
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
			</view>
			<view class="discount">
				<view class="dis-title">优惠</view>
				<view class="dis-content">
					100积分，抵扣
					<text style="color:#ED193A">￥10</text>
				</view>
				<image src="../../../static/c/c30gg.png" class="goOn d-img" mode=""></image>
			</view>
			<view class="remark">
				<view class="re-title">备注信息：</view>
				<textarea class="re-content" v-model="subData.remark" placeholder="填写留言信息" />
			</view>
		</view>
		<view class="footer">
			<view class="agreement">
					<checkbox :checked="isWatch" @click="check"/>
					<text>
                            我已阅读并同意
                    </text>
					<text style="color: #006CB7;">《用户协议》</text>
				
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
	export default {
		components:{
			sunTab
		},
		data() {
			return {
				total:0,
				tabIndex:0,
				isWatch:false,
				tabList:['公司地址',"发货地址","发票邮寄地址"],
				goodsInfo:[],
				subData:{
					remark:'',
					organ_code:'',
					deduct_id:'',
					cart_id_arr:[],
					address_id_arr:[1],
				},
				isOrder:false,
				
			};
		},
		methods:{
			calcTotal(){ //计算总价
				if(this.goodsInfo.length == 0){
					this.total = 0;
					return ;
				}
				let total = 0;
				this.goodsInfo.forEach(item=>{
						total += item.price * item.num;
				})
				this.total = Number(total);
				this.total = this.total.toFixed(2)
			},
			check () {
				this.isWatch = !this.isWatch;
			},
			async confirm () {
				if(this.isWatch == false){
					uni.showToast({
						title:'请勾选用户协议'
					})
					return;
				}
				let res;
				if(this.isOrder){
					let orderInfo = {...this.subData}
					let value = uni.getStorageSync('orderInfo');
						value = JSON.parse(value);
						for (let i in value){
							orderInfo[i] = value[i]
						}
						delete orderInfo.cart_id_arr;
					res = await this.myRequest('/api/goods/order/goodsStore', orderInfo, 'POST', false);
				}else{
					this.goodsInfo.map(item=>{
						this.subData.cart_id_arr.push(item.id)
					})
					res = await this.myRequest('/api/goods/order/cartStore', this.subData, 'POST', false);
				}
				
				if(res.message == "success"){
					uni.showToast({
						title:'购买成功'
					})
				}
			}
		},
		onShow () {
			try {
			    const value = uni.getStorageSync('goodsInfo');
			    if (value) {
			       this.goodsInfo = JSON.parse(value)
				   console.log(this.goodsInfo)
				   this.calcTotal()
			    }
			} catch (e) {
			    // error
			}
		},
		onLoad (option) {
			if(option){
				this.isOrder = option.order;
			}
			
		}
	}
</script>

<style lang="scss">
	.goOn{
		width:16rpx;
		height: 25rpx;
	}
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
		box-sizing: border-box;
		justify-content: space-between;
		.header{
			width: 100%;
			padding:0 30rpx;
			box-sizing: border-box;
			background: #fff;
			margin-bottom: 20rpx;
			.header-title{
				height: 102rpx;
				width: 100%;
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
				padding:39rpx 46rpx 26rpx 8rpx;
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
		.footer{
			width: 100%;
			height: 190rpx;
			.agreement{
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				width: 100%;
				height: 95rpx;
				padding:0 30rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
			}
			.comfirm-box{
				width:100%;
				height: 95rpx;
				background-color: #fff;
				padding-right: 300rpx;
				box-sizing: border-box;
				position: relative;
				.com-btn{
					position: absolute;
					z-index: 66;;
					top:0;
					right: 0;
					width:200rpx;
					height: 100%;
					background: #006CB7;
					color:#fff;
					border-radius: 0;
					text-align: center;
					line-height: 95rpx;
				}
				.total{
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					font-size:28rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(51,51,51,1);
					padding-left:30rpx;
					box-sizing: border-box;
					.totalNum{
						font-size: 36rpx;
						color:#ED193A;
					}
				}
			}
		}
		.content-box{
			width: 100%;
			flex: 1;
			overflow: auto;
			.code{
				width: 100%;
				height: 110rpx;
				padding:0 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				display: flex;
				align-items: center;;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				margin-bottom: 20rpx;
				.c-input{
					flex: 1;
				}
			}
			.goods-box{
				width:100%;
				padding:0 30rpx;
				box-sizing: border-box;
				background-color:#fff;
				.goods-item{
					width: 100%;
					padding:30rpx 0;
					min-height: 210rpx;
					box-sizing: border-box;
					display: flex;
					background: #fff;
					position: relative;
					border-bottom: 1rpx solid #E6E6E6;
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
					.num{
						position:absolute;
						right:0rpx;
						bottom:30rpx;
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(153,153,153,1);
					}	
				}
			}
			.discount{
				width: 100%;
				padding:0 67rpx 0 30rpx;
				box-sizing: border-box;
				height: 110rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;	
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				background-color: #fff;
				margin-bottom: 20rpx;
				position:relative;
				.d-img{
					position:absolute;
					right:30rpx;
					top:30rpx;
					bottom:30rpx;
					margin:auto;
				}
			}
			.remark{
				width: 100%;
				height: 280rpx;
				padding:40rpx 30rpx;
				box-sizing: border-box;
				background-color:#fff;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
				display: flex;
				.re-content{
					flex: 1;
					height: 100%;
				}
				
			}
			
		}
	}
</style>

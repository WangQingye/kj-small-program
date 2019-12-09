<template>
	<view class="main">
		<uni-Swipe-Action :options="option" v-for="(item,index) in list" :key="index" @click="bindClick(item.id)">
			<view class="goods-item" >
				<!-- 	<label class='goods-check'>
						<checkbox class="check-box"/>
					</label> -->
					<view class="goods-content">
						<view class="goods-imgbox">
							<image class="w100" :src="item.goods_join.cover_pic"></image>
						</view>
						<view class="goods-dis">
							<view class="g1">
								{{item.goods_join.title}}
							</view>
							<view class="g2">
								<!-- 干血斑;DP362-01 -->
							</view>
							<view class="g3">
								<text class="gx-p">¥{{item.goods_join.show_price}}</text>
								<!-- <text class="gy-p">￥1999</text> -->
							</view>
						</view>
					</view>
					<uniNumberBox :min="1" :max="99"  :value="1" @change="bindChange" class="num-box"></uniNumberBox>
			</view>
		</uni-swipe-action>
		<load-more :status="status"></load-more>
	</view>
</template>

<script>
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {uniSwipeAction} from "@/components/uni-swipe-action/uni-swipe-action.vue"
	export default {
		components:{
			uniSwipeAction
		},
		data() {
			return {
				option:[
					{
						text: '取消收藏',
						style: {
							backgroundColor: '#ED193A'
						}
					}
				],
				list:[],
				status: 'more',
				index:1
			};
		},
		methods:{
			async getList () {
				let res = await this.myRequest('/api/user/collect/index', {page:this.index,per_page:10}, 'POST', false);
				if(res.message == "success"){
					console.log(res)
					if (res.data.data.length < 9) {
						this.status = "noMore";
					} else {
						this.status = "more"
					}
					if (this.index == 1) {
						this.list = res.data.data;
					} else {
						this.list = this.list.concat(res.data.data);
					}
				}
			},
			bindClick (id) {
				console.log(id)
				let that = this;
				uni.showModal({
					title: '确定删除',
					content: '',
					success: function(res) {
						if (res.confirm) {
							that.del(id)
						} else if (res.cancel) {
				
						}
					}
				});
			},
			async del (id) {
				
				let res = await this.myRequest('/api/user/collect/destroy', {goods_collect_id:id}, 'POST', false);
				if(res.message == "success"){
					this.index = 1;
					this.list = [];
					this.getList()
				}
			}
		},
		onShow () {
			this.getList()
		},
		onReachBottom() {
			if (this.status == 'more') {
				this.index++;
				this.getList();
			}
		},
	}
</script>

<style lang="scss">
	.w100{
		width:100%;
		height: 100%;
	}
	.main{
		width:100%;
		background:#fff;
		min-height:100vh;
		box-sizing: border-box;
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
				height: 100%;
				display: flex;
				align-items: center;
			}
			.goods-content{
				flex: 1;
				display: flex;
				border-bottom: 1rpx solid #ccc;;
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
						margin-bottom: 54rpx;
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
</style>

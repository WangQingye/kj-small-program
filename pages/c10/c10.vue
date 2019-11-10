<template>
	<view class="main">
		<scroll-view scroll-y="true" class="left-aside">
			<view v-for="item in 4 " :key="item" class="aside-item" :class="{active: item == 0}" >
				PingFangSC-Regular
			</view>
		</scroll-view>
		<view class="scroll-body"> 
			<view class="scroll-title">
				<text class="scroll-world">{{title}}</text>
			</view>
			<scroll-view scroll-y="true" class="scroll-box">
				<view class="scorll-item">
					
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'PingFangSC-Regular',
				listInfo:{
					level:1,
					
					page:1,
					per_page:10
				}
			};
		},
		methods:{
			async pageInfo () {
				let res = await this.myRequest('/common/upload', this.listInfo, 'GET', false);
				console.log(res)
				if (res && res.error_code == 0) {
					
				}
			}
		},
		mounted () {
			this.pageInfo()
		}
	}
</script>

<style lang="scss">
	.main{
		width: 100%;
		height: 100vh;
		display: flex;
		.left-aside{
			width:240rpx;
			height:100%;
			background:rgba(245,245,245,1);
			.aside-item{
				width:100%;
				height: 130rpx;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:400;
				padding-left: 28rpx;
				display: flex;
				align-items: center;;
				position:relative;
				color:rgba(153,153,153,1);
				box-sizing: border-box;
				&.active{
					color:#006CB7;
					background: #fff;
					&:after{
						content: '';
						width:6rpx;
						height: 36rpx;
						position: absolute;
						left:0;top:0;bottom:0;
						margin:auto;
						background: #ED193A;
					}
				}
			}
		}
		.scroll-body{
			flex: 1;
			width:100%;
			padding:0 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.scroll-title{
				width: 100%;
				height:130rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.scroll-world{
					display: flex;
					align-items: center;
					
					&:after{
						content:'';
						width:20rpx;
						height: 4rpx;
						background: #ED193A;
						margin-left:20rpx;
						
					}
					&:before{
						content:'';
						width:20rpx;
						height: 4rpx;
						background: #ED193A;
						margin-right: 20rpx;
					}
				}
			}
			.scroll-box{
				width: 100%;
				flex: 1;
				.scorll-item{
					width:100%;
					height: 130rpx;
					margin-bottom: 20rpx;
					background: red;
				}
			}
		}
	}
	
</style>

<template>
	<view class="main">
		<scroll-view scroll-y="true" class="left-aside">
			<view v-for="item in 4 " :key="item" class="aside-item" :class="{active: item == 0}" >
				PingFangSC-Regular
			</view>
		</scroll-view>
		<view class="scroll-body"> 
			<view class="scroll-title">
				<text>{{title}}</text>
			</view>
			<scroll-view scroll-y="true" ></scroll-view>
		</view>
		
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'PingFangSC-Regular'
			};
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
			.scroll-title{
				width: 100%;
				height:130rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	
</style>

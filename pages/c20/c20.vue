<template>
	<view class="main">
		<view class="title">
			<view class="t-item">默认</view>
			<view class="t-item">上新</view>
			<view class="t-item">热销</view>
		</view>
		<view class="content">
			<view class="c-item">
				<view class="item-box">
					<view class="img-box">
							<image style="width: 100%;height: 100%;" src="" mode=""></image>
					</view>
					<view class="item-discription">
						QIAamp Circulating Nucleic Acid Kit
					</view>
					<view class="item-price">
						￥1999
						<text style="font-size:24rpx">起</text>
					</view>
				</view>
			</view>
			<view class="c-item">
				<view class="item-box">
					<view class="img-box">
							<image style="width: 100%;height: 100%;" src="" mode=""></image>
					</view>
					<view class="item-discription">
						QIAamp Circulating Nucleic Acid Kit
					</view>
					<view class="item-price">
						￥1999
						<text style="font-size:24rpx">起</text>
					</view>
				</view>
			</view>
			<view class="c-item">
				<view class="item-box">
					<view class="img-box">
						<image style="width: 100%;height: 100%;" src="" mode=""></image>
					</view>
					<view class="item-discription">
						QIAamp Circulating Nucleic Acid Kit
					</view>
					<view class="item-price">
						￥1999
						<text style="font-size:24rpx">起</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.main{
		width: 100%;
		height: 100vh;
		overflow: hidden;
		font-family:PingFang SC;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		.title{
			width: 100%;
			height: 100rpx;
			display: flex;
			border-bottom: 1rpx solid #eee;
			box-sizing: border-box;
			padding: 48rpx 0 24rpx 0;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:400;
			display: flex;
			justify-content: space-between;
			.t-item{
				flex: 1;
				height: 100%;
				text-align: center;
				line-height: 1;
				border-right: 1rpx solid #eee;
				box-sizing: border-box;
				&:last-child{
					border-right: 0;
				}
			}
		}
		.content{
			width: 100%;
			flex: 1;
			box-sizing: border-box;
			padding: 27rpx 24rpx;
			// display: flex;
			// flex-wrap: wrap;
			// justify-content: space-between;
			.c-item{
				width: 336rpx;
				float: left;
				margin-bottom: 40rpx;
				&:nth-child(2n-1){
					margin-right: 30rpx;
				}
				.item-box{
					width: 100%;
					.img-box{
						width:100%;
						height: 190rpx;
						background: red;
						margin-bottom: 22rpx;
					}
					.item-discription{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(51,51,51,1);
						margin-bottom: 20rpx;
					}
					.item-price{
						font-size:32rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(237,25,58,1);
						line-height: 1;
					}
				}
			}
		}
	}
</style>

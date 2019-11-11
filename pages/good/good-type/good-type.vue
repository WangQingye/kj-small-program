<template>
	<view>
		<search-input />

		<view class="main">
			<scroll-view scroll-y="true" class="left-aside">
				<view v-for="(item,index) in bigType " :key="index" class="aside-item" :class="{active: index == activeIndex}"
				 @click="clickBigType(item,index)">
					{{item.title}}
				</view>
			</scroll-view>
			<view class="scroll-body">
				<view class="scroll-title">
					<text class="scroll-world">{{bigTypeTile}}</text>
				</view>
				<scroll-view scroll-y="true" class="scroll-box">
					<view class="scorll-item" v-for="(item,index) in smallType" :key="index" @click="clickSmallType(item)">
						<image class="small-type-img" :src="item.cover_pic" mode=""></image>
					</view>
				</scroll-view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		SearchInput
	} from "@/components/search-input.vue";
	export default {
		data() {
			return {
				title: 'PingFangSC-Regular',
				bigType: [],
				smallType: [],
				activeIndex: 0,
				bigTypeTile: ""
			};
		},
		methods: {
			clickBigType(item, index) {
				this.activeIndex = index;
				this.getSmallType(item);
			},
			clickSmallType(item) {
				uni.navigateTo({
					url: `/pages/good/good-list/good-list?typeId=${item.id}`
				});
			},
			async pageInfo() {
				let res = await this.myRequest('/common/goodsType', {
					level: 1,
					page: 1,
					per_page: 1000
				}, 'GET', false);
				if (res.data.data.length) {
					this.bigType = res.data.data;
					this.getSmallType(this.bigType[0]);
				}
			},
			async getSmallType(bigType) {
				this.bigTypeTile = bigType.title
				let res = await this.myRequest('/common/goodsType', {
					level: 2,
					goods_type_id: bigType.id,
					page: 1,
					per_page: 1000
				}, 'GET', false);
				console.log(res)
				if (res.data.data.length) {
					this.smallType = res.data.data;
				}
			}
		},
		mounted() {
			this.pageInfo()
		},
		components: {
			SearchInput
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		height: 100vh;
		display: flex;
		border-top: 1rpx solid #E6E6E6;
		margin-top: 20rpx;
		.left-aside {
			width: 240rpx;
			height: 100%;
			background: rgba(245, 245, 245, 1);

			.aside-item {
				width: 100%;
				height: 130rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				padding-left: 28rpx;
				display: flex;
				align-items: center;
				;
				position: relative;
				color: rgba(153, 153, 153, 1);
				box-sizing: border-box;

				&.active {
					color: #006CB7;
					background: #fff;

					&:after {
						content: '';
						width: 6rpx;
						height: 36rpx;
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						margin: auto;
						background: #ED193A;
					}
				}
			}
		}

		.scroll-body {
			flex: 1;
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.scroll-title {
				width: 100%;
				height: 130rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.scroll-world {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					&:after {
						content: '';
						width: 20rpx;
						height: 4rpx;
						background: #ED193A;
						margin-left: 20rpx;

					}

					&:before {
						content: '';
						width: 20rpx;
						height: 4rpx;
						background: #ED193A;
						margin-right: 20rpx;
					}
				}
			}

			.scroll-box {
				width: 100%;
				flex: 1;

				.scorll-item {
					width: 100%;
					height: 130rpx;
					margin-bottom: 20rpx;
					.small-type-img {
						width: 450rpx;
						height: 130rpx;
					}
				}
			}
		}
	}
</style>

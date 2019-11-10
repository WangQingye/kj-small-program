<template>
	<view class="main">
		<search-input />
		<view class="title">
			<view :class="'t-item ' + (sortType == 1 ? 'acive' : '')" @click="clickSort(1)">默认</view>
			<view :class="'t-item ' + (sortType == 2 ? 'acive' : '')" @click="clickSort(2)">上新</view>
			<view :class="'t-item ' + (sortType == 3 ? 'acive' : '')" @click="clickSort(3)">热销</view>
		</view>
		<view class="content">
			<good-item class="item" v-for="(item,index) in goodItems" :key="index" :goodData="item"></good-item>
		</view>
		<load-more :status="status"></load-more>
	</view>
</template>

<script>
	import SearchInput from "@/components/search-input.vue";
	import GoodItem from "@/components/good-item.vue";
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				typeId: null,
				sortType: 1,
				goodItems: [],
				status: 'more',
				listPage: 1
			};
		},
		onLoad(option) {
			console.log(option);
			this.typeId = option.typeId;
			this.getGoodList(1)
		},
		methods: {
			async getGoodList(page) {
				if (page != 1) {
					this.status = 'loading';
				}
				let res = await this.myRequest('/api/goods/list', {
					goods_type_id: this.typeId,
					page: page,
					per_page: 8,
					sort_type: this.sortType
				}, 'GET', false);
				if (res.data.data) {
					this.listPage = page;
					this.goodItems = this.goodItems.concat(res.data.data);
					if (res.data.data.length < 8) {
						this.status = 'noMore'
					} else {
						this.status = 'more'
					}
				}
			},
			clickSort(index) {
				this.goodItems=[];
				this.sortType = index;
				this.getGoodList(1);
			},
			onReachBottom() {
				if (this.status == 'more') {
					this.listPage++;
					this.getGoodList(this.listPage)
				}
			}
		},
		components: {
			SearchInput,
			GoodItem,
			LoadMore
		}
	}
</script>

<style lang="scss">
	.main {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		font-family: PingFang SC;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

		.title {
			width: 100%;
			height: 100rpx;
			display: flex;
			border-bottom: 1rpx solid #eee;
			box-sizing: border-box;
			padding: 48rpx 0 24rpx 0;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			display: flex;
			justify-content: space-between;
			.acive {
				color: #006CB7;
			}
			.t-item {
				flex: 1;
				height: 100%;
				text-align: center;
				line-height: 1;
				border-right: 1rpx solid #eee;
				box-sizing: border-box;

				&:last-child {
					border-right: 0;
				}
			}
		}

		.content {
			width: 100%;
			flex: 1;
			box-sizing: border-box;
			padding: 30rpx 24rpx;

			.item {
				display: inline-block;
				margin-bottom: 40rpx;
			}

			.item:nth-child(odd) {
				margin-right: 30rpx;
			}

			// display: flex;
			// flex-wrap: wrap;
			// justify-content: space-between;
			.c-item {
				width: 336rpx;
				float: left;
				margin-bottom: 40rpx;

				&:nth-child(2n-1) {
					margin-right: 30rpx;
				}

				.item-box {
					width: 100%;

					.img-box {
						width: 100%;
						height: 190rpx;
						background: red;
						margin-bottom: 22rpx;
					}

					.item-discription {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						margin-bottom: 20rpx;
					}

					.item-price {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(237, 25, 58, 1);
						line-height: 1;
					}
				}
			}
		}
	}
</style>

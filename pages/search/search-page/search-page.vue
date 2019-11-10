<template>
	<view>
		<search-input :needCancel="true" ref="searchInput" @goSearch="goSearch" />
		<view class="search-content">
			<view class="hot" v-if="showFlag == 1">
				<view class="title">热门搜索</view>
				<view class="serach-item" v-for="(item,index) in searchItems" :key="index" @click="goSearch(item.name)">
					{{item.name}}
				</view>
			</view>
			<view class="items" v-if="showFlag == 2">
				<good-item class="item" v-for="(item,index) in goodItems" :key="index" :goodData="item"></good-item>
			</view>
			<view class="no-result" v-if="showFlag == 3">
				<image src="../../../static/no-result.png" class="no-result-img"></image>
				<view class="no-result-text">没有您搜索的商品</view>
				<view class="title">推荐商品</view>
				<good-item class="item" v-for="(item,index) in goodItems" :key="index" :goodData="item" :type="1"></good-item>
			</view>
		</view>
	</view>
</template>
<script>
	import SearchInput from "@/components/search-input.vue";
	import GoodItem from "@/components/good-item.vue";
	export default {
		data() {
			return {
				// 当前正在搜索的字段，用于翻页
				nowSearch:"",
				searchItems: [],
				showFlag: 1,
				goodItems: [{
					name: 'QlAamp Circulating Nu-cleic Acide kit',
					price: 13131,
					img: ''
				}, {
					name: 'QlAamp Circulating Nu-cleic Acide kit',
					price: 13131,
					img: ''
				}, {
					name: 'QlAamp Circulating Nu-cleic Acide kit',
					price: 13131,
					img: ''
				}]
			};
		},
		onLoad() {
			this.getHotWord();
		},
		methods: {
			async getHotWord() {
				let res = await this.myRequest('/common/getHotWord', {}, 'GET');
				if (res.data) {
					this.searchItems = res.data;
				}
			},
			async goSearch(searchText,page = 1) {
				this.$refs.searchInput.setSearchText(searchText);
				let res = await this.myRequest('/api/goods/list', {
					keyword:searchText,
					page,
					per_page:10
				}, 'GET');
				console.log(res);
			}

		},
		components: {
			SearchInput,
			GoodItem
		}
	}
</script>

<style lang="scss">
	.search-content {
		width: 100%;
		border-top: 1rpx solid #E6E6E6;
		margin-top: 20rpx;

		.hot {
			padding: 40rpx 30rpx;

			.title {
				color: #333333;
				font-size: 32rpx;
				font-weight: bold;
			}

			.serach-item {
				padding: 15rpx 30rpx;
				background: #F5F5F5;
				display: inline-block;
				border-radius: 10rpx;
				margin-right: 30rpx;
				margin-top: 30rpx;
				font-size: 28rpx;
				font-weight: normal;
			}
		}

		.items {
			padding: 30rpx 24rpx;

			.item {
				display: inline-block;
				margin-bottom: 40rpx;
			}

			.item:nth-child(odd) {
				margin-right: 30rpx;
			}
		}

		.no-result {
			padding: 0rpx 30rpx;

			.no-result-img {
				width: 160rpx;
				height: 160rpx;
				display: block;
				margin: 0 auto;
				margin-top: 100rpx;
			}

			.no-result-text {
				color: #999999;
				font-size: 32rpx;
				text-align: center;
				margin-top: 20rpx;
				margin-bottom: 100rpx;
			}

			.title {
				color: #333333;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
	}
</style>

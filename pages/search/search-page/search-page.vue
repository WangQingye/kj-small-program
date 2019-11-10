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
		<load-more :status="status" v-if="showFlag != 1"></load-more>
	</view>
</template>
<script>
	import SearchInput from "@/components/search-input.vue";
	import GoodItem from "@/components/good-item.vue";
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				// 当前正在搜索的字段，用于翻页
				nowSearch: "",
				searchItems: [],
				showFlag: 1,
				showLoginPage: true,
				goodItems: [],
				status: 'more',
				searchPage: 1
			};
		},
		onLoad() {
			this.getHotWord();
			uni.hideTabBar();
		},
		methods: {
			async getHotWord() {
				let res = await this.myRequest('/common/getHotWord', {}, 'GET');
				if (res.data) {
					this.searchItems = res.data;
				}
			},
			async goSearch(searchText, page = 1) {
				this.searchPage = page;
				if (page != 1) {
					this.status = 'loading';
				}
				let perPage = 8;
				this.$refs.searchInput.setSearchText(searchText);
				this.nowSearch = searchText;
				let res = await this.myRequest('/api/goods/list', {
					keyword: searchText,
					page,
					per_page: perPage,
					sort_type: 1
				}, 'GET');
				// 如果没数据并且请求的是第一页，那么展示推荐
				if (!res.data.data.length && page == 1) {
					this.getRecomend(1);
					return;
				} else {
					// 如果有数据直接展示结果，并且判断是否还有下一页
					this.showFlag = 2;
					this.goodItems = this.goodItems.concat(res.data.data);
					if (res.data.data.length < perPage) {
						this.status = 'noMore'
					} else {
						this.status = 'more'
					}
				}
			},
			async getRecomend(page = 1) {
				this.searchPage = page;
				if (page != 1) {
					this.status = 'loading';
				}
				let perPage = 8;
				let res = await this.myRequest('/api/goods/list', {
					page,
					per_page: perPage,
					sort_type: 1
				}, 'GET');
				if (res.data.data.length) {
					this.goodItems = this.goodItems.concat(res.data.data);
					if (res.data.data.length < perPage) {
						this.status = 'noMore'
					} else {
						this.status = 'more'
					}
				}
				this.showFlag = 3;
			},
			onReachBottom() {
				if (this.status == 'more') {
					this.searchPage++;
					if (this.showFlag == 2) {
						this.goSearch(this.nowSearch, this.searchPage);
					} else if (this.showFlag == 3){
						this.getRecomend(this.searchPage);
					}
				}
			},
		},
		components: {
			SearchInput,
			GoodItem,
			LoadMore
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

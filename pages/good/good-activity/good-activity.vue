<template>
	<view class="good-activity">
		<image class="activity-img" src="../../../static/qiangou.png" mode=""></image>
		<sun-tab :value.sync="tabIndex" :tabList="tabList" :scroll="true" defaultColor="#333333" activeColor="#006CB7"></sun-tab>
		<view class="good-items">
			<good-item class="item" v-for="(item,index) in goodItems" :key="index" :goodData="item"></good-item>
		</view>
		<load-more :status="status"></load-more>
	</view>
</template>

<script>
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	import GoodItem from "@/components/good-item.vue";
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				tabIndex: 0,
				tabList: ['周边产品', '选项1', '选项1', '选项1', '选项1', '选项1', '选项1', '选项1'],
				goodPage: 1,
				goodItems: [],
				status: 'more'
			};
		},
		onLoad() {
			this.getActivityGoods(1);
		},
		methods: {
			async getActivityGoods(page) {
				if (page != 1) {
					this.status = 'loading';
				}
				let perPage = 8;
				let res = await this.myRequest('/api/goods/newestGoods', {
					page,
					per_page: perPage
				}, 'GET');
				if (res.data.data.length) {
					this.goodItems = this.goodItems.concat(res.data.data);
					if (res.data.data.length < perPage) {
						this.status = 'noMore'
					} else {
						this.status = 'more'
					}
				}
			}
		},
		onReachBottom() {
			if (this.status == 'more') {
				this.goodPage++;
				this.getActivityGoods(this.goodPage);
			}
		},
		components: {
			sunTab,
			GoodItem,
			LoadMore
		}
	}
</script>

<style lang="scss">
	.good-activity {
		.activity-img {
			width: 100%;
			// height: auto;
		}
		.good-items {
			padding: 30rpx 24rpx;
			.item {
				display: inline-block;
				margin-bottom: 40rpx;
			}
			
			.item:nth-child(odd) {
				margin-right: 30rpx;
			}
		}
	}
</style>

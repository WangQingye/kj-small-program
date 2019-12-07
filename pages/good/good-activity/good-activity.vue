<template>
	<view class="good-activity">
		<image class="activity-img" :src="activityImg" mode=""></image>
		<sun-tab :value.sync="tabIndex" :tabList="tabList" @update:value="onTabChange" :scroll="true" defaultColor="#333333" activeColor="#006CB7"></sun-tab>
		<view class="good-items">
			<good-item class="item" v-for="(item,index) in goodItems" :key="index" :goodData="item.goods_join"></good-item>
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
				tabList: [],
				tabIds: [],
				goodPage: 1,
				goodItems: [],
				status: 'more',
				activityImg: "",
				activityId: null
			};
		},
		onLoad(option) {
			this.activityId = option.activityId;
			this.activityImg = option.activityImg;
			this.getActivityType();
		},
		methods: {			
			async getActivityType() {
				let res = await this.myRequest('/api/home/activityType', {
					activity_id: this.activityId
				}, 'GET', false, false);
				if (res.data) {
					this.tabList = res.data.map(item => {
						return item.title;
					})
					this.tabIds = res.data.map(item => {
						return item.id;
					})
					this.nowType = this.tabIds[0];
					this.getActivityGoods(1);
				}
			},
			onTabChange(index) {
				this.nowType = this.tabIds[index];
				this.getActivityGoods(1);
			},
			async getActivityGoods(page) {
				if (page != 1) {
					this.status = 'loading';
				} else {
					this.goodItems = [];
				}
				let perPage = 8;
				let res = await this.myRequest('/api/home/activityGoods', {
					activity_type_id: this.nowType,
					page,
					per_page: perPage
				}, 'GET');
				if (res.data.data) {
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

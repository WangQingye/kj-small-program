<template>
	<view class="score-mall">
		<view class="score-detail">
			<view class="score-desc">
				<image class="score-desc-dount" src="../../../static/dount.png" mode="" @click="goScoreDesc"></image>
				<text class="score-desc-text" @click="goScoreDesc">积分说明</text>
			</view>
			<view class="score-title">当前积分</view>
			<view class="score-wrapper" v-if="score !== null">
				<view class="score-num">{{score}}</view>
				<button class="score-button" @click="goScoreDetail">明细</button>
			</view>
		</view>
		<sun-tab :value.sync="tabIndex" :tabList="tabList" :scroll="true" @update:value="onTabChange" defaultColor="#333333" activeColor="#006CB7"></sun-tab>
		<view class="score-items">
			<view class="item-wrapper" @click="goDetail" v-for="(item,index) in goodItems" :key="index" :style="'margin-right:' + ((index+1) % 3 == 0 ? 0 : 30) + 'rpx'">
				<image class="item-img" :src="item.cover_pic" mode=""></image>
				<view class="item-title">{{item.title}}</view>
				<button class="item-button">兑换</button>
			</view>
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
				typeId: [],
				nowTypeId: 0,
				goodPage: 1,
				goodItems: [],
				status: 'more',
				score: null
			};
		},
		onShow() {
			this.getScore();
			this.getGoodType();
		},
		methods: {
			async getScore() {
				let res = await this.myRequest('/api/integral/my', {}, 'GET');
				if (res) {
					this.score = res.data.usable_integral;
				}
			},
			async getGoodType() {
				let res = await this.myRequest('/api/integral/goodstype', {}, 'GET');
				if (res) {
					let data = res.data.sort((a,b) => {
						return a.sort - b.sort;
					})
					this.tabList = data.map(item => {
						return item.title;
					})
					this.typeId = data.map(item => {
						return item.id;
					})
					this.nowTypeId = this.typeId[0];
					this.getActivityGoods(1);
				}
			},
			async getActivityGoods(page) {
				if (page != 1) {
					this.status = 'loading';
				} else {
					this.goodItems = [];
				}
				let perPage = 12;
				let res = await this.myRequest('/api/integral/goods', {
					page,
					per_page: perPage,
					goods_type_id: this.nowTypeId
				}, 'GET');
				if (res.data.data.length) {
					this.goodItems = this.goodItems.concat(res.data.data);
					if (res.data.data.length < perPage) {
						this.status = 'noMore'
					} else {
						this.status = 'more'
					}
				}
			},
			onTabChange(index) {
				this.nowTypeId = this.typeId[index];
				this.getActivityGoods(1);
			},
			goScoreDesc() {
				uni.navigateTo({
					url: `/pages/score/score-desc/score-desc`
				});
			},
			goScoreDetail() {
				uni.navigateTo({
					url: `/pages/score/score-detail/score-detail`
				});
			},
			goDetail() {
				uni.navigateTo({
					url: `/pages/good/integral-det/integral-det/integral-det`
				});
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
	.score-mall {
		.score-detail {
			width: 750rpx;
			height: 280rpx;
			background: #E5EFF9;
			padding: 0rpx 30rpx;
			color: #47443F;

			.score-desc {
				width: 690rpx;
				padding-top: 10rpx;
				text-align: right;

				.score-desc-dount {
					width: 24rpx;
					height: 24rpx;
					vertical-align: middle;
					margin-right: 10rpx;
				}

				.score-desc-text {
					font-size: 24rpx;
					vertical-align: middle;
				}
			}

			.score-title {
				font-size: 28rpx;
				margin-top: 20rpx;
			}

			.score-wrapper {
				width: 690rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-top: 24rpx;

				.score-num {
					font-size: 100rpx;
					line-height: 75rpx;
				}

				.score-button {
					width: 100rpx;
					height: 60rpx;
					font-size: 24rpx;
					line-height: 60rpx;
					background: none;
					border-color: #47443F;
					color: #47443F;
					padding: 0;
					margin-right: 0;
				}
			}
		}


		.score-items {
			padding: 30rpx 24rpx;

			// display: flex;
			// justify-content: space-between;
			// flex-wrap: wrap;
			.item-wrapper {
				width: 212rpx;
				height: 250rpx;
				display: inline-block;
				margin-bottom: 50rpx;

				.item-img {
					width: 212rpx;
					height: 120rpx;
					display: block;
				}

				.item-title {
					width: 212rpx;
					font-size: 28rpx;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-top: 24rpx;
					margin-bottom: 30rpx;
				}

				.item-button {
					width: 100rpx;
					height: 48rpx;
					font-size: 28rpx;
					color: white;
					padding: 0;
					background: #006CB7;
					line-height: 48rpx;
				}
			}
		}
	}
</style>

<template>
	<view class="content">
		<image src="../../static/start.gif" class="start-img" v-if="startImgFlag"></image>
		<view class="head">
			<image class="bg" src="../../static/1.png"></image>
			<view class="text-area">
				<text class="title">{{firstMagazine.title}}\n</text>
				<text class="subscribe">已有 {{firstMagazine.subscribe_num}} 订阅</text>
				<image class="cover-img" :src="firstMagazine.cover_pic" mode="aspectFill"></image>
				<view class="buttons">
					<button class="button-1" type="default" plain="true" @click="startRead(firstMagazine.id)">开始阅读</button>
					<button class="button-1 button-2" type="default" plain="true" hover-class="button-2-hover" @click="goUserRank">读者排行榜</button>
				</view>
			</view>
		</view>
		<view class="main">
			<wuc-tab :tab-list="tabList" :tabCur.sync="tabCur" @change="tabChange" tab-class="tab" select-class="tab-select"></wuc-tab>
			<view class="magazines" v-if="tabCur == 0">
				<magazine class="sigle-mag" v-for="(item,index) in allMagazines" :key="index" :magData="item" @getUserInfo="onGotUserInfo"
				 @click.native="startRead(item.id)"></magazine>
			</view>
			<view class="magazines" v-if="tabCur == 1">
				<magazine class="sigle-mag" v-for="(item,index) in myMagazines" :key="index" :magData="item" @getUserInfo="onGotUserInfo"
				 @click.native="startRead(item.id)"></magazine>
			</view>
			<view class="readcodes" v-if="tabCur == 2">
				<read-code-item v-for="(item,index) in readCodes" :key="index" :codeData="item"></read-code-item>
			</view>
			<load-more :status="status"></load-more>
		</view>
		<login-page :showFlag="showLoginPage" @login-over="showLoginPage = false"></login-page>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import Magazine from '@/components/magazine-item.vue';
	import ReadCodeItem from '@/components/read-code-item.vue';
	import LoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import LoginPage from '@/components/login-page.vue';
	export default {
		data() {
			return {
				title: '肖战-多面棱角蜕变锋芒',
				tabList: [{
						name: '全部杂志',
					},
					{
						name: '我的杂志'
					},
					{
						name: '阅读码'
					}
				],
				tabCur: 0,
				firstMagazine: null,
				allMagazines: [],
				myMagazines: [],
				status: 'more',
				readCodes: [],
				startImgFlag: true,
				allMagPage: 1,
				myMagPage: 1,
				readCodePage: 1,
				loginInfo: {},
				showLoginPage: false
			}
		},
		onLoad() {
			setTimeout(() => {
				this.startImgFlag = false;
			}, 3000);
			this.getAllMagList(this.allMagPage);
		},
		onReachBottom() {
			if (this.tabCur == 1 || this.tabCur == 2) {
				if (!this.$store.state.token) {
					this.tabCur = 0;
					return;
				}
			}
			if (this.tabCur == 0) {
				this.allMagPage++;
				this.getAllMagList(this.allMagPage);
			} else if (this.tabCur == 1) {
				this.myMagPage++;
				this.getMyMagList(this.myMagPage);
			} else if (this.tabCur == 2) {
				this.readCodePage++;
				this.getReadCodeList(this.readCodePage);
			}
		},
		methods: {
			tabChange(index) {
				if (this.tabCur == 1 || this.tabCur == 2) {
					if (!this.$store.state.token) {
						this.showLoginPage = true;
						this.tabCur = 0;
						return;
					}
				}
				if (this.tabCur == 1) {
					// 如果有了新购买，那么每次都会刷新
					if (this.$store.state.needFresh) {
						this.myMagazines = [];
						this.getMyMagList(1);
					} else if (this.myMagazines.length == 0) {
						this.getMyMagList(1);
					}
				}
				if (this.tabCur == 2) {
					// 如果有了新购买，那么每次都会刷新
					if (this.$store.state.needFresh) {
						this.readCodes = [];
						this.getReadCodeList(1);
					} else if (this.readCodes.length == 0) {
						this.getReadCodeList(1);
					}
				}
			},
			async getAllMagList(page) {
				let perPage = 6;
				if (page !== 1){
					 this.status = 'loading';
				} else {
					perPage = 7;
				}
				let res = await this.myRequest('/api/magazine/index', {
					page,
					per_page: perPage
				}, 'POST', false);
				if (res) {
					if (!res.data.data.length) {
						this.status = 'noMore';
						this.allMagPage--;
					} else {
						this.allMagazines = this.allMagazines.concat(res.data.data);
					}
					if (page == 1) {
						this.firstMagazine = this.allMagazines[0];
						this.allMagazines = this.allMagazines.slice(1);
					}
				}
			},
			async getMyMagList(page) {
				if (page !== 1){
					 this.status = 'loading';
				}
				let res = await this.myRequest('/api/magazine/myMafazine', {
					page,
					per_page: 6
				}, 'POST');
				if (res) {
					if (!res.data.data.length) {
						this.status = 'noMore';
						this.myMagPage--;
					} else {
						this.myMagazines = this.myMagazines.concat(res.data.data);
					}
				}
			},
			async getReadCodeList(page) {
				if (page !== 1) this.status = 'loading';
				let res = await this.myRequest('/api/magazine/readCode', {
					page,
					per_page: 6
				}, 'POST');
				if (res) {
					if (!res.data.data.length) {
						this.status = 'noMore';
						this.readCodePage--;
					} else {
						this.readCodes = this.readCodes.concat(res.data.data);
					}
				}
			},
			goUserRank() {
				uni.navigateTo({
					url: `/pages/userrank/userrank?magId=${this.firstMagazine.id}`
				});
			},
			startRead(id) {
				uni.navigateTo({
					url: `/pages/magazinefirst/magazinefirst?magId=${id}`
				});
			}
		},
		components: {
			WucTab,
			Magazine,
			LoadMore,
			ReadCodeItem,
			LoginPage
		},
	}
</script>

<style lang="scss">
	.content {
		background: #F0F3F5;

		.start-img {
			width: 750rpx;
			height: 100vh;
			position: absolute;
			top: 0;
			z-index: 98;
		}
	}

	.head {
		padding-bottom: 60rpx;
		background: white;

		.bg {
			position: absolute;
			top: 0;
			height: 589rpx;
			width: 750rpx;
			z-index: 0;
		}

		.text-area {
			margin-top: 60rpx;
			padding: 0 30rpx;
			position: relative;
			z-index: 1;

			.title {
				font-size: 46rpx;
				color: white;
			}

			.subscribe {
				font-size: 23rpx;
				color: #cccccc;
			}

			.cover-img {
				width: 670rpx;
				height: 860rpx;
				display: block;
				margin: 0 auto;
				margin-top: 50rpx;
			}

			.buttons {
				display: flex;
				justify-content: space-around;
				margin-top: 40rpx;

				.button-2 {
					color: white;
					background: black;
				}

				.button-2-hover {
					color: #C8C7CC
				}
			}
		}
	}

	.main {
		background: white;
		margin-top: 20rpx;
		padding: 0 30rpx;
		position: relative;

		.userinfo-button {
			position: absolute;
			top: 0;
			left: 240rpx;
			width: 500rpx;
			opacity: 0;
		}

		.tab {
			text-align: center;
			color: #666666;
			font-size: 28rpx;
			height: 100rpx;

			.wuc-tab-item {
				margin: 0 40rpx;
				font-weight: bold;
			}
		}

		.tab-select {
			color: black;
		}

		.main-scoll {
			height: 500rpx;

			::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
			}
		}

		.magazines {
			border-top: 1rpx solid rgba(230, 230, 230, 1);
			padding-top: 30rpx;
			margin-top: -10rpx;
			width: 690rpx;
			min-height: 250rpx;
			// display: flex;
			// flex-wrap: wrap;
			// justify-content: space-around;
			.sigle-mag:nth-child(odd) {
				margin-right: 26rpx
			}
		}

		.readcodes {
			border-top: 1rpx solid rgba(230, 230, 230, 1);
			padding-top: 30rpx;
			margin-top: -10rpx;
			width: 690rpx;
			min-height: 250rpx;
		}
	}

	.button-1 {
		width: 320rpx;
		height: 80rpx;
		border: 2rpx solid rgba(0, 0, 0, 1);
		text-align: center;
		line-height: 80rpx;
		font-size: 30rpx;
		border-radius: 0;
	}
</style>

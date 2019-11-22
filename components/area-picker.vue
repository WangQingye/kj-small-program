<template>
	<view class="list-input list-input-1 list-picker" v-if="initOver">
		<picker class="list-input list-input-1" mode="multiSelector" style="min-width: 300rpx;" :range="areaRange" @change="bindRegionChange"
		 @columnchange="columnChange" :value="choosenIndex">
			<view style="min-width: 520rpx;" v-if="region[0]">
				{{`${region[0]}/${region[1]}/${region[2]}`}}
			</view>
			<view v-else style="min-width: 520rpx;color: #999999;">
				请选择省市区
			</view>
		</picker>
		<image class="right-arrow" src="../../../static/right-arrow.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choosenIndex: [0,0,0],
				region: [],
				areaRange: [
					[],
					[],
					[]
				],
				province: [],
				provinceId: null,
				city: [],
				cityId: null,
				area: [],
				areaId: null,
				initOver: false
			};
		},
		props: ['areaIds'],
		mounted() {
			console.log(this.areaIds);
			this.getProvince();
		},
		methods: {
			bindRegionChange(e) {
				this.region[0] = this.province[e.detail.value[0]].zh_name;
				this.region[1] = this.city[e.detail.value[1]].zh_name;
				this.region[2] = this.area[e.detail.value[2]].zh_name;
				this.region[3] = this.area[e.detail.value[2]].id;
				this.$forceUpdate();
				this.$emit('changeArea', this.region);
			},
			async getProvince() {
				let res = await this.myRequest('/common/site/province', {}, 'GET', true, false);
				if (res) {
					this.province = res.data;
					this.areaRange[0] = res.data.map(item => {
						return item.zh_name
					});
					if (this.areaIds && !this.initOver) {
						this.provinceId = this.areaIds[0];
						this.choosenIndex[0] = this.province.findIndex(item => {
							return item.id == this.provinceId;
						})
						this.region[0] = this.areaRange[0][this.choosenIndex[0]];
					} else {
						this.provinceId = res.data[0].id;						
					}
					this.getCountry();
				}
			},
			async getCountry() {
				let res = await this.myRequest('/common/site/city', {
					province_id: this.provinceId
				}, 'GET', true, true);
				if (res) {
					this.city = res.data;
					this.areaRange[1] = res.data.map(item => {
						return item.zh_name
					});
					if (this.areaIds && !this.initOver) {
						this.cityId = this.areaIds[1];
						this.choosenIndex[1] = this.city.findIndex(item => {
							return item.id == this.cityId;
						})
						this.region[1] = this.areaRange[1][this.choosenIndex[1]];
					} else {
						this.cityId = res.data[0].id;						
					}
					this.getArea();
				}
			},
			async getArea() {
				let res = await this.myRequest('/common/site/area', {
					city_id: this.cityId
				}, 'GET', true, true);
				if (res) {
					this.area = res.data;
					this.areaRange[2] = res.data.map(item => {
						return item.zh_name
					});
					if (this.areaIds && !this.initOver) {
						this.areaId = this.areaIds[2];
						this.choosenIndex[2] = this.area.findIndex(item => {
							return item.id == this.areaId;
						})
						this.region[2] = this.areaRange[2][this.choosenIndex[2]];
						this.region[3] = this.areaId;
						this.$emit('changeArea', this.region);
					}
					this.initOver = true;
					this.$forceUpdate()
				}
			},
			columnChange(e) {
				if (!this.initOver) return;
				if (e.detail.column == 0) {
					this.provinceId = this.province[e.detail.value].id;
					this.getCountry();
				}
				if (e.detail.column == 1) {
					this.cityId = this.city[e.detail.value].id;
					this.getArea();
				}
			}
		}
	}
</script>

<style lang="scss">
	.list-picker {
		display: inline-flex;
		justify-content: space-between;

		.right-arrow {
			width: 16rpx;
			height: 26rpx;
		}
	}
</style>

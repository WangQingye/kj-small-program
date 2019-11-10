<template>
	<view class="content">
		<search-input @goSearch="goSearch"/>
	</view>
</template>

<script>
	import {
		SearchInput
	} from "@/components/search-input.vue";
	export default {
		data() {
			return {}
		},
		onLoad() {},
		onReachBottom() {},
		methods: {
			goSearch(searchText) {
				uni.navigateTo({
				    url: `/pages/search/search-page/search-page`
				});
			}
		},
		components: {
			SearchInput
		}
	}
</script>

<style lang="scss">
</style>

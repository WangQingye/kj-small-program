<template>
	<view v-html="content">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				singlePageId: null,
				content: ""
			};
		},
		onLoad(option) {
			this.singlePageId = option.singlePageId;
			this.getSingleContent();
		},
		methods: {
			async getSingleContent() {
				let res = await this.myRequest(
					`/common/singlePage/${this.singlePageId}`, {},
					"GET"
				);
				if (res.message == "success") {
					this.content = res.data.content;
					uni.setNavigationBarTitle({
						title:res.data.title
					})
				}
			}
		}
	};
</script>

<style lang="scss">
</style>

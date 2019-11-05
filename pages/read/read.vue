<template>
	<view class="read-page">
		<magazine v-if="magId" :book="magId"></magazine>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				magId: ""
			};
		},
		onLoad(option) {
			this.magId = option.magId;
		},
	}
</script>

<style lang="scss">
.read-page {
	background: black;
}
</style>

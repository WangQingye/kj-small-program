<template>
	<view>
		<login-page :showFlag="showLoginPage" @login-over="loginOver"></login-page>
	</view>
</template>

<script>
	import LoginPage from '@/components/login-page.vue';
	export default {
		data() {
			return {
				showLoginPage: true
			};
		},
		onLoad() {
			
		},
		methods: {
			loginOver() {
				uni.navigateBack({
					delta:1
				})
			}
		},
		components: {
			LoginPage
		}
	}
</script>

<style lang="scss">

</style>

<template>
		<view class="load-more">{{loadtext}}</view>
</template>

<script>
	export default {
		name:"load-more",
		props: {
			loadtext: String
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.load-more {
		text-align: center;
		color: #AAAAAA;
		padding: 10upx;
	}
</style>

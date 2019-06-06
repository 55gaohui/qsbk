<template>
	<view>
		搜索页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		//监听原生标题导航按钮点击事件
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				uni.navigateBack({
					delta: 1
				});
			}
		},
		//监听原生输入框 文本发生改变
		onNavigationBarSearchInputChanged(e) {
			console.log(e.text);
		},
		//监听 原生键盘内的搜索按钮点击
		onNavigationBarSearchInputConfirmed(e) {
			console.log(e.text);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

<template>
	<view class="topic-nav">
		<view class="u-f-ac u-f-jsb">
			<view>热门分类</view>
			<view class="u-f-ac" @tap="openTopNav">
				更多
				<view class="icon iconfont icon-jinru"></view>
			</view>
		</view>
		<view class="u-f-ac">
			<block v-for="(item, index) in nav" :key="index">
				<view class="u-f-ajc">{{item.name}}</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: "topic-nav",
		props: {
			nav: Array
		},
		methods: {
			openTopNav(){
				uni.navigateTo({
					url: '../../pages/topic-nav/topic-nav',
				});
			}
		}
	}
</script>

<style scoped>
	.topic-nav {
		border-top: 1upx solid #EEEEEE;
		border-bottom: 1upx solid #EEEEEE;
		padding: 20upx;
	}

	.topic-nav>view:first-child {
		margin-bottom: 10upx;
	}

	.topic-nav>view:first-child view {
		color: #9e9e9e;
	}

	.topic-nav>view:first-child view:first-child {
		color: #333333;
		font-size: 32upx;
	}

	.topic-nav>view:last-child>view {
		flex: 1;
		background: #dddddd;
		color: #9e9e9e;
		border-radius: 10upx;
		margin: 0 10upx;
	}
</style>

<template>
	<view class="uni-comment-list" :class="{'u-comment-list-child': (item.fid > 0)}">
		<view class="uni-comment-face">
			<image :src="item.userpic" mode="aspectFill" @tap.stop="openSpace" lazy-load></image>
		</view>
		<view class="uni-comment-body" @tap.stop="reply">
			<view class="uni-comment-top">
				<text>{{item.username}}</text>
			</view>
			<view class="uni-comment-content">{{item.data}}</view>
			<view class="uni-comment-date">
				<view>{{item.time}}</view>
			</view>
		</view>
	</view>  
</template>

<script>
	export default {
		name:'comment-list',
		props:{
			item: Object,
			index: Number
		},
		methods:{
			openSpace(){
				uni.navigateTo({
					url: '/pages/user-space/user-space?userid='+this.item.userid
				})
			},
			reply() {
				this.$emit('reply',this.item.id);
			},
		}
	}
</script>

<style scoped>
	.u-comment-list-child {
		padding: 20upx;
		background: #F4F4F4;
		border-bottom: 1upx solid #EEEEEE;
		box-sizing: border-box;
		margin: 0;
		margin-left: 70upx;
		width: auto;
	}
	.uni-comment-face image{
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
	}
</style>

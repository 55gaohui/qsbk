<template>
	<view class="common-list u-f animated fadeInLeft fast">
		<view class="common-list-l">
			<image :src="item.userpic" mode="widthFix" lazy-load></image>
		</view>
		<view class="common-list-r">
			<view>
				<view class="u-f-ac u-f-jsb">
					<view class="u-f-ac">
						{{item.username}}
						<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
					</view>
					<view v-show="!isguanzhu" class="u-f-ac" @tap="guanzhu">
						<view class="icon iconfont icon-zengjia"></view>关注
					</view>
				</view>
				<view class="common-list-r-time">26天前</view>
			</view>
			<view>
				{{item.title}}
			</view>
			<view class="u-f-ajc" style="flex-direction: column;">
				<!-- 图片 -->
				<block v-for="(pic,index) in item.morepic" :key="index">
					<image :src="pic" mode="widthFix" lazy-load @tap="imgdetail(index)" style="margin-bottom: 20upx;"></image>
				</block>
				<!-- 视频 -->
				<template v-if="item.video">
					<view class="common-list-play icon iconfont icon-bofang"></view>
					<view class="common-list-playinfo">
						{{item.video.looknum}} 次播放 {{item.video.long}}
					</view>
				</template>
				<!-- 分享 -->
				<view class="u-f-ac common-list-share" v-if="item.share">
					<image :src="item.share.titlepic" mode="widthFix" lazy-load></image>
					<view>{{item.share.title}}享</view>
				</view>
			</view>
			<view class="u-f-ac u-f-jsb">
				<view>深圳 龙岗</view>
				<view class="u-f-ac">
					<view class="icon iconfont icon-zhuanfa">150</view>
					<view class="icon iconfont icon-pinglun1">10</view>
					<view class="icon iconfont icon-dianzan1">195</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from "../common/tag-sex-age.vue"
	export default {
		name: "common-list",
		components:{
			tagSexAge
		},
		props: {
			item: Object,
			index: Number
		},
		data() {
			return {
				isguanzhu: this.item.isguanzhu
			}
		},
		methods: {
			guanzhu() {
				this.isguanzhu = true;
				uni.showToast({
					title: "关注成功"
				})	
			},
			imgdetail(index){
				uni.previewImage({
					current: index,
					indicator: "number",
					urls:this.item.morepic,
					loop:true
				})
			}
		}
	}
</script>

<style>
	@import '../../common/list.css';
	.common-list-r {
		border-bottom: 0;
	}
	
	.common-list {
		border-bottom: 1upx solid #EEEEEE;
	}
	.common-list-r-time{
		padding: 15upx 0;
		color: #CCCCCC!important;
		background: #FFFFFF!important;
	}
	.common-list-r>view:nth-child(1)>view:nth-child(1)>view:first-child{
		color: #999999;
		font-size: 32upx;
	}
	
	.common-list-r>view:nth-child(1)>view:nth-child(1)>view:last-child{
		background: #EEEEEE;
		padding: 0 10upx;
		font-size: 26upx;
	}
</style>

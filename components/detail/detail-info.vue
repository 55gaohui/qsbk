<template>
	<view class="common-list u-f animated fadeInLeft fast">
		<view class="common-list-l">
			<image :src="item.userpic" mode="aspectFill" @tap.stop="openSpace" lazy-load></image>
		</view>
		<view class="common-list-r">
			<view>
				<view class="u-f-ac u-f-jsb">
					<view class="u-f-ac">
						{{item.username}}
						<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
					</view>
					<view v-show="!item.isguanzhu" class="u-f-ac" @tap="guanzhu">
						<view class="icon iconfont icon-zengjia"></view>关注
					</view>
				</view>
				<view class="common-list-r-time" v-show="item.create_time">{{item.create_time}}</view>
			</view>
			<view>
				{{item.content}}
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
					<view class="icon iconfont icon-zhuanfa">{{item.sharenum}}</view>
					<view class="icon iconfont icon-pinglun1">{{item.commentnum}}</view>
					<view class="icon iconfont icon-dianzan1" @tap="caozuo('ding')">{{item.goodnum}}</view>
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
			}
		},
		methods: {
			async guanzhu() {
				let [err,res] = await this.$http.post('/follow',{
					follow_id: this.item.userid
				},{
					token: true,
					checkToken:true,
					checkAuth: true
				});
				//错误处理
				if(!this.$http.errorCheck(err,res)) return;
				//修改数据
				uni.showToast({ title: '关注成功' });
				let resData = {
					type: 'guanzhu',
					userid:this.item.userid,
					data: true
				}
				// 通知父组件
				this.$emit('changeevent',resData);
				// 通知全局修改数据
				uni.$emit('updateData',resData);
			},
			//顶踩
			async caozuo(type){
				let index = (type == 'ding') ? 1 : 2;
				let [err,res] = await this.$http.post('/support',{
					post_id:this.item.id,
					type:index-1
				},{
					token:true,
					checkToken:true,
					checkAuth:true
				});
				if (!this.$http.errorCheck(err,res)) return;
				uni.showToast({ title: "顶成功" });
				// 通知父组件
				let resData = {
					type:"support",
					post_id:this.item.id,
					do:type
				};
				this.$emit('changeevent',resData);
				// 通知全局
				return uni.$emit("updateData",resData);
			},
			openSpace(){
				uni.navigateTo({
					url: '/pages/user-space/user-space?userid='+this.item.userid
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

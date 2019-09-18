<template>
	<view class="common-list u-f animated fadeInLeft fast">
		<view class="common-list-l">
			<image :src="item.userpic" mode="widthFix" lazy-load></image>
		</view>
		<view class="common-list-r">
			<view class="u-f-ac u-f-jsb">
				<view class="u-f-ac">
					{{item.username}}
					<tag-sex-age :sex="item.sex" :age="item.age"></tag-sex-age>
				</view>
				<view v-show="!item.isguanzhu" class="u-f-ac" @tap="guanzhu">
					<view class="icon iconfont icon-zengjia"></view>关注
				</view>
			</view>
			<view @tap.stop="opendetail">{{item.title}}</view>
			<view class="u-f-ajc" @tap.stop="opendetail">
				<template v-if="item.titlepic">
				<!-- 图片 -->
				<image v-if="item.titlepic" :src="item.titlepic" mode="widthFix" lazy-load></image>
				</template>
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
	import tagSexAge from "./tag-sex-age.vue"
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
				try{
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
				}catch(e){
					//TODO handle the exception
					return;
				}
				
			},
			async caozuo(type){
				let index = (type === 'ding') ? 1 : 2; // 当前操作
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
			//跳转详情页
			opendetail(){
				uni.navigateTo({
					url: '../../pages/detail/detail?detailData='+JSON.stringify(this.item),
				});
			}
		}
	}
</script>

<style>
	@import '../../common/list.css';
</style>

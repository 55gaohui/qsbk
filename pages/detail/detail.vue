<template>
	<view>
		<detail-info :item="detail" :index="index"></detail-info>
		<view class="u-comment-title">最新评论 {{comment.count}}</view>
		<view class="uni-comment u-comment">
			<block v-for="(item, index) in comment.list" :key="index">
				<comment-list :item="item" :index="index"></comment-list>
			</block>
		</view>
		<view style="height: 120upx;"></view>
		<!-- 聊天输入框 -->
		<user-chat-bottom @submit="submit"></user-chat-bottom>
		
		<!-- 分享 -->
		<more-share :show="shareshow" @togle="togle"></more-share>
	</view>
</template>

<script>
	import userChatBottom from "../../components/user-chat/user-chat-bottom.vue"
	import detailInfo from "../../components/detail/detail-info.vue"
	import time from "../../common/time.js"
	import commentList from "../../components/detail/comment-list.vue"
	import moreShare from "../../components/common/more-share.vue"
	export default {
		name: "detail",
		components: {
			detailInfo,
			commentList,
			userChatBottom,
			moreShare
		},
		data() {
			return {
				comment: {
					count: 20,
					list: []
				},
				detail: {
					userpic: "../../static/demo/userpic/8.jpg",
					username: "昵称",
					sex: 0, // 0男，1女
					age: 25,
					isguanzhu: false,
					title: "我是标题",
					titlepic: "../../static/demo/datapic/28.jpg",
					morepic: [
						"../../static/demo/datapic/28.jpg",
						"../../static/demo/datapic/13.jpg",
						"../../static/demo/datapic/15.jpg"
					],
					video: false,
					share: false,
					path: "深圳 龙岗",
					sharenum: 20,
					commentnum: 30,
					goodnum: 20
				},
				index: 0,
				shareshow: false
			}
		},
		onLoad(e) {
			// console.log(e);
			this.initdata(JSON.parse(e.detailData));
			this.getcomment();
		},
		onNavigationBarButtonTap(e) {
			// console.log(e.index);
			if (e.index == 0) {
				this.togle();
			}
		},
		methods: {
			//获取评论
			getcomment() {
				let arr = [
					//一级评论
					{
						id: 1,
						fid: 0,
						userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username: "小猫咪",
						time: "1560397710",
						data: "支持国产，支持DCloud!",
					},
					//二级评论
					{
						id: 2,
						fid: 1,
						userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username: "小猫咪",
						time: "1560397710",
						data: "支持国产，支持DCloud!",
					},
					{
						id: 3,
						fid: 1,
						userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username: "小猫咪",
						time: "1560397710",
						data: "支持国产，支持DCloud!",
					},
					{
						id: 4,
						fid: 0,
						userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username: "小猫咪",
						time: "1560397710",
						data: "支持国产，支持DCloud!",
					},
					{
						id: 5,
						fid: 4,
						userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username: "小猫咪",
						time: "1560397710",
						data: "支持国产，支持DCloud!",
					}
				]
				for (let i = 0; i < arr.length; i++) {
					arr[i].time = time.gettime.gettime(arr[i].time);
				}
				this.comment.list = arr;
			},
			initdata(obj) {
				uni.setNavigationBarTitle({
					title: obj.title
				})
			},
			submit(data) {
				// 构建数据
				let obj = {
					id: 6,
					fid: 0,
					userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					username: "小猫咪",
					time: time.gettime.gettime(new Date().getTime()),
					data: data,
				}
				this.comment.list.push(obj);
			},
			// 分享组件显示控制
			togle(){
				this.shareshow=!this.shareshow
			}
		}
	}
</script>

<style>
	.u-comment {
		padding: 0 20upx;
	}

	.u-comment-title {
		padding: 20upx;
		font-size: 30upx;
		font-weight: bold;
	}
</style>

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
		<more-share :show="shareshow" @togle="togle" :sharedata="sharedata"></more-share>
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
				sharedata:{
					title: '',
					url: '',
					titlepic: '',
					shareType: 0
				},
				comment: {
					count: 0,
					list: []
				},
				detail: {
					userpic: "",
					username: "",
					sex: 0, // 0男，1女
					age: 0,
					content: '',
					isguanzhu: false,
					title: "",
					titlepic: "",
					morepic: [],
					video: false,
					share: false,
					path: "",
					sharenum: 0,
					commentnum: 0,
					goodnum: 0,
					create_time: 0
				},
				index: 0,
				shareshow: false
			}
		},
		onLoad(e) {
			this.initdata(JSON.parse(e.detailData));
		},
		onNavigationBarButtonTap(e) {
			// console.log(e.index);
			if (e.index == 0) {
				this.togle();
				
			}
		},
		methods: {
			//初始化分享
			__initShare(obj){
				this.sharedata = {
					title: obj.title,
					content: obj.title,
					url: 'https://ghfree.cn/',
					titlepic: obj.titlepic ? obj.titlepic : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png',
					shareType: 0
				}
			},
			//初始化数据
			initdata(obj) {
				//修改窗口标题
				uni.setNavigationBarTitle({title: obj.title});
				//加载分享内容
				this.__initShare(obj);
				//加载中
				uni.showLoading({title: 'Loading...',mask: true});
				obj.morepic = [];
				obj.content = "";
				obj.goodnum = obj.infonum.dingnum;
				this.detail = obj;
				this.comment.count = obj.commentnum;
				//获取文章详情
				this.getdetail();
				if(this.comment.count){
					this.getcomment();
				}
			},
			//请求文章详情
			async getdetail(){
				let [err,res] = await this.$http.get('/post/'+this.detail.id);
				let error = this.$http.errorCheck(err,res,()=>{
					uni.hideLoading();
				},()=>{
					uni.hideLoading();
				})
				if(!error) return;
				let data = res.data.data.detail;
				// console.log(data);
				this.detail.content = data.content;
				let images = [];
				for (var i = 0; i < data.images.length; i++) {
					images.push(data.images[i].url);
				}
				this.detail.morepic = images;
				this.detail.age = data.user.userinfo.age;
				this.detail.sex = data.user.userinfo.sex;
				return uni.hideLoading();
			},
			//获取评论
			async getcomment() {
				let [err,res] = await this.$http.get('/post/'+this.detail.id+'/comment');
				if(!this.$http.errorCheck(err,res)) return;
				let list = res.data.data.list;
				console.log(list);
				this.comment.list = this.comment.list.concat(this.__ArrSort(list));
				// console.log(this.comment.list);
			},
			// 无限级分类
			__ArrSort(arr,id=0){
				// console.log(arr);
				var temp = [],lev=0;
				var forFn = function(arr,id,lev){
					for (let i = 0; i < arr.length; i++) {
						var item = arr[i];
						if(item.fid == id){
							item.lev = lev;
							temp.push({
								id:item.id,
								fid:item.fid,
								userid:item.user.id,
								userpic:item.user.userpic,
								username:item.user.username,
								time:time.gettime.gettime(item.create_time),
								data:item.data,
							});
							forFn(arr,item.id,lev+1);
						}
					}		
				}
				forFn(arr,id,lev);
				return temp;			
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

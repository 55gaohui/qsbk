<template>
	<view>
		<!-- 聊天列表 -->
		<scroll-view scroll-y="true" style="position: absolute;left: 0;top: 0;right: 0;bottom: 100rpx;" :scroll-into-view="scrollInto" scroll-with-animation>
			<view class="u-f-ajc chat-load-more"
			hover-class="chat-load-more-hover"
			@tap="loadmore">{{loadtext}}</view>
			<!-- 聊天列表 -->
			<block v-for="(item,index) in list" :key="index">
				<view class="char-item" :id="'chat'+index">
					<user-chat-list :item="item" :index="index"></user-chat-list>
				</view>
			</block>
		</scroll-view>

		<!-- 聊天输入框 -->
		<user-chat-bottom @submit="submit"></user-chat-bottom>
	</view>
</template>

<script>
	import time from "../../common/time.js"
	import userChatList from "../../components/user-chat/user-chat-list.vue"
	import userChatBottom from "../../components/user-chat/user-chat-bottom.vue"
	export default {
		name: "user-chat",
		components: {
			userChatBottom,
			userChatList
		},
		data() {
			return {
				scrollInto: '',
				style: {
					contentH:0,
					itemH: 0
				},
				list: [],
				loadtext: '点击加载更多'
			};
		},
		onLoad(e){
			let userinfo = JSON.parse(e.userinfo);
			//用户不存在
			if(!userinfo.userid){
				uni.showToast({title:'该用户不存在',icon:'none'});
				return uni.navigateBack({delta: 1});
			}
			//初始化聊天对象
			this.$chat.CurrentToUser = {
				userid: userinfo.userid,
				userpic: userinfo.userpic,
				username: userinfo.username
			}
			//修改标题
			uni.setNavigationBarTitle({title: userinfo.username});
		},
		onUnload(){
			this.$chat.CurrentToUser = {
				userid: 0,
				userpic: '',
				username: ''
			}
		},
		onReady() {
			this.__init();
		},
		methods: {
			// 初始化参数
			__init() {
				//获取聊天历史记录
				this.getdata();
				//至于底部
				this.pageToBottom();
				//开启监听
				uni.$on('UserChat',(data)=>{
					this.list.push(this.$chat.__format(data,{
						type:'chatdetail',
						isme:false,
						olddata: this.list
					}));
					this.pageToBottom();
				})
			},
			//滚动到底部
			pageToBottom(){
				let lastIndex = this.list.length - 1
				if (lastIndex < 0) return;
				this.scrollInto = 'chat'+lastIndex
			},
			// 获取聊天数据
			getdata(isall = false) {
				try{
					let list = uni.getStorageSync('chatdetail_'+this.User.userinfo.id+'_'+this.$chat.CurrentToUser.userid);
					list = list ? JSON.parse(list) : [];
					for (let i = 0; i < list.length; i++) {
						list[i].gstime = time.gettime.getChatTime(list[i].time, i > 0 ? list[i - 1].time : 0);
					}
					// 首次加载十条
					if(!isall && list.length>10){
						return this.list = list.splice(-10);
					}
					// 加载剩下的数据
					this.list = list;
					this.loadtext = '';
				}catch(e){
					uni.showToast({ title: '加载失败~', icon: 'none' });
				}
				
			},
			async submit(data) {
				if (!data) {
					return uni.showToast({ title: '请输入你要发送的消息~', icon: 'none' });
				}
				let result = this.$chat.send({ type:'text',data:data });
				let [err,res] = await this.$http.post('/chat/send',result,{
					token:true,
					checkToken:true,
					checkAuth:true
				});
				if (!this.$http.errorCheck(err,res)) {
					return uni.showToast({
						title: '发送失败',icon:"none"
					});
				}
				this.list.push(this.$chat.__format(result,{
					type:"chatdetail", // 转化类型
					olddata:this.list,
					isme:true
				}));
				console.log(this.$chat.__format(result,{
					type:"chatdetail", // 转化类型
					olddata:this.list,
					isme:true
				}));
				this.pageToBottom();
			},
			// 加载更多
			loadmore(){
				if(this.loadtext!="点击加载更多") return;
				// 修改状态
				this.loadtext="加载中...";
				this.getdata(true);
			},
		}
	}
</script>

<style>

</style>

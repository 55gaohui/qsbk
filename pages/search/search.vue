<template>
	<view>
		<!-- 自定义导航 -->
		<!-- #ifdef MP-WEIXIN -->
		<view style="display: flex;
		align-items: center;
		padding:0 20upx;height: 88upx;
		position: fixed;z-index: 9999;
		left: 0;
		top: 0;
		right: 0;
		background: #FFFFFF;">
			<!-- 左边图标 -->
			<view class="iconfont icon-sousuo" style="position: absolute;left: 30upx;color: #CCCCCC;"></view>
			<!-- 搜索框 -->
			<input style="flex: 1;padding: 5upx 0 5upx 50upx;border-radius: 4px;background: #F7F7F7;"  type="text" :placeholder="getPlaceholder" v-model="searchtext" @confirm="getlist" placeholder-style="color: #CCCCCC;"/>
			<!-- 右边图标 -->
			<text style="padding-left:20upx;" @click="goBack">取消</text>
		</view>
		<view style="height: 88upx;"></view>
		<!-- #endif -->
		<template v-if="list.length>0">
			<!-- 图片列表 -->
			<block v-for="(item,index) in list" :key="index">
				<template v-if="searchType == 'post'">
					<index-list @changeevent="updateData" :item="item" :index="index"></index-list>
				</template>
				<template v-else-if="searchType == 'topic'">
					<view style="padding: 0 20upx;">
						<topic-list :item="item" :index="index"></topic-list>
					</view>
				</template>
				<template v-else>
					<user-list-com :item="item" :index="index"></user-list-com>
				</template>
			</block>
			<!-- 上拉加载 -->
			<loadMore :loadtext="loadtext" />
		</template>
		<template v-else-if="issearch && list.length<1">
			<no-thing />
		</template>
	</view>
</template>

<script>
	import indexList from "../../components/index/index-list.vue"
	import loadMore from "../../components/common/load-more.vue"
	import noThing from "../../components/common/no-thing.vue"
	import topicList from "../../components/news/topic-list.vue"
	import userListCom from "../../components/user-list/user-list-com.vue"
	export default {
		name: "search",
		components: {
			indexList,
			loadMore,
			noThing,
			topicList,
			userListCom,
		},
		data() {
			return {
				issearch: false,
				loadtext: "上拉加载更多",
				list: [],
				searchtext: '',
				page: 1,
				searchType: 'post'
			}
		},
		//监听原生标题导航按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		//监听原生输入框 文本发生改变
		onNavigationBarSearchInputChanged(e) {
			this.searchtext = e.text;
		},
		//监听 原生键盘内的搜索按钮点击
		onNavigationBarSearchInputConfirmed(e) {
			if (e.text) {
				this.getlist();
			}
		},
		computed:{
			// #ifdef MP-WEIXIN
			getPlaceholder(){
				let type = '文章'
				if (this.searchType == 'post') {
					type = '文章';
				}else if(this.searchType == 'topic'){
					type = '话题';
				}else if(this.searchType == 'user'){
					type = '用户';
				}
				return '搜索'+type;
			}
			// #endif
		},
		onLoad(e) {
			if(!e) return;
			this.searchType = e.searchType || 'post';
			// #ifdef APP-PLUS
			let pageTitle = '搜索文章';
			if(this.searchType == 'topic'){
				pageTitle = '搜索话题';
			}
			if(this.searchType == 'user'){
				pageTitle = '搜索用户';
			}
			//获取当前页面webview对象实例
			let currentWebview = this.$mp.page.$getAppWebview();
			//获取窗口title
			let tn = currentWebview.getStyle().titleNView;
			tn.searchInput.placeholder = pageTitle;
			//修改窗口title
			currentWebview.setStyle({
				titleNView: tn
			});
			// #endif
			// 开启监听
			uni.$on('updateData',this.updateData);
		},
		//上拉加载
		onReachBottom() {
			this.loadmore();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.getlist();
			uni.stopPullDownRefresh();

		},
		methods: {
			updateData(data){
				switch (data.type){
					case "guanzhu":
					this.updateGuanZhu(data)
						break;
					case "support":
					this.updateSupport(data);
						break;
					case 'updateComment':
					this.updateComment(data);
						break;
				}
			},
			// 更新评论数
			updateComment(data){
				// 拿到当前对象
				let obj = this.list.find((val) => {
					return val.id === data.post_id;
				})
				if(!obj) return;
				obj.commentnum++;   // 评论数+1
			},
			// 更新关注信息
			updateGuanZhu(data){
				this.list.forEach((item,index)=>{
					if(item.userid == data.userid){
						item.isguanzhu = data.data;
					} 
				})
			},
			//更新顶踩
			updateSupport(data){
				// 拿到当前对象
				let obj = this.list.find(value =>{
					return value.id === data.post_id;
				});
				if (!obj) return;
				let oldindex = obj.infonum.index; // 操作前的状态
				obj.infonum.index = (data.do == 'ding') ? 1 : 2; // 操作后的状态
				if (oldindex !== 0) { //之前操作过
					oldindex == 1 ? obj.infonum.dingnum-- : obj.infonum.cainum--;
				}
				if (obj.infonum.index !== 0) {  // 当前操作
					obj.infonum.index == 1 
						? obj.infonum.dingnum++ : obj.infonum.cainum++;
				}
				console.log('1');
			},
			// 搜索事件
			async getlist() {
				uni.showLoading({title:'Loading'});
				//请求服务器   this.searchtext
				let [err,res] = await this.$http.post('/search/'+this.searchType,{
					keyword: this.searchtext,
					page: this.page
				},{token:true});
				let error = this.$http.errorCheck(err,res,()=>{
					uni.hideLoading();
				},()=>{
					uni.hideLoading();
				})
				if(!error) return;
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push(this.__format(list[i]));
				}
				console.log(list);
				this.list = this.page>1 ? this.lists.concat(arr) : arr;
				this.issearch = true;
				if(list.length<10){
					this.loadtext = '没有更多数据了';
				}else{
					this.loadtext = '上拉加载更多';
				}
				uni.hideLoading();
			},
			// 格式转化
			__format(item){
				switch (this.searchType){
					case 'post':
						return {
							userid:item.user.id,
							userpic:item.user.userpic,
							username:item.user.username,
							isguanzhu:!!item.user.fens.length,
							id:item.id,
							title:item.title,
							type:"img", // img:图文,video:视频
							titlepic:item.titlepic,
							video:false,
							path:item.path,
							share:!!item.share,
							infonum:{
								index:(item.support.length>0) ? (item.support[0].type+1) : 0,//0:没有操作，1:顶,2:踩；
								dingnum:item.ding_count,
								cainum:item.cai_count,
							},
							commentnum:item.comment_count,
							sharenum:item.sharenum,
						}
						
						break;
					case 'topic':
						return{
							id:item.id,
							titlepic:item.titlepic,
							title:item.title,
							desc:item.desc,
							totalnum:item.post_count,
							todaynum:item.todaypost_count,
						}
						break;
					case 'user':
						return{
							id:item.id,
							userpic:item.userpic,
							username:item.username,
							age:item.userinfo.age,
							sex:item.userinfo.sex,
							isguanzhu:false,
						}
						break;
				}
			},
			loadmore() {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.loadtext != "上拉加载更多") return;
				//修改状态
				this.loadtext = "加载中";
				this.page++;
				this.getlist();
				
			},
			// #ifdef MP-WEIXIN
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			}
			// #endif
			
		}
	}
</script>

<style>

</style>

<template>
	<view>
		<template v-if="list.length>0">
			<!-- 图片列表 -->
			<block v-for="(item,index) in list" :key="index">
				<template v-if="searchType == 'post'">
					<index-list :item="item" :index="index"></index-list>
				</template>
				<template v-else>
					<view style="padding: 0 20upx;">
						<topic-list :item="item" :index="index1"></topic-list>
					</view>
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
	export default {
		name: "search",
		components: {
			indexList,
			loadMore,
			noThing,
			topicList
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
		onLoad(e) {
			if(!e) return;
			this.searchType = e.searchType || 'post';
			let pageTitle = '搜索文章';
			if(this.searchType == 'topic'){
				pageTitle = '搜索话题';
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
		},
		//上拉加载
		onReachBottom() {
			this.loadmore();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			console.log('2');
			this.getlist();
			uni.stopPullDownRefresh();

		},
		methods: {
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
				}
			},
			loadmore() {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.loadtext != "上拉加载更多") return;
				//修改状态
				this.loadtext = "加载中";
				this.page++;
				this.getlist();
				
			}
		}
	}
</script>

<style>

</style>

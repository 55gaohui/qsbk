<template>
	<view>
		<template v-if="list.length>0">
			<!-- 图片列表 -->
			<block v-for="(item,index) in list" :key="index">
				<index-list :item="item" :index="index"></index-list>
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
	export default {
		name: "search",
		components: {
			indexList,
			loadMore,
			noThing
		},
		data() {
			return {
				issearch: false,
				loadtext: "上拉加载更多",
				list: [],
				searchtext: '',
				page: 1
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
				this.getdata();
			}
		},
		//上拉加载
		onReachBottom() {
			this.loadmore();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			console.log('2');
			this.getdata();
			uni.stopPullDownRefresh();

		},
		methods: {
			// 搜索事件
			async getdata() {
				uni.showLoading({title:'Loading'});
				//请求服务器   this.searchtext
				let [err,res] = await this.$http.post('/search/post',{
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
				return;	
			},
			// 格式转化
			__format(item){
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
			},
			loadmore() {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.loadtext != "上拉加载更多") {
					return;
				}
				//修改状态
				this.loadtext = "加载中";
				//获取数据
				setTimeout(() => {
					//获取完成
					let obj = {
						userpic: '../../static/demo/userpic/6.jpg',
						username: '昵称',
						isguanzhu: false,
						title: '我是标题',
						type: 'img', //img：图文；video：视频
						titlepic: '../../static/demo/datapic/16.jpg',
						play: "20w",
						long: "2:15",
						infonum: {
							index: 0, //0：没有操作，1：顶，2：踩
							dingnum: 11,
							cainum: 11
						},
						commentnum: 10,
						sharenum: 12
					};
					this.list.push(obj);
					this.loadtext = "上拉加载更多";
				}, 1000);
				//如果没有数据显示
				// this.loadtext = "没有更多数据";
			}
		}
	}
</script>

<style>

</style>

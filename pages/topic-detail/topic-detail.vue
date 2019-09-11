<template>
	<view>
		<topic-info :topicInfo="topicInfo"></topic-info>
		<!-- tab切换 -->
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollItemStyle="width:50%;" scrollStyle="border-bottom:0;" />
		<!-- 列表 -->
		<view class="topic-detail-list">
			<block v-for="(item, index) in tablist" :key="index">
				<template v-if="tabIndex==index">
					<!-- 列表 -->
					<block v-for="(list,listindex) in item.lists" :key="listindex">
						<common-list :item="list" :index="listindex" @changeevent="updateGuanZhu"></common-list>
					</block>
					<!-- 上拉加载 -->
					<load-more :loadtext="item.loadtext"></load-more>
				</template>
			</block>
		</view>
	</view>
</template>

<script>
	import topicInfo from "../../components/topic/topic-info.vue"
	import swiperTabHead from "../../components/index/swiper-tab-head.vue"
	import commonList from "../../components/common/common-list.vue"
	import loadMore from "../../components/common/load-more.vue";
	export default {
		components: {
			topicInfo,
			swiperTabHead,
			commonList,
			loadMore
		},
		data() {
			return {
				topicInfo: {
					titlepic: "../../static/demo/topicpic/13.jpeg",
					title: "忆往事，敬余生",
					desc: "我是描述",
					totalnum: 1000,
					todaynum: 1000,
				},
				tabIndex: 0,
				tabBars: [{
						name: "最热",
						id: "zuire"
					},
					{
						name: "最新",
						id: "zuixin"
					},
				],
				tablist: [
					{ loadtext:"上拉加载更多",list:[],firstload:false,page:1},
					{ loadtext:"上拉加载更多",list:[],firstload:false,page:1},
				]
			}
		},
		onLoad(e) {
			this.__init(JSON.parse(e.detail));
			// 开启监听
			uni.$on('updateData',this.updateGuanZhu);
		},
		//上拉触底时间
		onReachBottom() {
			//上拉加载
			this.loadmore();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.getList();
		},
		methods: {
			// 更新关注信息
			updateGuanZhu(data){
				this.tablist[this.tabIndex].lists.forEach((item,index)=>{
					if(item.userid == data.userid){
						item.isguanzhu = data.data;
					}
				})
			},
			//初始化
			__init(obj){
				uni.setNavigationBarTitle({title: obj.title});
				this.topicInfo = obj;
				// 获取列表数据
				this.getList();
			},
			//获取数据
			async getList() {
				let url = `/topic/${this.topicInfo.id}/post/${this.tablist[this.tabIndex].page}`;
				console.log(url);
				let [err,res] = await this.$http.get(url,'',{token:true});
				let error = this.$http.errorCheck(err,res,()=>{
					this.tablist[this.tabIndex].loadtext = '上拉加载更多';
				},()=>{
					this.tablist[this.tabIndex].loadtext = '上拉加载更多';
				});
				if(!error) return;
				let arr = [];
				let list = res.data.data.list;
				console.log(list);
				for (let i = 0; i < list.length; i++) {
					arr.push(this.__format(list[i]));
				}
				this.tablist[this.tabIndex].lists = this.tablist[this.tabIndex].page>1 ? this.tablist[this.tabIndex].lists.concat(arr) : arr;
				this.tablist[this.tabIndex].firstload = true;
				if(list.length<10){
					this.tablist[this.tabIndex].loadtext = '没有更多数据了';
				}else{
					this.tablist[this.tabIndex].loadtext = '上拉加载更多';
				}
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
					goodnum:item.ding_count,
					commentnum:item.comment_count,
					sharenum:item.sharenum,
					sex:item.user.userinfo.sex,
					age:item.user.userinfo.age,
				}
			},
			//点击事件
			tabtap(index) {
				this.tabIndex = index;
				this.tablist[this.tabIndex].page = 1;
				this.getList();
			},
			// //滑动事件
			// tabChange(e) {
			// 	this.tabIndex = e.detail.current;
			// },
			loadmore() {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.tablist[this.tabIndex].loadtext != "上拉加载更多") {
					return;
				}
				//修改状态
				this.tablist[this.tabIndex].loadtext = "加载中";
				// 页数+1
				this.tablist[this.tabIndex].page++;
				// 获取数据
				this.getList();
			}
		}
	}
</script>

<style>

</style>

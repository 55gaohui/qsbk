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
						<common-list :item="list" :index="listindex"></common-list>
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
				tablist: [{
						loadtext: '上拉加载更多',
						lists: [{
								userpic: "../../static/demo/userpic/8.jpg",
								username: "昵称",
								sex: 0, // 0男，1女
								age: 25,
								isguanzhu: false,
								title: "我是标题",
								titlepic: "",
								video: false,
								share: false,
								path: "深圳 龙岗",
								sharenum: 20,
								commentnum: 30,
								goodnum: 20
							},
							// 图片
							{
								userpic: "../../static/demo/userpic/8.jpg",
								username: "昵称",
								sex: 0, // 0男，1女
								age: 25,
								isguanzhu: false,
								title: "我是标题",
								titlepic: "../../static/demo/datapic/28.jpg",
								video: false,
								share: false,
								path: "深圳 龙岗",
								sharenum: 20,
								commentnum: 30,
								goodnum: 20
							},
						]
					},
					{
						loadtext: '上拉加载更多',
						lists: [ // 视频
							{
								userpic: "../../static/demo/userpic/8.jpg",
								username: "昵称",
								sex: 1, // 0男，1女
								age: 25,
								isguanzhu: false,
								title: "我是标题",
								titlepic: "../../static/demo/datapic/28.jpg",
								video: {
									looknum: "20w",
									long: "2:17"
								},
								share: false,
								path: "深圳 龙岗",
								sharenum: 20,
								commentnum: 30,
								goodnum: 20
							},
							// 分享
							{
								userpic: "../../static/demo/userpic/8.jpg",
								username: "昵称",
								sex: 0, // 0男，1女
								age: 25,
								isguanzhu: false,
								title: "我是标题",
								titlepic: "",
								video: false,
								share: {
									title: "我是分享",
									titlepic: "../../static/demo/datapic/14.jpg"
								},
								path: "深圳 龙岗",
								sharenum: 20,
								commentnum: 30,
								goodnum: 20
							}
						]
					},
					{
						loadtext: '上拉加载更多',
						lists: [{
								userpic: "../../static/demo/userpic/8.jpg",
								username: "昵称",
								sex: 0, // 0男，1女
								age: 25,
								isguanzhu: false,
								title: "我是标题",
								titlepic: "",
								video: false,
								share: false,
								path: "深圳 龙岗",
								sharenum: 20,
								commentnum: 30,
								goodnum: 20
							},
							// 图片
							{
								userpic: "../../static/demo/userpic/8.jpg",
								username: "昵称",
								sex: 0, // 0男，1女
								age: 25,
								isguanzhu: false,
								title: "我是标题",
								titlepic: "../../static/demo/datapic/28.jpg",
								video: false,
								share: false,
								path: "深圳 龙岗",
								sharenum: 20,
								commentnum: 30,
								goodnum: 20
							},
						]
					},
					{
						loadtext: '上拉加载更多',
						lists: []
					},
					{
						loadtext: '上拉加载更多',
						lists: []
					},
					{
						loadtext: '上拉加载更多',
						lists: []
					},
				]
			}
		},
		//上拉触底时间
		onReachBottom() {
			//上拉加载
			this.loadmore();
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log('2');
			this.getdata();
		},
		methods: {
			//上拉刷新
			getdata() {
				setTimeout(() => {
					//获取数据
					let arr = [{
							userpic: "../../static/demo/userpic/8.jpg",
							username: "昵称",
							sex: 0, // 0男，1女
							age: 25,
							isguanzhu: false,
							title: "我是标题111",
							titlepic: "",
							video: false,
							share: false,
							path: "深圳 龙岗",
							sharenum: 20,
							commentnum: 30,
							goodnum: 20
						},
						// 图片
						{
							userpic: "../../static/demo/userpic/8.jpg",
							username: "昵称",
							sex: 0, // 0男，1女
							age: 25,
							isguanzhu: false,
							title: "我是标题",
							titlepic: "../../static/demo/datapic/28.jpg",
							video: false,
							share: false,
							path: "深圳 龙岗",
							sharenum: 20,
							commentnum: 30,
							goodnum: 20
						}
					];
					this.tablist[this.tabIndex].lists = arr;
					uni.stopPullDownRefresh();
				}, 2000);
			},
			//点击事件
			tabtap(index) {
				this.tabIndex = index;
			},
			//滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			loadmore() {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.tablist[this.tabIndex].loadtext != "上拉加载更多") {
					return;
				}
				//修改状态
				this.tablist[this.tabIndex].loadtext = "加载中";
				//获取数据
				setTimeout(() => {
					//获取完成
					let obj = {
						userpic: "../../static/demo/userpic/8.jpg",
						username: "昵称",
						sex: 0, // 0男，1女
						age: 25,
						isguanzhu: false,
						title: "我是标题",
						titlepic: "../../static/demo/datapic/28.jpg",
						video: false,
						share: false,
						path: "深圳 龙岗",
						sharenum: 20,
						commentnum: 30,
						goodnum: 20
					};
					this.tablist[this.tabIndex].lists.push(obj);
					this.tablist[this.tabIndex].loadtext = "上拉加载更多";
				}, 2000);
				//如果没有数据显示
				// this.tablist[this.tabIndex].loadtext = "没有更多数据";
			}
		}
	}
</script>

<style>

</style>

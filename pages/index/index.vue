<template>
	<view>
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" />
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :current="tabIndex" :style="{height: swiperheight+'px'}" @change="tabChange">
				<swiper-item v-for="(items, index) in newslist" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
						<template v-if="items.lists.length>0">
							<!-- 图片列表 -->
							<block v-for="(item,index1) in items.lists" :key="index1">
								<index-list :item="item" :index="index1"></index-list>
							</block>
							<!-- 上拉加载 -->
							<loadMore :loadtext="items.loadtext" />
						</template>
						<template v-else-if="!items.firstload">
							<view style="font-size: 50upx; font-weight: bold; color: #CCCCCC; padding-top: 100upx;" class="u-f-ajc">Loading ...</view>
						</template>
						<template v-else>
							<no-thing />
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	import indexList from '../../components/index/index-list.vue'
	import swiperTabHead from "../../components/index/swiper-tab-head.vue"
	import loadMore from "../../components/common/load-more.vue"
	import noThing from "../../components/common/no-thing.vue"
	export default {
		name: "index",
		components: {
			indexList,
			swiperTabHead,
			loadMore,
			noThing
		},
		data() {
			return {
				tabIndex: 0,
				swiperheight: 500,
				currentIndex: 0,
				tabBars: [],
				newslist: [{
						loadtext: '上拉加载更多',
						lists: [{
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
							},
							{
								userpic: '../../static/demo/userpic/7.jpg',
								username: '视频',
								isguanzhu: true,
								title: '我是视频内容',
								type: 'video', //img：图文；video：视频
								titlepic: '../../static/demo/datapic/16.jpg',
								play: "20w",
								long: "2:15",
								infonum: {
									index: 2, //0：没有操作，1：顶，2：踩
									dingnum: 15,
									cainum: 11
								},
								commentnum: 10,
								sharenum: 12
							},
							{
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
							},
						]
					},
					{
						loadtext: '上拉加载更多',
						lists: [{
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
							},
							{
								userpic: '../../static/demo/userpic/7.jpg',
								username: '视频',
								isguanzhu: true,
								title: '我是视频内容',
								type: 'video', //img：图文；video：视频
								titlepic: '../../static/demo/datapic/16.jpg',
								play: "20w",
								long: "2:15",
								infonum: {
									index: 2, //0：没有操作，1：顶，2：踩
									dingnum: 15,
									cainum: 11
								},
								commentnum: 10,
								sharenum: 12
							},
						]
					},
					{
						loadtext: '上拉加载更多',
						lists: [{
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
							},
							{
								userpic: '../../static/demo/userpic/7.jpg',
								username: '视频',
								isguanzhu: true,
								title: '我是视频内容',
								type: 'video', //img：图文；video：视频
								titlepic: '../../static/demo/datapic/16.jpg',
								play: "20w",
								long: "2:15",
								infonum: {
									index: 2, //0：没有操作，1：顶，2：踩
									dingnum: 15,
									cainum: 11
								},
								commentnum: 10,
								sharenum: 12
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
		onLoad() {
			this.getNav();
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperheight = height;
				}
			})
		},
		//监听搜索框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: "../search/search",
			})
		},
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 1:
					uni.navigateTo({
						url: '../add-input/add-input',
					});
					break;
				default:
					break;
			}
		},
		methods: {
			//获取文章分类
			
			async getNav(){
				let [err,res] = await this.$http.get('/postclass','',{
					token: true
				});
				if(!this.$http.errorCheck(err,res)) return;
				let list = res.data.data.list;
				let arr = [];
				let arr2= [];
				for (let i=0; i < list.length; i++) {
					arr.push({
						id: list[i].id,
						name: list[i].classname
					});
					arr2.push({
						loadtext:"上拉加载更多",
						list:[],
						page:1,
						firstload:false
					})
				}
				this.tabBars = arr;
				this.newslist = arr2;
				this.tabBars.length > 0 && this.getList();
			},
			//获取指定列表
			async getList(){
				
			},
			//点击事件
			tabtap(index) {
				this.tabIndex = index;
			},
			//滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			loadmore(index) {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.newslist[index].loadtext != "上拉加载更多") {
					return;
				}
				//修改状态
				this.newslist[index].loadtext = "加载中";
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
					this.newslist[index].lists.push(obj);
					this.newslist[index].loadtext = "上拉加载更多";
				}, 2000);
				//如果没有数据显示
				// this.newslist[index].loadtext = "没有更多数据";
			}
		}
	}
</script>

<style>

</style>

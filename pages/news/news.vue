<template>
	<view>
		<!-- 自定义导航栏 -->
		<news-nav-bar :tabBars="tabBars" :tabIndex="tabIndex" @change-tab="changeTab"></news-nav-bar>

		<view class="uni-tab-bar">
			<swiper class="swiper-box" :current="tabIndex" :style="{height: swiperheight+'px'}" @change="tabChange">
				<!-- 关注 -->
				<swiper-item>
					<scroll-view scroll-y class="list" @scrolltolower="loadmore()">
						<!-- 列表 -->
						<block v-for="(item, index) in guanzhu.list" :key="index">
							<common-list :item="item" :index="index"></common-list>
						</block>
						<load-more :loadtext="guanzhu.loadtext" />
					</scroll-view>
				</swiper-item>
				<!-- 话题 -->
				<swiper-item>
					<scroll-view scroll-y class="list">
						<!-- 搜索框 -->
						<view class="search-input">
							<input class="uni-input" placeholder-class="icon iconfont icon-sousuo topic-search" placeholder="搜索内容" />
						</view>
						<!-- 轮播图 -->
						<swiper class="topic-swiper" :circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<block v-for="(item, index) in topic.swiper" :key="index">
								<swiper-item>
									<view class="swiper-item"><image :src="item.src" mode="widthFix"></image></view>
								</swiper-item>
							</block>
						</swiper>
						<!-- 热门分类 -->
						<topic-nav :nav="topic.nav"></topic-nav>
						<!-- 最近更新 -->
						<view class="topic-news">
							<view>最近更新</view>
							<block v-for="(item, index) in topic.list" :key="index">
								<topic-list :item="item" :index="index"></topic-list>
							</block>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import newsNavBar from "../../components/news/news-nav-bar.vue"
	import commonList from "../../components/common/common-list.vue"
	import loadMore from "../../components/common/load-more.vue"
	import topicNav from "../../components/news/topic-nav.vue"
	import topicList from "../../components/news/topic-list.vue"
	export default {
		components: {
			newsNavBar,
			commonList,
			loadMore,
			topicNav,
			topicList
		},
		data() {
			return {
				tabIndex: 0,
				swiperheight: 500,
				tabBars: [{
						name: "关注",
						id: "guanzhu"
					},
					{
						name: "话题",
						id: "huati"
					}
				],
				guanzhu: {
					loadtext: '上拉加载更多',
					list: [
						//文字
						{
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
						// 视频
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
				}
				,
				topic: {
					swiper: [],
					nav: [],
					list: []
				},	
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperheight = height;
				}
			}),
			this.__init();
		},
		methods: {
			//初始化数据
			__init(){
				this.getSwiper();
				this.getNav();
				this.getHot();
			},
			//获取banner
			async getSwiper(){
				let [err,res] = await this.$http.get('/adsense/1');
				if(!this.$http.errorCheck(err,res)) return;
				let list = res.data.data.list;
				let arr = [];
				for (var i = 0; i < list.length; i++) {
					arr.push({
						src: list[i].src,
						url: list[i].url
					})
				}
				this.topic.swiper = arr;
			},
			//获取热门分类
			async getNav(){
				let[err,res] = await this.$http.get('/topicclass');
				if(!this.$http.errorCheck(err,res)) return;
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push({
						id:list[i].id,
						name:list[i].classname
					})
				}
				this.topic.nav = arr;
			},
			//获取热门话题
			async getHot(){
				let[err,res] = await this.$http.get('/hottopic');
				if(!this.$http.errorCheck(err,res)) return;
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push({
						id:list[i].id,
						titlepic:list[i].titlepic,
						title:list[i].title,
						desc:list[i].desc,
						totalnum:list[i].post_count,
						todaynum:list[i].todaypost_count,
					})
				}
				this.topic.list = arr;
			},
			//点击事件
			changeTab(index) {
				this.tabIndex = index
			},
			//滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			loadmore() {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.guanzhu.loadtext != "上拉加载更多") {
					return;
				}
				//修改状态
				this.guanzhu.loadtext = "加载中";
				//获取数据
				setTimeout(() => {
					//获取完成
					let obj = {
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
					};
					this.guanzhu.list.push(obj);
					this.guanzhu.loadtext = "上拉加载更多";
				}, 2000);
				//如果没有数据显示
				// this.guanzhu.loadtext = "没有更多数据";
			}
		}
	}
</script>

<style>
	.search-input {
		padding: 20upx;
	}

	.search-input>input {
		background: #F4F4F4;
		border-radius: 10upx;
	}

	.topic-search {
		display: flex;
		justify-content: center;
		font-size: 27upx;
	}
	
	.topic-swiper{
		padding:0 20upx 20upx;
	}
	.topic-swiper image{
		width: 100%;
		border-radius: 10upx;
	}
	
	.topic-news{
		padding: 20upx;
	}
</style>

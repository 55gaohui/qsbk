<template>
	<view>
		<swiper-tab-head :tabbars="tabbars" :tabIndex="tabIndex" @tabtap="tabtap" />
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :current="tabIndex" :style="{height: swiperheight+'px'}" @change="tabChange">
				<swiper-item v-for="(items, index) in newslist" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
						<template v-if="items.lists.length>0">
							<!-- 话题列表 -->
							<view class="topic-view">
								<block v-for="(item,index1) in items.lists" :key="index1">
									<topic-list :item="item" :index="index1"></topic-list>
								</block>
							</view>
							<!-- 上拉加载 -->
							<loadMore :loadtext="items.loadtext" />
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
	import swiperTabHead from "../../components/index/swiper-tab-head.vue"
	import loadMore from "../../components/common/load-more.vue"
	import noThing from "../../components/common/no-thing.vue"
	import topicList from "../../components/news/topic-list.vue"
	export default {
		name: "topic-nav-page",
		components: {
			swiperTabHead,
			loadMore,
			noThing,
			topicList
		},
		data() {
			return {
				tabIndex: 0,
				swiperheight: 500,
				tabbars: [{
						name: "关注",
						id: "guanzhu"
					},
					{
						name: "推荐",
						id: "tuijian"
					},
					{
						name: "科技",
						id: "keji"
					},
					{
						name: "体育",
						id: "tiyu"
					},
					{
						name: "热点",
						id: "redian"
					},
					{
						name: "财经",
						id: "caijing"
					},
				],
				newslist: [{
						loadtext: '上拉加载更多',
						lists: [{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
							{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
							{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
							{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
							{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
							{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
							{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
						]
					},
					{
						loadtext: '上拉加载更多',
						lists: [{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
							{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
							{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
							{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							}
						]
					},
					{
						loadtext: '上拉加载更多',
						lists: [{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							},
							{
								titlepic: "../../static/demo/demo5.jpg",
								title: "话题名称",
								desc: "我是话题描述",
								totalnum: "20",
								todaynum: "3"
							}
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
		methods: {
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
						titlepic: "../../static/demo/demo5.jpg",
						title: "话题名称",
						desc: "我是话题描述",
						totalnum: "20",
						todaynum: "3"
					};
					this.newslist[index].lists.push(obj);
					this.newslist[index].loadtext = "上拉加载更多";
				}, 2000);
				//如果没有数据显示
				// this.newslist[index].loadtext = "没有更多数据";
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperheight = height;
				}
			})
		},
	}
</script>

<style>
.topic-view{
	padding: 0 20upx;
}
</style>

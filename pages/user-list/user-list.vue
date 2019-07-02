<template>
	<view>
		<!-- tab切换 -->
		<swiper-tab-head :tabbars="tabbars" :tabIndex="tabIndex" @tabtap="tabtap" scrollItemStyle="width:33%;" scrollStyle="border-bottom:0;">
		</swiper-tab-head>

		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
						<template v-if="items.lists.length>0">
							<!-- 图文列表 -->
							<block v-for="(item,index1) in items.lists" :key="index1">
								<user-list-com :item="item" :index="index1"></user-list-com>
							</block>
							<!-- 上拉加载 -->
							<load-more :loadtext="items.loadtext"></load-more>
						</template>
						<template v-else>
							<!-- 无内容默认 -->
							<no-thing></no-thing>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import swiperTabHead from "../../components/index/swiper-tab-head.vue"
	import userListCom from "../../components/user-list/user-list-com.vue"
	import loadMore from "../../components/common/load-more.vue";
	import noThing from "../../components/common/no-thing.vue";
	export default {
		name: "user-list",
		components: {
			swiperTabHead,
			userListCom,
			loadMore,
			noThing
		},
		data() {
			return {
				tabIndex: 0,
				swiperheight: 500,
				tabbars: [{
						name: "互关",
						id: "huguan",
						num: 10
					},
					{
						name: "关注",
						id: "guanzhu",
						num: 20
					},
					{
						name: "粉丝",
						id: "fensi",
						num: 30
					},
				],
				newslist: [{
						loadtext: "上拉加载更多",
						lists: [{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 20,
								sex: 0,
								isguanzhu: true
							},
							{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 21,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 20,
								sex: 0,
								isguanzhu: true
							},
							{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 20,
								sex: 0,
								isguanzhu: true
							},

							{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 21,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 20,
								sex: 0,
								isguanzhu: true
							},
							{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 21,
								sex: 1,
								isguanzhu: false
							},
							{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 20,
								sex: 0,
								isguanzhu: true
							},
							{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 21,
								sex: 1,
								isguanzhu: false
							}
						]
					},
					{
						loadtext: "上拉加载更多",
						lists: [{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 20,
								sex: 0,
								isguanzhu: true
							},
							{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 21,
								sex: 1,
								isguanzhu: false
							}
						]
					},
					{
						loadtext: "上拉加载更多",
						lists: [{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 20,
								sex: 0,
								isguanzhu: true
							},
							{
								userpic: "../../static/demo/userpic/11.jpg",
								username: "昵称",
								age: 21,
								sex: 1,
								isguanzhu: false
							}
						]
					}
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
						userpic: "../../static/demo/userpic/11.jpg",
						username: "昵称",
						age: 21,
						sex: 1,
						isguanzhu: false
					};
					this.newslist[index].lists.push(obj);
					this.newslist[index].loadtext = "上拉加载更多";
				}, 2000);
				//如果没有数据显示
				// this.newslist[index].loadtext = "没有更多数据";
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateBack({
					delta: 1
				});
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

</style>

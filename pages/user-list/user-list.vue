<template>
	<view class="uni-tab-bar body">
		<!-- 自定义导航 -->
		<!-- #ifdef MP-WEIXIN -->
		<uni-nav-bar :shadow="false" :border="false" @click-right="clickRight">
			<!-- 搜索框 -->
			<view style="display: flex;justify-content: center;align-items: center;border-radius: 4px;margin-left: -120upx;height: 60upx;margin-top: 12upx;color: #CCCCCC;background: #F7F7F7;" @tap="openSearch">
				<view class="iconfont icon-sousuo" style="margin-right: 6upx;"></view>搜索用户
			</view>
			<!-- 右边按钮 -->
			<block slot="right">
				<view>取消</view>
			</block>
		</uni-nav-bar>
		<!-- #endif -->
		
		<!-- tab切换 -->
		<swiper-tab-head :tabBars="tabbars" :tabIndex="tabIndex" @tabtap="tabtap" scrollItemStyle="width:33%;" scrollStyle="border-bottom:0;">
		</swiper-tab-head>
		<view>
			<swiper class="swiper-box" :current="tabIndex" @change="tabChange">
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
	// #ifdef MP-WEIXIN
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	// #endif
	export default {
		name: "user-list",
		components: {
			swiperTabHead,
			userListCom,
			loadMore,
			noThing,
			// #ifdef MP-WEIXIN
			uniNavBar
			// #endif
		},
		data() {
			return {
				tabIndex: 0,
				tabbars: [
					{ name: "互关", id: "huguan", num: 10 },
					{ name: "关注", id: "guanzhu", num: 10 },
					{ name: "粉丝", id: "fensi", num: 30 },
				],
				newslist: [{
						loadtext: "上拉加载更多",
						lists: [],
						page: 1,
						firstload: false
					},
					{
						loadtext: "上拉加载更多",
						lists: [],
						page: 1,
						firstload: false
					},
					{
						loadtext: "上拉加载更多",
						lists: [],
						page: 1,
						firstload: false
					}
				]
			}
		},
		onShow() {
			this.__init();
		},
		// 监听导航按钮事件
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				uni.navigateBack({
					delta: 1
				});
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search?searchType=user'
			})
		},
		methods: {
			__init(){
				console.log(this.User.counts);
				this.tabbars[0].num = this.User.counts.friend_count < 100 ? this.User.counts.friend_count : '99+';
				this.tabbars[1].num = this.User.counts.withfollow_count < 100 ? this.User.counts.withfollow_count : '99+';
				this.tabbars[2].num = this.User.counts.withfen_count < 100 ? this.User.counts.withfen_count : '99+';
				this.getUrl();
				this.getList();
			},
			//请求地址 （互关 关注 粉丝）
			getUrl(){
				let arr = ['/friends/','/follows/','/fens/'];
				return arr[this.tabIndex]+this.newslist[this.tabIndex].page;
			},
			//获取列表
			async getList(){
				let currentIndex = this.tabIndex;
				let [err,res] = await this.$http.get(this.getUrl(),{},{
					token: true,
					checkToken: true
				});
				//错误处理
				if(!this.$http.errorCheck(err,res)){
					this.newslist[currentIndex].loadtext="上拉加载更多";
					return;
				} 
				//成功
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push(this.__format(list[i],currentIndex));
				}
				this.newslist[currentIndex].lists = this.newslist[currentIndex].lists.page > 1 ? this.newslist[currentIndex].lists.concat(arr) : arr;
				this.newslist[currentIndex].firstload = true;
				this.newslist[currentIndex].loadtext= list.length < 10 ? "没有更多数据了" : "上拉加载更多";
				return;
			},
			//点击事件
			tabtap(index) {
				this.tabIndex = index;
				// 判断是否首次加载过了
				if (!this.newslist[this.tabIndex].firstload) {
					this.getList();
				}
			},
			//滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
				// 判断是否首次加载过了
				if (!this.newslist[this.tabIndex].firstload) {
					this.getList();
				}
			},
			loadmore(index) {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.newslist[index].loadtext != "上拉加载更多") return;
				//修改状态
				this.newslist[index].loadtext = "加载中...";
				//获取数据
				this.newslist[index].page++;
				this.getList();
			},
			__format(item,currentIndex){
				return {
					id:item.userinfo.user_id,
					userpic:item.userpic,
					username:item.username,
					age:item.userinfo.age,
					sex:item.userinfo.sex,
					isguanzhu:currentIndex !== 2 
				}
			},
			// #ifdef MP-WEIXIN
			openSearch(){
				uni.navigateTo({
					url: '../search/search?searchType=user'
				})	
			},
			clickRight(){
				uni.navigateBack({
					delta: 1
				});
			}
			// #endif
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateBack({
					delta: 1
				});
			}
		},
	}
</script>

<style>

</style>

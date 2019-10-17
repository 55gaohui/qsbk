<template>
	<view>
		<!-- 自定义导航栏 -->
		<news-nav-bar :tabBars="tabBars" :tabIndex="tabIndex" @change-tab="changeTab"></news-nav-bar>

		<view class="uni-tab-bar">
			<swiper class="swiper-box" :current="tabIndex" :style="{height: swiperheight+'px'}" @change="tabChange">
				<!-- 关注 -->
				<swiper-item>
					<scroll-view scroll-y class="list" @scrolltolower="loadmore()">
						<template v-if="guanzhu.list.length>0">
							<!-- 列表 -->
							<block v-for="(item, index) in guanzhu.list" :key="index">
								<common-list :item="item" :index="index"></common-list>
							</block>
							<load-more :loadtext="guanzhu.loadtext" />
						</template>
						<template v-else-if="!guanzhu.firstload">
							<view style="font-size: 50upx;font-weight: bold;color: #CCCCCC; padding-top: 100upx;" class="u-f-ajc">Loading ...</view>
						</template>
						<template v-else>
							<noThing />
						</template>
					</scroll-view>
				</swiper-item>
				<!-- 话题 -->
				<swiper-item>
					<scroll-view scroll-y class="list">
						<!-- 搜索框 -->
						<view class="search-input">
							<input class="uni-input" placeholder-class="icon iconfont icon-sousuo topic-search" placeholder="搜索话题" disabled="true" @tap="openSearch" />
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
	import noThing from "../../components/common/no-thing.vue"
	export default {
		components: {
			newsNavBar,
			commonList,
			loadMore,
			topicNav,
			topicList,
			noThing
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
					firstload: false,
					loadtext: '上拉加载更多',
					list: [],
					page: 1,
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
			uni.$on('updateData',this.updateData);
		},
		onShow(){
			this.getFollowPostList();
		},
		methods: {
			//初始化数据
			__init(){
				this.getSwiper();
				this.getNav();
				this.getHot();
			},
			updateData(data){
				switch (data.type){
					case "support":
						this.updateSupport(data);
						break;
					case "updateComment":
						this.updateComment(data);
						break;	
				}
			},
			// 更新评论数
			updateComment(data){
				// 拿到当前对象
				let obj = this.guanzhu.list.find((val) => {
					return val.id === data.post_id;
				})
				if(!obj) return;
				obj.commentnum++;   // 评论数+1
			},
			//更新顶踩
			updateSupport(data){
				let obj = this.guanzhu.list.find((item)=>{
					return item.id === data.post_id;
				})
				if(!obj || obj.infonum.index === 1) return;
				if (data.do == 'ding') {
					obj.infonum.index = 1;
					obj.goodnum++;
				}
			},
			//获取关注列表数据
			async getFollowPostList(){
				let url = `/followpost/${this.guanzhu.page}`;
				let [err,res] = await this.$http.get(url,{},{
					token: true
				});
				//错误处理
				if(!this.$http.errorCheck(err,res)) {
					this.guanzhu.firstload = true;
					return this.guanzhu.loadtext = '上拉加载更多';
				}
				//成功
				let arr = [];
				console.log('1');
				console.log(res);
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push(this.__format(list[i]))
				}
				
				this.guanzhu.list = this.guanzhu.page > 1 ? this.guanzhu.list.concat(arr) : arr;
				this.guanzhu.firstload = true;
				this.guanzhu.loadtext = list.length < 10 ? '没有更多数据了' : '上拉加载更多';
				return;
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
				if(this.guanzhu.loadtext!="上拉加载更多") return;
				this.guanzhu.loadtext = '加载中...';
				this.guanzhu.page++;
				this.getFollowPostList();
			},
			openSearch(){
				uni.navigateTo({
					url: '../search/search?searchType=topic'
				})
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

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
								<index-list :item="item" :index="index1" @changeevent="updateData"></index-list>
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
				newslist: []
			}
		},
		onLoad() {
			this.getNav();
			// 开启监听
			uni.$on('updateData',this.updateData);
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
					this.User.navigate({
						url: '../add-input/add-input?postclass='+JSON.stringify(this.tabBars),
					});
					break;
				default:
					break;
			}
		},
		methods: {
			updateData(data){
				switch (data.type){
					case 'guanzhu':
					this.updateGuanZhu(data);
						break;
					case 'support':
					this.updateSupport(data);
						break;
					case "updateList":
						this.updateList(data);
						break;
					case "updateComment":
						this.updateComment(data);
						break;		
				}
			},
			// 更新评论数
			updateComment(data){
				// 拿到当前对象
				let obj = this.newslist[this.tabIndex].list.find((val) => {
					return val.id === data.post_id;
				})
				if(!obj) return;
				console.log(obj);
				obj.commentnum++;   // 评论数+1
			},
			//更新用户发布信息
			updateList(data){
				// 第一种，直接追加
				// 获取当前文章属于哪一类
				let index = this.tabBars.findIndex((val) => {
					return val.id = data.post_class_id;
				})
				// 添加至找的分类
				if (index > -1) {
					this.tabBars[index].lists.push(__format(data));
				}
				// 第二种，重新加载当前post_class_id信息
			},
			// 更新关注信息
			updateGuanZhu(data){
				this.newslist[this.tabIndex].lists.forEach((item,index)=>{
					if(item.userid == data.userid){
						item.isguanzhu = data.data;
					}
				})
			},
			//更新顶踩
			updateSupport(data){
				//拿到当前对象
				let obj = this.newslist[this.tabIndex].lists.find(value =>{
					return value.id == data.post_id;
				});
				if(!obj) return;
				let oldindex = obj.infonum.index; // 操作前的状态
				obj.infonum.index = (data.do == 'ding') ? 1 : 2; // 操作后的状态
				if(oldindex !== 0){ //之前操作过
					oldindex == 1 ? obj.infonum.dingnum-- : obj.infonum.cainum--;
				}
				if (obj.infonum.index !== 0) {  // 当前操作
					obj.infonum.index == 1 
						? obj.infonum.dingnum++ : obj.infonum.cainum++;
				}
			},
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
						lists:[],
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
				let url = `/postclass/${this.tabBars[this.tabIndex].id}/post/${this.newslist[this.tabIndex].page}`;
				let [err,res] = await this.$http.get(url,'',{token:true});
				let error = this.$http.errorCheck(err,res,()=>{
					this.newslist[this.tabIndex].loadtext = '上拉加载更多';
				},()=>{
					this.newslist[this.tabIndex].loadtext = '上拉加载更多';
				});
				if(!error) return;
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push(this.__format(list[i]));
				}
				this.newslist[this.tabIndex].lists = this.newslist[this.tabIndex].page>1 ? this.newslist[this.tabIndex].lists.concat(arr) : arr;
				this.newslist[this.tabIndex].firstload = true;
				if(list.length<10){
					this.newslist[this.tabIndex].loadtext = '没有更多数据了';
				}else{
					this.newslist[this.tabIndex].loadtext = '上拉加载更多';
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
					commentnum:item.comment_count,
					sharenum:item.sharenum,
				}
			},
			//点击事件
			tabtap(index) {
				this.tabIndex = index;
			},
			//滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
				this.getList();
			},
			loadmore(index) {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.newslist[index].loadtext != "上拉加载更多") {
					return;
				}
				//修改状态
				this.newslist[index].loadtext = "加载中";
				this.newslist[this.tabIndex].page++;
				this.getList();
			}
		}
	}
</script>

<style>

</style>

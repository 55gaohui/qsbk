<template>
	<view>
		<!-- 导航 -->
		<!-- #ifdef MP-WEIXIN -->
		<uni-nav-bar :shadow="false" :border="false" @click-left="clickLeft()" @click-right="clickRight()" title="小纸条">
			<!-- 左边图标 -->
			<block slot="left">
				<view class="iconfont icon-user-detail" style="font-size: 22px;margin-left: 20upx;"></view>
			</block>
			<!-- 右边图标 -->
			<block slot="right">
				<view class="icon iconfont icon-zengjia" style="font-size: 22px;"></view>
			</block>
		</uni-nav-bar>
		<!-- #endif -->
		<paper-left-popup
		@hidepopup="hidepopup" 
		@addfriend="addfriend"
		@clear="clear"
		:show="show"
		></paper-left-popup>
		<!-- 小纸条列表 -->
		<template v-if="list.length > 0">
			<block v-for="(item, index) in list" :key="index">
				<paper-list :item="item" :index="index"></paper-list>
			</block>
		</template>
		<template v-else-if="!firstload">
			<view style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
			padding-top: 100upx;" class="u-f-ajc">Loading ...</view>
		</template>
		<template v-else>
			<!-- 无内容默认 -->
			<no-thing></no-thing>
		</template>
		
	</view>
</template>

<script>
	import paperList from "../../components/paper/paper-list.vue"
	import loadMore from "../../components/common/load-more.vue"
	import paperLeftPopup from "../../components/paper/paper-left-popup.vue";
	import noThing from "../../components/common/no-thing.vue"
	import Time from "../../common/time.js"
	// #ifdef MP-WEIXIN
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	// #endif
	export default {
		name: "paper",
		components: {
			paperList,
			loadMore,
			paperLeftPopup,
			noThing,
			// #ifdef MP-WEIXIN
			uniNavBar
			// #endif
		},
		data() {
			return {
				firstload: false,
				show: false,
				list: []
			}
		},
		//上拉加载
		onPullDownRefresh() {
			//获取数据
			this.getdata();
		},
		//上拉触底事件
		// onReachBottom() {
			
		// },
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0:
					this.User.navigate({
						url: '../user-list/user-list'
					});
					this.hidepopup();
					break;
				case 1:
					this.showpopup();
					break;
				default:
					break;
			}
		},
		onLoad(){
			uni.$on('UserChat',(data)=>{
				let index = this.list.findIndex((val) => {
					return val.userid = data.from_id
				})
				//会话存在
				if(index !== -1){
					this.list[index].data = data.data;
					this.list[index].time = Time.gettime.gettime(data.time);
					this.list[index].noreadnum++;
					//置顶
					this.list = this.$chat.__toFirst(this.list,index);
					return;
				}
				//追加
				let obj = this.$chat.__format(data,{type: 'chatlist'});
				//格式化时间
				obj.time = Time.gettime.gettime(obj.time);
				obj.noreadnum = 1;
				this.list.unshift(obj);
			})
		},
		onShow() {
			this.getdata();
		},
		methods: {
			// #ifdef MP-WEIXIN
			clickLeft(){
				this.User.navigate({
					url: '../user-list/user-list'
				});
				this.hidepopup();
			},
			clickRight(){
				this.showpopup();
			},
			// #endif
			// 获取数据
			getdata() {
				try{
					let userid = this.User.userinfo.id;
					if(!userid){
						this.firstload = true;
						return uni.stopPullDownRefresh();
					}
					let list = uni.getStorageSync('chatlist'+this.User.userinfo.id);
					list = list ? JSON.parse(list) : [];
					for (let i = 0; i < list.length; i++) {
						list[i].time = Time.gettime.gettime(list[i].time);
					}
					this.list = list;
					this.firstload = true;
				}catch(e){
					return uni.stopPullDownRefresh();
				}
				uni.stopPullDownRefresh();
				
			},
			showpopup() {
				this.show = true;
			},
			hidepopup() {
				this.show = false;
			},
			addfriend() {
				this.User.navigate({
					url: '../search/search?searchType=user',
				})
				this.hidepopup();
			},
			clear() {
				if(this.User.userinfo.id){
					uni.removeStorageSync('noreadnum'+this.User.userinfo.id);
					uni.removeStorageSync('chatlist'+this.User.userinfo.id);
					this.$chat.initTabbarBadge();
					this.getdata();
					uni.showToast({
						title: '清除成功'
					})
				}
				this.hidepopup();
			}
		}
	}
</script>

<style>

</style>

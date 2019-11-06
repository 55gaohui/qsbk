<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<uni-nav-bar :shadow="false" :border="false" rightText="清除" title="浏览历史" @click-right="clickRight"></uni-nav-bar>
		<!-- #endif -->
		<template v-if="list.length > 0">
			<uni-list>
				<block v-for="(item,index) in list" :key="index">
					<uni-list-item :title="item.title" :thumb="item.titlepic" @tap="openDetail(item)"></uni-list-item>
				</block>
			</uni-list>
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
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue"
	import noThing from "../../components/common/no-thing.vue"
	// #ifdef MP-WEIXIN
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	// #endif
	export default {
		components:{
			uniList,
			uniListItem,
			noThing,
			// #ifdef MP-WEIXIN
			uniNavBar
			// #endif
		},
		data() {
			return {
				firstload: false,
				list: []
			}
		},
		onNavigationBarButtonTap() {
			this.clear();
		},
		onLoad() {
			this.getList();
		},
		methods: {
			// #ifdef MP-WEIXIN
			clickRight(){
				this.clear();
			},
			// #endif
			getList(){
				try{
					let list = uni.getStorageSync('HistoryList_'+this.User.userinfo.id);
					this.list = list ? JSON.parse(list) : [];
				}catch(e){
					//TODO handle the exception
					uni.showToast({
						title: "加载失败~",
						icon: false
					})
				}
				this.firstload = true;
			},
			//清除浏览历史
			clear(){
				uni.showModal({
					title: "提示",
					content: '是否要清除浏览历史？',
					success: res=>{
						console.log(res);
						if(res.confirm){
							this.User.clearHistory();
							this.list= [];
							uni.showToast({title: "清除成功"});
						}
					}
				});
			},
			//跳转详情页
			openDetail(item){
				uni.navigateTo({
					url: "/pages/detail/detail?detailData="+JSON.stringify(item)
				})
			}
		}
	}
</script>
<style>

</style>

<template>
	<view>
		<paper-left-popup
		@hidepopup="hidepopup" 
		@addfriend="addfriend"
		@clear="clear"
		:show="show"
		></paper-left-popup>
		<!-- 小纸条列表 -->
		<block v-for="(item, index) in list" :key="index">
			<paper-list :item="item" :index="index"></paper-list>
		</block>
		<load-more :loadtext="loadtext" />
	</view>
</template>

<script>
	import paperList from "../../components/paper/paper-list.vue"
	import loadMore from "../../components/common/load-more.vue"
	import paperLeftPopup from "../../components/paper/paper-left-popup.vue";
	export default {
		name: "paper",
		components: {
			paperList,
			loadMore,
			paperLeftPopup
		},
		data() {
			return {
				loadtext: "上拉加载更多",
				show: false,
				list: [{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 2
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 0
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 0
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 11
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 2
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 0
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 0
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 11
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 0
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 11
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 0
					},
					{
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称",
						time: "10:21",
						data: "我是信息",
						noreadnum: 11
					}
				]
			}
		},
		//上拉加载
		onPullDownRefresh() {
			//获取数据
			this.getdata();
		},
		//上拉触底事件
		onReachBottom() {
			this.loadmore();
		},
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0:
					this.user.navigate({
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
		methods: {
			getdata() {
				setTimeout(() => {
					let arr = [{
							userpic: "../../static/demo/userpic/12.jpg",
							username: "昵称11",
							time: "10:21",
							data: "我是下拉刷新信息",
							noreadnum: 62
						},
						{
							userpic: "../../static/demo/userpic/12.jpg",
							username: "昵称",
							time: "10:21",
							data: "我是下拉刷新信息",
							noreadnum: 2
						},
						{
							userpic: "../../static/demo/userpic/12.jpg",
							username: "昵称",
							time: "10:21",
							data: "我是下拉刷新信息",
							noreadnum: 0
						},
						{
							userpic: "../../static/demo/userpic/12.jpg",
							username: "昵称",
							time: "10:21",
							data: "我是下拉刷新信息",
							noreadnum: 0
						},
						{
							userpic: "../../static/demo/userpic/12.jpg",
							username: "昵称",
							time: "10:21",
							data: "我是信息",
							noreadnum: 11
						}
					];
					this.list = arr;
					uni.stopPullDownRefresh();
				}, 2000)
			},
			loadmore() {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.loadtext != "上拉加载更多") {
					return;
				}
				//修改状态
				this.loadtext = "加载中";
				//获取数据
				setTimeout(() => {
					//获取完成
					let obj = {
						userpic: "../../static/demo/userpic/12.jpg",
						username: "昵称ss",
						time: "10:21",
						data: "我是信息ssss",
						noreadnum: 0
					};
					this.list.push(obj);
					this.loadtext = "上拉加载更多";
				}, 2000);
				//如果没有数据显示
				// this.loadtext = "没有更多数据";
			},
			showpopup() {
				this.show = true;
			},
			hidepopup() {
				this.show = false;
			},
			addfriend() {
				this.show = false;
			},
			clear() {
				this.show = false;
			}
		}
	}
</script>

<style>

</style>

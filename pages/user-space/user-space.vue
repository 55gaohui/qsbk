<template>
	<view>
		<!-- 背景图 + 用户基本信息 -->
		<user-space-head :userinfo="userinfo" @update="updateGuanzhu"></user-space-head>
		<!-- 统计 -->
		<view class="user-space-data">
			<home-data :homedata="spacedata"></home-data>
		</view>
		<view style="height: 20upx; background: #F4F4F4;"></view>
		
		<!-- tab导航 -->
		<swiper-tab-head 
		:tabBars="tabBars" 
		:tabIndex="tabIndex" 
		@tabtap="tabtap" 
		scrollItemStyle="width:33.33%;" 
		scrollStyle="border-bottom:0;">
		</swiper-tab-head>
			
		<block v-for="(item, index) in tablist" :key="index">
			<template v-if="tabIndex===0 && tabIndex === index">
				<!-- 主页 -->
				<user-space-userinfo :userinfo="userinfo"></user-space-userinfo>
			</template>
			<template v-else-if="tabIndex==index">
				<!-- 列表 -->
				<block v-for="(list,listindex) in item.lists" :key="listindex">
					<common-list :item="list" :index="listindex"></common-list>
				</block>
				<!-- 上拉加载 -->
				<load-more :loadtext="item.loadtext"></load-more>
			</template>
		</block>
		<!-- 操作菜单 -->
		<user-space-popup :show="show" @hide="togleShow()" @lahei="lahei()" :isbalck="userinfo.isblack" @chat="goToChat()"></user-space-popup>
	</view>
</template>

<script>
	import userSpaceHead from "../../components/user-space/user-space-head"
	import homeData from "../../components/home/home-data.vue"
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import userSpaceUserinfo from "../../components/user-space/user-space-userinfo.vue"
	import commonList from "../../components/common/common-list.vue"
	import loadMore from "../../components/common/load-more.vue"
	import userSpacePopup from "../../components/user-space/user-space-popup.vue"
	import Time from "../../common/time.js"
	export default {
		name: "user-space",
		components: {
			userSpaceHead,
			homeData,
			swiperTabHead,
			userSpaceUserinfo,
			commonList,
			loadMore,
			userSpacePopup
		},
		data() {
			return {
				show: false,
				userinfo: {
					bgimg: '',
					userpic: "",
					username: "",
					sex: 0,
					age: 0,
					isguanzhu: false,
					isblack: false,
					regtime: "",
					id: 1213,
					birthday: "",
					job: "",
					path: "",
					qg: ""
				},
				spacedata:[
					{ name:"获赞", num:0 },
					{ name:"关注", num:0 },
					{ name:"粉丝", num:0 },
				],
				tabIndex:0,
				tabBars:[
					{ name:"主页",id:"zhuye" },
					{ name:"糗事",id:"qiushi" },
					{ name:"动态",id:"dongtai" },
				],
				tablist: [
					{},
					{
						loadtext: '上拉加载更多',
						lists: [],
						page: 1,
						firstload: false
					},
					{
						loadtext: '上拉加载更多',
						lists: [],
						page: 1,
						firstload: false
					}
				]
			}
		},
		//上拉触底时间
		onReachBottom() {
			//上拉加载
			this.loadmore();
		},
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				this.togleShow();
			};
		},
		onLoad(e) {
			this.__init(e.userid);
		},
		methods: {
			//初始化
			__init(userid){
				//初始化用户信息
				this.getUserInfo(userid);
				//初始化统计数据
				this.getCounts(userid);
			},
			// 初始化用户信息
			async getUserInfo(userid){
				let qgArr = ['秘密','未婚','已婚'];
				//用户本人
				let isme,info,isguanzhu,isblack;
				if(userid == this.User.userinfo.id){
					info = this.User.userinfo;
					isme = true;
					isguanzhu =  false;
					isblack = false;
				}else{
					// 非本人，获取用户信息
					try{
						let [err,res] = await this.$http.post('/getuserinfo',{
							user_id: userid
						},{
							token: true
						});
						// 错误处理
						if(!this.$http.errorCheck(err,res)) return;
						//成功
						info = res.data.data;
						isme = false;
						isguanzhu = !!res.data.data.fens.length;
						isblack = !!res.data.data.blacklist.length;
					}catch(e){
						return;
						//TODO handle the exception
					}
				}
				let regtime = info.create_time ? Time.gettime.dateFormat(new Date(info.create_time*1000),'{Y}-{MM}-{DD}') : '未知';
				this.userinfo = {
					isme: isme,
					bgimg: 1,
					userpic: info.userpic,
					username: info.username,
					sex: info.userinfo.sex,
					age: info.userinfo.age,
					isguanzhu: isguanzhu,
					isblack: isblack,
					regtime: regtime,
					id: info.id,
					birthday: info.userinfo.birthday,
					job: info.userinfo.job || '未知',
					path: info.userinfo.path || '未知',
					qg: qgArr[info.userinfo.qg] || '秘密'	
				}
			},
			// 初始化统计数据
			async getCounts(userid){
				let counts;
				if(userid == this.User.userinfo.id){
					counts = this.User.counts;
				}else{
					let [err,res] = await this.$http.get('/user/getcounts/'+userid,);
					if(!this.$http.errorCheck(err,res)) return;
					counts = res.data.data;
				}
				if(counts){
					this.spacedata[0].num = counts.post_count;
					this.spacedata[1].num = counts.withfollow_count;
					this.spacedata[2].num = counts.withfen_count;
				}
			},
			async getList(){
				let page = this.tablist[this.tabIndex].page;
				let url = this.userinfo.isme ? `/user/allpost/${page}` : `/user/${this.userinfo.id}/post/${page}`;
				let index = this.tabIndex;
				let [err,res] = await this.$http.get(url,{},{token: true});
				//错误处理
				if(!this.$http.errorCheck(err,res)) return;
				//成功
				let arr = [];
				let list = res.data.data.list;
				for (let i = 0; i < list.length; i++) {
					arr.push(this.__format(list[i]));
				}
				this.tablist[index].lists = page > 1 ? this.tablist[index].list.concat(arr) : arr;
				this.tablist[index].firstload = true;
				this.tablist[index].loadtext= list.length < 10 ? "没有更多数据了" : "上拉加载更多";
				return;
			},
			//更新关注状态
			updateGuanzhu(val){
				this.userinfo.isguanzhu = val;
				// 通知全局
				let resdata = {
					type:"guanzhu",
					userid:this.userinfo.id,
					data:val
				};
				uni.$emit('updateData',resdata);
			},
			// 操作菜单显示隐藏
			togleShow(){
				this.show = !this.show;
			},
			async lahei(){
				let url = this.userinfo.isblack ? '/removeblack' : '/addblack';
				uni.showLoading({
					title: 'loading...',
					mask: false
				});
				let [err,res] = await this.$http.post(url,{
					id: this.userinfo.id
				},{
					token: true,
					checkToken: true,
					checkAuth: true
				});
				//失败处理
				if(!this.$http.errorCheck(err,res)){
					uni.hideLoading();
					return this.togleShow();
				}
				//成功
				let msg = res.data.msg;
				uni.hideLoading();
				uni.showToast({title: msg});
				this.userinfo.isblack = !this.userinfo.isblack;
				this.togleShow();
			},
			goToChat(){
				let obj = {
					userid:this.userinfo.id,
					userpic:this.userinfo.userpic,
					username:this.userinfo.username
				};
				this.User.navigate({
					url: '/pages/user-chat/user-chat?userinfo='+JSON.stringify(obj)
				});
				this.togleShow();
				//更新未读信息
				this.$chat.Read(this.userinfo);
			},
			loadmore() {
				//如果当前状态是还在加载中，或没有更多数据，直接返回
				if (this.tablist[this.tabIndex].loadtext != "上拉加载更多") return;
				//修改状态
				this.tablist[this.tabIndex].loadtext = "加载中...";
				//获取数据
				this.tablist[this.tabIndex].page++;
				this.getList();
			},
			//切换tab标签
			tabtap(index){
				this.tabIndex=index;
				if (this.tablist[index].firstload || index === 0) return;
				this.getList();
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
	.user-space-margin {
		margin: 15upx 0;
	}

	.user-space-data {
		background: #FFFFFF;
		position: relative;
		z-index: 10;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		margin-top: -15upx;
	}
</style>

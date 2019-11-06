<template>
	<view>
		<template v-if="!loginStatus">
			<!-- 未登录 -->
			<view class="u-f-ajc">登录仿糗百，体验更多功能</view>
			<!-- 第三方登录 -->
			<other-login :noback="true" @logining="isLogin()"></other-login>
			<!-- 账号密码登录 -->
			<view class="u-f-ajc" @tap="openLogin">账号密码登陆 <view class="icon iconfont icon-jinru"></view>
			</view>
		</template>
		<template v-else>
			<!-- 已登陆状态 -->
			<home-info :homeinfo="homeinfo"></home-info>
		</template>
		<!-- 数据 -->
		<home-data :homedata="homedata"></home-data>
		<!-- 广告位 -->
		<view class="home-adv u-f-ajc animated fadeIn fast">
			<image src="../../static/demo/demo20.jpg" mode="widthFix" lazy-load></image>
		</view>
		<!-- 功能列表 -->
		<view class="home-list">
			<block v-for="(item,index) in list" :key="index">
				<home-list-item :item="item" :index="index"></home-list-item>
			</block>
		</view>
	</view>
</template>

<script>
	import homeInfo from "../../components/home/home-info.vue"
	import homeData from "../../components/home/home-data.vue"
	import otherLogin from "../../components/home/other-login.vue"
	import homeListItem from "../../components/home/home-list-item.vue"
	export default {
		name: "home",
		components: {
			homeData,
			homeInfo,
			otherLogin,
			homeListItem
		},
		data() {
			return {
				loginStatus: true,
				homeinfo: {
					userpic: "../../static/demo/userpic/11.jpg",
					username: "昵称",
					totalnum: 0,
					todaynum: 0,
				},
				homedata: [{
						name: "糗事",
						num: 0
					},
					{
						name: "动态",
						num: 0
					},
					{
						name: "评论",
						num: 0
					},
					{
						name: "粉丝",
						num: 0
					},
				],
				list: [{
						icon: "liulan",
						name: "浏览历史",
						clicktype: "navigateTo",
						url: "/pages/user-history/user-history"
					},
					{
						icon: "huiyuanvip",
						name: "糗百认证",
						clicktype: "noThing",
						url: ""
					},
					{
						icon: "keyboard",
						name: "审核糗事",
						clicktype: "noThing",
						url: ""
					},
					// #ifdef MP-WEIXIN
					{
						icon: "shezhi",
						name: "我的设置",
						clicktype: "navigateTo",
						url: "/pages/user-set/user-set",
						auth: true,
						NoCheck: true
					},
					// #endif
					
				]
			}
		},
		onShow() {
			this.isLogin();
		},
		methods: {
			openLogin() {
				uni.navigateTo({
					url: '../login/login'
				});
			},
			// 判断用户是否登录
			isLogin(){
				if(!this.User.token){
					this.loginStatus = false;
					this.homeinfo={
						userpic:"",
						username:"",
						totalnum:0,
						todaynum:0,
					};
					this.homedata[0].num = 0;
					this.homedata[1].num = 0;
					this.homedata[2].num = 0;
					this.homedata[3].num = 0;
					return;
				}
				// 用户已登录
				this.homeinfo.id = this.User.userinfo.id;
				this.homeinfo.userpic = this.User.userinfo.userpic;
				this.homeinfo.username = this.User.userinfo.username;
				this.homeinfo.totalnum = this.User.counts.post_count || 0;
				this.homeinfo.todaynum = this.User.counts.today_posts_count || 0;
				this.homedata[0].num = this.User.counts.post_count || 0;
				this.homedata[1].num = this.User.counts.post_count || 0;
				this.homedata[2].num = this.User.counts.comments_count || 0;
				this.homedata[3].num = this.User.counts.withfen_count || 0;
				this.loginStatus = true;
				
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateTo({
					url: '../user-set/user-set',
				})
			}
		}
	}
</script>

<style scoped>
	.home-list {
		padding: 20upx;
	}

	.home-adv {
		padding: 40upx;
	}

	.home-adv>image {
		border-radius: 20upx;
		width: 100%;
		/* 		height: 150upx; */
	}
</style>

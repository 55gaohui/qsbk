<template>
	<view>
		<view class="index-list animated fadeInLeft fast">
			<view class="index-list1 u-f-ac u-f-jsb">
				<view class="u-f-ac">
					<image :src="item.userpic" mode="aspectFill" @tap.stop="openSpace"></image>
					{{item.username}}
				</view>
				<view class="u-f-ac" v-show="!item.isguanzhu" @tap="guanzhu">
					<view class="icon iconfont icon-zengjia"></view>关注
				</view>
			</view>
			<view class="index-list2" @tap="opendetail()">
				{{item.title}}
			</view>
			<view class="index-list3 u-f-ajc" @tap="opendetail()" v-show="item.titlepic">
				<template v-if="item.titlepic">
					<image :src="item.titlepic" mode="widthFix" lazy-load></image>
				</template>
				<template v-if="item.type == 'video'">
					<view class="index-list-play icon iconfont icon-bofang"></view>
					<view class="index-list-playinfo">
						{{item.play}} {{item.long}}
					</view>
				</template>
			</view>
			<view class="index-list4 u-f-ac u-f-jsb">
				<view class="u-f-ac">
					<view class="u-f-ac" @tap="caozuo('ding')">
						<view class="icon iconfont icon-icon_xiaolian-mian" :class="{'active': (item.infonum.index == 1)}"></view>
						{{item.infonum.dingnum}}
					</view>
					<view class="u-f-ac" @tap="caozuo('cai')">
						<view class="icon iconfont icon-kulian" :class="{'active': (item.infonum.index == 2)}"></view>
						{{item.infonum.cainum}}
					</view>
				</view>
				<view class="u-f-ac">
					<view class="u-f-ac">
						<view class="icon iconfont icon-pinglun1"></view>
						{{item.commentnum}}
					</view>
					<view class="u-f-ac">
						<view class="icon iconfont icon-zhuanfa"></view>
						{{item.sharenum}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "index-list",
		props: {
			item: Object,
			index: Number
		},
		data() {
			return{
				
			}
		},
		onLoad() {
			console.log(this.listsData);
		},
		methods: {
			//点击关注事件
			async guanzhu() {
				let [err,res] = await this.$http.post('/follow',{
					follow_id: this.item.userid
				},{
					token: true,
					checkToken:true,
					checkAuth: true
				});
				//错误处理
				if(!this.$http.errorCheck(err,res)) return;
				//修改数据
				uni.showToast({ title: '关注成功' });
				let resData = {
					type: 'guanzhu',
					userid:this.item.userid,
					data: true
				}
				// 通知父组件
				this.$emit('changeevent',resData);
				// 通知全局修改数据
				uni.$emit('updateData',resData);
			},
			//顶踩事件
			async caozuo(type) {
				let index = (type == 'ding') ? 1 : 2;  // 操作后的状态
				if(this.item.infonum.index == index) return; // 状态相同不修改
				let [err,res] = await this.$http.post('/support',{
					  post_id: this.item.id,
					  type: index-1
				},{
					token: true,
					checkToken: true,
					checkAuth: true
				});
				// 错误处理
				if (!this.$http.errorCheck(err,res)) return;
				uni.showToast({
					title: index == 1 ? "顶成功" : "踩成功"
				});
				let resDate = {
					type: 'support',
					post_id: this.item.id,
					do: type 
				};
				// 通知父组件
				this.$emit('changeevent',resDate);
				// 通知全局
				uni.$emit("updateData",resDate);
			},
			//打开用户空间
			openSpace(){
				uni.navigateTo({
					url: '/pages/user-space/user-space?userid='+this.item.userid
				})
			},
			//进入详情页
			opendetail() {
				uni.navigateTo({
					url: '../../pages/detail/detail?detailData='+JSON.stringify(this.item),
				});
			}
		}
	}
</script>

<style scoped>
	.index-list {
		padding: 20upx;
		border-bottom: 1upx solid #EEEEEE;
	}

	.index-list1>view:first-child {
		color: #999999;
	}

	.index-list1>view:first-child image {
		width: 85upx;
		height: 85upx;
		border-radius: 100%;
		margin-right: 10upx;
	}

	.index-list1>view:last-child {
		background: #F4F4F4;
		border-radius: 5upx;
		padding: 0 10upx;
	}

	.index-list2 {
		padding-top: 15upx;
		font-size: 32upx;
	}

	.index-list3 {
		position: relative;
		padding-top: 15upx;
	}

	.index-list3>image {
		width: 100%;
		border-radius: 20upx;
	}

	.index-list4 view {
		color: #999999;
	}

	.index-list4 {
		padding: 15upx 0;
	}

	.index-list4>view>view>view,
	.index-list4>view>view:first-child {
		margin-right: 10upx;
	}

	.index-list-play {
		position: absolute;
		font-size: 140upx;
		color: #FFFFFF;
	}

	.index-list-playinfo {
		position: absolute;
		background: rgba(51, 51, 51, 0.72);
		color: #FFFFFF;
		bottom: 8upx;
		right: 8upx;
		border-radius: 40upx;
		font-size: 22upx;
		padding: 0 12upx;
	}

	.index-list4 .active,
	.index-list4 .active>view {
		color: #C5F61C;
	}
</style>

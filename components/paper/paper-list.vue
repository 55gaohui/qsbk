<template>
	<view class="paper-list u-f-ac animated fadeInLeft fast" @tap="opendetail">
		<image :src="item.userpic" mode=""></image>
		<view>
			<view class="u-f-ac u-f-jsb">
				{{item.username}} <view>{{item.time}}</view>
			</view>
			<view class="u-f-ac u-f-jsb">
				{{item.data}}
				<template v-if="getItemNoreadnum > 0">
					<uni-badge :text="getItemNoreadnum" type="error" />
				</template>
				
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from "../uni-badge/uni-badge.vue"
	export default {
		name: "paper-list",
		components:{
			uniBadge
		},
		props: {
			item: Object,
			index: Number
		},
		computed:{
			getItemNoreadnum() {
				return this.item.noreadnum
			}
		},
		methods: {
			opendetail(){
				let obj = {
					userid: this.item.userid,
					username: this.item.username,
					userpic: this.item.userpic
				}
				this.User.navigate({
					url: '/pages/user-chat/user-chat?userinfo='+JSON.stringify(obj)
				});
				//更新未读状态
				this.$chat.Read(this.item);
			}
		}
	}
</script>

<style scoped>
	.paper-list {
		border-bottom: 1upx solid #EEEEEE;
		padding: 20upx 0;
	}

	.paper-list>image {
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		margin-right: 20upx;
		flex-shrink: 0;
	}

	.paper-list>view {
		flex: 1;
	}

	.paper-list>view>view:first-child {
		font-size: 35upx;
	}

	.paper-list>view>view:first-child>view {
		color: #CBCBCB;
	}

	.paper-list>view>view:last-child {
		color: #999999;
	}
</style>

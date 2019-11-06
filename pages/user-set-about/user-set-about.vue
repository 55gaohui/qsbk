<template>
	<view style="padding: 20upx;">
		<view class="user-set-about-t u-f-ajc u-f-column animated fadeIn fast">
			<image src="../../static/common/logo.png" 
			mode="widthFix" lazy-load></image>
			<view>version 1.0.0</view>
		</view>
		<block v-for="(item,index) in list" :key="index">
			<home-list-item :item="item"
			:index="index"></home-list-item>
		</block>
	</view>
</template>

<script>
	import homeListItem from "../../components/home/home-list-item.vue";
	export default {
		name: "user-set-about",
		components:{
			homeListItem
		},
		data() {
			return {
				list:[
					// #ifdef APP-PLUS
					{ icon:"",name:"新版本检测",clicktype:"",url:"" },
					// #endif
					{ icon:"",name:"仿糗事百科用户协议",clicktype:"",url:"" },
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.user-set-about-t{
	padding: 40upx 0;
}
.user-set-about-t>image{
	margin-top: 50upx;
	margin-bottom: 30upx;
	width: 65%;
}
.user-set-about-t>view{
	color: #CCCCCC;
}
</style>

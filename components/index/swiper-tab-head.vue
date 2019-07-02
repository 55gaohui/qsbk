<template>
	<view class="uni-tab-bar">
		<scroll-view scroll-x class="uni-swiper-tab" :style="scrollStyle">
			<block v-for="(tab, index) in tabbars" :key="tab.id">
				<view class="swiper-tab-list" 
				:class="{'active': tabIndex== index}" 
				@tap="tabtap(index)" :style="scrollItemStyle">
					{{tab.name}} {{tab.num?tab.num:''}}
					<view class="swiper-tab-line"></view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		name:"swiper-tab-head",
		props:{
			tabbars: Array,
			tabIndex: Number,
			scrollStyle: {
				type: String,
				default: ""
			},
			scrollItemStyle: {
				type: String,
				default: ""
			},
		},
		data(){
			return{
				
			}
		},
		methods:{
			//tabbar 点击事件
			tabtap(index){
				this.$emit('tabtap',index);
			},
		}
	}
</script>

<style scoped>
	.uni-swiper-tab{
		border-bottom: 1upx solid #eeeeee;
	}
	.swiper-tab-list{
		color: #969696;
		font-weight: bold;
	}
	.uni-tab-bar .active{
		color: #343434;
	}
	.active .swiper-tab-line {
		border-bottom: 6upx solid #fede33;
		width: 70upx;
		margin: auto;
		border-top: 6upx solid #fede33;
		border-radius: 20upx;
	}
</style>

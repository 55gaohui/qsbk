<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar left-icon="back" :statusBar="true" @click-left="back" rightText="发布" @click-right="submit">
			<view class="u-f-ajc" @click="changelook">
				{{yinsi}}
				<view class="icon iconfont icon-xialazhankai"></view>
			</view>
		</uni-nav-bar>
		<!-- 输入框 -->
		<view class="uni-textarea">
			<textarea v-model="text" placeholder="说一句话吧~" />
		</view>
		<!-- 上传多图 -->
		<upload-images @upload="upload"/>
		<!-- 弹出框 -->
		<uni-popup :show="popupShow" position="middle" mode="fixed" @hidePopup="hidePopup">
			<view class="gonggao">
				<view class="u-f-ajc">
					<image src="../../static/common/addinput.png" mode=""></image>
				</view>
				<view class="">1.涉及黄色，政治，广告及骚扰信息</view>
				<view class="">2.涉及黄色，政治，广告及骚扰信息</view>
				<view class="">3.涉及黄色，政治，广告及骚扰信息</view>
				<view class="">4.涉及黄色，政治，广告及骚扰信息</view>
				<button type="default" @tap="hidePopup">朕知道了</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uploadImages from "../../components/common/upload-images.vue"
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	let changlook = ['所有人可见', '仅自己可见'];
	export default {
		components:{
			uniNavBar,
			uploadImages,
			uniPopup
		},
		data() {
			return {
				popupShow:true, 
				isget: false,
				yinsi: '所有人可见',
				text: '',
				imagesList: []
			}
		},
		onBackPress() {
			if(!this.isget){
				uni.showModal({
					content: '是否保存为草稿',
					cancelText: '不保存',
					confirmText: '保存',
					success: (res) => {
						if (res.confirm) {
							console.log('保存');
						} else if (res.cancel) {
							console.log('不保存');
						}
						this.isget = true;
						uni.navigateBack({
							delta: 1
						});
					}
				});
				return true;
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			//发布帖子
			submit(){
				console.log('发布帖子');
			},
			//修改帖子查看权限
			changelook(){
				uni.showActionSheet({
					itemList : changlook,
					success: (res) =>{
						this.yinsi = changlook[res.tapIndex];
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			upload(arr){
				this.imagesList = arr;
			},
			hidePopup(){
				this.popupShow = false;
			}
		},
	}
</script>
<style>
.uni-textarea{
	border: 1px solid #EEEEEE;
}
.gonggao{
	width: 500upx;
}
.gonggao image{
	width: 75%;
	margin-bottom: 20upx;
}
.gonggao button{
	margin-top: 20upx;
	background: #ffe934;
	color: #171606;
}
</style>

<template>
	<view>
		<!-- 自定义导航栏 -->
		<uni-nav-bar left-icon="back" :statusBar="true" @click-left="back" rightText="发布" @click-right="submit">
			<view class="u-f-ajc" @click="changelook">
				{{getType}}
				<view class="icon iconfont icon-xialazhankai"></view>
			</view>
		</uni-nav-bar>
		<!-- 输入框 -->
		<view class="uni-textarea">
			<textarea v-model="text" placeholder="说一句话吧~" />
		</view>
		<!-- 上传多图 -->
		<upload-images @upload="upload" :image-list="imglist" @del="delImageList"/>
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
		
		<!-- 底部 -->
		<view class="u-f-ac addinput-foot">
			<picker class="u-f1 u-f-ajc" mode="selector" :range="postclass.range" @change="changePostClass">
				<view class="u-f1 u-f-ajc">
				{{postclass.title ? postclass.title : "选择分类"}}
				</view>
			</picker>
			
			<view class="u-f1 u-f-ajc" 
			hover-class="addinput-foot-btn"
			@tap="changeTopic">{{topic.title ? topic.title : "选择话题"}}</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uploadImages from "../../components/common/upload-images.vue"
	import uniPopup from "../../components/uni-popup/uni-popup.vue"
	let changlook = ['仅自己可见','所有人可见'];
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
				yinsi: 1,
				text: '',
				imglist: [],
				imglistIds:[],
				postclass: {
					id:0,     // 当前选中分类id
					title:"", // 当前选中分类名称
					range:[], // 可选项
					list:[]   // 服务端获取到的分类列表
				},
				topic: {
					id:0,	  // 当前选中话题id
					title:""  // 当前选中话题名称
				}
			}
		},
		computed:{
			getType(){
				return changlook[this.yinsi];
			}
		},
		onBackPress() {
			if(!this.isget){
				this.baocun();
				return true;
			}
		},
		onLoad(e) {
			//读取缓存
			let res = uni.getStorageSync('addinput');
			if(res){
				res = JSON.parse(res);
				this.yinsi = res.yinsi;
				this.imglistIds = res.imglistIds || [];
				if (this.imglistIds.length) {
					this.imglist = res.imglist;
				}
				this.text = res.text;
				if (res.postclass) {
					this.postclass = res.postclass;
				}
				if (res.topic) {
					this.topic = res.topic;
				}
			}
			// 获取文章分类
			let postclass = e.postclass ? JSON.parse(e.postclass) : false;
			this.getPostClass(postclass);
			// 监听所属话题选择
			uni.$on('changeTopic',(data)=>{
				this.topic.id= data.id;
				this.topic.title= `#${data.title}#`;
			})
		},
		methods: {
			changePostClass(e){
				// 当前选中的id
				this.postclass.id = this.postclass.list[e.target.value].id;
				// 当前选中的名称
				this.postclass.title = this.postclass.list[e.target.value].name;
			},
			//分类列表
			async getPostClass(postclass){
				if(postclass){
					this.postclass.list = postclass;
					let arr = [];
					for (let i = 0; i < postclass.length; i++) {
						arr.push(postclass[i].name);
					}
					return this.postclass.range = arr;
				}
				try{
					let [err,res] = this.$http.get('/postclass');
					if(!this.$http.errorCheck(err,res)) return;
					let list = res.data.data.list;
					console.log(list);
					let arr = [], arr2 = [];
					for (let i = 0; i < list.length; i++) {
						arr.push(list[i].classname);
						arr2.push({
							id: list[i].id,
							name: lisst[i].classname
						})
					}
					this.postclass.range = arr;
					this.postclass.list = arr2;
				}catch(e){
					return;//TODO handle the exception
				}
			},
			// 话题选择
			changeTopic(){
				uni.navigateTo({
					url:"/pages/topic-nav/topic-nav?ischange="+true,
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			//发布帖子
			async submit(){
				if(!this.postclass.id){
					return uni.showToast({
						title: '请选择分类',icon:"none"
					});
				}
				uni.showLoading({ title: '发布中...', mask: true });
				try{
					let [err,res] = await this.$http.post('/post/create',{
						imglist: JSON.stringify(this.imglistIds),
						type: this.imglistIds.length>0 ? 1 : 0,
						text: this.text,
						isopen: this.yinsi,
						topic_id: this.topic.id,
						post_class_id: this.postclass.id
					},{
						token:true,
						checkToken:true,
						checkAuth:true
					})
					//发布失败
					if(!this.$http.errorCheck(err,res)){
						return uni.hideLoading();
					}
					//发布成功
					uni.hideLoading();
					uni.showToast({
						title: '发布成功！'
					});
					this.isget = true;
					uni.$emit('updateData',{
						type: 'updateList',
						data: res.data.data.detail
					});
					uni.navigateBack({
						delta:1
					})
				}catch(e){
					return;
				}
				
			},
			//修改帖子查看权限
			changelook(){
				uni.showActionSheet({
					itemList : changlook,
					success: (res) =>{
						this.yinsi = res.tapIndex;
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			// 上传图片
			upload(item){
				this.imglist.push(item.url);
				this.imglistIds.push({ id:item.id });
			},
			//删除图片
			delImageList(index){
				this.imglist.splice(index,1);
				this.imglistIds.splice(index,1);
			},
			hidePopup(){
				this.popupShow = false;
			},
			//返回 保存缓存
			baocun(){
				uni.showModal({
					content: '是否保存为草稿',
					cancelText: '不保存',
					confirmText: '保存',
					success: (res) => {
						if (res.confirm) {
							let obj = {
								yinsi:this.yinsi,
								text:this.text,
								imglist:this.imglist,
								imglistIds:this.imglistIds,
								postclass:this.postclass,
								topic:this.topic
							}
							uni.setStorageSync('addinput',JSON.stringify(obj));
						} else if (res.cancel) {
							uni.removeStorageSync('addinput'); // 清除缓存
						}
						this.isget = true;
						uni.navigateBack({
							delta: 1
						});
					}
				});
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
.addinput-foot{
	background: #FFFFFF;
	position: fixed;bottom: 0;left: 0;right: 0;height: 88upx;border-top:1upx solid #DDDDDD
}
.addinput-foot view{
	height: 100%;
}
.addinput-foot-btn{
	background: #F4F4F4;
}
</style>

<template>
	<view class="body">
		<input type="text" v-model="email"
		class="uni-input common-input"
		placeholder="输入邮箱" />
	
		<button class="user-set-btn" 
		:loading="loading" :class="{'user-set-btn-disable':isbind}" 
		type="primary" :disabled="disabled || isbind" @tap="submit()">{{isbind ? "已绑定":"立即绑定"}}</button>
		
	</view>
</template>

<script>
	export default {
		name: "user-set-email",
		data() {
			return {
				isbind: false,
				email: "",
				password: "",
				disabled:true,
				loading:false
			}
		},
		onLoad(e) {
			if (e.email && e.email !== 'false' && e.email !== 'null') {
				this.email = e.email;
				this.disabled = true;
				this.isbind = true;
			}
		},
		watch:{
			email(val){
				this.change();
			}
		},
		methods: {
			// 监听输入框
			change(){
				if(this.email){
					this.disabled=false;
					return;
				}
				this.disabled=true;
			},
			//验证层
			check(){
				// 验证邮箱格式
				let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(!this.email || this.email == "" || !ePattern.test(this.email)){
					uni.showToast({
						title: '邮箱有误',
						icon: "none"
					});
					return false
				}
				return true;
			},
			//提交
			async submit(){
				if(!this.check()) return; 
				this.loading=this.disabled=true;
				let [err,res] = await this.$http.post('/user/bindemail',{
					email:this.email
				},{
					token: true,
					checkToken: true
				})
				if(!this.$http.errorCheck(err,res)){
					this.loading = this.disabled = false; 
					return ;
				}
				// 绑定成功
				this.isbind = true;
				this.loading = this.disabled = false;
				// 修改状态，缓存
				this.User.userinfo.email = this.email;
				uni.setStorageSync("userinfo",this.User.userinfo);
				return uni.showToast({
					title: '绑定成功！',
					success: () => {
						uni.navigateBack({ delta: 1 });
					}
				});
				
			}
		}
	}
</script>

<style>
@import "../../common/form.css";
</style>

<template>
	<view class="body">
		<input type="text" v-model="email"
		class="uni-input common-input"
		placeholder="输入邮箱" />
		
		<input type="text" v-model="password"
		class="uni-input common-input" password
		placeholder="输入密码" />
		
		<button class="user-set-btn" 
		:loading="loading" :class="{'user-set-btn-disable':disabled}" 
		type="primary" :disabled="disabled" @tap="submit()">完成</button>
		
	</view>
</template>

<script>
	export default {
		name: "user-set-email",
		data() {
			return {
				email: "",
				password: "",
				disabled:true,
				loading:false
			}
		},
		watch:{
			email(val){
				this.change();
			},
			password(val){
				this.change();
			}
		},
		methods: {
			// 监听输入框
			change(){
				if(this.email && this.password){
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
				if(!this.password || this.password == ""){
					uni.showToast({
						title: '密码有误',
						icon: "none"
					});
					return false
				}
				return true;
			},
			//提交
			submit(){
				this.loading = true;
				this.disabled = true;
				if(!this.check()){this.loading = false;this.disabled = false; return ;}
				uni.showToast({
					title: '验证通过',
					mask: false,
					duration:1500
				});
				this.loading = false;
				this.disabled = false;
			}
		}
	}
</script>

<style>
@import "../../common/form.css";
</style>

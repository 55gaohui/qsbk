<template>
	<view>
		<view class="login-input-box">
			<view class="phone u-f-ajc">+86</view>
			<input type="text" v-model="phone" :disabled="isbind" class="uni-input common-input phone-input" placeholder="手机号" />
		</view>
		<view class="login-input-box" v-if="!isbind">
			<input type="text" v-model="checknum" class="uni-input common-input forget-input" placeholder="请输入验证码" />
			<view class="forget u-f-ajc login-font-color yanzhengma" @tap="getCheckNum">
				<view class="u-f-ajc">{{!codetime ? '获取验证码' : codetime+' s'}}</view>
			</view>
		</view>
		<button class="user-set-btn" 
				:loading="loading" :class="{'user-set-btn-disable':isbind}" 
				type="primary" @tap="submit" :disabled="disabled || isbind">{{isbind?"已绑定":"立即绑定"}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isbind: false,
				phone: "",
				checknum: "",
				loading: false,
				disabled: true,
				codetime: 0,
			}
		},
		onLoad(e) {
			if(e.phone !== 'false' && e.phone && e.phone !== 'null'){
				this.phone = e.phone;
				this.isbind = true;
			}
		},
		watch:{
			phone(){
				this.onBtnChange();
			},
			checknum(){
				this.onBtnChange();
			}
		},
		methods: {
			// 验证手机号
			isPhone(){
				let mPattern = /^1[34578]\d{9}$/; 
				return mPattern.test(this.phone);
			},
			// 改变按钮状态
			onBtnChange(){
				if((this.username && this.password) || (this.phone && this.checknum)){
					this.disabled = false;
					return;
				}
				this.disabled = true;
			},
			async getCheckNum() {
				if(this.codetime>0){
					uni.showToast({
						title: '请稍后再试',
						icon: "none"
					});
					return;
				}
				// 验证码登录
				// 验证手机号合法性
				if(!this.isPhone()){
					uni.showToast({
						title: '请输入正确的手机号',
						icon: "none"
					});
					return;
				}
				// 请求服务器，发送验证码
				let [err,res] = await this.$http.post('/user/sendcode',{
					phone: this.phone
				});
				// 请求失败处理
				this.$http.errorCheck(err,res)
				if (res.data.errorCode === 30001) return;
				// 发送成功，开启倒计时
				this.codetime = 60;
				let timer = setInterval(() =>{
					this.codetime--;
					if(this.codetime<1){
						clearInterval(timer);
						this.codetime = 0;
					}
				},1000);
				
			},
			async submit(){
				// 验证手机号合法性
				if(!this.isPhone()){
					uni.showToast({
						title: '请输入正确的手机号',
						icon: "none"
					});
					return;
				}
				let [err,res] = await this.$http.post('/user/bindphone',{
					phone:this.phone,
					code:this.checknum
				},{
					token: true,
					checkToken: true
				});
				// 请求失败处理
				if(!this.$http.errorCheck(err,res)) return;
				//成功
				this.isbind = true;
				this.disabled = false;
				uni.showToast({title: '绑定成功',});
				// 修改状态，保存缓存
				let data = res.data.data;
				
				if(data === 'Boolean'){
					this.User.userinfo.phone = this.phone;
				}else{
					this.User.userinfo = this.User.__formatUserinfo(data);
				}
				uni.setStorageSync('userinfo',this.User.userinfo);
			}
		}
	}
</script>

<style>
	@import "../../common/form.css";
	.login-input-box {
		position: relative;
	}

	.login-input-box .forget-input {
		padding-right: 150upx;
	}

	.login-input-box .forget,
	.login-input-box .phone {
		position: absolute;
		top: 0;
		height: 100%;
		z-index: 100;
	}

	.login-input-box .forget {
		width: 150upx;
		right: 0;
	}

	.login-input-box .phone {
		width: 100upx;
		left: 0;
		font-weight: bold;
	}

	.login-input-box .phone-input {
		padding-left: 100upx;
	}

	.yanzhengma view {
		background: #EEEEEE;
		border-radius: 10upx;
		font-size: 25upx;
		width: 150upx;
		padding: 10upx 0;
	}
</style>

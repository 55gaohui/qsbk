import $http from "./request.js";
export default {
	// 用户token 测试token：4cd36bf70649475ac0cd6fae78250954474a4350
	token:'fda0b3e40d3fd9437be0050c025f50f624ac716f',
	// 用户信息
	userinfo:false,
	// 用户相关统计
	counts:{},
	// 绑定第三方登录情况
	userbind:false,
	// 初始化
	__init(){
		//获取用户信息
		this.userinfo = uni.getStorageSync('userinfo');
		this.token = uni.getStorageSync('token');
		this.counts = uni.getStorageSync('counts');
		this.userbind = uni.getStorageSync('userbind');
		console.log(this.userinfo);
		console.log(this.counts);
	},
	//权限验证跳转
	navigate(options,type='navigateTo'){
		//权限验证
		if(!this.token){
			return uni.navigateTo({url: '/pages/login/login'})
		};
		//跳转
		switch (type){
			case 'navigateTo':
				uni.navigateTo(options);
				break;
			case "redirectTo":
				uni.redirectTo(options);
				break;
			case "reLaunch":
				uni.reLaunch(options);
				break;
			case "switchTab":
				uni.switchTab(options);
				break;	
		}
		
	},
	//登录
	async login(options = {}){
		uni.showLoading({ title: '登录中...', mask: true });
		//请求登录
		let [err,res] =await $http.post(options.url,options.data);
		// 登录失败
		if(!$http.errorCheck(err,res)){
			uni.hideLoading();
			return false;
		}
		// 登录成功 保存状态
		this.token = res.data.data.token;
		console.log(res.data.data);
		this.userinfo = this.__formatUserinfo(res.data.data);
		console.log(this.userinfo);
		// 本地存储
		uni.setStorageSync('token',this.token);
		uni.setStorageSync('userinfo',this.userinfo);
		// 获取用户相关统计
		await this.getCounts();
		// 连接socket
		
		// 成功提示
		uni.hideLoading();
		uni.showToast({ title: '登录成功' });
		// 返回上一步
		if (!options.Noback) {
			uni.navigateBack({ delta: 1 });
		}else{
			uni.navigateTo({url: '/pages/home/home',});
		}
		return true;
	},
	// 获取用户相关统计信息
	async getCounts(){
		// 统计获取用户相关数据（总文章数，今日文章数，评论数 ，关注数，粉丝数，文章总点赞数） 
		let [err,res] = await $http.get('/user/getcounts'+this.userinfo.id,{},{
			token: true,checkToken: true
		});
		//请求错误处理
		if(!$http.errorCheck(err,res)) return;
		//成功
		this.counts = res.data.data;
		//储存缓存
		uni.setStorageSync('counts',this.counts);
	},
	// userinfo格式转换
	__formatUserinfo(obj){
		// 手机/邮箱/账号登录
		if(obj.logintype == 'username' || obj.logintype == 'phone' || obj.logintype == 'email'){
			// 设置默认头像
			obj.userpic = obj.userpic || "https://ghfree.cn/uploads/20190808/d5734d4328e5f03wet825855b42c7bca.jpg";
			return obj;
		}
		// 第三方登录（已绑定）
		if (obj.user && obj.user_id > 0) {
			return {
				id: obj.user.id,
				username: obj.user.username || obj.nickname,
				userpic: obj.user.userpic || obj.avatarurl,
				phone: obj.user.phone,
				email: obj.user.email,
				status: obj.user.status,
				create_time: obj.user.create_time,
				logintype: obj.logintype,
				password:obj.user.password,
				token: obj.token,
				userinfo: {
					id: obj.user.userinfo.id,
					user_id: obj.user.userinfo.user_id,
					age: obj.user.userinfo.age,
					sex: obj.user.userinfo.sex,
					qg: obj.user.userinfo.qg,
					job: obj.user.userinfo.job,
					path: obj.user.userinfo.path,
					birthday: obj.user.userinfo.birthday,
				}
			}
		}
		// 第三方登录（未绑定）
		return {
			id: obj.user_id,
			username: obj.nickname,
			userpic: obj.avatarurl,
			phone: false,
			email: false,
			status: 1,
			create_time: false,
			logintype: obj.logintype,
			token: obj.token,
			userinfo: false
		}
	}
}
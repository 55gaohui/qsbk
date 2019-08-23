export default {
	// 用户token 测试token：4cd36bf70649475ac0cd6fae78250954474a4350
	token:'fda0b3e40d3fd9437be0050c025f50f624ac716f',
	// 用户信息
	userinfo:false,
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
		
	}
}
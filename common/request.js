import config from "./config.js"
import User from "./user.js"
export default {
	config: {
		baseUrl: config.webUrl,
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {},
		method: 'GET',
		dataType: 'json'
	},
	request(options = {}){
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.dataType = options.dataType || this.config.dataType;
		options.url = this.config.baseUrl + options.url;
		// TODO：token增加等操作
		if(options.token){
			if(options.checkToken && !User.token){
				uni.showToast({title: '请先登录',icon: 'none'})
				return uni.navigateTo({
					url: '/pages/login/login'
				});
			}
			options.header.token = User.token;
		}
		return uni.request(options);
	},
	get(url,data,options={}){
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options);
	},
	post(url,data,options={}){
		options.url = url;
		options.data = data;
		options.method = 'post';
		return this.request(options);
	},
	errorCheck(err,res,errfun = false,resfun = false){
		if(err){
			typeof errfun === 'function' && errfun();
			uni.showToast({title: '加载失败',icon:'none'});
			return false;

		}
		if(res.data.errorCode){
			typeof resfun === 'function' && resfun();
			uni.showToast({title: res.data.msg,icon:'none'})
			return false;
		}
		return true;
	}
}
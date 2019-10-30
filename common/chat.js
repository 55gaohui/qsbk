 /*
 * 需要引入：
 * 	配置文件     import Config from "/common/config.js";
 * 	用户操作类库  import User from "/common/user.js";
 *  时间类库     import Time from "/common/time.js";
 *  接口请求库     import $http from "/common/request.js"
 */
import Time from "/common/time.js"
import $http from "/common/request.js"
import User from "/common/user.js"
import Config from "/common/config.js"

export default{
	//socket 地址
	url: Config.websocketUrl,
	//连接状态
	IsOpen: false,
	//socketTask
	SocketTask: false,
	// 是否上线（会员id绑定客户端id，验证用户身份，通过则绑定）
	IsOnline: false,
	//当前聊天对象	（进入聊天页面获取）
	
	CurrentToUser:{
		userid: 0,	// 通过判断userid是否为0，当前用户处在什么场景下
		username: '',
		userpic: ''
	},
	//连接
	Open(){
		if(this.IsOpen) return;	// 防止重复连接
		//连接
		this.SocketTask = uni.connectSocket({
			url: url,
			complete: (e)=>{}
		});
		if(!this.SocketTask) return;
		//监听开启
		this.SocketTask.onOpen(()=>{
			// 将连接状态设为已连接
			this.IsOnline = true;
		});
		//监听信息
		this.Message();
		//监听关闭
		this.SocketTask.onClose(() => {
			this.IsOpen = false;
			this.SocketTask = false;
		});
		//监听错误
		this.SocketTask.onError(() => {
			this.IsOpen = false;
			this.SocketTask = false;
		})
	},
	//关闭连接
	Close(){
		if(this.IsOpen){
			this.SocketTask.close();
			return uni.removeTabBarBadge({
				index: Config.TabbarIndex
			});
		}
	},
	//发送信息
	send(data){
		// 发送的格式
		let senddata = this.__format(data,{type:'send'});
		// 存储到chatdetail
		this.__UpdateChatdetail(senddata);
		// 存储到chatlist（将当前会话置顶，修改chatlist中当前会话的data和time显示）
		this.__UpdateChatlist(senddata);
		// 发送到服务器（交由页面去做）
		return senddata;
	},
	//读取当前会话
	Read(item){
		/*
		item的格式
		{
			userid:12,
			userpic:"../../static/demo/userpic/12.jpg",
			username:"昵称",
			time:"10:21",
			data:"我是信息",
			noreadnum:2
		}
		*/
		if(!item.noreadnum) return;
		let chatlist = uni.getStorageSync('chatlist'+User.userinfo.id);
		chatlist = chatlist ? JSON.parse(chatlist) : [];
		//拿到当前会话索引
		let index = chatlist.findIndex( (val) =>{
			return val.userid == item.userid;
		})
		// 如果会话存在
		if(index !== -1){
			chatlist[index].noreadnum = 0;
			// 存储
			uni.setStorage({
				key: 'chatlist'+User.userinfo.id,
				data: JSON.stringify(chatlist)
			})
			// 更新tabbar的badge
			this.__UpdateNoReadNum({type: 'read', num: oldnoreadnum});
		}
	},
	//用户绑定
	UserBind(client_id){
		$http.post('/chat/bind',{
			type: 'bind',
			client_id: client_id
		},{
			token: true
		}).then( data =>{
			let [err,res] = data;
			//错误处理   退出登录，重新链接等处理
			if(!$http.errorCheck(err,res)) return;
			//成功
			return this.resultUserBind(res.data.data);
		})
	},
	//用户绑定结果
	resultUserBind(res){
		if(res.status && res.type == 'bind'){
			//改为上线
			this.IsOnline = true;
			//获取总未读数，并且渲染到tabbar的badge
			this.initTabbarBadge();
			//获取未读信息
			this.getChatMessages();
			return;
		}
		//绑定失败,断开连接
		uni.showToast({title: res.msg,icon: 'none'});
		this.SocketTask.close();
	},
	//接收未读信息
	getChatMessages(){
		
	},
	// 监听服务器的消息事件
	Message(){
		this.SocketTask.onMessage((e) =>{
			// 字符串转json
			let res = JSON.parse(e.data);
			/*{
				type: 'bind',
				status: true
			}*/
			//绑定返回结果
			if(res.type == 'bind'){
				return this.UserBind(res.data);
			}
			if(res.type !== 'text') return;
			//全局通知接口
			uni.$emit('UserChat',res);
			//储存到chatdetail
			this.__UpdateChatdetail(res);
			//更新到chatlist
			this.__UpdateChatlist(res);
			//总未读数+1，修改tabbar信息署  （当前不在聊天界面，CurrentToUser.userid=0）
			if(this.CurrentToUser.userid !== res.from_id){
				this.__UpdateNoReadNum({type: 'add'});
			}
		})
	},	
	//总未读数+1，修改tabbar信息数
	__UpdateNoReadNum(option={}){
		//获取总未读数
		let noreadnum = uni.getStorageSync('noreadnum'+User.userinfo.id);
		noreadnum = noreadnum || 0;
		if(option.type == 'add'){
			//总未读数+1
			noreadnum++;
			//响铃震动提示
			this.__Notify();
		}else{
			noreadnum -= option.num;	// 读取信息减少
		}
		noreadnum = noreadnum > 0 ? noreadnum : 0;
		//修改tabbar信息数
		this.__UpdateTabbarBadge(noreadnum);
		//储存
		uni.setStorage({
			key:'noreadnum'+User.userinfo.id,
			data:noreadnum
		})
		
	},
	// 渲染到tabbar提示数
	__UpdateTabbarBadge(num){
		if(num && num > 0){
			return uni.setTabBarBadge({
				index: Config.TabbarIndex,
				text: num > 99 ? '99+' : num.toString()
			})
		}
		//如果num为零 移除tabber提示数
		return uni.removeTabBarBadge({
			index: Config.TabbarIndex
		})
	},
	//更新聊天列表界面信息 更新chatlist（将当前会话置顶，修改chatlist中当前会话的data和time显示）
	__UpdateChatlist(data){
		/*
		// 组织格式，本地存储
		{
			userid:12,
			userpic:"../../static/demo/userpic/12.jpg",
			username:"昵称",
			time:"10:21",
			data:"我是信息",
			noreadnum:2
		}
		*/
	   //获取旧数据
		let chatlist = uni.getStorageSync('chatlist'+User.userinfo.id);
		chatlist = chatlist ? JSON.parse(chatlist) : [];
		// 判断是否已存在该会话，存在：将当前会话置顶；不存在：追加至头部
		let index = chatlist.findIndex( (item) => {
			return item.userid == res.to_id || item.userid == res.from_id
		});
		//不存在
		if(index == -1){
			let obj = this.__format(res,{type:'chatlist'});
			//忽略本人发送
			if(res.from_id !== User.userinfo.id){
				obj.noreadnum = 1;
			}
			chalist.unshift(obj);
		}else{
			// 存在：将当前会话置顶,修改chatlist中当前会话的data和time显示
			chatlist[index].data = res.data;
			chatlist[index].type = res.type;
			chatlist[index].time = res.time;
			// 当前聊天对象不是该id，未读数+1（排除本人发送消息）
			if(res.from_id !== User.userinfo.id && this.CurrentToUser.userid !== chatlist[index].userid){
				chatlist[index].noreadnum++;
			}
			//置顶当前会话
			chatlist = this.__toFirst(chatlist,index);
		}
		//储存到本地存储
		uni.setStorage({
			key: 'chatlist'+User.userinfo.id,
			data: JSON.stringify(chatlist)
		})
	},
	//更新聊天内容信息  存储到chatdetail（我与某位用户的历史记录）
	__UpdateChatdetail(res,issend = false){
		let userid = issend ? this.CurrentToUser.userid : res.from_id;
		//旧数据（ chatdetail_[当前用户id]_[聊天对象id] ）
		let list = uni.getStorageSync('chatdetail_'+User.userinfo.id+'_'+userid);
		list = list ? JSON.parse(list) : [];
		//追加
		list.push(this.__format(res,{
			type: 'chatdetail',
			isme: issend,
			olddata: list
		}));\
		//储存
		uni.setStorage({
			key:'chatdetail_'+User.userinfo.id+'_'+userid,
			data: JSON.stringify(list)
		})
	},
	//初始化tabbarbadge
	initTabbarBadge(){
		//获取总未读数
		let noreadnum = uni.getStorageSync('noreadnum'+User.userinfo.id);
		this.__UpdateNoReadNum(noreadnum);
	}
	//格式化数据
	__format(data,option={}){
		switch (option.type){
			case 'chatlist':	// 新增会话用到
				let obj = {
					userid: data.from_id,
					username: data.from_username,
					userpic: data.from_userpic,
					time: data.time,
					data: data.data,
					noreadnum: 0
				}
				//本人发送的信息
				if(data.from_id == User.userinfo.id){
					obj.userid = this.CurrentToUser.userid;
					obj.username = this.CurrentToUser.username;
					obj.userpic = this.CurrentToUser.userpic;
				}
				return obj;
				break;
			case 'chatdetail':
				let oldlist = option.list;	//旧数据
				let chattime: new Date().getTime();	//获取当前时间
				let length = list.length;
				return {
					isme: option.isme,
					userpic: option.isme ? User.userinfo.userpic : data.from_userpic,
					type: data.type,
					data: data.data,
					time: chattime,
					gstime: Time.gettime.getChatTime(chattime,(length > 0) ? list[length-1].time : 0);	//格式化时间		作用 获取聊天时间（相差300s内的信息不会显示时间）
				};
				break;
			case 'send':
				return {
					to_id: this.CurrentToUser.userid,
					from_id: User.userinfo.id,
					from_username: User.userinfo.username,
					from_userpic:User.userinfo.userpic,
					type: data.type,
					data: data.data,
					time: new Date().getTime()
				}
				break;
		}
	},
	// 数组置顶
	__toFirst(arr,index){
		//当index为0，已为置顶不需操作
		if(index != 0){
			arr.unshift(arr.splice(index,1)[0]);
		}
		return arr;
	},
	//消息提示音震动
	__Notify(){
		uni.vibrateLong();
	}
	
}
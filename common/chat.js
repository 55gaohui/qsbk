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
	//更新聊天列表界面信息 更新chatlist（将当前会话置顶，修改chatlist中当前会话的data和time显示）
	__UpdateChatlist(){
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
	},
	//更新聊天内容信息  存储到chatdetail（我与某位用户的历史记录）
	__UpdateChatdetail(res){
	
	},
	//初始化tabbarbadge
	initTabbarBadge(){
		//获取总未读数
		let noreadnum = uni.getStorageSync('noreadnum'+User.userinfo.id);
		if(noreadnum > 0){
			return uni.setTabBarBadge({
				index: Config.TabbarIndex,
				text: noreadnum > 99 ? '99+' : noreadnum.toString();
			})
		}
		return uni.removeTabBarBadge({
			index: Config.TabbarIndex
		})
	}
	
}
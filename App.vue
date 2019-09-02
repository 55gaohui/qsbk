<script>
	export default {
		onLaunch: function() {
			// 网路监听（用户目前断网，切换wifi）
			this.lib.NetWork.On();
			// 更新检测
			
			// 初始化用户状态
			this.User.__init();
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	/*引入公共图标库*/
	@import './common/icon.css';
	/*引入 动画库*/
	@import './common/animate.css';
	/*引入flex公共样式库*/
	@import './common/common.css';
</style>

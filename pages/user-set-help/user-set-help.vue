<template>
	<view>
		<uni-collapse>
			<block v-for="(item, index) in list" :key="index">
				<uni-collapse-item :show-animation="true" :title="item.title">
					<view style="padding: 30upx;">
						{{item.content}}
					</view>
				</uni-collapse-item>
			</block>
		</uni-collapse>
		<view class="body">
			<button class="user-set-btn" type="primary" @tap="openFeedback">意见反馈</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from "../../components/uni-collapse/uni-collapse.vue"
	import uniCollapseItem from "../../components/uni-collapse-item/uni-collapse-item.vue"
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				list: [{
						title: '客服什么时候上线？',
						content: '123'
					},
					{
						title: '忘记账号/昵称/密码怎么办？',
						content: '111111111111'
					},
					{
						title: '怎么搜索/查找/关注/取关用户？',
						content: '2222222222'
					}
				]
			}
		},
		methods: {
			openFeedback(){
				uni.navigateTo({
					url: '../user-feedback/user-feedback'
				});
			}
		}
	}
</script>

<style>
	@import "../../common/form.css";
</style>

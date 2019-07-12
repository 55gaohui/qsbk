<template>
	<view class="body">
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>头像</view>
			<view class="u-f-ac" @tap="changeimg">
				<image :src="userpic" mode="aspectFill" lazy-load></image>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>昵称</view>
			<view class="u-f-ac">
				<input type="text" v-model="username" />
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>性别</view>
			<view class="u-f-ac" @tap="changeOne('sex')">
				<view>{{sex}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>生日</view>
			<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="u-f-ac">
					<view>{{birthday}}</view>
					<view class="icon iconfont icon-bianji1"></view>
				</view>
			</picker>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>职业</view>
			<view class="u-f-ac" @tap="changeOne('qg')">
				<view>{{qg}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>情感</view>
			<view class="u-f-ac" @tap="changeOne('job')">
				<view>{{job}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>家乡</view>
			<view class="u-f-ac" @tap="showMulLinkageThreePicker">
				<view>{{pickerText}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>

		<button class="user-set-btn" type="primary" @tap="submit">完成</button>
		
		<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	let sex = ['保密', '男', '女'];
	let job = ['保密', 'IT', '老师'];
	let qg = ['保密', '未婚', '已婚'];
	import mpvueCityPicker from "../../components/mpvue-citypicker/mpvueCityPicker.vue";
	export default {
		name: "user-set-userinfo",
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				userpic: "../../static/demo/userpic/11.jpg",
				username: "",
				sex: "保密",
				job: "保密",
				qg: "保密",
				birthday: "",
				cityPickerValueDefault: [0, 0, 1],
				pickerText: ""

			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			submit() {

			},
			// 修改家乡 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			// 修改生日
			bindDateChange: function(e) {
				this.birthday = e.target.value
			},
			// 修改头像
			changeimg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: res => {
						this.userpic = res.tempFilePaths;
					}
				})
			},
			// 修改性别 工作 情感
			changeOne(type) {
				let arr;
				switch (type) {
					case 'sex':
						arr = sex;
						break;
					case 'job':
						arr = job;
						break;
					case 'qg':
						arr = qg;
						break;
					default:
						break;
				}
				uni.showActionSheet({
					itemList: arr,
					success: res => {
						switch (type) {
							case 'sex':
								this.sex = arr[res.tapIndex];
								break;
							case 'job':
								this.job = arr[res.tapIndex];
								break;
							case 'qg':
								this.qg = arr[res.tapIndex];
								break;
							default:
								break;
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			onConfirm(e) {
				this.pickerText = e.label;
			}
		},
	}
</script>

<style scoped>
	@import "../../common/form.css";

	.user-set-userinfo-list {
		padding: 20upx;
		border-bottom: 1upx solid#F4F4F4;
	}

	.user-set-userinfo-list>view:first-child {
		font-size: 32upx;
		font-weight: bold;
		color: #9B9B9B;
	}

	.user-set-userinfo-list>view:last-child>image {
		width: 80upx;
		height: 80upx;
		border-radius: 100%;
	}

	.user-set-userinfo-list>view:last-child>input {
		text-align: right;
	}

	.user-set-userinfo-list view.iconfont {
		margin-left: 20upx;
		color: #9B9B9B;
	}
</style>

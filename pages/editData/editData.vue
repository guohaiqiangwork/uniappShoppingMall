<!--编辑资料 -->
<template>
	<view>
		<view class="conunt">
			<view class="head_view">
				<!-- <image src="../../static/image/my/headImge.png" mode=""></image> -->
				<avatar selWidth="200px" selHeight="400upx" @upload="myUpload" :avatarSrc="url" avatarStyle="width: 200upx; height: 200upx; border-radius: 100%;">
				</avatar>
				<text>更换头像</text>
			</view>

			<view class="body_view">
				<view class="body_view_1 border_bottom padding_bottom3">
					<text class="font_weight600 ">真实姓名</text>
					<text class="font_color66 margin_left5">{{infoData.nickName}}</text>
				</view>
				<view class="body_view_1" @click="editTelephon">
					<text class="font_weight600 ">我的手机</text>
					<text class="font_color66 margin_left5">{{infoData.mobile}}</text>
					<image src="../../static/image/my/return1.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			avatar
		},
		data() {
			return {
				url: "",
				infoData: '',
			}
		},
		onLoad() {
			// this.getUserFun();
		},
		mounted() {
			
		},
		onShow() {
			this.getMyData();
		},
		methods: {
			/* 获取个人信息 */
			getMyData: function() {
				var data = {
					mbId: uni.getStorageSync('userId'),
				}
				// 获取个人信息
				this.$http.get('/api/member/center/info', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res))
						this.infoData = res.data.data
						this.url = res.data.data.headImgurl;
					}
				});
			},
			/* 点击上传图片 */
			myUpload(rsp) {
				this.url = rsp.path;
				/* 调用后天接口 上传头像 */
				let id = uni.getStorageSync('userId');
				const token = uni.getStorageSync('token');
				uni.uploadFile({
					url: 'http://101.201.180.222:8080/api/member/updateAvatar',
					filePath: rsp.path,
					name: 'file',
					method: 'post',
					formData: {
						'file': rsp.path,
						'mbId': id
					},
					header: {
						'Authorization': "Bearer" + " " + token,
						'client': 'APP',
					},
					success: (uploadFileRes) => {
						console.log("11==" + JSON.stringify(uploadFileRes));
						if (JSON.parse(uploadFileRes.data).code == 200) {
							uni.showToast({
								title: '上传成功',
								icon: 'none',
								duration: 2000,
								position: 'center',
							});
						} else {
							uni.showToast({
								title: JSON.parse(uploadFileRes.data).message,
								icon: 'none',
								duration: 2000,
								position: 'center',
							});
							return
						}
					},
					fail: (err) => {
						return uni.showToast({
							title: '上传失败'
						});
					},
				});

			},

			/* 编辑手机号 */
			editTelephon() {
				console.log('99' + this.telePhone)
				uni.navigateTo({
					url: '../editTelephon/editTelephon?telePhone=' + this.infoData.mobile
				});
			},
			editDataPageFun(tele) {
				this.telePhone = tele;
			},
			onBackPress() {
				if (this.orderListType == '2') {
					const that = this;
					var pages = getCurrentPages();
					if (pages.length > 1) {
						var beforePage = pages[pages.length - 2];
						beforePage.$vm.setPageFun();
					}
				}
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F4F4F4;
	}

	.conunt {
		width: 100%;
		height: 550upx;
		background-color: #FFFFFF;

		.head_view {
			width: 100%;
			padding-top: 30upx;
			text-align: center;

			/* avatar{
				width: 190upx;
				height: 190upx;
				display: block;
				margin-left: 280upx;
				margin-bottom: 27upx;
			} */
			text {
				font-size: 34upx;

			}
		}

		/* 内容部分 */
		.body_view {
			width: 90%;
			margin: 32upx auto 0 auto;
			height: 229upx;
			border-top: #EEEEEE solid 1px;
			font-size: 30upx;

			.body_view_1 {
				margin: 30upx 0;

				image {
					width: 13upx;
					height: 23upx;
					float: right;
					margin-top: 15upx;
				}
			}
		}
	}
</style>

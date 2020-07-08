<template>
	<view>
		<!-- 实名认证前 -->
		<block v-if='cardFalg == 0'>
			<view class="eviden">
				<view class="tis font_color33 font_size28 font_weight600">请拍摄并上传您的身份证照片</view>
				<view style="height: 250upx;">
					<view class="sfz2">
						<image :src="cardImg1" mode=""></image>
						<view @click="zmFunc()" class="font_colorff font_size28">拍摄正面</view>
					</view>
					<view class="sfz1">
						<image :src="cardImg2" mode=""></image>
						<view @click="fmFunc()" class="font_colorff font_size28">拍摄背面</view>
					</view>
				</view>
			</view>

			<view style="background-color: #F4F4F4;width: 100%;height: 20upx;margin-top: 80upx;"></view>

			<!-- 提示部分 -->
			<view style="margin-left: 32upx;">
				<view class="font_color33 font_size28 font_weight600" style="margin-top: 63upx;">拍摄身份证要求:</view>
				<view class="font_color99 font_size26">大陆公民持有本人有效二代身份证</view>
				<view>
					<text class="font_color99 font_size26">拍摄时确保身份证</text>
					<text class="font_size26" style="color: #FFAD00;">边框完整、字体清晰、亮度</text>
					<image class="sfz3" src="../../static/image/my/sfz3.png" mode=""></image>
				</view>
			</view>

			<view @click="nextFunc()" class="next">下一步</view>
		</block>
		<!-- 填写信息 -->
		<block v-if='cardFalg == 1'>
			<view class="card_list">
				<view class="uni-flex font_size30 list_one padding_bottom3 padding_top3">
					<view class="width25 font_color33 font_weight600">
						姓名
					</view>
					<view class=" font_color66">
						{{name}}
					</view>
				</view>
				<view class="uni-flex font_size30 padding_top3 padding_bottom3">
					<view class="width25 font_color33 font_weight600">
						身份证号
					</view>
					<view class="  font_color66">
						{{idCard}}
					</view>
				</view>
			</view>
			<view class="next" @click="getSaveVerific">提交</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardImg1: '../../static/image/my/sfz2.png',
				cardImg2: '../../static/image/my/sfz1.png',
				cardFalg: 0,
				idCard: '', //身份证号
				name: '', //姓名
				time: '', //日期
				idAddress:''//地址
			}
		},
		onLoad() {
			
		},
		methods: {
			
			/* 正面 */
			zmFunc() {
				var _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						console.log(tempFilePaths)
						_this.cardImg1 = tempFilePaths[0];
						uni.showLoading({
							title: '上传中'
						});
						uni.uploadFile({
							url: 'http://xypay.expresslines.cn/mb/verificPositive',
							filePath: _this.cardImg1,
							name: 'file',
							method: 'post',
							formData: {
								'file': _this.cardImg1
							},
							header: {
								'Authorization': "Bearer" + " " + uni.getStorageSync('token'),
								'client': 'APP',
							},
							success: (uploadFileRes) => {
								console.log(JSON.parse(uploadFileRes.data))
								var res = JSON.parse(uploadFileRes.data);
								uni.hideLoading();
								if (res.code == 200) {
									_this.name = res.data.name;
									_this.idCard = res.data.idcard;
									_this.idAddress  = res.data.address;
									uni.showToast({
										title: '上传成功',
										icon: 'none',
										duration: 2000,
										position: 'top',
									});

								} else {
									uni.showToast({
										title: res.message,
										icon: 'none',
										duration: 2000,
										position: 'top',
									});
								}
							},
							fail: (err) => {
								return uni.showToast({
									title: '上传失败'
								});
							},
						});

					},
					error: function(e) {
						console.log(e);
					}
				});

			},

			/* 反面 */
			fmFunc() {
				var _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						console.log(tempFilePaths)
						_this.cardImg2 = tempFilePaths[0];
						uni.showLoading({
							title: '上传中'
						});
						uni.uploadFile({
							url: 'http://xypay.expresslines.cn/mb/verificNegative',
							filePath: _this.cardImg2,
							name: 'file',
							method: 'post',
							formData: {
								'file': _this.cardImg2
							},
							header: {
								'Authorization': "Bearer" + " " + uni.getStorageSync('token'),
								'client': 'APP',
							},
							success: (uploadFileRes) => {
								console.log(JSON.parse(uploadFileRes.data))
								var res = JSON.parse(uploadFileRes.data);
								uni.hideLoading();
								if (res.code == 200) {
									_this.time = true;
									uni.showToast({
										title: '上传成功',
										icon: 'none',
										duration: 2000,
										position: 'top',
									});

								} else {
									uni.showToast({
										title: res.message,
										icon: 'none',
										duration: 2000,
										position: 'top',
									});
								}
							},
							fail: (err) => {
								uni.showToast({
									title: '上传失败',
									icon: 'none',
									duration: 2000,
									position: 'top',
								});
							},
						});

					},
					error: function(e) {
						console.log(e);
					}
				});

			},
			/* 下一步 */
			nextFunc() {
				if(!this.name){
					uni.showToast({
						title: '请上传身份证',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					return;
				}else if(!this.time){
					uni.showToast({
						title: '请上传身份证',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					return;
				}
				this.cardFalg = 1;
				// uni.navigateTo({
				// 	url: '../evidenceAuthenticationAfter/evidenceAuthenticationAfter',
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
			},

			getSaveVerific() {
				var data = {
					id: uni.getStorageSync('userId'),
					idcard: this.idCard,
					name: this.name,
					address:this.idAddress
				}
				this.$http.post('/mb/saveVerific', data, true).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						uni.showToast({
							title: '认证成功',
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
					uni.switchTab({
						url: '/tabBar/my/my'
					});
					}else{
						uni.showToast({
							title: data.message,
							icon: 'none',
							duration: 2000,
							position: 'top',
						})
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style>
	.eviden {
		padding-top: 67upx;
	}

	.tis {
		padding-left: 60upx;
		padding-bottom: 32upx;
	}

	.sfz1 {
		float: left;
		margin-left: 32upx;
	}

	.sfz1 image {
		width: 320upx;
		height: 201upx;
	}

	.sfz1 view,
	.sfz2 view {
		background-color: #3C3D3E;
		width: 320upx;
		height: 71upx;
		border-radius: 0 0 20upx 20upx;
		position: relative;
		bottom: 35upx;
		text-align: center;
		line-height: 71upx;
	}

	.sfz2 {
		float: left;
		margin-left: 51upx;
	}

	.sfz2 image {
		width: 320upx;
		height: 201upx;
	}

	.sfz3 {
		width: 700upx;
		height: 175upx;
		margin-top: 54upx;
	}

	.next {
		width: 690upx;
		height: 90upx;
		background-color:#3C3D3E;
		border-radius: 10upx;
		text-align: center;
		line-height: 90upx;
		color: #FFFFFF;
		font-size: 30upx;
		position: fixed;
		bottom: 30upx;
		left: 30upx;
	}

	.card_list {
		background-color: #FFFFFF;
		width: 100%;
		padding-left: 3%;
		padding-right: 3%;
	}

	.list_one {
		border-bottom: 1px solid #EEEEEE;
	}

	page {
		background-color: #F4F4F4;
	}
</style>

<template>
	<view>
		<view class="login">
			<image :src="myQRImg" mode="" class="image_width"></image>
			<view class="bottom_btn_qr" @click="saveImg">
				保存至相册
			</view>
			<!-- <view class="login_moudel">
				<view class="img_moudel_qr">
					<view class="width20">
						<image src="../../static/image/good1.png" class="left_img" mode=""></image>
					</view>
					<view class="font_color33 margin_left2 width50">
						<view class="font_size34 font_weight600 ">
							{{myQRImg.name}}
						</view>
						<view class="font_size30 margin_top3">
							邀请码：{{myQRImg.number}}
						</view>
					</view>
					<view class="margin_left2">
						<image :src="myQRImg.qrUrl" style="width: 140upx;height: 140upx;" mode=""></image>
					</view>
				</view>
			</view>
		 -->
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				myQRImg: ''
			}
		},
		onLoad() {
			this.getMyQR(); //获取二维码
		},
		methods: {
			getMyQR() {
				// 获取邀请二维码
				this.$http.get('/mb/inviteFriends/' + uni.getStorageSync('userId')).then(res => {
					if (res.data.code == 200) {
						this.myQRImg = res.data.data
					} else {
						//有误
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
					}
				}).catch(err => {})

			},

			saveImg() {
				uni.downloadFile({
					url: this.myQRImg,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function(e) {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});

						}
					}
				})

			}


		}
	}
</script>

<style>
	.image_width {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.bottom_btn_qr {
		width: 310upx;
		height: 90upx;
		border-radius: 50upx;
		text-align: center;
		line-height: 90upx;
		color: #FFFFFF;
		font-size: 30upx;
		background-color: #000000;
		opacity: .5;
		margin-left: 30%;
		position: fixed;
		bottom: 6%;
	}
</style>

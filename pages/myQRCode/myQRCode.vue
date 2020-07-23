<template>
	<view>
		<view class="login">
			<swiper class="imageContainer"  @change="handleChange">
				<block v-for="(item,index) in myQRImg" :key="index" >
					<swiper-item>
						<image class="itemImg" :src="item" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
			<view class="bottom_btn_qr" @click="saveImg">
				保存至相册
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				myQRImg: '',
				currentIndex:0
			}
		},
		onLoad() {
			this.getMyQR(); //获取二维码
		},
		methods: {
			getMyQR() {
				// 获取邀请二维码
				var data = {
					mbId: uni.getStorageSync('userId')
				}
				this.$http.get('/api/member/myQrcode', data, true).then(res => {
					if (res.data.code == 200) {
						this.myQRImg = res.data.data;
					} else {
						//有误,true
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
					}
				}).catch(err => {})

			},
			// 轮播滑动操作
			handleChange:function(e) {
				this.currentIndex = e.detail.current;
			},
			saveImg:function() {
				uni.showLoading({
					title: '保存中'
				});
				var _this = this
				console.log('99')
				uni.downloadFile({
					url: _this.myQRImg[_this.currentIndex] ,
					success: (res) => {
						uni.hideLoading();
						console.log(JSON.stringify(res))
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

						}else{
							uni.showToast({
								title: "保存失败，请稍后重试",
								icon: "none"
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
		width: 94%;
		height: 88upx;
		border-radius: 20upx;
		text-align: center;
		line-height: 90upx;
		color: #FFFFFF;
		font-size: 30upx;
		background-color: #3C3D3E;
		margin-left: 3%;
		position: fixed;
		bottom: 6%;
	}

	// 轮播
	.imageContainer {
		width: 94%;
		margin-left: 3%;
		height: 1000upx;
		margin-top: 30upx;
	}

	.itemImg {
		border-radius: 30upx;
		width: 94%;
		margin-left: 3%;
		height: 1000upx;
	}
</style>

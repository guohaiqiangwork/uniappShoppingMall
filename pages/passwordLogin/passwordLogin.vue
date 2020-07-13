<template>
	<view>
		<view class="login">
			<image src="../../static/image/beij/logB.png" mode="" class="image_width"></image>
			<view class="login_moudel">
				<!-- 返回箭头 -->
				<view class="" @click="goToBack">
					<image src="../../static/image/icon/leftF.png" class="goBack" mode=""></image>
				</view>
				<!--登录模块 -->
				<view class="login_moudel_width font_colorff">
					<view class="font_weight600 font_size44 margin_top5">
						{{loginTitle}}
					</view>


					<!-- 密码登录 -->
					<view class="margin_top5 font_size36">
						手机号码
					</view>
					<view class="border_bottom padding_bottom3 margin_top5">
						<input type="number" maxlength="11" @input="keyPhone" placeholder="请输入手机号码" placeholder-style='color:#484848' />
					</view>
					<view class="margin_top5 font_size36">
						密码
					</view>
					<view class="border_bottom padding_bottom3 margin_top5">
						<input type="password" maxlength="11" @input="keyCode" placeholder="请输入密码" placeholder-style='color:#484848' />
					</view>
					<view class="font_size24 margin_top2" style="color: #FF3131;">
						{{msgErr}}
					</view>

					<view class="bottom_btn jb_view" @click="bingYCode">
						登录
					</view>
					<view class="display_space uni-flex font_size28 font_colorff text_right margin_top5 margin_right3">
						<view class="margin_left3" @click="goToPassword">
							忘记密码
						</view>
						<view class="margin_right3" @click="goCode">
							验证码登录
						</view>
					</view>



				</view>
				<view class="display_center uni-flex font_colorff" style="position: fixed;bottom: 4%;width: 100%;">
					登录即代表您已经同意<text @click="goUserConter('userAgreement')" style="color: #B99445;">用户协议</text>和 <text @click=" goUserConter('userPrivacy')"
					 style="color: #B99445;">隐私政策</text>
				</view>


			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginTitle: '登录',
				msgErr: '',

			}
		},
		methods: {
			// 手机号
			keyPhone: function(event) {
				this.userPhone = event.target.value
			},
			// 密码
			keyCode: function(e) {
				this.phoneCode = e.target.value
			},

			goCode: function() {
				uni.navigateTo({
					url: '../login/login'
				})
			},

			// 绑定邀请码
			bingYCode: function() {
				var loginData = {
					phone: this.userPhone,
					password: this.phoneCode
				};
				if (!(/^1[3456789]\d{9}$/.test(this.userPhone))) {
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				} else if (this.phoneCode.length < 6 || this.phoneCode.length > 15) {
					uni.showToast({
						title: '验证码请输入不少于6位',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				}
				this.$http.post('/api/common/mb/passLogin', loginData).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						uni.setStorageSync('token', res.data.data.token);
						uni.setStorageSync('userId', res.data.data.id);
						uni.switchTab({
							url: '../tabBar/home/home'
						});
					} else if (res.data.code == 300) {
						uni.navigateTo({
							url: '../bindingCode/bindingCode?phone=' + this.userPhone
						})
					}
				}).catch(err => {
					uni.showToast({
						title: err.data.message,
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					this.msgErr = '*' + err.data.message
				})

			},

			// 忘记密码
			goToPassword: function() {
				uni.navigateTo({
					url: '../noPassword/noPassword'
				})
			},

			// 去用户协议 去隐私协议
			goUserConter(page) {
				uni.navigateTo({
					url: '../' + page + '/' + page,
				});
			},
			goToBack() {
				uni.navigateBack()
			}

		}
	}
</script>

<style lang="less">
	.image_width {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.login_moudel {
		position: relative;
		width: 94%;
		margin-left: 3%;
		padding-top: 8%;
	}

	.goBack {
		width: 20upx;
		height: 36upx;
	}

	.login_moudel_width {
		width: 90%;
		margin-left: 5%;
	}

	.yzm_moudel {
		width: 184upx;
		height: 68upx;
		line-height: 68upx;
		font-size: 26upx;
		text-align: center;
		border-radius: 20upx;
		color: #FBECDF;

		background: linear-gradient(to right, #EDCB80, #A58747);
	}

	.bottom_btn {
		height: 102upx;
		text-align: center;
		line-height: 102upx;
		color: #FBECDF;
		margin-top: 84upx;
		font-size: 40upx;
		border-radius: 20upx;
	}

	.img_1 {
		width: 30upx;
		height: 30upx;
	}
</style>

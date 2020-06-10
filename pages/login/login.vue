<template>
	<view>
		<view class="login">
			<image src="../../static/image/beij/logB.png" mode="" class="image_width"></image>
			<view class="login_moudel">
			
				<!--登录模块 -->
				<view class="login_moudel_width font_colorff">
					<view class="font_weight600 font_size44 margin_top5">
						登录
					</view>
					<view class="margin_top5 font_size36">
						手机号码
					</view>
					<view class="border_bottom padding_bottom3 margin_top5">
						<input type="number" maxlength="11" @input="keyPhone" placeholder="请输入手机号码" placeholder-style='color:#484848' />
					</view>
					<view class="margin_top5 font_size36">
						验证码
					</view>
					<view class="border_bottom padding_bottom3 margin_top5 uni-flex">
						<input class="width70" type="number" maxlength="6" @input="keyCode" placeholder="请输入验证码" placeholder-style='color:#484848' />
						<view class="yzm_moudel" @click="yzm_function">
							{{countdown}}<text v-show="timestatus" class="forgetpwd2">秒重获</text>
						</view>
					</view>

					<view class="font_size24 margin_top2" style="color: #FF3131;">
						{{msgErr}}
					</view>

					<view class="bottom_btn jb_view" @click="goToLogin">
						登录
					</view>
					<view class="bottom_btn " style="border: 1px solid #EDCB80;margin-top: 30upx;color: #CAAA65;">
						注册
					</view>
				</view>
				<view class="display_center uni-flex font_colorff" style="position: fixed;bottom: 4%;width: 100%;">
					<view class="" @click="tabFalg" style="margin-right: 2%;margin-top: .3%;">
						<image src="../../static/image/icon/check.png" v-if="usefalg" class="img_1"></image>
						<image src="../../static/image/icon/check1.png" v-if="!usefalg" class="img_1"></image>
					</view>
					我已阅读并同意<text @click="goUserConter('userAgreement')" style="color: #B99445;">用户协议</text>和 <text @click=" goUserConter('userPrivacy')"
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
				datan: '登录',
				countdown: '获取验证码',
				disabled: false,
				timestatus: false,
				yzm_stuas: 0,
				yzm_code: '',
				timed: 59,
				msgErr: '*验证码储物',
				jsonData: {
					a: '1',
					b: '3',
					c: '4'
				},
				usefalg: true, // 是的阅读
				imgUrl: 'http://xypay.expresslines.cn/images/sysImage/logo.jpg '
			}
		},
		methods: {
			// 手机号
			keyPhone: function(event) {
				this.userPhone = event.target.value
			},
			// 验证码
			keyCode: function(e) {
				this.phoneCode = e.target.value
			},
			// 是的阅读
			tabFalg: function() {
				this.usefalg = !this.usefalg
			},

			// 获取验证码
			yzm_function: function() {
				var that = this;
				if (!(/^1[3456789]\d{9}$/.test(this.userPhone))) {
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				} else if (this.timestatus == true) {
					uni.showToast({
						title: '请勿重复点击',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				}
				that.disabled = true; //禁用点击
				var phoneData = {
					phone: that.userPhone
				}
				that.$http.post('/wx/send/messages', phoneData).then(res => {
					if (res.data.code == 200) {
						that.countdown = 60;
						that.timestatus = true;
						that.clear = setInterval(that.countDown, 1000);
						console.log(JSON.stringify(data))
					} else {
						that.disabled = false; //获取失败开启点击
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'top',
						});

					}
				}).catch(err => {
					that.disabled = false; //获取失败开启点击
				})
			},
			// 倒计时
			countDown() {
				var that = this;
				if (!that.countdown) {
					that.disabled = false;
					that.timestatus = false;
					that.countdown = '获取验证码';
					clearInterval(that.clear);
				} else {
					--that.countdown;
				}
			},
			// 去登录
			goToLogin: function() {

				uni.switchTab({
					url: '../tabBar/home/home'
				});
				return;
				var loginData = {
					phone: this.userPhone,
					phoneCode: this.phoneCode
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
				} else if (this.usefalg) {
					uni.showToast({
						title: '请勾选协议',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				}
				this.$http.post('/wx/send/login', loginData).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						uni.setStorageSync('token', res.data.data.token);
						uni.setStorageSync('userId', res.data.data.id);
						uni.switchTab({
							url: '/tabBar/home/home'
						});
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'top',
						});
					}
				}).catch(err => {})

			},
			// 去用户协议 去隐私协议
			goUserConter(page) {
				uni.navigateTo({
					url: '../' + page + '/' + page,
				});
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

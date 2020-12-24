<template>
	<view>
		<view class="login">
			<image src="../../static/image/beij/logB.png" mode="" class="image_width"></image>
			<view class="login_moudel">
				<!-- 返回箭头 -->
				<view class="" @click="goToBack"><image src="../../static/image/icon/leftF.png" class="goBack" mode=""></image></view>
				<!--登录模块 -->
				<view class="login_moudel_width font_colorff">
					<view class="font_weight700 font_size44 margin_top5">{{ loginTitle }}</view>
					<!-- 登录某块 -->
					<template v-if="loginFalg == 1">
						<view class="margin_top5 font_size36">手机号码</view>
						<view class="padding_bottom3 margin_top5" style="border-bottom: 1px solid #484848;">
							<input type="number" maxlength="11" @input="keyPhone" placeholder="请输入手机号码" placeholder-style="color:#484848" />
						</view>
						<view class="margin_top5 font_size36">验证码</view>
						<view class=" padding_bottom3 margin_top5 uni-flex" style="border-bottom: 1px solid #484848;">
							<input class="width70" type="number" maxlength="6" @input="keyCode" placeholder="请输入验证码" placeholder-style="color:#484848" />
							<view class="yzm_moudel" @click="yzm_function">
								{{ countdown }}
								<text v-show="timestatus" class="forgetpwd2">秒重获</text>
							</view>
						</view>

						<view class="font_size24 margin_top2" style="color: #FF3131;">{{ msgErr }}</view>

						<view class="bottom_btn jb_view" @click="bingYCode">登录</view>
						<view class=" font_size28 font_colorff text_right margin_top5 margin_right3" @click="goPassword">密码登录</view>
					</template>

					<view class="margin_top18" v-if="iosFalg == 'true'">
						<view class="uni-flex display_center">
							<view class="login_left"></view>

							<view class="font_sise28 font_colorff margin_left5">第三方账号登录</view>
							<view class="login_left margin_left5"></view>
						</view>
						<view class="text_center margin_top8" @click="goWxLogin"><image src="../../static/image/icon/loginW.png" class="img_log" mode=""></image></view>
					</view>
				</view>
				<view class="display_center text_center uni-flex font_colorff" style="position: fixed;bottom: 4%;width: 92%;">
					登录即代表您已经同意
					<text @click="goUserConter('userAgreement')" style="color: #B99445;">用户协议</text>
					和
					<text @click="goUserConter('userPrivacy')" style="color: #B99445;">隐私政策</text>
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
			loginFalg: 1,
			inviteCode: '', //邀请码
			iosFalg: '',
			datan: '登录',
			countdown: '获取验证码',
			disabled: false,
			timestatus: false,
			yzm_stuas: 0,
			yzm_code: '',
			timed: 59,
			msgErr: '',
			jsonData: {
				a: '1',
				b: '3',
				c: '4'
			},

			imgUrl: 'http://xypay.expresslines.cn/images/sysImage/logo.jpg '
		};
	},
	onLoad() {
		this.getIos();
	},
	methods: {
		// 手机号
		keyPhone: function(event) {
			this.userPhone = event.target.value;
		},
		// 验证码
		keyCode: function(e) {
			this.phoneCode = e.target.value;
		},
		// 获取验证码
		yzm_function: function() {
			var that = this;
			if (!/^1[3456789]\d{9}$/.test(this.userPhone)) {
				uni.showToast({
					title: '请输入正确的11位手机号码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			} else if (this.timestatus == true) {
				uni.showToast({
					title: '请勿重复点击',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			}
			that.disabled = true; //禁用点击
			var phoneData = {
				phone: that.userPhone
			};
			that.$http
				.get('/api/common/mb/sendCode', phoneData, false)
				.then(res => {
					if (res.data.code == 200) {
						that.countdown = 60;
						that.timestatus = true;
						that.clear = setInterval(that.countDown, 1000);
						console.log(JSON.stringify(data));
					} else {
						that.disabled = false; //获取失败开启点击
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'center'
						});
					}
				})
				.catch(err => {
					that.disabled = false; //获取失败开启点击
				});
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
		
		
		// 绑定邀请码
		bingYCode: function() {
			var loginData = {
				phone: this.userPhone,
				code: this.phoneCode
			};
			if (!/^1[3456789]\d{9}$/.test(this.userPhone)) {
				uni.showToast({
					title: '请输入正确的11位手机号码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			} else if (this.phoneCode.length < 6 || this.phoneCode.length > 15) {
				uni.showToast({
					title: '验证码请输入不少于6位',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			}
			this.$http
				.post('/api/common/mb/verifyCodeLogin', loginData)
				.then(res => {
					console.log('登录返回结果' + JSON.stringify(res));
					if (res.data.code == 200) {
						uni.setStorageSync('token', res.data.data.token);
						uni.setStorageSync('userId', res.data.data.mbId);
						uni.switchTab({
							url: '../tabBar/home/home'
						});
						// uni.navigateBack()
					} else if (res.data.code == 300) {
						uni.navigateTo({
							url: '../bindingCode/bindingCode?phone=' + this.userPhone
						});
					} else {
						this.msgErr = res.data.message;
					}
				})
				.catch(err => {
					uni.showToast({
						title: err.data.message,
						icon: 'none',
						duration: 1500,
						position: 'center'
					});
				});
		},
		// 密码登录
		goPassword: function() {
			uni.navigateTo({
				url: '../passwordLogin/passwordLogin'
			});
		},
		// 忘记密码
		goToPassword: function() {
			uni.navigateTo({
				url: '../noPassword/noPassword'
			});
		},
		// 去用户协议 去隐私协议
		goUserConter: function(page) {
			uni.navigateTo({
				url: '../' + page + '/' + page
			});
		},
		goToBack: function() {
			// uni.navigateBack()
			// if(uni.getStorageSync('userId')){
			// 	uni.navigateBack()
			// }else{
			uni.switchTab({
				url: '../tabBar/home/home'
			});
			// }
		},
		goWxLogin: function() {
			// uni.showToast({
			// 	title:'进来了'
			// })
			uni.showLoading({
				title: '加载中'
			});
			var self = this;
			uni.login({
				provider: 'weixin',
				success: res => {
					uni.hideLoading();
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							uni.showToast({
								title: '微信' + JSON.stringify(infoRes),
								icon: 'none',
								duration: 20000,
								position: 'center'
							});
							console.log(JSON.stringify(infoRes));
							let formdata = {
								nickName: infoRes.userInfo.nickName, //昵称
								avatarUrl: infoRes.userInfo.avatarUrl, //头像
								openId: infoRes.userInfo.openId //
							};
							var data = {
								openid: infoRes.userInfo.openId
							};
							self.$http.post('/api/common/mb/wx', data).then(res => {
								// console.log('微信登录返沪' + JSON.stringify(res))
								// uni.showToast({
								// 	title:JSON.stringify(res),
								// 	icon:'none',
								// 	duration:90000,
								// 	position:'top'
								// })
								if (res.data.code == 200) {
									uni.setStorageSync('token', res.data.data.token);
									uni.setStorageSync('userId', res.data.data.mbId);
									uni.switchTab({
										url: '../tabBar/home/home'
									});
								} else {
									uni.navigateTo({
										url: '../bindPhone/bindPhone?wxData=' + JSON.stringify(formdata)
									});
								}
							});
						}
					});
				},
				fail: err => {}
			});
		},

		getIos: function() {
			this.$http.get('/api/common/ios/switch').then(res => {
				console.log(JSON.stringify(res));
				uni.setStorageSync('iosFalgOne', res.data.data);
				this.iosFalg = res.data.data;
			});
		}
	}
};
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
	border-radius: 10upx;
	color: #fbecdf;

	background: linear-gradient(to right, #edcb80, #a58747);
}

.bottom_btn {
	height: 102upx;
	text-align: center;
	line-height: 102upx;
	color: #fbecdf;
	margin-top: 84upx;
	font-size: 40upx;
	border-radius: 20upx;
}

.img_1 {
	width: 30upx;
	height: 30upx;
}

.img_log {
	width: 98upx;
	height: 98upx;
	border-radius: 50%;
}

.login_left {
	border-top: 1px solid #484848;
	width: 175upx;
	margin-top: 4%;
}
</style>

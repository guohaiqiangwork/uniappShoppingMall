<template>
	<view>
		<view class="moudel_one">
			<view class="uni-flex border_bottom padding_bottomNo padding_bottomNo1">
				<view class="width20 font_size30">
					手机号码
				</view>
				
				<view class="margin_left3 font_size30" v-if="falgInput =='login' ">
					<input type="number" maxlength="11" @input="keyPhone" placeholder="请输入手机号码" placeholder-style='color:#cccccc' />
				</view>
				<view class="margin_left3 font_size30 " v-else>
					{{userPhone}}
				</view>
			</view>
			<view class="uni-flex border_bottom padding_bottomNo padding_bottomNo1">
				<view class="width20 font_size30">
					验证码
				</view>
				<view class="uni-flex width90">
					<view class="font_size28   " style="margin-left: 5.3%;width: 67%;">
						<input type="number" maxlength="6" @input="keyCode" placeholder="请输入验证码" placeholder-style='color:#cccccc' />
					</view>
					<view class="width33 text_center font_size30" style="border-left: 1px solid #CCCCCC;padding-left: 2%;" @click="yzm_function">
						{{countdown}}<text v-show="timestatus" class="forgetpwd2">秒重获</text>
					</view>
				</view>
			</view>
			<view class="uni-flex border_bottom padding_bottomNo padding_bottomNo1">
				<view class="width20 font_size30">
					新密码
				</view>
				<view class="margin_left3 font_size30 ">
					<input type="password" @input="keyPassword" placeholder="请输入密码" placeholder-style='color:#cccccc' />
				</view>
			</view>
			<view class="uni-flex  padding_bottomNo padding_bottomNo1">
				<view class="width20 font_size30">
					确认密码
				</view>
				<view class="margin_left3 font_size30 ">
					<input type="password" @input="keyPassword1" placeholder="请再次输入密码" placeholder-style='color:#cccccc' />
				</view>
			</view>
		</view>

		<view class="btn_bd" @click="funBindMobileAndIdCard">
			确认修改
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				countdown: '获取验证码',
				timestatus: false,
				password:'',
				password1:'',
				userPhone:''
			}
		},
		mounted() {
			if(uni.getStorageSync('userId')){
				this.getMyData()
			}
			
		},
		onLoad(option) {
			this.falgInput = option.urlFalg
		},
		methods: {
			// 获取手机号
			keyPhone: function(e) {
				console.log(e)
				this.userPhone = e.target.value
			},
			// 验证码
			keyCode: function(e) {
				this.phoneCode = e.target.value
			},
			keyPassword: function(e) {
				this.password = e.target.value
			},
			keyPassword1: function(e) {
				this.password1 = e.target.value
			},
			
			
			getMyData: function() {
				var data = {
					mbId: uni.getStorageSync('userId'),
				}
				// 获取个人信息
				this.$http.get('/api/member/center/info', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res))
						// this.infoData = res.data.data
						this.userPhone= res.data.data.mobile
					}
				});
			},


			// 获取验证码
			yzm_function: function() {
				var that = this;
				if (!(/^1[3456789]\d{9}$/.test(this.userPhone))) {
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon: 'none',
						duration: 1500,
						position: 'center',
					});
					return false;
				} else if (this.timestatus == true) {
					uni.showToast({
						title: '请勿重复点击',
						icon: 'none',
						duration: 1500,
						position: 'center',
					});
					return false;
				}
				that.disabled = true; //禁用点击
				var phoneData = {
					phone: that.userPhone
				}
				that.$http.get('/api/common/mb/sendCode', phoneData, false).then(res => {
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
							position: 'center',
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


			funBindMobileAndIdCard: function() {
				if (!this.phoneCode || this.phoneCode.length < 6 ) {
					uni.showToast({
						title: '请检查验证码',
						icon: 'none',
						duration: 2000,
						position: 'center',
					});
					return
				} else if (!this.userPhone) {
					uni.showToast({
						title: '请填写手机号',
						icon: 'none',
						duration: 2000,
						position: 'center',
					});
					return
				}else if (!this.password || !this.password1) {
					uni.showToast({
						title: '请检查密码',
						icon: 'none',
						duration: 2000,
						position: 'center',
					});
					return
				}else if (this.password != this.password1) {
					uni.showToast({
						title: '密码不一致',
						icon: 'none',
						duration: 2000,
						position: 'center',
					});
					return
				}
				var data = {
					code: this.phoneCode,
					password: this.password,
					phone: this.userPhone
				}
				this.$http.post('/api/common/mb/changePwd', data).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '修改成功',
							icon: 'none',
							duration: 2000,
							position: 'center',
						});
						uni.removeStorageSync("userId");
						uni.removeStorageSync("token");
						uni.reLaunch({
							url: '../passwordLogin/passwordLogin'
						})
					}else{
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'center',
						});
					}
				});
			}

		}
	}
</script>

<style lang="less">
	page{
		background-color: #FAFAFA;
	}
	.padding_bottomNo{
		padding-bottom: 4%;
	}
	.padding_bottomNo1{
		padding-top: 4%;
	}
	.moudel_one {
		background-color: #FFFFFF;
		padding: 30upx 30upx 0 30upx;
		background: #ffffff;
		// box-shadow: 0upx 2upx 14upx 0upx #dde2ef;
	}

	.one_img {
		width: 28upx;
		height: 38upx;
	}

	.two_img {
		width: 32upx;
		height: 24upx;
	}

	.three_img {
		width: 30upx;
		height: 30upx;
	}

	.btn_bd {
		height: 90upx;
		background: #3C3D3E;
		border-radius: 10upx;
		text-align: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 30upx;
		line-height: 90upx;
		position: absolute;
		bottom: 5%;
		width: 94%;
		margin-left: 3%;
	}
</style>

<template>
	<view>
		<view class="register_moudel">
			<!-- <view class="text_center">
				<image src="../../static/image/heard.png" class="heard_img" mode=""></image>
			</view> -->

			<view class="uni-flex border_bottom padding_bottom3 padding_top3">
				<view class="width20 font_size32">
					手机号
				</view>
				<view class="font_size28 margin_top1">
					<input type="number" maxlength="11" @input="keyPhone" placeholder="请输入手机号码" placeholder-style='color:#484848' />

				</view>
			</view>
			<view class="uni-flex border_bottom padding_bottom3 padding_top3">
				<view class="width20 font_size32">
					验证码
				</view>
				<view class="uni-flex">
					<view class="font_size28 width70 margin_top1">
						<input class="width70" type="number" maxlength="6" @input="keyCode" placeholder="请输入验证码" placeholder-style='color:#484848' />
					</view>
					<view class="yzm_moudel" @click="yzm_function">
						{{countdown}}<text v-show="timestatus" class="forgetpwd2">秒重获</text>
					</view>
				</view>
			</view>

			<view class="uni-flex border_bottom padding_bottom3 padding_top3">
				<view class="width20 font_size32">
					用户名
				</view>
				<view class="font_size28 margin_top1">
					<input type="text" value="" placeholder="请填写用户名" />
				</view>
			</view>

			<view class="bottom_btn jb_view" @click="goRegister">
				注册
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countdown: '获取验证码',
				timestatus: false,
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


			// 注册
			goRegister() {
				uni.switchTab({
					url: '../tabBar/home/home'
				});
			}
		}

	}
</script>


<style>
	page {
		background-color: #666666;
	}

	.register_moudel {
		width: 94%;
		margin-left: 3%;
		background-color: #FFFFFF;
		padding: 30upx;
		border-radius: 30upx;
		margin-top: 30%;
	}

	.heard_img {
		width: 236upx;
		height: 236upx;
		border-radius: 50%;
	}

	.bottom_btn {
		height: 102upx;
		text-align: center;
		line-height: 102upx;
		color: #FBECDF;
		margin-top: 50upx;
		font-size: 40upx;
		border-radius: 20upx;
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
</style>

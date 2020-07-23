<template>
	<view>
		<view class="login">
			<image src="../../static/image/beij/logB.png" mode="" class="image_width"></image>
			<view class="login_moudel">
				<!-- 返回箭头 -->
				<view class="" @click="goToBack">
					<image src="../../static/image/icon/leftF.png" class="goBack" mode=""></image>
				</view>

				<view class="font_weight600 font_size44 margin_top5 font_colorff">
					请输入邀请码
				</view>
				<!--登录模块 -->
				<view class="login_moudel_width font_colorff">
					<!-- 绑定用户 -->
					<view class=" font_size36" style="margin-top: 260upx;">
						邀请码
					</view>
					<view class="border_bottom padding_bottom3 margin_top5">
						<input type="text" maxlength="8" @input="keyInviteCode" placeholder="请输入对方邀请码" placeholder-style='color:#484848' />
					</view>
					<view class="bottom_btn jb_view" v-if="wxData" @click="bingPhoneLogin">
						确认
					</view>
					<view class="bottom_btn jb_view" v-else @click="goToLogin">
						确认
					</view>
					
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPhone: '', //手机号
				inviteCode: '', //邀请码
				wxData:''
			}
		},
		onLoad(option) {
			// console.log(option.phone)
			this.userPhone = option.phone;
			// console.log(JSON.parse(option.wxData))
			this.wxData = JSON.parse(option.wxData)
		},
		methods: {
			// 获取邀请码
			keyInviteCode: function(e) {
				this.inviteCode = e.target.value
			},
			//去绑定
			goToLogin: function() {
				var loginData = {
					phone: this.userPhone,
					inviteCode: this.inviteCode
				};
				if (!(/^1[3456789]\d{9}$/.test(this.userPhone))) {
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				} else if (this.inviteCode.length < 8) {
					uni.showToast({
						title: '邀请码请输入不少于8位',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				}
				this.$http.post('/api/common/mb/bindUserRelat', loginData).then(res => {
					// console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						uni.setStorageSync('token', res.data.data.token);
						uni.setStorageSync('userId', res.data.data.mbId);
						uni.switchTab({
							url: '../tabBar/home/home'
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
			
			
			
			
			// 绑定收手机号
			bingPhoneLogin:function(){
				var loginData = {
					headImgurl:this.wxData.avatarUrl,
					inviteCode:this.inviteCode,
					mobile:this.userPhone,
					nickName:this.wxData.nickName,
					openid:this.wxData.openId
				};
				
				if (!(/^1[3456789]\d{9}$/.test(this.userPhone))) {
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				} 
				this.$http.post('/api/common/mb/bandWxMobile', loginData).then(res => {
					// console.log( '绑定手机号返回'+ JSON.stringify(res))
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
						})
					}else{
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
					}
				}).catch(err => {
					// console.log('7966')
					// uni.showToast({
					// 	title: res.data.message,
					// 	icon: 'none',
					// 	duration: 1500,
					// 	position: 'top',
					// });
					// this.msgErr = err.data.message
				})
				
			},
			
			goToBack: function() {
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

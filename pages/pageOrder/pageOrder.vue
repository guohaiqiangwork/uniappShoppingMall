<template>
	<view>
		<view class="page_width">
			<view class="margin_top5">
				<view class="top_moudel_pt">
					剩余时间 15:00
					{{remainingd}}
				</view>
				<view class="top_moudel_pay">
					<view class="font_size30 padding_top3">
						需支付
					</view>
					<view class="font_size50">
						4,803.00
					</view>
				</view>
			</view>

			<view class="pay_list">
				<view class="font_size30 font_colorff padding_bottom2" style="border-bottom: 1px  dashed #FFFFFF;">
					选择支付方式
				</view>
				<view @click="switchPay(item.id)" class="uni-flex display_space margin_top3 padding_bottom3" v-for="(item,index) in payList"
				 :key="index">
					<view class="uni-flex width50">
						<view class="">
							<image :src="item.url" class="left_img" mode=""></image>
						</view>
						<view class="font_size30 font_colorff margin_left5">
							{{item.name}}
						</view>
					</view>
					<view class="margin_top1">
						<image src="../../static/image/icon/pay1.png" class="right_img" v-if="payFalg == item.id" mode=""></image>
						<image src="../../static/image/icon/pay.png" class="right_img" v-else mode=""></image>
					</view>
				</view>



			</view>

			<view class="pay_btn" @click="goPayResult">

				确认付款
			</view>
		</view>

		<!-- 余额支付 -->
		<template v-if="payFalgY">
			<view class="moudel_content">
				<view :class="setFalg ? 'content_block' : 'content_block_pay'">
					<view class="uni-flex uni-row margin_left3 margin_top3">
						<view class="width30" @click="closeMoudel">
							<image src="../../static/image/icon/close.png" mode="" class="moudel_img"></image>
						</view>
						<view class="font_color33 font_size34 font_weight600 margin_left3" v-if="setFalg">
							设置支付密码
						</view>
						<view class="font_color33 font_size34 font_weight600" v-if="!setFalg">
							请输入支付密码
						</view>
					</view>
					<view class="font_color33 font_size30 text_center" v-if="setFalg">
						支付密码为6位数字
					</view>
					<view class="font_color33 font_size30 text_center" v-if="setFalg">
						支付密码与提现密码一致
					</view>
					<view class="font_color33 font_size30 text_center" v-if="!setFalg">
						需支付
					</view>
					<view class="font_color33 font_size60 text_center" v-if="!setFalg">
						￥{{money}}
					</view>
					<view class="margin_top5">
						<validcode :maxlength="6" :isPwd="true" @finish="getPwd" ref="pwd"></validcode>
					</view>

					<view class="moudel_btn" v-if="setFalg" @click="getSetPassword">
						确认
					</view>
				</view>
			</view>
		</template>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				payList: [{
						name: '余额支付',
						url: '../../static/image/icon/ye.png',
						id: 'ye'
					},
					{
						name: '微信支付',
						url: '../../static/image/icon/wx.png',
						id: 'wx'
					},
					{
						name: '支付宝支付',
						url: '../../static/image/icon/zfb.png',
						id: 'zfb'
					}
				],
				payFalg: 'wx',
				payFalgY: false, //余额支付弹窗
				setFalg: false, //设置密码
				money: '99', //支付金额
				remaining: '', //显示剩余时间
				remainingd: '' //数据返回时间秒

			}
		},
		mounted() {


		},
		methods: {
			switchPay(id) {
				this.payFalg = id
			},
			// 确认付款
			goPayResult() {
				// uni.navigateTo({
				// 	url: '../payResult/payResult'
				// })
				this.payFalg == 'ye' ? this.payFalgY = true : this.payFalg == 'wx' ? this.Wxpay() : this.zfbPay()
			},
			// 微信支付
			Wxpay() {
				console.log('wx')
			},
			// 支付宝
			zfbPay() {
				console.log('zfb')
			},
			// 设置支付密码
			getSetPassword() {
				var data = {
					password: this.passwordSix
				}
				this.$http.get('/account/setPassword/' + uni.getStorageSync('userId'), data).then(res => {
					if (res.data.code == 200) {
						this.setFalg = false;
						this.$refs.pwd.clear(); //清空密码
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
			// 获取密码
			getPwd(val) {
				if (this.setFalg) {
					this.passwordSix = val
				} else {
					var data = {
						memberId: uni.getStorageSync('userId'),
						password: val
					};
					this.$http.post('/account/passwordCheck', data).then(res => {
						if (res.data.code == 200) {
							this.payFalg = false;
							this.getNewOrder()
						} else {
							this.$refs.pwd.clear(); //清空密码
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500,
								position: 'top',
							});
						}
					}).catch(err => {})

				}

			},
			// 关闭设置密码输入框
			closeMoudel() {
				console.log('0')
				this.payFalgY = false
			},

			//倒计时计时器
			jishiqi: function() {
				var dj = '900000';
				if (dj <= 0) {
					clearInterval(interval);
					this.remaining = "已过期";
				} else {
					var ddf = this.djs(dj); //格式化过后的时间
					this.remaining = ddf;
					//当前时间减去时间
					dj = dj - 1;
					this.remainingd = dj;
				}

			},
			//得到的秒换算成时分秒
			djs: function(ms) {
				var h = parseInt(ms / (60 * 60));
				var m = parseInt((ms % (60 * 60)) / 60);
				var s = (ms % (60 * 60)) % 60;
				return h + ":" + m + ":" + s;
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #333333;
	}

	.top_moudel_pay {
		height: 225upx;
		background: #4b4b4b;
		border-bottom-left-radius: 20upx;
		border-bottom-right-radius: 20upx;
		color: #FFFFFF;
		text-align: center;
	}

	.top_moudel_pt {
		height: 70upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 22upx;
		background: linear-gradient(#a58747, #edcb80);
		border-radius: 20upx 20upx 0upx 0upx;
		line-height: 70upx;
	}

	.pay_list {
		height: 416upx;
		background: #4b4b4b;
		border-radius: 20upx;
		margin-top: 30upx;
		padding: 30upx;
	}

	.left_img {
		width: 42upx;
		height: 42upx;
	}

	.right_img {
		width: 30upx;
		height: 30upx;
	}

	.pay_btn {
		height: 98upx;
		background: linear-gradient(#a58747, #edcb80);
		border-radius: 10upx;
		line-height: 98upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30upx;
		position: absolute;
		bottom: 5%;
		width: 94%;
	}


	// 密码框
	.moudel_content {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: $uni-bg-color-mask;
		z-index: 99;
		top: 0;
		left: 0;
	}

	// 设置密码
	.content_block {
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: absolute;
		top: 18%;
	}

	// 支付
	.content_block_pay {
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: fixed;
		top: 18%;
		height: 438upx;
	}

	.moudel_img {
		width: 30upx;
		height: 30upx;
		margin-top: 8%;
		margin-left: 3%;
	}

	.moudel_btn {
		width: 222upx;
		height: 78upx;
		background: #3c3d3e;
		border-radius: 10px;
		color: #FFFFFF;
		text-align: center;
		font-size: 30upx;
		line-height: 80upx;
		border-radius: 10upx;
		font-weight: 700;
		margin-top: 5%;
		margin-left: 35%;
		margin-bottom: 3%;
		align-items: center;
	}

	// end
</style>

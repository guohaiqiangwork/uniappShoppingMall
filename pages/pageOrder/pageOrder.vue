<template>
	<view>
		<view class="page_width">
			<view class="margin_top5">
				<view class="top_moudel_pt">
					剩余时间 {{timeDom}}

				</view>
				<view class="top_moudel_pay">
					<view class="font_size30 padding_top3">
						需支付
					</view>
					<view class="font_size50 font_weight600">
						¥{{payData.payment}}
					</view>
				</view>
			</view>

			<view class="pay_list">
				<view class="font_size30 font_colorff padding_bottom2 " style="border-bottom: 1px  dashed #CCCCCC;">
					选择支付方式
				</view>
				<view @click="switchPay(item.id)" style="margin-top: 30upx;"  class="uni-flex display_space  padding_bottom3" v-for="(item,index) in payList"
				 :key="index">
					<view class="uni-flex  width50">
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
					<view class="font_color33 font_size60 font_weight600 text_center" v-if="!setFalg">
						￥{{payData.payment}}
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
				payFalg: '',
				payFalgY: false, //余额支付弹窗
				setFalg: false, //设置密码
				remaining: '', //显示剩余时间
				payData: '', //支付数据
				timeDom: '', //支付时间
				orderId: ''

			}
		},
		onLoad(option) {
			console.log(JSON.parse(option.payData))
			this.payData = JSON.parse(option.payData)
			console.log(new Date())
			console.log(new Date(option.payData.closeTime))
			this.countTime(new Date(this.payData.closeTime.replace(/-/g, '/')).getTime());
			// #ifdef APP-PLUS
			uni.getProvider({
				service: "payment",
				success: (e) => {
					console.log("payment success:" + JSON.stringify(e));
					let providerList = [];
					e.provider.map((value) => {
						switch (value) {
							case 'alipay':
								providerList.push({
									name: '支付宝',
									id: value,
									loading: false
								});
								break;
							case 'wxpay':
								providerList.push({
									name: '微信',
									id: value,
									loading: false
								});
								break;
							default:
								break;
						}
					})
					this.providerList = providerList;
					console.log(this.providerList)
					// 初始化
					this.Payname = this.providerList[0].name;
				},
				fail: (e) => {
					console.log("获取支付通道失败：", e);
				}
			});
			// #endif

		},
		mounted() {




		},
		onBackPress() {
			console.log('999');
			uni.navigateTo({
				url: '../myOrder/myOrder?orderType=1'
			});
			return true;
		},
		methods: {
			// 倒计时
			countTime: function(value) {
				var _this = this
				//获取当前时间
				var date = new Date();
				var now = date.getTime();
				//alert("now=="+now);
				//移动端必须这样写，因为ios不支持日期中间是-链接，会报错
				var endDate = new Date(value);
				var end = endDate.getTime();
				//时间差
				var differTime = end - now;
				var h, m, s;
				if (differTime >= 0) {
					h = Math.floor(differTime / 1000 / 60 / 60);
					m = Math.floor(differTime / 1000 / 60 % 60);
					s = Math.floor(differTime / 1000 % 60);
					h = h < 10 ? ("0" + h) : h;
					m = m < 10 ? ("0" + m) : m;
					s = s < 10 ? ("0" + s) : s;
					if (h < 1) {
						if (m > 15) {
							_this.timeDom = "00:00";
							// /console.log(_this.timeDom)
						} else {
							_this.timeDom = m + ":" + s;
							// console.log("剩余时间 " + _this.timeDom)
							//递归调用函数所以是延时器不是定时器
							setTimeout(function() {
								_this.countTime(value);
							}, 1000);
						}
					}

				} else {
					_this.timeDom = "00:00";
					// console.log("剩余时间 " + _this.timeDom)
				}
			},

			switchPay(id) {
				this.payFalg = id
			},
			// 确认付款
			goPayResult() {
				this.payFalg == 'ye' ? this.payFalgY = true : this.payFalg == 'wx' ? this.Wxpay() : this.zfbPay();
				if (this.payFalg == 'ye') {
					var data = {
						mbId: uni.getStorageSync('userId')
					}
					this.$http.get('/api/account/isSetPassword', data, true).then(res => {
						if (res.data.code == 200) {
							if (res.data.data) {
								this.setFalg = false;
							} else {
								// 设置支付密码
								this.setFalg = true;
							}

						}
					}).catch(err => {})
				}
			},
			// 微信支付
			Wxpay() {
				console.log(this.payFalg)
				var data = {
					orderId: this.payData.orderId || '',
					orderNo: this.payData.orderNo || ''
				}
				this.$http.post('/api/wx/unifiedOrder', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res))
						this.pay("wxpay", res.data.data)
					}
				})

			},
			// 支付宝
			zfbPay() {

				var data = {
					orderId: this.payData.orderId || '',
					orderNo: this.payData.orderNo || ''
				}
				this.$http.post('/api/ali/orderinfo', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res))
						this.pay("alipay", res.data.data)
					}
				})
			},
			pay: function(type, pay) {
				uni.requestPayment({
					provider: type,
					orderInfo: pay, //微信、支付宝订单数据
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},

			// 设置支付密码
			getSetPassword: function() {
				var data = {
					password: this.passwordSix,
					mbId: uni.getStorageSync('userId')
				}
				this.$http.post('/api/account/setPassword', data, true).then(res => {
					if (res.data.code == 200) {
						this.setFalg = false;
						this.$refs.pwd.clear(); //清空密码
					} else {
						//有误
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'center',
						});
					}
				}).catch(err => {})

			},
			// 获取密码
			getPwd: function(val) {
				if (this.setFalg) {
					this.passwordSix = val
				} else {
					var data = {
						mbId: uni.getStorageSync('userId'),
						password: val,
						orderId: this.orderId,
						orderNo: this.payData.orderNo
					};
					this.$http.post('/api/balance/pay', data, true).then(res => {
						console.log('89')
						if (res.data.code == 200) {
							this.payFalgY = false;
							uni.navigateTo({
								url:'../payResult/payResult?payFalg=true' 
							})
						} else {
							this.$refs.pwd.clear(); //清空密码
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500,
								position: 'center',
							});
						}
					}).catch(err => {})

				}

			},
			// 关闭设置密码输入框
			closeMoudel:function() {
				console.log('0')
				this.payFalgY = false
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
		background: linear-gradient(to right,  #edcb80,#a58747);
		border-radius: 20upx 20upx 0upx 0upx;
		line-height: 70upx;
	}

	.pay_list {
		// height: 416upx;
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
		background: linear-gradient(to right, #edcb80,#a58747);
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

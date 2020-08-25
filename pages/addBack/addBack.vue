<!-- 编辑手机号 -->
<template>
	<view>
		<view class="content">
			<view class="content_item">
				<text class=" font_size30">持卡人</text>
				<input @input="keyName" placeholder="请输入持卡人姓名" style="width: 520upx;float: right;margin-top: 32upx;font-size: 30upx;" type="text" value="" />
			</view>
			<view class="content_item">
				<text class=" font_size30">卡号</text>
				<input @input="keyNumber" placeholder="请输入卡号" style="width: 520upx;float: right;margin-top: 32upx;font-size: 30upx;" type="text" value="" />
			</view>
			<view class="content_item">
				<text class="font_size30">银行</text>
				<text class="font_color66 font_size30 text_left" style="margin-left: 100upx;">{{ backName }}</text>
			</view>
			<view class="content_item" style="border-bottom: none;">
				<text class=" font_size30">卡类型</text>
				<text class="font_color66 font_size30 text_left" style="margin-left: 84upx;">{{ backType }}</text>
			</view>

			<view class="" style="height: 20upx;background-color: #F4F4F4;"></view>
			<view class="content_item">
				<text class=" font_size30">手机号</text>
				<input
					@input="keyPhone"
					placeholder="请输入银行预留手机号"
					maxlength="11"
					style="width: 520upx;float: right;margin-top: 32upx;font-size: 30upx;"
					type="text"
					value=""
				/>
			</view>
			<view class="content_item">
				<text class=" font_size30">验证码</text>
				<view style="display: flex;align-items: center; width: 520upx;height: 110upx;float: right;">
					<input @input="keyCode" type="text" placeholder="请输入验证码" maxlength="6" style="font-size: 30upx;" />
					<view style="border-left: #CCCCCC solid 1px;width: 60%;;text-align: center;">
						<text @click="getYzm">{{ yzm }}</text>
					</view>
				</view>
			</view>
		</view>

		<view @click="submitButtFun" class="submitBut">完成</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tele: '',
			yzm: '获取验证码',
			yzm_stuas: 0,
			timed: 59,
			newTele: '',
			yzmCode: '',

			backName: '', //银行名称
			backType: '', //卡类型
			goHome: '' //返回页面
		};
	},
	onLoad(e) {
		// console.log(e.urlFalg)
		this.goHome = e.urlFalg;
		// this.tele = e.telePhone;
		// var bankType = this.$bankType('6215590603009119061')
		// console.log(bankType)
		// this.backName = bankType.bankName;
		// this.backType = bankType.cardTypeName
	},
	methods: {
		keyPhone: function(e) {
			this.phone = e.detail.value;
		},
		keyCode: function(e) {
			this.code = e.detail.value;
		},
		keyNumber: function(e) {
			this.number = e.detail.value;
			var bankType = this.$bankType(this.number);
			console.log(bankType);
			this.backName = bankType.bankName;
			this.backType = bankType.cardTypeName;
			this.bankCode = bankType.bankCode;
		},
		keyName: function(e) {
			this.name = e.detail.value;
		},

		/* 确认 */
		submitButtFun: function() {
			if (!this.name) {
				uni.showToast({
					title: '请检查姓名',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			} else if (!this.number) {
				uni.showToast({
					title: '请检查银行卡号',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			}else if (!this.backName) {
				uni.showToast({
					title: '请检查银行卡号',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			} else if (!this.backType) {
				uni.showToast({
					title: '请检查银行卡号',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			}  else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
				uni.showToast({
					title: '请输入正确的11位手机号码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			} else if (!this.code) {
				uni.showToast({
					title: '请输入验证码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			}

			var data = {
				bankCard: this.number,
				bankName: this.backName,
				code: this.code,
				mbId: uni.getStorageSync('userId'),
				name: this.name,
				reservedMobile: this.phone,
				bankType: this.backType,
				bankCode: this.bankCode
			};
			this.$http.post('/api/bank/save', data, true).then(res => {
				if (res.data.code == 200) {
					uni.navigateBack();
				}
			});
			console.log(data);
			// uni.navigateBack();
		},
		/* 获取验证码 */
		getYzm: function() {
			var that = this;
			console.log('33');
			var phoneData = {
				phone: this.phone
			};
			// this.yzm ='重新获取(60s)'
			if (that.yzm_stuas == 1) {
				uni.showToast({
					title: '请勿重复点击',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
			} else {
				this.$http
					.get('/api/common/mb/sendCode', phoneData)
					.then(res => {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'center'
						});
						if (res.data.code == 200) {
							that.yzm_stuas = 1;
							var clear = setInterval(function() {
								that.yzm = '(' + that.timed + ')';
								// console.log(that.yzm);
								that.timed = that.timed - 1;
								// console.log(that.timed);
								if (that.timed == 0) {
									that.yzm = '重新获取';
									clearInterval(clear);
									that.timed = 59;
									that.yzm_stuas = 0;
								}
							}, 1000);
							//that.ref=res.data.data.userBankCard.ref;
							that.msgID = res.data.data.messageid;
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500,
								position: 'center'
							});
						}
					})
					.catch(err => {});
			}
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f4f4f4;
}

.content {
	background-color: #ffffff;
	width: 100%;

	// height: 328upx;
	.content_item {
		width: 90%;
		height: 110upx;
		margin-left: 30upx;
		border-bottom: #eeeeee solid 1px;
		line-height: 110upx;
	}
}

.submitBut {
	width: 690upx;
	height: 90upx;
	background-color: #3c3d3e;
	border-radius: 10upx;
	color: #ffffff;
	font-size: 30upx;
	text-align: center;
	line-height: 90upx;
	margin-top: 45upx;
	margin-left: 30upx;
	position: fixed;
	bottom: 30upx;
}
</style>

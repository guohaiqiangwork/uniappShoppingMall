<template>
	<view>
		<view class="page_width">
			<view class="top_money">
				<view class="uni-flex border_bottom padding_bottom3">
					<view class="width25">
						到账银行卡
					</view>
					<view class="uni-flex width65">
						<view class="margin_top1">
							<image src="../../static/image/bank/gsy.png" mode="" class="img"></image>
						</view>
						<view class="font_size30 margin_left3">
							<view class="">
								工商银行 (3202)
							</view>
							<view class="font_size26 font_color99">
								2小时内到账
							</view>
						</view>
					</view>
					<view class="width10">
						<image src="../../static/image/icon/rightb.png" mode="" class="right_i"></image>
					</view>
				</view>
				<view class="font_size30 margin_top8">
					提现金额
				</view>

				<view class="border_bottom  margin_top5 font_size50 uni-flex">
					¥
					<input type="number" class="margin_left3 margin_top3" maxlength="11" @input="keyMoney" placeholder="请输入金额"
					 placeholder-style='color:#484848' />
				</view>

				<view class="uni-flex font_size26 margin_top3">
					<view class=" font_color99">
						余额￥80,000.00
					</view>
					<view class="margin_left3">
						全部提现
					</view>
				</view>


				<view class="w_btn" @click="goW">
					提现
				</view>

			</view>
		</view>

		<!-- 银行卡列表 -->
		<template v-if="backFalg">
			<view class="moudel_content">
				<view class="moudel_content_w">
					<view class="uni-flex">
						<view class="width33" @click="close_m">
							<image src="../../static/image/icon/close.png" class="img_left" mode=""></image>
						</view>
						<view class="text_center font_size32">
							选择到账银行卡
						</view>
					</view>
					<scroll-view scroll-y="true">
						<view class="uni-flex border_bottom padding_bottom3 padding_top2" v-for="(item,index) in [1,2,3]" :key="index">
							<view class="width20 text_center">
								<image src="../../static/image/bank/gsy.png" class="listimg" mode=""></image>
							</view>
							<view class="font_size32 width50">
								中国工商银行(3552)
							</view>
							<view class="width20 text_right">
								<image src="../../static/image/icon/dui.png" mode="" class="mi"></image>
							</view>
						</view>

					</scroll-view>

				</view>
			</view>
		</template>


		<!-- 密码框 -->
		<template v-if="payFalg">
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
					<view class="font_size30 font_color66 text_center" v-if="!setFalg">
						提现
					</view>
					<view class="font_size60 font_color66 text_center" v-if="!setFalg">
						￥200.00
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
				backFalg: false,
				payFalg: false,
				setFalg: false
			}
		},
		methods: {
			// 获取金额
			keyMoney(e) {
				console.log(e)
			},
			// 关闭
			close_m() {
				this.backFalg = false
			},
			open_m() {
				this.backFalg = true
			},
			// 关闭设置密码输入框
			closeMoudel() {
				this.payFalg = false
			},
			// 去提现结果
			goW(){
				uni.navigateTo({
					url:'../withdrawalResult/withdrawalResult'
				})
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
			
		}
	}
</script>

<style lang="scss">
	.top_money {
		background-color: #FFFFFF;
		// width: 690px;
		// height: 630px;
		// opacity: 0.9;
		padding: 30upx;
		background: #ffffff;
		border-radius: 20upx;
		margin-top: 30upx;
	}

	.img {
		width: 34upx;
		height: 34upx;
		border-radius: 50%;
	}

	.right_i {
		width: 10upx;
		height: 17upx;
	}

	.w_btn {
		width: 614upx;
		height: 90upx;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 90upx;
		color: #FFFFFF;
		font-size: 30upx;
		margin-left: 20upx;
		margin-top: 30upx;
	}

	// 银行卡列表
	.moudel_content_w {
		background-color: #FFFFFF;
		width: 100%;
		// margin-left: 5%;
		// border-radius: 16px;
		position: absolute;
		bottom: 0;
		padding: 30upx;
	}

	.img_left {
		width: 26upx;
		height: 26upx;
	}

	.listimg {
		width: 46upx;
		height: 46upx;
	}

	.mi {
		width: 31upx;
		height: 20upx;
	}

	.content_block {
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: absolute;
		top: 18%;
	}

	.content_block_pay {
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: fixed;
		top: 15%;
		height: 438upx;
	}

	.moudel_img {
		width: 30upx;
		height: 30upx;
		margin-top: 8%;
		margin-left: 3%;
	}
</style>

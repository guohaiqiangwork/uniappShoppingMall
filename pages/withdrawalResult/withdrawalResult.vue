<template>
	<view>
		<view class="page_width">
			<view class="tx_m">
				<view class="text_center margin_top5">
					<image src="../../static/image/icon/txj.png" class="tximg" mode=""></image>
				</view>
				<view class="font_size32 text_center" v-if="dataTx.state == 0">
					提现受理中
				</view>
				<view class="font_size32 text_center" v-if="dataTx.state == 1">
					已打款
				</view>
				<!-- <view class="font_size32 text_center">
					预计2小时内到账
				</view> -->
				<view class="uni-flex font_size30 padding_top2 margin_top8 padding_bottom2">
					<view class=" width30 font_color66">
						提现金额
					</view>
					<view class="">
						￥{{dataTx.amount}}
					</view>
				</view>
				<view class="uni-flex font_size30 padding_top2  padding_bottom2">
					<view class=" width30 font_color66">
						手续费
					</view>
					<view class="">
						￥{{dataTx.handFee}}
					</view>
				</view>
				<view class="uni-flex font_size30 padding_top2  padding_bottom2">
					<view class=" width30 font_color66">
						税费
					</view>
					<view class="">
						￥{{dataTx.taxes}}
					</view>
				</view>
				<view class="uni-flex font_size30 padding_top2 padding_bottom2">
					<view class=" width30 font_color66">
						实际到账金额
					</view>
					<view class="">
						￥{{dataTx.actualAmount}}
					</view>
				</view>
				<view class="uni-flex font_size30 padding_top2 padding_bottom2">
					<view class=" width30 font_color66">
						到账方式
					</view>
					<view class="">
						{{dataTx.fromTo}}
					</view>
				</view>
				<view class="uni-flex font_size30 padding_top2 padding_bottom2">
					<view class=" width30 font_color66">
						提现时间
					</view>
					<view class="">
						{{dataTx.createTime}}
					</view>
				</view>

			</view>

			<view class="btnw" @click="goHome">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payFalg: '',
				dataTx: ''
			}
		},
		onLoad(option) {
			console.log(option)
			this.payFalg = option.payFalg
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData: function() {
				var data = {
					tradeNo: this.payFalg,
				}
				// 获取团队数据
				this.$http.get('/api/withdraw/result', data, true).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						this.dataTx = res.data.data
					}
				});
			},

			goHome: function() {
				uni.switchTab({
					url: '../tabBar/home/home'
				})
			}
		}
	}
</script>

<style>
	.tx_m {
		/* width: 690px;
		height: 700px; */
		background: #ffffff;
		border-radius: 20upx;
		padding: 30upx;
		margin-top: 30upx;
	}

	.tximg {
		width: 138upx;
		height: 138upx;
	}

	.btnw {
		height: 90upx;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 90upx;
		color: #FFFFFF;
		font-size: 30upx;
		margin-left:1%;
		margin-top: 30upx;
		position: absolute;
		bottom: 3%;
		width: 91%;
	}
</style>

<template>
	<view>
		<view class="">
			<!-- 支付失败 -->
			<template v-if="payFalg">
				<view class="text_center margin_top18">
					<image src="../../static/image/yhj/pay0.png" class="pay_img" mode=""></image>
					<view class="font_size30">
						支付失败
					</view>
					<view class="font_size30">
						银行卡余额不足
					</view>
					<view class="paybtn">
						重新支付
					</view>
				</view>
			</template>

			<!-- 支付成功 -->
			<template v-else>
				<view class="text_center margin_top18">
					<image src="../../static/image/yhj/pay1.png" class="pay_img" mode=""></image>
					<view class="font_size30">
						支付成功
					</view>
					<view class="paybtn">
						去首页逛逛
					</view>
				</view>
			</template>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payFalg: true
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.pay_img {
		width: 365upx;
		height: 366upx;
	}

	.paybtn {
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		line-height: 88upx;
		color: #FFFFFF;
		text-align: center;
		font-size: 30upx;
		width: 530upx;
		margin-left: 110upx;
		margin-top: 60upx;
	}
</style>

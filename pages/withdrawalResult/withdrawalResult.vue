<template>
	<view>
		<view class="page_width">
			<view class="tx_m">
				<view class="text_center margin_top5">
					<image src="../../static/image/icon/txj.png" class="tximg" mode=""></image>
				</view>
				<view class="font_size32 text_center">
					提现受理中
				</view>
				<view class="font_size32 text_center">
					预计2小时内到账
				</view>
				<view class="uni-flex font_size30 padding_top2 margin_top8 padding_bottom2">
					<view class=" width30 font_color66">
						提现金额
					</view>
					<view class="">
						￥200.00
					</view>
				</view>
				<view class="uni-flex font_size30 padding_top2 padding_bottom2">
					<view class=" width30 font_color66">
						实际到账金额
					</view>
					<view class="">
						￥200.00
					</view>
				</view>
				<view class="uni-flex font_size30 padding_top2 padding_bottom2">
					<view class=" width30 font_color66">
						到账银行卡
					</view>
					<view class="">
						工商银行(3202)
					</view>
				</view>
				<view class="uni-flex font_size30 padding_top2 padding_bottom2">
					<view class=" width30 font_color66">
						提现时间
					</view>
					<view class="">
						2019-08-09 12:30:15
					</view>
				</view>

			</view>

			<view class="btnw">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

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
		margin-left: 20upx;
		margin-top: 30upx;
		position: absolute;
		bottom: 3%;
		width: 91%;
	}
</style>

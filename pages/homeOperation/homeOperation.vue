<template>
	<view>
		<view class="background_colorff moudel">
			<view class="">
				<textarea value="" class="padding_left2 font_size28" placeholder="请填写您对我们提出的宝贵意见" style="border: 1px solid #CCCCCC;"/>
			</view>
			<view class="bottom_btn jb_view">
				提交
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
		onLoad(option) {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	.moudel{
		width: 94%;
		margin-left: 3%;
		background-color: #FFFFFF;
		padding: 30upx;
		border-radius: 20upx;
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
</style>

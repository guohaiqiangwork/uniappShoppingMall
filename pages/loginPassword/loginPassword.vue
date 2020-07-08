<template>
	<view>
		<view class="moudel_p">
			<view class="uni-flex padding_top3 padding_bottom3 border_bottom">
				<view class="font_size30 width30 text_center">
					新密码
				</view>
				<view class="width70 font_size30">
					<input placeholder="请输入密码" type="text" :value="newPa" />
				</view>
			</view>
			<view class="uni-flex padding_top3 padding_bottom3 border_bottom">
				<view class="font_size30 width30 text_center">
					确认密码
				</view>
				<view class="width70 font_size30">
					<input placeholder="请再次输入密码" type="text" :value="newPa" />
				</view>
			</view>

		</view>

		<view class="bottom_btn_l">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newPa: ''
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.moudel_p {
		background-color: #FFFFFF;
		margin-top: 2upx;
	}

	.bottom_btn_l {
		width: 690upx;
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		margin-left: 30upx;
		position: fixed;
		bottom: 3%;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		font-size: 30upx;
	}
</style>

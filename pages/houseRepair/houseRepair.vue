<template>
	<view>
		<view class="register_moudel">
			<view class="uni-flex border_bottom padding_bottom3 padding_top3">
				<view class="width30 font_size32">
					您所在小区
				</view>
				<view class="font_size28 margin_top1">
					<picker @change="bindPickerChange" :range="array">
						<label class="">{{array[index]}}</label>
						默认当前小区
					</picker>
				</view>
			</view>
			<view class="uni-flex border_bottom padding_bottom3 padding_top3">
				<view class="width30 font_size32">
					您所在楼号：
				</view>
				<view class="font_size26 margin_top1">
					<input type="number" maxlength="11" @input="keyPhone" placeholder="请输入您的楼号" placeholder-style='color:#484848' />
				</view>
			</view>
			<view class="uni-flex border_bottom padding_bottom3 padding_top3">
				<view class="width30 font_size32">
					联系电话：
				</view>
				<view class="font_size26 margin_top1">
					<input type="number" maxlength="11" @input="keyPhone" placeholder="请输入您的联系电话" placeholder-style='color:#484848' />
				</view>
			</view>
			<view class="uni-flex border_bottom padding_bottom3 padding_top3">
				<view class="width30 font_size32">
					报修内容：
				</view>
				<view class="font_size26 margin_top1">
					<input type="number" maxlength="11" @input="keyPhone" placeholder="请输入您报修内容" placeholder-style='color:#484848' />
				</view>
			</view>
			

			<view class="bottom_btn jb_view">
				提交
			</view>
			
			手机号 小区均默认为当前登录人的 可进行修改
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [
					'--请选择--', '小区'
				],
				index: '0',
			}
		},
		methods: {
			// 手机号
			keyPhone: function(event) {
				this.userPhone = event.target.value
			},
			
			//下拉框
			bindPickerChange: function(e) { //改变的事件名
				this.index = e.target.value //将数组改变索引赋给定义的index变量
			},
			
		}
	}
</script>

<style lang="less">
	.register_moudel {
		width: 94%;
		margin-left: 3%;
		background-color: #FFFFFF;
		padding: 30upx;
		border-radius: 30upx;
		margin-top: 5%;
	}

	.heard_img {
		width: 236upx;
		height: 236upx;
		border-radius: 50%;
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

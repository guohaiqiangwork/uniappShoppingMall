<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width35 margin_left3" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<view class="font_size36">
				商品清单(2)
			</view>
		</view>
		<!-- 列表 -->
		<view class="page_width">
			<view class="uni-flex product_moudel_list" v-for="(item,index) in [1,2,3,4]" :key="index">
				<view class="width30">
					<image src="../../static/image/beij/logB.png" class="list_imgp" mode=""></image>
				</view>
				<view class="width70">
					<view class="font_sise28">
						联想拯救者R7000笔记本电脑
					</view>
					<view class="uni-flex display_space margin_top2">
						<view class="font_size22 font_color99">
							屏幕尺寸：15.6英寸
						</view>
						<view class="font_size24 font_color99 margin_right3">
							*1
						</view>
					</view>
					<view class="font_sise28 font_colorbe margin_top3">
						<text class="font_size22">¥</text> 4799.00 <text class="font_size22 font_color99">/件</text>
					</view>
				</view>
			</view>
		
		</view>
		
		<!-- 真招 -->
		<template v-if="falgSX">
			<view class="falgSX_moudel"></view>
		</template>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				falgSX:true
			}
		},
		onLoad(option) {
			console.log(option.falg)
			option.falg == 's' ? this.falgSX =true :this.falgSX =false;
		},
		methods: {
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.product_moudel_list {
		padding: 20upx;
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 20upx;
		border-radius: 20upx;
	}

	.list_imgp {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}
	.falgSX_moudel{
		height: 100%;
		width: 100%;
		position: fixed;
		background-color:#FFFFFF;
		z-index: 99;
		top: 10%;
		left: 0;
		opacity: 0.5;
	}
</style>

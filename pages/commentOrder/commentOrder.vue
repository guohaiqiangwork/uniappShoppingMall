<template>
	<view>


		<!-- 列表 -->
		<view class="page_width">
			<!-- 商品 -->
			<template>
				<view class="uni-flex list_moudel_search" v-for="(item,index) in [1,2,3,4]" :key="index">
					<view class="width30">
						<image src="../../static/image/beij/mybj.png" class="list_img" mode=""></image>
					</view>
					<view class="width66">
						<view class="margin_top5">
							联想小新Air14 锐龙版
						</view>
						<view class="font_size22 font_color99 margin_top5">
							屏幕尺寸：15.6英寸
						</view>
						<view class="uni-flex display_space margin_top2">
							<view class="font_size22 font_color66 ">
								<text class="font_colorbe">¥4799.0</text> /件
							</view>
							<view class="margin_right3" @click="goComment">
								<view class="listrightbtn">
									立即评价
								</view>
							</view>
						</view>
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

			}
		},
		onLoad(option) {
			this.inputValue = option.listF;
		},

		methods: {
			goComment(){
				uni.navigateTo({
					url:'../comment/comment'
				})
			}

		}
	}
</script>

<style lang="less">
	// 列表
	.list_moudel_search {
		height: 220upx;
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 30upx;
		padding: 30upx;
	}

	.list_img {
		width: 160upx;
		height: 160upx;
	}

	.image_list_s {
		width: 45upx;
		height: 45upx;
		border-radius: 50%;
	}

	.listrightbtn {
		width: 160upx;
		height: 60upx;
		border: 1px solid #be8100;
		border-radius: 10upx;
		text-align: center;
		line-height: 60upx;
		color: #BE8100;
		font-size: 26upx;
		margin-top: -30upx;
	}
</style>

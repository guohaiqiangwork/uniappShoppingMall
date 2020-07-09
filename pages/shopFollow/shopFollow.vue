<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width30 text_left margin_left3" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="width50 text_center font_size36">
				店铺关注
			</view>
			<view @click="edit" class="font_size20 width20 text_right width30 margin_right3 " style="padding-top: 1%;">
				{{titleRight}}
			</view>
		</view>
		<!-- 列表 -->
		<view class=" " style="background-color: #F4F4F4;">
			<view class="uni-flex" v-for="(item,index) in [1,2,3,4]" :key="index">
				<!-- 左边 -->
				<view :class="leftFalg ? 'left_check' : 'left_checkn'" v-if="leftFalg">
					<image src="../../static/image/beij/pcheck.png" v-if="index != 1" class="leftimg" mode=""></image>
					<image src="../../static/image/beij/pcheck1.png" v-else class="leftimg" mode=""></image>
				</view>
				<!-- 右边 -->
				<view class="uni-flex" :class=" leftFalg ? 'product_moudel_list':'product_moudel_listn' ">
					<view class="width15">
						<image src="../../static/image/beij/logB.png" class="list_imgp" mode=""></image>
					</view>
					<view style="width: 85%;">
						<view class="uni-flex">
							<view class="font_sise28 margin_top1 width70">
								Apple store官方旗舰店
							</view>
							<view class="width25 text_right" @click="goShopIndex">
								<view class="listrightbtn">
									进店
								</view>
							</view>
						</view>

					</view>
				</view>

			</view>

		</view>


		<!-- 操作按钮 -->
		<view class="btnBottom uni-flex" v-if="leftFalg">
			<view class="display_center  width30 uni-flex" style="padding-top: 30upx;">
				<view class="">
					<image class="leftimg" src="../../static/image/beij/pcheck.png" mode=""></image>
					<!-- <image class="leftimg" src="../../static/image/beij/pcheck1.png" mode=""></image> -->
				</view>
				<view class="font_size24 font_color66 ">
					全选
				</view>
			</view>
			<view class="btnBottom_right width70">
				取消关注
			</view>
		</view>


		<!-- 提示框 -->
		<template v-if="pfalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">
						确认要取消关注该店铺吗？
					</view>
					<view class="uni-flex " style="margin-top: 80upx;">
						<view class="leftbtn" @click="closemoudel">
							取消
						</view>
						<view class="rightbtn" @click="okMoudel">
							确认
						</view>
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
				titleRight: '编辑',
				leftFalg: false,
				pfalg: false
			}
		},
		onLoad(option) {
			console.log(option.falg)
			option.falg == 's' ? this.falgSX = true : this.falgSX = false;
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			edit() {
				this.leftFalg = !this.leftFalg
				this.titleRight = '完成'
			},
			// 确认取消
			okMoudel() {

			},
			// 取消
			closemoudel() {
				this.pfalg = false
			},
			// 进店
			goShopIndex() {
				uni.navigateTo({
					url: '../shopIndex/shopIndex'
				})
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
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 20upx;
		height: 100upx;
		width: 85%;
		padding: 20upx;
	}

	.product_moudel_listn {
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 20upx;
		height: 100upx;
		width: 94%;
		margin-left: 3%;
		padding: 20upx;
	}

	.list_imgp {
		width: 60upx;
		height: 60upx;
	}

	.rightimg {
		width: 45upx;
		height: 45upx;
		margin-top: 2%;
	}

	.leftimg {
		width: 30upx;
		height: 30upx;
	}

	.left_check {
		width: 10%;
		text-align: center;
		height: 150upx;
		line-height: 150upx;
		// background-color: #FFFFFF;
	}

	.left_checkn {
		display: none;
	}

	.btnBottom {
		position: fixed;
		bottom: 0;
		height: 98upx;
		width: 100%;
		background-color: #FFFFFF;
	}

	.btnBottom_right {
		width: 602px;
		height: 98upx;
		background: #3c3d3e;
		line-height: 98upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30upx;
	}

	.product_content_block {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		height: 362upx;
		width: 600upx;
		margin-left: 75upx;
	}

	.leftbtn {
		width: 220upx;
		height: 78upx;
		border: 1px solid #3c3d3e;
		border-radius: 10px;
		text-align: center;
		color: #3C3D3E;
		line-height: 78upx;
		margin-left: 45upx;
	}

	.rightbtn {
		width: 220upx;
		height: 78upx;
		background: #3c3d3e;
		border-radius: 10px;
		color: #FFFFFF;
		text-align: center;
		line-height: 78upx;
		margin-left: 45upx;
	}

	.listrightbtn {
		width: 120upx;
		height: 60upx;
		border: 1px solid #be8100;
		border-radius: 10upx;
		text-align: center;
		line-height: 60upx;
		color: #BE8100;
		font-size: 26upx;
	}
</style>

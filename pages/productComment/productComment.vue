<template>
	<view>
		<view class="title_top"></view>

		<!-- 标题 -->
		<view class="background_colorff title_moudel padding_top2 ">
			<view class="border_bottom">
				<view class="page_width uni-flex">
					<view class="width40" @click="goBack">
						<image src="../../static/image/icon/left.png" class="title_img" mode=""></image>
					</view>
					<view class="font_size36 width35">
						商品评价
					</view>
					<view class="width25 text_right margin_top2">

						<image src="../../static/image/icon/tright.png" class="top_img_width margin_right3" mode=""></image>
						<image src="../../static/image/icon/tright2.png" class="top_img_width margin_left5" mode=""></image>

					</view>
				</view>
			</view>

			<!-- tab -->
			<view class="padding_top2">
				<view class="item_tab" v-for="(item,index) in tabList" :key="index" @click="tabSwitch(index)">
					<view class="">
						{{item.name}}
					</view>
					<view class="tab_select" v-if="tabIndex == index "></view>
				</view>

			</view>
		</view>


		<!-- 列表 -->
		<view class="">
			<view class="page_width" style="margin-top: 200upx;">
				<view class="list_moudel_contern">
					<view class="uni-flex display_space">
						<view class="uni-flex width80">
							<view class="width10">
								<image src="../../static/image/beij/myTopb.png" class="list_heard" mode=""></image>
							</view>
							<view class="font_size24 margin_left3 margin_top3 width15">
								王**
							</view>
							<view class="" style="margin-top:6%;">
								<uni-rate size="18" disabled="true" color="#ffffff" active-color="#B99445" :value="rateNumber"></uni-rate>
							</view>
						</view>
						<view class="font_size22 font_color99 width20">
							2020-06-29
						</view>
					</view>

					<view class="font_size24">
						性能好，性价比高，外观也好看，屏幕效果很舒服。
						性能好，性价比高，外观也好看，屏幕效果很舒服。
						性能好，性价比高，外观也好看，屏幕效果很舒服。
					</view>
					<view class="margin_top2" style="margin-left: -20upx;">
						<view class="display_inline" v-for="(item,index) in [1,2,3]" :key="index">
							<image src="../../static/image/beij/myTopb.png" class="moudel_img2" mode=""></image>
						</view>

					</view>
				</view>
			</view>


		</view>

		<!-- 底导 -->
		<view class="uni-flex bottom_view">
			<view class="uni-flex text_center width33 margin_top2">
				<view class="width50">
					<view class="">
						<image src="../../static/image/icon/dianp.png" class="bottom_img" mode=""></image>
					</view>
					<view class="font_size22" style="margin-top: -8%;">
						店铺
					</view>
				</view>
				<view class="width50">
					<view class="number_moudel">72+</view>
					<view class="" @click="goShopCart">
						<image src="../../static/image/icon/shopC.png" class="bottom_img" mode=""></image>
					</view>
					<view class="font_size22" style="margin-top: -8%;">
						购物车
					</view>
				</view>
			</view>
			<view class="width33 left_bottom">
				加入购物车
			</view>
			<view class="width33 left_bottom" style="background-color: #BE8100;">
				立即购买
			</view>
		</view>



	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				tabList: [{
						name: '全部'
					},
					{
						name: '好评'
					},
					{
						name: '差评'
					}

				],
				tabIndex: 0,
				rateNumber: 3,
				urlFalg: '',
				collection: true
			}
		},
		onLoad(option) {
			console.log(option.urlFalg)

		},
		methods: {
			tabSwitch: function(index) {
				console.log(index)
				this.tabIndex = index;
				// this.tabIndex == 0 ? this.funTeamDirectPush() : this.funPushTeam()
			},
			// 返回
			goBack() {
				uni.navigateBack()
			},
			// 去购物车
			goShopCart() {
				uni.switchTab({
					url: '../tabBar/shopCart/shopCart'
				})
			}

		}
	}
</script>

<style lang="less">
	.title_moudel {
		position: fixed;
		top: 40upx;
		width: 100%;
	}

	.title_img {
		width: 16upx;
		height: 28upx;
	}

	.top_img_width {
		width: 30upx;
		height: 30upx;
	}

	.item_tab {
		display: inline-block;
		width: 33%;
		text-align: center;
		color: #0C0C0C;
		font-size: 28upx;
		height: 65upx;
		line-height: 65upx;
	}

	.tab_select {
		background-color: #BE8100;
		height: 4upx;
		width: 15%;
		border-radius: 2upx;
		margin-left: 42%;
		border: 1px solid #BE8100;
	}

	.list_moudel_contern {
		background: #ffffff;
		border-radius: 20upx;
		padding: 3%;
	}

	.list_heard {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
	}

	.moudel_img2 {
		width: 210upx;
		height: 210upx;
		border-radius: 20upx;
		margin-left: 20upx;
	}

	.bottom_view {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98upx;
		background-color: #FFFFFF;
		z-index: 100;
	}

	.left_bottom {
		height: 98upx;
		background: #3c3d3e;
		text-align: center;
		line-height: 98upx;
		color: #FFFFFF;
		font-size: 30upx;
	}

	.number_moudel {
		background-color: #BE8100;
		color: #FFFFFF;
		font-size: 15upx;
		text-align: center;
		border-radius: 20upx;
		width: 36upx;
		height: 15upx;
		line-height: 1;
		font-weight: 600;
		position: absolute;
		margin-left: 10%;
		margin-top: -1%;
	}

	.bottom_img {
		width: 40upx;
		height: 40upx;
	}
</style>

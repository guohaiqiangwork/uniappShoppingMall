<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width30 text_left margin_left3" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<view class="width50 text_center font_size36">
				我的余额
			</view>
			<view class="font_size20 width20 text_right width30 margin_right3 " style="padding-top: 1%;">
				余额说明
			</view>
		</view>

		<view class="more_moudel">
			<view class="uni-flex">
				<view class="width50">
					<view class="">
						可用余额
					</view>
					<view class="font_size60" style="margin-top: -3%;">
						<text class="font_size24">¥</text>
						80,000.00
					</view>
				</view>
				<view class="width50">
					<view class="moreRight">
						提现
					</view>
				</view>
			</view>
		</view>

		<view class="background_colorff">
			<!-- tab 切换 -->
			<view class="padding_top3 padding_bottom3 border_bottom ">
				<view @click="tabSwichThree(index)" class="item_tab_three" v-for="(item,index) in tabListThree" :key="index" :style="index == 2 ?'border:none' :'' ">
					<view>
						{{item.name}}
					</view>
					<view :class="tabIndexT == index ? 'bottom_tab' : ''">
					</view>
				</view>
			</view>

			<!-- 时间筛选 -->
			<view class="uni-flex">
				<view class="">

				</view>
				<view class="">

				</view>
			</view>

		</view>
		
		<!-- 列表 -->
		<view class="page_width">
			<view class="uni-flex margin_top3">
				<view class="font_size26 width20 text_center">
					提现
				</view>
				<view class="font_size24 width50 text_center">
					2020-05-0113:23:00
				</view>
				<view class="font_size24 width30 text_center">
					-￥100.00
				</view>
			</view>
			
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabListThree: [{
						name: '全部'
					},
					{
						name: '支出'
					},
					{
						name: '收入'
					},
				],
				tabIndexT: 0,
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack()
			},
			// tab two
			tabSwichThree: function(index) {
				console.log(index)
				this.tabIndexT = index
			},
		}
	}
</script>

<style lang="less">
	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.more_moudel {
		background: url(../../static/image/beij/ye.png) no-repeat;
		height: 180upx;
		background-size: 100% 100%;
		color: #FFFFFF;
		padding-top: 40upx;
		padding-left: 60upx;
	}

	.moreRight {
		width: 160upx;
		height: 60upx;
		border: 1px solid #fcd07d;
		border-radius: 30upx;
		text-align: center;
		line-height: 60upx;
		color: #FCD07D;
		font-size: 28upx;
		margin-left: 35%;
		margin-top: 5%;
	}

	.item_tab_three {
		display: inline-block;
		width: 33%;
		text-align: center;
		color: #0C0C0C;
		font-size: 28upx;
		height: 40upx;
		line-height: 40upx;
		border-right: 1px solid #D8D8D8;
	}

	.bottom_tab {
		border: 1px solid #BE8100;
		width: 30%;
		height: 4upx;
		background-color: #BE8100;
		border-radius: 3upx;
		margin-left: 35%;
	}
</style>

<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width10 text_center" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="uni-flex top_content">
				<view class="searce_left">
					<image src="../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<input class="findShop" maxlength="10" :value="inputValue" placeholder="请输入要搜索的内容" confirm-type='搜索' type="text"
					 placeholder-style='color:#cccccc' />
				</view>
			</view>

			<view class="font_size28 text_center width15 " style="padding-top: 1%;" @click="goShopCart">
				<image src="../../static/image/icon/shopC.png" class="right_img" mode=""></image>
			</view>
		</view>
		<!-- 列表 -->

		<view class="">
			<view class="uni-flex">
				<view class="width25" style="min-height: 1040upx;">
					<view @click="leftTab(item.id)" :class="leftIndex  == item.id ? '_left_active' :'_left'" v-for="(item,index) in leftList"
					 :key="index">
						{{item.name}}
					</view>
				</view>

				<view class="width75 background_colorff" style="min-height: 1200upx;">
					<view @click="goProductDetails" class="uni-flex border_bottom _right_moudel" v-for="(item,index) in [1,2,3]" :key="index">
						<view class="">
							<image src="../../static/image/beij/myTopb.png" class="_right_img" mode=""></image>
						</view>
						<view class="margin_left3">
							<view class="font_size26 text_hidden ">
								Asus/华硕 Y423300高性...
							</view>
							<view class="font_size22 font_color99 text_hidden">
								这是副标题这个是有长度…
							</view>
							<view class="uni-flex margin_top3 ">
								<view class="font_sise28 font_colorbe width80">
									<text class="font_size26">¥</text>
									4799.00
									<text class="font_size22 font_color99">/件</text>
								</view>
								<view class="width20 text_right">
									<image src="../../static/image/icon/shop.png" class="shop_img_oe" mode=""></image>
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: '',
				leftList: [{
						name: '笔记本电脑',
						id: '0'
					},
					{
						name: '台式机电脑',
						id: '1'
					},
					{
						name: '电脑配件',
						id: '2'
					},
					{
						name: '智能生活',
						id: '3'
					},
				],
				leftIndex: 0 //分类左面数据
			}
		},
		onLoad(option) {
			this.inputValue = option.cateType
			console.log(option.cateType)
		},
		methods: {
			// 去购物车
			goShopCart() {
				uni.navigateTo({
					url: '../shopCart/shopCart'
				})
			},
			// 返回
			goBack() {
				uni.navigateBack()
			},
			// 分类在左面
			leftTab: function(id) {
				this.leftIndex = id
			},

			// 去产品详情
			goProductDetails: function() {
				uni.navigateTo({
					url: '../productDetails/productDetails'
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

	.top_content {
		width: 75%;
		height: 66upx;
		background: #f8f8f8;
		border-radius: 12upx;
	}

	.right_img {
		width: 44upx;
		height: 46upx;
	}

	._left {
		width: 100%;
		height: 88upx;
		text-align: center;
		font-size: 28upx;
		color: #666666;
		line-height: 88upx;
		display: inline-block;
		background-color: #FAFAFA;
	}

	._left_active {
		width: 100%;
		height: 88upx;
		text-align: center;
		font-size: 28upx;
		color: #666666;
		line-height: 88upx;
		display: inline-block;
		background-color: #FFFFFF;
		border-left: 6upx solid #BE8100;
	}

	._right_moudel {
		padding-left: 30upx;
		padding-top: 30upx;
	}

	._right_img {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}

	.shop_img_oe {
		width: 23upx;
		height: 23upx;
	}
</style>

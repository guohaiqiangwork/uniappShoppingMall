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


		<!-- tab -->
		<view class="background_colorff">
			<view class="border_bottom">
				<view class="item_tab" v-for="(item,index) in tabList" :key="index" @click="tabSwitch(index)" :style="tabIndex == index ?'color:#333333;fontWeight:700' :'' ">
					<view class="">
						{{item.name}}
					</view>
					<view class="tab_select" v-if="tabIndex == index "></view>
				</view>
			</view>
			<view class="padding_top3 padding_bottom3">
				<view @click="tabSwichThree(index)" class="item_tab_three" v-for="(item,index) in tabListThree" :key="index" :style="index == 2 ?'border:none' :'' ">
					<view class="">
						{{item.name}}
					</view>
					<view class="jian_moudel" v-if="index == 2">
						<view class="kailong" :style="sortUp ? 'border-bottom: 8upx solid #B98615' :''"></view>
						<view class="kailong1" :style="!sortUp ? 'border-top: 8upx solid #B98615' :''"></view>
					</view>

				</view>
			</view>

		</view>


		<!-- 列表 -->
		<view class="page_width">
			<!-- 商品 -->
			<template v-if="tabIndex == 0">
				<view class="uni-flex list_moudel_search" v-for="(item,index) in [1,2,3,4]" :key="index">
					<view class="width30" @click="goTodetails">
						<image src="../../static/image/beij/mybj.png" class="list_img" mode=""></image>
					</view>
					<view class="width66">
						<view class="margin_top5">
							联想小新Air14 锐龙版
						</view>
						<view class="uni-flex display_space margin_top8">
							<view class="font_size22 font_color66 ">
								<text class="font_colorbe">¥4799.0</text> /件
							</view>
							<view class="margin_right3">
								<image src="../../static/image/icon/shopCard.png" class="image_list_s" mode=""></image>
							</view>
						</view>
					</view>
				</view>

			</template>

			<!-- 店铺 -->
			<template v-else>
				<view class=" ">
					<view class="shop_moudel uni-flex" v-for="(item,index) in [1,2,3]" :key='index'>
						<view class="width15 text_center">
							<image src="../../static/image/beij/mybj.png" class="shop_moudel_img" mode=""></image>
						</view>
						<view class="font_size28 margin_top1 width65">
							联想官方旗舰店
						</view>
						<view class="width20">
							<view class="shop_moudel_btn" @click="goToShop">
								进店
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
				inputValue: '',
				tabList: [{
						name: '商品'
					},
					{
						name: '店铺'
					}

				],
				tabIndex: 0,
				tabListThree: [{
						name: '综合'
					},
					{
						name: '销量最高'
					},
					{
						name: '价格'
					},
				],
				tabIndexT: 0,
				sortUp: true,
			}
		},
		onLoad(option) {
			this.inputValue = option.listF;
		},

		methods: {
			// tab one
			tabSwitch: function(index) {
				console.log(index)
				this.tabIndex = index;
				// this.tabIndex == 0 ? this.funTeamDirectPush() : this.funPushTeam()
			},
			// tab two
			tabSwichThree: function(index) {
				console.log(index)
				index = 2 ? this.sortUp = !this.sortUp : '';
			},
			// 去产品详情
			goTodetails(e) {
				var e = 1;
				uni.navigateTo({
					url: '../productDetails/productDetails?productId=' + e + '&urlFalg=searchList'
				})
			},
			// 去店铺
			goToShop(e) {
				var e = 1;
				// uni.navigateTo({
				// 	url:'../shopIndex/shopIndex'
				// })
				uni.navigateTo({
					url: '../shopIndex/shopIndex?shopId=' + e + '&urlFalg=searchList'
				})
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

	// tab

	.item_tab {
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #999999;
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

	.jian_moudel {
		position: absolute;
		width: 30upx;
		margin-top: -4.5%;
		margin-left: 24%;
	}

	.kailong {
		width: 0;
		height: 0;
		border-right: 6upx solid transparent;
		border-left: 6upx solid transparent;
		border-bottom: 8upx solid #D8D8D8;
	}

	.kailong1 {
		width: 0;
		height: 0;
		border-right: 6upx solid transparent;
		border-left: 6upx solid transparent;
		border-top: 8upx solid #D8D8D8;
		margin-top: 4upx;
	}

	// 列表
	.list_moudel_search {
		height: 180upx;
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 30upx;
	}

	.list_img {
		width: 180upx;
		height: 180upx;
	}

	.image_list_s {
		width: 45upx;
		height: 45upx;
		border-radius: 50%;
	}

	// 店铺
	.shop_moudel {
		height: 100upx;
		background: #ffffff;
		border-radius: 10upx;
		padding-top: 20upx;
		margin-top: 30upx;
	}

	.shop_moudel_img {
		width: 60upx;
		height: 60upx;
	}

	.shop_moudel_btn {
		color: #BE8100;
		width: 120upx;
		height: 60upx;
		border: 1pt solid #be8100;
		border-radius: 10upx;
		text-align: center;
		line-height: 60upx;
		font-size: 26upx;
	}
</style>

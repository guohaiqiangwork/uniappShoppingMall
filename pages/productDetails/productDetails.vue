<template>
	<view>
		<!-- 轮播图 -->
		<view class="">
			<swiper class="imageContainer" @change="handleChange" circular autoplay>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item @click="swiperClick(item.id)">
						<image class="itemImg" :src="item.banner" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>

		<!-- 头部操作栏 -->
		<view class="top_moudel display_space">
			<view class="" @click="goBack">
				<image src="../../static/image/icon/top_left.png" class="top_img_width" mode=""></image>
			</view>
			<view class="width20">
				<image src="../../static/image/icon/top_right.png" class="top_img_width" mode=""></image>
				<image src="../../static/image/icon/top_right1.png" v-if="collection" class="top_img_width margin_left5" mode=""></image>
				<image src="../../static/image/icon/tright2S.png" v-else class="top_img_width margin_left5" mode=""></image>
			</view>
		</view>

		<!-- content -->
		<view class="background_colorff " style="padding-bottom: 150upx;">
			<view class="page_width">
				<view class="font_size36">
					联想小新Air14 锐龙版 学生轻薄本笔记本电脑 6核12线程游戏本
				</view>
				<view class="font_size26" style="color: #A3A3A3;">
					2020新款 锐龙六核 100%SRGB高色域
				</view>
				<view class="font_size30 font_colorb2">
					<text class="font_size26 font_colorbe">¥</text><text class="font_size50 font_colorbe">4799.00</text>/件
				</view>
			</view>

			<!-- 地址 -->
			<view class="address_moudel">
				<view class="page_width uni-flex ">
					<view class="width10 text_center">
						送至
					</view>
					<view class="width15 text_center">
						<image src="../../static/image/icon/diz.png" style="width: 21upx;height: 26upx;" mode=""></image>
					</view>
					<view class="width65 text_hidden">
						内蒙古包头市九原区华城中心A座13层…
					</view>
					<view class="width10 text_center">
						<image src="../../static/image/icon/dizx.png" style="width: 21upx;height: 7upx;" mode=""></image>
					</view>
				</view>
			</view>

			<!-- 规格 -->
			<view class="page_width">
				<view class="norms_moudel uni-flex display_space">
					<view class="">
						规格：8G内存 256G固态
					</view>
					<view class="uni-flex margin_right3 width20" @click="open_moudel">
						<view class="">
							选择更多
						</view>
						<view class="margin_left5">
							<image src="../../static/image/icon/rightb.png" style="width: 12upx;height: 20upx;" mode=""></image>
						</view>
					</view>
				</view>
			</view>

			<!-- list -->
			<view class="page_width">
				<view class="list_moudel_details">
					<view class="page_width">
						<view class="uni-flex font_size26 border_bottom padding_top3 padding_bottom3">
							<view class="width20">
								原料产地
							</view>
							<view class="font_color66">
								丹麦
							</view>
						</view>
						<view class="uni-flex font_size26 border_bottom padding_top3 padding_bottom3">
							<view class="width20">
								原料产地
							</view>
							<view class="font_color66">
								丹麦
							</view>
						</view>

					</view>
				</view>

				<!-- 评论 -->
				<view class="comment_moudel">
					<view class="uni-flex display_space " @click="goComment">
						<view class="margin_left3">
							宝贝评价（44万+）
						</view>
						<view class="uni-flex margin_right3">
							<view class="">
								查看全部
							</view>
							<view class="">
								<image src="../../static/image/icon/rightb.png" style="width: 12upx;height: 20upx;" mode=""></image>
							</view>
						</view>
					</view>

					<view class="uni-flex margin_top2">
						<view class="margin_left3">
							<image src="../../static/image/beij/myTopb.png" class="img_heard1" mode=""></image>
						</view>
						<view class="font_size24 margin_top1 margin_left3">
							王**
						</view>
					</view>
					<view class="font_size24  margin_left3 ">
						性能好，性价比高，外观也好看，屏幕效果很舒服。
					</view>
				</view>

				<view class="margin_top3">
					<image src="../../static/image/icon/prod.png" style="height: 38upx;" mode="widthFix"></image>
				</view>
			</view>

			<!-- 图片区域 -->
			<view class="margin_top2 ">
				<image src="../../static/image/beij/mybj.png" style="width: 100%;" mode=""></image>
			</view>



		</view>


		<!-- bottom -->
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


		<!-- 规格选择 -->
		<block v-if="normsFalg">
			<view class="moudel_content">
				<view class="list_moudel">
					<view class="text_right" @click="close_moudel">
						<image src="../../static/image/icon/close.png" class="margin_right3" style="width: 26upx;height: 26upx;" mode=""></image>
					</view>
					<view class="page_width">
						<!-- 商品 -->
						<view class="uni-flex">
							<view class="width35">
								<image src="../../static/image/beij/mybj.png" class="moudel_product_img" mode=""></image>
							</view>
							<view class="margin_top2">
								<view class="font_size30">
									联想 小新Air14 2020热销款
								</view>
								<view class="font_colorbe font_size40 margin_top3">
									<text class="font_size26">￥</text>
									4799.00
								</view>
								<view class="font_size24 font_color99">
									已选：1只
								</view>
							</view>
						</view>
						<!-- 规格 -->
						<view class="margin_top3">
							<view class="font_size26">
								规格
							</view>
							<view class="" style="margin-left: -20upx;">
								<view class="moudel_item" :style="index != 1 ? 'backgroundColor:#F4F4F4;color:#666666':''" v-for="(item,index) in [1,3,3,2,2,2]"
								 :key="index">
									8G内存 256G固态
								</view>
							</view>

						</view>
						<!-- 购买数量 -->
						<view class="uni-flex display_space margin_top3">
							<view class="font_size26">
								购买数量
							</view>
							<view class="">
								<view class="uni-flex num_moudel">
									<view class="num_moudel_left font_color99" @click="numStatistics(item.id,items.id,items.num,'')">
										-
									</view>
									<view class="num_moudel_center">
										0
										<!-- {{items.num > items.stock ? items.stock :items.num}} -->
									</view>
									<view class="num_moudel_right" @click="numStatistics(item.id,items.id,items.num,'add')">
										+
									</view>
								</view>
							</view>

						</view>


					</view>
				</view>
			</view>
		</block>


		<!-- 分享 -->
		<block v-if="shareFalg">
			<view class="share_moudel_content">
				<view class="share_moudel">
					<view class="uni-flex page_width border_bottom  padding_bottom3">
						<view class="width50 text_right">
							分享到
						</view>
						<view class="width50 text_right" @click="close_moudelS">
							<image src="../../static/image/icon/close.png" class="margin_right3" style="width: 26upx;height: 26upx;" mode=""></image>
						</view>
					</view>

					<view class="text_center padding_top3 padding_bottom3">
						<view class="margin_top2">
							<image src="../../static/image/icon/wxf.png" class="img_widthf" mode=""></image>
						</view>

						<view class="font_size26">
							微信
						</view>
					</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [{
					banner: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3538793755,2857666234&fm=26&gp=0.jpg'
				}, {
					banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
				}],

				normsFalg: false, //规格标示
				collection: false,
				shareFalg: false, //分享
				// urlFalgD: '', //返回路径
			}
		},
		onLoad(option) {
			console.log(option.urlFalg);
			// this.urlFalgD = option.urlFalg
		},
		methods: {
			// 轮播滑动操作
			handleChange(e) {
				this.currentIndex = e.detail.current;
			},
			// 点击轮播操做
			swiperClick(e) {
				uni.navigateTo({
					url: '../../pages/activity/activity?id=' + e
				})
			},
			// 数字框处理
			numStatistics(shopCartId, shopId, num, type) {
				for (let item of this.productList) {
					if (item.id == shopCartId) {
						for (let items of item.list1) {
							if (items.id == shopId) {
								if (type == 'add') {
									items.num = Number(num) + 1
								} else {
									items.num = Number(num) - 1
								}

							}
						}
					}
				}
			},
			// 关闭规格弹窗
			close_moudel() {
				this.normsFalg = false;
			},
			open_moudel() {
				this.normsFalg = true;
			},

			// 分享
			close_moudelS() {
				this.shareFalg = false;
			},
			open_moudelS() {
				this.shareFalg = true;
			},
			//去评论去
			goComment() {
				uni.navigateTo({
					url: '../productComment/productComment?urlFalg=productDetails'
				})
			},
			// 返回

			goBack() {
				uni.navigateBack()
			
			},
			goShopCart(){
				uni.switchTab({
					url:'../shopCart/shopCart'
				})
			}
		}
	}
</script>

<style lang="scss">
	// 轮播
	.imageContainer {
		width: 100%;
		height: 750upx;
	}

	.itemImg {
		width: 100%;
		height: 750upx;
	}

	.top_moudel {
		width: 94%;
		margin-left: 3%;
		position: absolute;
		top: 50upx;
		display: flex;
		height: 70upx;
	}

	.top_img_width {
		width: 60upx;
		height: 60upx;
	}

	.address_moudel {
		height: 104upx;
		background: #ffffff;
		font-size: 26upx;
		box-shadow: 0upx 2upx 10upx 0upx #eeeeee;
		padding-top: 30upx;
	}

	.norms_moudel {
		height: 80upx;
		background: #fafafa;
		border-radius: 12upx;
		align-items: center;
	}

	.list_moudel_details {
		background: #ffffff;
		border-radius: 12upx;
		box-shadow: 0px 2upx 10upx 0px #eeeeee;
		padding-bottom: 30upx;
		margin-top: 30upx;
	}

	.comment_moudel {
		height: 207upx;
		background: #fafafa;
		border-radius: 12upx;
		margin-top: 30upx;
		padding-top: 25upx;
	}

	.img_heard1 {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
	}

	.bottom_img {
		width: 40upx;
		height: 40upx;
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

	// 规格选择
	.moudel_content {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: $uni-bg-color-mask;
		z-index: 99;
		top: 0;
		left: 0;
	}

	.list_moudel {
		background-color: #FFFFFF;
		width: 100%;
		position: absolute;
		padding-bottom: 5%;
		bottom: 98upx;
		border-top-right-radius: 40upx;
		border-top-left-radius: 40upx;
		padding: 3%;
	}


	.moudel_product_img {
		width: 200upx;
		height: 200upx;
		border-radius: 20upx;
	}


	.moudel_item {
		display: inline-block;
		text-align: center;
		font-size: 26upx;
		color: #FFFFFF;
		height: 50upx;
		line-height: 50upx;
		margin-left: 20upx;
		margin-top: 20upx;
		border-radius: 30upx;
		padding-left: 20upx;
		padding-right: 20upx;
		background-color: #BE811C;
	}

	.num_moudel {
		height: 41upx;
		width: 153upx;

		text-align: center;
	}

	.num_moudel_left {
		width: 30%;

	}

	.num_moudel_center {
		margin-left: 3%;
		width: 30%;
		background-color: #EEEEEE;
		font-size: 24upx;
		color: #333333;
		border-radius: 5upx;
	}

	.num_moudel_right {
		margin-left: 3%;
		width: 30%;
	}

	.share_moudel_content {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: $uni-bg-color-mask;
		z-index: 101;
		top: 0;
		left: 0;
	}


	.share_moudel {
		background-color: #FFFFFF;
		width: 100%;
		position: absolute;
		padding-bottom: 5%;
		bottom: 2upx;
		border-top-right-radius: 40upx;
		border-top-left-radius: 40upx;
		padding: 3%;

	}

	.img_widthf {
		width: 80upx;
		height: 80upx;
	}
</style>

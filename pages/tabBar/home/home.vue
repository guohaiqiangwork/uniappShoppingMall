<template>
	<view>
		<view class="title_top"></view>
		<!-- 搜索框 -->
		<view class="top_border">
			<view class="uni-flex searce_moudel">
				<view class="searce_left">
					<image src="../../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<input class="findShop" maxlength="10" placeholder="请输入要搜索的内容" confirm-type='搜索' type="text" @confirm='Search'
					 placeholder-style='color:#cccccc' />
				</view>
			</view>
		</view>
		<view class="content_moudel">
			<!-- 轮播图 -->
			<view class="margin_top3">
				<swiper class="imageContainer" @change="handleChange" circular autoplay>
					<block v-for="(item,index) in imgList" :key="index">
						<swiper-item @click="swiperClick(item.id)">
							<image class="itemImg" :src="item.banner" lazy-load mode="scaleToFill"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>

			<!-- 分类 -->
			<view class="margin_top3">
				<view class="width18 margin_left2 display_inline" v-for="(item,index) in [1,2,3,4,5,6,7,8,9,10]" :key="index">
					<view class="">
						<image src="../../../static/image/pathUrl/tab1.png" mode="" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view class="font_size26">
						数码电器
					</view>
				</view>
			</view>

			<!-- 公告栏 -->
			<view class="uni-flex gong_g_m">
				<view class="img_cnter">
					<image src="../../../static/image/home/notice.png" style="width: 56upx;height: 28upx;" mode=""></image>
				</view>
				<!-- 公告内容 -->
				<view class="uni-swiper-msg margin_left2">
					<swiper class="swiper" vertical="true" autoplay="false" duration="500" interval="4000">
						<swiper-item v-for="(item, index) in msg" :key="index" class="swiper_item_font">
							<view @tap="notice(item.id)">{{item.content}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 公告栏end -->


			<!-- 广告图 -->
			<image class="margin_top3" style="height:172upx;width: 100%;" :src="imgList[1].banner" mode=""></image>

			<!-- 推荐购买 -->

			<view class="hot_moudel">
				<view class="display_flex">
					<!-- 左面 -->
					<view class="width50" style="border-right: 1px solid #DEDEDE;">
						<view class="display_flex">
							<view class="font_size28 font_weight600">
								今日热销
							</view>
							<view class="font_size22 font_colorde hot_product_title">
								抢超值好货
							</view>
						</view>
						<view class="display_flex">
							<view class=" width40">
								<image :src="imgList[1].banner" class="hot_img_one" mode=""></image>
							</view>
							<view class=" width40 margin_left5">
								<image :src="imgList[0].banner" class="hot_img_one" mode=""></image>
							</view>
						</view>
					</view>
					<!-- 右边 -->
					<view class="width50 margin_left5">
						<view class="display_flex">
							<view class="font_size28 font_weight600">
								必买清单
							</view>
							<view class="font_size22 font_colorde hot_product_title">
								什么都值得买
							</view>
						</view>
						<view class="display_flex">
							<view class=" width40 hot_img_one">
								<image :src="imgList[1].banner" class="image_width_height100" mode=""></image>
							</view>
							<view class=" width40 hot_img_one margin_left5">
								<image :src="imgList[0].banner" class="image_width_height100" mode=""></image>
							</view>
						</view>

					</view>
				</view>
				<view class="display_flex" style="border-top: 1px solid #DEDEDE;">
					<!-- 左面 -->
					<view class="width50 padding_top3" style="border-right: 1px solid #DEDEDE;height: 200upx;">
						<view class="display_flex">
							<view class="width40">
								<view class="font_size28 font_weight600">
									每日必吃
								</view>
								<view class="font_size22 font_color99">
									零食都在这
								</view>
								<view class="hot_img_two ">
									<image :src="imgList[0].banner" class="image_width_height100" mode=""></image>
								</view>
							</view>
							<view class="width50 hot_img_two_right margin_left5">
								<image :src="imgList[1].banner" class="image_width_height100" mode=""></image>
							</view>
						</view>
					</view>

					<!-- 右边 -->
					<view class="width50 margin_left5 padding_top3" style="height: 200upx;">
						<view class="display_flex">
							<view class="width40">
								<view class="font_size28 font_weight600">
									发现好货
								</view>
								<view class="font_size22 font_color99">
									高品质生活
								</view>
								<view class="hot_img_two ">
									<image :src="imgList[0].banner" class="image_width_height100" mode=""></image>
								</view>
							</view>
							<view class="width50 hot_img_two_right margin_left5">
								<image :src="imgList[1].banner" class="image_width_height100" mode=""></image>
							</view>
						</view>
					</view>

				</view>
			</view>

			<!-- 精调细选 -->
			<view class="">
				<view class="display_flex">
					<view class="font_size30 font_weight600">
						精挑细选
					</view>
					<view class="font_size22 font_color99 font_weight600 margin_left3" style="margin-top: 1%;">
						你的生活美学指南
					</view>
				</view>
				
				<view class="margin_top3">
					<swiper class="bottom_imageContainer" @change="handleChange" circular autoplay>
						<block v-for="(item,index) in imgList" :key="index">
							<swiper-item @click="swiperClick(item.id)">
								<image class="bottom_itemImg" :src="item.banner" lazy-load mode="scaleToFill"></image>
							</swiper-item>
						</block>
					</swiper>
				</view>
				
			</view>
		</view>

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
				msg: [{
					content: '1'
				}, {
					content: '2'
				}, {
					content: '1'
				}, {
					content: '1'
				}],
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			Search(e) {
				console.log(e);
			},
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
			init() {

			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F8F8F8;
	}

	.content_moudel {
		width: 94%;
		margin-left: 3%;
	}

	// .title_top {
	// 	height: 40upx;
	// 	width: 100%;
	// 	background: rgba(0, 0, 0, 0.4);

	// }

	.top_border {
		// border-top: 1px solid #CCCCCC;
		margin-top: 2%;
	}

	// // 搜索框
	// .searce_moudel {
	// 	width: 94%;
	// 	margin-left: 3%;
	// 	// margin-top: 3%;
	// 	-moz-box-shadow: 0px 5px 5px #CCCCCC;
	// 	-webkit-box-shadow: 0px 0px 5px #CCCCCC;
	// 	box-shadow: 0px 0px 5px #CCCCCC;
	// 	height: 60upx;
	// 	border-radius: 40upx;
	// 	line-height: 60upx;
	// }

	// .searce_left {
	// 	width: 5%;
	// 	margin-left: 2%;
	// 	margin-top: 1%;

	// }

	// .searce_right {
	// 	margin-top: 1%;
	// 	margin-left: 2%;
	// }

	// .searce_width {
	// 	width: 34upx;
	// 	height: 34upx;
	// 	margin-top: 1%;
	// }

	// 轮播
	.imageContainer {
		width: 100%;
		height: 300upx;
	}

	.itemImg {
		border-top-left-radius: 60upx;
		border-bottom-right-radius: 60upx;
		width: 100%;
		height: 300upx;
	}

	// 广告
	.gong_g_m {
		background: #FFFFFF;
		// padding-top: 2%;
		padding-left: 2%;
		height: 70upx !important;
		margin-top: 3%;
		// border-radius: 20upx;
		border-bottom-left-radius: 40upx;
		border-top-right-radius: 40upx;
	}

	.img_cnter {
		text-align: center;
		height: 40upx;
		width: 20%;
		margin-top: 2%;
		border-right: 1px solid #EBEBEB;
	}

	.swiper_item_font {
		color: #333333;
		font-size: 26upx;
		margin-left: 2%;
	}

	// 热卖商品
	.hot_product_title {
		background: url(../../../static/image/home/hotB.png) no-repeat;
		background-size: 100%, 100%;
		height: 30upx;
		width: 144upx;
		text-align: center;
		margin: auto, 0;
		margin-left: 30upx;
		
	}

	.hot_img_one {
		height: 220upx;
	}

	.hot_img_two {
		height: 80upx;
	}

	.hot_img_two_right {
		height: 170upx;
	}
	.hot_moudel{
		background-color: #FFFFFF;
		border-radius: .3rem;
		margin-top: 3%;
		padding: 2%;
	}
	
	.bottom_imageContainer {
		width: 100%;
		height: 300upx;
	}
	
	.bottom_itemImg {
		border-radius: 40upx;
		width: 80%;
		height: 250upx;
	}
	
</style>

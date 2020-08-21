<template>
	<view>
		
		<view class="top_moudel_two" style="padding-top: calc(30upx + var(--status-bar-height));padding-left: 0;padding-right: 0;padding-bottom: 20upx;" v-if="!titleFalg">
			<view class="uni-flex searce_moudel">
				<view class="searce_left">
					<image src="../../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right"   @click="Search">
					<input class="findShop" maxlength="10" disabled="true" placeholder="请输入要搜索的内容" confirm-type='搜索' type="text" @confirm='Search'
					 placeholder-style='color:#cccccc' />
				</view>
			</view>
					
		</view>
		<!-- 搜索框 -->
		<view class="background_colorff padding_top3 padding_bottom3" style="padding-top:calc(30upx +  var(--status-bar-height))">
			<view class="uni-flex searce_moudel">
				<view class="searce_left">
					<image src="../../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right"   @click="Search">
					<input class="findShop" maxlength="10" disabled="true" placeholder="请输入要搜索的内容" confirm-type='搜索' type="text" @confirm='Search'
					 placeholder-style='color:#cccccc' />
				</view>
			</view>
		
		</view>
		<view class="content_moudel">
			<!-- 轮播图 -->
			<view class="margin_top3">
				<swiper class="imageContainer" @change="handleChange" circular autoplay>
					<block v-for="(item,index) in rotationList" :key="index">
						<swiper-item @click="swiperClick(item)">
							<image class="itemImg" :src="item.carousel" lazy-load mode="scaleToFill"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>

			<!-- 分类 -->
			<view class="margin_top3" style="width: 720upx;margin-left: -26upx;">
				<!-- :class="index == 0 || index == 5 ? 'text_left' :'text_right'" -->
				<view @click="goTabCategory(item.id)"  class="width18 text_center margin_left2 display_inline" v-for="(item,index) in tabList" :key="index">
					<view class="">
						<image :src="item.imageUrl" mode="" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view class="font_size26 ">
						{{item.name}}
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
					<swiper class="swiper" vertical="true" autoplay="false" duration="500" interval="2000">
						<swiper-item v-for="(item, index) in msg" :key="index" class="swiper_item_font text_hidden">
							<view @tap="notice(item.id)">{{item.title}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 公告栏end -->


			<!-- 广告图 -->
			<image @click="goActivity(bannerData.id)" class="margin_top3" style="height:172upx;width: 100%;border-radius: 12upx;"
			 :src="bannerData.banner" mode=""></image>

			<!-- 推荐购买 -->

			<view class="hot_moudel" v-if="false">
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
			<!-- 图片展示 -->
			<view class="hot_moudel text_center" v-if="true">
				<view class="uni-flex" style="">
					<view @click="goProductD(hotList[0].spuId)" class="" style="border-right: 1px solid #DEDEDE;border-bottom: 1px solid #DEDEDE;">
						<image :src="hotList[0].image" style="width: 345upx;height: 206upx;border-top-left-radius: 10upx;" mode=""></image>
					</view>
					<view @click="goProductD(hotList[1].spuId)" class="" style="border-bottom: 1px solid #DEDEDE;">
						<image :src="hotList[1].image" style="width: 345upx;height: 206upx;border-top-right-radius: 10upx;" mode=""></image>
					</view>
				</view>
				<view class="uni-flex" style="">
					<view @click="goProductD(hotList[2].spuId)" class="" style="border-right: 1px solid #DEDEDE;">

						<image :src="hotList[2].image" style="width: 345upx;height: 206upx;" mode=""></image>
					</view>
					<view @click="goProductD(hotList[3].spuId)" class="" style="">
					
						<image :src="hotList[3].image" style="width: 345upx;height: 206upx;" mode=""></image>
					</view>
				</view>

			</view>

			<!-- 精调细选 -->
			<view class="margin_top3">
				<view class="display_flex">
					<view class="font_size30 font_weight600">
						精挑细选
					</view>
					<view class="font_size22 font_color99  margin_left3" style="margin-top: 1%;">
						你的生活美学指南
					</view>
				</view>


			</view>
		</view>
		<!-- 底部滑块 -->
		<view class="margin_top3">
			<!-- <swiper class="bottom_imageContainer" @change="handleChange" circular autoplay>
					<block v-for="(item,index) in imgList" :key="index">
						<swiper-item @click="swiperClick(item.id)" >
							<image class="bottom_itemImg" :src="item.banner" lazy-load mode="scaleToFill"></image>
						</swiper-item>
					</block>
				</swiper>
			 -->
			<!-- <customSwiper :swiper-list="imgList" /> -->
			<!-- <scroll-view scroll-x="true" class="wrapper">
				<view class="uni-flex " v-for="(item,index) in newlist" :key="index">
					<view class="width50">
						<image :src="item.image" @click="goProductD(item.id)" :class="index== 0 ? 'dimgn'  : 'dimg' " mode="">
						</image>
					</view>
					<view class="width45  right_bj " style="white-space: normal;">
						<view class=" text_hidden2">
							{{item.title}}
						</view>
						<view class="margin_top2 text_hidden2">
							{{item.subTitle}}
						</view>
					</view>
				</view>
			</scroll-view> -->



			<scroll-view scroll-x="true" class="wrapper">
				<!-- <view class="uni-flex"> -->
				<view class="dimg_moudel" v-for="(item,index) in newlist" :key="index">
					<view class="uni-flex" @click="goProductD(item.spuId)">
						<view class="width50">
							<image :src="item.image"  :class="index== 0 ? 'dimgn'  : 'dimg' " mode="">
							</image>
						</view>
						<view class="width45  right_bj font_weight600 " style="white-space: normal;">
							<view class=" text_hidden2 font_size30">
								{{item.title}}
							</view>
							<view class="margin_top2 text_hidden2 font_size24">
								{{item.subTitle}}
							</view>
						</view>
					</view>
				</view>
				<!-- </view> -->
			</scroll-view>
		</view>


	</view>
</template>

<script>
	import customSwiper from '../../../components/blackmonth-swiper/index.vue'
	export default {
		components: {
			customSwiper
		},
		data() {
			return {
				imgList: [{
					banner: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3538793755,2857666234&fm=26&gp=0.jpg'
				}, {
					banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
				}],
				rotationList: '', //轮播数组
				tabList: '', //分类数据
				msg: '', //消息列表
				bannerData: '', //banner
				newlist: '', //新品推荐
				hotList: [
					'../../../static/image/icon/search.png',
					'../../../static/image/icon/search.png',
					'../../../static/image/icon/search.png',
					'../../../static/image/icon/search.png'
				], //人气推荐
				
							titleFalg: true,
			}
		},
		onShow() {
			this.init();
			uni.pageScrollTo({
			scrollTop: 0,
			duration: 100
			});
		},
		onPageScroll(e) {
			// console.log(e)
			e.scrollTop > 80 ? (this.titleFalg = false) : (this.titleFalg = true);
			// console.log(this.titleFalg)
		},
		methods: {
			Search:function(e) {
				console.log(e);
				uni.navigateTo({
					url: '../../search/search'
				})
				// if(e.detail.value){
				// 	uni.navigateTo({
				// 		url: '../../search/search?searchName=' + e.detail.value
				// 	})
				// }
				
			},
			// 轮播滑动操作
			handleChange:function(e) {
				this.currentIndex = e.detail.current;
			},
			// 点击轮播操做
			swiperClick:function(e) {
				console.log(e)
			
				let urlPath
				if (e.type == 1) {
					urlPath = e.url + '?productId=' + e.linkId
				} else {
					urlPath = e.url + '?shopId=' + e.linkId + '&urlFalg=searchList&searchName='
				}
				// 是否登录
				this.$http.get('/api/common/mb/isLogin', '', true).then(res => {
					console.log('000')
					if (res.data.code == 200) {
						if (res.data.data) {
							uni.navigateTo({
								url: urlPath
							})
						} else {
							uni.navigateTo({
								url: '../../login/login'
							})
						}
					}
				})



			},
			
			// 点击分类
			goTabCategory:function(e){
				uni.navigateTo({
					url:'../../categoryOne/categoryOne?categoryId=' + e
				})
			},
			
			//点击信息
			notice:function(e) {
				uni.navigateTo({
					url: '../../headlines/headlines?id=' + e
				})
			},
			// 去产品详情
			goProductD:function(productId) {
				
				uni.navigateTo({
					url: '../../productDetails/productDetails?productId=' + productId
				})
			
			},
			// 去活动详细
			goActivity:function(e) {
				uni.navigateTo({
					url: '../../activity/activity?id=' + e
				})
			},
			
			
			init() {
				// 获取首页轮播
				this.$http.get('/api/common/index/queryIndexCarousel').then(res => {
					if (res.data.code == 200) {
						this.rotationList = res.data.data
					}
				})
				// 获取分类   
				this.$http.get('/api/common/index/queryIndexCategory').then(res => {
					if (res.data.code == 200) {
						this.tabList = res.data.data
					}
				})

				// 获取公告
				this.$http.get('/api/common/index/queryIndexPublish').then(res => {

					if (res.data.code == 200) {
						this.msg = res.data.data
					}
				})
				// 获取barren
				this.$http.get('/api/common/index/queryIndexBanner').then(res => {
					if (res.data.code == 200) {
						this.bannerData = res.data.data
					}
				})
				// 获取人气推荐 
				this.$http.get('/api/common/index/queryIndexPoplar').then(res => {
					if (res.data.code == 200) {
						this.hotList = res.data.data
					}
				})
				// 获取新品推荐
				this.$http.get('/api/common/index/queryIndexNewProduct').then(res => {
					console.log('00')
					if (res.data.code == 200) {
						this.newlist = res.data.data
					}
				})

			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F8F8F8;
	}

	.content_moudel {
		width: 690upx;
		margin-left: 30upx;
	}

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
		box-shadow: 0upx 3upx 6upx 0upx #e8e8e8; 
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

	.hot_moudel {
		background-color: #FFFFFF;
		border-radius: .3rem;
		margin-top: 3%;
		// padding: 30upx;
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


	.wrapper {
		width: 100%;
		white-space: nowrap;
		display: flex;
		margin-top: 2%;
	}

	.dimg_moudel {
		width: 560upx;
		text-align: center;
		margin-left: 20upx;
		height: 250upx;
		display: inline-block;
	}

	.dimg {
		width: 100%;
		height: 250upx;
		border-top-left-radius: 20upx;
		border-bottom-left-radius: 20upx;
		margin-left: 14upx;
	}

	.dimgn {
		width: 100%;
		height: 250upx;
		border-top-left-radius: 20upx;
		border-bottom-left-radius: 20upx;
		margin-left: 3%;
	}

	.right_bj {
		background: url(../../../static/image/beij/home.png) no-repeat;
		width: 310upx;
		height: 250upx;
		background-size: 100% 100%;
		color: #FFFFFF;
		padding: 30upx;
	}
	

</style>

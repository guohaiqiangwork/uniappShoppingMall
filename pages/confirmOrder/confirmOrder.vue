<template>
	<view>
		<view class="page_width">
			<!-- 地址块 -->
			<view class="margin_top3" v-if="addressF" @click="goAddAddress('new')">
				<image src="../../static/image/beij/orderConfirm.png" class="orderimg" mode=""></image>
			</view>

			<view class="margin_top3" v-else style="height: 200upx;" @click="goAddAddress('new')">
				<image src="../../static/image/beij/address.png" mode="" class="image_width"></image>
				<view class="address_order_moudel uni-flex">
					<view class="width15"></view>
					<!-- conter-->
					<view class="width75">
						<view class="uni-flex">
							<view class="font_size32">
								王大锤
							</view>
							<view class="font_size28">
								184****0024
							</view>
						</view>
						<view class="font_size28">
							内蒙古包头市九原区华诚中心A座
							十三层南侧
						</view>

					</view>
					<!-- right -->
					<view class="width10 text_center margin_top8" @click="go">
						<image src="../../static/image/icon/right.png" class="right_img_wi" mode=""></image>
					</view>
				</view>
			</view>

			<!-- 商品块 -->
			<view class="product_moudel_block">
				<view class="uni-flex">
					<view class="">
						<image src="../../static/image/beij/myTopb.png" class="product_img" mode=""></image>
					</view>
					<view class="font_sise28 margin_top1 margin_left3">
						联想官方旗舰店
					</view>
				</view>

				<template v-if="listNumber">
					<view class="uni-flex margin_top3">
						<view class="width30">
							<image src="../../static/image/beij/mybj.png" class="img_product" mode=""></image>
						</view>
						<view class="width65">
							<view class="font_sise28">
								联想拯救者R7000笔记本电脑
							</view>
							<view class="font_size22 font_color99 margin_top3">
								屏幕尺寸：15.6英寸
							</view>

							<view class="font_sise28 font_colorbe width80">
								<text class="font_size26">¥</text>
								4799.00
								<text class="font_size22 font_color99">/件</text>
							</view>

						</view>
						<view class="font_size24 font_color99 margin_top10">
							*1
						</view>
					</view>
				</template>

				<template v-if="!listNumber">
					<view class="uni-flex">
						<scroll-view scroll-x="true" class="wrapper">
							<!-- <view class="uni-flex"> -->
								<view class="dimg_moudel " v-for="(item,index) in [1,2,3,4,5,6,7]" :key="index">
									<view class="">
										<image src="../../static/image/beij/logB.png" class="dimg" mode=""></image>
									</view>
									<view class="">
										4799.00
									</view>
								</view>
							<!-- </view> -->
						</scroll-view>
						<view class="width25 font_size30 text_center" style="align-items: center;padding-top: 40upx;" @click="goInvalidProduct('d')">
							共4件>
						</view>

					</view>

				</template>


			</view>

			<!-- 失效商品 -->
			<view class="uni-flex font_size30   list_one_moudel ">
				<view class="margin_left3 width40">
					失效商品清单
				</view>
				<view class="margin_right3 uni-flex width60" @click="goInvalidProduct('s')">
					<view class="width90 text_right">
						共2件
					</view>
					<view class="margin_top1 margin_left2">
						<image src="../../static/image/icon/right.png" class="right_img_wi" mode=""></image>
					</view>
				</view>
			</view>


			<!-- 优惠卷 -->
			<view class="uni-flex font_size30   list_one_moudel ">
				<view class="margin_left3 width40">
					优惠卷
				</view>
				<view class="margin_right3 uni-flex width60">
					<view class="width90 text_right" @click="openCoupon">
						<text class="font_size22">-￥</text> 10
					</view>
					<view class="margin_top1 margin_left2">
						<image src="../../static/image/icon/right.png" class="right_img_wi" mode=""></image>
					</view>
				</view>
			</view>


			<!-- 金额块 -->
			<view class="price_moudel">
				<view class="uni-flex display_space">
					<view class="">
						商品金额
					</view>
					<view class="">
						<text class="font_size22">¥</text>4799.00
					</view>
				</view>
				<view class="uni-flex display_space margin_top3">
					<view class="">
						运费
					</view>
					<view class="">
						<text class="font_size22">¥</text>4
					</view>
				</view>
				<view class="text_right margin_top3">
					<text class="font_sise28">合计：</text>
					<text class="font_size22 font_colorbe margin_left2">￥</text>
					<text class="font_size30 font_colorbe">4803.00</text>
				</view>
			</view>


			<!-- 底部 -->
			<view class="bottom_proudel uni-flex">
				<view class="font_size28 width60 margin_top3 margin_left3">
					实付款：
					<text class="font_size22 font_colorbe">¥</text>
					<text class="font_colorbe">4803.00</text>
				</view>
				<view class="right_m margin_left3" @click="goPageOrder">
					去支付
				</view>
			</view>

		</view>

		<!-- 优惠券弹窗 -->
		<template v-if="couponFalg">
			<view class="couponMoudel">
				<view class="list_moudel">
					<view class="uni-flex border_bottom padding_bottom2">
						<view class="width80 uni-flex">
							<view class="margin_top2" @click="closeCoupon">
								<image src="../../static/image/icon/close.png" class="close_img" mode=""></image>
							</view>
							<view class="font_size32 margin_left5">
								优惠券
							</view>
						</view>
						<view class="font_size26 font_color66 width20 text_right">
							使用说明
						</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 800upx;">
						<view class="margin_top3 padding_bottom3" @click="switchCoupon(index)" v-for="(item,index) in [1,2,3,4,3]" :key='index'>
							<view :class="couponFalgId == index ? 'yhj_moudel_active' : 'yhj_moudel'  ">
								<view class="uni-flex">
									<view class="width35 text_center">
										<view class="font_size60 ">
											<text class="font_size28">¥</text>30
										</view>
										<view class="font_size20 ">
											满1000元可用
										</view>
									</view>
									<view class="text_center width60 margin_top5">
										<view class="font_size26">
											全额优惠券
										</view>
										<view class="" style="border-top: 1upx solid #333333; width: 30%;margin-left: 35%;"></view>
										<view class="font_size20">
											2020-06-30—2020-07-30
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="btn_bj">
						<view class="moudel_btn1">
							确认
						</view>
					</view>

				</view>
			</view>
		</template>


		<!-- 失效商品 -->
		<template v-if="changeList">
			<view class="couponMoudel">
				<view class="change_moudel">
					<view class="font_size32 text_center border_bottom padding_bottom3">
						以下商品信息发生变动
					</view>
					<scroll-view scroll-y="true" style="max-height: 700upx;">
						<view class="uni-flex product_moudel_list border_bottom" v-for="(item,index) in [1,,4,3,3]" :key="index">
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
					</scroll-view>
					<view class="chang_bottom uni-flex">
						<view class="chang_bottom1" @click="closeMoudel">
							返回购物车确认
						</view>
						<view class="chang_bottom2">
							继续支付订单
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
				addressF: false,
				couponFalg: false, //优惠卷弹窗
				couponFalgId: 0,

				listNumber: false, //商品数量
				changeList: false, //失效商品
			}
		},
		methods: {
			go() {
				console.log('00')
			},
			//优惠券切换
			switchCoupon(index) {
				this.couponFalgId = index
			},
			closeCoupon() {
				this.couponFalg = false
			},
			openCoupon() {
				this.couponFalg = true
			},
			// 去失效商品列表
			goInvalidProduct(falg) {
				uni.navigateTo({
					url: '../invalidProduct/invalidProduct?falg=' + falg
				})
			},
			// 关闭失效
			closeMoudel() {
				this.changeList = false
			},
			// 去支付
			goPageOrder() {
				uni.navigateTo({
					url: '../pageOrder/pageOrder'
				})
			},
			
			// 去添加地址
			goAddAddress(e) {
				console.log(e);
				// uni.redirectTo({
				// 	url: '../addAddress/addAddress?falg=' + e ,
				// });
				uni.navigateTo({
					url:'../addAddress/addAddress?falg=' + e ,
				})
			}
		}
	}
</script>

<style lang="scss">
	.orderimg {
		width: 100%;
		height: 200upx;
	}

	.product_img {
		width: 60upx;
		height: 60upx;
	}

	.product_moudel_block {
		background: #ffffff;
		border-radius: 30upx;
		padding: 30upx;
		margin-top: 30upx;
	}

	.img_product {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}

	.margin_top10 {
		margin-top: 70upx;
	}

	.price_moudel {
		background: #ffffff;
		border-radius: 30upx;
		padding: 30upx;
		font-size: 30upx;
		margin-top: 30upx;
	}

	.bottom_proudel {
		background: #ffffff;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98upx;
		left: 0;
		line-height: 98upx;
	}

	.right_m {
		width: 260upx;
		height: 98upx;
		background: #3c3d3e;
		line-height: 98upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30upx;
	}

	.image_width {
		position: absolute;
		width: 94%;
		height: 200upx;
	}

	.address_order_moudel {
		position: relative;
		width: 100%;
		padding-top: 30upx;
	}

	.right_img_wi {
		width: 16upx;
		height: 28upx;
	}

	.list_one_moudel {
		height: 90upx;
		background: #ffffff;
		border-radius: 30upx;
		align-items: center;
		margin-top: 30upx;
	}

	// 优惠券弹窗
	.couponMoudel {
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
		position: absolute;
		bottom: 0;
		border-radius: 40upx 40upx 0upx 0upx;
		padding: 30upx;
		width: 100%;

	}

	.close_img {
		width: 26upx;
		height: 26upx;
	}


	.yhj_moudel {
		background: url(../../static/image/yhj/0.png) no-repeat;
		height: 160upx;
		background-size: 100% 100%;
	}

	.yhj_moudel_active {
		background: url(../../static/image/yhj/1.png) no-repeat;
		height: 160upx;
		background-size: 100% 100%;
	}

	.btn_bj {
		position: fixed;
		width: 100%;
		background: #ffffff;
		bottom: 0;
		height: 150upx;
	}

	.moudel_btn1 {
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		line-height: 88upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30upx;
		width: 690upx;
		margin-top: 30upx;
	}

	.dimg_moudel {
		width: 130upx;
		text-align: center;
		margin-left: 20upx;
		  display: inline-block;
	}
	

	.dimg {
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
	}

	.change_moudel {
		background-color: #FFFFFF;
		position: absolute;
		top: 10%;
		border-radius: 40upx 40upx 0upx 0upx;
		padding: 30upx;
		width: 94%;
		margin-left: 3%;
	}

	.list_imgp {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}

	.product_moudel_list {
		padding: 20upx;
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 20upx;

	}

	.chang_bottom {
		background-color: #FFFFFF;
		width: 94%;
		position: fixed;
		height: 120upx;
		margin-left: -30upx;
		border-bottom-left-radius: 40upx;
		border-bottom-right-radius: 40upx;
	}

	.chang_bottom1 {
		text-align: center;
		line-height: 80upx;
		font-size: 30upx;
		color: #333333;
		width: 300upx;
		height: 80upx;
		background: #ffffff;
		border: 1px solid #333333;
		border-radius: 10upx;
		margin-left: 5%;
		margin-top: 3%;
	}

	.chang_bottom2 {
		text-align: center;
		line-height: 80upx;
		font-size: 30upx;
		color: #FFFFFF;
		width: 300upx;
		height: 80upx;
		background: #3c3d3e;
		border: 1px solid #333333;
		border-radius: 10upx;
		margin-left: 5%;
		margin-top: 3%;
	}
	.wrapper {
		width: 90%;
		white-space: nowrap;
		display: flex;
		margin-top: 2%;
	}
</style>

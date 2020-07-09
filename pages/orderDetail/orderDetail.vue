<template>
	<view>
		<!-- 待付款 -->
		<view class="orderTop_moudel">
			<view class="uni-flex display_space">
				<view class="font_size32">
					待付款
				</view>
				<view class="font_size24 margin_top1">
					剩余时间：15:00
				</view>
			</view>
			<view class="font_size26">
				请再提交订单后，尽快支付超时将取消订单
			</view>
		</view>
		<!-- 待收货 -->
		<view class="orderTop_moudel margin_top5">
			<view class="uni-flex">
				<view class="width70">
					<view class="font_size32">
						待收货
					</view>
					<view class="font_size30">
						商家已发货，耐心等待收货
					</view>
				</view>
				<view class="width30 uni-flex" style="margin-top: -40upx;">
					<view class="">
						<image src="../../static/image/beij/orders.png" class="topimg" mode=""></image>
					</view>
					<view class="">
						<image src="../../static/image/icon/rightF.png" style="width: 13upx;height: 23upx;margin-top: 70upx;margin-left: 30upx;"
						 mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 已完成 -->
		<view class="orderTop_moudel margin_top5">
			<view class="uni-flex">
				<view class="width70">
					<view class="font_size32">
						待收货
					</view>
					<view class="font_size30">
						商家已发货，耐心等待收货
					</view>
				</view>
				<view class="width30 uni-flex" style="margin-top: -40upx;">
					<image src="../../static/image/beij/ordery.png" class="topimg" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 已取消 -->
		<view class="orderTop_moudel margin_top5" style="background: #3C3D3E;">
			<view class="font_size32">
				已取消
			</view>
			<view class="font_size30">
				订单取消成功
			</view>
		</view>
		
		<!-- 代发货 -->
		<view class="orderTop_moudel margin_top5">
			<view class="uni-flex">
				<view class="width70">
					<view class="font_size32">
						待发货
					</view>
					<view class="font_size30">
						已通知商家，等待商家发货
					</view>
				</view>
				<view class="width30 uni-flex" style="margin-top: -40upx;">
					<image src="../../static/image/beij/orderF.png" class="topimg" mode=""></image>
				</view>
			</view>
		</view>
		

		<view class="page_width padding_bottom3">
			<!-- 地址块 -->
			<view class="margin_top3" style="height: 200upx;">
				<image src="../../static/image/beij/orderDb.png" mode="" class="image_width"></image>
				<view class="address_order_moudel uni-flex">
					<view class="width15"></view>
					<!-- conter-->
					<view class="width80">
						<view class="uni-flex">
							<view class="font_size32">
								王大锤
							</view>
							<view class="font_size28 margin_top1 margin_left3">
								184****0024
							</view>
						</view>
						<view class="font_size28">
							内蒙古包头市九原区华诚中心A座
							十三层南侧
						</view>
					</view>

				</view>
			</view>

			<!-- 列表 -->
			<view class="list_orderD" v-for="(item,index) in [1,2,3]" :key="index">
				<view class="uni-flex">
					<view class="width30">
						<image src="../../static/image/beij/logB.png" class="list_orderD_img" mode=""></image>
					</view>
					<view class="width70">
						<view class="font_sise28">
							联想拯救者R7000笔记本电脑
						</view>
						<view class="uni-flex display_space margin_top3">
							<view class="font_size22 font_color99">
								屏幕尺寸：15.6英寸
							</view>
							<view class="font_size26 font_color66">
								*1
							</view>
						</view>
						<view class="">
							<text class="font_size22 font_colorbe">¥</text>
							<text class="font_colorbe font_size30">4799.00</text>
							<text class="font_size22 font_color99">/件</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 订单某块 -->

			<view class="order_dmoudel">
				<view class="uni-flex font_sise28">
					<view class=" font_color66 width20">
						订单编号
					</view>
					<view class="">
						1234567890
					</view>
				</view>
				<view class="uni-flex font_sise28 margin_top3">
					<view class=" font_color66 width20">
						下单时间
					</view>
					<view class="">
						2020-02-10 12:00:00
					</view>
				</view>
				<view class="uni-flex font_sise28 border_bottom padding_bottom3 margin_top3">
					<view class=" font_color66 width20">
						支付方式
					</view>
					<view class="">
						微信支付
					</view>
				</view>
				<view class="uni-flex font_sise28 border_bottom padding_bottom3 padding_top3 display_space">
					<view class=" font_color66 width20">
						商品总额
					</view>
					<view class="font_size30">
						<text class="font_size22">￥</text> 4799.00
					</view>
				</view>

				<view class="font_size26 margin_left3  text_right padding_top3 ">
					实付款：
					<text class="font_size22 font_colorbe">¥</text>
					<text class="font_colorbe font_size30">4799.00</text>
					<text class="font_size22 font_color99">/件</text>
				</view>

			</view>


			<!-- 底部操作 -->

			<view class="margin_top3 uni-flex display_right">
				<view class="btn_orderd">
					立即评价
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	.orderTop_moudel {
		height: 164upx;
		background: linear-gradient(to right, #ECCB80, #A58747);
		color: #FFFFFF;
		padding: 40upx 40upx 40upx 30upx;
	}

	.topimg {
		width: 170upx;
		height: 160upx;
	}

	.address_order_moudel {
		position: relative;
		width: 100%;
		padding-top: 30upx;
	}

	.image_width {
		position: absolute;
		width: 94%;
		height: 200upx;
	}

	.right_img_wi {
		width: 16upx;
		height: 28upx;
	}

	.list_orderD {
		// width: 690px;
		height: 220upx;
		background: #ffffff;
		border-radius: 20upx;
		margin-top: 20upx;
		padding: 30upx;
	}

	.list_orderD_img {
		width: 150upx;
		height: 150upx;
		border-radius: 10upx;
	}

	.order_dmoudel {
		// width: 690px;
		// height: 387upx;
		background: #ffffff;
		border-radius: 20upx;
		padding: 30upx;
		margin-top: 30upx;
	}

	.btn_orderd {
		width: 180upx;
		height: 60upx;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 60upx;
		color: #FFFFFF;
		font-size: 26upx;
	}
</style>

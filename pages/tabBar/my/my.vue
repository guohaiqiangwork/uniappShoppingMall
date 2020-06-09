<template>
	<view>
		<view class="login">
			<image src="../../../static/image/beij/mybj.png" mode="" class="image_width"></image>
			<view class="login_moudel">
				<!-- 头部操作 -->
				<view class="uni-flex">
					<view class="width80">
						<image src="../../../static/image/icon/msg.png" mode="" class="top_img1"></image>
					</view>
					<view class="">
						<image src="../../../static/image/icon/erw.png" mode="" class="top_img2"></image>
					</view>
					<view class="margin_left8">
						<image src="../../../static/image/icon/set.png" mode="" class="top_img3"></image>
					</view>
				</view>
				<!-- 信息 -->
				<image src="../../../static/image/beij/myTopb.png" mode="" class="image_width_top"></image>
				<view class="image_width_top_moudel">
					<view class="uni-flex">
						<view class="width75">
							 Hi~	王大锤
						</view>
						<view class="">
							<image src="../../../static/image/pathUrl/tab1.png" mode="" class="header_img"></image>
						</view>
					</view>
					
					<view class="font_size24 font_colorff" >
						余额(元)
					</view>
					<view class="font_size44" style="color: #FCD07D;">
						800000
					</view>
					<view class="uni-flex">
						<view class="font_size24 width70">
							累计余额：100,000,00
						</view>
						<view class="left_btn">
							提现
						</view>
					</view>
				</view>
				
				<!-- 订单 -->
				<view class="">
					<view class="display_inline text_center" style="margin-top: 8%;width: 25%;">
						<view class="">
							<image src="../../../static/image/icon/ordeq.png" class="order_width" mode=""></image>
						</view>
						<view class="font_colorfc font_size26">
							全部订单
						</view>
					</view>
					<view class="display_inline text_center" style="margin-top: 8%;width: 25%;">
						<view class="">
							<image src="../../../static/image/icon/orderd.png" class="order_width" mode=""></image>
						</view>
						<view class="font_colorfc font_size26">
							待支付
						</view>
					</view>
					<view class="display_inline text_center" style="margin-top: 8%;width: 25%;">
						<view class="">
							<image src="../../../static/image/icon/orders.png" class="order_width" mode=""></image>
						</view>
						<view class="font_colorfc font_size26">
							待收货
						</view>
					</view>
					<view class="display_inline text_center" style="margin-top: 8%;width: 25%;">
						<view class="">
							<image src="../../../static/image/icon/ordert.png" class="order_width" mode=""></image>
						</view>
						<view class="font_colorfc font_size26">
							退换货
						</view>
					</view>
				</view>
				<!-- 我的团队 -->
				<view class="my_team">
					<view class="uni-flex">
						<view class="font_size30 font_colorff width90" style="margin-left: 20upx;margin-top: 30upx;">
							我的团队
						</view>
						<view class="">
							<image src="../../../static/image/icon/right.png" mode="" class="my_team_img"></image>
						</view>
					</view>
					
					<view class="uni-flex">
						<view class="width33 text_center" style="border-right: 1px solid #999999;">
							<view class="font_size34 font_colorfc">
								3000
							</view>
							<view class="font_size24 font_colorcc">
								总人数
							</view>
						</view>
						<view class="width33 text_center" style="border-right: 1px solid #999999;">
							<view class="font_size34 font_colorfc">
								3000
							</view>
							<view class="font_size24 font_colorcc">
								总交易额
							</view>
						</view>
						<view class="width33 text_center">
							<view class="font_size34 font_colorfc">
								3000
							</view>
							<view class="font_size24 font_colorcc">
								获得分润
							</view>
						</view>
											
					</view>
				</view>
			</view>
	
			<!-- 邀请 -->
			<image src="../../../static/image/beij/myy.png" mode="" style="height: 140upx;width: 94%;margin-left: 3%;margin-top: 3%;"></image>
		
			<view class="text_center margin_top5">
				<image src="../../../static/image/beij/myHot.png" mode="" style="width: 150upx;height: 30upx;"></image>
			</view>
			
			<!-- 列表 -->
			<view class="margin_top3 text_center">
				<view v-for="(item,index) in [1,2,3,4]" :key="index" class="display_inline margin_left3 width45">
					<view class="">
						<image src="../../../static/image/beij/logB.png" class="shop_list_img" mode=""></image>
					</view>
					<view class="font_size30">
						戴森(Dyson)新一代...
					</view>
					<view class="display_flex">
						<view class="font_colorfc font_size28 width66">
							¥3290.00 <text class="font_size22 font_colorcc">/件</text>
						</view>
						<view class="">
							<image src="../../../static/image/pathUrl/tab1.png" class="shop_img" mode=""></image>
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

			}
		},
		methods: {

		}
	}
</script>


<style lang="less">
	page{
		background-color: #FFFFFF;
	}
	.image_width {
		position: absolute;
		width: 100%;
		height: 912upx;
	}

	.login_moudel {
		position: relative;
		width: 94%;
		margin-left: 3%;
		padding-top: 8%;
	}


	.top_img1 {
		width: 40upx;
		height: 34upx;
	}

	.top_img2 {
		width: 36upx;
		height: 34upx;
	}

	.top_img3 {
		width: 40upx;
		height: 36upx;
	}
	
	.image_width_top {
		position: absolute;
		width: 690upx;
		height: 350upx;
		margin-left: 6%;
		margin-top: 56upx;
	}
	.image_width_top_moudel{
		color: #FFFFFF;
		position: relative;
		width: 90%;
		margin-left: 10%;
		margin-top: 11%;
		font-size: 36upx;
		font-weight: 600;
	}
	.header_img{
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}
	.left_btn{
		width: 160upx;
		height: 60upx;
		line-height: 60upx;
		border: 1px solid #FCD07D;
		color: #FCD07D;
		text-align: center;
		border-radius: 40upx;
	}
	.order_width{
		width: 56upx;
		height: 46upx;
	}
	.my_team{
		margin-left: 3%;
		height: 200upx;
		background-color: #303030;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
		margin-top: 45upx;
		width: 94%;
	}
	.my_team_img{
		width: 16upx;
		height: 28upx;
		margin-top: 30upx;
	}
	.shop_list_img{
		height: 329upx;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
	}
	.shop_img{
		width: 45upx;
		height: 45upx;
		border-radius: 50%;
	}
</style>

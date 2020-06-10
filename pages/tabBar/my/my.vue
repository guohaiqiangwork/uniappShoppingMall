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
					<view class="margin_left8" @click="goSet">
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
						{{DD}}
					</view>
					<view class="font_size44" style="color: #FCD07D;">
						{{DD}}
					</view>
					<view class="uni-flex">
						<view class="font_size24 width70">
							{{DD}}
						</view>
						<view class="left_btn">
							{{DD}}
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
							{{DD}}
						</view>
					</view>
					<view class="display_inline text_center" style="margin-top: 8%;width: 25%;">
						<view class="">
							<image src="../../../static/image/icon/orderd.png" class="order_width" mode=""></image>
						</view>
						<view class="font_colorfc font_size26">
							{{DD}}
						</view>
					</view>
					<view class="display_inline text_center" style="margin-top: 8%;width: 25%;">
						<view class="">
							<image src="../../../static/image/icon/orders.png" class="order_width" mode=""></image>
						</view>
						<view class="font_colorfc font_size26">
							{{DD}}
						</view>
					</view>
					<view class="display_inline text_center" style="margin-top: 8%;width: 25%;">
						<view class="">
							<image src="../../../static/image/icon/ordert.png" class="order_width" mode=""></image>
						</view>
						<view class="font_colorfc font_size26">
							{{DD}}
						</view>
					</view>
				</view>
				<!-- 我的家庭成员 -->
				<view class="my_team">
					<view class="uni-flex">
						<view class="font_size30 font_colorff width90" style="margin-left: 20upx;margin-top: 30upx;">
							家庭成员
						</view>
						<view class="">
							<image src="../../../static/image/icon/right.png" mode="" class="my_team_img"></image>
						</view>
					</view>
					
					<view class="uni-flex">
						<view class="width33 text_center" style="border-right: 1px solid #999999;">
							<view class="font_size34 font_colorfc">
								{{DD}}
							</view>
							<view class="font_size24 font_colorcc">
								{{DD}}
							</view>
						</view>
						<view class="width33 text_center" style="border-right: 1px solid #999999;">
							<view class="font_size34 font_colorfc">
								{{DD}}
							</view>
							<view class="font_size24 font_colorcc">
								{{DD}}
							</view>
						</view>
						<view class="width33 text_center">
							<view class="font_size34 font_colorfc">
								{{DD}}
							</view>
							<view class="font_size24 font_colorcc">
								{{DD}}
							</view>
						</view>
											
					</view>
				</view>
			</view>
			
			<!-- 联系我们 -->
			
			<view class="margin_top5">
				<view class="width25 text_center display_inline" v-for="(item,index) in myPhone" :key="index" @click="gotoTele">
					<view class="">
						<image src="../../../static/image/pathUrl/tab1.png" mode="" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view class="font_size26">
						{{item.name}}
					</view>
				</view>
			</view>
	
		
			<view class="text_center margin_top5">
				此块区域待定
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
				DD:'待定',
				myPhone:[
					{name:'联系我们'},
					{name:'关于我们'},
					{name:'意见反亏'},
					{name:'待定'}
				]
				
			}
		},
		methods: {
			/* 联系客服 */
			gotoTele(){
				 uni.makePhoneCall({
				 // 手机号
				phoneNumber: '400-110-120', 
				// 成功回调
				success: (res) => {
						console.log('调用成功!')        
				},
				// 失败回调
				fail: (res) => {
						console.log('调用失败!')
				}
			  });
			},
			goSet(){
				uni.navigateTo({
					url:'../../setUp/setUp'
				})
			}
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

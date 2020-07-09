<template>
	<view>
		<view class="background_colorff">
			<!-- tab 切换 -->
			<view class="padding_top3 padding_bottom3 border_bottom ">
				<view @click="tabSwichThree(index)" :class=" tabIndexT == index ? 'item_tab_three' : 'item_tab_threen' " v-for="(item,index) in tabListThree"
				 :key="index" :style="index == 2 ?'border:none' :'' ">
					<view>
						{{item.name}}
					</view>
					<view :class="tabIndexT == index ? 'bottom_tab' : ''">
					</view>
				</view>
			</view>

		</view>

		<!-- 列表 -->
		<template v-if="tabIndexT == 0">
			<view class="page_width">
				<view class="order_list" @click="goOrderDetail">
					<!-- 标题栏 -->
					<view class="uni-flex">
						<view class="uni-flex width50 ">
							<view class="width20">
								<image src="../../static/image/beij/card2.png" class="order_listimg" mode=""></image>
							</view>
							<view class="width80 text_hidden font_sise28 margin_top2 margin_left5">
								联想官方旗舰店
							</view>
						</view>
						<view class="uni-flex font_size26 display_right width50">
							<view class=" font_colorde width30">已完成</view>
							<view class=" font_color99 width30">待支付</view>
						</view>
					</view>
					<!-- 单个商品 -->
					<view class="" v-if="false">
						<view class="uni-flex">
							<view class="width30">
								<image src="../../static/image/beij/myTopb.png" class="order_productimg" mode=""></image>
							</view>
							<view class="width75">
								<view class="">
									联想拯救者R7000笔记本电脑
								</view>
								<view class="margin_top5">
									屏幕尺寸：15.6英寸
								</view>
								<view class="">
									<text class="font_size22 font_colorbe">¥</text>
									<text class="font_colorbe font_size30">4799.00</text>
									<text class="font_size22 font_color99">/件</text>
								</view>
							</view>
						</view>

					</view>
					<!-- 多个商品 -->
					<view class="" v-if="true" >
						<view class="uni-flex">
							<scroll-view scroll-x="true" class="wrapper">
								<!-- <view class="dimg_moudel "> -->
								<image src="../../static/image/beij/logB.png" class="dimg" mode="" v-for="(item,index) in [1,2,3,4,5,6,7]" :key="index"></image>
								<!-- </view> -->
							</scroll-view>
						</view>

					</view>
					<!-- 总计 -->
					<view class="uni-flex display_right">
						<view class="font_size26 font_color99   margin_top1">
							共5件
						</view>
						<view class="font_size26 margin_left3  text_right">
							实付款：
							<text class="font_size22 font_colorbe">¥</text>
							<text class="font_colorbe font_size30">4799.00</text>
							<text class="font_size22 font_color99">/件</text>
						</view>
					</view>

					<!-- 底部操作栏 -->
					<view class="uni-flex margin_top3 display_right">
						<view class="order_listbtn">
							取消订单
						</view>
						<view class="order_listbtn1 margin_left5">
							立即支付
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
				tabListThree: [{
						name: '全部'
					},
					{
						name: '待支付'
					},
					{
						name: '待发货'
					},
					{
						name: '待收货'
					},
					{
						name: '待评价'
					}

				],
				tabIndexT: 0,
			}
		},
		methods: {
			// tab two
			tabSwichThree: function(index) {
				console.log(index)
				this.tabIndexT = index
			},
			// 去订单详情
			goOrderDetail(){
				uni.navigateTo({
					url:'../orderDetail/orderDetail'
				})
			}
		}
	}
</script>

<style lang="less">
	.item_tab_three {
		display: inline-block;
		width: 20%;
		text-align: center;
		color: #0C0C0C;
		font-size: 30upx;
		height: 40upx;
		line-height: 40upx;
		color: #333333;
	}

	.item_tab_threen {
		display: inline-block;
		width: 20%;
		text-align: center;
		color: #0C0C0C;
		font-size: 30upx;
		height: 40upx;
		line-height: 40upx;
		color: #666666;
	}

	.bottom_tab {
		border: 1px solid #BE8100;
		width: 30%;
		height: 4upx;
		background-color: #BE8100;
		border-radius: 3upx;
		margin-left: 33%;
	}

	.order_list {
		// width: 690upx;
		background: #ffffff;
		border-radius: 30upx;
		padding: 30upx;
		margin-top: 30upx;
	}

	.order_listimg {
		width: 60upx;
		height: 60upx;
	}

	.order_productimg {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}

	.order_listbtn {
		width: 180upx;
		height: 60upx;
		border: 1px solid #3c3d3e;
		border-radius: 10upx;
		font-size: 26upx;
		text-align: center;
		line-height: 60upx;
	}

	.order_listbtn1 {
		width: 180upx;
		height: 60upx;
		background-color: #3c3d3e;
		;
		border-radius: 10upx;
		font-size: 26upx;
		text-align: center;
		line-height: 60upx;
		color: #FFFFFF;
	}

	.wrapper {
		width: 90%;
		white-space: nowrap;
		display: flex;
		margin-top: 2%;
	}

	.dimg {
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
		margin-left: 20upx;
	}
</style>

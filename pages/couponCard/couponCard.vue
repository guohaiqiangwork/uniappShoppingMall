<template>
	<view>


		<view class="background_colorff"  >
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
		<view class="page_width">
			<!-- 可使用 -->
			<template v-if="tabIndexT == 0">
				<view class="margin_top5" v-for="(item,index) in productList" :key="index" @click="goHome">
					<view class="listMOudel">
						<view class="uni-flex">
							<view class="width30 text_center">
								<view class="font_sise28" style="margin-top: 2%;">
									¥<text style="font-size: 69upx">{{item.amount}}</text>
								</view>
								<view class="font_size20" style="margin-top: -20upx;">
									剩余：￥{{item.balance}}
								</view>
							</view>
							<view class="width70 text_center margin_top2">
								<view class="font_sise28" style="margin-top: 30upx;">
									全额优惠券
								</view>
								<view class="" style="width: 30%;margin-left: 35%;border-top: 1px solid #333333;"></view>
								<view class="font_size20">
									{{item.createTime}}
								</view>
								<!-- <view @click="tabSwichThree(index)" class="font_size20 text_right width80" style="color: #6D5523;">
									详情
									<image src="../../static/image/icon/down1.png" style="width: 14upx;height: 8upx;margin-left: 3%;" mode=""></image>
								</view> -->
							</view>
						</view>
					</view>
					<!-- <view v-if="tabIndexT == index" class="font_size24 font_color99 text_center background_colorff padding_top3 padding_bottom3">
						此优惠券于商城内所有商品，满1000元即可享30元抵扣优惠。
						此优惠券限使用一次，自兑换之日起30天内有效
					</view> -->
				</view>
				
				<view v-if="productList.length == 0" class="text_center margin_top18">
					<image src="../../static/image/default/noMoney.png" class="no_img_order" mode=""></image>
					<view class="font_size28 font_color99 margin_top5">
						暂无记录~
					</view>
				</view>

			</template>

			<!-- 已使用 -->
			<template v-if="tabIndexT == 1">
				<view class="margin_top3 background_colorff" v-for="(item,index) in productList" :key="index">
					<view class="listMOudel_use">
						<view class="uni-flex">
							<view class="width30 text_center">
								<view class="font_sise28">
									¥<text style="font-size: 69upx;">{{item.amount}}</text>
								</view>
								<view class="font_size20" style="margin-top: -20upx;">
									剩余：￥{{item.balance}}
								</view>
							</view>
							<view class="width70 text_center">
								<view class="font_size26" style="margin-top: 30upx;">
									全额优惠券
								</view>
								<view class="" style="width: 30%;margin-left: 33%;border-top: 1px solid #999999;"></view>
								<view class="font_size20">
									{{item.createTime}}
								</view>
								<!-- <view @click="tabSwichThree(index)" class="font_size20 text_right margin_right3">
									详情
									<image src="../../static/image/icon/down2.png" style="width: 14upx;height: 8upx;margin-left: 3%;" mode=""></image>
								</view> -->
							</view>
						</view>
					</view>
				<!-- 	<view v-if="tabIndexT == index" class="font_size24 font_color99 text_center background_colorff padding_top3 padding_bottom3">
						此优惠券于商城内所有商品，满1000元即可享30元抵扣优惠。
						此优惠券限使用一次，自兑换之日起30天内有效
					</view> -->
				</view>
				
				<view v-if="productList.length == 0" class="text_center margin_top18">
					<image src="../../static/image/default/noMoney.png" class="no_img_order" mode=""></image>
					<view class="font_size28 font_color99 margin_top5">
						暂无记录~
					</view>
				</view>

			</template>


			<!-- 已过期 -->
			<template v-if="tabIndexT == 2">
				<view class="margin_top3 background_colorff" v-for="(item,index) in productList" :key="index">
					<view class="listMOudel_over">
						<view class="uni-flex">
							<view class="width30 text_center">
								<view class="font_sise28">
									¥<text style="font-size: 69upx;">{{item.amount}}</text>
								</view>
								<view class="font_size20" style="margin-top: -20upx;">
									剩余：￥{{item.balance}}
								</view>
							</view>
							<view class="width70 text_center">
								<view class="font_size26" style="margin-top: 30upx;">
									全额优惠券
								</view>
								<view class="" style="width: 30%;margin-left: 33%;border-top: 1px solid #999999;"></view>
								<view class="font_size20">
									{{item.createTime}}
								</view>
								<!-- <view @click="tabSwichThree(index)" class="font_size20 text_right margin_right3">
									详情
									<image src="../../static/image/icon/down2.png" style="width: 14upx;height: 8upx;margin-left: 3%;" mode=""></image>
								</view> -->
							</view>
						</view>
					</view>
					<!-- <view v-if="tabIndexT == index" class="font_size24 font_color99 text_center background_colorff padding_top3 padding_bottom3">
						此优惠券于商城内所有商品，满1000元即可享30元抵扣优惠。
						此优惠券限使用一次，自兑换之日起30天内有效
					</view> -->
				</view>
				
				<view v-if="productList.length == 0" class="text_center margin_top18">
					<image src="../../static/image/default/noMoney.png" class="no_img_order" mode=""></image>
					<view class="font_size28 font_color99 margin_top5">
						暂无记录~
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
				tabListThree: [{
						name: '可使用'
					},
					{
						name: '已使用'
					},
					{
						name: '已过期'
					},
				],
				tabIndexT: 0,
				productList:'',
				status:1
			}
		},
		mounted() {
			this.getMoneyList()
		},
		methods: {
			
			// 获取列表
			getMoneyList: function() {
				var data = {
					limit: 20,
					mbId: uni.getStorageSync('userId'),
					page: 1,
					status:this.status
				}
				this.$http.get('/api/coupon/list', data, true).then(res => {
					if (res.data.code == 200) {
							this.productList = res.data.data
					}
				})
			},
			
			goHome:function(){
				uni.switchTab({
					url:'../tabBar/home/home'
				})
			},
			// tab two
			tabSwichThree: function(index) {
				console.log(index)
				this.tabIndexT = index;
				this.status =index +1 ;
				this.getMoneyList()
			},
			// listTab:function(){

			// }
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.item_tab_three {
		display: inline-block;
		width: 33%;
		text-align: center;
		font-size: 30upx;
		height: 40upx;
		line-height: 40upx;
		color: #333333;
			font-weight: 700;
	}

	.item_tab_threen {
		display: inline-block;
		width: 33%;
		text-align: center;
		font-size: 30upx;
		height: 40upx;
		line-height: 40upx;
		color: #999999;
	}

	.bottom_tab {
		border: 1px solid #BE8100;
		width: 30%;
		height: 4upx;
		background-color: #BE8100;
		border-radius: 3upx;
		margin-left: 35%;
	
	}

	.listMOudel {
		background: url(../../static/image/beij/card1.png) no-repeat;
		background-size: 100% 100%;
		height: 180upx;
		margin-top: 20upx;
	}

	.listMOudel_use {
		background: url(../../static/image/beij/card2.png) no-repeat;
		background-size: 100% 100%;
		height: 180upx;
		color: #999999;
		margin-top: 20upx;
	}

	.listMOudel_over {
		background: url(../../static/image/beij/card3.png) no-repeat;
		background-size: 100% 100%;
		height: 180upx;
		margin-top: 20upx;
		color: #999999;
	}
</style>

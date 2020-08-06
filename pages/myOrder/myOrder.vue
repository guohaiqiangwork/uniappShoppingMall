<template>
	<view>
		<view class="background_colorff">
			<!-- tab 切换 -->
			<view class="padding_top3 padding_bottom3 border_bottom ">
				<view @click="tabSwichThree(index)" :class=" tabIndexT == index  ? 'item_tab_three' : 'item_tab_threen' " v-for="(item,index) in tabListThree"
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
		<template>
			<view class="page_width">
				<view class="order_list" v-if="goodRecommendList.length > 0" v-for="(item,index) in goodRecommendList" :key="index">
					<!-- 标题栏 -->
					<view class="uni-flex">
						<view class="uni-flex width50 ">
							<view class="width20" @click="goOrderDetail(item.orderId)">
								<image :src="item.storeLogo" class="order_listimg" mode=""></image>
							</view>
							<view class="width80  font_sise28 margin_top2 margin_left5 uni_flex_hidden font_weight600" >
								{{item.storeName}}
							</view>
						</view>
						<view class="uni-flex font_size26 display_right width50">

							<view class="font_colorde" v-if="item.status == 1">待支付</view>
							<view class="font_colorde" v-if="item.status == 2">待发货</view>
							<view class="font_colorde" v-if="item.status == 3">待收货</view>
							<view class="font_color99 width30" v-if="item.status == 4">已完成</view>
							<view class=" font_colorde width30" v-if="item.status == 4">待评价</view>
							<view class="font_color99 margin_right3" v-if="item.status == 5">已取消</view>
							<view class="font_colorde" v-if="item.status == 5" @click="deldectOrder(item)">
								<image src="../../static/image/icon/sdelect.png" style="width: 26upx;height: 26upx;margin-top: 1%;" mode=""></image>
							</view>
							<view class="font_color99" v-if="item.status == 6">已完成</view>




						</view>
					</view>
					<!-- 单个商品 -->
					<view class="" v-if="item.orderDetails.length  == 1">
						<view class="uni-flex" @click="goOrderDetail(item.orderId)" v-for='(items,index) in item.orderDetails' :key="index">
							<view class="width30" >
								<image :src="items.image" class="order_productimg" mode=""></image>
							</view>
							<view class="width75">
								<view class="text_hidden">
									{{items.title}}
								</view>
								<view class="margin_top5 font_size22 font_color99">
									{{items.ownSpecMap}}
								</view>
								<view class="">
									<text class="font_size22  font_colorbe">¥</text>
									<text class="font_colorbe font_weight600 font_size30">{{items.price}}</text>
									<text class="font_size22 font_color99">/件</text>
								</view>
							</view>
						</view>

					</view>
					<!-- 多个商品 -->
					<view class="" v-else>
						<view class="uni-flex">
							<scroll-view scroll-x="true" class="wrapper">

								<image @click="goOrderDetail(item.orderId)" :src="items.image" class="dimg" mode="" v-for='(items,index) in item.orderDetails' :key="index"></image>

							</scroll-view>
						</view>

					</view>
					<!-- 总计 -->
					<view class="uni-flex display_right">
						<view class="font_size26 font_color99   margin_top1">
							共{{item.goodsNum}}件
						</view>
						<view class="font_size26 margin_left3  text_right">
							实付款：
							<text class="font_size22 font_colorbe">¥</text>
							<text class="font_colorbe font_size30 font_weight600">{{item.payment}}</text>
							<!-- <text class="font_size22 font_color99">/件</text> -->
						</view>
					</view>

					<!-- 底部操作栏 -->
					<view class="uni-flex margin_top3 display_right" v-if="item.status == 1">
						<view class="order_listbtn" @click="getCancelOrder(item)">
							取消订单
						</view>
						<view class="order_listbtn1 margin_left5" @click="goTobuy(item)">
							立即支付
						</view>
					</view>
					<view class="uni-flex margin_top3 display_right" v-if="item.status == 3">
						<view class="order_listbtn" @click="goToLogisticsPage(item)">
							查看物流
						</view>
						<view class="order_listbtn1 margin_left5" @click="confirmReceipt(item)">
							确认收货
						</view>
					</view>
					<view class="uni-flex margin_top3 display_right" v-if="item.status == 4">
						<view class="order_listbtn1 margin_left5" @click="goCommentOrder(item)">
							立即评价
						</view>
					</view>
				</view>

				<view v-if="goodRecommendList.length == 0" class="text_center margin_top18">
					<image src="../../static/image/default/noOrder.png" class="no_img_msg" mode=""></image>
					<view class="font_size28 font_color99 margin_top5">
						暂无订单~
					</view>
				</view>

				<view class="" v-if="goodRecommendList.length > 0">
					<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
				</view>

			</view>


		</template>
		
		
		<!-- 提示框 -->
		<template v-if="pfalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">
						确认要{{delectItem}}该订单吗？
					</view>
					<view class="uni-flex " style="margin-top: 80upx;">
						<view class="leftbtn" @click="closemoudel">
							取消
						</view>
						<view class="rightbtn" @click="okMoudel">
							确认
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
				status: 'more',
				statusTypes: [{
					value: 'more',
					text: '加载前'
				}, {
					value: 'loading',
					text: '加载中'
				}, {
					value: 'noMore',
					text: '没有更多'
				}],
				contentText: {
					contentdown: '没有更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				pageNum: 1, //页码
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
				tabIndexT: '',
				goodRecommendList: '',
				pfalg:false,
				delecctOrderId:'',
				delectItem:''
			}
		},

		onLoad(option) {
			console.log(option.orderType);
			option.orderType == 0 ? this.tabIndexT = '' : this.tabIndexT = option.orderType
		},
		mounted() {
			
		},
		onShow() {
			this.goodRecommendList = [];
			this.getMyorderList()
		},
		onBackPress() {
			console.log('999');
			uni.switchTab({
				url:'../tabBar/my/my'
			})
			return true;
		},
		// 上拉加载
		onReachBottom() {
			let _self = this
			this.status = 'loading'
			// uni.showNavigationBarLoading()
			this.pageNum = this.pageNum + 1;
			this.getMyorderList()
			_self.status = 'more'
			// uni.hideNavigationBarLoading()
		},
		methods: {
			// tab two
			tabSwichThree: function(index) {
				index == 0 ? this.tabIndexT = '' : this.tabIndexT = index
				this.goodRecommendList = [];
				this.getMyorderList()
			},
			// 获取订单数据
			getMyorderList: function() {
				var data = {
					limit: '10',
					mbId: uni.getStorageSync('userId'),
					page: this.pageNum,
					status: this.tabIndexT
				}

				this.$http.get('/api/order/list', data, true).then(res => {
					if (res.data.code == 200) {
						if (this.pageNum > 1) {
							if (res.data.data.length > 0) {
								this.goodRecommendList = this.goodRecommendList.concat(res.data.data);
							}
						} else {
							this.goodRecommendList = res.data.data
						}
					}
				});


			},

			// 去订单详情
			goOrderDetail: function(orderId) {
				uni.navigateTo({
					url: '../orderDetail/orderDetail?orderId=' + orderId

				})
			},
			// 待评价
			goCommentOrder: function(item) {
				// console.log(item);
				// return;
				if(item.orderDetails.length > 1){
					uni.navigateTo({
						url: '../commentOrder/commentOrder?orderId=' + item.orderId
					})
				}else{
					uni.navigateTo({
						url:'../comment/comment?orderDetailId=' + item.orderDetails[0].id + '&orderId=' + item.orderId,
						})
				}
				
			},
			// 立即支付
			goTobuy: function(item) {
				var data = {
					closeTime: item.closeTime,
					orderId: item.orderId,
					orderNo: item.orderNo,
					payment: item.payment
				}
				console.log(data)
				uni.navigateTo({
					url: '../pageOrder/pageOrder?payData=' + JSON.stringify(data)
				})
			},
			
			
			// 取消订单
			getCancelOrder: function(item) {
				this.delecctOrderId  = item.orderId;
				this.pfalg = true,
				this.delectItem = '取消'
				// var data = {
				// 	orderId: item.orderId
				// }
				// this.$http.get('/api/order/cancel', data, true).then(res => {
				// 	if (res.data.code == 200) {
				// 		this.getMyorderList(); //刷新列表
				// 	}
				// });

			},
			// 删除订单
			deldectOrder: function(item) {
				this.delecctOrderId  = item.orderId;
				this.pfalg = true,
				this.delectItem = '删除'
				
			},
			closemoudel:function(){
			this.pfalg =false	
			},
			okMoudel:function(){
				if(this.delectItem == '删除'){
					var data = {
						orderId: this.delecctOrderId 
					}
					this.$http.get('/api/order/delete', data, true).then(res => {
						if (res.data.code == 200) {
							this.getMyorderList(); //刷新列表
						}
					});
				}else{
					var data = {
						orderId: this.delecctOrderId
					}
					this.$http.get('/api/order/cancel', data, true).then(res => {
						if (res.data.code == 200) {
							this.getMyorderList(); //刷新列表
						}
					});
				}
				this.pfalg =false
			},
			// 确认订单   
			confirmReceipt: function(item) {
				var _this =this
				var data = {
					orderId: item.orderId
				}
				this.$http.get('/api/order/confirmReceipt', data, true).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						_this.getMyorderList(); //刷新列表
					}
				});
			},
			
			// 去物流详情
			goToLogisticsPage:function(item){
				uni.navigateTo({
					url: '../logisticsPage/logisticsPage?orderId=' + item.orderId
				})
			},


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
		font-weight: 700 !important;
	}

	.item_tab_threen {
		display: inline-block;
		width: 20%;
		text-align: center;
		font-size: 30upx;
		height: 40upx;
		line-height: 40upx;
		color: #666666;
	}

	.bottom_tab {
		border: 1px solid #BE8100;
		width: 35%;
		height: 4upx;
		background-color: #BE8100;
		border-radius: 3upx;
		margin-left: 33%;
		margin-top: -2%;
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
		border-radius: 6upx;
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
		width: 98%;
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
	.product_content_block {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		height: 362upx;
		width: 600upx;
		margin-left: 75upx;
	}
	
	.leftbtn {
		width: 220upx;
		height: 78upx;
		border: 1px solid #3c3d3e;
		border-radius: 10px;
		text-align: center;
		color: #3C3D3E;
		line-height: 78upx;
		margin-left: 45upx;
	}
	
	.rightbtn {
		width: 220upx;
		height: 78upx;
		background: #3c3d3e;
		border-radius: 10px;
		color: #FFFFFF;
		text-align: center;
		line-height: 78upx;
		margin-left: 45upx;
	}
	
</style>

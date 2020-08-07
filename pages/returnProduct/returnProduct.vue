<template>
	<view>
		<view class="background_colorff" style="position: fixed;width: 100%; background-color: #ffffff;z-index: 9;margin-top: -20upx;">
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

		<!-- 可申请列表 -->
		<template v-if="tabIndexT == 0">
			<view class="page_width" style="padding-top: 70upx;">
				<template v-if="applyOrderList.length > 0">
					<view class="order_list"  v-for="(item,index) in applyOrderList" :key="index">
						<!-- 标题栏 -->
						<view class="uni-flex">
							<view class="uni-flex width50 ">
								<view class="width20">
									<image :src="item.storeLogo" class="order_listimg" mode=""></image>
								</view>
								<view class="width80 text_hidden font_sise28 margin_top2 margin_left5">
									{{item.storeName}}
								</view>
							</view>
							<view class="uni-flex font_size26 display_right width50">

								<view class="font_colorde" v-if="item.status == 1">待支付</view>
								<view class="font_colorde" v-if="item.status == 2">待发货</view>
								<view class="font_colorde" v-if="item.status == 3">待收货</view>
								<view class=" font_color99 width30" v-if="item.status == 4">已完成</view>
								<view class=" font_colorde width30" v-if="item.status == 4">待评价</view>
								<view class="font_colorde margin_right3" v-if="item.status == 5">已取消</view>
								<view class="font_colorde" v-if="item.status == 5" @click="deldectOrder(item)">
									<image src="../../static/image/icon/sdelect.png" style="width: 26upx;height: 26upx;margin-top: 1%;" mode=""></image>
								</view>
								<view class="font_colorde" v-if="item.status == 6">已完成</view>

							</view>
						</view>
						<!-- 单个商品 -->
						<view class="" v-if="item.details.length == 1">
							<view class="uni-flex" v-for="(items,index) in item.details" :key="index" @click="goOrder(item.orderId)">
								<view class="width30">
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
										<text class="font_size22 font_colorbe">¥</text>
										<text class="font_colorbe font_size30 font_weight600">{{items.price}}</text>
										<text class="font_size22 font_color99">/件</text>
									</view>
								</view>
							</view>

						</view>
						<!-- 多个商品 -->
						<view class="" v-if="item.details.length > 1">
							<view class="uni-flex" @click="goOrder(item.orderId)">
								<scroll-view scroll-x="true" class="wrapper">

									<image :src="items.image" class="dimg" mode="" v-for="(items,index) in  item.details" :key="index"></image>

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
								<text class="font_size22 font_color99">/件</text>
							</view>
						</view>

						<!-- 底部操作栏 -->
						<view class="uni-flex margin_top3 display_right" @click="goOrderDetail(item.orderId)">
							<view class="order_listbtn1" v-if="item.status == 4 || item.status == 6">
								退换货
							</view>
							<view class="order_listbtn1 margin_left5" v-if="item.status == 2">
								退款
							</view>
						</view>



					</view>


				</template>

				<view v-if="applyOrderList.length == 0" class="text_center margin_top18">
					<image src="../../static/image/default/noMsg.png" class="no_img_msg" mode=""></image>
					<view class="font_size28 font_color99 margin_top5">
						暂无消息~
					</view>
				</view>
			</view>
		</template>
		
		
		
		<!-- 申请记录 -->
		<template v-if="tabIndexT == 1">
			<view class="page_width" style="padding-top: 70upx">
				<view v-if="applyRecordList.length > 0" class="order_list"  v-for="(item,index) in applyRecordList" :key="index">
					<!-- 标题栏 -->
					<view class="uni-flex" @click="goAfter(item.retId)">
						<view class="uni-flex width50 ">
							<view class="width20">
								<image :src="item.storeLogo" class="order_listimg" mode=""></image>
							</view>
	
							<view class="width80  font_sise28 margin_top2 margin_left5 uni_flex_hidden font_weight600" >
								{{item.storeName}}
							</view>
						</view>
						<view class="uni-flex font_size26 display_right width50">
				
							<view class="font_colorde" v-if="item.retStatus == 1">待审核</view>
							<view class="font_colorde" v-if="item.retStatus == 2">审核通过</view>
							<view class="font_colorde" v-if="item.retStatus == 3">审核未通过</view>
							<view class=" font_color99 width30" v-if="item.retStatus == 4">已退款</view>
							<view class="font_colorde margin_right3" v-if="item.retStatus == 5">已取消</view>
							<view class="font_color99" v-if="item.retStatus == 6">已完成</view>
				
						</view>
					</view>
					<!-- 单个商品 -->
					<view class="" v-if="item.returnDetails.length == 1">
			
						<view class="uni-flex" v-for="(items,index) in item.returnDetails" :key="index" >
							<view class="width30">
								<image :src="items.image" class="order_productimg" mode=""></image>
							</view>
							<view class="width75">
								<view class="text_hidden">
									{{items.title}}
								</view>
								<view class="margin_top5">
									{{items.ownSpecMap}}
								</view>
								<view class="">
									<text class="font_size22 font_colorbe">¥</text>
									<text class="font_colorbe font_size30 font_weight600">{{items.price}}</text>
									<text class="font_size22 font_color99">/件</text>
								</view>
							</view>
						</view>
				
					</view>
					<!-- 多个商品 -->
					<view class="" v-if="item.returnDetails.length > 1">
						<view class="uni-flex" >
							<scroll-view scroll-x="true" class="wrapper">
				
								<image :src="items.image" class="dimg" mode="" v-for="(items,index) in  item.returnDetails" :key="index"></image>
				
							</scroll-view>
						</view>
				
					</view>
					<!-- 总计 -->
					<view class="uni-flex display_right">
						<view class="font_size26 font_color99   margin_top1">
							共{{item.num}}件
						</view>
						<view class="font_size26 margin_left3  text_right">
							实付款
							<text class="font_colorbe font_size34" :style="item.retStatus == 4 ? 'color:#999999' : 'color:#BE8100'">{{item.retPrice}}</text>
	
						</view>
					</view>
				
					<!-- 底部操作栏 -->
					<view class="uni-flex margin_top3 display_right">
						<view class="order_listbtn1" v-if="item.retStatus == 2" @click="saveLogisticsFalg(item.retId)">
							填写物流单号
						</view>
						<view class="order_listbtn1 margin_left5" @click="getApplyCancel(item.retId)" v-if="item.retStatus == 1 || item.retStatus == 3">
							取消申请
						</view>
					</view>
				
				
				
				</view>


				<view v-if="applyRecordList.length == 0" class="text_center margin_top18">
					<image src="../../static/image/default/noMsg.png" class="no_img_msg" mode=""></image>
					<view class="font_size28 font_color99 margin_top5">
						暂无消息~
					</view>
				</view>

			</view>
		</template>

		<view v-if="applyRecordList.length > 9 || applyOrderList.length > 9" >
			<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
		</view>
		
		<!-- 提示框 -->
		<template v-if="pfalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">
						是否取消申请
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
		<!-- 填写物流单号 -->
		<template v-if="logisticsFalg">
			<view class="moudel_content">
				<view class="product_content_block_wu">
					<view class="uni-flex">
						<view class="width33" >
							<image  @click="closelogisticsFalg" src="../../static/image/icon/close.png" style="width: 26upx;height: 26upx;" mode=""></image>
						</view>
						<view class="">
							填写物流单号
						</view>
					</view>
					<view class="text_center margin_top5">
						<input @input="keylogistics" type="text" value="" placeholder="请填写物流单号" placeholder-class="font_size30 font_color99"/>
					</view>
					<view class="margin_top5">
						<view class="rightbtn_one" @click="oklogisticsFalg">
							确认
						</view>
					</view>
				</view>
			</view>
		</template>
		
		
		
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				tabListThree: [{
						name: '可申请订单'
					},
					{
						name: '申请记录'
					}
				],
				tabIndexT: 0,
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

				applyOrderList: [], //可申请订单
				applyRecordList: [],//申请记录
				pfalg:false,
				retId:'',
				logisticsFalg:false,
				logisticsNumber:''
			}
		},
		// 上拉加载
		onReachBottom() {
			let _self = this
			this.status = 'loading'
			// uni.showNavigationBarLoading()
			this.pageNum = this.pageNum + 1;
			this.getApplyOrder(); //调取列表
			_self.status = 'more'
			// uni.hideNavigationBarLoading()
		},
		onShow() {
			this.getApplyOrder() //获取列表
		},
		methods: {
			goOrder:function(orderId){
				console.log(orderId)
				uni.navigateTo({
					url: '../orderDetail/orderDetail?orderId=' + orderId
				
				})
			},
			// tab two
			tabSwichThree: function(index) {
				this.tabIndexT = index;
				this.pageNum = 1;
				if (this.tabIndexT == 0) {
					this.applyOrderList = [];
					this.getApplyOrder()
				} else {
					this.applyRecordList = [];
					this.getApplyRecord()
				}
			},

			//查询可申请订单
			getApplyOrder: function() {
				let _this = this;
				var followData = {
					mbId: uni.getStorageSync('userId'),
					limit: '10',
					page: this.pageNum
				}
				_this.$http.get('/api/retOrder/applyOrder', followData, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res));
						if (this.pageNum > 1) {
							if (res.data.data.length > 0) {
								this.applyOrderList = this.applyOrderList.concat(res.data.data);
							}
						} else {
							this.applyOrderList = res.data.data
						}
					}
				})

			},


			//查询可申请记录
			getApplyRecord: function() {
				let _this = this;
				var followData = {
					mbId: uni.getStorageSync('userId'),
					limit: '10',
					page: _this.pageNum
				}
				_this.$http.get('/api/retOrder/applyRecord', followData, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res));
						if (_this.pageNum > 1) {
							if (res.data.data.length > 0) {
								_this.applyRecordList = _this.applyRecordList.concat(res.data.data);
							}
						} else {
							_this.applyRecordList = res.data.data
						}
					}
				})

			},
			
			
			// 填写物流单号
			keylogistics:function(e){
				this.logisticsNumber = e.detail.value
			},
			saveLogisticsFalg:function(id){
				this.retId = id;
				this.logisticsFalg = true
			},
			oklogisticsFalg:function(){
				var _this = this
				var followData = {
					logistics:this.logisticsNumber,
					retId: this.retId,
				}
				_this.$http.post('/api/retOrder/logistics', followData, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res));
						this.logisticsFalg = false
						this.getApplyRecord()
					}
				})
				
			},
			closelogisticsFalg:function(){
				this.logisticsFalg = false
			},
			
			// 取消申请
			getApplyCancel: function(id) {
				this.retId = id
				this.pfalg = true;
			},
			
			
			// 显示提示
			okMoudel:function(){
				let _this = this;
				var followData = {
					retId: this.retId,
				}
				_this.$http.post('/api/retOrder/cancel', followData, true).then(res => {
					if (res.data.code == 200) {
						this.pfalg = false;
						console.log(JSON.stringify(res));
						this.getApplyRecord();//刷新
					}
				})
			},
			closemoudel:function(){
				this.pfalg = false;
			
			},
	
				
			// 去订单详情
			goOrderDetail:function(orderId) {
				uni.navigateTo({
					url: '../returnProductDetail/returnProductDetail?orderId=' + orderId
				})
			},
			// 待评价
			goCommentOrder:function() {
				uni.navigateTo({
					url: '../commentOrder/commentOrder'
				})
			},
			
			// 去售后详情
			goAfter:function(e){
				uni.navigateTo({
					url:'../afterSaleDetails/afterSaleDetails?id='  + e
				})
			}

			// 
		}
	}
</script>

<style lang="less">
	.item_tab_three {
		display: inline-block;
		width: 50%;
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
		width: 50%;
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
	.product_content_block {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		height: 362upx;
		width: 600upx;
		margin-left: 75upx;
	}
	.product_content_block_wu {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		height: 362upx;
		width: 600upx;
		margin-left: 75upx;
		padding: 30upx;
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
	.rightbtn_one{
		width: 220upx;
		height: 78upx;
		background: #3c3d3e;
		border-radius: 10px;
		color: #FFFFFF;
		text-align: center;
		line-height: 78upx;
		margin-left: 30%;
		margin-top: 50upx;
	}
</style>

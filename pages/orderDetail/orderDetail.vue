<template>
	<view>
		<!-- 待付款 -->
		<view class="orderTop_moudel" v-if="orderDetail.status.status == 1">
			<view class="uni-flex display_space">
				<view class="font_size32">待付款</view>
				<view class="font_size24 margin_top1">剩余时间：{{ timeDom }}</view>
			</view>
			<view class="font_size26">请再提交订单后，尽快支付超时将取消订单</view>
		</view>
		<!-- 代发货 -->
		<view class="orderTop_moudel " v-if="orderDetail.status.status == 2">
			<view class="uni-flex">
				<view class="width70">
					<view class="font_size32">待发货</view>
					<view class="font_size30">已通知商家，等待商家发货</view>
				</view>
				<view class="width30 uni-flex" style="margin-top: -25upx;">
					<image src="../../static/image/beij/orderF.png" style="width: 240upx;height: 160upx;" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 待收货 -->
		<view class="orderTop_moudel " v-if="orderDetail.status.status == 3">
			<view class="uni-flex">
				<view class="width70">
					<view class="font_size32">待收货</view>
					<view class="font_size30">商家已发货，耐心等待收货</view>
				</view>
				<view class="width30 uni-flex" style="margin-top: -30upx;">
					<view class=""><image src="../../static/image/beij/orders.png" class="topimg" mode=""></image></view>
					<view class="" @click="goToLogisticsPage">
						<image src="../../static/image/icon/rightF.png" style="width: 13upx;height: 23upx;margin-top: 70upx;margin-left: 30upx;" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 已完成 -->
		<view class="orderTop_moudel " v-if="orderDetail.status.status == 4 || orderDetail.status.status == 6">
			<view class="uni-flex">
				<view class="width70">
					<view class="font_size32">已完成</view>
					<view class="font_size30">订单已完成</view>
				</view>
				<view class="width30 uni-flex" style="margin-top: -30upx;"><image src="../../static/image/beij/ordery.png" class="topimg" mode=""></image></view>
			</view>
		</view>

		<!-- 已取消 -->
		<view class="orderTop_moudel" style="background: #3C3D3E;" v-if="orderDetail.status.status == 5">
			<view class="font_size32">已取消</view>
			<view class="font_size30">订单取消成功</view>
		</view>

		<view class="page_width padding_bottom3">
			<!-- 地址块 -->
			<view class="" style="height: 200upx;margin-top: 30upx;">
				<image src="../../static/image/beij/orderDb.png" mode="" class="image_width"></image>
				<view class="address_order_moudel uni-flex">
					<view class="width15"></view>
					<!-- conter-->
					<view class="width80">
						<view class="uni-flex">
							<view class="font_size32 font_weight600">{{ orderDetail.mbAddress.name }}</view>
							<view class="font_size28 margin_top1 font_weight600 margin_left3">{{ orderDetail.mbAddress.mobile }}</view>
						</view>
						<view class="font_size28">{{ orderDetail.mbAddress.address }}</view>
					</view>
				</view>
			</view>

			<!-- 列表 -->
			<view class="list_orderD" v-for="(item, index) in orderDetail.details" :key="index">
				<view class="uni-flex">
					<view class="width30"><image :src="item.image" class="list_orderD_img" mode=""></image></view>
					<view class="width70">
						<view class="font_sise28 text_hidden">{{ item.title }}</view>
						<view class="uni-flex display_space margin_top3">
							<view class="font_size22 font_color99">{{ item.ownSpecMap }}</view>
							<view class="font_size26 font_color66">*{{ item.num }}</view>
						</view>
						<view class="">
							<text class="font_size22 font_colorbe">¥</text>
							<text class="font_colorbe font_size30">{{ item.price }}</text>
							<text class="font_size22 font_color99">/件</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 订单某块 -->

			<view class="order_dmoudel">
				<view class="uni-flex font_sise28">
					<view class=" font_color66 width20">订单编号</view>
					<view class="">{{ orderDetail.orderNo }}</view>
				</view>
				<view class="uni-flex font_sise28 margin_top3">
					<view class=" font_color66 width20">下单时间</view>
					<view class="">{{ orderDetail.status.createTime }}</view>
				</view>
				<view class="uni-flex font_sise28 border_bottom padding_bottom3 margin_top3">
					<view class=" font_color66 width20">支付方式</view>
					<view class="" v-if="orderDetail.status.paymentType == 1">
						微信支付
						<!-- {{orderDetail.status.paymentType == 1 ? orderDetail.status.paymentType ='微信支付 ' : orderDetail.status.paymentType == 2 ? orderDetail.status.paymentType ='支付宝支付' : orderDetail.status.paymentType == 3 ? orderDetail.status.paymentType ='余额支付'  : orderDetail.status.paymentType ='优惠券抵扣' }} -->
					</view>
					<view class="" v-if="orderDetail.status.paymentType == 2">支付宝支付</view>
					<view class="" v-if="orderDetail.status.paymentType == 3">余额支付</view>
					<view class="" v-if="orderDetail.status.paymentType == 4">优惠券抵扣</view>
				</view>
				<view class="uni-flex font_sise28 border_bottom padding_bottom3 padding_top3 display_space">
					<view class=" font_color66 width20">商品总额</view>
					<view class="font_size30">
						<text class="font_size22">￥</text>
						{{ orderDetail.totalPrice }}
					</view>
				</view>

				<view class="font_size26 margin_left3  text_right padding_top3 ">
					实付款：
					<text class="font_size22 font_colorbe">¥</text>
					<text class="font_colorbe font_size30 font_weight600">{{ orderDetail.payment }}</text>
					<!-- <text class="font_size22 font_color99">/件</text> -->
				</view>
			</view>

			<!-- 底部操作 -->

			<view class="margin_top3 uni-flex display_right">
				<view class="btn_orderd" v-if="orderDetail.status.status == 4" @click="goCommentOrder(orderDetail)">立即评价</view>
				<view class="btn_orderd" v-if="orderDetail.status.status == 3" @click="confirmReceipt(orderDetail)">确认收货</view>
				<view class="btn_orderd1" v-if="orderDetail.status.status == 1" @click="getCancelOrder(orderDetail)">取消支付</view>
				<view class="btn_orderd" v-if="orderDetail.status.status == 1" @click="goTobuy(orderDetail)">去支付</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderId: '', //订单编号
			orderDetail: {
				mbAddress: {
					name: '',
					address: '',
					mobile: ''
				},
				status: {
					closeTime: ''
				}
			},
			timeDom: ''
		};
	},
	onLoad(option) {
		console.log(option.orderId);
		this.orderId = option.orderId;
	},
	mounted() {
		this.getOrderDetail(); //获取详情
	},
	methods: {
		// 去物流详情
		goToLogisticsPage: function() {
			uni.navigateTo({
				url: '../logisticsPage/logisticsPage?orderId=' + this.orderId
			});
		},
		// 倒计时
		countTime: function(value) {
			var _this = this;
			//获取当前时间
			var date = new Date();
			var now = date.getTime();
			//alert("now=="+now);
			//移动端必须这样写，因为ios不支持日期中间是-链接，会报错
			var endDate = new Date(value);
			var end = endDate.getTime();
			//时间差
			var differTime = end - now;
			var h, m, s;
			if (differTime >= 0) {
				h = Math.floor(differTime / 1000 / 60 / 60);
				m = Math.floor((differTime / 1000 / 60) % 60);
				s = Math.floor((differTime / 1000) % 60);
				h = h < 10 ? '0' + h : h;
				m = m < 10 ? '0' + m : m;
				s = s < 10 ? '0' + s : s;
				if (h < 1) {
					if (m > 15) {
						_this.timeDom = '00:00';
						// console.log(_this.timeDom)
					} else {
						_this.timeDom = m + ':' + s;
						// console.log("剩余时间 " + _this.timeDom)
						//递归调用函数所以是延时器不是定时器
						setTimeout(function() {
							_this.countTime(value);
						}, 1000);
					}
				}
			} else {
				_this.timeDom = '00:00';
				// console.log("剩余时间 " + _this.timeDom)
			}
		},

		// 获取订单数据
		getOrderDetail: function() {
			var data = {
				orderId: this.orderId
			};
			this.$http.get('/api/order/detail', data, true).then(res => {
				if (res.data.code == 200) {
					console.log(JSON.stringify(res));
					this.orderDetail = res.data.data;
					if (this.orderDetail.status.status == 1) {
						this.countTime(new Date(this.orderDetail.status.closeTime.replace(/-/g, '/')).getTime());
					}
				}
			});
		},

		// 确认订单
		confirmReceipt: function(item) {
			var data = {
				orderId: item.orderId
			};
			this.$http.get('/api/order/confirmReceipt', data, true).then(res => {
				if (res.data.code == 200) {
					uni.navigateBack();
				}
			});
		},
		// 立即支付
		goTobuy: function(item) {
			var data = {
				closeTime: item.status.closeTime,
				orderId: item.orderId,
				orderNo: item.orderNo,
				payment: item.payment
			};
			uni.navigateTo({
				url: '../pageOrder/pageOrder?payData=' + JSON.stringify(data)
			});
		},
		// 取消订单
		getCancelOrder: function(item) {
			var data = {
				orderId: item.orderId
			};
			this.$http.get('/api/order/cancel', data, true).then(res => {
				if (res.data.code == 200) {
					this.getMyorderList(); //刷新列表
				}
			});
		},
		// 去评加
		goCommentOrder: function(item) {
			// console.log(item)
			// return
			if (item.details.length > 1) {
				uni.navigateTo({
					url: '../commentOrder/commentOrder?orderId=' + item.orderId
				});
			} else {
				uni.navigateTo({
					url: '../comment/comment?orderDetailId=' + item.details[0].id + '&orderId=' + item.orderId
				});
			}

			// uni.navigateTo({
			// 	url: '../commentOrder/commentOrder?orderId=' + orderId
			// })
		}
	}
};
</script>

<style lang="less">
.orderTop_moudel {
	height: 164upx;
	background: linear-gradient(to right, #eccb80, #a58747);
	color: #ffffff;
	padding: 30upx 40upx 40upx 30upx;
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
	width: 93%;
	height: 200upx;
}

.right_img_wi {
	width: 16upx;
	height: 28upx;
}

.list_orderD {
	// width: 690px;
	// height: 220upx;
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
	color: #ffffff;
	font-size: 26upx;
}
.btn_orderd1 {
	width: 180upx;
	height: 60upx;
	border: 1px solid #3c3d3e;
	border-radius: 10upx;
	text-align: center;
	line-height: 60upx;
	color: #3c3d3e;
	font-size: 26upx;
	margin-right: 5%;
}
</style>

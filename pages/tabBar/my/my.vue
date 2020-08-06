<template>
	<view>
		<view class="login">
			<image src="../../../static/image/beij/mybj.png" mode="" class="image_width"></image>
			<view class="login_moudel">
				<!-- 头部操作 -->
				<view class="uni-flex">
					<view class="width80" @click="goMyPage('msg')">
						<view class="msg_falg" v-if="msgFalg"></view>
						<image src="../../../static/image/icon/msg.png" mode="" class="top_img1"></image>
					</view>
					<view class="" @click="goMyPage('myQRCode')"><image src="../../../static/image/icon/erw.png" mode="" class="top_img2"></image></view>
					<view class="margin_left8" @click="goMyPage('setUp')"><image src="../../../static/image/icon/set.png" mode="" class="top_img3"></image></view>
				</view>
				<!-- 信息 -->
				<image src="../../../static/image/beij/myTopb.png" mode="" class="image_width_top"></image>
				<view class="image_width_top_moudel">
					<view class="uni-flex" style="margin-top: 80upx;">
						<view class="width75 font_size36 margin_top5">Hi~ {{ infoData.nickName }}</view>
						<view class="" style="margin-left: 8%;"><image :src="infoData.headImgurl" mode="" class="header_img"></image></view>
					</view>
					<view class="font_size24 font_colorff" @click="goMyPage('moreThan', infoData.balance)">
						可用余额(元)
						<image src="../../../static/image/icon/rightF.png" style="width: 8upx;height: 14upx;margin-left: 2%;" mode=""></image>
						</view>
					<view class="font_size44" style="color: #FCD07D;font-weight: 700;">{{ infoData.balance }}</view>
					<view class="uni-flex">
						<view style="margin-top: -2%;" class="font_size24 width70">累计余额：{{ infoData.totalIncomeAmount }}</view>
						<view class="left_btn" style="margin-top: -40upx;margin-left: 8%;" @click="goMyPage('withdrawal', infoData.balance)">提现</view>
					</view>
				</view>

				<!-- 订单 -->
				<view class="margin_left2" style="margin-top: 80upx;">
					<view @click="goOrder(item.falg)" class="display_inline text_center width20" v-for="(item, index) in myOrderList" :key="index">
						<view class=""><image :src="item.url" class="order_width" mode=""></image></view>
						<view class="font_colorfc font_size26">{{ item.name }}</view>
					</view>
				</view>

				<!-- 商品关注 -->
				<view class="my_topmoudel">
					<view class="uni-flex">
						<view @click="goMyPage('productFollow')" class="width33 text_center" style="border-right: 1px solid #666666;">
							<view class="font_size34 font_colorfc">{{ followData.goodsNum }}</view>
							<view class="font_size24 font_colorcc">商品关注</view>
						</view>
						<view @click="goMyPage('shopFollow')" class="width33 text_center" style="border-right: 1px solid #666666;">
							<view class="font_size34 font_colorfc">{{ followData.storeNum }}</view>
							<view class="font_size24 font_colorcc">店铺关注</view>
						</view>
						<view @click="goMyPage('couponCard')" class="width33 text_center">
							<view class="font_size34 font_colorfc">{{followData.couponNum}}</view>
							<view class="font_size24 font_colorcc">优惠券</view>
							<!-- {{ followData.couponNum }} -->
						</view>
					</view>
				</view>
			</view>

			<!-- 邀请 -->
			<image @click="goMyPage('myQRCode')" src="../../../static/image/beij/myy.png" mode="" style="height: 140upx;width: 92%;margin-left: 4%;margin-top: 30upx;"></image>

			<!-- 我的团队 -->
			<view class="my_team" @click="goMyPage('myTeam')">
				<view class="uni-flex">
					<view class="font_size30 font_colorff width90" style="margin-left: 30upx;margin-top: 20upx;">我的团队</view>
					<view class=""><image src="../../../static/image/icon/right.png" mode="" class="my_team_img"></image></view>
				</view>

				<view class="uni-flex">
					<view class="width50 text_center" style="border-right: 1px solid #999999;">
						<view class="font_size34 font_colorfc">{{ teamCount.teamNum }}</view>
						<view class="font_size24 font_colorcc">总人数</view>
					</view>
				<!-- 	<view class="width33 text_center" style="border-right: 1px solid #999999;">
						<view class="font_size34 font_colorfc">{{ teamCount.totalTrans }}</view>
						<view class="font_size24 font_colorcc">总交易额</view>
					</view> -->
					<view class="width50 text_center">
						<view class="font_size34 font_colorfc">{{ teamCount.splitRunAmount }}</view>
						<view class="font_size24 font_colorcc">获得分润</view>
					</view>
				</view>
			</view>

			<!-- 好物推荐 -->
			<view class="text_center margin_top5"><image src="../../../static/image/beij/myHot.png" mode="" style="width: 150upx;height: 30upx;"></image></view>

			<!-- 列表 -->
			<view class="margin_top3 padding_bottom3">
				<view
					v-for="(item, index) in goodRecommendList"
					:key="index"
					class="display_inline background_colorff "
					style="width: 44%;margin-left: 4%;border-bottom-left-radius: 30upx;border-bottom-right-radius: 30upx;border-top-left-radius: 30upx;border-top-right-radius: 30upx; margin-top: 4%;"
				>
					<view class="" @click="goProduct(item.id)"><image :src="item.goodsDetail.images" class="shop_list_img" mode=""></image></view>
					<view class="font_size30 text_hidden" style="margin-left: 4%;">{{ item.goodsDetail.title }}</view>
					<view class="display_flex display_space margin_top3 ">
						<view class="font_colorfc font_size28 width66 font_weight600" style="margin-left: 4%;">
							¥{{ item.goodsDetail.price }}
							<text class="font_size22 font_colorcc font_weight500">/件</text>
						</view>
						<view style="margin-right: 5%;" @click="addShopCard(item)"><image src="../../../static/image/icon/shop.png" class="shop_img" mode=""></image></view>
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
			myOrderList: [
				{
					name: '全部订单',
					url: '../../../static/image/icon/ordeq.png',
					falg: '0',
					urlFalg: 'myOrder'
				},
				{
					name: '待支付',
					url: '../../../static/image/icon/orderd.png',
					falg: '1',
					urlFalg: 'myOrder'
				},
				{
					name: '待收货',
					url: '../../../static/image/icon/orders.png',
					falg: '3',
					urlFalg: 'myOrder'
				},
				{
					name: '评价',
					url: '../../../static/image/icon/ordep.png',
					falg: '4',
					urlFalg: 'myOrder'
				},
				{
					name: '退换货',
					url: '../../../static/image/icon/ordert.png',
					falg: 'th',
					urlFalg: 'returnProduct'
				}
			],
			teamCount: '', //团队数据
			infoData: '', //个人信息
			followData: '', //关注数量
			goodRecommendList: '', //毫无推荐
			msgFalg: '' //消息
		};
	},
	// mounted() {
	// 	this.init(); //获取初始化页面数据
	// },
	onShow() {
		this.init();
	},
	methods: {
		//去产品详情
		goProduct(e) {
			uni.navigateTo({
				url: '../../productDetails/productDetails?productId=' + e
			});
		},
		// 加入购物车
		addShopCard: function(item) {
			console.log(item);
			var data = {
				mbId: uni.getStorageSync('userId'),
				sellerId: item.sellerId, //sellerId
				skuId: item.goodsDetail.id, //skuId
				oper: 'add',
				spuId: item.goodsDetail.spuId //商品Id
			};
			this.$http.post('/api/cart/save', data, true).then(res => {
				console.log(JSON.stringify(res) + '我在这');
				if (res.data.code == 200) {
					uni.showToast({
						title: '添加成功',
						icon: 'none',
						duration: 1500,
						position: 'center'
					});
					this.getShopNumber();
				}
			});
		},
		// 去消息
		goMyPage: function(urlFalg, e) {
			console.log(urlFalg);
			if (urlFalg == 'withdrawal') {
				// 获取个人信息
				var data = {
					mbId: uni.getStorageSync('userId')
				};
				this.$http.get('/api/member/isVerified', data, true).then(res => {
					if (res.data.code == 200) {
						if (!res.data.data) {
							uni.navigateTo({
								url: '../../realName/realName?pageType=withdrawal'
							});
						} else {
							uni.navigateTo({
								url: '../../withdrawal/withdrawal?money=' + e
							});
					// 		if (this.infoData.balance > 0) {
					// 			var data = {
					// 				mbId: uni.getStorageSync('userId'),
					// 				flag: true
					// 			}
					// 			this.$http.get('/api/bank/list', data, true).then(res => {
					// 				if (res.data.code == 200) {
					// 					if (res.data.data.length > 0) {
					// 						uni.navigateTo({
					// 							url: '../../withdrawal/withdrawal?money=' + e
					// 						});
					// 					} else {
					// 						uni.showToast({
					// 							title: '您还没有绑定银行卡',
					// 							icon: 'none',
					// 							position: 'center',
					// 							duration: 1000
					// 						});
					// 					}
					// 				}
					// 			});
					// 		} else {
					// 			uni.showToast({
					// 				title: '您还没有可提现金额',
					// 				icon: 'none',
					// 				position: 'center',
					// 				duration: 1000
					// 			});
					// 		}
					
					
						}
					}
				});
			} else if (urlFalg == 'moreThan') {
				if (this.infoData.balance > 0) {
					uni.navigateTo({
						url: '../../' + urlFalg + '/' + urlFalg
					});
				} else {
					uni.showToast({
						title: '您还没有可用余额',
						icon: 'none',
						position: 'center',
						duration: 1000
					});
				}
			} else {
				uni.navigateTo({
					url: '../../' + urlFalg + '/' + urlFalg
				});
			}
		},
		goOrder: function(e) {
			console.log(e);
			if (e == 'th') {
				uni.navigateTo({
					url: '../../returnProduct/returnProduct'
				});
			} else {
				uni.navigateTo({
					url: '../../myOrder/myOrder?orderType=' + e
				});
			}
		},

		init: function() {
			let _this = this;
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			// 获取团队数据
			this.$http.get('/api/member/center/teamCount', data, true).then(res => {
				if (res.data.code == 200) {
					this.teamCount = res.data.data;
				}
			});
			// 获取个人信息
			this.$http.get('/api/member/center/info', data, true).then(res => {
				if (res.data.code == 200) {
					this.infoData = res.data.data;
				}
			});
			// 获取关注
			this.$http.get('/api/member/center/follow', data, true).then(res => {
				if (res.data.code == 200) {
					this.followData = res.data.data;
				}
			});
			// 获取毫无推荐
			this.$http.get('/api/common/goods/goodRecommend').then(res => {
				if (res.data.code == 200) {
					this.goodRecommendList = res.data.data;
				}
			});
			// 获取未读消息
			this.$http.get('/api/message/queryUnread', data, true).then(res => {
				if (res.data.code == 200) {
					this.msgFalg = res.data.data;
				}
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #fafafa;
}

.image_width {
	position: absolute;
	width: 100%;
	height: 852upx;
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
	height: 340upx;
	margin-left: 5%;
	margin-top: 56upx;
}

.image_width_top_moudel {
	color: #ffffff;
	position: relative;
	width: 85%;
	// margin-left: 15%;
	margin-left: 86upx;
	font-size: 36upx;
	font-weight: 600;
}

.header_img {
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
	margin-top: 12upx;
}

.left_btn {
	width: 160upx;
	height: 60upx;
	line-height: 60upx;
	border: 1px solid #fcd07d;
	color: #fcd07d;
	text-align: center;
	border-radius: 40upx;
}

.order_width {
	width: 56upx;
	height: 46upx;
}

.my_team {
	margin-left: 4%;
	height: 200upx;
	// background-color: #303030;
	margin-top: 20upx;
	width: 92%;
	border-radius: 20upx;
	background: url(../../../static/image/beij/myt.png) no-repeat;
	background-size: 100% 100%;
}

.my_team_img {
	width: 16upx;
	height: 28upx;
	margin-top: 30upx;
}

.shop_list_img {
	height: 329upx;
	border-top-left-radius: 30upx;
	border-top-right-radius: 30upx;
}

.shop_img {
	width: 45upx;
	height: 45upx;
	border-radius: 50%;
}

.my_topmoudel {
	margin-left: 4%;
	height: 140upx;
	background-color: #303030;
	border-top-left-radius: 30upx;
	border-top-right-radius: 30upx;
	margin-top: 34upx;
	width: 92%;
	padding-top: 30upx;
}
.msg_falg {
	background-color: #fcd07d;
	width: 10upx;
	height: 10upx;
	border-radius: 50%;
	margin-left: 6%;
}
</style>

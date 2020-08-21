<template>
	<view>
		<view class="" style="height: 320upx;">
			<image src="../../static/image/beij/shopIndex.png" class="image_width" mode=""></image>
			<view class="login_moudel">
				<!-- 头部操作栏 -->
				<view class="top_moudel display_space">
					<view class="" @click="goBack"><image src="../../static/image/icon/top_left.png" class="top_img_width" mode=""></image></view>
					<view class="font_colorff font_size36 margin_left8">店铺详情</view>
					<view class="width20 text_right margin_right3">
						<image @click="open_moudelS" src="../../static/image/icon/top_right.png" class="top_img_width" mode=""></image>
					</view>
				</view>

				<!-- 店铺 -->
				<view class="uni-flex margin_top18">
					<view class="margin_left3 width15 text_center"><image :src="shopDetail.storeLogo" class="shop_img_w" mode=""></image></view>
					<view class="uni-flex margin_top1 width60">
						<view class="font_size28 font_colorff">{{ shopDetail.storeName }}</view>
						<!-- <view class="margin_left3"><image src="../../static/image/icon/rightF.png" class="shop_img_two" mode=""></image></view> -->
					</view>
					<view class="">
						<view class="shop_btn uni-flex display_center" @click="goFollow" v-if="collection">
							<view class=""><image src="../../static/image/icon/trightf.png" class="rightf_img" mode=""></image></view>
							<view class="font_size26 font_colorff" style="margin-left: 10upx;">关注</view>
						</view>

						<view v-else class="top_btn" @click="closeGoFollow">已关注</view>
					</view>
				</view>
			</view>
		</view>

		<view class="page_width" v-if="shopDetail.type != 1">
			<view class="uni-flex display_space top_card" @click="openMoudel">
				<view class="">证照信息</view>
				<view class=""><image src="../../static/image/icon/right.png" class="right_img" mode=""></image></view>
			</view>
		</view>

		<view class="page_width" style="margin-top: 10%;">
			<view class="background_colorff font_color33 details_moudel">
				<view class="uni-flex padding_bottom3 padding_top3  border_bottom" v-if="shopDetail.content">
					<view class="font_sise28  width20">店铺介绍</view>
					<view class="font_size26 font_color66  text_hidden">{{ shopDetail.content }}</view>
				</view>
				<view class="uni-flex  padding_bottom3 padding_top3 border_bottom">
					<view class="font_sise28  width20">所在地区</view>
					<view class="font_size26 font_color66  text_hidden">{{ shopDetail.address }}</view>
				</view>

				<view class="uni-flex padding_bottom3 padding_top3 ">
					<view class="font_sise28  width20">开店时间</view>
					<view class="font_size26 font_color66  text_hidden">{{ shopDetail.createTime }}</view>
				</view>
			</view>
		</view>

		<view class="page_width">
			<view class="uni-flex display_center ovew_moudel" @click="goBack">
				<view class="font_size30 font_colorde">去看看全部商品</view>
				<view class="padding_left2" style="padding-top: 0;line-height: 0;"><image src="../../static/image/icon/2rightb.png" class="" style="width: 8upx;height: 14upx;" mode=""></image></view>
			</view>
		</view>

		<!-- 图片 -->

		<template v-if="payFalg">
			<view class="moudel_content">
				<view class="content_block">
					<view class="text_right" style="width: 100%;" @click="closeMoudel">
						<image src="../../static/image/icon/close.png" style="width: 30upx;height: 30upx;" mode=""></image>
					</view>
					<image :src="imgMoudel" class="margin_top5" mode=""></image>
				</view>
			</view>
		</template>

		<!-- 分享 -->
		<block v-if="shareFalg">
			<view class="share_moudel_content">
				<view class="share_moudel">
					<view class="uni-flex page_width border_bottom  padding_bottom3">
						<view class="width55 text_right">分享到</view>
						<view class="width45 margin_right3 text_right" @click="close_moudelS">
							<image src="../../static/image/icon/close.png" class="margin_right3" style="width: 26upx;height: 26upx;" mode=""></image>
						</view>
					</view>

					<view class="text_center padding_top3 padding_bottom3">
						<view class="margin_top2" @click="wxShare"><image src="../../static/image/icon/wxf.png" class="img_widthf" mode=""></image></view>

						<view class="font_size26">微信</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sellerId: '',
			shopDetail: '',
			collection: true,
			payFalg: false,
			shareFalg: false
		};
	},
	onLoad(option) {
		console.log(option.shopId);
		this.sellerId = option.shopId;
		this.imgMoudel = 'http://101.201.180.222:8080/api/common/store/credentials/' + this.sellerId;
	},
	mounted() {
		this.getShop();
	},
	methods: {
		// 分享
		close_moudelS: function() {
			this.shareFalg = false;
		},
		open_moudelS: function() {
			this.shareFalg = true;
		},
		goBack: function() {
			uni.navigateBack();
		},
		openMoudel: function() {
			this.payFalg = true;
		},
		closeMoudel: function() {
			this.payFalg = false;
		},
		getShop: function() {
			var data = {
				sellerId: this.sellerId
			};
			// 获取barren
			this.$http.get('/api/common/store/detail', data).then(res => {
				if (res.data.code == 200) {
					console.log(JSON.stringify(res));
					this.shopDetail = res.data.data;
					this.getShopFollow();
				}
			});
		},

		//查询店铺是否关注
		getShopFollow: function() {
			var data = {
				storeId: this.shopDetail.id, //商户id
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/store/ckeckUserFollow', data, true).then(res => {
				console.log(JSON.stringify(res));
				if (res.data.code == 200) {
					this.collection = !res.data.data; //是否关注
				}
			});
		},
		//产品关注
		goFollow: function() {
			let _this = this;
			var followData = {
				mbId: uni.getStorageSync('userId'),
				storeId: this.shopDetail.id //商户id
			};
			_this.$http.get('/api/store/follow', followData, true).then(res => {
				if (res.data.code == 200) {
					_this.getShopFollow();
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						position: 'center'
					});
				}
			});
		},
		// 取消关注
		closeGoFollow: function() {
			let _this = this;
			var followData = {
				mbId: uni.getStorageSync('userId'),
				storeId: this.shopDetail.id //商户id
			};
			_this.$http.get('/api/store/cancel', followData, true).then(res => {
				if (res.data.code == 200) {
					_this.getShopFollow();
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						position: 'center'
					});
				}
			});
		},
		
		// 微信分享
		wxShare: function() {
			//分享到微信朋友
			uni.share({
				provider: "weixin",
				scene: "WXSceneSession",
				type: 0,
				href: "http:*******************", //这地址太长了，就省略了
				title: "你笑起来真好看",
				summary: "唐艺昕，你有火吗？没有,为何你点燃了我的心？",
				imageUrl: "http:*******************",
				success: function(res) {
					if(res){
						console.log("success:" + JSON.stringify(res));
					}
				},
				fail: function(err) {
					console.log("fail:" + JSON.stringify(err));
				}
			});
		}
		
	}
};
</script>

<style lang="scss">
.image_width {
	position: absolute;
	width: 100%;
	height: 320upx;
}
.login_moudel {
	position: relative;
	width: 94%;
	margin-left: 3%;
	padding-top: 5%;
}
.shop_img_w {
	width: 60upx;
	height: 60upx;
	border-radius: 10upx;
}

.shop_img_two {
	width: 8upx;
	height: 14upx;
}
.shop_btn {
	width: 140upx;
	height: 60upx;
	background: linear-gradient(to right,#edcb80, #a58747);
	border-radius: 10upx;
	align-items: center;
}
.rightf_img {
	width: 30upx;
	height: 30upx;
	margin-top: 16upx;
}

.top_moudel {
	width: 100%;
	margin-left: 3%;
	position: absolute;
	top: 50upx;
	display: flex;
	height: 70upx;
}
.top_img_width {
	width: 60upx;
	height: 60upx;
}
.right_img {
	width: 16upx;
	height: 28upx;
}
.top_card {
	height: 90upx;
	background: #ffffff;
	border-radius: 20upx;
	align-items: center;
	padding: 0 30upx;
	margin-top: -5%;
	z-index: 9;
	position: absolute;
	width: 94%;
}
.details_moudel {
	// width: 690px;
	// height: 322px;
	background: #ffffff;
	border-radius: 20upx;
	padding: 30upx;
}
.ovew_moudel {
	// width: 690px;
	height: 88upx;
	align-items: center;
	background: #ffffff;
	border-radius: 20upx;
	margin-top: 30upx;
}
.top_btn {
	width: 140upx;
	height: 60upx;
	border: 1px solid #edcb80;
	border-radius: 10upx;
	text-align: center;
	line-height: 60upx;
	color: #edcb80;
	font-size: 26upx;
}
.content_block {
	background-color: #ffffff;
	width: 90%;
	margin-left: 5%;
	border-radius: 16px;
	position: absolute;
	top: 18%;
	padding: 30upx;
	// text-align: center;
}

	.share_moudel_content {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: $uni-bg-color-mask;
		z-index: 101;
		top: 0;
		left: 0;
	}


	.share_moudel {
		background-color: #FFFFFF;
		width: 100%;
		position: absolute;
		padding-bottom: 5%;
		bottom: 2upx;
		border-top-right-radius: 40upx;
		border-top-left-radius: 40upx;
		padding: 3%;

	}

	.img_widthf {
		width: 80upx;
		height: 80upx;
	}
</style>

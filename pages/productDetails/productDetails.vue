<template>
	<view>
		<!-- <view class="" style="height: var(--status-bar-height);background-color: red;position: fixed;top: 0;width: 100%;"></view> -->
		<!-- <view class="title_top" v-if="!titleFalg" style="position: fixed;top: 0;z-index: 9;height: 60upx;background-color: blue;"></view> -->
		<view class="top_moudel_two" style="padding-top:var(--status-bar-height);" v-if="!titleFalg">
			<view class="width33  " @click="goBack"><image src="../../static/image/icon/top_left.png" class="top_img_width" mode=""></image></view>
			<view class="font_size36 width33 text_center">商品详情</view>
			<view class="width33 text_right">
				<image @click="open_moudelS" src="../../static/image/icon/top_right.png" class="top_img_width" mode=""></image>
				<image @click="goFollow" src="../../static/image/icon/top_right1.png" v-if="collection" class="top_img_width margin_left5" mode=""></image>

				<image @click="closeGoFollow" src="../../static/image/icon/tright2S.png" v-else class="top_img_width margin_left5" mode=""></image>
			</view>
		</view>

		<!-- 轮播图 -->
		<view class="">
			<swiper class="imageContainer" @change="handleChange" circular autoplay>
				<block v-for="(item, index) in lunBoList" :key="index">
					<swiper-item><image class="itemImg" :src="item" lazy-load mode="scaleToFill"></image></swiper-item>
				</block>
			</swiper>
		</view>

		<!-- 头部操作栏 -->

		<view class="top_moudel display_space" v-if="titleFalg">
			<view class="" @click="goBack"><image src="../../static/image/icon/top_left.png" class="top_img_width" mode=""></image></view>
			<view class="width20">
				<image @click="open_moudelS" src="../../static/image/icon/top_right.png" class="top_img_width" mode=""></image>
				<image @click="goFollow" src="../../static/image/icon/top_right1.png" v-if="collection" class="top_img_width margin_left5" mode=""></image>

				<image @click="closeGoFollow" src="../../static/image/icon/tright2S.png" v-else class="top_img_width margin_left5" mode=""></image>
			</view>
		</view>

		<!-- content -->
		<view class="background_colorff " style="padding-bottom: 150upx;">
			<view class="page_width padding_top3">
				<view class="font_size36 font_weight600 text_hidden2">{{ goodsDetail.title }}</view>
				<view class="font_size26 text_hidden margin_top3" style="color: #A3A3A3;">{{ productDetailList.subTitle }}</view>
				<view class="font_size30 font_colorb2">
					<text class="font_size26 font_colorbe">¥</text>
					<text class="font_size50 font_colorbe font_weight600">{{ goodsDetail.price }}</text>
					/件
				</view>
			</view>

			<!-- 地址 -->
			<view class="address_moudel">
				<view class="page_width uni-flex ">
					<view class="width10 text_center">送至</view>
					<view class="width15 text_center"><image src="../../static/image/icon/diz.png" style="width: 21upx;height: 26upx;" mode=""></image></view>
					<view class="width65 text_hidden" @click="goMyAddress">{{ AddressList.data }}</view>
					<view class="width10 text_center"><image src="../../static/image/icon/dizx.png" style="width: 21upx;height: 7upx;" mode=""></image></view>
				</view>
			</view>

			<!-- 规格 -->
			<view class="page_width">
				<view class="norms_moudel uni-flex display_space">
					<view class="margin_left3">规格：{{ spec }}</view>
					<view class="uni-flex margin_right3 width20" @click="open_moudel">
						<view class="">选择更多</view>
						<view class="margin_left5"><image src="../../static/image/icon/rightb.png" style="width: 12upx;height: 20upx;" mode=""></image></view>
					</view>
				</view>
			</view>

			<!-- list -->
			
		<!-- v-if="Object.keys(productDetailList.genericParamMaps).length > 0 " -->
			<view class="page_width" >
				<view class="list_moudel_details">
					<view class="page_width">
						<view v-for="(item, key) in productDetailList.genericParamMaps" :key="key" class="uni-flex  font_size26 border_bottom padding_top3 padding_bottom3">
							<view class="">{{ key }}</view>
							<view class="font_color66 margin_left3">{{ item }}</view>
						</view>
					</view>
				</view>

				<!-- 评论 -->
				<view class="comment_moudel" v-if="evaluate.count > 0">
					<view class="uni-flex display_space " @click="goComment">
						<view class="margin_left3 width50">宝贝评价（{{ evaluate.count }}）</view>
						<view class="uni-flex margin_right3 display_right width50">
							<view class="">查看全部</view>
							<view class="margin_left2"><image src="../../static/image/icon/rightb.png" style="width: 12upx;height: 20upx;" mode=""></image></view>
						</view>
					</view>

					<view class="uni-flex margin_top2">
						<view class="margin_left3"><image :src="evaluate.headImgurl" class="img_heard1" mode=""></image></view>
						<view class="font_size24 margin_top1 margin_left3">{{ evaluate.nickName }}</view>
					</view>
					<view class="font_size24  margin_left3 ">{{ evaluate.content }}</view>
				</view>

				<view class="margin_top3"><image src="../../static/image/icon/prod.png" style="height: 38upx;width: 518upx;" mode=""></image></view>
			</view>

			<!-- 图片区域 -->
			<view class="margin_top2 " style="line-height: 0;"><u-parse :content="productDetailList.spuDetail.description" :loading="loading" /></view>
		</view>

		<!-- bottom -->
		<view class="uni-flex bottom_view">
			<view class="uni-flex text_center width33 margin_top2">
				<view class="width45" @click="goToShop">
					<view class=""><image src="../../static/image/icon/dianp.png" class="bottom_img" mode=""></image></view>
					<view class="font_size22" style="margin-top: -8%;">店铺</view>
				</view>
				<view class="width50" @click="goShopCart">
					<view class="number_moudel" v-if="shopCarNumber > 0">{{ shopCarNumber }}</view>
					<view class=""><image src="../../static/image/icon/shopC.png" class="bottom_img" mode=""></image></view>
					<view class="font_size22" style="margin-top: -8%;">购物车</view>
				</view>
			</view>
			<view :class="productDetailList.goodsDetail.stock == 0  || noShop ? 'left_bottom_no' : 'left_bottom'" @click="addShopCard">加入购物车</view>
			<view :class="productDetailList.goodsDetail.stock == 0  || noShop ? 'left_bottom_no' : 'left_bottom2'"  @click="goConfirmOrder">立即购买</view>
			
		</view>

		<!-- 规格选择 -->
		<block v-if="normsFalg">
			<view class="moudel_content">
				<view class="list_moudel">
					<view class="text_right" @click="close_moudel">
						<image src="../../static/image/icon/close.png" class="margin_right3" style="width: 26upx;height: 26upx;" mode=""></image>
					</view>
					<view class="page_width padding_bottom3">
						<!-- 商品 -->
						<view class="uni-flex">
							<view class="width35"><image :src="goodsDetail.imgArr[0]" class="moudel_product_img" mode=""></image></view>
							<view class="margin_top2 width60">
								<view class="font_size30 font_weight600 text_hidden2">{{ goodsDetail.title }}</view>
								<view class="font_colorbe font_size40 margin_top3">
									<text class="font_size26">￥</text>
									{{ goodsDetail.price }}
								</view>
								<view class="font_size24 font_color99">已选：{{ productNumber }}只</view>
							</view>
						</view>
						<!-- 规格 -->

						<view class="margin_top3" v-for="(item, key) in this.productDetailList.specParamMaps" :key="key">
							<view class="font_size26">{{ key }}</view>
							<view class="" style="margin-left: -20upx;">
								<view
									@click="tabCCCC(key, chainditem)"
									v-for="(chainditem, chKey) in item"
									:key="chKey"
									class="moudel_item"
									:style="chainditem != indexes[key] ? 'backgroundColor:#F4F4F4;color:#666666' : ''"
								>
									{{ chainditem }}
								</view>
							</view>
						</view>

						<!-- 购买数量 -->
						<view class="uni-flex display_space margin_top3">
							<view class="font_size26">购买数量</view>
							<view class="">
								<view class="uni-flex num_moudel">
									<view class="num_moudel_left " @click="numStatistics()">
										<image src="../../static/image/icon/jian.png" style="width: 24upx;height: 24upx;" mode=""></image>
									</view>
									<view class="num_moudel_center">
										{{ productNumber }}
										<!-- {{items.num > items.stock ? items.stock :items.num}} -->
									</view>
									<view class="num_moudel_right" @click="numStatistics('add')">
										<image src="../../static/image/icon/jia.png" style="width: 24upx;height: 24upx;" mode=""></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>

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
import uParse from '../../components/feng-parse/parse.vue'; //富文本展示
export default {
	components: {
		uParse
	},
	data() {
		return {
			imgList: [
				{
					banner: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3538793755,2857666234&fm=26&gp=0.jpg'
				},
				{
					banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
				}
			],

			normsFalg: false, //规格标示
			collection: true, //是否关注 true 未关注
			shareFalg: false, //分享

			addressId: '', //地址id
			productId: '', //产品id
			productDetailList: {
				spuDetail: {
					description: ''
				},
				goodsDetail:{
					stock:''
				}
			}, //获取接口详情数据
			lunBoList: '', //轮播图数据
			goodsDetail: '', //详情数据
			AddressList:{data:''}, //地址列表
			evaluate: '', //评价内容
			spec: '', //规格
			productNumber: 1, //数量
			// urlFalgD: '', //返回路径
			Specific: '', //规格参数
			indexes: '', //dsfa
			shopCarNumber: '', //购物车数量
			loading: false, //开启loading不显示默认值
			description: '',
			titleFalg: true,
			noShop:false
		};
	},
	onLoad(option) {
		this.productId = option.productId; //产品编码
		this.addressId = option.addressId; //地址ID
		if (this.addressId) {
			this.AddressList.data = ''
			this.getAddress(); //获取详情
		}
	},

	mounted() {
		this.init(); //初始化接口查询
	},
	onPageScroll(e) {
		// console.log(e)
		e.scrollTop > 80 ? (this.titleFalg = false) : (this.titleFalg = true);
		// console.log(this.titleFalg)
	},

	methods: {
		tabCCCC(one, two) {
			this.indexes[one] = two;
			let index = Object.values(this.indexes).join('_');
			this.Specific = index;
			this.getDetail(); //查询
		},

		// 轮播滑动操作
		handleChange: function(e) {
			this.currentIndex = e.detail.current;
		},

		// 数字框处理
		numStatistics: function(type) {
			if (type == 'add') {
				this.productNumber = Number(this.productNumber) + 1;
			} else {
				if (this.productNumber == 1) {
					return;
				}
				this.productNumber = Number(this.productNumber) - 1;
			}
		},
		// 关闭规格弹窗
		close_moudel: function() {
			this.normsFalg = false;
		},
		open_moudel: function() {
			this.normsFalg = true;
		},

		// 分享
		close_moudelS: function() {
			this.shareFalg = false;
		},
		open_moudelS: function() {
			this.shareFalg = true;
		},
		//去评论去
		goComment: function() {
			uni.navigateTo({
				url: '../productComment/productComment?urlFalg=productDetails' + '&pruductId=' + this.productId
			});
		},
		// 返回

		goBack: function() {
			uni.navigateBack();
		},
		goShopCart: function() {
			uni.navigateTo({
				url: '../shopCart/shopCart'
			});
			// uni.switchTab({
			// 	url:'../tabBar/shopCart/shopCart'
			// })
		},
		//产品关注
		goFollow: function() {
			let _this = this;
			var followData = {
				mbId: uni.getStorageSync('userId'),
				spuId: _this.productId
			};
			_this.$http.get('/api/goods/follow', followData, true).then(res => {
				if (res.data.code == 200) {
					_this.queryFollow();
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						position: 'top'
					});
				}
			});
		},

		// 取消关注
		closeGoFollow: function() {
			let _this = this;
			var followData = {
				mbId: uni.getStorageSync('userId'),
				spuId: _this.productId
			};
			_this.$http.get('/api/goods/cancel', followData, true).then(res => {
				if (res.data.code == 200) {
					_this.queryFollow();
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						position: 'top'
					});
				}
			});
		},

		// 查询是否关注
		queryFollow: function() {
			let _this = this;
			var followData = {
				mbId: uni.getStorageSync('userId'),
				spuId: _this.productId
			};
			_this.$http.get('/api/goods/ckeckUserFollow', followData, true).then(res => {
				if (res.data.code == 200) {
					// sconsole.log(JSON.stringify(res));
					_this.collection = !res.data.data; //是否关注
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						position: 'top'
					});
				}
			});
		},

		// 去地址列表
		goMyAddress: function() {
			uni.navigateTo({
				url: '../addAddress/addAddress?falgUrl=productDetails' + '&productId=' + this.productId
			});
		},

		// 通过地址id 获取详情
		getAddress: function() {
			var _this = this
			var data = {
				addressId: this.addressId
			};
			this.$http
				.get('/api/address/detail', data, true)
				.then(res => {
					if (res.data.code == 200) {
						_this.AddressList.data = res.data.data.provinceName + res.data.data.cityName + res.data.data.areaName + res.data.data.address;
						console.log(_this.AddressList.data)
						// _this.$set(_this.AddressList, 'data' , _this.AddressList.data)
						// this.$set( _this.AddressList.data )
					} else {
						//有误
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top'
						});
					}
				})
				.catch(err => {});
		},

		// 获取产品详情
		getDetail: function() {
			var _this = this;
			var data = {
				indexes: this.Specific,
				spuId: this.productId
			};
			this.$http.get('/api/common/goods/detail', data).then(res => {
				if (res.data.code == 200) {
					_this.productDetailList = res.data.data;
					_this.lunBoList = _this.productDetailList.imgArr; //轮播数据
					_this.goodsDetail = _this.productDetailList.goodsDetail; //详细数据
					_this.spec = _this.productDetailList.goodsDetail.indexes.replace(/_/g, ' ');
					
					if (!data.indexes) {
						_this.indexes = _this.productDetailList.ownSpec;
					}
					this.noShop = false
				} else {
					this.noShop = true
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						position: 'top'
					});
				}
			});
		},

		// 去店铺
		goToShop: function() {
			console.log(this.productDetailList)
			uni.navigateTo({
				url: '../shopIndex/shopIndex?shopId=' + this.productDetailList.storeId + '&urlFalg=productDetails' + '&searchName='
			});
		},
		// 加入购物车
		addShopCard: function() {
			if (this.productDetailList.goodsDetail.stock == 0 || this.noShop) {
				uni.showToast({
					title: '库存不足',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				return;
			}
			var data = {
				mbId: uni.getStorageSync('userId'),
				oper: 'add',
				sellerId: this.productDetailList.sellerId,
				skuId: this.productDetailList.goodsDetail.id,
				spuId: this.productDetailList.goodsDetail.spuId
			};
			this.$http.post('/api/cart/save', data, true).then(res => {
				if (res.data.code == 200) {
					uni.showToast({
						title: '添加成功',
						icon: 'none',
						duration: 2000,
						position: 'top'
					});
					this.findShopNumber();
				}
			});
		},

		// 去结算
		goConfirmOrder: function() {
			console.log(this.goodsDetail.id);
			console.log(this.productNumber);
			if (this.productDetailList.goodsDetail.stock == 0 || this.noShop) {
				uni.showToast({
					title: '库存不足',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				return;
			}
			uni.navigateTo({
				url: '../confirmOrder/confirmOrder?productSkuId=' + this.goodsDetail.id + '&productNumber=' + this.productNumber + '&urlFalg=productDetails'
			});
		},

		init: function() {
			var _this = this;
			_this.getDetail(); //获取详情
			// 查询是否关注商品
			// if (uni.getStorageSync('userId')) {
			_this.queryFollow(); //查询是否关注
			// }
			// 获取地址列表
			var dataA = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/address/list', dataA, true).then(res => {
				if(this.addressId ){
					return;
				}
				if (res.data.code == 200) {
					if (res.data.data.length > 0) {
						_this.AddressList.data = res.data.data[0].address;
					} else {
						_this.AddressList.data= '选择收货地址';
					}
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						position: 'top'
					});
				}
			});

			// 查询评价
			var dataP = {
				spuId: this.productId
			};
			this.$http.get('/api/common/evaluation/find', dataP).then(res => {
				if (res.data.code == 200) {
					_this.evaluate = res.data.data;
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						position: 'top'
					});
				}
			});

			_this.findShopNumber();
		},

		findShopNumber: function() {
			// 查询购物车数量
			var shopNumber = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/cart/countShopCartNum', shopNumber, true).then(res => {
				if (res.data.code == 200) {
					this.shopCarNumber = res.data.data;
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 1500,
						position: 'top'
					});
				}
			});
		},

		// 微信分享
		wxShare: function() {
			//分享到微信朋友
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 0,
				href: 'http:*******************', //这地址太长了，就省略了
				title: '你笑起来真好看',
				summary: '唐艺昕，你有火吗？没有,为何你点燃了我的心？',
				imageUrl: 'http:*******************',
				success: function(res) {
					if (res) {
						console.log('success:' + JSON.stringify(res));
					}
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		}
	}
};
</script>

<style lang="scss">
// 轮播
.imageContainer {
	width: 100%;
	height: 750upx;
}

.itemImg {
	width: 100%;
	height: 750upx;
}

.top_moudel {
	width: 94%;
	margin-left: 3%;
	position: absolute;
	top: 60upx;
	display: flex;
	height: 70upx;
}

.top_moudel_two {
	width: 100%;
	position: fixed;
	background-color: #ffffff;
	display: flex;
	padding: 30upx 30upx 10upx 30upx;
	z-index: 9;
	// height: 60upx;
}

.top_img_width {
	width: 60upx;
	height: 60upx;
}

.address_moudel {
	height: 104upx;
	background: #ffffff;
	font-size: 26upx;
	box-shadow: 0upx 2upx 10upx 0upx #eeeeee;
	padding-top: 30upx;
}

.norms_moudel {
	height: 80upx;
	// padding-top: 30upx;
	// padding-bottom: 30upx;
	background: #fafafa;
	border-radius: 12upx;
	align-items: center;
	margin-top: 30upx;
}

.list_moudel_details {
	background: #ffffff;
	border-radius: 12upx;
	box-shadow: 0px 2upx 10upx 0px #eeeeee;
	padding-bottom: 30upx;
	margin-top: 30upx;
}

.comment_moudel {
	height: 207upx;
	background: #fafafa;
	border-radius: 12upx;
	margin-top: 30upx;
	padding-top: 25upx;
}

.img_heard1 {
	width: 60upx;
	height: 60upx;
	border-radius: 50%;
}

.bottom_img {
	width: 40upx;
	height: 40upx;
}

.bottom_view {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 98upx;
	background-color: #ffffff;
	z-index: 100;
}

.left_bottom {
	height: 98upx;
	background: #3c3d3e;
	text-align: center;
	line-height: 98upx;
	color: #ffffff;
	font-size: 30upx;
	width: 33%;
}

.left_bottom2 {
	height: 98upx;
	background: #BE8100;
	text-align: center;
	line-height: 98upx;
	color: #ffffff;
	font-size: 30upx;
	width: 33%;
}

.left_bottom_no {
	height: 98upx;
	background: #999999;
	text-align: center;
	line-height: 98upx;
	color: #ffffff;
	font-size: 30upx;
	width: 33%;
}

.number_moudel {
	background-color: #be8100;
	color: #ffffff;
	font-size: 15upx;
	text-align: center;
	border-radius: 20upx;
	width: 36upx;
	height: 15upx;
	line-height: 1;
	font-weight: 600;
	position: absolute;
	margin-left: 10%;
	margin-top: -1%;
}

// 规格选择
.moudel_content {
	height: 100%;
	width: 100%;
	position: fixed;
	background-color: $uni-bg-color-mask;
	z-index: 99;
	top: 0;
	left: 0;
}

.list_moudel {
	background-color: #ffffff;
	width: 100%;
	position: absolute;
	padding-bottom: 5%;
	bottom: 98upx;
	border-top-right-radius: 40upx;
	border-top-left-radius: 40upx;
	padding: 1%;
}

.moudel_product_img {
	width: 200upx;
	height: 200upx;
	border-radius: 20upx;
}

.moudel_item {
	display: inline-block;
	text-align: center;
	font-size: 26upx;
	color: #ffffff;
	height: 50upx;
	line-height: 50upx;
	margin-left: 20upx;
	margin-top: 20upx;
	border-radius: 30upx;
	padding-left: 20upx;
	padding-right: 20upx;
	background-color: #be811c;
}

.num_moudel {
	height: 41upx;
	width: 153upx;

	text-align: center;
}

.num_moudel_left {
	width: 30%;
}

.num_moudel_center {
	margin-left: 3%;
	width: 30%;
	background-color: #eeeeee;
	font-size: 24upx;
	color: #333333;
	border-radius: 5upx;
}

.num_moudel_right {
	margin-left: 3%;
	width: 30%;
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
	background-color: #ffffff;
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

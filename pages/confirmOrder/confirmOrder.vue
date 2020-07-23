<template>
	<view>
		<view class="page_width padding_top2 padding_bottom3">
			<!-- 地址块 -->
			<view class="margin_top3" v-if="AddressList == 1" @click="goAddAddress('new')">
				<image src="../../static/image/beij/orderConfirm.png" class="orderimg" mode=""></image>
			</view>

			<view class="margin_top3" v-else style="height: 200upx;" @click="goAddAddress('new')">
				<image src="../../static/image/beij/address.png" mode="" class="image_width"></image>
				<view class="address_order_moudel uni-flex">
					<view class="width15"></view>
					<!-- conter-->
					<view class="width75">
						<view class="uni-flex">
							<view class="font_size32">
								{{AddressList.receiver}}
							</view>
							<view class="font_size28 margin_left3 margin_top1">
								{{AddressList.mobile}}
							</view>
						</view>
						<view class="font_size28 text_hidden2">
							{{AddressList.address}}
						</view>

					</view>
					<!-- right -->
					<view class="width10 text_center margin_top8" @click="go">
						<image src="../../static/image/icon/right.png" class="right_img_wi" mode=""></image>
					</view>
				</view>
			</view>

			<!-- 商品块 -->
			<view class="product_moudel_block" v-for="(item,index) in productList" :key="index">
				<view class="uni-flex display_space">

					<view class="">
						<image :src="item.storeLogo" class="product_img" mode=""></image>
					</view>
					<view class="font_sise28 margin_top1 margin_left3">
						{{item.storeName}}
					</view>

				</view>

				<template v-if="item.cartResults.length ==1">
					<view class="uni-flex margin_top3">
						<view class="width30">
							<image :src="item.cartResults[0].image" class="img_product" mode=""></image>
						</view>
						<view class="width65">
							<view class="font_sise28 text_hidden2">
								{{item.cartResults[0].title}}
							</view>
							<view class="font_size22 font_color99 margin_top3">
								{{item.cartResults[0].ownSpec}}
							</view>

							<view class="font_sise28 font_colorbe width80">
								<text class="font_size26">¥</text>
								{{item.cartResults[0].price}}
								<text class="font_size22 font_color99">/件</text>
							</view>

						</view>
						<view class="font_size24 font_color99 margin_top10">
							*{{item.cartResults[0].num}}
						</view>
					</view>
				</template>

				<template v-else>
					<view class="uni-flex">
						<scroll-view scroll-x="true" class="wrapper">
							<!-- <view class="uni-flex"> -->
							<view class="dimg_moudel " v-for="(items,index) in item.cartResults" :key="index">
								<view class="">
									<image :src="items.image" class="dimg" mode=""></image>
								</view>
								<view class="">
									{{items.price}}
								</view>
							</view>
							<!-- </view> -->
						</scroll-view>
						<view class="width25 font_size30 text_center" style="align-items: center;padding-top: 40upx;" @click="goInvalidProduct('d')">
							共{{item.cartResults.length}}件>
						</view>

					</view>

				</template>


			</view>

			<!-- 失效商品 -->
			<view class="uni-flex font_size30   list_one_moudel " v-if="invalidList.length > 0">
				<view class="margin_left3 width40">
					失效商品清单
				</view>
				<view class="margin_right3 uni-flex width60" @click="goInvalidProduct('s')">
					<view class="width90 text_right">
						共{{invalidList.length}}件
					</view>
					<view class="margin_top1 margin_left2">
						<image src="../../static/image/icon/right.png" class="right_img_wi" mode=""></image>
					</view>
				</view>
			</view>


			<!-- 优惠卷 -->
			<view class="uni-flex font_size30   list_one_moudel " v-if="discountMoney.balance">
				<view class="margin_left3 width40">
					优惠劵
				</view>
				<view class="margin_right3 uni-flex width60">
					<view class="width90 text_right" @click="openCoupon">
						<text class="font_size22">-￥</text> {{discountMoney.balance}}
					</view>
					<view class="margin_top1 margin_left2">
						<image src="../../static/image/icon/right.png" class="right_img_wi" mode=""></image>
					</view>
				</view>
			</view>


			<!-- 金额块 -->
			<view class="price_moudel">
				<view class="uni-flex display_space">
					<view class="">
						商品金额
					</view>
					<view class="">
						<text class="font_size22">¥</text>{{totalPrice.totalPrice}}
					</view>
				</view>
				<view class="uni-flex display_space margin_top3">
					<view class="">
						运费
					</view>
					<view class="">
						<text class="font_size22">¥</text>{{totalPrice.postFree}}
					</view>
				</view>
				<view class="text_right margin_top3">
					<text class="font_sise28">合计：</text>
					<text class="font_size22 font_colorbe margin_left2">￥</text>
					<text class="font_size30 font_colorbe">{{totalPrice.totalPrice}}</text>
				</view>
			</view>


			<!-- 底部 -->
			<view class="bottom_proudel uni-flex">
				<view class="font_size28 width60 margin_top3 margin_left3">
					实付款：
					<text class="font_size22 font_colorbe">¥</text>
					<text class="font_colorbe">{{actualPayment}}</text>
				</view>
				<view class="right_m margin_left3" @click="goPageOrder">
					去支付
				</view>
			</view>

		</view>

		<!-- 优惠券弹窗 -->
		<template v-if="couponFalg">
			<view class="couponMoudel">
				<view class="list_moudel">
					<view class="uni-flex border_bottom padding_bottom2">
						<view class="width80 uni-flex">
							<view class="margin_top2" @click="closeCoupon">
								<image src="../../static/image/icon/close.png" class="close_img" mode=""></image>
							</view>
							<view class="font_size32 margin_left5">
								优惠券
							</view>
						</view>
						<view class="font_size26 font_color66 width20 text_right">
							使用说明
						</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 800upx;margin-bottom: 15%;">
						<view class="margin_top3 padding_bottom3">
							<view v-if="discountMoney" class="yhj_moudel">
								<view class="uni-flex">
									<view class="width35 text_center">
										<view class="font_size60 ">
											<text class="font_size28">¥</text>{{discountMoney.amout}}
										</view>
										<view class="font_size20 ">
											剩余金额{{discountMoney.balance}}
										</view>
									</view>
									<view class="text_center width60 margin_top5">
										<view class="font_size26">
											抵扣劵
										</view>
										<view class="" style="border-top: 1upx solid #333333; width: 30%;margin-left: 35%;"></view>
										<view class="font_size20">
											{{discountMoney.createTime}}
										</view>
									</view>
								</view>
							</view>

							<view v-else class="text_center">
								暂无可使用优惠卷
							</view>

						</view>
					</scroll-view>
					<!-- <view class="btn_bj">
						<view class="moudel_btn1">
							确认
						</view>
					</view> -->

				</view>
			</view>
		</template>


		<!-- 失效商品 -->
		<template v-if="changeList">
			<view class="couponMoudel">
				<view class="change_moudel">
					<view class="font_size32 text_center border_bottom padding_bottom3">
						以下商品信息发生变动
					</view>
					<scroll-view scroll-y="true" style="max-height: 700upx;">
						<view class="uni-flex product_moudel_list border_bottom" v-for="(item,index) in dataInvalidList" :key="index">
							<view class="width30">
								<image :src="item.image" class="list_imgp" mode=""></image>
							</view>
							<view class="width70">
								<view class="font_sise28 text_hidden2">
									{{item.title}}
								</view>
								<view class="uni-flex display_space margin_top2">
									<view class="font_size22 font_color99">
										{{item.ownSpec}}
									</view>
									<view class="font_size24 font_color99 margin_right3">
										*{{item.num}}
									</view>
								</view>
								<view class="font_size24 font_colorbe margin_top3" style="color: #BE8100;">
									商品库存仅剩 {{item.goodsNum}} 个
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="chang_bottom uni-flex">
						<view class="chang_bottom1" @click="closeMoudel">
							返回购物车确认
						</view>
						<view class="chang_bottom2" @click="goPageOrder">
							继续支付订单
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
				addressF: false,
				couponFalg: false, //优惠卷弹窗


				listNumber: false, //商品数量
				changeList: false, //失效商品
				idsList: '', //购物车id
				productList: [], //商品列表
				invalidList: '', //失效商品列表
				discountList: '', //优惠卷列表
				discountMoney: '', //优惠卷余额
				AddressList: [], //地址列表
				totalPrice: '', //金额
				actualPayment: '', //实付金额
				dataInvalidList: [], //变更商品列表
				productNumber: '', //详情页数量
				productSkuId: '' //详情页id
			}
		},
		onLoad(option) {
			console.log(option)
			this.addressId = option.addressId; //地址参数
			// 地址
			if (this.addressId) {
				this.getAddress(); //获取详情
			} else {
				this.getAddressList() //获取地址列表
			}
			// 购买来路
			if (option.urlFalg == 'productDetails') {
				this.productSkuId = option.productSkuId;
				this.productNumber = option.productNumber;
				this.getProductList()
			} else {
				this.idsList = option.ids; //下单参数
				this.getShopList(); //获取商品列表
			}
		},
		mounted() {
			this.getShopCardInval() //失效商品
		},


		methods: {
			// 查询列表购物车
			getShopList: function() {
				var data = {
					ids: this.idsList,
				}
				var _this = this
				this.$http.get('/api/order/confirmOrderCart', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res.data.data))
						_this.productList = res.data.data.goodsItem
						_this.totalPrice = res.data.data;

						for (let item of _this.productList) {
							console.log(item)
							for (let items of item.cartResults) {
								if (items.change) {
									_this.dataInvalidList.push(items)
								}
							}
						}
						_this.dataInvalidList.length > 0 ? _this.changeList = true : _this.changeList = false

						console.log(_this.dataInvalidList)

						_this.getDiscountListMoney(); //查询优惠卷
					}
				})

			},

			getProductList: function() {
				let _this = this;
				var data = {
					num: this.productNumber,
					skuId: this.productSkuId
				}
				this.$http.get('/api/order/confirmOrderGoods', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res.data.data))
						_this.productList = res.data.data.goodsItem
						_this.totalPrice = res.data.data;
						for (let item of _this.productList) {
							console.log(item)
							for (let items of item.cartResults) {
								if (items.change) {
									_this.dataInvalidList.push(items)
								}
							}
						}
						_this.dataInvalidList.length > 0 ? _this.changeList = true : _this.changeList = false

						console.log(_this.dataInvalidList)

						_this.getDiscountListMoney(); //查询优惠卷
					}
				})

			},
			// 查询失效
			getShopCardInval: function() {
				var data = {
					mbId: uni.getStorageSync('userId'),
				}
				this.$http.get('/api/cart/listInvalid', data, true).then(res => {
					if (res.data.code == 200) {
						this.invalidList = res.data.data
					}
				})
			},
			// 获取优惠券
			getDiscountList: function() {
				var data = {
					mbId: uni.getStorageSync('userId'),
					page: this.pageNum,
					limit: '10',
					status: '1'
				}
				this.$http.get('/api/coupon/list', data, true).then(res => {
					if (res.data.code == 200) {
						if (res.data.code == 200) {
							if (this.pageNum > 1) {
								if (res.data.data.length > 0) {
									this.discountList = this.discountList.concat(res.data.data);
								}
							} else {
								this.discountList = res.data.data
							}

						}
						// this.discountList = res.data.data
					}
				})
			},
			// 获取优惠卷余额
			getDiscountListMoney: function() {
				var _this = this;
				var data = {
					mbId: uni.getStorageSync('userId'),
				}
				this.$http.get('/api/coupon/balance', data, true).then(res => {
					if (res.data.code == 200) {
						if (res.data.data) {
							_this.discountMoney = res.data.data;
							let priceNumber = 0
							priceNumber = Number(_this.totalPrice.totalPrice) - Number(_this.discountMoney.balance);

							priceNumber < 0 ? _this.actualPayment = 0 : _this.actualPayment = priceNumber


						} else {
							_this.actualPayment = _this.totalPrice.totalPrice
						}
					}
				})
			},

			// 获取地址列表
			getAddressList: function() {
				var _this = this;
				// 获取地址列表
				var dataA = {
					mbId: uni.getStorageSync('userId')
				}
				this.$http.get('/api/address/list', dataA, true).then(res => {
					console.log(JSON.stringify('7876'))
					if (res.data.code == 200) {
						if (res.data.data.length > 0) {
							_this.AddressList = res.data.data[0]

						} else {
							_this.AddressList = '1'
						}

					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'top',
						});
					}
				})

			},

			// 通过地址id 获取详情
			getAddress: function() {
				var data = {
					addressId: this.addressId
				}
				this.$http.get('/api/address/find', data, true, ).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						this.AddressList = res.data.data;
					} else {
						//有误
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
					}
				}).catch(err => {})

			},


			// 保存订单
			goPageOrder: function() {
				var dataStoreDtos = [];
				let _this = this
				this.productList.map(
					function(item) {
						let a = {
							storeId: item.storeId,
							orderDetais: []
						}
						item.cartResults.map(
							function(items) {
								a.orderDetais.push({
									cartId: items.id,
									num: items.change ? items.goodsNum : items.num,
									skuId: items.skuId
								})
							}
						)
						dataStoreDtos.push(a)
					}
				);

				var dataA = {
					mbId: uni.getStorageSync('userId'),
					couponId: _this.discountMoney.couponMbId,
					addressId: _this.AddressList.id,
					storeDtos: dataStoreDtos
				}
				this.$http.post('/api/order/saveOrder', JSON.stringify(dataA), true, true).then(res => {
					if (res.data.code == 200) {
						if (_this.actualPayment == 0) {
							uni.showToast({
								title: '优惠券已全额抵扣',
								icon: 'none',
								duration: 2000,
								position: 'top',
							});
							setTimeout(function(){
								uni.switchTab({
									url: '../tabBar/home/home'
								})
							},1000)
							
						} else {
							uni.navigateTo({
								url: '../pageOrder/pageOrder?payData=' + JSON.stringify(res.data.data)
							})
						}

					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'top',
						});
					}
				})

			},


			go() {
				console.log('00')
			},
			//优惠券切换
			// switchCoupon(index) {
			// 	this.couponFalgId = index
			// },
			closeCoupon() {
				this.couponFalg = false
			},
			openCoupon: function() {
				this.couponFalg = true
			},
			// 去失效商品列表
			goInvalidProduct(falg) {
				uni.navigateTo({
					url: '../invalidProduct/invalidProduct?falg=' + falg
				})
			},
			// 关闭失效
			closeMoudel() {
				// this.changeList = false
				uni.navigateBack()
			},
			// 去支付
			// goPageOrder() {
			// 	uni.navigateTo({
			// 		url: '../pageOrder/pageOrder'
			// 	})
			// },

			// 去添加地址
			goAddAddress(e) {
				console.log(e);
				uni.navigateTo({
					url: '../addAddress/addAddress?falgUrl=confirmOrder' + '&ids=' + this.idsList
				})

			}
		}
	}
</script>

<style lang="scss">
	.orderimg {
		width: 100%;
		height: 200upx;
	}

	.product_img {
		width: 60upx;
		height: 60upx;
	}

	.product_moudel_block {
		background: #ffffff;
		border-radius: 30upx;
		padding: 30upx;
		margin-top: 30upx;
	}

	.img_product {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}

	.margin_top10 {
		margin-top: 70upx;
	}

	.price_moudel {
		background: #ffffff;
		border-radius: 30upx;
		padding: 30upx;
		font-size: 30upx;
		margin-top: 30upx;
		margin-bottom: 90upx;
	}

	.bottom_proudel {
		background: #ffffff;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98upx;
		left: 0;
		line-height: 98upx;
	}

	.right_m {
		width: 260upx;
		height: 98upx;
		background: #3c3d3e;
		line-height: 98upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30upx;
	}

	.image_width {
		position: absolute;
		width: 94%;
		height: 200upx;
	}

	.address_order_moudel {
		position: relative;
		width: 100%;
		padding-top: 30upx;
	}

	.right_img_wi {
		width: 16upx;
		height: 28upx;
	}

	.list_one_moudel {
		height: 90upx;
		background: #ffffff;
		border-radius: 30upx;
		align-items: center;
		margin-top: 30upx;
	}

	// 优惠券弹窗
	.couponMoudel {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: $uni-bg-color-mask;
		z-index: 99;
		top: 0;
		left: 0;
	}

	.list_moudel {
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0;
		border-radius: 40upx 40upx 0upx 0upx;
		padding: 30upx;
		width: 100%;

	}

	.close_img {
		width: 26upx;
		height: 26upx;
	}


	.yhj_moudel {
		background: url(../../static/image/yhj/2.png) no-repeat;
		height: 160upx;
		background-size: 100% 100%;
	}

	// .yhj_moudel_active {
	// 	background: url(../../static/image/yhj/1.png) no-repeat;
	// 	height: 160upx;
	// 	background-size: 100% 100%;
	// }

	.btn_bj {
		position: fixed;
		width: 100%;
		background: #ffffff;
		bottom: 0;
		height: 150upx;
	}

	.moudel_btn1 {
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		line-height: 88upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30upx;
		width: 690upx;
		margin-top: 30upx;
	}

	.dimg_moudel {
		width: 130upx;
		text-align: center;
		margin-left: 20upx;
		display: inline-block;
	}


	.dimg {
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
	}

	.change_moudel {
		background-color: #FFFFFF;
		position: absolute;
		top: 10%;
		border-radius: 40upx 40upx 0upx 0upx;
		padding: 30upx;
		width: 94%;
		margin-left: 3%;
	}

	.list_imgp {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}

	.product_moudel_list {
		padding: 20upx;
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 20upx;

	}

	.chang_bottom {
		background-color: #FFFFFF;
		width: 94%;
		position: fixed;
		height: 120upx;
		margin-left: -30upx;
		border-bottom-left-radius: 40upx;
		border-bottom-right-radius: 40upx;
	}

	.chang_bottom1 {
		text-align: center;
		line-height: 80upx;
		font-size: 30upx;
		color: #333333;
		width: 300upx;
		height: 80upx;
		background: #ffffff;
		border: 1px solid #333333;
		border-radius: 10upx;
		margin-left: 5%;
		margin-top: 3%;
	}

	.chang_bottom2 {
		text-align: center;
		line-height: 80upx;
		font-size: 30upx;
		color: #FFFFFF;
		width: 300upx;
		height: 80upx;
		background: #3c3d3e;
		border: 1px solid #333333;
		border-radius: 10upx;
		margin-left: 5%;
		margin-top: 3%;
	}

	.wrapper {
		width: 90%;
		white-space: nowrap;
		display: flex;
		margin-top: 2%;
	}
</style>

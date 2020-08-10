<template>
	<view>
		<!-- <view class="title_top"></view> -->
		<view class="top_moudel_two" style="padding-top:var(--status-bar-height);" v-if="!titleFalg">
			<view class="width10 text_center" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="uni-flex top_content">
				<view class="searce_left" style="width: 7%;">
					<image src="../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<input class="findShop" maxlength="10" :value="inputValue" placeholder="请输入要搜索的内容" confirm-type='搜索' type="text"
					 placeholder-style='color:#cccccc' @input="getInputv" @confirm='Search' />
				</view>
			</view>
			
			<view class="font_size28 text_center width15 " style="padding-top: 1%;" @click="goShopCart">
					<view class="number_moudel" v-if="shopCarNumber > 0">{{shopCarNumber}}</view>
				<image src="../../static/image/icon/shopC.png" class="right_img" mode=""></image>
			</view>
					
		</view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2" v-if="titleFalg">
			<view class="width10 text_center" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="uni-flex top_content">
				<view class="searce_left" style="width: 7%;">
					<image src="../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<input class="findShop" maxlength="10" :value="inputValue" placeholder="请输入要搜索的内容" confirm-type='搜索' type="text"
					 placeholder-style='color:#cccccc' @input="getInputv" @confirm='Search' />
				</view>
			</view>

			<view class="font_size28 text_center width15 " style="padding-top: 1%;" @click="goShopCart">
					<view class="number_moudel" v-if="shopCarNumber > 0">{{shopCarNumber}}</view>
				<image src="../../static/image/icon/shopC.png" class="right_img" mode=""></image>
			</view>
		
		</view>
		<!-- 列表 -->

		<view class="">
			<view class="uni-flex">
				<view class="width25" style="min-height: 1040upx;background-color: #FAFAFA ;position: absolute;height: 100%;width: 25%;">
					<view @click="leftTab(item.id)" :class="leftIndex  == item.id ? '_left_active' :'_left'" v-for="(item,index) in leftList"
					 :key="index">
						{{item.name}}
					</view>
				</view>

				<view class="width75 background_colorff" style="min-height: 1200upx;margin-left: 25%;">
					<view class="uni-flex  _right_moudel" v-for="(item,index) in rightList" :key="index">
						<view class="" @click="goProductDetails(item.id)" style="">
							<image :src="item.goodsDetail.images" class="_right_img" mode=""></image>
						</view>
						<view class="margin_left3 width70">
							<view class="font_size26  text_hidden " @click="goProductDetails(item.id)">
								{{item.title}}
							</view>
							<view class="font_size22 font_color99 text_hidden margin_top3" @click="goProductDetails(item.id)">
								{{item.subTitle}}
							</view>
							<view class="uni-flex margin_top5 ">
								<view class="font_sise28 font_colorbe width80 font_weight600">
									<text class="font_size26">¥</text>
									{{item.goodsDetail.price}}
									<text class="font_size22 font_color99">/件</text>
								</view>
								<view class="width20 text_right" @click="addShopCard(item)">
									<image src="../../static/image/icon/shop.png" class="shop_img_oe" mode=""></image>
								</view>
							</view>

						</view>
					</view>

					<view v-if="rightList.length == 0" class="text_center margin_top18">
						<image src="../../static/image/default/noProduct.png" class="no_img_product" mode=""></image>
						<view class="font_size28 font_color99 margin_top5">
							暂无相关商品~
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
				inputValue: '',
				leftList: [],
				leftIndex: '', //分类左面数据
				rightList: '', //右面数据
				categoryId: '', //一级分类
				shopCarNumber:'',//购物车数量
				titleFalg:true
			}
		},
		onLoad(option) {
			this.inputValue = option.cateType || '';
			// this.leftIndex = option.categoryId;
			this.categoryId = option.categoryId;
			
			const than = this // 注意this的指向
			uni.getStorage({
				key: 'searchAll_key',
				success(res) {
					than.searchAll = res.data;
					console.log(than.searchAll)
					
				}
			})
			console.log(option.cateType)
		},
		mounted() {
			this.getLeft();
			this.getShopNumber()
		},
		onPageScroll(e) {
			// console.log(e)
			e.scrollTop > 80 ? (this.titleFalg = false) : (this.titleFalg = true);
			// console.log(this.titleFalg)
		},
		methods: {
			// 输入了回车键
			Search(e) {
				console.log(e.detail.value);
				// 存历史记录
				if (this.inputValue != '') { // 输入框的值不为空时
					if (this.searchAll.length == 10) {
						const than = this
						
						this.searchAll[0] = this.inputValue // 将输入框的值添加到搜索记录数组中存储
						uni.setStorage({
							key: 'searchAll_key',
							data: than.searchAll,
							success: function() {}
						})
					} else {
						const than = this
						 for(var i = 0;i<this.searchAll.length;i++){
							 if(this.searchAll[i] == this.inputValue ){
								  this.searchAll.splice(i,1);
							 }
						 }
					
						console.log(this.searchAll)
						this.searchAll.unshift(this.inputValue.replace(/[ ]/g, "")) // 将输入框的值添加到搜索记录数组中存储
						uni.setStorage({
							key: 'searchAll_key',
							data: than.searchAll,
							success: function() {
				
							}
						})
				
					}
				
				};
				
				
				this.inputValue = e.detail.value;
				this.getQueryGoods(); //获取产品列表
			},
			// 输入框输入事件
			getInputv: function(e) {
				this.inputValue = e.detail.value;
				console.log(e)
			},
			// 去购物车
			goShopCart: function() {
				uni.navigateTo({
					url: '../shopCart/shopCart'
				})
			},
			// 添加购物车
			addShopCard: function(item) {
				console.log(item)
				var data = {
					mbId: uni.getStorageSync('userId'),
					sellerId: item.sellerId, //sellerId
					skuId: item.goodsDetail.id, //skuId
					oper:'add',
					spuId: item.goodsDetail.spuId //商品Id
				}
				this.$http.post('/api/cart/save', data,true).then(res => {
					console.log(JSON.stringify(res) + '我在这')
					if (res.data.code == 200) {
						uni.showToast({
							title: '添加成功',
							icon: 'none',
							duration: 1500,
							position: 'top',
						});
						this.getShopNumber()
					}
				})
						
			},
			
			// 查询购物车数量
			getShopNumber:function(){
				var shopNumber = {
					mbId: uni.getStorageSync('userId')
				}
				this.$http.get('/api/cart/countShopCartNum',shopNumber,true).then(res => {
					if (res.data.code == 200) {
						this.shopCarNumber = res.data.data
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
		
			// 返回
			goBack: function() {
				uni.navigateBack()
			},
			// 分类在左面
			leftTab: function(id) {
				this.leftIndex = id;
				this.rightList = [];
				this.getQueryGoods()
			},

			// 去产品详情
			goProductDetails: function(id) {
				uni.navigateTo({
					url: '../productDetails/productDetails?productId=' + id
				})
			},

			// 获取左面数据
			getLeft: function() {
				var data = {
					id: this.categoryId
				}
				// 获取首页轮播
				this.$http.get('/api/common/category/secondClass', data).then(res => {
					console.log(JSON.stringify(res) + '我在这')
					if (res.data.code == 200) {
						this.leftList = res.data.data
						this.leftIndex = res.data.data[0].id
						this.getQueryGoods(); //获取商品
						// this.rotationList = res.data.data
					}
				})
		
		
			},

			// 获取产品列表
			getQueryGoods: function(falg) {
				var data = {
					cid1: '', //一级分类
					cid2: this.leftIndex, //	二级分类
					keyword: this.inputValue, //搜索关键字
					limit: 10, //当前条目数
					page: this.pageNum, //当前页数
					sellerId: this.sellerId, //商户id
					sort: this.sort, //排序 1-综合 2-销量 3-价格 （必填）
					orderBy: this.orderBy //价格排序 asc 正序 desc 倒序
				}
				this.$http.get('/api/common/goods/queryGoods', data).then(res => {
					if (res.data.code == 200) {
						if (this.pageNum > 1) {
							if (res.data.data.length > 0) {
								this.rightList = this.rightList.concat(res.data.data);
							}
						} else {
							this.rightList = res.data.data
						}

					}
				})

			},


		}
	}
</script>

<style lang="less">
	page{
		background-color: #FFFFFF;
	}
	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.top_content {
		width: 75%;
		height: 66upx;
		background: #f8f8f8;
		border-radius: 12upx;
	}

	.right_img {
		width: 44upx;
		height: 46upx;
	}

	._left {
		width: 100%;
		height: 88upx;
		text-align: center;
		font-size: 28upx;
		color: #666666;
		line-height: 88upx;
		display: inline-block;
		background-color: #FAFAFA;
	}

	._left_active {
		width: 100%;
		height: 88upx;
		text-align: center;
		font-size: 28upx;
		color: #666666;
		line-height: 88upx;
		display: inline-block;
		background-color: #FFFFFF;
		border-left: 6upx solid #BE8100;
		font-weight: 600;
	}

	._right_moudel {
		// padding: 30upx;
		padding-top: 30upx;
		padding-bottom: 30upx;
		width: 92%;
		margin-left: 4%;
		border-bottom: 1px solid #EEEEEE;
	}

	._right_img {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}

	.shop_img_oe {
		width: 45upx;
		height: 45upx;
	}
	.number_moudel {
		background-color: #BE8100;
		color: #FFFFFF;
		font-size: 15upx;
		text-align: center;
		border-radius: 20upx;
		width: 36upx;
		height: 15upx;
		line-height: 1;
		font-weight: 600;
		position: absolute;
		margin-left: 8%;
		margin-top: -1%;
	}
</style>

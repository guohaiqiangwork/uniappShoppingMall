<template>
	<view>
		<!-- <view class="title_top"></view> -->
		<view class="top_moudel_two" style="padding-top:var(--status-bar-height);" v-if="!titleFalg">
			<view class="width33  " @click="goBack"><image v-if="false" src="../../../static/image/icon/top_left.png" class="top_img_width" mode=""></image></view>
			<view class="font_size36 width33 text_center">搜索结果</view>
			<view class="width33 text_right" v-if="false">
				<image @click="open_moudelS" src="../../../static/image/icon/top_right.png" class="top_img_width" mode=""></image>
				<image @click="goFollow" src="../../../static/image/icon/top_right1.png" v-if="collection" class="top_img_width margin_left5" mode=""></image>
		
				<image @click="closeGoFollow" src="../../../static/image/icon/tright2S.png" v-else class="top_img_width margin_left5" mode=""></image>
			</view>
		</view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width10 text_center" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="uni-flex top_content">
				<view class="searce_left" style="width: 7%;">
					<image src="../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<input class="findShop" maxlength="10" :value="inputValue" @input="getInputv" placeholder="请输入要搜索的内容" confirm-type='搜索'
					 type="text" placeholder-style='color:#cccccc' @confirm='Search'/>
				</view>
			</view>

			<view class="font_size28 text_center width15 " style="padding-top: 1%;" @click="goShopCart">
					<view class="number_moudel" v-if="shopCarNumber > 0">{{shopCarNumber}}</view>
				<image src="../../static/image/icon/shopC.png" class="right_img" mode=""></image>
			</view>
		</view>


		<!-- tab -->
		<view class="background_colorff">
			<view class="border_bottom">
				<view class="item_tab" v-for="(item,index) in tabList" :key="index" @click="tabSwitch(index)" :style="tabIndex == index ?'color:#333333;fontWeight:700' :'' ">
					<view class="">
						{{item.name}}
					</view>
					<view class="tab_select" v-if="tabIndex == index "></view>
				</view>
			</view>
			<view class="padding_top3 padding_bottom3" v-if="this.tabIndex == 0">
				<view @click="tabSwichThree(index)" class="item_tab_three" v-for="(item,index) in tabListThree" :key="index" :style="index == 2 ?'border:none' :'' ">
					<view  :class="twoTab == index? 'font_weight700' : ''" >
						{{item.name}}
					</view>
					<view class="jian_moudel " v-if="index == 2">
						<view class="kailong" :style="sortUp ? 'border-bottom: 8upx solid #B98615' :''"></view>
						<view class="kailong1" :style="!sortUp ? 'border-top: 8upx solid #B98615' :''"></view>
					</view>

				</view>
			</view>

		</view>


		<!-- 列表 -->
		<view class="page_width">
			<!-- 商品 -->
			<template v-if="tabIndex == 0">
				<view class="uni-flex list_moudel_search" v-for="(item,index) in queryGoodsList" :key="index">
					<view class="width30" @click="goTodetails(item)">
						<image :src="item.goodsDetail.images" class="list_img" mode=""></image>
					</view>
					<view class="width66">
						<view class="margin_top5 text_hidden font_weight600">
							{{item.title}}
						</view>
						<view class="uni-flex display_space margin_top8">
							<view class="font_size22 font_color66 ">
								<text class="font_colorbe" style="font-size: 28upx;">¥{{item.goodsDetail.price}}</text> /件
							</view>
							<view class="margin_right3" @click="addShopCard(item)">
								<image src="../../static/image/icon/shopCard.png" class="image_list_s" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				
				<view v-if="queryGoodsList.length == 0" class="text_center margin_top18">
					<image src="../../static/image/default/noProduct.png" class="no_img_product" mode=""></image>
					<view class="font_size28 font_color99 margin_top5">
						暂无相关商品~
					</view>
				</view>

			</template>

			<!-- 店铺 -->
			<template v-else>
				<view class=" ">
					<view class="shop_moudel uni-flex" v-for="(item,index) in queryStoreList" :key='index'>
						<view class="width15 text_center">
							<image :src="item.shoreLogo" class="shop_moudel_img" mode=""></image>
						</view>
						<view class="font_size28 margin_top1 width65">
							{{item.storeName}}
						</view>
						<view class="width20">
							<view class="shop_moudel_btn" @click="goToShop(item.id)">
								进店
							</view>
						</view>
					</view>
				</view>
			</template>


			<view v-if="queryStoreList.length > 9">
				<uni-load-more :status="status" :content-text="contentText" color="#999999" />
			</view>

		</view>

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

				sort: 1, //状态
				queryGoodsList: '', //产品列表
				orderBy: 'asc', //价格
				queryStoreList: '', //商铺列


				inputValue: '',
				tabList: [{
						name: '商品'
					},
					{
						name: '店铺'
					}

				],
				tabIndex: 0,
				tabListThree: [{
						name: '综合'
					},
					{
						name: '销量最高'
					},
					{
						name: '价格'
					},
				],
				tabIndexT: 0,
				sortUp: true,
				shopCarNumber:'',//购物车数量
				twoTab:0,
					titleFalg:true
			}
		},
		onLoad(option) {
			this.inputValue = option.searchName;
		},
		onPageScroll(e) {
			// console.log(e)
			e.scrollTop > 80 ? (this.titleFalg = false) : (this.titleFalg = true);
			// console.log(this.titleFalg)
		},
		mounted() {
			this.getQueryGoods(); //查询列表
			this.getShopNumber();//查询购物车数量
		},
		// 上拉加载
		onReachBottom() {
			let _self = this
			this.status = 'loading'
			// uni.showNavigationBarLoading()
			this.pageNum = this.pageNum + 1;
			if (this.tabIndex == 0) {
				this.getQueryGoods(); //调取列表
			} else {
				this.getQueryStore(); //商铺列表
			}

			_self.status = 'more'
			// uni.hideNavigationBarLoading()
		},

		methods: {
			// 输入了回车键
			Search:function(e) {
				if (this.tabIndex == 0) {
					this.getQueryGoods(); //调取列表
				} else {
					this.getQueryStore(); //商铺列表
				}
			},
			// 输入框输入事件
			getInputv:function(e) {
				this.inputValue = e.detail.value;
				console.log(e)
			},
			// tab one
			tabSwitch: function(index) {
				console.log(index)
				this.tabIndex = index;
				this.tabIndex == 0 ? this.getQueryGoods() : this.getQueryStore()
			},
			// tab two
			tabSwichThree: function(index) {
				console.log(index)
				this.twoTab =index;
				
				this.sort = index + 1;
				this.queryGoodsList = [];
				index == 2 ? this.sortUp = !this.sortUp : ''; //价格
				this.sortUp ? this.orderBy = 'asc' : this.orderBy = 'desc';
				this.getQueryGoods(); //查询商铺列表
			},
			// 去产品详情
			goTodetails: function(e) {
				console.log(JSON.stringify(e));
		
				// var e = 1;
				uni.navigateTo({
					url: '../productDetails/productDetails?productId=' + e.id + '&urlFalg=searchList'
				})
			},
			// 去店铺
			goToShop: function(e) {
				uni.navigateTo({
					url: '../shopIndex/shopIndex?shopId=' + e + '&urlFalg=searchList' + '&searchName=' + this.inputValue
				})
			},

			// 返回
			goBack: function() {
				uni.navigateBack()
			},
			// 去购物车
			goShopCart: function() {
				console.log('99')
				uni.navigateTo({
					url:'../shopCart/shopCart'
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
					}
					this.getShopNumber();
				})
						
			},
					

			// 获取产品列表
			getQueryGoods: function() {
				var data = {
					cid1: '', //一级分类
					cid2: '', //	二级分类
					keyword: this.inputValue, //搜索关键字
					limit: 10, //当前条目数
					page: this.pageNum, //当前页数
					sellerId: '', //商户id
					sort: this.sort, //排序 1-综合 2-销量 3-价格 （必填）
					orderBy: this.orderBy //价格排序 asc 正序 desc 倒序
				}
				this.$http.get('/api/common/goods/queryGoods', data).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						if (this.pageNum > 1) {
							if (res.data.data.length > 0) {
								this.queryGoodsList = this.queryGoodsList.concat(res.data.data);
							}
						} else {
							this.queryGoodsList = res.data.data
						}

					}
				})
			},


			// 获取商铺列表
			getQueryStore: function() {
				var data = {
					keyword: this.inputValue, //搜索关键字
					limit: 10, //当前条目数
					page: this.pageNum, //当前页数
				}
				this.$http.get('/api/common/store/queryStore', data).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						if (this.pageNum > 1) {
							if (res.data.data.length > 0) {
								this.queryStoreList = this.queryStoreList.concat(res.data.data);
							}
						} else {
							this.queryStoreList = res.data.data
						}

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
				
			}
		}
	}
</script>

<style lang="less">
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

	// tab

	.item_tab {
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #999999;
		font-size: 28upx;
		height: 65upx;
		line-height: 65upx;
	}


	.tab_select {
		background-color: #BE8100;
		height: 4upx;
		width: 15%;
		border-radius: 2upx;
		margin-left: 42%;
		border: 1px solid #BE8100;
		margin-top: -2%;
	}

	.item_tab_three {
		display: inline-block;
		width: 33%;
		text-align: center;
		color: #0C0C0C;
		font-size: 28upx;
		height: 40upx;
		line-height: 40upx;
		border-right: 1px solid #D8D8D8;
	}

	.jian_moudel {
		position: absolute;
		width: 30upx;
		margin-top: -4.5%;
		margin-left: 24%;
	}

	.kailong {
		width: 0;
		height: 0;
		border-right: 6upx solid transparent;
		border-left: 6upx solid transparent;
		border-bottom: 8upx solid #D8D8D8;
	}

	.kailong1 {
		width: 0;
		height: 0;
		border-right: 6upx solid transparent;
		border-left: 6upx solid transparent;
		border-top: 8upx solid #D8D8D8;
		margin-top: 4upx;
	}

	// 列表
	.list_moudel_search {
		height: 180upx;
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 30upx;
	}

	.list_img {
		width: 180upx;
		height: 180upx;
		border-top-left-radius: 10upx;
		border-bottom-left-radius: 10upx;
	}

	.image_list_s {
		width: 45upx;
		height: 45upx;
		border-radius: 50%;
	}

	// 店铺
	.shop_moudel {
		height: 100upx;
		background: #ffffff;
		border-radius: 10upx;
		padding-top: 20upx;
		margin-top: 30upx;
	}

	.shop_moudel_img {
		width: 60upx;
		height: 60upx;
	}

	.shop_moudel_btn {
		color: #BE8100;
		width: 120upx;
		height: 60upx;
		border: 1pt solid #be8100;
		border-radius: 10upx;
		text-align: center;
		line-height: 60upx;
		font-size: 26upx;
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

<template>
	<view>
		<view class="top_moudel_two" style="padding-top: calc(30upx + var(--status-bar-height))" v-if="!titleFalg">
			<view class="width33  " @click="goBack"><image v-if="false" src="../../../static/image/icon/top_left.png" class="top_img_width" mode=""></image></view>
			<view class="font_size36 width33 text_center">店铺</view>
			<view class="width33 text_right" v-if="false">
				<image @click="open_moudelS" src="../../../static/image/icon/top_right.png" class="top_img_width" mode=""></image>
				<image @click="goFollow" src="../../../static/image/icon/top_right1.png" v-if="collection" class="top_img_width margin_left5" mode=""></image>
		
				<image @click="closeGoFollow" src="../../../static/image/icon/tright2S.png" v-else class="top_img_width margin_left5" mode=""></image>
			</view>
		</view>
		<!-- 头部 -->
		<view class="" style="height: 280upx;">
			<image src="../../static/image/beij/shopIndex.png" class="image_width" mode=""></image>
			<view class="login_moudel" style="padding-top: calc(5upx + var(--status-bar-height))">
				<!-- 搜索框 -->
				<view class="uni-flex  padding_bottom2 padding_top2">
					<view class="width10 text_center" style="padding-top: 1%;" @click="goBack">
						<image src="../../static/image/icon/leftF.png" class="balk_img" mode=""></image>
					</view>
					<!-- 搜索框 -->
					<view class="uni-flex top_content">
						<view class="searce_left">
							<image src="../../static/image/icon/serchf.png" class="searce_width" mode=""></image>
						</view>
						<view class="searce_right_input">
							<input style="color: #FFFFFF;font-size: 26upx;" class="findShop"  :value="inputValue" @input="getInputv"
							 placeholder="请输入要搜索的内容" confirm-type='搜索' type="text" @confirm='Search' placeholder-style='color:#FFFFFF' />
						</view>
					</view>
				</view>

				<!-- 店铺 -->
				<view class="uni-flex margin_top3">
					<view class=" width15 text_center">
						<image :src="shopDetail.storeLogo" class="shop_img_w" mode=""></image>
					</view>
					<view class="uni-flex margin_top1 width60"  @click="goShopDetail(shopDetail)">
						<view class="font_size28 font_colorff">
							{{shopDetail.storeName}}
						</view>
						<view class="margin_left3">
							<image src="../../static/image/icon/rightF.png" class="shop_img_two" mode=""></image>
						</view>
					</view>
					<view class="">
						<view class="shop_btn uni-flex display_center" @click="goFollow" v-if="collection">
							<view class="">
								<image src="../../static/image/icon/trightf.png" class="rightf_img" mode=""></image>
							</view>
							<view class="font_size26 font_colorff" style="margin-left: 10upx;">
								关注
							</view>
						</view>

						<view v-else class="top_btn" @click="closeGoFollow">
							已关注
						</view>

					</view>
				</view>


			</view>
		</view>
		
		<!-- 底部tab -->
		<view class="background_colorff" v-if="tabIndexTwo == 'home'">
			<view class="padding_top3 padding_bottom3">
				<view @click="tabSwichThree(index)" class="item_tab_three" v-for="(item,index) in tabListThree" :key="index" :style="index == 2 ?'border:none' :'' ">
					<view class="" :class="twoTab == index? 'font_weight700' : ''">
						{{item.name}}
					</view>
					<view class="jian_moudel" v-if="index == 2">
						<view class="kailong" :style="sortUp ? 'border-bottom: 8upx solid #B98615' :''"></view>
						<view class="kailong1" :style="!sortUp ? 'border-top: 8upx solid #B98615' :''"></view>
					</view>
				</view>
			</view>


		</view>

		<!-- 列表 -->
		<view class=" ">
			<template v-if="tabIndexTwo == 'home'">
				<view class="list_itemone" v-for="(item,index) in queryGoodsList" :key="index" @click="goProductDetails(item.id)">
					<view class="">
						<image :src="item.goodsDetail.images" class="list_imgone" mode=""></image>
					</view>
					<view class="font_size30 font_weight600 text_hidden margin_left3">
						{{item.title}}
					</view>
					<view class="font_colorbe font_sise28  padding_bottom3 margin_top3" style="margin-left: 20upx;">
						<text class="font_size22 font_weight600" >¥</text>
						<text style="font-size: 28upx;font-weight: 700;"> {{item.goodsDetail.price}}</text>
						<text class="font_size22 font_color66">/件</text>
					</view>
				</view>

				<view v-if="queryGoodsList.length == 0" class="text_center margin_top18">
					<image src="../../static/image/default/noProduct.png" class="no_img_product" mode=""></image>
					<view class="font_size28 font_color99 margin_top5">
						暂无相关商品~
					</view>
				</view>

				<view v-if="queryGoodsList.length > 9">
					<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
				</view>
			</template>

		</view>

		<!-- 分类 -->
		<template v-if="tabIndexTwo != 'home'">
			<view class="uni-flex">
				<view class="width25" style="min-height: 1040upx;background-color: #FAFAFA ;">
					<view @click="leftTab(item.id)" :class="leftIndex  == item.id ? '_left_active' :'_left'" v-for="(item,index) in leftList"
					 :key="index">
						{{item.name}}
					</view>
				</view>

				<view class="width75 background_colorff" style="min-height: 1140upx;">
					<view @click="goProductDetails(item.id)" class="uni-flex border_bottom _right_moudel" v-for="(item,index) in rightList" :key="index">
						<view class="">
							<image :src="item.goodsDetail.images" class="_right_img" mode=""></image>
						</view>
						<view class="margin_left3">
							<view class="font_size26 text_hidden ">
								{{item.title}}
							</view>
							<view class="font_size22 font_color99 text_hidden">
								{{item.subTitle}}
							</view>
							<view class="font_sise28 font_colorbe">
								<text class="font_size26">¥</text>
								 {{item.goodsDetail.price}}
								<text class="font_size22 font_color99">/件</text>
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

		</template>



		<!-- bottom_tab -->
		<view class="bottom_tab_list">
			<view @click="tabSwichTwo(index)" class="item_tab_two" v-for="(item,index) in tabListTwo" :key="index" :style="index == 2 ?'border:none' :'' ">
				<view v-if="tabIndexTwo == item.imgF">
					<image :src="item.imgUrlF" class="bottom_img_tab" mode=""></image>
				</view>
				<view v-else>
					<!-- <image src="../../static/image/icon/top_left.png" mode=""></image> -->
					<image :src="item.imgUrl" class="bottom_img_tab" mode=""></image>
				</view>
				<view class="font_size22">
					{{item.name}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				rightList:'',
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
				tabListTwo: [{
						name: '首页',
						imgF: 'home',
						imgUrl: '../../static/image/icon/shopB.png',
						imgUrlF: '../../static/image/icon/shopBz.png'
					},
					{
						name: '分类',
						imgF: 'fenl',
						imgUrl: '../../static/image/icon/fenlB.png',
						imgUrlF: '../../static/image/icon/fenlBz.png'
					}
				],
				tabIndexTwo: 'home',
				leftList:'' ,//分类左面数据
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

				leftIndex: '', //分类左面数据
				inputValue: '', //输入框值
				sellerId: '', //店铺id
				orderBy: 'asc', //价格
				sort: 1, //type
				queryGoodsList: '', //商铺列表
				shopDetail: '', //店铺详情
				collection: true, //是否关注
				twoTab:'',
				titleFalg:true
			}
		},
		onPageScroll(e) {
			// console.log(e)
			e.scrollTop > 80 ? (this.titleFalg = false) : (this.titleFalg = true);
			// console.log(this.titleFalg)
		},
		onLoad(option) {
			console.log(option.urlFalg);
			console.log(option);
			if (option.searchName) {
				this.inputValue = option.searchName;
			}
			this.sellerId = option.shopId

			// this.urlFalgD = option.urlFalg
		},
		mounted() {
			this.getQueryGoods('home'); //获取产品列表
			this.getShopDetail(); //获取商铺详情
		
			this.getShopSeller();//获取分类
		},
		methods: {
			// 输入了回车键
			Search(e) {
				console.log(e.detail.value);
				this.inputValue = e.detail.value;
				if(this.tabIndexTwo == 'home'){
					uni.navigateTo({
						url:'../shopIndexSearch/shopIndexSearch?inputValue=' + this.inputValue + '&shopId=' + this.sellerId
					})
				}else{
					this.getQueryGoods(this.tabIndexTwo); //获取产品列表
				}
				
			},
			// 输入框输入事件
			getInputv: function(e) {
				this.inputValue = e.detail.value;
				console.log(e)
			},
			// 去店铺详情
			goShopDetail:function(item){
				console.log(item)
				uni.navigateTo({
					url:'../shopDetails/shopDetails?shopId=' + item.id
				})
			},
			// 返回
			goBack: function() {
				uni.navigateBack()
			},
			// tab
			tabSwichThree: function(index) {
				console.log(index)
				this.twoTab =index;
				this.sort = index + 1;
				this.queryGoodsList = [];
				index == 2 ? this.sortUp = !this.sortUp : ''; //价格
				this.sortUp ? this.orderBy = 'asc' : this.orderBy = 'desc';
				this.getQueryGoods('home'); //获取产品列表
			},
			// 底部导航
			tabSwichTwo: function(index) {
				console.log(index)
				if (index == 1) {
					this.tabIndexTwo = 'fenl';
				} else {
					this.tabIndexTwo = 'home';
				}

			},
			// 分类在左面
			leftTab: function(id) {
				this.leftIndex = id;
				this.rightList =[];
				this.getQueryGoods();//查询分类商品
			},

			// 去产品详情
			goProductDetails: function(id) {
				console.log('99')
				uni.navigateTo({
					url: '../productDetails/productDetails?productId=' + id
				})
			},


			// 获取产品列表
			getQueryGoods: function(falg) {
				
				var data = {
					cid1: '', //一级分类
					cid2: '', //	二级分类
					keyword: this.inputValue, //搜索关键字
					limit: 10, //当前条目数
					page: this.pageNum, //当前页数
					sellerId: this.sellerId, //商户id
					sort: this.sort, //排序 1-综合 2-销量 3-价格 （必填）
					orderBy: this.orderBy //价格排序 asc 正序 desc 倒序
				}
				falg == 'home' ? '' : data.cid2 = this.leftIndex;
				this.$http.get('/api/common/goods/queryGoods', data).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						if(falg == 'home'){
							if (this.pageNum > 1) {
								if (res.data.data.length > 0) {
									this.queryGoodsList = this.queryGoodsList.concat(res.data.data);
								}
							} else {
								this.queryGoodsList = res.data.data
							}
						}else{
							if (this.pageNum > 1) {
								if (res.data.data.length > 0) {
									this.rightList = this.rightList.concat(res.data.data);
								}
							} else {
								this.rightList = res.data.data
							}
						}
						

					}
				})
		
			},
			


			//查询店铺详情
			getShopDetail: function() {
				var data = {
					sellerId: this.sellerId, //商户id
				}
				this.$http.get('/api/common/store/detail', data).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						this.shopDetail = res.data.data;
							this.getShopFollow(); //查询是否关注

					}
				})
			},
			//查询店铺是否关注
			getShopFollow: function() {
				var data = {
					storeId: this.shopDetail.id, //商户id
					mbId: uni.getStorageSync('userId')
				}
				this.$http.get('/api/store/ckeckUserFollow', data, true).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						this.collection = !res.data.data; //是否关注
					}
				})
			},
			
			
			//查询分类
			getShopSeller: function() {
				var data = {
					sellerId: this.sellerId, //商户id
				}
				this.$http.get('/api/common/category/seller', data, true).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						this.leftList = res.data.data; //左面列表
						console.log(res.data.data[0].id + '左面列表')
						this.leftIndex = res.data.data[0].id;
						this.getQueryGoods(this.leftIndex);//查询右面列表
					}
				})
			},
			//产品关注
			goFollow: function() {
				let _this = this;
				var followData = {
					mbId: uni.getStorageSync('userId'),
					storeId: this.shopDetail.id, //商户id
				}
				_this.$http.get('/api/store/follow', followData, true).then(res => {
					if (res.data.code == 200) {
						_this.getShopFollow();
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'center',
						});
					}
				})

			},
			// 取消关注
			closeGoFollow: function() {
				let _this = this;
				var followData = {
					mbId: uni.getStorageSync('userId'),
					storeId: this.shopDetail.id, //商户id
				}
				_this.$http.get('/api/store/cancel', followData, true).then(res => {
					if (res.data.code == 200) {
						_this.getShopFollow();
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'center',
						});
					}
				})

			},





		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FAFAFA;
	}
	.image_width {
		position: absolute;
		width: 100%;
		height: 280upx;
	}


	.login_moudel {
		position: relative;
		width: 94%;
		margin-left: 3%;
		padding-top: 5%;
	}

	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.top_content {
		height: 66upx;
		background: #333333;
		border-radius: 12upx;
		font-size: 26upx;
		width: 90%;
	}

	.searce_right_input {
		padding-top: 2%;
		padding-left: 3%;
		width: 80%;
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
		background: linear-gradient(to right, #edcb80, #a58747);
		border-radius: 10upx;
		align-items: center;
	}

	.rightf_img {
		width: 30upx;
		height: 30upx;
		margin-top: 16upx;
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

	.list_itemone {
		display: inline-block;
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin-top: 30upx;
		margin-left: 3%;
		width: 45%;
		
		
		// width: 48.5%;
		// margin-left: 10upx;
		// height: 160upx;
		// background-color: #FFFFFF;
		// border-radius: 20upx;
		// display: inline-flex;
	}

	.list_imgone {
		width: 100%;
		height: 330upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}

	.bottom_tab_list {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #FFFFFF;
		padding-top: 10upx;
	}

	.bottom_img_tab {
		width: 48upx;
		height: 48upx;
	}

	.item_tab_two {
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #0C0C0C;
		font-size: 28upx;
		height: 98upx;
		// line-height: 40upx;
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
		padding-right: 30upx;
		padding-top: 30upx;
		width: 94%;
		margin-left: 3%;
	}

	._right_img {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
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
</style>

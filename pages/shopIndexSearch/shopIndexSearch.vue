<template>
	<view>
		<!-- 头部 -->
		<view class="" >
			<view class="login_moudel">
				<!-- 搜索框 -->
				<view class="uni-flex border_bottom  padding_bottom2 padding_top2">
					<view class="width10 text_center margin_top1" style="padding-top: 1%;" @click="goBack">
						<image src="../../static/image/icon/left.png" class="balk_img " mode=""></image>
					</view>
					<!-- 搜索框 -->
					<view class="uni-flex top_content">
						<view class="searce_left">
							<image src="../../static/image/icon/search.png" class="searce_width" mode=""></image>
						</view>
						<view class="searce_right_input">
							<input style="color: #333333;font-size: 26upx;" class="findShop" maxlength="10" :value="inputValue" @input="getInputv"
							 placeholder="请输入要搜索的内容" confirm-type='搜索' type="text" @confirm='Search' placeholder-style='color:#333333' />
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
		<view class="page_width ">
			<template v-if="tabIndexTwo == 'home'">
				<view class="list_itemone" v-for="(item,index) in queryGoodsList" :key="index" @click="goProductDetails(item.id)">
					<view class="">
						<image :src="item.goodsDetail.images" class="list_imgone" mode=""></image>
					</view>
					<view class="font_size30 text_hidden margin_left3">
						{{item.title}}
					</view>
					<view class="font_colorbe font_sise28 margin_left3 padding_bottom3">
						<text class="font_size22">¥</text>
						{{item.goodsDetail.price}}
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


	
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			}
		},
		onLoad(option) {
			console.log(option.inputValue);
			console.log(option);
			if (option.inputValue) {
				this.inputValue = option.inputValue;
			}
			this.sellerId = option.shopId
		},
		mounted() {
			this.getQueryGoods('home'); //获取产品列表
		},
		methods: {
			// 输入了回车键
			Search(e) {
				console.log(e.detail.value);
				this.inputValue = e.detail.value;
				this.getQueryGoods('home'); //获取产品列表
			},
			// 输入框输入事件
			getInputv: function(e) {
				this.inputValue = e.detail.value;
				console.log(e)
			},
			// 返回
			goBack: function() {
				uni.navigateBack()
			},
			// tab
			tabSwichThree: function(index) {
				console.log(index);
				this.twoTab =index;
				this.sort = index + 1;
				this.queryGoodsList = [];
				index == 2 ? this.sortUp = !this.sortUp : ''; //价格
				this.sortUp ? this.orderBy = 'asc' : this.orderBy = 'desc';
				this.getQueryGoods('home'); //获取产品列表
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
			





		}
	}
</script>

<style lang="scss">
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
		background: #f8f8f8;
		border-radius: 12upx;
		font-size: 26upx;
		width: 90%;
	}

	.searce_right_input {
		padding-top: 2%;
		padding-left: 3%;
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
		background: linear-gradient(#edcb80, #a58747);
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
		margin-left: 20upx;
		width: 330upx;
	}

	.list_imgone {
		width: 330upx;
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
		height: 42upx;
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
	}

	._right_moudel {
		padding-left: 30upx;
		padding-top: 30upx;
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

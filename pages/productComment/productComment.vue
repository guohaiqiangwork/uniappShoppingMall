<template>
	<view>
		
		<!-- 标题 -->
		<view class="background_colorff title_moudel padding_top2 "  style="position: fixed;width: 100%; background-color: #ffffff;z-index: 9;margin-top: -20upx;padding-top: calc(30upx + var(--status-bar-height))">
		<!-- <view class="title_top"></view> -->
			<view class="border_bottom">
				<view class="page_width uni-flex">
					<view class="width40" @click="goBack">
						<image src="../../static/image/icon/left.png" class="title_img" mode=""></image>
					</view>
					<view class="font_size36 width35">
						商品评价
					</view>
					<view class="width25 text_right margin_top2">
						<image @click="open_moudelS" src="../../static/image/icon/tright.png" class="top_img_width margin_right3" style="margin-right: 30upx;" mode=""></image>
						<image src="../../static/image/icon/tright2.png" @click="goFollow" v-if="collection" class="top_img_width margin_left5"
						 mode=""></image>
						<image @click="closeGoFollow" src="../../static/image/icon/tright3.png" v-else class="top_img_width margin_left5" mode=""></image>
					</view>
				</view>
			</view>

			<!-- tab -->
			<view class="padding_top2" >
				<view :class="tabIndex == index ? 'item_tab_one'  : 'item_tab'" v-for="(item,index) in tabList" :key="index" @click="tabSwitch(index)">
					<view >
						{{item.name}}
					</view>
					<view class="tab_select" v-if="tabIndex == index "></view>
				</view>

			</view>
		</view>


		<!-- 列表 -->

		<view class="page_width" style="padding-top: 200upx;padding-bottom: 15%;">
			<!-- <scroll-view style="margin-top: 200upx;padding-bottom: 100upx;"> -->
			<view class="list_moudel_contern " style="margin-top: 30upx;" v-for="(item,index) in evaluateList" :key="index">
				<view class="uni-flex display_space">
					<view class="uni-flex width80">
						<view class="width15">
							<image :src="item.headImgurl" class="list_heard" mode=""></image>
						</view>
						<view class="font_size24 margin_left3 margin_top3 width15">
							{{item.nickName}}
						</view>
						<view class="margin_left2" style="margin-top:6%;">
							<uni-rate size="18" disabled="true" color="#ffffff" active-color="#B99445" :value="item.score"></uni-rate>
						</view>
					</view>
					<view class="font_size22 font_color99 width20 margin_top3">
						{{item.createTime}}
					</view>
				</view>

				<view class="font_size24">
					{{item.content}}
				</view>
				<view class="margin_top2" style="margin-left: -20upx;">
					<view class="display_inline" v-for="(item,index) in item.images" :key="index">
						<image :src="item" class="moudel_img2" mode=""></image>
					</view>

				</view>
			</view>
			<view v-if="evaluateList.length > 9">
				<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
			</view>

			<view v-if="evaluateList.length == 0" class="text_center margin_top18">
				<image src="../../static/image/default/noComment.png" class="no_img_comment" mode=""></image>
				<view class="font_size28 font_color99 margin_top5">
					暂无评价~
				</view>
			</view>
		</view>


		<!-- 底导 -->
		<view class="uni-flex bottom_view">
			<view class="uni-flex text_center width33 margin_top2">
				<view class="width50">
					<view class="">
						<image src="../../static/image/icon/dianp.png" class="bottom_img" mode=""></image>
					</view>
					<view class="font_size22" style="margin-top: -8%;">
						店铺
					</view>
				</view>
				<view class="width50">
					<view class="number_moudel" v-if="shopCarNumber > 0">{{shopCarNumber}}</view>
					<view class="" @click="goShopCart">
						<image src="../../static/image/icon/shopC.png" class="bottom_img" mode=""></image>
					</view>
					<view class="font_size22" style="margin-top: -8%;">
						购物车
					</view>
				</view>
			</view>
			<view class="width33 left_bottom">
				加入购物车
			</view>
			<view class="width33 left_bottom" style="background-color: #BE8100;">
				立即购买
			</view>
		</view>
		
		
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
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				tabList: [{
						name: '全部'
					},
					{
						name: '好评'
					},
					{
						name: '差评'
					}

				],
				tabIndex: 0,
				evaluateList: '', //列表数据
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
				collection: true, //是否关注


				rateNumber: 3,
				urlFalg: '',
				pruductId: '', //产品编码
				type: 1, //类型
				shopCarNumber:'',
				shareFalg: false, //分享
			}
		},
		onLoad(option) {
			console.log(option.urlFalg);
			console.log(option.pruductId);
			this.productId = option.pruductId


		},
		mounted() {
			this.getFindAll(); //查询全部
			this.queryFollow(); //是否关注
		},
		
		// 上拉加载
		onReachBottom() {
			let _self = this
			this.status = 'loading'
			// uni.showNavigationBarLoading()
			this.pageNum = this.pageNum + 1;
			this.getFindAll(); //调取列表
			_self.status = 'more'
			// uni.hideNavigationBarLoading()
		},

		methods: {
			tabSwitch: function(index) {
				console.log(index)
				this.tabIndex = index;
				this.type = index + 1;
				this.evaluateList = [];
				this.pageNum = 1
				this.getFindAll();
			},
			// 分享
			close_moudelS: function() {
				this.shareFalg = false;
			},
			open_moudelS: function() {
				this.shareFalg = true;
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
			},
				
			// 返回
			goBack() {
				uni.navigateBack()
			},
			// 去购物车
			goShopCart() {
				uni.switchTab({
					url: '../tabBar/shopCart/shopCart'
				})
			},
			getShopNumber:function(){
				// 查询购物车数量
					var shopNumber = {
						mbId: uni.getStorageSync('userId')
					}
					this.$http.get('/api/cart/countShopCartNum', shopNumber, true).then(res => {
						if (res.data.code == 200) {
							this.shopCarNumber = res.data.data
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
						// 获取评价
			getFindAll: function() {
				// 查询评价
				var dataP = {
					spuId: this.productId,
					limit: '10', //每页条目数
					page: this.pageNum, //当前页
					type: this.type //类型
				}
				this.$http.get('/api/common/evaluation/list', dataP).then(res => {
					if (res.data.code == 200) {
						if (this.pageNum > 1) {
							if (res.data.data.length > 0) {
								this.evaluateList = this.evaluateList.concat(res.data.data);
							}
						} else {
							this.evaluateList = res.data.data
						}
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
			//产品关注
			goFollow: function() {
				let _this = this;
				var followData = {
					mbId: uni.getStorageSync('userId'),
					spuId: _this.productId
				}
				_this.$http.get('/api/goods/follow', followData, true).then(res => {
					if (res.data.code == 200) {
						_this.queryFollow();
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
							position: 'center'
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
				}
				_this.$http.get('/api/goods/ckeckUserFollow', followData, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res) + 'sfgjlk s')
						_this.collection = !res.data.data; //是否关注
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
	.title_moudel {
		// position: fixed;
		// top: 0;
		width: 100%;
		// z-index: 9999;
	}

	.title_img {
		width: 16upx;
		height: 28upx;
	}

	.top_img_width {
		width: 30upx;
		height: 30upx;
	}

	.item_tab {
		display: inline-block;
		width: 33%;
		text-align: center;
		color: #0C0C0C;
		font-size: 28upx;
		height: 65upx;
		line-height: 65upx;
	}
	.item_tab_one{
		display: inline-block;
		width: 33%;
		text-align: center;
		color: #0C0C0C;
		font-size: 28upx;
		height: 65upx;
		line-height: 65upx;
		font-weight: 700;
	}

	.tab_select {
		background-color: #BE8100;
		height: 4upx;
		width: 15%;
		border-radius: 2upx;
		margin-left: 42%;
		border: 1px solid #BE8100;
	}

	.list_moudel_contern {
		background: #ffffff;
		border-radius: 20upx;
		// padding: 3%;
		padding-top: 3%;
		padding-left: 3%;
		padding-bottom: 3%;
	}

	.list_heard {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
	}

	.moudel_img2 {
		width: 210upx;
		height: 210upx;
		border-radius: 20upx;
		margin-left: 20upx;
	}

	.bottom_view {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 98upx;
		background-color: #FFFFFF;
		z-index: 100;
	}

	.left_bottom {
		height: 98upx;
		background: #3c3d3e;
		text-align: center;
		line-height: 98upx;
		color: #FFFFFF;
		font-size: 30upx;
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
		margin-left: 10%;
		margin-top: -1%;
	}

	.bottom_img {
		width: 40upx;
		height: 40upx;
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

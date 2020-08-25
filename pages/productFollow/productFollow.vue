<template>
	<view>
		<!-- <view class="title_top"></view> -->
		<view class="top_moudel_two" style="padding-top: calc(30upx + var(--status-bar-height))" v-if="!titleFalg">
			<view class="width30 text_left margin_left3" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="width50 text_center font_size36">
				商品关注
			</view>
			<view @click="edit" class="font_size30 width20 text_right width30 margin_right3 " style="padding-top: 1%;margin-right: 30upx;">
				{{titleRight}}
			</view>
		</view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2" style="padding-top: calc(20upx + var(--status-bar-height))" v-if="titleFalg">
			<view class="width30 text_left margin_left3" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="width50 text_center font_size36">
				商品关注
			</view>
			<view @click="edit" class="font_size30 width20 text_right width30 margin_right3 " style="padding-top: 1%;margin-right: 30upx;">
				{{titleRight}}
			</view>
		</view>
		<!-- 列表 -->
		<view class=" " >
			<view class="uni-flex" v-for="(item,index) in productList" :key="index">
				<!-- 左边 -->
				<view :class="leftFalg ? 'left_check' : 'left_checkn'" v-if="leftFalg">
					<image src="../../static/image/beij/pcheck1.png" v-if="item.oneChecked"  @click="changeCheckbox(index)" class="leftimg" mode=""></image>
					<image src="../../static/image/beij/pcheck.png" v-else @click="changeCheckbox(index)" class="leftimg" mode=""></image>
				</view>
				<!-- 右边 -->
				<view class="uni-flex" :class=" leftFalg ? 'product_moudel_list':'product_moudel_listn' ">
					<view class="width30" @click="goProductD(item.goodsDetail.spuId)">
						<image :src="item.goodsDetail.images" class="list_imgp" mode=""></image>
					</view>
					<view class="width66">
						<view class="font_sise28 margin_top3 text_hidden" @click="goProductD(item.goodsDetail.spuId)">
							{{item.goodsDetail.title}}
						</view>
						<view class="uni-flex margin_top8">
							<view class="font_sise28 font_colorbe margin_top3 width70 font_weight600">
								<text class="font_size22 font_weight500">¥</text> {{item.goodsDetail.price}} <text class="font_size22 font_color99 font_weight500">/件</text>
							</view>
							<view class="width30 margin_top3 text_right" @click="addShopCard(item)">
								<image src="../../static/image/icon/shop.png" class="rightimg" mode=""></image>
							</view>
						</view>

					</view>
				</view>

			</view>
			
			<view class="" v-if="productList.length > 9">
				<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
			</view>
			
			<view v-if="productList.length == 0" class="text_center margin_top18">
				<image src="../../static/image/default/noCollection.png" class="no_img_order" mode=""></image>
				<view class="font_size28 font_color99 margin_top5">
					暂无记录~
				</view>
			</view>
		
		</view>


		<!-- 操作按钮 -->
		<view class="btnBottom uni-flex" v-if="leftFalg">
			<view class="display_center  width30 uni-flex margin_left2" style="padding-top: 30upx;">
				<view class="" @click="allChoose">
					<image class="leftimg"  v-if="allChecked" src="../../static/image/beij/pcheck1.png" mode=""></image>
					<image class="leftimg" v-else src="../../static/image/beij/pcheck.png" mode=""></image>
				</view>
				<view class="font_size24 font_color66 " style="margin-left: 10upx;">
					全选
				</view>
			</view>
			<view class="btnBottom_right width70 margin_left2"  @click="getBatchCancel">
				取消关注
			</view>
		</view>


		<!-- 提示框 -->
		<template v-if="pfalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">
						确认要取消关注该商品吗？
					</view>
					<view class="uni-flex " style="margin-top: 80upx;"> 
						<view class="leftbtn" @click="closemoudel">
							取消
						</view>
						<view class="rightbtn" @click="okMoudel">
							确认
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
				titleRight: '编辑',
				leftFalg: false,
				pfalg: false,
				
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
				productList: [],
				allChecked:false,
				producrIds:[],
				titleFalg:true
			}
		},
		onLoad(option) {
			// console.log(option.falg)
			// option.falg == 's' ? this.falgSX = true : this.falgSX = false;
		},
		onPageScroll(e) {
			// console.log(e)
			e.scrollTop > 80 ? (this.titleFalg = false) : (this.titleFalg = true);
			// console.log(this.titleFalg)
		},
		onReachBottom() {
			let _self = this
			this.status = 'loading'
			this.pageNum = this.pageNum + 1;
			this.getMoneyList(); //调取列表
			_self.status = 'more'
		},
		mounted() {
			this.getMoneyList()
		},
		methods: {
			// 获取列表
			getMoneyList: function() {
				var data = {
					limit: 10,
					mbId: uni.getStorageSync('userId'),
					page: this.pageNum,
				}
				this.$http.get('/api/goods/followList', data, true).then(res => {
					if (res.data.code == 200) {
						for (let item of res.data.data) {
							item.oneChecked = false;
						}
						if (this.pageNum > 1) {
							if (res.data.data.length > 0) {
								this.productList = this.productList.concat(res.data.data);
							}
						} else {
							this.productList = res.data.data
						}
					}
				})
			},
			
			// 取消操作
			getBatchCancel: function() {
				if(this.producrIds.length == 0){
					console
					uni.showToast({
						title:'请选择商品',
						icon:'none',
						duration:2000,
						position:top
					});
					return
				}
				this.pfalg = true;
				
			},
			
			//商户全选事件
			allChoose:function(e) {
				this.allChecked = !this.allChecked;
				console.log('99')
				if (this.allChecked) {
					for (let item of this.productList) {
						item.oneChecked = true;
					}
				} else {
					for (let item of this.productList) {
						item.oneChecked = false;
					}
				}
				this.getCalculation(); //计算总价
			},
			// 多选复选框改变事件
			changeCheckbox:function(index) {
				this.productList[index].oneChecked = !this.productList[index].oneChecked;
				let dataList = [];
				for (let item of this.productList) {
					if (item.oneChecked) {
						dataList.push(item.oneChecked)
					}
				}
				if (dataList.length == this.productList.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			
				this.getCalculation()
			},
			
			// 计算价格 总价及数据的一个处理
			getCalculation: function() {
				var ids = []; //总价
				for (let item of this.productList) {
					if (item.oneChecked) {
						ids.push(item.id); //计算总计a
					} 
				}
				this.producrIds = ids
			},
			
			
					
					
			
			
			
			goBack() {
				uni.navigateBack()
			},
			edit:function() {
				this.leftFalg = !this.leftFalg
				// this.titleRight = '完成'
				console.log(this.leftFalg )
				this.leftFalg  ? this.titleRight = '完成' : this.titleRight = '编辑';
				if(this.titleRight == '完成'){
					this.allChecked = false
					for (let item of this.productList) {
						item.oneChecked = false;
					}
				}
			},
			// 确认取消
			okMoudel:function(){
				
				var data = {
					ids: this.producrIds.join(","),
				}
				this.$http.post('/api/goods/batchCancel', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res))
						this.pfalg = false;
						this.allChecked = false;
						this.getMoneyList();
						this.leftFalg = !this.leftFalg
						console.log(this.leftFalg )
						this.leftFalg  ? this.titleRight = '完成' : this.titleRight = '编辑'
						uni.showToast({
							title:'取消成功',
							icon:'none',
							duration:2000,
							position:top
						});
						
					
					}
				})
			},
			// 取消
			closemoudel:function(){
				this.pfalg = false
			},
			// 加入购物车
			addShopCard: function(item) {
				var data = {
					mbId: uni.getStorageSync('userId'),
					oper: 'add',
					sellerId: item.sellerId,
					skuId: item.goodsDetail.id,
					spuId: item.goodsDetail.spuId
				}
				this.$http.post('/api/cart/save', data, true).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '添加成功',
							icon: 'none',
							duration: 2000,
							position: 'center',
						});
					}
				})
			},
			
			// 去产品详情
			goProductD:function(productId) {
				console.log(productId);
				

				uni.navigateTo({
					url: '../productDetails/productDetails?productId=' + productId
				})
			
			},
			
		}
	}
</script>

<style lang="less">
	page{
		background-color: #FAFAFA;
	}
	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.product_moudel_list {
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 30upx;
		height: 180upx;
		width: 85%;
	}

	.product_moudel_listn {
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 30upx;
		height: 180upx;
		width: 92%;
		margin-left: 4%;
		
	}

	.list_imgp {
		width: 180upx;
		height: 180upx;
		border-top-left-radius: 10upx;
		border-bottom-left-radius: 10upx;
	}

	.rightimg {
		width: 45upx;
		height: 45upx;
		margin-top: 2%;
	}

	.leftimg {
		width: 30upx;
		height: 30upx;
	}

	.left_check {
		width: 10%;
		text-align: center;
		height: 210upx;
		line-height: 260upx;
		background-color: #FAFAFA;
	}

	.left_checkn {
		display: none;
	}

	.btnBottom {
		position: fixed;
		bottom: 0;
		height: 98upx;
		width: 100%;
		background-color: #FFFFFF;
	}

	.btnBottom_right {
		width: 602px;
		height: 98upx;
		background: #3c3d3e;
		line-height: 98upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 30upx;
	}

	.product_content_block {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		height: 362upx;
		width: 600upx;
		margin-left: 75upx;
	}

	.leftbtn {
		width: 220upx;
		height: 78upx;
		border: 1px solid #3c3d3e;
		border-radius: 10px;
		text-align: center;
		color: #3C3D3E;
		line-height: 78upx;
		margin-left: 45upx;
	}

	.rightbtn {
		width: 220upx;
		height: 78upx;
		background: #3c3d3e;
		border-radius: 10px;
		color: #FFFFFF;
		text-align: center;
		line-height: 78upx;
		margin-left: 45upx;
	}
</style>

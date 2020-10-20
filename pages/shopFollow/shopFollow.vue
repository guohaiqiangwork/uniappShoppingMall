<template>
	<view>
		<!-- 头部搜索 -->
		<view class="" style="position: fixed;width: 100%;z-index: 99;">
			<view class="uni-flex  background_colorff padding_bottom2 padding_top2" style="padding-top: calc(20upx + var(--status-bar-height))">
				<view class="width30 text_left margin_left3" style="padding-top: 1%;" @click="goBack">
					<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
				</view>
				<!-- 搜索框 -->
				<view class="width50 text_center font_size36">
					店铺关注
				</view>
				<view @click="edit" class="font_size20 width20 text_right width30 margin_right3 " style="padding-top: 1%;">
					{{titleRight}}
				</view>
			</view>
		</view>
		
		<!-- 列表 -->
		<view class=" "  style="padding-top: 160upx;">
			<view class="uni-flex" v-for="(item,index) in productList" :key="index">
				<!-- 左边 -->
				<view :class="leftFalg ? 'left_check' : 'left_checkn'" v-if="leftFalg">
					<image src="../../static/image/beij/pcheck1.png" v-if="item.oneChecked" @click="changeCheckbox(index)" class="leftimg"
					 mode=""></image>
					<image src="../../static/image/beij/pcheck.png" v-else @click="changeCheckbox(index)" class="leftimg" mode=""></image>
				</view>
				<!-- 右边 -->
				<view class="uni-flex" :class=" leftFalg ? 'product_moudel_list':'product_moudel_listn' ">
					<view class="width15">
						<image :src="item.store.storeLogo" class="list_imgp" mode=""></image>
					</view>
					<view style="width: 85%;">
						<view class="uni-flex">
							<view class="font_sise28 margin_top1 width75">
								{{item.store.storeName}}
							</view>
							<view class="width20 text_right" @click="goShopIndex(item)">
								<view class="listrightbtn">
									进店
								</view>
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
					<image class="leftimg" v-if="allChecked" src="../../static/image/beij/pcheck1.png" mode=""></image>
					<image class="leftimg" v-else src="../../static/image/beij/pcheck.png" mode=""></image>
				</view>
				<view class="font_size24 font_color66 " style="margin-left: 10upx;">
					全选
				</view>
			</view>
			<view class="btnBottom_right width70" @click="getBatchCancel">
				取消关注
			</view>
		</view>


		<!-- 提示框 -->
		<template v-if="pfalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">
						确认要取消关注该店铺吗？
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
				allChecked: false,
				producrIds: [],
				titleFalg:true
			}
		},
		onLoad(option) {
			// console.log(option.falg)
			// option.falg == 's' ? this.falgSX = true : this.falgSX = false;
		},
		onPageScroll(e) {
			// console.log(e)
			// e.scrollTop > 80 ? (this.titleFalg = false) : (this.titleFalg = true);
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
				this.$http.get('/api/store/followList', data, true).then(res => {
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
				this.pfalg = true;

			},


			//商户全选事件
			allChoose: function(e) {
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
			changeCheckbox: function(index) {
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




			goBack: function() {
				uni.navigateBack()
			},
			edit: function() {
				this.leftFalg = !this.leftFalg
				this.leftFalg ? this.titleRight = '完成' : this.titleRight = '编辑'
				if(this.titleRight == '完成'){
					this.allChecked = false
					for (let item of this.productList) {
						item.oneChecked = false;
					}
				}
			},
			// 确认取消
			okMoudel: function() {
				var data = {
					ids: this.producrIds.join(","),
				}
				this.$http.post('/api/store/batchCancel', data, true).then(res => {
					if (res.data.code == 200) {
						this.pfalg = false;
						uni.showToast({
							title: '取消成功',
							icon: 'none',
							duration: 2000,
							position: 'center'
						});
						this.allChecked = false;
						this.edit();
						this.getMoneyList();
					}
				})
			},
			// 取消
			closemoudel: function() {
				this.pfalg = false
			},
			// 进店
			goShopIndex(item) {
				uni.navigateTo({
					url: '../shopIndex/shopIndex?shopId=' + item.storeId
				})
			}
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
		height: 100upx;
		width: 85%;
		padding: 20upx;
	}

	.product_moudel_listn {
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 30upx;
		height: 100upx;
		width: 92%;
		margin-left: 4%;
		padding: 20upx;
	}

	.list_imgp {
		width: 60upx;
		height: 60upx;
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
		height: 100upx;
		line-height: 100upx;
		margin-top: 30upx;
		// background-color: #FFFFFF;
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

	.listrightbtn {
		width: 120upx;
		height: 60upx;
		border: 1px solid #be8100;
		border-radius: 10upx;
		text-align: center;
		line-height: 60upx;
		color: #BE8100;
		font-size: 26upx;
	}
</style>

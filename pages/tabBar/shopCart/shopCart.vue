<template>
	<view>

		<view class="title_top"></view>
		<view class="uni-flex background_colorff padding_top2 padding_bottom2">
			<view class="width33 margin_left3 margin_top2">
				<image src="../../../static/image/icon/left.png" class="header_title_img" mode=""></image>
			</view>
			<view class="width33 text_center font_size36">
				购物车
			</view>
			<view class="width33 text_right margin_right3 margin_top2">
				<image src="../../../static/image/icon/delete.png" class="header_title_imgr" mode=""></image>
			</view>
		</view>

		<!-- 内容 -->

		<view class="" style="padding-bottom: 120upx;">
			<!-- 有效商品 模块-->
			<view class="product_moudel" v-for="(item,index) in productList" :key="index">
				<!-- 标题 -->
				<view class="uni-flex">
					<view class="margin_left3">
						<checkbox-group @change="allChoose('all',index)">
							<label>
								<checkbox value="all" :class="{'checked':item.allChecked}" :checked="item.allChecked?true:false"></checkbox>
							</label>
						</checkbox-group>
					</view>
					<view class="">
						<image src="../../../static/image/shopTitle.png" mode="" class="shopTitle"></image>
					</view>
					<view class="font_size28">
						联想官方旗舰店
					</view>
				</view>
				<!-- 内容 -->
				<view class="uni-flex margin_top3 padding_bottom2" v-for="(items,index) in item.list1" :key="index">
					<view class="margin_top8 margin_left3">
						<checkbox-group @change="changeCheckbox(item.id,index)">
							<label>
								<checkbox value="String(item)" :class="{'checked':items.oneChecked}" :checked="item.oneChecked?true:false"></checkbox>
							</label>
						</checkbox-group>
					</view>
					<view class="">
						<image src="../../../static/image/beij/myTopb.png" class="product_moudel_img" mode=""></image>
					</view>
					<view class="width60 margin_left2">
						<view class="font_size28 ">
							{{totalPrice}} Asus/华硕 Y4200高性能手提笔记
							本电脑
						</view>
						<view class="font_size22 font_color99">
							屏幕尺寸：15.6英寸
						</view>
						<view class="uni-flex display_space">
							<view class="font_size28 " style="color: #BE8100;">
								¥4799.00 <text class="font_size22 font_color99">/件</text>
							</view>
							<view class="uni-flex num_moudel">
								<view class="num_moudel_left font_color99" @click="numStatistics(item.id,items.id,items.num,'')">
									-
								</view>
								<view class="num_moudel_center">
									{{items.num > items.stock ? items.stock :items.num}}
								</view>
								<view class="num_moudel_right" @click="numStatistics(item.id,items.id,items.num,'add')">
									+
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 失效商品 -->
			<view class="product_moudel" style="margin-top: 10%;">
				<view class="text_center font_size28 padding_top3 font_weight600">
					失效商品(3件)
				</view>
				<view class="uni-flex margin_top5" v-for="(items,index) in invalidList" :key="index">
					<view class="margin_top8 margin_left3 invalid_moudel">
						失效
					</view>
					<view class="margin_left3">
						<image src="../../../static/image/beij/myTopb.png" class="product_moudel_img" mode=""></image>
					</view>
					<view class="width60 margin_left2">
						<view class="font_size28 font_weight600">
							Asus/华硕 Y4200高性能手提笔记
							本电脑
						</view>
						<view class="font_size22 font_color99">
							屏幕尺寸：15.6英寸
						</view>
						<view class="uni-flex display_space">
							<view class="font_size28 " style="color: #BE8100;">
								¥4799.00 <text class="font_size22 font_color99">/件</text>
							</view>

						</view>
					</view>
				</view>

				<!-- 清除失效商品 -->
				<view class="uni-flex padding_bottom3 margin_top3">
					<view class="width70">
						<view class="text_center font_size24 delect_invalid_moudel ">
							清除全部失效商品
						</view>
					</view>

					<view class="width20 text_right font_size24" v-if="invalidList.length == 1" @click="openinvalidList">
						展开
						<image class="margin_left3" src="../../../static/image/icon/sj.png" style="width: 10upx;height: 7upx;" mode=""></image>
					</view>

					<view class="width20 text_right font_size24" v-if="invalidList.length != 1" @click="openinvalidList">
						关闭
						<image class="margin_left3" src="../../../static/image/icon/sj.png" style="width: 10upx;height: 7upx;" mode=""></image>
					</view>
				</view>


			</view>

		</view>

		<!-- 总价 -->
		<view class="bottom_z uni-flex">
			<view class="uni-flex bottom_z_left">
				<view class="bottom_z_left_check">
					<checkbox-group @change="qAllChoose">
						<label>
							<checkbox :class="{'checked':quanAllChecked}" :checked="quanAllChecked?true:false"></checkbox>
						</label>
					</checkbox-group>
				</view>
				<view class="font_size26 " style="color: #6F6F6F;margin-left: -5%;">
					全选
				</view>
			</view>
			<view class="bottom_z_center font_size28 font_color33">
				总价：<text class="font_colorde">{{totalPrice}}</text>
			</view>
			<view class="bottom_z_right">
				去结算({{totalPriceNum}})
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList: [{
						name: '店铺名称',
						id: '122',
						allChecked: false,
						list1: [{
								name: '子商品',
								id: '121',
								num: 1,
								Price: 10,
								stock: 3,
								oneChecked: false
							},
							{
								name: '子商品',
								num: 2,
								id: '111',
								Price: 10,
								stock: 20,
								oneChecked: false
							}
						]
					},
					{
						name: '店铺名称1',
						id: '12',
						allChecked: false,
						list1: [{
							id: '1141',
							name: '子商品',
							num: 3,
							Price: 10,
							stock: 11,
							oneChecked: false
						}]
					},
				],

				invalidList: [1],

				numberValue: '',

				shopId: '', //店铺ID
				dataList: [], //商户单选数据
				totalPrice: 0, //总价
				totalPriceNum: 0, //购买数量
				quanAllChecked: false //底部全选
			}
		},
		methods: {
			// 数字框处理
			numStatistics(shopCartId, shopId, num, type) {
				for (let item of this.productList) {
					if (item.id == shopCartId) {
						for (let items of item.list1) {
							if (items.id == shopId) {
								if (type == 'add') {
									items.num = Number(num) + 1
								} else {
									items.num = Number(num) - 1
								}

							}
						}
					}
				}
				this.getCalculation(); //计算总价

			},

			//商户全选事件
			allChoose(e, index) {
				this.productList[index].allChecked = !this.productList[index].allChecked;
				this.shopId = this.productList[index].id
				if (this.productList[index].allChecked) {
					for (let item of this.productList[index].list1) {
						item.oneChecked = true;
					}
				} else {
					for (let item of this.productList[index].list1) {
						item.oneChecked = false;
					}
				}
				this.judgeQAllChoose(); //验证底部全选
			},
			// 多选复选框改变事件
			changeCheckbox(shopCartId, index) {
				console.log(shopCartId + '//店铺id');
				console.log(index + '下标');
				var _this = this;
				let listIndex = index; //当前选中下标赋值
				for (let item of this.productList) {
					if (shopCartId == item.id) {
						var productDataList = item //获取当前单选框选中数据
						item.list1[listIndex].oneChecked = !item.list1[listIndex].oneChecked; //处理复选框值
						// 是否选中全选处理 start
						_this.dataList = [];
						for (let items of productDataList.list1) {
							if (shopCartId == productDataList.id) {
								if (items.oneChecked) {
									_this.dataList.push(items.oneChecked)
								}
							}
						};
						if (_this.dataList.length == productDataList.list1.length) {
							for (let item of this.productList) {
								if (item.id == productDataList.id) {
									item.allChecked = true;
								}
							}
						} else {
							productDataList.allChecked = false;
						}
						this.getCalculation(); //计算下总价
						// end
					}
				};

				this.judgeQAllChoose(); //验证底部全选
			},

			// 底部所有的全选
			qAllChoose() {
				this.quanAllChecked = !this.quanAllChecked;
				for (let item of this.productList) {
					if (this.quanAllChecked) {
						item.allChecked = true;
					} else {
						item.allChecked = false;
					}
					for (let items of item.list1) {
						if (this.quanAllChecked) {
							items.oneChecked = true;
						} else {
							items.oneChecked = false;
						}
					}
				}
				this.getCalculation(); //计算总价数量
			},

			// 底部全选是否选中状态
			judgeQAllChoose() {
				var judgeList = [];
				for (let item of this.productList) {
					if (item.allChecked) {
						judgeList.push(item.allChecked)
					}
				}
				if (judgeList.length == this.productList.length) {
					this.quanAllChecked = true
				} else {
					this.quanAllChecked = false
				}
			},
			// 计算价格 总价及数据的一个处理
			getCalculation() {
				var priceList = []; //总价
				var numberList = []; //购买数量
				for (let index in this.productList) {
					for (let item of this.productList[index].list1) {
						if (item.oneChecked) {
							let princeNum = Number(item.num) * Number(item.Price)
							priceList.push(princeNum); //计算总计a
							numberList.push(item.num); //计算总数
							console.log(priceList)
							console.log(eval(priceList.join("+")))
							this.totalPrice = eval(priceList.join("+")); //总计
							this.totalPriceNum = eval(numberList.join("+")) //总数
						}
					}
				}
			},
			// 展开失效商品
			openinvalidList() {
				this.invalidList = [1, 2, 3, 4]
			}
		}
	}
</script>

<style lang="less">
	.product_moudel {
		width: 94%;
		margin-left: 3%;
		background-color: #FFFFFF;
		border-radius: 30upx;
		min-height: 310upx;
		margin-top: 20upx;
	}

	.shopTitle {
		width: 60upx;
		height: 16upx;
	}

	.product_moudel_img {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}

	.invalid_moudel {
		width: 54upx;
		height: 31upx;
		border-radius: 30upx;
		line-height: 31upx;
		font-size: 20upx;
		color: #9F9F9F;
		border: 1px solid #9F9F9F;
		text-align: center;
	}

	.delect_invalid_moudel {
		width: 276upx;
		height: 45upx;
		border-radius: 40upx;
		border: 1px solid #C4C4C4;
		text-align: center;
		line-height: 45upx;
		margin-left: 35%;
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
		background-color: #EEEEEE;
		font-size: 24upx;
		color: #333333;
		border-radius: 5upx;
	}

	.num_moudel_right {
		margin-left: 3%;
		width: 30%;
	}

	.bottom_z {
		height: 98upx;
		background-color: #FFFFFF;
		width: 100%;
		position: fixed;
		bottom: 0;
	}

	.bottom_z_left {
		margin-top: 30upx;
		width: 25%;
	}

	.bottom_z_left_check {
		margin-left: 30upx;
	}

	.bottom_z_center {
		margin-top: 30upx;
		width: 45%;
	}

	.bottom_z_right {
		background-color: #3C3D3E;
		height: 98upx;
		text-align: center;
		line-height: 98upx;
		font-size: 30upx;
		width: 30%;
		color: #FFFFFF;
	}
</style>

<template>
	<view>
		<view class="page_width padding_bottom3">
			<!-- 提示 -->
			<view class="top_m">
				<view class="font_sise28">
					小贴士：
				</view>
				<view class="font_size26">
					1. 申请通过后退款按原支付方式退回，耐心等待通知
				</view>
				<view class="">
					2. 申请单通过后，商品就真的与你擦身而过
				</view>
			</view>

			<!-- 选择 -->
			<view class="uni-flex background_colorff  list_one">
				<view class="font_sise28 width25">
					<text class="font_colorbe">*</text>
					申请服务：
				</view>
				<view class="width65">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view>{{array[index].name}}</view>
					</picker>
				</view>
				<view class="width10">
					<image src="../../static/image/icon/down2.png" style="width: 21upx;height: 12upx;" mode=""></image>
				</view>
			</view>

			<view class="uni-flex background_colorff  list_one">
				<view class="font_sise28 width25">
					<text class="font_colorbe">*</text>
					申请原因：
				</view>
				<view class="width65">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view>{{arrayTwo[indexT].name}}</view>
					</picker>
				</view>
				<view class="width10">
					<image src="../../static/image/icon/down2.png" style="width: 21upx;height: 12upx;" mode=""></image>
				</view>
			</view>


			<view class="uni-flex background_colorff  list_one">
				<view class="font_sise28 width25">
					具体说明：
				</view>
				<view class="width75">
					<input type="text" @input="keyPhone" placeholder="请具体说明" placeholder-style='color:#484848' />
				</view>
			</view>
			<view class="margin_top8">
				<view class="uni-flex ">
					<view class="text_center" :class="index !=0 ? 'margin_left3' : ''" v-for="(item,index) in [1,2,3]" :key="index">
						<image src="../../static/image/beij/jian.png" class="jian_img" mode=""></image>
						<image src="../../static/image/beij/uplodel.png" class="img_width" mode=""></image>
					</view>
				</view>
				<view class="font_size22 font_colorbe">
					*请上传商品凭证，最多上传5张
				</view>
			</view>

			<!-- 商品列表 -->
			<view class="">
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

						<view class="font_size28">
							全选
						</view>
					</view>
					<!-- 内容 -->
					<view class="padding_bottom2 border_bottom" v-for="(items,index) in item.list1" :key="index">
						<view class="uni-flex margin_top3 padding_bottom2">
							<view class="margin_top8 margin_left3">
								<template v-if="false">
									<checkbox-group @change="changeCheckbox(item.id,index)">
										<label>
											<checkbox value="String(item)" :class="{'checked':items.oneChecked}" :checked="item.oneChecked?true:false"></checkbox>
										</label>
									</checkbox-group>
								</template>
								<template v-else>
									<view class="" style="margin-left: -20%;">
										<image src="../../static/image/beij/wuxiao.png" class="listm" mode=""></image>
									</view>
								</template>

							</view>
							<view class="">
								<image src="../../static/image/beij/myTopb.png" class="product_moudel_img" mode=""></image>
							</view>
							<view class="width60 margin_left2">
								<view class="font_size28 ">
									Asus/华硕 Y4200高性能手提笔记
									本电脑
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

						<view class="uni-flex display_space width80 " style="margin-left: 15%;">
							<view class="font_size26">
								预计退款：<text class="font_size22 font_colorbe">¥</text> <text class="font_sise28 font_colorbe">6199.00</text>
							</view>
							<view class="font_size22">
								最多申请<text class="font_colorbe">1</text>件
							</view>
						</view>

					</view>


				</view>
			</view>


			<!-- 金额 -->
			<view class="uni-flex background_colorff display_space list_one">
				<view class="uni-flex width50">
					<view class="margin_top1">
						<image src="../../static/image/beij/money.png" class="imgb" mode=""></image>
					</view>
					<view class="font_sise28  margin_left3">
						预计退款总金额
					</view>
				</view>

				<view class="font_size30 font_colorbe">
					<text class="font_size22">¥</text>4799.00
				</view>
			</view>
		
			
			<!-- 按钮 -->
			<view class="returnBtn">
				提交申请
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [{
					name: '退货'
				}, {
					name: '换货'
				}, {
					name: '维修'
				}, {
					name: '仅退款'
				}, {
					name: '补发货'
				}],
				index: 0,
				arrayTwo: [{
					name: '未收到货'
				}, {
					name: '商品包装破损'
				}, {
					name: '商品质量问题'
				}, {
					name: '商品数量缺失'
				}],
				indexT: 0,

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

				totalPrice: 0, //总价


			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
			},
			keyPhone() {

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
				this.getCalculation(); //计算总价
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
						this.getCalculation(); //计算总价
					}
				};


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


		}
	}
</script>

<style lang="less">
	.top_m {
		background: #f1ebe0;
		border-radius: 20upx;
		padding: 30upx;
		color: #846E3F;
		margin-top: 30upx;
	}

	.list_one {
		background: #ffffff;
		border-radius: 20upx;
		padding: 20upx;
		margin-top: 20upx;
	}

	.jian_img {
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		position: absolute;
		margin-top: -30upx;
		margin-left: 14%;
	}

	.img_width {
		width: 120upx;
		height: 120upx;
	}


	.product_moudel {
		// width: 94%;
		// margin-left: 3%;
		background-color: #FFFFFF;
		border-radius: 30upx;
		min-height: 310upx;
		margin-top: 20upx;
		padding-top: 30upx;
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

	.listm {
		width: 30upx;
		height: 30upx;
	}

	.imgb {
		width: 38upx;
		height: 29upx;
	}
	.returnBtn{
		// width: 690px;
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		font-size: 30upx;
		margin-top: 30upx;
	}
</style>

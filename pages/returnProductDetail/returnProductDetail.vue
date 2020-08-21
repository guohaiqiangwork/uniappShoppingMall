<template>
	<view>
		<view class="page_width padding_bottom3">
			<!-- 提示 -->
			<view class="top_m">
				<view class="font_sise28">小贴士：</view>
				<view class="font_size26">1. 申请通过后退款按原支付方式退回，耐心等待通知</view>
				<view class="">2. 申请单通过后，商品就真的与你擦身而过</view>
			</view>

			<!-- 选择 -->
			<view class="uni-flex background_colorff  list_one">
				<view class="font_sise28 width25">
					<text class="font_colorbe">*</text>
					申请服务：
				</view>
				<view class="width65">
					<picker @change="bindPickerChange" :value="arrayIndex" :range="array" range-key="label">
						<view>{{ array[arrayIndex].label }}</view>
					</picker>
				</view>
				<view class="width10"><image src="../../static/image/icon/down2.png" style="width: 21upx;height: 12upx;" mode=""></image></view>
			</view>

			<view class="uni-flex background_colorff  list_one">
				<view class="font_sise28 width25">
					<text class="font_colorbe">*</text>
					申请原因：
				</view>
				<view class="width65">
					<picker @change="AllbindPickerChange" :value="indexT" :range="arrayTwo" range-key="label">
						<view>{{ arrayTwo[indexT].label }}</view>
					</picker>
				</view>
				<view class="width10"><image src="../../static/image/icon/down2.png" style="width: 21upx;height: 12upx;" mode=""></image></view>
			</view>

			<view class="uni-flex background_colorff  list_one">
				<view class="font_sise28 width25"><text v-show="productList.status != 2" class="font_colorbe">*</text> 具体说明：</view>
				<view class="width75"><input type="text" @input="keyUserRemark" placeholder="请具体说明" placeholder-style="color:#484848;font-size:28upx" /></view>
			</view>
			<view class="margin_top8" v-if="productList.status != 2">
				<view class="uni-flex ">
					<view class="text_center" :class="index != 0 ? 'margin_left3' : ''" v-for="(item, index) in imgList" :key="index">
						<image
							v-if="item.url != '../../static/image/beij/uplodel.png'"
							@click="delectUpload(index)"
							src="../../static/image/beij/jian.png"
							class="jian_img"
							mode=""
						></image>
						<image @click="upload(index)" :src="item.url" class="img_width" mode=""></image>
					</view>
				</view>
				<view class="font_size22 font_colorbe">*请上传商品凭证，最多上传5张</view>
			</view>

			<!-- 商品列表 -->
			<view class="">
				<view class="product_moudel">
					<!-- 标题 -->
					<view class="uni-flex">
						<view class="margin_left3">
							<checkbox-group @change="allChoose('all')">
								<label><checkbox value="all" :class="{ checked: allChecked }" :checked="allChecked ? true : false"></checkbox></label>
							</checkbox-group>
						</view>

						<view class="font_size28">全选</view>
					</view>
					<!-- 内容 -->
					<view class="padding_bottom2 border_bottom" v-for="(item, index) in productList.detailResults" :key="index">
						<view class="uni-flex margin_top3 padding_bottom2">
							<view class="margin_top8 margin_left3">
								<template>
									<checkbox-group @change="changeCheckbox(index)">
										<label><checkbox :class="{ checked: item.oneChecked }" :checked="item.oneChecked ? true : false"></checkbox></label>
									</checkbox-group>
								</template>
								<!-- <template v-else>
									<view class="" style="margin-left: -20%;">
										<image src="../../static/image/beij/wuxiao.png" class="listm" mode=""></image>
									</view>
								</template> -->
							</view>
							<view class=""><image :src="item.image" class="product_moudel_img" mode=""></image></view>
							<view class="width60 margin_left2">
								<view class="font_size28 text_hidden">{{ item.oneChecked }}{{ item.title }}</view>

								<view class="uni-flex display_space " style="margin-top: 60upx;">
									<view class="font_size28 " style="color: #BE8100;">
										¥{{ item.price }}
										<text class="font_size22 font_color99">/件</text>
									</view>
									<!-- <view class="uni-flex num_moudel">
										<view class="num_moudel_left font_color99" @click="numStatistics(item.id,item.id,item.num,'')">
											-
										</view>
										<view class="num_moudel_center">
											{{item.num > item.stock ? item.stock :item.num}}
										</view>
										<view class="num_moudel_right" @click="numStatistics(item.id,items.id,item.num,'add')">
											+
										</view>
									</view> -->
								</view>
							</view>
						</view>

						<view class="uni-flex display_space width80 " style="margin-left: 15%;">
							<view class="font_size26">
								预计退款：
								<text class="font_size22 font_colorbe">¥</text>
								<text class="font_sise28 font_colorbe">{{ item.price }}</text>
							</view>
							<view class="font_size22">
								最多申请
								<text class="font_colorbe">{{ item.num }}</text>
								件
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 金额 -->
			<view class="uni-flex background_colorff display_space list_one">
				<view class="uni-flex width50">
					<view class="margin_top1"><image src="../../static/image/beij/money.png" class="imgb" mode=""></image></view>
					<view class="font_sise28  margin_left3">预计退款总金额</view>
				</view>

				<view class="font_size30 font_colorbe">
					<text class="font_size22">¥</text>
					{{ totalPrice }}
				</view>
			</view>

			<!-- 按钮 -->
			<view class="returnBtn" @click="saveComment">提交申请</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			array: [
				{
					label: '',
					value: ''
				}
			],
			arrayIndex: 0,
			arrayTwo: [
				{
					label: '',
					value: ''
				}
			],
			indexT: 0,
			productList: [],
			totalPrice: 0, //总价
			orderId: '', //订单号码
			allChecked: false,
			imgList: [
				{
					url: '../../static/image/beij/uplodel.png'
				}
			],
			imgListData: [
				{
					path: ''
				}
			],
			userRemark: ''
		};
	},
	onLoad(option) {
		this.orderId = option.orderId;
		console.log(option);
	},
	mounted() {
		// this.getReason();
		// this.getService();
		this.getSelectGoods();
	},
	methods: {
		// 获取申请原因
		getReason: function(start) {
			console.log(start);
			var _this = this;
			if (start == 2) {
				_this.arrayTwo = [
					{
						label: '未收到货',
						value: '1'
					}
				];
				return;
			}

			this.$http.get('/api/apply/reason', '', true).then(res => {
				if (res.data.code == 200) {
					console.log(JSON.stringify(res));
					_this.arrayTwo = res.data.data;
				}
			});
		},
		// 获取申请服务
		getService: function(start) {
			var _this = this;
			if (start == 2) {
				_this.array = [
					{
						label: '仅退款',
						value: '3'
					}
				];
				return;
			}

			this.$http.get('/api/apply/service', '', true).then(res => {
				if (res.data.code == 200) {
					console.log(JSON.stringify(res));
					_this.array = res.data.data;
				}
			});
		},

		// 获取可退商品列表
		getSelectGoods: function() {
			var data = {
				orderId: this.orderId
			};
			this.$http.get('/api/retOrder/selectGoods', data, true).then(res => {
				if (res.data.code == 200) {
					for (let item of res.data.data.detailResults) {
						item.oneChecked = false;
					}
					this.productList = res.data.data;
					this.getReason(res.data.data.status);
					this.getService(res.data.data.status);
					console.log(this.productList);
				}
			});
		},

		delectUpload: function(index) {
			if (this.imgList[index].url == '../../static/image/beij/uplodel.png') {
				return;
			} else {
				if (this.imgList.length == 5) {
					if (this.imgList[4].url == '../../static/image/beij/uplodel.png') {
						this.imgList.splice(index, 1);
						this.imgListData.splice(index, 1);
					} else {
						this.imgList[4].url = '../../static/image/beij/uplodel.png';
						this.imgListData.splice(index, 1);
					}
				} else {
					this.imgList.splice(index, 1);
					this.imgListData.splice(index, 1);
				}
			}
			// if (this.imgList.length < 5) {
			// 	this.imgList.push({
			// 		url: '../../static/image/beij/uplodel.png'
			// 	})
			// }
		},
		upload: function(index) {
			var _self = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					const tempFilePaths = res.tempFilePaths;
					let id = uni.getStorageSync('userId');
					const token = uni.getStorageSync('token');
					uni.uploadFile({
						url: 'http://101.201.180.222:8080/api/upload/file',
						filePath: tempFilePaths[0],
						name: 'file',
						method: 'post',
						formData: {
							file: tempFilePaths[0],
							mbId: id
						},
						header: {
							Authorization: 'Bearer' + ' ' + token,
							client: 'APP'
						},
						success: uploadFileRes => {
							console.log('11==' + JSON.stringify(uploadFileRes));
							if (JSON.parse(uploadFileRes.data).code == 200) {
								var a = JSON.parse(uploadFileRes.data);
								console.log(a);
								_self.imgList[index].url = a.data.url;
								_self.imgListData[index].path = a.data.path;
								console.log(JSON.stringify(_self.imgList));
								if (_self.imgList.length < 5) {
									_self.imgList.push({
										url: '../../static/image/beij/uplodel.png'
									});
								}
								uni.showToast({
									title: '上传成功',
									icon: 'none',
									duration: 2000,
									position: 'center'
								});
							} else {
								uni.showToast({
									title: JSON.parse(uploadFileRes.data).message,
									icon: 'none',
									duration: 2000,
									position: 'center'
								});
								return;
							}
						},
						fail: err => {
							return uni.showToast({
								title: '上传失败'
							});
						}
					});
				},
				error: function(e) {
					console.log(e);
				}
			});
		},

		// 提交订单
		saveComment: function() {
			console.log(this.productList.detailResults);
			if (this.productList.status != 2) {
				if (!this.imgListData[0].path) {
					uni.showToast({
						title: '请选择图片',
						icon: 'none',
						duration: 2000,
						position: 'center'
					});
					return;
				}
			} else {
				this.imgListData = [];
			}
			var listDataImg =[]
			if(this.imgListData.length > 0){
				if(this.imgListData[0].path){
					for(let item of this.imgListData){
						listDataImg.push(item.path)
					}
				listDataImg =listDataImg.join(',') 
				}
				
			}
			
			if (!this.userRemark && this.productList.status != 6) {
				uni.showToast({
					title: '请填写具体说明',
					icon: 'none',
					duration: 2000,
					position: 'center'
				});
				return;
			}
			var returnItemsList = [];
			for (let item of this.productList.detailResults) {
				if (item.oneChecked) {
					var a = {
						orderDetailId: item.id
					};
					returnItemsList.push(a);
				}
			}
			var data = {
				applyServer: this.array[this.arrayIndex].value, //	申请服务
				mbId: uni.getStorageSync('userId'),
				orderId: this.productList.detailResults[0].orderId,
				pictrue: listDataImg,
				retReason: this.arrayTwo[this.indexT].value, //申请原因
				returnItems: returnItemsList,
				sellerId: this.productList.detailResults[0].sellerId, //商户id
				userRemark: this.userRemark //具体原因
			};

			this.$http.post('/api/retOrder/save', data, true, true).then(res => {
				if (res.data.code == 200) {
					console.log(JSON.stringify(res));
					uni.navigateBack();
				}
			});
		},

		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
			this.arrayIndex = e.detail.value;
			// this.indexT = e.detail.value;
		},
		AllbindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.detail.value);

			this.indexT = e.detail.value;
		},
		keyUserRemark: function(e) {
			console.log(e);
			this.userRemark = e.detail.value;
		},
		//商户全选事件
		allChoose(e) {
			this.allChecked = !this.allChecked;
			console.log('99');
			if (this.allChecked) {
				for (let item of this.productList.detailResults) {
					item.oneChecked = true;
				}
			} else {
				for (let item of this.productList.detailResults) {
					item.oneChecked = false;
				}
			}
			this.getCalculation(); //计算总价
		},
		// 多选复选框改变事件
		changeCheckbox(index) {
			this.productList.detailResults[index].oneChecked = !this.productList.detailResults[index].oneChecked;
			let dataList = [];
			for (let item of this.productList.detailResults) {
				if (item.oneChecked) {
					dataList.push(item.oneChecked);
				}
			}
			if (dataList.length == this.productList.detailResults.length) {
				this.allChecked = true;
			} else {
				this.allChecked = false;
			}

			this.getCalculation();
		},

		// 计算价格 总价及数据的一个处理
		getCalculation: function() {
			var priceList = [0]; //总价
			var numberList = [0]; //购买数量
			for (let item of this.productList.detailResults) {
				if (item.oneChecked) {
					let princeNum = Number(item.num) * Number(item.price);
					priceList.push(princeNum); //计算总计a
					numberList.push(item.num); //计算总数
					console.log(priceList);
					console.log(eval(priceList.join('+')));
					this.totalPrice = eval(priceList.join('+')); //总计
					this.totalPriceNum = eval(numberList.join('+')); //总数
				} else {
					this.totalPrice = eval(priceList.join('+')); //总计
					this.totalPriceNum = eval(numberList.join('+')); //总数
				}
			}
		}
	}
};
</script>

<style lang="less">
.top_m {
	background: #f1ebe0;
	border-radius: 20upx;
	padding: 30upx;
	color: #846e3f;
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
	background-color: #ffffff;
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

.returnBtn {
	// width: 690px;
	height: 88upx;
	background: #3c3d3e;
	border-radius: 10upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 30upx;
	margin-top: 30upx;
}
</style>

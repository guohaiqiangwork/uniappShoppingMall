<template>
	<view>
		<!-- <view class="title_top"></view> -->
		<view class="top_moudel_two" style="padding-top: calc(30upx + var(--status-bar-height))" v-if="!titleFalg">
			<view class="width30  margin_left3" style="padding-top: 1%;padding-left: 2%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="width33 text_center font_size36">{{ title }}</view>
			<view @click="getDelectFalg" v-if="myBankList.length > 0" class="font_size20 width20 text_right width30 margin_right3 " style="padding-top: 1%;">{{ rightF }}</view>
		</view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2" style="padding-top: calc(30upx + var(--status-bar-height))" v-if="titleFalg">
			<!-- <view class="title_top"></view> -->
			<view class="width30  margin_left3" style="padding-top: 1%;padding-left: 2%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="width33 text_center font_size36">{{ title }}</view>
			<view @click="getDelectFalg" v-if="myBankList.length > 0" class="font_size20 width20 text_right width30 margin_right3 " style="padding-top: 1%;">{{ rightF }}</view>
		</view>

		<!-- 银行卡列表 -->
		<view class="page_width" style="padding-bottom: 24%;">
			<!-- 列表 -->
			<template v-if="myBankList.length > 0">
				<view class="uni-flex back_moudel" :class="item.bankBColor" v-for="(item, index) in myBankList" :key="index">
					<view class="width15"><image :src="item.imgUrl" class="left_img" mode=""></image></view>
					<view class="font_size30 width30">
						<view class="">{{ item.bankName }}</view>
						<view class="">{{ item.bankType }}</view>
					</view>
					<view class="width65 text_right">
						<view class="font_size32">****{{ item.bankCard.substr(-4) }}</view>
						<view class="" style="margin-top: 10%;">
							<image
								:class="delectFalg ? 'z' : 'zb'"
								@click="delectBank(index)"
								v-if="!item.oneChecked"
								src="../../static/image/my/bf.png"
								mode=""
								class="right_img"
							></image>
							<image
								:class="delectFalg ? 'z' : 'zb'"
								@click="delectBankOver(index)"
								v-if="item.oneChecked"
								src="../../static/image/my/bf1.png"
								mode=""
								class="right_img"
							></image>
						</view>
					</view>
				</view>
				<view class="fixed_btm ">
					<block v-if="myBankList.length < 10"><view class="listNobtn" @click="addBack" v-if="rightF != '完成'">添加银行卡</view></block>
					<view class="listNobtn" @click="openm" v-if="rightF == '完成'">确认解绑</view>
				</view>
			</template>

			<!-- 列表缺省 -->
			<view class="text_center" v-if="myBankList.length == 0">
				<view class="margin_top18"><image src="../../static/image/default/noBack.png" class="noImg" mode=""></image></view>
				<view class="font_size30 font_color99 margin_top2">您还没有银行卡</view>
				<view class="nobtn" @click="addBack">添加银行卡</view>
			</view>
		</view>

		<!-- 提示框 -->
		<template v-if="pfalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">是否解绑？</view>
					<view class="uni-flex " style="margin-top: 80upx;">
						<view class="leftbtn" @click="closemoudel">取消</view>
						<view class="rightbtn" @click="delect">确认</view>
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
			title: '我的银行卡',
			rightF: '解除绑定',
			myBankList: [],
			delectFalg: false,
			delectId: '',
			titleFalg: true,
			pfalg: false
		};
	},
	mounted() {},
	onShow() {
		this.getBankCardList(); //获取银行卡列表
	},
	onPageScroll(e) {
		// console.log(e)
		e.scrollTop > 80 ? (this.titleFalg = false) : (this.titleFalg = true);
		// console.log(this.titleFalg)
	},
	methods: {
		closemoudel: function() {
			this.pfalg = false;
		},
		openm: function() {
			var bankIdList = [];
			for (let item of this.myBankList) {
				if (item.oneChecked) {
					bankIdList.push(item.id);
				}
			}
			console.log(bankIdList);
			if (bankIdList.length == 0) {
				uni.showToast({
					title: '请选择银行卡',
					icon: 'none',
					duration: 2000,
					position: 'center'
				});
				this.pfalg = false;
				return;
			}
			this.pfalg = true;
		},
		// 头部切换
		getDelectFalg: function() {
			this.delectFalg = !this.delectFalg;
			this.delectFalg ? (this.rightF = '完成') : (this.rightF = '解除绑定');
			for (let item of this.myBankList) {
				item.oneChecked = false;
			}
		},
		// 删除银行卡
		delectBank: function(index) {
			this.myBankList[index].oneChecked = true;
			this.$forceUpdate();
		},
		delectBankOver: function(index) {
			this.myBankList[index].oneChecked = false;
			this.$forceUpdate();
		},

		// 删除银行卡
		delect: function() {
			var bankIdList = [];
			for (let item of this.myBankList) {
				if (item.oneChecked) {
					bankIdList.push(item.id);
				}
			}
			console.log(bankIdList);
			if (bankIdList.length == 0) {
				uni.showToast({
					title: '请选择银行卡',
					icon: 'none',
					duration: 2000,
					position: 'center'
				});
				this.pfalg = false;
				return;
			}
			var data = {
				bankId: bankIdList
			};
			// 获取团队数据
			this.$http.get('/api/bank/untie', data, true).then(res => {
				if (res.data.code == 200) {
					this.pfalg = false;
					//有误
					uni.showToast({
						title: '解绑银行卡成功',
						icon: 'none',
						duration: 2000,
						position: 'center'
					});
					this.getBankCardList();
				}
			});
		},
		// 返回
		goBack() {
			uni.navigateBack();
		},

		// 去绑定银行卡
		addBack: function() {
			uni.navigateTo({
				url: '../addBack/addBack'
			});
		},
		// 获取银行卡列表
		getBankCardList: function() {
			var _this = this;
			var data = {
				mbId: uni.getStorageSync('userId'),
				flag: false
			};
			this.$http
				.get('/api/bank/list', data, true)
				.then(res => {
					if (res.data.code == 200) {
						console.log(99);
						_this.myBankList = res.data.data;
						for (let item of _this.myBankList) {
							console.log(item);
							item.oneChecked = false;
							switch (item.bankCode) {
								case 'ICBC':
									item.bankBColor = 'bank_bgColor_zgp';
									item.imgUrl = '../../static/image/bank/gsy.png';
									break;
								case 'ABC':
									item.bankBColor = 'bank_bgColor_ny';
									item.imgUrl = '../../static/image/bank/nyy.png';
									break;
								case 'CCB':
									item.bankBColor = 'bank_bgColor_jj';
									item.imgUrl = '../../static/image/bank/jsy.png';
									break;
								case 'BOC':
									item.bankBColor = 'bank_bgColor_zgp';
									item.imgUrl = '../../static/image/bank/zgy.png';
									break;
								case 'COMM':
									item.bankBColor = 'bank_bgColor_jj';
									item.imgUrl = '../../static/image/bank/jty.png';
									break;
								case 'PSBC':
									item.bankBColor = 'bank_bgColor_ny';
									item.imgUrl = '../../static/image/bank/yzy.png';
									break;
								case 'SPDB':
									item.bankBColor = 'bank_bgColor_zgp';
									item.imgUrl = '../../static/image/bank/qty.png';
									break;
								case 'CMB':
									item.bankBColor = 'bank_bgColor_zgp';
									item.imgUrl = '../../static/image/bank/zsy.png';
									break;
								default:
									item.bankBColor = 'bank_bgColor_zgp';
									item.imgUrl = '../../static/image/bank/qty.png';
									break;
							}
						}

						// this.delectFalg = false
					} else {
						//有误
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'center'
						});
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style lang="less">
.balk_img {
	width: 16upx;
	height: 28upx;
}

.back_moudel {
	height: 220upx;
	background: linear-gradient(to right, #ff8b70, #ff576c);
	border-radius: 10upx;
	color: #ffffff;
	margin-top: 30upx;
	padding: 60upx 30upx;
}

// .mouden_bj_1 {
// 	background: linear-gradient(to right, #00BBA7, #018DB6) !important;
// }

// .mouden_bj_2 {
// 	background: linear-gradient(to right, #5FA2D8, #4166C1) !important;
// }

.bank_bgColor_zgp {
	/* red */
	background: linear-gradient(to right, #ff8b70, #ff576c);
}

.bank_bgColor_ny {
	/* blue */
	background: linear-gradient(to right, #00bba7, #018db6);
}

.bank_bgColor_jj {
	/* greet */
	background: linear-gradient(to right, #5fa2d8, #4166c1);
}

.left_img {
	width: 70upx;
	height: 70upx;
	border-radius: 50%;
}

.right_img {
	width: 30upx;
	height: 30upx;
}

.noImg {
	width: 446upx;
	height: 376upx;
}

.nobtn {
	width: 530upx;
	height: 88upx;
	background: #3c3d3e;
	border-radius: 10upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 30upx;
	margin-left: 12%;
	margin-top: 30upx;
}
.listNobtn {
	// width: 92%;
	height: 88upx;
	background: #3c3d3e;
	border-radius: 10upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 30upx;
	// position: fixed;
	// bottom: 3%;
}
.z {
	z-index: 1;
}
.zb {
	z-index: -9;
}
.product_content_block {
	background-color: #ffffff;
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
	color: #3c3d3e;
	line-height: 78upx;
	margin-left: 45upx;
}

.rightbtn {
	width: 220upx;
	height: 78upx;
	background: #3c3d3e;
	border-radius: 10px;
	color: #ffffff;
	text-align: center;
	line-height: 78upx;
	margin-left: 45upx;
}

.fixed_btm {
	padding: 30upx;
	background: #fafafa;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0%;
	width: 100%;
	z-index: 99;
}
</style>

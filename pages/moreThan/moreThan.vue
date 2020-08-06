<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width30 text_left margin_left3" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<view class="width50 text_center font_size36">我的余额</view>
			<view @click="topRight" class="font_size30 width20 text_right width30 margin_right3 " style="padding-top: 1%;">余额说明</view>
		</view>

		<view class="more_moudel">
			<view class="uni-flex">
				<view class="width50">
					<view class="">可用余额</view>
					<view class="font_size60 font_weight600" style="margin-top: -3%;">
						<text class="font_size24">¥</text>
						{{ topData }}
					</view>
				</view>
				<view class="width50"><view class="moreRight" @click="goWithdrawal(topData)">提现</view></view>
			</view>
		</view>

		<view class="background_colorff">
			<!-- tab 切换 -->
			<view class="padding_top3 padding_bottom3 border_bottom ">
				<view
					@click="tabSwichThree(index)"
					:class="tabIndexT == index ? 'item_tab_three1' : 'item_tab_three'"
					v-for="(item, index) in tabListThree"
					:key="index"
					:style="index == 2 ? 'border:none' : ''"
				>
					<view>{{ item.name }}</view>
					<view :class="tabIndexT == index ? 'bottom_tab' : ''"></view>
				</view>
			</view>

			<!-- 时间筛选 -->

			<view class="uni-flex padding_top2 padding_bottom2">
				<view class="text_center width50 border_right">
					<view class="font_size22 font_color66">起始日期</view>
					<view class="font_size26" style="margin-top: -4%;">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{ startDateOne }}</view>
						</picker>
					</view>
				</view>
				<view class="text_center width50">
					<view class="font_size22 font_color66">截至日期</view>
					<view class="font_size26" style="margin-top: -4%;">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChangeEnd">
							<view class="uni-input">{{ endDateOne }}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="page_width">
			<view class="uni-flex margin_top3" v-for="(item, index) in productList" :key="index">
				<view class="font_size26 width20 text_center">{{ item.remark }}</view>
				<view class="font_size24 width50 text_center">{{ item.createTime }}</view>
				<view class="font_size24 width30 text_right " style="padding-right: 3%;">
					<text v-if="item.type == 1">+</text>
					<text v-else>-</text>
					￥{{ item.amount }}
				</view>
			</view>
			<view class="" v-if="productList > 0"><uni-load-more :status="status" :content-text="contentText" color="#007aff" /></view>

			<view v-if="productList.length == 0" class="text_center margin_top18">
				<image src="../../static/image/default/noOrder.png" class="no_img_order" mode=""></image>
				<view class="font_size28 font_color99 margin_top5">暂无记录~</view>
			</view>
		</view>

		<!-- 余额说明 -->
		<template v-if="explainFalg">
			<view class="moudel_content">
				<view class="content_block">
					<view class="text_right" @click="closeMoudel"><image src="../../static/image/icon/close.png" style="width: 30upx;height: 30upx;" class="margin_top3 margin_right3" mode=""></image></view>
					<view class="margin_top3 text_center font_size28 ">是打飞机啊龙佳龙看见发生纠纷离开 卢卡斯肌肤抵抗力你卡家解开了</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
function getDate(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year;
	} else if (type === 'end') {
		year = year + 1;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}
export default {
	data() {
		return {
			tabListThree: [
				{
					name: '全部'
				},
				{
					name: '支出'
				},
				{
					name: '收入'
				}
			],
			tabIndexT: 0,
			explainFalg: false,

			startDateOne: getDate('start'),
			endDateOne: getDate('end'),
			startDate: '1993-01-01',
			endDate: getDate('end'),
			date: getDate({
				format: true
			}),
			topData: '',
			status: 'more',
			statusTypes: [
				{
					value: 'more',
					text: '加载前'
				},
				{
					value: 'loading',
					text: '加载中'
				},
				{
					value: 'noMore',
					text: '没有更多'
				}
			],
			contentText: {
				contentdown: '没有更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			},
			pageNum: 1, //页码
			productList: [],
			dataIndex: 0
		};
	},
	mounted() {
		this.getTopData(); //
		this.getMoneyList();
	},
	// 上拉加载
	onReachBottom() {
		let _self = this;
		this.status = 'loading';
		this.pageNum = this.pageNum + 1;
		this.getMoneyList(); //调取列表
		_self.status = 'more';
	},
	methods: {
		getTopData: function() {
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/account/balance', data, true).then(res => {
				if (res.data.code == 200) {
					this.topData = res.data.data;
				}
			});
		},
		closeMoudel: function() {
			this.explainFalg = false;
		},
		// 获取列表
		getMoneyList: function() {
			var d1 = new Date(this.startDateOne.replace(/\-/g, '\/'));
			var d2 = new Date(this.endDateOne.replace(/\-/g, '\/'));
			if (!d1) {
				uni.showToast({
					title: '请选择开始日期',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
			} else if (!d2) {
				uni.showToast({
					title: '请选择结束日期',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
			} else if (d1 > d2) {
				uni.showToast({
					title: '结束时间不能小于开始日期',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				this.startDateOne = getDate('start')
				this.endDateOne =getDate('end')
				return;
			}
			if (this.startDateOne == '请选择') {
				this.startDateOne = '';
			}
			if (this.endDateOne == '请选择') {
				this.endDateOne = '';
			}
			var data = {
				mbId: uni.getStorageSync('userId'),
				endTime: this.endDateOne,
				limit: 10,
				page: this.pageNum,
				startTime: this.startDateOne,
				type: this.dataIndex
			};
			this.$http.get('/api/account/flow', data, true).then(res => {
				if (res.data.code == 200) {
					if (this.pageNum > 1) {
						if (res.data.data.length > 0) {
							this.productList = this.productList.concat(res.data.data);
						}
					} else {
						this.productList = res.data.data;
					}
				}
			});
		},

		// 返回
		goBack() {
			uni.navigateBack();
		},
		// tab two
		tabSwichThree: function(index) {
			console.log(index);
			this.tabIndexT = index;
			if (this.tabIndexT == 1) {
				this.dataIndex = 2;
			} else if (this.tabIndexT == 2) {
				this.dataIndex = 1;
			}
			this.productList = [];
			this.pageNum = 1;
			this.getMoneyList();
		},
		// 余额说明
		topRight() {
			this.explainFalg = true;
		},
		// 去提现
		goWithdrawal: function(e) {
			// 获取个人信息
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/member/isVerified', data, true).then(res => {
				if (res.data.code == 200) {
					if (!res.data.data) {
						uni.navigateTo({
							url: '../realName/realName'
						});
					} else {
						if (e > 0) {
							uni.navigateTo({
								url: '../withdrawal/withdrawal?money=' + e
							});
						} else {
							uni.showToast({
								title: '您还没有可提现金额',
								icon: 'none',
								position: top,
								duration: 1000
							});
						}
					}
				}
			});
		},

		// 时间格式话
		formatDate: function(value) {
			var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear();
			var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
			var D = date.getDate();
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			return Y + '年' + M + '月' + D + '日';
		},
		// 时间开始
		bindDateChange: function(e) {
			this.startDateOne = e.detail.value;
			console.log(this.startDateOne);
			this.dataStartDate = this.formatDate(this.startDateOne);
			console.log(this.dataStartDate);
			this.getMoneyList();
		},
		// 时间结束
		bindDateChangeEnd: function(e) {
			this.endDateOne = e.detail.value;
			console.log(this.endDateOne);
			this.dataEndDate = this.formatDate(this.endDateOne);
			console.log(this.dataEndDate);
			this.getMoneyList();
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fafafa;
}
.balk_img {
	width: 16upx;
	height: 28upx;
}

.more_moudel {
	background: url(../../static/image/beij/ye.png) no-repeat;
	height: 180upx;
	background-size: 100% 100%;
	color: #ffffff;
	padding-top: 30upx;
	padding-left: 60upx;
}

.moreRight {
	width: 160upx;
	height: 60upx;
	border: 1px solid #fcd07d;
	border-radius: 30upx;
	text-align: center;
	line-height: 60upx;
	color: #fcd07d;
	font-size: 28upx;
	margin-left: 35%;
	margin-top: 8%;
}

.item_tab_three {
	display: inline-block;
	width: 33%;
	text-align: center;
	color: #0c0c0c;
	font-size: 28upx;
	height: 40upx;
	line-height: 40upx;
	border-right: 1px solid #d8d8d8;
}
.item_tab_three1 {
	display: inline-block;
	width: 33%;
	text-align: center;
	color: #0c0c0c;
	font-size: 28upx;
	height: 40upx;
	line-height: 40upx;
	border-right: 1px solid #d8d8d8;
	font-weight: 700;
}
.bottom_tab {
	border: 1px solid #be8100;
	width: 23%;
	height: 4upx;
	background-color: #be8100;
	border-radius: 3upx;
	margin-left: 38%;
	margin-top: -2%;
}

// 🈷️说明
.moudel_content {
	height: 100%;
	width: 100%;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.4); //
	z-index: 99;
	top: 0;
	left: 0;
}

.content_block {
	background-color: #ffffff;
	width: 90%;
	margin-left: 5%;
	border-radius: 16px;
	position: absolute;
	top: 18%;
}
</style>

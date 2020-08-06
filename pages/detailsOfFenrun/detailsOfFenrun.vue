<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2 border_bottom">
			<view class="width30 text_left margin_left3" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="width50 text_center font_size36">
				收益详情
			</view>
			<view class="font_size30 width20 text_right width30 margin_right3 " style="padding-top: 1%;" @click="tomeFalgTab">
				筛选
			</view>
		</view>


		<!-- 时间筛选 -->
		<template v-if="tomeFalg">
			<view class="uni-flex padding_top3 padding_bottom3 background_colorff">
				<view class="text_center width50 border_right" style="border-right: 1px solid #CCCCCC;">
					<view class="font_size22 font_color66">
						起始日期
					</view>
					<view class="font_size26">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{startDateOne}}</view>
						</picker>
					</view>
				</view>
				<view class="text_center width50">
					<view class="font_size22 font_color66">
						截至日期
					</view>
					<view class="font_size26">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChangeEnd">
							<view class="uni-input">{{endDateOne}}</view>
						</picker>
					</view>
				</view>
			</view>

		</template>



		<!-- 列表 -->
		<view class="page_width">
			<view class="border_bottom  " v-for="(item,index) in productList" :key="index">
				<view class="font_size22 font_color99 margin_top3">
					{{item.createTime}}
				</view>
				<view class="uni-flex">
					<view class="width66 uni-flex">
						<view class="font_sise28">
							{{item.nickName}}
						</view>
						<view class="font_colorcc font_size26 margin_left2">
							{{item.mobile}}
						</view>
					</view>
				<!-- 	<view class="width33 text_center">
						<view class="font_size24">
							总交易额
						</view>
						<view class="font_sise28 " style="color: #A58747;">
							{{item.totalTrans}}
						</view>
					</view> -->
					<view class="width33 text_center" style="margin-top: -5%;">
						<view class="font_size24">
							获得分润
						</view>
						<view class="font_sise28 " style="color: #A58747;">
							{{item.splitRunAmount}}
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="productList.length > 9">
				<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
			</view>
			<view v-if="productList.length == 0" class="text_center margin_top18">
				<image src="../../static/image/default/noOrder.png" class="no_img_order" mode=""></image>
				<view class="font_size28 font_color99 margin_top5">
					暂无记录~
				</view>
			</view>
		
		</view>


	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year -1;
		} else if (type === 'end') {
			year = year ;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				startDateOne: getDate('start'),
				endDateOne: getDate('end'),
				startDate: getDate('start'),
				endDate: getDate('end'),
				date: getDate({
					format: true
				}),
				tomeFalg:false,
				
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
			}
		},
		// 上拉加载
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
				var d1 = new Date(this.startDateOne.replace(/\-/g, "\/"));
				var d2 = new Date(this.endDateOne.replace(/\-/g, "\/"));
				if (!d1) {
					uni.showToast({
						title: '请选择开始日期',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
				} else if (!d2) {
					uni.showToast({
						title: '请选择结束日期',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
				} else if (d1 > d2) {
					uni.showToast({
						title: '结束时间不能小于开始日期',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					this.startDateOne = getDate('start')
					this.endDateOne =getDate('end')
					return;
				}
				if (this.startDateOne == '请选择') {
					this.startDateOne = ''
				}
				if (this.endDateOne == '请选择') {
					this.endDateOne = ''
				}
				var data = {
					endTime: this.endDateOne,
					limit: 10,
					mbId: uni.getStorageSync('userId'),
					page: this.pageNum,
					startTime: this.startDateOne,
				}
				this.$http.get('/api/member/split/detail', data, true).then(res => {
					if (res.data.code == 200) {
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
			
			
			
			goBack() {
				uni.navigateBack();
			},
			tomeFalgTab(){
				this.tomeFalg = !this.tomeFalg
			},
			// 时间格式话
			formatDate: function(value) {
				var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear();
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				var D = date.getDate();
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				return Y + '年' + M + '月' + D + '日';
			},
			// 时间开始
			bindDateChange: function(e) {
				this.startDateOne = e.detail.value;
				console.log(this.startDateOne)
				this.dataStartDate = this.formatDate(this.startDateOne);
				console.log(this.dataStartDate)
				this.getMoneyList()
			},
			// 时间结束
			bindDateChangeEnd: function(e) {
				this.endDateOne = e.detail.value;
				console.log(this.endDateOne)
				this.dataEndDate = this.formatDate(this.endDateOne);
				console.log(this.dataEndDate)
				this.getMoneyList()
			},


			// var d1 = new Date(this.startDateOne.replace(/\-/g, "\/"));
			// var d2 = new Date(this.endDateOne.replace(/\-/g, "\/"));
			// console.log(d1)
			// console.log(d2)
			// if (!d1) {
			// 	uni.showToast({
			// 		title: '请选择开始日期',
			// 		icon: 'none',
			// 		duration: 2000,
			// 		position: 'top',
			// 	});
			// } else if (!d2) {
			// 	uni.showToast({
			// 		title: '请选择结束日期',
			// 		icon: 'none',
			// 		duration: 2000,
			// 		position: 'top',
			// 	});
			// } else if (d1 > d2) {
			// 	uni.showToast({
			// 		title: '结束时间小于开始日期',
			// 		icon: 'none',
			// 		duration: 2000,
			// 		position: 'top',
			// 	});
			// 	return;
			// }
		}
	}
</script>

<style lang="less">
	.balk_img {
		width: 16upx;
		height: 28upx;
	}
</style>

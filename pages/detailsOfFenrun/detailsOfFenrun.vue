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
				分润详情
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
			<view class="border_bottom padding_top3 padding_bottom3" v-for="(item,index) in [1,2,3]" :key="index">
				<view class="font_size22 font_color99">
					2020-04-05
				</view>
				<view class="uni-flex">
					<view class="width33">
						<view class="font_sise28">
							唐筱筱
						</view>
						<view class="font_colorcc font_size26">
							15839887847
						</view>
					</view>
					<view class="width33 text_center">
						<view class="font_size24">
							总交易额
						</view>
						<view class="font_sise28 " style="color: #A58747;">
							50,000.00
						</view>
					</view>
					<view class="width33 text_center">
						<view class="font_size24">
							获得分润
						</view>
						<view class="font_sise28 " style="color: #A58747;">
							50,000.00
						</view>
					</view>
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
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				startDateOne: '请选择',
				endDateOne: '请选择',
				startDate: getDate('start'),
				endDate: getDate('end'),
				date: getDate({
					format: true
				}),
				tomeFalg:false
			}
		},
		methods: {
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
			},
			// 时间结束
			bindDateChangeEnd: function(e) {
				this.endDateOne = e.detail.value;
				console.log(this.endDateOne)
				this.dataEndDate = this.formatDate(this.endDateOne);
				console.log(this.dataEndDate)
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

<template>
	<view>
		<view class="page_width_moudel">
			<view class="font_size32">订单信息</view>
			<view class="top_moude_logist uni-flex">
				<view class="width20 text_center"><image src="../../static/image/icon/logist.png" mode="" style="width: 46upx;height: 34upx;margin-top: 45%;"></image></view>
				<view class="" style="margin-top: 5%;font-size: 30upx;">
					<view class="uni-flex ">
						<view class="font_color33">订单编号：</view>
						<view class="font_color66">{{ info.orderInfo.orderNo }}</view>
					</view>
					<view class="uni-flex ">
						<view class="font_color33">下单时间：</view>
						<view class="font_color66">{{ info.orderInfo.createTime }}</view>
					</view>
				</view>
			</view>

			<view class="font_size32 margin_top3">物流信息</view>
			
			<view class="moudel_ff">
				<view v-if="info.logistics.length > 0" class="uni-flex" v-for="(item, index) in info.logistics" :key="index">
					<view class="text_center width20">
						<view class="font_size30 font_color33">{{ item.time[0].substr(5, 5) }}</view>
						<view class="font_size22 font_color99">{{ item.time[1] }}</view>
					</view>
					<view class="width70">
						<view class="uni-flex">
							<view class="">
								<image v-if="index == 0" style="width: 50upx;height: 50upx;" src="../../static/image/icon/3.png" mode=""></image>
								<image v-else src="../../static/image/icon/0.png" style="width: 50upx;height: 50upx;" mode=""></image>
							</view>
							<view class="font_size30 " :class="index == 0? 'font_colorbe' : 'font_color99'" style="margin-left: 25upx;">
								{{ item.state == 0 ? '运输中' : item.state == 1 ? '揽收' : item.state == 3 ? '签收' : item.state == 4 ? '退签' : item.state == 5 ? '派件中' : '' }}
							</view>
						</view>
						<view class="" style="border-left: 1px solid #CCCCCC;margin-left: 5%;padding-left: 48upx;margin-top: -3%;padding-bottom: 20upx;">
							<view class="font_size24 font_color99">{{ item.context }}</view>
							<!-- <view class="font_size24 font_color99">
								联系电话: <text class="font_colorbe">17610763978</text>
							</view> -->
						</view>
						<view class="uni-flex" v-if="index == info.logistics.length - 1">
							<view class="bottom_border"></view>
							<view class="font_size24 font_color99" style="margin-left: 8%;margin-top: -1%;">您的订单以开始处理</view>
						</view>
					</view>
					<!-- <view class="">
						<view class="font_size30 font_colorbe">
							配送中
						</view>
					</view> -->
				</view>
			
				<view v-if="info.logistics.length == 0" class="font_size32 text_center" >
					暂无物流信息~
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderId: '',
			info: {
				orderInfo: {
					orderNo: '',
					createTime: ''
				}
			}
		};
	},
	onLoad(option) {
		console.log(option.orderId);
		this.orderId = option.orderId;
	},
	mounted() {
		this.getDetail();
	},
	methods: {
		getDetail: function() {
			var data = {
				orderId: this.orderId
			};
			this.$http.get('/api/order/queryLogisticsInfo', data, true).then(res => {
				if (res.data.code == 200) {
					this.info = res.data.data;
					for (let item of this.info.logistics) {
						item.time = item.time.split(' ');
					}
				}
			});
		}
	}
};
</script>

<style>
.page_width_moudel {
	width: 690upx;
	margin-left: 30upx;
	margin-right: 30upx;
	margin-top: 20upx;
}
.top_moude_logist {
	height: 167upx;
	background: #ffffff;
	border-radius: 20upx;
	margin-top: 30upx;
}
.moudel_ff {
	background: #ffffff;
	border-radius: 20upx;
	margin-top: 30upx;
	padding: 30upx;
}
.bottom_border {
	width: 14upx;
	height: 14upx;
	background-color: #cccccc;
	border-radius: 50%;
	margin-left: 3.5%;
}
</style>

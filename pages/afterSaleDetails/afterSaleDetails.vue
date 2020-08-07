<template>
	<view>
		<view class="page_width">

			<view class="top_moudel" style="padding-bottom: 20upx;">
				<view class="uni-flex display_space border_bottom padding_bottom3">
					<view class="font_size24">
						订单编号：<text class="font_size22 font_color66">{{afterData.id}}</text>
					</view>
					<view class="font_size22 font_color99">
						{{afterData.retTime}}
					</view>
				</view>

				<view class="uni-flex padding_top3 " v-for="(items,index) in afterData.returnDetails" :key="index">
					<view class="width30">
						<image :src="items.image" style="width: 160upx;height: 160upx;border-radius: 30upx;" mode=""></image>
					</view>
					<view class="width70">
						<view class="font_sise28 text_hidden">
							{{items.title}}
						</view>
						<view class="uni-flex display_space font_size22 font_color99 margin_top5">
							<view class="text_hidden width80">
								{{items.ownSpec}}
							</view>
							<view class="" style="margin-top: -1%;">
								×{{items.num}}
							</view>
						</view>
						<view class="font_colorbe font_size22">
							¥<text class="font_size30">{{items.price}}</text>
						</view>
					</view>
				</view>

			</view>


			<view class="top_moudel" v-if="afterData.applyService == 1">
				<view class="uni-flex border_bottom font_size26 padding_bottom3">
					<view class="width25">
						物流单号：
					</view>
					<view class="font_color66">
						{{afterData.logisticsCode}}
					</view>
				</view>
				<view class="uni-flex border_bottom font_size26 padding_bottom3 padding_top3">
					<view class="width25">
						申请原因:
					</view>
					<view class="font_color66">
						{{afterData.retReason}}
					</view>
				</view>
				<view class="uni-flex border_bottom font_size26 padding_bottom3 padding_top3">
					<view class="width25">
						退款时间:
					</view>
					<view class="font_color66">
						{{afterData.endTime}}
					</view>
				</view>
				<view class="uni-flex border_bottom font_size26 padding_bottom3 padding_top3">
					<view class="width25">
						退款金额：
					</view>
					<view class="font_colorbe font_size30">
						<text class="font_size26">¥</text> {{afterData.actualAmount}}
					</view>
				</view>
				<view class="uni-flex border_bottom font_size26 padding_bottom3 padding_top3">
					<view class="width25">
						退款路径：
					</view>
					<view class="font_color66 ">
						原支付方式
					</view>
				</view>
			</view>
			
			<view class="top_moudel" v-if="afterData.applyService == 2  || afterData.applyService == 4">
				<view class="uni-flex border_bottom font_size26 padding_bottom3">
					<view class="width25">
						物流单号：
					</view>
					<view class="font_color66">
						{{afterData.logisticsCode}}
					</view>
				</view>
				<view class="uni-flex border_bottom font_size26 padding_bottom3 padding_top3">
					<view class="width25">
						申请原因:
					</view>
					<view class="font_color66">
						{{afterData.retReason}}
					</view>
				</view>
			</view>
			
			
			<view class="top_moudel" v-if="afterData.applyService == 3">
				<view class="uni-flex border_bottom font_size26 padding_bottom3 padding_top3">
					<view class="width25">
						申请原因:
					</view>
					<view class="font_color66">
						{{afterData.retReason}}
					</view>
				</view>
				<view class="uni-flex border_bottom font_size26 padding_bottom3 padding_top3">
					<view class="width25">
						退款时间:
					</view>
					<view class="font_color66">
						{{afterData.endTime}}
					</view>
				</view>
				<view class="uni-flex border_bottom font_size26 padding_bottom3 padding_top3">
					<view class="width25">
						退款金额：
					</view>
					<view class="font_colorbe font_size30">
						<text class="font_size26">¥</text> {{afterData.actualAmount}}
					</view>
				</view>
				<view class="uni-flex border_bottom font_size26 padding_bottom3 padding_top3">
					<view class="width25">
						退款路径：
					</view>
					<view class="font_color66 ">
						原支付方式
					</view>
				</view>
			</view>
			
		
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				afterData: ''
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
		},
		mounted() {
			this.getApplyOrder()
		},
		methods: {
			//查询可申请订单
			getApplyOrder: function() {
				let _this = this;
				var followData = {
					retId: this.id,
				}
				_this.$http.get('/api/retOrder/detail', followData, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res));
						this.afterData = res.data.data
					}
				})

			},

		}
	}
</script>

<style lang="less">
	.top_moudel {
		padding: 30upx;
		background: #ffffff;
		border-radius: 20upx;
		margin-top: 30upx;
		
	}

	.center_moudel {

		background: #ffffff;
		border-radius: 20upx;
	}
</style>

<template>
	<view>
		<view class="">
			<view class="uni-flex background_colorff padding_top3 padding_bottom3">
				<view class="margin_left3">
					<image src="../../static/image/beij/logB.png" style="width: 200upx;height: 200upx;" mode=""></image>
				</view>
				<view class="margin_left3">
					<view class="">
						商家名称
					</view>
					<view class="">
						介绍等
					</view>
					<view class="">
						业务
					</view>
				</view>
			</view>


			<view class="text_center font_size36 font_weight500">
				商家介绍
			</view>

			<view class="font_size36 font_weight500 margin_left3">
				经营范围
			</view>

			<view class="margin_top3">
				<view class="width25 text_center display_inline" v-for="(item,index) in tabList" :key="index">
					<view class="">
						<image src="../../static/image/pathUrl/tab1.png" mode="" style="width: 80upx;height: 80upx;"></image>
					</view>
					<view class="font_size26">
						{{item.name}}
					</view>
				</view>
			</view>
			
			<image src="../../static/image/ceshi.png" mode="" style="width: 100%; margin-top: 3%;"></image>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
						name: '报修'
					},
					{
						name: '房屋租售'
					},
					{
						name: '缴费'
					},
					{
						name: '投诉建议'
					},
					{
						name: '待定'
					},
					{
						name: '待定'
					},
					{
						name: '待定'
					},
					{
						name: '待定'
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>

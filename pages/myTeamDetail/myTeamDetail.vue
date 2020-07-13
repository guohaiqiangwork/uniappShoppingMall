<template>
	<view>
		<view class="mt_top_t">
			<view class="uni-flex">
				<view class="width15" style="margin-left: 60upx;">
					<image src="../../static/image/bank/jsy.png" class="left_img1"  mode=""></image>
				</view>
				<view class="width80">
					<view class="font_sise28 font_colorff">
						唐筱筱
					</view>
					<view class="font_size26 font_colorcc">
						15839887847
					</view>
				</view>
			</view>
			<view class="uni-flex margin_top3">
				<view class="width33 text_center font_colorff">
					<view class="font_size36" style="color: #FFE0A5;">
						100
					</view>
					<view class="font_size28">
						总人数
					</view>
				</view>
				<view class="width33 text_center font_colorff">
					<view class="font_size36" style="color: #FFE0A5;">
						100
					</view>
					<view class="font_size28">
						总交易额
					</view>
				</view>
				<view class="width33 text_center font_colorff" @click="goDetailsOfFenrun">
					<view class="font_size36" style="color: #FFE0A5;">
						100
					</view>
					<view class="font_size28">
						获得分润
					</view>
				</view>
			</view>
					
		</view>

		
		
		<!-- 列表 -->
		<view class="page_width margin_top3">
			<view class="font_size30">
				团队人员
			</view>
			<scroll-view class="">
				 <view class="uni-flex  padding_top3 padding_bottom3" >
				 	<view class="width15">
				 		<image src="../../static/image/beij/logB.png" class="left_img1" mode=""></image>
				 	</view>
					<view class="width40 ">
						<view class="uni-flex ">
							<view class="font_sise28">
								唐筱筱
							</view>
							<view class="">
								<!-- <image src="../../static/image/bank/gsy.png" mode="" style="width: 90upx;height: 30upx;"></image> -->
							</view>
						</view>
						<view class="font_size26 font_color66">
							15839887847
						</view>
					</view>
					<view class="width40 text_right">
						<view class="uni-flex display_right">
							<view class="">
								<image src="../../static/image/icon/people.png"  style="width: 26upx;height: 26upx;" mode=""></image>
							</view>
							<view class="font_size26 font_color99 margin_left3">
								50人
							</view>
						</view>
						<view class="font_size24">
							总交易额 <text class="font_sise28 font_colorbe">50,000.00</text>
						</view>
					</view>
				 </view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			Search(e){
				console.log(e)
			},
			goDetailsOfFenrun(){
				uni.navigateTo({
					url:'../detailsOfFenrun/detailsOfFenrun'
				})
			}
			
		}
	}
</script>

<style lang="less">
	page{
		background-color: #FFFFFF;
	}
	.mt_top_t {
		background: url(../../static/image/beij/md.png) no-repeat;
		height: 300upx;
		background-size: 100% 100%;
		padding-top: 30upx;
	}
	
	.left_img1{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
</style>

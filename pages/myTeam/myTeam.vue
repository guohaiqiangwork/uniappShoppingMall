<template>
	<view>
		<view class="mt_top_t">
			<view class="uni-flex">
				<view class="width33 text_center font_colorff">
					<view class="font_size36">
						100
					</view>
					<view class="font_size28">
						总人数
					</view>
				</view>
				<view class="width33 text_center font_colorff">
					<view class="font_size36">
						100
					</view>
					<view class="font_size28">
						总交易额
					</view>
				</view>
				<view class="width33 text_center font_colorff">
					<view class="font_size36">
						100
					</view>
					<view class="font_size28">
						获得分润
					</view>
				</view>
			</view>
		
		</view>


		<!-- 头部搜索 -->
		<view class=" background_colorff padding_bottom2 padding_top2">
			<!-- 搜索框 -->
			<view class="uni-flex top_content" style="box-shadow: 0upx 2upx 10upx 0upx #eeeeee; ">
				<view class="searce_left">
					<image src="../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<!-- @input="getInputv" :value="inputValue" -->
					<input class="findShop" maxlength="10" placeholder="请输入要搜索的内容" confirm-type='搜索'
					 type="text" @confirm='Search' placeholder-style='color:#cccccc' />
				</view>
			</view>
		</view>
		
		
		<!--  -->
		<view class="font_size30 margin_left3">
			我的上级
		</view>
		<view class="top_title">
			魏无羡 <text class="margin_left3">15539897747</text>
		</view>
		
		<view class="page_width margin_top3">
			<view class="font_size30">
				团队人员
			</view>
			<scroll-view class="">
				 <view class="uni-flex border_bottom padding_top3 padding_bottom3" @click="goDetail">
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
								<image src="../../static/image/icon/people.png" style="width: 26upx;height: 26upx;" mode=""></image>
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
			goDetail(){
				uni.navigateTo({
					url:'../myTeamDetail/myTeamDetail'
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
		background: url(../../static/image/beij/myTeam.png) no-repeat;
		height: 180upx;
		background-size: 100% 100%;
		padding-top: 46upx;
	}
	.top_content {
		width: 94%;
		margin-left: 3%;
		height: 66upx;
		background: #ffffff;
		border-radius: 12upx;
	}
	.top_title{
		padding: 30upx;
		color: #FFFFFF;
		font-size: 28upx;
		background: linear-gradient(to right, #edcb80, #a58747);
		margin-top: 30upx;
	}
	.left_img1{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
</style>

<template>
	<view>
		<view class="background_colorff" style="padding-top: 20upx;padding-bottom: 20upx;">
			<view class="uni-flex searce_moudel">
				<view class="searce_left">
					<image src="../../static/image/icon/searce.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<input class="findShop" maxlength="10" placeholder="输入需要查找的店铺名称" confirm-type='搜索' type="text" @confirm='Search'
					 placeholder-style='color:#cccccc' />
				</view>
			</view>
		</view>
		<view class="list_moudel">
			<view class="list_one" @click="goToDetails" v-for="(index,item) in [1,3,2,5,0,8]" :key="index">
				<view class="uni-flex">
					<view class="width33">
						<image src="../../static/image/beij/mybj.png" class="img_list" mode=""></image>
					</view>
					<view class="margin_top3">
						<view class="font_size26">
							店铺名称：第三届法律框架离开
						</view>
						<view class="">
							是否营业：营业中
						</view>
						<view class="">
							联系电话：13333111222
						</view>
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

			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: e.id + '服务'
			})
		},
		methods: {
			// 去详情
			goToDetails() {
				uni.navigateTo({
					url: '../convenientDetails/convenientDetails'
				})
			},
			// 获取输入框值
			Search(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	.item_tab {
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #999999;
		font-size: 28upx;
		height: 88upx;
		line-height: 88upx;
	}

	.list_moudel {
		width: 94%;
		margin-left: 3%;
	}

	.list_one {
		padding: 30upx;
		border-radius: 20upx;
		margin-top: 20upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
	}

	.img_list {
		width: 180upx;
		height: 180upx;
	}

	.searce_moudel {
		width: 94%;
		margin-left: 3%;
		-moz-box-shadow: 0px 5px 5px #CCCCCC;
		-webkit-box-shadow: 0px 0px 5px #CCCCCC;
		box-shadow: 0px 0px 5px #CCCCCC;
		height: 66upx;
		border-radius: 40upx;
		line-height: 66upx;
	}

	.searce_left {
		width: 5%;
		margin-left: 2%;
		margin-top: 1%;

	}

	.searce_right {
		margin-top: 1%;
		margin-left: 2%;
		width: 100%;
	}

	.searce_width {
		width: 29upx;
		height: 27upx;
		margin-top: 1%;
	}
</style>

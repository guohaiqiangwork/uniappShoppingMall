<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width10 text_center" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="uni-flex top_content">
				<view class="searce_left">
					<image src="../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<input class="findShop" maxlength="10" @input="getInputv" :value="inputValue" placeholder="请输入要搜索的内容" confirm-type='搜索'
					 type="text" @confirm='Search' placeholder-style='color:#cccccc' />
				</view>
			</view>

			<view @click="goSearchList" class="font_size28 text_center width15 " style="padding-top: 1%;">
				搜索
			</view>
		</view>

		<!-- 内容 -->
		<view class="background_colorf8 padding_top3 padding_bottom3">
			<view class="page_width">
				<view class="uni-flex display_space">
					<view class="font_size28">
						历史搜索
					</view>
					<view class="">
						<image src="../../static/image/icon/sdelect.png" style="width: 29upx;height: 28upx;" mode=""></image>
					</view>
				</view>
				<view class="padding_bottom3">
					<view class="tab_item" @click="assignment('蓝牙耳机')" v-for="(item,index) in [1,2,3,4,5,6,7]" :key="index">
						蓝牙耳机
					</view>
				</view>

			</view>

			<view class="" style="background-color: #F4F4F4;height: 10upx;"></view>

			<view class="page_width margin_top3">
				<view class="font_size28">
					热门搜索
				</view>
				<view class="uni-flex" v-for="(item,index) in list" :key='index'>
					<view class="list_left margin_right3" v-if="item.type == 1">
						爆
					</view>
					<view class="list_left margin_right3" style="background-color: #7EB546;" v-if="item.type == 2">
						推
					</view>
					<view class="">
						{{item.name}}
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
				list: [{
						name: '618',
						type: 1
					},
					{
						name: '监控看见开会',
						type: 2
					},
					{
						name: "监控了佳龙",
						type: ''
					},
					{
						name: '进来看见了看见',
						type: ''
					}
				],
				inputValue: ''
			}
		},
		onLoad(option) {
			console.log(option.searchName)
			this.inputValue = option.searchName
		},
		methods: {
			// 输入了回车键
			Search(e) {
				console.log(e.detail.value);
				this.inputValue = e.detail.value;
			},
			// 输入框输入事件
			getInputv(e) {
				console.log(e)
			},
			// 历史赋值
			assignment(item) {
				this.inputValue = item;
			},
			// 搜索页面跳转
			goSearchList() {
				uni.navigateTo({
					url: '../searchList/searchList?listF=' + this.inputValue + '&urlFalg=search'
				})
			},
			// 返回
			goBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #FAFAFA;
	}

	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.top_content {
		width: 75%;
		height: 66upx;
		background: #f8f8f8;
		border-radius: 12upx;
	}

	.tab_item {
		display: inline-block;
		height: 50upx;
		margin-left: 2%;
		background-color: #EEEEEE;
		border-radius: 25upx;
		text-align: center;
		margin-top: 30upx;
		padding: 10upx 22upx 10upx 22upx;
		font-size: 24upx;
	}

	.list_left {
		padding: 4upx;
		background: #fc5454;
		border-radius: 2upx;
		color: #FFFFFF;
		font-size: 20upx;
		height: 24upx;
		width: 24upx;
		line-height: 24upx;
		text-align: center;
		align-items: center;
		margin-top: 10upx;

	}
</style>

<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width30 text_left margin_left3" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="width50 text_center font_size36" >
				{{title}}
			</view>
			<view class="font_size20 width20 text_right width30 margin_right3 " style="padding-top: 1%;">
				{{rightF}}
			</view>
		</view>


		<!-- 银行卡列表 -->
		<view class="page_width">
			<!-- 列表 -->
			<template v-if="backList.length > 0">
				<view class="uni-flex back_moudel" :class="index == 1 ? 'mouden_bj_2' : ''" v-for="(item,index) in backList" :key="index">
					<view class="width15">
						<image src="../../static/image/bank/gsy.png" class="left_img" mode=""></image>
					</view>
					<view class="font_size30 width30">
						<view class="">
							中国农业银行
						</view>
						<view class="">
							储蓄卡
						</view>
					</view>
					<view class="width65 text_right">
						<view class="font_size32">
							**** **** **** 4414
						</view>
						<view class="margin_top2">
							<image src="../../static/image/my/bf.png" mode="" class="right_img"></image>
							<!-- <image src="../../static/image/my/bf1.png" mode="" class="right_img"></image> -->
						</view>
					</view>
				</view>

			</template>

			<!-- 列表缺省 -->
			<view class="text_center" v-if="backList.length == 0">
				<view class="margin_top18">
					<image src="../../static/image/default/noBack.png" class="noImg" mode=""></image>
				</view>
				<view class="font_size30 font_color99 margin_top2">
					您还没有银行卡
				</view>
				<view class="nobtn" @click="addBack">
					添加银行卡
				</view>
			</view>

		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的银行卡',
				rightF: '解除绑定',
				backList: [],
			}
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateBack()
			},
			
			// 去绑定银行卡
			addBack(){
				uni.navigateTo({
					url:'../addBack/addBack'
				})
			}

			// switch (data.data[index].bankCode) {
			// 	case 'ICBC':
			// 			data.data[index].bankBColor = 'bank_bgColor_zgp'
			// 			data.data[index].imgUrl = '../image/bank/gsy.png';
			// 			break;
			// 	case 'ABC':
			// 			data.data[index].bankBColor = 'bank_bgColor_ny'
			// 			data.data[index].imgUrl = '../image/bank/nyy.png';
			// 			break;
			// 	case 'CCB':
			// 			data.data[index].bankBColor = 'bank_bgColor_jj'
			// 			data.data[index].imgUrl = '../image/bank/jsy.png';
			// 			break;
			// 	case 'BOC':
			// 			data.data[index].bankBColor = 'bank_bgColor_zgp'
			// 			data.data[index].imgUrl = '../image/bank/zgy.png';
			// 			break;
			// 	case 'COMM':
			// 			data.data[index].bankBColor = 'bank_bgColor_jj'
			// 			data.data[index].imgUrl = '../image/bank/jty.png';
			// 			break;
			// 	case 'PSBC':
			// 			data.data[index].bankBColor = 'bank_bgColor_ny'
			// 			data.data[index].imgUrl = '../image/bank/yzy.png';
			// 			break;
			// 	case 'SPDB':
			// 			data.data[index].bankBColor = 'bank_bgColor_zgp'
			// 			data.data[index].imgUrl = '../image/bank/qty.png';
			// 			break;
			// 	case 'CMB':
			// 			data.data[index].bankBColor = 'bank_bgColor_zgp'
			// 			data.data[index].imgUrl = '../image/bank/zsy.png';
			// 			break;
			// 	default:
			// 			data.data[index].bankBColor = 'bank_bgColor_zgp'
			// 			data.data[index].imgUrl = '../image/bank/qty.png';
			// 			break;
			// }

		}
	}
</script>

<style lang="less">
	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.back_moudel {
		height: 220upx;
		background: linear-gradient(to right, #ff8b70, #ff576c);
		border-radius: 10upx;
		color: #FFFFFF;
		margin-top: 30upx;
		padding: 60upx 30upx;
	}

	.mouden_bj_1 {
		background: linear-gradient(to right, #00BBA7, #018DB6) !important;
	}

	.mouden_bj_2 {
		background: linear-gradient(to right, #5FA2D8, #4166C1) !important;
	}

	.left_img {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
	}

	.right_img {
		width: 30upx;
		height: 30upx;
	}
	.noImg{
		width: 446upx;
		height: 376upx;
	}
	.nobtn{
		width: 530upx;
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		font-size: 30upx;
		margin-left: 110upx;
		margin-top: 30upx;
	}
</style>

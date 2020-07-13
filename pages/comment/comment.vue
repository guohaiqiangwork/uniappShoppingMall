<template>
	<view>


		<!-- 列表 -->
		<view class="page_width">
			<!-- 商品 -->
			<template>
				<view class="uni-flex list_moudel_search">
					<view class="width25">
						<image src="../../static/image/beij/mybj.png" class="list_img" mode=""></image>
					</view>
					<view class="width66">
						<view class="">
							联想小新Air14 锐龙版
						</view>
						<view class="margin_top8">
							<uni-rate size="24" active-color="#B99445" :value="rateNumber" @change="onChange"></uni-rate>
						</view>
					</view>
				</view>

			</template>

			<!-- 评论 -->
			<view class="bo_moudel">
				<view class="font_sise28">
					详细评价
				</view>
				<view class="margin_top3">
					<textarea value="" placeholder="请填写内容" class="text_moudel" />
					</view>
				<view class="font_size22 font_colorcc text_right margin_top3 margin_right3">
					{{number}}/300
				</view>
				<view class="uni-flex margin_top8" >
					<view class="width30 text_center" :class="index !=0 ? 'margin_left4' : ''" v-for="(item,index) in [1,2,3]" :key="index">
						<image src="../../static/image/beij/jian.png" class="jian_img" mode=""></image>
						<image src="../../static/image/beij/uplodel.png" class="img_width" mode=""></image>
					</view>
				</view>
			</view>
			
			
			<view class="btn_comment">
				提交申请
			</view>
		</view>
		
		<!-- 提示框 -->
		<template v-if="pfalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">
						提交后无法修改，是否确定提交
					</view>
					<view class="uni-flex " style="margin-top: 80upx;"> 
						<view class="leftbtn" @click="closemoudel">
							取消
						</view>
						<view class="rightbtn" @click="okMoudel">
							确认
						</view>
					</view>
				</view>
			</view>
		</template>
		
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				rateNumber:0,
				number:0,
				pfalg: false
			}
		},
		onLoad(option) {
			this.inputValue = option.listF;
		},

		methods: {
			onChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e));
			},
			// 确认取消
			okMoudel(){
				
			},
			// 取消
			closemoudel(){
				this.pfalg = false
			}

		}
	}
</script>

<style lang="less">
	// 列表
	.list_moudel_search {
		height: 220upx;
		background: #ffffff;
		border-radius: 30upx;
		margin-top: 30upx;
		padding: 30upx;
	}

	.list_img {
		width: 140upx;
		height: 140upx;
		border-radius: 20upx;
	}

	.image_list_s {
		width: 45upx;
		height: 45upx;
		border-radius: 50%;
	}

	.listrightbtn {
		width: 160upx;
		height: 60upx;
		border: 1px solid #be8100;
		border-radius: 10upx;
		text-align: center;
		line-height: 60upx;
		color: #BE8100;
		font-size: 26upx;
		margin-top: -30upx;
	}
	.bo_moudel{
		background: #ffffff;
		border-radius: 20upx;
		padding: 30upx;
		margin-top: 30upx;
	}
	.btn_comment{
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		font-size: 30upx;
		position: absolute;
		width: 94%;
		bottom: 5%;
	}
	.text_moudel{
		height: 220upx;
		font-size: 26upx;
		width: 630upx;
		border: 1px solid #eeeeee;
		border-radius: 20upx;
		padding: 20upx;
	}
	.img_width{
		width: 200upx;
		height: 200upx;
	}
	.margin_left4{
		margin-left: 4%;
	}
	.jian_img{
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		position: absolute;
		margin-top: -30upx;
		margin-left: 24%;
	}
	
	.product_content_block {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		height: 362upx;
		width: 600upx;
		margin-left: 75upx;
	}
	
	.leftbtn {
		width: 220upx;
		height: 78upx;
		border: 1px solid #3c3d3e;
		border-radius: 10px;
		text-align: center;
		color: #3C3D3E;
		line-height: 78upx;
		margin-left: 45upx;
	}
	
	.rightbtn {
		width: 220upx;
		height: 78upx;
		background: #3c3d3e;
		border-radius: 10px;
		color: #FFFFFF;
		text-align: center;
		line-height: 78upx;
		margin-left: 45upx;
	}
</style>

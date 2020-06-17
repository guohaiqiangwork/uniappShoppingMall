<template>
	<view>
		<view class="">
			<swiper class="imageContainer" circular autoplay>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item >
						<image class="itemImg" :src="item.banner" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		
		<view class=" margin_left3 margin_top3">
			<view class="font_size26">
				店铺名称：fjalk进来看了空间
			</view>
			<view class="">
				经营范围：jflaksjdlj j 进来看了
			</view>
			<view class="">
				是否营业：营业中
			</view>
			<view class="">
				联系电话：13333111222
			</view>
		</view>
		
		
		<view class="margin_top3">
			<image v-for="(item,index) in [1,2,3]" :key="index" src="../../static/image/ceshi.png" class="image_width_height100" mode="widthFix"></image>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [{
					banner: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3538793755,2857666234&fm=26&gp=0.jpg'
				}, {
					banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="less">
	/* 轮播 */
	.imageContainer {
		width: 100%;
		height: 300upx;
	}

	.itemImg {
		width: 100%;
		height: 300upx;
	}
</style>

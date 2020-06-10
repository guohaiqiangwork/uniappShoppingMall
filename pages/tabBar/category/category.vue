<template>
	<view>
		<view class="title_top"></view>
		<!-- 轮播图 -->
		<view class="">
			<swiper class="imageContainer" @change="handleChange" circular autoplay>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item @click="swiperClick(item.id)">
						<image class="itemImg" :src="item.banner" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		
		<!-- 分类 -->
		<view class="margin_top3">
			<view class="width25 text_center display_inline" v-for="(item,index) in tabList" :key="index" @click="goOperation(item.name)">
				<view class="">
					<image src="../../../static/image/pathUrl/tab1.png" mode="" style="width: 80upx;height: 80upx;"></image>
				</view>
				<view class="font_size26">
					{{item.name}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:[
					{name:'家政'},
					{name:'购物'},
					{name:'医疗'},
					{name:'汽车救援'},
					{name:'购物'},
					{name:'水电急救'},
					{name:'待定'},
					{name:'待定'}
				],
				imgList: [{
					banner: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3538793755,2857666234&fm=26&gp=0.jpg'
				}, {
					banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
				}]
			}
		},
		methods: {
			Search(e) {
				console.log(e);
			},
			// 轮播滑动操作
			handleChange(e) {
				this.currentIndex = e.detail.current;
			},
			// 点击轮播操做
			swiperClick(e) {
				uni.navigateTo({
					url: '../../pages/activity/activity?id=' + e
				})
			},
			goOperation(e){
				console.log(e)
				uni.navigateTo({
					url:'../../homeOperation/homeOperation?id='+ e
				})
			},
			
		}
	}
</script>

<style lang="less">
	// 轮播
	.imageContainer {
		width: 100%;
		height: 300upx;
	}
	
	.itemImg {
		width: 100%;
		height: 300upx;
	}
</style>

<template>
	<view>
		<view class="title_top"></view>

		<!-- 缴费用户 -->
		<template v-if="payMoney">
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


			<view class="">
				热门推荐：收费位置
				好评
				距离最近
			</view>

		</template>
		<!-- 未缴费 -->
		<template v-else>
			<view class="no_moneyPay">
				<view class="text_center font_size32">
					您还未缴纳物业费，请您进行缴费
				</view>
				<view class="btn_moudel jb_view" @click="goToMoney">
					去缴费
				</view>
			</view>
		
		</template>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payMoney:true,
				tabList: [{
						name: '家政'
					},
					{
						name: '购物'
					},
					{
						name: '医疗'
					},
					{
						name: '汽车救援'
					},
					{
						name: '购物'
					},
					{
						name: '水电急救'
					},
					{
						name: '待定'
					},
					{
						name: '待定'
					}
				],
				imgList: [{
					banner: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3538793755,2857666234&fm=26&gp=0.jpg'
				}, {
					banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
				}]
			}
		},
		onLoad() {
			if(!uni.getStorageSync('moneyFalge')){
				this.payMoney = false
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
			// 操作
			goOperation(e) {
				
				uni.navigateTo({
					url: '../../convenient/convenient?id=' + e
				})
			},
			// 去缴费
			goToMoney(){
				uni.navigateTo({
					url:'../../payMoney/payMoney'
				})
			}

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
	.no_moneyPay{
		width: 94%;
		margin-left: 3%;
		background-color: #FFFFFF;
		align-items: center;
		margin-top: 30%;
		border-radius: 30upx;
		padding: 30upx;
	}
	.btn_moudel {
		width: 180upx;
		height: 60upx;
		border-radius: 50upx;
		line-height: 60upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32upx;
		align-items: center;
		margin-top: 30upx;
		margin-left: 35%;
	}
</style>

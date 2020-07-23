<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width35 margin_left3" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<view class="font_size36">
				商品清单({{invalidList.length}})
			</view>
		</view>
		<!-- 列表 -->
		<view class="page_width">
			<view class="uni-flex product_moudel_list" v-for="(item,index) in invalidList" :key="index">
				<view class="width30">
					<image :src="item.image" class="list_imgp" mode=""></image>
				</view>
				<view class="width70">
					<view class="font_sise28 text_hidden2">
						{{item.title}}
					</view>
					<view class="uni-flex display_space margin_top2">
						<view class="font_size22 font_color99">
							{{item.ownSpec}}
						</view>
						<view class="font_size24 font_color99 margin_right3">
							*{{item.num}}
						</view>
					</view>
					<view class="font_sise28 font_colorbe margin_top3">
						<text class="font_size22">¥</text> {{item.price}} <text class="font_size22 font_color99">/件</text>
					</view>
				</view>
			</view>
		
		</view>
		
		<!-- 真招 -->
		<template v-if="falgSX">
			<view class="falgSX_moudel"></view>
		</template>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				falgSX:true,
				invalidList:''
			}
		},
		onLoad(option) {
			console.log(option.falg)
			option.falg == 's' ? this.falgSX =true :this.falgSX =false;
		},
		mounted() {
			this.falgSX ? this.getShopCardInval() : '';
			
		},
		methods: {
			// 查询失效
			getShopCardInval: function() {
				var data = {
					mbId: uni.getStorageSync('userId'),
				}
				this.$http.get('/api/cart/listInvalid', data, true).then(res => {
					if (res.data.code == 200) {
						this.invalidList = res.data.data
					}
				})
			},
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.product_moudel_list {
		padding: 20upx;
		background: #ffffff;
		border-radius: 10upx;
		margin-top: 20upx;
		border-radius: 20upx;
	}

	.list_imgp {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}
	.falgSX_moudel{
		height: 100%;
		width: 100%;
		position: fixed;
		background-color:#FFFFFF;
		z-index: 99;
		top: 10%;
		left: 0;
		opacity: 0.5;
	}
</style>

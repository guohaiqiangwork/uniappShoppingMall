<template>
	<view>


		<!-- 列表 -->
		<view class="page_width">
			<!-- 商品 -->
			<template>
				<view class="uni-flex list_moudel_search" v-for="(item,index) in orderDetail.details" :key="index">
					<view class="width30">
						<image :src="item.image" class="list_img" mode=""></image>
					</view>
					<view class="width66">
						<view class="margin_top3 text_hidden font_weight600">
						{{item.title}}
						</view>
						<view class="font_size22 font_color99 margin_top5">
							{{item.ownSpecMap}}
						</view>
						<view class="uni-flex display_space margin_top2">
							<view class="font_size30">
								<text class="font_colorbe font_weight600">¥{{item.price}}</text> 
							</view>
							<view class="" v-if="!item.buyerRate" @click="goComment(item.id,item.orderId)">
								<view class="listrightbtn">
									立即评价
								</view>
							</view>
						</view>
					</view>
				</view>

			</template>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:'',
				orderDetail:''
			}
		},
		onLoad(option) {
			this.orderId = option.orderId;
		},
		mounted() {
			
		},
		onShow() {
			this.getOrderDetail()
		},
		methods: {
			goComment:function(id,orderId){
				uni.navigateTo({
					url:'../comment/comment?orderDetailId=' + id + '&orderId=' + orderId,
					})
			},
			
			// 获取订单数据
			getOrderDetail:function() {
				var data = {
					orderId: this.orderId
				}
				this.$http.get('/api/order/detail', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res))
						this.orderDetail = res.data.data
						
					}
				});
			},
			

		}
	}
</script>

<style lang="less">
	// 列表
	.list_moudel_search {
		// height: 220upx;
		background: #ffffff;
		border-radius: 20upx;
		margin-top: 30upx;
		padding: 30upx 30upx 20upx 30upx;
		
	}

	.list_img {
		width: 160upx;
		height: 160upx;
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
		margin-left: 16%;
	}
</style>

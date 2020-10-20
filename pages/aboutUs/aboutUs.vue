<template>
	<view>
		<view class=" top_moudel">
			<image src="../../static/image/log.png" mode="" style="width: 170upx;height: 170upx;"></image>
			<view class="font_size32 font_color33">
				华行优选
			</view>
			<view class="font_color99 font_size30">
				版本：V{{VCode}}
			</view>
		</view>
		<view class="center_moudel">
			<view class="uni-flex list_one display_space" @click="goUserConter('userAgreement')">
				<view class="font_color33 font_size30 font_weight500">
					用户协议
				</view>
				<view class="">
					<image src="../../static/image/icon/right.png" style="width: 14upx;height: 24upx;" mode=""></image>
				</view>
			</view>
			<view class="uni-flex list_one display_space" style="border: none;" @click="goUserConter('userPrivacy')">
				<view class="font_color33 font_size30 font_weight500">
					隐私政策
				</view>
				<view class="">
					<image src="../../static/image/icon/right.png" style="width: 14upx;height: 24upx;" mode=""></image>
				</view>
			</view>

		</view>
		<view class="font_size22 font_color99 text_center" style="position: fixed; bottom :3%;width:100%">
			@华行优选   版权所有
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				VCode: ''
			}
		},
		onLoad() {
			this.getV(); //获取版本号
		},
		methods: {
			goUserConter(page) {
				uni.navigateTo({
					url: '../' + page + '/' + page,
				});
			},
			// 获取版本号  {version}
			getV() {
				this.$http.get('/api/common/android/number').then(res => {
					if (res.data.code == 200) {
						this.VCode = res.data.data;
					} else {
						//有误
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'center',
						});
					}
				}).catch(err => {})

			}
		}
	}
</script>

<style>
	page {
		background-color: #F4F4F4;
	}

	.top_moudel {
		text-align: center;
		background-color: #FFFFFF;
		padding-top: 5%;
		padding-bottom: 7%;
	}

	.center_moudel {
		width: 100%;
		background-color: #FFFFFF;
	}

	.list_one {
		width: 92%;
		margin-left: 4%;
		border-bottom: 1px solid #EEEEEE;
		padding-top: 3%;
		padding-bottom: 3%;
	}
</style>

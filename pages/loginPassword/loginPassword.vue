<template>
	<view>
		<view class="moudel_p">
			<view class="uni-flex  padding_bottom3 border_bottom">
				<view class="font_size30 width30 text_left " style="padding-left: 3.5%;">
					新密码
				</view>
				<view class="width70 font_size30">
					<input placeholder="请输入密码" type="password" placeholder-style="color:#999999" :value="newPa" @input="onePassword"/>
				</view>
			</view>
			<view class="uni-flex padding_top3  border_bottom" style="padding-bottom: 4%;">
				<view class="font_size30 width30 text_left "  style="padding-left: 3.5%;">
					确认密码
				</view>
				<view class="width70 font_size30">
					<input placeholder="请再次输入密码" type="password" placeholder-style="color:#999999" :value="newPa"  @input="twoPassword"/>
				</view>
			</view>

		</view>

		<view class="bottom_btn_l" @click="getSetPassword">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newPa: '',
				oneNumber:'',
				twoNumber:''
			}
		},
		methods: {
			onePassword:function(e){
				console.log(e.detail.value)
				this.oneNumber = e.detail.value
			},
			twoPassword:function(e){
				console.log(e.detail.value)
				this.twoNumber =e.detail.value
			},
			
			getSetPassword:function(){
				if(this.oneNumber != this.twoNumber){
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none',
						duration: 2000,
						position: 'center',
					});
					return;
				}
				var data = {
					mbId: uni.getStorageSync('userId'),
					password:this.oneNumber
				}
				// 获取个人信息
				this.$http.post('/api/member/setPassword', data, true).then(res => {
					console.log(JSON.stringify(res))
					if (res.data.code == 200) {
						uni.showToast({
							title: '设置成功',
							icon: 'none',
							duration: 2000,
							position: 'center',
						});
						uni.navigateBack()
					}
				});
			
			
			},
		}
	}
</script>

<style lang="less">
	.moudel_p {
		background-color: #FFFFFF;
		margin-top: 2upx;
		padding: 30upx;
		padding-bottom: 0;
	}

	.bottom_btn_l {
		width: 690upx;
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		margin-left: 30upx;
		position: fixed;
		bottom: 3%;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		font-size: 30upx;
	}
</style>

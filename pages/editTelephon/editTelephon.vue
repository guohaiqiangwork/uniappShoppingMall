<!-- 编辑手机号 -->
<template>
	<view>
		<view class="content">
			<view class="content_item">
				<text class="font_weight600 font_size30">我的手机</text>
				<text class="font_color66 font_size30 margin_left40">{{tele}}</text>
			</view>
			
			<view class="content_item">
				<text class="font_weight600 font_size30">更换手机</text>
				<input @input="getPhone" placeholder="请输入手机号" maxlength="11" placeholder-style="color:#999999" style="width: 520upx;float: right;margin-top: 32upx;font-size: 30upx;" type="text" value="" />
			</view>
			
			<view class="content_item">
				<text class="font_weight600 font_size30">验证码</text>
				<view style="display: flex;align-items: center; width: 520upx;height: 110upx;float: right;">
					<input @input="getCode" type="text" placeholder-style="color:#999999" placeholder="请输入验证码" style="font-size: 30upx;" />
					<view style="border-left: #CCCCCC solid 1px;width: 40%;text-align: right;margin-left:5%;padding-left: 3%;">
						<text @click="getYzm">{{yzm}}</text>
					</view>
				</view>
			</view>
		</view>
		
		
		<view @click="submitButtFun" class="submitBut">确定</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tele:'',
				yzm: '获取验证码',
				yzm_stuas: 0,
				timed: 59,
				newTele:'',
				yzmCode:'',
				onePhone:''//修改的手机好吗
			};
		},
		onLoad(e) {
			this.tele = e.telePhone;
		},
		
		methods:{
			// 获取修改手机号
			getPhone:function(e){
				this.onePhone = e.detail.value
			},
			getCode:function(e){
				this.yzmCode = e.detail.value
			},
			/* 确认 */
			submitButtFun:function(){
				if(!(/^1[3456789]\d{9}$/.test(this.onePhone))){
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon: 'none',
						duration: 1500,
						position: 'center',
					});
					return false;
				}else if(!this.yzmCode){
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 1500,
						position: 'center',
					});
					return false;
				}
				
				console.log('99')
				var data = {
					mbId: uni.getStorageSync('userId'),
					code:this.yzmCode,
					mobile:this.onePhone
				}
				// 获取个人信息
				this.$http.post('/api/member/updateMobile', data, true).then(res => {
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
			/* 获取验证码 */
			getYzm(){
				var that = this;
				if(!this.onePhone){
					uni.showToast({
						title: '请填写修改的手机号',
						icon: 'none',
						duration: 1500,
						position: 'center',
					});
					return
				}
				var phoneData = {
					phone: this.onePhone
				}
				// this.yzm ='重新获取(60s)'
				if (that.yzm_stuas == 1) {
					uni.showToast({
						title: '请勿重复点击',
						icon: 'none',
						duration: 1500,
						position: 'center',
					});
				
				} else {
					this.$http.get('/api/common/mb/sendCode', phoneData).then(res => {
						if (res.data.code == 200) {
							that.yzm_stuas = 1;
							var clear = setInterval(function() {
								that.yzm = "重新获取(" + that.timed + ")";
								console.log(that.yzm);
								that.timed = that.timed - 1;
								if (that.timed == 0) {
									that.yzm = "重新获取";
									clearInterval(clear);
									that.timed = 59;
									that.yzm_stuas = 0;
								}
							}, 1000);
							//that.ref=res.data.data.userBankCard.ref;
							that.msgID = res.data.data.messageid;
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500,
								position: 'center',
							});
						}
					}).catch(err => {})
				}
			},
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F4F4F4;
	}
	.content{
		background-color: #FFFFFF;
		width: 100%;
		height: 328upx;
		.content_item{
			width: 90%;
			height: 110upx;
			margin-left: 30upx;
			border-bottom: #EEEEEE solid 1px;
			line-height: 110upx;
		}
	}
	.submitBut{
		width: 690upx;
		height: 90upx;
		background-color: #3c3d3e;
		border-radius: 10upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
		line-height: 90upx;
		margin-top: 45upx;
		margin-left: 30upx;
		position: fixed;
		bottom: 30upx;
	}

</style>

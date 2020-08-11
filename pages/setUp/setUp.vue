<template>
	<view>
		<!-- 列表部分 -->
		<view class="list">
			<view class="list_item" @click="gotoNextPageFun('editData')">
				<view class="list_item_left uni-flex" style="margin-top: 30upx;">
					<!-- <image :src="hearImage" mode=""></image> -->
					<view class="">
						<image :src="infoData.headImgurl" mode=""></image>
					</view>
					<view class="margin_left2">
						<view class="">
							{{infoData.nickName}}
						</view>
						<view class="" style="line-height: 0;margin-top: 15upx;">
							{{infoData.mobile}}
						</view>
					</view>
					<!-- <text style="position: relative;bottom:50rpx;left: 28upx;">{{infoData.nickName}}</text> -->
					<!-- <text style="position: relative;bottom:10rpx;right:63upx;">{{infoData.mobile}}</text> -->
				</view>
				<view class="list_item_right">
					<image src="../../static/image/my/return1.png"></image>
				</view>
			</view>

			<view class="list_item" @click="gotoNextPageFun('addAddress')">
				<view class="list_item_left">
					<text>地址管理</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/my/return1.png"></image>
				</view>
			</view>
			<view class="list_item" @click="gotoNextPageFun('loginPassword')">
				<view class="list_item_left">
					<text>登录密码</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/my/return1.png"></image>
				</view>
			</view>
			<view class="list_item" @click="togglePopup">
				<view class="list_item_left">
					<text>提现密码</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/my/return1.png"></image>
				</view>
			</view>
			<view class="list_item" @click="gotoNextPageFun('myBankCard')">
				<view class="list_item_left">
					<text>银行卡管理</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/my/return1.png"></image>
				</view>
			</view>
			<view class="list_item" @click="gotoTele">
				<view class="list_item_left">
					<text style="position: absolute;right: 90upx;">400-110-120</text>
					<text>联系客服</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/my/return1.png"></image>
				</view>
			</view>
			<!-- <view class="list_item" @click="gotoNextPageFun('realName')">
				<view class="list_item_left">
					<text>实名认证</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/my/return1.png"></image>
				</view>
			</view> -->
			<view class="list_item" @click="gotoNextPageFun('aboutUs')">
				<view class="list_item_left">
					<text>关于我们</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/my/return1.png"></image>
				</view>
			</view>
		</view>



		<!-- 密码框 -->
		<template v-if="payFalg">
			<view class="moudel_content">
				<view :class="setFalg ? 'content_block' : 'content_block_pay'">
					<view class="uni-flex uni-row margin_left3 margin_top3">
						<view class="width30" @click="closeMoudel">
							<image src="../../static/image/icon/close.png" mode="" class="moudel_img"></image>
						</view>
						<view class="font_color33 font_size34 font_weight600 margin_left3" v-if="setFalg">
							设置支付密码 
						</view>
						<view class="font_color33 font_size34 font_weight600" v-else>
							修改支付提现密码
						</view>
					</view>
					<view class="font_color33 font_size30 text_center">
						支付密码为6位数字
					</view>
					<view class="font_color33 font_size30 text_center">
						支付密码与提现密码一致
					</view>
					<view class="margin_top5">
						<validcode :maxlength="6" :isPwd="true" @finish="getPwd" ref="pwd"></validcode>
					</view>

					<view class="moudel_btn" @click="getSetPassword">
						确认
					</view>
				</view>
			</view>
		</template>

		<view @click="returnFun" class="submitBut">退出当前账号</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				telePhone: '',
				hearImage: '../../static/image/my/headImge.png',
				setFalg: true, //密码设置框
				payFalg: false, //密码支付框
				infoData: ''

			}
		},
		onLoad() {

		},
		mounted() {
			
		},
		onShow() {
			this.getMyData() //获取个人信息
		},
		onBackPress() {
			console.log('999');
			uni.switchTab({
				url:'../tabBar/my/my'
			})
			return true;
		},
		
		methods: {

			getMyData: function() {
				var data = {
					mbId: uni.getStorageSync('userId'),
				}
				// 获取个人信息
				this.$http.get('/api/member/center/info', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res))
						this.infoData = res.data.data
					}
				});
			},
			/* 退出登录 */
			returnFun: function() {
				uni.removeStorageSync("userId");
				uni.removeStorageSync("token");
				uni.navigateTo({
					url: "../login/login"
				})
			},
			/* 联系客服 */
			gotoTele: function() {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: '400-110-120',
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},

			/* 跳转到下一页 */
			gotoNextPageFun:function(page) {
				var data = {
					mbId: uni.getStorageSync('userId'),
				}
				if (page == 'myBankCard') {
					
					// 获取个人信息
					this.$http.get('/api/member/isVerified', data, true).then(res => {
						if (res.data.code == 200) {
							if (!res.data.data) {
								uni.navigateTo({
									url: '../realName/realName?pageType=' + page
								})
							} else {
								uni.navigateTo({
									url: '../' + page + '/' + page + ''
								})
							}
						}
					});

				}else if(page == 'loginPassword'){
					// 获取个人信息
					this.$http.get('/api/member/isPassword', data, true).then(res => {
						if (res.data.code == 200) {
							console.log(99)
							if (res.data.data) {
								uni.navigateTo({
									url: '../noPassword/noPassword'
								})
							} else {
								uni.navigateTo({
									url: '../' + page + '/' + page + ''
								})
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '../' + page + '/' + page + ''
					});
				}

			},
			// 获取密码
			getPwd: function(val) {
				console.log(val)
				this.passwordSix = val

			},

			// 设置支付密码
			getSetPassword: function() {
				var data = {
					password: this.passwordSix,
					mbId: uni.getStorageSync('userId')
				}
				this.$http.post('/api/account/setPassword', data, true).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'none',
							duration: 2000,
							position: 'center',
						});
						this.payFalg = false;
						this.$refs.pwd.clear(); //清空密码
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


			},



			// 关闭设置密码输入框
			closeMoudel: function() {
				this.payFalg = false
			},
			/* 打开密码框 */
			togglePopup: function() {
				var data = {
					mbId: uni.getStorageSync('userId')
				}
				this.$http.get('/api/account/isSetPassword', data, true).then(res => {

					if (res.data.code == 200) {
						if (res.data.data) { //设定了
							//有密码了 跳修改密码页
							this.payFalg = true;
							this.setFalg = false;
						} else { //没设定
							this.payFalg = true;
							this.setFalg = true;
						}
					} else {
						//有误
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
					}
				}).catch(err => {})
			
			
			},
			setPageFun: function() {
				// this.getUserFun();
			},
			// onBackPress: function() {
			// 	if (this.orderListType == '2') {
			// 		const that = this;
			// 		var pages = getCurrentPages();
			// 		if (pages.length > 1) {
			// 			var beforePage = pages[pages.length - 2];
			// 			beforePage.$vm.myFun();
			// 		}
			// 	}
			// },
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F4F4F4;
	}

	.list {
		background-color: #FFFFFF;
		width: 100%;

		.list_item {
			width: 90%;
			margin-left: 5%;
			height: 122upx;
			border-bottom: #EEEEEE solid 1px;
			display: flex;
			flex-direction: row;
			align-items: center;

			.list_item_left {
				width: 95%;

				image {
					width: 82upx;
					height: 82upx;
					border-radius: 50upx;
				}

				text {
					font-size: 30upx;
					color: #333333;
					// font-weight: 600;
				}
			}

			.list_item_right {
				width: 5%;
				text-align: right;
				image {
					width: 13upx;
					height: 23upx;
				}
			}
		}
	}

	/* 密码弹框 */
	.uni-tip {
		padding: 15px;
		width: 300px;
		background-color: #fff;
		border-radius: 10px;

		.popup-title {
			image {
				width: 25.99upx;
				height: 25.99upx;
			}

			text {
				font-size: 34upx;
				font-weight: 800;
				color: #333333;
				margin-left: 150upx;
			}
		}

		.popup-bun {
			margin-top: 30px;
			display: inline-block;
			height: 40px;
			display: flex;
			justify-content: center;

			view {
				text-align: center;
				line-height: 40px;
				display: inline-block;
				width: 40px;
				height: 40px;
				border: 1px solid rgba(187, 187, 187, .99);
				border-right: none;
			}

			.blackpwd {
				display: inline-block;
				width: 10px;
				height: 10px;
				background-color: black;
				border-radius: 50%;
				opacity: 0;
			}
		}

		.popup-qr {
			width: 220upx;
			height: 80upx;
			-background: linear-gradient(to right, #FF765A, #FF0100);
			background-color: #00A398;
			color: #FFFFFF;
			border-radius: 50upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			margin-top: -10upx;
			margin-left: 190upx;
		}
	}

	/* 密码框 */
	.moudel_content {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.4);
		; //
		z-index: 99;
		top: 0;
		left: 0;
	}

	.content_block {
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: absolute;
		top: 18%;
	}

	.content_block_pay {
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: fixed;
		top: 15%;
		height: 438upx;
	}

	.moudel_img {
		width: 30upx;
		height: 30upx;
		margin-top: 8%;
		margin-left: 3%;
	}

	.moudel_btn {
		width: 222upx;
		height: 70upx;
		color: #FFFFFF;
		text-align: center;
		font-size: 30upx;
		background-color: #3c3d3e;
		;
		line-height: 70upx;
		border-radius: 10upx;
		font-weight: 700;
		margin-top: 5%;
		margin-left: 35%;
		margin-bottom: 3%;
	}

	.submitBut {
		width: 690upx;
		height: 90upx;
		background-color: #3c3d3e;
		border-radius: 10upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
		line-height: 90upx;
		margin-top: 45upx;
		position: fixed;
		bottom: 30upx;
		left: 30upx;
	}
</style>

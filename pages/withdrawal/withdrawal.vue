<template>
	<view>
		<view class="page_width">
			<view class="top_money">
				<view class="uni-flex border_bottom padding_bottom3">
					<view class="width25">
						到账方式
					</view>
					<view class="uni-flex width65" >
						<view class="margin_top1" v-if="myBankT">
							<image :src="myBankT.imgUrl" mode="" class="img"></image>
						</view>
						<view class="font_size30 margin_left3">
							<view class="" v-if="myBankT">
								{{myBankT.bankName}}
							</view>
							<view class="font_size26 font_color99">
								2小时内到账
							</view>
						</view>
					</view>
					<view class="width10" @click="open_m">
						<image src="../../static/image/icon/rightb.png" mode="" class="right_i"></image>
					</view>
				</view>
				<view class="font_size30 margin_top8" @click="overMoney">
					提现金额
				</view>

				<view class="border_bottom  margin_top5 font_size50 uni-flex">
				 ¥
					<input :value="moneyValue" type="number"  class="margin_left3  font_size50" maxlength="11" @input="keyMoney" placeholder="请输入金额"
					 placeholder-style='color:#484848;font-size:30upx' style="margin-top: 2%;" />
				</view>

				<view class="uni-flex font_size26 margin_top3">
					<view class=" font_color99">
						余额￥{{money}}
					</view>
					<view class="font_color99 margin_left2" v-if="taxationData.headFee != 0">
						手续费:<text>{{taxationData.headFee}}</text>
					</view>
					<view class="font_color99 margin_left2" v-if="taxationData.taxes != 0">
						税费:<text>{{taxationData.taxes}}</text>
					</view>
					<view class="margin_left3" @click="overMoney">
						全部提现
					</view>
				</view>


				<view class="w_btn" @click="goW">
					提现
				</view>

			</view>
		</view>

		<!-- 银行卡列表 -->
		<template v-if="backFalg">
			<view class="moudel_content">
				<view class="moudel_content_w">
					<view class="uni-flex">
						<view class="width33" @click="close_m">
							<image src="../../static/image/icon/close.png" class="img_left" mode=""></image>
						</view>
						<view class="text_center font_size32">
							选择到账银行卡
						</view>
					</view>
					<scroll-view scroll-y="true">
						<view @click="selectBank(item)" class="uni-flex border_bottom padding_bottom3 padding_top2" v-for="(item,index) in bankList" :key="index">
							<view class="width20 text_center">
								<image  :src="item.imgUrl" class="listimg" mode=""></image>
							</view>
							<view class="font_size32 width50">
								{{item.bankName}}
							</view>
							<view class="width20 text_right" v-if="bankF == item.id">
								<image src="../../static/image/icon/dui.png" mode="" class="mi"></image>
							</view>
						</view>
						
						<view  class="uni-flex border_bottom padding_bottom3 padding_top2">
							<view class="width20 text_center">
								<image  src="../../static/image/icon/addBankList.png" class="" style="width: 45upx;height: 34upx;margin-top: 8%;" mode=""></image>
							</view>
							<view class="font_size32 width50">
								添加银行卡
							</view>
							<view class="width20 text_right" @click="goBankList">
								<image src="../../static/image/icon/add.png" mode="" style="width: 30upx;height: 30upx;margin-top: 5%;"></image>
							</view>
						</view>
						
					</scroll-view>
					
				
				</view>
			</view>
		</template>


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
						<view class="font_color33 font_size34 font_weight600" v-if="!setFalg">
							请输入支付密码
						</view>
					</view>
					<view class="font_color33 font_size30 text_center" v-if="setFalg">
						支付密码为6位数字
					</view>
					<view class="font_color33 font_size30 text_center" v-if="setFalg">
						支付密码与提现密码一致
					</view>
					<view class="font_size30 font_color66 text_center" v-if="!setFalg">
						提现
					</view>
					<view class="font_size60 font_color66 text_center" v-if="!setFalg">
						￥{{moneyValue}}
					</view>
					<view class="margin_top5">
						<validcode :maxlength="6" :isPwd="true" @finish="getPwd" ref="pwd"></validcode>
					</view>

					<view class="moudel_btn" v-if="setFalg" @click="getSetPassword">
						确认
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
				backFalg: false,
				payFalg: false,
				setFalg: false,
				moneyValue:'',
				bankList:[],
				bankF:'',
				myBankT:'',
				taxationData:''
			}
		},
		onLoad(option) {
			this.money = option.money
		},
		// mounted() {
		// 	this.getBankList();
		// 	this.getTaxation()
		// },
		onShow() {
			this.bankList  = [];
			this.getBankList();
			this.getTaxation()
		},
		onBackPress() {
			uni.switchTab({
				url: '../tabBar/my/my'
			});
			return true;
		},
		methods: {
			goBankList:function(){
				this.backFalg = false
				uni.navigateTo({
					url:'../addBack/addBack?urlFalg=withdrawal'
				})
			},
			overMoney:function(){
				if(this.money == 0){
					uni.showToast({
						title: '您没有可提现余额',
						icon: 'none',
						duration: 1500,
						position: 'center',
					});
				}else{
					this.moneyValue=this.money
				}
				
			},
			selectBank:function(item){
				this.bankF=item.id
				this.myBankT  = item
			},
			// 获取税费
			getTaxation:function(){
				this.$http.get('/api/common/headFee/info').then(res => {
					if (res.data.code == 200) {
						this.taxationData =res.data.data
						console.log(JSON.stringify(res))
					}	
				});
							
			},
			// 获取银行卡
			getBankList:function(){
				var _this = this;
				var data = {
					mbId: uni.getStorageSync('userId'),
					flag:true
				}
				this.$http.get('/api/bank/list', data, true).then(res => {
					if (res.data.code == 200) {
						this.bankList = res.data.data
						if(this.bankList.length > 0){
							for (let item of _this.bankList) {
								console.log(item)
								switch (item.bankCode) {
									case 'ICBC':
										item.imgUrl = '../../static/image/bank/gsy.png';
										break;
									case 'ABC':
										item.imgUrl = '../../static/image/bank/nyy.png';
										break;
									case 'CCB':
										item.imgUrl = '../../static/image/bank/jsy.png';
										break;
									case 'BOC':
										item.imgUrl = '../../static/image/bank/zgy.png';
										break;
									case 'COMM':
										item.imgUrl = '../../static/image/bank/jty.png';
										break;
									case 'PSBC':
										item.imgUrl = '../../static/image/bank/yzy.png';
										break;
									case 'SPDB':
										item.imgUrl = '../../static/image/bank/qty.png';
										break;
									case 'CMB':
										item.imgUrl = '../../static/image/bank/zsy.png';
										break;
									default:
										item.imgUrl = '../../static/image/icon/wxf.png';
										break;
								}
							}
							
							_this.myBankT = _this.bankList[0]
							_this.bankF = _this.bankList[0].id
						}
						
					}
				});
			},
			// 获取金额
			keyMoney:function(e) {
				console.log(e)
				this.moneyValue = e.detail.value
			},
			// 关闭
			close_m:function() {
				this.backFalg = false
			},
			open_m:function() {
				this.getBankList();
				this.backFalg = true
				
			},
			// 关闭设置密码输入框
			closeMoudel:function() {
				this.payFalg = false
			},
			// 去提现结果
			goW:function(){
				if(this.moneyValue< 0 || !this.moneyValue){
					uni.showToast({
						title:'请输入提现金额',
						icon:'none',
						duration:2000,
						position:top
					})
					return
				}
				var data = {
					mbId: uni.getStorageSync('userId')
				}
				this.$http.get('/api/account/isSetPassword', data, true).then(res => {
					if (res.data.code == 200) {
						console.log('99')
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
				
				// uni.navigateTo({
				// 	url:'../withdrawalResult/withdrawalResult'
				// })
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
							position: 'top',
						});
						this.payFalg = false;
						this.$refs.pwd.clear(); //清空密码
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
			
			
			// 获取密码
			getPwd:function(val) {
				console.log(this.setFalg)
				if (this.setFalg) {
					this.passwordSix = val
				} else {
					var data = {
						mbId: uni.getStorageSync('userId'),
						password: val,
						amount:this.moneyValue,
						bankId:this.bankF,
					};
					this.$http.post('/api/withdraw/apply', data,true).then(res => {
						if (res.data.code == 200) {
							console.log(JSON.stringify(res))
							this.payFalg = false;
							uni.navigateTo({
								url:'../withdrawalResult/withdrawalResult?payFalg=' + res.data.data
							})
							
						} else {
							this.$refs.pwd.clear(); //清空密码
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500,
								position: 'center',
							});
						}
					}).catch(err => {})
					// var data = {
					// 	memberId: uni.getStorageSync('userId'),
					// 	password: val
					// };
					// this.$http.post('/account/passwordCheck', data).then(res => {
					// 	if (res.data.code == 200) {
					// 		this.payFalg = false;
					// 		this.getNewOrder()
					// 	} else {
					// 		this.$refs.pwd.clear(); //清空密码
					// 		uni.showToast({
					// 			title: res.data.message,
					// 			icon: 'none',
					// 			duration: 1500,
					// 			position: 'top',
					// 		});
					// 	}
					// }).catch(err => {})

				}

			},
			
		}
	}
</script>

<style lang="scss">
	.top_money {
		background-color: #FFFFFF;
		// width: 690px;
		// height: 630px;
		// opacity: 0.9;
		padding: 30upx;
		background: #ffffff;
		border-radius: 20upx;
		margin-top: 30upx;
	}

	.img {
		width: 34upx;
		height: 34upx;
		border-radius: 50%;
	}

	.right_i {
		width: 10upx;
		height: 17upx;
	}

	.w_btn {
		width: 614upx;
		height: 90upx;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 90upx;
		color: #FFFFFF;
		font-size: 30upx;
		margin-left: 20upx;
		margin-top: 30upx;
	}

	// 银行卡列表
	.moudel_content_w {
		background-color: #FFFFFF;
		width: 100%;
		// margin-left: 5%;
		// border-radius: 16px;
		position: absolute;
		bottom: 0;
		padding: 30upx;
	}

	.img_left {
		width: 26upx;
		height: 26upx;
	}

	.listimg {
		width: 46upx;
		height: 46upx;
	}

	.mi {
		width: 31upx;
		height: 20upx;
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
		height: 78upx;
		background: #3c3d3e;
		border-radius: 10px;
		color: #FFFFFF;
		text-align: center;
		font-size: 30upx;
		line-height: 80upx;
		border-radius: 10upx;
		font-weight: 700;
		margin-top: 5%;
		margin-left: 35%;
		margin-bottom: 3%;
		align-items: center;
	}
</style>

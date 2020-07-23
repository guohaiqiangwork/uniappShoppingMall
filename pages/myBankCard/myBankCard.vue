<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width30 text_left margin_left3" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="width50 text_center font_size36">
				{{title}}
			</view>
			<view @click="getDelectFalg" class="font_size20 width20 text_right width30 margin_right3 " style="padding-top: 1%;">
				{{rightF}}
			</view>
		</view>


		<!-- 银行卡列表 -->
		<view class="page_width">
			<!-- 列表 -->
			<template v-if="myBankList.length > 0">
				<view class="uni-flex back_moudel" :class="item.bankBColor" v-for="(item,index) in myBankList" :key="index">
					<view class="width15">
						<image :src="item.imgUrl" class="left_img" mode=""></image>
					</view>
					<view class="font_size30 width30">
						<view class="">
							{{item.bankName}}
						</view>
						<view class="">
							{{item.bankType}}
						</view>
					</view>
					<view class="width65 text_right">
						<view class="font_size32">
							{{item.bankCard}}
						</view>
						<view class="margin_top2" v-if="delectFalg">
							<image  @click="delectBank(item.id)" v-if="delectId != item.id" src="../../static/image/my/bf.png" mode="" class="right_img"></image>
							<image  v-if="delectId == item.id" src="../../static/image/my/bf1.png" mode="" class="right_img"></image>
						</view>
					</view>
				</view>
					
				<view class="listNobtn" @click="addBack">
					添加银行卡
				</view>
			</template>

			<!-- 列表缺省 -->
			<view class="text_center" v-if="myBankList.length == 0">
				<view class="margin_top18">
					<image src="../../static/image/default/noBack.png" class="noImg" mode=""></image>
				</view>
				<view class="font_size30 font_color99 margin_top2">
					您还没有银行卡
				</view>
				<view class="nobtn" @click="addBack">
					添加银行卡
				</view>
			</view>

		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '我的银行卡',
				rightF: '解除绑定',
				myBankList: [],
				delectFalg: false,
				delectId:''
			}
		},
		mounted() {

		},
		onShow() {
			this.getBankCardList(); //获取银行卡列表
		},
		methods: {
			// 头部切换
			getDelectFalg: function() {
				if(this.delectFalg){
					this.delect()
				}
				this.delectFalg = !this.delectFalg;
				this.delectFalg ? this.rightF = '完成' :  this.rightF = '解除绑定';
			},
			// 删除银行卡
			delectBank:function(id){
				this.delectId = id
			},
			
			// 删除银行卡
			delect:function(){
				var data = {
					bankId: this.delectId ,
				}
				// 获取团队数据
				this.$http.get('/api/bank/untie', data, true).then(res => {
					if (res.data.code == 200) {
						//有误
						uni.showToast({
							title: '删除成功',
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
						this.getBankCardList();
					}
				});
			},
			// 返回
			goBack() {
				uni.navigateBack()
			},

			// 去绑定银行卡
			addBack: function() {
				uni.navigateTo({
					url: '../addBack/addBack'
				})
			},
			// 获取银行卡列表
			getBankCardList: function() {
				var _this = this
				var data = {
					mbId: uni.getStorageSync('userId'),
					flag: false
				}
				this.$http.get('/api/bank/list', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(99)
						_this.myBankList = res.data.data
						for (let item of _this.myBankList) {
							console.log(item)
							switch (item.bankCode) {
								case 'ICBC':
									item.bankBColor = 'bank_bgColor_zgp'
									item.imgUrl = '../../static/image/bank/gsy.png';
									break;
								case 'ABC':
									item.bankBColor = 'bank_bgColor_ny'
									item.imgUrl = '../../static/image/bank/nyy.png';
									break;
								case 'CCB':
									item.bankBColor = 'bank_bgColor_jj'
									item.imgUrl = '../../static/image/bank/jsy.png';
									break;
								case 'BOC':
									item.bankBColor = 'bank_bgColor_zgp'
									item.imgUrl = '../../static/image/bank/zgy.png';
									break;
								case 'COMM':
									item.bankBColor = 'bank_bgColor_jj'
									item.imgUrl = '../../static/image/bank/jty.png';
									break;
								case 'PSBC':
									item.bankBColor = 'bank_bgColor_ny'
									item.imgUrl = '../../static/image/bank/yzy.png';
									break;
								case 'SPDB':
									item.bankBColor = 'bank_bgColor_zgp'
									item.imgUrl = '../../static/image/bank/qty.png';
									break;
								case 'CMB':
									item.bankBColor = 'bank_bgColor_zgp'
									item.imgUrl = '../../static/image/bank/zsy.png';
									break;
								default:
									item.bankBColor = 'bank_bgColor_zgp'
									item.imgUrl = '../../static/image/bank/qty.png';
									break;
							}
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


		}
	}
</script>

<style lang="less">
	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.back_moudel {
		height: 220upx;
		background: linear-gradient(to right, #ff8b70, #ff576c);
		border-radius: 10upx;
		color: #FFFFFF;
		margin-top: 30upx;
		padding: 60upx 30upx;
	}

	// .mouden_bj_1 {
	// 	background: linear-gradient(to right, #00BBA7, #018DB6) !important;
	// }

	// .mouden_bj_2 {
	// 	background: linear-gradient(to right, #5FA2D8, #4166C1) !important;
	// }


	.bank_bgColor_zgp {
		/* red */
		background: linear-gradient(to right, #FF8B70, #FF576C);
	}

	.bank_bgColor_ny {
		/* blue */
		background: linear-gradient(to right, #00BBA7, #018DB6);
	}

	.bank_bgColor_jj {
		/* greet */
		background: linear-gradient(to right, #5FA2D8, #4166C1);
	}

	.left_img {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
	}

	.right_img {
		width: 30upx;
		height: 30upx;
	}

	.noImg {
		width: 446upx;
		height: 376upx;
	}

	.nobtn {
		width: 530upx;
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		font-size: 30upx;
		margin-left: 110upx;
		margin-top: 30upx;
	}
	.listNobtn{
		width: 94%;
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		font-size: 30upx;
		position:absolute;
		bottom: 5%;
	}
</style>

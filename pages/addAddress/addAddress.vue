<template>
	<view>
		<!-- 地址列表 -->
		<block v-if="newAddress">
			<view class="" style="padding-bottom:135upx ;">
				<view class="address_list_moudel" v-for="(item,index) in addressData" :key="index">
					<view class="uni-flex">
						<view class="width75" @click="goShop(item)">
							<view class="uni-flex font_size30 font_weight600">
								<view>{{item.receiver}}</view>
								<view class="margin_left2">
									{{item.mobile}}
								</view>
								<view class="add_btn" v-if="item.isDefault == 1">
									默认
								</view>
							</view>
							<view class="font_color66 font_size26">
								{{item.province}}{{item.city}}{{item.area}}{{item.address}}
							</view>
						</view>
						<view class="width20 text_center margin_left3" @click="goAddressEdit(item.id)">
							<view class="list_right_img">
								<image src="../../static/image/icon/edit.png" class="list_img_add" mode=""></image>
							</view>
						</view>

					</view>
				</view>
			</view>

			<view class="bottom_add">
				<view class="fixed_btm uni-flex display_center" @click="getnewAddress">
					<view class="" style="margin:4.8% 2% 0 0;">
						<image src="../../static/image/icon/addA.png" style="width: 35upx;height: 35upx;" mode=""></image>
					</view>
					<view style="margin: auto 0 ;">添加新地址</view>
				</view>
			</view>
		</block>
		<!-- 新加地址 -->
		<block v-if="!newAddress">
			<!-- <view class="mar_bt"></view> -->
			<view class="form_body">
				<view class="form_list">
					<view class="list_left">
						收货人
					</view>
					<view class="list_right">
						<input class="list_input" @input="keyName" placeholder="请填写收货人姓名" />
					</view>
				</view>
				<view class="form_list">
					<view class="list_left">
						手机号码
					</view>
					<view class="list_right">
						<input class="list_input" @input="keyPhone" maxlength="11" placeholder="请填写收货人手机号码" />
					</view>
				</view>
				<view class="form_list">
					<view class="list_left">
						所在地区
					</view>
					<view class="list_right uni-flex">
						<input class="list_input width90" placeholder="省,市,区" disabled="disabled" @click="keyArea" :value="area" />
						<image src="../../static/image/icon/down.png" class="right_img" mode=""></image>
					</view>
				</view>
				<view class="form_list">
					<view class="list_left" style="height: 160upx;">
						详细地址
					</view>
					<view class="list_right">
						<input class="list_input" @input="keyAddr" maxlength="20" placeholder="街道,楼牌号等" />
						<!-- <textarea value="" @input="keyAddr" maxlength="20" placeholder="街道,楼牌号等" /> -->
					</view>
				</view>
			</view>
			<view class="mar_bt"></view>
			<!-- <uni-list style="font-size: 30upx;">
				<uni-list-item title="设置默认地址" show-switch="true" show-arrow="false" @switchChange='defAddr'></uni-list-item>
			</uni-list> -->
			<view class=" background_colorff">
				<view class="uni-flex bottom_list_s">
					<view class="bottom_list_left">
						设置默认地址
					</view>
					<view class="width50" style=" text-align: end;">
						<switch :checked="defAddrstaus" color="#00A398" style="transform:scale(0.7);line-height: 110upx;" @change='defAddr' />
					</view>
				</view>
			</view>

			<view class="bottom_add">
				<!-- @click="addAddr" -->
				<view class="fixed_btm" @click="addAddr">
					保存
				</view>
			</view>
			<!-- 地址框 -->
			<w-picker mode="region" :defaultVal="[4,1,1]" @confirm="onConfirm" ref="region" themeColor="#f00"></w-picker>
		</block>

	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			uniList,
			uniListItem,
			wPicker
		},
		data() {
			return {
				name: '',
				phone: '',
				area: '',
				addr: '',
				defAddrstaus: false,
				sign: '', //其他页面传来的标识
				addressData: '', //地址列表数据
				newAddress: false, //展示列表还是新增
				isDefault: 2,
			}
		},
		onLoad(option) {
			console.log(option)
			this.sign = option.falg;
			this.goodsId = option.goodsId;
			this.falgUrl = option.falgUrl;
		},
		onShow() {
			// this.getAddressList(); //获取地址列表

		},
		methods: {
			keyName: function(event) {
				this.name = event.target.value
			},
			keyPhone: function(event) {
				this.phone = event.target.value
			},
			keyArea: function(event) {
				//this.area = event.target.value;
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				this.$refs['region'].show();
			},
			onConfirm(val) {
				this.area = val.checkArr;
			},
			keyAddr: function(event) {
				this.addr = event.target.value
			},
			defAddr(e) {
				this.defAddrstaus = e.target.value;;
			},
			// 新增地址切换
			getnewAddress() {
				uni.setNavigationBarTitle({
					title: '添加收货地址'
				})
				this.newAddress = false;
			},
			// 添加地址
			addAddr() {
				var that = this;
				if (this.name == '' || this.phone == '' || this.area == '' || this.addr == '') {
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					return false;
				} else if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					uni.showToast({
						title: '请输入正确的11位手机号码',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				} else if (this.addr.length > 20) {
					uni.showToast({
						title: '地址请输入小于20个字符',
						icon: 'none',
						duration: 1500,
						position: 'top',
					});
					return false;
				}
				uni.showLoading({
					title: '加载中'
				});
				if (this.defAddrstaus) {
					this.isDefault = 1
				} else {
					this.isDefault = 2
				}
				var keyword = {
					address: this.addr, //具体地址
					area: this.area[2] || '', //区域
					city: this.area[1], //城市
					id: this.addressId, //地址id
					isDefault: this.isDefault, //是否默认
					memberId: uni.getStorageSync('userId'),
					mobile: this.phone, //电话
					province: this.area[0], //省
					receiver: this.name
				}
				console.log(JSON.stringify(keyword))
				this.$http.post('/address/save', keyword, true).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						uni.showToast({
							title: '添加成功',
							icon: 'none',
							duration: 2000,
							position: 'top',
						});
						this.getAddressList() //刷新列表
					}
				}).catch(err => {

				})
			},
			// 获取地址列表
			getAddressList() {
				this.$http.get('/address/findAll/' + uni.getStorageSync('userId')).then(res => {
					if (res.data.code == 200) {
						if (res.data.data.length > 0) {
							uni.setNavigationBarTitle({
								title: '收货地址'
							})
							this.newAddress = true;
							this.addressData = res.data.data;
						} else {
							uni.setNavigationBarTitle({
								title: '添加收货地址'
							})
							this.newAddress = false;
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
			// 去地址编辑
			goAddressEdit(e) {
				uni.navigateTo({
					url: '../addAEdit/addAEdit?addressId=' + e + '&falg=list',
				});
			},
			// 回商城
			goShop(e) {
				if (this.sign == 'new') {
					uni.redirectTo({
						url: '../fillInOrder/fillInOrder?addressId=' + e.id + '&goodsId=' + this.goodsId + '&falgD=addList' +
							'&falgUrl=' + this.falgUrl,
					});
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #F4F4F4;
	}

	.form_body {
		background: #fff;
		border-top: 1px solid #eee;
	}

	.form_list {
		width: 94%;
		display: flex;
		margin-left: 3%;
		border-bottom: 1px solid #eee;
	}

	.list_left {
		height: 110upx;
		line-height: 110upx;
		width: 23%;
		text-align: left;
		padding-left: 5upx;
		font-size: 30upx;
		color: #333333;
		font-weight: 600;
	}

	.list_right {

		flex: 1;

	}

	.list_input {
		height: 50upx;
		margin-top: 26upx;
		font-size: 30upx;
		color: #333333;
	}

	.fixed_btm {
		height: 100upx;
		margin-top: 15upx;
		margin-left: 5%;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 100upx;
		color: #fff;
		width: 90%;
	}

	.bottom_add {
		height: 130upx;
		background: #fafafa;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0%;
		width: 100%;
		z-index: 99;
	}

	.right_img {
		width: 23upx;
		height: 14upx;
		margin-top: 10%;
	}

	/* 地址列表 */
	.address_list_moudel {
		width: 89%;
		margin-left: 3%;
		border-radius: 20upx;
		background-color: #FFFFFF;
		margin-top: 3%;
		padding-top: 3%;
		padding-left: 5%;
		padding-bottom: 2%;
	}

	.add_btn {
		width: 70upx;
		height: 30upx;
		line-height: 30upx;
		text-align: center;
		border-radius: 20upx;
		color: #FFFFFF;
		background-color: #00A398;
		font-size: 20upx;
		margin-top: 2%;
		margin-left: 4%;
	}

	.list_img_add {
		width: 33upx;
		height: 30upx;
		margin-top: 20%;
	}

	.list_right_img {
		border-left: 1px solid #CCCCCC;
		height: 80upx;
		/* margin-top: 5%; */
		position: relative;
		bottom: -15%;
	}

	.bottom_list_s {
		padding-left: 5upx;
		margin-top: 3%;
		width: 94%;
		margin-left: 3%;
	}

	.bottom_list_left {
		height: 110upx;
		line-height: 110upx;
		width: 50%;
		text-align: left;
		font-size: 15px;
		color: #333333;
		font-weight: 600;
	}
</style>

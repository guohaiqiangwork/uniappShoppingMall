<template>
	<view>
		<view class="form_body">
			<view class="form_list">
				<view class="list_left">
					收货人
				</view>
				<view class="list_right">
					<input class="list_input" :value="name" @input="keyName" placeholder="请填写收货人姓名" />
				</view>
			</view>
			<view class="form_list">
				<view class="list_left">
					手机号码
				</view>
				<view class="list_right">
					<input class="list_input" :value="phone" @input="keyPhone" maxlength="11" placeholder="请填写收货人手机号码" />
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
					<input class="list_input" @input="keyAddr" :value="addr" maxlength="20" placeholder="街道,楼牌号等" />

				</view>
			</view>
		</view>
		<view class="mar_bt"></view>
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

		<view class=" background_colorff">
			<view class="uni-flex bottom_list_s" @click="deleteAddr">
				<view class="bottom_list_left">
					删除地址
				</view>
			</view>
		</view>
		<view class="bottom_add">
			<view class="fixed_btm" @click="addAddr">
				保存
			</view>
		</view>
		<!-- 地址框 -->
		<w-picker mode="region" :defaultVal="[4,1,1]" @confirm="onConfirm" ref="region" themeColor="#f00"></w-picker>
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
				addr: '', //地址详情
				addressId: '', //地址id
				area: [], //省市去
				defAddrstaus: false, //是否默认
				name: '', //收货人姓名
				phone: '', //电话
				urlFalg: '' //从那来
			}
		},
		onLoad(option) {
			console.log(option)
			this.addressId = option.addressId;
			this.urlFalg = option.falg
			this.getMyFindById(); //
		},
		methods: {
			keyName: function(event) {
				this.name = event.target.value
			},
			keyPhone: function(event) {
				this.phone = event.target.value
			},
			keyAddr: function(event) {
				this.addr = event.target.value
			},
			keyArea: function(event) {
				//this.area = event.target.value;
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				this.$refs['region'].show();
			},
			onConfirm(val) {
				console.log(val)
				this.area = val.checkArr;
			},

			defAddr(e) {
				console.log('是否选中' + e.target.value)
				this.defAddrstaus = e.target.value;
			},

			// 通过地址id 获取地址详情  /address/findById/{addressId}
			getMyFindById() {
				this.$http.get('/address/findById/' + this.addressId).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						this.area = res.data.data.province + res.data.data.city + res.data.data.area; //省市区
						this.name = res.data.data.receiver;
						this.phone = res.data.data.mobile;
						this.addr = res.data.data.address;
						if (res.data.data.isDefault == 1) {
							this.defAddrstaus = true;
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
			
			// 删除地址 
			deleteAddr() {
				uni.showLoading({
					title: '删除中'
				});
				this.$http.get('/address/deleteAddress/' + this.addressId).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '删除成功',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					console.log(res)
					if (res.data.code == 200) {
						uni.navigateTo({
							url: '../addAddress/addAddress',
						});

					} else if (res.data.code == 401) {
						//登录有误
					}
					this.submitSate = false;
				}).catch(err => {
					this.submitSate = false;
				})

			},
			// 添加地址
			addAddr() {
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
				if (this.defAddrstaus == true) {
					this.isDefault = 1
				} else {
					this.isDefault = 2
				}
				var keyword = {
					address: this.addr, //具体地址
					area: this.area[2] || '', //区域
					city: this.area[1], //城市
					id: this.addressId, //地址id
					isDefault: this.isDefault || this.address.isDefault, //是否默认
					memberId: uni.getStorageSync('userId'),
					mobile: this.phone, //电话
					province: this.area[0], //省
					receiver: this.name
				}
				console.log(JSON.stringify(keyword))
				this.$http.post('/address/updateAddress', keyword, true).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '修改成功',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					console.log(res.data.code)
					if (res.data.code == 200) {
						if (this.urlFalg == 'list') {
							uni.navigateTo({
								url: '../addAddress/addAddress',
							});
						}
					} else if (res.data.code == 401) {
						//登录有误
					}
					this.submitSate = false;
				}).catch(err => {
					this.submitSate = false;
				})

			},
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

	.bottom_list_s {
		padding-left: 5upx;
		margin-top: 5%;
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

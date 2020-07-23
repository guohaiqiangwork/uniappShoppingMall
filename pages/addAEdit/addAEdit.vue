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
					<view class="list_input margin_left3" @tap="handleTap('picker1')">
						<view>{{ province }}</view>
						<lb-picker ref="picker1" mode="selector" :list="provinceList" @confirm="handleConfirm">

						</lb-picker>
					</view>
					<view class="list_input margin_left3" @tap="handleTap('picker2')">
						<view>{{ city }}</view>
						<lb-picker ref="picker2" mode="selector" :list="cityList" @confirm="handleConfirmCity">

						</lb-picker>
					</view>
					<view class="list_input margin_left3" @tap="handleTap('picker3')">
						<view>{{ area }}</view>
						<lb-picker ref="picker3" mode="selector" :list="areaList" @confirm="handleConfirmArea">

						</lb-picker>
					</view>

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
	// import wPicker from "@/components/w-picker/w-picker.vue";
	import LbPicker from '@/components/lb-picker'
	export default {
		components: {
			uniList,
			uniListItem,
			LbPicker
		},
		data() {
			return {
				addr: '', //地址详情
				addressId: '', //地址id
				defAddrstaus: false, //是否默认
				name: '', //收货人姓名
				phone: '', //电话
				urlFalg: '', //从那来



				provinceList: [], //省
				province: '请选择省',
				provinceNumber: '',
				cityList: [], //市
				city: '',
				cityNumber: '',
				areaList: [], //区
				area: '',
				areaNumber: ''
			}
		},
		onLoad(option) {
			console.log(option)
			this.addressId = option.addressId;
			this.urlFalg = option.falg
			this.getMyFindById(); //获取地址在详情
			this.getProvince();//获取省数据
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
				var data = {
					addressId: this.addressId
				}
				this.$http.get('/api/address/detail', data, true, ).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						// this.area = res.data.data.province + res.data.data.city + res.data.data.area; //省市区
						this.province = res.data.data.province;
						this.city = res.data.data.city;
						this.area = res.data.data.area;
						this.name = res.data.data.receiver;
						this.phone = res.data.data.mobile;
						this.addr = res.data.data.address;
						if (res.data.data.isDefault == true) {
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
				let data ={
					addressId:this.addressId
				}
				this.$http.post('/api/address/delete',data,true).then(res => {
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
					this.isDefault = true
				} else {
					this.isDefault = false
				}
				var keyword = {
					address: this.addr, //具体地址
					area: this.areaNumber || '', //区域
					city: this.cityNumber, //城市
					id: this.addressId || '', //地址id
					isDefault: this.isDefault, //是否默认
					mbId: uni.getStorageSync('userId'),
					mobile: this.phone, //电话
					province: this.provinceNumber, //省
					receiver: this.name
				}
				console.log(JSON.stringify(keyword))
				this.$http.post('/api/address/update', keyword, true).then(res => {
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



			// 获取省数据
			getProvince: function(parentId, type) {
				let _this = this
				var data = {
					parentId: parentId
				}
				this.$http.get('/api/common/area/list', data).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res))
						console.log(type)
						if (type == 'city') {
							_this.cityList = res.data.data
						} else if (type == 'area') {
							_this.areaList = res.data.data
						} else {
							_this.provinceList = res.data.data
						}
					}
				})


			},


			// 下拉框
			// handleChange (item) {
			// 	console.log('change::', item)
			// },滑动
			// 确认
			handleConfirm: function(item) {
				console.log('confirm::', item)
				this.province = item.item.label
				this.provinceNumber = item.value
				this.city = '请选择城市'
				this.getProvince(item.value, 'city')
			},
			handleConfirmCity: function(item) {
				console.log('confirm::', item.item)
				this.city = item.item.label
				this.cityNumber = item.value
				this.area = '请选择'
				this.getProvince(item.value, 'area')
			},
			handleConfirmArea: function(item) {
				console.log('confirm::', item.item)
				this.area = item.item.label
				this.areaNumber = item.value

			},
			// handleCancel (item) {
			// 	console.log('cancel::', item)
			// },取消
			handleTap(name) {
				this.$refs[name].show()
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
		width: 11px;
		height: 7px;
		margin-top: 6%;
		position: absolute;
		right: 5%;
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

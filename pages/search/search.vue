<template>
	<view>
		<view class="title_top"></view>
		<!-- 头部搜索 -->
		<view class="uni-flex  background_colorff padding_bottom2 padding_top2">
			<view class="width10 text_center" style="padding-top: 1%;" @click="goBack">
				<image src="../../static/image/icon/left.png" class="balk_img" mode=""></image>
			</view>
			<!-- 搜索框 -->
			<view class="uni-flex top_content">
				<view class="searce_left">
					<image src="../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<input class="findShop" maxlength="10" @input="getInputv" :value="inputValue" placeholder="请输入要搜索的内容" confirm-type='搜索'
					 type="text" @confirm='Search' placeholder-style='color:#cccccc' />
				</view>
			</view>

			<view @click="goSearchList" class="font_size28 text_center width15 " style="padding-top: 1%;">
				搜索
			</view>
		</view>

		<!-- 内容 -->
		<view class="background_colorf8 padding_top3 padding_bottom3">
			<view class="page_width" v-if="searchAll.length > 0 ">
				<view class="uni-flex display_space">
					<view class="font_size28">
						历史搜索
					</view>
					<view class="" @click="closeSearchAll">
						<image src="../../static/image/icon/sdelect.png" style="width: 29upx;height: 28upx;" mode=""></image>
					</view>
				</view>
				<view class="padding_bottom3" >
					<view class="tab_item" @click="assignment(item)" v-for="(item,index) in searchAll" :key="index">
						{{item}}
					</view>
				</view>

			</view>

			<view class="" style="background-color: #F4F4F4;height: 10upx;"></view>

			<view class="page_width margin_top3">
				<view class="font_size28">
					热门搜索
				</view>
				<view class="uni-flex" @click="assignment(item.label)" v-for="(item,index) in list" :key='index'>
					<view class="list_left margin_right3" v-if="item.type == 1">
						爆
					</view>
					<view class="list_left margin_right3" style="background-color: #7EB546;" v-if="item.type == 2">
						推
					</view>
					<view class="">
						{{item.label}}
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 提示框 -->
		<template v-if="pfalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">
						确认要删除历史搜索吗？
					</view>
					<view class="uni-flex " style="margin-top: 80upx;"> 
						<view class="leftbtn" @click="closemoudel">
							取消
						</view>
						<view class="rightbtn" @click="okMoudel">
							确认
						</view>
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
				list: '', //热门
				inputValue: '',

				searchAll: [],// 搜索记录
				pfalg: false
			}
		},
		onLoad(option) {
			// console.log(option.searchName)
			this.inputValue = option.searchName;
			// 查询历史搜索列表
			const than = this // 注意this的指向
			uni.getStorage({
				key: 'searchAll_key',
				success(res) {
					than.searchAll = res.data;
					console.log(than.searchAll)
				}
			})
		},
		mounted() {
			this.init(); //页面初始化
		},
		methods: {
			// 输入了回车键
			Search:function(e) {
				console.log(e.detail.value);
				// this.inputValue = e.detail.value;

			},
			// 输入框输入事件
			getInputv:function(e) {
				this.inputValue = e.detail.value;
				console.log(e)
			},
			// 历史赋值
			assignment:function(item) {
				this.inputValue = item;
			},
			// 删除历史记录
			closeSearchAll:function(){
				this.pfalg = true
			},
			// 确认取消
			okMoudel:function(){
				uni.removeStorageSync('searchAll_key');
				this.searchAll = '';
				this.pfalg = false;
			},
			// 取消
			closemoudel:function(){
				this.pfalg = false
			},
			// 搜索页面跳转
			goSearchList:function() {
				// 存历史记录
				if (this.inputValue != '') { // 输入框的值不为空时
					if (this.searchAll.length == 10) {
						const than = this
						this.searchAll[0] = this.inputValue // 将输入框的值添加到搜索记录数组中存储
						uni.setStorage({
							key: 'searchAll_key',
							data: than.searchAll,
							success: function() {}
						})
					} else {
						const than = this
						this.searchAll.push(this.inputValue) // 将输入框的值添加到搜索记录数组中存储
						uni.setStorage({
							key: 'searchAll_key',
							data: than.searchAll,
							success: function() {

							}
						})

					}

				};
				uni.navigateTo({
					url: '../searchList/searchList?searchName=' + this.inputValue + '&urlFalg=search'
				})
			},
			// 返回
			goBack:function() {
				uni.navigateBack()
			},

			init: function() {
				// 获取热门搜索
				this.$http.get('/api/common/search').then(res => {
					if (res.data.code == 200) {
						// console.log(JSON.stringify(res))
						this.list = res.data.data
					}
				})
			}


		}
	}
</script>

<style lang="less">
	page {
		background-color: #FAFAFA;
	}

	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.top_content {
		width: 75%;
		height: 66upx;
		background: #f8f8f8;
		border-radius: 12upx;
	}

	.tab_item {
		display: inline-block;
		height: 50upx;
		margin-left: 2%;
		background-color: #EEEEEE;
		border-radius: 25upx;
		text-align: center;
		margin-top: 30upx;
		padding: 10upx 22upx 10upx 22upx;
		font-size: 24upx;
	}

	.list_left {
		padding: 4upx;
		background: #fc5454;
		border-radius: 2upx;
		color: #FFFFFF;
		font-size: 20upx;
		height: 24upx;
		width: 24upx;
		line-height: 24upx;
		text-align: center;
		align-items: center;
		margin-top: 10upx;

	}
	
	.product_content_block {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		height: 362upx;
		width: 600upx;
		margin-left: 75upx;
	}
	
	.leftbtn {
		width: 220upx;
		height: 78upx;
		border: 1px solid #3c3d3e;
		border-radius: 10px;
		text-align: center;
		color: #3C3D3E;
		line-height: 78upx;
		margin-left: 45upx;
	}
	
	.rightbtn {
		width: 220upx;
		height: 78upx;
		background: #3c3d3e;
		border-radius: 10px;
		color: #FFFFFF;
		text-align: center;
		line-height: 78upx;
		margin-left: 45upx;
	}
	
</style>

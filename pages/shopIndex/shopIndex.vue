<template>
	<view>
		<!-- 头部 -->
		<view class="" style="height: 280upx;">
			<image src="../../static/image/beij/shopIndex.png" class="image_width" mode=""></image>
			<view class="login_moudel">
				<!-- 搜索框 -->
				<view class="uni-flex  padding_bottom2 padding_top2">
					<view class="width10 text_center" style="padding-top: 1%;"  @click="goBack">
						<image src="../../static/image/icon/leftF.png" class="balk_img" mode=""></image>
					</view>
					<!-- 搜索框 -->
					<view class="uni-flex top_content">
						<view class="searce_left">
							<image src="../../static/image/icon/serchf.png" class="searce_width" mode=""></image>
						</view>
						<view class="searce_right_input">
							<input style="color: #FFFFFF;font-size: 26upx;" class="findShop" maxlength="10" @input="getInputv" placeholder="请输入要搜索的内容"
							 confirm-type='搜索' type="text" @confirm='Search' placeholder-style='color:#FFFFFF' />
						</view>
					</view>
				</view>

				<!-- 店铺 -->
				<view class="uni-flex margin_top3">
					<view class="margin_left3 width15 text_center">
						<image src="../../static/image/beij/myy.png" class="shop_img_w" mode=""></image>
					</view>
					<view class="uni-flex margin_top1 width60">
						<view class="font_size28 font_colorff">
							联想官方旗舰店
						</view>
						<view class="margin_left3">
							<image src="../../static/image/icon/rightF.png" class="shop_img_two" mode=""></image>
						</view>
					</view>
					<view class="">
						<view class="shop_btn uni-flex display_center">
							<view class="">
								<image src="../../static/image/icon/trightf.png" class="rightf_img" mode=""></image>
							</view>
							<view class="font_size26 font_colorff" style="margin-left: 10upx;">
								关注
							</view>
						</view>
					</view>
				</view>


			</view>
		</view>
		<!-- 底部tab -->
		<view class="background_colorff" v-if="tabIndexTwo == 'home'">
			<view class="padding_top3 padding_bottom3">
				<view @click="tabSwichThree(index)" class="item_tab_three" v-for="(item,index) in tabListThree" :key="index" :style="index == 2 ?'border:none' :'' ">
					<view class="">
						{{item.name}}
					</view>
					<view class="jian_moudel" v-if="index == 2">
						<view class="kailong" :style="sortUp ? 'border-bottom: 8upx solid #B98615' :''"></view>
						<view class="kailong1" :style="!sortUp ? 'border-top: 8upx solid #B98615' :''"></view>
					</view>
				</view>
			</view>


		</view>

		<!-- 列表 -->
		<view class="page_width ">
			<template v-if="tabIndexTwo == 'home'">
				<view class="list_itemone" v-for="(item,index) in [1,2,3,]" :key="index">
					<view class="">
						<image src="../../static/image/beij/logB.png" class="list_imgone" mode=""></image>
					</view>
					<view class="font_size30 text_hidden margin_left3">
						联想拯救者R7000...
					</view>
					<view class="font_colorbe font_sise28 margin_left3 padding_bottom3">
						<text class="font_size22">¥</text>
						4799.00
						<text class="font_size22 font_color66">/件</text>
					</view>
				</view>

			</template>

		</view>

		<!-- 分类 -->
		<template v-if="tabIndexTwo != 'home'">
			<view class="uni-flex">
				<view class="width25" style="min-height: 1040upx;">
					<view @click="leftTab(item.id)" :class="leftIndex  == item.id ? '_left_active' :'_left'" v-for="(item,index) in leftList"
					 :key="index">
						{{item.name}}
					</view>
				</view>

				<view class="width75 background_colorff" style="min-height: 1040upx;">
					<view @click="goProductDetails" class="uni-flex border_bottom _right_moudel" v-for="(item,index) in [1,2,3]" :key="index">
						<view class="">
							<image src="../../static/image/beij/myTopb.png" class="_right_img" mode=""></image>
						</view>
						<view class="margin_left3">
							<view class="font_size26 text_hidden ">
								Asus/华硕 Y423300高性...
							</view>
							<view class="font_size22 font_color99 text_hidden">
								这是副标题这个是有长度…
							</view>
							<view class="font_sise28 font_colorbe">
								<text class="font_size26">¥</text>
								4799.00
								<text class="font_size22 font_color99">/件</text>
							</view>
						</view>
					</view>
				</view>
			</view>
	
		</template>



		<!-- bottom_tab -->
		<view class="bottom_tab_list">
			<view @click="tabSwichTwo(index)" class="item_tab_two" v-for="(item,index) in tabListTwo" :key="index" :style="index == 2 ?'border:none' :'' ">
				<view v-if="tabIndexTwo == item.imgF">
					<image :src="item.imgUrlF" class="bottom_img_tab" mode=""></image>
				</view>
				<view v-else>
					<image :src="item.imgUrl" class="bottom_img_tab" mode=""></image>
				</view>
				<view class="font_size22">
					{{item.name}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabListThree: [{
						name: '综合'
					},
					{
						name: '销量最高'
					},
					{
						name: '价格'
					},
				],
				tabIndexT: 0,
				sortUp: true,
				tabListTwo: [{
						name: '首页',
						imgF: 'home',
						imgUrl: '../../static/image/icon/shopB.png',
						imgUrlF: '../../static/image/icon/shopBZ.png'
					},
					{
						name: '分类',
						imgF: 'fenl',
						imgUrl: '../../static/image/icon/fenlB.png',
						imgUrlF: '../../static/image/icon/fenlBz.png'
					}
				],
				tabIndexTwo: 'fenl',
				leftList: [{
						name: '笔记本电脑',
						id: '0'
					},
					{
						name: '台式机电脑',
						id: '1'
					},
					{
						name: '电脑配件',
						id: '2'
					},
					{
						name: '智能生活',
						id: '3'
					},
				],

				leftIndex: 0 //分类左面数据
			}
		},
		onLoad(option) {
			console.log(option.urlFalg);
			// this.urlFalgD = option.urlFalg
		},
		methods: {
			// 输入了回车键
			Search(e) {
				console.log(e.detail.value);
				this.inputValue = e.detail.value;
				uni.navigateTo({
					url: '../shopSearch/shopSearch？inputValue= ' + this.inputValue
				})
			},
			// 输入框输入事件
			getInputv(e) {
				console.log(e)
			},
			// 返回
			goBack() {
				uni.navigateBack()
			},
			// tab
			tabSwichThree: function(index) {
				console.log(index)
				index = 2 ? this.sortUp = !this.sortUp : '';
			},
			// 底部导航
			tabSwichTwo: function(index) {
				console.log(index)
				if (index == 1) {
					this.tabIndexTwo = 'fenl'
				} else {
					this.tabIndexTwo = 'home'
				}

			},
			// 分类在左面
			leftTab: function(id) {
				this.leftIndex = id
			},
			
			// 去产品详情
			goProductDetails:function(){
				uni.navigateTo({
					url:'../productDetails/productDetails'
				})
			}
		}
	}
</script>

<style lang="scss">
	.image_width {
		position: absolute;
		width: 100%;
		height: 280upx;
	}


	.login_moudel {
		position: relative;
		width: 94%;
		margin-left: 3%;
		padding-top: 5%;
	}

	.balk_img {
		width: 16upx;
		height: 28upx;
	}

	.top_content {
		height: 66upx;
		background: #333333;
		border-radius: 12upx;
		font-size: 26upx;
		width: 90%;
	}

	.searce_right_input {
		padding-top: 2%;
		padding-left: 3%;
	}

	.shop_img_w {
		width: 60upx;
		height: 60upx;
		border-radius: 10upx;
	}

	.shop_img_two {
		width: 8upx;
		height: 14upx;
	}

	.shop_btn {
		width: 140upx;
		height: 60upx;
		background: linear-gradient(#edcb80, #a58747);
		border-radius: 10upx;
		align-items: center;
	}

	.rightf_img {
		width: 30upx;
		height: 30upx;
		margin-top: 16upx;
	}

	.item_tab_three {
		display: inline-block;
		width: 33%;
		text-align: center;
		color: #0C0C0C;
		font-size: 28upx;
		height: 40upx;
		line-height: 40upx;
		border-right: 1px solid #D8D8D8;
	}

	.jian_moudel {
		position: absolute;
		width: 30upx;
		margin-top: -4.5%;
		margin-left: 24%;
	}

	.kailong {
		width: 0;
		height: 0;
		border-right: 6upx solid transparent;
		border-left: 6upx solid transparent;
		border-bottom: 8upx solid #D8D8D8;
	}

	.kailong1 {
		width: 0;
		height: 0;
		border-right: 6upx solid transparent;
		border-left: 6upx solid transparent;
		border-top: 8upx solid #D8D8D8;
		margin-top: 4upx;
	}

	.list_itemone {
		display: inline-block;
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin-top: 30upx;
		margin-left: 20upx;
		width: 330upx;
	}

	.list_imgone {
		width: 330upx;
		height: 330upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}

	.bottom_tab_list {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #FFFFFF;
		padding-top: 10upx;
	}

	.bottom_img_tab {
		width: 48upx;
		height: 42upx;
	}

	.item_tab_two {
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #0C0C0C;
		font-size: 28upx;
		height: 98upx;
		// line-height: 40upx;
	}


	._left {
		width: 100%;
		height: 88upx;
		text-align: center;
		font-size: 28upx;
		color: #666666;
		line-height: 88upx;
		display: inline-block;
		background-color: #FAFAFA;
	}

	._left_active {
		width: 100%;
		height: 88upx;
		text-align: center;
		font-size: 28upx;
		color: #666666;
		line-height: 88upx;
		display: inline-block;
		background-color: #FFFFFF;
		border-left: 6upx solid #BE8100;
	}

	._right_moudel {
		padding-left: 30upx;
		padding-top: 30upx;
	}

	._right_img {
		width: 160upx;
		height: 160upx;
		border-radius: 20upx;
	}
</style>

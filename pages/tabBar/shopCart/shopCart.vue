<template>
	<view>
		<view class="title_top"></view>
		<view class="uni-flex background_colorff padding_top2 padding_bottom2">
			<view class="width33 margin_left3 margin_top2">
				<image src="../../../static/image/icon/left.png" class="header_title_img" mode=""></image>
			</view>
			<view class="width33 text_center font_size36">
				购物车
			</view>
			<view class="width33 text_right margin_right3 margin_top2">
				<image src="../../../static/image/icon/delete.png" class="header_title_imgr" mode=""></image>
			</view>
		</view>


		<!-- 内容 -->

		<view class="">
			<!-- 有效商品 模块-->
			<view class="product_moudel" v-for="(item,index) in productList" :key="index">
				<!-- 标题 -->
				<view class="uni-flex">
					<view class="">
						<checkbox-group @change="allChoose(index)">
							<label>
								<checkbox :value="item.id" :checked="item.checkedAll" :class="{'checked':item.checkedAll}"/>
								<!-- <checkbox  :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox> -->
							</label>
						</checkbox-group>
					</view>
					<view class="">
						<image src="../../../static/image/shopTitle.png" mode="" class="shopTitle"></image>
					</view>
					<view class="font_size28">
						联想官方旗舰店
					</view>
				</view>
				<!-- 内容 -->
				<view class="uni-flex" v-for="(item,index) in item.list1" :key="index">
					<view class="margin_top8 margin_left3">
						<checkbox-group class="block" @change="changeCheckbox">
								<checkbox :value="String(item.value)" :checked="checkedArr.includes(String(item.value))" :class="{'checked':checkedArr.includes(String(item.value))}"></checkbox>
						</checkbox-group>
						
						
					</view>
					<view class="margin_left3">
						<image src="../../../static/image/beij/myTopb.png" class="product_moudel_img" mode=""></image>
					</view>
					<view class="">
						<view class="font_size28">
							Asus/华硕 Y4200高性能手提笔记
							本电脑
						</view>
						<view class="font_size22 font_color99">
							屏幕尺寸：15.6英寸
						</view>
						<view class="uni-flex">
							<view class="font_size28 " style="color: #BE8100;">
								¥4799.00 <text class="font_size22 font_color99">/件</text>
							</view>
							<view class="">
								<view class="example-body">
									<uni-number-box
									 :min="1" 
									 :max="99"
									 :value="item.num> item.stock ? item.stock :item.num" 
									 :index="index" @change="change" />
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkedArr: [], //复选框选中的值
				dataList:'',//给到后端的数据
				productList: [{
						name: '店铺名称',
						id: '122',
						list1: [{
							name: '子商品',
							num: 22,
							Price: 5,
							stock:90
						},
						{
							name: '子商品',
							num: 22,
							Price: 5,
							stock:20
						}]
					},
					{
						name: '店铺名称1',
						id: '12',
						list1: [{
							name: '子商品',
							num: 3,
							Price: 10,
							stock:11
						}]
					},
				]
			}
		},
		methods: {
			// 数字框
			change(value) {
				console.log(value);

			},

			// 多选复选框改变事件
			changeCheckbox(e) {
				this.checkedArr = e.detail.value;
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if (this.checkedArr.length > 0 && this.checkedArr.length == this.checkboxData.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			// 全选事件
			allChoose(e) {
				console.log(e)
				if(this.productList[e].checkedAll){
					this.productList[e].checkedAll = false;//改变
				}else{
					this.productList[e].checkedAll = true;//改变
					console.log(this.productList[e])
					this.dataList = this.productList[e]//进行赋值
					for(let item of  this.dataList.list1){
						console.log(item);
						
					}
				}
				
				
				return;
				let chooseItem = e.detail.value;
				// 全选
				if (chooseItem[0] == 'all') {
					this.allChecked = true;
					// for (let item of this.checkboxData) {
					// 	let itemVal = String(item.value);
					// 	if (!this.checkedArr.includes(itemVal)) {
					// 		this.checkedArr.push(itemVal);
					// 	}
					// }
				} else {
					// 取消全选
					this.allChecked = false;
					this.checkedArr = [];
				}
			}

		}
	}
</script>

<style lang="less">
	.product_moudel {
		width: 94%;
		margin-left: 3%;
		background-color: #FFFFFF;
		border-radius: 30upx;
		min-height: 310upx;
		margin-top: 20upx;
	}

	.shopTitle {
		width: 60upx;
		height: 16upx;
	}

	.product_moudel_img {
		width: 160upx;
		height: 160upx;
	}
</style>

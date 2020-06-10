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
						<checkbox-group @change="allChoose">
							<label>
								<checkbox value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox> 全选
							</label>
						</checkbox-group>

					</view>
					<view class="">
						<image src="../../../static/image/shopTitle.png" mode="" class="shopTitle"></image>
					</view>
					<view class="font_size28">
						联想官方旗舰店{{item.checkedAll}}
					</view>
				</view>
				<!-- 内容 -->
				<view class="uni-flex" v-for="(item,index) in item.list1" :key="index">
					<view class="margin_top8 margin_left3">
						<checkbox-group class="block" @change="changeCheckbox">
							<view v-for="item in checkboxData" :key="item.value">
								<checkbox :value="String(item.value)" :checked="checkedArr.includes(String(item.value))" :class="{'checked':checkedArr.includes(String(item.value))}"></checkbox>
								<text>{{item.label}}</text>
							</view>
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
									<uni-number-box :min="1" :max="99" :value="item.num> item.stock ? item.stock :item.num" :index="index" @change="change" />
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
				isChecked: false,
				checkedArr: [], //复选框选中的值
				allChecked: false, //是否全选
				checkboxData:[
									{'value':0,'label':'选项一'},
									{'value':1,'label':'选项二'},
									{'value':2,'label':'选项三'},
									{'value':3,'label':'选项四'},
									{'value':4,'label':'选项五'},
									{'value':5,'label':'选项六'},
									{'value':6,'label':'选项七'},
									{'value':7,'label':'选项八'},
									{'value':8,'label':'选项九'},
									{'value':9,'label':'选项十'}
								],
				
				productList: [{
						name: '店铺名称',
						id: '122',
						list1: [{
								name: '子商品',
								num: 22,
								Price: 5,
								stock: 90
							},
							{
								name: '子商品',
								num: 22,
								Price: 5,
								stock: 20
							}
						]
					},
					{
						name: '店铺名称1',
						id: '12',
						list1: [{
							name: '子商品',
							num: 3,
							Price: 10,
							stock: 11
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

			// 全选事件
			allChoose(e) {
				let chooseItem = e.detail.value;
				// 全选
				if (chooseItem[0] == 'all') {
					this.allChecked = true;
					for (let item of this.checkboxData) {
						let itemVal = String(item.value);
						if (!this.checkedArr.includes(itemVal)) {
							this.checkedArr.push(itemVal);
						}
					}
				} else {
					// 取消全选
					this.allChecked = false;
					this.checkedArr = [];
				}
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

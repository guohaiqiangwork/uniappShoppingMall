<template>
	<view>
		<!-- tab -->
		<view class="background_colorff">
			<view class="item_tab" v-for="(item,index) in tabList" :key="index" @click="tabSwitch(index)" :style="tabIndex == index ?'color:#374CE5' :'' ">
				{{item.name}}
			</view>
		</view>
	
		<view class="list_moudel">
			<!-- 租房 -->
			<template v-if="tabIndex == 0">
				<view class="list_one" @click="goToDetails" v-for="(index,item) in [1,3,2,5,0,8]" :key="index">
					<view class="uni-flex">
						<view class="width33">
							<image src="../../static/image/beij/mybj.png" class="img_list" mode=""></image>
						</view>
						<view class="">
							<view class="font_size26">
								小区名称：金辉华服
							</view>
							<view class="">
								大小：100平米
							</view>
							<view class="">
								出租方式：月租/年租
							</view>
							<view class="">
								联系电话：13333111222
							</view>
						</view>
					</view>
					
				</view>
				
			</template>
			<!-- 买房-->
			<template v-else>
				<view class="list_one" @click="goToDetails" v-for="(index,item) in [1,3,2,5,0,8]" :key="index">
					<view class="uni-flex">
						<view class="width33">
							<image src="../../static/image/beij/mybj.png" class="img_list" mode=""></image>
						</view>
						<view class="">
							<view class="font_size26">
								小区名称：金0000
							</view>
							<view class="">
								大小：100平米
							</view>
							<view class="">
								出售方式：一次性/配合贷款
							</view>
							<view class="">
								联系电话：13333111222
							</view>
						</view>
					</view>
					
				</view>
				
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
						name: '我要租房'
					},
					{
						name: '我要买房'
					}
				],
				tabIndex: 0,
			}
		},
		methods: {
			tabSwitch(index) {
				this.tabIndex = index
			},
			goToDetails(){
				uni.navigateTo({
					url:'../houseRentalDetails/houseRentalDetails'
				})
			}
		}
	}
</script>

<style lang="scss">
	.item_tab {
		display: inline-block;
		width: 50%;
		text-align: center;
		color: #999999;
		font-size: 28upx;
		height: 88upx;
		line-height: 88upx;
	}
	.list_moudel{
		width: 94%;
		margin-left: 3%;
	}
	.list_one{
		padding: 30upx;
		border-radius: 20upx;
		margin-top: 20upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
	}
	.img_list{
		width: 180upx;
		height: 180upx;
	}
</style>

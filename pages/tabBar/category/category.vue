<template>
	<view>
		<view class="title_top"></view>
		<!-- 搜索框 -->
		<view class=" padding_top2 padding_bottom2 background_colorff" style="height: 90upx;">
			<view class="uni-flex searce_moudel" style="border-radius: 20upx;">
				<view class="searce_left">
					<image src="../../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<input class="findShop" maxlength="10" placeholder="请输入要搜索的内容" confirm-type='搜索' type="text" @confirm='Search'
					 placeholder-style='color:#cccccc' />
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="">
			<view @click="goCateOne(item.id)" v-for="(item,index) in firstClassList" :key="index" class="category_list  margin_top2" style="padding-left: 20upx;padding-top: 6upx;padding-bottom: 6upx;">
				<view class="">
					<image :src="item.imageUrl" mode=""></image>
				</view>
				<view class="margin_left2" style="margin-top: 60upx;margin-left: 26upx;">
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
				firstClassList:'',//列表
			}
		},
		mounted() {
			this.getLeft()
		},
		methods: {
			Search(e) {
				console.log(e);
			},
			// 去二及分类
			goCateOne(e){
				console.log(e)
				uni.navigateTo({
					url:'../../categoryOne/categoryOne?categoryId=' + e
				})
			},
			// 获取分类
			getLeft: function() {
				this.$http.get('/api/common/category/firstClass').then(res => {
					if (res.data.code == 200) {
						this.firstClassList = res.data.data
					}
				})
			},
			
		}
	}
</script>

<style>
	.category_list {
		width: 45%;
		margin-left: 3%;
		height: 160upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		display: inline-flex;
	}

	.category_list image {
		width: 150upx;
		height: 150upx;
	}
</style>

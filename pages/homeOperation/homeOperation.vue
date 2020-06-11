<template>
	<view class="text_center">
		<view class="">
			<swiper class="imageContainer" @change="handleChange" circular autoplay>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item @click="swiperClick(item.id)">
						<image class="itemImg" :src="item.banner" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		缴费 ：物业费 车位费用
		1.进行小区选择
		<view class="uni-form-item uni-column margin_left3">
			<picker @change="bindPickerChange" :range="array">
				<label>区域：</label>
				<label class="">{{array[index]}}</label>
			</picker>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: [
					'--请选择--', '小区'
				],
				index: '0',
				imgList: [{
					banner: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3538793755,2857666234&fm=26&gp=0.jpg'
				}, {
					banner: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
				}],
			}
		},
		onLoad(option) {
			console.log(option.id);
			uni.setNavigationBarTitle({
				title: option.id
			})
		},
		methods: {
			//下拉框
			bindPickerChange: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index = e.target.value //将数组改变索引赋给定义的index变量
				this.jg = this.array[this.index] //将array【改变索引】的值赋给定义的jg变量
				//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
			},
			
			// 轮播滑动操作
			handleChange(e) {
				this.currentIndex = e.detail.current;
			},
			// 点击轮播操做
			swiperClick(e) {
				console.log(e)
				uni.navigateTo({
					url: '../lunBDetails/lunBDetails'
				})
			},

		}
	}
</script>

<style lang="less">
// 轮播
	.imageContainer {
		width: 100%;
		height: 300upx;
	}
	
	.itemImg {
		width: 100%;
		height: 300upx;
	}
</style>

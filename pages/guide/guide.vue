<template>
	<view class="content" :style="{ height: windowHeight }">
		<view class="" style="">
			<image mode="" :src="imgUrl" style="width: 100%;height: 100%;position: fixed;"></image>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			windowHeight: '731px',//定义手机屏幕高度值变量
			imgUrl:''
		};
	},
	onReady() {
		uni.getStorageSync('guideStus') == 'GO' ? uni.switchTab({ url: '../tabBar/home/home' }) : this.goGuidOne(); //判断初始引导页
		this.imgUrl ='../../static/image/one/guid.png'
		var _me = this;
		//	plus.webview.create("url","id", {contentAdjust:false});
		uni.getSystemInfo({
			//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
			success: function(res) {
				_me.windowHeight = res.windowHeight + 'px';
				//console.log('手机屏幕高度为' + _me.windowHeight);
			}
		});
	},
	mounted() {},
	methods: {
		goGuidOne: function() {
			setTimeout(function() {
				uni.redirectTo({
					url: '../guideOne/guideOne'
				});
			}, 5000);
		}
	}
};
</script>
<style>
.swiper {
	width: 100%;
	/*     height: 100vw; */
	/* background: red; */
}
uni-image {
	width: 100% !important;
	/* height: 682upx; */
}
</style>

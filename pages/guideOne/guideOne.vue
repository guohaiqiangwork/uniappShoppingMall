<template>
	<view class="content" :style="{ height: windowHeight }">
		
		<view class="" style="">
			<image mode="" src="../../static/image/one/guid.png" style="width: 100%;height: 100%;position: fixed;"></image>
		</view>
		
		<!-- 提示框 -->
		<template v-if="oneImg == 1">
			<view class="">
				<view class="product_content_block">
					<view class="font_size34 text_center">
						声明与政策
					</view>
					<view class="font_size28 margin_top3">
						亲，欢迎来到商城！
					</view>
					<view class="font_size28">
						您可使用本应用，进行商品浏览，支付购买售后服务等功能。我们将严格遵守相关法律法规和隐私政策以保护您的个人隐私。
						请您阅读并同意
						<text class="font_colorbe">《用户协议》</text>和<text class="font_colorbe">《隐私政策》</text>
					</view>
					<view class="uni-flex " style="margin-top: 80upx;">
						<view class="leftbtn" @click="closemoudel">
							不同意
						</view>
						<view class="rightbtn" @click="toIndex">
							同意
						</view>
					</view>
				</view>
			</view>
		</template>
		
		<template v-if="oneImg == 2">
			<view class="">
				<view class="product_content_block">
					<view class="font_sise28 text_center margin_top3" >
					您需要同意《用户协议》和《隐私政策》才能继续使用我们的服务
					</view>
					<view class="uni-flex " style="margin-top: 50upx;">
						<view class="leftbtn" @click="closemoudelOne">
							不同意并退出
						</view>
						<view class="rightbtn" @click="toIndex">
							去同意
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
			windowHeight: '731px', //定义手机屏幕高度值变量
			oneImg:1
		};
	},
	onReady() {
		// uni.getStorageSync('guideStus')=='GO'? uni.switchTab({url: '../tabBar/home/home'}):''//判断初始引导页
		var _me = this;
		//	plus.webview.create("url","id", {contentAdjust:false});
		uni.getSystemInfo({
			//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高
			success: function(res) {
				_me.windowHeight = res.windowHeight +  'px';
				//console.log('手机屏幕高度为' + _me.windowHeight);
			}
		});
	},
	
	methods: {
		closemoudel:function(){
			this.oneImg = 2
		},
		closemoudelOne:function(){
			// #ifdef APP-PLUS  
			plus.runtime.quit();  
			// #endif
		},
		
		// iOS 平台不支持此 API，只能是用户主动杀进程。
		toIndex:function() {
			uni.setStorageSync('guideStus', 'GO');
			uni.switchTab({
				url:'../tabBar/home/home'
			})
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
.product_content_block {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		/* height: 362upx; */
		width: 600upx;
		margin-left: 75upx;
		padding: 30upx;
	}
	
	.leftbtn {
		width: 220upx;
		height: 78upx;
		border: 1px solid #3C3D3E;
		border-radius: 10upx;
		text-align: center;
		color: #3C3D3E;
		line-height: 78upx;
		margin-left: 30upx;
		font-size: 30upx;
	}
	
	.rightbtn {
		width: 220upx;
		height: 78upx;
		background: #3C3D3E;
		border-radius: 10upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 78upx;
		margin-left: 45upx;
		font-size: 30upx;
	}
	
</style>

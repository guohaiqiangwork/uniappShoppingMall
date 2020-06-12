<script>
	import Vue from 'vue';
	export default {
		onLaunch: function() {
			// 	uni.getSystemInfo({
			// 		success: function(e) {
			// 			// #ifndef MP
			// 			Vue.prototype.StatusBar = e.statusBarHeight;
			// 			if (e.platform == 'android') {
			// 				Vue.prototype.CustomBar = e.statusBarHeight + 50;
			// 			} else {
			// 				Vue.prototype.CustomBar = e.statusBarHeight + 45;
			// 			}
			// 			// #endif
			// 			// #ifdef MP-WEIXIN
			// 			Vue.prototype.StatusBar = e.statusBarHeight;
			// 			let custom = wx.getMenuButtonBoundingClientRect();
			// 			Vue.prototype.Custom = custom;
			// 			Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			// 			// #endif
			// 			// #ifdef MP-ALIPAY
			// 			Vue.prototype.StatusBar = e.statusBarHeight;
			// 			Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
			// 			// #endif
			// 		}
			// 	});

		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	@import './static/css/uni.css';
	@import './static/css/public.css';
	@import 'colorui/main.css';
	@import 'colorui/icon.css';

	/*每个页面公共css */
	uni-checkbox .uni-checkbox-input {
	    margin-right: 8upx;
	    -webkit-appearance: none;
	    appearance: none;
	    outline: 0;
	    border: 1px solid #9F9F9F ;
		border-radius: 50%;
	    background-color: #fff;
	    width: 30upx;
	    height: 30upx;
	    position: relative;
	}
	checkbox::before {
	    font-family: "cuIcon";
	    content: "\e645";
	    position: absolute;
	    color: #FFFFFF !important;
	    top: 50%;
	    margin-top: -16upx;
	    right: 10upx;
	    font-size: 32upx;
	    line-height: 32upx;
	    pointer-events: none;
	    -webkit-transform: scale(1, 1);
	    transform: scale(1, 1);
	    -webkit-transition: all 0.3s ease-in-out 0s;
	    transition: all 0.3s ease-in-out 0s;
	    z-index: 9;
	}
	uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
	    border-color: #9F9F9F;
		
	}
	uni-switch.green[checked] .wx-switch-input, uni-switch[checked] .wx-switch-input, uni-checkbox.green[checked] .wx-checkbox-input, uni-checkbox[checked] .wx-checkbox-input, uni-radio.green[checked] .wx-radio-input, uni-radio[checked] .wx-radio-input, uni-switch.green.checked .uni-switch-input, uni-switch.checked .uni-switch-input, uni-checkbox.green.checked .uni-checkbox-input, uni-checkbox.checked .uni-checkbox-input, uni-radio.green.checked .uni-radio-input, uni-radio.checked .uni-radio-input {
	    background-color: #BE8100 !important;
	    border-color: #BE8100 !important;
	    color: #ffffff !important;
	}
	
	
	
</style>

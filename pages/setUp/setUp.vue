<template>
	<view>
		
		<view style="background-color: #CCCCCC;height: 1px;"></view>
		
		<!-- 列表部分 -->
		<view class="list">
			<view class="list_item" @click="gotoNextPageFun('editData')">
				<view class="list_item_left" style="margin-top: 30upx;">
					<image :src="hearImage" mode=""></image>
					<text style="position: relative;bottom:50rpx;left: 10upx;margin-left: 5%;">{{name}}</text>
					<text style="position: relative;bottom:10rpx;right:80upx;margin-left: 5%;">{{telePhone}}</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/icon/rightb.png"></image>
				</view>
			</view>
			<view class="list_item" @click="gotoNextPageFun('addAddress')">
				<view class="list_item_left">
					<text>家庭成员</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/icon/rightb.png"></image>
				</view>
			</view>
			<view class="list_item" @click="gotoNextPageFun('addAddress')">
				<view class="list_item_left">
					<text>地址管理</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/icon/rightb.png"></image>
				</view>
			</view>
			<view class="list_item" @click="gotoNextPageFun('addAddress')">
				<view class="list_item_left">
					<text style="position: absolute;right: 90upx;">400110120</text>
					<text>我的邀请码</text>
				</view>
				<view class="list_item_right">
					<image src="../../static/image/icon/rightb.png"></image>
				</view>
			</view>
			
		</view>
		
		
	
		<view @click="returnFun" class="submitBut">退出当前账号</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'昵称',
				telePhone:'1231123',
				hearImage:'../../static/image/ceshi.png',
				setFalg: false, //密码设置框
				payFalg: false, //密码支付框
			}
		},
		onLoad(){
			
		},
		methods: {
			/* 退出登录 */
			returnFun(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
		
			/* 跳转到下一页 */
			gotoNextPageFun(page){
				uni.navigateTo({
					url: '../'+page+'/'+page+'',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
		
		
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F4F4F4;
	}
	
	.list{
		background-color: #FFFFFF;
		width: 100%;
		.list_item{
			width: 90%;
			margin-left: 5%;
			height: 122upx;
			border-bottom: #EEEEEE solid 1px;
			display: flex;
			flex-direction: row;
			align-items: center;
			.list_item_left{
				width: 95%;
				image{
					width: 82upx;
					height: 82upx;
					border-radius: 50upx; 
				}
				text{
					font-size: 30upx;
					color: #333333;
					font-weight: 500;
				}
			}
			.list_item_right{
				width: 5%;
				image{
					width: 13upx;
					height: 23upx;
				}
			}
		}
	}
	
	/* 密码弹框 */
	.uni-tip {
		padding: 15px;
		width: 300px;
		background-color: #fff;
		border-radius: 10px;
		.popup-title{
			image{
				width: 25.99upx;
				height: 25.99upx;
			}
			text{
				font-size: 34upx;
				font-weight: 800;
				color: #333333;
				margin-left: 150upx;
			}
		}
		.popup-bun{
			margin-top: 30px;
			display: inline-block;
			height: 40px;
			display: flex;
			justify-content: center;
			view{
				text-align: center;
				line-height: 40px;
				display: inline-block;
				width: 40px;
				height: 40px;
				border: 1px solid rgba(187, 187, 187, .99);
				border-right: none;
			}
			.blackpwd {
				display: inline-block;
				width: 10px;
				height: 10px;
				background-color: black;
				border-radius: 50%;
				opacity: 0;
			}
		}
		
		.popup-qr{
			width: 220upx;
			height: 80upx;
			-background: linear-gradient(to right, #FF765A, #FF0100);
			background-color: #00A398;
			color: #FFFFFF;
			border-radius: 50upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			margin-top: -10upx;
			margin-left: 190upx;
		}
	}
	
	/* 密码框 */
	.moudel_content {
		height: 100%;
		width: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.4);;//
		z-index: 99;
		top: 0;
		left: 0;
	}
	.content_block {
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: absolute;
		top: 18%;
	}
	
	.content_block_pay {
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		border-radius: 16px;
		position: fixed;
		bottom: 3%;
		height: 438upx;
	}
	.moudel_img {
		width: 30upx;
		height: 30upx;
		margin-top: 8%;
		margin-left: 3%;
	}
	.moudel_btn {
		width: 222upx;
		height: 70upx;
		color: #FFFFFF;
		text-align: center;
		font-size: 30upx;
		background-color: #00A398;
		line-height: 70upx;
		border-radius: 40upx;
		font-weight: 700;
		margin-top: 5%;
		margin-left: 35%;
		margin-bottom: 3%;
	}
	
	.submitBut{
		width: 690upx;
		height: 90upx;
		background-color: #00A398;
		border-radius: 67upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
		line-height: 90upx;
		margin-top: 45upx;
		position: fixed;
		bottom: 30upx;
		left: 30upx;
	}

</style>

<template>
	<view class="border_top">
		<view class="msg_moudel">
			<view class="font_size30 font_weight600">
				{{msgDetails.title}}
			</view>
			<view class="font_size26 margin_top3">
				{{msgDetails.content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgDetails: '', //详情
			}
		},

		onLoad(option) {
			this.msgId = option.msgId
			this.getMsgDetails(); //获取列表
		},
		methods: {
			// 去详情
			goToProduct(item) {
				uni.navigateTo({
					url: '../../pages/msgDetails/msgDetails?msgId=' + item.id
				});
			},
			// 获取消息详情
			getMsgDetails() {
				var data={
					id:this.msgId
				}
				this.$http.get('/api/message/find',data,true).then(res => {
					if (res.data.code == 200) {
						this.msgDetails = res.data.data
					}
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="less">
	.msg_moudel {
		width: 94%;
		margin-left: 3%;
		margin-top: 3%;
	}

	.border_top {
		border-top: 1px solid #CCCCCC;
	}
</style>

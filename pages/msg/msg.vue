<template>
	<view class="border_top">
		<view class="" v-if="productList.length > 0">
			<view class="msg_moudel" v-for="(item,index) in productList " :key="index" @click="goToProduct(item)">
				<view class="right_border margin_right3" v-if="item.isRead == 0"></view>
				<view class="uni-flex display_space margin_top2">
					<view class="margin_left3 font_size30">
						{{item.title}}
					</view>
					<view class="margin_right3 font_size22 font_color99">
						{{item.createTime}}
					</view>
				</view>
				<view class="font_size26 margin_left3 margin_right3 margin_top2">
					{{item.content}}
				</view>
			</view>
			<!-- 组件加载刷新 -->
			<view>
				<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
			</view>
		</view>

		<view v-if="productList.length == 0" class="text_center margin_top18">
			<image src="../../static/image/default/noMsg.png" class="no_img_msg" mode=""></image>
			<view class="font_size28 font_color99 margin_top5">
				暂无消息~
			</view>
		</view>

	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				productList: [], //消息列表
				status: 'more',
				statusTypes: [{
					value: 'more',
					text: '加载前'
				}, {
					value: 'loading',
					text: '加载中'
				}, {
					value: 'noMore',
					text: '没有更多'
				}],
				contentText: {
					contentdown: '没有更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				pageNum: 1, //页码
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			this.pageNum = 1;
			this.getMsgList(); //调取列表
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 上拉加载
		onReachBottom() {
			let _self = this
			this.status = 'loading'
			uni.showNavigationBarLoading()
			this.pageNum = this.pageNum + 1;
			this.getMsgList(); //调取列表
			_self.status = 'more'
			uni.hideNavigationBarLoading()
		},
		onLoad() {
			// this.getMsgList(); //调取列表
		},
		onShow() {
			// this.getMsgList(); //获取列表
		},
		methods: {
			// 去详情
			goToProduct(item) {
				uni.navigateTo({
					url: '../../pages/msgDetails/msgDetails?msgId=' + item.id
				});
			},
			// 获取消息列表
			getMsgList() {
				var keyword = {
					data: {
						id: uni.getStorageSync('userId')
					},
					"pageNum": this.pageNum,
					"pageSize": '10'
				};
				this.$http.post('/mbMessage/messageList', keyword, true).then(res => {
					if (res.data.code == 200) {
						if (this.pageNum > 1) {
							if (res.data.data.length > 0) {
								this.productList = this.productList.concat(res.data.data);
							}
						} else {
							this.productList = res.data.data
						}
					}
				}).catch(err => {})
			}

		}
	}
</script>

<style lang="less">
	.msg_moudel {
		width: 94%;
		background-color: #FFFFFF;
		margin-left: 3%;
		border-radius: 20upx;
		-moz-box-shadow: 0px 5px 5px #CCCCCC;
		-webkit-box-shadow: 0px 0px 5px #CCCCCC;
		box-shadow: 0px 0px 5px #CCCCCC;
		margin-top: 3%;
		padding-bottom: 3%;
		padding-top: 3%;
	}

	.border_top {
		// border-top: 1px solid #CCCCCC;
	}

	.right_border {
		width: 13upx;
		height: 13upx;
		border-radius: 50%;
		background-color: #00A398;
		float: right;
	}
</style>

<template>
	<view>
		<view class="mt_top_t">
			<view class="uni-flex">
				<view class="width33 text_center font_colorff">
					<view class="font_size36">
						{{teamCount.teamNum}}
					</view>
					<view class="font_size28">
						总人数
					</view>
				</view>
				<view class="width33 text_center font_colorff">
					<view class="font_size36">
						{{teamCount.totalTrans}}
					</view>
					<view class="font_size28">
						总交易额
					</view>
				</view>
				<view class="width33 text_center font_colorff">
					<view class="font_size36">
						{{teamCount.splitRunAmount}}
					</view>
					<view class="font_size28">
						获得分润
					</view>
				</view>
			</view>
		
		</view>


		<!-- 头部搜索 -->
		<view class=" background_colorff padding_bottom2 padding_top2">
			<!-- 搜索框 -->
			<view class="uni-flex top_content" style="box-shadow: 0upx 2upx 10upx 0upx #eeeeee; ">
				<view class="searce_left">
					<image src="../../static/image/icon/search.png" class="searce_width" mode=""></image>
				</view>
				<view class="searce_right">
					<!-- @input="getInputv" :value="inputValue" -->
					<input class="findShop" maxlength="10" placeholder="请输入要搜索的内容" confirm-type='搜索'
					 type="text" @confirm='Search' @input="keyInput" placeholder-style='color:#cccccc' />
				</view>
			</view>
		</view>
		
		
		<!--  -->
		<view class="font_size30 margin_left3">
			我的上级
		</view>
		<view class="top_title">
			{{mySuper.nickName}} <text class="margin_left3">{{mySuper.mobile}}</text>
		</view>
		
		<view class="page_width margin_top3">
			<view class="font_size30">
				团队人员
			</view>
			<scroll-view class="">
				 <view class="uni-flex border_bottom padding_top3 padding_bottom3" v-for="(item,index) in teamMembersList" :key="index" @click="goDetail(item.id)">
				 	<view class="width15">
				 		<image :src="item.headImgurl" class="left_img1" mode=""></image>
				 	</view>
					<view class="width40 ">
						<view class="uni-flex ">
							<view class="font_sise28">
								{{item.nickName}}
							</view>
							<view class="">
								<!-- <image src="../../static/image/bank/gsy.png" mode="" style="width: 90upx;height: 30upx;"></image> -->
							</view>
						</view>
						<view class="font_size26 font_color66">
							{{item.mobile}}
						</view>
					</view>
					<view class="width40 text_right">
						<view class="uni-flex display_right">
							<view class="">
								<image src="../../static/image/icon/people.png" style="width: 26upx;height: 26upx;" mode=""></image>
							</view>
							<view class="font_size26 font_color99 margin_left3">
								{{item.num}}人
							</view>
						</view>
						<view class="font_size24">
							总交易额 <text class="font_sise28 font_colorbe">{{item.totalTrans}}</text>
						</view>
					</view>
				 </view>
				 
				 <uni-load-more :status="status" :content-text="contentText" color="#007aff" />
				 
				 <view v-if="teamMembersList.length == 0" class="text_center margin_top18">
				 	<image src="../../static/image/default/noMsg.png" class="no_img_msg" mode=""></image>
				 	<view class="font_size28 font_color99 margin_top5">
				 		暂无消息~
				 	</view>
				 </view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamCount:'',
				mySuper:'',//我的上级
				teamMembersList:'',//团队列表
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
				inputValue:''
			}
		},
		mounted() {
			this.init()
		},
		// 上拉加载
		onReachBottom() {
			let _self = this
			this.status = 'loading'
			uni.showNavigationBarLoading()
			this.pageNum = this.pageNum + 1;
			this.getTeamMembers(); //调取列表
			_self.status = 'more'
			uni.hideNavigationBarLoading()
		},
		methods: {
			Search(e){
				console.log(e)
				this.getTeamMembers()
			},
			keyInput:function(e){
				console.log(e)
				this.inputValue = e.detail.value
			},
			goDetail:function(e){
				console.log('00')
				uni.navigateTo({
					url:'../myTeamDetail/myTeamDetail?temaId='  + e
				})
			},
			getTeamMembers:function(){
				var data = {
					keyword:this.inputValue,
					limit:'10',
					page:this.pageNum,
					mbId: uni.getStorageSync('userId'),
				}
				// 获取团队数据
				this.$http.get('/api/member/teamMembers', data, true).then(res => {
					if (res.data.code == 200) {
						if (this.pageNum > 1) {
							if (res.data.data.length > 0) {
								this.teamMembersList = this.teamMembersList.concat(res.data.data);
							}
						} else {
							this.teamMembersList = res.data.data
						}
					}
				});
			},
			
			
			init:function(){
				var data = {
					mbId: uni.getStorageSync('userId'),
				}
				// 获取团队数据
				this.$http.get('/api/member/center/teamCount', data, true).then(res => {
					if (res.data.code == 200) {
						this.teamCount = res.data.data
					}
				});
				// 获取我的上级
				this.$http.get('/api/member/team/mySuper', data, true).then(res => {
					if (res.data.code == 200) {
						this.mySuper = res.data.data
					}
				});
				this.getTeamMembers();//获取列表
			}
	
	
		}
	}
</script>

<style lang="less">
	page{
		background-color: #FFFFFF;
	}
	.mt_top_t {
		background: url(../../static/image/beij/myTeam.png) no-repeat;
		height: 180upx;
		background-size: 100% 100%;
		padding-top: 46upx;
	}
	.top_content {
		width: 94%;
		margin-left: 3%;
		height: 66upx;
		background: #ffffff;
		border-radius: 12upx;
	}
	.top_title{
		padding: 30upx;
		color: #FFFFFF;
		font-size: 28upx;
		background: linear-gradient(to right, #edcb80, #a58747);
		margin-top: 30upx;
	}
	.left_img1{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
</style>

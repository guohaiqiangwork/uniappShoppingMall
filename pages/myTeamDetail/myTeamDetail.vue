<template>
	<view>
		<view class="mt_top_t">
			<view class="uni-flex">
				<view class="width15" style="margin-left: 60upx;">
					<image :src="mySuper.headImgurl" class="left_img1"  mode=""></image>
				</view>
				<view class="width80 uni-flex margin_top3">
					<view class="font_sise28 font_colorff">
						{{mySuper.nickName}}
					</view>
					<view class="font_size26 font_colorcc margin_left3">
						{{mySuper.mobile}}
					</view>
				</view>
			</view>
			<!-- <view class="uni-flex margin_top3">
				<view class="width33 text_center font_colorff">
					<view class="font_size36" style="color: #FFE0A5;">
						{{teamCount.teamNum}}
					</view>
					<view class="font_size28">
						总人数
					</view>
				</view>
				<view class="width33 text_center font_colorff">
					<view class="font_size36" style="color: #FFE0A5;">
						{{teamCount.totalTrans}}
					</view>
					<view class="font_size28">
						总交易额
					</view>
				</view>
				<view class="width33 text_center font_colorff">
					<view class="font_size36" style="color: #FFE0A5;">
						{{teamCount.splitRunAmount}}
					</view>
					<view class="font_size28">
						获得分润
					</view>
				</view>
			</view>
					 -->
		</view>

		
		
		<!-- 列表 -->
		<view class="page_width margin_top3">
			<view class="font_size30">
				团队人员
			</view>
			<scroll-view class="">
				 <view class="uni-flex border_bottom padding_top3 padding_bottom3" v-for="(item,index) in teamMembersList" :key="index">
				 	<view class="width15">
				 		<image :src="item.headImgurl" class="left_img1" mode=""></image>
				 	</view>
					<view class="width80 ">
						<view class="uni-flex " style="margin-top: 4%;">
							<view class="font_sise28">
								{{item.nickName}}
							</view>
							<view class="">
								{{item.mobile}}
								<!-- <image src="../../static/image/bank/gsy.png" mode="" style="width: 90upx;height: 30upx;"></image> -->
							</view>
						</view>
					<!-- 	<view class="font_size26 font_color66">
							{{item.mobile}}
						</view> -->
					</view>
				<!-- 	<view class="width40 text_right">
						<view class="uni-flex display_right">
							<view class="">
								<image src="../../static/image/icon/people.png"  style="width: 26upx;height: 26upx;" mode=""></image>
							</view>
							<view class="font_size26 font_color99 margin_left3">
								{{item.num}}人
							</view>
						</view>
						<view class="font_size24">
							总交易额 <text class="font_sise28 font_colorbe">{{item.totalTrans}}</text>
						</view>
					</view>
				 -->
				 </view>
				 
			
				 <view v-if="teamMembersList.length == 0" class="text_center margin_top18">
				 	<image src="../../static/image/default/noMsg.png" class="no_img_msg" mode=""></image>
				 	<view class="font_size28 font_color99 margin_top5">
				 		暂无成员~
				 	</view>
				 </view>
				 <view class="" v-if="teamMembersList.length > 9" >
				 	 <uni-load-more :status="status" :content-text="contentText" color="#999999" />
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
				teamId:'',
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
		onLoad(option) {
				console.log(option)
				this.teamId= option.temaId
		},
		mounted() {
			this.init();
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
			},
			
			getTeamMembers:function(){
				var data = {
					keyword:this.inputValue,
					limit:'10',
					page:this.pageNum,
					mbId:this.teamId,
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
					mbId: this.teamId,
				}
				// 获取团队数据
				this.$http.get('/api/member/center/teamCount', data, true).then(res => {
					if (res.data.code == 200) {
						this.teamCount = res.data.data
					}
				});
				// 获取我的上级
				this.$http.get('/api/member/center/info', data, true).then(res => {
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
		background: url(../../static/image/beij/md.png) no-repeat;
		height: 150upx;
		background-size: 100% 100%;
		padding-top: 30upx;
	}
	
	.left_img1{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
</style>

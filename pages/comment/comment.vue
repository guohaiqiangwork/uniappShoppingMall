<template>
	<view>


		<!-- 列表 -->
		<view class="page_width">
			<!-- 商品 -->
			<template>
				<view class="uni-flex list_moudel_search">
					<view class="width25">
						<image :src="orderDetail.image" class="list_img" mode=""></image>
					</view>
					<view class="width66">
						<view class="text_hidden">
							{{orderDetail.title}}
						</view>
						<view class="margin_top8">
							<uni-rate size="24" active-color="#B99445" :value="rateNumber" @change="onChange"></uni-rate>
						</view>
					</view>
				</view>

			</template>

			<!-- 评论 -->
			<view class="bo_moudel">
				<view class="font_sise28">
					详细评价
				</view>
				<view class="margin_top3">
					<textarea value="" @input="getTextValue" placeholder="请填写内容" class="text_moudel" />
					</view>
				<view class="font_size22 font_colorcc text_right margin_top3 margin_right3">
					{{number}}/300
				</view>
				<view class="uni-flex margin_top8" >
					<view  class="width30 text_center" :class="index !=0 ? 'margin_left4' : ''"  v-for="(item,index) in imgList" :key="index">
						<image @click="delectUpload(index)" src="../../static/image/beij/jian.png" class="jian_img" mode=""></image>
						<image @click="upload(index)" :src="item.url" class="img_width" mode=""></image>
					</view>
				</view>
			</view>
			
			
			<view class="btn_comment" @click="openMoudel">
				提交申请
			</view>
		</view>
		
		<!-- 提示框 -->
		<template v-if="pfalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">
						提交后无法修改，是否确定提交
					</view>
					<view class="uni-flex " style="margin-top: 80upx;"> 
						<view class="leftbtn" @click="closemoudel">
							取消
						</view>
						<view class="rightbtn" @click="saveComment">
							确认
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
				rateNumber:0,
				number:0,
				pfalg: false,
				orderDetailId:'',//订单编码
				orderDetail:'',
				tetxDisplay:true,
				orderId:'',
				score:'',//规格
				content:'',
				imgList:[
					{
						'url':'../../static/image/beij/uplodel.png'
					}
				],
				imgListData:[
					{
						path:''
					}
				]
			}
		},
		onLoad(option) {
			this.orderDetailId = option.orderDetailId;
			this.orderId =option.orderId
		},
		mounted() {
			this.getOrderDetail()
		},

		methods: {
			getTextValue:function(e){
				this.number = e.detail.cursor
				this.content  =  e.detail.value
			},
			onChange:function(e) {
				console.log('rate发生改变:' + JSON.stringify(e));
				this.score = e
			},
			// 确认取消
			okMoudel:function(){
				
			},
			// 取消
			closemoudel:function(){
				this.pfalg = false
			},
			// 获取订单数据
			getOrderDetail:function() {
				var data = {
					orderDetailId: this.orderDetailId
				}
				this.$http.get('/api/order/queryOrderDetailItem', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res))
						this.orderDetail = res.data.data
						
					}
				});
			},
			openMoudel:function(){
				this.pfalg =true
			},
			// 保存评价
			saveComment:function(){
				if(!this.score.value){
					uni.showToast({
						title: '请选择',
						icon: 'none',
						duration: 2000,
						position: 'top',
					});
					return
				}
				var data ={
					content:this.content,
					images:this.imgListData.join(','),
					mbId:uni.getStorageSync('userId'),
					orderDetailId:this.orderDetailId,
					orderId:this.orderId,
					score:this.score.value,
					skuId:this.orderDetail.skuId,
					spuId:this.orderDetail.spuId
				}
				
				this.$http.post('/api/evaluation/save', data, true).then(res => {
					if (res.data.code == 200) {
						console.log(JSON.stringify(res))
						uni.navigateBack()
						
					}
				});
				
			},
			
			
			delectUpload:function(index){
				this.imgList.splice(index, 1);
				this.imgListData.splice(index, 1);
			},
			upload : function(index){
				console.log('77')
			 var  _self = this;
			   uni.chooseImage({
			    count: 1,
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
			     const tempFilePaths = res.tempFilePaths;
				 let id = uni.getStorageSync('userId');
				 const token = uni.getStorageSync('token');
				 uni.uploadFile({
				 	url: 'http://101.201.180.222:8080/api/upload/file',
				 	filePath: tempFilePaths[0],
				 	name: 'file',
				 	method: 'post',
				 	formData: {
				 		'file': tempFilePaths[0],
				 		'mbId': id
				 	},
				 	header: {
				 		'Authorization': "Bearer" + " " + token,
				 		'client': 'APP',
				 	},
				 	success: (uploadFileRes) => {
				 		console.log("11==" + JSON.stringify(uploadFileRes));
				 		if (JSON.parse(uploadFileRes.data).code == 200) {
							var a = JSON.parse(uploadFileRes.data)
							console.log(a)
							_self.imgList[index].url = a.data.url
							_self.imgListData[index] = a.data.path
							console.log(JSON.stringify(_self.imgList))
							if(_self.imgList.length < 3){
								_self.imgList.push({url:'../../static/image/beij/uplodel.png'})
							}
				 			uni.showToast({
				 				title: '上传成功',
				 				icon: 'none',
				 				duration: 2000,
				 				position: 'top',
				 			});
				 		} else {
				 			uni.showToast({
				 				title: JSON.parse(uploadFileRes.data).message,
				 				icon: 'none',
				 				duration: 2000,
				 				position: 'top',
				 			});
				 			return
				 		}
				 	},
				 	fail: (err) => {
				 		return uni.showToast({
				 			title: '上传失败'
				 		});
				 	},
				 });
				 		
			    },
			    error : function(e){
			     console.log(e);
			    }
			   });
			  },
			 
			  
			 
			

		}
	
	
	}
</script>

<style lang="less">
	// 列表
	.list_moudel_search {
		height: 220upx;
		background: #ffffff;
		border-radius: 30upx;
		margin-top: 30upx;
		padding: 30upx;
	}

	.list_img {
		width: 140upx;
		height: 140upx;
		border-radius: 20upx;
	}

	.image_list_s {
		width: 45upx;
		height: 45upx;
		border-radius: 50%;
	}

	.listrightbtn {
		width: 160upx;
		height: 60upx;
		border: 1px solid #be8100;
		border-radius: 10upx;
		text-align: center;
		line-height: 60upx;
		color: #BE8100;
		font-size: 26upx;
		margin-top: -30upx;
	}
	.bo_moudel{
		background: #ffffff;
		border-radius: 20upx;
		padding: 30upx;
		margin-top: 30upx;
	}
	.btn_comment{
		height: 88upx;
		background: #3c3d3e;
		border-radius: 10upx;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
		font-size: 30upx;
		position: absolute;
		width: 94%;
		bottom: 5%;
	}
	.text_moudel{
		height: 220upx;
		font-size: 26upx;
		width: 630upx;
		border: 1px solid #eeeeee;
		border-radius: 20upx;
		padding: 20upx;
	}
	.img_width{
		width: 200upx;
		height: 200upx;
	}
	.margin_left4{
		margin-left: 4%;
	}
	.jian_img{
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		position: absolute;
		margin-top: -30upx;
		margin-left: 24%;
	}
	
	.product_content_block {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		height: 362upx;
		width: 600upx;
		margin-left: 75upx;
	}
	
	.leftbtn {
		width: 220upx;
		height: 78upx;
		border: 1px solid #3c3d3e;
		border-radius: 10px;
		text-align: center;
		color: #3C3D3E;
		line-height: 78upx;
		margin-left: 45upx;
	}
	
	.rightbtn {
		width: 220upx;
		height: 78upx;
		background: #3c3d3e;
		border-radius: 10px;
		color: #FFFFFF;
		text-align: center;
		line-height: 78upx;
		margin-left: 45upx;
	}
</style>

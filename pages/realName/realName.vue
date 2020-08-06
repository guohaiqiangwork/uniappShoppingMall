<template>
	<view>
		<!-- 填写信息 -->
		<block v-if="cardFalg == 1">
			<view class="card_list">
				<view class="content_item">
					<text class=" font_size30">姓名</text>
					<input @input="keyName" placeholder="请输入您的姓名" style="width: 520upx;float: right;margin-top: 32upx;font-size: 30upx;" type="text" value="" />
				</view>
				<view class="content_item">
					<text class=" font_size30">身份证号</text>
					<input @input="keyCard" placeholder="请输入您的身份证号" style="width: 520upx;float: right;margin-top: 32upx;font-size: 30upx;" type="text" value="" />
				</view>
			</view>
			<view class="next" @click="getSaveVerific">提交</view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cardFalg: 1,
			idCard: '', //身份证号
			name: '' //姓名
		};
	},
	onLoad(option) {
		this.page = option.pageType;
	},
	methods: {
		keyName: function(e) {
			this.name = e.detail.value;
		},
		keyCard: function(e) {
			this.idCard = e.detail.value;
		},
		getSaveVerific: function() {
			if ( !this.idCard || !this.name) {
				uni.showToast({
					title: '请检查内容',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				return;
			}
			var data = {
				mbId: uni.getStorageSync('userId'),
				idcard: this.idCard,
				name: this.name
			};
			this.$http
				.post('/api/member/verified', data, true)
				.then(res => {
					uni.hideLoading();
					if (res.data.code == 200) {
						uni.showToast({
							title: '认证成功',
							icon: 'none',
							duration: 2000,
							position: 'top'
						});
						// uni.navigateBack();
						uni.navigateTo({
							url: '../' + this.page + '/' + this.page
						});
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'top'
						});
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style>
.eviden {
	padding-top: 67upx;
}

.tis {
	padding-left: 60upx;
	padding-bottom: 32upx;
}

.sfz1 {
	float: left;
	margin-left: 32upx;
}

.sfz1 image {
	width: 320upx;
	height: 201upx;
}

.sfz1 view,
.sfz2 view {
	background-color: #3c3d3e;
	width: 320upx;
	height: 71upx;
	border-radius: 0 0 20upx 20upx;
	position: relative;
	bottom: 35upx;
	text-align: center;
	line-height: 71upx;
}

.sfz2 {
	float: left;
	margin-left: 51upx;
}

.sfz2 image {
	width: 320upx;
	height: 201upx;
}

.sfz3 {
	width: 700upx;
	height: 175upx;
	margin-top: 54upx;
}

.next {
	width: 690upx;
	height: 90upx;
	background-color: #3c3d3e;
	border-radius: 10upx;
	text-align: center;
	line-height: 90upx;
	color: #ffffff;
	font-size: 30upx;
	position: fixed;
	bottom: 30upx;
	left: 30upx;
}

.card_list {
	background-color: #ffffff;
	width: 100%;
	padding-left: 4%;
	padding-right: 4%;
}

.list_one {
	border-bottom: 1px solid #eeeeee;
}

page {
	background-color: #f4f4f4;
}

.content_item {
	width: 100%;
	height: 110upx;
	border-bottom: #eeeeee solid 1px;
	line-height: 110upx;
}
</style>

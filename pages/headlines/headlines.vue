<template>
	<view class="margin_top3">
		<view class="font_size30 page_widthMoudel font_weight700">
			{{title}}
		</view>
		<u-parse :content="item.content" :loading="loading"   />
	</view>
</template>

<script>
	import uParse from '../../components/feng-parse/parse.vue' //富文本展示
	export default {
		components: {
			uParse
		},
		data() {
			return {
				loading: false, //开启loading不显示默认值
				id: '',
				item: '',
				title:''
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.title = option.title
		},
		mounted() {
			this.getLunb();
		},
		methods: {
			getLunb() {
				var data = {
					id: this.id
				}
				this.$http.get('/api/common/publish/detail', data).then(res => {
					console.log(JSON.stringify(res));
					if (res.data.code == 200) {
						this.item = res.data.data
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style>

</style>

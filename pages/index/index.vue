<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
		</cu-custom>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: ''
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	justify-content: center;
}
</style>

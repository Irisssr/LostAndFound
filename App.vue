<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 每个页面公共css */
	@import "./style/comstyle.css";
	@import "./style/iconfont.css";
	/* @import "https://at.alicdn.com/t/font_1431089_keczjtvryfg.css"; */
	*,
	*::after,
	*::before{
		content: '';
		display: block;
		visibility: hidden;
		position: absolute;
		clear: both;
		height: 0;
		line-height: 0;
	}
</style>

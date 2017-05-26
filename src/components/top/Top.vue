<template>
	<div class="top-header">

		<div class="content-wrapper">
			<div class="avatar">
				<img class="avatar_" :src="seller.avatar" />
			</div>

			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="descirption">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>

				<div v-if="seller.supports" class="support">
					<span class="icon"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			
			<div v-if="seller.supports" class="support-count">
					<span class="count">{{seller.supports.length}}个</span>
					<span class="text"></span>
				</div>
		</div>

		<div class="bottom-wrapper">
			<span class="bottom-title"></span><span class="bottom-text">{{seller.bulletin}}</span>
			<span class="bottom-arrow"></span>
		</div>
		<div class="top-background">
			<img :src="seller.avatar" width="100%" height="100%"/>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				seller: {},
			}
		},
		created() {
			let _this = this;
			axios.get('/api/seller', {
					params: {}
				})
				.then(function(response) {
					_this.seller = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.avatar_ {
		width: 6.4rem;
		height: 6.4rem;
		border-radius: 0.2rem;
	}
	
	.top-header {
		color: white;
		position: relative;
		background: rgba(7,17,27,0.5);
		/*background-color: #2C3E50;*/
	}
	
	.content-wrapper {
		position: relative;
		padding: 2.4rem 1.2rem 1.8rem 2.4rem;
		font-size: 0;
	}
	
	.avatar {
		display: inline-block;
		vertical-align: top;
	}
	
	.content {
		display: inline-block;
		margin-left: 1.6rem;
		font-size: 1.4rem;
	}
	
	.title {
		margin: 0.2rem 0 0.8rem 0;
	}
	
	.brand {
		display: inline-block;
		width: 3rem;
		height: 1.8rem;
		background-image: url(brand@2x.png);
		background-size: 3rem 1.8rem;
		background-repeat: no-repeat;
		vertical-align: top;
	}
	
	.name {
		font-size: 1.6rem;
		margin-left: 0.6rem;
		font-weight: bold;
		line-height: 1.8rem;
	}
	
	.descirption {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
	
	.support .icon {
		display: inline-block;
		vertical-align: top;
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.4rem;
		background-size: 1.2rem;
		background-repeat: no-repeat;
		background-image: url(decrease_1@2x.png);
	}
	
	.support .text {
		line-height: 1.2rem;
		font-size: 1.2rem;
	}
	.support-count{
		position: absolute;
		height: 2.4rem;
		right: 1.2rem;
		bottom: 1.4rem;
		border-radius: 1.4rem;
		padding: 0 1.8rem;
		text-align: center;
		background: rgba(0,0,0,0.2);
		line-height: 2.4rem;
		font-size: 1rem;
	}
	.bottom-wrapper{
		background: rgba(7,17,27,0.2);
		position: relative;
		height: 2.8rem;
		line-height: 2.8rem;
		padding: 0 1.2rem 0 1.2rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.bottom-title{
		background-image: url(bulletin@2x.png);
		vertical-align: top;
		margin-top: 0.6rem;
		display: inline-block;
		width: 2.2rem;
		height: 1.2rem;
		background-repeat: no-repeat;
		background-size: 2.2rem 1.2rem;
	}
	.bottom-text{
		vertical-align: top;
		font-size: 1rem;
		margin: 0 0.4rem;
	}
	.bottom-arrow{
		position: absolute;
		font-size: 1rem;
		right: 1rem;
		top: 0.8rem;
		background: rgba(0,0,0,0.2);
		width: 1rem;
		height: 1rem;
	}
	.top-background{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(1rem);
	}
</style>
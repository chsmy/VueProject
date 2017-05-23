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
		</div>
		
		<div class="bottom-wrapper"></div>
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
					params: {
					}
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
	.avatar_{
		width: 6.4rem;
		height: 6.4rem;
		border-radius: 0.2rem;
	}
	.top-header{
		color: white;
		background-color: #2C3E50;
	}
	.content-wrapper{
		padding: 2.4rem 1.2rem 1.8rem 2.4rem;
		font-size: 0;
	}
	.avatar{
		display: inline-block;
		vertical-align: top;
	}
	.content{
		display: inline-block;
		background-color: red;
		margin-left: 1.6rem;
		font-size: 1.4rem;
	}
	.title{
		margin: 0.2rem 0 1.2rem 0;
	}
	.brand{
		display: inline-block;
		width: 3rem;
		height: 1.8rem;
		background-image: url(brand@2x.png);
		background-size: 3rem 1.8rem;
		background-repeat: no-repeat;
		vertical-align: top;
	}
	.name{
		font-size: 1.6rem;
		margin-left: 0.6rem;
		font-weight: bold;
		line-height: 1.8rem;
	}
	.descirption{
		font-size: 1.2rem;
	}
	.support .icon{
		display: inline-block;
		vertical-align: top;
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.4rem;
		background-size: 1.2rem;
		background-repeat: no-repeat;
		background-image: url(decrease_1@2x.png);
		
	}
	.support .text{
		line-height: 1.2rem;
		font-size: 1.2rem;
	}
</style>
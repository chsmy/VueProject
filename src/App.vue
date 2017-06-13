<template>
	<div id="app">
		<router-view class="view one" :seller="seller"></router-view>
		<div class="tab">
			<div class="tab_item">
				<router-link to="/goods" class="tab_click">商品</router-link>
			</div>
			<div class="tab_item">
				<router-link to="/ratings" class="tab_click">评价</router-link>
			</div>
			<div class="tab_item">
				<router-link to="/seller" class="tab_click">商家</router-link>
			</div>
		</div>
		<keep-alive>
		<router-view class="view two" name="content" :seller="seller"></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import {urlParse} from './common/js/util';
	import axios from 'axios';
	
	export default {
		data() {
			return {
              seller: {
              	 id: (() => {
                    let queryParam = urlParse();
                     return queryParam.id;
                 })()
              }
			}
		},
		created () {
			console.log(this.seller.id);
		  let _this = this;
		  axios.get('/api/seller', {
		  params: {
		  	id:_this.seller.id
		  }
		})
		.then(function (response) {
			_this.seller = Object.assign({}, _this.seller, response.data.data);
			console.log(_this.seller)
		})
		.catch(function (error) {
		  console.log(error);
		});
		},
	}
</script>

<style>
	html {
		font-size: 62.5%;
		font-weight: 200;
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background-image: url($url+"@2x.png");
		@media only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (min-device-pixel-ratio: 3) {
			background-image: url($url+"@3x.png");
		}
		;
		/*text-align: center;*/
		/*color: #2c3e50;*/
	}
	
	.tab {
		display: flex;
		width: 100%;
		height: 4rem;
		line-height: 4rem;
		border-bottom: 0.1rem solid rgba(7, 17, 27, 0.1);
	}
	
	.tab_item {
		flex: 1;
		text-align: center;
	}
	
	.tab_click {
		display: block;
		font-size: 1.4rem;
		color: rgb(77, 85, 93);
	}
	
	.router-link-active {
		color: rgb(240, 20, 20);
	}
</style>
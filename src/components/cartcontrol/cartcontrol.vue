<!--评价页面-->
<template>
	<div class="cartcontrol">
		<transition name="move">
		<div class="cart-decrease" v-show="food.count>0" @click="reduceCart">
			<span class="inner icon-remove_circle_outline"></span>
		</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add" @click="addCart">
			<span class="inner icon-add_circle"></span>
		</div>

	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		props: {
			food: {}
		},
		data() {
			return {

			}
		},
		methods:{
			addCart(event){
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food,"count",1)
				}else{
					this.food.count++
				}
				this.$emit('add', event.target);
			},
			reduceCart(event){
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@font-face {
		font-family: 'sell-icon';
		src: url('../../common/fonts/sell-icon.eot?k5xf13');
		src: url('../../common/fonts/sell-icon.eot?k5xf13#iefix') format('embedded-opentype'), url('../../common/fonts/sell-icon.ttf?k5xf13') format('truetype'), url('../../common/fonts/sell-icon.woff?k5xf13') format('woff'), url('../../common/fonts/sell-icon.svg?k5xf13#sell-icon') format('svg');
		font-weight: normal;
		font-style: normal;
	}
	
	[class^="icon-"],
	[class*=" icon-"] {
		/* use !important to prevent issues with browser extensions that change fonts */
		font-family: 'sell-icon' !important;
		speak: none;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		line-height: 1;
		/* Better Font Rendering =========== */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.icon-remove_circle_outline:before {
		content: "\e907"
	}
	
	.icon-add_circle:before {
		content: "\e908"
	}
	
	.cartcontrol {
		font-size: 0;
	}
	
	.cart-add {
		display: inline-block;
		padding: 0.6rem,0.6rem,0,0.6rem;
	}
	.cart-decrease{
		transition: all 0.4s linear;
		display: inline-block;
		padding: 0.6rem,0.6rem,0,0.6rem;
	}
	.cart-count {
		display: inline-block;
		width: 1.2rem;
		vertical-align: top;
		font-size: 1rem;
		line-height: 2.4rem;
		text-align: center;
		color: rgb(147,153,159);
	}
	.inner{
		display: inline-block;
		line-height: 2.4rem;
		font-size: 2.4rem;
		color: rgb(0,160,220);
		transform: rotate(0);
		transition: all 0.4s linear;
	}
	.move-transition{
		opacity: 1;
		transform: transition3d(0,0,0);
	}
	.move-enter{
		opacity: 0;
		transform: transition3d(2.4rem,0,0);
	}
	.move-leave{
		opacity: 0;
		transform: transition3d(2.4rem,0,0);
	}
	.move-transition .inner{
		transform: rotate(0);
	}
	.move-enter .inner{
		transform: rotate(180deg);
	}
	.move-leave .inner{
		transform: rotate(180deg);
	}
</style>
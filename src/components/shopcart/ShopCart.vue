<!--评价页面-->
<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<span class="icon-shopping_cart" :class="{'icon-highlight':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'price-highlight':totalCount>0}">{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="{'enough':totalPrice>=minPrice}">
					{{payDesc}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [{
						price: 10,
						count: 1
					}];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {

			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count
				});
				return count;
			},
			payDesc() {
				if(this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;
				} else if(this.totalPrice < this.minPrice) {
					return `还差￥${(this.minPrice-this.totalPrice)}元起送`;
				} else {
					return '去结算';
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
	
	.shopcart {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 4.8rem;
	}
	
	.content {
		display: flex;
		background: #141d27;
		font-size: 0;
		color: rgba(255, 255, 255, 0.4);
	}
	
	.content-left {
		flex: 1;
	}
	
	.content-right {
		flex: 0 0 10.5rem;
		width: 10.5rem;
	}
	
	.pay {
		font-size: 1.2rem;
		height: 4.8rem;
		line-height: 4.8rem;
		text-align: center;
		font-weight: 700;
		background: #2b333b;
	}
	
	.logo-wrapper {
		display: inline-block;
		position: relative;
		top: -1rem;
		margin: 0 1.2rem;
		padding: .6rem;
		width: 5.6rem;
		height: 5.6rem;
		box-sizing: border-box;
		vertical-align: top;
		border-radius: 50%;
		background: #141d27;
	}
	
	.logo {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #2b343c;
	}
	
	.logo-wrapper .highlight {
		background: rgb(0, 160, 220);
	}
	
	.icon-shopping_cart:before {
		content: "\e903"
	}
	
	.icon-shopping_cart {
		font-size: 2.4rem;
		line-height: 4.4rem;
		color: #80858a;
		margin: auto;
		display: table;  
	}
	
	.icon-highlight {
		color: white;
	}
	
	.price {
		display: inline-block;
		vertical-align: top;
		line-height: 2.4rem;
		margin-top: 1.2rem;
		padding-right: 1.2rem;
		box-sizing: border-box;
		border-right: .1rem solid rgba(255, 255, 255, 0.1);
		font-size: 1.6rem;
		font-weight: 700;
	}
	
	.price-highlight {
		color: white;
	}
	
	.desc {
		display: inline-block;
		vertical-align: top;
		margin: 1.2rem 0 0 1.2rem;
		line-height: 2.4rem;
		font-size: 1rem;
	}
	
	.num {
		font-size: 0.9rem;
		color: white;
		position: absolute;
		top: 0;
		right: 0;
		width: 2.4rem;
		height: 1.6rem;
		line-height: 1.6rem;
		border-radius: 1.6rem;
		text-align: center;
		font-weight: 700;
		background: rgb(240, 20, 20);
		box-shadow: 0, .4rem, .8rem, 0 rgba(0, 0, 0, 0.4);
	}
	
	.enough {
		background: #00b42c;
		color: white;
	}
</style>
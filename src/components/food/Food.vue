<!--商品详情-->
<template>
	<transition name="inout">
		<div v-show="showFlag" class="food" ref="food">
			<div class="food-content">
				<div class="img-header">
					<img :src="food.image" class="img" />
					<div class="leave" @click="leave">
						<span class="icon-arrow_lift"></span>
					</div>
				</div>

				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now-price">¥{{food.price}}</span>
						<span v-show="food.oldPrice" class="old-price">¥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food" @add="addFood"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" v-show="!food.count ||food.count==0" @click.stop.prevent="addFirst">加入购物车</div>
					</transition>
				</div>

				<split v-show="food.info"></split>
				<div class="food-info" v-show="food.info">
					<div class="info-title">商品信息</div>
					<p class="info">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1>商品评价</h1>
					<ratingselect :selectType="selectType" :desc="desc" :onlyContent="onlyContent" :ratings="food.ratings"></ratingselect>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll';
	import cartcontrol from '@/components/cartcontrol/cartcontrol';
	import split from '@/components/split/split';
	import ratingselect from '@/components/ratingselect/RatingSelect';
	import Vue from 'vue'
	const POSITIVE = 1;
	const NATIVE = 2;
	const ALL = 3;
	export default {
		props: {
			food: {},
		},
		data() {
			return {
				showFlag: false,
				selectType:ALL,
				onlyContent:true,
				desc:{
					all:'全部',
  				positive:'推荐',
  				nagative:'吐槽'
				}
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
			},
			leave() {
				this.showFlag = false;
			},
			addFirst(event) {
				if(!event._constructed) {
					return;
				}
				Vue.set(this.food, "count", 1);
				this.$emit('add', event.target);
			},
			addFood(target) {
				this.$emit('add', target);
			},
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
	
	.food {
		position: fixed;
		width: 100%;
		z-index: 30;
		top: 0;
		bottom: 4.8rem;
		background: white;
	}
	
	.inout-enter-active,
	.inout-leave-active {
		transition: all 0.2s linear
	}
	
	.inout-enter,
	.inout-leave-active {
		transform: translateX(100%);
	}
	
	.img-header {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	
	.img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.leave {
		position: absolute;
		top: 1rem;
		left: 0;
	}
	
	.icon-arrow_lift:before {
		content: "\e900";
		padding: 1rem;
		display: block;
		font-size: 2rem;
		color: white;
	}
	
	.content {
		position: relative;
		padding: 1.8rem;
	}
	
	.title {
		line-height: 1.4rem;
		margin-bottom: 0.8rem;
		font-size: 1.4rem;
		font-weight: 700;
		color: rgb(7, 17, 27);
	}
	
	.detail {
		margin-bottom: 1.8rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0;
	}
	
	.sell-count,
	.rating {
		font-size: 1rem;
		color: rgb(147, 153, 159);
	}
	
	.rating {
		margin-left: 1.2rem;
	}
	
	.price {
		line-height: 2.4rem;
		font-weight: 700;
	}
	
	.now-price {
		margin-right: 0.8rem;
		font-size: 1.4rem;
		color: rgb(240, 20, 20);
	}
	
	.old-price {
		text-decoration: line-through;
		font-size: 1rem;
		color: rgb(147, 153, 159);
	}
	
	.cartcontrol-wrapper {
		position: absolute;
		bottom: 1.8rem;
		right: 1.8rem;
	}
	
	.buy {
		position: absolute;
		bottom: 1.8rem;
		right: 1.8rem;
		z-index: 10;
		line-height: 2.4rem;
		padding: 0 1.2rem;
		box-sizing: border-box;
		border-radius: 1.2rem;
		color: white;
		background: rgb(0, 160, 220);
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.2s;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}

  .food-info{
  	padding: 1.8rem;
  }
  .info-title{
  	font-size: 1.4rem;
  	margin-bottom: 0.6rem;
  	color: rgb(7,17,27);
  	font-weight: 700;
  	line-height: 1.4rem;
  }
  .info{
  	font-size: 1.2rem;
  	line-height: 2.4rem;
  	padding: 0 0.8rem;
  	color: rgb(77,89,93);
  }
  .rating{
  	padding-top: 1.8rem;
  }
  .rating h1{
  	font-size: 1.4rem;
  	color: rgb(7,17,27);
  	font-weight: 700;
  	line-height: 1.4rem;
  }
</style>
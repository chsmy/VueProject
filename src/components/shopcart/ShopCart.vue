<!--评价页面-->
<template>
	<div>
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'highlight':totalCount>0}">
							<span class="icon-shopping_cart" :class="{'icon-highlight':totalCount>0}"></span>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'price-highlight':totalCount>0}">￥{{totalPrice}}元</div>
					<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
				</div>
				<div class="content-right">
					<div class="pay" :class="{'enough':totalPrice>=minPrice}">
						{{payDesc}}
					</div>
				</div>
			</div>
			<transition name="drop">
				<div class="ball-container">
					<div v-for="ball in balls" class="ball">
						<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
							<div class="ball" v-show="ball.show">
								<div class="inner inner-hook"></div>
							</div>
						</transition>
					</div>
				</div>
			</transition>
			<transition name="fold">
				<div class="shopcart-list" v-show="listshow">
					<div class="list-header">
						<div class="title">购物车</div>
						<div class="empty" @click="empty">清空</div>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<div class="shopcart-list-price">
									<span>￥{{food.price*food.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol @add="addFood" :food="food"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="fade">
			<div class="list-mask" v-show="listshow" @click="hideList"></div>
		</transition>
	</div>

</template>

<script>
	import BScroll from 'better-scroll';
	import cartcontrol from '@/components/cartcontrol/cartcontrol';
	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [];
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
				balls: [{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				],
				dropBalls: [],
				fold: true
			}
		},
		components: {
			cartcontrol
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
			},
			listshow() {
				if(!this.totalCount) {
					this.fold = true
					return false;
				}
				let show = !this.fold;
				if(show) {
					this.$nextTick(() => {
						if(!this.scroll) {
							this.scroll = new BScroll(this.$refs.listContent, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				}
				return show;
			}
		},
		methods: {
			drop(el) {
				for(let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if(!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeDrop(el) {
				let count = this.balls.length;
				while(count--) {
					let ball = this.balls[count];
					if(ball.show) {
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left - 32;
						let y = -(window.innerHeight - rect.top - 22);
						el.style.display = '';
						//js直接操作css属性实现平移
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.transform = `translate3d(0,${y}px,0)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
						inner.style.transform = `translate3d(${x}px,0,0)`;
					}
				}
			},
			dropping(el, done) {
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight; //获取元素的可见高度值 刷新dom
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					el.addEventListener('transitionend', done);
				});
			},
			afterDrop(el) {
				//数组原来的第一个元素的值。
				let ball = this.dropBalls.shift();
				if(ball) {
					ball.show = false;
					el.style.display = 'none';
				}
			},
			toggleList() {
				if(!this.totalCount) {
					return;
				}
				this.fold = !this.fold;
			},
			addFood(target) {
				this.drop(target);
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				})
			},
			hideList() {
				this.toggleList()
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
		flex: 0 0 9rem;
		width: 9rem;
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
		padding-right: 0.8rem;
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
		line-height: 4.8rem;
		font-size: 1rem;
		text-align: center;
		margin-left: 1rem;
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
	
	.ball {
		position: fixed;
		left: 3.2rem;
		bottom: 2.2rem;
		z-index: 200;
		transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
	}
	
	.inner {
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		background: rgb(0, 160, 220);
		transition: all 0.4s linear
	}
	
	.shopcart-list {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		width: 100%;
		transform: translate3d(0, -100%, 0);
	}
	
	.fold-enter-active,
	.fold-leave-active {
		transition: all 0.5s;
	}
	
	.fold-enter,
	.fold-leave-active {
		transform: translate3d(0, 0, 0);
	}
	
	.list-header {
		height: 4rem;
		line-height: 4rem;
		padding: 0 1.8rem 0 1.8rem;
		background: #f3f5f7;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.title {
		float: left;
		font-size: 1.4rem;
		color: rgb(7, 17, 27);
	}
	
	.empty {
		float: right;
		font-size: 1.2rem;
		color: rgb(0, 160, 220);
	}
	
	.list-content {
		padding: 0 1.8rem;
		max-height: 21.7rem;
		overflow: hidden;
		background: #fff;
	}
	
	.food {
		position: relative;
		padding: 1.2rem 0;
		box-sizing: border-box;
		border-bottom: 0.1rem rgba(7, 17, 27, 0.1);
	}
	
	.name {
		line-height: 2.4rem;
		font-size: 1.4rem;
		color: rgb(7, 17, 27);
	}
	
	.shopcart-list-price {
		position: absolute;
		right: 9rem;
		bottom: 1.2rem;
		line-height: 2.4rem;
		font-size: 1.4rem;
		font-weight: 700;
		color: rgb(240, 20, 20);
	}
	
	.cartcontrol-wrapper {
		position: absolute;
		right: 0;
		bottom: 1.2rem;
	}
	
	.list-mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 40;
		height: 100%;
		width: 100%;
		opacity: 1;
		background: rgba(7, 17, 27, 0.6);
		backdrop-filter: blur(10px)
	}
	.fade-enter-active, .fade-leave-active{
		transition: all 0.5s;
	}
	.fade-enter, .fade-leave-active{
		opacity: 0;
      background: rgba(7, 17, 27, 0);
	}
</style>
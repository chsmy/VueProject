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
					<ratingselect @toogle="toggleContent" @select="selectRating" :selectType="selectType" :desc="desc" :onlyContent="onlyContent" :ratings="food.ratings"></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings&&food.ratings.length">
							<li v-show="needshow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avatar" :src="rating.avatar" />
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价！</div>
					</div>
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
	import { formatDate } from '@/common/js/date';
	import Vue from 'vue'
	const LEFT = 2;
	export default {
		props: {
			food: {},
		},
		data() {
			return {
				showFlag: false,
				selectType: LEFT,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					nagative: '吐槽'
				}
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
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
				this.selectType = LEFT;
				this.onlyContent = true;
				this.$nextTick(() => {
					if(!this.scroll) {
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
			needshow(type, ratingtext) {
				if(this.onlyContent && !ratingtext) {
					return false;
				}
				if(this.selectType === LEFT) {
					return true;
				} else {
					return type === this.selectType;
				}
			},
			selectRating(type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			toggleContent() {
				this.onlyContent = !this.onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		},
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
	
	.food-info {
		padding: 1.8rem;
	}
	
	.info-title {
		font-size: 1.4rem;
		margin-bottom: 0.6rem;
		color: rgb(7, 17, 27);
		font-weight: 700;
		line-height: 1.4rem;
	}
	
	.info {
		font-size: 1.2rem;
		line-height: 2.4rem;
		padding: 0 0.8rem;
		color: rgb(77, 89, 93);
	}
	
	.rating {
		padding-top: 1.8rem;
	}
	
	.rating h1 {
		font-size: 1.4rem;
		color: rgb(7, 17, 27);
		font-weight: 700;
		line-height: 1.4rem;
		margin-left: 1.8rem;
	}
	
	.icon-thumb_up:before {
		content: "\e901";
		color: rgb(0, 160, 220);
		margin-right: 0.4rem;
		line-height: 1.6rem;
		font-size: 1.2rem;
	}
	
	.icon-thumb_down:before {
		content: "\e902";
		color: rgb(147, 153, 159);
		margin-right: 0.4rem;
		line-height: 1.6rem;
		font-size: 1.2rem;
	}
	
	.rating-wrapper {
		padding: 0 18px;
	}
	
	.rating-item {
		position: relative;
		padding: 1.6rem 0;
		border-bottom: 0.1rem solid rgba(7, 17, 27, 0.1);
	}
	
	.user {
		position: absolute;
		right: 0;
		top: 1.6rem;
	}
	
	.user .name {
		margin-right: 0.6rem;
		font-size: 1rem;
		color: rgb(147, 153, 159);
		line-height: 1.2rem;
		display: inline-block;
		vertical-align: top;
	}
	
	.user .avatar {
		width: 1.2rem;
		height: 1.2rem;
	}
	
	.time {
		margin-bottom: 0.6rem;
		line-height: 1.2rem;
		font-size: 1rem;
		color: rgb(147, 153, 159);
	}
	
	.text {
		font-size: 1.2rem;
		line-height: 1.6rem;
		color: rgb(7, 17, 27);
	}
	
	.no-rating {
		padding: 1.6rem 0;
		font-size: 1.2rem;
		color: rgb(147, 153, 159);
	}
</style>
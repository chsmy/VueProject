<!--评价页面-->
<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家%{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="star-wrapper">
						<span class="star-title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="star-score">{{seller.serviceScore}}</span>
					</div>
					<div class="star-wrapper">
						<span class="star-title">商品评价</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="star-score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="star-title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>

			<split></split>

			<ratingselect @toogle="toggleContent" @select="selectRating" :selectType="selectType" :desc="desc" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" >
						<div class="rating-left">
							<img :src="rating.avatar" class="avatar" />
						</div>
						<div class="rating-right">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper_">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="rating-text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend&&rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span v-for="item in rating.recommend" class="rec-item">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import star from '@/components/star/star';
	import split from '@/components/split/split';
	import ratingselect from '@/components/ratingselect/RatingSelect';
	import { formatDate } from '@/common/js/date';
	import BScroll from 'better-scroll';
	const LEFT = 2;
	export default {
		props: {
			seller: {}
		},
		data() {
			return {
				ratings: [],
				selectType: LEFT,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					nagative: '吐槽'
				}
			}
		},
		components: {
			star,
			split,
			ratingselect
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		created() {
			let _this = this;
			axios.get('/api/ratings', {
					params: {}
				})
				.then(function(response) {
					_this.ratings = response.data.data;
					_this.$nextTick(function() {
							_this._initScroll();
					})

				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods:{
			_initScroll(){
				if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.ratings, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
			},
			needShow(type, ratingtext) {
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
	
	.ratings {
		position: absolute;
		top: 17.4rem;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.overview {
		display: flex;
		padding: 1.8rem 0;
	}
	
	.overview-left {
		flex: 0 0 13.7rem;
		padding: 0.6rem 0;
		width: 13.7rem;
		border-right: 0.1rem solid rgba(147, 153, 159, 0.2);
	}
	
	.overview-right {
		flex: 1;
		padding: 0.6rem 0 0.6rem 2.4rem;
	}
	
	.score {
		font-size: 2rem;
		color: rgb(255, 153, 0);
		line-height: 2.8rem;
		text-align: center;
		margin-bottom: 0.6rem;
	}
	
	.title {
		font-size: 1.2rem;
		text-align: center;
		line-height: 1.2rem;
		color: rgb(7, 17, 27);
		margin-bottom: 0.8rem;
	}
	
	.rank {
		font-size: 1rem;
		text-align: center;
		line-height: 1rem;
		color: rgb(147, 153, 159);
	}
	
	.star-wrapper {
		margin-bottom: 0.8rem;
		line-height: 1.8rem;
		font-size: 0;
	}
	
	.star-title {
		display: inline-block;
		vertical-align: top;
		font-size: 1.2rem;
		color: rgb(7, 17, 27);
		line-height: 1.8rem;
	}
	
	.star {
		display: inline-block;
		margin: 0 1.2rem;
		vertical-align: top;
	}
	
	.star-score {
		display: inline-block;
		vertical-align: top;
		color: rgb(255, 153, 0);
		font-size: 1.2rem;
		line-height: 1.8rem;
	}
	
	.delivery-wrapper {
		line-height: 1.8rem;
		font-size: 0;
	}
	
	.delivery {
		font-size: 1.2rem;
		color: rgb(147, 153, 159);
		margin-left: 1.6rem;
	}
	
	@media only screen and (max-width: 375px) {
		.overview-left {
			flex: 0 0 12rem;
			padding: 0.6rem 0;
			width: 12rem;
		}
		.overview-right {
			padding: 0.6rem 0 0.6rem 0.6rem;
		}
		.star {
			margin: 0 0.6rem;
		}
	}
	
	@media only screen and (max-width: 414px) {
		.overview-right {
			padding: 0.6rem 0 0.6rem 1.2rem;
		}
	}
	
	@media only screen and (max-width: 320px) {
		.overview-left {
			flex: 0 0 10rem;
			padding: 0.6rem 0;
			width: 10rem;
		}
		.overview-right {
			padding: 0.6rem 0 0.6rem 0.6rem;
		}
		.star {
			margin: 0 0.3rem;
		}
	}
	
	.rating-item {
		display: flex;
		padding: 1.8rem;
		border-bottom: 0.1rem solid rgba(7, 17, 27, 0.1);
		position: relative;
	}
	
	.avatar {
		flex: 0 0 2.8rem;
		width: 2.8rem;
		height: 2.8rem;
		border-radius: 50%;
	}
	.rating-right{
		flex: 1;
		margin-left: 1.2rem;
	}
	.rating-right .name{
		line-height: 1.2rem;
		font-size: 1.2rem;
		color: rgb(7,17,27);
		margin-bottom: 0.4rem;
	}
	.star-wrapper_{
		margin: 0 0.6rem 0.6rem 0;
	}
	.star-wrapper_ .star{
		display: inline-block;
		vertical-align: top;
	}
	.star-wrapper_ .delivery-time{
		display: inline-block;
		vertical-align: top;
		font-size: 1rem;
		font-weight: 200;
		color: rgb(147,153,159);
		line-height: 1.2rem;
	}
	.rating-text{
		font-size: 1.2rem;
		color: rgb(7,17,27);
		line-height: 1.8rem;
		margin-bottom: 0.8rem;
	}
	.icon-thumb_up:before {
		content: "\e901";
		color: rgb(0, 160, 220);
		line-height: 1.6rem;
		font-size: 1.2rem;
	}
	.time{
		position:absolute;
		top: 1.8rem;
		right: 1.8rem;
		font-size: 1rem;
		font-weight: 200;
		color: rgb(147,153,159);
		line-height: 1.2rem;
	}
	.recommend{
		line-height: 1.6rem;
		font-size: 0;
	}
	.rec-item{
		font-size: 1.2rem;
		color: rgb(147,153,159);
		line-height: 1.6rem;
		border: 0.1rem solid rgba(7,17,27,0.1);
		border-radius: 0.2rem;
		padding: 0 0.6rem 0 0.6rem;
		margin-left: 0.8rem;
		background: white;
	}
</style>
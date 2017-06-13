<!--商家页面-->
<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="seller-name">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2 class="block-name">起送价</h2>
						<div class="block-content">
							<span class="block-price">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2 class="block-name">商家配送</h2>
						<div class="block-content">
							<span class="block-price">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2 class="block-name">平均配送时间</h2>
						<div class="block-content">
							<span class="block-price">{{seller.deliveryTime}}</span>元
						</div>
					</li>
				</ul>
			    
			    <div class="collection" @click="collection">
			    	<span class="icon-favorite" :class="{'favorite': favorite}"></span>
			    	<span class="collection-text">{{favoriteText}}</span>
			    </div>
			</div>

			<split></split>

			<div class="notice">
				<h1 class="notice-title">公告与活动</h1>
				<p class="notice-desc">{{seller.bulletin}}</p>
			</div>

			<ul v-if="seller.supports" class="supports">
				<li class="support-item" v-for="item in seller.supports">
					<span class="icon" :class="classMap[item.type]"></span>
					<span class="text">{{item.description}}</span>
				</li>
			</ul>

			<split></split>

			<div class="pics">
				<h1 class="pics-title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" class="pic-img" width="120px" height="90px"/>
						</li>
					</ul>
				</div>
			</div>
			
			<split></split>
			
			<div class="info">
				<h1 class="info-title">商家信息</h1>
				<ul class="info-list">
					<li class="info-item" v-for="info in seller.infos">
						<span class="info-content">{{info}}</span>
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
	import star from '@/components/star/star';
	import split from '@/components/split/split';
	import BScroll from 'better-scroll';
	import {saveToLocal, loadFromLocal} from '../../common/js/store';
	export default {
		props: {
			seller: {}
		},
		data() {
			return {
               favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		mounted: function() {
			this.$nextTick(function() {
				this._initScroll();
				this._initPics();
			})
		},
		watch: {
			'seller' () {
				this.$nextTick(() => {
					this._initScroll();
					this._initPics();
				});
			}
		},
		computed:{
			favoriteText(){
				return this.favorite?"已收藏":"收藏"
			},
		},
		components: {
			star,
			split,
		},
		methods: {
			collection(event){
				if(!event._constructed){
					return;
				}
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			},
			_initScroll() {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.seller, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			},
			_initPics() {
				if(this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$refs.picList.style.width = width + 'px';
					this.$nextTick(() => {
						if(!this.picScroll) {
							this.picScroll = new BScroll(this.$refs.picWrapper, {
								scrollX: true,
								eventPassthrough: 'vertical'
							});
						} else {
							this.picScroll.refresh();
						}
					});
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
	.seller {
		position: absolute;
		top: 17.4rem;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.overview {
		padding: 1.8rem;
	}
	
	.seller-name {
		font-size: 1.4rem;
		line-height: 1.4rem;
		color: rgb(7, 17, 27);
		margin-bottom: 0.8rem;
		font-weight: 700;
	}
	
	.desc {
		padding-bottom: 1.8rem;
		border-bottom: 0.1rem solid rgba(7, 17, 27, 0.1);
		font-size: 0;
	}
	
	.star {
		display: inline-block;
		margin-right: 0.8rem;
		vertical-align: top;
	}
	
	.text {
		display: inline-block;
		vertical-align: top;
		font-size: 1rem;
		color: rgb(77, 85, 93);
		margin-right: 1.2rem;
		line-height: 1.8rem;
	}
	
	.remark {
		display: flex;
		padding-top: 1.8rem;
	}
	
	.block {
		flex: 1;
		text-align: center;
		border-right: 0.1rem solid rgba(7, 17, 27, 0.1);
	}
	
	.block-name {
		font-size: 1rem;
		line-height: 1rem;
		color: rgb(147, 153, 159);
		margin-bottom: 0.4rem;
	}
	
	.block-content {
		line-height: 2.4rem;
		font-size: 1rem;
		color: rgb(7, 17, 27);
	}
	
	.block-price {
		font-size: 2.4rem;
	}
	
	.notice {
		padding: 1.8rem 0;
		margin: 0 1.8rem;
		border-bottom: 0.1rem solid rgba(7, 17, 27, 0.1);
	}
	
	.notice-title {
		font-size: 1.4rem;
		line-height: 1.4rem;
		color: rgb(7, 17, 27);
		margin-bottom: 0.8rem;
		font-weight: 700;
	}
	
	.notice-desc {
		font-size: 1.2rem;
		color: rgb(240, 20, 20);
		line-height: 2.4rem;
		padding: 0 1.2rem;
	}
	
	.support-item {
		margin: 1.8rem 1.8rem;
		border-bottom: 0.1rem solid rgba(7, 17, 27, 0.1);
	}
	
	.supports .icon {
		display: inline-block;
		vertical-align: top;
		width: 1.6rem;
		height: 1.6rem;
		margin-right: 0.4rem;
		background-size: 1.6rem;
		background-repeat: no-repeat;
	}
	
	.decrease {
		background-image: url(decrease_4@2x.png);
	}
	
	.discount {
		background-image: url(discount_4@2x.png);
	}
	
	.special {
		background-image: url(special_4@2x.png);
	}
	
	.invoice {
		background-image: url(invoice_4@2x.png);
	}
	
	.guarantee {
		background-image: url(guarantee_4@2x.png);
	}
	
	.pics {
		padding: 1.8rem;
	}
	
	.pics-title {
		font-size: 1.4rem;
		line-height: 1.4rem;
		color: rgb(7, 17, 27);
		margin-bottom: 0.8rem;
		font-weight: 700;
	}
	
	.pic-wrapper {
		width: 100%;
		overflow: hidden;
		white-space: nowrap
	}
	
	.pic-list {
		font-size: 0;
	}
	
	.pic-item {
		display: inline-block;
		margin-right: 0.6rem;
		width: 120px;
		height: 90px;
	}
	.info{
		padding: 1.8rem;
	}
	.info-title{
		font-size: 1.4rem;
		line-height: 1.4rem;
		color: rgb(7, 17, 27);
		margin-bottom: 0.8rem;
		font-weight: 700;
	}
	.info-item{
		padding: 1.6rem 1.2rem;
		border-bottom: 0.1rem solid rgba(7,17,27,0.1);
	}
	.info-item:last-child{
		border-bottom:none;
	}
	.info-content{
		line-height: 1.6rem;
		font-size: 1.2rem;
		font-weight: 200;
		color: rgb(7,17,27);
	}
    .icon-favorite:before{
    	content: "\e904"
    }
    .collection{
    	position: absolute;
    	width: 5rem;
    	right: 1rem;
    	top: 1.8rem;
    	text-align: center
    }
    .icon-favorite{
    	color: #80858A;
    	font-size: 2.4rem;
    	line-height: 2.4rem;
    	margin-bottom: 0.4rem;
    	text-align: center;
    	display: block;
    }
    .favorite{
    	color: rgb(240,20,20);
    }
    .collection-text{
    	text-align: center;
    	font-size: 1rem;
    	color: rgb(77,85,93);
    	line-height: 1rem;
    }
</style>
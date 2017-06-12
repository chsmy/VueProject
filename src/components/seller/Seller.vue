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

		</div>

	</div>
</template>

<script>
	import star from '@/components/star/star';
	import split from '@/components/split/split';
	import BScroll from 'better-scroll';
	export default {
		props: {
			seller: {}
		},
		data() {
			return {

			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		mounted: function() {
			this.$nextTick(function() {
				this._initScroll();
			})
		},
		components: {
			star,
			split,
		},
		methods: {
			_initScroll() {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.seller, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
		background-image: url(decrease_4@2x.png);
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
	
	
</style>
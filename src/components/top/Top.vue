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

			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<span class="text"></span>
			</div>
		</div>

		<div class="bottom-wrapper" v-on:click="showDetail">
			<span class="bottom-title"></span><span class="bottom-text">{{seller.bulletin}}</span>
			<span class="bottom-arrow"></span>
		</div>
		<div class="top-background">
			<img :src="seller.avatar" width="100%" height="100%" />
		</div>

		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfix">
					<div class="detail-content">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="detail-title">
							<div class="line"></div>
							<div class="detail-title-text">优惠信息</div>
							<div class="line"></div>
						</div>

						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="item in seller.supports">
								<span class="icon" :class="classMap[item.type]"></span>
								<span class="text">{{item.description}}</span>
							</li>
						</ul>

						<div class="detail-title">
							<div class="line"></div>
							<div class="detail-title-text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="hiddeDetail">
					<img src="../star/star24_on@2x.png" />
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import axios from 'axios';
	import star from '@/components/star/star';

	export default {
		data() {
			return {
				seller: {},
				detailShow: false
			}
		},
		methods: {
			showDetail() {
				this.detailShow = true;
			},
			hiddeDetail() {
				this.detailShow = false;
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			let _this = this;
			axios.get('/api/seller', {
					params: {}
				})
				.then(function(response) {
					_this.seller = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		components: {
			star
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.clearfix {
		display: inline-block;
	}
	
	.clearfix:after {
		clear: both;
		content: ".";
		display: block;
		width: 0;
		height: 0;
		visibility: hidden;
	}
	
	.decrease {
		background-image: url(decrease_2@2x.png);
	}
	
	.discount {
		background-image: url(discount_2@2x.png);
	}
	
	.special {
		background-image: url(special_2@2x.png);
	}
	
	.invoice {
		background-image: url(invoice_2@2x.png);
	}
	
	.guarantee {
		background-image: url(guarantee_2@2x.png);
	}
	
	.avatar_ {
		width: 6.4rem;
		height: 6.4rem;
		border-radius: 0.2rem;
	}
	
	.top-header {
		color: white;
		position: relative;
		background: rgba(7, 17, 27, 0.5);
		overflow: hidden;
		/*background-color: #2C3E50;*/
	}
	
	.content-wrapper {
		position: relative;
		padding: 2.4rem 1.2rem 1.8rem 2.4rem;
		font-size: 0;
	}
	
	.avatar {
		display: inline-block;
		vertical-align: top;
	}
	
	.content {
		display: inline-block;
		margin-left: 1.6rem;
		font-size: 1.4rem;
	}
	
	.title {
		margin: 0.2rem 0 0.8rem 0;
	}
	
	.brand {
		display: inline-block;
		width: 3rem;
		height: 1.8rem;
		background-image: url(brand@2x.png);
		background-size: 3rem 1.8rem;
		background-repeat: no-repeat;
		vertical-align: top;
	}
	
	.name {
		font-size: 1.6rem;
		margin-left: 0.6rem;
		font-weight: 700;
		line-height: 1.8rem;
		text-align: center;
	}
	
	.descirption {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
	
	.support .icon {
		display: inline-block;
		vertical-align: top;
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.4rem;
		background-size: 1.2rem;
		background-repeat: no-repeat;
		background-image: url(decrease_1@2x.png);
	}
	
	.support .text {
		line-height: 1.2rem;
		font-size: 1.2rem;
	}
	
	.support-count {
		position: absolute;
		height: 2.4rem;
		right: 1.2rem;
		bottom: 1.4rem;
		border-radius: 1.4rem;
		padding: 0 1.8rem;
		text-align: center;
		background: rgba(0, 0, 0, 0.2);
		line-height: 2.4rem;
		font-size: 1rem;
	}
	
	.bottom-wrapper {
		background: rgba(7, 17, 27, 0.2);
		position: relative;
		height: 2.8rem;
		line-height: 2.8rem;
		padding: 0 1.2rem 0 1.2rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.bottom-title {
		background-image: url(bulletin@2x.png);
		vertical-align: top;
		margin-top: 0.6rem;
		display: inline-block;
		width: 2.2rem;
		height: 1.2rem;
		background-repeat: no-repeat;
		background-size: 2.2rem 1.2rem;
	}
	
	.bottom-text {
		vertical-align: top;
		font-size: 1rem;
		margin: 0 0.4rem;
	}
	
	.bottom-arrow {
		position: absolute;
		font-size: 1rem;
		right: 1rem;
		top: 0.8rem;
		background: rgba(0, 0, 0, 0.2);
		width: 1rem;
		height: 1rem;
	}
	
	.top-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(1rem);
	}
	
	.detail {
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 100%;
		overflow: auto;
		top: 0;
		left: 0;
		background: rgba(7, 17, 27, 0.8);
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
	
	.detail-wrapper {
		min-height: 100%;
		width: 100%;
	}
	
	.detail-content {
		margin-top: 6.4rem;
		padding-bottom: 6.4rem;
	}
	
	.detail-close {
		position: relative;
		margin: -6.4rem auto 0 auto;
		width: 3.2rem;
		height: 3.2rem;
		clear: both;
		font-size: 3.2rem;
	}
	
	.star-wrapper {
		margin-top: 1.8rem;
		padding: .2rem 0;
		text-align: center;
	}
	
	.detail-title {
		display: flex;
		width: 80%;
		margin: 2.8rem auto 2.4rem auto;
	}
	
	.line {
		flex: 1;
		position: relative;
		top: -0.6rem;
		border-bottom: 0.1rem solid rgba(255, 255, 255, 0.2);
	}
	
	.detail-title-text {
		padding: 0 1.2rem;
		font-weight: 700;
		font-size: 1.4rem;
	}
	
	.supports {
		width: 80%;
		margin: 0 auto;
	}
	
	.supports .support-item {
		padding: 0 1.2rem;
		margin-bottom: 1.2rem;
		font-size: 0;
	}
	
	.supports .icon {
		display: inline-block;
		vertical-align: middle;
		width: 1.6rem;
		height: 1.6rem;
		margin-right: 0.4rem;
		background-size: 1.6rem;
		background-repeat: no-repeat;
	}
	
	.supports .support-item .text {
		line-height: 1.6rem;
		font-size: 1.2rem;
		text-align: center;
		vertical-align: middle;
	}
	
	.bulletin {
		width: 80%;
		margin: 0 auto;
	}
	
	.bulletin .content {
		padding: 0 1rem;
		line-height: 2rem;
		font-size: 1.2rem;
		margin: 0 auto;
	}
</style>
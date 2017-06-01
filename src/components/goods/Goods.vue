<!--商品-->
<template>
  <div class="goods">
    <div class="menu-wrapper">
    	<ul>
    		<li v-for="item in goods" class="menu-item">
    			<span class="text border-1px">
    				<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
    				{{item.name}}
    			</span>
    			</li>
    	</ul>
    </div>
    <div class="foods-wrapper">
    	<ul>
    		<li v-for="item in goods" class="food-list">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
    				<li v-for="food in item.foods" class="food-item">
    					<div class="icon">
    						<img :src="food.icon" width="57px" height="57px"/>
    					</div>
    					<div class="content">
    						<h2 class="name">{{food.name}}</h2>
    						<p class="des" v-show="food.description">{{food.description}}</p>
    						<div class="extra">
    						<span class="count">月售{{food.sellCount}}份</span>
    						<span>好评率{{food.rating}}%</span>
    					</div>
    					<div class="price">
    						<span class="now-price">¥{{food.price}}</span>
    						<span v-show="food.oldPrice" class="old-price">¥{{food.oldPrice}}</span>
    					</div>
    					</div>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
  </div>
</template>

<script>
	import axios from 'axios';
export default {
  data () {
    return {
     goods:[]
    }
  },
  created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			let _this = this;
			axios.get('/api/goods', {
					params: {}
				})
				.then(function(response) {
					_this.goods = response.data.data;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods{
	display: flex;
	position: absolute;
	top: 17.4rem;
	bottom: 4.6rem;
	overflow: hidden;
	width: 100%;
}
.menu-wrapper{
	flex: 0 0 8rem;
	width: 8rem;
	background: #f3f5f7;
}
.foods-wrapper{
	flex: 1;
}
.menu-item{
	display: table;
	height: 5.4rem;
	width: 5.6rem;
	line-height: 1.4rem;
	padding: 0 1.2rem;
	
}
.menu-item .icon{
	  display: inline-block;
		vertical-align: top;
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 0.2rem;
		background-size: 1.2rem;
		background-repeat: no-repeat;
}
.menu-item .text{
	display: table-cell;
	font-size: 1.2rem;
	width: 5.6rem;
	vertical-align: middle;
	text-align: center;
	border-bottom: .1rem solid rgba(7,17,27,0.1);
}
.decrease {
		background-image: url(decrease_3@2x.png);
	}
	
	.discount {
		background-image: url(discount_3@2x.png);
	}
	
	.special {
		background-image: url(special_3@2x.png);
	}
	
	.invoice {
		background-image: url(invoice_3@2x.png);
	}
	
	.guarantee {
			background-image: url(guarantee_3@2x.png);
	}
	.foods-wrapper .title{
		padding-left: 1.4rem;
		border-left: .2rem solid #d9dde1;
		height: 2.6rem;
		line-height: 2.6rem;
		color: rgb(147,153,159);
		background: #f5f3f7;
	}
	.food-item{
		display: flex;
		margin: 1.8rem;
		padding-bottom: 1.8rem;
		border-bottom: 0.1rem solid rgba(7,17,27,0.1);
	}
	.food-item .icon{
		flex: 0 0 5.7rem;
		/*width: 2rem;
		height: 2rem;*/
		margin-right: 1rem;
	}
	.food-item .content{
		flex: 1;
	}
	.name{
		margin: 0.2rem 0 0.8rem 0;
		height: 1.4rem;
		line-height: 1.4rem;
		font-size: 1.4rem;
		color: rgb(7,17,27);
	}
	.des{
		margin-bottom: 0.8rem;
		font-size: 1rem;
		height: 1rem;
		line-height: 1rem;
		color: rgb(147,153,159);
	}
	.extra {
		font-size: 1rem;
		height: 1rem;
		line-height: 1rem;
		color: rgb(147,153,159);
	}
	.count{
		margin-right: 1.2rem;
	}
	.price{
		line-height: 2.4rem;
		font-weight: 700;
	}
	.now-price{
		margin-right: 0.8rem;
		font-size: 1.4rem;
		color: rgb(240,20,20);
	}
	.old-price{
		text-decoration: line-through;
		font-size: 1rem;
		color: rgb(147,153,159);
	}
</style>

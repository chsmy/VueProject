<!--评价页面-->
<template>
  <div class="ratings">
        <div class="ratings-content">
        	<div class="overview">
        		<div class="overview-left">
        			<h1 class="score">{{seller.score}}</h1>
        			<div class="title">综合评分</div>
        			<div class="rank">高于周边商家%{{seller.rankRate}}</div>
        		</div>
        		<div class="overview-right"></div>
        	</div>
        </div>
  </div>
</template>

<script>
export default {
  props:{
			seller: {}
		},
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ratings{
	position: absolute;
	top: 17.4rem;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
}
.overview{
	display: flex;
	padding: 1.8rem 0;
}
.overview-left{
	flex: 0 0 13.7rem;
	padding: 0.6rem 0;
	width: 13.7rem;
	border-right: 0.1rem solid rgba(147,153,159,0.2);
}
.overview-right{
	flex: 1;
}
.score{
	font-size: 2rem;
	color: rgb(255,153,0);
	line-height: 2.8rem;
	text-align: center;
	margin-bottom: 0.6rem;
}
.title{
	font-size: 1.2rem;
	text-align: center;
	line-height: 1.2rem;
	color: rgb(7,17,27);
	margin-bottom: 0.8rem;
}
.rank{
	font-size: 1rem;
	text-align: center;
	line-height: 1rem;
	color: rgb(147,153,159);
}
</style>

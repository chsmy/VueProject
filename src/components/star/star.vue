<!--评价星星-->
<template>
  <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" class="start-item" :class="itemClass"></span>
  </div>
</template>

<script>
	const LENGTH = 5;
	const CLS_ON = "on";
	const CLS_HALF = "half";
	const CLS_OFF = "off";
export default {
	
  props: {
  	size:{
  		type:Number
  	},
  	score:{
  		type:Number
  	}
  },
  computed:{
  	starType(){
  		return "star-"+ this.size;
  	},
  	itemClasses(){
  		let res = [];
  		let score = Math.floor(this.score*2)/2;
  		let hasHalf = score%1 !==0;
  		let integer = Math.floor(score);
  		for(let i = 0;i<integer;i++){
  			res.push(CLS_ON);
  		}
  		if(hasHalf){
  			res.push(CLS_HALF);
  		}
  		while(res.length<LENGTH){
  			res.push(CLS_OFF);
  		}
  		return res;
  	}
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.star{
		font-size: 0;
	}
.start-item{
	display: inline-block;
	background-repeat: no-repeat;
}
.star-48 .start-item{
	width: 2rem;
	height: 2rem;
	margin-right: 2.2rem;
	background-size: 2rem 2rem;
}
.star-48 .on{
	background-image: url(star48_on@2x.png);
}
.star-48 .half{
	background-image: url(star48_half@2x.png);
}
.star-48 .off{
	background-image: url(star48_off@2x.png);
}
.star-36 .start-item{
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 0.6rem;
	background-size: 1.5rem 1.5rem;
}
@media only screen and (max-width: 320px) {
	.star-36 .start-item{
	  margin-right: 0.3rem;
	}
}
.star-36 .on{
	background-image: url(star36_on@2x.png);
}
.star-36 .half{
	background-image: url(star36_half@2x.png);
}
.star-36 .off{
	background-image: url(star36_off@2x.png);
}
.star-24 .start-item{
	width: 1rem;
	height: 1rem;
	margin-right: 0.3rem;
	background-size: 1rem 1rem;
}
.star-24 .on{
	background-image: url(star24_on@2x.png);
}
.star-24 .half{
	background-image: url(star24_half@2x.png);
}
.star-24 .off{
	background-image: url(star24_off@2x.png);
}
</style>

<!--评价选择-->
<template>
  <div class="ratingselect">
    <div class="rating-type">
    	<span class="block positive">{{desc.all}}<span class="count">47</span></span>
    	<span class="block positive">{{desc.positive}}<span class="count">37</span></span>
    	<span class="block nagative">{{desc.nagative}}<span class="count">5</span></span>
    </div>
    <div class="switch">
    	<span class="icon-check_circle"></span>
    	<span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
	const POSITIVE = 1;
	const NATIVE = 2;
	const ALL = 3;
export default {
  props:{
  	rating:{
  		type:Array,
  		default(){
  			return [];
  		}
  	},
  	selectType:{
  		type:Number,
  		default:ALL
  	},
  	onlyContent:{
  		 type:Boolean,
  		default:false
  	},
  	desc:{
  		type:Object,
  		default(){
  			return {
  				all:'全部',
  				positive:'满意',
  				nagative:'不满意'
  			};
  		}
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

.icon-check_circle:before{
	content: "\e905";
}
.rating-type{
  	padding: 1.8rem 0;
  	margin: 0 1.8rem;
  	border-bottom: 0.1rem solid rgba(7,17,27,0.1);
  	font-size: 0;
  }
  .block{
  	display: inline-block;
  	padding: 0.8rem 1.2rem;
  	margin-right: 0.8rem;
  	border-radius: 0.1rem;
  	font-size: 1.2rem;
  	line-height: 1.6rem;
  	color: rgb(77,85,93);
  }
  .positive{
  	background: rgba(0,160,220,0.2);
  }
  .nagative{
  	background: rgba(77,85,93,0.2);
  }
  .count{
  	font-size: 0.8rem;
  	margin-left: 0.2rem;
  }
</style>

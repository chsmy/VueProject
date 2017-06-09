<!--评价选择-->
<template>
  <div class="ratingselect">
    <div class="rating-type">
    	<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
    	<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
    	<span @click="select(1,$event)" class="block nagative" :class="{'active_':selectType===1}">{{desc.nagative}}<span class="count">{{nagative.length}}</span></span>
    </div>
    <div class="switch" @click="toogleContent">
    	<span class="icon-check_circle" :class="{'on':onlyContent}"></span>
    	<span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
	const LEFT = 2;
	const MIDDLE = 0;
	const RIGHT = 1;
export default {
  props:{
  	ratings:{
  		type:Array,
  		default(){
  			return [];
  		}
  	},
  	selectType:{
  		type:Number,
  		default:LEFT,
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
  },
  computed:{
  	positive(){
  		return this.ratings.filter((rating)=>{
  			return rating.rateType === MIDDLE;
  		})
  	},
  	nagative(){
  			return this.ratings.filter((rating)=>{
  			return rating.rateType === RIGHT;
  		})
  	}
  },
  methods:{
  	select(type,event){
  		if(!event._constructed) {
					return;
				}
  		this.$emit('select',type);
  	},
  	toogleContent(){
  		if(!event._constructed) {
					return;
				}
  		this.$emit('toogle',this.onlyContent);
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
  .active{
  	color: #fff;
  	background: rgb(0, 160, 220);
  }
  .active_{
  	color: #fff;
  	background: rgb(77, 85, 93);
  }
  .switch{
  	padding: 1.2rem 1.8rem;
  	line-height: 2.4rem;
  	border-bottom: 0.1rem solid rgba(7,17,27,0.1);
  	color: rgb(147,153,159);
  	font-size: 0;
  }
  .icon-check_circle{
  	display: inline-block;
  	vertical-align: top;
  	font-size: 2.4rem;
  	margin-right: 0.4rem;
  }
  .text{
  	display: inline-block;
  	vertical-align: top;
  	font-size: 1.2rem;
  }
  .on{
  	color: #00c850;
  }
</style>

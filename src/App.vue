<template>
  <div id="app">
    <router-view class="view one"></router-view>
    <div class="tab">
    	<div class="tab_item">
    		<router-link to="/goods" class="tab_click">商品</router-link>
    	</div>
    	<div class="tab_item">
    		<router-link to="/ratings" class="tab_click">评价</router-link>
    	</div>
    	<div class="tab_item">
    		<router-link to="/seller" class="tab_click">商家</router-link>
    	</div>
    </div>
    <router-view class="view two" name="content"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data(){
  	return{
  		
  	}
  },
  created () {
    axios.get('/api/seller', {
    params: {
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  },
}
</script>

<style>
	html {
  font-size: 62.5%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.tab{
	display: flex;
	width: 100%;
	height: 4rem;
	line-height: 4rem;
	border-bottom: 0.1rem solid rgba(7,17,27,0.1);
}
.tab_item{
	flex: 1;
	text-align: center;
}
.tab_click {
	display: block;
	font-size: 1.4rem;
	color: rgb(77,85,93);
}
.router-link-active{
	color: rgb(240,20,20);
}
</style>

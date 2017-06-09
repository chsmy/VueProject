import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Top from '@/components/top/Top'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/Seller'

Vue.use(Router);

export default new Router({
  routes: [
   {
      path: '/',
      redirect: '/goods'
    },
    {
    	path: '/goods',
      name: 'Goods',
      components: {
      	default:Top,
      	content:Goods
      }
    },
    {
    	path: '/ratings',
      name: 'Ratings',
      components: {
      	default:Top,
      	content:Ratings
      }
    },
    {
    	path: '/seller',
      name: 'Seller',
      components: {
      	default:Top,
      	content:Seller
      }
    },
  ]
})

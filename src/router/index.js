import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path:'/goods',component:goods
    },
    {
      path:'/ratings',component:ratings
    },
    {
      path:'/seller',component:seller
    },
    {
      path:'/',redirect:'/goods'
    }
  ]
})


<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header'
  import goods from './components/goods/goods'
  import ratings from './components/ratings/ratings'
  import seller from './components/seller/seller'
export default {
  name: 'App',
  data(){
    return {
      seller:{}
    }
  },
  created(){
    this.$http.get('/api/seller').then((response)=>{
      console.log(response);
      this.seller=response.body.data;
    })
  },
  components:{
    'v-header':header,
    goods,
    ratings,
    seller
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/base.styl"
#app {

}
  #app .tab
    display: flex
    width: 100%
    height:40px
    line-height:40px
    border-bottom :1px solid rgba(7,17,27,0.1)
    .tab-item
      flex:1
      text-align:center
    .tab-item a
      display block
      font-size 14px
      color:rgb(77,85,93)
    .tab-item .active
      color:rgb(240,20,20)
</style>

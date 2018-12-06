<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)"></div>
      </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>

<script>
  import Vue from 'vue';
    export default {
        name: "cartcontrol",
        data(){
          return{

          }
        },
        props:['food'],
        created(){

        },
        methods:{
          addCart(event){
            if(!event._constructed){
              return;
            }
            if(!this.food.count){
              Vue.set(this.food,'count',1);
            }else{
              this.food.count++;
            }
          },
          decreaseCart(event){
            if(!event._constructed){
              return;
            }
            if(this.food.count){
              this.food.count--;
            }
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color:rgb(0,160,220)
    .cart-add
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color:rgb(0,160,220)
    .cart-count
      display: inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color:rgb(147,153,159)
    .cart-add
      display: inline-block
    .move-enter
      opacity 0
      transform (0deg)
    .move-enter-to
      opacity 1
      transform (180deg)
    .move-enter-active
      transition all 0.5s linear
      transform translate3d(0,0,0)
    .move-leave
      opacity 1
      transform (180deg)
    .move-leave-to
      opacity 0
      transform (0deg)
    .move-leave-active
      transition all 0.5s linear
      transform translate3d(24px,0,0)
</style>

<template>
  <div>
      <div class="shopcart">
        <div class="contents" @click="toggleList">
          <div class="content-left">
            <div class="logo-wrapper">
              <div class="logo" :class="{highlight:totalCount>0}">
                <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
              </div>
              <div class="num" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <div class="price" :class="{highlight:totalCount>0}">￥{{totalPrice}}元</div>
            <div class="desc">另需配送费￥{{deliveryprice}}元</div>
          </div>
          <div class="content-right" @click.stop.prevent="pay">
            <div class="pay" :class="payClass">
              {{payDesc}}
            </div>
          </div>
        </div>
        <transition name="fold">
          <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
              <ul>
                <li class="food" v-for="food in selectsfoods">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <span>￥{{food.price*food.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol'

    export default {
        name: "shopcart",
        data(){
          return{
            fold:true//true表示收起，false表示展开
          }
        },
        components:{
          cartcontrol
        },
        props:['deliveryprice','minprice','selectsfoods'],
        computed:{
          totalPrice(){
            let total=0;
            this.selectsfoods.forEach((food)=>{
              total+=food.price*food.count;
            });
            return total;
          },
          totalCount(){
            let count=0;
            this.selectsfoods.forEach((food)=>{
              count+=food.count;
            });
            return count;
          },
          payDesc(){
            if(this.totalPrice === 0){
              return `￥${this.minprice}元起送`
            }else if(this.totalPrice<this.minprice){
              let diff=this.minprice-this.totalPrice;
              return `还差￥${diff}元起送`
            }else{
              return '去结算';
            }
          },
          payClass(){
            if(this.totalPrice < this.minprice){
              return 'not-enough'
            }else{
              return 'enough'
            }
          },
          listShow(){
            if(!this.totalCount){//判断如果没有商品的话
              this.fold=true;//表示fold收起
              return false;//给listShow返回一个false。菜单隐藏
            }else{
              let show=!this.fold;
              if(show){
                this.$nextTick(()=>{
                  if(!this.scroll){
                  this.scroll=new BScroll(this.$refs.listContent,{
                    click:true
                  });
                  }else{
                    this.scroll.refresh();
                  }
                });
              }
              return show;
            }
          }
        },
        methods:{
          toggleList(){
            if(!this.totalCount){
              return;
            }else{
              this.fold=!this.fold;
            }
          },
          empty(){
            this.selectsfoods.forEach((food) => {
              food.count=0;
            })
          },
          hideList(){
            this.fold = true;
          },
          pay(){
            if(this.totalPrice < this.minprice){
              return;
            }
            window.alert(`支付${this.totalPrice}元`);
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left:0
    bottom:0
    z-index: 50
    width: 100%
    height:48px
    background-color black
    .contents
      display: flex
      background #141d27
      font-size 0
      .content-left
        flex:1
        .logo-wrapper
          display: inline-block
          position: relative
          top:-10px
          margin 0 12px
          padding 6px
          width:56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            text-align:center
            width 100%
            height 100%
            border-radius 50%
            background:#2b343c
            &.highlight
              background rgb(0,160,220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color:#80858a
              &.highlight
                color:#fff
          .num
            position: absolute
            top:0
            right:0
            width: 24px
            height:16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color:white
            background rgb(240,20,20)
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display: inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          box-sizing border-box
          padding-right 12px
          border-right:1px solid rgba(255,255,255,0.1)
          font-size:16px
          font-weight 700
          color:rgba(255,255,255,0.4)
          &.highlight
            color:#fff
        .desc
          display: inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          color:rgba(255,255,255,0.4)
          font-size 10px
      .content-right
        flex:0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          color:rgba(255,255,255,0.4)
          font-weight 700
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color:white
    .shopcart-list
      position: absolute
      left:0
      top:0px
      z-index: -1
      width 100%
      background #ffffff
      transform:translate3d(0,-100%,0)
      &.fold-enter-active,&.fold-leave-active
        transition all 0.5s
      &.fold-enter,&.fold-leave-to
        transform:translate3d(0,0,0)
      .list-header
        width 100%
        height 40px
        background #f3f5f7
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
          display inline-block
          float left
          line-height 40px
          color:rgb(7,17,27)
          font-weight 100
          font-size 14px
          padding-left 18px
        .empty
          display inline-block
          float right
          font-size 12px
          color:rgb(0,160,220)
          line-height 40px
          padding-right 18px
      .list-content
        padding 0 18px
        width 100%
        max-height 217px
        overflow hidden
        background #fff
        box-sizing border-box
        .food
          width 100%
          position: relative
          padding 12px 0px
          box-sizing border-box
          border-bottom 1px solid rgba(7,17,27,0.1)
          .name
            display inline-block
            font-size 14px
            color:rgb(7,17,27)
            line-height 24px
            left 0px
            margin 0
          .price
            position: absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color:rgb(240,20,20)
          .cartcontrol-wrapper
            position: absolute
            right:0
            bottom:6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index:40
    backdrop-filter blur(10px)
    background rgba(7,17,27,0.6)
    &.fade-enter-active,&.fade-leave-active
      transition all 0.5s
    &.fade-enter,&.fade-leave-to
      opacity: 0
      background rgba(7,17,27,0)

</style>

<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper ClearFix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="m_title">
            <div class="m_line"></div>
            <div class="m_text">优惠信息</div>
            <div class="m_line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="m_title">
            <div class="m_line"></div>
            <div class="m_text">商家公告</div>
            <div class="m_line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="showDetail"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star'
    export default {
        name: "header",
        props:['seller'],
        components:{
          star
        },
        data(){
          return{
            detailShow:false
          }
        },
        methods:{
          showDetail(){
            this.detailShow=!this.detailShow
          }
        },
        created(){
          this.classMap=['decrease','discount','special','invoice','guarantee'];
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/base.styl"

.header{
  color:white
  position: relative;
  background rgba(7,17,27,0.5)
  overflow hidden
}
  .content-wrapper{
    padding:24px 12px 18px 24px;
    font-size 12px
    position: relative
  }
  .avatar{
    display: inline-block
    vertical-align center}
    img
      border-radius 2px
  .content
    display: inline-block
    margin-left 16px
    vertical-align top
  .title{
    margin 2px 0 8px 0
  }
  .description{
    margin-bottom 10px
    line-height 12px
    font-size 12px
  }
  .brand{
    vertical-align top
    display inline-block
    width 30px
    height:18px
    bg-image('brand')
    background-size:30px 18px
    background-repeat no-repeat
  }
  .name{
    margin-left 6px
    font-size 16px
    line-height 18px
    font-weight bold
  }
  .description
    margin-bottom 10px
    line-height 12px
    font-size 12px
  .support
    .icon
      display inline-block
      vertical-align top
      width 12px
      height:12px
      margin-right 4px
      background-size 12px
      background-repeat no-repeat
      &.decrease
        bg-image('decrease_1')
      &.discount
        bg-image('discount_1')
      &.guarantee
        bg-image('guarantee_1')
      &.invoice
        bg-image('invoice_1')
      &.special
        bg-image('special_1')
    .text
      vertical-align top
  .support-count{
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      height 24px
      line-height 24px
      border-radius 14
      background rgba(0,0,0,0.2)
      text-align center
  }
  .count{
      font-size 10px
  }
  .icon-keyboard_arrow_right{
      font-size 10px
  }

  .bulletin-wrapper
    position relative
    height:28px
    line-height 28px
    padding 0 22px 0 12px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    background rgba(7,17,27,0.2)
    .bulletin-title
      display inline-block
      margin-top 8px
      vertical-align top
      width 22px
      height 12px
      bg-image('bulletin')
      background-size 22px
      background-repeat no-repeat
    .bulletin-text
      vertical-align top
      margin 0 4px
      font-size 10px
    .icon-keyboard_arrow_right
      position: absolute;
      font-size 10px
      right:12px
      top:8px
  .background
    position: absolute;
    top:0
    left:0
    width 100%
    height 100%
    z-index -1
    filter:blur(10px)
  .detail
    position: fixed;
    z-index: 100;
    top:0
    left 0
    width: 100%
    height 100%
    overflow hidden
    background rgba(7,17,27,0.8)
    .detail-wrapper
      min-height 100%
      height auto
      width 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          line-height 16px
          text-align center
          font-size 16px
          font-weight 700
        .star-wrapper
          margin-top 18px
          padding 2px 0
          text-align center
        /*.title
          display: flex
          width: 80%
          margin 30px auto 24px auto
          .line
            position: relative
            top: -6px
            flex：1
          border-bottom: 1px solid rgba(255,255,255,0.2)*!
          .text
            padding: 0 12px
            font-size: 14px*/
    .ClearFix
      display: inline-block
    .ClearFix:after
        content: "."
        display: block
        height: 0
        clear:both
        visibility hidden
    .detail-close
      position: relative
      width: 32px
      height:64px
      margin -64px auto 0 auto
      clear:both
      font-size 32px
      text-align center
  .m_title{
    display: flex;
    width: 80%
    margin 28px auto 24px auto
  }
  .bulletin{
    width: 80%
    margin 28px auto 24px auto
  }
  .m_line{
    flex: 1;
    position: relative
    top: -6px
    border-bottom: 1px solid rgba(255,255,255,0.2)
  }
  .m_text{
    padding: 0 12px
    font-size: 14px
    font-weight 700
  }
  .supports
    width 80%
    margin 0 auto
    .support-item
      padding:0 12px
      margin-bottom 12px
      font-size 0
      &:last-child
        margin-bottom 0
      .icon
        display: inline-block
        width: 16px
        height 16px
        vertical-align top
        margin-right 6px
        background-size 16px 16px
        background-repeat no-repeat
        &.decrease
          bg-image('decrease_2')
        &.discount
          bg-image('discount_2')
        &.guarantee
          bg-image('guarantee_2')
        &.invoice
          bg-image('invoice_2')
        &.special
          bg-image('special_2')
      .text
        line-height 12px
        font-size 12px
</style>

<template>
  <div>
    <ul class="father">
      <li class="item">
        <span>排名</span>
        <span>类型</span>
        <span>占比</span>
      </li>
      <li v-for="(item, index) in list" class="item">
        <span>{{index + 1}}</span>
        <span>{{item.name}}</span>
        <span>{{item.value}}%</span>
        <div class="bar">
          <div class="color-bar" :style="{width: item.value / 100 * 290 + 'px'}"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'bar-list',
    props: ['list']
  }
</script>

<style lang="scss" scoped>
  .father{
    padding-left: 25px;
    .item{
      position: relative;
      span{
        display: inline-block;
        width: 60px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        line-height: 52px;
      }
      .bar{
        height: 10px;
        width: 290px;
        position: absolute;
        left: 220px;
        top: 50%;
        background: #1d235f;
        margin-top: -5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        .color-bar{
          height: 10px;
          width: 290px;
          position: absolute;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
      }
      &:nth-child(2){
          .color-bar {background-color: #fc6767;}
      }
      &:nth-child(3){
        .color-bar {background-color: #13dae3;}
      }
      &:nth-child(4){
        .color-bar {background-color: #ffe400;}
      }
      &:nth-child(5){
        .color-bar {background-color: #35b1ff;}
      }
    }
  }
</style>

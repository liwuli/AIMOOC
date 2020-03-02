<template>
  <div>
    <ul class="right-cnt">
      <li class="bar-item"><span>排名</span><span class="type">类型</span><span class="type">占比</span></li>
      <li v-for="(item, index) in textList" class="bar-item">
        <span class="rank">
          <i>{{index + 1}}</i>
        </span>
        <span class="type">{{item}}</span>
        <span class="type">{{valueList[index]}}%</span>
        <div class="bar-cnt">
          <div class="color-bar">
            <div class="bar" :style="{width: valueList[index] / 100 * 278 + 'px'}"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'rankingFour',
    props: ['textList', 'valueList']
  }
</script>

<style lang="scss" scoped>
  .right-cnt {
    .bar-item {
      padding-left: 120px;
      display: flex;
      align-items: center;
      height: 50px;
      font-size: 16px;
      text-align: center;
      .bar-cnt {
        display: flex;
        align-items: center;
        height: 12px;
        margin-left: 10px;
        .bar {
          height: 100%;
          border-radius: 5px;
        }
        .color-bar {
          width: 278px;
          height: 100%;
          border-radius: 5px;
          background: #bfbfbf;
        }
        span{
          color: #141414;
          margin-left: 30px;
          font-size: 16px;
        }
      }
      &:nth-child(2) {
        .rank {
          border: 1px dashed #fc6767;
          i {
            background-color: #fc6767;
          }
        }
        .bar {
          background-color: #fc6767;
        }
      }
      &:nth-child(3) {
        .rank {
          border: 1px dashed #13dae3;
          i {
            background-color: #13dae3;
          }
        }
        .bar {
          background-color: #13dae3;
        }
      }
      &:nth-child(4) {
        .rank {
          border: 1px dashed #ffe400;
          i {
            background-color: #ffe400;
          }
        }
        .bar {
          background-color: #ffe400;
        }
      }
      &:nth-child(5) {
        .rank {
          border: 1px dashed #35b1ff;
          i {
            background-color: #35b1ff;
          }
        }
        .bar {
          background-color: #35b1ff;
        }
      }
    }
    .type {
      display: inline-block;
      margin: 0 10px;
      width: 60px;
    }
    .rank {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        font-style: normal;
      }
    }
  }
</style>

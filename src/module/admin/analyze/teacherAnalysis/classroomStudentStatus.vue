<template>
  <div>
    <ul class="right-cnt">
      <li v-for="(item, i) in sort" class="bar-item">
        <span class="rank">
          <i>{{i + 1}}</i>
        </span>
        <span class="type">{{item.type}}</span>
        <span class="type">{{item.num}}%</span>
        <div class="bar-cnt">
          <div class="color-bar">
            <div class="bar" :style="{width: item.num / 100 * 225 + 'px'}"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'teach-classroom-status',
    props: ['classroomStatus'],
    data () {
      return {
        sort: [],
        wordsNum: [
          { word: '', num: 0, type: '注意力' },
          { word: '', num: 0, type: '参与度' },
          { word: '', num: 0, type: '疑惑度' },
          { word: '', num: 0, type: '活跃度' }
        ]
      }
    },
    methods: {
      sortWords () {
        for (let i = 0; i < this.wordsNum.length; i++) {
          for (let j = 0; j < this.wordsNum.length; j++) {
           if (this.wordsNum[i].num > this.wordsNum[j].num) {
             [this.wordsNum[i], this.wordsNum[j] ] = [this.wordsNum[j], this.wordsNum[i] ]
           }
          }
        }
        this.sort = this.wordsNum
      }
    },
    computed: {
      /*
       * params: 无
       * return: 无
       * function: 关键词最大数量
       * */
      maxNum: function () {
        let max = 1
        this.wordsNum.forEach(element => {
          if (max < element.num) {
            max = element.num
          }
        })
        return max
      }
    }
  }
</script>

<style lang="scss" scoped>
  .right-cnt {
    margin: 90px auto 0;
    .bar-item {
      padding-left: 200px;
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
          width: 225px;
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
      &:nth-child(1) {
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
      &:nth-child(2) {
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
      &:nth-child(3) {
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
      &:nth-child(4) {
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

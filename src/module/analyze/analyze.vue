<template>
  <div class="app">
    <Ghead></Ghead>
    <div class="center">
      <div class="wrap">
        <div class="tab">智慧教学分析</div>
        <div class="content" :style="'min-height:'+minhei+'px'">
          <div class="part">
            <div class="left item" style="width: 210px;">
              <div class="option"><img src="/static/images/courseTxt.png" alt=""></div>
              <button type="button" class="circle">
                <img src="/static/images/courseImg.png" alt="">
              </button>
              <router-link to="courseContrast" class="btn">课程对比分析</router-link>
            </div>
            <div class="right item" style="width: 430px;">
              <div class="option"><img src="/static/images/teacherTxt.png" alt=""></div>
              <button type="button" class="circle">
                <img src="/static/images/teacherImg.png" alt="">
              </button>
              <div class="row" style="width: 340px;margin: 0 auto;">
                <router-link to="teacherAnalysis" class="btn left">教师教学情况</router-link>
                <router-link to="teacherContrast" class="btn right">教师对比分析</router-link>
              </div>
            </div>
          </div>
          <div class="part">
            <div class="left item" style="width: 210px;">
              <div class="option"><img src="/static/images/classTxt.png" alt=""></div>
              <button type="button" class="circle">
                <img src="/static/images/classImg.png" alt="">
              </button>
              <router-link to="classContrast" class="btn">班级对比分析</router-link>
            </div>
            <div class="right item" style="width: 430px;">
              <div class="option"><img src="/static/images/studentTxt.png" alt=""></div>
              <button type="button" class="circle">
                <img src="/static/images/sudentImg.png" alt="">
              </button>
              <div class="row" style="width: 340px;margin: 0 auto;">
                <router-link to="studentAnalysis" class="btn left">学生学习情况</router-link>
                <router-link to="studentContrast" class="btn right">学生对比分析</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'

  export default {
    name: 'analyze',
    components: {
      Ghead,
      Gfoot
    },
    data () {
      return {
        minhei: window.innerHeight - 165
      }
    }
  }
</script>

<style scoped>
  .app{
    background: #090B24;
  }
  .wrap{
    width: 1440px;
    margin: 0 auto;
  }
  .tab{
    height: 50px;
    line-height: 50px;
    text-indent: 30px;
    background: #283054;
    color: #00dfff;
    font-size: 20px;
    border-bottom: 1px solid #000;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .content{
    overflow: hidden;
    background: #171B41;
  }
  .part{
    width: 790px;
    height: 265px;
    margin: 70px auto 0;
  }
  .item{
    height: 100%;
    box-shadow: 0px 5px 15px 2px #101535;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    background: #181D45;
    text-align: center;
  }
  .option{
    font-size: 24px;
    line-height: 60px;
  }
  .circle{
    height: 90px;
    width: 90px;
    background: #101437;
    border: none;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-bottom: 40px;
  }
  .btn{
    display: block;
    width: 140px;
    height: 45px;
    line-height: 45px;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    border: 1px solid #00dfff;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    box-shadow: 0px 0px 10px rgba(0,223,255,0.8) inset,0px 0px 10px rgba(0,223,255,0.5);
    margin: 0 auto;
  }
  .left{float: left;}
  .right{float: right;}
</style>

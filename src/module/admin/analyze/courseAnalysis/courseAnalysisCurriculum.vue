<template>
  <div>
    <div class="mid-fix row">
      <div class="box floatleft" :style="contentStyle">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂整体行为分析</span></div>
        </div>
        <div style="height: 280px;">
          <div class="floatleft">
            <PieOutChart id="topPie" ref="topPie" :pieData="pieData1" :style="pieChartSize[0]"></PieOutChart>
          </div>
          <div class="floatright" style="width: 300px;height: 100%;">
            <div class="row" v-for="(item, index) in classBehavior" style="margin-top: 37px;">
              <img class="mid-img" :src="item.src" alt="">
              <div class="square"><span class="top-text">{{item.text}}</span><span class="btm-text">{{item.num}}%</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="box floatright" :style="contentStyle">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂信息化应用</span></div>
        </div>
        <div class="headline">多媒体使用率</div>
        <div style="height: 280px;">
          <ChartSingleDoughnut ref="midTopChart" id="mid-top-chart" :num="avgPoint" :palette="palette"></ChartSingleDoughnut>
        </div>
      </div>
    </div>
    <div class="mid-fix row">
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂互动情况</span></div>
        </div>
        <div style="height: 375px">
          <div class="floatleft" style="width: 785px;height: 80%;">
            <div class="headline">师生互动率</div>
            <ChartSingleDoughnut ref="midTopChart2" id="mid-top-chart2" :num="TSInteractionRate" :palette="palette"></ChartSingleDoughnut>
          </div>
          <div class="floatright" style="width: 785px;height: 100%;">
            <PieOutChart id="midPie" ref="midPie" :pieData="pieData2" :style="pieChartSize[1]"></PieOutChart>
          </div>
        </div>
      </div>
    </div>
    <div class="mid-fix row">
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>到勤率</span></div>
        </div>
        <div style="height: 500px">
          <SingleGraph id="bottomgraph" ref="bottomgraph" :graphValue="graphValue" :graphText="graphText" :titleTxt="titleTxt2" :size="graphstyle"></SingleGraph>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PieOutChart from '../echartsModule/pieOutChart'
  import ChartSingleDoughnut from '../echartsModule/chartSingleDoughnut'
  import SingleGraph from '../echartsModule/singleGraph'
  import {findLessonsEventInfo, getStudentAttendRateForIndex, getAttendRateForEveryLesson} from '../config/urlConfig'
  export default {
    name: 'courseAnalysisCurriculum',
    props: ['courseId'],
    components: {
      PieOutChart,
      ChartSingleDoughnut,
      SingleGraph
    },
    data () {
      return {
        avgPoint: 0,
        TSInteractionRate: 0,
        graphValue: [],
        graphText: [],
        behaviorRate: [0, 0],
        pieData1: [
          {name: '学生行为占有率', value: 0, label: {color: '#682b1f'}},
          {name: '老师语言率', value: 0, label: {color: '#0a545e'}},
          {name: '老师活动率', value: 0, label: {color: '#441241'}}
        ],
        pieData2: [
          {name: '一般性互动', value: 0, label: {color: '#0a545e'}},
          {name: '复杂性互动', value: 0, label: {color: '#682b1f'}},
          {name: '低效或无效互动', value: 0, label: {color: '#441241'}}
        ],
        palette: [],
        titleTxt2: ['学生到勤率'],
        graphstyle: {width: '1620px'},
        contentStyle: {height: '440px', width: '750px'},
        pieChartSize: [{height: '260px', width: '450px'}, {height: '300px', width: '450px'}],
        classBehavior: [{src: '/static/images/people.png', text: '老师行为占有率',num:0}, {src: '/static/images/masses.png', text: '学生行为占有率',num:0}]
      }
    },
    methods: {
      async findLessonsEventInfo () {
				try {
          const res = await this.axios.post(findLessonsEventInfo, {courseId: this.courseId})
          let obj = res.data.lessonsEventInfo          
          if (obj) {
            this.pieData1[0].value = Math.ceil((obj.studentEventRate || 0) * 100) / 100
            this.pieData1[1].value = Math.ceil((obj.teacherLanguageRate || 0) * (obj.teacherEventRate || 0)) / 100
            this.pieData1[2].value = Math.ceil((obj.teacherActionRate || 0) * (obj.teacherEventRate || 0)) / 100
						console.log(this.pieData1);
						 //老师行为占有率  学生行为占有率
						 this.classBehavior[0].num = Math.round(obj.teacherEventRate || 0)
						 this.classBehavior[1].num = Math.round(obj.studentEventRate || 0)

						 // var ActionRatesum = obj.teacherEventRate + obj.teacherLanguageRate + obj.studentEventRate + obj.studentLanguageRate;
						 // this.pieData1[0].value = (((obj.studentEventRate+obj.studentLanguageRate)/ActionRatesum || 0) * 100).toFixed(2);
						 // this.pieData1[1].value = ((obj.teacherLanguageRate/ActionRatesum || 0) * 100).toFixed(2)
						 // this.pieData1[2].value = ((obj.teacherEventRate/ActionRatesum || 0) * 100).toFixed(2)
						 //
						 //  //老师行为占有率  学生行为占有率
						 //  this.classBehavior[0].num = (((obj.teacherEventRate + obj.teacherLanguageRate)/ActionRatesum|| 0) * 100).toFixed(2)
						 //  this.classBehavior[1].num = (((obj.studentEventRate + obj.studentLanguageRate)/ActionRatesum|| 0) * 100).toFixed(2)

						 // this.behaviorRate[0] = obj.teacherEventRate || 0
						 // this.behaviorRate[1] = obj.studentEventRate || 0


            this.pieData2[0].value = Math.ceil(obj.normalInteraction || 0)
            this.pieData2[1].value = Math.ceil(obj.complexInteraction || 0)
            this.pieData2[2].value = Math.ceil(obj.invalidInteraction || 0)

						// 多媒体使用率
						this.avgPoint = (obj.multimediaRate || 0) ==0? 0 : obj.multimediaRate.toFixed(2)


						this.TSInteractionRate = Math.ceil((obj.TSInteractionRate || 0) * 100) / 100

						this.$refs.topPie && this.$refs.topPie.setEcharts()
						this.$refs.midPie && this.$refs.midPie.setEcharts()
          }
        } catch (err) {
          console.log(err)
        }
      },
      // async getStudentAttendRateForIndex () {
      //   try {
      //     const res = await this.axios.post(getStudentAttendRateForIndex, {courseId: this.courseId})
      //     //console.log(res)
      //     this.avgPoint = (res.data.avgPoint || 0) * 100
      //   } catch (err) {
      //     console.log(err)
      //   }
      // },
      async getAttendRateForEveryLesson () {
        try {
          const res = await this.axios.post(getAttendRateForEveryLesson, {courseId: this.courseId})
          console.log(res)
          let arr = res.data.data || []
          for (let i = 0; i < arr.length; i++) {
            this.graphValue[i] = Math.ceil((arr[i].attendAvg || 0) * 100) / 100
            this.graphText[i] = arr[i].lessonName || ''
          }
          this.$refs.bottomgraph && this.$refs.bottomgraph.setEcharts()
        } catch (err) {
          console.log(err)
        }
      }
    },
    watch: {
      courseId () {

        if (this.courseId) {
          this.findLessonsEventInfo()
          // this.getStudentAttendRateForIndex()
          this.getAttendRateForEveryLesson()
        }
      }
    },
    mounted () {

      if (this.courseId) {
        this.findLessonsEventInfo()
        // this.getStudentAttendRateForIndex()
        this.getAttendRateForEveryLesson()
      }
    }
  }
</script>

<style scoped lang="scss">
  .headline{
    text-align: center;
    font-size: 16px;
  }
  .square{
    float: left;
    width: 168px;
    height: 85px;
    background: #f9f9f9;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    .top-text{
      display: inline-block;
      width: 100%;
      height: 50%;
      text-align: center;
      color: #000;
      font-size: 18px;
      line-height: 42px;
    }
    .btm-text{
      display: inline-block;
      width: 100%;
      height: 50%;
      text-align: center;
      color: #3198fa;
      font-size: 24px;
      line-height: 42px;
    }
  }
  .mid-img{
    width: 34px;
    height: 39px;
    margin: 22px 20px 0 0;
    float: left;
  }
</style>

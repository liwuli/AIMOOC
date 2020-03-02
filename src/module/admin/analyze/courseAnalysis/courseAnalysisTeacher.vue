<template>
  <div>
    <div class="mid-fix row">
      <div class="box floatleft" :style="contentStyle">
        <div class="header">
          <div class="title"><span class="card"></span><span>教学模式</span></div>
        </div>
        <div>
          <RankingFour :textList="textList" :valueList="valueList"></RankingFour>
        </div>
      </div>
      <div class="box floatright" :style="contentStyle">
        <div class="header">
          <div class="title"><span class="card"></span><span>教师行为分析</span></div>
        </div>
        <div class="row">
          <div class="floatleft" v-for="(item, index) in behaviorRateText" :style="index===0?'':'margin-left: 30px;'">
            <img class="mid-img" :src="item.src" alt="">
            <div class="square"><span class="top-text">{{item.text}}</span><span class="btm-text">{{behaviorRateValue[index]}}%</span></div>
          </div>
        </div>
        <div>
          <PieOutChart id="teacherBehavior" ref="teacherBehavior" :pieData="pieData1" :style="pieChartSize[1]"></PieOutChart>
        </div>
      </div>
    </div>
    <div class="mid-fix row">
      <div class="box floatleft" :style="contentStyle">
        <div class="header">
          <div class="title"><span class="card"></span><span>教师轨迹</span></div>
        </div>
        <div>
          <PieOutChart id="teacherTrack" ref="teacherTrack" :pieData="pieData2" :style="pieChartSize[1]"></PieOutChart>
        </div>
      </div>
      <div class="box floatright" :style="contentStyle">
        <div class="header">
          <div class="title"><span class="card"></span><span>教师情绪</span></div>
        </div>
        <div style="height: 320px;">
          <Radar id="radar" ref="radar" :valueList="teacherEmotion" :indicator="indicator"></Radar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PieOutChart from '../echartsModule/pieOutChart'
  import Radar from '../echartsModule/radar01'
  import RankingFour from './rankingFour'
  import {getTeachingModel, findLessonsEventInfo} from '../config/urlConfig'
  export default {
    name: 'courseAnalysisTeacher',
    props: ['courseId'],
    components: {
      RankingFour,
      PieOutChart,
      Radar
    },
    data () {
      return {
        valueList: [0, 0, 0, 0],
        textList: ['对话型', '练习型', '混合型', '讲授型'],
        teacherEmotion: [0, 0, 0, 0, 0],
        indicator: [{text: '激昂'}, {text: '愤怒'}, {text: '常态'}, {text: '消极'}, {text: '积极'}],
        behaviorRateValue: [0, 0, 0],
        behaviorRateText: [
          {src: '/static/images/people.png', text: '老师行为占有率'},
          {src: '/static/images/message.png', text: '老师语言率'},
          {src: '/static/images/activity.png', text: '老师活动率'}
        ],
        pieData1: [
          {value: 0, name: '讲授'},
          {value: 0, name: '提问'},
          {value: 0, name: '板书'},
          {value: 0, name: '演示'},
          {value: 0, name: '个别指导'},
          {value: 0, name: '多媒体使用'}
        ],
        pieData2: [
          {value: 0, name: '黑板区域'},
          {value: 0, name: '学生区域'},
          {value: 0, name: '大屏/投影区域'}
        ],
        contentStyle: {height: '440px', width: '750px'},
        pieChartSize: [{height: '260px', width: '450px'}, {height: '280px', width: '450px'}]
      }
    },
    methods: {
      async getTeachingModel () {
        try {
          const res = await this.axios.post(getTeachingModel, {courseId: this.courseId})
					var arr = []
          res.data.data[0] && (this.textList = res.data.data[0])
          if(res.data.data[1]){
						res.data.data[1].forEach((item)=>{
							arr.push(item==0 ? 0 :parseFloat(item).toFixed(2))
						})
					this.valueList = arr
					}
        } catch (err) {
          console.log(err)
        }
      },
      async findLessonsEventInfo () {
        try {
          const res = await this.axios.post(findLessonsEventInfo, {courseId: this.courseId})
          console.log(res)
          if (res.data.lessonsEventInfo) {
            let obj = res.data.lessonsEventInfo
						
						var ActionRatesum = obj.teacherEventRate + obj.teacherLanguageRate + obj.studentEventRate + obj.studentLanguageRate;
            
						let arr = []
            //老师行为分析
						// arr[0] = (((obj.teacherEventRate + obj.teacherLanguageRate)/ActionRatesum|| 0) * 100).toFixed(2)
						// arr[1] = ((obj.teacherLanguageRate/ActionRatesum || 0) * 100).toFixed(2)
						// arr[2] = ((obj.teacherEventRate/ActionRatesum || 0) * 100).toFixed(2)
						arr[0] = Math.ceil((obj.teacherEventRate || 0) * 100) / 100
            arr[1] = Math.ceil((obj.teacherLanguageRate || 0) * 100) / 100
            arr[2] = Math.ceil((obj.teacherActionRate || 0) * 100) / 100
						//教师轨迹
            this.pieData2[0].value = Math.ceil((obj.blackboardArea || 0) * 100) / 100
            this.pieData2[1].value = Math.ceil((obj.studentArea || 0) * 100) / 100
            this.pieData2[2].value = Math.ceil((obj.screenArea || 0) * 100) / 100
           
						if (obj.teacherEvent) {
              let subset = obj.teacherEvent
              this.pieData1[0].value = subset.event1 || 0
              this.pieData1[1].value = subset.event2 || 0
              this.pieData1[2].value = subset.event3 || 0
              this.pieData1[3].value = subset.event4 || 0
              this.pieData1[4].value = subset.event6 || 0
              this.pieData1[5].value = subset.event7 || 0
              this.$refs.teacherBehavior && this.$refs.teacherBehavior.setEcharts()
            }
            if (obj.teacherEmotion) {
              let subset = obj.teacherEmotion
              this.teacherEmotion[0] = subset.emotion0 || 0
              this.teacherEmotion[1] = subset.emotion1 || 0
              this.teacherEmotion[2] = subset.emotion2 || 0
              this.teacherEmotion[3] = subset.emotion3 || 0
              this.teacherEmotion[4] = subset.emotion4 || 0
              this.$refs.radar && this.$refs.radar.setEcharts()
            }
            this.$refs.teacherTrack && this.$refs.teacherTrack.setEcharts()
            this.behaviorRateValue = arr
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    watch: {
      courseId () {
        if (this.courseId) {
          this.getTeachingModel()
          this.findLessonsEventInfo()
        }
      }
    },
    mounted () {
      if (this.courseId) {
        this.getTeachingModel()
        this.findLessonsEventInfo()
      }
    }
  }
</script>

<style scoped lang="scss">
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
    margin: 22px 20px 0 0;
    float: left;
  }
</style>

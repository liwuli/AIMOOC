<template>
  <div>
    <div class="mid-fix row">
      <div class="box floatleft" :style="contentStyle">
        <div class="header">
          <div class="title"><span class="card"></span><span>学生行为分析</span></div>
        </div>
        <div>
          <PieOutChart id="studentEvent" ref="studentEvent" :pieData="pieData" :style="pieChartSize[1]"></PieOutChart>
        </div>
      </div>
      <div class="box floatright" :style="contentStyle">
        <div class="header">
          <div class="title"><span class="card"></span><span>学生情绪</span></div>
        </div>
        <div style="height: 320px;">
          <Radar id="radar" ref="radar" :valueList="studentEmotion" :indicator="indicator"></Radar>
        </div>
      </div>
    </div>
    <div class="mid-fix row">
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂学生状态</span></div>
        </div>
        <div style="height: 500px">
          <ClassroomStudentStatusLine ref="classroomStudentStatusLine"></ClassroomStudentStatusLine>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ClassroomStudentStatusLine from '../teacherAnalysis/classroomStudentStatusLine'
  import PieOutChart from '../echartsModule/pieOutChart'
  import Radar from '../echartsModule/radar01'
  import {getStudentStatusForEveryLesson, findLessonsEventInfo} from '../config/urlConfig'
  export default {
    name: 'courseAnalysisTeacher',
    props: ['courseId'],
    components: {
      ClassroomStudentStatusLine,
      PieOutChart,
      Radar
    },
    data () {
      return {
        studentEmotion: [0, 0, 0, 0, 0],
        indicator: [{text: '激昂'}, {text: '愤怒'}, {text: '常态'}, {text: '消极'}, {text: '积极'}],
        pieData: [
          {value: 0, name: '讨论'},
          {value: 0, name: '讲读演'},
          {value: 0, name: '听讲或思考'},
          {value: 0, name: '阅读'},
          {value: 0, name: '笔记'},
          {value: 0, name: '媒体使用'}
        ],
        pieChartSize: [{height: '260px', width: '450px'}, {height: '280px', width: '450px'}],
        contentStyle: {height: '440px', width: '750px'}
      }
    },
    methods: {
      async findLessonsEventInfo () {
        try {
          const res = await this.axios.post(findLessonsEventInfo, {courseId: this.courseId})
          console.log(res)
          if (res.data.lessonsEventInfo) {
            if (res.data.lessonsEventInfo.studentEvent) {
              let obj = res.data.lessonsEventInfo.studentEvent
              this.pieData[0].value = obj.event1 || 0
              this.pieData[1].value = obj.event2 || 0
              this.pieData[2].value = obj.event3 || 0
              this.pieData[3].value = obj.event4 || 0
              this.pieData[4].value = obj.event6 || 0
              this.pieData[5].value = obj.event7 || 0
              this.$refs.studentEvent && this.$refs.studentEvent.setEcharts()
            }
            if (res.data.lessonsEventInfo.studentEmotion) {
              let obj = res.data.lessonsEventInfo.studentEmotion
              this.studentEmotion[0] = obj.emotion0 || 0
              this.studentEmotion[1] = obj.emotion1 || 0
              this.studentEmotion[2] = obj.emotion2 || 0
              this.studentEmotion[3] = obj.emotion3 || 0
              this.studentEmotion[4] = obj.emotion4 || 0
              
              this.$refs.radar && this.$refs.radar.setEcharts()
            }
          }
        } catch (err) {
          console.log(err)
        }
      },
      async getStudentStatusForEveryLesson () {
        try {
          const res = await this.axios.post(getStudentStatusForEveryLesson, {courseId: this.courseId})
          console.log(res)
          let arr = res.data.data
          this.$refs.classroomStudentStatusLine.concentrateRate = []
          this.$refs.classroomStudentStatusLine.participateRate = []
          this.$refs.classroomStudentStatusLine.doubtRate = []
          this.$refs.classroomStudentStatusLine.activityRate = []
          this.$refs.classroomStudentStatusLine.xLengend = []
          this.xLengend = []
          for (let i = 0; i < arr.length; i++) {
            this.$refs.classroomStudentStatusLine.concentrateRate.push(arr[i].concentrateRate || '')
            this.$refs.classroomStudentStatusLine.participateRate.push(arr[i].participateRate || '')
            this.$refs.classroomStudentStatusLine.doubtRate.push(arr[i].doubtRate || '')
            this.$refs.classroomStudentStatusLine.activityRate.push(arr[i].activityRate || '')
            this.$refs.classroomStudentStatusLine.xLengend.push(arr[i].lessonName || '')
          }
          this.$refs.classroomStudentStatusLine.initBottomChart()
        } catch (err) {
          console.log(err)
        }
      }
    },
    watch: {
      courseId () {
        if (this.courseId) {
          this.findLessonsEventInfo()
          this.getStudentStatusForEveryLesson()
        }
      }
    },
    mounted () {
      if (this.courseId) {
        this.findLessonsEventInfo()
        this.getStudentStatusForEveryLesson()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>

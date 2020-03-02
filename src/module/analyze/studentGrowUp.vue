<template>
  <div class="teacher-grow-up">
    <div class="center line">
      <div class="title">
        <span class="card"></span>
        <span class="text">课上学生状态曲线</span>
      </div>
      <div class="chart">
        <classroom-student-status-line ref="classroomStudentStatusLine"></classroom-student-status-line>
      </div>
    </div>
    <div class="btm line">
      <div class="title">
        <span class="card"></span>
        <span class="text">学生到勤曲线</span>
      </div>
      <div class="chart">
        <SingleGraph id="graph" ref="tAndSInteract" :info="graphinfo" :titleTxt="titleTxt2" :size="graphstyle"></SingleGraph>
      </div>
    </div>
  </div>
</template>

<script>
  import SingleGraph from './echartsModule/singleGraph'
  import classroomStudentStatusLine from './teacherAnalysis/classroomStudentStatusLine'
  import { findStudentGrowuprecords } from '@/module/analyze/config'

  export default {
    name: 'student-grow-up',
    props: ['studentId', 'maxWeekNo', 'termId'],
    components: {
      SingleGraph,
      classroomStudentStatusLine
    },
    data () {
      return {
        graphinfo: [],
        graphstyle: {height: '400px'},
        titleTxt2: ['学生到勤率'],
        xLengend: []
      }
    },
    methods: {
      getAnalysisInfo () {
        let _this = this
        this.axios({
          method: 'POST',
          data: {
            userId: _this.studentId,
            termId: _this.termId,
            maxWeekNo: _this.maxWeekNo
          },
          url: findStudentGrowuprecords
        })
          .then((data) => {
            const res = data.data
            if (res && res.code === 200) {
              let list = res.data.info
              this.$refs.classroomStudentStatusLine.concentrateRate = []
              this.$refs.classroomStudentStatusLine.participateRate = []
              this.$refs.classroomStudentStatusLine.doubtRate = []
              this.$refs.classroomStudentStatusLine.activityRate = []
              this.xLengend = []
              for (let i = 0; i < list.length; i++) {
                this.$refs.classroomStudentStatusLine.concentrateRate.push(list[i].concentrateRate)
                this.$refs.classroomStudentStatusLine.participateRate.push(list[i].participateRate)
                this.$refs.classroomStudentStatusLine.doubtRate.push(list[i].doubtRate)
                this.$refs.classroomStudentStatusLine.activityRate.push(list[i].activityRate)
                this.xLengend.push('第' + (i + 1) + '周')
                let topOften = (list[i].actual / list[i].allowed) * 100
                this.graphinfo.push(topOften)
              }
              this.$refs.classroomStudentStatusLine.xLengend = this.xLengend
              this.$refs.tAndSInteract.xAxis = this.xLengend
              this.$refs.classroomStudentStatusLine.initBottomChart()
              this.$refs.tAndSInteract.initBottomChart()
            }
          })
      }
    },
    mounted () {
      if (this.studentId && this.maxWeekNo && this.termId) {
        this.getAnalysisInfo()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .teacher-grow-up {
    width: 1620px;
    margin: 0 auto;
    .line {
      background: #fff;
      margin: 0 0 20px 0;
      width: 100%;
      height: 580px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
      .title {
        margin: 30px 0 0 30px;
        height: 20px;
        .card {
          display: inline-block;
          width: 6px;
          height: 100%;
          background: linear-gradient(to bottom, #aad7ff , #349afa); /* 标准的语法 */
          vertical-align: middle;
        }
        .text {
          margin-left: 10px;
          color: #000;
          font-size: 16px;
          vertical-align: middle;
        }
      }
      .point {
        margin-top: 54px;
        height: 30px;
        text-align: right;
        padding-right: 85px;
        .legend {
          display: inline-block;
          margin-right: 65px;
          .circle {
            display: inline-block;
            margin-right: 10px;
            width: 14px;
            height: 14px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            vertical-align: middle;
            &.purple {
              background: #6b79e6;
            }
            &.blue {
              background: #1e7fe6;
            }
            &.green {
              background: #84d44f;
            }
            &.yellow {
              background: #fdd460;
            }
            &.gray {
              background: #c25f01;
            }
            &.pink {
              background: #db6be9;
            }
            &.red {
              background: #d51f1c;
            }
            &.black {
              background: #35302c;
            }
          }
          .desc {
            vertical-align: middle;
            font-size: 14px;
            color: #000;
          }
        }
      }
      .chart {
        width: 1600px;
        height: 450px;
        margin: 50px auto;
      }
    }
  }
</style>

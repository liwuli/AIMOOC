<template>
  <div class="teacher-grow-up">
    <div class="top line">
      <div class="title">
        <span class="card"></span>
        <span class="text">教师行为分析曲线</span>
      </div>
      <div class="chart">
        <teacher-behavior-line ref="teacherBehaviorLine"></teacher-behavior-line>
      </div>
    </div>
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
        <span class="text">师生互动情况曲线</span>
      </div>
      <div class="chart">
        <t-and-s-interact ref="tAndSInteract"></t-and-s-interact>
      </div>
    </div>
  </div>
</template>

<script>
  import TAndSInteract from './TAndSInteract'
  import classroomStudentStatusLine from './classroomStudentStatusLine'
  import teacherBehaviorLine from './teacherBehaviorLine'
  import { getTeacherActAnalysis, getOnClassStudentsStatus, getInteractionRateInfos } from '@/module/analyze/config'

  export default {
    name: 'teacher-grow-up',
    props: ['teacherId', 'maxWeek', 'termId'],
    components: {
      TAndSInteract,
      classroomStudentStatusLine,
      teacherBehaviorLine
    },
    data () {
      return {
        xLengend: []
      }
    },
    methods: {
      getData () {
        let _this = this
        if (this.teacherId && this.termId) {
          _this.axios({
            method: 'POST',
            url: getTeacherActAnalysis,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId,
              'maxWeekNo': _this.maxWeek
            }
          })
            .then((res) => {
              let data = res.data.data
              this.$refs.teacherBehaviorLine.teacherEventRate = []
              this.$refs.teacherBehaviorLine.languageRate = []
              this.$refs.teacherBehaviorLine.actionRate = []
              this.xLengend = []
              for (let i = 0; i < data.length; i++) {
                this.$refs.teacherBehaviorLine.teacherEventRate.push(data[i].teacherEventRate)
                this.$refs.teacherBehaviorLine.languageRate.push(data[i].languageRate)
                this.$refs.teacherBehaviorLine.actionRate.push(data[i].actionRate)
                this.xLengend.push('第' + (i + 1) + '周')
              }
              this.$refs.teacherBehaviorLine.xLengend = this.xLengend
              this.$refs.teacherBehaviorLine.initBottomChart()
            })
            .catch(() => {
              console.log('err1')
            })


          _this.axios({
            method: 'POST',
            url: getOnClassStudentsStatus,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId,
              'maxWeekNo': _this.maxWeek
            }
          })
            .then((res) => {
              let data = res.data.data
              this.$refs.classroomStudentStatusLine.concentrateRate = []
              this.$refs.classroomStudentStatusLine.participateRate = []
              this.$refs.classroomStudentStatusLine.doubtRate = []
              this.$refs.classroomStudentStatusLine.activityRate = []
              this.xLengend = []
              for (let i = 0; i < data.length; i++) {
                this.$refs.classroomStudentStatusLine.concentrateRate.push(data[i].concentrateRate)
                this.$refs.classroomStudentStatusLine.participateRate.push(data[i].participateRate)
                this.$refs.classroomStudentStatusLine.doubtRate.push(data[i].doubtRate)
                this.$refs.classroomStudentStatusLine.activityRate.push(data[i].activityRate)
                this.xLengend.push('第' + (i + 1) + '周')
              }

              this.$refs.classroomStudentStatusLine.xLengend = this.xLengend
              this.$refs.classroomStudentStatusLine.initBottomChart()
            })
            .catch(() => {
              console.log('err2')
            })

          _this.axios({
            method: 'POST',
            url: getInteractionRateInfos,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId,
              'maxWeekNo': _this.maxWeek
            }
          })
            .then((res) => {
              let data = res.data.data
              this.$refs.tAndSInteract.avgInteractionRate = []
              this.xLengend = []
              for (let i = 0; i < data.length; i++) {
                this.$refs.tAndSInteract.avgInteractionRate.push(data[i].value)
                this.xLengend.push('第' + (i + 1) + '周')
              }

              this.$refs.tAndSInteract.xLengend = this.xLengend
              this.$refs.tAndSInteract.initBottomChart()
            })
            .catch(() => {
              console.log('err3')
            })
        }
      }
    },
    mounted () {
      this.getData()
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

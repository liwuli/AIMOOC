<template>
  <div class="teach-quality">
    <div class="top">
      <div class="half shadow">
        <div class="title">
          <span class="card"></span>
          <span class="text">教学模式</span>
        </div>
        <div class="teach-style-cnt">
          <teach-style :teachStyleInfo="teachStyleInfo"></teach-style>
        </div>
      </div>
      <div class="half block">
        <div class="quartern shadow">
          <div class="title">
            <span class="card"></span>
            <span class="text">教师出勤</span>
          </div>
          <div class="circle-chart-cnt">
            <teacher-arrival-status :teacherArrivalStatus="teacherArrivalStatus"></teacher-arrival-status>
            <span class="desc">{{teacherArrivalStatus}}%</span>
          </div>
        </div>
        <div class="quartern shadow">
          <div class="title">
            <span class="card"></span>
            <span class="text">教师情绪</span>
          </div>
          <div class="emotion-cnt">
            <teacher-emotion ref="radarChart" :emotionList="emotionList"></teacher-emotion>
          </div>
        </div>
      </div>
    </div>
    <div class="center shadow">
      <div class="title">
        <span class="card"></span>
        <span class="text">教师行为分析</span>
      </div>
      <div class="left">
        <teacher-behavior :data="teacherBehavior" ref="teacherBehavior"></teacher-behavior>
      </div>
      <div class="right">
        <div class="item people">
          <div class="square">
            <span class="top-text">老师行为占有率</span>
            <span class="btm-text">{{teacherBehaviorOccupancy}}%</span>
          </div>
        </div>
        <div class="item message">
          <div class="square">
            <span class="top-text">老师语言率</span>
            <span class="btm-text">{{teacherTalkOccupancy}}%</span>
          </div>
        </div>
        <div class="item activity">
          <div class="square">
            <span class="top-text">老师活动率</span>
            <span class="btm-text">{{teacherActivityOccupancy}}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="btm">
      <div class="half shadow">
        <div class="title">
          <span class="card"></span>
          <span class="text">教师轨迹</span>
        </div>
        <div class="teacher-path">
          <teacher-path-chart :teacherPathData="teacherPathData" ref="teacherPathChart"></teacher-path-chart>
        </div>
      </div>
      <div class="half shadow">
        <div class="title">
          <span class="card"></span>
          <span class="text">课堂学生状态</span>
        </div>
        <div class="classroom-status">
          <classroom-student-status :classroomStatus="classroomStatus" ref="classroomStatus"></classroom-student-status>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import classroomStudentStatus from './classroomStudentStatus'
  import teacherPathChart from './teacherPathChart'
  import teacherBehavior from './teacherBehavior'
  import teacherEmotion from './teacherEmotion'
  import teachStyle from './teachStyle'
  import teacherArrivalStatus from './teacherArrivalStatus'
  import { getTeachingModel, getAttendanceRateForTeacher, findLessonsEventInfo, getOnClassStudentsStatusForTeacher } from '@/module/admin/analyze/config'

  export default {
    name: 'teach-quality',
    props: ['teacherId', 'termId'],
    components: {
      classroomStudentStatus,
      teacherPathChart,
      teacherBehavior,
      teacherEmotion,
      teacherArrivalStatus,
      teachStyle
    },
    data () {
      return {
        teacherPathData: [0, 0, 0],
        teacherBehaviorOccupancy: 0, // 老师行为占有率
        teacherTalkOccupancy: 0, // 老师语言率
        teacherActivityOccupancy: 0, // 老师活动率
        teacherBehavior: [
          {value: 0, name: '讲授'},
          {value: 0, name: '提问'},
          {value: 0, name: '板书'},
          {value: 0, name: '演示或展示'},
          {value: 0, name: '观察巡视'},
          {value: 0, name: '个别指导'},
          {value: 0, name: '媒体使用'}
        ],
        emotionList: [0, 0, 0, 0, 0], // 情绪
        teacherArrivalStatus: 0, // 老师出勤
        teachStyleInfo: [], // 教学模式
        classroomStatus: [0, 0, 0, 0] // 课堂学生状态
      }
    },
    methods: {
      getData () {
        let _this = this
        if (_this.teacherId && _this.termId) {

          _this.axios({
            method: 'POST',
            url: getTeachingModel,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId
            }
          })
            .then((res) => {
              let data = res.data
              _this.teachStyleInfo = data.data
            })
            .catch(() => {
              console.log('err1')
            })

          _this.axios({
            method: 'POST',
            url: getAttendanceRateForTeacher,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId
            }
          })
            .then((res) => {
              let data = res.data.data
              this.teacherArrivalStatus = data * 100
            })
            .catch(() => {
              console.log('err2')
            })

          _this.axios({
            method: 'POST',
            url: findLessonsEventInfo,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId
            }
          })
            .then((res) => {
              let data = res.data
              if (data && data.isSuccess === 1) {
                let teacherEmotion = data.lessonsEventInfo.teacherEmotion
                if (teacherEmotion) {
                  _this.emotionList[0] = teacherEmotion.emotion0
                  _this.emotionList[1] = teacherEmotion.emotion1
                  _this.emotionList[2] = teacherEmotion.emotion2
                  _this.emotionList[3] = teacherEmotion.emotion3
                  _this.emotionList[4] = teacherEmotion.emotion4
                  _this.$refs.radarChart.initRadarChart()
                }
                let teacherEvent = data.lessonsEventInfo.teacherEvent
                if (teacherEvent) {
                  _this.teacherBehavior[0].value = teacherEvent.event1 * 100
                  _this.teacherBehavior[1].value = teacherEvent.event2 * 100
                  _this.teacherBehavior[2].value = teacherEvent.event3 * 100
                  _this.teacherBehavior[3].value = teacherEvent.event4 * 100
                  _this.teacherBehavior[4].value = teacherEvent.event5 * 100
                  _this.teacherBehavior[5].value = teacherEvent.event6 * 100
                  _this.teacherBehavior[6].value = teacherEvent.event7 * 100
                  for (let i = 0; i < _this.teacherBehavior.length; i++) {
                    if (_this.teacherBehavior[i].value === 0) {
                      _this.teacherBehavior[i] = null
                    }
                  }
                  _this.$refs.teacherBehavior.initCircleChart()
                }
                data.lessonsEventInfo.teacherEventRate && (_this.teacherBehaviorOccupancy = Math.round(data.lessonsEventInfo.teacherEventRate * 100) / 100)
                data.lessonsEventInfo.teacherLanguageRate && (_this.teacherTalkOccupancy = Math.round(data.lessonsEventInfo.teacherLanguageRate * 100) / 100)
                data.lessonsEventInfo.teacherActionRate && (_this.teacherActivityOccupancy = Math.round(data.lessonsEventInfo.teacherActionRate * 100) / 100)

                data.lessonsEventInfo.blackboardArea && (_this.teacherPathData[0] = Math.round(data.lessonsEventInfo.blackboardArea * 100) / 100)
                data.lessonsEventInfo.screenArea && (_this.teacherPathData[1] = Math.round(data.lessonsEventInfo.screenArea * 100) / 100)
                data.lessonsEventInfo.studentCoverRate && (_this.teacherPathData[2] = Math.round(data.lessonsEventInfo.studentCoverRate * 100) / 100)
                this.$refs.teacherPathChart.setEcharts()
              }
            })
            .catch(() => {
              console.log('err3')
            })

          _this.axios({
            method: 'POST',
            url: getOnClassStudentsStatusForTeacher,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId
            }
          })
            .then((res) => {
              let data = res.data.data
              _this.classroomStatus[0] = Math.round(data.concentrateRate * 100)
              _this.classroomStatus[1] = Math.round(data.participateRate * 100)
              _this.classroomStatus[2] = Math.round(data.doubtRate * 100)
              _this.classroomStatus[3] = Math.round(data.activityRate * 100)
              this.$refs.classroomStatus.wordsNum[0].num = _this.classroomStatus[0]
              this.$refs.classroomStatus.wordsNum[1].num = _this.classroomStatus[1]
              this.$refs.classroomStatus.wordsNum[2].num = _this.classroomStatus[2]
              this.$refs.classroomStatus.wordsNum[3].num = _this.classroomStatus[3]
              this.$refs.classroomStatus.sortWords()
            })
            .catch(() => {
              console.log('err4')
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
  div{box-sizing: border-box}
  .teach-quality {
    width: 1620px;
    margin: 0 auto;
    .shadow {
      background: #fff;
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
    }
    .top {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 410px;
      margin: 20px 0;
      .half {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 800px;
        height: 100%;
        .teach-style-cnt {
          position: absolute;
          height: calc(100% - 110px);
          bottom: 0;
          width: 100%;
        }
        .quartern {
          position: relative;
          width: 390px;
          height: 100%;
          .circle-chart-cnt, .emotion-cnt {
            position: absolute;
            width: 100%;
            height: 340px;
            bottom: 0;
            .desc {
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%, -50%);
              -moz-transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              -o-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              color: #2f98fc;
              font-size: 30px;
            }
          }
        }
      }
    }
    .center {
      width: 100%;
      height: 440px;
      margin: 0 0 20px 0;
      .left {
        float: left;
        width: 500px;
        height: 300px;
        margin-top: 40px;
        margin-left: 200px;
      }
      .right {
        float: right;
        height: 90px;
        margin-left: 80px;
        margin-top: 130px;
        .item {
          display: inline-block;
          width: 240px;
          height: 100%;
          margin-right: 35px;
          &.people {
            background: url("/static/images/people.png") no-repeat left center;
          }
          &.message {
            background: url("/static/images/message.png") no-repeat left center;
          }
          &.activity {
            background: url("/static/images/activity.png") no-repeat left center;
          }
          .square {
            margin-left: 55px;
            width: 168px;
            height: 100%;
            background: #f9f9f9;
            border: 1px solid #d9d9d9;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            .top-text {
              display: inline-block;
              width: 100%;
              height: 50%;
              text-align: center;
              color: #000;
              font-size: 18px;
              line-height: 42px;
            }
            .btm-text {
              display: inline-block;
              width: 100%;
              height: 50%;
              text-align: center;
              color: #3198fa;
              font-size: 24px;
              line-height: 42px;
            }
          }
        }
      }
    }
    .btm {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 410px;
      margin: 20px 0;
      .half {
        width: 800px;
        height: 100%;
        .teacher-path {
          width: 590px;
          height: 300px;
          margin: 50px auto 0;
        }
      }
    }
  }
</style>

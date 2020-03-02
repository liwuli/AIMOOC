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
        <div class="line people">
          <div class="square">
            <span class="top-text">老师行为占有率</span>
            <span class="btm-text">{{teacherBehaviorOccupancy}}%</span>
          </div>
        </div>
        <div class="line message">
          <div class="square">
            <span class="top-text">老师语言率</span>
            <span class="btm-text">{{teacherTalkOccupancy}}%</span>
          </div>
        </div>
        <div class="line activity">
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
  import { getTeachingModel, getAttendanceRateForTeacher, findLessonsEventInfo, getOnClassStudentsStatusForTeacher } from '@/module/analyze/config'

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
              let data = res.data.data || 1
              this.teacherArrivalStatus = Math.round(data * 10000) / 100
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
              let obj = data.lessonsEventInfo || {}

							// var ActionRatesum = obj.teacherEventRate + obj.teacherLanguageRate + obj.studentEventRate + obj.studentLanguageRate;
							//
							// 老师行为分析
							// _this.teacherBehaviorOccupancy =(((obj.teacherEventRate + obj.teacherLanguageRate)/ActionRatesum|| 0) * 100).toFixed(2)
							// _this.teacherTalkOccupancy = ((obj.teacherLanguageRate/ActionRatesum || 0) * 100).toFixed(2)
							// _this.teacherActivityOccupancy = ((obj.teacherEventRate/ActionRatesum || 0) * 100).toFixed(2)
							//老师行为分析
              _this.teacherBehaviorOccupancy = Math.round((obj.teacherEventRate || 0) * 100) / 100
              _this.teacherTalkOccupancy = Math.round((obj.teacherLanguageRate || 0) * 100) / 100
              _this.teacherActivityOccupancy = Math.round((obj.teacherActionRate || 0) * 100) / 100

              let teacherEvent = obj.teacherEvent || {}
              _this.teacherBehavior[0].value = (teacherEvent.event1 || 0) * 100
              _this.teacherBehavior[1].value = (teacherEvent.event2 || 0) * 100
              _this.teacherBehavior[2].value = (teacherEvent.event3 || 0) * 100
              _this.teacherBehavior[3].value = (teacherEvent.event4 || 0) * 100
              _this.teacherBehavior[4].value = (teacherEvent.event5 || 0) * 100
              _this.teacherBehavior[5].value = (teacherEvent.event6 || 0) * 100
              _this.teacherBehavior[6].value = (teacherEvent.event7 || 0) * 100
              for (let i = 0; i < _this.teacherBehavior.length; i++) {
                if (_this.teacherBehavior[i].value === 0) {
                  _this.teacherBehavior[i].value = null
                }
              }
              _this.$refs.teacherBehavior.initCircleChart()
              if (data && data.isSuccess === 1) {
                let teacherEmotion = data.lessonsEventInfo.teacherEmotion
                let arr = []
                _this.emotionList = [0, 0, 0, 0, 0]
                if (teacherEmotion) {
                  arr[0] = teacherEmotion.emotion0
                  arr[1] = teacherEmotion.emotion1
                  arr[2] = teacherEmotion.emotion2
                  arr[3] = teacherEmotion.emotion3
                  arr[4] = teacherEmotion.emotion4
                }
                _this.emotionList = arr
                let teacherEvent = data.lessonsEventInfo.teacherEvent
                if (teacherEvent) {

                }
                data.lessonsEventInfo.blackboardArea && (_this.teacherPathData[0] = Math.round(data.lessonsEventInfo.blackboardArea * 100) / 100)
                data.lessonsEventInfo.screenArea && (_this.teacherPathData[1] = Math.round(data.lessonsEventInfo.screenArea * 100) / 100)                
                data.lessonsEventInfo.studentArea && (_this.teacherPathData[2] = Math.round(data.lessonsEventInfo.studentArea * 100) / 100)
                this.$refs.teacherPathChart.setEcharts()
              }
            })
            .catch((err) => {
              console.log(err)
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
              let data = res.data.data || {}
              this.$refs.classroomStatus.wordsNum[0].num = Math.round((data.concentrateRate || 0) * 100)
              this.$refs.classroomStatus.wordsNum[1].num = Math.round((data.participateRate || 0) * 100)
              this.$refs.classroomStatus.wordsNum[2].num = Math.round((data.doubtRate || 0) * 100)
              this.$refs.classroomStatus.wordsNum[3].num = Math.round((data.activityRate || 0) * 100)
              this.$refs.classroomStatus.sortWords()
            })
            .catch((err) => {
              console.log(err)
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
  @import "../../../styles/common/reset";
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
        width: 830px;
        height: 90px;
        margin-left: 80px;
        margin-top: 130px;
        .line {
          display: inline-block;
          width: 240px;
          height: 100%;
          margin-right: 35px;
          &.people {
            background: url("../../../../static/images/people.png") no-repeat left center;
          }
          &.message {
            background: url("../../../../static/images/message.png") no-repeat left center;
          }
          &.activity {
            background: url("../../../../static/images/activity.png") no-repeat left center;
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

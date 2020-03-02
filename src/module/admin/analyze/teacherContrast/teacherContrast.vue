<template>
  <div class="app">
    <Ghead></Ghead>
    <div class="content">
      <div class="nav-cnt">
        <div class="header-nav">
          <span class="link" @click="handleTeacherAnalysisClick">教师教学分析</span>
          <span class="link active" @click="handleTeacherContrastClick">教师对比分析</span>
        </div>
      </div>
      <div class="selects group asbox">
        <div class="row" style="margin-bottom: 15px;">
          <div class="txt">学期</div>
          <div id='select10' :style="selectStyle[0]"></div>
        </div>
        <div>
          <div class="txt">课程</div>
          <div id='select2' :style="selectStyle[1]"></div>
          <div id='select3' :style="selectStyle[2]"></div>
          <div class="txt" style="color: #3899fa">PK</div>
          <div id='select6' :style="selectStyle[1]"></div>
          <div id='select7' :style="selectStyle[2]"></div>
          <div class="btn" @click="handleSearchClick">查询</div>
        </div>
      </div>
      <div class="teacher-info group">
        <div class="title">
          <span class="card"></span>
          <span class="text">老师基本信息</span>
        </div>
        <div class="teacher-msg">
          <teacher-info :teacherInfo="leftTeacherInfo"></teacher-info>
          <span class="pk">PK</span>
          <teacher-info :teacherInfo="rightTeacherInfo"></teacher-info>
        </div>
      </div>
      <div class="course-behavior group">
        <div class="title">
          <span class="card"></span>
          <span class="text">课堂行为分析</span>
        </div>
        <div class="course-chart">
          <div class="bar-chart">
            <center-bar-chart
              ref="topBarChart"
              id="topChart"
              :xAxisLegend="topXAxisLegend"
              :name1="topName1"
              :name2="topName2"
              :data1="topData1"
              :data2="topData2"
            ></center-bar-chart>
          </div>
          <div class="two-circle">
            <div class="href">
              <left-circle-chart
                ref="topLeftCircle"
                :data="topLeftCircleData"
                id="topLeftCircle"
                :circleColor="leftCircleColor"
              ></left-circle-chart>
              <div class="name">{{topName1}}</div>
            </div>
            <div class="href">
              <left-circle-chart
                ref="topRightCircle"
                :data="topRightCircleData"
                id="topRightCircle"
                :circleColor="rightCircleColor"
              ></left-circle-chart>
              <div class="name">{{topName2}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="course-student group">
        <div class="title">
          <span class="card"></span>
          <span class="text">课堂学生状态</span>
        </div>
        <div class="course-student-status">
          <center-bar-chart
            ref="centerBarChart"
            id="centerChart"
            :xAxisLegend="centerXAxisLegend"
            :name1="topName1"
            :name2="topName2"
            :data1="centerData1"
            :data2="centerData2"
          ></center-bar-chart>
        </div>
      </div>
      <div class="teach-pattern group">
        <div class="title">
          <span class="card"></span>
          <span class="text">教学模式</span>
        </div>
        <div class="two-circle">
          <div class="href">
            <left-circle-chart
              ref="btmLeftCircle"
              :data="btmLeftCircleData"
              id="btmLeftCircle"
              :circleColor="leftCircleColor"
            ></left-circle-chart>
            <div class="name">{{topName1}}</div>
          </div>
          <div class="href">
            <left-circle-chart
              ref="btmRightCircle"
              :data="btmRightCircleData"
              id="btmRightCircle"
              :circleColor="rightCircleColor"
            ></left-circle-chart>
            <div class="name">{{topName2}}</div>
          </div>
        </div>
      </div>
      <div class="two-cnts">
        <div class="href">
          <div class="title">
            <span class="card"></span>
            <span class="text">教师轨迹</span>
          </div>
          <div class="teacher-path">
            <center-bar-chart
              ref="btmBarChart"
              id="btmChart"
              :xAxisLegend="btmXAxisLegend"
              :name1="topName1"
              :name2="topName2"
              :data1="btmData1"
              :data2="btmData2"
            ></center-bar-chart>
          </div>
        </div>
        <div class="href">
          <div class="title">
            <span class="card"></span>
            <span class="text">到勤率</span>
          </div>
          <div class="special-chart">
            <arrival-rate-chart
              ref="btmRightBarChart"
              id="btmRight"
              :xAxisLegend="[]"
              :name1="topName1"
              :name2="topName2"
              :data1="btmRight1"
              :data2="btmRight2"
            ></arrival-rate-chart>
          </div>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
  import arrivalRateChart from './arrivalRateChart'
  import leftCircleChart from './leftCircleChart'
  import teacherInfo from './teacherInfo'
  import centerBarChart from './centerBarChart'
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  import {termSelect, teacherSelect, selectStyle, findLessonsEventInfo, getOnClassStudentsStatusForTeacher, getTeachingModel, findLessonAttendanceRate} from '@/module/admin/analyze/config'

  export default {
    name: 'teacher-constrast',
    components: {
      arrivalRateChart,
      leftCircleChart,
      teacherInfo,
      centerBarChart,
      Ghead,
      Gfoot
    },
    data () {
      return {
        termId: '', // 学期Id
        teacherId1: '', // teacherId1
        teacherId2: '', // teacherId2
        termSelect: termSelect,
        teacherSelect: teacherSelect,
        selectStyle: selectStyle,
        btmLeftCircleData: [
          {value: 0, name: '对话型'},
          {value: 0, name: '练习型'},
          {value: 0, name: '混合型'},
          {value: 0, name: '讲授型'}
        ],
        btmRightCircleData: [
          {value: 0, name: '对话型'},
          {value: 0, name: '练习型'},
          {value: 0, name: '混合型'},
          {value: 0, name: '讲授型'}
        ],
        topLeftCircleData: [
          {value: 0, name: '讲授'},
          {value: 0, name: '提问'},
          {value: 0, name: '板书'},
          {value: 0, name: '演示或展示'},
          {value: 0, name: '观察巡视'},
          {value: 0, name: '个别指导'},
          {value: 0, name: '媒体使用'}
        ],
        topRightCircleData: [
          {value: 0, name: '讲授'},
          {value: 0, name: '提问'},
          {value: 0, name: '板书'},
          {value: 0, name: '演示或展示'},
          {value: 0, name: '观察巡视'},
          {value: 0, name: '个别指导'},
          {value: 0, name: '媒体使用'}
        ],
        leftCircleColor: ['#6db6ff', '#1e7ee3', '#6c78e5', '#84d451', '#4faf89', '#1ddfde', '#fca431'],
        rightCircleColor: ['#ec6969', '#d34c2d', '#f98324', '#d0569e', '#b755c6', '#dc4611', 'f9bb4f'],
        topName1: '',
        topName2: '',
        topData1: [0, 0, 0, 0],
        topData2: [0, 0, 0, 0],
        centerData1: [0, 0, 0, 0],
        centerData2: [0, 0, 0, 0],
        btmData1: [0, 0, 0],
        btmData2: [0, 0, 0],
        btmRight1: [0],
        btmRight2: [0],
        topXAxisLegend: ['师生互动占比', '教师语言率', '教师活动率', '课堂媒体使用率'],
        centerXAxisLegend: ['注意力', '参与度', '疑惑度', '关注度'],
        btmXAxisLegend: ['大屏/投影区域', '黑板区域', '学生区域'],
        leftTeacherInfo: {
          realName: '',
          sex: '',
          code: '',
          collegeName: '',
          httpUrl: ''
        },
        rightTeacherInfo: {
          realName: '',
          sex: '',
          code: '',
          collegeName: '',
          httpUrl: ''
        }
      }
    },
    methods: {
      handleSearchClick () {
        this.btmLeftCircleData = [
          {value: 0, name: '对话型'},
          {value: 0, name: '练习型'},
          {value: 0, name: '混合型'},
          {value: 0, name: '讲授型'}
        ]
        this.btmRightCircleData = [
          {value: 0, name: '对话型'},
          {value: 0, name: '练习型'},
          {value: 0, name: '混合型'},
          {value: 0, name: '讲授型'}
        ]
        this.topLeftCircleData = [
          {value: 0, name: '讲授'},
          {value: 0, name: '提问'},
          {value: 0, name: '板书'},
          {value: 0, name: '演示或展示'},
          {value: 0, name: '观察巡视'},
          {value: 0, name: '个别指导'},
          {value: 0, name: '媒体使用'}
        ]
        this.topRightCircleData = [
          {value: 0, name: '讲授'},
          {value: 0, name: '提问'},
          {value: 0, name: '板书'},
          {value: 0, name: '演示或展示'},
          {value: 0, name: '观察巡视'},
          {value: 0, name: '个别指导'},
          {value: 0, name: '媒体使用'}
        ]
        this.topName1 = ''
        this.topName2 = ''
        this.topData1 = [0, 0, 0, 0]
        this.topData2 = [0, 0, 0, 0]
        this.centerData1 = [0, 0, 0, 0]
        this.centerData2 = [0, 0, 0, 0]
        this.btmData1 = [0, 0, 0]
        this.btmData2 = [0, 0, 0]
        this.btmRight1 = [0]
        this.btmRight2 = [0]
        this.$refs.topBarChart.setEcharts()
        this.$refs.btmBarChart.setEcharts()
        this.$refs.centerBarChart.setEcharts()
        this.$refs.topLeftCircle.initCircleChart()
        this.$refs.topRightCircle.initCircleChart()
        this.$refs.btmLeftCircle.initCircleChart()
        this.$refs.btmRightCircle.initCircleChart()
        this.$refs.btmRightBarChart.setEcharts()

        let _this = this
        if (_this.teacherId1 && _this.teacherId2) {
          // 1
          _this.axios({
            method: 'POST',
            url: findLessonsEventInfo,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId1
            }
          })
            .then((res) => {
              let data = res.data
              if (data && data.isSuccess === 1) {
                let lessonsEventInfo = data.lessonsEventInfo
                // 最上面柱状图
                lessonsEventInfo.TSInteractionRate && (_this.topData1[0] = parseInt(lessonsEventInfo.TSInteractionRate))
                lessonsEventInfo.teacherLanguageRate && (_this.topData1[1] = parseInt(lessonsEventInfo.teacherLanguageRate))
                lessonsEventInfo.teacherActionRate && (_this.topData1[2] = parseInt(lessonsEventInfo.teacherActionRate))
                lessonsEventInfo.multimediaRate && (_this.topData1[3] = parseInt(lessonsEventInfo.multimediaRate))
                _this.$refs.topBarChart.setEcharts()
                // 最下面左侧柱状图
                lessonsEventInfo.screenArea && (_this.btmData1[0] = parseInt(lessonsEventInfo.screenArea))
                lessonsEventInfo.blackboardArea && (_this.btmData1[1] = parseInt(lessonsEventInfo.blackboardArea))
                lessonsEventInfo.studentArea && (_this.btmData1[2] = parseInt(lessonsEventInfo.studentArea))
                _this.$refs.btmBarChart.setEcharts()
                // 最上面左侧饼状图
                let teacherEvent = lessonsEventInfo.teacherEvent
                if (teacherEvent) {
                  teacherEvent.event1 && (_this.topRightCircleData[0].value = Number(teacherEvent.event1))
                  teacherEvent.event2 && (_this.topRightCircleData[1].value = Number(teacherEvent.event2))
                  teacherEvent.event3 && (_this.topRightCircleData[2].value = Number(teacherEvent.event3))
                  teacherEvent.event4 && (_this.topRightCircleData[3].value = Number(teacherEvent.event4))
                  teacherEvent.event5 && (_this.topRightCircleData[3].value = Number(teacherEvent.event5))
                  teacherEvent.event6 && (_this.topRightCircleData[3].value = Number(teacherEvent.event6))
                  teacherEvent.event7 && (_this.topRightCircleData[3].value = Number(teacherEvent.event7))
                  for (let i = 0; i < _this.topRightCircleData.length; i++) {
                    if (_this.topRightCircleData[i].value === 0) {
                      _this.topRightCircleData[i] = null
                    }
                  }
                  _this.$refs.topRightCircle.initCircleChart()
                }
              }
            })
            .catch(() => {
              console.log('err1')
            })

          _this.axios({
            method: 'POST',
            url: getOnClassStudentsStatusForTeacher,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId1
            }
          })
            .then((res) => {
              let data = res.data.data
              if (data) {
                data.concentrateRate && (_this.centerData1[0] = parseInt(data.concentrateRate * 100))
                data.participateRate && (_this.centerData1[1] = parseInt(data.participateRate * 100))
                data.doubtRate && (_this.centerData1[2] = parseInt(data.doubtRate * 100))
                data.activityRate && (_this.centerData1[3] = parseInt(data.activityRate * 100))
                _this.$refs.centerBarChart.setEcharts()
              }
            })
            .catch(() => {
              console.log('err3')
            })

          _this.axios({
            method: 'POST',
            url: getTeachingModel,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId1
            }
          })
            .then((res) => {
              let data = res.data.data
              if (data[1]) {
                _this.btmLeftCircleData[0].value = parseInt(data[1][0])
                _this.btmLeftCircleData[1].value = parseInt(data[1][1])
                _this.btmLeftCircleData[2].value = parseInt(data[1][2])
                _this.btmLeftCircleData[3].value = parseInt(data[1][3])
                for (let i = 0; i < _this.btmLeftCircleData.length; i++) {
                  if (_this.btmLeftCircleData[i].value === 0) {
                    _this.btmLeftCircleData[i] = null
                  }
                }
                _this.$refs.btmLeftCircle.initCircleChart()
              }
            })
            .catch(() => {
              console.log('err5')
            })

          _this.axios({
            method: 'POST',
            url: findLessonAttendanceRate,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId1
            }
          })
            .then((res) => {
              let data = res.data
              if (data && data.isSuccess === 1) {
                this.btmRight1[0] = parseInt(data.attendanceRates)
                _this.$refs.btmRightBarChart.setEcharts()
              }
            })
            .catch(() => {
              console.log('err7')
            })
          // 2
          _this.axios({
            method: 'POST',
            url: findLessonsEventInfo,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId2
            }
          })
            .then((res) => {
              let data = res.data
              if (data && data.isSuccess === 1) {
                // 最上面柱状图
                let lessonsEventInfo = data.lessonsEventInfo
                lessonsEventInfo.TSInteractionRate && (_this.topData2[0] = parseInt(lessonsEventInfo.TSInteractionRate))
                lessonsEventInfo.teacherLanguageRate && (_this.topData2[1] = parseInt(lessonsEventInfo.teacherLanguageRate))
                lessonsEventInfo.teacherActionRate && (_this.topData2[2] = parseInt(lessonsEventInfo.teacherActionRate))
                lessonsEventInfo.multimediaRate && (_this.topData2[3] = parseInt(lessonsEventInfo.multimediaRate))
                _this.$refs.topBarChart.setEcharts()
                // 最下面左侧柱状图
                lessonsEventInfo.screenArea && (_this.btmData2[0] = parseInt(lessonsEventInfo.screenArea))
                lessonsEventInfo.blackboardArea && (_this.btmData2[1] = parseInt(lessonsEventInfo.blackboardArea))
                lessonsEventInfo.studentArea && (_this.btmData2[2] = parseInt(lessonsEventInfo.studentArea))
                _this.$refs.btmBarChart.setEcharts()
                // 最上面右侧饼状图
                let teacherEvent = lessonsEventInfo.teacherEvent
                if (teacherEvent) {
                  teacherEvent.event1 && (_this.topLeftCircleData[0].value = Number(teacherEvent.event1))
                  teacherEvent.event2 && (_this.topLeftCircleData[1].value = Number(teacherEvent.event2))
                  teacherEvent.event3 && (_this.topLeftCircleData[2].value = Number(teacherEvent.event3))
                  teacherEvent.event4 && (_this.topLeftCircleData[3].value = Number(teacherEvent.event4))
                  teacherEvent.event5 && (_this.topLeftCircleData[3].value = Number(teacherEvent.event5))
                  teacherEvent.event6 && (_this.topLeftCircleData[3].value = Number(teacherEvent.event6))
                  teacherEvent.event7 && (_this.topLeftCircleData[3].value = Number(teacherEvent.event7))
                  for (let i = 0; i < _this.topLeftCircleData.length; i++) {
                    if (_this.topLeftCircleData[i].value === 0) {
                      _this.topLeftCircleData[i] = null
                    }
                  }
                  _this.$refs.topLeftCircle.initCircleChart()
                }
              }
            })
            .catch(() => {
              console.log('err2')
            })

          _this.axios({
            method: 'POST',
            url: getOnClassStudentsStatusForTeacher,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId2
            }
          })
            .then((res) => {
              let data = data = res.data.data
              if (data) {
                data.concentrateRate && (_this.centerData2[0] = parseInt(data.concentrateRate * 100))
                data.participateRate && (_this.centerData2[1] = parseInt(data.participateRate * 100))
                data.doubtRate && (_this.centerData2[2] = parseInt(data.doubtRate * 100))
                data.activityRate && (_this.centerData2[3] = parseInt(data.activityRate * 100))
                _this.$refs.centerBarChart.setEcharts()
              }
            })
            .catch(() => {
              console.log('err4')
            })

          _this.axios({
            method: 'POST',
            url: getTeachingModel,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId1
            }
          })
            .then((res) => {
              let data = res.data.data
              if (data[1]) {
                _this.btmRightCircleData[0].value = parseInt(data[1][0])
                _this.btmRightCircleData[1].value = parseInt(data[1][1])
                _this.btmRightCircleData[2].value = parseInt(data[1][2])
                _this.btmRightCircleData[3].value = parseInt(data[1][3])
                for (let i = 0; i < _this.btmRightCircleData.length; i++) {
                  if (_this.btmRightCircleData[i].value === 0) {
                    _this.btmRightCircleData[i] = null
                  }
                }
                _this.$refs.btmRightCircle.initCircleChart()
              }
            })
            .catch(() => {
              console.log('err6')
            })

          _this.axios({
            method: 'POST',
            url: findLessonAttendanceRate,
            data: {
              'termId': _this.termId,
              'teacherId': _this.teacherId2
            }
          })
            .then((res) => {
              let data = res.data
              if (data && data.isSuccess === 1) {
                this.btmRight2[0] = parseInt(data.attendanceRates)
                _this.$refs.btmRightBarChart.setEcharts()
              }
            })
            .catch(() => {
              console.log('err8')
            })
        }
      },
      handleTeacherAnalysisClick () {
        this.$router.push('/teacherAnalysis')
      },
      handleTeacherContrastClick () {
        this.$router.push('/teacherContrast')
      },
      getTeacherId (obj, num) {
        if (num === 0) {
          this.teacherId1 = obj.value
          this.topName1 = obj.info.realName

          this.leftTeacherInfo.realName = obj.info.realName
          if (obj.info.gender === 2) {
            this.leftTeacherInfo.sex = '女'
          } else if (obj.info.gender === 1) {
            this.leftTeacherInfo.sex = '男'
          }
          this.leftTeacherInfo.collegeName = obj.info.organizationName
          this.leftTeacherInfo.code = obj.info.code
          this.leftTeacherInfo.httpUrl = obj.info.iconUrl
        } else if (num === 1) {
          this.teacherId2 = obj.value
          this.topName2 = obj.info.realName
          this.rightTeacherInfo.realName = obj.info.realName
          if (obj.info.gender === 2) {
            this.rightTeacherInfo.sex = '女'
          } else if (obj.info.gender === 1) {
            this.rightTeacherInfo.sex = '男'
          }
          this.rightTeacherInfo.collegeName = obj.info.organizationName
          this.rightTeacherInfo.code = obj.info.code
          this.rightTeacherInfo.httpUrl = obj.info.iconUrl
        }
      },
      getTermId (obj) {
        this.termId = obj.value
      }
    },
    mounted () {
      this.termSelect(['select10'], this.getTermId)
      this.teacherSelect([['select2', 'select3'], ['select6', 'select7']], this.getTeacherId)
    }
  }
</script>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
  }
  .content {
    position: relative;
    width: 100%;
    background: #f4f9fa;
    /*height: 200px;*/
    overflow: hidden;
    .nav-cnt {
      background: #fff;
      width: 100%;
      height: 60px;
      .header-nav {
        margin: 0 auto;
        width: 1620px;
        height: 100%;
        background: #fff;
        border-bottom: 1px solid #3198fa;
        .link {
          cursor: pointer;
          display: inline-block;
          height: 100%;
          padding-top: 25px;
          font-size: 18px;
          margin-right: 20px;
          color: #000;
          &.active {
            border-bottom: 2px solid #3198fa;
          }
        }
      }
    }
    .group {
      width: 1620px;
      margin: 20px auto;
      background: #fff;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
      .title {
        display: inline-block;
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

      .two-circle {
        display: flex;
        justify-content: space-around;
        .href {
          width: 520px;
          height: 350px;
          .name {
            margin-top: 10px;
            font-size: 18px;
            text-align: center;
          }
        }
      }
    }
    .selects {
      height: 137px;
      padding-top: 30px;
    }
    .teacher-info {
      height: 244px;
      .teacher-msg {
        margin-left: 485px;
        margin-top: 30px;
        .pk {
          font-size: 26px;
          color: #3099fd;
          vertical-align: middle;
          margin-right: 80px;
        }
      }
    }
    .course-behavior {
      height: 843px;
      .course-chart {
        margin-top: 80px;
        .bar-chart {
          width: 800px;
          height: 270px;
          margin: 0 auto;
        }
      }
    }
    .course-student {
      height: 444px;
      .course-student-status {
        width: 800px;
        height: 270px;
        margin: 0 auto;
        margin-top: 50px;
      }
    }
    .teach-pattern {
      height: 452px;
    }
    .two-cnts {
      display: flex;
      justify-content: space-between;
      width: 1620px;
      height: 404px;
      margin: 20px auto;
      .href {
        width: 800px;
        height: 100%;
        overflow: hidden;
        background: #fff;
        box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.3);
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
        .teacher-path {
          width: 630px;
          height: 310px;
          margin: 20px auto 0;
        }
        .special-chart {
          width: 630px;
          height: 310px;
          margin: 20px auto 0;
        }
      }
    }
  }
</style>

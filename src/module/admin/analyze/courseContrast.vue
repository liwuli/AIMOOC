<template>
  <div class="container">
    <Ghead></Ghead>
    <div style="float: left;width: 100%;background: #fff;">
      <div class="mid-fix">
        <div class="headtab">

          <div class="headtab-tabs">
            <router-link to="courseAnalysis" class="headtab-tab">课程详情</router-link>
            <div class="headtab-tab headtab-active">课程对比分析</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mid-fix" style="padding: 15px 0;">
      <div class="row asbox">
        <div class="txt">课程</div>
        <div id='select1' :style="selectStyle[0]"></div>
        <div id='select2' :style="selectStyle[1]"></div>
        <div id='select12' :style="selectStyle[1]"></div>
        <div class="txt" style="color: #3899fa">PK</div>
        <div id='select5' :style="selectStyle[0]"></div>
        <div id='select6' :style="selectStyle[1]"></div>
        <div id='select16' :style="selectStyle[1]"></div>
        <div class="btn" @click="search">查询</div>
      </div>
    </div>
    <div class="hint" v-if="!show">请选择课程</div>
    <div class="row mid-fix" v-else>
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂行为分析</span></div>
          <div class="body ">
            <TwoBarChart id="first" ref="firstBarChart" :name1="courseNameList[0]" :name2="courseNameList[1]" :data1="behavior1" :data2="behavior2" :xAxisLegend="behaviorLegend" :size="barChartSize"></TwoBarChart>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂学生状态</span></div>
          <div class="body">
            <TwoBarChart ref="secondBarChart" id="second" :name1="courseNameList[0]" :name2="courseNameList[1]" :data1="studentStatus1" :data2="studentStatus2" :xAxisLegend="studentStatusLegend" :size="barChartSize"></TwoBarChart>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>教学模式</span></div>
          <div class="body row" style="padding: 0 240px;">
            <div class="floatleft"><PieOutChart id="firstPie" :pieData="teachModel1" :size="pieChartSize"></PieOutChart><div class="lower">{{courseNameList[0]}}</div></div>
            <div class="floatright"><PieOutChart id="secondPie" :pieData="teachModel2" :size="pieChartSize"></PieOutChart><div class="lower">{{courseNameList[1]}}</div></div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>师生互动</span></div>
          <div class="body row" style="padding: 0 240px;">
            <div class="floatleft" ><PieNumChart id="thirdPie" :pieData="TSInteraction1" :size="pieChartSize"></PieNumChart><div class="lower">{{courseNameList[0]}}</div></div>
            <div class="floatright"><PieNumChart id="fourthPie" :pieData="TSInteraction2" :size="pieChartSize"></PieNumChart><div class="lower">{{courseNameList[1]}}</div></div>
          </div>
        </div>
      </div>
      <div class="box floatleft" style="width: 46%;">
        <div class="header">
          <div class="title"><span class="card"></span><span>教师轨迹</span></div>
          <div class="body">
            <TwoBarChart ref="btmLeftBarChart" id="footFirst" :name1="courseNameList[0]" :name2="courseNameList[1]" :data1="teacherTrack1" :data2="teacherTrack2" :xAxisLegend="teacherTrackLegend" :size="footbarChartSize"></TwoBarChart>
          </div>
        </div>
      </div>
      <div class="box floatright" style="width: 46%;">
        <div class="header">
          <div class="title"><span class="card"></span><span>到勤率</span></div>
          <div class="body" :style="footbarChartSize">
            <ArrivalRateChart id="footSecond" ref="btmRightBarChart" :name1="courseNameList[0]" :name2="courseNameList[1]" :data1="attendanceRates1" :data2="attendanceRates2" xAxisLegend=""></ArrivalRateChart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  import TwoBarChart from './echartsModule/twoBarChart'
  import PieOutChart from './echartsModule/pieOutChart'
  import PieNumChart from './echartsModule/pieNumChart'
  import ArrivalRateChart from '@/module/admin/analyze/teacherContrast/arrivalRateChart'

  import {termSelect, findAllClassesList, findCourseListByCollegeId, findLessonsEventInfo, getTeachingModel, getOnClassStudentsStatusForTeacher, findLessonAttendanceRate} from '@/module/admin/analyze/config'

  export default {
    name: 'courseContrast',
    components: {
      Ghead,
      Gfoot,
      TwoBarChart,
      PieOutChart,
      ArrivalRateChart,
      PieNumChart
    },
    data () {
      return {
        teachModel1: [],
        teachModel2: [],
        attendanceRates1: [],
        attendanceRates2: [],
        termIdList: [],
        courseNameList: [],
        TSInteraction1: [],
        TSInteraction2: [],
        studentStatus1: [],
        studentStatus2: [],
        teacherTrack1: [],
        teacherTrack2: [],
        behavior1: [],
        behavior2: [],
        termSelect: termSelect,
        barChartSize: {height: '300px', width: '1050px', 'margin': '0 auto'},
        footbarChartSize: {height: '300px', width: '600px', 'margin-left': '100px'},
        pieChartSize: {height: '300px', width: '440px'},
        studentStatusLegend: ['注意力', '参与度', '疑惑度', '活跃度'],
        behaviorLegend: ['课堂媒体使用率', '师生互动占比', '老师行为占总体比', '教师语言率', '教师活动率', '学生行为占总体比'],
        teacherTrackLegend: ['大屏/投影区域', '黑板区域', '学生区域'],
        show: false,
        courseIdList: [],
        selectStyle: [{width: '180px', 'margin': '1px 8px 0'}, {width: '140px', 'margin': '1px 8px 0'}]
      }
    },
    methods: {


      async collegeSelect (arr, value) { // 学院选择下拉菜单
        try {
          const res = await this.axios.post(findAllClassesList)
          let objs = res.data.classesList || []
          let temp = []
          temp[0] = {value: '-1', txt: '学院名称'}
          for (let item = 0, len = objs.length; item < len; item++) {
            temp[item + 1] = {value: objs[item].collegeId, txt: objs[item].collegeName}
          }
          let that = this
          for (let i = 0; i < 2; i++) {
            this.$Select({
              'data': temp,
              'selectId': arr[i][0],
              'callback': function (obj) {
                that.courseSelect(obj, arr, i)
              },
              'matchval': [{val: -1}]
            })
          }
        } catch (err) {
          console.log(err)
        }
      },
      async courseSelect (obj, arr, value) { // 课程选择下拉菜单
        try {
          let objs = []
          if (obj.value !== '-1') {
            const res = await this.axios.post(findCourseListByCollegeId, {collegeId: obj.value})
            objs = res.data.courseLists
          }
          let temp = []
          temp[0] = {value: '-1', txt: '课程名称'}
          for (let item = 0, len = objs.length; item < len; item++) {
            temp[item + 1] = {value: objs[item].courseId, txt: objs[item].courseName}
          }
          let that = this
          this.$Select({
            'data': temp,
            'selectId': arr[value][1],
            'callback': function (obj) {
              that.courseIdList[value] = obj.ind ? obj.value : ''
              that.courseNameList[value] = obj.ind ? obj.txt : ''
            },
            'matchval': [{val: -1}]
          })
        } catch (err) {
          console.log(err)
        }
      },
      async findLessonsEventInfo (num, str) { // 课堂行为分析
        try {
          const res1 = await this.axios.post(findLessonsEventInfo, {termId: this.termIdList[num - 1], courseId: this.courseIdList[num - 1]})
          let obj = res1.data.lessonsEventInfo
          if (obj) {
            this['behavior' + num][0] = obj.multimediaRate
            this['behavior' + num][1] = obj.TSInteractionRate
            this['behavior' + num][2] = obj.teacherEventRate
            this['behavior' + num][3] = obj.teacherLanguageRate
            this['behavior' + num][4] = obj.teacherActionRate
            this['behavior' + num][5] = obj.studentEventRate
            if (obj.invalidInteraction * 1) {
              this['TSInteraction' + num].push({value: Math.round(obj.invalidInteraction), name: '低效或无效互动', label: {color: '#0a545e'}})
            }
            if (obj.normalInteraction * 1) {
              this['TSInteraction' + num].push({value: Math.round(obj.normalInteraction), name: '一般性互动', label: {color: '#682b1f'}})
            }
            if (obj.complexInteraction * 1) {
              this['TSInteraction' + num].push({value: Math.round(obj.complexInteraction), name: '复杂性互动', label: {color: '#441241'}})
            }
            this['teacherTrack' + num][0] = obj.screenArea
            this['teacherTrack' + num][1] = obj.blackboardArea
            this['teacherTrack' + num][2] = obj.studentArea
          }
          this.$refs.firstBarChart.setEcharts()
          this.$refs.btmLeftBarChart.setEcharts()
        } catch (err) {
          console.log(err)
        }
      },
      async getOnClassStudentsStatusForTeacher (num) { // 课堂学生状态
        try {
          const res = await this.axios.post(getOnClassStudentsStatusForTeacher, {termId: this.termIdList[num - 1], courseId: this.courseIdList[num - 1]})
          if (res.data && res.data.data) {
            let obj = res.data.data
            this['studentStatus' + num][0] = obj.concentrateRate * 100 || '0'
            this['studentStatus' + num][1] = obj.participateRate * 100 || '0'
            this['studentStatus' + num][2] = obj.doubtRate * 100 || '0'
            this['studentStatus' + num][3] = obj.activityRate * 100 || '0'
            this.$refs.secondBarChart.setEcharts()
          }
        } catch (err) {
          console.log(err)
        }
      },
      findLessonAttendanceRate () { // 到勤率
        let that = this
        this.axios.all([
          that.axios.post(findLessonAttendanceRate, {termId: this.termIdList[0], courseId: this.courseIdList[0]}),
          that.axios.post(findLessonAttendanceRate, {termId: this.termIdList[1], courseId: this.courseIdList[1]})
        ])
          .then(that.axios.spread(function (res1, res2) {
            that.attendanceRates1[0] = res1.data.attendanceRates
            that.attendanceRates2[0] = res2.data.attendanceRates
            that.$refs.btmRightBarChart.setEcharts()
          }))
      },
      async getTeachingModel (num) { // 教学模式
        try {
          const res = await this.axios.post(getTeachingModel, {termId: this.termIdList[num - 1], courseId: this.courseIdList[num - 1]})
          let arr = res.data.data
          for (let i = 0, len = arr[0].length; i < len; i++) {
            if (arr[1][i] * 1) {
              this['teachModel' + num].push({value: Math.round(arr[1][i]), name: arr[0][i]})
            }
          }
        } catch (err) {
          console.log(err)
        }
      },
      search () {
        this.show = true
        // this.courseIdList = ['fa4abe31110b47818a45fa872498a23f', 'fa4abe31110b47818a45fa872498a23f']
        if (!this.courseIdList[0] || !this.courseIdList[1]) {
          console.log('请选择课程')
          return
        }
        this.teachModel1 = []
        this.teachModel2 = []
        this.TSInteraction1 = []
        this.TSInteraction2 = []
        this.studentStatus1 = ['', '', '', '']
        this.studentStatus2 = ['', '', '', '']
        this.findLessonsEventInfo(1)
        this.findLessonsEventInfo(2)
        this.getOnClassStudentsStatusForTeacher(1)
        this.getOnClassStudentsStatusForTeacher(2)
        this.findLessonAttendanceRate()
        this.getTeachingModel(1)
        this.getTeachingModel(2)
      },
      termIdCallback (obj, num) {
        this.termIdList[num] = obj.ind ? obj.value : ''
      }
    },
    mounted () {
      this.termSelect(['select1', 'select5'], this.termIdCallback)
      this.collegeSelect([['select2', 'select12'], ['select6', 'select16']])
    }
  }
</script>

<style scoped>
</style>

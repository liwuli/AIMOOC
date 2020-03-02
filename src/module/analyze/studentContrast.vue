<template>
  <div class="container">
    <Ghead></Ghead>
    <div style="float: left;width: 100%;background: #fff;">
      <div class="mid-fix">
        <div class="headtab" style="height: 59px;line-height: 74px;">
          <div class="header-nav">
            <div class="link" @click="handleTeacherAnalysisClick">学生学习情况</div>
            <div class="link active" @click="handleTeacherContrastClick">学生对比分析</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mid-fix" style="padding: 15px 0;">
      <div class="row asbox">
        <div class="row" style="margin-bottom: 15px;">
          <div class="txt">学期</div>
          <div id='select10' :style="selectStyle[0]"></div>
        </div>
        <div>
          <div class="txt">学生</div>
          <div id='select1' :style="selectStyle[0]"></div>
          <div id='select2' :style="selectStyle[1]"></div>
          <div id='select3' :style="selectStyle[1]"></div>
          <div id='select20' :style="selectStyle[1]"></div>
          <div class="txt" style="color: #3899fa">PK</div>
          <div id='select5' :style="selectStyle[0]"></div>
          <div id='select6' :style="selectStyle[1]"></div>
          <div id='select7' :style="selectStyle[1]"></div>
          <div id='select30' :style="selectStyle[1]"></div>
          <div class="btn" @click="search">查询</div>
        </div>
      </div>
    </div>
    <div class="hint" v-show="!show">请选择学生</div>
    <div class="row mid-fix" v-show="show">
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂学生状态</span></div>
          <div class="body">
            <TwoBarChart id="first" ref="topRightBarChart" :name1="studentNames[0]" :name2="studentNames[1]" :data1="studentStatus1" :data2="studentStatus2" :xAxisLegend="topXAxisLegend" :size="barChartSize"></TwoBarChart>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>学生到勤率</span></div>
          <div class="body" :style="barChartSize">
            <ArrivalRateChart ref="btmRightBarChart" id="second" :name1="studentNames[0]" :name2="studentNames[1]" :data1="attendanceRates1" :data2="attendanceRates2"></ArrivalRateChart>
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
  import TwoBarChart from './echartsModule/twoBarChart'
  import PieOutChart from './echartsModule/pieOutChart'
  import ArrivalRateChart from '@/module/analyze/teacherContrast/arrivalRateChart'

  import {studentSelect, findStudentStudyCondition, classSelect, termSelect} from '@/module/analyze/config'

  export default {
    name: 'classContrast',
    components: {
      Ghead,
      Gfoot,
      TwoBarChart,
      PieOutChart,
      ArrivalRateChart
    },
    data () {
      return {
        show: false,
        termId: '',
        studentSelect: studentSelect,
        stuSelId: ['select20', 'select30'],
        studentStatus1: [0, 0, 0, 0],
        studentStatus2: [0, 0, 0, 0],
        attendanceRates1: [0],
        attendanceRates2: [0],
        studentIds: ['', ''],
        studentNames: ['学生1', '学生2'],
        classSelect: classSelect,
        termSelect: termSelect,
        barChartSize: {height: '300px', width: '1050px', 'margin': '0 auto'},
        topXAxisLegend: ['注意力', '参与度', '疑惑度', '活跃度'],
        selectStyle: [{width: '180px', 'margin': '1px 8px 0'}, {width: '140px', 'margin': '1px 8px 0'}]
      }
    },
    methods: {
      handleTeacherAnalysisClick () {
        this.$router.push('/studentAnalysis')
      },
      handleTeacherContrastClick () {
        this.$router.push('/studentContrast')
      },
      getClassId (obj, num) {
        this.studentSelect(this.stuSelId[num], obj.value, this.getStudent, num)
      },
      getStudentAnalysInfo () {
        this.show = true
        let _this = this
        this.axios({
          method: 'POST',
          data: {
            userId: _this.studentIds[0],
            termId: _this.termId
          },
          url: findStudentStudyCondition
        })
          .then((data) => {
            const res = data.data
            if (res && res.code === 200) {
              _this.studentStatus1[0] = res.data.concentrateRate || 0
              _this.studentStatus1[1] = res.data.participateRate || 0
              _this.studentStatus1[2] = res.data.confusionRate || 0
              _this.studentStatus1[3] = res.data.activityRate || 0
              _this.attendanceRates1[0] = Math.floor(res.data.actual / res.data.allowed * 100)
              _this.$refs.topRightBarChart.setEcharts()
              _this.$refs.btmRightBarChart.setEcharts()
            }
          })

        this.axios({
          method: 'POST',
          data: {
            userId: _this.studentIds[1],
            termId: _this.termId
          },
          url: findStudentStudyCondition
        })
          .then((data) => {
            const res = data.data
            if (res && res.code === 200) {
              _this.studentStatus2[0] = res.data.concentrateRate || 0
              _this.studentStatus2[1] = res.data.participateRate || 0
              _this.studentStatus2[2] = res.data.confusionRate || 0
              _this.studentStatus2[3] = res.data.activityRate || 0
              _this.attendanceRates2[0] = Math.floor(res.data.actual / res.data.allowed * 100)
              _this.$refs.topRightBarChart.setEcharts()
              _this.$refs.btmRightBarChart.setEcharts()
            }
          })
      },
      getTermId (obj) {
        if (obj.value !== '-1') {
          this.termId = obj.value
        }
      },
      getStudent (obj, num) {
        if (obj.value !== '-1') {
          num === 0 && (this.studentIds[0] = obj.value) && (this.studentNames[0] = obj.txt)
          num === 1 && (this.studentIds[1] = obj.value) && (this.studentNames[1] = obj.txt)
        }
      },
      search () {
        if (!this.studentIds[0] || !this.studentIds[1]) {
          return
        }
        this.getStudentAnalysInfo()
      }
    },
    mounted () {
      this.termSelect(['select10'], this.getTermId)
      this.classSelect([['select1', 'select2', 'select3'], ['select5', 'select6', 'select7']], this.getClassId)
    }
  }
</script>

<style lang="scss" scoped>
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
      font-size: 18px;
      color: #000;
      margin-right: 20px;
      &.active {
        border-bottom: 2px solid #3198fa;
      }
    }
  }
</style>

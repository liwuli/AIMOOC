<template>
  <div class="container">
    <Ghead></Ghead>
    <div style="float: left;width: 100%;background: #fff;">
      <div class="mid-fix">
        <div class="headtab">
          <div class="headtab-tabs">
            <div class="headtab-tab headtab-active">班级对比分析</div>
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
          <div class="txt">课程</div>
          <div id='select1' :style="selectStyle[0]"></div>
          <div id='select2' :style="selectStyle[1]"></div>
          <div id='select3' :style="selectStyle[1]"></div>
          <div class="txt" style="color: #3899fa">PK</div>
          <div id='select5' :style="selectStyle[0]"></div>
          <div id='select6' :style="selectStyle[1]"></div>
          <div id='select7' :style="selectStyle[1]"></div>
          <div class="btn" @click="search">查询</div>
        </div>
      </div>
    </div>
    <div class="hint" v-if="!show">请选择课程</div>
    <div class="row mid-fix" v-else>
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>班级基本信息</span></div>
          <div class="body row">
            <div class="row content">
              <div class="part floatleft">
                <div v-for="item in classBasicInfo" class="item">
                  <span class="txt">{{item.text}}:</span><span :title="classesInfos1[item.value]" class="data">{{classesInfos1[item.value]}}</span>
                </div>
              </div>
              <span class="floatleft pk">PK</span>
              <div class="part floatright">
                <div v-for="item in classBasicInfo" class="item">
                  <span class="txt">{{item.text}}:</span><span :title="classesInfos1[item.value]" class="data">{{classesInfos2[item.value]}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂学生状态</span></div>
          <div class="body">
            <TwoBarChart id="first" ref="topRightBarChart" :name1="courseName1" :name2="courseName2" :data1="studentStatus1" :data2="studentStatus2" :xAxisLegend="topXAxisLegend" :size="barChartSize"></TwoBarChart>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="header">
          <div class="title"><span class="card"></span><span>学生到勤率</span></div>
          <div class="body" :style="barChartSize">
            <ArrivalRateChart ref="btmRightBarChart" id="second" :name1="courseName1" :name2="courseName2" :data1="attendanceRates1" :data2="attendanceRates2"></ArrivalRateChart>
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
  import ArrivalRateChart from '@/module/admin/analyze/teacherContrast/arrivalRateChart'

  import {getClassAnalysInfoList, gangedSelect, classBasicInfo, termSelect} from '@/module/admin/analyze/config'

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
        studentStatus1: [],
        studentStatus2: [],
        attendanceRates1: [],
        attendanceRates2: [],
        courseName1: '',
        courseName2: '',
        classesInfos1: [],
        classesInfos2: [],
        classIds: [],
        gangedSelect: gangedSelect,
        classBasicInfo: classBasicInfo,
        termSelect: termSelect,
        barChartSize: {height: '300px', width: '1050px', 'margin': '0 auto'},
        topXAxisLegend: ['注意力', '参与度', '疑惑度', '活跃度'],
        show: false,
        selectStyle: [{width: '180px', 'margin': '1px 8px 0'}, {width: '140px', 'margin': '1px 8px 0'}]
      }
    },
    methods: {
      async getClassAnalysInfoList () {

        try {
          const res = await this.axios.post(getClassAnalysInfoList, {classIds: JSON.stringify(this.classIds)})
          let obj = res.data
          let ind = 0
          if (obj && obj.classesInfos && obj.classesInfos.length > 0) {
            if (obj.classesInfos[0].classesId === this.classIds[0]) {
              ind = 0
            } else {
              ind = 1
            }
            this.classesInfos1 = obj.classesInfos[ind] || []
            this.classesInfos2 = obj.classesInfos[ind ^ 1] || []
          }
          if (obj && obj.classAnalysInfoList && obj.classAnalysInfoList.length > 0) {
            if (obj.classAnalysInfoList[0].classesId === this.classIds[0]) {
              ind = 0
            } else {
              ind = 1
            }
            if (obj.classAnalysInfoList && obj.classAnalysInfoList[ind]) {
              let objs1 = obj.classAnalysInfoList[ind]
              objs1.concentrateRate && (this.studentStatus1[0] = Math.round(objs1.concentrateRate * 100))
              objs1.participateRate && (this.studentStatus1[1] = Math.round(objs1.participateRate * 100))
              objs1.doubtRate && (this.studentStatus1[2] = Math.round(objs1.doubtRate * 100))
              objs1.activityRate && (this.studentStatus1[3] = Math.round(objs1.activityRate * 100))
              objs1.attendanceRate && (this.attendanceRates1[0] = Math.round(objs1.attendanceRate * 100))
            }
            if (obj.classAnalysInfoList && obj.classAnalysInfoList[ind ^ 1]) {
              let objs2 = obj.classAnalysInfoList[ind ^ 1]
              objs2.concentrateRate && (this.studentStatus2[0] = Math.round(obj.classAnalysInfoList[ind ^ 1].concentrateRate * 100))
              objs2.participateRate && (this.studentStatus2[1] = Math.round(obj.classAnalysInfoList[ind ^ 1].participateRate * 100))
              objs2.doubtRate && (this.studentStatus2[2] = Math.round(obj.classAnalysInfoList[ind ^ 1].doubtRate * 100))
              objs2.activityRate && (this.studentStatus2[3] = Math.round(obj.classAnalysInfoList[ind ^ 1].activityRate * 100))
              objs2.attendanceRate && (this.attendanceRates2[0] = Math.round(obj.classAnalysInfoList[ind ^ 1].attendanceRate * 100))
            }
          }
          this.$refs.topRightBarChart.setEcharts()
          this.$refs.btmRightBarChart.setEcharts()
        } catch (err) {
          console.log(err)
        }
      },
      getClassId (obj, num) {
        this.classIds[num] = obj.ind ? obj.value : ''
        if (num) {
          this.courseName2 = obj.txt
        } else {
          this.courseName1 = obj.txt
        }
      },
      search () {
        this.show = true
        this.classesInfos1 = []
        this.classesInfos2 = []
        this.attendanceRates1 = []
        this.attendanceRates2 = []
        this.studentStatus1 = ['', '', '', '']
        this.studentStatus2 = ['', '', '', '']
        // this.classIds = ["07ca58dcad284c399fa079ff5693ad32","34e14cbf694446818ab9808f6d3a547d"]
        if (!this.classIds[0] || !this.classIds[1]) {
          console.log('请选择课程')
          return
        }
        this.getClassAnalysInfoList()
      }
    },
    mounted () {
      this.termSelect(['select10'])
      this.gangedSelect([['select1', 'select2', 'select3'], ['select5', 'select6', 'select7']], this.getClassId)
    }
  }
</script>

<style scoped>
</style>

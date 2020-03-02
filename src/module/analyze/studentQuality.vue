<template>
  <div>
    <div class="mid-fix row">
      <div class="box floatleft">
        <div class="header">
          <div class="title"><span class="card"></span><span>到勤率</span></div>
        </div>
        <div class="body" :style="contentStyle">
          <HollowPieChart ref="hollowPieData" id="firstPie" :pieData="hollowPieData" :size="pieChartSize[0]"></HollowPieChart>
        </div>
      </div>
      <div class="box floatright">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂行为分析</span></div>
        </div>
        <div class="body" :style="contentStyle">
            <PieOutChart id="secondPie" ref="studentBehavior" :pieData="pieData" :size="pieChartSize[1]"></PieOutChart>
        </div>
      </div>
    </div>
    <div class="mid-fix row">
      <div class="box floatleft">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂学生状态</span></div>
        </div>
        <div class="body" :style="contentStyle">
          <teach-style :teachStyleInfo="teachStyleInfo"></teach-style>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PieOutChart from './echartsModule/pieOutChart'
  import teachStyle from './teacherAnalysis/teachStyle'
  import HollowPieChart from './echartsModule/hollowPieChart'
  import { findStudentStudyCondition } from '@/module/analyze/config'

  export default {
    name: 'student-quality',
    props: ['studentId', 'termId'],
    components: {
      PieOutChart,
      HollowPieChart,
      teachStyle
    },
    data () {
      return {
        hollowPieData: [
          {value: 0, name: '', label: {color: '#0a545e'}},
          {value: 0, name: '', label: {color: '#0a545e'}}
        ],
        pieData: [
          { value: 0, name: '应答', label: {color: '#ec6969'}},
          { value: 0, name: '讨论', label: {color: '#d34c2d'} },
          { value: 0, name: '讲读演',label: {color: '#f98324'} },
          { value: 0, name: '听讲或思考', label: {color: '#d0569e'} },
          { value: 0, name: '阅读', label: {color: '#b755c6'} },
          { value: 0, name: '笔记练习', label: {color: '#dc4611'} },
          { value: 0, name: '多媒体', label: {color: '#f9bb4f'} },
          { value: 0, name: '沉寂', label: {color: '#ec6969'} },
          { value: 0, name: '睡觉', label: {color: '#d34c2d'} },
          { value: 0, name: '玩手机', label: {color: '#f98324'} },
          { value: 0, name: '学生上讲台', label: {color: '#d0569e'}}
        ],
        pieChartSize: [{height: '300px', width: '450px', margin: '0 auto'}, {height: '300px', width: '450px', margin: '0 auto'}],
        contentStyle: {height: '300px', width: '750px'},
        teachStyleInfo: []
      }
    },
    methods: {
      getAnalysisInfo () {
        let _this = this
        this.axios({
          method: 'POST',
          data: {
            userId: _this.studentId,
            termId: _this.termId
          },
          url: findStudentStudyCondition
        })
          .then((data) => {
            const res = data.data
              if (res && res.code === 200) {
                let actual = res.data.actual || 0
                let allowed = res.data.allowed || 0
                _this.hollowPieData[0].value = actual
                _this.hollowPieData[1].value = allowed
                _this.hollowPieData[0].name = Math.floor((actual / (actual + allowed)) * 100) + '%'
                _this.$refs.hollowPieData.setEcharts()
                let event = JSON.parse(res.data.event)
                _this.pieData[0].value = event[8]
                _this.pieData[1].value = event[9]
                _this.pieData[2].value = event[10]
                _this.pieData[3].value = event[11]
                _this.pieData[4].value = event[12]
                _this.pieData[5].value = event[13]
                _this.pieData[6].value = event[14]
                _this.pieData[7].value = event[15]
                _this.pieData[8].value = event[16]
                _this.pieData[9].value = event[17]
                _this.pieData[10].value = event[18]
                _this.$refs.studentBehavior.setEcharts()
                let concentrateRate = res.data.concentrateRate
                let participateRate = res.data.participateRate
                let confusionRate = res.data.confusionRate
                let activityRate = res.data.activityRate
                let sum = concentrateRate + confusionRate + participateRate + activityRate
                let teachStyleArr = [
                  ["注意力","参与度","疑惑度","活跃度"],
                  ["0.0","0.0","0.0","0.0"]
                ]
                teachStyleArr[1][0] = concentrateRate
                teachStyleArr[1][1] = participateRate
                teachStyleArr[1][2] = confusionRate
                teachStyleArr[1][3] = activityRate
                _this.teachStyleInfo = teachStyleArr
              }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    mounted () {
      if (this.studentId && this.termId) {
        this.getAnalysisInfo()
      }
    }
  }
</script>

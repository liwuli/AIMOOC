<template>
  <div class="app">
    <Ghead></Ghead>
    <div class="center">
      <div class="wrap">
        <div class="tab">
          <router-link to="statusMonitor" class="item">教情学情监测</router-link>
          <div class="divide"></div>
          <div class="item" style="color:#00dfff;">智慧教学分析</div>
        </div>
        <div class="nav">
          <div class="floatleft">
            <div class="nav-item selected">课程数据总览</div>
            <router-link to="courseAnalysis" class="nav-item">课程详情</router-link>
            <router-link to="courseContrast" class="nav-item">课程对比分析</router-link>
          </div>
          <div class="floatright" ><div id="select01" style="width: 570px;"></div><div id="select02" style="width: 140px;text-align: center;display: none;"></div></div>
        </div>
        <div class="row part">
          <div class="grid" style="width: 565px;height: 437px">
            <div class="title" style="margin-bottom: 40px;"><img src="/static/images/behavior.png" alt="">教学行为</div>
            <div class="row">
              <div style="text-align: center">
                <span class="showy" style="margin-right: 35px">老师行为<span>{{teacherEventRate}}%</span></span>
                <span class="showy">学生行为<span>{{studentEventRate}}%</span></span>
              </div>
              <div style="height: 280px;">
                <PiePercent id="teachingBehavior" ref="teachingBehavior" :item-list="teachingBehavior" :center="center1" :legendSite="legendSite1"></PiePercent>
              </div>
            </div>
          </div>
          <div class="grid" style="width: 482px;height: 437px;margin-left: 1px;">
            <div class="title" style="margin-bottom: 60px;"><img src="/static/images/informationize.png" alt="">教学信息化</div>
            <div class="row">
              <div class="floatleft shadow-grid" style="width:170px;height: 250px;">
                <div style="height: 100%;">
                  <ChartSingleDoughnut ref="midTopChart" id="mid-top-chart" :num="avgMultimediaRate" :palette="palette"></ChartSingleDoughnut>
                </div>
              </div>
              <div class="floatright shadow-grid" style="width:245px;height: 250px;">
                <Top5 :list="multimediaList"></Top5>
              </div>
            </div>
          </div>
          <div class="grid" style="width: 571px;height: 437px;margin-left: 1px;">
            <div class="title" style="margin-bottom: 30px;"><img src="/static/images/interact.png" alt="">教学互动</div>
            <div class="row">
              <div class="floatleft" style="width: 250px;height: 290px;">
                <PiePercent id="interact" ref="interact" :item-list="interactInfo" :center="center2" :legendSite="legendSite2"></PiePercent>
              </div>
              <div class="floatright">
                <div style="text-align: center;margin-bottom: 20px;"><span class="showy">师生互动率<span>{{tsRate}}%</span></span></div>
                <div class="shadow-grid" style="width:245px;height: 250px;margin: 0 auto;">
                  <Top5 :list="stuBehaviorList"></Top5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav">
          <div class="floatleft">
            <div class="nav-item selected">教师数据总览</div>
            <router-link to="teacherAnalysis" class="nav-item">教师详情</router-link>
            <router-link to="teacherContrast" class="nav-item">教师对比分析</router-link>
          </div>
        </div>
        <div class="row part">
          <div class="grid" style="width: 680px;height: 400px">
            <div class="title" style="margin-bottom: 20px;"><img src="/static/images/boardred.png" alt="">教学模式</div>
            <div class="row">
              <BarList :list="patternList"></BarList>
            </div>
          </div>
          <div class="grid" style="width: 939px;height: 400px;margin-left: 1px;">
            <div class="title" style="margin-bottom: 30px;"><img src="/static/images/teacher.png" alt="">老师行为</div>
            <div class="row">
              <div class="floatleft" style="width: 520px;">
                <PieOutChart id="teacherBehavior" ref="teacherBehavior" :pieData="teacherBehavior" :style="pieChartSize[0]"></PieOutChart>
              </div>
              <div class="floatleft" style="padding: 50px 20px 0">
                <div class="preiection">
                  <div style="margin-bottom: 50px;"><span class="showy">{{teacherBehaviorRate[0].name}}<span>{{teacherBehaviorRate[0].value}}%</span></span></div>
                </div>
                <div class="sunken">
                  <div><span class="showy">{{teacherBehaviorRate[1].name}}<span>{{teacherBehaviorRate[1].value}}%</span></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav">
          <div class="floatleft">
            <div class="nav-item selected">班级数据总览</div>
            <!-- <router-link to="#" class="nav-item">班级详情</router-link> -->
            <router-link to="classContrast" class="nav-item">班级对比分析</router-link>
          </div>
        </div>
        <div class="row">
          <div class="grid" style="width: 606px;height: 525px">
            <div class="title" style="margin-bottom: 40px;"><img src="/static/images/boardblue.png" alt="">学生状态</div>
            <div class="row">
              <div class="row middle" style="padding: 25px 2px;width: 516px;">
                <button type="button" v-for="(item, index) in btnList" :class="[orderType===index+1?'active':'initial', 'circle']"
                        @click="getStudentStatusForIndex(index,item.value)">
                  <div class="upper">{{item.name}}</div>
                  <div class="lower">{{stuStatus[index]}}%</div>
                </button>
              </div>
              <div class="shadow-grid middle" style="width:480px;height: 250px;">
                <Top5 :bar="true" :list="stuStatusTop5"></Top5>
              </div>
            </div>
          </div>
          <div class="grid" style="width: 501px;height: 525px;margin-left: 1px;">
            <div class="title" style="margin-bottom: 60px;"><img src="/static/images/crowd.png" alt="">学生行为</div>
            <div class="row">
              <div style="text-align: center">
                <span class="showy" style="margin-right: 50px">{{studentBehaviorRate[0].name}}<span>{{studentBehaviorRate[0].value}}%</span></span>
                <span class="showy">{{studentBehaviorRate[1].name}}<span>{{studentBehaviorRate[1].value}}%</span></span>
              </div>
              <div style="height: 300px;margin-top: 50px;">
                <PieOutChart id="studentBehavior" ref="studentBehavior" :pieData="studentBehavior" :style="pieChartSize[1]"></PieOutChart>
              </div>
            </div>
          </div>
          <div class="grid" style="width: 511px;height: 525px;margin-left: 1px;">
            <div class="title" style="margin-bottom: 85px;"><img src="/static/images/right.png" alt="">学生到勤</div>
            <div class="row">
              <div class="floatleft shadow-grid" style="width:170px;height: 250px;">
                <div style="height: 100%;">
                  <div class="txt">总体表现</div>
                  <div style="height: 200px">
                    <ChartSingleDoughnut ref="rigBotChart" id="rig-bot-chart" :num="avgPoint" :palette="palette"></ChartSingleDoughnut>
                  </div>
                </div>
              </div>
              <div class="floatright shadow-grid" style="width:245px;height: 250px;">
                <Top5 :list="stuAttitude"></Top5>
              </div>
            </div>
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
  import PiePercent from './echartsModule/piePercent'
  import PieOutChart from './echartsModule/pieOutChart'
  import Top5 from './top5'
  import BarList from './barList'
  import ChartSingleDoughnut from './echartsModule/chartSingleDoughnut'
  import {paletteRoom, classes} from './config/homePage'
  import {findAllClassesList} from './config'
  import {
    getStudentStatusForIndex,
    getStudentAttendRateForIndex,
    getInteractionForIndex,
    getTeachingModel,
    findTermsLists,
    getTeacherActAnalysisForIndex,
    getMultimediaRateForIndex,
		findSchoolParticipateRateAvg
  } from './config/urlConfig'

  import { } from './config/index'

  export default {
    name: 'status-monitor',
    components: {
      Ghead,
      Gfoot,
      PiePercent,
      ChartSingleDoughnut,
      Top5,
      BarList,
      PieOutChart
    },
    data () {
      return {
        moni:  (localStorage.getItem('moni')=="true" ? true :false),
        orderType: '1',
        stuStatus: [],
        stuStatusTop5: [],
        stuAttitude: [],
        avgPoint: 0,
        stuBehaviorList: [],
        multimediaList: [],
        avgMultimediaRate: 0,
        studentEventRate: 0,
        teacherEventRate: 0,
				tsRate:0,
				startDate: '',
				endDate: '',

        teachingBehavior: [
          {name: '老师语言率', value: 0, label: {color: '#0a545e'}},
          {name: '学生行为占有率', value: 0, label: {color: '#682b1f'}},
          {name: '老师活动率', value: 0, label: {color: '#441241'}}],
        patternList: [{value: 0, name: '注意力'}, {value: 0, name: '参与度'}, {value: 0, name: '疑惑度'}, {value: 0, name: '活跃度'}],
        teacherBehavior: [
          {value: 0, name: '讲授'},
          {value: 0, name: '提问'},
          {value: 0, name: '板书'},
          {value: 0, name: '演示或展示'},
          {value: 0, name: '个别指导'},
          {value: 0, name: '媒体使用'}
        ],
        studentBehavior: [
          {value: 0, name: '讨论'},
          {value: 0, name: '讲读演'},
          {value: 0, name: '听讲或思考'},
          {value: 0, name: '阅读'},
          {value: 0, name: '笔记'},
          {value: 0, name: '媒体使用'}
        ],
        pieChartSize: [{height: '260px', width: '450px'}, {height: '260px', width: '450px'}],
        btnList: [
          {name: '注意力', value: 'concentrateRate'},
          {name: '疑惑度', value: 'doubtRate'},
          {name: '参与度', value: 'participateRate'},
          {name: '活跃度', value: 'activityRate'}
        ],
        palette: paletteRoom[0],
        termList: [],
        center1: ['28%', '50%'],
        legendSite1: ['280', 'center'],
        interactInfo: [
          {name: '一般性互动', value: 0, label: {color: '#0a545e'}},
          {name: '复杂性互动', value: 0, label: {color: '#682b1f'}},
          {name: '低效或无效互动', value: 0, label: {color: '#441241'}}
        ],
        center2: ['50%', '30%'],
        legendSite2: ['center', 'bottom']
      }
    },
    computed: {

			/*
			* teacherEvent1 到teacherEvent7之间的数据相加，讲授：取teacherEvent1的数据 除于（teacherEvent1 到teacherEvent7）相加的总和得到百分比，
			* 板书：取teacherEvent3的数据 除于（teacherEvent1 到teacherEvent7）相加的总和得到百分比
			*
			* */
      teacherBehaviorRate () {
		  var arr = [];
		  var maximum = this.teacherBehavior[0].value;
		  var maxiname = this.teacherBehavior[0].name;
		  var Minimum = this.teacherBehavior[0].value;
		  var Mininame =this.teacherBehavior[0].name;
		  let sum = 0
		for (let i = 0; i < this.teacherBehavior.length; i++) {
			sum += this.teacherBehavior[i].value * 1
		      if(this.teacherBehavior[i].value>maximum){
				  maximum=this.teacherBehavior[i].value;
				  maxiname=	this.teacherBehavior[i].name;
			  }

			  if(Minimum<=this.teacherBehavior[i].value){

			  }else{
				  Minimum=this.teacherBehavior[i].value;
				  Mininame=	this.teacherBehavior[i].name;
			  }

		     }
		console.log(sum);
		arr.push({
			name:maxiname,
			value:maximum == 0 ? 0 : ((maximum/sum)*100).toFixed(0)
		})
		arr.push({
			name:Mininame,
			value:Minimum == 0 ? 0 : ((Minimum/sum)*100).toFixed(0)
		})
		return arr
      },


      studentBehaviorRate () {
  //       let arr = []
  //       let sum = 0
  //       for (let i = 0; i < this.studentBehavior.length; i++) {
  //         sum += this.studentBehavior[i].value * 1
  //       }
  //       if(sum) {
  //         arr[0] = Math.round(this.studentBehavior[3].value / sum * 10000) / 100
  //         arr[1] = Math.round(this.studentBehavior[0].value / sum * 10000) / 100
  //       }else{
		// 			arr=["0","0"]
		// }
		// 		//console.log(this.studentBehavior)
  //       return arr

		  var arr = [];
		  var maximum = this.studentBehavior[0].value;
		  var maxiname = this.studentBehavior[0].name;
		  var Minimum = this.studentBehavior[0].value;
		  var Mininame =this.studentBehavior[0].name;
		  let sum = 0
		for (let i = 0; i < this.studentBehavior.length; i++) {
			 sum += this.studentBehavior[i].value * 1
		      if(this.studentBehavior[i].value>maximum){
				  maximum=this.studentBehavior[i].value;
				  maxiname=	this.studentBehavior[i].name;
			  }

			  if(Minimum<=this.studentBehavior[i].value){

			  }else{
				  Minimum=this.studentBehavior[i].value;
				  Mininame=	this.studentBehavior[i].name;
			  }

		     }
		arr.push({
			name:maxiname,
			value:maximum == 0 ? 0 : ((maximum/sum)*100).toFixed(0)
		})
		arr.push({
			name:Mininame,
			value:Minimum == 0 ? 0 : ((Minimum/sum)*100).toFixed(0)
		})
		return arr

      }
    },
    methods: {
      async init () {
        try {
          // 学期选择信息
          const res = await this.axios.post(findTermsLists)
          let objs = res.data.termList || []
          let temp = []
          //temp[0] = {value: '-1', txt: '选择学期'}
          let termId = this.$route.params.termId
          for (let item = 0, len = objs.length; item < len; item++) {
            if (!objs[item].startTime || !objs[item].endTime) {
              return
            }
            let startTime = objs[item].startTime.split(' ')[0]
            let endTime = objs[item].endTime.split(' ')[0]
            let str = objs[item].termName + '(' + startTime.replace(/-/g, '') + '-' + endTime.replace(/-/g, '') + ')'

            // r如果用户刷新页面 取不到路由里面的参数  就走原来的判断方法
            if(termId!=undefined){
              if(objs[item].termId== termId){
                this.termId = objs[item].termId
                this.startDate = startTime
                this.endDate = endTime
              }
            }else{
              if (objs[item].currentWeekNo > 0 && objs[item].currentWeekNo < 26) {
                this.termId = objs[item].termId
                this.startDate = startTime
                this.endDate = endTime
              }
            }

            temp[item ] = {value: objs[item].termId, txt: str, endTime: endTime, startTime: startTime}
          }
          this.termList = temp
          // 构建选择框
          this.makeSelecTerm()
          this.collegeSelect()
          // 获取信息
          this.getTeacherActAnalysisForIndex()
          this.getMultimediaRateForIndex()
          this.getTeachingModel()
          this.getInteractionForIndex()
          this.getStudentAttendRateForIndex()
          this.getStudentStatusForIndex(0, 'concentrateRate')
        } catch (err) {
          console.log(err)
        }
      },

      async getTeacherActAnalysisForIndex () {
        const res = await this.axios.post(getTeacherActAnalysisForIndex, {startTime: this.startDate, endTime: this.endDate})
					// 师生互动率
		if (res.data && res.data.data) {
          let obj = res.data.data
          // 教学行为
					// var ActionRatesum = obj.teacherActionRate + obj.teacherLanguageRate + obj.studentActionRate + obj.studentLanguageRate;
					//
					//
     //      this.teacherEventRate = Math.round(((obj.teacherActionRate + obj.teacherLanguageRate)/ActionRatesum|| 0) * 100)
     //      this.studentEventRate = Math.round(((obj.studentActionRate + obj.studentLanguageRate)/ActionRatesum|| 0) * 100)
					//
     //      this.teachingBehavior[0].value = Math.round((obj.teacherLanguageRate/ActionRatesum || 0) * 100)
     //      this.teachingBehavior[1].value = Math.round(((obj.studentActionRate+obj.studentLanguageRate)/ActionRatesum || 0) * 100)
     //      this.teachingBehavior[2].value = Math.round((obj.teacherActionRate/ActionRatesum || 0) * 100)
		  // 教学行为
          this.teacherEventRate = Math.round((obj.teacherEventRate || 0) * 100) / 100
          this.studentEventRate = Math.round((obj.studentEventRate || 0) * 100) / 100

          this.teachingBehavior[0].value = Math.round((obj.teacherLanguageRate || 0) * (obj.teacherEventRate || 0)) / 100
          this.teachingBehavior[1].value = Math.round((obj.studentEventRate || 0) * 100) / 100
          this.teachingBehavior[2].value = Math.round((obj.teacherActionRate || 0) * (obj.teacherEventRate || 0)) / 100
          // 老师行为
          this.teacherBehavior[0].value = obj.teacherEvent1 || 0
          this.teacherBehavior[1].value = obj.teacherEvent2 || 0
          this.teacherBehavior[2].value = obj.teacherEvent3 || 0
          this.teacherBehavior[3].value = obj.teacherEvent4 || 0
          this.teacherBehavior[4].value = obj.teacherEvent6 || 0
          this.teacherBehavior[5].value = obj.teacherEvent7 || 0
          // 学生行为
          this.studentBehavior[0].value = obj.studentEvent2 || 0
          this.studentBehavior[1].value = obj.studentEvent3 || 0
          this.studentBehavior[2].value = obj.studentEvent4 || 0
          this.studentBehavior[3].value = obj.studentEvent5 || 0
          this.studentBehavior[4].value = obj.studentEvent6 || 0
          this.studentBehavior[5].value = obj.studentEvent7 || 0
          // 重构图形
          this.$refs.teachingBehavior.setEcharts()
          this.$refs.teacherBehavior.setEcharts()
          this.$refs.studentBehavior.setEcharts()
        }

				const ttt = await this.axios.post(findSchoolParticipateRateAvg, {startDate: this.startDate, endDate: this.endDate})
				this.tsRate=(Math.round((ttt.data.ts_interactionRate || 0) * 10000) / 100)
        if(this.moni){
          this.tsRate = 90;
        }

      },
      async getMultimediaRateForIndex () { // 教学信息化
        const res = await this.axios.post(getMultimediaRateForIndex, {startTime: this.startDate, endTime: this.endDate})
				//console.log(res);
        this.avgMultimediaRate = Math.round((res.data.avgMultimediaRate || 0) * 100) / 100
        if (res.data.data) {
          let obj = res.data.data
          let arr = []
          for (let i = 0, len = obj.length; i < len; i++) {
            arr.push({name: obj[i].collegeName, value: Math.round((obj[i].multimediaRate || 0) * 100) / 100})
          }
          this.multimediaList = arr
        }
      },
      async getTeachingModel () { // 教学模式
        const res = await this.axios.post(getTeachingModel, {startTime: this.startDate, endTime: this.endDate})
				//console.log(res);
        let obj = res.data.data || []
        if (obj[0] && obj[1]) {
          let arr = []
          for (let i = 0, len = obj[0].length; i < len; i++) {
            arr.push({name: obj[0][i], value: Math.round((obj[1][i] || 0) * 100) / 100})
          }
          this.patternList = arr
        }
      },
      async getInteractionForIndex () { // 教学互动
        const res = await this.axios.post(getInteractionForIndex, {startTime: this.startDate, endTime: this.endDate})
				//console.log(res);
        if (res.data.data) {
          let obj = res.data.data
          let arr = []
          for (let i = 0, len = obj.length; i < len; i++) {
            arr.push({name: obj[i].collegeName, value: Math.round((obj[i].ts_interactionRate || 0) * 100) / 100})
          }
          this.stuBehaviorList = arr
        }
        if (res.data.threeInteractionType) {

					let data = res.data.threeInteractionType
					var  num =data.normalInteraction + data.complexInteraction + data.invalidInteraction

					// 注释  原本是直接赋值的

          this.interactInfo[0].value = (data.normalInteraction/num)== 0 ? 0 :((data.normalInteraction/num)*100).toFixed(2)
          this.interactInfo[1].value = (data.complexInteraction/num) == 0 ? 0 :((data.complexInteraction/num)*100).toFixed(2)
          this.interactInfo[2].value = (data.invalidInteraction/num) == 0 ? 0 : ((data.invalidInteraction/num)*100).toFixed(2)
        }
        this.$refs.interact.setEcharts()
      },
      async getStudentAttendRateForIndex () { // 学生态度
        const res = await this.axios.post(getStudentAttendRateForIndex, {startTime: this.startDate, endTime: this.endDate})
				//console.log(res);
        this.avgPoint = Math.round((res.data.avgPoint || 0) * 100)
        if (res.data.data) {
          let obj = res.data.data
          let arr = []
          for (let i = 0, len = obj.length; i < len; i++) {
            arr.push({name: obj[i].classesName, value: Math.round((obj[i].attendRate || 0) * 100)})
          }
          this.stuAttitude = arr
        }
      },
      async getStudentStatusForIndex (index, value) { // 学生状态
    //     this.orderType = index + 1
    //     const res = await this.axios.post(getStudentStatusForIndex, {orderTypes: this.orderType, startTime: this.startDate, endTime: this.endDate})
    //     //console.log(res);
				// let arr = []
				// var datasum = res.data.concentrateRateAvg+res.data.doubtRateAvg+res.data.participateRateAvg+res.data.activityRateAvg;
    //     arr.push(Math.round((res.data.concentrateRateAvg/datasum || 0) * 10000) / 100)
    //     arr.push(Math.round((res.data.doubtRateAvg/datasum || 0) * 10000) / 100)
    //     arr.push(Math.round((res.data.participateRateAvg/datasum || 0) * 10000) / 100)
    //     arr.push(Math.round((res.data.activityRateAvg/datasum || 0) * 10000) / 100)
    //     this.stuStatus = arr
    //     if (res.data.data) {
    //       let obj = res.data.data
    //       let arr = []
    //       for (let i = 0, len = obj.length; i < len; i++) {
    //         arr.push({name: obj[i].classesName, value: Math.round((obj[i][value] || 0) * 10000) / 100})
    //       }
    //       this.stuStatusTop5 = arr
    //     }
				this.orderType = index + 1
        const res = await this.axios.post(getStudentStatusForIndex, {orderTypes: this.orderType, startTime: this.startDate, endTime: this.endDate})
        //console.log(res);

				let arr = []
        arr.push(Math.round((res.data.concentrateRateAvg || 0) * 10000) / 100)
        arr.push(Math.round((res.data.doubtRateAvg || 0) * 10000) / 100)
        arr.push(Math.round((res.data.participateRateAvg || 0) * 10000) / 100)
        arr.push(Math.round((res.data.activityRateAvg || 0) * 10000) / 100)
        this.stuStatus = arr
        if (res.data.data) {
          let obj = res.data.data
          let arr = []
          for (let i = 0, len = obj.length; i < len; i++) {
            arr.push({name: obj[i].classesName, value: Math.round((obj[i][value] || 0) * 10000) / 100})
          }
          this.stuStatusTop5 = arr
        }
      },
      makeSelecTerm () {
        let that = this
        that.termId=this.termList[0].value
        this.$Select({
          data: this.termList,
          classes: classes,
          'style': 'border:none;',
          'selectId': 'select01',
          'callback': function (obj) {
            obj.startTime && (that.startDate = obj.startTime)
            obj.endTime && (that.endDate = obj.endTime)

            that.getTeacherActAnalysisForIndex()
            that.getMultimediaRateForIndex();
            that.getTeachingModel();
            that.getInteractionForIndex();
            that.getStudentAttendRateForIndex();
            that.getStudentStatusForIndex(0, 'concentrateRate');
          },
          'matchval': [{val: that.termId}]
        })
      },
      async collegeSelect () { // 学院选择下拉菜单
        try {
          const res = await this.axios.post(findAllClassesList)
          let objs = res.data.classesList || []
          let temp = []
          temp[0] = {value: '-1', txt: '全部院系'}
          for (let item = 0, len = objs.length; item < len; item++) {
            temp[item + 1] = {value: objs[item].collegeId, txt: objs[item].collegeName}
          }
          let that = this
          this.$Select({
            'data': temp,
            classes: classes,
            'style': 'border:none;',
            'selectId': 'select02',
            'callback': function (obj) {
               console.log(obj)
            },
            'matchval': [{val: -1}]
          })
        } catch (err) {
          console.log(err)
        }
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  div{box-sizing: border-box;}
  .app{
    background: #080b24;
  }
  .wrap{
    width: 1620px;
    margin: 0 auto;
    .tab{
      height: 60px;
      background: #283054;
      border-bottom: 1px solid #000;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .item{
        cursor: pointer;
        color: #fff;
        float: left;
        line-height: 60px;
        font-size: 22px;
        padding: 0 30px;
      }
      .item:hover{
        color: #00dfff;
      }
      .divide{
        margin-top: 20px;
        float: left;
        height: 19px;
        width: 2px;
        background: #696d7e;
      }
    }
  }
  .nav{
    height: 62px;
    line-height: 62px;
    background: #161c41;
    margin-bottom: 1px;
    padding: 16px 20px 0;
    .nav-item{
      margin-right: 60px;
      float: left;
      color: #fff;
      height: 40px;
      line-height: 35px;
      font-size: 22px;
    }
    .selected{
      color: #00dfff;
      border-bottom: 1px solid #00dfff;
    }
  }
  .grid{
    float: left;
    padding: 28px 25px 0;
    background: #171b41;
    .title{
      height: 30px;
      line-height: 30px;
      color: #fff;
      font-size: 24px;
      img{
        float: left;
        padding: 2px;
        height: 100%;
        box-sizing: border-box;
        display: block;
        margin-right: 10px;
      }
    }
  }
  .shadow-grid{
    overflow-y: auto;
    box-shadow: 0px 0px 20px #0f1434;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    background: #181d45;
    .txt{
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 20px;
      color: #fff;
    }
  }
  .showy{
    display: inline-block;
    padding: 0 15px;
    height: 50px;
    line-height: 45px;
    color: #fff;
    font-size: 20px;
    max-width: 226px;
    white-space: nowrap;
    border: 1px solid #00dfff;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    box-shadow: 0px 0px 20px rgba(0,223,255,0.8) inset,0px 0px 20px rgba(0,223,255,0.5);
    span{
      vertical-align: top;
      color: #00dfff;
      font-size: 26px;
      padding-left: 30px;
      font-weight: 600;
    }
  }
  .circle{
    float: left;
    height: 110px;
    width: 110px;
    cursor: pointer;
    border: 2px solid;
    background: none;
    margin: 0 9px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    line-height: 18px;

    .upper{
      font-size: 18px;
      color: #fff;
    }
    .lower{
      margin-top: 10px;
      font-size: 18px;
      color: #fff;
    }
  }
  .preiection{padding-left: 50px;background: url("/static/images/preiection.png") no-repeat 0 10px;}
  .sunken{padding-left: 50px;background: url("/static/images/sunken.png") no-repeat 0 16px;}
  .middle{margin: 0 auto;}
  .initial{border-color: #00dfff;box-shadow: 0px 0px 10px #00dfff inset,0px 0px 10px #00dfff;span{color: #00dfff;}}
  .active{border-color: #3B3FF6;box-shadow: 0px 0px 10px #3B3FF6 inset,0px 0px 10px #3B3FF6;span{color: #3B3FF6;}}
  .part{margin-bottom: 5px;}
  .ruler:after{
    content:'';
    width:0;
    height:100%;
    display:inline-block;
    vertical-align:middle;
  }
  .Select{
    box-shadow: none;
    background: none;
  }
</style>

<style>

   .icon-selectarr{
  	position: absolute;
  	top:0px;
  	right: 5px;
  	color: #00dfff;
  }

  .show-noborder{
  	color: #00dfff !important;
  }
</style>

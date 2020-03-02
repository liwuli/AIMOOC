<template>
  <div class="app">
    <Ghead></Ghead>
    <div class="center">
      <div class="wrap">
        <div class="tab">
          <div class="item" style="color:#00dfff;">教情学情监测</div>
          <div class="divide"></div>
          <div class="item" @click="openpage">智慧教学分析</div>

          <el-switch style="float: right;margin-top: 20px;margin-right: 20px;"
            v-model="moni" @change="switch_change"
            active-color="#13ce66"
            inactive-color="#000000">
          </el-switch>
         <span style="float: right;color: #ffffff;line-height: 60px;margin-right: 20px;">模拟数据:</span>
          <!-- <router-link to="teachAnalyze" class="item">智慧教学分析</router-link> -->
        </div>
        <div class="content">
          <div class="left list" :style="'min-height:'+minhei+'px'">
            <div class="date"><span class="left" style="font-weight: 600;">{{date}}</span><span class="right">{{week}}</span></div>
            <div class="red" style="font-size: 32px;font-weight: 700;">{{time}}</div>
            <div class="red" style="font-size: 28px;">{{(classArr[0] || 0) >0?'上课中':'未上课'}}</div>

            <p class="section"><span class="left">{{className}}</span><span class="right" style="min-width: 100px;">{{startTime!=''?(startTime+'-'+endTime):'&nbsp;'}}</span></p>
            <div v-for="(item, index) in classInfo" class="item" :key="index">
              <div class="pic"><span :class="item.icon"></span></div>
              <span>{{item.text}}</span><span class="right">节</span><span class="right" style="margin-right: 5px;font-size: 26px;">{{classArr[index]}}</span>
            </div>
            <p style="text-align: right"><router-link to="intelligentterminalmonitor" style="color:#00dfff;font-size: 18px;">智慧分析监控></router-link></p>

            <p class="pie-title"><img src="/static/images/house.png" alt=""><span style="font-size: 20px;">教室使用</span></p>
            <div><div class="showy">上课教室使用率<span>{{classroomRate}}%</span></div></div>
            <div id="seatRate" style="width: 100%;height: 248px;"></div>
          </div>
          <div class="rightWrap">
            <div class="title">
              <div id="select01" style="width: 570px;"></div>
              <div id="select02" class="Select" style="width: 140px;text-align: center"></div>
              <img v-show="isFull" class="right" @click="fullScreen" src="/static/images/fullscreen.png" alt="">
            </div>
            <div class="row">
              <div class="grid floatleft">
                <div class="first">
                  <span class="left" style="text-indent: 45px">教学学风指数</span>
                  <span class="right scole">{{Math.round(avgPoint)}}</span>
                </div>
                <div class="shadow-grid" style="height: 308px;">
                  <div class="top">学院排名</div>
                  <div class="scrollfather" id="servercontrol" style="height: 244px;width: 100%;">
                    <div class="scrollson">
                      <div class="stand-item" v-for="(item, index) in pointList" :key="index">
                        <div class="left text_overflow" :title="item.collegeName">{{item.collegeName}}</div>
                        <div class="bar" :style="'width:'+item.avgTeachingQuality/100*360+'px'" style="margin-left: 10px;"></div>
                        <div class="right">{{Math.round(item.avgTeachingQuality||'0')}}</div>
                      </div>
                    </div>
                    <div class="scroll_ymove"><div class="scroll_y01"></div></div>
                    <div class="scroll_xmove"><div class="scroll_x"></div></div>
                  </div>
                </div>
                <div class="row" style="padding: 24px 2px;">
                  <button
                    type="button"
                    @click="getTeachingStyleIndex(item.value)"
                    v-for="(item, index) in btnList"
                    :key="index"
                    class="circle"
                    :class="orderType===item.value?item.type:'initial'">
                    <div class="upper"><span :class="item.icon"></span></div>
                    <div class="lower">{{item.name}}</div>
                  </button>
                </div>
                <div class="left shadow-grid" style="width:29%;height: 234px;margin-bottom: 10px">
                  <div class="txt">总体表现</div>
                  <div style="height: 170px;">
                    <ChartSingleDoughnut ref="totalityExpression" id="mid-bot-chart" :num="totalityExpression" :palette="palette"></ChartSingleDoughnut>
                  </div>
                </div>
                <div class="right shadow-grid" style="width:68%;height: 230px;margin-bottom: 10px">
                  <div class="txt">学院排名</div>
                  <div class="scrollfather" id="servercontrol1" style="height: 170px;width: 100%;">
                    <div class="scrollson">
                      <div class="stand-item-small" v-for="(item, index) in percentList" :key="index">
                        <div class="left text_overflow" style="width: 110px;" :title="item.collegeName">{{item.collegeName}}</div>
                        <div class="bar" :style="'width:'+item[keyWord]/100*200+'px'" style="margin-left: 10px;"></div>
                        <!-- <el-progress :percentage="percentage" color="#409eff"></el-progress> -->
                        <div class="right">{{!(Math.round(item[keyWord]*100)/100)?0:(Math.round(item[keyWord]*100)/100)}}%</div>
                      </div>
                    </div>
                    <div class="scroll_ymove"><div class="scroll_y01" ></div></div>
                    <div class="scroll_xmove"><div class="scroll_x"></div></div>
                  </div>
                </div>
              </div>
              <div class="floatright">
                <div class="grid" style="height: 414px">
                  <div style="height: 130px;">
                    <div class="theme ruler"><div class="mid-box"><img src="/static/images/course.png" alt=""><div>课程</div></div></div>
                    <div class="right-part" style="font-size: 20px;">
											<!-- 此处暂时屏蔽了 微视频 和 课件   修改了下面的scss .list-item  -->
                      <div v-for="(item, index) in courseList" :key="index" class="left" style="height: 100%;width: 33%;">
                        <div style="height: 35px;line-height: 50px;">{{item.title}}</div>
                        <div style="height: 80px;">
                          <ChartHalfDoughnut :id="item.value" :num="schoolJson[index]" :palette="paletteHalf[index]"></ChartHalfDoughnut>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hadow-grid" style="width:100%;height: 270px;margin-bottom: 10px">
                    <div class="scrollfather" id="servercontrol2" style="height: 267px;width: 100%;">
                      <div class="scrollson" style="height: 95%;">
                        <StackedAreaChart ref="stackedArea"></StackedAreaChart>
                      </div>
                      <div class="scroll_ymove"><div class="scroll_y" ></div></div>
                      <div class="scroll_xmove"><div class="scroll_x01"></div></div>
                    </div>
                  </div>
                </div>
                <div class="grid" style="height: 206px;margin-top: 1px;">
                  <div class="theme ruler"><div class="mid-box"><img src="/static/images/resource.png" alt=""><div>资源</div></div></div>
                  <div class="right-part">
                    <div class="list-item" v-for="(item, index) in resourceText" :key="index">
                      <div class="left ruler" style="height: 100%;"><img class="var-mid" :src="item.src" alt=""></div>
                      <div class="right-part ruler">
                        <div class="var-mid" style="font-size: 20px;line-height: 35px">
                          <div>{{item.name}}</div><div style="color: #00dfff">{{resourceValue[item.value]||0}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid" style="height: 208px;margin-top: 1px;">
                  <div class="theme ruler"><div class="mid-box"><img src="/static/images/house.png" alt=""><div>教室</div></div></div>
                  <div class="right-part">
                    <div v-for="(item, index) in classroomText" :key="index" class="left" style="width: 50%;height: 100%;">
                      <div class="midTxt">{{item.title}}<span :style="colorArr[index]">{{classroomTotal[index]}}</span></div>
                      <div style="height: 66%;"><ChartSingleDoughnut :id="item.value" :num="classroomPercent[index]" :palette="paletteRoom[index]"></ChartSingleDoughnut></div>
                    </div>
                  </div>
                </div>
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
  import ChartSingleDoughnut from './echartsModule/chartSingleDoughnut'
  import ChartHalfDoughnut from './echartsModule/chartHalfDoughnut'
  import StackedAreaChart from './echartsModule/stackedAreaChart'
  import {paletteRoom, paletteHalf, getWeek, btnList, seatRateCreate, classes} from './config/homePage'
  import {classroomsCount, findAllResCount, findTotalAiBrainStatus, findTermsLists, getTeachingStyleIndex, findSchoolParticipateRateAvg} from './config/urlConfig'

  export default {
    name: 'status-monitor',
    components: {
      Ghead,
      Gfoot,
      ChartSingleDoughnut,
      ChartHalfDoughnut,
      StackedAreaChart
    },
    data () {
      return {
        moni:  (localStorage.getItem('moni')=="true" ? true :false),
        btnList: btnList,
        seatRateCreate: seatRateCreate,
        paletteHalf: paletteHalf,
        paletteRoom: paletteRoom,
        palette: ['#a14bba', '#1d2361'],
        colorArr: [{color: '#03a870'}, {color: '#fa7860'}],
        time: new Date().getHours() + ':' + new Date().getMinutes(),
        date: new Date().toLocaleDateString().replace(/\//g, '-'),
        isFull: true,
        minhei: window.innerHeight - 175,
        termId: '',
        termList: [],
        classArr: [],
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        className: '',
        seatFreeRateH: 0,
        seatFreeRateM: 0,
        seatFreeRateL: 0,
        classroomRate: 0,
        avgPoint: '0',
        totalityExpression: '0',
        orderType: '2',
        resourceValue: {},
        pointList: [],
        percentList: [],
        charData2: '7',
        scroll: '',
        scroll1: '',
        schoolJson: [0, 0, 0],
        classroomTotal: [0, 0],
        classroomPercent: [0, 0],
        classroomText: [{title: '智慧教室', value: 'analysis'}, {title: '云录播教室', value: 'control'}],
        navList: ['教师', '班级', '课程'],
        typeName: ['高于50%', '20%~50%', '小于20%'],
        courseList: [
          {title: '师生互动', value: 'ts_interactionRate'},
          {title: '学生注意力', value: 'concentrateRate'},
          {title: '学生参与度', value: 'participateRate'}
        ],
        resourceText: [
          {name: '课程视频', value: 'videoCount', src: '/static/images/book.png'},
          // {name: '微视频', value: 'micVideoCount', src: '/static/images/video.png'},
          {name: '直播', value: 'liveCount', src: '/static/images/live.png'},
          // {name: '课件', value: '568', src: '/static/images/ppt.png'},
          {name: '知识点', value: 'knowledgeCount', src: '/static/images/point.png'},
          {name: '笔记', value: 'noteCount', src: '/static/images/note.png'}
        ],
        classInfo: [
          {icon: 'icon-house', text: '正在上课'},
          {icon: 'icon-mistake', text: '老师缺课'},
          {icon: 'icon-sensitiveWord', text: '敏感词'},
          {icon: 'icon-student', text: '违规行为(学生)'},
          {icon: 'icon-teacher', text: '违规行为(老师)'}
        ]
      }
    },
    computed: {
      keyWord () {
        switch (this.orderType) {
          case '2': return 'avgAttendanceRate'
          case '3': return 'isHaveSensitiveWordTotal'
          case '4': return 'avgIllegalBehaviorRate'
          case '5': return 'teacherIsIllegalTotal'
        }
      },
      week () {
        return getWeek(this.date)
      }

    },

		created() {

      this.intervalId = setInterval(() => {
          this.findTotalAiBrainStatus2()
       }, 30000)

		},

     beforeDestroy() {
      if(this.intervalId) {
          clearInterval(this.intervalId);
      }
    },
    methods: {

// 			getnewtime(){
// 				const intervalObj = setInterval(() => {
// 					var t =new Date().getMinutes();
// 					if(t<10){
// 				      t ="0"+t;
// 				    }
// 				  this.time =	new Date().getHours() + ':' + t
//
// 				}, 6000);
//
// 			},
      switch_change(e){
        localStorage.setItem('moni',e);
        window.location.reload()


      },

      openpage(){
        this.$router.push({ name: 'NteachAnalyze', params: {termId :  this.termId  }})
      },

      start(){
        debugger
      },
      
      async init () {
        try {
          // 学期选择信息
          const res = await this.axios.post(findTermsLists)
          let objs = res.data.termList || []
          let temp = []
          // temp[0] = {value: '-1', txt: '选择学期'}
          // let startTime = objs[0].startTime.split(' ')[0]
          // let endTime = objs[0].endTime.split(' ')[0]
          // let str = objs[0].termName + '(' + startTime.replace(/-/g, '') + '-' + endTime.replace(/-/g, '') + ')'

          this.termId = objs[0].termId
          this.startDate = objs[0].startTime.split(' ')[0]
          this.endDate = objs[0].endTime.split(' ')[0]
          for (let item = 0, len = objs.length; item < len; item++) {
            if (!objs[item].startTime || !objs[item].endTime) {
              return
            }
            let startTime = objs[item].startTime.split(' ')[0]
            let endTime = objs[item].endTime.split(' ')[0]
            let str = objs[item].termName + '(' + startTime.replace(/-/g, '') + '-' + endTime.replace(/-/g, '') + ')'
            // if (objs[item].currentWeekNo > 0 && objs[item].currentWeekNo < 26) {
              // this.termId = objs[item].termId
              // this.startDate = startTime
              // this.endDate = endTime
            // }
            // 月份选择信息
            let arr = []
            arr[0] = {value: '-1', endTime: endTime, startTime: startTime, txt: '全部'}
            if (startTime.split('-')[0] === endTime.split('-')[0]) {
              const year = startTime.split('-')[0]
              const startMonth = startTime.split('-')[1]
              const endMonth = endTime.split('-')[1]
              for (let i = startMonth; i <= endMonth; i++) {
                const monthStr = '-' + ('0' + i).slice(-2)
                const maxNum = new Date(year, i, 0).getDate()
                arr.push({value: i, txt: year + monthStr, startTime: year + monthStr + '-01', endTime: year + monthStr + '-' + maxNum})
              }
            } else {
              const startYear = startTime.split('-')[0]
              const startMonth = startTime.split('-')[1]
              for (let i = startMonth; i < 13; i++) {
                const monthStr = '-' + ('0' + i).slice(-2)
                const maxNum = new Date(startYear, i, 0).getDate()
                arr.push({value: i, txt: startYear + monthStr, startTime: startYear + monthStr + '-01', endTime: startYear + monthStr + '-' + maxNum})
              }
              const endYear = endTime.split('-')[0]
              const endMonth = endTime.split('-')[1]
              for (let i = 1; i <= endMonth; i++) {
                const monthStr = '-' + ('0' + i).slice(-2)
                const maxNum = new Date(endYear, i, 0).getDate()
                arr.push({value: i, txt: endYear + monthStr, startTime: endYear + monthStr + '-01', endTime: endYear + monthStr + '-' + maxNum})
              }
            }
            temp[item] = {value: objs[item].termId, txt: str, endTime: endTime, startTime: startTime, monthList: arr}
          }

          this.termList = temp
           // 获取左侧时间和课程信息
          this.findTotalAiBrainStatus()

          // 右侧信息
          this.getRightInfo()

        } catch (err) {
          console.log(err)
        }
      },
      getRightInfo () {
        this.getTeachingStyleIndex('1')
        this.getTeachingStyleIndex('2')
        this.findSchoolParticipateRateAvg()
        this.seatRateCreate()
        this.findAllResCount()
        this.classroomsCount()
      },
      makeSelecTerm () {
        let that = this
        this.$Select({
          data: this.termList,
          classes: classes,
          'style': 'border:none;',
          'selectId': 'select01',
          'callback': function (obj) {
            obj.startTime && (that.startDate = obj.startTime)
            obj.endTime && (that.endDate = obj.endTime)
            that.getRightInfo()
            that.$Select({
              data: obj.monthList,
              classes: classes,
              'selectId': 'select02',
              'style': 'border:none;',
              'callback': function (obj) {
                obj.startTime && (that.startDate = obj.startTime)
                obj.endTime && (that.endDate = obj.endTime)
                that.getRightInfo()
              }
            })
          },
          'matchval': [{val: that.termId}]
        })
      },
      async findAllResCount () {
        const res = await this.axios.post(findAllResCount, {startTime: this.startDate, endTime: this.endDate})
        this.resourceValue = res.data || {}
      },
      async classroomsCount () {
        const res = await this.axios.post(classroomsCount, {startTime: this.startDate, endTime: this.endDate})
				 console.log(res);
        let arrTotal = []
        let arrPercent = []
        arrTotal[0] = res.data.anslysisClassroomTotal || 0
        arrTotal[1] = res.data.controlClassroomTotal || 0
        arrPercent[0] = Math.round((res.data.analysisClassroomPercent || 0) * 10000) / 100
        arrPercent[1] = Math.round((res.data.controlClassroomPercent || 0) * 10000) / 100
        this.classroomTotal = arrTotal
        this.classroomPercent = arrPercent
      },
      async findSchoolParticipateRateAvg () {
        const res = await this.axios.post(findSchoolParticipateRateAvg, {startDate: this.startDate, endDate: this.endDate})
        if (res && res.data.schoolJson) {
					let obj = res.data.schoolJson
          let arr = []
          arr.push(Math.round((obj.ts_interactionRate || 0) * 10000) / 100)
          arr.push(Math.round((obj.concentrateRate || 0) * 10000) / 100)
          arr.push(Math.round((obj.participateRate || 0) * 10000) / 100)
          this.schoolJson = arr

          // this.$refs.ChartHalfDoughnut[0].setEcharts();
        }else{
          this.schoolJson = [0, 0, 0]
        }

        if (res && res.data.colleges) {
          let arr2 = res.data.colleges
          this.$refs.stackedArea.collegeName = []
          this.$refs.stackedArea.concentrateRate = []
          this.$refs.stackedArea.participateRate = []
          this.$refs.stackedArea.ts_interactionRate = []
          for (let i = 0, len = arr2.length; i < len; i++) {

            this.$refs.stackedArea.collegeName.push(arr2[i].collegeName)
            this.$refs.stackedArea.concentrateRate.push(arr2[i].concentrateRate * 100)
            this.$refs.stackedArea.participateRate.push(arr2[i].participateRate * 100)
            this.$refs.stackedArea.ts_interactionRate.push(arr2[i].ts_interactionRate * 100)
          }
          this.$refs.stackedArea.initBottomChart()
          this.getScroll(2)
        }
      },

     // 获取上课时间
     async findTotalAiBrainStatus2 () {
       const res = await this.axios.post(findTotalAiBrainStatus)
       if (res && res.data.result) {
     		//console.log(res);
         let obj = res.data.result

         obj.dateTime && (this.date = obj.dateTime.split(' ')[0]) && (this.time = obj.dateTime.split(' ')[1].slice(0, 5))
         this.className = obj.currentClassNumber ? obj.currentClassNumber.className : ''
         this.startTime = obj.currentClassNumber ? obj.currentClassNumber.startTime.split(' ')[1].slice(0, 5) : ''
         this.endTime = obj.currentClassNumber ? obj.currentClassNumber.endTime.split(' ')[1].slice(0, 5) : ''
        }
     },



      // 获取上课时间
      async findTotalAiBrainStatus () {
        const res = await this.axios.post(findTotalAiBrainStatus)       
        if (res && res.data.result) {
					//console.log(res);
          let obj = res.data.result

          obj.dateTime && (this.date = obj.dateTime.split(' ')[0]) && (this.time = obj.dateTime.split(' ')[1].slice(0, 5))
          this.className = obj.currentClassNumber ? obj.currentClassNumber.className : ''
          this.startTime = obj.currentClassNumber ? obj.currentClassNumber.startTime.split(' ')[1].slice(0, 5) : ''
          this.endTime = obj.currentClassNumber ? obj.currentClassNumber.endTime.split(' ')[1].slice(0, 5) : ''



          // 先把当前服务器时间转换为时间戳
          var time = new Date(this.date).getTime();
          for(var i= 0;i<this.termList.length;i++){

            var startTime = new Date(this.termList[i].startTime).getTime();
            var endTime = new Date(this.termList[i].endTime).getTime();
            if(time>=startTime && time<=endTime){
              this.termId = this.termList[i].value;
              this.startDate = this.termList[i].startTime
              this.endDate = this.termList[i].endTime
            }
          }

          // 构建选择框
          this.makeSelecTerm()

          let arr = []
          arr.push(obj.isHavingClass || 0)
          arr.push(obj.isTeacherMissClass || 0)
          arr.push(obj.isHaveSensitiveWord || 0)
          arr.push(obj.illegalBehavior || 0)
          arr.push(obj.teacherIsIllegal || 0)

          this.classArr = arr
          // 判断是否开启模拟数据
          if(this.moni){
             // 上课教室使用率
             this.classroomRate = 80
             this.seatFreeRateH = 50
             this.seatFreeRateM = 20
             this.seatFreeRateL = 30
             this.seatRateCreate()
          }else{
              // 上课教室使用率
              this.classroomRate = Math.round((obj.classroomRate || 0) * 10000) / 100
              this.seatFreeRateH = Math.round((obj.seatFreeRateH || 0) * 10000) / 100
              this.seatFreeRateM = Math.round((obj.seatFreeRateM || 0) * 10000) / 100
              this.seatFreeRateL = Math.round((obj.seatFreeRateL || 0) * 10000) / 100
              this.seatRateCreate()
          }

        }
      },
      async getTeachingStyleIndex (value) {
        value !== '1' && (this.orderType = value)
        const res = await this.axios.post(getTeachingStyleIndex, {orderType: value, startTime: this.startDate, endTime: this.endDate})
        if (res && res.data && res.data.data) {
          let arr = res.data.data
					//console.log(res);
          switch (value) {
            case '1':
						  this.pointList = arr
              // if(this.moni){
              //   this.avgPoint = '95'
              // }else{
                this.avgPoint = res.data.avgPoint || '0'
              // }
              this.getScroll(0)
              break
            case '2': this.percentList = arr
              this.totalityExpression = res.data.avgPoint
              this.getScroll(1)
              break
            case '3': this.percentList = arr
              this.totalityExpression = res.data.upIsHaveSensitiveWordPercent
              this.getScroll(1)
              break
            case '4': this.percentList = arr
              this.totalityExpression = res.data.avgPoint
              this.getScroll(1)
              break
            case '5': this.percentList = arr
              this.totalityExpression = res.data.upTeacherIsIllegalTotalPercent
              this.getScroll(1)
              break
          }
        }
      },
      getScroll (value) {
        switch (value) {
          case 0: if (!this.scroll) {
            this.scroll = this.$Scroll({
              'scroll_y': 'scroll_y01',
              'father': 'servercontrol',
              'getfatheridPosition': document.querySelector('#servercontrol'),
              'scrollels': '.app'
            })
          } else {
            this.scroll.addElement()
          }
            break
          case 1: if (!this.scroll1) {
            this.scroll1 = this.$Scroll({
              'scroll_y': 'scroll_y01',
              'father': 'servercontrol1',
              'getfatheridPosition': document.querySelector('#servercontrol1'),
              'scrollels': '.app'
            })
          } else {
            this.scroll1.addElement()
          }
            break
          case 2: if (!this.scroll2) {
            this.scroll2 = this.$Scroll({
              'scroll_x': 'scroll_x01',
              'father': 'servercontrol2',
              'getfatheridPosition': document.querySelector('#servercontrol2'),
              'scrollels': '.app'
            })
          } else {
            this.scroll2.addElement()
          }
            break
        }
      },
      fullScreen: function () {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen()
        }
      }
    },
    mounted () {
      this.init()
      let that = this
      document.addEventListener('fullscreenchange', function (e) {
        that.isFull = !that.isFull
      })
      document.addEventListener('mozfullscreenchange', function (e) {
        that.isFull = !that.isFull
      })
      document.addEventListener('webkitfullscreenchange', function (e) {
        that.isFull = !that.isFull
      })
      document.addEventListener('msfullscreenchange', function (e) {
        that.isFull = !that.isFull
      })
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
  }
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
  .content{
    overflow: hidden;
    position: relative;
    .list {
      width: 360px;
      padding: 0 30px;
      margin-right: 5px;
      background: #161c41;
      p{
        color: #fff;
        white-space: nowrap;
      }
    }
    .item{
      overflow: hidden;
      line-height: 50px;
      height: 50px;
      color: #fff;
      font-size: 20px;
      .pic{
        color: #00dfff;
        font-size: 26px;
        line-height: 45px;
        float: left;
        height: 100%;
        width: 36px;
        transform: translateY(3px);
      }
    }
  }
  .date{
    overflow: hidden;
    font-size: 30px;
    line-height: 50px;
    color: #00dfff;
    padding-top: 10px;
  }
  .red{
    color: #ef4d4d;
    line-height: 56px;
    text-align: center;
  }
  .section{
    font-size: 28px;
    line-height: 50px;
    overflow: hidden;
  }
  .pie-title{line-height: 50px;}
  .pie-title img{
    transform: translateY(4px);
    margin-right: 10px;
  }
  .showy{
    width: 250px;
    height: 50px;
    line-height: 45px;
    color: #fff;
    font-size: 20px;
    border: 1px solid #00dfff;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    box-shadow: 0px 0px 20px rgba(0,223,255,0.8) inset,0px 0px 20px rgba(0,223,255,0.5);
    text-align: center;
    margin: 0 auto;
  }
  .showy span{
    vertical-align: top;
    color: #00dfff;
    font-size: 26px;
    padding-left: 20px;
    font-weight: 600;
  }
  .rightWrap{overflow: hidden;}
  .title{
    height: 62px;
    line-height: 62px;
    background: #161c41;
    margin-bottom: 5px;
    padding: 16px 20px 0;
    img{
      cursor: pointer;
    }
  }
  .box{height: 90%;}
  .box div{color: #fff;}
  .grid{
    div{
      color: #fff;
    }
    padding: 0 10px;
    width: 625px;
    background: #161c41;
    .theme{
      width: 100px;
      height: 100%;
      font-size: 24px;
      text-align: center;
      float: left;
      .mid-box{
        vertical-align:middle;
        display:inline-block;
      }
    }
    .right-part{
      height: 100%;
      overflow: hidden;
      text-align: center;
      .midTxt{
        font-size: 20px;
        vertical-align: middle;
        height: 50px;
        line-height: 50px;
        span{
          font-size: 36px;
          vertical-align: middle;
          padding-left: 30px;
        }
      }
    }
    .list-item{
      float: left;
      height: 50%;
      // width: 33%;
			width: 40%;
			margin-left: 10%;
    }
    .top {
      height: 60px;
      font-size: 24px;
      text-align: center;
      line-height: 60px;
    }
    .first{
      background-image: url('/static/images/index.png');
      background-repeat: no-repeat;
      background-position: 0 center;
      background-size: 27px 27px;
      font-size: 26px;
      overflow: hidden;
      height: 100px;
      line-height: 100px;
    }
  }
  .scole{
    text-align: center;
    background-image: url('/static/images/score.png');
    -webkit-background-size: cover;
    background-size: cover;
    width: 140px;
    height: 100px;
    font-size: 48px;
  }
  .shadow-grid{
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
      color: #b651af;
    }
  }
  .stand-item{
    width: 100%;
    padding: 0 25px;
    overflow: hidden;
    font-size: 20px;
    line-height: 50px;
    position: relative;
    .bar{
      height: 10px;
      width: 50px;
      position: absolute;
      left: 160px;
      top: 50%;
      background: linear-gradient(to right, #3c40f7, #139ef9, #0adaf6);
      margin-top: -5px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }
  }
  .stand-item-small{
    width: 100%;
    padding: 0 25px 0 15px;
    overflow: hidden;
    font-size: 15px;
    line-height: 35px;
    position: relative;
    .bar{
      height: 6px;
      width: 50px;
      position: absolute;
      left: 110px;
      top: 50%;
      background: linear-gradient(to right, #3c40f7, #139ef9, #0adaf6);
      margin-top: -3px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 3px;
    }
  }
  .circle{
    float: left;
    height: 130px;
    width: 130px;
    cursor: pointer;
    border: 2px solid;
    background: none;
    margin: 0 9px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    .upper{
      line-height: 26px;
      font-size: 26px;
      color: #00dfff;
    }
    .lower{
      margin-top: 12px;
      font-size: 18px;
    }
  }
  .initial{border-color: #00dfff;box-shadow: 0px 0px 10px #00dfff inset,0px 0px 10px #00dfff;span{color: #00dfff;}}
  .record{border-color: #3B3FF6;box-shadow: 0px 0px 10px #3B3FF6 inset,0px 0px 10px #3B3FF6;span{color: #3B3FF6;}}
  .sensitiveWord{border-color: #733fad;box-shadow: 0px 0px 10px #733fad inset,0px 0px 10px #733fad;span{color: #733fad;}}
  .student{border-color: #FD7B57;box-shadow: 0px 0px 10px #FD7B57 inset,0px 0px 10px #FD7B57;span{color: #FD7B57;}}
  .teacher{border-color: #89BB66;box-shadow: 0px 0px 10px #89BB66 inset,0px 0px 10px #89BB66;span{color: #89BB66;}}
  .Select{
    box-shadow: none;
    background: none;
  }
  .ruler:after{
    content:'';
    width:0;
    height:100%;
    display:inline-block;
    vertical-align:middle;
  }
  .var-mid{
    vertical-align:middle;
    display:inline-block;
  }
  p{margin: 10px 0;}
  .left{float: left;}
  .right{float: right;}

  .text_overflow{
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

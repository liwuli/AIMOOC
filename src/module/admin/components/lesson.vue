<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="center centerbottom50">
      <div class="centers">
        <Linklist></Linklist>
        <div class="AA_right">
          <AJposition></AJposition>
          <div class="G_search" style="margin-bottom: 20px;">

            <div style="float: left;margin-top: 20px;margin-right: 20px;" v-show="eduType">
              <span class="txt" style="float: left;">{{basicinfo.ScollegeN}}:</span>
              <!-- <div id='select85' :style="inputStyle"></div>
              <select id="select86">{{basicinfo.Scollege}}</select> -->
              <el-select v-model="Scollege" filterable placeholder="请选择学院" popper-class="el_selects_css" clearable
                style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in Scollege_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!-- <div class="part" v-show="!eduType">
              <span class="txt">{{basicinfo.SgradeN}}:</span>
              <div id='select95' :style="inputStyle"></div>
              <select id="select96">{{basicinfo.Sgrade}}</select>
            </div> -->

            <div style="float: left;margin-top: 20px; margin-right: 20px;" v-show="!eduType">
              <span class="txt" style="float: left;">{{basicinfo.SgradeN}}:</span>
              <el-select v-model="Sgrade" filterable placeholder="请选择年级" popper-class="el_selects_css" clearable style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in Sgrade_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!-- <div class="part">
              <span class="txt">{{basicinfo.SteacherN}}:</span>
              <div id='select87' :style="inputStyle"></div>
              <select id="select88">{{basicinfo.Steacher}}</select>
            </div> -->

            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.SteacherN}}:</span>
              <el-select v-model="Steacher" filterable placeholder="请选择老师" popper-class="el_selects_css" clearable
                style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in Steacher_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!-- <div class="part" style="margin-left: 20px;"> -->
            <!-- <span class="txt" >{{basicinfo.StermN}}:</span> -->
            <!-- <div id='select81' style="margin-top: 3px;"></div>
              <select id="select82" >{{basicinfo.Sterm}}</select> -->
            <!-- </div> -->



            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.StermN}}:</span>
              <el-select ref="myselect" v-model="Sterm" filterable placeholder="请选择学期" @change="Sterm_change"
                popper-class="el_selects_css" style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in semester_temp" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!-- 类型   -->
            <!-- <div class="part" style="margin-left: 20px;"> -->

            <!-- <div id='select84' :style="inputStyle"> -->
            <!--<div class="listinfo">全部</div>-->
            <!-- <div class="listinfo">{{timetype.week}}</div>
                <div class="listinfo">{{timetype.free}}</div> -->
            <!-- </div> -->

            <!-- </div> -->
            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;" :type="Stype">{{basicinfo.StypeN}}:</span>
              <el-select v-model="select_type" filterable @change="type_change" popper-class="el_selects_css" style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in type_options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!-- 节次模板 -->
            <!-- <div class="part" v-show="showtemplate">
              <span class="txt">{{basicinfo.templateN}}:</span>
              <div id='select92' :style="inputStyle"></div>
              <select id="select93">{{template}}</select>
            </div> -->
            <div style="float: left;margin-top: 20px;margin-right: 20px;" v-show="showtemplate">
              <span class="txt" style="float: left;" :type="Stype">{{basicinfo.templateN}}:</span>
              <el-select v-model="template" filterable popper-class="el_selects_css" style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in template_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>


            <!-- 教室 -->
            <!-- <div class="part" > -->
            <!-- <span class="txt">{{basicinfo.SroomN}}:</span> -->
            <!-- <div id='select70' :style="inputStyle"></div>
              <select id="select71">{{roomid}}</select> -->

            <!-- </div> -->

            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;" :type="Stype">{{basicinfo.SroomN}}:</span>
              <el-select v-model="roomid" filterable placeholder="请选择" :popper-class="'selectsss'" style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in classroom" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>




            <!-- <div class="part" >
              <span class="txt">{{basicinfo.dateN}}:</span>
              <Calendarme  :inputstyle="styles" :dateval="dateval" :valshow="valshow" :part= "part" :ymdhms="ymdhms"   @startfn="startfn" :ids="start"></Calendarme>
            </div> -->

            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;" :type="Stype">{{basicinfo.dateN}}:</span>
             <!-- <Calendarme :inputstyle="styles" :dateval="dateval" :valshow="valshow" :part="part" :ymdhms="ymdhms"
                @startfn="startfn" :ids="start"></Calendarme> -->
              <el-date-picker style="margin-left: 20px;" v-model="dateval" type="date" value-format="yyyy-MM-dd"
                placeholder="选择日期" @change="startfn">
              </el-date-picker>
            </div>




            <!-- <div class="part">
              <div class="btn" @click="search" style="margin-top: 2px">{{basicinfo.searchN}}</div>
            </div> -->
            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <el-button type="primary" @click="search" style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
            </div>

          </div>



          <Railc :minweek="minweek" :weekflag="weekflag" :maxweek="maxWeekNo" :lostday='lostday' :show="show"
            @lessevent="lessevent" @addevent="addevent" @railcevent="railcevent" :dateval="dates" :titleinfo="comments">
            <div v-if="weekflag!=undefined" class="less" style="width: 73px;margin-top: 5px">{{basicinfo.pinkN}}{{weekflag}}{{basicinfo.weekN}}</div>
            <div v-if="weekflag==undefined" class="less" style="width: 73px;margin-top: 5px">放假中</div>
          </Railc>
          <div id="courselist" dates="lessondate" v-show="showtemplate">
            <div class="weeklist" v-for="(item, ind) in weeklist">
              <div class="jieci">
                <span class="span" style="margin-top: 15px;">{{item.className}}</span>
                <span class="span">{{item.startTime.split(' ')[1]}}-{{item.endTime.split(' ')[1]}}</span>
              </div>
              <div v-for="items in 7">
                <div class="weekjieci" :class="item['recording'+ items] === 1 ? 'ing' : (item['recording'+ items] === 0 ? 'nostart' : 'over')"
                  v-if="item['lessonId'+ items]">
                  <div class="opts" v-if="items === weekday && (weekflag - recorddate) === 0 && item['recording'+ items] !== 1"
                    v-show="powerflag">
                    <!--需要判断小时和分钟秒是否是当前时间以后-->
                    <span @click="opteditevent(item, roomid, Stype, template, items)" class="optadd" v-if="item.hms > hms">{{optedit}}</span>
                    <span @click="optdelevent(item, roomid, Stype, template, items)" class="optadd" v-if="item.hms > hms">{{optdel}}</span>
                  </div>
                  <div class="opts" v-if="(weekflag - recorddate) === 0 && items - weekday === 0 && item.hms > hms"
                    v-show="powerflag">
                    <!--需要判断当前周，当天，小时和分钟秒是否是当前时间以后-->
                    <span @click="opteditevent(item, roomid, Stype, template, items)" class="optadd">{{optedit}}</span>
                    <span @click="optdelevent(item, roomid, Stype, template, items)" class="optadd">{{optdel}}</span>
                  </div>
                  <div class="opts" v-if="(weekflag - recorddate) === 0 && items - weekday > 0" v-show="powerflag">
                    <!--需要判断是否是当前周，当天之后-->
                    <span @click="opteditevent(item, roomid, Stype, template, items)" class="optadd">{{optedit}}</span>
                    <span @click="optdelevent(item, roomid, Stype, template, items)" class="optadd">{{optdel}}</span>
                  </div>
                  <div class="opts" v-if="(weekflag - recorddate) > 0 " v-show="powerflag">
                    <!--需要判断选择的周次是否是当前周以后-->
                    <span @click="opteditevent(item, roomid, Stype, template, items)" class="optadd">{{optedit}}</span>
                    <span @click="optdelevent(item, roomid, Stype, template, items)" class="optadd">{{optdel}}</span>
                  </div>
                  <!--课程-章节-课程所属学院-授课老师-->
                  <span class="span " :title="item['courseName'+ items] + '\n' + item['lessonName'+ items] + '\n' + (item['collegeName'+ items]?item['collegeName'+ items]:'') + '\n' + item['teacherName'+ items]">
                    {{item['courseName'+ items]}}-{{item['teacherName'+ items]}}
                    <!---{{item['classroomName'+ items]}}-->
                  </span>
                </div>
                <div class="weekjieci nostart" v-if="!item['lessonId'+ items]">
                  <!--没有数据，需要判断日期，如果是当前日期以前的，不要添加按钮-->
                  <!--item weekday 是周几比较，还需要日期比较  当前日期和日历日期比较{{weekflag}}=={{recorddate}}--{{item.hms}} --{{hms}}-->
                  <div class="opts" v-if="items === weekday && (weekflag - recorddate) === 0" v-show="powerflag">
                    <!--需要判断小时和分钟秒是否是当前时间以后-->
                    <span @click="optaddevent(item, roomid, Stype, template, items)" class="optadd" v-if="item.hms > hms">{{optadd}}</span>
                  </div>
                  <div class="opts" v-if="items > weekday && (weekflag - recorddate) === 0" v-show="powerflag">
                    <!--需要判断小时和分钟秒是否是当前时间以后-->
                    <span @click="optaddevent(item, roomid, Stype, template, items)" class="optadd">{{optadd}}</span>
                  </div>
                  <div class="opts" v-if="(weekflag - recorddate) > 0 && weekflag <= maxWeekNo" v-show="powerflag">
                    <!--需要判断小时和分钟秒是否是当前时间以后-->
                    <span @click="optaddevent(item, roomid, Stype, template, items)" class="optadd">{{optadd}}</span>
                  </div>
                  <div class="opts" v-if="(weekflag - recorddate) > 0 && weekflag === maxWeekNo && items <= maxWeekday"
                    v-show="powerflag">
                    <!--需要判断小时和分钟秒是否是当前时间以后-->
                    <span @click="optaddevent(item, roomid, Stype, template, items)" class="optadd">{{optadd}}</span>
                  </div>
                </div>
              </div>
            </div>
            <Spins :spinshow="spinshow"></Spins>
          </div>
          <div id="timelist" dates="lessondate" v-show="!showtemplate">
            <!-- <div class="weekpink">{{basicinfo.pinkN}}{{weekflag}}{{basicinfo.weekN}}</div> -->
            <div class="jieci" :style="'min-height: ' + minhei + 'px'">
              -
            </div>
            <div class="weeklist" :style="'min-height: ' + minhei + 'px'">
              <div class="sevenlist" v-for="item in 7" :style="'min-height:' + minhei + 'px'">
                <!--:class="servertoday > lessondate ? 'over' : (servertoday < lessondate && weeklisttime[item - 1]['recordable'+ item] === 0 ? 'nostart' : 'ing')" -->
                <!--{{item}}--{{weekday}}=={{weekflag}}--{{recorddate}}-->
                <div class="opts" v-if="(weekflag - recorddate) === 0">
                  <span v-if="item >= weekday" @click="optfreeaddevent(weeklisttime[item], roomid, Stype, template, item)"
                    class="optadd">{{optadd}}</span>
                </div>
                <div class="opts" v-if="(weekflag - recorddate) > 0 && weekflag < maxWeekNo">
                  <span @click="optfreeaddevent(weeklisttime[item], roomid, Stype, template, item)" class="optadd">{{optadd}}</span>
                </div>
                <div class="opts" v-if="(weekflag - recorddate) > 0 && weekflag === maxWeekNo && item <= maxWeekday">
                  <span @click="optfreeaddevent(weeklisttime[item], roomid, Stype, template, item)" class="optadd">{{optadd}}</span>
                </div>
                <div class="list" :title="itemsub.courseName + '\n' + itemsub.lessonName + '\n' + (itemsub.collegeName?itemsub.collegeName:'') + '\n' + itemsub.teacherName"
                  style="padding-top: 15px;" v-for="(itemsub, subind) in weeklisttime[item]">
                  {{itemsub.courseName}}-{{itemsub.teacherName}}
                </div>
              </div>
            </div>
            <Spins :spinshow="spinshow"></Spins>
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
  import Calendarme from '@/components/extend/calendar.vue'
  import Spins from '@/components/extend/spin'
  import Railc from '@/components/extend/railc'
  import Linklist from './linklist'
  import AJposition from '@/components/extend/position'
  import {
    basicinfo,
    timetype,
    pathinfo,
    courselisturl,
    classroomurl,
    templateurl,
    pagesize,
    collegeurl,
    teacherurl,
    studySectionSubjecturl,
    termurl
  } from '@/module/admin/config/lessoninfo'
  export default {
    name: 'AJlesson',
    data() {
      return {
        inputStyle: 'margin-top: 3px;width: 150px',
        basicinfo: basicinfo,
        timetype: timetype,
        spinshow: true,
        show: true,
        lostday: true,
        optadd: basicinfo.optadd,
        optedit: basicinfo.optedit,
        optdel: basicinfo.optdel,
        powerflag: false,
        eduType: this.$store.state.educationType,
        railpartcomment: basicinfo.railpartcomment,
        railpartcommentdate: basicinfo.railpartcommentdate,
        comments: '',
        template: '',
        Scollege: '',
        Steacher: '',
        Stype: '',
        ymdhms: 'ymd',
        styles: '',
        Sterm: '',
        dates: '',
        start: 'start',
        roomid: '',
        minweek: 1,
        showtemplate: true,
        collegeS: '',
        teacherS: '',
        gradeS: '',
        Sgrade: '',
        part: document.body,
        pagesize: pagesize,
        valshow: true,
        courseinfo: '',
        searchupdate: false,
        jieci: '',
        lessondate: '',
        dateval: '',
        weeklist: '',
        weeklisttime: '',
        weekday: '',
        hms: '',
        hmscopy: '',
        servertoday: '',
        weekflag: false,
        recorddate: false,
        hmsval: '',
        calendarcount: 0,
        maxWeekNo: 0,
        maxWeekday: 0,
        further: false,
        termseletcount: 0,
        minhei: 485,
        semester_list: [],
        semester_temp: [],
        classroom: [],
        Scollege_options: [],
        Sgrade_options: [],
        Steacher_options: [],
        select_type: '0',
        type_options: [{
            value: '0',
            label: '周星期节次'
          },
          {
            value: '1',
            label: '年月日时分秒'
          }
        ],
        template_options: []

      }
    },
    created() {
      this.gettemplate()
      this.getteacher()
      this.getclassroom()
    },
    mounted() {
      let that = this
      that.Stype = 0
      that.comments = that.railpartcomment
      // this.$Select({
      //   'selectId': 'select84',
      //   'callback': function (obj) {
      //     that.Stype = obj.ind
      //     if (obj.ind === 1) {
      //       that.showtemplate = false
      //       that.searchupdate = false
      //       that.comments = that.railpartcommentdate
      //     } else {
      //       that.showtemplate = true
      //       that.comments = that.railpartcomment
      //       that.searchupdate = false
      //     }
      //   }
      // })
      if (that.eduType) {
        // 高教-院系列表
        that.getCollegeList()
      } else {
        // 普教-年级、科目列表
        that.getGradeList()
      }

      var temptime = new Date();

      var data_time = this.formcat({
        year: temptime.getFullYear(),
        month: temptime.getMonth() + 1,
        day: temptime.getDate(),
        hour: temptime.getHours(),
        minutes: temptime.getMinutes(),
        seconds: temptime.getSeconds()
      })
      this.startfn(data_time);



    },
    components: {
      Ghead,
      Gfoot,
      AJposition,
      Linklist,
      Calendarme,
      Railc,
      Spins
    },
    methods: {

      type_change(obj) {
        var that = this;
        that.Stype = Number(obj)
        if (Number(obj) === 1) {
          that.showtemplate = false
          that.searchupdate = false
          that.comments = that.railpartcommentdate
        } else {
          that.showtemplate = true
          that.comments = that.railpartcomment
          that.searchupdate = false
        }
      },

      getclassroom() {
        let that = this
        this.axios({
            method: 'post',
            url: classroomurl
          })
          .then(function(res) {
            let temp = []
            let objs = res.data.result.data
            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['value'] = objs[item].classroomId
              temp[item]['label'] = objs[item].classroomName
            }
            that.classroom = temp;
            that.roomid = temp[0].value
            var time = setTimeout(that.search(), 2000)
            // that.$Select({
            //   'data': temp,
            //   'originS': 'multiple',
            //   'selectId': ['select71', 'select70'],
            //   'callback': function (obj) {
            //     that.roomid = obj.value
            //   }
            // })
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getteacher() {
        let that = this
        // 老师
        this.axios({
            method: 'post',
            url: teacherurl,
            data: {
              roleType: 2
            }
          })
          .then(function(res) {
            let temp = []
            // temp[0] = {value: '-1', txt: '全部'}
            let objs = res.data
            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['value'] = objs[item].id
              temp[item]['txt'] = objs[item].realName
            }
            that.Steacher_options = temp;
            // that.$Select({
            //   'data': temp,
            //   'originS': 'multiple',
            //   'selectId': ['select88', 'select87'],
            //   'callback': function (obj) {
            //     if (obj.ind !== 0) {
            //       that.Steacher = obj.value
            //     } else {
            //       that.Steacher = ''
            //     }
            //   },
            //   'cleartxt': '全部'
            // })
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      gettemplate() {
        let that = this
        this.axios({
            method: 'post',
            url: templateurl,
            data: {
              page: {
                pageSize: 1000000,
                pageIndex: 1
              },
              keywords: ''
            }
          })
          .then(function(res) {
            let temp = []
            let objs = res.data.classNumberList
            that.lessondate = res.data.currentTime
            //      console.log('当前服务器时间为', that.lessondate)
            let temptime = new Date(that.lessondate)
            let tempdate = that.formcat({
              year: temptime.getFullYear(),
              month: temptime.getMonth() + 1,
              day: temptime.getDate(),
              hour: temptime.getHours(),
              minutes: temptime.getMinutes(),
              seconds: temptime.getSeconds()
            })
            that.dateval = tempdate.split(' ')[0]
            that.dates = tempdate.split(' ')[0]
            //      console.log(tempdate.split(' ')[0], 'tempdatesplit()[0]')
            that.hmsval = temptime.getHours() + ':' + temptime.getMinutes() + ':' + temptime.getSeconds()
            that.servertoday = new Date(tempdate).getTime()
            if (temptime.getDay() !== 0) {
              that.weekday = temptime.getDay()
            } else {
              that.weekday = 7
            }
            that.hms = temptime.getHours() * 3600 + temptime.getMinutes() * 60 + temptime.getSeconds()

            that.hmscopy = that.hms
            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['value'] = objs[item].templateId
              temp[item]['txt'] = objs[item].templateName
              temp[item]['list'] = []
              for (let i = 0; i < objs[item]['classList'].length; i++) {
                temp[item]['list'].push({
                  value: objs[item]['classList'][i].classId,
                  txt: objs[item]['classList'][i].className,
                  time: objs[item]['classList'][i].startTime.split(' ')[1] + '-' + objs[item]['classList'][i].endTime
                    .split(' ')[1]
                })
              }
            }
            that.template_options = temp;
            // that.templateobj = that.$Select({
            //   'data': temp,
            //   'originS': 'multiple',
            //   'selectId': ['select93', 'select92'],
            //   'callback': function (obj) {
            //     that.template = obj.value
            //   }
            // })
            that.template = temp[0].value
            that.jieci = temp[0].list
            that.getterm()
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getterm() {
        let that = this
        // 学期
        this.axios({
            method: 'post',
            url: termurl,
            data: {
              page: {
                pageSize: pagesize,
                pageIndex: 1
              }
            }
          })
          .then(function(res) {
            let temp = []
            let objs = res.data.termList
            that.semester_list = res.data.termList;

            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['value'] = objs[item].termId
              temp[item]['txt'] = objs[item].termName
              temp[item]['week'] = objs[item].currentWeekNo < 0 ? 1 : objs[item].currentWeekNo
              temp[item]['starttime'] = objs[item].startTime.split(' ')[0]
              temp[item]['starttimeall'] = objs[item].startTime
              temp[item]['maxWeekNo'] = objs[item].maxWeekNo
              temp[item]['maxWeekday'] = new Date(objs[item].endTime).getDay()
              //匹配学期
              if (that.servertoday >= new Date(objs[item].startTime).getTime() && that.servertoday <= new Date(objs[
                  item].endTime).getTime()) {
                that.Sterm = objs[item].termId
                that.recorddate = temp[item]['week']
                that.maxWeekday = temp[item]['maxWeekday']
                that.maxWeekNo = temp[item]['maxWeekNo']
                let stime = new Date(temp[item]['starttimeall'])
                let servertime = new Date(that.lessondate)
                
                if (servertime.getTime() < stime.getTime()) { // 如果服务器时间小于当前学期内容，需要重置weekday为开学当天
                  that.further = true
                  if (stime.getDay() !== 0) {
                    that.weekday = stime.getDay()
                  } else {
                    that.weekday = 7
                  }
                } else {
                  that.further = false
                  if (servertime.getDay() !== 0) {
                    that.weekday = servertime.getDay()
                  } else {
                    that.weekday = 7
                  }
                }
                // 这个else条件是新加的
              }
              // else{
              //   that.Sterm = objs[item].termId
              //   that.recorddate = temp[item]['week']
              //   that.maxWeekday = temp[item]['maxWeekday']
              //   that.maxWeekNo = temp[item]['maxWeekNo']
              // }
            }

            that.semester_temp = temp;
            //         that.$Select({
            //           'data': temp,
            //           'originS': 'multiple',
            //           'selectId': ['select82', 'select81'],
            //           'callback': function (obj) {
            // //          console.log('dataval select')
            //             if (that.termseletcount <= 0) {
            //               that.termseletcount++
            //             } else {
            //
            //               that.Sterm = obj.value
            //               that.recorddate = obj.week
            //               that.dateval = obj.starttime
            //               that.maxWeekday = obj.maxWeekday
            //               that.maxWeekNo = obj.maxWeekNo
            //               that.dates = obj.starttime
            //               let stime = new Date(obj.starttimeall)
            //               let servertime = new Date(that.lessondate)
            //               if (servertime.getTime() < stime.getTime()) { // 如果服务器时间小于当前学期内容，需要重置weekday为开学当天
            //                 that.further = true
            //                 if (stime.getDay() !== 0) {
            //                   that.weekday = stime.getDay()
            //                 } else {
            //                   that.weekday = 7
            //                 }
            //               } else {
            //                 that.further = false
            //                 if (servertime.getDay() !== 0) {
            //                   that.weekday = servertime.getDay()
            //                 } else {
            //                   that.weekday = 7
            //                 }
            //               }
            //             }
            //           },
            //           'matchval': [{val: that.Sterm}]
            //         })
          })
          .catch(function(error) {
            console.log(error)
          })
      },

      Sterm_change(e) {

        var that = this;
        console.log(this.$refs.myselect.hoverIndex);
        var obj = that.semester_temp[that.$refs.myselect.hoverIndex];
        // if (that.termseletcount <= 0) {
        //   that.termseletcount++
        // } else {

          that.Sterm = obj.value
          that.recorddate = obj.week
          that.dateval = obj.starttime
          that.maxWeekday = obj.maxWeekday
          that.maxWeekNo = obj.maxWeekNo
          that.dates = obj.starttime
          let stime = new Date(obj.starttimeall)
          let servertime = new Date(that.lessondate)
          if (servertime.getTime() < stime.getTime()) { // 如果服务器时间小于当前学期内容，需要重置weekday为开学当天
            that.further = true
            if (stime.getDay() !== 0) {
              that.weekday = stime.getDay()
            } else {
              that.weekday = 7
            }
          } else {
            that.further = false
            if (servertime.getDay() !== 0) {
              that.weekday = servertime.getDay()
            } else {
              that.weekday = 7
            }
          }
        // }
      },


      lessevent() {
        this.weekflag--
      },
      addevent() {
        this.weekflag++
      },
      optfreeaddevent(item, room, Stype, template, items) {
        this.$router.push({
          name: 'AJlessonfreeadd',
          params: {
            item: item,
            room: room,
            type: Stype,
            template: template,
            weekno: items,
            weekflag: this.weekflag,
            dates: this.dateval,
            hms: this.hmsval,
            termid: this.Sterm
          }
        })
      },
      optaddevent(item, room, Stype, template, items) {
        this.$router.push({
          name: 'AJlessonadd',
          params: {
            item: item,
            room: room,
            type: Stype,
            template: template,
            weekno: items,
            weekflag: this.weekflag,
            termid: this.Sterm
          }
        })
      },
      opteditevent(item, room, Stype, template, items) {
        this.$router.push({
          name: 'AJlessonedit',
          params: {
            item: item,
            room: room,
            type: Stype,
            template: template,
            weekno: items,
            weekflag: this.weekflag,
            termid: this.Sterm
          }
        })
      },
      optdelevent(item, room, Stype, template, items) {
        this.$router.push({
          name: 'AJlessondel',
          params: {
            item: item,
            room: room,
            type: Stype,
            template: template,
            weekno: items,
            weekflag: this.weekflag,
            termid: this.Sterm
          }
        })
      },
      railcevent(obj1) {
        var that = this;
        //    console.log('railcevent----------', this.formcat(obj))
        // this.dates = this.formcat(obj)
        // this.dateval = this.formcat(obj)
        // this.search()
        this.dates = this.formcat(obj1)
        var select_time = new Date(this.dates).getTime()
        this.dateval = this.formcat(obj1)
        //自动选择学期
        let servertime = new Date(that.lessondate)
        for (var i = 0; i < this.semester_list.length; i++) {
          var item = this.semester_list[i];
          if (select_time >= new Date(item.startTime).getTime() && select_time <= new Date(item.endTime).getTime()) {
            var obj = that.semester_temp[i];
            // if (that.termseletcount <= 0) {
            //   that.termseletcount++
            // } else {
            that.Sterm = obj.value
            that.recorddate = obj.week
            that.maxWeekday = obj.maxWeekday
            that.maxWeekNo = obj.maxWeekNo
            let stime = new Date(obj.starttimeall)
            let servertime = new Date(that.lessondate)
            if (servertime.getTime() < stime.getTime()) { // 如果服务器时间小于当前学期内容，需要重置weekday为开学当天
              that.further = true
              if (stime.getDay() !== 0) {
                that.weekday = stime.getDay()
              } else {
                that.weekday = 7
              }
            } else {
              that.further = false
              if (servertime.getDay() !== 0) {
                that.weekday = servertime.getDay()
              } else {
                that.weekday = 7
              }
            }
            // }
            break; //跳出循环
          } else {
            that.weekflag = undefined;
            that.Sterm = ""
          }
        }

        this.search()

      },
      startfn(obj1) {
        if(obj1==null){
          return;
        }

        var that = this;
        if (this.calendarcount) {
          // this.dates = this.formcat(obj1)
          this.dates = obj1;
          var select_time = new Date(this.dates).getTime()
          // this.dateval = this.formcat(obj1)
          this.dateval = obj1;
          //自动选择学期
          let servertime = new Date(that.lessondate)
          for (var i = 0; i < this.semester_list.length; i++) {
            var item = this.semester_list[i];
            console.log(item);
            if (select_time >= new Date(item.startTime).getTime() && select_time <= new Date(item.endTime).getTime()) {
              var obj = that.semester_temp[i];
              // if (that.termseletcount <= 0) {
              //   that.termseletcount++
              // } else {

              that.Sterm = obj.value
              that.recorddate = obj.week
              that.maxWeekday = obj.maxWeekday
              that.maxWeekNo = obj.maxWeekNo
              let stime = new Date(obj.starttimeall)
              let servertime = new Date(that.lessondate)
              if (servertime.getTime() < stime.getTime()) { // 如果服务器时间小于当前学期内容，需要重置weekday为开学当天
                that.further = true
                if (stime.getDay() !== 0) {
                  that.weekday = stime.getDay()
                } else {
                  that.weekday = 7
                }
              } else {
                that.further = false
                if (servertime.getDay() !== 0) {
                  that.weekday = servertime.getDay()
                } else {
                  that.weekday = 7
                }
              }
              // }
              break; //跳出循环
            } else {
              that.weekflag = undefined;
              that.Sterm = ""
            }
          }
          this.search()
        }
        this.calendarcount++

      },
      formcats(obj) {
        let objs = obj < 10 ? ('0' + obj) : obj
        return objs
      },
      formcat(obj) {
        return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
      },
      getCollegeList() {
        let that = this
        // 院系
        this.axios({
            method: 'post',
            url: collegeurl
          })
          .then(function(res) {
            let temp = []
            // temp[0] = {value: '-1', txt: '全部'}
            let objs = res.data
            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['value'] = objs[item].id
              temp[item]['txt'] = objs[item].collegeName
            }
            that.Scollege_options = temp;
            // that.collegeS = that.$Select({
            //   'data': temp,
            //   'originS': 'multiple',
            //   'selectId': ['select86', 'select85'],
            //   'callback': function (obj) {
            //     if (obj.ind !== 0) {
            //       that.Scollege = obj.value
            //     } else {
            //       that.Scollege = ''
            //     }
            //   },
            //   'cleartxt': '全部'
            // })
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getGradeList() {
        let that = this
        // 年级-学科
        this.axios({
            method: 'post',
            url: studySectionSubjecturl,
            params: {
              'par': {
                pageSize: pagesize,
                pageIndex: 1
              }
            }
          })
          .then(function(res) {
            let temp = []
            // temp[0] = {value: '-1', txt: '全部'}
            let objs = res.data
            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['value'] = objs[item].id
              temp[item]['txt'] = objs[item].name
            }
            that.Sgrade_options = temp;
            // that.gradeS = that.$Select({
            //   'data': temp,
            //   'originS': 'multiple',
            //   'selectId': ['select96', 'select95'],
            //   'callback': function (obj) {
            //     if (obj.ind !== 0) {
            //       that.Sgrade = obj.value
            //     } else {
            //       that.Sgrade = ''
            //     }
            //   },
            //   'cleartxt': '全部'
            // })
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      pagepost(obj) {
        if (this.$store.state.userinfo.userName === 'admin') {
          this.powerflag = true
        } else {
          let power = this.$store.state.powerinfo['lesson']
          if (power.length !== 0) {
            for (let i = 0; i < power.length; i++) {
              switch (power[i].operationCode) {
                case 'addlist':
                case 'editlist':
                case 'dellist':
                  this.powerflag = true
                  break
              }
            }
          }
        }
        let that = this
        this.axios({
            method: 'post',
            url: courselisturl,
            data: {
              termId: obj.termId,
              classTemplateId: !obj.timingMode ? obj.classTemplateId : '',
              timingMode: obj.timingMode,
              classroomId: obj.classroomId,
              collegeId: obj.collegeId,
              teacherId: obj.teacherId,
              studySectionId: obj.studySectionId,
              lessonDate: obj.lessonDate
            }
          })
          .then(function(res) {

            that.weeklist = res.data.lessonList
            for (let i = 0; i < res.data.lessonList.length; i++) {
              let temp = res.data.lessonList[i].startTime.split(' ')[1].split(':')
              if (that.further) {
                that.weeklist[i]['hms'] = 0
              } else {
                that.weeklist[i]['hms'] = temp[0] * 3600 + temp[1] * 60 + temp[2] * 1
              }
            }
            // that.weekflag = res.data.weekNo
            that.weekflag = res.data.weekNo == undefined ? undefined : res.data.weekNo
            //that.weekflag = res.data.weekNo
            that.spinshow = false
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      pageposttime(obj) { // 获取列表
        if (this.$store.state.userinfo.userName === 'admin') {
          this.powerflag = true
        } else {
          let power = this.$store.state.powerinfo['lesson']
          if (power.length !== 0) {
            for (let i = 0; i < power.length; i++) {
              switch (power[i].operationCode) {
                case 'addlist':
                case 'editlist':
                case 'dellist':
                  this.powerflag = true
                  break
              }
            }
          }
        }
        let that = this
        this.axios({
            method: 'post',
            url: courselisturl,
            data: {
              termId: obj.termId,
              timingMode: obj.timingMode,
              classroomId: obj.classroomId,
              collegeId: obj.collegeId,
              teacherId: obj.teacherId,
              studySectionId: obj.studySectionId,
              lessonDate: obj.lessonDate
            }
          })
          .then(function(res) {
            let temp = []
            temp[0] = []
            let j = 1
            for (let keys in res.data.lessonList) {
              if (res.data.lessonList['weekDayList' + j].length === 0) {
                temp[j] = []
              } else {
                temp[j] = res.data.lessonList['weekDayList' + j]
              }
              j++
            }
            that.weeklisttime = temp
            that.weekflag = res.data.weekNo == undefined ? undefined : res.data.weekNo
            that.spinshow = false
          })
          .then(function() {
            let objs = document.querySelectorAll('.sevenlist')
            Array.prototype.slice.call(objs).forEach(function(item) {
              if (item.clientHeight > 485) {
                if (item.clientHeight > that.minhei) {
                  that.minhei = item.clientHeight
                }
              }
            })
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      search() {
        this.spinshow = true
        if (this.Stype === 1) {
          this.pageposttime({
            termId: this.Sterm,
            collegeId: this.Scollege,
            studySectionId: this.Sgrade,
            teacherId: this.Steacher,
            timingMode: this.Stype,
            classroomId: this.roomid,
            lessonDate: this.dates
          })
        } else {
          this.pagepost({
            termId: this.Sterm,
            collegeId: this.Scollege,
            studySectionId: this.Sgrade,
            teacherId: this.Steacher,
            timingMode: this.Stype,
            classTemplateId: this.template,
            classroomId: this.roomid,
            lessonDate: this.dates
          })
        }
      }
    },
    updated() {
      if (this.Stype !== '' && this.Stype === 0) {
        if (this.Sterm !== '' && this.roomid !== '' && this.dates !== '' && !this.searchupdate && this.template !== '') {
          this.searchupdate = true
          this.search()
        }
      } else if (this.Stype !== '' && this.Stype === 1) {
        if (this.Sterm !== '' && this.roomid !== '' && this.dates !== '' && !this.searchupdate) {
          this.searchupdate = true
          this.search()
        }
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.name === pathinfo.prex) {
          this.search()
        }
      }
    }
  }
</script>
<style>
  @import url("../../../../static/css/admin/statistics.css");
</style>

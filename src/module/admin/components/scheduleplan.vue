<template>
  <div class="app">
    <Ghead></Ghead>
    <div style="width: 100%;background-color: #ffffff;height: 60px;display:flex;align-items: center;justify-content: space-between;">
      <span style="font-size: 18px;font-weight: 600;color: rgb(69, 156, 252);margin-left: 50px;">课表</span>
    </div>

    <!-- 分割线 -->
    <div style="float: left; width: calc(100% - 100px);height: 1px;background-color: #f4f4f4;margin-left: 50px;"></div>

    <!-- 学期 周次 -->
    <div style="width: 100%;height: 60px;display: flex;justify-content: center;align-items: center;">
        <!-- 学期 -->
        <el-select ref="myselect" v-model="Sterm" filterable placeholder="请选择学期" @change="Sterm_change"
          popper-class="el_selects_css" style="float: left;width: 200px;margin-left: 20px;">
          <el-option v-for="item in semester_temp" :key="item.value" :label="item.txt" :value="item.value">
          </el-option>
        </el-select>
        <span style="font-size: 16px;margin-left: 10px;">第</span>
        <el-input-number v-model="recorddate" style="width: 120px;margin-left:10px" controls-position="right" :min="1" :max="maxWeekNo" @change="time_change"></el-input-number>
        <span style="font-size: 16px;margin-left: 10px;">教学周（共{{maxWeekNo}}周）</span>
    </div>


    <!-- 筛选框 -->
    <div style="float: left;width: calc(100% - 200px);height: auto;display: flex;justify-content: flex-start;align-items: center;flex-wrap: wrap;margin-left: 100px;">
      <!-- 教室 -->
      <span style="font-size: 14px;margin-right: 5px;">教室名:</span>
      <el-select v-model="roomid" filterable placeholder="请选择" :popper-class="'el_selects_css'" style="float: left;width: 200px;margin-left: 20px;">
        <el-option v-for="item in classroom" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span style="font-size: 14px;margin-right: 5px;margin-left: 50px;">时间:</span>
      <el-date-picker style="margin-left: 20px;" v-model="dateval" type="date" value-format="yyyy-MM-dd" :clearable="false"
        placeholder="选择日期" @change="startfn">
      </el-date-picker>

      <span style="font-size: 14px;margin-right: 5px;margin-left: 50px;">节次模板:</span>
      <el-select v-model="template" filterable popper-class="el_selects_css" style="float: left;width: 200px;margin-left: 20px;margin-right: 50px;">
        <el-option v-for="item in template_options" :key="item.value" :label="item.text" :value="item.value">
        </el-option>
      </el-select>

      <div style="display: flex;align-items: center;height: 60px;margin-right: 70px;">
        <span style="width:15px;height: 15px;background-color: #ffffff;border:.5px solid #000000;"></span>
        <span style="margin-left: 10px;">未开始</span>

        <span style="width:15px;height: 15px;background-color: #90caf9;margin-left: 25px;"></span>
        <span style="margin-left: 10px;">进行中</span>

        <span style="width:15px;height: 15px;background-color: #ef9a9a;margin-left: 25px;"></span>
        <span style="margin-left: 10px;">课程被打断/任务异常</span>

        <span style="width:15px;height: 15px;background-color: #a5d6a7;margin-left: 25px;"></span>
        <span style="margin-left: 10px;">已完成</span>

        <span style="width:15px;height: 15px;background-color: #e0e0e0;margin-left: 25px;"></span>
        <span style="margin-left: 10px; margin-right: 50px;">被占用</span>

        <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
      </div>
    </div>

    <!-- 头部 -->
    <div style="float: left; width: calc(100% - 200px);height: 60px;display: flex;justify-content: flex-start;align-items: center;margin-left: 100px;border: .1px solid #000000;">
      <div style="width: 12.5%;height: 100%;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;">节次/日期</span>
      </div>
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;">{{data_list[0]}}/周一</span>
      </div>
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;">{{data_list[1]}}/周二</span>
      </div>
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;">{{data_list[2]}}/周三</span>
      </div>
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;">{{data_list[3]}}/周四</span>
      </div>
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;">{{data_list[4]}}/周五</span>
      </div>
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;">{{data_list[5]}}/周六</span>
      </div>
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;">{{data_list[6]}}/周日</span>
      </div>
    </div>

    <!-- 列表 -->
    <div v-for="item in lessonList" style="float: left; width: calc(100% - 200px);height: 130px;display: flex;justify-content: flex-start;align-items: center;margin-left: 100px;border: .1px solid #000000;border-top: 0px solid #FFFFFF;">
      <!-- 时间 节次 -->
      <div style="width: 12.5%;height: 100%;">
        <div style="float: left;width: 100%;margin-top: 40px;text-align: center;">
            <span style="font-size: 14px;width: 100%;text-align: center;height: 50px;">{{item.className}}<br /></span>
        </div>
        <div style="float: left;width: 100%;margin-top: 20px;text-align: center;">
            <span >{{item.startTime.split(' ')[1]}}-{{item.endTime.split(' ')[1]}}</span>
        </div>
      </div>
      <!-- 周一 -->
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;width: 80%;text-align: center;">{{item.courseName1}} {{item.courseName1=="" ? '':'@'}} {{item.teacherName1}}</span>
      </div>
      <!-- 周二 -->
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;width: 80%;text-align: center;">{{item.courseName2}} {{item.courseName2=="" ? '':'@'}} {{item.teacherName2}}</span>
      </div>
      <!-- 周三 -->
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;width: 80%;text-align: center;">{{item.courseName3}} {{item.courseName3=="" ? '':'@'}} {{item.teacherName3}}</span>
      </div>
      <!-- 周四 -->
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;width: 80%;text-align: center;">{{item.courseName4}} {{item.courseName4=="" ? '':'@'}} {{item.teacherName4}}</span>
      </div>
      <!-- 周五 -->
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;width: 80%;text-align: center;">{{item.courseName5}} {{item.courseName5=="" ? '':'@'}} {{item.teacherName5}}</span>
      </div>
      <!-- 周六 -->
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;width: 80%;text-align: center;">{{item.courseName6}} {{item.courseName6=="" ? '':'@'}} {{item.teacherName6}}</span>
      </div>
      <!-- 周日 -->
      <div style="width: 12.5%;height: 100%;border-left:1px solid #000000;display: flex;justify-content: center;align-items: center;">
          <span style="font-size: 14px;width: 80%;text-align: center;">{{item.courseName7}} {{item.courseName7=="" ? '':'@'}} {{item.teacherName7}}</span>
      </div>
    </div>

    <div style="float: left; width: 100%;height: 200px;"></div>
</div>
</template>

<script>
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
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
    name: 'AJscheduleplan',
    data() {
      return {
        roomid:'',  //教室id
        classroom:[],//教室集合
        Sterm:'',  //学期id
        semester_temp:[], //所有学期集合
        template:'', //节次模板id
        template_options:[], //节次模板
        recorddate:'', //当前学期
        maxWeekNo:0, //学期周数
        dateval:null, //默认时间
        lessonList:[], //课表集合
        data_list:[], //当前日期 周一到周日所有日期
        lessondate:0, //时间毫秒数
        term_startTime:0, //当前选择的学期的 开始日期
        term_endTime:0,//当前选择的学期的 结束日期
      }
    },

    components: {
      Ghead,
      Gfoot,
    },

    created() {
     //获取节次模板
     this.gettemplate();
     //获取所有教室
     this.getclassroom();

    },

    methods:{
        //选择学期
        Sterm_change(e) {
          var that = this;
          var obj = that.semester_temp[that.$refs.myselect.hoverIndex];
            that.Sterm = obj.value
            that.recorddate = 1
            that.dateval = obj.starttime
            that.maxWeekday = obj.maxWeekday
            that.maxWeekNo = obj.maxWeekNo
            that.dates = obj.starttime

            that.term_startTime = obj.starttime
            that.term_endTime = obj.endtime

            let stime = new Date(obj.starttimeall)
            let servertime = new Date(that.lessondate)

            that.getDates(obj.starttime);
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


        time_change(e){
          var that = this;
          var num = 0;  //这是下面用来判断是否是向上取整了
          //计算学期有多少天   然后得到有多少周  向上取整数
          var day1 = new Date(that.term_startTime);
          var day2 = new Date(that.term_endTime);
          //得到天数  除去 7 得到周数
          var day = (day2 - day1) / (1000 * 60 * 60 * 24)/7;
          console.log("本学期共："+day)
          var math_day = Math.ceil(day);
          if(math_day>day){
            console.log("实际周数+1")
            num = 1;
          }else{
             console.log("实际周数是整数")
             num = 0;
          }

          //这里的num是防止取下周的数据出错，来设置的一个参数 在向上取整的时候要 -1  其他的时候不管

          var time = new Date(that.term_startTime);
          time.setDate(new Date(that.term_startTime).getDate()+(7*(e-num)));
          var time2 = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
          console.log(time2);
          this.dateval = time2;
          //获取当前日期 从星期一到星期天的日期
          this.getDates(time2);
        },

        //JS获取当前周从星期一到星期天的日期
        getDates(currentTime) {
            var currentDate = new Date(currentTime);
            var timesStamp = currentDate.getTime();
            var currenDay = currentDate.getDay();
            var dates = [];
            for (var i = 0; i < 7; i++) {
                var time = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-');
                //去掉年份
                var str =  time.split('-')[1]+'-'+time.split('-')[2]
                dates.push(str)
            }
            this.data_list = dates;
        },


        //搜索
        search(e){
            // if (this.$store.state.userinfo.userName === 'admin') {
            //   this.powerflag = true
            // } else {
            //   let power = this.$store.state.powerinfo['lesson']
            //   if (power.length !== 0) {
            //     for (let i = 0; i < power.length; i++) {
            //       switch (power[i].operationCode) {
            //         case 'addlist':
            //         case 'editlist':
            //         case 'dellist':
            //           this.powerflag = true
            //           break
            //       }
            //     }
            //   }
            // }
            let that = this
            this.axios({
                method: 'post',
                url: courselisturl,
                data: {
                  termId: that.Sterm,
                  timingMode: 0,
                  classroomId: that.roomid,
                  collegeId: "",
                  teacherId: "",
                  studySectionId: "",
                  lessonDate: that.dateval
                }
              })
              .then(function(res) {
                that.lessonList = res.data.lessonList;
                //当前周
                that.recorddate = res.data.weekNo == undefined ?'放假中':res.data.weekNo
              })
              .catch(function(error) {
                console.log(error)
              })

        },


        //切换时间
        startfn(e){
          this.getDates(e);
        },


        //获取所有教室
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
            })
            .catch(function(error) {
              console.log(error)
            })
        },

        //获取所有学期
        getterm() {
          let that = this
          // 学期
          this.axios({
              method: 'post',
              url: termurl,
              data: {
                page: {
                  pageSize: 1000000,
                  pageIndex: 1
                }
              }
            })
            .then(function(res) {
              let temp = []
              let objs = res.data.termList
              that.semester_list = res.data.termList;
              for (let item = 0; item < objs.length; item++) {
                temp.push({
                  value:objs[item].termId,//学期id
                  txt:objs[item].termName,//学期名字
                  week:objs[item].currentWeekNo < 0 ? 1 : objs[item].currentWeekNo,//当前是多少周
                  starttime:objs[item].startTime.split(' ')[0],//开始日期  2019-12-19
                  starttimeall: objs[item].startTime,  //开始日期 时间  2019-12-19  12:00:12
                  maxWeekNo:objs[item].maxWeekNo,  //学期周数
                  maxWeekday:new Date(objs[item].endTime).getDay(),  //结束时间几号
                  endtime:objs[item].endTime.split(' ')[0] //结束日期
                })
                // 根据当前时间匹配学期
                if (that.servertoday >= new Date(objs[item].startTime).getTime() && that.servertoday <= new Date(objs[item].endTime).getTime()) {
                    that.Sterm = objs[item].termId
                    that.recorddate = temp[item]['week']
                    that.maxWeekday = temp[item]['maxWeekday']
                    that.maxWeekNo = temp[item]['maxWeekNo']
                    that.term_startTime = temp[item]['starttime']
                    that.term_endTime = temp[item]['endtime']

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
                  //匹配不到学期
                }else{

                }

              }



              that.semester_temp = temp;

            })
            .catch(function(error) {
              console.log(error)
            })
        },

        //获取所有节次模板
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
              that.servertoday = res.data.currentTime
              that.lessondate =  res.data.currentTime
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
              that.getDates(that.dateval);
              for(var i = 0 ;i<objs.length;i++){
                temp.push({
                  value:objs[i].templateId,
                  text:objs[i].templateName
                })
              }
              that.template_options = temp;
              that.getterm();
              //搜索
              that.search();
            })
            .catch(function(error) {
              console.log(error)
            })
        },

        formcats(obj) {
          let objs = obj < 10 ? ('0' + obj) : obj
          return objs
        },

        formcat(obj) {
          return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
        },



    }

    }
</script>

<style>
</style>

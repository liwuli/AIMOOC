<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.msgaddN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.nameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="name" />
			 	</div>
			 	<div class="formline"  style="width: 50%;">
			 		<span class="txt">{{basicinfo.courseN}}<i>*</i>：</span>
			 		<div id='select92' style="margin-top: 3px;"></div>
					<select id="select93"></select>
			 	</div>
			 	<div class="formline " style="width: 50%;display: none;">
			 		<span class="txt">{{basicinfo.sweekN}}<i>*</i>：</span>
			 		<input type="number" :value="weekno"  :min="weekno" :max="weekno" step="1"    v-model="weekno" />
			 	</div>
			 	<div class="formline"  style="width: 50%;">
			 		<span class="txt">{{basicinfo.SteacherN}}<i>*</i>：</span>
			 		<div id='select100' style="margin-top: 3px;"></div>
					<select id="select101"></select>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.personN}}<i v-show="personflag">*</i>：</span>
			 		<input type="number"  v-model="person" />
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.startTimeN}}<i>*</i>：</span>
          <el-time-picker
            v-model="sdatetime"
            value-format="HH:mm:ss"
            placeholder="任意时间点">
          </el-time-picker>
			 		<!-- <Calendarme :iconstyle="iconstyle" :hmsshow="hmsshow"  :inputstyle="styles" :valshow="valshow" :ymdhms="ymdhms"   @startTimefn="startTimefn" :ids="startTime"></Calendarme> -->
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.endTimeN}}<i>*</i>：</span>
           <el-time-picker
            v-model="edatetime"
            value-format="HH:mm:ss"
            placeholder="任意时间点">
          </el-time-picker>
			 		<!-- <Calendarme  :iconstyle="iconstyle" :hmsshow="hmsshow"   :inputstyle="styles" :valshow="valshow" :ymdhms="ymdhms"   @endTimefn="endTimefn" :ids="endTime"></Calendarme> -->
			 	</div>

			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.liveN}}<i>*</i>：</span>
			 		<Radio :type="add" @radioevent="radioeventlive" :radioinfo="radioinfolive"></Radio>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.recordN}}<i>*</i>：</span>
			 		<Radio :type="add" @radioevent="radioeventrecord" :radioinfo="radioinforecord"></Radio>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.comeN}}<i>*</i>：</span>
			 		<Radio :type="add" @radioevent="radioeventcome" :radioinfo="radioinfocome"></Radio>
			 	</div>
			 	<div class="formline" style="height: 110px;width: 50%;">
			 		<span class="txt">{{basicinfo.desN}}：</span>
			 		<textarea name="" style="width: 210px;" rows="" cols="" v-model="des"></textarea>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{basicinfo.saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import Radio from '@/components/extend/radio'
import Calendarme from '@/components/extend/calendar.vue'
import {basicinfo, warntxt, pathinfo, listurl, teacherurl, addlesson, addradioinfocome, addradioinforecord, addradioinfolive, OnlineCourseType} from '@/module/admin/config/lessoninfo'
export default {
  name: 'AJlessonfreeadd',
  data () {
    return {
      add: 'freeadd',
      basicinfo: basicinfo,
      styles: 'width:193px;float:left;text-indent:-67px',
      iconstyle: 'margin-top:0px',
      wininfo: {
        widhei: ['700px', '450px'],
        btncancelleft: '545px',
        contenthei: '333px'
      },
      sweek: '',
      eweek: '',
      startTime: 'startTime',
      endTime: 'endTime',
      radioinfolive: addradioinfolive,
      radioinforecord: addradioinforecord,
      radioinfocome: addradioinfocome,
      name: '',
      personflag: false,
      valshow: true,
      hmsshow: true,
      des: '',
      come: 0,
      record: 0,
      live: 0,
      Steacher: '',
      person: '',
      ymdhms: 'ymdhMs',
      courseId: '',
      classroomid: '',
      classnum: '',
      Stype: '',
      weeknum: '',
      weekno: '',
      weekflag: '',
      smallN: basicinfo.smallN,
      bigN: basicinfo.bigN,
      sdateval: '',
      sdatetime: '',
      smindateval: '',
      edateval: '',
      edatetime: '',
      termid: ''
    }
  },
  components: {
    Radio,
    Calendarme
  },
  methods: {
    startTimefn (obj) {
      this.sdatetime = this.formcat(obj)
    },
    endTimefn (obj) {
      this.edatetime = this.formcat(obj)
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    formcat (obj) {
      return this.formcats(obj.hour) + ':' + this.formcats(obj.minutes) + ':' + this.formcats(obj.seconds)
    },
    dormcatsecondstoymd (obj) {
      let ymd = new Date(obj)
      return ymd.getFullYear() + '-' + ((ymd.getMonth() + 1) < 10 ? '0' + (ymd.getMonth() + 1) : (ymd.getMonth() + 1)) + '-' + (ymd.getDate() < 10 ? '0' + ymd.getDate() : ymd.getDate())
    },
    radioeventlive (obj) {
      this.live = obj.val
    },
    radioeventrecord (obj) {
      this.record = obj.val
    },
    radioeventcome (obj) {
      this.come = obj.val
      if (obj.val === '0') {
        this.personflag = false
      } else {
        this.personflag = true
      }
    },
    valid () {
      if (this.name.replace(/\s/gi, '') === '') {
        this.win(warntxt.name, '', false)
        return false
      } else if (this.courseId.replace(/\s/gi, '') === '') {
        this.win(warntxt.courseId, '', false)
        return false
      } else if (this.Steacher.replace(/\s/gi, '') === '') {
        this.win(warntxt.Steacher, '', false)
        return false
      } else if (this.weekno.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.weekno, '', false)
        return false
      } else if (this.personflag) {
        if (this.person.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.person.toString(), '', false)
          return false
        } else if (this.person <= 0) {
          this.win(warntxt.personnum, '', false)
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: addlesson,
        data: {
          lessonName: that.name,
          termId: that.termid,
          description: that.des,
          weekNum: that.weekno,
          ofTheWeek: that.weeknum,
          courseId: that.courseId,
          classTemplateId: that.template,
          startTime: that.sdateval.split(' ')[0] + ' ' + that.sdatetime,
          endTime: that.edateval.split(' ')[0] + ' ' + that.edatetime,
          classroomId: that.classroomid,
          teacherId: that.Steacher,
          studentsInPlan: that.person * 1,
          recordable: that.record * 1,
          liveable: that.live * 1,
          countable: that.come * 1,
          timingMode: that.Stype * 1 + 1
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.go(-1);
    },
    win (content, backfn, flag) {
      if (flag === undefined) {
        flag = true
      }
      this.$Win({
        'title': types.title,
        'type': 'txt',
        'content': content,
        'timeout': types.Timeout3,
        'cancel': function (obj) {
          obj.remove(obj.getid)
        },
        'closeshow': flag,
        'timefn': function () {
          if (backfn) {
            backfn()
          }
        }
      })
    }
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.classnum = (obj.classNo === undefined ? 0 : obj.classNo)
      this.classroomid = this.$route.params.room
      this.template = this.$route.params.template
      this.Stype = this.$route.params.type
      this.weeknum = this.$route.params.weekno
      this.weekno = this.$route.params.weekflag
      let startmillseconds = document.getElementById('dates').children[0].getAttribute('id')
      let milliseconds = startmillseconds * 1 + (this.weeknum - 1) * 24 * 3600 * 1000
      let initdate = this.dormcatsecondstoymd(milliseconds) + ' ' + this.$route.params.hms
      if (!this.smindateval) {
        this.smindateval = initdate
      }
      this.sdateval = initdate
      this.edateval = initdate
      this.termid = this.$route.params.termid
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          page: {
            pageSize: 100000,
            pageIndex: 1
          },
          keywords: ''
        }
      })
      .then(function (res) {
        let temp = []
        let tempweek = []
        temp[0] = {value: '', txt: '请选择...'}
        let objs = res.data.courseList
        let ind = 1
        for (let item = 0; item < objs.length; item++) {
          if (objs[item].courseType === OnlineCourseType) {
            continue
          }
          tempweek[ind] = []
          temp[ind] = {}
          temp[ind]['value'] = objs[item].courseId
          temp[ind]['txt'] = objs[item].courseName
          tempweek[ind][0] = objs[item].startWeek
          tempweek[ind][1] = objs[item].endWeek
          ind++
        }
        that.$Select({
          'data': temp,
          'originS': 'multiple',
          'selectId': ['select93', 'select92'],
          'callback': function (obj) {
            if (!obj.ind) {
              that.courseId = ''
              return
            }
            that.sweek = tempweek[obj.ind][0]
            that.eweek = tempweek[obj.ind][1]
            if (that.weekno >= that.sweek && that.weekno <= that.eweek) {
              that.courseId = obj.value
            } else if (that.weekno < that.sweek) {
              that.courseId = ''
              that.win(that.smallN, '', false)
            } else if (that.weekno > that.eweek) {
              that.courseId = ''
              that.win(that.bigN, '', false)
            }
          }
        })
      })
      .catch(function (error) {
        console.log(error)
      })
      this.axios({
        method: 'post',
        url: teacherurl,
        data: {
          roleType: 2
        }
      })
      .then(function (res) {
        let temp = []
        temp[0] = {value: '-1', txt: '请选择...'}
        let objs = res.data
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['txt'] = objs[item].realName
        }
        that.$Select({
          'data': temp,
          'originS': 'multiple',
          'selectId': ['select101', 'select100'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.Steacher = obj.value
            } else {
              that.Steacher = ''
            }
          }
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style>
.el-time-panel {
  z-index: 9999999 !important;
}
</style>
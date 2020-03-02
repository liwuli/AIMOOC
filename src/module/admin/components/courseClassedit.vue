<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{namedetailN}}<i>*</i>：</span>
			 		<input type="text"  v-model="name" :value="name"/>
			 	</div>
			 	<div class="formline"  style="width: 50%;">
			 		<span class="txt">{{dateN}}：</span>
			 		<div id='select90'  style="margin-top: 3px;">
						<div class="listinfo">{{coursetypeinfo.week}}</div>
						<div class="listinfo">{{coursetypeinfo.free}}</div>
					</div>
			 	</div>
			 	<div class="formline " style="width: 50%;" v-show="show">
			 		<span class="txt">{{SweekN}}<i>*</i>：</span>
			 		<input :disabled="isedit" type="number" min="0" v-model="Sweek" :value="Sweek"/>
			 	</div>
			 	<div class="formline"  style="width: 50%;" v-show="show">
			 		<span class="txt">{{SweekdayN}}<i>*</i>：</span>
			 		<div id='select91'  style="margin-top: 3px;">
			 			<div class="listinfo">{{oneweek.select}}</div>
						<div class="listinfo">{{oneweek.monday}}</div>
						<div class="listinfo">{{oneweek.tuesday}}</div>
						<div class="listinfo">{{oneweek.wednesday}}</div>
						<div class="listinfo">{{oneweek.thursday}}</div>
						<div class="listinfo">{{oneweek.friday}}</div>
						<div class="listinfo">{{oneweek.saturday}}</div>
						<div class="listinfo">{{oneweek.sunday}}</div>
					</div>
			 	</div>
			 	<div class="formline"  style="width: 50%;" v-show="show">
			 		<span class="txt">{{sclassN}}<i>*</i>：</span>
			 		<div id='select94' class="Select" style="margin-top: 3px;"></div>
					<select id="select95"></select>
			 	</div>
			 	<div class="formline"  style="width: 50%;" v-show="show">
			 		<span class="txt">{{eclassN}}<i>*</i>：</span>
			 		<div id='select96' class="Select" style="margin-top: 3px;"></div>
					<select id="select97"></select>
			 	</div>
			 	<div class="formline"  style="width: 50%;">
			 		<span class="txt">{{roomN}}<i>*</i>：</span>
			 		<div id='select98' class="Select" style="margin-top: 3px;"></div>
					<select id="select99"></select>
			 	</div>
			 	<div class="formline"  style="width: 50%;">
			 		<span class="txt">{{SteacherN}}<i>*</i>：</span>
			 		<div id='select100' style="margin-top: 3px;"></div>
					<select id="select101"></select>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{personN}}<i v-show="comeflag">*</i>：</span>
			 		<input :disabled="isedit" type="number" min="0" v-model="person" :value="person"/>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{liveN}}：</span>
			 		<Radio :genderval="liveval" :forbid="isedit" :type="edit" @radioevent="radioeventlive" :radioinfo="radioinfolive"></Radio>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{recordN}}：</span>
			 		<Radio :genderval="recordval" :forbid="isedit" :type="edit" @radioevent="radioeventrecord" :radioinfo="radioinforecord"></Radio>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{comeN}}：</span>
			 		<Radio :genderval="comeval" :forbid="isedit" :type="edit" @radioevent="radioeventcome" :radioinfo="radioinfocome"></Radio>
			 	</div>
			 	<div class="formline" v-show="!show"  style="width: 50%;">
			 		<span class="txt">{{sydateN}}：</span>
           <el-date-picker
            v-model="sydate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
			 		<!-- <Calendarme :forbid="isedit" :inputstyle="inputstyle" :valshow="valshow" :ymdhms="ymdhms" :dateval="sydate"  @startfn="startfn" :ids="start"></Calendarme> -->
			 	</div>
			 	<div class="formline" v-show="!show"  style="width: 50%;">
			 		<span class="txt">{{eydateN}}：</span>
           <el-date-picker
            v-model="eydate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
			 		<!-- <Calendarme :forbid="isedit" :inputstyle="inputstyle" :valshow="valshow" :ymdhms="ymdhms" :dateval="eydate" @endfn="endfn" :ids="end"></Calendarme> -->
			 	</div>
			 	<div class="formline" style="height: 110px;width: 50%;">
			 		<span class="txt">{{desN}}：</span>
			 		<textarea name="" style="width: 210px;" rows="" cols="" :value="des" v-model="des"></textarea>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import Radio from '@/components/extend/radio'
import Calendarme from '@/components/extend/calendar.vue'
import {oneweek, coursetypeinfo, classwarntxt, pathinfo, sydateN, eydateN, editlessonurl, classroomurl, teacherurl, radioinfocome, radioinforecord, radioinfolive, namedetailN, desN, comeN, recordN, liveN, personN, SteacherN, roomN, eclassN, sclassN, templatesN, SweekdayN, SweekN, dateN, msgeditdetailN, saveN, cancelN} from '@/module/admin/config/courseinfo'
export default {
  name: 'AJcourseeditdetail',
  data () {
    return {
      isedit: false,
      edit: 'edit',
      coursetypeinfo: coursetypeinfo,
      oneweek: oneweek,
      msg: msgeditdetailN,
      sydateN: sydateN,
      eydateN: eydateN,
      inputstyle: 'width:190px',
      ymdhms: 'ymdhMs',
      start: 'start',
      end: 'end',
      sydate: '',
      eydate: '',
      comeflag: false,
      valshow: true,
      wininfo: {
        widhei: ['700px', '450px'],
        btncancelleft: '545px',
        contenthei: '333px'
      },
      radioinfolive: radioinfolive,
      radioinforecord: radioinforecord,
      radioinfocome: radioinfocome,
      name: '',
      des: '',
      come: '',
      comeval: '',
      record: '',
      recordval: '',
      live: '',
      liveval: '',
      Steacher: '',
      person: '',
      sclass: '',
      eclass: '',
      template: '',
      Sweekday: '',
      Sweek: '',
      date: '',
      namedetailN: namedetailN,
      desN: desN,
      comeN: comeN,
      weeknum: '',
      recordN: recordN,
      liveN: liveN,
      SteacherN: SteacherN,
      roomN: roomN,
      personN: personN,
      sclassN: sclassN,
      eclassN: eclassN,
      templatesN: templatesN,
      SweekdayN: SweekdayN,
      SweekN: SweekN,
      dateN: dateN,
      saveN: saveN,
      cancelN: cancelN,
      templateobj: '',
      classNumberList: [],
      sclassobj: '',
      eclassobj: '',
      courseId: '',
      classroomid: '',
      show: true,
      ids: '',
      recording: null
    }
  },
  components: {
    Radio,
    Calendarme
  },
  methods: {
    init () {
      let that = this
      let obj = this.$route.params.item
      if (obj.recording == 2) {
        this.isedit = true
        this.inputstyle += ';background:#ebebe4'
      }
      if (!obj) {
        this.win(types.back, this.cancelfn, false)
      } else {
        that.recording = obj.recording
        that.ids = obj.id
        that.name = obj.name
        that.des = obj.description
        that.Sweek = obj.weekNum
        that.weeknum = obj.week
        that.courseId = obj.courseId
        that.template = obj.templateId
        that.classNumberList = obj.classNumberList
        that.sclass = obj.startClass
        that.eclass = obj.endClass
        that.classroomid = obj.classroomId
        that.Steacher = obj.teacherId
        that.sydate = obj.startTime
        that.eydate = obj.endTime
        that.person = obj.studentsInPlan
        that.recordval = obj.recordable ? 1 : 0
        that.record = obj.recordable
        that.liveval = obj.liveable ? 1 : 0
        that.live = obj.liveable
        that.comeval = obj.countable ? 1 : 0
        that.come = obj.countable
        if (that.come) {
          that.comeflag = true
        } else {
          that.comeflag = false
        }
        that.date = (obj.timingMode * 1) - 1
        // if (obj.timingMode === 2 || obj.timingMode === '2') {
        //   that.show = false
        //   that.sydate = obj.stime ? obj.stime : ''
        //   that.eydate = obj.etime ? obj.etime : ''
        // }
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
              'disabled': that.isedit,
              'disabledstyle': 'background:#ebebe4',
              'originS': 'multiple',
              'selectId': ['select101', 'select100'],
              'callback': function (obj) {
                if (obj.ind !== 0) {
                  that.Steacher = obj.value
                } else {
                  that.Steacher = ''
                }
              },
              'matchval': [{val: that.Steacher}],
              'cleartxt': '请选择'
            })
          })
          .catch(function (error) {
            console.log(error)
          })
        this.axios({
          method: 'post',
          url: classroomurl
        })
          .then(function (res) {
            let temp = []
            temp[0] = {value: '-1', txt: '请选择...'}
            let objs = res.data.result.data
            for (let item = 0; item < objs.length; item++) {
              temp[item + 1] = {}
              temp[item + 1]['value'] = objs[item].classroomId
              temp[item + 1]['txt'] = objs[item].classroomName
            }
            that.$Select({
              'data': temp,
              'originS': 'multiple',
              'disabled': that.isedit,
              'disabledstyle': 'background:#ebebe4',
              'selectId': ['select99', 'select98'],
              'callback': function (obj) {
                if (obj.ind !== 0) {
                  that.classroomid = obj.value
                } else {
                  that.classroomid = ''
                }
              },
              'matchval': [{val: that.classroomid}],
              'cleartxt': '请选择...'
            })
          })
          .catch(function (error) {
            console.log(error)
          })
        this.$Select({
          'selectId': 'select90',
          'disabled': that.isedit,
          'disabledstyle': 'background:#ebebe4',
          'callback': function (obj) {
            that.date = obj.ind + 1
            if (obj.ind === 1 || obj.ind === '1') {
              that.show = false
            } else {
              that.show = true
            }
          },
          'cleartxt': '请选择...',
          'matchval': [{ind: that.date}]
        })
        this.$Select({
          'selectId': 'select91',
          'disabled': that.isedit,
          'disabledstyle': 'background:#ebebe4',
          'callback': function (obj) {
            if (obj.ind === 0) {
              that.weeknum = ''
            } else {
              that.weeknum = obj.ind
            }
          },
          'cleartxt': '请选择...',
          'matchval': [{ind: that.weeknum}]
        })
        that.classnumevent()
      }
    },
    radioeventlive (obj) {
      if (this.isedit) {
        return
      } else {
        this.live = obj.val
      }
    },
    radioeventrecord (obj) {
      this.record = obj.val
    },
    radioeventcome (obj) {
      this.come = obj.val
      if (obj.val === '1') {
        this.comeflag = true
      } else {
        this.comeflag = false
      }
    },
    valid () {
      if (this.show) {
        if (this.name.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.name, '', false)
          return false
        } else if (this.Sweek.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.Sweek, '', false)
          return false
        } else if (this.weeknum.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.weeknum, '', false)
          return false
        } else if (this.sclass.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.sclass, '', false)
          return false
        } else if (this.eclass.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.eclass, '', false)
          return false
        } else if (this.classroomid.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.classroomid, '', false)
          return false
        } else if (this.Steacher.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.Steacher, '', false)
          return false
        } else {
          if (this.comeflag) { // 到勤率统计勾选是，需判断人数
            if (this.person.toString().replace(/\s/gi, '') === '') {
              this.win(classwarntxt.person.toString(), '', false)
              return false
            } else if (this.person <= 0) {
              this.win(classwarntxt.personnum, '', false)
              return false
            } else {
              return true
            }
          } else {
            return true
          }
        }
      } else {
        if (this.name.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.name, '', false)
          return false
        } else if (this.classroomid.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.classroomid, '', false)
          return false
        } else if (this.Steacher.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.Steacher, '', false)
          return false
        } else {
          if (this.comeflag) { // 到勤率统计勾选是，需判断人数
            if (this.person.toString().replace(/\s/gi, '') === '') {
              this.win(classwarntxt.person.toString(), '', false)
              return false
            } else if (this.person <= 0) {
              this.win(classwarntxt.personnum, '', false)
              return false
            } else {
              return true
            }
          } else {
            return true
          }
        }
      }
    },
    formcat (obj) {
      return obj.year + '-' + (obj.month < 10 ? '0' + obj.month : obj.month) + '-' + (obj.day < 10 ? '0' + obj.day : obj.day) + ' ' + (obj.hour < 10 ? '0' + obj.hour : obj.hour) + ':' + (obj.minutes < 10 ? '0' + obj.minutes : obj.minutes) + ':' + (obj.seconds < 10 ? '0' + obj.seconds : obj.seconds)
    },
    startfn (obj) {
      this.sydate = this.formcat(obj)
    },
    endfn (obj) {
      this.eydate = this.formcat(obj)
    },
    savedata () {
      if (this.isedit || this.valid()) {
        let that = this
        this.axios({
          method: 'post',
          url: editlessonurl,
          data: {
            lessonName: that.name,
            lessonId: that.ids,
            description: that.des,
            weekNum: that.Sweek * 1,
            ofTheWeek: that.weeknum * 1,
            courseId: that.courseId,
            classTemplateId: that.template,
            startClass: that.sclass * 1,
            endClass: that.eclass * 1,
            classroomId: that.classroomid,
            teacherId: that.Steacher,
            studentsInPlan: that.person * 1,
            recordable: that.record * 1,
            liveable: that.live * 1,
            countable: that.come * 1,
            timingMode: that.date * 1,
            startTime: that.sydate,
            endTime: that.eydate,
            recording: that.recording
          }
        })
        .then(function (res) {
          if (res.data.id === '0') {
            that.win(res.data.content, '', false)
          } else {
            that.cancelfn()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    cancelfn () {
      this.$router.go(-1)
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
    },
    classnumevent () {
      let that = this
      let temp = []
      temp[0] = {value: '-1', txt: '请选择...'}
      let objs = that.classNumberList || []
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = {value: objs[item].classNo, txt: objs[item].className}
      }
      that.sclassobj = that.$Select({
        'disabled': that.isedit,
        'disabledstyle': 'background:#ebebe4',
        'data': temp,
        'originS': 'multiple',
        'selectId': ['select95', 'select94'],
        'callback': function (obj) {
          that.sclass = obj.ind ? obj.value : ''
        },
        'matchval': [{ind: that.sclass}],
        'cleartxt': '请选择...'
      })
      that.eclassobj = that.$Select({
        'data': temp,
        'disabled': that.isedit,
        'disabledstyle': 'background:#ebebe4',
        'originS': 'multiple',
        'selectId': ['select97', 'select96'],
        'callback': function (obj) {
          that.eclass = obj.ind ? obj.value : ''
        },
        'matchval': [{ind: that.eclass}],
        'cleartxt': '请选择...'
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style>
.el-picker-panel{
  z-index: 9999999 !important;
}
</style>

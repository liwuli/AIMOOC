<template>
 	<div class="formwin" ref="box">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{namedetailN}}<i>*</i>：</span>
			 		<input type="text"  v-model="name" />
			 	</div>
			 	<div class="formline"  style="width: 50%;">
			 		<span class="txt">{{dateN}}<i>*</i>：</span>
			 		<div id='select90'  style="margin-top: 3px;">
						<div class="listinfo">{{coursetypeinfo.week}}</div>
						<div class="listinfo">{{coursetypeinfo.free}}</div>
					</div>
			 	</div>
			 	<div class="formline " style="width: 50%;" v-show="show">
			 		<span class="txt">{{SweekN}}<i>*</i>：</span>
          <div @click="weekListShow = !weekListShow" class="Select" style="cursor: pointer;">
            <input type="text" id="showWeek" v-model="showSweek" disabled style="width: 175px;border: none;background: #fff;">
            <div id="showWeekarrow" class="arrow iconfont icon-selectarr" style="border-left: 1px solid;"></div>
          </div>
          <div id="week" v-show="weekListShow">
            <div class="wrap">
              <ul class="left">
                <li @click="chooseWeekType(item.value)" v-for="item in weekType" :style="weekTypeSelect==item.value?chooseColor:''">{{item.name}}</li>
              </ul>
              <ul class="right" @click="weekTypeSelect = ''">
                <li v-for="item in allWeek">
                  <input type="checkbox" v-model="Sweek" :value="item" :id="'checked' + item">
                  <label :style="Sweek.indexOf(item)+1?chooseColor:''" :for="'checked' + item">{{item}}</label>
                </li>
              </ul>
            </div>
          </div>
			 	</div>
			 	<div class="formline" style="width: 50%;" v-show="show">
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
			 	<div class="formline"  style="width: 50%;"  v-show="show">
			 		<span class="txt">{{sclassN}}<i>*</i>：</span>
			 		<div id='select94' class="Select" style="margin-top: 3px;"></div>
					<select id="select95"></select>
			 	</div>
			 	<div class="formline"  style="width: 50%;"  v-show="show">
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
          <div class="Select">
            <v-select v-model="Steacher" :options="teacherList" maxHeight="225px"></v-select>
          </div>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{personN}}<i v-show="comeflag">*</i>：</span>
			 		<input type="number"  min="0"  v-model="person" />
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{liveN}}：</span>
			 		<Radio :type="add" @radioevent="radioeventlive" :radioinfo="radioinfolive"></Radio>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{recordN}}：</span>
			 		<Radio :type="add" @radioevent="radioeventrecord" :radioinfo="radioinforecord"></Radio>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{comeN}}：</span>
			 		<Radio :type="add" @radioevent="radioeventcome" :radioinfo="radioinfocome"></Radio>
			 	</div>
			 	<div class="formline" v-show="!show"  style="width: 50%;">
			 		<span class="txt">{{sydateN}}：</span>
           <el-date-picker
            v-model="sydate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="startfn"
            placeholder="选择日期时间" :clearable="false">
          </el-date-picker>
			 		<!-- <Calendarme :inputstyle="inputstyle" :valshow="valshow" :ymdhms="ymdhms" :dateval="sydate" @startfn="startfn" :ids="start"></Calendarme> -->
			 	</div>
			 	<div class="formline" v-show="!show"  style="width: 50%;">
			 		<span class="txt">{{eydateN}}：</span>
			 		<!-- <Calendarme :inputstyle="inputstyle" :valshow="valshow" :ymdhms="ymdhms" :dateval="eydate" @endfn="endfn" :ids="end"></Calendarme> -->
           <el-date-picker
            v-model="eydate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间" :clearable="false" @change="end_time_change">
          </el-date-picker>
			 	</div>
			 	<div class="formline" style="height: 110px;width: 50%;">
			 		<span class="txt">{{desN}}：</span>
			 		<textarea name="" style="width: 210px;" rows="" cols="" v-model="des"></textarea>
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
import Calendarme from '@/components/extend/calendar.vue'
import Radio from '@/components/extend/radio'
import {weekType, oneweek, coursetypeinfo, classwarntxt, eydateN, sydateN, classroomurl, teacherurl, addlesson, addradioinfocome, addradioinforecord, addradioinfolive, namedetailN, desN, comeN, recordN, liveN, personN, SteacherN, roomN, eclassN, sclassN, templatesN, SweekdayN, SweekN, dateN, msgadddetailN, saveN, cancelN} from '@/module/admin/config/courselessonlistinfo'
export default {
  name: 'AJcourseadddetail',
  data () {
    return {
      box: '',
      teacherList: [],
      weekListShow: false,
      chooseColor: {color: '#3197fc'},
      weekType: weekType,
      weekTypeSelect: '',
      allWeek: [],
      add: 'add',
      coursetypeinfo: coursetypeinfo,
      oneweek: oneweek,
      msg: msgadddetailN,
      sydateN: sydateN,
      eydateN: eydateN,
      inputstyle: 'width:190px',
      ymdhms: 'ymdhMs',
      start: 'start',
      end: 'end',
      sydate: '',
      eydate: '',
      valshow: true,
      comeflag: false,
      wininfo: {
        widhei: ['700px', '450px'],
        btncancelleft: '545px',
        contenthei: '333px'
      },
      radioinfolive: addradioinfolive,
      radioinforecord: addradioinforecord,
      radioinfocome: addradioinfocome,
      name: '',
      des: '',
      come: 0,
      record: 0,
      live: 0,
      Steacher: '',
      person: '',
      sclass: '',
      eclass: '',
      template: '',
      Sweekday: '',
      Sweek: [],
      date: '1',
      namedetailN: namedetailN,
      desN: desN,
      comeN: comeN,
      ofTheWeek: '',
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
      term_detail:null
    }
  },
  components: {
    Radio,
    Calendarme
  },
  methods: {
    end_time_change(e){
         var day1 = new Date(e);
         var day2 = new Date(this.sydate);
         var day3 = new Date(this.term_detail.endTime.split(' ')[0]);
         //选择的结束日期必须要大于 开始日期  并且小于学期的结束日期
         if(day1.getTime() > day2.getTime() && day1.getTime() < day3.getTime()){

         }else{
            this.eydate='';
            this.win('结束日期必须大于开始日期,并且小于学期结束日期', '', false)
         }
    },

    chooseWeekType (value) {
      this.Sweek = []
      if (this.weekTypeSelect === value) {
        this.weekTypeSelect = ''
      } else {
        this.weekTypeSelect = value
        switch (value) {
          case 'all':
            this.Sweek = this.allWeek
            break
          case 'single':
            for (let i of this.allWeek) {
              i % 2 && this.Sweek.push(i)
            }
            break
          case 'double':
            for (let i of this.allWeek) {
              !(i % 2) && this.Sweek.push(i)
            }
            break
        }
      }
    },
    radioeventlive (obj) {
      this.live = obj.val
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
    formcat (obj) {
      return obj.year + '-' + (obj.month < 10 ? '0' + obj.month : obj.month) + '-' + (obj.day < 10 ? '0' + obj.day : obj.day) + ' ' + (obj.hour < 10 ? '0' + obj.hour : obj.hour) + ':' + (obj.minutes < 10 ? '0' + obj.minutes : obj.minutes) + ':' + (obj.seconds < 10 ? '0' + obj.seconds : obj.seconds)
    },
    startfn (obj) {
      var time = obj.split(' ')[0];
      var day1 = new Date(time);
      var day2 = new Date(this.term_detail.startTime.split(' ')[0]);
      //选择的日期必须要大于 学期开始日期
      if(day1.getTime() > day2.getTime()){
          //得到天数  除去 7 得到周数
          var day = (day1 - day2) / (1000 * 60 * 60 * 24)/7;
          this.weekNum = Math.ceil(day);
          console.log("本学期共："+Math.ceil(day) )
      }else{
        this.sydate='';
        this.win('选择的日期必须大于学期开始日期', '', false)
      }


      console.log(this.term_detail);
      // this.sydate = this.formcat(obj)
      // 新加的计算当前选择的是星期几
      var time = new Date(this.sydate);
      this.ofTheWeek = (time.getDay())==0 ? 7 : time.getDay();
    },
    endfn (obj) {
      this.eydate = this.formcat(obj)
    },
    valid () {
      if (this.show) {
        if (this.name.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.name, '', false)
          return false
        } else if (this.Sweek.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.Sweek, '', false)
          return false
        } else if (this.ofTheWeek.toString().replace(/\s/gi, '') === '') {
          this.win(classwarntxt.ofTheWeek, '', false)
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
        } else if (!this.Steacher || this.Steacher.value.toString().replace(/\s/gi, '') === '') {
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
        } else if (!this.Steacher || this.Steacher.value.toString().replace(/\s/gi, '') === '') {
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
    savedata () {      
      if (this.valid()) {
        let that = this
        this.axios({
          method: 'post',
          url: addlesson,
          data: {
            lessonName: that.name,
            description: that.des,
            weekNum:  that.date == '1'?  that.Sweek.join(',') :that.weekNum,//that.Sweek.join(',') =="" ? that.weekNum :''
            ofTheWeek: that.ofTheWeek * 1,
            courseId: that.courseId,
            classTemplateId: that.template,
            startClass: that.sclass * 1,
            endClass: that.eclass * 1,
            classroomId: that.classroomid,
            teacherId: that.Steacher.value,
            studentsInPlan: that.person * 1,
            recordable: that.record * 1,
            liveable: that.live * 1,
            countable: that.come * 1,
            timingMode: that.date * 1,
            startTime: that.sydate,
            endTime: that.eydate
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
      let objs = that.classNumberList
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = {value: objs[item].classNo, txt: objs[item].className}
      }
      that.sclassobj = that.$Select({
        'data': temp,
        'originS': 'multiple',
        'selectId': ['select95', 'select94'],
        'callback': function (obj) {
          that.sclass = obj.ind ? obj.value : ''
        }
      })
      that.eclassobj = that.$Select({
        'data': temp,
        'originS': 'multiple',
        'selectId': ['select97', 'select96'],
        'callback': function (obj) {
          that.eclass = obj.ind ? obj.value : ''
        }
      })
    }
  },
  computed: {
    showSweek: function () {
      switch (this.weekTypeSelect) {
        case 'all':
          return '全部'
        case 'single':
          return '单周'
        case 'double':
          return '双周'
        default:
          return this.Sweek
      }
    }
  },
  mounted () {
    let that = this
    let obj = this.$route.params.info
    this.term_detail = this.$route.params.trem.term_detail
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      for (let i = obj['startWeek']; i <= obj['endWeek']; i++) {
        that.allWeek.push(i)
      }
      that.courseId = obj.courseId
      that.classNumberList = obj.classNumberList
      this.classnumevent()
      this.$Select({
        'selectId': 'select90',
        'callback': function (obj) {
          that.date = obj.ind + 1
          if (obj.ind === 1 || obj.ind === '1') {
            that.show = false
          } else {
            that.show = true
          }
        },
        'cleartxt': '请选择...'
      })
      this.$Select({
        'selectId': 'select91',
        'callback': function (obj) {
          that.ofTheWeek = obj.ind || ''
        },
        'cleartxt': '请选择...'
      })
    }
    this.box = this.$refs.box
    this.box.addEventListener('click', (e) => {
      if (e.target.parentNode.parentNode.parentNode.parentNode.id !== 'week' && e.target.id !== 'showWeek' && e.target.id !== 'showWeekarrow') {
        this.weekListShow = false
      }
    }, false)
  },
  beforeCreate () {
    let that = this
    this.axios.post(teacherurl, {roleType: 2})
    .then(function (res) {
      let temp = []
      that.Steacher = temp[0] = {value: '', label: '请选择...'}
      let objs = res.data
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = {}
        temp[item + 1]['value'] = objs[item].id
        temp[item + 1]['label'] = objs[item].realName + ' (' + objs[item].code + ')'
      }
      that.teacherList = temp
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
        'selectId': ['select99', 'select98'],
        'callback': function (obj) {
          that.classroomid = obj.ind ? obj.value : ''
        }
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>
<style>
.el-picker-panel{
  z-index: 9999999 !important;
}
</style>
<style scoped>
  #week{
    height: 200px;
    width: 221px;
    border: 1px solid #929ac2;
    background: #fff;
    z-index: 1;
    position: absolute;
    right: 13px;
    top: 30px;
    overflow: hidden;
  }
  #week .wrap{
    height: 100%;
    width: 109%;
  }
  #week li{
    line-height: 30px;
    cursor: pointer;
  }
  #week li:hover{
    background: #929ac2;
  }
  #week li input{
    display: none;
  }
  #week li label{
    display: block;
    cursor: pointer;
  }
  #week .left{
    width: 42%;
    float: left;
    text-indent: 8px;
  }
  #week .right{
    float: left;
    height: 100%;
    width: 57%;
    overflow-y: scroll;
    text-indent: 15px;
    border-left: 1px solid  #929ac2;
  }
</style>

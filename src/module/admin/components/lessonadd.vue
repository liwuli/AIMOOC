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
			 		<!-- <div id='select92' style="margin-top: 3px;" filterable></div>
					<select id="select93"></select> -->
          <DropdownThx @selectFunc="selectFunc" :itemlist="selectItemlist" :checkedId="selectItemCheckedId" :placeholder="selectPlaceholder" :nodatatext="selectNodatatext"></DropdownThx>
			 	</div>
			 	<div class="formline " style="width: 50%;display: none;">
			 		<span class="txt">{{basicinfo.sweekN}}<i>*</i>：</span>
			 		<input type="number" :value="weekno"  style="display: none;" :min="weekno" :max="weekno" step="1"    v-model="weekno" />
			 	</div>
			 	<div class="formline"  style="width: 50%;">
			 		<span class="txt">{{basicinfo.SteacherN}}<i>*</i>：</span>
			 		<div id='select100' style="margin-top: 3px;"></div>
					<select id="select101"></select>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.personN}}<i v-show="comeflag">*</i>：</span>
			 		<input type="number"  min="0"  v-model="person" />
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.liveN}}：</span>
			 		<Radio :type="add" @radioevent="radioeventlive" :radioinfo="radioinfolive"></Radio>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.recordN}}：</span>
			 		<Radio :type="add" @radioevent="radioeventrecord" :radioinfo="radioinforecord"></Radio>
			 	</div>
			 	<div class="formline " style="width: 50%;">
			 		<span class="txt">{{basicinfo.comeN}}：</span>
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
import DropdownThx from '@/components/extend/dropdownThx'
import Radio from '@/components/extend/radio'
import {basicinfo, warntxt, pathinfo, coursesurl, teacherurl, addlesson, addradioinfocome, addradioinforecord, addradioinfolive,dropdownSelect} from '@/module/admin/config/lessoninfo'
export default {
  name: 'AJlessonadd',
  data () {
    return {
      add: 'add',
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['700px', '450px'],
        btncancelleft: '545px',
        contenthei: '333px'
      },
      sweek: '',
      eweek: '',
      radioinfolive: addradioinfolive,
      radioinforecord: addradioinforecord,
      radioinfocome: addradioinfocome,
      name: '',
      des: '',
      come: 0,
      comeflag: false,
      record: 0,
      live: 0,
      Steacher: '',
      person: 0,
      courseId: '',
      classroomid: '',
      classnum: '',
      Stype: '',
      weeknum: '',
      weekno: '',
      weekflag: '',
      smallN: basicinfo.smallN,
      bigN: basicinfo.bigN,
      termId: '',
      templateId: '',
      selectItemlist: [],
      selectItemCheckedId: '',
      selectPlaceholder: dropdownSelect.placeholder,
      selectNodatatext: dropdownSelect.nodatatext,
      selectTempweek: []
    }
  },
  components: {
    DropdownThx,
    Radio
  },
  methods: {
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
      } else {
        if (this.comeflag) { // 到勤率统计勾选是，需判断人数
          if (this.person.toString().replace(/\s/gi, '') === '') {
            this.win(warntxt.person, '', false)
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
          termId: that.termId,
          description: that.des,
          weekNum: that.weekno,
          ofTheWeek: that.weeknum,
          courseId: that.courseId,
          classTemplateId: that.template,
          startClass: that.classnum * 1,
          endClass: that.classnum * 1,
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
          that.win(res.data.content, '', false)
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
    },
    selectFunc:function(obj){
      this.sweek = this.selectTempweek[obj.ind - 1][0]
      this.eweek = this.selectTempweek[obj.ind - 1][1]
      if (this.weekno >= this.sweek && this.weekno <= this.eweek) {
        this.courseId = obj.value
      } else if (this.weekno < this.sweek) {
        this.courseId = ''
        this.win(this.smallN, '', false)
      } else if (this.weekno > this.eweek) {
        this.courseId = ''
        this.win(this.bigN, '', false)
      }
    }
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.classnum = obj.classNo
      this.templateId = this.$route.params.template
      this.classroomid = this.$route.params.room
      this.template = this.$route.params.template
      this.Stype = this.$route.params.type
      this.weeknum = this.$route.params.weekno
      this.weekno = this.$route.params.weekflag
      this.termId = this.$route.params.termid
      let that = this
      this.axios({
        method: 'post',
        url: coursesurl,
        data: {
          courseType: '1',
          keywords: ''
        }
      })
      .then(function (res) {
        let temp = []
        let tempweek = []
        temp[0] = {value: '-1', txt: '请选择...'}
        let objs = res.data.data
        let item = 0
        for (let i = 0; i < objs.length; i++) {
          if (that.templateId === objs[i].templateId && that.termId === objs[i].termId) {
            tempweek[item] = []
            temp[item + 1] = {}
            temp[item + 1]['value'] = objs[i].courseId
            temp[item + 1]['txt'] = objs[i].courseName
            tempweek[item][0] = objs[i].startWeek
            tempweek[item][1] = objs[i].endWeek
            item++
          }
        }
        that.selectTempweek = tempweek;
        that.selectItemlist = temp;
        // that.$Select({
        //   'data': temp,
        //   'originS': 'multiple',
        //   'selectId': ['select93', 'select92'],
        //   'callback': function (obj) {
        //     that.sweek = tempweek[obj.ind - 1][0]
        //     that.eweek = tempweek[obj.ind - 1][1]
        //     if (that.weekno >= that.sweek && that.weekno <= that.eweek) {
        //       that.courseId = obj.value
        //     } else if (that.weekno < that.sweek) {
        //       that.courseId = ''
        //       that.win(that.smallN, '', false)
        //     } else if (that.weekno > that.eweek) {
        //       that.courseId = ''
        //       that.win(that.bigN, '', false)
        //     }
        //   }
        // })
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

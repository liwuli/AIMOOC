<template>
     <div class="formwin">
         <transition name="fade">
            <router-view></router-view>
        </transition>
         <div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
             <div class="title">
                 <span class="menuname">{{msg}}</span>
                 <span class="filename"></span>
             </div>
             <div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
             <div class="content" :style="'height:' + wininfo.contenthei">
                 <div class="formline " style="width: 50%;">
                     <span class="txt">{{CnameN}}<i>*</i>：</span>
                     <input type="text"  v-model="name"  :value="name"/>
                 </div>
                 <div class="formline " style="width: 50%;">
                     <span class="txt">{{codeN}}：</span>
                     <input type="text"  v-model="code"  :value="code"/>
                 </div>
                 <div class="formline "  style="width: 50%;">
                     <span class="txt">{{termN}}：</span>
                     <div id='select1' style="margin-top: 3px;"></div>
                    <select id="select2"></select>
                 </div>
                 <div class="formline " v-show="eduType" style="width: 50%;">
                     <span class="txt">{{ScollegeN}}<i>*</i>：</span>
                     <div id='select3' style="margin-top: 3px;"></div>
                    <select id="select4"></select>
                 </div>
                 <div class="formline " v-show="eduType" style="width: 50%;">
		           <span class="txt">{{SteacherN}}<i>*</i>：</span>
		           <div id='select5' style="margin-top: 3px;"></div>
		          	<select id="select6"></select>
		         </div>
		         <div class="formline " v-show="eduType" style="width: 50%;">
		           <div id='select7' style="margin-top: 3px;width: 320px;"></div>
		          	<select id="select8"></select>
		         </div>
		         
         		<div class="formline " v-show="!eduType" style="width: 50%;">
           			<span class="txt">{{SteacherN}}<i>*</i>：</span>
           			<div id='select17' style="margin-top: 3px;"></div>
          			<select id="select18"></select>
         		</div>
                 
                 <div class="formline " v-show="!eduType" style="width: 50%;">
                     <span class="txt">{{SgradeN}}<i>*</i>：</span>
                     <div id='select13' style="margin-top: 3px;"></div>
                    <select id="select14"></select>
                 </div>
                 <div class="formline " v-show="!eduType" style="width: 50%;">
                     <span class="txt">{{SsubjectN}}<i>*</i>：</span>
                     <div id='select23' style="margin-top: 3px;"></div>
                    <select id="select24"></select>
                 </div>
                 
                 <div class="formline" style="height: 110px;width: 50%;">
                     <span class="txt">{{labelinfo.labelN}}：</span>
                     <span class="btn" @click="selectlabel">{{labelinfo.selectlabelN}}</span>
                     <div class="labeltextarea">
                         <div class="parts" v-for="item in labelselected"  @click="dellabel(item.id)">
                             {{item.name}}
                             <span class="delicon iconfont icon-dellist"></span>
                         </div>
                     </div>
                 </div>
                 <div class="formline" style="height: 110px;width: 50%;">
                     <span class="txt">{{desN}}：</span>
                     <textarea name="" style="width: 210px;" rows="" cols="" v-model="des"  :value="des"></textarea>
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
import {collegeteacherurlall, warntxt, labelinfo, classnameN, collegeurl, studySectionSubjecturl, pagesize, termurl, msgeditN, SgradeN, SsubjectN, SteacherN, ScollegeN, termN, desN, codeN, CnameN, nameNULL, editurl, saveN, cancelN, teacherurl} from '@/module/admin/config/courseonlineinfo'
export default {
  name: 'AJcourseOnlineedit',
  data () {
    return {
      msg: msgeditN,
      wininfo: {
        widhei: ['700px', '540px'],
        btncancelleft: '545px',
        contenthei: '423px'
      },
      eduType: this.$store.state.educationType,
      name: '',
      code: '',
      type: '',
      des: '',
      term: '',
      college: '',
      teacher: '',
      classs: '',
      classname: '',
      CnameN: CnameN,
      codeN: codeN,
      desN: desN,
      termN: termN,
      ScollegeN: ScollegeN,
      SteacherN: SteacherN,
      SgradeN: SgradeN,
      SsubjectN: SsubjectN,
      saveN: saveN,
      cancelN: cancelN,
      classnameN: classnameN,
      Sgrade: '',
      Ssubject: '',
      gradeS: '',
      subjectS: '',
      labelinfo: labelinfo,
      labelselected: {},
      labelidarr: [],
      initlabel: '',
      info: '',
      id: '',
      teacherind: 0,
      collegeteacherId: ''
    }
  },
  methods: {
    valid () {
    },
    getteacher () {
      let that = this
      // 学院
      this.axios({
        method: 'post',
        url: collegeteacherurlall,
        params: {
          'par': {
            pageSize: pagesize,
            pageIndex: 1
          }
        }
      })
      .then(function (res) {
        let temp = []
        let teacher = []
        let objs = res.data
        if (objs.length === 0) {
          temp.push({value: '', txt: '请选择'})
          teacher.push({value: '', txt: '请选择'})
        }
        let j = 0
        for (let item = 0; item < objs.length; item++) {
          j++
          temp[item] = []
          teacher[item] = []
          temp[item] = {}
          temp[item]['value'] = objs[item].id
          if (objs[item].id === that.collegeteacherId) {
            that.teacherind = item
          }
          temp[item]['txt'] = objs[item].collegeName
          let userList = objs[item].userList
          for (let k = 0; k < userList.length; k++) {
            if (!teacher[item][0]) {
              teacher[item][0] = {value: '', txt: '请选择'}
            }
            teacher[item].push({value: userList[k].id, txt: userList[k].realName})
          }
        }
        if (j === objs.length) {
          that.collegeS = that.$Select({
            'data': temp,
            'originS': 'multiple',
            'selectId': ['select6', 'select5'],
            'callback': function (obj) {
              if (that.teacherS) {
                that.teacherS.cfg.data = teacher[obj.ind]
                that.teacherS.cfg.domdata = false
                that.teacherS.initCommonVal()
              }
            },
            'matchval': [{val: that.collegeteacherId}]
          })
          that.teacherS = that.$Select({
            'data': teacher[that.teacherind],
            'originS': 'multiple',
            'selectId': ['select8', 'select7'],
            'callback': function (obj) {
              if (obj.ind !== 0) {
                that.teacher = obj.value
              } else {
                that.teacher = ''
              }
            },
            'matchval': [{val: that.teacher}]
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getPteachers () {  // 普教查询老师
      let that = this
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
          'selectId': ['select18', 'select17'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.teacher = obj.value
            } else {
              that.teacher = ''
            }
          },
          'matchval': [{val: that.teacher}],
          'cleartxt': '请选择...'
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getCollegeList () {
      let that = this
      this.axios({
        method: 'post',
        url: collegeurl,
        params: {
          'par': {
            pageSize: pagesize,
            pageIndex: 1
          }
        }
      })
      .then(function (res) {
        let temp = []
        temp[0] = {value: '-1', txt: '请选择...'}
        let objs = res.data
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['txt'] = objs[item].collegeName
        }
        that.$Select({
          'data': temp,
          'originS': 'multiple',
          'selectId': ['select4', 'select3'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.college = obj.value
            } else {
              that.college = ''
            }
          },
          'matchval': [{val: that.college}],
          'cleartxt': '请选择...'
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getGradeAndSubjectList () {
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
      .then(function (res) {
        let temp = []
        let subject = []
        let subjectall = []
        temp[0] = {value: '-1', txt: '请选择...'}
        subject[0] = [{value: '-1', txt: '请选择...'}]
        subjectall[0] = {value: '-1', txt: '请选择...'}
        let objs = res.data
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['txt'] = objs[item].name
          subject[item + 1] = []
          let subjectList = objs[item].subjectLists
          if (subjectList.length === 0) {
            subject[item + 1].push({value: '-1', txt: '请选择...'})
          } else {
            for (let k = 0; k < subjectList.length; k++) {
              if (k === 0) {
                subject[item + 1].push({value: '-1', txt: '请选择...'})
              }
              subject[item + 1].push({value: subjectList[k].subjectId, txt: subjectList[k].subjectName})
              subjectall.push({value: subjectList[k].subjectId, txt: subjectList[k].subjectName})
            }
          }
        }
        that.gradeS = that.$Select({
          'data': temp,
          'originS': 'multiple',
          'selectId': ['select14', 'select13'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.Sgrade = obj.value
              that.subjectS.cfg.data = subject[obj.ind]
              that.subjectS.initCommonVal()
            } else {
              that.Sgrade = ''
              that.subjectS.cfg.data = subjectall
              that.subjectS.initCommonVal()
            }
            that.Ssubject = ''
          },
          'matchval': [{val: that.Sgrade}],
          'cleartxt': '请选择...'
        })
        that.subjectS = that.$Select({
          'data': subjectall,
          'originS': 'multiple',
          'selectId': ['select24', 'select23'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.Ssubject = obj.value
            } else {
              that.Ssubject = ''
            }
          },
          'matchval': [{val: that.Ssubject}],
          'cleartxt': '请选择...'
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    check () {
      if (this.name.toString().replace(/\s/gi, '') === '') {
        this.win(nameNULL, '', false)
        return false
      } else if (this.college.toString().replace(/\s/gi, '') === '' && this.eduType) {
        this.win(warntxt.college, '', false)
        return false
      } else if (this.teacher.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.teacher, '', false)
        return false
      } else {
        return true
      }
    },
    selectlabel () {
      this.$router.push({name: 'AJcourseOnlinelabeledit', params: {labels: this.labelselected, info: this.info, 'edit': 'edit'}})
    },
    dellabel (delid) {
      delete this.labelselected[delid]
      this.labelselected = Object.assign({}, this.labelselected, {})
      this.labelidarr = []
      for (let keys in this.labelselected) {
        this.labelidarr.push(keys)
      }
    },
    savedata () {
      if (!this.check()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        data: {
          courseName: that.name,
          courseNo: that.code,
          description: that.des,
          subjectId: that.Ssubject,
          studySectionId: that.Sgrade,
          termId: that.term,
          teacherId: that.teacher,
          collegeId: that.college,
//        deptName: that.classname,
          courseId: that.id,
          labelIds: that.labelidarr
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
        } else {
          that.$router.push({name: 'AJcourseOnline'})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: 'AJcourseOnline'})
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
    let routeinfo = this.$route.params.item
    if (!routeinfo) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = routeinfo.id
      this.name = routeinfo.name
      this.classname = routeinfo.className
      this.code = routeinfo.code
      this.des = routeinfo.des
      this.term = routeinfo.termId
      this.college = routeinfo.collegeId
      this.collegeteacherId = routeinfo.collegeteacherId
      this.teacher = routeinfo.teacherId
      this.Ssubject = routeinfo.subjectId
      this.Sgrade = routeinfo.studySectionId
      this.initlabel = routeinfo.labelList
      for (let item = 0; item < this.initlabel.length; item++) {
        this.labelselected[this.initlabel[item].labelId] = {id: this.initlabel[item].labelId, name: this.initlabel[item].labelName}
        this.labelidarr.push(this.initlabel[item].labelId)
      }
      let that = this
      if (that.eduType) {
        // 高教-院系列表
        that.getCollegeList()
        // 高教-讲师列表
        this.getteacher()
      } else {
        // 普教-年级、科目列表
        that.getGradeAndSubjectList()
        // 普教-讲师列表
        this.getPteachers()
      }
      this.axios({
        method: 'post',
        url: termurl,
        data: {
          page: {
            pageSize: pagesize,
            pageIndex: 1
          },
          keywords: ''
        }
      })
      .then(function (res) {
        let temp = []
        temp[0] = {value: '-1', txt: '请选择...'}
        let objs = res.data.termList
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].termId
          temp[item + 1]['txt'] = objs[item].termName
        }
        that.$Select({
          'data': temp,
          'originS': 'multiple',
          'selectId': ['select2', 'select1'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.term = obj.value
            } else {
              that.term = ''
            }
          },
          'matchval': [{val: that.term}],
          'cleartxt': '请选择...'
        })
      })
      .catch(function (error) {
        console.log(error)
      })
//    this.axios({
//      method: 'post',
//      url: teacherurl,
//      data: {
//        roleType: 2
//      }
//    })
//    .then(function (res) {
//      let temp = []
//      temp[0] = {value: '-1', txt: '请选择...'}
//      let objs = res.data
//      for (let item = 0; item < objs.length; item++) {
//        temp[item + 1] = {}
//        temp[item + 1]['value'] = objs[item].id
//        temp[item + 1]['txt'] = objs[item].realName
//      }
//      that.$Select({
//        'data': temp,
//        'originS': 'multiple',
//        'selectId': ['select8', 'select7'],
//        'callback': function (obj) {
//          if (obj.ind !== 0) {
//            that.teacher = obj.value
//          } else {
//            that.teacher = ''
//          }
//        },
//        'matchval': [{val: that.teacher}],
//        'cleartxt': '请选择...'
//      })
//    })
//    .catch(function (error) {
//      console.log(error)
//    })
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'AJcourseOnlineedit') {
        this.info = to.params.info
        this.labelselected = Object.assign({}, this.labelselected, to.params.selectarr)
        this.labelidarr = []
        for (let keys in to.params.selectarr) {
          this.labelidarr.push(keys)
        }
      }
    }
  }
}
</script>

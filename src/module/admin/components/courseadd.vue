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
           <span class="txt">{{nameN}}<i>*</i>：</span>
           <input type="text" v-model="name"/>
         </div>
         <div class="formline" style="width: 50%;">
           <span class="txt">{{codeN}}<i>*</i>：</span>
           <input type="text" v-model="code"/>
         </div>				 
         <div class="formline" v-show="eduType" style="width: 50%;">
           <span class="txt">{{collegeN}}<i>*</i>：</span>
           <div class="Select">
             <v-select v-model="college" :options="collegeList" maxHeight="220px"></v-select>
           </div>
         </div>
         <div class="formline" v-show="!eduType" style="width: 50%;">
           <span class="txt">{{SgradeN}}<i>*</i>：</span>
           <div id='select13' style="margin-top: 3px;"></div>
          <select id="select14"></select>
         </div>
         <div class="formline" v-show="!eduType" style="width: 50%;">
           <span class="txt">{{SsubjectN}}<i>*</i>：</span>
           <div id='select23' style="margin-top: 3px;"></div>
          <select id="select24"></select>
         </div>
         <div class="formline" style="width: 50%;">
           <span class="txt">{{teacherN}}<i>*</i>：</span>
           <div class="Select">
             <v-select v-model="teacher" :options="teacherList" maxHeight="225px"></v-select>
           </div>
         </div>
         <div class="formline" style="width: 50%;">
           <span class="txt">{{termN}}<i>*</i>：</span>
           <div id='select1' style="margin-top: 3px;"></div>
          <select id="select2"></select>
         </div>
         <div class="formline" style="width: 50%;">
           <span class="txt">{{sweekN}}<i>*</i>：</span>
           <input type="number" min="0" v-model="sweek"/>
         </div>
         <div class="formline" style="width: 50%;">
           <span class="txt">{{eweekN}}<i>*</i>：</span>
           <input type="number" min="0" v-model="eweek"/>
         </div>
         <div class="formline" style="width: 50%;">
           <span class="txt">{{templateN}}<i>*</i>：</span>
           <div id='select5' style="margin-top: 3px;"></div>
          <select id="select6"></select>
         </div>
         <div v-if="!eduType" class="formline" style="width: 50%;">
           <span class="txt">{{classnameN}}<i>*</i>：</span>
           <div id='select77' class="Select" style="margin-top: 3px;"></div>
         </div>
         <div v-if="eduType" class="formline" style="width: 32.5%;">
           <span class="txt">{{classnameN}}<i>*</i>:</span>
           <div id='select95' class="select" style="margin-top: 3px;width: 110px;"></div>
         </div>
         <div v-if="eduType" class="formline" v-show="classesType" style="width: 66%;">
           <input type="text" style="margin-top: 3px;" v-model="classInputData"/>
         </div>
         <div v-if="eduType" class="formline" v-show="!classesType" style="width: 22%;">
           <div id='select33' style="margin-top: 3px;width: 140px;"></div>
         </div>
         <div v-if="eduType" class="formline" v-show="!classesType" style="width: 22%;">
           <div id='select35' style="margin-top: 3px;width: 140px;"></div>
         </div>
         <div v-if="eduType" class="formline" v-show="!classesType" style="width: 22%;">
           <div id='select37' style="margin-top: 3px;width: 140px;"></div>
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
import {courseUrl, classmanageList, getclassesurl, pathinfo, warntxt, teacherurl, labelinfo, classnameN, templateurl, collegeurl, studySectionSubjecturl, pagesize, termurl, msgaddN, templateN, classN, eweekN, sweekN, teacherN, collegeN, SgradeN, SsubjectN, termN, desN, typeN, codeN, nameN, addurl, saveN, cancelN} from '@/module/admin/config/courseinfo'
export default {
  name: 'AJcourseadd',
  data () {
    return {
      msg: msgaddN,
      wininfo: {
        widhei: ['700px', '390px'],
        btncancelleft: '545px',
        contenthei: '273px'
      },
      eduType: this.$store.state.educationType,
      name: '',
      code: '',
      labelinfo: labelinfo,
      type: '',
      des: '',
      term: '',
      sweek: '',
      eweek: '',
      college: '',
      teacher: '',
      classs: '',
      template: '',
      classesId: '',
      nameN: nameN,
      codeN: codeN,
      typeN: typeN,
      desN: desN,
      termN: termN,
      sweekN: sweekN,
      collegeN: collegeN,
      teacherN: teacherN,
      SgradeN: SgradeN,
      SsubjectN: SsubjectN,
      eweekN: eweekN,
      classsN: classN,
      templateN: templateN,
      saveN: saveN,
      cancelN: cancelN,
      classnameN: classnameN,
      Sgrade: '',
      Ssubject: '',
      gradeS: '',
      subjectS: '',
      edit: '',
      labelselected: {},
      labelidarr: [],
      maxWeekNo: '',
      classesType: '',
      classInputData: '',
      collegeList: [],
      teacherList: []
    }
  },
  methods: {
    valid () {
      if (this.eduType) {
        if (this.name.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.name, '', false)
          return false
        } else if (this.code.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.code, '', false)
          return false
        } else if (!this.college || this.college.value.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.college, '', false)
          return false
        } else if (!this.teacher || this.teacher.value.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.teacher, '', false)
          return false
        } else if (this.term.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.term, '', false)
          return false
        } else if (this.sweek.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.sweek, '', false)
          return false
        } else if (this.eweek.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.eweek, '', false)
          return false
        } else if (this.template.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.template, '', false)
          return false
        } else if (!this.classesType && this.classesId.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.classesId, '', false)
          return false
        } else if (this.classesType && this.classInputData.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.classesId, '', false)
          return false
        } else {
          return true
        }
      } else {
        if (this.name.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.name, '', false)
          return false
        } else if (this.code.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.code, '', false)
          return false
        } else if (this.Sgrade.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.Sgrade, '', false)
          return false
        } else if (this.Ssubject.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.Ssubject, '', false)
          return false
        } else if (this.teacher.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.teacher, '', false)
          return false
        } else if (this.term.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.term, '', false)
          return false
        } else if (this.sweek.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.sweek, '', false)
          return false
        } else if (this.eweek.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.eweek, '', false)
          return false
        } else if (this.template.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.template, '', false)
          return false
        } else if (this.classesId.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.classesId, '', false)
          return false
        } else {
          return true
        }
      }
    },
    selectlabel () {
      this.$router.push({name: pathinfo.prex + 'label', params: {labels: this.labelselected, edit: 'add'}})
    },
    dellabel (delid) {
      delete this.labelselected[delid]
      this.labelselected = Object.assign({}, this.labelselected, {})
      this.labelidarr = []
      for (let keys in this.labelselected) {
        this.labelidarr.push(keys)
      }
    },
    async setoutClassG () { // 高教班级
      let that = this
      this.$Select({
        'data': classmanageList,
        'selectId': 'select95',
        'callback': function (obj) {
          that.classesType = obj.value
          if (!obj.value) {
            that.classInputData = ''
          }
        },
        'matchval': [{val: 1}]
      })
      try {
        let res = await this.axios.post(courseUrl)
        let objs = res.data.classesList
        let temp = []
        temp[0] = {value: '-1', txt: '请选择...', list: []}
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].collegeId
          temp[item + 1]['txt'] = objs[item].collegeName
          temp[item + 1]['list'] = objs[item].majorList
        }
        this.$Select({
          'data': temp,
          'selectId': 'select33',
          'callback': function (obj) {
            let objs = obj.list
            let temp = []
            temp[0] = {value: '-1', txt: '请选择...', list: []}
            for (let item = 0; item < objs.length; item++) {
              temp[item + 1] = {}
              temp[item + 1]['value'] = objs[item].majorId
              temp[item + 1]['txt'] = objs[item].majorName
              temp[item + 1]['list'] = objs[item].classesList
            }
            that.$Select({
              'data': temp,
              'selectId': 'select35',
              'callback': function (obj) {
                let objs = obj.list
                let temp = []
                temp[0] = {value: '-1', txt: '请选择...'}
                for (let item = 0; item < objs.length; item++) {
                  temp[item + 1] = {}
                  temp[item + 1]['value'] = objs[item].classesId
                  temp[item + 1]['txt'] = objs[item].classesName
                }
                that.classList = that.$Select({
                  'data': temp,
                  'selectId': 'select37',
                  'callback': function (obj) {
                    that.classesId = obj.ind ? obj.value : ''
                  },
                  'matchval': [{val: -1}]
                })
              },
              'matchval': [{val: -1}]
            })
          },
          'matchval': [{val: -1}]
        })
      } catch (err) {
        console.log(err)
      }
    },
    async getCollegeList () { // 高教院系
      try {
        const res = await this.axios.post(collegeurl)
        let objs = res.data
        let temp = []
        this.college = temp[0] = {value: '', label: '请选择...'}
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['label'] = objs[item].collegeName
        }
        this.collegeList = temp
      } catch (err) {
        console.log(err)
      }
    },
    async setoutTeacher () { // 讲师
      try {
        const res = await this.axios.post(teacherurl, {roleType: 2})
        let objs = res.data
        let temp = []
        this.teacher = temp[0] = {value: '', label: '请选择...'}
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['label'] = objs[item].realName + ' (' + objs[item].code + ')'
        }
        this.teacherList = temp
      } catch (err) {
        console.log(err)
      }
    },
    getGradeAndSubjectList () { // 年级-学科
      let that = this
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
            that.getclasses()
            that.Ssubject = ''
          },
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
          'cleartxt': '请选择...'
        })
        that.getclasses()
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getclasses () { // 班级
      let that = this
      this.axios({
        method: 'post',
        url: getclassesurl,
        data: {'studySectionId': that.Sgrade}
      })
        .then(function (res) {
          let temp = []
          let objs = res.data.classesList
          temp.push({value: '-1', txt: '请选择'})
          for (let item = 0; item < objs.length; item++) {
            temp[item + 1] = {}
            temp[item + 1]['value'] = objs[item].classesId
            temp[item + 1]['txt'] = objs[item].classesName
          }
          that.$Select({
            'data': temp,
            'selectId': 'select77',
            'callback': function (obj) {
              that.classesId = obj.ind ? obj.value : ''
            },
            'matchval': [{val: -1}]
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      let data = {
        courseName: that.name,
        courseNo: that.code,
        courseType: '1',
        description: that.des,
        subjectId: that.Ssubject,
        termId: that.term,
        teacherId: that.teacher.value,
        collegeId: that.college.value,
        studySectionId: that.Sgrade,
        templateId: that.template,
        startWeek: that.sweek,
        endWeek: that.eweek,
        classesId: that.classesId,
        labelIds: that.labelidarr,
        maxWeekNo: that.maxWeekNo,
        deptName: that.classInputData,
        classesType: that.classesType
      }
      if (!this.eduType) {
        data.classesType = 0
      }
      this.axios({
        method: 'post',
        url: addurl,
        data: data
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
			this.$router.push({'name': 'AJcourse'})
      //this.$router.go(-1);
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
  beforeCreate () {
    let that = this
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
        temp[item + 1]['maxweek'] = objs[item].maxWeekNo
      }
      that.$Select({
        'data': temp,
        'originS': 'multiple',
        'selectId': ['select2', 'select1'],
        'callback': function (obj) {
          if (obj.ind !== 0) {
            that.term = obj.value
            that.maxWeekNo = obj.maxweek
          } else {
            that.term = ''
          }
        }
      })
    })
    .catch(function (error) {
      console.log(error)
    })
    this.axios({
      method: 'post',
      url: templateurl,
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
      let objs = res.data.classNumberList
      if (objs !== undefined && objs.length > 0) {
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['value'] = objs[item].templateId
          temp[item]['txt'] = objs[item].templateName
        }
        that.template = temp[0].value
      } else {
        temp[0] = {value: '-1', txt: '请选择节次模板...'}
      }
      that.$Select({
        'position': 'top',
        'data': temp,
        'originS': 'multiple',
        'selectId': ['select6', 'select5'],
        'callback': function (obj) {
          if (obj.value === '-1') {
            that.template = ''
          } else {
            that.template = obj.value
          }
        }
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJcourseadd') {
        this.labelselected = to.params.selectarr
        for (let keys in to.params.selectarr) {
          this.labelidarr.push(keys)
        }
      }
    }
  },
  mounted () {
    this.setoutTeacher()
    if (this.eduType) {
      this.getCollegeList()
      this.setoutClassG()
    } else {
      this.getGradeAndSubjectList()
    }
  }
}
</script>

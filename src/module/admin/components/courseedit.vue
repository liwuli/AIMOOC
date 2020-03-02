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
         <div class="formline" style="width: 50%;">
           <span class="txt">{{nameN}}<i>*</i>：</span>
           <input type="text" v-model="name" :value="name"/>
         </div>
         <div class="formline" style="width: 50%;">
           <span class="txt">{{codeN}}<i>*</i>：</span>
           <input type="text" v-model="code" :value="code"/>
         </div>
         <div class="formline" v-show="eduType" style="width: 50%;">
           <span class="txt">{{collegeN}}<i>*</i>：</span>
           <div id='select3' style="margin-top: 3px;"></div>
           <select id="select4"></select>
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
           <input type="number" min="0" v-model="sweek" :disabled="forbid" :value="sweek"/>
         </div>
         <div class="formline" style="width: 50%;">
           <span class="txt">{{eweekN}}<i>*</i>：</span>
           <input type="number" min="0" v-model="eweek" :disabled="forbid" :value="eweek"/>
         </div>
         <div class="formline " style="width: 50%;">
           <span class="txt">{{templateN}}<i>*</i>：</span>
           <div id='select5' style="margin-top: 3px;"></div>
           <select id="select6"></select>
         </div>
         <div v-if="!eduType" class="formline " style="width: 50%;">
           <span class="txt">{{classnameN}}：</span>
           <div id='select77' class="Select" style="margin-top: 3px;"></div>
         </div>
         <div v-if="eduType" class="formline" style="width: 32.5%;">
           <span class="txt">{{classnameN}}:</span>
           <div id='select95'></div>
         </div>
         <div v-if="eduType" class="formline" v-show="classesType" style="width: 66%;">
           <input type="text" disabled="disabled" style="margin-top: 3px;" v-model="classInputData"/>
         </div>
         <div v-if="eduType" class="formline" v-show="!classesType" style="width: 22%;">
           <div id='select33'></div>
         </div>
         <div v-if="eduType" class="formline" v-show="!classesType" style="width: 22%;">
           <div id='select35'></div>
         </div>
         <div v-if="eduType" class="formline" v-show="!classesType" style="width: 22%;">
           <div id='select37'></div>
         </div>
         <div class="formline" style="height: 110px;width: 50%;">
           <span class="txt">{{labelinfo.labelN}}：</span>
           <span class="btn" @click="selectlabel">{{labelinfo.selectlabelN}}</span>
           <div class="labeltextarea">
             <div class="parts" v-for="item in labelselected" @click="dellabel(item.id)">
               {{item.name}}
               <span class="delicon iconfont icon-dellist"></span>
             </div>
           </div>
         </div>
         <div class="formline" style="height: 110px;width: 50%;">
           <span class="txt">{{desN}}：</span>
           <textarea style="width: 210px;" v-model="des" :value="des"></textarea>
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
import {classmanageList, courseUrl, getclassesurl, pathinfo, warntxt, teacherurl, labelinfo, classnameN, templateurl, collegeurl, studySectionSubjecturl, pagesize, termurl, msgeditN, templateN, classN, eweekN, sweekN, teacherN, collegeN, SgradeN, SsubjectN, termN, desN, typeN, codeN, nameN, editurl, saveN, cancelN} from '@/module/admin/config/courseinfo'
export default {
  name: 'AJcourseedit',
  data () {
    return {
      once: true,
      msg: msgeditN,
      wininfo: {
        widhei: ['700px', '390px'],
        btncancelleft: '545px',
        contenthei: '273px'
      },
      eduType: this.$store.state.educationType,
      disabledstyle: 'margin-top:3px;width:140px;background:#ebebe4;',
      name: '',
      code: '',
      type: '',
      des: '',
      termName: '',
      termId: '',
      sweek: '',
      eweek: '',
      college: '',
      collegeId: '',
      majorId: '',
      majorName: '',
      teacher: {label: ''},
      className: '',
      template: '',
      classesId: '',
      nameN: nameN,
      codeN: codeN,
      labelinfo: labelinfo,
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
      id: '',
      labelselected: {},
      labelidarr: [],
      initlabel: '',
      info: '',
      maxWeekNo: '',
      forbid: true,
      classesType: '',
      classInputData: '',
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
        } else if (!this.teacher || this.teacher.value.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.teacher, '', false)
          return false
        } else if (this.termId.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.term, '', false)
          return false
        } else if (this.collegeId.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.college, '', false)
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
        } else if (!this.teacher || this.teacher.value.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.teacher, '', false)
          return false
        } else if (this.termId.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.term, '', false)
          return false
        } else if (this.Sgrade.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.Sgrade, '', false)
          return false
        } else if (this.Ssubject.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.Ssubject, '', false)
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
        } else {
          return true
        }
      }
    },
    selectlabel () {
      this.$router.push({name: pathinfo.prex + 'labeledit', params: {labels: this.labelselected, info: this.info, 'edit': 'edit'}})
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
      console.log(this.teacher)
      if (!this.valid()) {
        return false
      }
      let that = this
      let data = {
        deptName: that.classInputData,
        courseName: that.name,
        courseNo: that.code,
        courseType: '1',
        description: that.des,
        subjectId: that.Ssubject,
        termId: that.termId,
        teacherId: that.teacher.value,
        collegeId: that.collegeId,
        templateId: that.template,
        studySectionId: that.Sgrade,
        startWeek: that.sweek,
        endWeek: that.eweek,
        classesId: that.classesId,
        courseId: that.id,
        labelIds: that.labelidarr,
        maxWeekNo: that.maxWeekNo
      }
      if (!this.eduType) {
        data.classesType = 0
      }
      this.axios.post(editurl, data)
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
    },
    async getCollegeList () {
      try {
        const res = await this.axios({
          method: 'post',
          url: collegeurl,
          params: {'par': {pageSize: pagesize, pageIndex: 1}
          }
        })
        let objs = res.data
        let temp = []
        temp[0] = {value: '-1', txt: '请选择...'}
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['txt'] = objs[item].collegeName
        }
        let that = this
        this.$Select({
          'data': temp,
          'originS': 'multiple',
          'disabled': that.forbid,
          'disabledstyle': 'margin-top:3px;background:#ebebe4;',
          'selectId': ['select4', 'select3'],
          'callback': function (obj) {
            that.collegeId = obj.ind ? obj.value : ''
          },
          'matchval': [{val: that.collegeId}],
          'cleartxt': '请选择...'
        })
      } catch (err) {
        console.log(err)
      }
    },
    getGradeAndSubjectList () { // 年级-学科
      let that = this
      this.axios({
        method: 'post',
        url: studySectionSubjecturl,
        params: {'par': {pageSize: pagesize, pageIndex: 1}
        }
      })
        .then(function (res) {
          let temp = []
          let objs = res.data
          temp[0] = {value: '-1', txt: '请选择...'}
          for (let item = 0; item < objs.length; item++) {
            temp[item + 1] = {}
            temp[item + 1]['value'] = objs[item].id
            temp[item + 1]['txt'] = objs[item].name
          }
          that.gradeS = that.$Select({
            'data': temp,
            'originS': 'multiple',
            'selectId': ['select14', 'select13'],
            'callback': function (obj) {
              that.Sgrade = obj.ind ? obj.value : ''
              that.getclasses()
              let temp = []
              let objs = []
              if (res.data[obj.ind - 1]) {
                objs = res.data[obj.ind - 1].subjectLists
              } else {
                for (let item = 0; item < res.data.length; item++) {
                  objs = objs.concat(res.data[item].subjectLists)
                }
              }
              temp[0] = {value: '-1', txt: '请选择...'}
              for (let item = 0; item < objs.length; item++) {
                temp[item + 1] = {}
                temp[item + 1]['value'] = objs[item].subjectId
                temp[item + 1]['txt'] = objs[item].subjectName
              }
              that.subjectS = that.$Select({
                'data': temp,
                'originS': 'multiple',
                'selectId': ['select24', 'select23'],
                'callback': function (obj) {
                  that.Ssubject = obj.ind ? obj.value : ''
                },
                'matchval': [{val: that.Ssubject}],
                'cleartxt': '请选择...'
              })
            },
            'matchval': [{val: that.Sgrade}],
            'cleartxt': '请选择...'
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getclasses () { // 普教班级
      let that = this
      let val = this.once ? this.classesId : -1
      this.once = false
      this.axios.post(getclassesurl, {studySectionId: that.Sgrade})
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
            'matchval': [{val: val}]
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async setoutClassG () { // 高教班级
      let that = this
      this.$Select({
        'data': classmanageList,
        'selectId': 'select95',
        'disabled': that.forbid,
        'disabledstyle': 'margin-top:3px;width:110px;background:#ebebe4;',
        'callback': function (obj) {
          that.classesType = obj.value
          if (!obj.value) {
            that.classInputData = ''
          }
        },
        'matchval': [{val: that.classesType.toString()}]
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
          'disabled': that.forbid,
          'disabledstyle': that.disabledstyle,
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
              'disabled': that.forbid,
              'disabledstyle': that.disabledstyle,
              'callback': function (obj) {
                that.majorId = obj.ind ? obj.value : ''
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
                  'disabled': that.forbid,
                  'disabledstyle': that.disabledstyle,
                  'callback': function (obj) {
                    that.classesId = obj.ind ? obj.value : ''
                  },
                  'matchval': [{val: that.classesId}]
                })
              },
              'matchval': [{val: that.majorId}]
            })
          },
          'matchval': [{val: that.collegeId}]
        })
      } catch (err) {
        console.log(err)
      }
    },
    async setoutSelect () {
      try {
        let that = this
        const res = await this.axios.post(templateurl, {page: {pageSize: pagesize, pageIndex: 1}, keywords: ''})
        let objs = res.data.classNumberList
        let temp = []
        temp[0] = {value: '-1', txt: '请选择...'}
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].templateId
          temp[item + 1]['txt'] = objs[item].templateName
        }
        this.$Select({
          'position': 'top',
          'data': temp,
          'originS': 'multiple',
          'disabled': that.forbid,
          'disabledstyle': 'background:#ebebe4',
          'selectId': ['select6', 'select5'],
          'callback': function (obj) {
            that.template = obj.ind ? obj.value : ''
          },
          'matchval': [{val: that.template}],
          'cleartxt': '请选择...'
        })
        const result = await this.axios.post(teacherurl, {roleType: 2})
        let list = result.data
        let arr = []
        arr[0] = {value: '', label: '请选择...'}
        for (let item = 0; item < list.length; item++) {
          arr[item + 1] = {}
          arr[item + 1]['value'] = list[item].id
          arr[item + 1]['label'] = list[item].realName + ' (' + list[item].code + ')'
          if (this.teacher.value === list[item].id) {
            this.teacher = arr[item + 1]
          }
        }
        this.teacherList = arr
        const data = await this.axios.post(termurl, {page: {pageSize: pagesize, pageIndex: 1}, keywords: ''})
        let termList = data.data.termList
        let content = []
        content[0] = {value: '-1', txt: '请选择...'}
        for (let item = 0; item < termList.length; item++) {
          content[item + 1] = {}
          content[item + 1]['value'] = termList[item].termId
          content[item + 1]['txt'] = termList[item].termName
          content[item + 1]['maxweek'] = termList[item].maxWeekNo
        }
        this.$Select({
          'data': content,
          'originS': 'multiple',
          'disabled': that.forbid,
          'disabledstyle': 'background:#ebebe4',
          'selectId': ['select2', 'select1'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.termId = obj.value
              that.maxWeekNo = obj.maxweek
            } else {
              that.term = ''
            }
          },
          'matchval': [{val: that.termId}],
          'cleartxt': '请选择...'
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    let objinfo = this.$route.params.item
    if (objinfo) {
      this.info = objinfo
    }
    if (!this.info) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = this.info.id
      this.name = this.info.name
      this.majorId = this.info.majorId
      this.majorName = this.info.majorName
      this.classesId = this.info.classesId
      this.classInputData = this.className = this.info.class
      this.classesType = this.info.classesType
      this.des = this.info.des
      this.sweek = this.info.sweek
      this.eweek = this.info.eweek
      this.code = this.info.code
      this.termName = this.info.term
      this.termId = this.info.termId
      this.collegeId = this.info.collegeId
      this.college = this.info.college
      this.template = this.info.template
      this.teacher.value = this.info.teacherId
      this.Sgrade = this.info.studySectionId
      this.Ssubject = this.info.subjectId
      this.initlabel = this.info.labelList
      for (let item = 0; item < this.initlabel.length; item++) {
        this.labelselected[this.initlabel[item].labelId] = {id: this.initlabel[item].labelId, name: this.initlabel[item].labelName}
        this.labelidarr.push(this.initlabel[item].labelId)
      }
      if (this.eduType) { // 高教
        this.getCollegeList() // 院系列表
        this.setoutClassG() // 班级列表
      } else { // 普教-年级、科目列表
        this.getGradeAndSubjectList()
      }
      this.setoutSelect()
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'AJcourseedit') {
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

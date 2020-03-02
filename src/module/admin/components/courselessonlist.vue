<style type="text/css" scoped>
  .AA_right .G_search .part input{
    width: 120px;
  }
  .AA_right .G_search .btn{
    /*border-radius: 3px;*/
    float: right;
  }
  .part .Select{
    width: 130px;
  }
</style>
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
          <AJposition>
            <div class="item"><router-link :to="{name: 'AJcourse'}" style="color: #3197fc;">课程管理</router-link><span class="separator"> ></span></div>
          </AJposition>
          <div class="center" style="padding: 20px 0 15px;">
            <p>
              <span style="display: inline-block;width: 240px;"><b>学期: </b>{{info['termName']}}</span>
              <span v-if="!eduType"><b>科目: </b>{{info['subjectName']}}</span>
              <span v-else><b>学院: </b>{{info['collegeName']}}</span>
            </p>
            <p>
              <span v-if="!eduType" style="display: inline-block;width: 240px;"><b>年级: </b>{{info['studySectionName']}}</span><span><b>班级: </b>{{info['deptName']}}</span>
            </p>
          </div>
          <hr/>
          <div class="G_search">
           <div class="part" >
             <span class="txt">时间:</span>
             <Calendarme :dateval="dateval" :valshow="valshow" :clear="true" :part= "part" :ymdhms="ymdhms" @setDatefn="setDatefn" :ids="setDate"></Calendarme>
           </div>
           <div class="btn" style="float: left;margin-top: 2px;" @click="search">{{searchN}}</div>
           <!-- <div class="btn" @click="addclass(info)" style="position: absolute;right: 110px;top: 173px;">{{addallN}}</div> -->
            <div class="btn" @click="addclass(info)" style="float: right;margin-bottom: 30px;">{{addallN}}</div>
          </div>
          <List :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='currentInfo' :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>
<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/listcheck'
import Calendarme from '@/components/extend/calendar.vue'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import search from '@/components/extend/search'
import {recordStatus, listurl, addallN, getsuburl, pageval, opteventAll, evaluatetab, optobjinfoAll, coursetypes, searchstyle, searchinput, products, OsN, OeN, OdN, OPslist, OPelist, OPdlist, bingos, colums, columsG, percentinfo, percentinfoG, pagesize, listhead, listheadG, pathinfo, searchN, ScollegeN, SteacherN, SsubjectN, SgradeN} from '@/module/admin/config/courselessonlistinfo'

// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJcourselessonlist',
  data () {
    return {
      courseId: '',
      dateval: '',
      setDate: 'setDate',
      ymdhms: 'ymd',
      part: document.body,
      valshow: false,
      info: '',
      products: products,
      eduType: this.$store.state.educationType,
      percentinfo: this.$store.state.educationType ? percentinfoG : percentinfo,
      colums: this.$store.state.educationType ? columsG : colums,
      listhead: this.$store.state.educationType ? listheadG : listhead,
      optevent: optevent,
      optobjinfo: optobjinfo,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      bingos: bingos,
      addbtn: addbtn,
      delbtn: delbtn,
      pagesize: pagesize,
      searchinput: searchinput,
      coursetypes: coursetypes,
      searchstyle: searchstyle,
      ScollegeN: ScollegeN,
      SteacherN: SteacherN,
      pageval: pageval,
      SgradeN: SgradeN,
      SsubjectN: SsubjectN,
      searchN: searchN,
      addallN: addallN,
      time: '',
      Scollege: '',
      Steacher: '',
      collegeS: '',
      teacherS: '',
      Sgrade: '',
      Ssubject: '',
      gradeS: '',
      subjectS: '',
      edit: 0,
      del: 0,
      see: 0,
      coursetype: 2,
      totalnum: 20,
      keywords: '',
      evaluatetab: evaluatetab,
      evaluateselected: ['', 'selected'],
      version: this.$store.state.version,
      trem:null    //学期
    }
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist,
    search,
    Calendarme
  },
  methods: {
    setDatefn (obj) {
      if (!this.valshow) {
        this.valshow = true
      } else {
        if (this.dateval !== this.formcat(obj)) {
          this.pageval = 1
        }
        this.dateval = obj.clearflag ? '' : this.formcat(obj)
        document.querySelector('#setDate').value = this.dateval
      }
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    init () {
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['course']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'addlist':
                // this.addbtn = 'display:block'
                break
              case 'editlist':
                if (!this.edit) {
                  this.optevent.push(OPelist)
                  this.optobjinfo.push(OeN)
                }
                this.edit++
                break
              case 'dellist':
                if (!this.del) {
                  this.optevent.push(OPdlist)
                  this.optobjinfo.push(OdN)
                  this.delbtn = 'display:block'
                }
                this.del++
                break
              case 'see':
                if (!this.see) {
                  this.optevent.push(OPslist)
                  this.optobjinfo.push(OsN)
                }
                this.see++
                break
            }
          }
        }
      }
      if (this.version === '1') {
        this.evaluatetab.splice(1, 1)
        this.evaluateselected = ['selected']
      } else if (this.version === '2') {
        this.evaluatetab.splice(0, 1)
        this.evaluateselected = ['selected']
      }
      this.courseId = this.$route.query.info
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {courseId: this.courseId}
      })
        .then(function (res) {
          res.data.courseList && res.data.courseList[0] && (that.info = res.data.courseList[0])
          that.headopenpostfn(that.info)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    headopenpostfn (param) {
      let that = this
      this.axios({
        method: 'post',
        url: getsuburl,
        data: {
          courseId: param['courseId'],
          time: that.dateval
        }
      })
        .then(function (res) {
          let objdetail = res.data.lessonList
          that.totalnum = objdetail.length
          if (that.eduType) {
            let temp = []
            for (let j = 0; j < objdetail.length; j++) {
              temp[j] = {}
              temp[j]['courseId'] = that.courseId
              temp[j]['id'] = objdetail[j].lessonId
              temp[j]['name'] = objdetail[j].lessonName
              temp[j]['teacher'] = objdetail[j].teacherName
              temp[j]['teacherId'] = objdetail[j].teacherId
              temp[j]['classroom'] = objdetail[j].classroomName
              temp[j]['classroomId'] = objdetail[j].classroomId
              temp[j]['studentsInPlan'] = objdetail[j].studentsInPlan
              temp[j]['description'] = objdetail[j].description
              temp[j]['timingMode'] = objdetail[j].timingMode
              temp[j]['countable'] = objdetail[j].countable
              temp[j]['recordable'] = objdetail[j].recordable
              temp[j]['liveable'] = objdetail[j].liveable
              temp[j]['week'] = objdetail[j].ofTheWeek
              temp[j]['weekNum'] = objdetail[j].weekNum
              temp[j]['startTime'] = objdetail[j].startTime
              temp[j]['endTime'] = objdetail[j].endTime
              temp[j]['trem_detail'] = that.trem;
              temp[j]['lesson'] = objdetail[j].classNumbers ? objdetail[j].classNumbers.replace(/,/, '-') : ''
              objdetail[j].startTime && (temp[j]['stime'] = objdetail[j].startTime.substring(0, objdetail[j].startTime.lastIndexOf(':')))
              temp[j]['status'] = recordStatus[objdetail[j].recording]
              temp[j]['urllist'] = objdetail[j].resourceList
              temp[j]['classNumberList'] = param['classNumberList']
              temp[j]['recording'] = objdetail[j].recording
              if (objdetail[j].classNumbers) {
                temp[j]['startClass'] = objdetail[j].classNumbers.split(',')[0]
                temp[j]['endClass'] = objdetail[j].classNumbers.split(',')[1]
              } else {
                temp[j]['startClass'] = ''
                temp[j]['endClass'] = ''
              }
              if (objdetail[j].recording) {
                if (objdetail[j].recording == 1) {
                  temp[j]['opt'] = 0
                } else {
                  temp[j]['opt'] = that.optobjinfo
                }
              } else {
                temp[j]['opt'] = [OeN, OdN]
              }
              temp[j].selected = false
            }
            that.products = temp
          } else {
            let temp = []
            for (let j = 0; j < objdetail.length; j++) {
              temp[j] = {}
              temp[j]['id'] = objdetail[j].lessonId
              temp[j]['name'] = objdetail[j].lessonName
              temp[j]['status'] = recordStatus[objdetail[j].recording]
              temp[j]['lesson'] = objdetail[j].classNumbers ? objdetail[j].classNumbers.replace(/,/, '-') : ''
              // temp[j]['code'] = that.classroom[1] + ':' + (objdetail[j].liveable ? that.yes : that.no) + '-' + that.classroom[2] + ':' + (objdetail[j].recordable ? that.yes : that.no) + '-' + that.classroom[0] + ':' + param[11]
              temp[j]['teacher'] = objdetail[j].teacherName
              temp[j]['grade'] = param['teacherName']
              temp[j]['subject'] = param['deptName']
              temp[j]['term'] = param['termName']
              temp[j]['trem_detail'] = that.trem;
              temp[j]['week'] = objdetail[j].ofTheWeek
              temp[j]['weekNum'] = objdetail[j].weekNum
              temp[j]['urllist'] = objdetail[j].resourceList
              if (objdetail[j].classNumbers) {
                temp[j]['startClass'] = objdetail[j].classNumbers.split(',')[0]
                temp[j]['endClass'] = objdetail[j].classNumbers.split(',')[1]
              } else {
                temp[j]['startClass'] = ''
                temp[j]['endClass'] = ''
              }
              temp[j]['studentsInPlan'] = objdetail[j].studentsInPlan
              temp[j]['stime'] = objdetail[j].startTime
              temp[j]['etime'] = objdetail[j].endTime
              temp[j]['recordable'] = objdetail[j].recordable
              temp[j]['liveable'] = objdetail[j].liveable
              temp[j]['countable'] = objdetail[j].countable
              temp[j]['classroom'] = objdetail[j].classroomName
              temp[j]['classroomId'] = objdetail[j].classroomId
              temp[j]['templateId'] = objdetail[j].classNumberTemplatelId
              temp[j]['timingMode'] = objdetail[j].timingMode
              temp[j]['courseId'] = objdetail[j].courseId
              temp[j]['teacherId'] = objdetail[j].teacherId
              temp[j]['description'] = objdetail[j].description
              temp[j]['classNumberList'] = param['classNumberList']
              temp[j]['recording'] = objdetail[j].recording
              if (objdetail[j].recording) {
                if (objdetail[j].recording == 1) {
                  temp[j]['opt'] = 0
                } else {
                  temp[j]['opt'] = that.optobjinfo
                }
              } else {
                temp[j]['opt'] = [OeN, OdN]
              }
              temp[j].selected = false
            }
            that.products = temp
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    jumptourl (item, ind) {
      this.$router.push({name: item.pathname})
    },
    jump () {
      this.$router.push({name: 'AJcourse'})
    },
    pagepost (obj) {
      this.pageval = obj.page
      this.bingos = []
      this.bingos[obj.page - 1] = 'selected'
    },
    search () {
      this.headopenpostfn(this.info)
    },
    addclass (info) {
      this.$router.push({'name': this.pathinfo.prex + 'add', params: {adddetail: 'adddetail', info: info,trem:this.item}})
    }
  },
  computed: {
    pageinfo: function () {
      return Math.ceil(this.totalnum / this.pagesize)
    },
    currentInfo: function () {
      return this.products.slice(this.pagesize * (this.pageval - 1), this.pagesize * this.pageval)
    }
  },
  created () {
    this.item = this.$route.query.item
    this.init()
  },
  mounted () {
    document.getElementById('nav').querySelector('a[href="#/course"]').className = 'a hides active'
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'AJcourselessonlist' && from.name === 'AJcourselessonlist') {
      return false
    } else {
      next()
    }
  },
  watch: {
    '$route' (to, from) {
      if (from.name !== 'AJcourselessonlist') {
        this.init()
      }
    }
  }
}
</script>

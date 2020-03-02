<style type="text/css">
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
          <AJposition></AJposition>
          <!--<div class="routeline">
            <span class="btnonline" @click="jump()">{{coursetypes[0].txt}}</span>
            <span class="btninschool" >{{coursetypes[1].txt}}</span>
          </div>-->
          <div class="evalueatetab">
    				<span class="span" style="font-size: 18px;" @click="jumptourl(item, ind)" :class="evaluateselected[ind]" v-for="(item, ind) in evaluatetab">{{item.name}}</span>
    			</div>
          <div class="G_search" style="margin-bottom: 20px;">
            <div class="part" v-show="eduType" >
             <span class="txt">{{ScollegeN}}:</span>
             <!-- <div id='select85' style="margin-top: 3px;"></div>
            <select id="select86"></select> -->
           </div>
           <el-select v-model="Scollege" filterable placeholder="请选择学院" popper-class="el_selects_css" clearable style="float: left;width: 200px;">
             <el-option
               v-for="item in Scollege_options"
               :key="item.value"
               :label="item.txt"
               :value="item.value">
             </el-option>
           </el-select>

           <div class="part" v-show="eduType" style="margin-left: 20px;">
             <span class="txt">{{SteacherN}}:</span>
             <!-- <div id='select87' style="margin-top: 3px;"></div>
            <select id="select88"></select> -->
           </div>

            <el-select v-model="Steacher" filterable placeholder="请选择讲师" popper-class="el_selects_css" clearable style="float: left;width: 200px;">
              <el-option
                v-for="item in Steacher_options"
                :key="item.value"
                :label="item.txt"
                :value="item.value">
              </el-option>
            </el-select>

           <div class="part" v-show="!eduType">
            <span class="txt">{{SgradeN}}:</span>
            <div id='select95' style="margin-top: 3px;"></div>
            <select id="select96"></select>
          </div>
          <div class="part" v-show="!eduType">
            <span class="txt">{{SsubjectN}}:</span>
            <div id='select97' style="margin-top: 3px;"></div>
            <select id="select98"></select>
          </div>

           <div class="part"  style="margin-left: 20px;">
             <span class="txt">{{CnameN}}:</span>
             <!-- <input type="text" v-model="Sclassname"/> -->
           </div>
            <el-input style="float: left;width: 150px;"
             placeholder="请输入课程名"
             v-model="Sclassname"
             clearable>
           </el-input>
           <el-button type="primary" @click="search" style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
           <!-- <div class="btn" style="float: left" @click="search">{{searchN}}</div> -->
          </div>
          <List  :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import search from '@/components/extend/search'
import {pageval, opteventAll, evaluatetab, optobjinfoAll, coursetypes, OmN, searchstyle, searchinput, products, infoval, OeN, OdN, OPmlist, OPelist, OPdlist, bingos, colums, columsG, studySectionSubjecturl, percentinfo, percentinfoG, pagesize, listurl, listhead, listheadG, pathinfo, collegeurl, teacherurl, searchN, CnameN, ScollegeN, SteacherN, SsubjectN, SgradeN} from '@/module/admin/config/courseonlineinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJcourseOnline',
  data () {
    return {
      pageinfo: '',
      products: products,
      infoval: infoval,
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
      CnameN: CnameN,
      Sclassname: '',
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
      Mlist: 0,
      coursetype: 2,
      totalnum: 0,
      keywords: '',
      evaluatetab: evaluatetab,
      evaluateselected: ['', 'selected'],
      version: this.$store.state.version,
      Scollege_options:[],
      Steacher_options:[]
    }
  },
  beforeCreate () {
    let that = this
    // 老师
    this.axios({
      method: 'post',
      url: teacherurl,
      data: {
        roleType: 2
      }
    })
    .then(function (res) {
      let temp = []
      // temp[0] = {value: '-1', txt: '全部'}
      let objs = res.data
      for (let item = 0; item < objs.length; item++) {
        temp[item] = {}
        temp[item]['value'] = objs[item].id
        temp[item]['txt'] = objs[item].realName
      }
      that.Steacher_options=temp;
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
    .catch(function (error) {
      console.log(error)
    })
  },
  created () {
    if (this.version === '1') {
      this.evaluatetab.splice(1, 1)
      this.evaluateselected = ['selected']
    } else if (this.version === '2') {
      this.evaluatetab.splice(0, 1)
      this.evaluateselected = ['selected']
    }
    if (this.eduType) {
      // 高教-院系列表
      this.getCollegeList()
    } else {
      // 普教-年级、科目列表
      this.getGradeAndSubjectList()
    }
    this.pagepost({page: 1})
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist,
    search
  },
  methods: {
    jumptourl (item, ind) {
      this.$router.push({name: item.pathname})
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
        temp[0] = {value: '-1', txt: '全部'}
        subject[0] = [{value: '-1', txt: '全部'}]
        subjectall[0] = {value: '-1', txt: '全部'}
        let objs = res.data
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['txt'] = objs[item].name
          subject[item + 1] = []
          let subjectList = objs[item].subjectLists
          if (subjectList.length === 0) {
            subject[item + 1].push({value: '-1', txt: '全部'})
          } else {
            for (let k = 0; k < subjectList.length; k++) {
              if (k === 0) {
                subject[item + 1].push({value: '-1', txt: '全部'})
              }
              subject[item + 1].push({value: subjectList[k].subjectId, txt: subjectList[k].subjectName})
              subjectall.push({value: subjectList[k].subjectId, txt: subjectList[k].subjectName})
            }
          }
        }
        that.gradeS = that.$Select({
          'data': temp,
          'originS': 'multiple',
          'selectId': ['select96', 'select95'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.Sgrade = obj.value
              that.subjectS.cfg.data = subject[obj.ind]
              that.subjectS.cfg.domdata = false
              that.subjectS.initCommonVal()
            } else {
              that.Sgrade = ''
              that.subjectS.cfg.data = subjectall
              that.subjectS.cfg.domdata = false
              that.subjectS.initCommonVal()
            }
            that.Ssubject = ''
          },
          'cleartxt': '全部'
        })
        that.subjectS = that.$Select({
          'data': subjectall,
          'originS': 'multiple',
          'selectId': ['select98', 'select97'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.Ssubject = obj.value
            } else {
              that.Ssubject = ''
            }
          },
          'cleartxt': '全部'
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getCollegeList () {
      let that = this
      // 院系
      this.axios({
        method: 'post',
        url: collegeurl
      })
      .then(function (res) {
        let temp = []
        // temp[0] = {value: '-1', txt: '全部'}
        let objs = res.data
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['value'] = objs[item].id
          temp[item]['txt'] = objs[item].collegeName
        }
        that.Scollege_options=temp;
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
      .catch(function (error) {
        console.log(error)
      })
    },
    jump () {
      this.$router.push({name: 'AJcourse'})
    },
    pagepost (obj) {
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.del = 0
      this.Mlist = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.addbtn = 'display:block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['course']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'addlist':
                this.addbtn = 'display:block'
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
              case 'Mlist':
                if (!this.Mlist) {
                  this.optevent.push(OPmlist)
                  this.optobjinfo.push(OmN)
                }
                this.Mlist++
                break
            }
          }
        }
      }
      this.pageval = obj.page
      let paramdata = {}
      paramdata.page = {pageSize: obj.pagesize ? obj.pagesize : pagesize, pageIndex: obj.page}
      if (this.eduType) {
        paramdata.collegeId = this.Scollege
        paramdata.teacherId = this.Steacher
      } else {
        paramdata.studySectionId = this.Sgrade
        paramdata.subjectId = this.Ssubject
      }
      paramdata.courseType = '2'
      paramdata.courseName = this.Sclassname
      paramdata.orderBy = '0'
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: paramdata
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let temp = []
        let optobj = []
        optobj = that.optobjinfo
        let objs = res.data.courseList
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].courseId
            temp[item]['name'] = objs[item].courseName
            temp[item]['code'] = objs[item].courseNo
            temp[item]['teacher'] = objs[item].teacherName
            temp[item]['college'] = objs[item].collegeName
            temp[item]['opt'] = optobj
            temp[item]['grade'] = objs[item].studySectionName
            temp[item]['subject'] = objs[item].subjectName
            temp[item]['des'] = objs[item].description
            temp[item]['sweek'] = objs[item].startWeek
            temp[item]['eweek'] = objs[item].endWeek
            temp[item]['className'] = objs[item].deptName
            temp[item]['courseType'] = objs[item].courseType
            temp[item]['termId'] = objs[item].termId
            temp[item]['term'] = objs[item].termName
            temp[item]['template'] = objs[item].templateId
            temp[item]['teacherId'] = objs[item].teacherId
            temp[item]['collegeId'] = objs[item].collegeId
            temp[item]['collegeteacherId'] = objs[item].usercollegeId
            temp[item]['studySectionId'] = objs[item].studySectionId
            temp[item]['subjectId'] = objs[item].subjectId
            temp[item]['labelList'] = objs[item].labelList
          }
        }
        that.products = temp
        that.bingos = []
        that.bingos[obj.page - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    search () {
      this.pagepost({page: 1, collegeId: this.Scollege, teacherId: this.Steacher, studySectionId: this.Sgrade, subjectId: this.Ssubject, courseType: '2', courseName: this.Sclassname})
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJcourseOnline') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

<style type="text/css" scoped>
  .AA_right .G_search .part input {
    width: 120px;
  }

  .AA_right .G_search .btn {
    float: right;
  }

  .part .Select {
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
            <span class="btnonline">{{coursetypes[0].txt}}</span>
            <span class="btninschool" @click="jump()">{{coursetypes[1].txt}}</span>
          </div>-->
          <div class="evalueatetab">
            <span class="span" style="font-size: 18px;"  @click="jumptourl(item, ind)" :class="evaluateselected[ind]" v-for="(item, ind) in evaluatetab">{{item.name}}</span>
          </div>
          <div class="G_search" style="margin-bottom: 20px;">

            <div style="float: left;margin-right: 20px;margin-top: 20px;" v-show="eduType">
              <span class="txt" style="float: left;">{{ScollegeN}}:</span>
              <!-- <div id='select85' style="margin-top: 3px;"></div>
              <select id="select86"></select> -->
              <el-select v-model="Scollege" filterable placeholder="请选择学院" popper-class="el_selects_css" clearable style="float: left;margin-left: 20px;">
                <el-option
                  v-for="item in college_options"
                  :key="item.value"
                  :label="item.txt"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>


            <div style="float: left;margin-right: 20px;margin-top: 20px;" v-show="eduType">
              <span class="txt" style="float: left;">{{SteacherN}}:</span>
              <!-- <div id='select87' style="margin-top: 3px;"></div>
              <select id="select88"></select> -->
              <el-select v-model="Steacher" filterable placeholder="请选择教师" popper-class="el_selects_css" clearable style="float: left;margin-left: 20px;">
                <el-option
                  v-for="item in Steacher_options"
                  :key="item.value"
                  :label="item.txt"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>


            <div class="part" v-show="!eduType" style="margin-left: 20px;">
              <span class="txt">{{SgradeN}}:</span>
              <div id='select95' style="margin-top: 3px;"></div>
              <select id="select96"></select>
            </div>

            <div class="part" v-show="!eduType">
              <span class="txt">{{SsubjectN}}:</span>
              <div id='select97' style="margin-top: 3px;"></div>
              <select id="select98"></select>
            </div>

            <div  style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{StermN}}:</span>
              <!-- <div id='select81' style="margin-top: 3px;"></div>
              <select id="select82"></select> -->
              <el-select v-model="Sterm" filterable placeholder="请选择学期" popper-class="el_selects_css" clearable style="float: left;margin-left: 20px;">
                <el-option
                  v-for="item in Sterm_options"
                  :key="item.value"
                  :label="item.txt"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>



            <!-- <div class="part" style="margin-left: 20px;"> -->


             <!-- <input type="text" v-model="Sclassname" /> -->
            <!-- </div> -->

            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;margin-right: 20px;">{{msg}}:</span>
              <el-input style="float: left;width: 150px;"
                placeholder="请输入课程名"
                v-model="Sclassname"
                clearable>
              </el-input>
              <el-button type="primary" @click="search" style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
            </div>

            <!-- <div class="btn" style="float: left" @click="search">{{searchN}}</div> -->
          </div>
          <List :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :pageval="pageval" :bingos="bingos"
            @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :head='listhead' :optevent='optevent'
            :colums="colums" :percentinfo='percentinfo'>
            <div class="optline">
              <div class="btn" :style="imports" @click="importcourse">{{importN}}</div>
            </div>
          </List>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>
<script>
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  // import List from '@/components/extend/listOpencheck'
  import List from '@/components/extend/listcheck'
  import Linklist from './linklist'
  import AJposition from '@/components/extend/position'
  import {
    listheadoptinfoAllversion12,
    listheadoptoptAllversion12,
    OlN,
    OeN,
    evaluatetab,
    OdN,
    OmN,
    coursetypes,
    OPllist,
    OPmlist,
    OPhelist,
    OPhdlist,
    listheadoptinfoAll,
    listheadoptoptAll,
    opteventAll,
    optobjinfoAll,
    classroom,
    yes,
    no,
    importN,
    pagesize,
    pageval,
    bingos,
    collegeurl,
    teacherurl,
    studySectionSubjecturl,
    termurl,
    msgN,
    StypeN,
    SweekdayN,
    SweekN,
    searchstyle,
    searchinput,
    searchN,
    SroomN,
    StermN,
    ScollegeN,
    SteacherN,
    SsubjectN,
    SgradeN,
    percentinfo,
    percentinfoG,
    listhead,
    listheadG,
    colums,
    columsG,
    pathinfo,
    listurl
  } from '@/module/admin/config/courseinfo'
  // 权限处理
  let addbtn = 'display: none'
  let imports = 'display: none'
  let delbtn = 'display: block'
  export default {
    name: 'AJcourse',
    data() {
      return {
        secondheadshow: 'display:none;',
        firstheadshow: 'display:none;',
        products: [],
        headname: [],
        importN: importN,
        headopenpostval: true,
        delallpath: 'delalldetail',
        delbtn: delbtn,
        imports: imports,
        addbtn: addbtn,
        eduType: this.$store.state.educationType,
        percentinfo: this.$store.state.educationType ? percentinfoG : percentinfo,
        colums: this.$store.state.educationType ? columsG : colums,
        listhead: this.$store.state.educationType ? listheadG : listhead,
        classroom: classroom,
        yes: yes,
        no: no,
        optevent: listheadoptoptAll,
        optobjinfo: listheadoptinfoAll,
        opteventAll: opteventAll,
        optobjinfoAll: optobjinfoAll,
        pathinfo: pathinfo,
        bingos: bingos,
        searchinput: searchinput,
        searchstyle: searchstyle,
        pageval: pageval,
        ScollegeN: ScollegeN,
        SteacherN: SteacherN,
        SgradeN: SgradeN,
        SsubjectN: SsubjectN,
        StermN: StermN,
        SroomN: SroomN,
        coursetypes: coursetypes,
        Scollege: '',
        Steacher: '',
        Sgrade: '',
        Ssubject: '',
        Stype: '',
        Sterm: '',
        Sroom: '',
        Sclassname: '',
        searchN: searchN,
        SweekN: SweekN,
        SweekdayN: SweekdayN,
        StypeN: StypeN,
        msg: msgN,
        collegeS: '',
        teacherS: '',
        gradeS: '',
        subjectS: '',
        pagesize: pagesize,
        pageinfo: '',
        add: 0,
        edit: 0,
        hadd: 0,
        hedit: 0,
        hdel: 0,
        Mlist: 0,
        see: 0,
        Mclass: 0,
        totalnum: 0,
        evaluatetab: evaluatetab,
        evaluateselected: ['selected'],
        subind: 0,
        version: this.$store.state.version,
        college_options:[],
        Steacher_options:[],
        Sterm_options:[],
        trem_list:[] //学期集合
      }
    },
    components: {
      Ghead,
      Gfoot,
      AJposition,
      List,
      Linklist
    },
    methods: {
      init() {
        if (this.$store.state.userinfo.userName === 'admin') {
          this.addbtn = 'display:block'
          this.delbtn = 'display: block'
          this.imports = 'display: block'
          if (this.version === '1') {
            this.listheadoptopt = listheadoptoptAllversion12
            this.listheadoptinfo = listheadoptinfoAllversion12
          } else {
            this.listheadoptopt = this.listheadoptoptAll
            this.listheadoptinfo = this.listheadoptinfoAll
          }
          this.listheadopt = {
            name: this.listheadoptinfo,
            opt: this.listheadoptopt
          }
        } else {
          this.optevent = []
          this.optobjinfo = []
          this.optevent.push(OPllist)
          this.optobjinfo.push(OlN)
          let power = this.$store.state.powerinfo['course']
          if (power.length !== 0) {
            for (let i = 0; i < power.length; i++) {
              switch (power[i].operationCode) {
                case 'addlist':
                  if (!this.add) {
                    this.addbtn = 'display:block'
                  }
                  this.add++
                  break
                case 'imports':
                  if (!this.imports) {
                    this.imports = 'display: block'
                  }
                  this.imports++
                  break
                case 'headoptedit':
                  if (!this.hedit) {
                    this.optevent.push(OPhelist)
                    this.optobjinfo.push(OeN)
                  }
                  this.hedit++
                  break
                case 'headoptdel':
                  if (!this.hdel) {
                    this.optevent.push(OPhdlist)
                    this.optobjinfo.push(OdN)
                  }
                  this.hdel++
                  break
                case 'Mlist':
                  if (!this.Mlist && this.version === '3') {
                    this.optevent.push(OPmlist)
                    this.optobjinfo.push(OmN)
                  }
                  this.Mlist++
                  break
              }
            }
            this.listheadopt = {
              name: this.listheadoptinfo,
              opt: this.listheadoptopt
            }
          }
        }
      },
      jumptourl(item, ind) {
        this.$router.push({
          name: item.pathname
        })
      },
      getGradeAndSubjectList() {
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
          .then(function(res) {
            let temp = []
            let objs = res.data
            temp[0] = {
              value: '-1',
              txt: '全部'
            }
            for (let item = 0; item < objs.length; item++) {
              temp[item + 1] = {}
              temp[item + 1]['value'] = objs[item].id
              temp[item + 1]['txt'] = objs[item].name
            }
            that.gradeS = that.$Select({
              'data': temp,
              'originS': 'multiple',
              'selectId': ['select96', 'select95'],
              'callback': function(obj) {
                that.Sgrade = obj.ind ? obj.value : ''
                let temp = []
                let objs = []
                if (res.data[obj.ind - 1]) {
                  objs = res.data[obj.ind - 1].subjectLists
                } else {
                  for (let item = 0; item < res.data.length; item++) {
                    objs = objs.concat(res.data[item].subjectLists)
                  }
                }
                temp[0] = {
                  value: '-1',
                  txt: '全部'
                }
                for (let item = 0; item < objs.length; item++) {
                  temp[item + 1] = {}
                  temp[item + 1]['value'] = objs[item].subjectId
                  temp[item + 1]['txt'] = objs[item].subjectName
                }
                that.subjectS = that.$Select({
                  'data': temp,
                  'originS': 'multiple',
                  'selectId': ['select98', 'select97'],
                  'callback': function(obj) {
                    that.Ssubject = obj.ind ? obj.value : ''
                  },
                  'matchval': [{
                    val: -1
                  }]
                })
              },
              'matchval': [{
                val: -1
              }]
            })
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getCollegeList() {
        let that = this
        // 院系
        this.axios({
            method: 'post',
            url: collegeurl
          })
          .then(function(res) {
            let temp = []
            // temp[0] = {
            //   value: '-1',
            //   txt: '全部'
            // }
            let objs = res.data
            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['value'] = objs[item].id
              temp[item]['txt'] = objs[item].collegeName
            }
            that.college_options=temp;

            // that.collegeS = that.$Select({
            //   'data': temp,
            //   'originS': 'multiple',
            //   'selectId': ['select86', 'select85'],
            //   'callback': function(obj) {
            //     if (obj.ind !== 0) {
            //       that.Scollege = obj.value
            //     } else {
            //       that.Scollege = ''
            //     }
            //   },
            //   'cleartxt': '全部'
            // })
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      jump() {
        this.$router.push({
          name: this.pathinfo.prex + 'Online'
        })
      },
      importcourse() {
        this.$router.push({
          name: this.pathinfo.prex + 'import'
        })
      },
      pagepost(obj) {
        this.pageval = obj.page
        let paramdata = {}
        paramdata.page = {
          pageSize: obj.pagesize ? obj.pagesize : pagesize,
          pageIndex: obj.page
        }
        paramdata.termId = this.Sterm
        if (this.eduType) {
          paramdata.collegeId = this.Scollege
          paramdata.teacherId = this.Steacher
        } else {
          paramdata.studySectionId = this.Sgrade
          paramdata.subjectId = this.Ssubject
        }
        paramdata.courseType = '1'
        paramdata.courseName = this.Sclassname
        let that = this
        this.axios({
            method: 'post',
            url: listurl,
            data: paramdata
          })
          .then(function(res) {
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
                temp[item]['class'] = objs[item].deptName
                temp[item]['classesId'] = objs[item].classesId
                temp[item]['courseType'] = objs[item].courseType
                temp[item]['termId'] = objs[item].termId
                temp[item]['term'] = objs[item].termName
                temp[item]['term_detail'] = that.gettrem( objs[item].termId);
                temp[item]['template'] = objs[item].templateId
                temp[item]['teacherId'] = objs[item].teacherId
                temp[item]['majorId'] = objs[item].majorId
                temp[item]['majorName'] = objs[item].majorName
                temp[item]['collegeId'] = objs[item].collegeId
                temp[item]['collegeteacherId'] = objs[item].usercollegeId
                temp[item]['studySectionId'] = objs[item].studySectionId
                temp[item]['subjectId'] = objs[item].subjectId
                temp[item]['labelList'] = objs[item].labelList
                temp[item]['lessonsCount'] = objs[item].lessonsCount
                temp[item]['classesType'] = objs[item].classesType
              }
            }            
            that.products = temp
            that.bingos = []
            that.bingos[obj.page - 1] = 'selected'
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      search() {
        this.pagepost({
          page: 1,
          termId: this.Sterm,
          collegeId: this.Scollege,
          teacherId: this.Steacher,
          studySectionId: this.Sgrade,
          subjectId: this.Ssubject,
          courseType: '1',
          courseName: this.Sclassname
        })
      },

      gettrem(e){
        for(var i = 0 ; i< this.trem_list.termList.length;i++){
            if(e==this.trem_list.termList[i].termId){
              return this.trem_list.termList[i];
            }
        }
      }




    },
    beforeCreate() {
      let that = this
      // 老师
      this.axios({
          method: 'post',
          url: teacherurl,
          data: {
            roleType: 2
          }
        })
        .then(function(res) {
          let temp = []
          // temp[0] = {
          //   value: '-1',
          //   txt: '全部'
          // }
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
          //   'callback': function(obj) {
          //     if (obj.ind !== 0) {
          //       that.Steacher = obj.value
          //     } else {
          //       that.Steacher = ''
          //     }
          //   },
          //   'cleartxt': '全部'
          // })
        })
        .catch(function(error) {
          console.log(error)
        })

      // 学期
      this.axios({
          method: 'post',
          url: termurl,
          data: {
            page: {
              pageSize: pagesize,
              pageIndex: 1
            }
          }
        })
        .then(function(res) {
          let temp = []
          // temp[0] = {
          //   value: '-1',
          //   txt: '全部'
          // }
          let objs = res.data.termList
          for (let item = 0; item < objs.length; item++) {
            temp[item] = {}
            temp[item]['value'] = objs[item].termId
            temp[item]['txt'] = objs[item].termName
          }

          that.trem_list =  res.data;
          that.Sterm_options=temp;
          // that.$Select({
          //   'data': temp,
          //   'originS': 'multiple',
          //   'selectId': ['select82', 'select81'],
          //   'callback': function(obj) {
          //     if (obj.ind !== 0) {
          //       that.Sterm = obj.value
          //     } else {
          //       that.Sterm = ''
          //     }
          //   },
          //   'cleartxt': '全部'
          // })
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    created() {
      if (this.version === '1') {
        this.evaluatetab.splice(1, 1)
      } else if (this.version === '2') {
        this.evaluatetab.splice(0, 1)
      }
      if (this.eduType) {
        // 高教-院系列表
        this.getCollegeList()
      } else {
        // 普教-年级、科目列表
        this.getGradeAndSubjectList()
      }
      this.pagepost({
        page: 1
      })
      this.init()
    },
    watch: {
      '$route'(to, from) {
        if (to.name === pathinfo.prex) {
          this.pagepost({
            page: this.pageval
          })
        }
      }
    }
  }
</script>

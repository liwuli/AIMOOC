<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
      <router-view name="b"></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Fcourse.css" />
    <Links></Links>

    <div class="center centerbottom50" :style="'min-height:' + Mhei + 'px'">
      <div class="centers1100">

        <div style="float: left;width:100%;margin-top: 20px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="常态化教学课程" name="ct"></el-tab-pane>
            <el-tab-pane v-if="microteaching" label="微格教学课程" name="wg"></el-tab-pane>
          </el-tabs>
        </div>

        <div v-if="activeName == 'ct'" class="searchcondition">
          <div class="list" v-for="(item, ind) in condition">
            <div class="text">{{item.type}}</div>
            <div class="lists">
              <span :title="items.name" :class="item.selected[itemsind]" v-for="(items, itemsind) in item.val" @click="listopt(item, items, itemsind, ind)">{{items.name}}</span>
            </div>
          </div>
        </div>

        <div v-if="activeName == 'ct'" class="searchline">
          <span class="news" :style="changeselect[0]" @click="change('news')">{{courseinfo.news}}</span>
          <span class="hot" :style="changeselect[1]" @click="change('hote')">{{courseinfo.hot}}</span>

          <div class="search" @click="jumpsearch">{{courseinfo.search}}</div>
          <input type="text" class="searchinput" :placeholder="courseinfo.searchinputplaceholder" v-model="searchinput" />
        </div>
        <div v-if="activeName == 'ct'" class="reslist">
          <div class="coursenewlist" v-for="(item, ind) in listinfo" :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right: 0;' :''">
            <div class="img" @click="jumpdetail(item)">
              <img :src="item.imgurl ? item.imgurl : dcoursepath" />
            </div>
            <span class="name hides" v-if="item.coursecode" :title="item.coursename + '(' + item.coursecode + ')'">{{item.coursename}}({{item.coursecode}})</span>
            <span class="name hides" v-if="!item.coursecode" :title="item.coursename">{{item.coursename}}</span>
            <div class="half">
              <span class="halficon iconfont icon-master"></span>
              <span class="txt hides" :title="item.teacher" style="color: #141414;">{{item.teacher}}</span>
            </div>
            <div class="halfright">
              <span class="halficon iconfont icon-seeperson"></span>
              <span class="txt">{{item.num}}</span>
            </div>
            <div class="half" style="width: 100%;margin: 10px 0;">
              <span class="halficon iconfont icon-waitplay"></span>
              <span class="txt">{{item.dates}}</span>
            </div>
          </div>
          <!--<div class="courselist" v-for="(item, ind) in listinfo" :style="((ind + 1) % 5 === 0 && ind !== 0) ? 'margin-right: 0;' :''">
            <div class="img" @click="jumpdetail(item)">
              <img  :src="item.imgurl ? item.imgurl : dcoursepath"/>
            </div>
            <span class="textshow">
              <span class="hides">{{courseinfo.teacher}}：{{item.teacher}}</span>
              <span class="hides" style="text-align: right;">{{item.num}}{{courseinfo.see}}</span>
            </span>
            <span class="hides title" :title="item.coursename + '(' + item.coursecode + ')'" v-if="item.coursecode">{{item.coursename}}({{item.coursecode}})</span>
            <span class="hides title" :title="item.coursename" v-if="!item.coursecode">{{item.coursename}}</span>
            <span class="hides title">{{item.dates}}</span>
          </div>-->
          <page v-if="activeName == 'ct'" :totalnum="totalnum" :bingo="bingo" :pageindex="pageval" @pagepost="pagepost"
            :pagesize="pagesize" :totalpage="totalpage"></page>
        </div>

        <div v-else style="float: left; width: 100%;height: auto;">

          <!-- 学科 -->
          <div style="width: 100%;height: auto;">
            <div style="float: left; width: 7%;">
              <span style="font-size: 14px;font-weight: 600;margin-right: 20px;line-height: 35px;">学科</span>
            </div>
            <div style="float: left;width: 93%;height: auto;">
              <div class="xueke_item" :style="select_subject == '' ? 'color:#3197fc;font-weight: 600;':''" @click="subject_change('')">全部</div>
              <div v-for="item in subject_list" :title="item.subjectName" :style="select_subject == item.subjectId ? 'color:#3197fc;font-weight: 600;':''"
                class="xueke_item" @click="subject_change(item.subjectId)">{{item.subjectName}}</div>
            </div>

          </div>

          <!-- 年级 -->
          <div style="width: 100%;height: auto;">
            <div style="float: left; width: 7%;">
              <span style="font-size: 14px;font-weight: 600;margin-right: 20px;line-height: 35px;">年级</span>
            </div>
            <div style="float: left;width: 93%;height: auto;">
              <div class="xueke_item" :style="select_grade == '' ? 'color:#3197fc;font-weight: 600;':''" @click="grade_change('')">全部</div>
              <div v-for="item in grade_list" :title="item.gradeName"  :style="select_grade == item.gradeId ? 'color:#3197fc;font-weight: 600;':''"
                class="xueke_item" @click="grade_change(item.gradeId)">{{item.gradeName}}</div>
            </div>

          </div>


          <div class="searchline">
            <span class="news" :style="select_acitv== 0 ? 'color: #3197fb':''" @click="order_change(0)">{{courseinfo.news}}</span>
            <span class="hot" :style="select_acitv== 1 ? 'color: #3197fb':''" @click="order_change(1)">{{courseinfo.hot}}</span>
            <!--  <div class="search" @click="">{{courseinfo.search}}</div>
            <input type="text" class="searchinput" :placeholder="courseinfo.searchinputplaceholder" v-model="searchinput2" /> -->
          </div>

          <!-- 微格课程 -->
          <div class="reslist">
            <div class="coursenewlist" v-for="(item, ind) in table_list" :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right: 0;' :''"
              @click="opendetail(item)">
              <div class="img" @click="">
                <img :src="dcoursepath" />
              </div>
              <span class="name hides">{{item.gradeName + '&nbsp&nbsp' + item.subjectName}}</span>
              <div class="half" style="width: 100%;margin: 10px 0;display: flex;align-items: center;justify-content: space-between;">
                <div style="height: 100%;display: flex;align-items: center;">
                  <span class="halficon iconfont icon-seeperson"></span>
                  <span class="txt">{{item.clicks}}</span>
                </div>
                <div style="height: 100%;display: flex;align-items: center;margin-right: 20px;">
                  <span class="halficon iconfont icon-waitplay"></span>
                  <span class="txt" style="margin-left: 10px;">{{item.lastPushTime}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- :page-sizes="[10, 15, 20,30,40]" -->
          <div style="float: left; text-align: center;width: 100%;margin-bottom: 60px;margin-top: 30px;">
            <el-pagination background :prev-text="'上一页'" :next-text="'下一页'" :popper-class="'pagination1'"
              :hide-on-single-page="false" @current-change="findMicroPushList"
              :current-page.sync="wg_pageindex" :page-size="wg_pagesize" layout="total,prev, pager, next, jumper"
              :total="wg_totalnum">
            </el-pagination>
          </div>


        </div>

      </div>
    </div>


    <Gfoot></Gfoot>
  </div>
</template>

<script>
  import Ghead from '@/components/common/Homeheader'
  import Gfoot from '@/components/common/footer'
  import Links from '@/module/home/link'
  import page from '@/components/extend/page'
  import {microteaching} from '@/module/admin/config/urlPage'
  import {
    getMicroSubjectList,
    getMicroGradeList,
    findMicroPushList,
    addMicroPushClicks
  } from '@/module/admin/config/highteaching'
  import {
    courseinfo,
    products,
    bingo,
    infoval,
    pageval,
    pagesizeeight,
    getscreenurl,
    courselisturl,
    clickcourseurl
  } from '@/module/home/config/courseinfo'
  export default {
    name: 'Fcourse',
    data() {
      return {
        microteaching:microteaching,
        condition: [],
        conditionobj: [],
        infoval: infoval,
        products: products,
        bingo: bingo,
        pageval: pageval,
        pagesize: pagesizeeight,
        courseType: '',
        dcoursepath: '/static/images/Dcourse.jpg',
        termId: '',
        collegeId: '',
        studySectionId: '',
        subjectId: '',
        labelId: '',
        labelIds: [],
        courseinfo: courseinfo,
        courseObj: {},
        orderBy: '0',
        totalpage: 0,
        pageindex: 1,
        keywords: {},
        searchinput: '',
        selected: ['selected'],
        changeselect: ['color: #3197fb', ''],
        eduType: this.$store.state.educationType,
        val: [],
        listinfo: [],
        totalnum: 0,
        Mhei: window.innerHeight - 65 - 58 - 50,


        activeName: this.$route.query.activeName == 'wg'?'wg':'ct',
        subject_list: [], //学科集合
        select_subject: '', //选择的学科id
        grade_list: [], //年级集合
        select_grade: '', //选的的年级id
        searchinput2: "",
        select_acitv: 0,
        wg_pageindex: 1,
        wg_pagesize: 20,
        wg_totalnum: 0,
        table_list: []
      }
    },
    created() {
       //测试 让返回上一页  把原来的查询条件 给自动复原
       this.select_acitv = parseInt(this.$route.query.select_acitv == undefined ? 0 : this.$route.query.select_acitv);

       this.select_subject = this.$route.query.select_subject == undefined ? '' : this.$route.query.select_subject;

       this.select_grade = this.$route.query.select_grade == undefined ? '' : this.$route.query.select_grade;

      // 获取筛选条件列表
      this.getcoursescreenlist()
      this.pagepost({
        page: 1,
        keywords: this.keywords
      })
      this.getMicroSubjectList();
      this.getMicroGradeList();
      this.findMicroPushList();
    },
    components: {
      Ghead,
      Gfoot,
      Links,
      page
    },
    methods: {

      opendetail(e) {
      this.$router.push({
        name: 'Fmicrovideo',
        query: {
          gradeId: e.gradeId,
          subjectId: e.subjectId,
          select_acitv:this.select_acitv,
          select_subject:this.select_subject,
          select_grade:this.select_grade
        }
      })
    },


    subject_change(e) {
      this.select_subject = e;
      this.findMicroPushList();
    },

    grade_change(e) {
      this.select_grade = e;
      this.findMicroPushList();
    },

    //分页的 pagesize 切换触发事件
    handleSizeChange(val) {
      this.wg_pagesize = val;
      this.findMicroPushList();
    },

    order_change(e) {
      this.select_acitv = e;
      this.findMicroPushList();
    },

    //常态和微格的切换
    handleClick(e) {

      if(e.index=='0'){
        this.pagepost({
          page: 1,
          keywords: this.keywords
        })

      }else{
        this.findMicroPushList();
      }

    },


    //获取学科列表
    getMicroSubjectList() {
      var that = this;
      this.axios({
          method: 'post',
          url: getMicroSubjectList,
          params: {
            'par': {
              subjectName: "",
              majorId: "",
              offset: 0,
              pageSize: 100000,
            }
          }
        })
        .then(function(res) {
          that.subject_list = res.data.data
        })
    },

    //获取年级列表
    getMicroGradeList() {
      var that = this;
      this.axios({
          method: 'post',
          url: getMicroGradeList,
          params: {}
        })
        .then(function(res) {
          that.grade_list = res.data.data
        })
    },


    //获取所有微格课程
    findMicroPushList() {
      var that = this;
      this.axios({
          method: 'post',
          url: findMicroPushList,
          data: {
            page: {
              pageSize: that.wg_pagesize,
              pageIndex: that.wg_pageindex
            },
            keywords: {
              orderBy: that.select_acitv + "",
              gradeId: that.select_grade,
              subjectId: that.select_subject
            }
          }
        })
        .then(function(res) {
          that.wg_totalnum = res.data.total;
          that.table_list = res.data.list;
        })

    },




    getcoursescreenlist() {
      let that = this
      // 课程筛选条件
      this.axios({
          method: 'post',
          url: getscreenurl
        })
        .then(function(res) {
          let condition = []
          let obj = res.data.objList
          for (let item = 0; item < obj.length; item++) {
            that.conditionobj.splice(item, 1, '')
            condition[item] = obj[item]
            condition[item]['typeval'] = condition[item].code
            condition[item]['type'] = condition[item].name
            condition[item]['val'] = condition[item].labels
            condition[item].selected = that.selected
            condition[item].val.unshift({
              id: '',
              name: '全部'
            })
          }
          that.condition = condition
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    change(param) {
      if (param === 'news') {
        this.changeselect = ['color: #3197fb', '']
        this.orderBy = '0'
      } else {
        this.changeselect = ['', 'color: #3197fb']
        this.orderBy = '1'
      }
      this.keywords['orderBy'] = this.orderBy
      this.pagepost({
        page: 1,
        keywords: this.keywords
      })
      // post 重新获取数据
    },
    jumpsearch() {
      this.$router.push({
        name: 'Fcourseres',
        params: {
          inputval: this.searchinput
        },
        query: {
          inputval: this.searchinput
        }
      })
    },
    jumpdetail(obj) {

      this.clickcourse(obj)
      this.$router.push({
        name: 'Fcourseintroduction',
        params: {
          course: obj
        },
        query: {
          courseId: obj.courseId
        }
      })
    },
    clickcourse(obj) {
      // post提交数据 增加点击量
      this.axios({
          method: 'post',
          url: clickcourseurl,
          data: {
            courseId: obj.courseId
          }
        })
        .then(function(res) {
          if (res.data) {
            //        console.log('点击量+1...')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    pagepost(obj) {
      let that = this
      if (typeof obj === 'number') {
        obj = {
          page: obj
        }
      }
      that.keywords['orderBy'] = that.orderBy
      that.pageval = obj.page
      this.axios({
          method: 'post',
          url: courselisturl,
          data: {
            page: {
              pageSize: obj.pagesize ? obj.pagesize : pagesizeeight,
              pageIndex: that.pageval
            },
            keywords: that.keywords
          }
        })
        .then(function(res) {
          that.totalpage = Math.ceil(res.data.total / pagesizeeight)
          that.totalnum = res.data.total
          let temp = []
          let objs = res.data.courseList
          for (let item = 0; item < objs.length; item++) {
            if (objs[item].ispush <= 0) {
              continue
            }
            if (item < pagesizeeight) {
              temp.push({
                imgurl: objs[item]['fileUrl'] === ' ' ? '' : objs[item]['fileUrl'],
                teacher: objs[item]['teacherName'],
                num: objs[item]['clicks'],
                coursename: objs[item]['courseName'],
                coursecode: objs[item]['courseNo'],
                dates: objs[item]['lastupdatedate'],
                courseId: objs[item]['courseId'],
                selected: false,
                course: objs[item],
                ispush: objs[item]['ispush']
              })
            }
          }
          that.listinfo = temp
          that.bingo = []
          that.bingo[that.pageval - 1] = 'selected'
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    listopt(item, items, itemind, ind) {
      item.selected = []
      switch (item.typeval) {
        case 'courseType':
          this.courseType = items.id
          item.selected[itemind] = 'selected'
          this.keywords['courseType'] = this.courseType
          break
        case 'termId':
          this.termId = items.id
          item.selected[itemind] = 'selected'
          this.keywords['termId'] = this.termId
          break
        case 'collegeId':
          this.collegeId = items.id
          item.selected[itemind] = 'selected'
          this.keywords['collegeId'] = this.collegeId
          break
        case 'studySectionId':
          this.studySectionId = items.id
          item.selected[itemind] = 'selected'
          this.keywords['studySectionId'] = this.studySectionId
          this.condition[ind + 1].val = []
          if (item.labels[itemind].childs) {
            for (let i = 0; i < item.labels[itemind].childs.length; i++) {
              this.condition[ind + 1].val.push(item.labels[itemind].childs[i])
            }
            this.condition[ind + 1].val.unshift({
              id: '',
              name: '全部'
            })
          } else {
            this.condition[ind + 1].val.unshift({
              id: '',
              name: '全部'
            })
          }
          this.condition[ind + 1].selected = ['selected']
          this.keywords['subjectId'] = ''
          break
        case 'subjectId':
          this.subjectId = items.id
          item.selected[itemind] = 'selected'
          this.keywords['subjectId'] = this.subjectId
          break
        default:
          this.labelId = items.id
          item.selected[itemind] = 'selected'
          this.conditionobj.splice(ind, 1, items.id)
          this.keywords['labelIds'] = this.conditionobj
      }
      this.pagepost({
        page: 1
      })
    },
    watch: {
      '$route'(to, from) {
        if (to.name === 'Fcourse') {
          this.pagepost({
            page: this.pageval
          })
        }
      }
    }
  }
  }
</script>


<style>
  .xueke_item {
    float: left;
    font-size: 14px;
    margin-right: 20px;
    line-height: 35px;
	  cursor:pointer
  }

</style>

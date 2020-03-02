<template>
  <div class="app">
    <Ghead></Ghead>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Fcourse.css"/>
    <Link></Link>
    <div class="center centerbottom50">
      <div class="centers1100">
        <span class="coursetitle">{{courseinfo.courseenter}} > {{coursename}}</span>
        <Fcoursehead @favirate="favirate" :focus="focus" @startlearnevent="startlearnevent" :startlearn="startlearn" :courseheadinfo="courseheadinfo" :courseinfo="courseinfo"></Fcoursehead>
        <div class="cousrsebread">
          <span :class="breadselected[ind]" @click="jump(courseinfo1.jumparr[ind])" v-for="(item, ind) in courseinfo1.breadarr">{{item}}</span>
        </div>
        <div class="courseleft">
          <div class="line">
            <span class="title">{{appraiseinfo.appraise}}</span>
          </div>
          <div class="appraiseleft">
            <scole :starid="star" :bool="bool" :totalwid="totalwid" :reset="reset" :starnum="starnum" :inputstyle="inputstyle" :val="initscoleval" :disabled="disabled" :wid="wid" :totalscole="totalscole"></scole>
            <span class="person">{{person}}{{appraiseinfo.person}}</span>
            <div class="stararr">
              <div class="starline" v-for="(item, ind) in appraiseinfo.stararr">
                <span class="txt">{{item}}</span>
                <div class="progressbg">
                   <span class="progress" :style="'width:' + starArrs[ind] +'px;'"></span>
                </div>
                <span class="progresstxt">{{starArrs[ind]}}%</span>
              </div>
            </div>
          </div>
          <div class="appraiseright">
            <span class="appraise">{{appraiseinfo.setscole}}</span>
            <scole :starid="appraisestar" @scoleevent="scoleevent" :resetupdate="appraisestarbool" :bool="appraisestarbool" :type="halfstar" :wid="appraisestarwid"  :totalwid="totalwid" :starnum="starnum" :inputstyle="appraiseinputstyle"  :disabled="disabled"  :totalscole="totalscole"></scole>
            <textarea name="" class="textarea" rows=""  v-show="area" cols="" v-model="appraisecontent"></textarea>
            <span class="textarea" v-show="!area"  style="box-shadow: none;">{{appraiseinfo.myappraise}}：{{appraisecontent}}</span>
            <div class="startlearn" @click="appraise" v-show="area">{{appraiseinfo.set}}</div>
          </div>
          <div class="line" style="padding-top: 0;"></div>
          <div class="line" style="box-shadow: none;">
            <span class="title">{{appraiseinfo.newappraise}}</span>
          </div>
          <div class="appraiselist" v-for="item in commentlists">
              <div class="img">
                <img :src="item.imgurl ? item.imgurl : duserpath" />
              </div>
              <div class="appraiserightpart">
                <span class="name">{{item.name}}</span>
                <div class="star">
                  <span class="starbg" :style="'width: ' + item.percent * 24 + 'px;'"></span>
                </div>
                <span class="dates">{{item.dates}}</span>
                <span class="content">{{item.content}}</span>
              </div>
          </div>
          <page  :totalnum="totalnum" :bingo="bingos" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage" ></page>
        </div>
        <div class="courseright">
          <div class="notice">
            <span class="title">{{courseinfo1.noticetitle}}</span>
            <div class="list" @click="jumptonotice(item)"  v-for="item in noticelist">
              <div class="titles">
                <span class="icons iconfont icon-gonggao"></span>
                <span class="txt hides">{{item.title}}</span>
              </div>
              <div class="content" v-html="item.content"></div>
              <div class="dates">
                {{item.dates}}
              </div>
            </div>
            <div class="list" v-if="noticelist.length <= 0">{{courseinfo.no}}</div>
            <span class="more" v-if="noticelist.length > 0" @click="jumpmoreannounce()">{{courseinfo1.more}}</span>
          </div>
          <div class="charge">
            <span class="title">{{courseinfo1.chargetitle}}</span>
            <div class="list">
              <div class="img">
                <img :src="chargelist.imgurl ? chargelist.imgurl : duserpath" />
              </div>
              <span class="name hides" :title="chargelist.name">{{chargelist.name}}</span>
              <span class="college hides" :title="chargelist.college">{{chargelist.college}}</span>
            </div>
            <span class="title">{{courseinfo1.teachertitle}}</span>
            <div class="lists">
              <div class="list" v-if="chargelists.length > 0" v-for="item in chargelists">
                <div class="img">
                  <img :src="item.imgurl ? item.imgurl : duserpath"  />
                </div>
                <span class="name hides" :title="item.name">{{item.name}}</span>
                <span class="college hides" :title="item.college">{{item.college}}</span>
              </div>
              <div class="list" v-if="chargelists.length <= 0">{{courseinfo.no}}</div>
            </div>
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
import Link from '@/module/home/link'
import Fcoursehead from '@/module/home/coursehead'
import page from '@/components/extend/page'
import scole from '@/components/extend/scole'
import * as types from '@/store/win-types'
import {lessonresourcesurl, courseinfo, courseinfo1, bingos, appraiseinfo, appraisepagesize, findcourseinfourl, coursecommentslisturl, coursecommentscounturl, courseannouncementurl, teachinggroupurl, addCoursecommentturl, getmyinteresturl, addinteresturl, delinteresturl, mystudycoursesurl, courseuserstudyurl} from '@/module/home/config/courseinfo'
export default {
  name: 'Fcourseappraise',
  data () {
    return {
      courseinfo: courseinfo,
      courseinfo1: courseinfo1,
      appraiseinfo: appraiseinfo,
      breadselected: ['', '', 'selected'],
      duserpath: '/static/images/D_user.png',
      courseheadinfo: {
        imgurl: '',
        title: '',
        person: 0,
        teacher: '',
        scoleval: 0,
        wid: 135 / 5 * 0
      },
      halfstar: 'all',
      coursename: '',
      noticelist: [],
      chargelist: {
        imgurl: '',
        name: '',
        college: ''
      },
      chargelists: [],
      pagesize: appraisepagesize,
      bingos: bingos,
      commentlists: [],
      appraisestar: 'appraisestar',
      appraiseinputstyle: 'display:none',
      star: 'starb',
      area: true,
      totalwid: 135,
      starnum: 5,
      totalscole: 5,
      person: 0,
      initscoleval: 0,
      wid: 135 / 5 * 0,
      appraisestarwid: 135 / 5 * 0,
      starArrs: [0, 0, 0, 0, 0],
      disabled: 'disabled',
      bool: true,
      reset: true,
      appraisestarbool: false,
      inputstyle: 'width:38px;background:none',
      appraisecontent: '',
      appraisestarval: 0,
      focus: 0,
      startlearn: 0,
      courseId: '',
      lessonId: '',
      totalpage: 0,
      pageindex: 1,
      totalnum: 0,
      apperisescoleobj: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
    this.getcourse()
    this.getlessonresources() // 课程章节列表
    this.getcommentscounts()
    this.pagepost({page: 1})
    this.getcourseannouncement()
    this.getteachinggroup()
    if (window.getCookie('currentUser') !== '') {
      let userId = this.$store.state.userinfo.id
      this.getmystudycourses(userId)
      this.getmyinterests(userId)
    }
  },
  components: {
    Ghead,
    Gfoot,
    Link,
    Fcoursehead,
    scole,
    page
  },
  methods: {
    strlen (str, cutnum, ind) {
	    var len = 0
	    let j = 0
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i)
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++
        }
        else {
            len += 2
        }
        if (len <= cutnum) {
          j++
        }
      }
      if (cutnum) {
       if (len >= cutnum) {
        	return str.substring(0, j) + '...'
	      } else {
	        return str
	      }
      }
    },
    jumptonotice (item) {
      this.$router.push({name: 'Fcourseannouncement', query: {courseId: this.courseId}, params: {item: item}})
    },
    geturlparam (name, url) {
      let urls = url.split('?')[1].split('&')
      let val = ''
      for (let item = 0; item < urls.length; item++) {
        if (name === urls[item].split('=')[0]) {
          val = urls[item].split('=')[1]
          break
        }
      }
      return val
    },
    getlessonresources () {
      let that = this
      this.axios({
        method: 'post',
        url: lessonresourcesurl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        let objs = res.data.lessonList
        if (objs && objs.length > 0) {
          that.lessonId = objs[0]['lessonId']
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getcourse (obj) {
      // 获取课程信息
      let that = this
      this.axios({
        method: 'post',
        url: findcourseinfourl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        let courseObj = res.data
        that.courseheadinfo['courseId'] = courseObj.courseId
        that.courseheadinfo['imgurl'] = courseObj.imgurl
        that.courseheadinfo['title'] = courseObj.courseName
        that.coursename = courseObj.courseName
        that.chargelist['imgurl'] = courseObj.teacherImg
        that.chargelist['name'] = courseObj.teacherName
        that.chargelist['college'] = courseObj.collegeName
        that.courseheadinfo['teacher'] = courseObj.teacherName
        that.courseheadinfo['person'] = courseObj.stuCount
        that.courseheadinfo['scoleval'] = courseObj.stars
        that.courseheadinfo['wid'] = 135 / 5 * courseObj.stars
        that.courseheadinfo = Object.assign({}, that.courseheadinfo)
        that.initscoleval = courseObj.stars
        that.wid = 135 / 5 * courseObj.stars
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    scoleevent (obj) {
      this.appraisestarval = obj.val
    },
    getmyinterests (obj) {
      // 获取关注的课程
      let that = this
      this.axios({
        method: 'post',
        url: getmyinteresturl,
        params: {
          par: {
            userId: obj
          }
        }
      })
      .then(function (res) {
        let myinterestcourses = res.data.data
        if (myinterestcourses && myinterestcourses.length > 0) {
          for (let item = 0; item < myinterestcourses.length; item++) {
            if (myinterestcourses[item]['courseId'] === that.courseId) {
              that.focus = 1
              break
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    favirate (obj) {
      // 关注/取消关注
      let userId = this.$store.state.userinfo.id
      if (obj.status) {
        let locationurl = location.href
        let params = {}
        params['courseId'] = this.courseId
        params['userId'] = userId
        params['visitUrl'] = locationurl
        this.addinterest(params)
      } else {
        let params = {}
        params['courseId'] = this.courseId
        params['userId'] = userId
        this.delinterest(params)
      }
    },
    addinterest (obj) {
      // 添加关注
      let that = this
      this.axios({
        method: 'post',
        url: addinteresturl,
        params: {
          par: obj
        }
      })
      .then(function (res) {
        if (res.data.data) {
          that.focus = 1
          that.win(res.data.data, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    delinterest (obj) {
      // 取消关注
      let that = this
      this.axios({
        method: 'post',
        url: delinteresturl,
        params: {
          par: obj
        }
      })
      .then(function (res) {
        if (res.data.data) {
          that.focus = 0
          that.win(res.data.data, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getmystudycourses (obj) {
      // 获取我学习的课程
      let that = this
      this.axios({
        method: 'post',
        url: mystudycoursesurl,
        data: {
          userId: obj,
          courseId: that.courseId
        }
      })
      .then(function (res) {
        // let myCourseList = res.data.myCourseList
        let startlearnval = res.data.startlearn
        if (startlearnval !== undefined) {
          that.startlearn = startlearnval
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    startlearnevent (obj) {
      let that = this
      if (obj.status === 0) {
        // 开始学习
        this.axios({
          method: 'post',
          url: courseuserstudyurl,
          data: {
            userId: that.$store.state.userinfo.id,
            courseId: that.courseId,
            visitUrl: location.href
          }
        })
        .then(function (res) {
          if (res.data) {
            that.startlearn = 1
            that.courseheadinfo['person'] ++
            // 跳转到课程详情页
            that.$router.push({name: 'FcourseDetail', query: {courseId: that.courseId, lessonId: that.lessonId}})
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        // 跳转到课程详情页
        this.$router.push({name: 'FcourseDetail', query: {courseId: that.courseId, lessonId: that.lessonId}})
      }
    },
    getcommentscounts () {
      // 查询各星级评分下的课程评论比率
      let that = this
      this.axios({
        method: 'post',
        url: coursecommentscounturl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        let objs = res.data.courseCommentsCounts
        let allCounts = res.data.allCounts
        if (objs && objs.length > 0) {
          for (let i = 0; i < 5; i++) {
            for (let item = 0; item < objs.length; item++) {
              if (i + 1 === objs[item]['stars']) {
                that.starArrs[4 - i] = objs[item]['rates']
              }
            }
          }
        }
        that.person = allCounts
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // 课程公告
    getcourseannouncement () {
      let that = this
      this.axios({
        method: 'post',
        url: courseannouncementurl,
        data: {
          page: {
            courseId: that.courseId
          }
        }
      })
      .then(function (res) {
        let temp = []
        if (res.data.code === 200) {
          let objs = res.data.result.CourseAnnouncementList
          if (objs && objs.length > 0) {
            objs = (objs.length > 2) ? objs.slice(0, 2) : objs
            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['id'] = objs[item]['id']
              temp[item]['title'] = objs[item]['name']
              temp[item]['content'] = that.strlen(objs[item]['content'], 85, item)
              temp[item]['dates'] = objs[item]['createdate']
            }
          }
          that.noticelist = temp
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // 课程教师团队
    getteachinggroup () {
      let that = this
      this.axios({
        method: 'post',
        url: teachinggroupurl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        let temp = []
        if (res.data.code === 200) {
          let teachinggroups = res.data.teachingGroupList
          if (teachinggroups) {
            let teachergroups = teachinggroups.teacherList
            if (teachergroups && teachergroups.length > 0) {
              for (let item = 0; item < teachergroups.length; item++) {
                temp[item] = {}
                temp[item]['imgurl'] = teachergroups[item]['picture']
                temp[item]['name'] = teachergroups[item]['realName']
                temp[item]['college'] = teachergroups[item]['collegeName']
              }
            }
            that.chargelists = temp
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumpmoreannounce () {
      this.$router.push({name: 'Fcourseannouncement', query: {courseId: this.courseId}})
    },
    jump (path) {
      this.$router.push({path: path, query: {courseId: this.courseId}})
    },
    validappraise () {
      if (window.getCookie('currentUser') === '') {
        this.win(courseinfo.loginN, '', false)
        return false
      } else if (this.appraisecontent.replace(/\s/gi, '') === '') {
        this.win(appraiseinfo.appraisecontent, '', false)
      } else {
        return true
      }
    },
    // 我要评价
    appraise () {
      if (this.validappraise()) {
        let that = this
        this.$Win({
        	'width': '300px',
			    'height': '230px',
          'title': appraiseinfo.title,
          'type': 'txt',
          'content': appraiseinfo.content,
          'cancel': function (obj) {
            obj.remove(obj.getid)
          },
          'save': function (obj) {
            obj.remove(obj.getid)
            that.appraisefn()
          },
          'btn': [
				    ['.cancel', '取消', '145px'],
				    ['.save', '确定']
			    ]
        })
      }
    },
    appraisefn () {
      // post提交数据
      let that = this
      this.axios({
        method: 'post',
        url: addCoursecommentturl,
        data: {
          courseId: that.courseId,
          stars: that.appraisestarval,
          content: that.appraisecontent
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
        } else {
          that.pagepost({page: that.pageindex})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
      that.area = false
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageindex = obj.page
      // 课程评价列表
      let that = this
      this.axios({
        method: 'post',
        url: coursecommentslisturl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        let temp = []
        let mycomment = res.data.myComment
        if (mycomment) {
          that.appraisestarwid = 135 / 5 * mycomment.mystars
          that.appraisecontent = mycomment.mycontent
          that.reset = true
          that.appraisestarbool = true
          that.area = false
        }
        let objs = res.data.courseCommentsList
        that.totalpage = Math.ceil(objs.length / that.pagesize)
        that.totalnum = objs.length
        if (objs && objs.length > 0) {
          let start = (that.pageindex - 1) * that.pagesize
          for (let item = start; item < (that.pageindex * that.pagesize < that.totalnum ? that.pageindex * that.pagesize : that.totalnum); item++) {
            let ind = item - start
            temp[ind] = {}
            temp[ind]['imgurl'] = objs[item]['picture']
            temp[ind]['name'] = objs[item]['realName']
            temp[ind]['dates'] = objs[item]['createTime']
            temp[ind]['percent'] = objs[item]['stars']
            temp[ind]['content'] = objs[item]['content']
          }
          that.commentlists = temp
          that.bingos = []
          that.bingos[that.pageindex - 1] = 'selected'
          that.getcourse()
          that.getcommentscounts()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
    watch: {
      '$route' (to, from) {
        if (to.name === 'Fcourseappraise') {
          this.pagepost({page: this.pageindex})
        }
      }
    }
  },
  mounted () {
    if (location.hash.indexOf('Fcourse') >= 0) {
      document.querySelector('a[href="#/Fcourse"]').setAttribute('class', 'a active')
    }
  }
}
</script>

<template>
  <div class="app">
    <Ghead></Ghead>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Fcourse.css"/>
    <Links></Links>
    <div class="center centerbottom50">
      <div class="centers1100">
        <span class="coursetitle">{{courseinfo.courseenter}} > {{coursename}}</span></span>
        <Fcoursehead @favirate="favirate" :focus="focus" @startlearnevent="startlearnevent" :startlearn="startlearn" :courseheadinfo="courseheadinfo" :courseinfo="courseinfo"></Fcoursehead>
        <div class="cousrsebread">
          <span :class="breadselected[ind]" @click="jump(courseinfo1.jumparr[ind])" v-for="(item, ind) in courseinfo1.breadarr">{{item}}</span>
        </div>
        <div class="courseleft">
          <div class="line">
            <span class="title">{{courseinfo1.courseinfo}}</span>
            <span class="content">
              {{courseinfos ? courseinfos : courseinfo.no}}
            </span>
          </div>
          <div class="line">
            <span class="title">{{courseinfo1.outline}}</span>
            <span class="contents" v-show="outline !== ''" v-html="outline"></span>
            <div class="content"  v-show="outline === ''">{{courseinfo.no}}</div>
          </div>
          <div class="line" style="box-shadow: none;">
            <span class="title">{{courseinfo1.book}}</span>
            <div class="book" v-if="booktextlist.length > 0" v-for="item in booktextlist">
              <div class="img">
                <span class="txt">{{courseinfo1.booktxt}}</span>
                <img :src="item.imgurl ? item.imgurl : dbookpath"/>
              </div>
              <span class="name hides">{{item.bookName}}</span>
              <span class="editor hides">{{item.author}}</span>
              <span class="publish hides">{{item.publishInfo}}</span>
            </div>
            <div class="content" v-if="booktextlist.length <= 0" >{{courseinfo.no}}</div>
          </div>
        </div>
        <div class="courseright">
          <div class="notice">
            <span class="title">{{courseinfo1.noticetitle}}</span>
            <div class="list" v-if="noticelist.length > 0" @click="jumptonotice(item)" v-for="item in noticelist">
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
import Links from '@/module/home/link'
import Fcoursehead from '@/module/home/coursehead'
import * as types from '@/store/win-types'
import {lessonresourcesurl, courseinfo, courseinfo1, findcourseinfourl, courseoutlineurl, courseannouncementurl, textbookurl, teachinggroupurl, getmyinteresturl, addinteresturl, delinteresturl, mystudycoursesurl, courseuserstudyurl} from '@/module/home/config/courseinfo'
export default {
  name: 'Fcourseintroduction',
  data () {
    return {
      courseobj: {},
      courseinfo: courseinfo,
      courseinfo1: courseinfo1,
      dbookpath: '/static/images/D_U_book.png',
      duserpath: '/static/images/D_user.png',
      coursename: '',
      breadselected: ['selected'],
      courseheadinfo: {
        imgurl: '',
        title: '',
        person: 0,
        teacher: '',
        scoleval: 0,
        wid: 135 / 5 * 0
      },
      booktext: {
        bookName: '',
        author: '',
        publish: ''
      },
      outline: '',
      courseinfos: '',
      persons: 0,
      scoleval: 0,
      noticelist: [],
      booktextlist: [],
      chargelist: {
        imgurl: '',
        name: '',
        college: ''
      },
      chargelists: [],
      focus: 0,
      startlearn: 0,
      courseId: location.hash.split('?')[1].split('=')[1],
      lessonId: ''
    }
  },
  created () {
    this.getcourse()
    this.getlessonresources() // 课程章节列表
    this.getcourseoutline()
    this.getcourseannouncement()
    this.getcoursetextbook()
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
    Links,
    Fcoursehead
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
    // 获取课程信息
    getcourse () {
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
        that.courseinfos = courseObj.description
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // 课程大纲
    getcourseoutline () {
      let that = this
      this.axios({
        method: 'post',
        url: courseoutlineurl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          let objs = res.data.result.CoursesOutlineList
          if (objs && objs.length > 0) {
            that.outline = objs[0].content
          }
        }
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
    // 课程参考教材
    getcoursetextbook () {
      let that = this
      this.axios({
        method: 'post',
        url: textbookurl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        let temp = []
        if (res.data.code === 200) {
          let objs = res.data.result.CoursesTextbookList
          if (objs && objs.length > 0) {
            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['bookName'] = objs[item]['bookName']
              temp[item]['author'] = objs[item]['author']
              temp[item]['publishInfo'] = objs[item]['publishInfo']
              temp[item]['imgurl'] = objs[item]['cover']
            }
          }
          that.booktextlist = temp
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
    jump (path) {
      this.$router.push({path: path, query: {courseId: this.courseId}})
    },
    jumpmoreannounce () {
      this.$router.push({name: 'Fcourseannouncement', query: {courseId: this.courseId}})
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
    if (location.hash.indexOf('Fcourse') >= 0) {
      document.querySelector('a[href="#/Fcourse"]').setAttribute('class', 'a active')
    }
  }
}
</script>

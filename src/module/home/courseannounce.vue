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
        <div class="scrollfather" :id="couseannouncement" style="height: 555px;">
          <div class="scrollson" >
            <div class="announcelist" v-for="item in noticelist">
              <div class="dates">
                <span class="icondates iconfont icon-my-rili"></span>
                <span class="txt">{{item.dates}}</span>
              </div>
              <span class="title hides" :title="item.title">{{item.title}}</span>
              <div class="content" v-html="item.content" :style="noticeid !== '' ? 'height:auto' : ''"></div>
              <span class="iconarr iconfont icon-open" v-if="noticeid === ''"  style="float: left;margin-top: 45px;" @click="openclose($event)"></span>
              <span class="iconarr iconfont icon-close" v-if="noticeid !== ''" style="float: left;margin-top: 45px;" @click="openclose($event)"></span>
            </div>
           </div>
          <div class="scroll_ymove">
            <div class="scroll_y" ></div>
          </div>
          <div class="scroll_xmove">
            <div class="scroll_x"></div>
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
import * as types from '@/store/win-types'
import {lessonresourcesurl, courseinfo, courseinfo1, findcourseinfourl, courseannouncementurl, getmyinteresturl, addinteresturl, delinteresturl, mystudycoursesurl, courseuserstudyurl} from '@/module/home/config/courseinfo'
export default {
  name: 'Fcourseannouncement',
  data () {
    return {
      scroll: '',
      coursename: '',
      courseinfo: courseinfo,
      courseinfo1: courseinfo1,
      breadselected: ['', '', '', 'selected'],
      courseheadinfo: {
        imgurl: '',
        title: '',
        person: 0,
        teacher: '',
        scoleval: 0,
        wid: 135 / 5 * 0
      },
      noticelist: [],
      couseannouncement: 'couseannouncement',
      focus: 0,
      startlearn: 0,
      courseId: location.hash.split('?')[1].split('=')[1],
      lessonId: '',
      noticeid: ''
    }
  },
  created () {
    if (this.$route.params.item) {
      console.log(this.$route.params, 'this.$route.params')
      this.noticeid = this.$route.params.item.id
    }
    this.getcourse()
    this.getlessonresources() // 课程章节列表
    this.getcourseannouncement()
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
    Fcoursehead
  },
  methods: {
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
        that.courseheadinfo['teacher'] = courseObj.teacherName
        that.courseheadinfo['person'] = courseObj.stuCount
        that.courseheadinfo['scoleval'] = courseObj.stars
        that.courseheadinfo['wid'] = 135 / 5 * (courseObj.stars * 1)
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
          for (let item = 0; item < objs.length; item++) {
            temp[item] = {}
            temp[item]['id'] = objs[item]['id']
            temp[item]['title'] = objs[item]['name']
            temp[item]['content'] = objs[item]['content']
            temp[item]['dates'] = objs[item]['createdate']
          }
          that.noticelist = temp
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jump (path) {
      this.$router.push({path: path, query: {courseId: this.courseId}})
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
    openclose (ev) {
      let obj = ev.currentTarget
      if (obj.className.indexOf('icon-open') >= 0) {
        obj.className = obj.className.replace(/(icon-open)/gi, 'icon-close')
        obj.previousElementSibling.setAttribute('style', 'height:auto')
      } else {
        obj.className = obj.className.replace(/(icon-close)/gi, 'icon-open')
        obj.previousElementSibling.removeAttribute('style')
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
  },
  updated () {
    if (!this.scroll) {
      this.scroll = this.$Scroll({
        'father': 'couseannouncement',
        'getfatheridPosition': document.querySelector('#couseannouncement'),
        'scrollels': '.app'
      })
    } else {
      if (document.querySelector('#couseannouncement')) {
        this.scroll.addElement()
      }
    }
  }
}
</script>

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
            <span class="title">{{directoryinfo.directory}}</span>
          </div>
          <div class="directorylist" @click="jumptodetail(item)" v-for="item in directorylists">
            <span class="clas">{{item.clas}}</span>
            <span class="name" :title="item.name">{{item.name}}</span>
            <div class="type">
              <span class="txt" v-if="item.video > 0">{{item.video}}</span>
              <span class="types iconfont icon-video"  v-if="item.video > 0"></span>
              <span class="txt" v-if="item.files > 0">{{item.files}}</span>
              <span class="types iconfont icon-file" v-if="item.files > 0"></span>
              <span class="txt" v-if="item.pic > 0">{{item.pic}}</span>
              <span class="types iconfont icon-pic" v-if="item.pic > 0"></span>
              <span class="txt" v-if="item.screens > 0">{{item.screens}}</span>
              <span class="types iconfont icon-screen" v-if="item.screens > 0"></span>
              <span class="txt" v-if="item.audio > 0">{{item.audio}}</span>
              <span class="types iconfont icon-audio" v-if="item.audio > 0"></span>
            </div>
          </div>
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
import * as types from '@/store/win-types'
import {courseinfo, courseinfo1, directoryinfo, findcourseinfourl, lessonresourcesurl, courseannouncementurl, teachinggroupurl, getmyinteresturl, addinteresturl, delinteresturl, mystudycoursesurl, courseuserstudyurl} from '@/module/home/config/courseinfo'
export default {
  name: 'Fcoursedirectory',
  data () {
    return {
      courseobj: {},
      coursename: '',
      courseinfo: courseinfo,
      courseinfo1: courseinfo1,
      directoryinfo: directoryinfo,
      breadselected: ['', 'selected'],
      duserpath: '/static/images/D_user.png',
      courseheadinfo: {
        imgurl: '',
        title: '',
        person: 0,
        teacher: '',
        scoleval: 0,
        wid: 135 / 5 * 0
      },
      noticelist: [],
      chargelist: {
        imgurl: '',
        name: '',
        college: ''
      },
      chargelists: [],
      directorylists: [],
      focus: 0,
      startlearn: 0,
      courseId: location.hash.split('?')[1].split('=')[1],
      lessonId: ''
    }
  },
  created () {
    this.getcourse()
    this.getlessonresources()
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
    Fcoursehead
  },
  methods: {
    concatTime (obj) {
      if (obj) {
        return '-' + obj.substring(obj.lastIndexOf(':'), 0).replace(/-/g, '').replace(/\s/, '-')
      } else {
        return ''
      }
    },
    strlen (str, cutnum, ind) {
      var len = 0
      let j = 0
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i)
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
          len++
        } else {
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
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // 课程章节列表
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
        let temp = []
        let objs = res.data.lessonList
        let index = 0
        if (objs && objs.length > 0) {
          for (let item = 0; item < objs.length; item++) {
            if (objs[item]['ispush'] < 1) {
              continue
            }
            temp[index] = {}
            temp[index]['id'] = objs[item]['lessonId']
            temp[index]['lessonId'] = objs[item]['lessonId']
            temp[index]['clas'] = '第' + (item + 1) + '节'
            temp[index]['name'] = objs[item]['lessonName'] + that.concatTime(objs[item]['startTime'])
            temp[index]['video'] = objs[item]['videos']
            temp[index]['files'] = objs[item]['files']
            temp[index]['pic'] = objs[item]['pics']
            temp[index]['audio'] = objs[item]['audios']
            temp[index]['screens'] = objs[item]['screens']
            index++
          }
          that.lessonId = temp[0]['id']
          that.directorylists = temp
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
    jumptodetail (item) {
      if (item.video > 0 || item.pic > 0 || item.screens > 0 || item.files > 0 || item.audio > 0) {
        this.$router.push({name: 'FcourseDetail', query: {courseId: this.courseId, lessonId: item.id}})
      } else {
        this.win(directoryinfo.nothing, '', false)
      }
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
    this.courseobj = this.$route.params.course
    if (location.hash.indexOf('Fcourse') >= 0) {
      document.querySelector('a[href="#/Fcourse"]').setAttribute('class', 'a active')
    }
  }
}
</script>

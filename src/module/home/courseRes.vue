<template>
  <div class="app">
    <Ghead></Ghead>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Fcourse.css"/>
    <Link></Link>
    <div class="center centerbottom50" :style="'min-height:' + Mhei + 'px'">
      <div class="centers1100">
        <div class="searchline" style="margin-top: 30px;">
          <span class="news" style="width: 200px;box-shadow: none;">{{courseinfo.all}}</span>
          <div class="search" @click="jumpsearch">{{courseinfo.search}}</div>
          <input type="text" class="searchinput" :placeholder="courseinfo.searchinputplaceholder" v-model="searchinput" :value="searchinput"/>
        </div>
        <div class="searchrestitle">{{courseinfo.total}}{{total}}{{courseinfo.num}}{{searchinputval}}{{courseinfo.last}}</div>
        <div class="searchlist">
          <div v-if="item.ispush>0" class="list" v-for="(item, ind) in listinfo1" >
            <div class="img" @click="jumpdetail(item)">
              <img :src="item.imgurl ? item.imgurl : dcoursepath"/>
            </div>
            <span class="title hides" :title="item.coursename">{{item.coursename}}</span>
            <span class="textshow">
              <span class="hides">{{courseinfo.teacher1}}：{{item.teacher}}</span>
              <span class="hides" v-show="eduType">{{courseinfo.college}}：{{item.college ? item.college : courseinfo.no}}</span>
              <span class="hides" v-show="!eduType">{{courseinfo.grade}}：{{item.grade}}</span>
              <span class="hides" v-show="!eduType">{{courseinfo.subject}}：{{item.subject}}</span>
              <span class="hides">{{courseinfo.code}}：{{item.code}}</span>
            </span>
            <div class="info">
              <span class="infos hides" v-if="item.info">{{courseinfo.info}}：{{item.info}}</span>
              <span class="infos hides" v-if="!item.info">{{courseinfo.info}}：{{courseinfo.no}}</span>
              <div class="link" @click="jumpdetail(item)" v-show="showdetail[ind]">{{courseinfo.detail}}</div>
            </div>
            <div class="parts">
              <span class="span" @click="jumptodetail(lessonitem, item)" v-for="(lessonitem, ind) in item.lessons" >第{{ind+1}}节：{{lessonitem.lessonName}}</span>
              <span class="span" @click="jumpmore(item)">{{courseinfo.more}}</span>
            </div>
          </div>
          <span class="more" style="margin-bottom: 30px;" @click="pageadd" v-show="listinfo1show">{{courseinfo.showmore}}</span>
        </div>
      </div>
      <div class="nothing" v-if="!total">
        <div><img :src="nothingpath" alt=""/></div>
        <p>暂无相关结果</p>
        <p>换个关键词试试吧~</p>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/Homeheader'
import Gfoot from '@/components/common/footer'
import Link from '@/module/home/link'
import {courseinfo, products, courselearchlisturl, clickcourseurl} from '@/module/home/config/courseinfo'
export default {
  name: 'Fcourseres',
  data () {
    return {
      products: products,
      courseinfo: courseinfo,
      searchinput: '',
      searchinputval: '',
      listinfo1: [],
      dcoursepath: '/static/images/Dcourse.jpg',
      nothingpath: '/static/images/nothing.png',
      lessons: [],
      eduType: this.$store.state.educationType,
      total: 0,
      Mhei: window.innerHeight - 65 - 58 - 50,
      listinfo1show: false,
      pagesize: 5,
      pageval: 1,
      showdetail: []
    }
  },
  created () {
    this.searchinput = decodeURIComponent(this.geturlparam('inputval', location.hash))
    this.searchinputval = this.searchinput
    this.pagepost()
  },
  components: {
    Ghead,
    Gfoot,
    Link
  },
  methods: {
    pageadd () {
      this.pageval++
      this.pagepost()
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
    jumptodetail (lessonitem, item) {
      this.$router.push({name: 'FcourseDetail', query: {courseId: item.courseId, lessonId: lessonitem.lessonId}})
    },
    strlen (str, cutnum, ind) {
      var len = 0
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i)
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++
        } else {
          len += 2
        }
        if (cutnum) {
          if (len >= cutnum) {
            this.showdetail[ind] = true
          } else {
            this.showdetail[ind] = false
          }
        }
      }
    },
    pagepost (obj) {
      let that = this
      this.searchinputval = this.searchinput
      this.axios({
        method: 'post',
        url: courselearchlisturl,
        data: {
          keywords: that.searchinput
        }
      })
      .then(function (res) {
        that.total = 0
        let temp = []
        let objs = res.data.courseList
        that.totalpage = Math.ceil(objs.length / that.pagesize)
        if (that.totalpage > 1) {
          if (that.pageval >= that.totalpage) {
            that.listinfo1show = false
          } else {
            that.listinfo1show = true
          }
        } else {
          that.listinfo1show = false
        }
        for (let item = 0; item < (that.pageval * that.pagesize < objs.length ? that.pageval * that.pagesize : objs.length); item++) {
          temp[item] = {}
          temp[item]['courseId'] = objs[item]['courseId']
          temp[item]['coursename'] = objs[item]['courseName']
          temp[item]['code'] = objs[item]['courseNo']
          temp[item]['imgurl'] = (objs[item]['imgurl'] === null ? that.dcoursepath : objs[item]['imgurl'])
          temp[item]['teacher'] = objs[item]['teacherName']
          temp[item]['college'] = objs[item]['collegeName']
          temp[item]['grade'] = objs[item]['studySectionName']
          temp[item]['subject'] = objs[item]['subjectName']
          temp[item]['info'] = (objs[item]['description'] === null) ? '暂无' : objs[item]['description']
          temp[item]['lessons'] = (objs[item]['lessonList'].length > 3) ? objs[item]['lessonList'].slice(0, 3) : objs[item]['lessonList']
          temp[item]['course'] = objs[item]
          temp[item]['ispush'] = objs[item]['ispush']
          temp[item].selected = false
          that.strlen(temp[item]['info'], 104, item)
          objs[item]['ispush'] > 0 && that.total++
        }
        that.listinfo1 = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumpsearch () {
      this.pageval = 1
      this.$router.push({name: 'Fcourseres', query: {inputval: this.searchinput}})
      this.pagepost({keywords: this.searchinput})
    },
    jumpdetail (obj) {
      this.clickcourse(obj)
      this.$router.push({name: 'Fcourseintroduction', params: {course: obj}, query: {courseId: obj.courseId}})
    },
    jumpmore (obj) {
      this.clickcourse(obj)
      this.$router.push({name: 'Fcoursedirectory', params: {course: obj}, query: {courseId: obj.courseId}})
    },
    clickcourse (obj) {
      // post提交数据 增加点击量
      this.axios({
        method: 'post',
        url: clickcourseurl,
        data: {
          courseId: obj.courseId
        }
      })
      .then(function (res) {
        if (res.data) {
        }
      })
      .catch(function (error) {
        console.log(error)
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
<style type="text/css" scoped>
  .center .nothing{
    position: relative;
    text-align: center;
    -webkit-transform: translateY(150px);
    -moz-transform: translateY(150px);
    -ms-transform: translateY(150px);
    -o-transform: translateY(150px);
    transform: translateY(150px);
  }
  .center .nothing div{
    width: 139px; margin: 0 auto;
  }
  .center .nothing p{
    font-size: 16px;
    color: #d3d3d3;
    text-indent: 20px;
  }
</style>

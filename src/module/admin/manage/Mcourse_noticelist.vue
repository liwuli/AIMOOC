<template>
  <div class="app">
  	<Ghead></Ghead>
  	<link rel="stylesheet" type="text/css" href="../../../../static/css/default/Mcourse.css"/>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<div class="Firsttitle">{{courseName}}</div>
    		<div class="M_left" :style="'min-height:' + Mlefthei + 'px;'">
			 			<div class="Manage" v-for="(items, ind) in links">
			 				<span class="iconfont iconcss" :class="'icon-' + items.icon"></span>
			 				<router-link :key="ind"  class="a hides active" v-if="ind === 1"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 				<router-link :key="ind"  class="a hides" v-if="ind !== 1"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 			</div>
			  </div>
    		<div class="M_right"  :style="'min-height:' + Mlefthei + 'px;'">
    				<div class="mrightcreate" @click='jumpadd'>{{noticecreatebtnN}}</div>
    				<div class="mrightnoticelist" v-for="item in lists">
    					<div class="titleline">
    						<span class="titleicon icon-my-rili"></span>
    						<span class="title hides">{{item.dates}}</span>
    					</div>
    					<div class="content">
    					  <span class="title hides" :title="item.title">{{item.title}}</span>
    					  <span class="infos" v-html="item.content"></span>
    					</div>
    					<span class="open iconfont icon-open" @click='openclose($event)'></span>
    					<span class="edit iconfont icon-xiugai" @click='edit(item)'></span>
    					<span class="del iconfont icon-del" @click='del(item)'></span>
    				</div>
    				<page  :totalnum="totalnum" :bingo="bingo" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageval" :totalpage="pageinfo"></page>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
// import * as types from '@/store/win-types'
import Ghead from '@/components/common/Nheader'
import AJposition from '@/components/extend/position'
import page from '@/components/extend/page'
import {listurl, bingo, noticepagesize, pageval, pathinfo, noticecreatebtnN, links, FirsttitleN, optobj, listcoursenoticeurl} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManagenotice',
  data () {
    return {
      links: links,
      FirsttitleN: FirsttitleN,
      Mlefthei: window.innerHeight - 65 - 50,
      pathinfo: pathinfo,
      noticecreatebtnN: noticecreatebtnN,
      lists: [],
      bingo: bingo,
      totalpage: 0,
      pagesize: noticepagesize,
      pageval: pageval,
      courseId: '',
      courseName: '',
      totalnum: 0
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
    this.pagepost({page: 1})
    this.getcoursename()
  },
  components: {
    Ghead,
    AJposition,
    page
  },
  methods: {
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
    getcoursename () {
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        let obj = res.data
        that.courseName = obj.courseName
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    openclose (ev) {
      let classobj = ev.currentTarget
      let parentobj = classobj.parentElement || classobj.parentNode
      if (classobj.className.indexOf('icon-open') >= 0) {
        classobj.className = classobj.className.replace(/(icon-open)/gi, 'icon-close')
        parentobj.querySelector('.infos').setAttribute('style', 'height:auto')
      } else {
        classobj.className = classobj.className.replace(/(icon-close)/gi, 'icon-open')
        parentobj.querySelector('.infos').removeAttribute('style')
      }
    },
    edit (item) {
      this.$router.push({'name': this.pathinfo.prex + 'noticeedit', params: {noticeedit: 'noticeedit', item: item, courseId: this.courseId}, query: {courseId: this.courseId, content: this.content, title: this.title}})
    },
    del (item) {
      this.$router.push({'name': this.pathinfo.prex + 'noticedel', params: {noticedel: 'noticedel', item: item, courseId: this.courseId}, query: {courseId: this.courseId, id: this.id}})
    },
    pagepost (obj) {
      let that = this
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      this.axios({
        method: 'post',
        url: listcoursenoticeurl,
        data: {
          page: {
            courseId: that.courseId,
            pageSize: obj.pagesize ? obj.pagesize : that.pagesize,
            pageIndex: obj.page
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.result.total / that.pagesize)
        that.totalnum = res.data.result.total
        let temp = []
        let objs = res.data.result.CourseAnnouncementList
        for (let item = 0; item < objs.length; item++) {
          if (item < that.pagesize) {
            temp[item] = {}
            temp[item]['dates'] = objs[item].createdate
            temp[item]['title'] = objs[item].name
            temp[item]['content'] = objs[item].content
            temp[item]['id'] = objs[item].id
            temp[item].opt = optobj
            temp[item].selected = false
          }
        }
        that.lists = temp
        that.bingos = ['']
        that.bingos.splice(obj.page - 1, 1, 'selected')
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumpadd () {
      this.$router.push({'name': this.pathinfo.prex + 'noticeadd', params: {noticeadd: 'noticeadd', courseId: this.courseId}, query: {courseId: this.courseId}})
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJcourseManagenotice') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

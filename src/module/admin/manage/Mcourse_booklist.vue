<template>
  <div class="app">
  	<Ghead></Ghead>
  	<link rel="stylesheet" type="text/css" href="/static/css/default/Mcourse.css"/>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<div class="Firsttitle">{{courseName}}</div>
    		<div class="M_left" :style="'min-height:' + Mlefthei + 'px;'">
			 			<div class="Manage" v-for="(items, ind) in links">
			 				<span class="iconfont iconcss" :class="'icon-' + items.icon"></span>
			 				<router-link :key="ind"  class="a hides active" v-if="ind === 6"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 				<router-link :key="ind"  class="a hides" v-if="ind !== 6"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 			</div>
			  </div>
    		<div class="M_right"  :style="'min-height:' + Mlefthei + 'px;'">
    			<div class="mrightcreate" @click='jumpadd' style="margin-left: 0;">{{bookinfo.bookaddbtnN}}</div>
    			<div class="teacherchargetitle">{{bookinfo.booktitle}}</div>
    			<!--<div class="teacherchargetitle">{{bookinfo.courseteacher}}</div>-->
    			<div class="books" style="border: none;">
    				<div class="list" v-if="bookinfos.length > 0" v-for="(item, ind) in bookinfos">
    					<div class="img">
    						{{bookinfo.defaultval}}
    						<img :src="item.imgurl ? item.imgurl : dbookpath" />
    					</div>
    					<div class="txtlist">
    						<span class="name hides">{{item.name}}</span>
    						<span class="editor">{{item.editor}}</span>
    						<span class="editor">{{item.publisheditor}}</span>
    						<span class="edit iconfont icon-xiugai " @click="edit(item, ind)"></span>
    						<span class="del iconfont icon-del " @click="del(item, ind)"></span>
    					</div>
    					<div class="fileback" @click="selectfn(item, ind)">{{bookinfo.upload}}</div>
    				</div>
    				<div class="nodata" v-if="bookinfos.length <= 0">
    					{{bookinfo.nodata}}
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
import Ghead from '@/components/common/Nheader'
import AJposition from '@/components/extend/position'
import {listurl, booklisturl, pathinfo, bookinfo, links, FirsttitleN} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManagebook',
  data () {
    return {
      links: links,
      FirsttitleN: FirsttitleN,
      Mlefthei: window.innerHeight - 65 - 50,
      pathinfo: pathinfo,
      bookinfo: bookinfo,
      dbookpath: '/static/images/D_U_book.png',
      bookinfos: [],
      courseId: '',
      courseName: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
    // aixos pagepost请求 用户列表数据
    this.pagepost({page: 1})
    this.getcoursename()
  },
  components: {
    Ghead,
    AJposition
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
    del (item) {
      this.$router.push({'name': this.pathinfo.prex + 'bookdel', params: {bookdel: 'bookdel', item: item, courseId: this.courseId}, query: {courseId: this.courseId}})
    },
    edit (item) {
      this.$router.push({'name': this.pathinfo.prex + 'bookedit', params: {bookedit: 'bookedit', item: item, courseId: this.courseId}, query: {courseId: this.courseId}})
    },
    selectfn (item, ind) {
      this.$router.push({'name': this.pathinfo.prex + 'bookupload', params: {bookupload: 'bookupload', item: item, ind: ind}, query: {courseId: this.courseId}})
    },
    pagepost () {
      let that = this
      this.axios({
        method: 'post',
        url: booklisturl,
        params: {
          params: {
            courseId: that.courseId
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.result.CoursesTextbookList
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].id
          temp[item]['imgurl'] = objs[item].cover
          temp[item]['editor'] = objs[item].author
          temp[item]['publisheditor'] = objs[item].publishInfo
          temp[item]['name'] = objs[item].bookName
        }
        that.bookinfos = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumpadd () {
      this.$router.push({'name': this.pathinfo.prex + 'bookadd', params: {bookadd: 'bookadd'}, query: {courseId: this.courseId}})
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJcourseManagebook') {
        this.pagepost()
      }
    }
  }
}
</script>

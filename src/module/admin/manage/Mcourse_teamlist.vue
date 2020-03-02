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
			 				<router-link :key="ind"  class="a hides active" v-if="ind === 5"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 				<router-link :key="ind"  class="a hides" v-if="ind !== 5"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 			</div>
			  </div>
    		<div class="M_right"  :style="'min-height:' + Mlefthei + 'px;'">
    			<div class="mrightcreate" @click='jumpadd' style="margin-left: 0;">{{teaminfo.teamteacherbtnN}}</div>
    			<div class="teacherchargetitle">{{teaminfo.teacherchargetitle}}</div>
    			<div class="teamcharge">
    				<div class="list">
    					<div class="img">
    				  	<img  :src="teacherchargeimgurl ? teacherchargeimgurl : duserpath"/>
    				  </div>
    					<span class="text hides">{{teacherchargedes}}</span>
    				</div>
    			</div>
    			<div class="teacherchargetitle">{{teaminfo.courseteacher}}</div>
    			<div class="teamcharge" style="border: none;">
    				<div class="list" v-if="userinfos.length > 0" v-for="(item, ind) in userinfos">
    				  <div class="img">
    				  	<img  :src="item.imgurl ? item.imgurl : duserpath"/>
    				  </div>
    					<span class="text hides" :title="item.des">{{item.des}}</span>
    					<span class="del iconfont icon-del" v-if="ind !== 0" @click="del(item)"></span>
    				</div>
    				<div class="nodata" v-if="userinfos.length <= 0">
    					{{teaminfo.nodata}}
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
// import * as types from '@/store/win-types'
import Ghead from '@/components/common/Nheader'
import AJposition from '@/components/extend/position'
import {listurl, teamlisturl, pathinfo, teaminfo, links, FirsttitleN} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManageteam',
  data () {
    return {
      links: links,
      FirsttitleN: FirsttitleN,
      teacherchargeimgurl: '',
      teacherchargedes: '',
      Mlefthei: window.innerHeight - 65 - 50,
      pathinfo: pathinfo,
      teaminfo: teaminfo,
      userinfos: [],
      courseId: location.hash.split('?')[1].split('=')[1],
      courseName: '',
      duserpath: '/static/images/D_user.png'
    }
  },
  created () {
    // aixos pagepost请求 用户列表数据
    this.pagepost()
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
    del (item) {
      this.$router.push({'name': this.pathinfo.prex + 'teamdel', params: {noticedel: 'noticedel', item: item, courseId: this.courseId}, query: {courseId: this.courseId}})
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
    pagepost () {
      let that = this
      this.axios({
        method: 'post',
        url: teamlisturl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
//      console.log(res, 'res from team')
        that.userinfos = []
        that.userinfos.push({imgurl: res.data.result.header.picture, id: '', des: res.data.result.header.realName})
        let objs = res.data.result.teacherList
        for (let item = 0; item < objs.length; item++) {
          that.userinfos.push({imgurl: objs[item].picture, id: objs[item].id, des: objs[item].realName})
        }
        // axiox提交请求用户数据, 赋值teacherchargeimgurl，teacherchargedes
        that.teacherchargeimgurl = res.data.result.header.picture
        that.teacherchargedes = res.data.result.header.realName
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumpadd () {
//    console.log('跳转添加', this.pathinfo.prex + 'noticeadd')
      this.$router.push({'name': this.pathinfo.prex + 'teamadd', params: {teamadd: 'teamadd'}, query: {courseId: this.courseId}})
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJcourseManageteam') {
        this.pagepost()
      }
    }
  }
}
</script>

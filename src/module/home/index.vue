<template>
  <div class="app">
  	<Ghead></Ghead>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <Links></Links>
    <div class="G_home_hd" v-show="bannerlist.length > 0">
    	<div class="hdcenters">
				<a v-show="bannerlistshow[ind]" :href="item.urls" v-for="(item, ind) in bannerlist">
					<img :src="item.imgurl"/>
				</a>
				<div class="txtpart">
					<a class="a" :href="item.urls" @mouseover="bannerchange(ind)" v-for="(item, ind) in bannerlist" :title="item.name">{{item.name}}</a>
				</div>
			</div>
    </div>
    <div class="row centers1200" :style="'min-height:' + (bannerlist.length > 0 ? (minhei - 505) : minhei) + 'px;'">
    	<div class="centers">
    		<div class="G_home_listpart">
    			<div class="head">
	    			<span class="headicon iconfont icon-homecourse"  @click="jumpto('Fcourse')"></span>
	    			<span class="txt" @click="jumpto('Fcourse')">{{homeinfo.homecourse}}</span>
	    			<span class="more" @click="jumpto('Fcourse')">{{homeinfo.more}}</span>
	    		</div>
	    		<div class="list" @click="jumpto('Fcourseintroduction', item)" v-for="(item, ind) in courselist" :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right:0px' : ''">
	    			<div class="img">
	    				<img :src="item.imgurl ? item.imgurl : dcoursepath" alt="" />
	    			</div>
	    			<div class="txtline hides" :title="item.title">
	    				{{item.title}}
	    			</div>
	    			<div class="txtline hides">
	    				<span class="person iconfont icon-master"></span>
	    				{{item.name}}
	    			</div>
	    			<div class="cover">
	    				<span class="title hides" :title="item.title">{{item.title}}</span>
	    				<span class="name hides">{{item.name}}</span>
	    			</div>
	    		</div>
    		</div>
    		<div class="G_home_listpart" style="margin-bottom: 30px;">
    			<div class="head">
	    			<span class="headicon iconfont icon-homelive" @click="jumpto('Fliveliving')"></span>
	    			<span class="txt" @click="jumpto('Fliveliving')">{{homeinfo.homelive}}</span>
	    			<span class="more" @click="jumpto('Fliveliving')">{{homeinfo.more}}</span>
	    		</div>
	    		<div class="list" @click="jumpto((item.liveStatus === 1 ? 'Flivedetail' : 'Fliveoverdetail'), item)"  v-for="(item, ind) in livelist" :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right:0px' : ''">
	    			<div class="img">
	    				<img :src="item.imgurl ? item.imgurl : dlivepath" alt="" />
	    			</div>
	    			<div class="txtline hides" :title="item.title">
	    				{{item.title}}
	    			</div>
	    			<div class="txtline hides">
	    				<span class="person iconfont icon-master"></span>
	    				{{item.name}}
	    			</div>
	    			<div class="cover">
	    				<span class="title hides" :title="item.title">{{item.title}}</span>
	    				<span class="name hides">{{item.name}}</span>
	    			</div>
	    		</div>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/Homeheader'
import Gfoot from '@/components/common/footer'
import Links from '@/module/home/link'
import {liveurl, courseurl, bannerurl, homeinfo} from '@/module/home/config/index'
export default {
  name: 'AJhome',
  data () {
    return {
      bannerlist: [],
      bannerlistshow: [],
      homeinfo: homeinfo,
      courselist: [],
      livelist: [],
      dcoursepath: '/static/images/Dcourse.jpg',
      dlivepath: '/static/images/Dlive.jpg',
      minhei: window.innerHeight - 65 - 50
    }
  },
  created () {
    this.getbannerlist()
    this.getcouse()
    this.getlive()
  },
  components: {
    Ghead,
    Gfoot,
    Links
  },
  methods: {
    jumpto (param, item) {
      switch (param) {
        case 'Fcourse':
        case 'Fliveliving':
          this.$router.push({name: param})
          break
        case 'Flive':
          this.$router.push({name: param})
          break
        case 'Fcourseintroduction':
          this.$router.push({name: param, query: {courseId: item.id}})
          break
        case 'Flivedetail':
          this.$router.push({name: param, query: {liveid: item.id}})
          break
        case 'Fliveoverdetail':
          this.$router.push({name: param, query: {liveid: item.id}})
          break
      }
    },
    bannerchange (ind) {
      for (let item = 0; item < this.bannerlistshow.length; item++) {
        if (this.bannerlistshow[item]) {
          this.bannerlistshow.splice(item, 1, false)
        }
      }
      this.bannerlistshow.splice(ind, 1, true)
    },
    getbannerlist () {
      let that = this
       // 课程筛选条件
      this.axios({
        method: 'post',
        url: bannerurl,
        params: {
          par: {
            status: 1
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].bannerId
          temp[item]['name'] = objs[item].description
          temp[item]['imgurl'] = objs[item].bannerUrl
          temp[item]['urls'] = objs[item].imgUrl
          that.bannerlistshow[item] = false
        }
        that.bannerlistshow[0] = true
        that.bannerlist = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getcouse () {
      let that = this
       // 课程筛选条件
      this.axios({
        method: 'post',
        url: courseurl
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          if (objs[item].ispush <= 0) {
            continue
          }
          temp.push({
            id: objs[item].id,
            name: objs[item].teacherName,
            imgurl: objs[item].imgurl === ' ' ? '' : objs[item].imgurl,
            title: objs[item].name,
            ispush: objs[item].ispush || 0
          })
        }
        that.courselist = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getlive () {
      let that = this
       // 课程筛选条件
      this.axios({
        method: 'post',
        url: liveurl
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].liveId
          temp[item]['name'] = objs[item].adminName
          temp[item]['imgurl'] = objs[item].image
          temp[item]['title'] = objs[item].liveName
          temp[item]['liveStatus'] = objs[item].liveStatus
        }
        that.livelist = temp
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
    }
  }
}
</script>

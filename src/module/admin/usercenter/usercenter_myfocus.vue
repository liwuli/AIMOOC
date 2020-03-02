<template>
  <div class="app">
  	<Ghead></Ghead>
  	<link rel="stylesheet" type="text/css" href="../../../../static/css/default/Usercenter.css"/>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<div class="U_left" :style="'min-height:' + Mlefthei + 'px;'">
    			<div class="userinfo">
    				<div class="img" @click="jumptobasicupload">
    					<img v-if="!allurl" :src="userinfo.picture ? userinfo.picture : duserpath"/>
    					<img v-if="allurl" :src="allurl"/>
    					<div class="hover">
    						<span class="showicon iconfont icon-xiugai"></span>
    					</div>
    				</div>
    				<div class="name">{{userinfo.userName}}</div>
    				<!--<div class="edit iconfont icon-xiugai"></div>-->
    			</div>
		 			<div class="Manage" v-for="(items, ind) in links">
		 				<span class="iconfont iconcssed" :class="'icon-' + items.icon" v-if="ind === 4" ></span>
		 				<span class="iconfont iconcss" :class="'icon-' + items.icon" v-if="ind !== 4" ></span>
		 				<router-link :key="ind" class="a hides active" v-if="ind === 4" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
		 				<router-link :key="ind" class="a hides" v-if="ind !== 4 && ind !== 6" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
		 				<!--<a :href="editurl"  class="a hides" v-if="ind === 5"  target="_blank">{{items.name}}</a>-->
		 			</div>
			  </div>
    		<div class="U_right"  :style="'min-height:' + Mlefthei + 'px;'">
    				<div class="allmessage">{{focusinfo.head}}</div>
    				<div class="left30">
    					<div class="focuslist" @click="jumpto(item)" :style="(ind + 1) % 3 === 0? 'margin-right:0' : ''" v-for="(item, ind) in focuslist">
	    					<div class="img">
	    						<img :src="item.imgurl ? item.imgurl : dcoursepath"/>
	    					</div>
	    					<div class="teacherline">
	    						<span class="left  hides">{{focusinfo.teacher}}:{{item.teacher}}</span>
	    						<span class="right  hides">{{item.num}}{{focusinfo.person}}</span>
	    					</div>
	    					<span class="coursename" v-if="item.code">{{item.name}}({{item.code}})</span>
	    					<span class="coursename" v-if="!item.code">{{item.name}}</span>
	    					<span class="date">{{item.date}}</span>
	    				</div>
	    				<page  :totalnum="totalnum" :bingo="bingos" :pagestyles="pagestyles" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage" ></page>
    				</div>

    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/Nheader'
import AJposition from '@/components/extend/position'
import page from '@/components/extend/page'
import {myfocuscourseurl, links, focusinfo} from '@/module/admin/usercenter/config/usercenterinfo'
export default {
  name: 'AJusercenterfocus',
  data () {
    return {
      links: links,
      focusinfo: focusinfo,
      pagesize: 9,
      pageindex: 1,
      totalpage: 0,
      bingos: [],
      pagestyles: 'margin-left:30px',
      Mlefthei: window.innerHeight - 65,
      focuslist: [],
      userinfo: {},
      totalnum: 0,
      allurl: '',
      editurl: '',
      dcoursepath: '/static/images/Dcourse.jpg',
      duserpath: '/static/images/D_user.png'
    }
  },
  created () {
    // 获取我的关注列表
    this.pagepost({page: 1})
    this.userinfo = Object.assign({}, this.$store.state.userinfo)
    this.editurl = 'http://192.168.20.152:9026/?token=' + this.userinfo.userName
  },
  components: {
    Ghead,
    AJposition,
    page
  },
  methods: {
    jumptobasicupload () {
      this.$router.push({name: 'AJusercenterbasicupload', query: {name: 'AJusercenterfocus'}})
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      let that = this
      this.pageindex = obj.page
      this.axios({
        method: 'post',
        url: myfocuscourseurl,
        params: {
          par: {
            userId: that.$store.state.userinfo.id
          }
        }
      })
      .then(function (res) {
        that.focuslist = []
        let temp = []
        let objs = res.data.data
        that.totalpage = Math.ceil(objs.length / that.pagesize)
        that.totalnum = objs.length
        let start = (that.pageindex - 1) * that.pagesize
        for (let item = start; item < (that.pageindex * that.pagesize < objs.length ? that.pageindex * that.pagesize : objs.length); item++) {
          temp[item - start] = {}
          temp[item - start]['date'] = objs[item].createDate.substring(0, objs[item].createDate.length - 3)
          temp[item - start]['imgurl'] = objs[item].imgurl
          temp[item - start]['teacher'] = objs[item].teacherName
          temp[item - start]['num'] = objs[item].viewers
          temp[item - start]['code'] = objs[item].code
          temp[item - start]['name'] = objs[item].courseName
          temp[item - start]['visitUrl'] = objs[item].visitUrl
        }
        that.bingos = []
        that.bingos[that.pageindex - 1] = 'selected'
        that.focuslist = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumpto (item) {
      location.href = item.visitUrl
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
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJusercenterfocus') {
        if (to.params.geturl) {
          this.allurl = to.params.allurl
        }
        this.pagepost({page: this.pageindex})
      }
    }
  }
}
</script>

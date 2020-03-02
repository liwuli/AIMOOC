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
		 				<span class="iconfont iconcssed" :class="'icon-' + items.icon" v-if="ind === 2" ></span>
		 				<span class="iconfont iconcss" :class="'icon-' + items.icon" v-if="ind !== 2" ></span>
		 				<router-link :key="ind" class="a hides active" v-if="ind === 2" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
		 				<router-link :key="ind" class="a hides" v-if="ind !== 2 && ind !== 6" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
		 				<!--<a :href="editurl" class="a hides" v-if="ind === 5"  target="_blank">{{items.name}}</a>-->
		 			</div>
			  </div>
    		<div class="U_right"  :style="'min-height:' + Mlefthei + 'px;'">
    				<div class="tab">
    					<span :class="tabselect[ind]" v-for="(item, ind) in collecttab" @click="changedata(ind)">{{item.name}}</span>
    				</div>
    				<div class="left30" v-show="!changetabflag">
    					<div class="booklist":style="(ind + 1) % 3 === 0? 'margin-right:0' : ''" v-for="(item, ind) in booklist">
	    					<div class="img"  @click="jumptocoursedetail(item)" >
	    						<img :src="item.imgurl ? item.imgurl : dcoursepath"/>
	    					</div>
	    					<div class="teacherline">
	    						<span class="left  hides">{{focusinfo.teacher}}:{{item.teacher}}</span>
	    						<span class="right  hides">{{item.num}}{{focusinfo.person}}</span>
	    					</div>
	    					<span class="coursename hides" @click="jumptocoursedetail(item)"  v-if="item.code">{{item.name}}({{item.code}})</span>
	    					<span class="coursename hides" @click="jumptocoursedetail(item)"  v-if="!item.code">{{item.name}}</span>
	    					<span class="date">{{item.date}}</span>
	    				</div>
	    				<page  :totalnum="totalnum" :bingo="bingos" :pagestyles="pagestyles" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage" ></page>
    				</div>
    				<div class="left30" v-show="changetabflag">
    					<div class="booklist" :style="(ind + 1) % 3 === 0? 'margin-right:0;height:225px' : 'height:225px'" v-for="(item, ind) in booklist1">
	    					<div class="img" @click="jumptocoursedetail(item)" >
	    						<img :src="item.imgurl ? item.imgurl : dcoursepath"/>
	    					</div>
	    					<div class="teacherline">
	    						<span class="left  hides">{{focusinfo.scole}}:{{item.scole}}</span>
	    						<span class="right  hides">{{item.num}}{{focusinfo.person}}</span>
	    					</div>
	    					<span class="coursename hides" @click="jumptocoursedetail(item)"  v-if="item.code">{{item.name}}({{item.code}})</span>
	    					<span class="coursename hides"  @click="jumptocoursedetail(item)" v-if="!item.code">{{item.name}}</span>
	    					<span class="managebtn" @click="jumptomanage(item)">{{focusinfo.manage}}</span>
	    				</div>
	    				<page :totalnum="totalnum1" :bingo="bingos1" :pagestyles="pagestyles" @pagepost="pagepost1" :pagesize="pagesize1" :pageindex="pageindex1" :totalpage="totalpage1" ></page>
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
import {mychargeurl, incouseurl, liveinfo, links, focusinfo, collectbooksdudenttab, collectbooktab, collectinfo} from '@/module/admin/usercenter/config/usercenterinfo'
export default {
  name: 'AJusercenterbook',
  data () {
    return {
      links: links,
      collecttab: [],
      liveinfo: liveinfo,
      focusinfo: focusinfo,
      collectinfo: collectinfo,
      Mlefthei: window.innerHeight - 65,
      iconstyle: 'margin-left:-30px',
      inputstyle: 'width:135px',
      booklist: [],
      booklist1: [],
      pagesize: 9,
      pageindex: 1,
      totalpage: 0,
      bingos: [],
      pagesize1: 6,
      pageindex1: 1,
      totalpage1: 0,
      bingos1: [],
      pagestyles: 'margin-left:30px',
      tabselect: ['span', ''],
      searchval: '',
      searchval1: '',
      changetabflag: false,
      state: '',
      userinfo: {},
      totalnum: 0,
      totalnum1: 0,
      allurl: '',
      editurl: '',
      dcoursepath: '/static/images/Dcourse.jpg',
      duserpath: '/static/images/D_user.png'
    }
  },
  created () {
    this.userinfo = Object.assign({}, this.$store.state.userinfo)
    this.editurl = 'http://192.168.20.152:9026/?token=' + this.userinfo.userName
    if (this.userinfo.roleType !== 3) {
      this.collecttab = collectbooktab
      // 获取我负责的课程
      this.pagepost1({page: 1})
    } else {
      this.collecttab = collectbooksdudenttab
    }
    // 获取我加入的课程
    this.pagepost({page: 1})
  },
  components: {
    Ghead,
    AJposition,
    page
  },
  methods: {
    jumptobasicupload () {
      this.$router.push({name: 'AJusercenterbookupload', query: {name: 'AJusercenterbook'}})
    },
    jumptocoursedetail (item) {
      this.$router.push({name: 'Fcourseintroduction', query: {'courseId': item.id}})
    },
    jumptomanage (item) {
      this.$router.push({name: 'AJcourseManage', query: {'courseId': item.id}})
    },
    changedata (ind) {
      this.tabselect = ['', '']
      this.tabselect.splice(ind, 1, 'span')
      if (ind === 1) {
        this.changetabflag = true
      } else {
        this.changetabflag = false
      }
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      let that = this
      this.pageindex = obj.page
      this.axios({
        method: 'post',
        url: incouseurl,
        data: {
          userId: that.$store.state.userinfo.id
        }
      })
      .then(function (res) {
        that.booklist = []
        let temp = []
        let objs = res.data.myCourseList
        that.totalpage = Math.ceil(objs.length / that.pagesize)
        that.totalnum = objs.length
        let start = (that.pageindex - 1) * that.pagesize
        for (let item = start; item < (that.pageindex * that.pagesize < objs.length ? that.pageindex * that.pagesize : objs.length); item++) {
          temp[item - start] = {}
          temp[item - start]['date'] = objs[item].lastupdatedate.substring(0, objs[item].createdate.length - 3)
          temp[item - start]['imgurl'] = objs[item].fileUrl
          temp[item - start]['teacher'] = objs[item].teacherName
          temp[item - start]['name'] = objs[item].name
          temp[item - start]['num'] = objs[item].clicks
          temp[item - start]['code'] = objs[item].code
          temp[item - start]['id'] = objs[item].id
        }
        that.bingos = []
        that.bingos[that.pageindex - 1] = 'selected'
        that.booklist = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    pagepost1 (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      let that = this
      this.pageindex1 = obj.page
      this.axios({
        method: 'post',
        url: mychargeurl,
        data: {
          userId: that.$store.state.userinfo.id
        }
      })
      .then(function (res) {
        that.booklist1 = []
        let temp = []
        let objs = res.data.myCourseList
        that.totalpage1 = Math.ceil(objs.length / that.pagesize)
        that.totalnum1 = objs.length
        let start = (that.pageindex1 - 1) * that.pagesize
        for (let item = start; item < (that.pageindex1 * that.pagesize < objs.length ? that.pageindex1 * that.pagesize : objs.length); item++) {
          temp[item - start] = {}
          temp[item - start]['date'] = objs[item].createdate.substring(0, objs[item].createdate.length - 3)
          temp[item - start]['imgurl'] = objs[item].fileUrl
          temp[item - start]['teacher'] = objs[item].teacherName
          temp[item - start]['name'] = objs[item].name
          temp[item - start]['num'] = objs[item].clicks
          temp[item - start]['code'] = objs[item].code
          temp[item - start]['id'] = objs[item].courseId
          temp[item - start]['scole'] = objs[item].stars
        }
        that.bingos1 = []
        that.bingos1[that.pageindex1 - 1] = 'selected'
        that.booklist1 = temp
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
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJusercenterbook') {
        this.pagepost({page: this.pageindex})
      }
      if (to.params.geturl) {
        this.allurl = to.params.allurl
      }
    }
  }
}
</script>

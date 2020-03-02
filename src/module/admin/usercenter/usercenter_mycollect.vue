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
		 				<span class="iconfont iconcssed" :class="'icon-' + items.icon" v-if="ind === 3" ></span>
		 				<span class="iconfont iconcss" :class="'icon-' + items.icon" v-if="ind !== 3" ></span>
		 				<router-link :key="ind" class="a hides active" v-if="ind === 3" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
		 				<router-link :key="ind" class="a hides" v-if="ind !== 3 && ind !== 6" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
		 				<!--<a :href="editurl"  class="a hides"  v-if="ind === 5"  target="_blank">{{items.name}}</a>-->
		 			</div>
			  </div>
    		<div class="U_right"  :style="'min-height:' + Mlefthei + 'px;'">
    				<div class="tab">
    					<span :class="tabselect[ind]" v-for="(item, ind) in collecttab" @click="changedata(ind)">{{item.name}}</span>
    				</div>
    				<div class="left30" v-show="!changetabflag">
    					<div class="search" id="search">
    						<span class="txt">{{collectinfo.dateN}}：</span>
    						<Calendarme :inputstyle="inputstyle" :iconstyle="iconstyle"  :part="part" :valshow="svalshow" :ymdhms="ymdhms" :dateval="sydate"  @startfn="startfn" :ids="start"></Calendarme>
    						<span class="to">{{collectinfo.toN}}</span>
    						<Calendarme :inputstyle="inputstyle" :iconstyle="iconstyle" :part="part" :valshow="evalshow" :ymdhms="ymdhms" :dateval="eydate"  @endfn="endfn" :ids="end"></Calendarme>
    						<input type="text" class="input" v-model="searchval"/>
    						<div class="searchbtn" @click="pagepost({page: 1})">{{collectinfo.searchbtn}}</div>
    						<div class="secondline">
    							<span class="to" style="margin-left: 0;">{{collectinfo.total}}</span>
    							<span class="to blue" style="margin: 0;">{{totalnum0}}</span>
    							<span class="to" >{{collectinfo.resdes}}</span>
    						</div>
    					</div>
    					<div class="collectlist" @click="jumpto(item)" v-for="(item, ind) in collectlist">
	    					<div class="img">
	    						<img :src="item.imgurl ? item.imgurl : dcoursepath"/>
	    					</div>
	    					<span class="coursename hides" :title="item.name">{{item.name}}</span>
	    					<span class="coursename hides" :title="item.type">{{collectinfo.type}}:{{item.type}}</span>
	    					<span class="coursename hides" style="margin-bottom: 0;" :title="item.date">{{collectinfo.date}}:{{item.date}}</span>
	    				</div>
	    				<page  :totalnum="totalnum0" :bingo="bingos" :pagestyles="pagestyles" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage" ></page>
    				</div>
    				<div class="left30" v-show="changetabflag">
    					<div class="search" >
    						<span class="txt">{{collectinfo.dateN}}：</span>
    						<Calendarme :inputstyle="inputstyle" :iconstyle="iconstyle"  :part="part" :valshow="ssvalshow" :ymdhms="ymdhms" :dateval="ssydate"  @sstartfn="sstartfn" :ids="sstart"></Calendarme>
    						<span class="to">{{collectinfo.toN}}</span>
    						<Calendarme :inputstyle="inputstyle" :iconstyle="iconstyle" :part="part" :valshow="eevalshow" :ymdhms="ymdhms" :dateval="eeydate"  @eendfn="eendfn" :ids="eend"></Calendarme>
    						<input type="text" class="input" v-model="searchval1"/>
    						<div class="searchbtn" @click="pagepost1({page: 1})">{{collectinfo.searchbtn}}</div>
    						<div class="secondline">
    							<span class="txt">{{collectinfo.livestate}}：</span>
    							<div id='select0' style="width: 150px;float:left;margin-right: 20px;height: 25px;line-height: 25px;" ></div>
    							<div style="float: right;">
    								<span class="to" style="margin-left: 0;">{{collectinfo.total}}</span>
	    							<span class="to blue" style="margin: 0;">{{totalnum1}}</span>
	    							<span class="to" style="margin-right: 0;">{{collectinfo.resdeslive}}</span>
    							</div>
    						</div>
    					</div>
    					<div class="collectlivelist"  v-for="(item, ind) in collectlivelist">
	    					<div class="img" @click="jumptolivedetail(item)">
	    						<img :src="item.imgurl ? item.imgurl : dlivepath"/>
	    					</div>
	    					<span class="name hides" :title="item.coursename">{{item.coursename}}</span>
	    					<div class="person hides">
	    						<span class="iconfont admin icon-master"></span>
	    						<span class="adminname">{{item.name}}</span>
	    					</div>
	    					<span class="del iconfont icon-dellist" @click="cancelcollect(item)"></span>
	    					<div class="bluepart" v-if="item.type === 1">{{liveinfo.living}}</div>
				        <div class="greenpart" v-if="item.type === 0">{{liveinfo.wait}}</div>
				        <div class="yellowpart" v-if="item.type === 2 && item.recordval !== 0">{{liveinfo.lived}}</div>
				        <div class="failedpart" v-if="item.type === 2 && item.recordval === 0">{{liveinfo.fail}}</div>
	    				</div>
	    				<page  :totalnum="totalnum1" :bingo="bingos1" :pagestyles="pagestyles" @pagepost="pagepost1" :pagesize="pagesize1" :pageindex="pageindex1" :totalpage="totalpage1" ></page>
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
import Calendarme from '@/components/extend/calendar.vue'
import page from '@/components/extend/page'
import {restype, warntxt, collectliveurl, collecturl, liveselectinfo, liveinfo, links, collecttab, collectinfo} from '@/module/admin/usercenter/config/usercenterinfo'
export default {
  name: 'AJusercentercollect',
  data () {
    return {
      links: links,
      collecttab: collecttab,
      liveinfo: liveinfo,
      collectinfo: collectinfo,
      Mlefthei: window.innerHeight - 65,
      iconstyle: 'margin-left:-30px',
      inputstyle: 'width:135px',
      collectlist: [],
      collectlivelist: [],
      pagesize: 9,
      pageindex: 1,
      totalpage: 0,
      bingos: [],
      pagesize1: 9,
      pageindex1: 1,
      totalpage1: 0,
      bingos1: [],
      pagestyles: 'margin-left:0px',
      tabselect: ['span', ''],
      svalshow: false,
      evalshow: false,
      start: 'start',
      end: 'end',
      ssvalshow: false,
      eevalshow: false,
      sstart: 'sstart',
      eend: 'eend',
      ymdhms: 'ymd',
      sydate: '',
      eydate: '',
      ssydate: '',
      eeydate: '',
      part: document.body,
      searchval: '',
      searchval1: '',
      changetabflag: false,
      state: '',
      userinfo: {},
      totalnum0: 0,
      totalnum1: 0,
      allurl: '',
      editurl: '',
      dcoursepath: '/static/images/Dcourse.jpg',
      dlivepath: '/static/images/Dlive.jpg',
      duserpath: '/static/images/D_user.png'
    }
  },
  created () {
    this.userinfo = Object.assign({}, this.$store.state.userinfo)
    this.editurl = 'http://192.168.20.152:9026/?token=' + this.userinfo.userName
    // 获取我的收藏 资源列表
    this.pagepost({page: 1})
    // 获取我的收藏直播列表
    this.pagepost1({page: 1})
  },
  components: {
    Ghead,
    AJposition,
    page,
    Calendarme
  },
  methods: {
    jumptobasicupload () {
      this.$router.push({name: 'AJusercentercollectupload', query: {name: 'AJusercentercollect'}})
    },
    jumptolivedetail (item) {
      if (item.type === 1) {
        this.$router.push({name: 'Flivedetail', query: {liveid: item.id}})
      } /*else if (item.type === 2) {
        this.$router.push({name: 'Fliveoverdetail', query: {liveid: item.id}})
      } else {
        this.win(warntxt.nostart, '', false)
      }*/
    },
    cancelcollect (item) {
      this.$router.push({name: 'AJusercentercollectdel', params: {'item': item}})
    },
    jumpto (item) {
      if (!item.visitUrl) {
        this.win(liveinfo.jumpfail, '', false)
      } else {
        window.open(item.visitUrl, '_blank')
      }
    },
    formcat (obj) {
      return obj.year + '-' + (obj.month < 10 ? '0' + obj.month : obj.month) + '-' + (obj.day < 10 ? '0' + obj.day : obj.day)
    },
    startfn (obj) {
      if (!this.svalshow) {
        this.svalshow = true
        this.sydate = ''
      } else {
        this.sydate = this.formcat(obj)
        document.querySelector('#start').value = this.sydate
      }
    },
    endfn (obj) {
      if (!this.evalshow) {
        this.evalshow = true
        this.eydate = ''
      } else {
        this.eydate = this.formcat(obj)
        document.querySelector('#end').value = this.eydate
      }
    },
    sstartfn (obj) {
      if (!this.ssvalshow) {
        this.ssvalshow = true
        this.ssydate = ''
      } else {
        this.ssydate = this.formcat(obj)
        document.querySelector('#sstart').value = this.ssydate
      }
    },
    eendfn (obj) {
      if (!this.eevalshow) {
        this.eevalshow = true
        this.eeydate = ''
      } else {
        this.eeydate = this.formcat(obj)
        document.querySelector('#eend').value = this.eeydate
      }
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
      if (!obj) {
        obj = {page: 1}
      }
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      let that = this
      this.pageindex = obj.page
      this.axios({
        method: 'post',
        url: collecturl,
        params: {
          par: {
            userId: that.$store.state.userinfo.id,
            collectType: 0,
            startDate: that.sydate,
            endDate: that.eydate,
            resourceName: that.searchval
          }
        }
      })
      .then(function (res) {
        that.collectlist = []
        let temp = []
        let objs = res.data.data
        that.totalpage = Math.ceil(objs.length / that.pagesize)
        that.totalnum0 = objs.length
        let start = (that.pageindex - 1) * that.pagesize
        for (let item = start; item < (that.pageindex * that.pagesize < objs.length ? that.pageindex * that.pagesize : objs.length); item++) {
          temp[item - start] = {}
          temp[item - start]['date'] = objs[item].createDate.substring(0, objs[item].createDate.length - 3)
          temp[item - start]['imgurl'] = objs[item].imgurl
          temp[item - start]['type'] = restype[objs[item].resType]
          temp[item - start]['name'] = objs[item].resourceName
          temp[item - start]['visitUrl'] = objs[item].visitUrl
        }
        that.bingos = []
        that.bingos[that.pageindex - 1] = 'selected'
        that.collectlist = temp
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
        url: collectliveurl,
        data: {
          userId: that.$store.state.userinfo.id,
          collectType: 1,
          startDate: that.ssydate,
          endDate: that.eeydate,
          liveName: that.searchval1,
          liveStatus: that.state
        }
      })
      .then(function (res) {
        that.collectlivelist = []
        let temp = []
        let objs = res.data.myCollectedLives
        that.totalpage1 = Math.ceil(objs.length / that.pagesize)
        that.totalnum1 = objs.length
        let start = (that.pageindex1 - 1) * that.pagesize
        for (let item = start; item < (that.pageindex1 * that.pagesize < objs.length ? that.pageindex1 * that.pagesize : objs.length); item++) {
          temp[item - start] = {}
          temp[item - start]['imgurl'] = objs[item].image
          temp[item - start]['type'] = objs[item].liveStatus
          temp[item - start]['name'] = objs[item].adminName
          temp[item - start]['coursename'] = objs[item].liveName
          temp[item - start]['recordval'] = objs[item].isRecord
          temp[item - start]['id'] = objs[item].liveId
        }
        that.bingos1 = []
        that.bingos1[that.pageindex - 1] = 'selected'
        that.collectlivelist = temp
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
  mounted () {
    let that = this
    that.$Select({
      'data': liveselectinfo,
      'selectId': 'select0',
      'callback': function (obj) {
        that.state = obj.value
      }
    })
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJusercentercollect') {
        if (to.params.showlive) {
          this.changedata(1)
          this.pagepost1({page: this.pageindex1})
        }
        if (to.params.geturl) {
          this.allurl = to.params.allurl
        }
      }
    }
  },
  beforeDestroy () {
    // 删除日历节点
    document.body.removeChild(document.getElementById('start_calendar'))
    document.body.removeChild(document.getElementById('end_calendar'))
    document.body.removeChild(document.getElementById('sstart_calendar'))
    document.body.removeChild(document.getElementById('eend_calendar'))
  }
}
</script>

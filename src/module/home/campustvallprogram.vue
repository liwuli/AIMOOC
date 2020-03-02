<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
      <router-view name="b"></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Fcampustv.css"/>
    <Links></Links>
    <div class="center centerbottom50" :style="'min-height:' + Mhei + 'px'">
      <div class="centers1200">
      	<div class="tab">
       	<span class="span" :class="tabselected[ind]" @click="jumptochannel(ind)" v-for="(item, ind) in tabinfo">{{item}}</span>
       </div>
       <div class="searchpart">
       		<span class="txt">{{campustvinfo.time}}</span>
       		<Calendarme :valshow="valshows" :ymdhms="ymdhms" :iconstyle="iconstyle" :iconclass="iconclass" :inputstyle="inputstyle" :part="part" :dateval="sydate"  @startfn="startfn" :ids="start"></Calendarme>
	       	<span class="to">{{campustvinfo.to}}</span>
	       	<Calendarme :valshow="valshowe" :ymdhms="ymdhms" :iconstyle="iconstyle"  :iconclass="iconclass" :inputstyle="inputstyle"  :part="part" :dateval="eydate"  @endfn="endfn" :ids="end"></Calendarme>
	       	<input type="text" class="searchinput" :placeholder="campustvinfo.placeholder" v-model="searchval"/>
	       	<div class="btn" @click="search">{{campustvinfo.search}}</div>
       </div>
       <div class="searchrespart">
       	<div class="searchlist" @click="jumptolivedetail(item)" v-for="(item, ind) in programlist" :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right: 0' : ''">
       		<div class="img">
       			<img :src="item.thumbnailUrl ? item.thumbnailUrl : dlivepath"/>
       		</div>
       		<span class="title hides" :title="item.name">{{item.name}}</span>
       		<div class="see">
       			<span class="person iconfont icon-seetwo"></span>
       			<span class="personnum">{{item.person}}</span>
       			<span class="time">{{item.dateval}} {{item.stime}}-{{item.etime.substring(0, 5)}}</span>
       		</div>
       	</div>
       	<page  :totalnum="totalnum"  :bingo="bingos" :pageindex="pageval" @pagepost="getprogram"  :pagesize="pagesize"  :totalpage="totalpage"></page>
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
import page from '@/components/extend/page'
import Calendarme from '@/components/extend/calendar'
import Links from '@/module/home/link'
import {bingo, pageval, pagesize8, tabinfo, tabselected1, programalllisturl, liststate, campustvinfo} from '@/module/home/config/campustvinfo'
export default {
  name: 'Fcampustvallprogram',
  data () {
    return {
      totalnum: 0,
      totalpage: 0,
      bingos: bingo,
      pageval: pageval,
      pagesize: pagesize8,
      Mhei: window.innerHeight - 65 - 58 - 50,
      tabinfo: tabinfo,
      tabselected: tabselected1,
      iconclass: 'icon-time',
      programlist: [],
      liststate: liststate,
      campustvinfo: campustvinfo,
      iconstyle: 'margin-left: -22px;margin-top:5px;position:relative;float:left;color:#3197fc;',
      inputstyle: 'width:180px;height:25px;line-height:25px;float:left;margin-top:0',
      start: 'start',
      end: 'end',
      ymdhms: 'ymdhMs',
      valshows: false,
      valshowe: false,
      sydate: '',
      eydate: '',
      part: document.body,
      searchval: '',
      dlivepath: '/static/images/Dlive.jpg'
    }
  },
  created () {
//  /* eslint-disable no-new */
//  let timeval =  new Date().getTime()
//  let tempstime = new Date(timeval)
//  let tempetime = new Date(timeval + 7 * 24 * 3600 * 1000)
//  this.sydate = tempstime.getFullYear() + '-' + ((tempstime.getMonth() + 1) < 10 ? '0' + (tempstime.getMonth() + 1) : (tempstime.getMonth() + 1)) + '-' + (tempstime.getDate() < 10 ? '0' + tempstime.getDate() : tempstime.getDate()) + ' ' + (tempstime.getHours() < 10 ? '0' + tempstime.getHours() : tempstime.getHours()) + ':' + (tempstime.getMinutes() < 10 ? '0' + tempstime.getMinutes() : tempstime.getMinutes()) + ':' + (tempstime.getSeconds() < 10 ? '0' + tempstime.getSeconds() : tempstime.getSeconds())
//  this.eydate = tempetime.getFullYear() + '-' + ((tempetime.getMonth() + 1) < 10 ? '0' + (tempetime.getMonth() + 1) : (tempetime.getMonth() + 1)) + '-' + (tempetime.getDate() < 10 ? '0' + tempetime.getDate() : tempetime.getDate()) + ' ' + (tempetime.getHours() < 10 ? '0' + tempetime.getHours() : tempetime.getHours()) + ':' + (tempetime.getMinutes() < 10 ? '0' + tempetime.getMinutes() : tempetime.getMinutes()) + ':' + (tempetime.getSeconds() < 10 ? '0' + tempetime.getSeconds() : tempetime.getSeconds())
    this.getprogram({page: 1})
  },
  components: {
    Ghead,
    Gfoot,
    Links,
    Calendarme,
    page
  },
  methods: {
    jumptolivedetail (item) {
      if (item.tvProgramStatus === 0) { // 直播
        this.$router.push({name: 'Fcampustvlive', query: {channelid: item.channelid, dateval: item.dateval, programid: item.id}})
      } else if (item.tvProgramStatus === 2) {
        this.$router.push({name: 'Fcampustvliveplay', query: {channelid: item.channelid, dateval: item.dateval, programid: item.id}})
      } else {
        this.$router.push({name: 'Fcampustvsee', query: {channelid: item.channelid, dateval: item.dateval, programid: item.id}})
      }
    },
    search () {
      this.getprogram({page: 1})
    },
    formcat (obj) {
      return obj.year + '-' + (obj.month < 10 ? ('0' + obj.month) : obj.month) + '-' + (obj.day < 10 ? ('0' + obj.day) : obj.day) + ' ' + (obj.hour < 10 ? ('0' + obj.hour) : obj.hour) + ':' + (obj.minutes < 10 ? ('0' + obj.minutes) : obj.minutes) + ':' + (obj.seconds < 10 ? ('0' + obj.seconds) : obj.seconds)
    },
    startfn (obj) {
      if (!this.valshows) {
        this.valshows = true
        this.sydate = ''
      } else {
        this.sydate = this.formcat(obj)
        document.getElementById('start').value = this.sydate
      }
    },
    endfn (obj) {
      if (!this.valshowe) {
        this.valshowe = true
        this.eydate = ''
      } else {
        this.eydate = this.formcat(obj)
        document.getElementById('end').value = this.eydate
      }
    },
    jumptochannel (ind) {
      switch (ind) {
        case 0: // 频道直播
          this.$router.push({name: 'Fcampustv'})
          break
        case 1: // 全部节目单
          this.$router.push({name: 'Fcampustvallprogram'})
          break
      }
    },
    jumpto (item) {
      switch (item.btn) {
        case 'btnred': // 直播中
          if (item.programType === 0) { // 直播
            this.$router.push({name: 'Fcampustvlive', query: {channelid: this.channelid, dateval: this.dateval, programid: item.id}})
          } else {
            this.$router.push({name: 'Fcampustvliveplay', query: {channelid: this.channelid, dateval: this.dateval, programid: item.id}})
          }
          break
        case 'btnblue': // 回看
          this.$router.push({name: 'Fcampustvsee', query: {channelid: this.channelid, dateval: this.dateval, programid: item.id}})
          break
      }
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
    getprogram (obj) {
      let that = this
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      that.pageval = obj.page
      this.axios({
        method: 'post',
        url: programalllisturl,
        params: {
          par: {
            startDay: that.sydate.split(' ')[0],
            endDay: that.eydate.split(' ')[0],
            startTime: that.sydate.split(' ')[1],
            endTime: that.eydate.split(' ')[1],
            tvProgramName: that.searchval,
            isOpen: 1
          }
        }
      })
      .then(function (res) {
        let objs = res.data.data
        let temps = []
        let state = 0
        that.totalpage = Math.ceil(objs.length / pagesize8)
        that.totalnum = objs.length
        let start = (that.pageval - 1) * pagesize8
        for (let item = start; item < (that.pageval * pagesize8 < objs.length ? that.pageval * pagesize8 : objs.length); item++) {
          temps[item - start] = {}
          temps[item - start]['id'] = objs[item].tvProgramId
          temps[item - start]['channelid'] = objs[item].tvChannelId
          temps[item - start]['stime'] = objs[item].startTime.substring(0, 5)
          temps[item - start]['etime'] = objs[item].endTime
          temps[item - start]['duration'] = that.changehms(objs[item].startTime, objs[item].endTime)
          temps[item - start]['dateval'] = objs[item].dayTime
          temps[item - start]['person'] = objs[item].viewNum
          temps[item - start]['name'] = objs[item].tvProgramName
          temps[item - start]['status'] = objs[item].tvProgramStatus
          temps[item - start]['programType'] = objs[item].programType
          temps[item - start]['liveUrl'] = objs[item].liveUrl
          temps[item - start]['videoUrl'] = objs[item].videoUrl
          temps[item - start]['thumbnailUrl'] = objs[item].thumbnailUrl
          if (objs[item].tvProgramStatus === 0) {
            // 未开始直播，状态有开启/关闭, 修改，删除
            temps[item - start]['btn'] = 'btngray'
            temps[item - start]['btnname'] = liststate[3]
          } else if (objs[item].tvProgramStatus === 1) {
            // 直播中
            temps[item - start]['btn'] = 'btnred'
            temps[item - start]['btnname'] = liststate[1]
          } else {
            // 直播结束，需要判断，是否资源已生成，然后才可以回看，删除
            temps[item - start]['btn'] = 'btnblue'
            temps[item - start]['btnname'] = liststate[0]
          }
          if (!state && objs[item].tvProgramStatus === 0) {
            temps[item - start]['btn'] = 'btngreen'
            temps[item - start]['btnname'] = liststate[2]
            state++
          }
        }
        that.programlist = temps
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    changehms (start, end) {
      let seconds = this.hmstoseconds(end) - this.hmstoseconds(start)
      return this.secondstohms(seconds)
    },
    hmstoseconds (time) {
      let sconds = time.split(':')
      return parseInt(sconds[0]) * 3600 + parseInt(sconds[1]) * 60 + parseInt(sconds[2])
    },
    secondstohms (seconds) {
      let hour = parseInt(seconds / 3600)
      let minutes = parseInt((seconds - hour * 3600) / 60)
      let secondss = (seconds - hour * 3600 - minutes * 60)
      return this.fomcatdouble(hour) + ':' + this.fomcatdouble(minutes) + ':' + this.fomcatdouble(secondss)
    },
    fomcatdouble (param) {
      return param < 10 ? ('0' + param) : param
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
    if (location.hash.indexOf('Fcampustv') >= 0) {
      document.querySelector('a[href="#/Fcampustv"]').setAttribute('class', 'a active')
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'Fcampustvallprogram') {
//      this.pagepost()
      }
    }
  },
  beforeDestroy () {
    document.body.removeChild(document.getElementById('start_calendar'))
    document.body.removeChild(document.getElementById('end_calendar'))
  }
}
</script>

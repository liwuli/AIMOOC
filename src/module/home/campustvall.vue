<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
      <router-view name="b"></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Fcampustv.css"/>
    <Link></Link>
    <div class="center centerbottom50" :style="'min-height:' + Mhei + 'px'">
      <div class="centers1200">
       <div class="backto" @click="backto"><&nbsp;&nbsp;{{campustvinfo.back}}</div>
       <div class="tabchannel">
       	<span class="left iconfont icon-jiantou" @click="leftright('left')"></span>
       	<div class="centerpart">
       		<div class="inner" :style="'width:' + channelwid + 'px;margin-left:' + channelmarginleft.val">
       			<span class="span hides" @click="channelfn(item, ind)" :class="channelselect[ind]" v-for="(item, ind) in channellist" :title="item.name">{{item.name}}</span>
       		</div>
       	</div>
       	<div class="right iconfont icon-jiantou" style="transform: rotate(180deg);" @click="leftright('right')"></div>
       </div>
       <Railc :lostday='lostday' :railpart="railpart" :topclass="topclass" :dateval="dateval" :railid="railid" :show="show" @lessevent="lessevent" @addevent="addevent" @railcevent="railcevent" ></Railc>
       <div class="programlist">
       	<div class="list" v-for="item in programlist">
       		<span class="btn" :class="item.btn" @click="jumpto(item)">{{item.btnname}}</span>
       		<span class="time">{{item.stime}}</span>
       		<span class="content hides":class="item.btn === 'btngray' ? 'colorgray' : ''" :title="item.name">{{item.name}}</span>
       		<span class="duration">{{item.duration}}</span>
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
import Link from '@/module/home/link'
import Railc from '@/components/extend/railcschool'
import {getservertimeurl, programlisturl, channellisturl, liststate, campustvinfo} from '@/module/home/config/campustvinfo'
export default {
  name: 'Fcampustvall',
  data () {
    return {
      Mhei: window.innerHeight - 65 - 58 - 50,
      channellist: [],
      channelmarginleft: {val: 0, num: 0},
      channelselect: ['selected'],
      channelid: '',
      channelwid: 0,
      campustvinfo: campustvinfo,
      dateval: '',
      show: true,
      lostday: true,
      railid: 'schoolradio',
      topclass: 'topclass',
      railpart: '',
      programlist: [],
      nowtime: '',
      nextprogram: '',
      intervalcount: null,
      dlivepath: '/static/images/Dlive.jpg'
    }
  },
  components: {
    Ghead,
    Gfoot,
    Link,
    Railc
  },
  created () {
    this.dateval = this.geturlparam('dateval', location.hash)
    this.channelid = this.geturlparam('channelid', location.hash)
    this.getservertime()
  },
  methods: {
    getservertime () {
      let that = this
      this.axios({
        method: 'post',
        url: getservertimeurl
      })
      .then(function (res) {
        let time = res.data.result.date
        that.intervalcount = setInterval(function () {
          time = new Date(time).getTime() + 1000
          that.nowtime = that.formcatdate(time)
          if (that.nextprogram !== '') {
            if (that.nextprogram === that.nowtime) {
              location.reload()
            }
          }
        }, 1000)
        that.getchannellist()
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    formcatdate (time) {
      let dateval = new Date(time)
      return dateval.getFullYear() + '-' + this.doubleformcat(dateval.getMonth() + 1) + '-' + this.doubleformcat(dateval.getDate()) + ' ' + this.doubleformcat(dateval.getHours()) + ':' + this.doubleformcat(dateval.getMinutes()) + ':' + this.doubleformcat(dateval.getSeconds())
    },
    doubleformcat (val) {
      return val < 10 ? ('0' + val) : val
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
    backto () {
      this.$router.push({name: 'Fcampustv'})
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
    getprogram () {
      let that = this
      this.axios({
        method: 'post',
        url: programlisturl,
        params: {
          par: {
            tvChannelId: that.channelid,
            dayTime: that.dateval,
            isOpen: 1
          }
        }
      })
      .then(function (res) {
        let objs = res.data.data
        let temps = []
        let state = 0
        for (let item = 0; item < objs.length; item++) {
          temps[item] = {}
          temps[item]['id'] = objs[item].tvProgramId
          temps[item]['channelid'] = objs[item].tvChannelId
          temps[item]['stime'] = objs[item].startTime
          temps[item]['etime'] = objs[item].endTime
          temps[item]['duration'] = that.changehms(objs[item].startTime, objs[item].endTime)
          temps[item]['dateval'] = objs[item].dayTime
          temps[item]['name'] = objs[item].tvProgramName
          temps[item]['status'] = objs[item].tvProgramStatus
          temps[item]['programType'] = objs[item].programType
          temps[item]['liveUrl'] = objs[item].liveUrl
          temps[item]['videoUrl'] = objs[item].videoUrl
          temps[item]['thumbnailUrl'] = objs[item].thumbnailUrl
          if (objs[item].tvProgramStatus === 0) {
            // 未开始直播，状态有开启/关闭, 修改，删除
            temps[item]['btn'] = 'btngray'
            temps[item]['btnname'] = liststate[3]
          } else if (objs[item].tvProgramStatus === 1) {
            // 直播中
            temps[item]['btn'] = 'btnred'
            temps[item]['btnname'] = liststate[1]
          } else {
            // 直播结束，需要判断，是否资源已生成，然后才可以回看，删除
            temps[item]['btn'] = 'btnblue'
            temps[item]['btnname'] = liststate[0]
          }
          if (!state && objs[item].tvProgramStatus === 0) {
            temps[item]['btn'] = 'btngreen'
            temps[item]['btnname'] = liststate[2]
            that.nextprogram = objs[item].dayTime + ' ' + objs[item].startTime
            state++
          }
        }
        that.programlist = temps
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
    getchannellist () {
      let that = this
      this.axios({
        method: 'post',
        url: channellisturl
      })
      .then(function (res) {
        that.channelselect = []
        let temp = []
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          temp.push({id: objs[item].tvChannelId, name: objs[item].tvChannelName})
          if (objs[item].tvChannelId === that.channelid) {
            that.channelselect[item] = 'selected'
          } else {
            that.channelselect[item] = ''
          }
        }
        that.channelwid = temp.length * 180
        that.channellist = temp
        that.getprogram()
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    lessevent () {
    },
    addevent () {
    },
    railcevent (obj) {
      this.dateval = this.formcat(obj)
      this.getprogram()
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
    },
    channelfn (item, ind) {
      for (let item = 0; item < this.channellist.length; item++) {
        this.channelselect.splice(item, 1, '')
      }
      this.channelselect.splice(ind, 1, 'selected')
      this.channelid = item.id
      // 执行查询接口
      this.getprogram()
    },
    leftright (item) {
      let minlen = 6
      let minwid = 180
      if (this.channellist.length <= minlen) {
        return false
      } else {
        if (item === 'right') { // 向右偏移
          if (this.channelmarginleft.num + 1 <= this.channellist.length - minlen) {
            this.channelmarginleft = Object.assign({}, {val: -1 * (this.channelmarginleft.num + 1) * minwid + 'px', num: this.channelmarginleft.num + 1})
          } else {
            this.channelmarginleft = Object.assign({}, {val: 0 + 'px', num: 0})
          }
        } else { // 向左偏移
          if (this.channelmarginleft.num - 1 >= 0) {
            this.channelmarginleft = Object.assign({}, {val: -1 * (this.channelmarginleft.num - 1) * minwid + 'px', num: this.channelmarginleft.num - 1})
          } else {
            this.channelmarginleft = Object.assign({}, {val: -1 * (this.channellist.length - minlen) * minwid + 'px', num: this.channellist.length - minlen})
          }
        }
      }
    },
    pagepost () {
      let that = this
      that.listlivinginfo = []
      that.listwaitinfo = []
      that.listlivedinfo = []
      this.axios({
        method: 'post',
        url: '',
        data: {}
      })
      .then(function (res) {
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
    if (location.hash.indexOf('Fcampustv') >= 0) {
      document.querySelector('a[href="#/Fcampustv"]').setAttribute('class', 'a active')
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'Fcampustvall') {
//      this.pagepost()
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalcount)
  }
}
</script>

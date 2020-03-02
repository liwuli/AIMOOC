<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
      <router-view name="b"></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Flive.css"/>
    <Link></Link>
    <div class="center centerbottom50" :style="'min-height:' + Mhei + 'px'">
      <div class="centers1100">
       <div class="livecenter">
       		<span class="span" @click="jump(1)">{{liveinfo.back}}</span>
	      	<input type="text" class="searchinput" v-model="searchval"/>
	      	<span class="searchbtn" @click="pagepost">{{liveinfo.search}}</span>
       </div>
       <div class="livecenter" style="margin: 0px 0 20px 0;">
       		<span class="spansmall" >{{liveinfo.total}} {{total}} {{liveinfo.about}}" <span class="blue">{{searchval1}}</span> "{{liveinfo.res}}</span>
       </div>
        <div class="unlivesearch" id="unlivesearch">
        	<span class="searchtxt">{{liveinfo.state}}</span>
        	<div id='select0' style="width: 150px;margin-right: 20px;height: 25px;line-height: 25px;" ></div>
        	<span class="searchtxt">{{liveinfo.update}}</span>
	       	<Calendarme :valshow="valshow" :iconstyle="iconstyle" :ymdhms="ymdhms" :inputstyle="inputstyle" :part="part" :dateval="sydate"  @startfn="startfn" :ids="start"></Calendarme>
	       	<span class="to">{{liveinfo.to}}</span>
	       	<Calendarme :valshow="valshow" :iconstyle="iconstyle" :ymdhms="ymdhms"  :inputstyle="inputstyle"  :part="part":dateval="eydate"  @endfn="endfn" :ids="end"></Calendarme>
	       	<div class="searchbtn" @click="pagepost">{{liveinfo.find}}</div>
       </div>
       <div class="livelist"  @click="jumpdetail(item)" v-for="(item, ind) in listinfo" :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right: 0;' :''">
        <div class="img">
          <img  :src="item.imgurl ? item.imgurl : dlivepath"/>
        </div>
        <span class="name hides" :title="item.name + liveinfo.info + ':' +item.des">{{item.name}}</span>
        <div class="half">
        	<span class="halficon iconfont icon-master"></span>
        	<span class="txt hides" :title="item.person">{{item.person}}</span>
        </div>
        <div class="halfright" >
        	<span class="halficon iconfont icon-seeperson" ></span>
        	<span class="txt">{{item.num}}</span>
        </div>
        <div class="bluepart" v-if="item.type === 1">{{liveinfo.living}}</div>
        <div class="greenpart" v-if="item.type === 0">{{liveinfo.wait}}</div>
        <div class="yellowpart" v-if="item.type === 2">{{liveinfo.lived}}</div>
      </div>
      <page :totalnum="totalnum" :bingo="bingo" @pagepost="pagepost"  :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/Homeheader'
import Gfoot from '@/components/common/footer'
import Calendarme from '@/components/extend/calendar'
import Link from '@/module/home/link'
import page from '@/components/extend/page'
import {bingo, unlivepagesize, liveselectinfo, pathinfolive, liveinfo, livesearchurl} from '@/module/home/config/liveinfo'
export default {
  name: 'Flivesearch',
  data () {
    return {
      liveinfo: liveinfo,
      dlivepath: '/static/images/Dlive.jpg',
      listinfo: [],
      bingo: bingo,
      searchval: '',
      total: 0,
      totalnum: 0,
      pagesize: unlivepagesize,
      pageindex: 1,
      totalpage: 0,
      iconstyle: 'margin-top:0',
      inputstyle: 'width:130px;height:25px;line-height:25px',
      start: 'start',
      end: 'end',
      ymdhms: 'ymd',
      valshows: false,
      valshowe: false,
      sydate: '',
      eydate: '',
      state: '',
      part: document.body,
      Mhei: window.innerHeight - 65 - 58 - 50,
      searchval1: ''
    }
  },
  created () {
    if (this.$route.params.searchval) {
      this.searchval = this.$route.params.searchval
      this.searchval1 = this.searchval
    }
    this.pagepost({sydate: '', eydate: ''})
  },
  components: {
    Ghead,
    Gfoot,
    Link,
    page,
    Calendarme
  },
  methods: {
  /*  jumpdetail (item) {
      switch (item.type) {
        case 1:
          this.$router.push({name: pathinfolive.prex + 'detail', query: {liveid: item.id}})
          break
        case 0:
          this.win(liveinfo.nostart, '', false)
          break
        case 2:
          this.$router.push({name: pathinfolive.prex + 'overdetail', query: {liveid: item.id}})
          break
      }
    },*/
    jump (num) {
      switch (num) {
        case 1:
          this.$router.push({name: pathinfolive.prex + 'living'})
          break
        case 0:
          this.$router.push({name: pathinfolive.prex + 'unlive'})
          break
        case 2:
          this.$router.push({name: pathinfolive.prex + 'lived'})
          break
      }
    },
    formcat (obj) {
      return obj.year + '-' + (obj.month < 10 ? '0' + obj.month : obj.month) + '-' + (obj.day < 10 ? '0' + obj.day : obj.day)
    },
    startfn (obj) {
      if (!this.valshows) {
        this.sydate = ''
        this.valshows = true
      } else {
        this.sydate = this.formcat(obj)
        document.getElementById('start').value = this.sydate
      }
    },
    endfn (obj) {
      if (!this.valshowe) {
        this.eydate = ''
        this.valshowe = true
      } else {
        this.eydate = this.formcat(obj)
        document.getElementById('end').value = this.eydate
      }
    },
    getfiveday () {
      /* eslint-disable no-new */
      let temp = new Date().getTime() + 5 * 24 * 3600 * 1000
      /* eslint-disable no-new */
      let temps = new Date(temp)
      return temps.getFullYear() + '-' + (temps.getMonth() + 1 < 10 ? '0' + (temps.getMonth() + 1) : (temps.getMonth() + 1)) + '-' + (temps.getDate() < 10 ? '0' + temps.getDate() : temps.getDate())
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        this.pageindex = obj
      }
      this.searchval1 = this.searchval
      let that = this
      this.axios({
        method: 'post',
        url: livesearchurl,
        data: {
          keywords: that.searchval,
          liveStatus: that.state,
          beginTime: obj.sydate === '' ? obj.sydate : that.sydate,
          endTime: obj.eydate === '' ? obj.eydate : that.eydate
        }
      })
      .then(function (res) {
        that.listinfo = []
        let objs = res.data.LivesList
        that.total = objs.length
        that.totalnum = objs.length
        that.totalpage = Math.ceil(that.totalnum / unlivepagesize)
        let start = (that.pageindex - 1) * unlivepagesize
        let end = that.pageindex * unlivepagesize
        let temp = []
        for (let item = start; item < (end < objs.length ? end : objs.length); item++) {
          temp.push({
            id: objs[item].liveId,
            imgurl: objs[item].image,
            name: objs[item].liveName,
            person: objs[item].realName,
            num: objs[item].viewers,
            dateval: objs[item].beginTime ? (objs[item].beginTime.substring(0, objs[item].beginTime.length - 3) + '-' + objs[item].endTime.split(' ')[1].substr(0, 5)) : '',
            type: objs[item].liveStatus,
            des: objs[item].description
          })
        }
        that.listinfo = temp
        that.bingo = []
        that.bingo[that.pageindex - 1] = 'selected'
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
//  this.eydate = this.getfiveday()
    if (location.hash.indexOf('Flive') >= 0) {
      document.querySelector('a[href="#/Flive"]').setAttribute('class', 'a active')
    }
    that.$Select({
      'data': liveselectinfo,
      'selectId': 'select0',
      'callback': function (obj) {
        that.state = obj.value
      }
    })
  }
}
</script>

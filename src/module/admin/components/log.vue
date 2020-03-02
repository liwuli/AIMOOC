<template>
  <div class="app">
  	<Ghead></Ghead>
  	
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<AJposition :pathobj = "pathobj"></AJposition>
    			<div class="G_search" :style="searchstyle">
					 	<div class="part" >
					 	  <span class="txt">{{basicinfo.nameN}}</span>
					 	  <input type="text" v-model="name"/>
					 	</div>
					 	<div class="part" >
					 	  <span class="txt">{{basicinfo.ipN}}</span>
					 	  <input type="text" v-model="ip"/>
					 	</div>
					 	<div class="part" >
					 		<span class="txt">{{basicinfo.dateN}}</span>
					 	  <Calendarme :valshow="valshow" :part= "part" :ymdhms="ymdhms"   @startfn="startfn" :ids="start"></Calendarme>
					 	</div>
					 	<input type="text" :style="searchinput" v-model="val" :placeholder="msg"/>
					 	<div class="btn" @click="search" style="float: left;">{{basicinfo.searchN}}</div>
					 </div>
		      <List  :totalnum="totalnum"  :pageval = "pageval" :delbtn="delbtn" :addbtn="addbtn" :pagesize="pagesize" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/listcheck'
import Calendarme from '@/components/extend/calendar.vue'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {basicinfo, powerinfo, opteventAll, optobjinfoAll, addbtn, searchstyle, searchinput, pageval, infoval, products, bingos, colums, percentinfo, pagesize, listurl, listhead, pathinfo} from '@/module/admin/config/loginfo'
// 权限处理
let optevent = [] // 'dellist'
let optobjinfo = [] // '删除'
let delbtn = 'display: none'
export default {
  name: 'log',
  data () {
    return {
      addbtn: addbtn,
      basicinfo: basicinfo,
      products: products,
      infoval: infoval,
      percentinfo: percentinfo,
      colums: colums,
      optobjinfo: optobjinfo,
      listhead: listhead,
      optevent: optevent,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      bingos: bingos,
      searchinput: searchinput,
      searchstyle: searchstyle,
      pageval: pageval,
      pagesize: pagesize,
      delbtn: delbtn,
      sydate: '',
      ymdhms: 'ymd',
      name: '',
      start: 'start',
      ip: '',
      dates: '',
      val: '',
      part: document.body,
      valshow: false,
      del: 0,
      totalnum: 0
    }
  },
  created () {
    this.pagepost({page: 1})
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist,
    Calendarme
  },
  methods: {
    startfn (obj) {
      if (!this.valshow) {
        this.valshow = true
        this.dates = ''
      } else {
        this.dates = this.formcat(obj)
        document.querySelector('#start').value = this.dates
      }
      this.startobj = obj.id
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
    },
    pagepost (obj) {
      this.optevent = []
      this.optobjinfo = []
      this.del = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['log']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'dellist':
                if (!this.del) {
                  this.optevent.push(powerinfo.OPdlist)
                  this.optobjinfo.push(powerinfo.OdN)
                  this.delbtn = 'display:block'
                }
                break
            }
          }
        }
      }
      if (!this.startobj || this.startobj.value === '') {
        this.dates = ''
      }
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        params: {
          par: {
            pageSize: pagesize,
            pageIndex: that.pageval,
            userName: that.name,
            hostIp: that.ip,
            keyContent: that.val,
            dateTime: that.dates
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let temp = []
        let optobj = that.optobjinfo
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].logId
            temp[item]['name'] = objs[item].userName
            temp[item]['ip'] = objs[item].hostIp
            temp[item]['date'] = objs[item].datetime
            temp[item]['content'] = objs[item].keyContent
            temp[item].opt = optobj
            temp[item].selected = false
          }
        }
        that.products = temp
        that.bingos = []
        that.bingos[obj.page - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    search () {
      this.pagepost({page: 1})
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJlog') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

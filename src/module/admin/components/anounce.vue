<template>
  <div class="app" :style="appstyle">
  	<Ghead></Ghead>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<!--<echarts :echartdata="echartdata" :title="title" :echartid = "echartid" :styles = "styles"></echarts>-->
    			<AJposition :pathobj = "pathobj"></AJposition>
    			<search :searchbtnstyles="searchbtnstyles" :Gsearchstyle="searchstyle" @searchevent="searchevent" :styles="searchinput"></search>
		      <List :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import search from '@/components/extend/search'
import echarts from '@/components/extend/echart'

import {powerinfo, pageval, opteventAll, optobjinfoAll, searchstyle, searchinput, products, infoval, bingos, colums, percentinfo, pagesize, listurl, listhead, pathinfo} from '@/module/admin/config/anounceinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist', 'toplist'
let optobjinfo = [] // '编辑', '删除' '置顶'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJannounce',
  data () {
    return {
      products: products,
      appstyle: 'min-height:' + window.innerHeight + 'px',
      searchbtnstyles: 'float:left',
      echartid: 'echartid',
      styles: 'width:500px;height:500px',
      title: '',
      echartdata: {},
      infoval: infoval,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      optevent: optevent,
      optobjinfo: optobjinfo,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      bingos: bingos,
      addbtn: addbtn,
      delbtn: delbtn,
      searchinput: searchinput,
      searchstyle: searchstyle,
      pageval: pageval,
      pagesize: pagesize,
      edit: 0,
      del: 0,
      top: 0,
      totalnum: 0,
      keywords: ''
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
    search,
    echarts
  },
  methods: {
    searchevent (obj) {
      this.keywords = obj.keys
      this.pagepost({page: obj.page})
    },
    imageuploaded (res) {
      if (res.errcode === 0) {
        this.src = res.data.src
      }
    },
    pagepost (obj) {
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.del = 0
      this.top = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.addbtn = 'display:block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['announce']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'addlist':
                this.addbtn = 'display:block'
                break
              case 'editlist':
                if (!this.edit) {
                  this.optevent.push(powerinfo.OPelist)
                  this.optobjinfo.push(powerinfo.OeN)
                }
                this.edit++
                break
              case 'dellist':
                if (!this.del) {
                  this.optevent.push(powerinfo.OPdlist)
                  this.optobjinfo.push(powerinfo.OdN)
                  this.delbtn = 'display:block'
                }
                this.del++
                break
              case 'toplist':
                if (!this.top) {
                  this.optevent.push(powerinfo.OPtlist)
                  this.optobjinfo.push(powerinfo.OtN)
                }
                this.top++
                break
            }
          }
        }
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          page: {
            pageSize: obj.pagesize ? obj.pagesize : pagesize,
            pageIndex: obj.page
          },
          keywords: that.keywords
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let temp = []
        let optobj = that.optobjinfo
        let objs = res.data.termList
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].termId
            temp[item]['sy'] = objs[item].fromYear
            temp[item]['ey'] = objs[item].toYear
            temp[item]['sydate'] = objs[item].startTime
            temp[item]['eydate'] = objs[item].endTime
            temp[item]['lastPartName'] = objs[item].lastPartName
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
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJterm') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

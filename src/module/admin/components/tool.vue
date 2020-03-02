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
    			<!--<search :Gsearchstyle="searchstyle" @pagepost="pagepost" :styles="searchinput"></search>-->
		      <List :totalnum="totalnum"  :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import {pageval, opteventAll, optobjinfoAll, tooltypeinfo, searchstyle, searchinput, products, infoval, bingos, colums, percentinfo, pagesize, listurl, listhead, pathinfo} from '@/module/admin/config/toolinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJtool',
  data () {
    return {
      products: products,
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
    Linklist
  },
  methods: {
    pagepost (obj) {
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: listurl
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.result.length / pagesize)
        that.totalnum = res.data.result.length
        let temp = []
        let objs = res.data.result
        let start = (that.pageval - 1) * pagesize
        for (let item = start; item < objs.length; item++) {
          if (item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length)) {
            temp[item - start] = {}
            temp[item - start]['id'] = objs[item].toolId
            temp[item - start]['name'] = objs[item].toolName
            temp[item - start]['ip'] = objs[item].toolHost
            temp[item - start]['type'] = objs[item].taskType
            temp[item - start]['port'] = objs[item].toolPort
            temp[item - start]['state'] = objs[item].status
            if (objs[item].taskType === 'DocumentTask') { // 文件
              temp[item - start].opt = tooltypeinfo.DocumentTaskinfo
              temp[item - start].optevent = tooltypeinfo.DocumentTaskopt
            } else if (objs[item].taskType === 'videotype') { // 视频
              temp[item - start].opt = tooltypeinfo.videotypeinfo
              temp[item - start].optevent = tooltypeinfo.videotypeopt
            } else if (objs[item].taskType === 'TranscodeTask') { // 视频
              temp[item - start].opt = tooltypeinfo.TranscodeTaskinfo
              temp[item - start].optevent = tooltypeinfo.TranscodeTaskopt
            } else { // 录制
              temp[item - start].opt = tooltypeinfo.recordtypeinfo
              temp[item - start].optevent = tooltypeinfo.recordtypeopt
            }
            temp[item - start].selected = false
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
      if (to.name === pathinfo.prex) {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

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
    			<div class="tab">
    			  <span class="status" v-for="item in tooltype" @click="jump(item.event)">{{item.name}}</span>
    			</div>
		      <List  :totalnum="totalnum" :pagesize="pagesize" :addbtn="addbtn" :delbtn="delbtn" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/listcheck'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {tooltypeinfo, warntxt, pageval, tooltypeobj, listhead2, opteventAll, optobjinfoAll, products, infoval, OeN, OdN, OPelist, OPdlist, bingos, colums, percentinfo, pagesize, listurl, listhead, pathinfo} from '@/module/admin/config/toolinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let delbtn = 'display: block'
export default {
  name: 'AJtoolsee',
  data () {
    return {
      products: products,
      infoval: infoval,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead2,
      optevent: optevent,
      optobjinfo: optobjinfo,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      bingos: bingos,
      addbtn: addbtn,
      delbtn: delbtn,
      pageval: pageval,
      tooltype: [],
      tooltypeval: '',
      totalnum: 0,
      pagesize: pagesize
    }
  },
  created () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.tooltypeval = obj.toolType
      this.tooltype = tooltypeobj[obj.toolType]
      this.listhead = listhead2
    }
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
    jump (path) {
      this.$router.push({name: pathinfo.prex + path})
    },
    pagepost (obj) {
      this.optevent = []
      this.optobjinfo = []
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
          keywords: obj.keys
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
            if (that.tooltypeval === tooltypeinfo.filetype) { // 文件
            	temp[item]['id'] = objs[item].termId
              temp[item]['sy'] = objs[item].fromYear
              temp[item]['ey'] = objs[item].toYear
              temp[item]['sydate'] = objs[item].startTime
              temp[item]['eydate'] = objs[item].endTime
              temp[item]['lastPartName'] = objs[item].lastPartName
              temp[item].opt = tooltypedetailinfo.filetypeinfo
              temp[item].optevent = tooltypedetailinfo.filetypeopt
            } else if(that.tooltypeval === tooltypeinfo.videotype) { // 视频
              temp[item].opt = tooltypedetailinfo.videotypeinfo
              temp[item].optevent = tooltypedetailinfo.videotypeopt
            } else { // 录制
              temp[item].opt = tooltypedetailinfo.recordtypeinfo
              temp[item].optevent = tooltypedetailinfo.recordtypeopt
            }
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
    cancelfn () {
      this.$router.go(-1);
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
      if (to.name === pathinfo.prex + 'see') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

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
    			<div class="G_tab">
    			  <span class="item" v-for="item in tooltype" @click="jump(item.event)">{{item.name}}</span>
    			</div>
		      <List :totalnum="totalnum" :pagesize="pagesize" :addbtn="addbtn" :delbtn="delbtn" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import {transcodesearchurl, tooltype, transcodestate, pagesize, pageval, bingos, pathinfo, products, transcodedcolums, transcodedpercentinfo, infoval, transcodedlisthead, transcodedoptevent, transcodedoptobjinfo} from '@/module/admin/config/toolinfo'
export default {
  name: 'AJtoolManageseetranscoded',
  data () {
    return {
      addbtn: 'display:none',
      delbtn: 'display:block',
      products: products,
      infoval: infoval,
      percentinfo: transcodedpercentinfo,
      colums: transcodedcolums,
      listhead: transcodedlisthead,
      pathinfo: pathinfo,
      bingos: bingos,
      pageval: pageval,
      tooltype: tooltype,
      totalnum: 0,
      pagesize: pagesize
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
    jump (ev) {
      console.log(ev)
      if (ev === 'coded') {
        this.$router.push({name: 'AJtoolseetranscoded'})
      } else {
        this.$router.push({name: 'AJtoolseetranscode'})
      }
    },
    pagepost (obj) {
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: transcodesearchurl,
        params: {
          params: {
            curPage: that.pageval,
            pageSize: pagesize,
            status: 2
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.result.total / pagesize)
        that.totalnum = res.data.result.total
        let temp = []
        let optobj = that.optobjinfo
        let objs = res.data.result.data
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].taskdetailId
          temp[item]['name'] = objs[item].resourceName
          temp[item]['type'] = objs[item].muxer
          temp[item]['stateval'] = objs[item].detailStatus
          temp[item]['size'] = objs[item].fileSize + 'kb'
          temp[item]['state'] = transcodestate[objs[item].detailStatus]
          temp[item]['time'] = objs[item].date
          temp[item]['path'] = objs[item].detailLocation
          temp[item].opt = transcodedoptobjinfo
          temp[item].optevent = transcodedoptevent
          temp[item].selected = false
        }
        that.products = temp
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: pathinfo.prex + 'seetranscoded'})
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
  }
}
</script>

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
          <search :Gsearchstyle="searchstyle"  @searchevent="searchevent"  :styles="searchinput"></search>
          <List :totalnum="totalnum" :pagesize="pagesize" :pagestyles="pagestyles" @movetop="movetop"  @movedown="movedown"  @start="start"  @close="close" :addbtn="addbtn" :delbtn="delbtn" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import List from '@/components/extend/list'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import search from '@/components/extend/search'
import {pageval, opteventAll, optobjinfoAll, moduleinfo, optobjinfoAllA, opteventAllA, searchstyle, searchinput, products, infoval, bingos, colums, percentinfo, pagesize, listurl, editurl, delurl, listhead, pathinfo} from '@/module/admin/config/moduleinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJmodule',
  data () {
    return {
      products: products,
      moduleinfo: moduleinfo,
      infoval: infoval,
      percentinfo: percentinfo,
      pagestyles: 'display:none',
      colums: colums,
      listhead: listhead,
      optevent: optevent,
      optobjinfo: optobjinfo,
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
    search
  },
  methods: {
    searchevent (obj) {
      this.keywords = obj.keys
      this.pagepost({page: obj.page})
    },
    movetop (obj) {
      let item = obj.item
      let info = obj.info
      let ind = obj.ind
      let item2 = ''
      if (ind === 0) {
        return
      } else {
        item2 = info[ind - 1]
        let that = this
        this.axios({
          method: 'post',
          url: delurl,
          params: {
            params: {
              moduleId1: item.id,
              moduleId2: item2.id,
              owner: item.owner
            }
          }
        })
        .then(function (res) {
          that.pagepost({page: that.pageval})
        })
      }
    },
    movedown (obj) {
      let item = obj.item
      let info = obj.info
      let ind = obj.ind
      let item2 = ''
      if (ind === info.length - 1) {
        return
      }
      item2 = info[ind + 1]
      let that = this
      this.axios({
        method: 'post',
        url: delurl,
        params: {
          params: {
            moduleId1: item.id,
            moduleId2: item2.id,
            owner: item.owner
          }
        }
      })
      .then(function (res) {
        that.pagepost({page: that.pageval})
      })
    },
    start (obj) {
      let item = obj.item
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        params: {
          params: {
            moduleId: item.id,
            available: 1,
            owner: item.owner
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.content, '', false)
        } else {
          that.pagepost({page: that.pageval})
          that.win(moduleinfo.started, '', false)
        }
      })
    },
    close (obj) {
      let item = obj.item
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        params: {
          params: {
            moduleId: item.id,
            available: 0,
            owner: item.owner
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.content, '', false)
        } else {
          that.pagepost({page: that.pageval})
          that.win(moduleinfo.closed, '', false)
        }
      })
    },
    pagepost (obj) {
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
        that.pageinfo = Math.ceil(res.data.result.length / pagesize)
        that.totalnum = res.data.result.length
        let temp = []
        let objs = res.data.result
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].moduleId
            temp[item]['lName'] = objs[item].moduleName
            temp[item]['sta'] = objs[item].available ? that.moduleinfo.start : that.moduleinfo.close
            temp[item].available = objs[item].available
            temp[item].owner = objs[item].owner
            if (!objs[item].available) { // 启用，显示关闭
              temp[item].opt = optobjinfoAll
              temp[item].optevent = opteventAll
            } else {
              temp[item].opt = optobjinfoAllA
              temp[item].optevent = opteventAllA
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
      if (to.name === 'AJmodule') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

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
    			<AJposition></AJposition>
		      <List :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pageval="pageval" :pagesize="pagesize" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import {powerinfo, products, optobjinfoAll, opteventAll, infoval, pageval, searchinput, bingos, colums, percentinfo, pagesize, listurl, listhead, pathinfo} from '@/module/admin/config/roleinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist', 'powerlist'
let optobjinfo = [] // '编辑', '删除', '授权'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJrole',
  created () {
    this.pagepost({page: 1})
  },
  data () {
    return {
      pageinfo: '',
      products: products,
      infoval: infoval,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      optevent: optevent,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      optobjinfo: optobjinfo,
      addbtn: addbtn,
      delbtn: delbtn,
      bingos: bingos,
      searchinput: searchinput,
      pageval: pageval,
      pagesize: pagesize,
      del: 0,
      edit: 0,
      set: 0,
      totalnum: 0
    }
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
      this.optevent = []
      this.optobjinfo = []
      this.del = 0
      this.edit = 0
      this.set = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.addbtn = 'display:block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['role']
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
              case 'powerlist':
                if (!this.set) {
                  this.optevent.push(powerinfo.OPplist)
                  this.optobjinfo.push(powerinfo.OpN)
                }
                this.set++
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
        params: {
          params: {
            pageSize: pagesize,
            offset: (that.pageval - 1) * pagesize
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.result.total / pagesize)
        that.totalnum = res.data.result.total
        let temp = []
        let optobj = that.optobjinfo
        let obj = res.data.result.data
        for (let item = 0; item < obj.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = obj[item].id
            temp[item]['description'] = obj[item].description
            temp[item]['roleName'] = obj[item].roleName
            temp[item]['type'] = obj[item].type
            temp[item].opt = optobj
            temp[item].selected = false
          }
        }
        that.products = temp
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
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

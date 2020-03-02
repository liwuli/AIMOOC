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
import {powerinfo, pageval, infoval, opteventAll, optobjinfoAll, products, bingos, percentinfo, colums, pagesize, listurl, listhead, pathinfo} from '@/module/admin/config/storeinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist', 'addlist'
let optobjinfo = [] // '编辑', '删除', '添加'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'store',
  data () {
    return {
      pageinfo: '',
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
      addbtn: addbtn,
      delbtn: delbtn,
      bingos: bingos,
      pageval: pageval,
      pagesize: pagesize,
      edit: 0,
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
    Linklist
  },
  methods: {
    pagepost (obj) {
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.del = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.addbtn = 'display:block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['store']
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
          par: {
            pageSize: obj.pagesize ? obj.pagesize : pagesize,
            pageIndex: obj.page
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
            temp[item]['id'] = objs[item].stoid
            temp[item]['name'] = objs[item].stoname
            temp[item]['local'] = objs[item].stolocalpath
            temp[item]['net'] = objs[item].stopath
            temp[item]['http'] = objs[item].tomcatmapping
            temp[item]['rtmp'] = objs[item].rtmpmapping
            temp[item]['total'] = objs[item].totalcontent
            temp[item]['use'] = objs[item].hasusedcontent
            temp[item]['alert'] = objs[item].alertconent
            temp[item]['account'] = objs[item].username
            temp[item]['password'] = objs[item].password
            temp[item]['ftpip'] = objs[item].ftppath
            temp[item]['ftppass'] = objs[item].ftppassword
            temp[item]['ftpaccount'] = objs[item].ftpusername
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
      if (to.name === 'AJstore') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

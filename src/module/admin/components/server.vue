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
		      <List :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pageval="pageval" :bingos="bingos" :pagesize="pagesize" @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import {powerinfo, serverinfos, optobjinfo1All, opteventAll, optobjinfoAll, pageval, products, bingos, infoval, pagesize, colums, percentinfo, listurl, listhead, pathinfo} from '@/module/admin/config/serverinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist', 'addlist'， 'rela', 'store'
let optobjinfo = [] // '编辑', '删除', '添加', '关联教室'， '关联存储区'
let optobjinfo1 = []
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'server',
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
      optobjinfo1: optobjinfo1,
      optobjinfo1All: optobjinfo1All,
      pathinfo: pathinfo,
      addbtn: addbtn,
      delbtn: delbtn,
      bingos: bingos,
      pageval: pageval,
      pagesize: pagesize,
      edit: 0,
      del: 0,
      rela: 0,
      store: 0,
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
    getServerTypeText (type) {
      for (var info of serverinfos) {
        if (info.value === type) {
          return info.txt
        }
      }
      return ''
    },

    pagepost (obj) {
      this.optevent = []
      this.optobjinfo = []
      this.optobjinfo1 = []
      this.edit = 0
      this.del = 0
      this.rela = 0
      this.store = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.addbtn = 'display:block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
        this.optobjinfo1 = this.optobjinfo1All
      } else {
        let power = this.$store.state.powerinfo['server']
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
                  this.optobjinfo1.push(powerinfo.OeN)
                }
                this.edit++
                break
              case 'dellist':
                if (!this.del) {
                  this.optevent.push(powerinfo.OPdlist)
                  this.optobjinfo.push(powerinfo.OdN)
                  this.optobjinfo1.push(powerinfo.OdN)
                  this.delbtn = 'display:block'
                }
                break
              case 'rela':
                if (!this.rela) {
                  this.optevent.push(powerinfo.OPrelalist)
                  this.optobjinfo.push(powerinfo.OrelaN)
                  this.optobjinfo1.push(powerinfo.OrelaN)
                }
                this.rela++
                break
              case 'store':
                if (!this.store) {
                  this.optevent.push(powerinfo.OPstorelist)
                  this.optobjinfo.push(powerinfo.OstoreN)
                }
                this.store++
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
            pageIndex: obj.page,
            type: 6
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let temp = []
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].deviceId
            temp[item]['name'] = objs[item].deviceName
            temp[item]['ip'] = objs[item].deviceIp
            // temp[item]['type'] = serverinfos[objs[item].type - 6].txt
            temp[item]['type'] = that.getServerTypeText(objs[item].type)
            temp[item]['typeval'] = objs[item].type
            temp[item]['device'] = objs[item].isValid ? '是' : '否'
            temp[item]['deviceval'] = objs[item].isValid
            if (objs[item].type === 6) {
              temp[item].opt = that.optobjinfo
            } else {
              temp[item].opt = that.optobjinfo1
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
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJserver') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

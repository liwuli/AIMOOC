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
    			<div class="G_search" >
					 		<div class="optline" style="float: right;width:auto">
								<div :style="addbtn"  class="addall" @click="add">{{basicinfo.addallN}}</div>
							</div>
					 </div>
		      <List  :totalnum="totalnum"  :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/list'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {basicinfo, powerinfo, pageval, infoval, opteventAll, optobjinfoAll, products, bingos, percentinfo, colums, pagesize, listurl, listhead, pathinfo} from '@/module/admin/config/dutyinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist', 'addlist'
let optobjinfo = [] // '编辑', '删除', '添加'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJduty',
  data () {
    return {
      basicinfo: basicinfo,
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
    add () {
      this.$router.push({name: pathinfo.prex + 'add'})
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.del = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.addbtn = 'display:block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['duty']
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
            postName: ''
          }
        }
      })
      .then(function (res) {
        let temp = []
        let optobj = that.optobjinfo
        let objs = res.data.data
        that.pageinfo = Math.ceil(objs.length / pagesize)
        that.totalnum = objs.length
        let start = (that.pageval - 1) * pagesize
        for (let item = start; item < objs.length; item++) {
          temp[item - start] = {}
          temp[item - start]['id'] = objs[item].postId
          temp[item - start]['positionName'] = objs[item].postName
          temp[item - start]['description'] = objs[item].description
          temp[item - start].opt = optobj
          temp[item - start].selected = false
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
      if (to.name === 'AJduty') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

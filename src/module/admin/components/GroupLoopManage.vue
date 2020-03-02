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
    			<div class="optline" >
					<div class="addall" @click="add">{{loopclassgroupinfo.add}}</div>
					<!--<div :style="addbtn"  class="addall" @click="listevent('addlist', 'null', info)">{{addallN}}</div>-->
				</div>
    			<List :totalnum="totalnum" :pageinfo="pageinfo" :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pathinfo="pathinfo" :info='products' :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import {listurl, loopclassgroupinfo, OeN, group, OdN, OrelaN, OPelist, OPdlist, OPrelalist, totalnum, pagesize, pageval, bingos, pathinfo, listhead, colums, products, percentinfo, opteventAll, optobjinfoAll} from '@/module/admin/config/GroupLoopManageinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJGroupLoopManage',
  data () {
    return {
      totalnum: totalnum,
      loopclassgroupinfo: loopclassgroupinfo,
      addbtn: addbtn,
      delbtn: delbtn,
      pagesize: pagesize,
      pageval: pageval,
      bingos: bingos,
      pageinfo: 0,
      pathinfo: pathinfo,
      products: products,
      listhead: listhead,
      optevent: optevent,
      optobjinfo: optobjinfo,
      colums: colums,
      percentinfo: percentinfo,
      edit: 0,
      del: 0,
      rela: 0
    }
  },
  created () {
    // 巡课群组
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
      let that = this
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.del = 0
      this.rela = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.addbtn = 'display:block'
        this.optevent = opteventAll
        this.optobjinfo = optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['GroupLoopManage']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'addlist':
                this.addbtn = 'display:block'
                break
              case 'editlist':
                if (!this.edit) {
                  this.optevent.push(OPelist)
                  this.optobjinfo.push(OeN)
                }
                this.edit++
                break
              case 'dellist':
                if (!this.del) {
                  this.optevent.push(OPdlist)
                  this.optobjinfo.push(OdN)
                }
                this.del++
                break
              case 'rela':
                if (!this.rela) {
                  this.optevent.push(OPrelalist)
                  this.optobjinfo.push(OrelaN)
                }
                this.rela++
                break
            }
          }
        }
      }
      this.pageval = obj.page
      this.axios({
        method: 'post',
        url: listurl,
        data: {page: {pageIndex: this.pageval, pageSize: this.pagesize}}
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.loopClassGroupList
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = objs.length
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].loopClassGroupId
            temp[item]['name'] = objs[item].loopClassGroupName
            temp[item]['type'] = group[objs[item].groupType - 1].txt
            temp[item]['Query'] = {ClassGroupId: objs[item].loopClassGroupId, groupType: objs[item].groupType}
            temp[item]['typeval'] = objs[item].groupType
            temp[item]['rela'] = objs[item].modelName
            temp[item]['relaid'] = objs[item].modelId
            if (objs[item].groupType === 2) {
              temp[item]['casetype'] = 'relleader'
            } else if (objs[item].groupType === 3) {
              temp[item]['casetype'] = 'relassistant'
            } else {
              temp[item]['casetype'] = 'relother'
            }
            temp[item].opt = that.optobjinfo
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
    },
    add () {
      this.$router.push({name: 'AJGroupLoopManageadd'})
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJGroupLoopManage') {
        this.pagepost({page: this.pageval})
      }
    }
  },
  mounted () {
    /*if (location.hash.indexOf('GroupLoopManage') >= 0) {
      document.querySelector('a[href="#/GroupLoopManage"]').setAttribute('class', 'a active')
      document.querySelector('a[href="#/GroupLoopManage"]').parentNode.querySelector('.icon-jiantou').click()
    }*/
  }
}
</script>

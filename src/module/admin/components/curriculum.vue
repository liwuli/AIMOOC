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
    			<div class="optline">
				 		<span class="addall" :style="imports" @click="screenImport">{{screenImportN}}</span>
				 	</div>
		      <List :totalnum="totalnum" :pagesize="pagesize" :pathinfo="pathinfo" :pagestyles="pagestyles" :info='products' @start="start" @close="closefn" :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import {pagesize, OsN, OcN, openN, pagestyles, OPslist, OdN, OPdlist, OPclist, closeN, screenImportN, editurl, opteventAll, optobjinfoAll, opteventAllA, optobjinfoAllA, products, infoval, colums, percentinfo, listurl, listhead, pathinfo} from '@/module/admin/config/coursescreeninfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let imports = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJcurriculum',
  data () {
    return {
      products: products,
      pagesize: pagesize,
      pagestyles: pagestyles,
      infoval: infoval,
      percentinfo: percentinfo,
      imports: imports,
      colums: colums,
      listhead: listhead,
      screenImportN: screenImportN,
      optevent: optevent,
      optobjinfo: optobjinfo,
      pathinfo: pathinfo,
      addbtn: addbtn,
      delbtn: delbtn,
      open: 0,
      close: 0,
      del: 0,
      importsnum: 0,
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
      this.del = 0
      this.close = 0
      this.open = 0
      this.importsnum = 0
      this.optevent = []
      this.optobjinfo = []
      if (this.$store.state.userinfo.userName !== 'admin') {
        let power = this.$store.state.powerinfo['curriculum']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'dellist':
                if (!this.del) {
                  this.optevent.push(OPdlist)
                  this.optobjinfo.push(OdN)
                }
                this.del++
                break
              case 'start':
                if (!this.open) {
                  this.optevent.push(OPslist)
                  this.optobjinfo.push(OsN)
                }
                this.open++
                break
              case 'close':
                if (!this.close) {
                  this.optevent.push(OPclist)
                  this.optobjinfo.push(OcN)
                }
                this.close++
                break
              case 'imports':
                if (!this.importsnum) {
                  this.imports = 'display: block'
                }
                this.importsnum++
                break
            }
          }
        }
      } else {
        this.imports = 'display: block'
      }
      let that = this
      this.axios({
        method: 'post',
        url: listurl
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.courseScreens
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item].opt = []
          temp[item].optevent = []
          temp[item]['id'] = objs[item].id
          temp[item]['name'] = objs[item].name
          temp[item]['code'] = objs[item].code
          temp[item]['status'] = (objs[item].status === 0) ? closeN : openN
          temp[item]['type'] = objs[item].type
          temp[item]['position'] = objs[item].position
          if (that.$store.state.userinfo.userName === 'admin') {
            that.optevent = []
            that.optobjinfo = []
            if (!objs[item].type) { // 系统标签（不可删除）
              if (objs[item].status === 0) { // 关闭状态
                that.optobjinfo.push(OsN)
                temp[item].opt = that.optobjinfo
                that.optevent.push(OPslist)
                temp[item].optevent = that.optevent
              } else {
                that.optobjinfo.push(OcN)
                temp[item].opt = that.optobjinfo
                that.optevent.push(OPclist)
                temp[item].optevent = that.optevent
              }
            } else { // 自定义标签（可删除）
              if (!objs[item].status) { // 关闭状态
                temp[item].opt = optobjinfoAllA
                temp[item].optevent = opteventAllA
              } else {
                temp[item].opt = optobjinfoAll
                temp[item].optevent = opteventAll
              }
            }
          } else { // 其他用户
            if (!objs[item].type) { // 系统标签（不可删除）
              if (objs[item].status === 0) { // 关闭状态
                let temps = []
                let tempinfos = []
                for (let items = 0; items < that.optevent.length; items++) {
                  if (that.optevent[items] !== 'close' && that.optevent[items] !== 'dellist') {
                    temps.push(that.optevent[items])
                    tempinfos.push(that.optobjinfo[items])
                  }
                }
                temp[item].opt = tempinfos
                temp[item].optevent = temps
              } else {
                let temps = []
                let tempinfos = []
                for (let items = 0; items < that.optevent.length; items++) {
                  if (that.optevent[items] !== 'start' && that.optevent[items] !== 'dellist') {
                    temps.push(that.optevent[items])
                    tempinfos.push(that.optobjinfo[items])
                  }
                }
                temp[item].opt = tempinfos
                temp[item].optevent = temps
              }
            } else { // 自定义标签（可删除）
              if (!objs[item].status) { // 关闭状态
                let temps = []
                let tempinfos = []
                for (let items = 0; items < that.optevent.length; items++) {
                  if (that.optevent[items] !== 'close') {
                    temps.push(that.optevent[items])
                    tempinfos.push(that.optobjinfo[items])
                  }
                }
                temp[item].opt = tempinfos
                temp[item].optevent = temps
              } else {
                let temps = []
                let tempinfos = []
                for (let items = 0; items < that.optevent.length; items++) {
                  if (that.optevent[items] !== 'start') {
                    temps.push(that.optevent[items])
                    tempinfos.push(that.optobjinfo[items])
                  }
                }
                temp[item].opt = tempinfos
                temp[item].optevent = temps
              }
            }
          }
          temp[item].selected = false
        }
        that.products = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    screenImport () {
      this.$router.push({name: 'AJcurriculumimport'})
    },
    start (obj) {
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        data: {
          id: obj.item.id,
          status: 1
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
        } else {
          that.pagepost({page: 1})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    closefn (obj) {
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        data: {
          id: obj.item.id,
          status: 0
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
        } else {
          that.pagepost({page: 1})
        }
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
      if (to.name === 'AJcurriculum') {
        this.pagepost({page: 1})
      }
    }
  }
}
</script>

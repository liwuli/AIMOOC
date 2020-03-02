<template>
  <div class="app" :style="appstyle">
  	<Ghead></Ghead>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<AJposition></AJposition>
    			<div class="G_search" :addbtn="addbtn" >
            <div class="optline" style="float: right;width:auto">
              <div :style="addbtn" class="addall" @click="add">{{basicinfo.addallN}}</div>
            </div>
					 </div>
		      <List :totalnum="totalnum" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import {basicinfo, powerinfo, pagesize, warntxt, pageval, optobjinfoAllA, opteventAllA, opteventAll, optobjinfoAll, products, infoval, bingos, colums, percentinfo, listurl, listhead, pathinfo} from '@/module/admin/config/bannerinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
export default {
  name: 'AJbanner',
  data () {
    return {
      pageinfo: '',
      products: products,
      appstyle: 'min-height:' + window.innerHeight + 'px',
      basicinfo: basicinfo,
      infoval: infoval,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      optevent: optevent,
      optobjinfo: optobjinfo,
      pathinfo: pathinfo,
      bingos: bingos,
      addbtn: addbtn,
      pageval: pageval,
      pagesize: pagesize,
      edit: 0,
      del: 0,
      totalnum: 0,
      publish: 0,
      publishedval: 0
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
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.publishedval = 0
      this.del = 0
      this.publish = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.addbtn = 'display:block'
      } else {
        let power = this.$store.state.powerinfo['banner']
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
              case 'publish':
                this.publish++
                break
            }
          }
        }
      }
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: listurl
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.data
        that.pageinfo = Math.ceil(objs.length / pagesize)
        that.totalnum = objs.length
        let start = (that.pageval - 1) * pagesize
        for (let item = 0; item < objs.length; item++) {
          if (objs[item].status !== 0) {
            that.publishedval ++
          }
        }
        for (let item = start; item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length); item++) {
          temp[item - start] = {}
          temp[item - start]['id'] = objs[item].bannerId
          temp[item - start]['img'] = objs[item].bannerUrl
          temp[item - start]['img-html'] = '<img src=' + objs[item].bannerUrl + ' style="margin:5px;height:34px" />'
          temp[item - start]['des'] = objs[item].description
          temp[item - start]['link'] = objs[item].imgUrl
          temp[item - start]['style'] = 'height:45px;line-height:45px;'
          temp[item - start]['optstyle'] = 'marin-top:10px'
          temp[item - start]['state'] = objs[item].status
          temp[item - start]['stateval'] = that.changestate(objs[item].status)
          temp[item - start]['publishedval'] = that.publishedval
          if (that.$store.state.userinfo.userName === 'admin') {
            if (objs[item].status !== 0) {
              temp[item - start].opt = optobjinfoAllA
              temp[item - start].optevent = opteventAllA
            } else {
              temp[item - start].opt = optobjinfoAll
              temp[item - start].optevent = opteventAll
            }
          } else {
            if (objs[item].status !== 0) {
              let temps = []
              let tempinfos = []
              for (let items = 0; items < that.optevent.length; items++) {
                if (that.optevent[items] !== 'publish' && that.optevent[items] !== 'editlist mt10' && that.optevent[items] !== 'dellist mt10') {
                  temps.push(that.optevent[items])
                  tempinfos.push(that.optobjinfo[items])
                }
              }
              temps.push('unpublish mt10') // 已发布
              tempinfos.push(powerinfo.OunpublishN) // 已发布
              temp[item - start].opt = tempinfos
              temp[item - start].optevent = temps
            } else {
              let temps = []
              let tempinfos = []
              for (let items = 0; items < that.optevent.length; items++) {
                if (that.optevent[items] !== 'publish') {
                  temps.push(that.optevent[items])
                  tempinfos.push(that.optobjinfo[items])
                }
              }
              temps.push('publish mt10') // 未发布
              tempinfos.push(powerinfo.OpublishN) // 未发布
              temp[item - start].opt = tempinfos
              temp[item - start].optevent = temps
            }
          }
          temp[item - start].selected = false
        }
        that.products = temp
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    changestate (state) {
      return state ? warntxt.publish : warntxt.unpublish
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJbanner') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

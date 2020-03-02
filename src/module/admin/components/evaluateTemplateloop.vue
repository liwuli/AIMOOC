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
    			<div class="evalueatetab">
    				<span class="span" @click="jumptourl(item, ind)" :class="evaluateselected[ind]" v-for="(item, ind) in evaluatetab">{{item.name}}</span>
    			</div>
    			<div class="G_search" style="margin-bottom: 20px;">

            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{evaluateTemplateNameN}}:</span>
              <el-input style="float: left;width: 150px;margin-left: 20px;"
                placeholder="请输入模板名称"
                v-model="val"
                clearable>
              </el-input>
            </div>
            <el-button type="primary" @click="search" style="float: left;margin-left: 20px;margin-top: 20px;" icon="el-icon-search">搜索</el-button>
    				<div class="btn" style="float: right;margin-top: 40px;"  @click="addfn">{{evaluateTemplateinfo.addN}}</div>
					 	<!-- <div class="btn" style="float: right;margin-right: 10px;" @click="search">{{evaluateTemplateinfo.searchN}}</div> -->
					 	<!-- <input type="text" :style="searchinput" v-model="val" style="border-right: none;float: right;"/> -->
					</div>

		      <List :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :pagesize="pagesize" :colums="colums" :percentinfo='percentinfo'></List>
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
import {loopurl, evaluateTemplateinfo, pageval, evaluatetab, infoval, opteventAll, optobjinfoAll, opteventAllA, optobjinfoAllA, products, OeN, evaluateTemplateNameN, searchstyle, searchinput, OdN, OpublishN, OunpublishN, OsettemplateN, OPpublishlist, OPunpublishlist, OPsettemplatelist, OPelist, OPdlist, bingos, percentinfo, colums, pagesize, listhead, pathinfo} from '@/module/admin/config/evaluateTemplateloopinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist', 'addlist'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJevaluateTemplateloop',
  data () {
    return {
      products: products,
      evaluateTemplateinfo: evaluateTemplateinfo,
      evaluatetab: evaluatetab,
      evaluateselected: ['', 'selected'],
      infoval: infoval,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      optevent: optevent,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      opteventAllA: opteventAllA,
      optobjinfoAllA: optobjinfoAllA,
      pathinfo: pathinfo,
      searchinput: searchinput,
      searchstyle: searchstyle,
      evaluateTemplateNameN: evaluateTemplateNameN,
      addbtn: addbtn,
      delbtn: delbtn,
      bingos: bingos,
      pageval: pageval,
      pagesize: pagesize,
      pageinfo: '',
      edit: 0,
      del: 0,
      settemplate: 0,
      publish: 0,
      unpublish: 0,
      totalnum: 0,
      val: ''
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
    addfn () {
      this.$router.push({name: pathinfo.prex + 'add'})
    },
    jumptourl (item, ind) {
      if (ind !== 1) {
        this.$router.push({name: item.pathname})
      }
    },
    pagepost (obj) {
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.del = 0
      this.publish = 0
      this.unpublish = 0
      this.settemplate = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.addbtn = 'display:block'
//      this.optevent = opteventAll
//      this.optobjinfo = optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['evaluateTemplate']
        if (power && power.length !== 0) {
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
                  this.delbtn = 'display:block'
                }
                this.del++
                break
              case 'publish':
                if (!this.publish) {
                  this.optevent.push(OPpublishlist)
                  this.optobjinfo.push(OpublishN)
                }
                this.publish++
                break
              case 'unpublish':
                if (!this.unpublish) {
                  this.optevent.push(OPunpublishlist)
                  this.optobjinfo.push(OunpublishN)
                }
                this.unpublish++
                break
              case 'settemplate':
                if (!this.settemplate) {
                  this.optevent.push(OPsettemplatelist)
                  this.optobjinfo.push(OsettemplateN)
                }
                this.settemplate++
                break
            }
          }
        }
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: loopurl,
        data: {
          modelName: that.val,
          isPublish: -1,
          isDelete: 0,
          curPage: this.pageval,
          pageSize: pagesize
        }
      })
      .then(function (res) {
        let objs = res.data.result
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = objs.length
        let temp = []
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].modelId
            temp[item]['evaluateTemplateName'] = objs[item].modelName
            temp[item]['Query'] = {templateid: objs[item].modelId, evaluatetitle: objs[item].modelName, 'isOpen': objs[item].isPublish}
            temp[item]['isOpen'] = objs[item].isPublish ? evaluateTemplateinfo.published : evaluateTemplateinfo.unpublished
            if (that.$store.state.userinfo.userName === 'admin') {
              if (objs[item].isPublish) {
                temp[item].opt = optobjinfoAllA
                temp[item].optevent = opteventAllA
              } else {
                temp[item].opt = optobjinfoAll
                temp[item].optevent = opteventAll
              }
            } else {
              if (objs[item].isPublish) {
                let temps = []
                let tempinfos = []
                for (let items = 0; items < that.optevent.length; items++) {
                  if (that.optevent[items] !== 'publish') {
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
                  if (that.optevent[items] !== 'unpublish') {
                    temps.push(that.optevent[items])
                    tempinfos.push(that.optobjinfo[items])
                  }
                }
                temp[item].opt = tempinfos
                temp[item].optevent = temps
              }
            }
            temp[item]['isOpenval'] = objs[item].isPublish
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
    search () {
      this.pagepost({page: 1})
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJevaluateTemplateloop') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

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
		      <List :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :pageval="pageval" :bingos="bingos"
                @pagepost="pagepost" :pageinfo="totalpage" :pathinfo="pathinfo" :info='products' :head='listhead'
                :optevent='optevent' :colums="colums" :percentinfo='percentinfo'
          ></List>
    		</div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import Linklist from './linklist'
import List from '@/components/extend/listcheck'
import AJposition from '@/components/extend/position'
import {powerinfo, channellisturl, products, opteventAll, optobjinfoAll, msgN, pagesize, bingo, pageval, listhead, pathinfo, colums, percentinfo} from '@/module/admin/config/campusTVchannelinfo'
let addbtn = 'display:none'
let delbtn = 'display:none'
export default {
  name: 'AJcampusTVchannel',
  data () {
    return {
      msgN: msgN,
      totalnum: 0,
      addbtn: addbtn,
      delbtn: delbtn,
      pagesize: pagesize,
      pageval: pageval,
      bingos: bingo,
      listhead: listhead,
      pathinfo: pathinfo,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      totalpage: 0,
      colums: colums,
      percentinfo: percentinfo,
      products: products
    }
  },
  created () {
    // 获取频道列表
    this.pagepost({page: 1})
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist,
    List
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
        let power = this.$store.state.powerinfo['campusTVchannel']
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
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: channellisturl
      })
      .then(function (res) {
        let temp = []
        let optobj = that.optobjinfo
        let objs = res.data.data
        that.totalpage = Math.ceil(objs.length / pagesize)
        that.totalnum = objs.length
        let start = (that.pageval - 1) * pagesize
        for (let item = start; item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length); item++) {
          temp[item - start] = {}
          temp[item - start]['id'] = objs[item].tvChannelId
          temp[item - start]['name'] = objs[item].tvChannelName
          temp[item - start]['des'] = objs[item].description
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
      if (to.name === pathinfo.prex) {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

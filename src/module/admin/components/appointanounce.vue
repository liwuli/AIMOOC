<template>
  <div class="app" :style="appstyle">
  	<Ghead></Ghead>
  	
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<AJposition :pathobj = "pathobj"></AJposition>
    		<Linklist></Linklist>
    		<div class="AA_right">
		      <List :totalnum="totalnum" :pagesize="pagesizeten" :pageval = "pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import {optobjinfolist, bingos, pageval, opteventannlist, percentinfoannlist, columsannlist, pagesizeten, listheadlist, pathinfo, getanouceurl} from '@/module/admin/config/appointinfo'
export default {
  name: 'AJappointanouncer',
  beforeCreate () {
    let that = this
    this.axios({
      method: 'post',
      url: getanouceurl
    })
    .then(function (res) {
      that.pageinfo = Math.ceil(res.data.result.length / pagesizeten)
      let temp = []
      let optobj = optobjinfolist
      let objs = res.data.result
      for (let item = 0; item < objs.length; item++) {
        if (item < pagesizeten) {
          temp[item] = {}
          temp[item]['ind'] = item
          temp[item]['id'] = objs[item].announcementId
          temp[item]['title'] = objs[item].announcementTitle
          temp[item]['content'] = objs[item].announcementDetail
          temp[item].opt = optobj
          temp[item].selected = false
        }
      }
      that.products = temp
      that.bingos = []
      that.bingos[0] = 'selected'
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  data () {
    return {
      products: [],
      appstyle: 'min-height:' + window.innerHeight + 'px',
      infoval: [],
      percentinfo: percentinfoannlist,
      colums: columsannlist,
      listhead: listheadlist,
      optevent: opteventannlist,
      pathinfo: pathinfo,
      bingos: bingos,
      pageval: pageval,
      pagesizeten: pagesizeten,
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
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: getanouceurl
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.result.length / pagesizeten)
        that.totalnum = res.data.result.length
        let temp = []
        let optobj = optobjinfolist
        let objs = res.data.result
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesizeten) {
            temp[item] = {}
            temp[item]['ind'] = item
            temp[item]['id'] = objs[item].announcementId
            temp[item]['title'] = objs[item].announcementTitle
            temp[item]['content'] = objs[item].announcementDetail
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
      if (to.name === 'AJappointanouncer') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

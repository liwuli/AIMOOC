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
    			<!--<AJposition :pathobj = "pathobj"></AJposition>-->
    			<div class="G_positon">
    				<div class="item">
    					<a href="#/teachclass" class="active">{{teachclassinfo.classinfo}}</a>
    					<span class="separator">></span>
    				</div>
    				<div class="item">
    					&nbsp;&nbsp;{{teachclassinfo.userlist}}
    				</div>
    			</div>
    			<div class="G_search">
	    			<div class="part">
					 	  <span class="txt" style="line-height: 30px;">{{teachclassinfo.name}}:</span>
					 	  <span class="txt" style="line-height: 30px;">{{classname}}</span>
					 	</div>
					 	<div class="part" >
					 	  <span class="txt" style="line-height: 30px;">{{teachclassinfo.type}}:</span>
					 	  <span class="txt" style="line-height: 30px;">{{teachclassinfo.typejx}}</span>
					 	</div>
					 	<input type="text"  v-model="val" :placeholder="teachclassinfo.username" style="width:150px;border-right: none;margin-left: 377px;" />
					 	<div class="btn" style="float: left;" @click="search">{{searchN}}</div>
				 	</div>
				 	<!--<div class="optline">
				 		<div class="addall" @click="addfn">{{teachclassinfo.add}}</div>
				 	</div>-->
		      <List  :totalnum="totalnum" :addQuery="Query" :addbtn="addbtn" :delbtn="delbtn" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :pagesize="pagesize" :colums="colums" :percentinfo='percentinfo'></List>
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
import {searchN} from '@/components/config/listinfo'
import {teachclassinfo, pageval, infoval, stopteventAll, stoptobjinfoAll, products, bingos, stpercentinfoadd, stcolumsadd, pagesize, stlisturl, stlistheadadd, stpathinfo} from '@/module/admin/config/teachclassinfo'
// 权限处理
let addbtn = 'display: block'
let delbtn = 'display: block'
export default {
  name: 'AJteachclassstlist',
  data () {
    return {
      pageinfo: '',
      products: products,
      evaluateselected: ['selected'],
      infoval: infoval,
      teachclassinfo: teachclassinfo,
      percentinfo: stpercentinfoadd,
      colums: stcolumsadd,
      listhead: stlistheadadd,
      optevent: stopteventAll,
      pathinfo: stpathinfo,
      searchN: searchN,
      addbtn: addbtn,
      delbtn: delbtn,
      bingos: bingos,
      pageval: pageval,
      pagesize: pagesize,
      totalnum: 0,
      val: '',
      classname: '',
      CollegeId: '',
      MajorId: '',
      CollegeName: '',
      MajorName: '',
      Query: {},
      classid: ''
    }
  },
  created () {
    this.classid = this.geturlparam('ClassGroupId', location.hash)
    this.classname = decodeURIComponent(this.geturlparam('name', location.hash))
    this.Query = {name: this.classname, ClassGroupId: this.classid}
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist
  },
  methods: {
//  addfn () {
//    this.$router.push({'name': stpathinfo.prex + 'add', query: this.Query})
//  },
    geturlparam (name, url) {
      let urls = url.split('?')[1].split('&')
      let val = ''
      for (let item = 0; item < urls.length; item++) {
        if (name === urls[item].split('=')[0]) {
          val = urls[item].split('=')[1]
          break
        }
      }
      return val
    },
    jumptourl (item, ind) {
      if (ind !== 0) {
        this.$router.push({name: item.pathname})
      }
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: stlisturl,
        data: {
          classesId: that.classid,
          keywords: that.val,
          page: {
            pageSize: pagesize,
            pageIndex: obj.page
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let temp = []
        let objs = res.data.classesStudentList
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].userId
            temp[item]['Query'] = that.Query
            temp[item]['college'] = objs[item].collegeName
            temp[item]['major'] = objs[item].majorName
            temp[item]['code'] = objs[item].code
            temp[item]['name'] = objs[item].realName
            temp[item].opt = stoptobjinfoAll
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
      if (to.name === stpathinfo.prex) {
        this.pagepost({page: this.pageval})
      }
    }
  },
  mounted () {
    this.pagepost({page: 1})
  }
}
</script>

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
    			<div class="usertab">
    				<span class="span" :class="usertabind[ind]" @click="jumpto(item)" v-for="(item, ind) in usertab">{{item.name}}</span>
    			</div>
    			<div class="G_search" :style="searchstyle">
    				<div class="part" >
					 	  <span class="txt">{{teacherinfo.dept}}</span>
					 	  <div id='select85' style="margin-top: 3px;width:162px"></div>
            	<select id="select86"></select>
					 	</div>
					 	<div class="part" >
					 	  <span class="txt">{{teacherinfo.duty}}</span>
					 	  <div id='select89' style="margin-top: 3px;width:162px"></div>
            	<select id="select90"></select>
					 	</div>
					 	<div class="part" >
					 	  <span class="txt">{{teacherinfo.name}}</span>
					 	  <input type="text" :style="searchinput" v-model="val" />
					 	</div>
					 	<div class="btn" @click="pagepost" style="float: left;">{{searchN}}</div>
					 	<div class="btn" :import = "imports" @click="importuser" style="position: absolute;top: 182px;">{{importN}}</div>
					 </div>
		      <List  :totalnum="totalnum" :pagesize="pagesize" :addbtn="addbtn" :delbtn="delbtn"   :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import {teacherinfo, usertab, usertabind, pageval, importN, opteventAll, optobjinfoAll, searchN, searchstyle, searchinput, bingos, OeN, OdN, OPelist, OPdlist, infoval, products, pagesize, percentinfo, colums, listurl, listhead, pathinfo} from '@/module/admin/config/userdeptinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJuserdept',
  created () {
    this.pagepost({page: 1})
  },
  data () {
    return {
      products: products,
      teacherinfo: teacherinfo,
      usertab: usertab,
      usertabind: ['', '', 'selected'],
      imports: imports,
      importN: importN,
      infoval: infoval,
      searchN: searchN,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      optevent: optevent,
      optobjinfo: optobjinfo,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      bingos: bingos,
      addbtn: addbtn,
      delbtn: delbtn,
      val: '',
      searchinput: searchinput,
      searchstyle: searchstyle,
      pageval: pageval,
      edit: 0,
      del: 0,
      totalnum: 0,
      pagesize: pagesize,
      dept: '',
      duty: ''
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
    importuser () {
      this.$router.push({name: 'AJuserimport'})
    },
    jumpto (item) {
      this.$router.push({name: item.jumpname})
    },
    pagepost (obj) {
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.del = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.addbtn = 'display:block'
        this.imports = 'display: block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['userdept']
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
          'params': {
            pageSize: obj.pagesize ? obj.pagesize : pagesize,
            offset: (obj.page - 1) * pagesize,
            keyword: that.val
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.result.total / pagesize)
        that.totalnum = res.data.result.total
        let temp = []
        let optobj = that.optobjinfo
        let objs = res.data.result.data
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['ind'] = item
            temp[item]['id'] = objs[item].id
            temp[item]['rname'] = objs[item].realName
            temp[item]['name'] = objs[item].userName
            temp[item]['code'] = objs[item].code
            temp[item]['sex'] = objs[item].gender === 1 ? '男' : '女'
            temp[item]['school'] = objs[item].organization
            temp[item]['schoolid'] = objs[item].organizationId
            temp[item]['phone'] = objs[item].phone
            temp[item]['tel'] = objs[item].telephone
            temp[item]['mail'] = objs[item].email
            temp[item]['passw'] = objs[item].password
            temp[item]['roleType'] = objs[item].roleType
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
  mounted () {
  	const temp = [{
  		txt: '院系',
  		value: '0'
  	}]
    let that = this
    that.$Select({
      'data': temp,
      'originS': 'multiple',
      'selectId': ['select86', 'select85'],
      'callback': function (obj) {
        if (obj.ind !== 0) {
          that.dept = obj.value
        } else {
          that.dept = ''
        }
      }
    })
    that.$Select({
      'data': temp,
      'originS': 'multiple',
      'selectId': ['select90', 'select89'],
      'callback': function (obj) {
        if (obj.ind !== 0) {
          that.duty = obj.value
        } else {
          that.duty = ''
        }
      }
    })
    document.getElementById('nav').querySelector('a[href="#/user"]').className = 'a hides active'
    document.getElementById('nav').querySelector('a[href="#/user"]').parentNode.querySelector('.icon-jiantou').click()
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJuserdept') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

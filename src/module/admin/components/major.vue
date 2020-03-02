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
    			<div class="G_search"  style="margin-top: 20px;">
    			<div class="part">
	             <span class="txt">{{basicinfo.ScollegeN}}:</span>
	            <!-- <div id='select85' ></div>
	            <select id="select86"></select> -->



	           </div>
             <el-select v-model="Scollege" clearable filterable placeholder="请选择院系" :popper-class="'el_selects_css'" style="float: left;">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
             <div class="part" style="margin-left: 40px;">
                  <span class="txt">专业:</span>
                </div>
             <el-input style="float: left;width: 150px;"
              placeholder="请输入专业名称"
              v-model="keyword"
              clearable>
            </el-input>
            <el-button type="primary" @click="pagepost({page: 1})" style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
					 	<!-- <input type="text" v-model="keyword" :placeholder="warntxt.placeholder" style="border-right:none"/> -->
					 	<!-- <div class="btn" style="float: left;" @click="pagepost({page: 1})">{{basicinfo.searchN}}</div> -->
					 </div>
					 <div class="G_search" >
					 		<div class="optline" style="float: right;width:auto">
								<div :style="addbtn" class="addall" @click="add">{{basicinfo.addallN}}</div>
							</div>
					 </div>
		      <List :totalnum="totalnum" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import {basicinfo, powerinfo, warntxt, collegeurl, pageval, opteventAll, optobjinfoAll, products, bingos, percentinfo, colums, pagesize, listurl, listhead, pathinfo} from '@/module/admin/config/majorinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist', 'addlist'
let optobjinfo = [] // '编辑', '删除', '添加'
let addbtn = 'display:none'
export default {
  name: 'AJmajor',
  data () {
    return {
      basicinfo: basicinfo,
      products: products,
      warntxt: warntxt,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      optevent: optevent,
      optobjinfo: optobjinfo,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      keyword: '',
      addbtn: addbtn,
      bingos: bingos,
      pageval: pageval,
      pagesize: pagesize,
      edit: 0,
      del: 0,
      totalnum: 0,
      Scollege: '',
      options:[],
      value:''
    }
  },
  computed: {
    pageinfo () {
      return Math.ceil(this.totalnum / this.pagesize)
    }
  },
  created () {
    this.getCollegeList()
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
    getCollegeList () {
      let that = this
      // 院系
      this.axios({
        method: 'post',
        url: collegeurl
      })
      .then(function (res) {
        // let temp = []
        // temp[0] = {value: '', txt: '全部'}
        // let objs = res.data
        // for (let item = 0; item < objs.length; item++) {
        //   temp[item + 1] = {}
        //   temp[item + 1]['value'] = objs[item].id
        //   temp[item + 1]['txt'] = objs[item].collegeName
        // }
        // that.collegeS = that.$Select({
        //   'data': temp,
        //   'originS': 'multiple',
        //   'selectId': ['select86', 'select85'],
        //   'callback': function (obj) {
        //     if (obj.ind !== 0) {
        //       that.Scollege = obj.value
        //     } else {
        //       that.Scollege = ''
        //     }
        //   },
        //   'cleartxt': '全部'
        // })

        var temp = [];
        var objs = res.data;
        for (let item = 0; item < objs.length; item++) {
          temp.push({
            value:objs[item].id,
            label:objs[item].collegeName
          })
          // temp[item]['value'] = objs[item].id
          // temp[item]['label'] = objs[item].collegeName
        }
        that.options=temp;

      })
      .catch(function (error) {
        console.log(error)
      })
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
        let power = this.$store.state.powerinfo['major']
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
      this.bingos = []
      this.bingos[this.pageval - 1] = 'selected'
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        params: {
          par: {
            collegeId: that.Scollege,
            majorName: that.keyword,
            pageSize: that.pagesize,
            pageIndex: that.pageval
          }
        }
      })
      .then(function (res) {
        that.totalnum = res.data.total || ''
        let temp = []
        let optobj = that.optobjinfo
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].majorId
          temp[item]['major'] = objs[item].majorName
          temp[item]['description'] = objs[item].description
          temp[item]['collegeId'] = objs[item].collegeId
          temp[item]['collegeName'] = objs[item].collegeName
          temp[item].opt = optobj
          temp[item].selected = false
        }
        that.products = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJmajor') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

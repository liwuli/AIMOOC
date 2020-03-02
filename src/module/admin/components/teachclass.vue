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
    				<span class="span" style="font-size: 18px;" @click="jumptourl(item, ind)" :class="evaluateselected[ind]" v-for="(item, ind) in attab">{{item.name}}</span>
    			</div>
    			<div class="G_search">
            <div class="part">
              <span class="txt" style="line-height: 30px;">学期:</span>

              <!-- <div id='select10' class="Select"></div> -->
            </div>
            <el-select v-model="termId" clearable filterable  placeholder="请选择学期" :popper-class="'el_selects_css'" style="float: left;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <span class="txt" style="float: left; line-height: 30px;margin-left: 20px;margin-right: 10px;">班级名称:</span>
            <el-input style="float: left;width: 150px;"
              placeholder="请输入班级名称"
              v-model="val"
              clearable>
            </el-input>
            <el-button type="primary" @click="search" style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
					 	<!-- <input type="text" placeholder="请输入班级名称" :style="searchinput" v-model="val" style="border-right: none;"/>
					 	<div class="btn" style="float: left;" @click="search">{{searchN}}</div> -->
					 </div>
          <div class="G_search">
            <div class="btn" style="float: right;" @click="bulkimport">批量导入</div>
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
import List from '@/components/extend/listcheck'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {searchN} from '@/components/config/listinfo'
import {termSelect,findTermsLists} from '@/module/analyze/config'
import {pageval, attab, infoval, opteventAll, optobjinfoAll, products, nameN, searchstyle, searchinput, OstN, OPstlist, bingos, percentinfo, colums, pagesize, listurl, listhead, pathinfo} from '@/module/admin/config/teachclassinfo'
// 权限处理
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJteachclass',
  data () {
    return {
      termId: '',
      termSelect: termSelect,
      products: products,
      attab: attab,
      evaluateselected: ['', 'selected'],
      infoval: infoval,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      optevent: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      searchinput: searchinput,
      searchstyle: searchstyle,
      nameN: nameN,
      searchN: searchN,
      addbtn: addbtn,
      delbtn: delbtn,
      bingos: bingos,
      pageval: pageval,
      pagesize: pagesize,
      stlist: 0,
      totalnum: 0,
      val: '',
      pageinfo: '',
      options:[]
    }
  },
  created () {
    this.pagepost({page: 1});
    this.findTermsLists();
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist
  },
  methods: {
    bulkimport () {
      this.$router.push({name: 'AJteachclassimport'})
    },

    async findTermsLists(){
      const res = await this.axios.post(findTermsLists)
      var temp = [];
      var obj = res.data.termList || []
      for (var i = 0; i<obj.length; i++ ) {
        temp.push({
          value:obj[i].termId,
          label:obj[i].termName
        })
      }
      this.options=temp;
    },

    jumptourl (item, ind) {
      if (ind === 0) {
        this.$router.push({name: item.pathname})
      }else{
				this.$router.push({name: item.pathname})
			}
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.optevent = []
      this.optobjinfo = []
      this.stlist = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.optevent = opteventAll
        this.optobjinfo = optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['classmanage']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'stlist': // 学生列表
                if (!this.stlist) {
                  this.optevent.push(OPstlist)
                  this.optobjinfo.push(OstN)
                }
                this.stlist++
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
        data: {
          majorId: '',
          classesName: that.val,
          collegeId: '',
          termId: that.termId,
          classesType: 1,
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
        let objs = res.data.classesList
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].classesId
            temp[item]['classtype'] = 1
            temp[item]['Query'] = {name: objs[item].classesName, ClassGroupId: objs[item].classesId}
            temp[item]['termName'] = objs[item].termName
            temp[item]['classesName'] = objs[item].classesName
            temp[item]['collegeName'] = objs[item].collegeName
            temp[item]['courseName'] = objs[item].courseName
            temp[item]['teacherName'] = objs[item].teacherName
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
    search () {
      this.pagepost({page: 1})
    },
    termCallback (obj) {
      this.termId = obj.ind ? obj.value : ''
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === pathinfo.prex) {
        this.pagepost({page: this.pageval})
      }
    }
  },
  mounted () {
    document.getElementById('nav').querySelector('a[href="#/classmanage"]').className = 'a hides active'
    // this.termSelect(['select10'], this.termCallback)
  }
}
</script>

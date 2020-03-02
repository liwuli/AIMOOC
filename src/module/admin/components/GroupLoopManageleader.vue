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
    			<div class="G_positon">
	    			<div class="item">
	    				<a href="#/GroupLoopManage" class="active">{{loopclassgroupinfo.list}}</a>
	    				<span class="separator">&gt;</span>
	    			</div>
	    			<div class="item">
	    				{{loopclassgroupinfo.assistant}}
	    			</div>
	    		</div>
	    		<div class="G_search">
    				<div class="part" style="margin-left: 436px;">
				 	  <span class="txt" style="line-height: 30px;">{{loopclassgroupinfo.collegeN}}:</span>
				 	  <div id='select85' class="Select"  :style="selectstyle"></div>
				 	</div>
				 	<!--<div class="part" >
				 	  <span class="txt" style="line-height: 30px;">{{loopclassgroupinfo.majorN}}:</span>
				 	  <div id='select86' class="Select" ></div>
				 	</div>-->
				 	<div class="part" >
				 	  <input type="text" :style="searchinputstyle" v-model="name" :placeholder="loopclassgroupinfo.searchplaceholder"/>
				 	</div>
					 <div class="btn" @click="search">{{loopclassgroupinfo.searchN}}</div>
    			</div>
    			<div class="optline" >
					<div  class="addall"   @click="add">{{loopclassgroupinfo.adduser}}</div>
				</div>
    			<List  :totalnum="totalnum" :pagesize="pagesize" :pageinfo="pageinfo" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pathinfo="pathinfo" :info='products'  :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
// import AJposition from '@/components/extend/position'
import {collegemajorurl, leaderlisturl, loopclassgroupinfo, totalnum, pagesize, pageval, bingos, relleaderpathinfo, relleaderlisthead, relleadercolums, products, relleaderpercentinfo, relassistantopteventAll, relassistantoptobjinfoAll, relassistantopteventAllcancel, relassistantoptobjinfoAllcancel} from '@/module/admin/config/GroupLoopManageinfo'
export default {
  name: 'AJGroupLoopManagerelleader',
  data () {
    return {
      selectstyle: 'width:130px',
      searchinputstyle: 'width: 200px;',
      totalnum: totalnum,
      loopclassgroupinfo: loopclassgroupinfo,
      pagesize: pagesize,
      pageval: pageval,
      bingos: bingos,
      pageinfo: 0,
      pathinfo: relleaderpathinfo,
      products: products,
      listhead: relleaderlisthead,
      colums: relleadercolums,
      percentinfo: relleaderpercentinfo,
      name: '',
      college: '',
      major: '',
      collegeobj: '',
      majorobj: '',
      ClassGroupId: '',
      grouptype: ''
    }
  },
  created () {
    this.loopClassGroupId = this.geturlparam('ClassGroupId', location.hash)
    this.grouptype = this.geturlparam('groupType', location.hash)
    // 获取学院，专业
    this.getcollegemajor()
  },
  components: {
    Ghead,
    Gfoot,
//  AJposition,
    List,
    Linklist
  },
  methods: {
    search () {
      this.pagepost({page: 1})
    },
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
    getcollegemajor () {
      let that = this
      this.axios({
        method: 'post',
        url: collegemajorurl
      })
      .then(function (res) {
        let collegearr = [{value: '', txt: '全部'}]
        let majorarr = [[{value: '', txt: '全部'}]]
        let objs = res.data
        for (let item = 0; item < objs.length; item++) {
          collegearr.push({value: objs[item].collegeId, txt: objs[item].collegeName})
          majorarr[item + 1] = [{value: '', txt: '全部'}]
          for (let items = 0; items < objs[item].majorList.length; items++) {
            majorarr[item + 1].push({value: objs[item].majorList[items].majorId, txt: objs[item].majorList[items].majorName})
          }
        }
        that.collegeobj = that.$Select({
          'data': collegearr,
          'selectId': 'select85',
          'callback': function (obj) {
            that.college = obj.value
          }
        })
        // 巡课群组
        that.pagepost({page: 1})
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    pagepost (obj) {
      let that = this
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      this.axios({
        method: 'post',
        url: leaderlisturl,
        data: {
          loopClassGroupId: that.loopClassGroupId,
          collegeId: that.college,
          realName: that.name,
          groupType: that.grouptype,
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
        let objs = res.data.membersList
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].userId
            temp[item]['member'] = objs[item].realName
            temp[item]['loopClassGroupId'] = that.loopClassGroupId
            temp[item]['code'] = objs[item].code
            temp[item]['duty'] = objs[item].postName
            temp[item]['college'] = objs[item].collegeName
            if (!objs[item].isHeader) {
              temp[item].opt = relassistantoptobjinfoAll
              temp[item].optevent = relassistantopteventAll
            } else {
              temp[item].opt = relassistantoptobjinfoAllcancel
              temp[item].optevent = relassistantopteventAllcancel
            }
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
      this.$router.push({name: relleaderpathinfo.prex + 'add', query: {ClassGroupId: this.loopClassGroupId, collegeid: this.college, groupType: this.grouptype}})
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === relleaderpathinfo.prex) {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

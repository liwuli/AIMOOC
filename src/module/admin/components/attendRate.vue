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
    			<div class="G_search">
    				<!-- <div class="btn" @click="search" style="float: right;">{{basicinfo.searchN}}</div>

            <div class="part" style="margin-right: 0;float:right">
					 	  <span class="txt">{{basicinfo.msg}}:</span>
					 	  <input type="text" v-model="searchval" :value="searchval" style="border-right:none"/>
					 	</div> -->
					 	<!-- <div class="part" style="margin-right: 10;float:right">
					 	  <span class="txt">{{basicinfo.buildingN}}:</span>
					 	  <div id='select95' style="margin-right: 0;float:right"></div>
              <select id="select96"></select>
					 	</div> -->
            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.buildingN}}:</span>
              <el-select v-model="Sbuilding" filterable placeholder="请选择类型" popper-class="el_selects_css"
                style="float: left;margin-left: 20px;">
                <el-option v-for="item in Sbuilding_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.msg}}:</span>
              <el-input style="float: left;width: 150px;margin-left: 20px;"
                placeholder="请输入教室"
                v-model="searchval"
                clearable>
              </el-input>
            </div>
            <el-button type="primary" @click="search" style="float: left;margin-left: 20px;margin-top: 20px;" icon="el-icon-search">搜索</el-button>

    			</div>
    			<div class="servercontrolhead">
    				<span class="white"></span>
						<span class="txtdetail">{{warntxt.noclass}}</span>
						<span class="green"></span>
						<span class="txtdetail">{{warntxt.normal}}</span>
						<span class="error"></span>
						<span class="txtdetail">{{warntxt.err}}</span>
						<span class="errorppt"></span>
						<span class="txtdetail">{{warntxt.nodata}}</span>
					</div>
		      <div class="listpart" id="comecontrol" >
		      	<div class="list" :class="item.class" @click="seeevent(item)" v-for="(item, ind) in roolist">
							<span class="hides" :title="item.title">{{item.title}}</span>
							<!--<span class="hides" :title="item.state">{{item.state}}</span>-->
							<span class="hides" :title="item.courseName">{{item.courseName}}</span>
							<span class="hides" :title="item.total">{{attendrateinfo.total}}: {{item.total}} {{attendrateinfo.person}}</span>
							<span class="hides" :title="item.come">{{attendrateinfo.come}}: {{item.come}} {{attendrateinfo.person}}</span>
							<span class="hides" :title="item.percent">{{attendrateinfo.dql}}: {{item.percent}}</span>
							<!--<img v-if="item.imgurl" :src="item.imgurl"/>-->
						</div>
		      </div>
		      <page :totalnum="totalnum" :bingo="bingo" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page>
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
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import page from '@/components/extend/page'
import {basicinfo, pathinfo, timeout, getinfourl, attendrateinfo, warntxt, controllisturl} from '@/module/admin/config/attendRateinfo'
export default {
  name: 'AJattendRate',
  data () {
    return {
      wininfo: {
        contenthei: '500px'
      },
      appstyle: 'min-height:' + window.innerHeight + 'px',
      warntxt: warntxt,
      searchval: '',
      basicinfo: basicinfo,
      attendrateinfo: attendrateinfo,
      roolist: '',
      setinterval: '',
      timeout: timeout,
      totalnum: 0,
      bingo: [],
      Sbuilding: '',
      pagesize: 10,
      pageindex: 1,
      totalpage: 0,
      Sbuilding_options:[]
    }
  },
  created () {
    this.pagepost({page: 1})
    this.setintervalfn()
    this.getBuildingAndClassrooms()
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist,
    page
  },

  methods: {
    getBuildingAndClassrooms () {
      let that = this
      // 教学楼-教室
      this.axios({
        method: 'post',
        url: controllisturl
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.result

        temp.push({value: '', txt: '全部'})
        for (let item = 0; item < objs.length; item++) {
          temp.push({value: objs[item].buildingId, txt: objs[item].buildingName})
        }
        that.Sbuilding = ''
        that.Sbuilding_options=temp;
        // that.$Select({
        //   'data': temp,
        //   'originS': 'multiple',
        //   'selectId': ['select96', 'select95'],
        //   'callback': function (obj) {
        //     that.Sbuilding = obj.value
        //   },
        //   'cleartxt': '全部'
        // })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    search () {
      this.pagepost({page: 1})
      // this.setintervalfn()
    },
    setintervalfn () {
      let that = this
      // if (this.setinterval) {
      //   clearInterval(this.setinterval)
      // } else {
        this.setinterval = setInterval(function () {
          that.pagepost({page: that.pageindex})
        }, that.timeout)
      // }
    },
    seeevent (item) {
      this.$router.push({name: 'AJattendRatesee', params: {item: item}})
    },
    pagepost (obj) {
      let that = this
      this.axios({
        method: 'post',
        url: getinfourl,
        params: {
          params: {
            buildingId: that.Sbuilding,
            keyword: that.searchval
          }
        }
      })
      .then(function (res) {
        if (res.status !== 200) {
          that.win(types.resback, that.cancelfn, false)
        } else {
          if (typeof obj === 'number') {
            obj = {page: obj}
          }
//        console.log(res, 'res from come')
          that.pageindex = obj.page
          let temp = []
          let objs = res.data.result
          that.totalpage = Math.ceil(objs.length / that.pagesize)
          that.totalnum = objs.length
          let start = (that.pageindex - 1) * that.pagesize
          for (let i = start; i < (that.pageindex * that.pagesize < objs.length ? that.pageindex * that.pagesize : objs.length); i++) {
            temp[i - start] = {}
            temp[i - start]['title'] = objs[i].classroom ? objs[i].classroom.classroomName : ''
            temp[i - start]['rtmpUrl'] = objs[i].urlPath
//          temp[i - start]['state'] = objs[i].message
//          temp[i - start]['imgurl'] = objs[i].imagePath教室名称、课程名称、应到人数、实到人数、到勤率百分比
            temp[i - start]['courseName'] = objs[i].courseName
            if (objs[i].type === -1) {
              temp[i - start]['class'] = 'errorppt'
              temp[i - start]['percent'] = '0%'
              temp[i - start]['total'] = 0
              temp[i - start]['come'] = 0
            } else if (objs[i].type === 0) {
              temp[i - start]['class'] = 'errorppt'
              temp[i - start]['percent'] = '0%'
              temp[i - start]['total'] = 0
              temp[i - start]['come'] = 0
            } else if (objs[i].type === 2) {
              temp[i - start]['class'] = 'errorbg'
              temp[i - start]['total'] = objs[i].lesson.studentsInPlan
              temp[i - start]['come'] = objs[i].lesson.studentsArrivals
              temp[i - start]['percent'] = (objs[i].lesson.studentsArrivals / objs[i].lesson.studentsInPlan * 100).toFixed(1) + '%'
            } else if (objs[i].type === 3) { // 暂无课程
              temp[i - start]['class'] = 'white'
              temp[i - start]['percent'] = '0%'
              temp[i - start]['total'] = 0
              temp[i - start]['come'] = 0
            } else {
              temp[i - start]['class'] = 'green'
              temp[i - start]['total'] = objs[i].lesson.studentsInPlan
              temp[i - start]['come'] = objs[i].lesson.studentsArrivals
              temp[i - start]['percent'] = (objs[i].lesson.studentsArrivals / objs[i].lesson.studentsInPlan * 100).toFixed(1) + '%'
            }
          }
          that.roolist = temp
          that.bingo = []
          that.bingo[that.pageindex - 1] = 'selected'
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
  beforeDestroy () {
    clearInterval(this.setinterval)
  }
}
</script>

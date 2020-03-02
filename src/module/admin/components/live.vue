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
    			<div class="G_search" style="margin-bottom: 20px;">
            <!-- <div class="part" >
					 	  <span class="txt">{{liveinfo.livestatus}}</span>
					 	  <div id='select92' style="margin-top: 3px;"></div>
					 	</div> -->
            <div style="float: left;margin-top: 20px; margin-right: 20px;">
              <span class="txt" style="float: left;">{{liveinfo.livestatus}}:</span>
              <el-select v-model="type" filterable placeholder="请选择直播状态" popper-class="el_selects_css" style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in livetypearr" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div style="float: left;margin-top: 20px; margin-right: 20px;">
              <span class="txt" style="float: left;">{{liveinfo.livename}}:</span>
              <el-input style="float: left;width: 150px;margin-left: 20px;"
                placeholder="请输入直播名称"
                v-model="val"
                clearable>
              </el-input>
            </div>
					 	<!-- <div class="part" >
					 		<span class="txt">{{liveinfo.livename}}</span>
					 	  <input type="text" :style="searchinput" v-model="val"/>
					 	</div> -->

						<!-- <div class="part" >
						  <span class="txt">状态</span>
						  <div id='select2' style="margin-top: 3px;"></div>
						</div> -->
            <div style="float: left;margin-top: 20px; margin-right: 20px;">
              <span class="txt" style="float: left;">状态:</span>
              <el-select v-model="isPublish" filterable placeholder="请选择直播状态" popper-class="el_selects_css" style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in stutasarr" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div style="float: left;margin-top: 20px; margin-right: 20px;">
              <span class="txt" style="float: left;">排序:</span>
              <el-select v-model="ordertype" @change="ordertype_change" filterable placeholder="请选择排序" popper-class="el_selects_css" style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in ordertypearr" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">时间:</span>
              <el-date-picker style="float: left; margin-left: 20px;"
                ref="time_picker"
                v-model="select_time"
                type="daterange"
                align="right"
                unlink-panels
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="getStatusList">
              </el-date-picker>
            </div>

            <el-button type="primary" @click="search"style="float: left;margin-top: 20px;" icon="el-icon-search">搜索</el-button>
					 	<!-- <div style="float: left;width: 100%;">
					 		<div class="part" >
						 	  <span class="txt">{{liveinfo.stime}}:</span>
						 	  <Calendarme :dateval="sdateval" :valshow="svalshow" :part= "part" :ymdhms="ymdhms"   @beginTimefn="beginTimefn" :ids="beginTime"></Calendarme>
						 	</div>
						 	<div class="part" >
						 	  <span class="txt">{{liveinfo.etime}}:</span>
						 	  <Calendarme :dateval="edateval" :valshow="evalshow" :part= "part" :ymdhms="ymdhms"   @endTimefn="endTimefn" :ids="endTime"></Calendarme>
						 	</div>

						 	<div class="btn" style="float: right;" @click="search">{{basicinfo.searchN}}</div>
					 	</div> -->

					 </div>
           <!-- 排序在这 -->
					 <!-- <div class="G_search" :style="addbtn === 'display: none' ? 'width: auto;float: right;margin-bottom:0' : 'width: auto;float: right;margin-bottom:-27px'">
						 <div class="part" style="margin: 0;">
						 	  <span class="txt">{{liveinfo.pink}}</span>
						 	  <div id='select93' style="margin-top: 3px;"></div>
						 	</div>
					 	</div> -->
					<!-- 权限不同会出现批量删除 这个bug 这个页面定死 'display: none'  原本是变量  delbtn-->
		      <List :totalnum="totalnum" :optlinestyle="optlinestyle" @stopliveevent="stopliveevent" @downlevent="downlevent"  :pagesize="pagesize" :addbtn="addbtn" :delbtn="'display: none'" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import Calendarme from '@/components/extend/calendar.vue'
import {basicinfo, powerinfo, opteventAllBwait, optobjinfoAllBwait, liveinfo, pageval, infoval, opteventAll, livetypearr, ordertypearr, opteventAllA, opteventAllB, optobjinfoAll, optobjinfoAllA, optobjinfoAllB, products, searchstyle, searchinput, bingos, percentinfo, colums, pagesize, listurl, listhead, pathinfo,stutasarr} from '@/module/admin/config/liveinfo'
// 权限处理
export default {
  name: 'AJlive',
  data () {
    return {
      pageinfo: '',
      val: '',
      opteventAllBwait: opteventAllBwait,
      optobjinfoAllBwait: optobjinfoAllBwait,
      products: products,
      basicinfo: basicinfo,
      optlinestyle: 'float:left;',
      infoval: infoval,
      liveinfo: liveinfo,
      beginTime: 'beginTime',
      endTime: 'endTime',
      ymdhms: 'ymd',
      part: document.body,
      svalshow: false,
      evalshow: false,
      sdateval: '',
      edateval: '',
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      optevent: [],
      opteventAll: opteventAll,
      opteventAllA: opteventAllA,
      opteventAllB: opteventAllB,
      optobjinfoAll: optobjinfoAll,
      optobjinfoAllA: optobjinfoAllA,
      optobjinfoAllB: optobjinfoAllB,
      pathinfo: pathinfo,
      searchinput: searchinput,
      searchstyle: searchstyle,
      addbtn: 'display: none',
      delbtn: 'display: none',
      bingos: bingos,
      pageval: pageval,
      pagesize: pagesize,
      edit: 0,
      del: 0,
      type: '3',
      ordertype: '0',
      wait: [],
      living: [],
      over: [],
      livinginfo: [],
      overinfo: [],
      waitinfo: [],
      seedetail: 0,
      see: 0,
      downlist: 0,
      totalnum: 0,
      sdatevalcopy: '',
      edatevalcopy: '',
      valcopy: '',
      ordertypecopy: '0',
      typecopy: 3,
      stop: 0,
			isPublish:'',
      livetypearr:livetypearr,
      stutasarr:stutasarr,
      select_time:[],
      ordertypearr:ordertypearr
    }
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Calendarme,
    List,
    Linklist
  },
  methods: {
    ordertype_change(e){
        this.search()
    },

    getStatusList(e){

      if(e!=null){
        this.sdateval = e[0] || '';
        this.edateval = e[1] || '';
      }else{
        this.sdateval = '';
        this.edateval = '';
      }
    },

    downlevent (obj) {
      this.$router.push({name: 'AJlivedownlist', params: {item: obj.item, type: 0}})
    },

    stopliveevent (item, info) {
      this.$router.push({name: 'AJlivestoplive', params: {item: item.item}})
    },
    beginTimefn (obj) {
      if (!this.svalshow) {
        this.svalshow = true
        this.sdateval = ''
      } else {
        this.sdateval = this.formcat(obj)
        document.querySelector('#beginTime').value = this.sdateval
      }
    },
    endTimefn (obj) {
      if (!this.evalshow) {
        this.evalshow = true
        this.edateval = ''
      } else {
        this.edateval = this.formcat(obj)
        document.querySelector('#endTime').value = this.edateval
      }
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
    },
    pagepost (obj) {
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        params: {
          par: {
            liveName: that.valcopy,
            beginTime: that.sdatevalcopy === '' ? '' : (that.sdatevalcopy + ' 00:00:00'),
            endTime: that.edatevalcopy === '' ? '' : (that.edatevalcopy + ' 23:59:59'),
            pageSize: that.pagesize,
            offset: (that.pageval - 1) * pagesize,
            liveStatus: that.typecopy * 1, // 直播状态
            orderType: that.ordertypecopy, // 排序方式
						isPublish: that.isPublish
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let temp = []
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].liveId
            temp[item]['liveName'] = objs[item].liveName
            temp[item]['beginTime'] = objs[item].beginTime
            temp[item]['endTime'] = objs[item].endTime
            temp[item]['description'] = objs[item].description
			temp[item]['isPublish'] = objs[item].isPublish
			temp[item]['liveFromWhere'] = objs[item].liveFromWhere
			temp[item]['lessonId'] = objs[item].lessonId
			temp[item]['Status'] = objs[item].liveStatus
            temp[item]['liveStatus'] = that.getliveStatus(objs[item].liveStatus,objs[item].isPublish)  // 直播状态
            temp[item]['urlinfo'] = objs[item].views
            temp[item]['livetype'] = objs[item].livetype
            temp[item]['admin'] = objs[item].admin
            temp[item]['adminname'] = objs[item].adminName
            temp[item]['imgurl'] = objs[item].image
            temp[item]['isRecord'] = objs[item].isRecord
            temp[item]['type'] = 'live'
            if (that.$store.state.userinfo.userName === 'admin' || that.$store.state.userinfo.userName === 'teacher' || that.$store.state.userinfo.userName === 'sowill') {
              if (objs[item].liveStatus === 0) {
                temp[item].opt = optobjinfoAllA
                temp[item].optevent = opteventAllA
              } else if (objs[item].liveStatus === 1) {
                temp[item].opt = optobjinfoAll
                temp[item].optevent = opteventAll
              } else {
                if (objs[item].over) {
                  temp[item].opt = optobjinfoAllB
                  temp[item].optevent = opteventAllB
                } else {
                  temp[item].opt = optobjinfoAllBwait
                  temp[item].optevent = opteventAllBwait
                }
              }
            } else {
              if (objs[item].liveStatus === 0) {
                temp[item].opt = that.waitinfo
                temp[item].optevent = that.wait
              } else if (objs[item].liveStatus === 1) {
                temp[item].opt = that.livinginfo
                temp[item].optevent = that.living
              } else {
                if (objs[item].over) {
                  temp[item].opt = that.overinfo
                  temp[item].optevent = that.over
                } else {
                  temp[item].opt = that.optobjinfoAllBwait
                  temp[item].optevent = that.opteventAllBwait
                }
              }
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
    init () {
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.del = 0
      this.seedetail = 0
      this.downlist = 0
      this.stop = 0
      this.see = 0
      this.wait = []
      this.living = []
      this.over = []
      this.waitinfo = []
      this.livinginfo = []
      this.overinfo = []
      if (this.$store.state.userinfo.userName === 'admin') {
        this.addbtn = 'display:block;margin-left: 0'
      } else {
        let power = this.$store.state.powerinfo['live']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'addlist':
                this.addbtn = 'display:block;margin-left: 0'
                break
              case 'editlist':
                if (!this.edit) {
                  this.wait.push(powerinfo.OPelist)
                  this.waitinfo.push(powerinfo.OeN)
                }
                this.edit++
                break
              case 'stoplive':
                if (!this.stop) {
                  this.living.push(powerinfo.OPstoplist)
                  this.livinginfo.push(powerinfo.OstopN)
                }
                this.stop++
                break
              case 'dellist':
                if (!this.del) {
                  this.wait.push(powerinfo.OPdlist)
                  this.over.push(powerinfo.OPdlist)
                  this.waitinfo.push(powerinfo.OdN)
                  this.overinfo.push(powerinfo.OdN)
                  this.delbtn = 'display:block'
                }
                this.del++
                break
              case 'seedetail':
                if (!this.seedetail) {
                  this.living.push(powerinfo.OPseedetaillist)
                  this.livinginfo.push(powerinfo.OseedetailN)
                }
                this.seedetail++
                break
              case 'see':
                if (!this.see) {
                  this.living.push(powerinfo.OPseelist)
                  this.livinginfo.push(powerinfo.OseeN)
                }
                this.see++
                break
              case 'downlist':
                if (!this.downlist) {
                  this.over.push(powerinfo.OPdownlist)
                  this.overinfo.push(powerinfo.OdownN)
                }
                this.downlist++
                break
            }
          }
        }
      }
    },
    getliveStatus (status,isPublish) {
      switch (status) {
        case 0:
          return livetypearr[2].txt
        case 1:
          return livetypearr[1].txt
        case 2:
          return livetypearr[3].txt
				case 4:
					if(isPublish==1){
						return livetypearr[5].txt
					}else{
						return livetypearr[4].txt
					}

      }
    },
    search () {

      this.sdatevalcopy = this.sdateval
      this.edatevalcopy = this.edateval
      this.valcopy = this.val
      this.ordertypecopy = this.ordertype.toString()
      this.typecopy = this.type
      this.pagepost({page: 1})
    }

  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJlive') {
        this.pagepost({page: this.pageval})
      }
    }
  },
  created () {
    this.init()
    this.pagepost({page: 1})
  },
  mounted () {
    let that = this
  //   that.$Select({
  //     'data': livetypearr,
  //     'selectId': 'select92',
  //     'callback': function (obj) {
  //       that.type = obj.value
  //     }
  //   })
  //   that.$Select({
  //     'data': ordertypearr,
  //     'selectId': 'select93',
  //     'callback': function (obj) {
  //       that.ordertype = obj.value.toString()
  //       that.search()
  //     }
  //   })
		// that.$Select({
		//   'data': stutasarr,
		//   'selectId': 'select2',
		//   'callback': function (obj) {
		// 		console.log(obj)
		//      that.isPublish = obj.value
		//   }
		// })
  }
}
</script>

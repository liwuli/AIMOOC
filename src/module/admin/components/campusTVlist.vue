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
          <div class="G_search" style="margin-top: 14px;margin-bottom: 20px;">
					 	<!-- <div class="part">
					 	  <span class="txt">{{schoolradioinfo.searchtxt}}:</span>
					 	  <div id='select92' style="margin-top: 1px;"></div>
					 	</div> -->
            <div style="float: left;margin-top: 20px; margin-right: 20px;">
              <span class="txt" style="float: left;">{{schoolradioinfo.searchtxt}}:</span>
              <el-select v-model="channelid" filterable placeholder="请选择频道" @change="pagepost({page: 1})" popper-class="el_selects_css" style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in channelid_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <el-button type="primary" @click="jumptoadd" style="float: left;margin-top: 20px;" icon="el-icon-circle-plus-outline">{{schoolradioinfo.add}}</el-button>
          </div>
          <!-- <div class="optline" style="width: 100%">
						<div class="addall" @click="" style="margin-left: 0;" @click="jumptoadd">{{schoolradioinfo.add}}</div>
					</div> -->
          <Railc :lostday='lostday' :railpart="railpart" :topclass="topclass" :dateval="dateval" :railid="railid" :show="show" @lessevent="lessevent" @addevent="addevent" @railcevent="railcevent" ></Railc>
          <div class="G_search" style="margin: 29px 0;">
					 	<!-- <div class="part">
					 	  <span class="txt">{{schoolradioinfo.channelname}}:</span>
					 	  <input type="text" class="input" v-model="searchval" :placeholder="schoolradioinfo.keywords"/>
					 	</div> -->
            <div style="float: left;margin-top: 20px; margin-right: 20px;">
              <span class="txt" style="float: left;">{{schoolradioinfo.channelname}}:</span>
              <el-input style="float: left;width: 150px;margin-left: 20px;"
                placeholder="请输入节目关键词"
                v-model="searchval"
                clearable>
              </el-input>
            </div>
            <el-button type="primary" @click="pagepost({page: 1})" style="float: left;margin-top: 20px;" icon="el-icon-search">{{schoolradioinfo.search}}</el-button>
					 	<!-- <div class="btn" @click="pagepost({page: 1})">{{schoolradioinfo.search}}</div> -->
          </div>
          <List :totalnum="totalnum" :copy="copy" :addbtn="addbtn" @checkevent="checkevent" :delbtn="delbtn" :pagesize="pagesize" :pageval = "pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="totalpage"  :pathinfo="pathinfo" :info='channellistarr' :head='listhead' :colums="colums" :percentinfo='percentinfo'></List>
          <div class="G_search" style="margin-top: 14px;">
					 	 <div style="float: left;margin-top: 20px; margin-right: 20px;">
					 	  <span class="txt" style="float: left;">{{schoolradioinfo.copy}}:</span>
              <el-date-picker style="float: left;margin-left: 20px;"
                    v-model="dateval"
                    @change="time_change"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
					 	  <!-- <Calendarme :dateval="dateval" :valshow="valshow" :part="part" :ymdhms="ymdhms" @startfn="startfn" :ids="start"></Calendarme> -->
					 	  <el-button type="primary" @click="pagepost({page: 1})" style="float: left;margin-left: 20px;" icon="el-icon-copy-document">{{schoolradioinfo.sure}}</el-button>
              <!-- <div class="programsure" @click="copyevent" >{{schoolradioinfo.sure}}</div> -->
					 	</div>
          </div>
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
import Railc from '@/components/extend/railcschool'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import List from '@/components/extend/listcheck'
import Calendarme from '@/components/extend/calendar.vue'
import {powerinfo, programcopyurl, OPinglist, OingN, OeN, OdN, OpublishN, OunpublishN, OPdlist, OPelist, OPpublishlist, OPunpublishlist, pagesize, channellisturl, warntxt, programlisturl, programtotalnum, programtotalpage, programpageval, programpagesize, programpathinfo, schoolradioinfo, programpercentinfo, programcolums, programlisthead} from '@/module/admin/config/campusTVlistinfo'
let addbtn = 'display:none'
let delbtn = 'display:none'
export default {
  name: 'AJcampusTVlist',
  data () {
    return {
      searchval: '',
      msgN: schoolradioinfo.title,
      schoolradioinfo: schoolradioinfo,
      start: 'start',
      valshow: true,
      copy: true,
      ymdhms: 'ymd',
      dateval: '',
      part: document.body,
      show: true,
      lostday: true,
      railid: 'schoolrailpart',
      topclass: 'topclass',
      railpart: '',
      channelid: '',
      totalnum: programtotalnum,
      addbtn: addbtn,
      delbtn: delbtn,
      pagesize: programpagesize,
      pageval: programpageval,
      bingos: [],
      totalpage: programtotalpage,
      channellistarr: [],
      pathinfo: programpathinfo,
      listhead: programlisthead,
      colums: programcolums,
      percentinfo: programpercentinfo,
      warntxt: warntxt,
      channelid_options:[]
    }
  },
  created () {
    this.getchannellist()
    var data =new Date();
    var time ={
      year:data.getFullYear(),
      month:data.getMonth()+1,
      day:data.getDate()
    }
    this.dateval=  this.formcat(time);



   // this.pagepost({page: 1})
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist,
    Railc,
    List,
    Calendarme
  },
  methods: {
    checkevent (obj) {
      this.checkids = obj.item
    },
    copyevent () {
      let that = this
      this.axios({
        method: 'post',
        url: programcopyurl,
        params: {
          par: {
            tvProgramIds: that.checkids,
            time: that.dateval
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
        } else {
          that.win(res.data.data, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getchannellist () {
      let that = this
      this.axios({
        method: 'post',
        url: channellisturl
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.data
        that.totalpage = Math.ceil(objs.length / pagesize)
        that.totalnum = objs.length
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {value: objs[item].tvChannelId, txt: objs[item].tvChannelName}
        }
        if (objs.length > 0) {
          that.channelid = temp[0].value
          that.pagepost({page: 1}) // 初始化调用节目单信息
          that.channelid_options=temp;
          // that.$Select({
          //   'data': temp,
          //   'selectId': 'select92',
          //   'callback': function (obj) {
          //     that.channelid = obj.value
          //     that.pagepost({page: 1})
          //   }
          // })
        } else {
          that.win(warntxt.channelnodata, function () {
            that.$router.push({name: 'AJschoolradio'})
          }, false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumptoadd () {
      this.$router.push({name: 'AJcampusTVlistadd', query: {channelid: this.channelid, dateval: this.dateval}})
    },
    time_change(obj){

    },

    startfn (obj) {
      this.dateval = this.formcat(obj)
    },
    lessevent () {
    },
    addevent () {
    },
    railcevent (obj) {
      this.dateval = this.formcat(obj)
      this.pagepost({page: 1})
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: programlisturl,
        params: {
          par: {
            tvChannelId: that.channelid,
            tvProgramName: that.searchval,
            dayTime: that.dateval
          }
        }
      })
      .then(function (res) {
        let objs = res.data.data
        that.totalpage = Math.ceil(objs.length / that.pagesize)
        that.totalnum = objs.length
        let start = (that.pageval - 1) * that.pagesize
        let temps = []
        for (let item = start; item < (that.pageval * that.pagesize < objs.length ? that.pageval * that.pagesize : objs.length); item++) {
          temps[item - start] = {}
          temps[item - start]['opt'] = []
          temps[item - start]['optevent'] = []
          temps[item - start]['id'] = objs[item].tvProgramId
          temps[item - start]['channelid'] = objs[item].tvChannelId
          temps[item - start]['stime'] = objs[item].startTime
          temps[item - start]['etime'] = objs[item].endTime
          temps[item - start]['dateval'] = objs[item].dayTime
          temps[item - start]['name'] = objs[item].tvProgramName
          temps[item - start]['status'] = objs[item].tvProgramStatus
          temps[item - start]['liveUrl'] = objs[item].liveUrl
          temps[item - start]['videoUrl'] = objs[item].videoUrl
          temps[item - start]['isRecord'] = objs[item].isRecord
          temps[item - start]['thumbnailUrl'] = objs[item].thumbnailUrl
          temps[item - start]['oc'] = objs[item].isOpen
          if (objs[item].tvProgramStatus === 0) {
            // 未开始直播，状态有开启/关闭, 修改，删除
            if (objs[item].isOpen === 0) {
              // 关闭状态
              temps[item - start]['opt'].push(powerinfo.OpublishN)
              temps[item - start]['optevent'].push(powerinfo.OPpublishlist)
            } else {
              // 开启状态
              temps[item - start]['opt'].push(powerinfo.OunpublishN)
              temps[item - start]['optevent'].push(powerinfo.OPunpublishlist)
            }
            temps[item - start]['opt'].push(powerinfo.OeN)
            temps[item - start]['optevent'].push(powerinfo.OPelist)
            temps[item - start]['opt'].push(powerinfo.OdN)
            temps[item - start]['optevent'].push(powerinfo.OPdlist)
          } else if (objs[item].tvProgramStatus === 1) {
            // 直播中
            temps[item - start]['opt'].push(powerinfo.OingN)
            temps[item - start]['optevent'].push(powerinfo.OPinglist)
          } else {
            // 直播结束，需要判断，是否资源已生成，然后才可以回看，删除
            temps[item - start]['opt'].push(powerinfo.OdN)
            temps[item - start]['optevent'].push(powerinfo.OPdlist)
          }
        }
        that.channellistarr = temps
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: this.pathinfo.prex})
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
  watch: {
    '$route' (to, from) {
      if (to.name === programpathinfo.prex) {
        this.pagepost({page: this.pageval})
      }
    }
  },
  destroyed () {
    // document.body.removeChild(document.getElementById('start_calendar'))
  }
}
</script>

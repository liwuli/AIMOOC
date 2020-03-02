<template>
  <div class="app" :style="appstyle">
  	<Ghead></Ghead>
    <div class="center centerbottom50">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<AJposition></AJposition>
    			<div id="recordais" style="width:0;"></div>
		      <div class="G_search" style="margin-bottom: 20px;">
    				<!-- 教学楼 -->
            <!-- <div class="part" >
					 	  <span class="txt">{{basicinfo.buildingN}}:</span>
					 	  <div id='select85' style="margin-top: 3px;"></div>
							<select id="select86">{{build}}</select>
					 	</div> -->
            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.buildingN}}:</span>
              <el-cascader style="float: left;margin-left: 20px;height: 32px;"
                  v-model="select_roomid"
                  :options="roomid_options"
                  @change="handleChange">
              </el-cascader>
            </div>

					 	<!-- <div class="part">
					 	  <span class="txt">{{basicinfo.roomN}}:</span>
					 	  <div id='select87' style="margin-top: 3px;"  multiple='multiple'></div>
							<select id="select88"></select>
					 	</div> -->
            <!-- 录制类型 -->
					 	<!-- <div class="part">
					 	  <span class="txt">{{basicinfo.recordtypeN}}:</span>
					 	  <div id='select83' style="margin-top: 3px;width: 100px;">
								<div class="listinfo">{{autolist.noauto}}</div>
								<div class="listinfo">{{autolist.auto}}</div>
							</div>
					 	</div> -->
            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.recordtypeN}}:</span>
              <el-select v-model="recordtype" filterable popper-class="el_selects_css"
                style="float: left;margin-left: 20px;">
                <el-option v-for="item in recordtype_options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!-- 筛选方式 -->
					 	<!-- <div class="part">
					 	  <span class="txt">{{basicinfo.StypeN}}:</span>
					 	  <div id='select84' style="margin-top: 3px;width: 100px;">
								<div class="listinfo">{{timetype.free}}</div>
								<div class="listinfo">{{timetype.week}}</div>
								<div class="listinfo">{{timetype.month}}</div>
							</div>
					 	</div> -->
            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.StypeN}}:</span>
              <el-select v-model="type" filterable popper-class="el_selects_css"
                style="float: left;margin-left: 20px;" @change="type_change">
                <el-option v-for="item in type_options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!-- 学期 -->
					 	<!-- <div class="part" v-show="termshow">
					 	  <span class="txt">{{basicinfo.termN}}:</span>
					 	  <div id='select81' style="margin-top: 3px;width: 120px;" multiple='multiple'></div>
							<select id="select82">{{term}}</select>
					 	</div> -->
            <div v-show="termshow" style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.termN}}:</span>
              <el-select v-model="term" filterable popper-class="el_selects_css"
                style="float: left;margin-left: 20px;">
                <el-option v-for="item in term_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

					 	<!-- <div class="part" v-show="termshow">
					 	  <span class="txt">{{basicinfo.startWeekN}}:</span>
					 	  <input style="width: 100px;" type="number" min="0" :value="weekval" v-model="weekval" :max="weekno" step="1" />
					 	</div> -->
            <div v-show="termshow" style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.startWeekN}}:</span>
              <el-input-number v-model="weekval"  :min="1" :max="52" style="float: left;margin-left: 20px;"></el-input-number>
            </div>

					 	<!-- <div class="part" v-show="termshow">
					 	  <span class="txt">{{basicinfo.endWeekN}}:</span>
					 	  <input style="width: 100px;" type="number" min="weekval" :value="eweekval" v-model="eweekval" step="1" :max="weekno"/>
					 	</div> -->

            <div v-show="termshow" style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.endWeekN}}:</span>
              <el-input-number v-model="eweekval"  :min="(weekval+1)" :max="52" style="float: left;margin-left: 20px;"></el-input-number>
            </div>

            <!-- 月份 -->
					 	<!-- <div class="part" v-show="ymshow">
					 	  <span class="txt">{{basicinfo.dateN}}:</span>
					 	  <Calendarme :inputstyle="styles" :dateval="dateval" :valshow="valshow" :part= "part" :ymdhms="ymdhms" @startfn="startfn" :ids="start"></Calendarme>
					 	</div>
					 	<div class="part" v-show="ymshow">
					 	  <span class="txt">{{basicinfo.edateN}}:</span>
					 	  <Calendarme :inputstyle="styles" :dateval="edateval" :valshow="valshow" :part= "part" :ymdhms="ymdhms" @endfn="endfn" :ids="end"></Calendarme>
					 	</div> -->
            <div v-show="ymshow" style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">选择月份:</span>
              <el-date-picker style="float: left; margin-left: 20px;"
                ref="time_picker"
                v-model="select_data"
                type="monthrange"
                align="right"
                unlink-panels
                format="yyyy-MM"
                value-format="yyyy-MM"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="getStatusList2">
              </el-date-picker>
            </div>


            <!-- 自由 -->
            <div v-show="freeymshow" style="float: left;margin-right: 20px;margin-top: 20px;">
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
                :picker-options="pickerOptions"
                @change="getStatusList">
              </el-date-picker>
            </div>



					 	<!-- <div class="part" v-show="freeymshow">
					 	  <span class="txt">{{basicinfo.sdateN}}:</span>
					 	  <Calendarme :inputstyle="styles" :dateval="sdateval" :valshow="valshow" :part= "part" :ymdhms="ymd" @sstartfn="sstartfn" :ids="sstart"></Calendarme>
					 	</div>
					 	<div class="part" v-show="freeymshow">
					 	  <span class="txt">{{basicinfo.eedateN}}:</span>
					 	  <Calendarme :inputstyle="styles" :dateval="eedateval" :valshow="valshow" :part= "part" :ymdhms="ymd" @eendfn="eendfn" :ids="eend"></Calendarme>
					 	</div> -->


					 	<!-- <div class="btn" @click="search" style="border-radius: 3px;float: right;">{{basicinfo.searchN}}</div> -->
            <el-button type="primary" @click="search"style="float: left;margin-left: 20px;margin-top: 20px;" icon="el-icon-search">搜索</el-button>
    			</div>
    			<div class='AA_listhead'>
						<div class='item' :class="percentinfo[ind]" v-for='(item, ind) in head'>
							{{item}}
						</div>
					</div>
					<div class='AA_list' id="fatherlist">
						<div class="lists" v-for='item in info'>
							<div  :title="items" class="item hides" :class="percentinfo[ind]" v-for="(items, ind) in item">
								{{items}}
							</div>
						</div>
					</div>
					<div class='AA_list' style="margin-top: -1px;">
						<div class="lists">
							<div class='item' :class="percentinfo[ind]" v-for='(item, ind) in infores'>
								{{item}}
							</div>
						</div>
					</div>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
  </div>
</template>

<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import Calendarme from '@/components/extend/calendar.vue'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {basicinfo, timetype, autolist, pathinfo, termurl, percentinfo, listhead, roomurl, listurl} from '@/module/admin/config/analysisinfo'
export default {
  name: 'AJanalysis',
  data () {
    return {
      appstyle: 'min-height:' + window.innerHeight + 'px',
      basicinfo: basicinfo,
      autolist: autolist,
      timetype: timetype,
      head: listhead,
      percentinfo: percentinfo,
      term: '',
      ymdhms: 'ym',
      ymd: 'ymd',
      valshow: true,
      weekval: 1,
      eweekval: 1,
      type: 1,
      start: 'start',
      sstart: 'sstart',
      sdateval: '',
      eedateval: '',
      end: 'end',
      eend: 'eend',
      dateval: '',
      edateval: '',
      styles: 'width:100px',
      ymshow: false,
      freeymshow: true,
      termshow: false,
      weekno: 0,
      recordtype: 1,
      buildobj: '',
      roomobj: '',
      build: '',
      roomid: '',
      info: [],
      infores: [],
      part: document.body,
      roomid_options:[],
      select_roomid:[],
      recordtype_options:[
        {
          value:0,
          label:'手动'
        },
        {
          value:1,
          label:'自动'
        }
        ],
      type_options:[
        {
          value:1,
          label:'自由时间'
        },
        {
          value:2,
          label:'学期周次'
        },
        {
          value:3,
          label:'月份'
        }
      ],
      select_time:[],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      term_options:[],
      select_data:[]
    }
  },
  created () {
    let that = this
    let day = new Date()
    let nextDay = new Date(day.getTime() - 60 * 60 * 1000 * 24)
    this.startDate = day.toLocaleString().split(' ')[0].replace(/\//g, '-')
    this.endDate = nextDay.toLocaleString().split(' ')[0].replace(/\//g, '-')
    // var arr = new Array(this.startDate,this.endDate);
    var arr2 = new Array(this.endDate,this.startDate);
    this.select_time=arr2;
    this.select_data=arr2;
    this.dateval =  this.startDate|| '';
    this.edateval = this.endDate || '';

    this.sdateval = this.startDate || '';
    this.eedateval = this.endDate || '';


    this.axios({
      method: 'post',
      url: roomurl,
      params: {
        params: {
          pageSize: 10000,
          pageIndex: 1
        }
      }
    })
    .then(function (res) {
      let temp = []
      let tempdetail = []
      let objs = res.data.result.data

      for(var i = 0 ; i<objs.length;i++){
        temp.push({
          value:objs[i].buildingId,
          label:objs[i].buildingName,
          children:[]
        })
        for(var j = 0; j<objs[i].classrooms.length;j++){
          temp[i].children.push({
            value:objs[i].classrooms[j].classroomId,
            label:objs[i].classrooms[j].classroomName,
          })
        }
      }


      // for (let item = 0; item < objs.length; item++) {
      //   temp[item] = {}
      //   tempdetail[item] = []
      //   temp[item]['value'] = objs[item].buildingId
      //   temp[item]['txt'] = objs[item].buildingName
      //   for (let i = 0; i < objs[item].classrooms.length; i++) {
      //     tempdetail[item].push({value: objs[item].classrooms[i].classroomId, txt: objs[item].classrooms[i].classroomName})
      //   }
      //   if (objs[item].classrooms.length === 0) {
      //     tempdetail[item].push({value: '', txt: '请选择'})
      //   }
      // }
      // debugger
      // that.roomid = tempdetail[0][0].value
      var arr = [(temp[0].value||''),(temp[0].children[0].value||'')]
      that.roomid = temp[0].children[0].value||'';
      that.select_roomid = arr;
      that.roomid_options=temp;
      // debugger
      // that.buildobj = that.$Select({
      //   'data': temp,
      //   'originS': 'multiple',
      //   'selectId': ['select86', 'select85'],
      //   'callback': function (obj) {
      //     that.roomobj.cfg.data = tempdetail[obj.ind]
      //     that.roomobj.cfg.domdata = false
      //     that.roomobj.initCommonVal()
      //     that.roomid = tempdetail[obj.ind][0].value
      //   }
      // })
      // that.roomobj = that.$Select({
      //   'data': tempdetail[0],
      //   'originS': 'multiple',
      //   'selectId': ['select88', 'select87'],
      //   'callback': function (obj) {
      //     let temps = ''
      //     for (let i = 0; i < obj.length; i++) {
      //       if (obj[i]) {
      //         temps = temps + obj[i].value + ','
      //       }
      //     }
      //     that.roomid = temps.substr(0, temps.length - 1)
      //   }
      // })
      that.search()
    })
    .catch(function (error) {
      console.log(error)
    })
    // 学期
    this.axios({
      method: 'post',
      url: termurl,
      data: {
        page: {
          pageSize: 10000,
          pageIndex: 1
        }
      }
    })
    .then(function (res) {
      let temp = []
//    temp[0] = {value: '-1', txt: '全部'}
      let objs = res.data.termList
      for (let item = 0; item < objs.length; item++) {
        temp[item] = {}
        temp[item]['value'] = objs[item].termId
        temp[item]['txt'] = objs[item].termName
      }
      that.weekno = res.data.maxWeekNo
      that.weekval = that.weekno || 0
      that.term_options=temp;
      // that.$Select({
      //   'data': temp,
      //   'originS': 'multiple',
      //   'selectId': ['select82', 'select81'],
      //   'callback': function (obj) {
      //     that.term = obj.txt
      //   },
      //   'cleartxt': '全部'
      // })
      that.term = ''

      that.term = temp[0].value
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist,
    Calendarme
  },
  methods: {
    getStatusList(e){
      if(e!=null){
        this.sdateval = e[0];
        this.eedateval = e[1];
      }else{
        this.sdateval = '';
        this.eedateval = '';
      }
    },

    getStatusList2(e){
     if(e!=null){
      this.dateval = e[0];
      this.edateval = e[1];
     }else{
       this.dateval = '';
       this.edateval = '';
     }
    },

    type_change(e){
       var obj ={
         ind:e
       }
       var that =this;
      if (obj.ind === 1) { // 自由
        that.ymshow = false
        that.freeymshow = true
        that.termshow = false
      } else if (obj.ind === 2) { // 周
        that.ymshow = false
        that.freeymshow = false
        that.termshow = true
      } else { // 月
        that.ymshow = true
        that.freeymshow = false
        that.termshow = false
      }
      that.type = obj.ind

    },

    handleChange(e){
      this.roomid = e[1] || '';
    },

    endfn (obj) {
      this.edateval = this.formcat(obj)
    },
    startfn (obj) {
      this.dateval = this.formcat(obj)
    },
    eendfn (obj) {
      this.eedateval = this.formcat(obj)
    },
    sstartfn (obj) {
      this.sdateval = this.formcat(obj)
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
    },
    search () {
      if (!this.roomid) {
        this.win(basicinfo.nameNULL, '', false)
        return false
      }
      let that = this     
      this.axios({
        method: 'post',
        url: listurl,
        params: {
          par: {
            datetype: that.type,
            lessontype: that.recordtype,
            classroomIds: that.roomid,
            startyear: that.dateval.split('-')[0],
            startmonth: that.dateval.split('-')[1],
            endyear: that.edateval.split('-')[0],
            endmonth: that.edateval.split('-')[1],
            begindate: that.sdateval,
            enddate: that.eedateval,
            startterm: that.term,
            startweekno: that.weekval,
            endweekno: that.eweekval
          }
        }
      })
      .then(function (res) {
        that.info = res.data.returnDataList
        that.infores = res.data.returnTotalDataList
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      //this.$router.push({name: pathinfo.prex})
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
  mounted () {
    let that = this
//     this.$Select({
//       'selectId': 'select84',
//       'callback': function (obj) {
//
//
//       }
//     })
    // this.$Select({
    //   'selectId': 'select83',
    //   'callback': function (obj) {
    //     that.recordtype = obj.ind
    //   },
    //   'matchval': [{ind: 1}]
    // })
  },
  beforeDestroy () {
    // 删除日历节点
    // document.body.removeChild(document.getElementById('start_calendar'))
    // document.body.removeChild(document.getElementById('end_calendar'))
    // document.body.removeChild(document.getElementById('sstart_calendar'))
    // document.body.removeChild(document.getElementById('eend_calendar'))
  }
}
</script>

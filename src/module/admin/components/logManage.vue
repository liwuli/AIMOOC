<template>
  <div class="app">
  	<Ghead></Ghead>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<AJposition></AJposition>
          <div class="G_search" style="margin:10px 0 20px">

            <div style="float: left;margin-right: 20px;">
              <span class="txt" style="float: left;">时间:</span>
              <el-date-picker style="float: left;margin-left: 20px;"
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

            <!-- <div class="part">
              <span class="txt">时间:</span>
              <Calendarme valshow="true" :clear="true" ymdhms="ymd" :part="part" :dateval="startDate" @beginfn="beginfn" ids="begin"></Calendarme>
            </div>
            <div class="part" style="line-height: 35px">至</div>
            <div class="part" >
              <Calendarme valshow="true" :clear="true" ymdhms="ymd" :part="part" :dateval="endDate" @endfn="endfn" ids="end"></Calendarme>
            </div> -->

            <!-- <div class="part" style="margin-left: 40px">
              <span class="txt">操作:</span>
              <div id='select7'class="Select" style="margin-top: 2px;width: 140px;"></div>
            </div> -->
            <div style="float: left;margin-right: 20px;">
              <span class="txt" style="float: left;">操作:</span>
              <el-select v-model="type" filterable placeholder="请选择学院" popper-class="el_selects_css" clearable
                style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in type_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <el-button type="primary" @click="pagepost({page: 1})"style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
            <!-- <div class="btn" style="margin-top: 2px" @click="pagepost({page: 1})">查询</div> -->
          </div>
		      <List :totalnum="totalnum" :delbtn="delbtn" :addbtn="delbtn" :pageval="pageIndex" :pagesize="pageSize" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :info='products' :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Linklist from './linklist'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/listcheck'
import Calendarme from '@/components/extend/calendar.vue'
import AJposition from '@/components/extend/position'
import {getResLog} from '@/module/admin/config/logManageinfo'
// 权限处理
export default {
  name: 'AJrole',
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist,
    Calendarme
  },
  data () {
    return {
      type: '',
      startDate: '',
      endDate: '',
      part: document.body,
      delbtn: 'display: none',
      products: [],
      percentinfo: ['wid25', 'wid25', 'wid15', 'wid15', 'wid20'],
      colums: ['targetName', 'remark', 'type', 'userName', 'createTime'],
      listhead: ['资源名称', '所属课程', '操作名称', '用户ID', '操作时间'],
      optevent: ['editlist', 'dellist', 'powerlist'],
      bingos: [],
      pageIndex: 1,
      pageSize: 10,
      totalnum: 0,
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
      type_options:[{txt: '全部', value: ''}, {txt: '下载', value: 1}, {txt: '删除', value: 2}]
    }
  },
  computed: {
    pageinfo () {
      return Math.ceil(this.totalnum / this.pageSize)
    }
  },
  methods: {
    getStatusList(e){
       this.startDate = e[0] || "";
       this.endDate = e[1] || "";
    },

    beginfn (obj) {
      if (obj.clear) {
        debugger
        this.startDate = obj.clearflag ? '' : obj.date.split(' ')[0]
      }
    },
    endfn (obj) {
      if (obj.clear) {
        this.endDate = obj.clearflag ? '' : obj.date.split(' ')[0]
      }
    },
    async pagepost (obj) {
      this.pageIndex = obj.page
      try {
        const res = await this.axios.post(getResLog, {
          type: this.type,
          startDate: this.startDate,
          endDate: this.endDate,
          page: {
            pageSize: this.pageSize,
            pageIndex: this.pageIndex
          }
        })
        this.totalnum = res.data.total
        let temp = []
        let obj = res.data.logList || []
        for (let item = 0; item < obj.length; item++) {
          if (item < this.pageSize) {
            temp[item] = {}
            temp[item]['targetName'] = obj[item].targetName || ''
            temp[item]['remark'] = obj[item].remark || ''
            temp[item]['type'] = this.filterType(obj[item].type)
            temp[item]['userName'] = obj[item].userName || ''
            temp[item]['createTime'] = obj[item].createTime || ''
          }
        }
        this.products = temp
        this.bingos = []
        this.bingos[this.pageIndex - 1] = 'selected'
      } catch (err) {
        console.log(err)
      }
    },
    filterType (value) {
      if (value === 1) {
        return '下载'
      } else if (value === 2) {
        return '删除'
      } else {
        return ''
      }
    },
    createSelect () {
      let that = this
      this.$Select({
        'data': [{txt: '全部', value: ''}, {txt: '下载', value: 1}, {txt: '删除', value: 2}],
        'selectId': 'select7',
        'callback': function (obj) {
          that.type = obj.value
        }
      })
    }
  },
  created () {
    let day = new Date()
    let nextDay = new Date(day.getTime() + 60 * 60 * 1000 * 24)
    this.startDate = day.toLocaleString().split(' ')[0].replace(/\//g, '-')
    this.endDate = nextDay.toLocaleString().split(' ')[0].replace(/\//g, '-')
    var arr = new Array(this.startDate,this.endDate);
    this.select_time=arr;


    this.pagepost({page: 1})
  },
  mounted () {
    // this.createSelect()
  }
}
</script>

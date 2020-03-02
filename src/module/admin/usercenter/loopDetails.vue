<template>
  <div class="main">
    <div v-if="self" class='tab-group'>
      <button>我的任务</button>
      <button :class="{ active: true }" v-for='(item, ind) in groupList' @click='toMyGroup(ind)'>{{item.loopClassGroupName}}</button>
    </div>
    <div v-else class="breadcrumb"><router-link :to="{name: 'loopGroup'}">巡课任务</router-link><span> > </span><span>巡课详情</span></div>
    <div class="member">
      <span>成员:{{personalProfile.realName}}</span><span>工号:{{personalProfile.code}} </span><span>{{eduType?'院系/机构':'年级'}}:{{personalProfile.organizationName||personalProfile.departments}}</span>
    </div>
    <div class="search" id="search">
      <span class="txt left">{{collectinfo.dateN}}：</span>
      <Calendarme :inputstyle="inputstyle" :iconstyle="iconstyle" :part="part" :clear="true" :valshow="svalshow" :ymdhms="ymdhms" :dateval="sydate" @startfn="startfn" :ids="start"></Calendarme>
      <span class="to left">{{collectinfo.toN}}</span>
      <Calendarme :inputstyle="inputstyle" :iconstyle="iconstyle" :part="part" :clear="true" :valshow="evalshow" :ymdhms="ymdhms" :dateval="eydate" @endfn="endfn" :ids="end"></Calendarme>
      <div class="space left"></div>
      <span class="searchbtn left" @click="getTaskList">{{collectinfo.searchbtn}}</span>
    </div>
    <div class="list">
      <p>— 任务完成情况 —</p>
      <div class="taskList">
        <div @click="prev" class="left" :style="count?'':'opacity: 0;'"><img src="/static/images/u416.png" alt=""/></div>
        <ul class="left">
          <li :key="item.taskId" v-for='(item,index) in list'><button :class="{active: currentTask.taskId !== item.taskId}" @click="chooseTask(index)">{{item?item.taskName:''}}</button></li>
        </ul>
        <div @click="next" class="right" :style="clickTime?'':'opacity: 0;'"><img src="/static/images/u417.png" alt=""/></div>
      </div>
      <table>
        <tr style="background: #d5dfeb;"><td>任务名称</td><td>巡课时间</td><td>巡课节次总数</td><td>巡课节次</td><td>当前巡课总时长</td></tr>
        <tr>
          <td>{{currentTask.taskName}}</td>
          <td>{{currentTask.startDate|cutDate}}-{{currentTask.endDate|cutDate}}</td>
          <td>{{currentTask.times}}</td>
          <td>{{currentTask.doTimes}}</td>
          <td>{{currentTask.duration}}</td>
        </tr>
      </table>
      <p>— 巡课详情表 —</p>
      <table>
        <tr style="background: #d5dfeb;"><td rowspan="2">巡课时间</td><td colspan="6">巡课内容</td><td rowspan="2">巡课时长</td><td  rowspan="2">评价表详情</td></tr>
        <tr style="background: #d5dfeb;"><td>课程名称</td><td>{{eduType?'课程院系':'课程年级'}}</td><td>授课教师</td><td>授课班级</td><td>授课地点</td><td>授课时间</td></tr>
        <tr v-for="item in taskDetail">
          <td>{{item.loopClassTime}}</td>
          <td>{{item.courseName}}</td>
          <td>{{eduType?item.collegeName:item.studySectionName}}</td>
          <td>{{item.teacherName}}</td>
          <td>{{item.classesName}}</td>
          <td>{{item.classroomName}}</td>
          <td>{{item.startTime}}-{{item.endTime}}</td>
          <td>{{item.duration}}</td>
          <td @click="toEvaluate(item)"><a>{{item.courseName}}-{{item.modelName}}-{{item.loopClassUserName}}</a></td>
        </tr>
      </table>
      <page :totalnum="totalnum" :bingo="bingos" @pagepost="getTaskDetail" :pagesize="pageSize" :pageindex="pageIndex" :totalpage="totalpage"></page>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/win-types'
  import Calendarme from '@/components/extend/calendar.vue'
  import page from '@/components/extend/page'
  import {warntxt, loopClassGroup, taskCompleteStatustUrl, personalProfileUrl, classForDetailUrl, collectinfo} from '@/module/admin/usercenter/config/usercenterinfo'

  export default {
    name: 'group-info',
    components: {
      page,
      Calendarme
    },
    data () {
      return {
        loopClassGroupId: '',
        self: false,
        groupList: [],
        eduType: this.$store.state.educationType,
        taskList: [],
        personalProfile: {realName: '', code: '', organizationName: '', departments: ''},
        currentTask: {},
        taskDetail: [],
        num: 0,
        memberId: '',
        start: 'start',
        end: 'end',
        sydate: '',
        ymdhms: 'ymd',
        svalshow: false,
        evalshow: false,
        eydate: '',
        part: document.body,
        iconstyle: 'margin-left:-30px',
        inputstyle: 'width:135px',
        collectinfo: collectinfo,
        pageSize: 5,
        pageIndex: 1,
        bingos: ['selected'],
        pagestyles: 'margin-left:30px',
        totalnum: 0,
        count: 0
      }
    },
    computed: {
      list: function () {
        if (this.taskList.length < 5) {
          return this.taskList
        } else {
          return this.taskList.slice(this.count, (this.count + 4))
        }
      },
      clickTime () {
        return this.taskList.length > 4 ? this.taskList.length - 4 - this.count : 0
      },
      totalpage () {
        return Math.ceil(this.totalnum / this.pageSize)
      }
    },
    filters: {
      cutDate: function (value) {
        if (value) {
          return value.split(' ')[0]
        }
      }
    },
    methods: {
      init () {
        this.count = 0
        this.sydate = ''
        this.eydate = ''
        if (this.$route.query.memberId) {
          this.memberId = this.$route.query.memberId
          this.loopClassGroupId = this.$route.query.loopClassGroupId
          this.self = false
        } else {
          this.memberId = this.$store.state.userinfo.id
          this.loopClassGroupId = ''
          this.self = true
          this.getGroupList()
        }
        this.getPersonalProfile()
        this.getTaskList()
      },
      valid () {
        if (new Date(this.eydate).getTime() - new Date(this.sydate).getTime() < 0) {
          this.win(warntxt.dateError, '', false)
          return false
        } else {
          return true
        }
      },
      // 根据当前登录用户获取所在群组列表
      getGroupList () {
        let that = this
        this.axios({
          method: 'post',
          url: loopClassGroup,
          data: {userId: that.memberId}
        })
          .then(function (res) {
            let arr = res.data.data
            that.groupList = []
            for (let i = 0, len = arr.length; i < len; i++) {
              if (arr[i].isHeader * 1) {
                that.groupList.push(arr[i])
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      // 获取成员信息
      getPersonalProfile: function () {
        let that = this
        this.axios({
          method: 'post',
          url: personalProfileUrl,
          params: { par: {userId: this.memberId} }
        })
          .then(function (res) {
            that.personalProfile = res.data
          })
      },
      // 获取成员任务信息
      getTaskList: function () {
        if (!this.valid()) {
          return false
        }
        let that = this
        this.axios({
          method: 'post',
          url: taskCompleteStatustUrl,
          data: {userId: this.memberId, loopClassGroupId: this.loopClassGroupId, startTime: this.sydate, endTime: this.eydate}
        })
          .then(function (res) {
            that.taskList = res.data.data
            that.currentTask = that.taskList[0] || []
            that.getTaskDetail()
          })
      },
      // 获取任务详情
      async getTaskDetail (obj) {
        (typeof (obj) === 'number') && (this.pageIndex = obj)
        this.bingos = []
        this.bingos[this.pageIndex - 1] = 'selected'
        try {
          const res = await this.axios.post(classForDetailUrl, {userId: this.memberId, taskId: this.currentTask.taskId, pageSize: this.pageSize, pageIndex: this.pageIndex})
          this.taskDetail = res.data.data
          this.totalnum = res.data.total || 0
        } catch (err) {
          console.log(err)
        }
      },
      // 跳转我的群组页面
      toMyGroup: function (ind) {
        this.$router.push({name: 'loopGroup', params: {ind: ind}})
      },
      // 切换任务
      chooseTask: function (index) {
        this.currentTask = this.list[index]
        this.getTaskDetail()
      },
      // 跳转评价模板页
      toEvaluate (item) {
        this.$router.push({name: 'loopevaluateTemplateloopresee', query: {origin: 'loopDetails', templateid: item.modelId, evaluatetitle: item.modelName, isOpen: 1, resultId: item.resultId}})
      },
      prev: function () {
        this.count && --this.count
      },
      next: function () {
        this.clickTime && ++this.count
      },
      // 日历
      formcat (obj) {
        return obj.year + '-' + (obj.month < 10 ? '0' + obj.month : obj.month) + '-' + (obj.day < 10 ? '0' + obj.day : obj.day)
      },
      startfn (obj) {
        if (!this.svalshow) {
          this.svalshow = true
          this.sydate = ''
        } else {
          this.sydate = obj.clearflag ? '' : this.formcat(obj)
        }
      },
      endfn (obj) {
        if (!this.evalshow) {
          this.evalshow = true
          this.eydate = ''
        } else {
          this.eydate = obj.clearflag ? '' : this.formcat(obj)
        }
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
    created () {
      this.init()
    },
    watch: {
      '$route': function (to, from) {
        if (this.$route.query.details && from.name !== 'loopevaluateTemplateloopresee') {
          this.init()
        }
      }
    }
  }
</script>

<style scoped>
  a{
    cursor: pointer;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .main{
    padding: 0 5px;
    overflow: hidden;
  }
  .tab-group{
    height: 46px;
    padding-top: 20px;
  }
  .tab-group button{
    height: 36px;
    line-height: 36px;
    float: left;
    font-size: 13px;
    border: 1px solid #98b4d9;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    padding: 0 30px;
    margin: 0 10px;
    cursor: pointer;
  }
  .active{
    background: #fff;
  }
  .breadcrumb{
    font-size: 24px;
    color: #555;
  }
  .member{
    height: 50px;
    line-height: 50px;
    font-weight: bolder;
    font-size: 18px;
  }
  .member span{
    padding: 0 60px 0 0px;
  }
  .search{
    height: 50px;
    padding-top: 15px;
  }
  .search span{
    line-height: 30px;
    padding: 0 10px;
  }
  .searchbtn{
    background: #dddddd;
    box-shadow: 0 0 0 1px #3197fc;
    color: #3197fc;
    cursor: pointer;
    text-align: center;
    width: 58px;
  }
  .space{
    height: 100%;
    width: 400px;
    float: left;
  }
  .list{
    padding: 0 1% 0 0.5%;
    width: 98.5%;
    float: left;
    border: 1px solid #98b4d9;
  }
  .list p{
    font-family: Arial;
    font-size: 18px;
    padding: 20px 0;
  }
  .list table{
    width: 100%;
    margin-bottom: 10px;
    border-collapse: collapse;
    table-layout: fixed;
  }
  .list table td{
    border: 1px solid #98b4d9;
    text-align: center;
    font-size: 14px;
    line-height: 22px;
  }
  .list table td a{
    color: #3197fc;
    text-decoration: underline;
  }
  .taskList{
    width: 100%;
    padding-bottom: 20px;
    overflow: hidden;
    background: white;
  }
  .taskList div img{
    width: 30px;
    height: 40px;
    cursor: pointer;
  }
  .taskList ul li{
    float: left;
  }
  .taskList ul li button{
    height: 40px;
    width: 200px;
    padding: 0 20px;
    margin: 0 5px;
    border: 1px solid #98b4d9;
    border-radius: 10px;
    font-size: 13px;
    cursor: pointer;
  }
</style>

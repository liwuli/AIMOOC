<template>
  <div class='main'>
    <div class='tab-group'>
      <button :class="{ active: true }" @click='toMyDetails'>我的任务</button>
      <button :class="{ active: ind !== num }" v-for='(item, ind) in groupList' @click='changedata(ind)'>{{item.loopClassGroupName}}</button>
    </div>
    <div class='tab-info'>
      <p><span>我负责的群组: {{groupList[num]?groupList[num].loopClassGroupName:''}}</span><span>群组类别:{{groupType|translateGroupType}}</span></p>
      <p><span>人员总数: {{groupList[num]?groupList[num].users:''}}</span></p>
    </div>
    <div class='left30'>
      <div class='search' id='search'>
        <span class='txt'>{{collectinfo.dateN}}：</span>
        <Calendarme :inputstyle='inputstyle' :iconstyle='iconstyle' :dateval="sydate" :clear="true" :part="part" :ymdhms="ymdhms" @beginfn="beginfn" :ids="begin"></Calendarme>
        <span class='to'>{{collectinfo.toN}}</span>
        <Calendarme :inputstyle='inputstyle' :iconstyle='iconstyle' :dateval='eydate' :clear="true" :part='part' :ymdhms='ymdhms' @overfn='overfn' :ids='over'></Calendarme>
        <div class='space'></div>
        <div class='searchbtn' @click='getTasks'>{{collectinfo.searchbtn}}</div>
      </div>
    </div>
    <div v-if="isLeader" class='taskList'>
      <p class='title'>— 任务列表 —</p>
      <button @click="toleaderAddTask">添加任务</button>
      <table>
        <tr style="background: #d5dfeb;"><td>任务名称</td><td>巡课时间</td><td>巡课节次总数</td><td>巡课评价表</td><td>操作</td></tr>
        <tr v-for="item in taskList">
          <td>{{item.taskName}}</td>
          <td>{{item.startDate.split(' ')[0]}}至{{item.endDate.split(' ')[0]}}</td>
          <td>{{item.times}}</td>
          <td><a @click="toEvaluate(item)">{{item.modelName}}</a></td>
          <td>
            <i v-if="!item.isPublish" @click="publish(item.taskId)">发布任务</i>
            <b v-if="item.isPublish">已发布</b>
            <span v-if="!item.isPublish" @click="toleaderAmendTask(item.taskId)">修改</span>
            <span @click="deleteTask(item.taskId)">删除</span>
          </td>
        </tr>
      </table>
      <page :totalnum='totalstrip' :bingo='taskbingo' @pagepost='getTasks' :pagesize='taskPageSize' :pageindex='taskIndex' :totalpage='taskpages' ></page>
    </div>
    <div class='list'>
      <p class='title'>— 成员任务完成情况 —</p>
      <table>
        <tr style="background: #d5dfeb;"><td v-for="item in headlist">{{item}}</td></tr>
        <tr v-for='item in membersTaskList'>
          <td>{{item.userName}}</td>
          <td>{{item.userCode}}</td>
          <td>{{item.taskNum}}</td>
          <td>{{item.overTimes}}</td>
          <td>{{item.loopClassTimes}}</td>
          <td>{{item.duration}}</td>
          <td><a v-if="!isLeader" @click='toAllot(item.userId)'>分配任务</a> <a @click='toDetails(item.userId)'><span v-if="isLeader">查看</span>详情</a></td>
        </tr>
      </table>
      <page :totalnum='totalnum' :bingo='bingos' @pagepost='getMembersTask' :pagesize='pageSize' :pageindex='pageIndex' :totalpage='totalpage' ></page>
    </div>
    <div v-show="popup" class="popup">
      <div class="wrap">
        <h2><span>提示</span><b @click="closePopup">×</b></h2>
        <div>{{message}}</div>
        <p class="foot"><span @click="ok">确定</span><i></i><span @click="closePopup">取消</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/win-types'
  import Calendarme from '@/components/extend/calendar.vue'
  import page from '@/components/extend/page'
  import {currentTermurl, deleteTaskurl, warntxt, headlist, publishLoopClassTasksUrl, loopClassTasks, loopClassGroup, collectinfo, membersTasktUrl} from '@/module/admin/usercenter/config/usercenterinfo'

  export default {
    name: 'group-info',
    components: {
      page,
      Calendarme
    },
    data () {
      return {
        userId: this.$store.state.userinfo.id,
        headlist: headlist,
        groupType: null,
        membersTaskList: [],
        groupList: [{}],
        loopClassGroupId: '',
        taskList: [],
        userinfo: {},
        num: 0,
        taskId: '',
        okType: '',
        popup: false,
        message: '',
        begin: 'begin',
        over: 'over',
        sydate: '',
        ymdhms: 'ymd',
        eydate: '',
        part: document.body,
        iconstyle: 'margin-left:-30px',
        inputstyle: 'width:135px',
        collectinfo: collectinfo,
        taskPageSize: 5,
        taskIndex: 1,
        totalstrip: 10,
        taskbingo: ['selected'],
        pageSize: 5,
        pageIndex: 1,
        totalnum: 0,
        bingos: ['selected']
      }
    },
    computed: {
      isLeader: function () {
        switch (this.groupType) {
          case 0: return true
          case 1: return true
          case 2: return true
          case 3: return true
          case 4: return false
          case 5: return false
        }
      },
      totalpage () {
        return Math.ceil(this.totalnum / this.pageSize)
      },
      taskpages () {
        return Math.ceil(this.totalstrip / this.taskPageSize)
      }
    },
    methods: {
      valid () {
        if (new Date(this.eydate).getTime() - new Date(this.sydate).getTime() < 0) {
          this.win(warntxt.dateError, '', false)
          return false
        } else {
          return true
        }
      },
      // 根据当前登录用户获取所在群组列表
      async getGroupList () {
        let obj = await this.axios({
          method: 'post',
          url: currentTermurl
        })
          .then(function (res) {
            return res.data
          })
        this.sydate = obj.startTime
        this.eydate = obj.endTime
        let arr = await this.axios({
          method: 'post',
          url: loopClassGroup,
          data: {userId: this.userId}
          // data: {userId: 'd290a23fbc0546caa335c73ae76077ff'}
        })
          .then(function (res) {
            return res.data.data
          })
        this.groupList = []
        for (let i = 0, len = arr.length; i < len; i++) {
          if (arr[i].isHeader * 1) {
            this.groupList.push(arr[i])
          }
        }
        if (!this.groupList.length) {
          return false
        }
        this.loopClassGroupId = this.groupList[0].loopClassGroupId
        this.groupType = this.groupList[0].groupType
        this.getTasks()
        this.getMembersTask()
      },
      // 根据巡课组ID 获取任务列表
      async getTasks (obj) {
        if (this.isLeader) {
          if (!this.valid()) {
            return false
          }
          try {
            (typeof (obj) === 'number') && (this.taskIndex = obj)
            this.taskbingo = []
            this.taskbingo[this.taskIndex - 1] = 'selected'
            const res = await this.axios.post(loopClassTasks, {'loopClassGroupId': this.loopClassGroupId, startTime: this.sydate, endTime: this.eydate, pageSize: this.taskPageSize, pageIndex: this.taskIndex})
            this.taskList = res.data.data
            this.totalstrip = res.data.total || 10
          } catch (err) {
            console.log(err)
          }
        }
      },
      // 根据巡课组ID 获取巡课任务成员完成情况
      async getMembersTask (obj) {
        try {
          (typeof (obj) === 'number') && (this.pageIndex = obj)
          this.bingos = []
          this.bingos[this.pageIndex - 1] = 'selected'
          const res = await this.axios.post(membersTasktUrl, {'loopClassGroupId': this.loopClassGroupId, pageSize: this.pageSize, pageIndex: this.pageIndex})
          this.membersTaskList = res.data.data
          this.totalnum = res.data.total || 0
        } catch (err) {
          console.log(err)
        }
      },
      // 切换群组
      changedata: function (ind) {
        this.num = ind
        this.loopClassGroupId = this.groupList[ind].loopClassGroupId
        this.groupType = this.groupList[ind].groupType
        this.getTasks()
        this.getMembersTask()
      },
      // 跳转任务分配页
      toAllot: function (id) {
        this.$router.push({name: 'loopAllot', query: {groupType: this.groupType, loopClassGroupId: this.loopClassGroupId, memberId: id, allot: true}})
      },
      // 跳转我的任务
      toMyDetails: function (id) {
        this.$router.push({name: 'loopDetails', query: {details: true}})
      },
      // 跳转详情页
      toDetails: function (id) {
        this.$router.push({name: 'loopDetails', query: {loopClassGroupId: this.loopClassGroupId, memberId: id, details: true}})
      },
      // 跳转leader添加任务
      toleaderAddTask: function () {
        this.$router.push({name: 'loopTaskLeader', query: {loopClassGroupId: this.loopClassGroupId}})
      },
      // 跳转leader修改任务
      toleaderAmendTask: function (id) {
        this.$router.push({name: 'loopTaskLeader', query: {loopClassGroupId: this.loopClassGroupId, taskId: id}})
      },
      // 跳转评价模板页
      toEvaluate (item) {
        this.$router.push({name: 'loopevaluateTemplateloopresee', query: {origin: 'loopGroup', templateid: item.modelId, evaluatetitle: item.modelName, isOpen: 1}})
      },
      publish: function (id) {
        this.message = '一旦发布任务，将无法修改，确定发布？'
        this.popup = true
        this.taskId = id
        this.okType = 'publish'
      },
      deleteTask: function (id) {
        this.message = '确定要删除巡课任务？'
        this.popup = true
        this.taskId = id
        this.okType = 'delete'
      },
      closePopup: function () {
        this.popup = false
      },
      ok: function () {
        let url = ''
        let data = {}
        if (this.okType === 'publish') {
          url = publishLoopClassTasksUrl
          data = {taskId: this.taskId, isPublish: 1}
        } else if (this.okType === 'delete') {
          url = deleteTaskurl
          data = {taskId: this.taskId}
        }
        let that = this
        this.axios({
          method: 'post',
          url: url,
          data: data
        })
          .then(function (res) {
            if (res.data.id * 1 === 1) {
              that.win(res.data.content, '', false)
              that.getTasks()
            } else {
              that.win(res.data.content, '', false)
            }
          })
        this.closePopup()
      },
      // 日历
      formcat (obj) {
        return obj.year + '-' + (obj.month < 10 ? '0' + obj.month : obj.month) + '-' + (obj.day < 10 ? '0' + obj.day : obj.day)
      },
      beginfn (obj) {
        this.sydate = obj.clearflag ? '' : this.formcat(obj)
      },
      overfn (obj) {
        this.eydate = obj.clearflag ? '' : this.formcat(obj)
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
    filters: {
      translateGroupType: function (value) {
        switch (value) {
          case 0: return '系统管理员'
          case 1: return '校领导'
          case 2: return '院系领导'
          case 3: return '辅导员'
          case 4: return '督导'
          case 5: return '巡课员'
        }
      }
    },
    created () {
      this.userinfo = Object.assign({}, this.$store.state.userinfo)
      this.getGroupList()
      if (this.$route.params.ind) {
        this.changedata(this.$route.params.ind)
      }
    },
    watch: {
      '$route' (to, from) {
        if (from.name === 'loopTaskLeader') {
          this.getTasks()
        } else if (from.name === 'loopDetails') {
          if (this.$route.params.ind) {
            this.changedata(this.$route.params.ind)
          }
        }
      }
    }
  }
</script>

<style scoped src="./loopGroup.css"></style>
<style scoped src="./table-popup.css"></style>

<template>
  <div class="main">
    <div class="breadcrumb"><router-link :to="{ name: 'AJusercenterloop'}">巡课任务</router-link><span> > </span><span>任务分配</span></div>
    <div class="member">
      <span>成员:{{personalProfile.realName}}</span><span>工号:{{personalProfile.code}} </span><span>院系/机构:{{personalProfile.organizationName||personalProfile.departments}}</span>
    </div>
    <div class="search" id="search">
      <span class="txt left">{{collectinfo.dateN}}：</span>
      <Calendarme :inputstyle="inputstyle" :iconstyle="iconstyle"  :part="part" :valshow="svalshow" :ymdhms="ymdhms" :dateval="sydate"  @startfn="startfn" :ids="start"></Calendarme>
      <span class="to left">{{collectinfo.toN}}</span>
      <Calendarme :inputstyle="inputstyle" :iconstyle="iconstyle" :part="part" :valshow="evalshow" :ymdhms="ymdhms" :dateval="eydate"  @endfn="endfn" :ids="end"></Calendarme>
      <div class="space left"></div>
      <span class="searchbtn left" @click="pagepost({page: 1})">{{collectinfo.searchbtn}}</span>
    </div>
    <div class="taskList">
      <p>— 任务分配 —</p>
      <button @click="toAddTask()">添加任务</button>
      <table>
        <tr><td>任务名称</td><td>巡课时间</td><td>巡课范围</td><td>巡课节次总数</td><td>巡课节次</td><td>操作</td></tr>
        <tr v-for="item in taskList">
          <td>{{item.taskName}}</td>
          <td>{{item.startDate.split(' ')[0]}}-{{item.endDate.split(' ')[0]}}</td>
          <td><p v-for="ite in item.names">{{item.scopeType|scopesName}}: {{ite}}</p></td>
          <td>{{item.times}}</td>
          <td>{{item.doTimes}}</td>
          <td>
            <i v-if="!item.isPublish" @click="publish(item.taskId)">发布任务</i>
            <b v-if="item.isPublish">已发布</b>
            <span v-if="!item.isPublish" @click="toAmendTask(item.taskId)">修改</span>
            <span v-if="false" @click="deleteTask()">删除</span>
          </td>
        </tr>
      </table>
      <page  :totalnum="totalnum" :bingo="bingos" :pagestyles="pagestyles" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage" ></page>
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
  import Calendarme from '@/components/extend/calendar.vue'
  import page from '@/components/extend/page'
  import {taskCompleteStatustUrl, personalProfileUrl, publishLoopClassTasksUrl, collectinfo} from '@/module/admin/usercenter/config/usercenterinfo'

  export default {
    name: 'loopAllotTask',
    components: {
      page,
      Calendarme
    },
    data () {
      return {
        groupType: null,
        loopClassGroupId: '',
        taskList: [],
        memberId: '',
        personalProfile: {realName: '', code: '', organizationName: '', departments: ''},
        taskId: '',
        okType: '',
        message: '',
        popup: false,
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
        pagesize: 9,
        pageindex: 1,
        totalpage: 0,
        bingos: [],
        pagestyles: 'margin-left:30px',
        totalnum: 0,
        num: 0,
        count: 0
      }
    },
    methods: {
      init: function () {
        let obj = this.$route.query
        this.memberId = obj.memberId
        this.loopClassGroupId = obj.loopClassGroupId
        this.groupType = obj.groupType
        this.pagepost({page: 1})
        this.getPersonalProfile()
        this.getTaskList()
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
        let that = this
        this.axios({
          method: 'post',
          url: taskCompleteStatustUrl,
          data: {userId: this.memberId}
        })
          .then(function (res) {
            that.taskList = res.data.data
            console.log(res)
          })
      },
      // 跳转添加任务页
      toAddTask: function () {
        if (this.groupType === 5) {
          this.$router.push({ name: 'loopTaskCommon', params: {loopClassGroupId: this.loopClassGroupId, memberId: this.memberId} })
        } else {
          this.$router.push({ name: 'loopTaskSupervisor', params: {loopClassGroupId: this.loopClassGroupId, memberId: this.memberId} })
        }
      },
      // 跳转修改任务页
      toAmendTask: function (id) {
        if (this.groupType === 5) {
          this.$router.push({ name: 'loopTaskCommon', params: {taskId: id, loopClassGroupId: this.loopClassGroupId, memberId: this.memberId} })
        } else {
          this.$router.push({ name: 'loopTaskSupervisor', params: {taskId: id, loopClassGroupId: this.loopClassGroupId, memberId: this.memberId} })
        }
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
        console.log(this.okType)
        if (this.okType === 'publish') {
          let that = this
          this.axios({
            method: 'post',
            url: publishLoopClassTasksUrl,
            data: {taskId: this.taskId, isPublish: 1}
          })
            .then(function (res) {
              console.log(res)
              that.getTaskList()
            })
          this.closePopup()
        }
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
          this.sydate = this.formcat(obj)
          document.querySelector('#start').value = this.sydate
        }
      },
      endfn (obj) {
        if (!this.evalshow) {
          this.evalshow = true
          this.eydate = ''
        } else {
          this.eydate = this.formcat(obj)
          document.querySelector('#end').value = this.eydate
        }
      },
      // 翻页
      pagepost (obj) {
        if (typeof obj === 'number') {
          obj = {page: obj}
        }
        let that = this
        this.pageindex = obj.page
        this.axios({
          method: 'post',
          url: taskCompleteStatustUrl,
          data: {userId: this.memberId}
        })
          .then(function (res) {
            that.focuslist = []
            let temp = []
            let objs = res.data.data
            that.totalpage = Math.ceil(objs.length / that.pagesize)
            that.totalnum = objs.length
            let start = (that.pageindex - 1) * that.pagesize
            for (let item = start; item < (that.pageindex * that.pagesize < objs.length ? that.pageindex * that.pagesize : objs.length); item++) {
              /*temp[item - start] = {}
              temp[item - start]['date'] = objs[item].createDate.substring(0, objs[item].createDate.length - 3)
              temp[item - start]['imgurl'] = objs[item].imgurl
              temp[item - start]['teacher'] = objs[item].teacherName
              temp[item - start]['num'] = objs[item].viewers
              temp[item - start]['code'] = objs[item].code
              temp[item - start]['name'] = objs[item].courseName
              temp[item - start]['visitUrl'] = objs[item].visitUrl*/
            }
            that.bingos = []
            that.bingos[that.pageindex - 1] = 'selected'
            that.focuslist = temp
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    computed: {
    },
    filters: {
      scopesName: function (value) {
        switch (value) {
          case 0: return '全校课程'
          case 1: return '开课院系'
          case 2: return '开课老师'
          case 3: return '教学楼'
          case 4: return '课程'
        }
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    watch: {
      '$route' (to, from) {
        if (this.$route.params.memberId && this.$route.params.allot) {
          this.init()
        }
        if (from.name === 'loopTaskLeader') {
          this.getTasks()
        }
      }
    }
  }
</script>

<style scoped src="./table-popup.css"></style>
<style scoped>
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .main{
    padding: 0 5px;
    overflow: hidden;
    position: relative;
  }
  .breadcrumb{
    font-size: 24px;
    color: #555;
    padding-left: 15px;
  }
  .member{
    height: 50px;
    line-height: 50px;
    font-weight: bolder;
    font-size: 18px;
  }
  .member span{
    padding: 0 60px 0 20px;
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
  .taskList{
    padding: 0 1% 0 0.5%;
    width: 98.5%;
    float: left;
    border: 1px solid #999999;
  }
  .taskList p{
    font-family: Arial;
    font-size: 18px;
    padding: 20px 0;
  }
  .taskList table{
    width: 100%;
    margin-bottom: 10px;
    border-collapse: collapse;
  }
  .taskList table td{
    border: 1px solid #999999;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
  }
  .taskList table td p{
    padding: 0;
    font-size: 16px;
  }
  .taskList table td a{
    color: #3197fc;
    text-decoration: underline;
  }
  .taskList>button{
    height: 30px;
    width: 97px;
    line-height: 26px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    font-size: 16px;
    background: #fff;
    border-style: solid;
    border: 1px solid #999999;
    margin: 8px 0;
    cursor: pointer;
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
    border: 1px solid #999;
    border-radius: 10px;
    font-size: 13px;
    background: #fff;
    cursor: pointer;
  }
  .taskList ul li button:focus{
    background: #ccc;
  }
</style>

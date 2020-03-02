<template>
  <div class="main">
    <div class="breadcrumb">
      <router-link :to="{ name: 'AJusercenterloop'}">巡课任务</router-link><span> > </span>
      <router-link :to="{ name: 'loopAllot'}">任务分配</router-link><span> > </span>
      <span>{{title}}</span></div>
    <div class="item">
      <span>巡课任务名称*:</span><input v-model="taskName" type="text">
    </div>
    <div class="item">
      <span>巡课时间*:</span>
      <Calendarme :inputstyle='inputstyle' :iconstyle='iconstyle'  :part='part' :valshow='svalshow' :ymdhms='ymdhms' :dateval='sydate'  @startfn='startfn' :ids='start'></Calendarme>
      <b>到</b>
      <Calendarme :inputstyle="inputstyle" :iconstyle="iconstyle" :part="part" :valshow="evalshow" :ymdhms="ymdhms" :dateval="eydate"  @endfn="endfn" :ids="end"></Calendarme>
    </div>
    <div class="item">
      <span>巡课范围分类方式:</span>
      <b v-for="item in sortType"><input type="radio" @click="chooseScopeType(item.name)" name="scopeType" :id="item.value"/><label :for="item.value">{{item.name}}</label></b>
    </div>
    <div class="scope">
      <span>巡课范围*:</span>
      <ul>
        <li v-for="(item,index) in scopeTab"><span>{{item.collegeName}}-{{item.teacherOrCurriculum}}</span><b @click="deleteScope(index)">×</b></li>
      </ul>
      <div  @click="addScope"><img src="/static/images/add.png" alt="+"><span>添加</span></div>
    </div>
    <div class="item">
      <span>巡课次数*:</span><input v-model="times" type="text" placeholder="请输入需要巡课的次数，为整数" />
    </div>
    <div class="foot"><span @click="save">保存</span><span @click="goBack">取消</span></div>
    <div v-show="popup" class="popup">
      <div class="wrap">
        <h2><span>添加巡课范围</span><b @click="closePopup">×</b></h2>
        <div>
          <i>{{message}}:</i>
          <div>
            <span><input type="text" v-model="collegeName" @focus="showCollege=true"><b @click="showCollege=!showCollege">∨</b></span>
            <ul v-show="showCollege">
              <li v-for="(item,index) in collegeList" @click="chooseCollege(index)">{{item.collegeName}}</li>
            </ul>
          </div>
          <div>
            <span><input type="text" v-model="teacherOrCurriculum" @focus="showTorC=true"><b @click="showTorC=!showTorC">∨</b></span>
            <ul v-show="showTorC">
              <li v-for="(item,index) in TorCList" @click="chooseTorC(index)">{{item.realName || item.courseName}}</li>
            </ul>
          </div>
        </div>
        <p><span @click="ok">确定</span><i></i><span @click="closePopup">取消</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import Calendarme from '@/components/extend/calendar.vue'
  import {usersByCollegeAndRoleUrl, updateTasksUrl, findTasksByIdUrl, addLoopClassTasksUrl, collegeAndTeacherUrl, coursesListUrl} from '@/module/admin/usercenter/config/usercenterinfo'

  export default {
    name: 'loopSupervisorTask',
    components: {
      Calendarme
    },
    data () {
      return {
        title: '添加任务',
        loopClassGroupId: '',
        userinfo: '',
        taskId: null,
        taskName: '',
        times: null,
        memberId: '',
        scopeTab: [],
        sortType: [
          {name: '老师', value: 'teacher'},
          {name: '课程', value: 'curriculum'}
        ],
        scopes: '',
        scopeType: null,
        taskScopes: [],
        scopeList: [],
        collegeTorCList: [],
        collegeName: '',
        showCollege: false,
        showTorC: false,
        teacherOrCurriculum: '',
        popup: false,
        message: '',
        start: 'start',
        end: 'end',
        sydate: '',
        ymdhms: 'ymd',
        svalshow: false,
        evalshow: false,
        eydate: '',
        part: document.body,
        iconstyle: 'margin-left:-30px',
        inputstyle: 'width:135px'
      }
    },
    methods: {
      init () {
        this.memberId = this.$route.params.memberId
        this.loopClassGroupId = this.$route.params.loopClassGroupId
        if (this.$route.params.taskId) {
          this.taskId = this.$route.params.taskId
          console.log(this.$route.params)
          let that = this
          this.axios({
            method: 'post',
            url: findTasksByIdUrl,
            data: {taskId: this.taskId}
          })
            .then(function (res) {
              that.title = '编辑任务'
              that.taskName = res.data.data.taskName
              that.times = res.data.data.times
              that.sydate = res.data.data.startDate.split(' ')[0]
              that.eydate = res.data.data.endDate.split(' ')[0]
            })
        } else {
          this.taskName = ''
          this.times = null
          this.sydate = ''
          this.eydate = ''
        }
      },
      // 选择范围分类方式,获取院系列表数据
      chooseScopeType: function (value) {
        if (this.message === value) {
          return false
        } else {
          this.taskScopes = []
          this.message = value
          if (value === '老师') {
            this.scopeType = 2
            let that = this
            this.axios({
              method: 'post',
              url: collegeAndTeacherUrl
            })
              .then(function (res) {
                that.scopeList = res.data
                for (let i = 0; i < that.scopeList.length; i++) {
                  that.scopeList[i].userList.unshift({realName: '全部', userId: ''})
                }
                that.axios({
                  method: 'post',
                  url: usersByCollegeAndRoleUrl,
                  data: {roleType: 2}
                })
                  .then(function (res) {
                    res.data.usersList.unshift({realName: '全部', collegeName: '全部', userId: ''})
                    that.scopeList.unshift({collegeName: '全部', userList: res.data.usersList})
                    console.log(that.scopeList)
                  })
              })
          } else if (value === '课程') {
            this.scopeType = 4
            let that = this
            this.axios({
              method: 'post',
              url: coursesListUrl,
              data: {courseType: 1, page: {pageIndex: 1, pageSize: 100}, collegeId: ''}
            })
              .then(function (res) {
                that.scopeList = res.data.courseList
                that.scopeList.unshift({collegeName: '全部', collegeId: ''})
                console.log(that.scopeList)
              })
          }
        }
      },
      // 选择院系,获取老师或课程列表数据
      chooseCollege: function (ind) {
        this.collegeName = this.collegeList[ind].collegeName
        if (this.scopeType === 2) {
          this.collegeTorCList = this.collegeList[0].userList
        } else if (this.scopeType === 4) {
          let id = this.collegeList[0].collegeId
          let that = this
          this.axios({
            method: 'post',
            url: coursesListUrl,
            data: {courseType: 1, page: {pageIndex: 1, pageSize: 100}, collegeId: id}
          })
            .then(function (res) {
              that.collegeTorCList = res.data.courseList
              that.collegeTorCList.unshift({courseName: '全部', courseId: ''})
              console.log(that.collegeTorCList)
            })
        }
        this.teacherOrCurriculum = ''
        this.showCollege = false
      },
      // 选择老师或课程
      chooseTorC: function (ind) {
        if (this.scopeType === 2) {
          this.scopes = this.TorCList[ind].id || this.TorCList[ind].userId
          this.teacherOrCurriculum = this.TorCList[ind].realName
          this.collegeName = this.collegeName === '全部' ? this.TorCList[0].collegeName : this.collegeName
        } else if (this.scopeType === 4) {
          this.scopes = this.TorCList[ind].courseId
          this.teacherOrCurriculum = this.TorCList[ind].courseName
        }
        this.showTorC = false
      },
      addScope: function () {
        if (!this.message) {
          alert('请勾选"巡课范围分类方式"')
          return false
        }
        this.collegeName = ''
        this.teacherOrCurriculum = ''
        this.popup = true
      },
      deleteScope: function (ind) {
        this.taskScopes.splice(ind, 1)
        this.scopeTab.splice(ind, 1)
        console.log(this.taskScopes)
      },
      closePopup: function () {
        this.popup = false
      },
      ok: function () {
        if (this.scopes) {
          this.norepeat()
        } else {
          if (this.collegeName === '全部') {
            this.scopeTab = [{collegeName: '全校范围', teacherOrCurriculum: '全校范围'}]
            this.taskScopes = [{scopeType: 0, scopes: ''}]
          } else {
            for (let i = 1; i < this.collegeTorCList.length; i++) {
              this.scopes = this.collegeTorCList[i].id || this.collegeTorCList[i].courseId
              this.teacherOrCurriculum = this.collegeTorCList[i].realName || this.collegeTorCList[i].courseName
              this.norepeat()
            }
          }
        }
        console.log(this.taskScopes)
        this.closePopup()
      },
      norepeat: function () {
        let isPush = true
        for (var i = 0; i < this.taskScopes.length; i++) {
          if (this.scopes === this.taskScopes[i].scopes) {
            isPush = false
          }
        }
        if (isPush) {
          this.scopeTab.push({collegeName: this.collegeName, teacherOrCurriculum: this.teacherOrCurriculum})
          this.taskScopes.push({scopeType: this.scopeType, scopes: this.scopes})
        }
      },
      save: function () {
        let data = {}
        if (this.taskId) {
          data = {
            'taskId': this.taskId,
            'taskName': this.taskName,
            'startDate': this.sydate + ' 00:00:00',
            'endDate': this.eydate + ' 00:00:00',
            'times': this.times,
            'lastUpdateDate': new Date().toLocaleDateString(),
            'lastUpdator': this.userinfo.id,
            'taskScopes': this.taskScopes
          }
          let that = this
          this.axios({
            method: 'post',
            url: updateTasksUrl,
            data: data
          })
            .then(function (res) {
              console.log(res)
              that.$router.go(-1)
            })
        } else {
          data = {
            // new Date().toLocaleTimeString().slice(2)
            'taskName': this.taskName,
            'loopClassGroupId': this.loopClassGroupId,
            'receiver': this.memberId,
            'taskType': 0,
            'startDate': this.sydate + ' 00:00:00',
            'endDate': this.eydate + ' 00:00:00',
            'times': this.times,
            'isPublish': 0,
            'isDelete': 0,
            'createDate': new Date().toLocaleDateString(),
            'creator': this.userinfo.id,
            'lastUpdateDate': new Date().toLocaleDateString(),
            'lastUpdator': '',
            'taskScopes': this.taskScopes
          }
          let that = this
          this.axios({
            method: 'post',
            url: addLoopClassTasksUrl,
            data: data
          })
            .then(function (res) {
              console.log(res)
              that.$router.go(-1)
            })
        }
      },
      goBack: function () {
        this.$router.go(-1)
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
      }
    },
    computed: {
      collegeList () {
        var _this = this
        var collegeList = []
        this.scopeList.map(function (item) {
          if (item.collegeName.search(_this.collegeName) !== -1) {
            collegeList.push(item)
          }
        })
        return collegeList
      },
      TorCList () {
        var _this = this
        var TorCList = []
        this.collegeTorCList.map(function (item) {
          if (item.realName && item.realName.search(_this.teacherOrCurriculum) !== -1) {
            TorCList.push(item)
          } else if (item.courseName && item.courseName.search(_this.teacherOrCurriculum) !== -1) {
            TorCList.push(item)
          }
        })
        return TorCList
      }
    },
    watch: {
      scopeType: function () {
        this.scopeTab = []
        this.collegeName = ''
        this.teacherOrCurriculum = ''
      },
      '$route': 'init'
    },
    created () {
      this.userinfo = Object.assign({}, this.$store.state.userinfo)
      this.init()
      console.log(this.userinfo)
    }
  }
</script>

<style scoped>
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
  .item{
    height: 40px;
    padding: 40px 0 0 60px;
    font-size: 16px;
  }
  .item>span{
    float: left;
    width: 160px;
    line-height: 26px;
  }
  .item>b{
    float: left;
    padding: 0 15px;
    line-height: 32px;
    font-weight: normal;
  }
  .item>input[type='text']{
    width: 317px;
  }
  .item input[type='radio']{
    width: 15px;
  }
  .item label{
    float: left;
    line-height: 26px;
    padding: 0 5px;
    margin-right: 60px;
    cursor: pointer;
  }
  .scope{
    overflow: hidden;
    padding: 40px 0 0 60px;
    font-size: 16px;
    line-height: 32px;
  }
  .scope>span{
    float: left;
    width: 160px;
    line-height: 26px;
  }
  .scope ul{
    float: left;
    width: 580px;
    max-height: 300px;
    overflow: auto;
    padding: 6px 10px 0;
    border: 1px solid #929ac2;
  }
  .scope ul li{
    float: left;
    padding: 0 6px;
    margin: 0 10px 10px 0;
    border: 1px solid #999;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
  .scope ul li b{
    font-size: 30px;
    font-weight: normal;
    line-height: 15px;
    padding-left: 5px;
    cursor: pointer;
    position: relative;
    top: 3px;
  }
  .scope>div{
    float: left;
    cursor: pointer;
  }
  .scope>div img{
    float: left;
    width: 30px;
  }
  .foot{
    padding-top: 50px;
  }
  .foot>span{
    line-height: 40px;
    float: left;
    padding: 0 50px;
    font-size: 17px;
    margin-left: 150px;
    cursor: pointer;
    border: 1px solid #999;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
  .foot>span:hover{
    background: #999;
    color: #fff;
  }
  .popup .wrap>div i{
    font-style: normal;
  }
  .popup .wrap>div input{
    float: none;
    border: none;
  }
  .popup .wrap>div>div{
    display: inline-block;
    position: relative;
  }
  .popup .wrap>div>div>span{
    display: inline-block;
    border: 1px solid;
  }
  .popup .wrap>div>div>ul{
    position: absolute;
    background: #fff;
    border: 1px solid #999;
  }
  .popup .wrap>div>div>ul>li{
    height: 30px;
    width: 203px;
    cursor: pointer;
  }
  .popup .wrap>div>div>ul>li:hover{
    background: #eee;
  }
  .popup .wrap>div b{
    padding: 0 10px 5px;
    font-size: 20px;
    line-height: 10px;
    cursor: pointer;
  }
</style>
<style scoped src="./table-popup.css"></style>


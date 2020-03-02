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
        <li v-for="(item, index) in scopeList">
          <input type="checkbox" v-model="taskScopes" :value="{scopeType:scopeType, scopes:item.collegeId||item.buildingId}" :id="'option'+index">
          <label :for="'option'+index">{{item.collegeName||item.buildingDescription}}</label>
        </li>
      </ul>
    </div>
    <div class="item">
      <span>巡课次数*:</span><input v-model="times" type="text" placeholder="请输入需要巡课的次数，为整数" />
    </div>
    <div class="foot"><span @click="save">保存</span><span @click="goBack">取消</span></div>
  </div>
</template>

<script>
  import Calendarme from '@/components/extend/calendar.vue'
  import {updateTasksUrl, findTasksByIdUrl, addLoopClassTasksUrl, coursesListUrl, buildingsUrl} from '@/module/admin/usercenter/config/usercenterinfo'

  export default {
    name: 'loopCommonTask',
    components: {
      Calendarme
    },
    data () {
      return {
        sortType: [
          {name: '开课院系', value: 'college'},
          {name: '教学楼', value: 'building'}
        ],
        title: '添加任务',
        userinfo: '',
        memberId: '',
        loopClassGroupId: '',
        taskId: null,
        taskName: '',
        times: null,
        scopeType: null,
        taskScopes: [],
        scopeList: [],
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
        this.taskScopes = []
        if (value === '开课院系') {
          this.scopeType = 1
          let that = this
          this.axios({
            method: 'post',
            url: coursesListUrl,
            data: {courseType: 1, page: {pageIndex: 1, pageSize: 100}, collegeId: ''}
          })
            .then(function (res) {
              that.scopeList = res.data.courseList
              console.log(that.scopeList)
            })
        } else if (value === '教学楼') {
          this.scopeType = 3
          let that = this
          this.axios({
            method: 'post',
            url: buildingsUrl
          })
            .then(function (res) {
              that.scopeList = res.data.result.data
              console.log(that.scopeList)
            })
        }
      },

      save: function () {
        let data = {}
        if (this.taskId) {
          data = {
            'taskId': this.taskId,
            'taskName': this.taskName,
            'loopClassGroupId': this.loopClassGroupId,
            'startDate': this.sydate + ' 00:00:00',
            'endDate': this.eydate + ' 00:00:00',
            'times': this.times,
            'lastUpdateDate': new Date().toLocaleDateString(),
            'lastUpdator': this.userinfo.id,
            'taskScopes': [{'scopeType': 0, 'scopes': ''}]
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
          console.log(data)
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
    watch: {
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
    padding-right: 20px;
  }
  .scope ul li{
    float: left;
    padding: 0 6px;
    margin: 0 10px 10px 0;
  }
  .scope ul li input{
    margin: 3px 3px 0 0;
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
  label{
    cursor: pointer;
  }
</style>

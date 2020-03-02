<template>
  <div class="main">
    <div class="breadcrumb"><router-link :to="{ name: 'AJusercenterloop'}">巡课任务</router-link><span> > </span><span>{{title}}</span></div>
    <div class="item">
      <span>巡课任务名称*:</span><input v-model="taskName" type="text">
    </div>
    <div class="item">
      <span>巡课时间*:</span>
      <Calendarme :inputstyle='inputstyle' :iconstyle='iconstyle' :part='part' :clear="true" :valshow='svalshow' :ymdhms='ymdhms' :dateval='sydate' @startfn='startfn' :ids='start'></Calendarme>
      <b>到</b>
      <Calendarme :inputstyle="inputstyle" :iconstyle="iconstyle" :part="part" :clear="true" :valshow="evalshow" :ymdhms="ymdhms" :dateval="eydate" @endfn="endfn" :ids="end"></Calendarme>
    </div>
    <div class="item">
      <span>巡课节次总数*:</span><input v-model="times" placeholder="请输入需要巡课的次数,为整数">
    </div>
    <div class="item">
      <span>关联巡课评价表*:</span>
      <div id="select12" style="width: 318px;"></div>
    </div>
    <div class="foot"><span @click="save">保存</span><span @click="goBack">取消</span></div>
  </div>
</template>

<script>
  import * as types from '@/store/win-types'
  import Calendarme from '@/components/extend/calendar.vue'
  import {warntxt, updateTasksUrl, findTasksByIdUrl, addLoopClassTasksUrl, loopurl} from '@/module/admin/usercenter/config/usercenterinfo'
  export default {
    name: 'loopLeaderTask',
    components: {
      Calendarme
    },
    data () {
      return {
        title: '添加任务',
        modelId: '',
        taskId: null,
        times: null,
        userinfo: '',
        loopClassGroupId: '',
        taskName: '',
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
        let obj = this.$route.query
        this.loopClassGroupId = obj.loopClassGroupId
        if (this.$route.query.taskId) {
          this.title = '编辑任务'
          this.taskId = obj.taskId
          let that = this
          this.axios({
            method: 'post',
            url: findTasksByIdUrl,
            data: {taskId: this.taskId}
          })
            .then(function (res) {
              that.taskName = res.data.data.taskName
              that.times = res.data.data.times
              that.modelId = res.data.data.modelId
              that.sydate = res.data.data.startDate.split(' ')[0]
              that.eydate = res.data.data.endDate.split(' ')[0]
            })
        } else {
          this.taskName = ''
          this.times = null
          this.modelId = ''
          this.sydate = ''
          this.eydate = ''
        }
      },
      goBack: function () {
        this.$router.go(-1)
      },
      valid () {
        if (this.taskName.replace(/\s/gi, '') === '') {
          this.win(warntxt.taskName, '', false)
          return false
        } else if (this.sydate.replace(/\s/gi, '') === '') {
          this.win(warntxt.sydate, '', false)
          return false
        } else if (this.eydate.replace(/\s/gi, '') === '') {
          this.win(warntxt.eydate, '', false)
          return false
        } else if (new Date(this.eydate).getTime() - new Date(this.sydate).getTime() < 0) {
          this.win(warntxt.dateError, '', false)
          return false
        } else if (!/^[1-9]\d*$/.test(this.times)) {
          this.win(warntxt.times, '', false)
          return false
        } else if (this.modelId.replace(/\s/gi, '') === '') {
          this.win(warntxt.modelId, '', false)
          return false
        } else {
          return true
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
      },
      save: function () {
        if (!this.valid()) {
          return false
        }
        let data = {}
        if (this.taskId) {
          data = {
            'taskId': this.taskId,
            'taskName': this.taskName,
            'loopClassGroupId': this.loopClassGroupId,
            'startDate': this.sydate + ' 00:00:00',
            'endDate': this.eydate + ' 00:00:00',
            'times': this.times,
            'modelId': this.modelId,
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
              if (res.data.id) {
                this.win(res.data.content, '', false)
              } else {
                that.$router.go(-1)
              }
            })
        } else {
          data = {
            'taskName': this.taskName,
            'loopClassGroupId': this.loopClassGroupId,
            'receiver': '',
            'taskType': 1,
            'startDate': this.sydate + ' 00:00:00',
            'endDate': this.eydate + ' 00:00:00',
            'times': this.times,
            'modelId': this.modelId,
            'isPublish': 0,
            'isDelete': 0,
            'createDate': new Date().toLocaleDateString(),
            'creator': this.userinfo.id,
            'lastUpdateDate': new Date().toLocaleDateString(),
            'lastUpdator': '',
            'taskScopes': [{'scopeType': 0, 'scopes': ''}]
          }
          let that = this
          this.axios({
            method: 'post',
            url: addLoopClassTasksUrl,
            data: data
          })
            .then(function (res) {
              if (res.data.id) {
                this.win(res.data.content, '', false)
              } else {
                that.$router.go(-1)
              }
            })
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
      }
    },
    watch: {
      '$route': 'init'
    },
    created () {
      this.userinfo = Object.assign({}, this.$store.state.userinfo)
      this.init()
    },
    mounted () {
      let that = this
      this.axios({
        method: 'post',
        url: loopurl,
        data: {isPublish: 1, isDelete: 0, curPage: 0, pageSize: 999}
      })
        .then(function (res) {
          let objs = res.data.result
          console.log(objs)
          let temp = []
          temp[0] = {value: -1, txt: '请选择...'}
          for (let item = 0; item < objs.length; item++) {
            temp[item + 1] = {}
            temp[item + 1]['value'] = objs[item].modelId
            temp[item + 1]['txt'] = objs[item].modelName
          }
          that.$Select({
            'data': temp,
            'selectId': 'select12',
            'callback': function (obj) {
              that.modelId = obj.ind ? obj.value : ''
            },
            'matchval': [{val: that.modelId ? that.modelId : -1}]
          })
        })
    }
  }
</script>

<style scoped>
  .main{
    padding: 0 5px;
    overflow: hidden;
  }
  .breadcrumb{
    font-size: 24px;
    color: #555;
    padding-left: 15px;
  }
  .item{
    height: 40px;
    padding: 40px 0 0 60px;
  }
  .item span{
    float: left;
    width: 160px;
    line-height: 32px;
    text-align: left;
    font-size: 16px;
  }
  .item b{
    float: left;
    padding: 0 15px;
    line-height: 32px;
    font-weight: normal;
  }
  .item input{
    width: 317px;
  }
  .foot{
    padding-top: 50px;
  }
  .foot span{
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
  .foot span:hover{
    background: #999;
    color: #fff;
  }
</style>

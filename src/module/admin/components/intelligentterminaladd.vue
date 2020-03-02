<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.nameN}}<i>*</i>：</span>
			 		<div id='select1' style="margin-top: 3px;"></div>
          <select id="select11"></select>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.classroomN}}<i>*</i>：</span>
			 		<div id='select2' style="margin-top: 3px;"></div>
          <select id="select22"></select>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.inputN}}<i>*</i>：</span>
			 		<input type="text" v-model="inputIP" />
        </div>
        <div class="formline" style="width: 50%;">
          <span class="txt">{{basicinfo.port}}<i>*</i>：</span>
          <input type="text" v-model="port" />
        </div>
      </div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{basicinfo.saveN}}</div>
 			</div>
    </div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import { basicinfo, pathinfo, addurl, optionurl } from '@/module/admin/config/Intelligentterminalinfo'
export default {
  name: 'AJintelligentterminaladd',
  data () {
    return {
      add: 'add',
      basicinfo: basicinfo,
      msg: basicinfo.msgaddN,
      wininfo: {
        widhei: ['700px', '300px'],
        btncancelleft: '545px',
        contenthei: '183px'
      },
      inputIP: '',
      port: '8080',
      classrooms: [],
      Sgrade: '',
      gradeS: '',
      subjectS: '',
      classroomId: ''
    }
  },
  methods: {
    verify () {
      if (!this.Sgrade) {
        this.win('请选择教学楼')
        return true
      } else if (!this.classroomId) {
        this.win('请选择教室')
        return true
      } else if (!this.inputIP.toString().replace(/\s/g, '')) {
        this.win('请填写IP')
        return true
      } else if (!this.port.toString().replace(/\s/g, '')) {
        this.win('请填写端口')
        return true
      } else {
        return false
      }
    },
    savedata () {
      if (this.verify()) {
        return
      }
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        params: {
          params: {
            port: that.port,
            classRoomId: that.classroomId,
            deviceIp: that.inputIP,
            deviceName: that.inputIP,
            url: '',
            type: 12
          }
        }
      })
        .then(function (res) {
          if (res.data.code !== 200) {
            that.win(res.data.message, '', false)
          } else {
            that.cancelfn()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    cancelfn () {
      this.$router.push({ name: pathinfo.prex })
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
  mounted () { // 获取列表选项
    let that = this
    // this.axios({
    //   method: 'post',
    //   url: optionurl
    // })
    this.axios.post(optionurl, {classroomType: '2'})
      .then(function (res) {
        let objs = res.data.result
        let temp = []
        let subject = []
        let subjectall = []
        temp[0] = { value: '-1', txt: '请选择...' }
        subject[0] = [{ value: '-1', txt: '请选择...' }]
        subjectall[0] = { value: '-1', txt: '请选择...' }
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].buildingId
          temp[item + 1]['txt'] = objs[item].buildingName
          subject[item + 1] = []
          let classroomList = objs[item].classrooms
          if (classroomList.length === 0) {
            subject[item + 1].push({ value: '-1', txt: '请选择...' })
          } else {
            for (let k = 0; k < classroomList.length; k++) {
              if (k === 0) {
                subject[item + 1].push({ value: '-1', txt: '请选择...' })
              }
              if (classroomList[k].isAnalysis === 2) {
                subject[item + 1].push({
                  value: classroomList[k].classroomId,
                  txt: classroomList[k].classroomName
                })
                subjectall.push({
                  value: classroomList[k].classroomId,
                  txt: classroomList[k].classroomName
                })
              }
            }
          }
        }
        // 教学楼
        that.gradeS = that.$Select({
          data: temp,
          originS: 'multiple',
          selectId: ['select11', 'select1'],
          callback: function (obj) {
            that.Sgrade = obj.ind ? obj.value : ''
            that.classroomId = ''
            that.subjectS.cfg.data = subject[obj.ind]
            that.subjectS.cfg.domdata = { ind: 0, value: '', txt: '请选择...' }
            that.subjectS.initCommonVal()
          },
          cleartxt: '请选择...'
        })
        // 教室
        that.subjectS = that.$Select({
          data: subjectall,
          originS: 'multiple',
          selectId: ['select22', 'select2'],
          callback: function (obj) {
            that.classroomId = obj.ind ? obj.value : ''
          },
          matchval: [{val: '-1'}],
          cleartxt: '请选择...'
        })
      })
  }
}
</script>

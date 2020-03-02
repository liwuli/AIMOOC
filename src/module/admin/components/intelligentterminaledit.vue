<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
        <div class="formline" style="width: 50%;">
          <span class="txt">{{basicinfo.nameN}}<i v-show="true">*</i>：</span>
          <div id='select1' style="margin-top: 3px;"></div>
          <select id="select11"></select>
        </div>
        <div class="formline" style="width: 50%;">
          <span class="txt">{{basicinfo.classroomN}}<i v-show="true">*</i>：</span>
          <div id='select2' style="margin-top: 3px;"></div>
          <select id="select22"></select>
        </div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.inputN}}<i v-show="true">*</i>：</span>
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
import {basicinfo, pathinfo, editurl, buildinglisturl} from '@/module/admin/config/Intelligentterminalinfo'
export default {
  name: 'AJintelligentterminaledit',
  data () {
    return {
      basicinfo: basicinfo,
      msg: basicinfo.msgeditN,
      wininfo: {
        widhei: ['700px', '300px'],
        btncancelleft: '545px',
        contenthei: '183px'
      },
      inputIP: '',
      port: '',
      classroomId: '',
      deviceId: '',
      deviceName: '',
      deviceurl: '',
      devicetype: '',
      builId: ''
    }
  },
  methods: {
    async getBuildingAndClassrooms () { // 教学楼-教室
      try {
        const res = await this.axios.post(buildinglisturl)
		debugger
        let that = this
        let temp = [{value: -1, txt: '请选择'}]
        let classroom = [[{value: '', txt: '请选择'}]]
        let objs = res.data.result
        let ind = 0
        for (let len = objs.length, j = 0; j < len; j++) {
          if (this.builId === objs[j].buildingId) {
            ind = j + 1
          }
          temp[j + 1] = {value: objs[j].buildingId, txt: objs[j].buildingName}
          let classroomList = objs[j].classrooms
          if (classroomList.length > 0) {
            classroom[j + 1] = [{value: -1, txt: '请选择'}]
            for (let k = 0; k < classroomList.length; k++) {
              classroom[j + 1][k + 1] = {value: classroomList[k].classroomId, txt: classroomList[k].classroomName}
            }
          }
        }
        that.$Select({
          'data': temp,
          'originS': 'multiple',
          'selectId': ['select11', 'select1'],
          'callback': function (obj) {
            if (that.classroomS) {
              that.builId = obj.ind ? obj.value : ''
              that.classroomId = ''
              that.classroomS.cfg.data = classroom[obj.ind]
              that.classroomS.cfg.domdata = false
              that.classroomS.initCommonVal()
            }
          },
          'matchval': [{val: that.builId}]
        })
        that.classroomS = that.$Select({
          'data': classroom[ind],
          'originS': 'multiple',
          'selectId': ['select22', 'select2'],
          'callback': function (obj) {
            that.classroomId = obj.ind ? obj.value : ''
          },
          'matchval': [{val: that.classroomId}]
        })
      } catch (err) {
        console.log(err)
      }
    },
    verify () {
      if (!this.builId) {
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
    /* 保存按钮事件,发送信息 */
    savedata () {
      if (this.verify()) {
        return
      }
      let that = this      
      this.axios({
        method: 'post',
        url: editurl,
        params: {
          params: {
            port: that.port,
            classRoomId: that.classroomId,
            deviceIp: that.inputIP,
            deviceName: that.deviceName,
            url: that.deviceurl,
            type: that.devicetype,
            deviceId: that.deviceId
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
    // 取消按钮事件
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
  mounted () {
    // 挂载数据
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn)
    } else {
      this.port = obj.port
      this.inputIP = obj.deip
      this.builId = obj.buid
      this.classroomId = obj.clid
      this.deviceName = obj.dename
      this.deviceId = obj.deid
      this.devicetype = obj.detype
      this.deviceurl = obj.deurl
    }
    this.getBuildingAndClassrooms()
  }
}
</script>

<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.deviceNameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="deviceName" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.ipN}}<i>*</i>：</span>
			 		<input type="text"  v-model="ip" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.avalidN}}：</span>
			 		<Radio :type="add" @radioevent="radioevent" :radioinfo="addradioinfo"></Radio>
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
import Radio from '@/components/extend/radio'
import {basicinfo, warntxt, pathinfo, addurl, addradioinfo} from '@/module/admin/config/workstationinfo'
export default {
  name: 'AJworkstationadd',
  data () {
    return {
      msg: basicinfo.msgaddN,
      addradioinfo: addradioinfo,
      basicinfo: basicinfo,
      add: 'add',
      wininfo: {
        widhei: ['500px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      deviceName: '',
      ip: '',
      gender: 1
    }
  },
  components: {
    Radio
  },
  methods: {
    valid () {
      if (this.deviceName.replace(/\s/gi, '') === '') {
        this.win(warntxt.deviceName, '', false)
        return false
      } else if (this.ip.replace(/\s/gi, '') === '') {
        this.win(warntxt.ip, '', false)
        return false
      } else {
        return true
      }
    },
    radioevent (obj) {
      this.gender = obj.val
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        params: {
          'par': {
            deviceName: that.deviceName,
            deviceIp: that.ip,
            type: 5,
            isValid: that.gender * 1
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
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
  }
}
</script>

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
			 		<input type="text"  v-model="deviceName" :value="deviceName"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.ipN}}<i>*</i>：</span>
			 		<input type="text"  v-model="ip"  :value="ip"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.avalidN}}<i>*</i>：</span>
			 		<Radio :genderval="gender" :type="edit" @radioevent="radioevent" :radioinfo="radioinfo"></Radio>
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
import {basicinfo, warntxt, pathinfo, radioinfo, editurl} from '@/module/admin/config/workstationinfo'
export default {
  name: 'AJworkstationedit',
  data () {
    return {
      msg: basicinfo.msgeditN,
      basicinfo: basicinfo,
      edit: 'edit',
      wininfo: {
        widhei: ['500px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      radioinfo: radioinfo,
      ip: '',
      deviceName: '',
      id: '',
      gender: ''
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
      this.genderval = obj.val
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        params: {
          'par': {
            deviceName: that.deviceName,
            deviceIp: that.ip,
            deviceId: that.id,
            type: 5,
            isValid: that.genderval * 1
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
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn)
    } else {
      this.deviceName = obj.name
      this.ip = obj.ip
      this.id = obj.id
      this.genderval = obj.genderval
      this.gender = obj.genderval ? 0 : 1
    }
  }
}
</script>

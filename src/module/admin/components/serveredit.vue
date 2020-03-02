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
			 		<span class="txt">{{basicinfo.nameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="server" :value="server"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.ipN}}<i>*</i>：</span>
			 		<input type="text"  v-model="ip" :value="ip"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.typeN}}<i>*</i>：</span>
			 		<div id='select83'  style="margin-top: 3px;">
					</div>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.avalidN}}<i>*</i>：</span>
			 		<Radio :type='edit' :genderval="gender" @radioevent="radioevent" :radioinfo="editradioinfo"></Radio>
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
import {basicinfo, warntxt, pathinfo, serverinfos, editradioinfo, editurl} from '@/module/admin/config/serverinfo'
export default {
  name: 'AJserveradd',
  data () {
    return {
      msg: basicinfo.msgeditN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      server: '',
      ip: '',
      id: '',
      edit: 'edit',
      type: '',
      typeval: ''
    }
  },
  components: {
    Radio
  },
  methods: {
    getServerTypeIndex (type) {
      for (var i = 0; i < serverinfos.length; i++) {
        if (serverinfos[i].value === type) {
          return i
        }
      }
      return -1
    },

    valid () {
      if (this.server.replace(/\s/gi, '') === '') {
        this.win(warntxt.server, '', false)
        return false
      } else if (this.ip.replace(/\s/gi, '') === '') {
        this.win(warntxt.ip, '', false)
        return false
      } else if (this.type.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.type, '', false)
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
          par: {
            deviceId: that.id,
            deviceIp: that.ip,
            deviceName: that.server,
            isValid: that.genderval * 1,
            type: that.type
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
    let that = this
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.ip = obj.ip
      this.id = obj.id
      this.server = obj.name
      this.genderval = obj.device === '否' ? 0 : 1
      this.editradioinfo = editradioinfo
      this.gender = obj.deviceval ? 0 : 1
      this.type = obj.type
      this.typeval = obj.typeval
      this.$Select({
        'data': serverinfos,
        'selectId': 'select83',
        'callback': function (obj) {
          that.type = obj.value * 1
        },
        'matchval': [{ind: that.getServerTypeIndex(that.typeval)}]
      })
    }
  }
}
</script>

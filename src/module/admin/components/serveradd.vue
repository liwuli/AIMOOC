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
			 		<input type="text"  v-model="server" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.ipN}}<i>*</i>：</span>
			 		<input type="text"  v-model="ip" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.typeN}}<i>*</i>：</span>
			 		<div id='select83'  style="margin-top: 3px;">
					</div>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.avalidN}}<i>*</i>：</span>
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
import {basicinfo, warntxt, pathinfo, serverinfos, addradioinfo, addurl} from '@/module/admin/config/serverinfo'
export default {
  name: 'AJserveradd',
  data () {
    return {
      msg: basicinfo.msgaddN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      addradioinfo: addradioinfo,
      add: 'add',
      server: '',
      ip: '',
      gender: 1,
      type: ''
    }
  },
  components: {
    Radio
  },
  methods: {
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
          par: {
            deviceIp: that.ip,
            deviceName: that.server,
            isValid: that.gender * 1,
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
    this.type = 6
    this.$Select({
      'data': serverinfos,
      'selectId': 'select83',
      'callback': function (obj) {
        that.type = obj.value * 1
      },
      'cleartxt': '全部'
    })
  }
}
</script>

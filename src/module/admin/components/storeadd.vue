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
			 		<input type="text"  v-model="name"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.localN}}<i>*</i>：</span>
			 		<input type="text"  v-model="local" :placeholder="warntxt.localplaceholder"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.accountN}}<i>*</i>：</span>
			 		<input type="text"  v-model="account"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.passwordN}}<i>*</i>：</span>
			 		<input type="password"  v-model="password"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.localaddressN}}<i>*</i>：</span>
			 		<input type="text"  v-model="localaddress" :placeholder="warntxt.localaddressplaceholder"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.httpN}}<i>*</i>：</span>
			 		<input type="text"  v-model="http" :placeholder="warntxt.httpplaceholder"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.rtmpN}}<i>*</i>：</span>
			 		<input type="text"  v-model="rtmp" :placeholder="warntxt.rtmpplaceholder"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.totalN}}<i>*</i>：</span>
			 		<input type="number"  min="0"  v-model="total"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.useN}}：</span>
			 		<input type="number"  min="0"  v-model="use"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.alertN}}<i>*</i>：</span>
			 		<input type="number"  min="0"  v-model="alert"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.ftpipN}}<i>*</i>：</span>
			 		<input type="text"  v-model="ftpip"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.ftpaccountN}}<i>*</i>：</span>
			 		<input type="text"  v-model="ftpaccount"/>
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.ftppassN}}<i>*</i>：</span>
			 		<input type="password"  v-model="ftppass"/>
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
import {basicinfo, warntxt, pathinfo, addurl} from '@/module/admin/config/storeinfo'
export default {
  name: 'AJstoreadd',
  data () {
    return {
      msg: basicinfo.msgaddN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['700px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      warntxt: warntxt,
      ftpip: '',
      ftppass: '',
      ftpaccount: '',
      name: '',
      local: '',
      account: '',
      password: '',
      localaddress: '',
      http: '',
      rtmp: '',
      total: '',
      use: '',
      alert: ''
    }
  },
  components: {
  },
  methods: {
    valid () {
      if (this.name.replace(/\s/gi, '') === '') {
        this.win(warntxt.name, '', false)
        return false
      } else if (this.local.replace(/\s/gi, '') === '') {
        this.win(warntxt.local, '', false)
        return false
      } else if (this.account.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.account, '', false)
        return false
      } else if (this.password.replace(/\s/gi, '') === '') {
        this.win(warntxt.password, '', false)
        return false
      } else if (this.localaddress.replace(/\s/gi, '') === '') {
        this.win(warntxt.localaddress, '', false)
        return false
      } else if (this.http.replace(/\s/gi, '') === '') {
        this.win(warntxt.http, '', false)
        return false
      } else if (this.rtmp.replace(/\s/gi, '') === '') {
        this.win(warntxt.rtmp, '', false)
        return false
      } else if (this.total.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.total, '', false)
        return false
      } else if (this.alert.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.alert, '', false)
        return false
      } else if (this.ftpip.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.ftpip, '', false)
        return false
      } else if (this.ftpaccount.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.ftpaccount, '', false)
        return false
      } else if (this.ftppass.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.ftppass, '', false)
        return false
      } else {
        return true
      }
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
            stoName: that.name,
            stopath: that.local,
            username: that.account,
            password: that.password,
            stoLocalPath: that.localaddress,
            tomcatMapping: that.http,
            rtmpmapping: that.rtmp,
            totalContent: that.total * 1,
            hasUsedContent: that.use * 1,
            alertConent: that.alert * 1,
            ftpPath: that.ftpip,
            ftpusername: that.ftpaccount,
            ftppassword: that.ftppass
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

<template>
 	<div class="formwin">
 		<div class="win_content"  :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">

			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.nameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="name" />
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.httpN}}<i>*</i>：</span>
			 		<div id='select0'  style="margin-top: 3px;">
			 			<div class="listinfo">请选择...</div>
						<div class="listinfo">原有设备</div>
						<div class="listinfo">ONVIF</div>
						<div class="listinfo">RTSP</div>
					</div>
			 	</div>
			 	<div class="formline" style="width: 50%;"  v-show="show">
			 		<span class="txt">{{basicinfo.manuN}}<i  v-show="showstar[0]">*</i>：</span>
			 		<div id='select2'  style="margin-top: 3px;"></div>
			 	</div>
			 	<div class="formline" style="width: 50%;"  v-show="show">
			 		<span class="txt">{{basicinfo.deviceN}}<i v-show="showstar[1]">*</i>：</span>
			 		<div id='select1'  style="margin-top: 3px;"></div>
			 	</div>
			 	<div class="formline" style="width: 50%;" v-show="show">
			 		<span class="txt">{{basicinfo.PORTN}}<i v-show="showstar[2]">*</i>：</span>
			 		<input type="number"   v-model="PORT" />
			 	</div>
			 	<div class="formline" style="width: 50%;"  v-show="!show">
			 		<span class="txt">{{basicinfo.URLN}}<i v-show="showstar[3]">*</i>：</span>
			 		<input type="text"  v-model="URL" />
			 	</div>
			 	<div class="formline" style="width: 50%;"  v-show="show">
			 		<span class="txt">{{basicinfo.IPN}}<i v-show="showstar[4]">*</i>：</span>
			 		<input type="text"  v-model="IP"  v-show="show"/>
			 	</div>
			 	<div class="formline" style="width: 50%;"  v-show="show">
			 		<span class="txt">{{basicinfo.userN}}<i v-show="showstar[5]">*</i>：</span>
			 		<input type="txt"  v-model="user" />
			 	</div>
			 	<div class="formline" style="width: 50%;"  v-show="show">
			 		<span class="txt">{{basicinfo.passN}}<i v-show="showstar[6]">*</i>：</span>
			 		<input type="text"  v-model="pass" />
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.useN}}：</span>
			 		<Radio :type="add" @radioevent="radioevent" :radioinfo="radioinfo"></Radio>
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
import {basicinfo, warntxt, pathinfo, addradioinfo, manufacturerinfo, device, addurl} from '@/module/admin/config/controlrecordinfo'
export default {
  name: 'AJcontrolrecordadd',
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
      name: '',
      http: '',
      URL: '',
      IP: '',
      manu: '',
      pass: '',
      user: '',
      PORT: '',
      type: '',
      radioinfo: addradioinfo,
      manufacturerinfo: manufacturerinfo,
      device: device,
      id: '',
      use: 1,
      show: true,
      showstar: [true, true, true, true, true, true, true],
      loading: false
    }
  },
  methods: {
    valid () {
      if (this.http === '') {
        this.win(warntxt.http, '', false)
        return false
      } else if (this.http === 0 || this.http === '0') {
        if (this.name.replace(/\s/gi, '') === '') {
          this.win(warntxt.name, '', false)
          return false
        } else if (this.http.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.http, '', false)
          return false
        } else if (this.manu.toString().replace(/\s/gi, '') === '' || this.manu.toString().replace(/\s/gi, '') === '-1') {
          this.win(warntxt.manu, '', false)
          return false
        } else if (this.PORT.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.PORT, '', false)
          return false
        } else if (this.type.toString().replace(/\s/gi, '') === '' || this.type.toString().replace(/\s/gi, '') === '-1') {
          this.win(warntxt.type, '', false)
          return false
        } else if (this.IP.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.IP, '', false)
          return false
        } else if (!this.isip(this.IP.toString())) {
          this.win(warntxt.IPright, '', false)
          return false
        } else {
          return true
        }
      } else if (this.http === 1 || this.http === '1') {
        if (this.name.replace(/\s/gi, '') === '') {
          this.win(warntxt.name, '', false)
          return false
        } else if (this.http.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.http, '', false)
          return false
        } else if (this.manu.toString().replace(/\s/gi, '') === '' || this.manu.toString().replace(/\s/gi, '') === '-1') {
          this.win(warntxt.manu, '', false)
          return false
        } else if (this.PORT.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.PORT, '', false)
          return false
        } else if (this.type.toString().replace(/\s/gi, '') === '' || this.type.toString().replace(/\s/gi, '') === '-1') {
          this.win(warntxt.type, '', false)
          return false
        } else if (this.IP.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.IP, '', false)
          return false
        } else if (!this.isip(this.IP.toString())) {
          this.win(warntxt.IPright, '', false)
          return false
        } else if (this.user.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.user, '', false)
          return false
        } else if (this.pass.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.pass, '', false)
          return false
        } else {
          return true
        }
      } else if (this.http === 2 || this.http === '2') {
        if (this.name.replace(/\s/gi, '') === '') {
          this.win(warntxt.name, '', false)
          return false
        } else if (this.http.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.http, '', false)
          return false
        } else if (this.URL.toString().replace(/\s/gi, '') === '') {
          this.win(warntxt.URL, '', false)
          return false
        } else {
          return true
        }
      }
    },
    isip (value) {
      return function (value) {
        let valid = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)
        if (!valid) { // 首先必须是 xxx.xxx.xxx.xxx 类型的数字，如果不是，返回false
            return false
        }
        return value.split('.').every(function (num) {
          // 切割开来，每个都做对比，可以为0，可以小于等于255，但是不可以0开头的俩位数
          // 只要有一个不符合就返回false
          if (num.length > 1 && num.charAt(0) === '0') {
            // 大于1位的，开头都不可以是‘0’
            return false
          } else if (parseInt(num , 10) > 255) {
            // 大于255的不能通过
            return false
          }
          return true
        })
      } (value)
    },
    radioevent (obj) {
      this.use = obj.val
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
     this.loading=true;
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        params: {
          params: {
            classRoomId: that.id,
            deviceIp: that.IP,
            deviceName: that.name,
            isValid: that.use,
            manufacturer: that.manu,
            port: that.PORT,
            protocolType: that.http,
            uname: that.user,
            url: that.URL,
            ukeyword: that.pass,
            type: that.type
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.loading=false;
          that.win(res.data.message, '', false)
        } else {
          that.loading=false;
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
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.id
    }
    let that = this
    this.$Select({
      'selectId': 'select0',
      'callback': function (obj) {
        if (obj.ind !== 0) {
          if (obj.ind === 3) {
            that.show = false
            that.showstar = [false, false, false, true, false, false, false]
          } else {
            that.show = true
            if (obj.ind === 1) {
              that.showstar = [true, true, true, false, true, false, false]
            } else {
              that.showstar = [true, true, true, false, true, true, true]
            }
          }
          that.http = obj.ind - 1
        } else {
          that.http = ''
        }
      }
    })
    this.$Select({
      'data': that.device,
      'selectId': 'select1',
      'callback': function (objs) {
        that.type = objs.value
      },
      'cleartxt': '请选择'
    })
    this.$Select({
      'data': that.manufacturerinfo,
      'selectId': 'select2',
      'callback': function (objs) {
        that.manu = objs.value
        that.PORT = objs.port
        if (objs.user) {
          that.pass = objs.pass
          that.user = objs.user
        } else {
          that.pass = ''
          that.user = ''
        }
      },
      'cleartxt': '请选择'
    })
  },
  components: {
    Radio
  }
}
</script>

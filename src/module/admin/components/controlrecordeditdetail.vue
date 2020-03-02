<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]"
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

			 	<div class="formline">
			 		<span class="txt">{{basicinfo.channelnameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="name" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.photoobjN}}：</span>
			 		<div id='select1'  style="margin-top: 3px;"></div>
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
import {basicinfo, warntxt, pathinfo, channeledit, photoobj} from '@/module/admin/config/controlrecordinfo'
export default {
  name: 'AJcontrolrecordeditchannel',
  data () {
    return {
      msg: basicinfo.msgeditchannelN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '300px'],
        btncancelleft: '345px',
        contenthei: '183px'
      },
      name: '',
      type: '',
      photoobj: photoobj,
      id: '',
      parentid: '',
      classroomId: '',
      loading: false
    }
  },
  methods: {
    valid () {
      if (this.name === '') {
        this.win(warntxt.channelname, '', false)
        return false
      } else if (this.type === '') {
        this.win(warntxt.channeltype, '', false)
        return false
      } else {
        return true
      }
    },
    radioevent (obj) {
      this.use = obj.val
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      this.loading = true;
      let that = this
      this.axios({
        method: 'post',
        url: channeledit,
        params: {
          params: {
            classroomId: that.classroomId,
            equipmentId: that.parentid,
            channelId: that.id,
            channelName: that.name,
            target: that.type
          }
        }
      })
      .then(function (res) {        
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
        } else {
          that.loading = false;
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
      this.id = obj.channelid
      this.type = obj.no.toString()
      this.name = obj.channelname
      this.parentid = obj.parentid
      this.classroomId = obj.classroomid
      let that = this
      this.$Select({
        'data': that.photoobj,
        'selectId': 'select1',
        'callback': function (obj) {
          if (obj.value === -1) {
            that.type = ''
          } else {
            that.type = obj.value
          }
        },
        'matchval': [{val: that.type}],
        'cleartxt': '请选择'
      })
    }
  }
}
</script>

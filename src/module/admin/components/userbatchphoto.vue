<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
      <div class="content" :style="'margin-top:' + wininfo.contenttop">
        <singlefile @fileevent='fileevent' :type='uploadtype'></singlefile>
      </div>
      <div class="content" :style="'width:' + wininfo.widhei[0]">
        <p>*上传文件为文件夹，照片对应学生学号或教师工号</p>
        <p>*照片格式为可为png、jpg</p>
        <p>*单个照片文件小于2M</p>
        <p>*照片分辨率大于300*300</p>
        <p>注:保证人脸清晰可见</p>
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
import singlefile from '@/components/extend/singlefile'
import {basicinfo, pathinfo, warntxt, batchuploadtype, batchuploadurl} from '@/module/admin/config/userinfo'
export default {
  name: 'AJuserupload',
  data () {
    return {
      uploadtype: batchuploadtype,
      msg: basicinfo.uploadPhoto,
      basicinfo: basicinfo,
      isBatch: false,
      wininfo: {
        widhei: ['460px', '305px'],
        btncancelleft: '305px',
        contenthei: '200px',
        contenttop: '30px',
        imagewid: '160px'
      },
      warntxt: warntxt
    }
  },
  components: {
    singlefile
  },
  methods: {
    fileevent (obj) {
      this.files = obj.fileinfo
    },
    savedata () {
      if (!this.files || this.files.name === undefined) {
        this.$Win({
          'title': types.title,
          'type': 'txt',
          'content': '请选择文件',
          'timeout': types.Timeout3,
          'cancel': function (obj, backfn) {
            obj.remove(obj.getid)
          },
          'closeshow': false
        })
        return
      }
      let that = this
      let formData = new FormData()
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      formData.append('file', this.files)
      this.axios({
        method: 'post',
        url: batchuploadurl,
        data: formData,
        headers: config.headers
      })
      .then(function (res) {
        that.win(res.data.errorMsg, that.cancelfn, false)
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
        'timeout': types.Timeout4,
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

<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]"
    v-loading="loading"
    element-loading-text="上传文件中,请稍等..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
 			<div class="title">
 				<span class="menuname">设备导入</span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
        <div class="formline">
          <span class="txt">协议类型<i>*</i>：</span>
          <div class="Select">
            <div id="select01"></div>
          </div>
        </div>
			 	<div class="formline">
			 		<span class="txt">文件<i>*</i>：</span>
			 		<singlefile @fileevent='fileevent' :type='filetype'></singlefile>
			 	</div>
        <div class="formline">模板下载:</div>
			 	<div class="formline">
          <div class="btn" style="margin-right: 15px;"><a :href="downloadSrc1" style="color: #fff;">原有设备/ONVIF</a></div>
          <div class="btn"><a :href="downloadSrc2" style="color: #fff;">RTSP</a></div>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">取消</div>
 				<div class="save" @click="savedata">保存</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import singlefile from '@/components/extend/singlefile'
import {upload, url} from '@/module/admin/config/upload'
export default {
  name: 'AJuserimport',
  components: {
    singlefile
  },
  data () {
    return {
      type: 'ONVIF',
      upload: upload,
      downloadSrc1: '/base/models/ONVIF_Template.rar',
      downloadSrc2: '/base/models/RTSP_Template.rar',
      wininfo: {
        widhei: ['500px', '290px'],
        btncancelleft: '345px',
        contenthei: '173px'
      },
      files: '',
      filetype: '.xlsx,.xls',
      eduType: this.$store.state.educationType,
      loading:false
    }
  },
  computed: {
    url () {
      return url + this.type
    }
  },
  methods: {
    fileevent (obj) {
      this.files = obj.fileinfo
    },
    savedata () {
      this.upload(this.url)
    },
    cancelfn () {
      this.$router.go(-1)
    },
    win (content, backfn, flag) {
      if (flag === undefined) {
        flag = true
      }
      this.$Win({
        'title': types.title,
        'type': 'content',
        'height': '200px',
        'content': content,
        'btn': 0,
        'winclose': function () {
          if (typeof backfn === 'function') {
            backfn()
          }
        }
      })
    }
  },
  mounted () {
    let that = this
    this.$Select({
      'data': [{txt: '原有设备', value: 'ONVIF'}, {txt: 'ONVIF', value: 'ONVIF'}, {txt: 'RTSP', value: 'RTSP'}],
      'selectId': 'select01',
      'callback': function (obj) {
        that.type = obj.value
      }
    })
  }
}
</script>

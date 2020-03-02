<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]"
		v-loading="loading"
		element-loading-text="上传文件中,请稍等..."
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline ">
			 		<span class="txt">{{basicinfo.fileN}}<i>*</i>：</span>
			 		<singlefile @fileevent='fileevent' :type='filetype'></singlefile>
			 		<!--<input type="file" @change="change($event)" style="border:none;" v-model="files" accept=".xlsx,.xls"/>-->
			 	</div>
			 	<div class="formline ">
			 		<div class="btn"><a :href="downloadSrc" style="color: #fff;">{{basicinfo.templatedownN}}</a></div>
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
import singlefile from '@/components/extend/singlefile'
import {basicinfo, warntxt, pathinfo, importurl, filetype, importSrc, importSrcP} from '@/module/admin/config/userinfo'
export default {
  name: 'AJuserimport',
  components: {
    singlefile
  },
  data () {
    return {
      roleType: '',
      eduType: this.$store.state.educationType,
      msg: basicinfo.importN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '290px'],
        btncancelleft: '345px',
        contenthei: '173px'
      },
      files: '',
      term: '',
      filetype: filetype,
      loading:false
    }
  },
  computed: {
    downloadSrc () {
      if (this.eduType) {
        if (this.roleType === 3) {
          return importSrc.student
        } else {
          return importSrc.teacher
        }
      } else {
        if (this.roleType === 3) {
          return importSrcP.student
        } else {
          return importSrcP.teacher
        }
      }
    }
  },
  methods: {
    fileevent (obj) {
      this.files = obj.fileinfo
    },
    savedata () {
      debugger
      if(this.files==""){
        this.win('请选择需要上传的文件', true, false)
        return;
      }

      if (this.files.name.indexOf('.xls') < 0) {
        this.$Win({
          'title': types.title,
          'type': 'txt',
          'content': warntxt.filetypeerr,
          'timeout': types.Timeout3,
          'cancel': function (obj, backfn) {
            obj.remove(obj.getid)
          },
          'closeshow': false
        })
        return false
      }
      this.loading=true;
      let that = this
      let formData = new FormData()
      formData.append('file', this.files)
      formData.append('termName', this.term)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.axios({
        method: 'post',
        url: importurl,
        data: formData,
        params: {
          termName: that.term
        },
        headers: config.headers,
        timeout: 1000 * 60 * 10
      })
      .then(function (res) {
          that.loading=false;
        if (res.data.code === 500) {
          that.win(res.data.result[0].message, '', false)
        } else {
          that.win(warntxt.bingo, that.cancelfn, false)
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
  created () {
    this.roleType = this.$route.params.roleType
  }
}
</script>

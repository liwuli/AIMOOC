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
			 		<span class="txt">{{termN}}<i>*</i>：</span>
			 		<div id='select5' style="margin-top: 3px;"></div>
					<select id="select6"></select>
			 	</div>
			 	<div class="formline ">
			 		<span class="txt">{{fileN}}<i>*</i>：</span>
			 		<singlefile @fileevent='fileevent' :type='filetype'></singlefile>
			 		<!--<input type="file" @change="change($event)" style="border:none;" v-model="files" accept=".xlsx,.xls"/>-->
			 	</div>
			 	<div class="formline " v-show="!eduType" >
			 		<div class="btn"><a href="/control/models/lesson_template_P.zip" style="color: #fff;">{{templatedownN}}</a></div>
			 	</div>
			    <div class="formline " v-show="eduType" >
			 		<div class="btn"><a href="/control/models/lesson_template_G.zip" style="color: #fff;">{{templatedownN}}</a></div>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import singlefile from '@/components/extend/singlefile'
import {pathinfo, importurl, filetype, templatedownN, fileN, importN, pagesize, termurl, termN, importbtnN, cancelN} from '@/module/admin/config/courseinfo'
export default {
  name: 'AJcourseimport',
  data () {
    return {
      eduType: this.$store.state.educationType,
      msg: importN,
      wininfo: {
        widhei: ['500px', '290px'],
        btncancelleft: '345px',
        contenthei: '173px'
      },
      files: '',
      term: '',
      templatedownN: templatedownN,
      fileN: fileN,
      termN: termN,
      filetype: filetype,
      saveN: importbtnN,
      cancelN: cancelN,
      loading:false
    }
  },
  methods: {
    valid () {
    },
    down () {
    },
    fileevent (obj) {
      this.files = obj.fileinfo
    },
    savedata () {
      if(this.files=="" && this.term==""){
        this.win('请选择需要上传的文件', false, false)
        return;
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
        that.win(res.data.content, that.cancelfn, false)
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
  beforeCreate () {
    let that = this
    this.axios({
      method: 'post',
      url: termurl,
      data: {
        page: {
          pageSize: pagesize,
          pageIndex: 1
        },
        keywords: ''
      }
    })
    .then(function (res) {
      let temp = []
      temp[0] = {value: '-1', txt: '请选择...'}
      let objs = res.data.termList
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = {}
        temp[item + 1]['value'] = objs[item].termId
        temp[item + 1]['txt'] = objs[item].termName
      }
      that.$Select({
        'data': temp,
        'originS': 'multiple',
        'selectId': ['select6', 'select5'],
        'callback': function (obj) {
          that.term = obj.value
        }
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  components: {
    singlefile
  }
}
</script>
<style type="text/css" scoped>
  .win .txt {}
</style>

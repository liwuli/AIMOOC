<template>
  <div class="formwin">
    <div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
      <div class="title">
        <span class="menuname">设备导入</span>
      </div>
      <div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
      <div class="content" :style="'height:' + wininfo.contenthei">
        <div class="formline">
          <span class="txt">文件<i>*</i>：</span>
          <singlefile @fileevent='fileevent' :type='filetype'></singlefile>
        </div>
        <div class="formline">模板下载:</div>
        <div class="formline">
          <div class="btn"><a :href="downloadSrc" style="color: #fff;">用户模板下载</a></div>
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
  import {upload, addBatchStudentIn} from '@/module/admin/config/upload'
  export default {
    name: 'AJuserimport',
    components: {
      singlefile
    },
    data () {
      return {
        upload: upload,
        downloadSrc: '/base/models/student_inTeachingCls.zip',
        wininfo: {
          widhei: ['500px', '290px'],
          btncancelleft: '345px',
          contenthei: '173px'
        },
        files: '',
        filetype: '.xlsx,.xls',
        eduType: this.$store.state.educationType
      }
    },
    methods: {
      fileevent (obj) {
        this.files = obj.fileinfo
      },
      savedata () {
        this.upload(addBatchStudentIn)
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
    }
  }
</script>

<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{evaluateTemplateinfo.unpublish}}  {{name}}  {{evaluateTemplateinfo.ma}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{sureN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfo, publishurl, contentN, cancelN, sureN, evaluateTemplateinfo} from '@/module/admin/config/evaluateTemplateinfo'
export default {
  name: 'AJevaluateTemplateunpublish',
  data () {
    return {
      msg: evaluateTemplateinfo.unpublishN,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      evaluateTemplateinfo: evaluateTemplateinfo,
      evaluateTemplateIds: '',
      contentN: contentN,
      sureN: sureN,
      name: '',
      cancelN: cancelN,
      lock: ''
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: publishurl,
        params: {
          par: {
            evaluateTemplateId: that.evaluateTemplateIds,
            isOpen: 0
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
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancel)
    } else {
      this.evaluateTemplateIds = obj.id
      this.name = obj.evaluateTemplateName
      this.lock = obj.lock
      if (obj.lock === 1 || obj.lock === '1') {
        this.win(evaluateTemplateinfo.lock, this.cancelfn, false)
      }
    }
  }
}
</script>

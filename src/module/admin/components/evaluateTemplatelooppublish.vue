<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{evaluateTemplateinfo.msgpublishN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{evaluateTemplateinfo.start}}  {{name}}  {{evaluateTemplateinfo.startend}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{evaluateTemplateinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{evaluateTemplateinfo.sureN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfo, unorpublishurl, evaluateTemplateinfo} from '@/module/admin/config/evaluateTemplateloopinfo'
export default {
  name: 'AJevaluateTemplatelooppublish',
  data () {
    return {
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      id: '',
      evaluateTemplateinfo: evaluateTemplateinfo,
      name: ''
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: unorpublishurl,
        data: {
          modelId: that.id,
          isPublish: 1
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
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
      this.win(types.back, this.cancel, false)
    } else {
      this.id = obj.id
      this.name = obj.evaluateTemplateName
    }
  }
}
</script>

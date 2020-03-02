<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{evaluateTemplateinfo.msgeditN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{evaluateTemplateinfo.evaluateTemplateNameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="evaluateTemplateName"/>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{evaluateTemplateinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{evaluateTemplateinfo.saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfo, editloopurl, warntxt, evaluateTemplateinfo} from '@/module/admin/config/evaluateTemplateloopinfo'
export default {
  name: 'AJevaluateTemplateloopedit',
  data () {
    return {
      wininfo: {
        widhei: ['500px', '270px'],
        btncancelleft: '345px',
        contenthei: '153px'
      },
      evaluateTemplateinfo: evaluateTemplateinfo,
      evaluateTemplateName: '',
      id: ''
    }
  },
  methods: {
    valid () {
      if (this.evaluateTemplateName.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.evaluateTemplateName, '', false)
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
        url: editloopurl,
        data: {
          modelName: that.evaluateTemplateName,
          modelId: that.id
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
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
      this.win(types.back, this.cancelfn, false)
    } else {
      this.evaluateTemplateName = obj.evaluateTemplateName
      this.id = obj.id
    }
  }
}
</script>

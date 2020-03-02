<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{evaluationtempletsetinfo.delN}}{{name}}{{evaluationtempletsetinfo.rel}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{delN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {delurl, cancelN, delN, pathinfo, evaluationtempletsetinfo} from '@/module/admin/config/evaluationtemplatesetinfo'
export default {
  name: 'AJevaluateTemplatesettemplatedel',
  data () {
    return {
      msg: evaluationtempletsetinfo.delN,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      pathinfo: pathinfo,
      evaluationtempletsetinfo: evaluationtempletsetinfo,
      delN: delN,
      cancelN: cancelN,
      ind: 0,
      ids: '',
      name: '',
      evaluateTemplateId: '',
      templatename: ''
    }
  },
  created () {
    this.evaluateTemplateId = this.geturlparam('templateid', location.hash)
    this.templatename = decodeURIComponent(this.geturlparam('name', location.hash))
  },
  methods: {
    geturlparam (name, url) {
      let urls = url.split('?')[1].split('&')
      let val = ''
      for (let item = 0; item < urls.length; item++) {
        if (name === urls[item].split('=')[0]) {
          val = urls[item].split('=')[1]
          break
        }
      }
      return val
    },
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: delurl,
        params: {
          par: {
            evaluateDetailIds: [that.ids]
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, that.cancelfn, false)
        } else {
          that.$router.push({'name': that.pathinfo.prex + 'settemplate', query: {templateid: that.evaluateTemplateId, name: that.templatename}, params: {del: 'del'}})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({'name': this.pathinfo.prex + 'settemplate', query: {templateid: this.evaluateTemplateId, name: this.templatename}})
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
      this.ids = obj.id
      this.ind = this.$route.params.ind
      this.name = obj.name
    }
  }
}
</script>

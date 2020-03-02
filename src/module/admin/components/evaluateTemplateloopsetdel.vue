<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{evaluationtempletsetinfo.delitem}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{evaluationtempletsetinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{evaluationtempletsetinfo.suredelN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfo, evaluationtempletsetinfo} from '@/module/admin/config/evaluateTemplateloopsetinfo'
export default {
  name: 'AJevaluateTemplateloopsettemplatedel',
  data () {
    return {
      msg: evaluationtempletsetinfo.delitem,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      evaluationtempletsetinfo: evaluationtempletsetinfo,
      evaluateTemplateIds: '',
      templateid: '',
      item: ''
    }
  },
  created () {
    this.templateid = location.hash.split('?')[1].split('=')[1]
    this.evaluateinfo = this.$route.params.evaluateinfo
    this.item = this.$route.params.item
    if (!this.evaluateinfo) {
      this.win(types.back, this.cancelfn, false)
    }
  },
  methods: {
    geturlparam (name, url) {
      let urls = url.split('?')[1]
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
      this.$router.push({name: pathinfo.prex, params: {del: this.item}, query: {templateid: this.templateid}})
    },
    cancelfn () {
      this.$router.push({name: pathinfo.prex, query: {templateid: this.templateid}})
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
      this.evaluateTemplateIds = obj
    }
  }
}
</script>

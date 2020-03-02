<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{evaluationtempletsetinfo.scoleN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txtauto" style="min-width: 80px;">{{evaluationtempletsetinfo.titleN}}<i>*</i>：</span>
			 		<input type="text"  v-model="title" :placeholder="evaluationtempletsetinfo.placeholdertitle" style="width: 476px;"/>
			 	</div>
			 	<div class="formline" >
			 		<span class="txtauto" style="min-width: 80px;">{{evaluationtempletsetinfo.setscole}}<i>*</i>：</span>
			 		<input type="number"   min="0" :placeholder="evaluationtempletsetinfo.placeholderscole" v-model="scole" style="width: 476px;"/>
			 	</div>
			 	<div class="formline" >
			 		<span class="txtauto" style="min-width: 80px;">{{evaluationtempletsetinfo.setscoleval}}<i>*</i>：</span>
			 		<input type="number"  min="0" v-model="scoleval" :placeholder="evaluationtempletsetinfo.placeholderscole" style="width: 476px;"/>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{evaluationtempletsetinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{evaluationtempletsetinfo.saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfo, warntxt, evaluationtempletsetinfo} from '@/module/admin/config/evaluateTemplateloopsetinfo'
export default {
  name: 'AJevaluateTemplateloopScoleedit',
  data () {
    return {
      wininfo: {
        widhei: ['600px', '280px'],
        btncancelleft: '445px',
        contenthei: '183px'
      },
      evaluationtempletsetinfo: evaluationtempletsetinfo,
      title: '',
      templateid: '',
      scole: 0,
      num: 0,
      scoleval: 0,
      evaluateinfo: []
    }
  },
  created () {
    this.templateid = location.hash.split('?')[1].split('=')[1]
    this.evaluateinfo = this.$route.params.evaluateinfo
    if (!this.evaluateinfo) {
      this.win(types.back, this.cancelfn, false)
    } else {
      let obj = this.$route.params.item
      this.num = obj.num
      this.scole = obj.scole
      this.scoleval = obj.scoleval
      this.title = obj.title
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
    valid () {
      if (this.title.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.title, '', false)
        return false
      } else if (this.scole <= 0) {
        this.win(warntxt.scole, '', false)
        return false
      } else {
        return true
      }
    },
    savedata () {
      if (!this.valid()) {
        return false
      } else {
        let tempradioinfo = {}
        tempradioinfo.num = this.num
        tempradioinfo.type = 'scole'
        tempradioinfo.title = this.title
        tempradioinfo.display = true
        tempradioinfo.scole = this.scole
        tempradioinfo.scoleval = this.scoleval
        this.$router.push({name: pathinfo.prex, params: {num: this.num, radioinfo: tempradioinfo}, query: {templateid: this.templateid}})
      }
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
  }
}
</script>

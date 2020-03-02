<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{evaluationtempletsetinfo.countN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txtauto" style="min-width: 80px;">{{evaluationtempletsetinfo.titleN}}<i>*</i>：</span>
			 		<input type="text" :placeholder="evaluationtempletsetinfo.placeholdertitle" v-model="title" style="width: 476px;"/>
			 	</div>
			 	<div class="formline" >
			 		<span class="txtauto" style="min-width: 80px;">{{evaluationtempletsetinfo.setcount}}<i>*</i>：</span>
			 		<input type="text" :placeholder="evaluationtempletsetinfo.placeholdercount" v-model="count" style="width: 476px;"/>
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
  name: 'AJevaluateTemplateloopCountedit',
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
      count: '',
      countval: 0,
      numn: 0,
      evaluateinfo: []
    }
  },
  created () {
    this.templateid = location.hash.split('?')[1].split('=')[1]
    this.evaluateinfo = this.$route.params.evaluateinfo
    let obj = this.$route.params.item
    if (!this.evaluateinfo) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.count = obj.count
      this.countval = obj.countval
      this.title = obj.title
      this.num = obj.num
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
      } else if (this.count.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.count, '', false)
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
        tempradioinfo.type = 'count'
        tempradioinfo.title = this.title
        tempradioinfo.display = true
        tempradioinfo.count = this.count
        tempradioinfo.countval = this.countval
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

<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{evaluationtempletsetinfo.radioN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txtauto" style="min-width: 80px;">{{evaluationtempletsetinfo.titleN}}<i>*</i>：</span>
			 		<input type="text" :placeholder="evaluationtempletsetinfo.placeholdertitle" v-model="title" style="width: 476px;"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txtauto" style="min-width: 80px;">{{evaluationtempletsetinfo.selectNum}}<i>*</i>：</span>
			 		<div id='select7' ></div>
					<select id="select8"></select>
			 	</div>
			 	<div class="formline" v-for="item in selectval">
			 		<span class="txtauto" style="min-width: 80px;">{{evaluationtempletsetinfo.selectitem}}{{item}}<i>*</i>：</span>
			 		<input type="text" :placeholder="evaluationtempletsetinfo.placeholderselect" v-model="radioval[item - 1]" style="width: 476px;"/>
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
import {pathinfo, selectinfo, warntxt, evaluationtempletsetinfo} from '@/module/admin/config/evaluateTemplateloopsetinfo'
export default {
  name: 'AJevaluateTemplateloopRadioedit',
  data () {
    return {
      wininfo: {
        widhei: ['600px', '380px'],
        btncancelleft: '445px',
        contenthei: '283px'
      },
      evaluationtempletsetinfo: evaluationtempletsetinfo,
      title: '',
      templateid: '',
      selectval: 2,
      num: 0,
      radioval: ['', ''],
      evaluateinfo: []
    }
  },
  created () {
    this.templateid = location.hash.split('?')[1].split('=')[1]
    this.evaluateinfo = this.$route.params.evaluateinfo
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
      } else {
        let j = 0
        for (let item = 0; item < this.selectval; item++) {
          if (this.radioval[item].toString().replace(/\s/gi, '') === '') {
            if (!j) {
              this.win(warntxt.write + ' ' + evaluationtempletsetinfo.selectitem + (item + 1).toString() + ' ' + warntxt.writecontent, '', false)
            }
            j++
          }
          if (item === this.selectval - 1) {
            if (j) {
              return false
            } else {
              return true
            }
          }
        }
      }
    },
    savedata () {
      if (!this.valid()) {
        return false
      } else {
        let tempradioinfo = {}
        tempradioinfo.num = this.num
        tempradioinfo.type = 'radio'
        tempradioinfo.aetype = 'edit'
        tempradioinfo.title = this.title
        tempradioinfo.display = true
        tempradioinfo.radioinfo = {}
        let valarr = []
        for (let item = 0; item < this.radioval.length; item++) {
          if (item < this.selectval) {
            valarr.push(this.radioval[item])
          } else {
            this.radioval.splice(item, 1)
          }
        }
        tempradioinfo.radioinfo.classname = 'radiofather radio' + tempradioinfo.num
        tempradioinfo.radioinfo.val = valarr
        tempradioinfo.radioinfo.title = this.radioval
        tempradioinfo.radioinfo.opt = {}
        tempradioinfo.radioinfo.opt.inputflag = true
        tempradioinfo.radioinfo.opt.init = {val: false, index: 0}
        tempradioinfo.radioinfo.opt.father = '.radio' + tempradioinfo.num + ' span'
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
    let that = this
    if (!this.evaluateinfo) {
      this.win(types.back, this.cancelfn, false)
    } else {
      let obj = this.$route.params.item
      this.title = obj.title
      this.num = obj.num
      this.selectval = obj.radioinfo.title.length
      this.matchval = obj.radioinfo.title.length
      let temp = []
      for (let item = 0; item < this.selectval; item++) {
        temp.push(obj.radioinfo.title[item])
      }
      this.radioval = temp
      this.$Select({
        'data': selectinfo,
        'originS': 'multiple',
        'selectId': ['select8', 'select7'],
        'callback': function (obj) {
          that.selectval = obj.value
        },
        'matchval': [{val: that.selectval}]
      })
    }
  }
}
</script>

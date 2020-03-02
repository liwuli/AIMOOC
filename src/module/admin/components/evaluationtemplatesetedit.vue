<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{evaluationtempletsetinfo.name}}<span class="red">*</span>：</span>
			 		<input type="text"  v-model="name"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{evaluationtempletsetinfo.scole}}<span class="red">*</span>：</span>
			 		<input type="number" min="0" v-model="scole"/>
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
import {warntxt, saveN, cancelN, evaluationtempletsetinfo, editurl, pathinfo} from '@/module/admin/config/evaluationtemplatesetinfo'
export default {
  name: 'AJevaluateTemplatesettemplateedit',
  data () {
    return {
      msg: evaluationtempletsetinfo.edittitle,
      evaluationtempletsetinfo: evaluationtempletsetinfo,
      add: 'add',
      wininfo: {
        widhei: ['500px', '270px'],
        btncancelleft: '345px',
        contenthei: '153px'
      },
      id: '',
      pathinfo: pathinfo,
      saveN: saveN,
      cancelN: cancelN,
      ind: 0,
      name: '',
      evaluateTemplateId: '',
      scole: '',
      templatename: '',
      totalscole: 0
    }
  },
  created () {
    this.evaluateTemplateId = this.geturlparam('templateid', location.hash)
    this.templatename = decodeURIComponent(this.geturlparam('name', location.hash))
    this.totalscole = parseInt(this.geturlparam('totalscole', location.hash))
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
    valid () {
      if (this.name.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.name, '', false)
        return false
      } else if (this.scole.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.scole, '', false)
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
        url: editurl,
        params: {
          par: {
            evaluateDetailName: that.name,
            evaluateDetailId: that.id,
            evaluateTemplateId: that.evaluateTemplateId,
            parentId: '0',
            totalPoints: that.scole
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
        } else {
          that.$router.push({'name': pathinfo.prex + 'settemplate', query: {templateid: that.evaluateTemplateId, name: that.templatename}, params: {name: that.name, scole: that.scole, ind: that.ind}})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({'name': pathinfo.prex + 'settemplate', query: {templateid: this.evaluateTemplateId, name: this.templatename}, params: {ind: this.ind}})
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
      this.name = obj.name
      this.scole = obj.scole
      this.id = obj.id
      this.ind = this.$route.params.ind
    }
  }
}
</script>

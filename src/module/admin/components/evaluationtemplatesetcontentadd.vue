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
			 		<span class="txt">{{evaluationtempletsetinfo.subname}}<span class="red">*</span>：</span>
			 		<textarea class="textarea" name=""  maxlength="30"  v-model="name" :placeholder="evaluationtempletsetinfo.contentdes" rows="" cols=""></textarea>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{evaluationtempletsetinfo.scole}}<span class="red">*</span>：</span>
			 		<input type="number" min="0" v-model="scole" :placeholder="evaluationtempletsetinfo.contentscole"/>
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
import {warntxt, saveN, cancelN, evaluationtempletsetinfo, pathinfo, addurl} from '@/module/admin/config/evaluationtemplatesetinfo'
export default {
  name: 'AJevaluateTemplatesettemplatecontentadd',
  data () {
    return {
      msg: evaluationtempletsetinfo.contenttitle,
      evaluationtempletsetinfo: evaluationtempletsetinfo,
      add: 'add',
      wininfo: {
        widhei: ['500px', '270px'],
        btncancelleft: '345px',
        contenthei: '153px'
      },
      parentidval: '',
      pathinfo: pathinfo,
      saveN: saveN,
      cancelN: cancelN,
      name: '',
      evaluateTemplateId: '',
      scole: '',
      nowscole: 0,
      subnowscole: 0
    }
  },
  created () {
    this.evaluateTemplateId = this.geturlparam('templateid', location.hash)
    this.templatename = decodeURIComponent(this.geturlparam('name', location.hash))
    this.nowscole = parseInt(this.geturlparam('nowscole', location.hash))
    this.subnowscole = parseInt(this.geturlparam('subnowscole', location.hash))
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
        this.win(warntxt.nameconent, '', false)
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
        url: addurl,
        params: {
          par: {
            evaluateDetailName: that.name,
            totalPoints: that.scole,
            evaluateTemplateId: that.evaluateTemplateId,
            parentId: that.parentidval
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
        } else {
          that.$router.push({'name': that.pathinfo.prex + 'settemplate', query: {name: that.templatename, templateid: that.evaluateTemplateId}, params: {id: that.parentidval, nowscole: res.data.total}})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({'name': this.pathinfo.prex + 'settemplate', query: {name: this.templatename, templateid: this.evaluateTemplateId}})
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
    console.log(this.$route.params, 'this.$route.params')
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.parentidval = obj.id
    }
  }
}
</script>

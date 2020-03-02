<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{discusspartinfo.btn}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'width: 440px;height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<textarea name="" maxlength="100" class="appraisetextarea" :placeholder="discusspartinfo.something" rows="" cols="" :value="textareaval" v-model="textareaval"></textarea>
			 		<div class="num">{{textareaval.length}}/100</div>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{discusspartinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{discusspartinfo.saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {adddiscussurl, pathinfodetail, discusspartinfo} from '@/module/home/config/courseinfo'
export default {
  name: 'Fcoursedetailappraiseadd',
  data () {
    return {
      wininfo: {
        widhei: ['460px', '230px'],
        btncancelleft: '145px',
        contenthei: '113px'
      },
      textareaval: '',
      ids: '',
      discusspartinfo: discusspartinfo
    }
  },
  methods: {
    valid () {
      if (this.textareaval.toString().replace(/\s/gi, '') === '') {
        this.win(discusspartinfo.nothing, '', false)
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
        url: adddiscussurl,
        data: {
          forumId: 'discuss',
          resourceId: that.geturlparam('resourceid', location.hash),
          name: that.name,
          content: that.textareaval
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          that.cancelfn()
        } else {
          that.win(res.data.message, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
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
    cancelfn () {
      this.$router.push({name: pathinfodetail.prex, params: {recall: 'getdiscuss'}, query: {courseId: this.geturlparam('courseId', location.hash), lessonId: this.geturlparam('lessonId', location.hash), resourceid: this.geturlparam('resourceid', location.hash)}})
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
  }
}
</script>

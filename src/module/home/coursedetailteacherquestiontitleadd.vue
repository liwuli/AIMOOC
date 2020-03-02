<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{questioninfo.btn1}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'width: 560px;height:' + wininfo.contenthei">
 				<div class="formline">
			 		<span class="txt">{{questioninfo.nameN}}<span class="red">*</span>：</span>
			 		<input type="text"  v-model="name" :value="name"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{questioninfo.contentN}}<span class="red">*</span>：</span>
			 		<textarea name="" maxlength="100" style="width: 440px;" class="appraisetextarea" :placeholder="questioninfo.something" rows="" cols="" :value="textareaval" v-model="textareaval"></textarea>
			 		<div class="num" style="right: 20px;">{{textareaval.length}}/100</div>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{questioninfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{questioninfo.saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {addteacherquestionurl, pathinfodetail, questioninfo} from '@/module/home/config/courseinfo'
export default {
  name: 'Fcoursedetailappraiseadd1',
  data () {
    return {
      wininfo: {
        widhei: ['580px', '290px'],
        btncancelleft: '175px',
        contenthei: '163px'
      },
      textareaval: '',
      name: '',
      ids: '',
      questioninfo: questioninfo
    }
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
        this.win(questioninfo.name, '', false)
        return false
      } else if (this.textareaval.toString().replace(/\s/gi, '') === '') {
        this.win(questioninfo.nothing, '', false)
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
        url: addteacherquestionurl,
        data: {
          forumId: 'titles',
          resourceId: that.geturlparam('resourceid', location.hash),
          name: that.name,
          content: that.textareaval
        }
      })
      .then(function (res) {
        if (res.data.code !== '200') {
          that.cancelfn()
        } else {
          that.win(res.data.message, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: pathinfodetail.prex, params: {recall: 'getquestion'}, query: {courseId: this.geturlparam('courseId', location.hash), lessonId: this.geturlparam('lessonId', location.hash)}})
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
//  let obj = this.$route.params.item
//  if (!obj) {
//    this.win(types.back, this.cancelfn)
//  } else {
//    this.ids = obj
//  }
  }
}
</script>

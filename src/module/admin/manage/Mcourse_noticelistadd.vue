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
			 		<span class="txt">{{noticeaddnameN}}<span class="red">*</span>：</span>
			 		<input type="text"  v-model="name" />
			 	</div>
			 	<div class="formline" style="margin-top: 10px;">
			 		<span class="txt">{{noticeaddcontentN}}<span class="red">*</span>：</span>
			 		<editor :styles="styles" @editorcontent="editorcontent"></editor>
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
import editor from '@/components/extend/editor.vue'
import {warntxt, pathinfo, msgaddN, noticeaddcontentN, noticeaddnameN, noticeaddurl, saveN, cancelN} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManagenoticeadd',
  data () {
    return {
      msg: msgaddN,
      saveN: saveN,
      name: '',
      cancelN: cancelN,
      noticeaddnameN: noticeaddnameN,
      noticeaddcontentN: noticeaddcontentN,
      styles: 'width: 450px;float: left;height: 200px;',
      wininfo: {
        widhei: ['576px', '505px'],
        btncancelleft: '200px',
        contenthei: '378px'
      },
      content: '',
      courseId: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
  },
  components: {
    editor
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
    editorcontent (content) {
      this.content = content.content
//    console.log(this.content, '-------------')
    },
    valid () {
      if (this.name.replace(/\s/gi, '') === '') {
        this.win(warntxt.noticename, '', false)
        return false
      } else if (this.content.replace(/\s/gi, '') === '' || this.content === '<p><br></p>') {
        this.win(warntxt.noticecontent, '', false)
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
        url: noticeaddurl,
        data: {
          courseId: that.courseId,
          content: that.content.replace(/<[^>]*>/g, ''),
          name: that.name
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: pathinfo.prex + 'notice', query: {courseId: this.courseId}})
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

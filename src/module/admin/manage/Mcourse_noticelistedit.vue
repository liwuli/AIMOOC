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
			 		<editor :initval="content" :styles="styles" @editorcontent="editorcontent"></editor>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="save" @click="savedata" :style="'margin-left:' + wininfo.btncancelleft">{{saveN}}</div>
 				<div class="cancel" @click="cancelfn">{{cancelN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import editor from '@/components/extend/editor.vue'
import {warntxt, pathinfo, msgeditN, noticeaddcontentN, noticeaddnameN, editcoursenoticeurl, saveN, cancelN} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJMcourseManagenoticeadd',
  data () {
    return {
      msg: msgeditN,
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
      contentval: false,
      editorobj: '',
      courseId: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
  },
  components: {
    editor
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      // 复制操作
      this.name = obj.title
      this.content = obj.content
      this.editorobj.txt.html(this.content)
      this.id = obj.id
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
    editorcontent (content) {
      this.editorobj = content.editing
      this.content = content.content
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
        url: editcoursenoticeurl,
        data: {
          courseId: that.courseId,
          content: that.content.replace(/<[^>]*>/g, ''),
          name: that.name,
          id: that.id
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.$Win({
            'title': types.title,
            'type': 'txt',
            'content': res.data.message,
            'timeout': types.Timeout3,
            'cancel': function (obj) {
              obj.remove(obj.getid)
            }
          })
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

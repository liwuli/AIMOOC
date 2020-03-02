<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{warntxt.suretopublish}}{{warntxt.res}}?
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{publishN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfo, warntxt, publishN, cancelN, publishresourceurl} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJMcourseManagechampterrespublish',
  data () {
    return {
      msg: warntxt.publishN,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      ids: '',
      cancelN: cancelN,
      publishN: publishN,
      warntxt: warntxt,
      lesson: '',
      courseId: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
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
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: publishresourceurl,
        params: {
          par: {
            resourceId: that.ids,
            isPublish: 1
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
        } else {
          that.$router.push({name: 'AJcourseManagechampter', params: {publishsub: 'sub', parentid: that.lesson}, query: {courseId: that.courseId}})
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: pathinfo.prex + 'champter', query: {courseId: this.courseId}})
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
      this.win(types.back, this.cancelfn)
    } else {
      this.ids = obj.id
      this.lesson = obj.lesson
    }
  }
}
</script>

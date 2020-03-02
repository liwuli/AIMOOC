<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div id="pdfsee" class="content" :style="'width:889px;height:' + wininfo.contenthei">
 				<!--<iframe frameborder="0" id="fileseeiframe" :urls="imgurl" scrolling="no" src="/static/pdf/web/viewer2.html" width="100%" height="500px"></iframe>-->
 			</div>
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
import {pathinfores, warntxt, reslistgetresurl} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManageresseepic',
  data () {
    return {
      msg: warntxt.see,
      wininfo: {
        widhei: ['909px', '561px'],
        btncancelleft: '735px',
        contenthei: '500px'
      },
      channelflag: false,
      infos: {},
      courseId: '',
      imgurl: ''
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
    cancelfn () {
      this.$router.push({name: pathinfores.prex, query: {courseId: this.courseId}, params: {noreset: 'noreset'}})
    },
    getressee () {
      let that = this
      this.axios({
        method: 'post',
        url: reslistgetresurl,
        params: {
          par: {
            resourceId: that.id
          }
        }
      })
      .then(function (res) {
//      console.log(res, 'res from mcoursereslistseepic')
        if (!res.data.isSuccess) {
          that.win(res.data.data, that.cancelfn, false)
          return false
        } else {
          let dom = document.createElement('iframe')
          dom.setAttribute('frameborder', 0)
          dom.setAttribute('scrolling', 'no')
          dom.setAttribute('src', '/static/pdf/web/viewer2.html')
          dom.setAttribute('width', '100%')
          dom.setAttribute('height', '500px')
          dom.setAttribute('urls', res.data.otherMap.otherFileUrl)
          dom.setAttribute('id', 'fileseeiframe')
          document.getElementById('pdfsee').appendChild(dom)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
    this.courseId = this.geturlparam('courseId', location.hash)
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.id
      this.getressee()
    }
  }
}
</script>

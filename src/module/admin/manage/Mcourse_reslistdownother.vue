<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline" style="height: auto;">
		 			<a :href="downurl" :title="title"  class="txt hides"  style="max-width: 200px;margin-right:10px;text-decoration: underline;">{{name}}</a>
			 	</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfores, warntxt, getdownotherfileurl} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManageresdownlistpic',
  data () {
    return {
      msg: warntxt.download,
      warntxt: warntxt,
      wininfo: {
        widhei: ['500px', '300px'],
        btncancelleft: '345px',
        contenthei: '183px'
      },
      id: '',
      downlist: [],
      title: [],
      courseId: '',
      name: '',
      downurl: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.id
      this.name = obj.name
      this.downurl = '/base/resource/resouceDownloadForPlat?resourceId=' + this.id
//    this.getressee()
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
    },
    getressee () {
      let that = this
      this.axios({
        method: 'post',
        url: getdownotherfileurl,
        params: {
          par: {
            resourceId: that.id
          }
        }
      })
      .then(function (res) {
//      console.log(res, 'res from downlist------------')
        if (!res.data.isSuccess) {
          that.win(res.data.data, that.cancelfn, false)
          return false
        } else {
          let objs = res.data
          that.title = objs.titleList
          that.downlist = objs.otherMap.otherFileUrl
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

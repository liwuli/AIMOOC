<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{mynoteinfo.content}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{mynoteinfo.cancel}}</div>
 				<div class="save" @click="savedata">{{mynoteinfo.del}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfodetail, delnoteurl, coursedetailwarntxt, mynoteinfo} from '@/module/home/config/courseinfo'
export default {
  name: 'Fcoursedetailmynotedel',
  data () {
    return {
      msg: mynoteinfo.title,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      ids: '',
      mynoteinfo: mynoteinfo
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: delnoteurl,
        params: {
          params: {
            id: that.ids
          }
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          that.$router.push({
            name: pathinfodetail.prex,
            params: {recall: 'getmynotelist'},
            query: {
              courseId: that.geturlparam('courseId', location.hash),
              lessonId: that.geturlparam('lessonId', location.hash)
            }
          })
        } else {
          that.win(coursedetailwarntxt.delmynotefail, '', false)
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
      this.$router.push({
        name: pathinfodetail.prex,
        query: {
          courseId: this.geturlparam('courseId', location.hash),
          lessonId: this.geturlparam('lessonId', location.hash)
        }
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
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn)
    } else {
      this.ids = obj.id
    }
  }
}
</script>

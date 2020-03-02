<template>
 	<div class="formwin">
 		<link rel="stylesheet" type="text/css" href="/static/cklive/css/indexvideo.css"/>
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
 				<div id="playerArealocal" ></div>
 			</div>
 			<!--<div id="V_fullScreen" title="点击或者f11进入全屏" class="fullscreen">全屏</div>-->
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
import {pathinfores, warntxt, reslistgetresurl} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManageressee',
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
      courseId: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.id
      this.getressee()
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
        if (!res.data.isSuccess) {
          that.win(res.data.data, that.cancelfn, false)
          return false
        } else {
          let objs = res.data
          objs.bq = objs.resList01
          objs.gq = objs.resList02
          objs.sq = objs.resList03
          that.infos['model'] = []
          if (objs.bq.length > 0) {
            that.infos['channelB'] = objs.bq
            that.infos['model'].push('标清')
            that.infos['channelnum'] = objs.bq.length
            that.infos['channeltitle'] = objs.titleList
          }
          if (objs.gq.length > 0) {
            that.infos['channel'] = objs.gq
            that.infos['model'].push('高清')
            that.infos['channelnum'] = objs.gq.length
            that.infos['channeltitle'] = objs.titleList
          }
          if (objs.sq.length > 0) {
            that.infos['channelS'] = objs.sq
            that.infos['model'].push('超清')
            that.infos['channelnum'] = objs.sq.length
            that.infos['channeltitle'] = objs.titleList
          }
          that.infos['knowledge'] = []
          that.infos['mainfile'] = [0, 0]
          that.infos['widhei'] = {wid: 889}
          that.infos['autoplay'] = true
          that.infos['id'] = 'playerArealocal'
          console.log(that.infos, 'that.infos')
          that.$Video(that.infos)
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
  }
}
</script>

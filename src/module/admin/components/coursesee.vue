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
 				<div id="playerArealocal" :channel="channel" :screens="screens" :info="info"></div>
 			</div>
 			<!--<div id="V_fullScreen" title="点击或者f11进入全屏" class="fullscreen">全屏</div>-->
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
// import '../../../../static/cklive/css/indexvideo.css'
import {warntxt, msgseeN} from '@/module/admin/config/courselessonlistinfo'
export default {
  name: 'AJcoursesee',
  data () {
    return {
      msg: msgseeN,
      wininfo: {
        widhei: ['909px', '561px'],
        btncancelleft: '735px',
        contenthei: '500px'
      },
      channelflag: false,
      infos: {}
    }
  },
  methods: {
    cancelfn () {
      this.$router.go(-1)
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
      this.win('当前节次录制资源已删除', this.cancelfn, false)
    } else {
      if (obj.urllist.length <= 0) {
        this.win(warntxt.nodata, this.cancelfn, false)
      } else {
        this.infos['channel'] = []
        this.infos['channelB'] = []
        this.infos['channelS'] = []
        this.infos['channeltitle'] = []
        this.infos['model'] = []
        for (let i = 0, h = 0, l = 0; i < obj.urllist.length; i++) {
          if (obj.urllist[i].highStreamUrl) {
            this.infos['channel'][h] = obj.urllist[i].highStreamUrl
            this.infos['channeltitle'][h] = obj.urllist[i].resourceName ? obj.urllist[i].resourceName : obj.urllist[i].resourceDescription
            h++
          }
          if (obj.urllist[i].lowStreamUrl) {
            this.infos['channelB'][l] = obj.urllist[i].lowStreamUrl
            this.infos['channeltitle'][l] = obj.urllist[i].resourceName ? obj.urllist[i].resourceName : obj.urllist[i].resourceDescription
            l++
          }
        }
        if (this.infos['channelB'].length > 0) {
          this.infos['model'].push('标清')
          this.infos['channelnum'] = this.infos['channelB'].length
        }
        if (this.infos['channel'].length > 0) {
          this.infos['model'].push('高清')
          this.infos['channelnum'] = this.infos['channel'].length
        }
        this.infos['knowledge'] = []
        this.infos['mainfile'] = [0, 0]
        this.infos['widhei'] = {wid: 889}
        this.infos['id'] = 'playerArealocal'
        this.infos['autoplay'] = true
        this.$Video(this.infos)
      }
    }
  }
}
</script>

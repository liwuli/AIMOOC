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
import {pathinfo, msgseeN} from '@/module/admin/config/toolinfo'
export default {
  name: 'AJtooltranscodedsee',
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
      this.$router.push({name: pathinfo.prex + 'seetranscoded'})
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
      this.win(types.back, this.cancelfn, false)
    } else {
      this.infos['channel'] = [obj.path]
      this.infos['channelB'] = []
      this.infos['channelS'] = []
      this.infos['channeltitle'] = [obj.name]
      this.infos['channelnum'] = 1
      this.infos['model'] = []
      this.infos['knowledge'] = []
      this.infos['mainfile'] = [0, 206]
      this.infos['autoplay'] = true
      this.infos['widhei'] = {wid: 889}
      this.infos['id'] = 'playerArealocal'
      this.$Video(this.infos)
    }
  }
}
</script>

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
import {pathinfo, livereviewurl, warntxt} from '@/module/admin/config/liveinfo'
export default {
  name: 'AJlivesee',
  data () {
    return {
      msg: warntxt.ressee,
      wininfo: {
        widhei: ['909px', '561px'],
        btncancelleft: '735px',
        contenthei: '500px'
      },
      channelflag: false,
      infos: {},
			liveFromWhere:null,
			lessonId:null
    }
  },
  created () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.id
			this.liveFromWhere = obj.liveFromWhere
			this.lessonId = obj.lessonId
      this.getressee()
    }
  },
  methods: {
    cancelfn () {
      this.$router.go(-1);
    },
    getressee () {
      let that = this
      this.axios({
        method: 'post',
        url: livereviewurl,
        params: {
          par: {
            liveId: that.id,
						liveFromWhere:that.liveFromWhere,
						lessonId:that.lessonId
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
            that.infos['model'][that.infos['model'].length] = ['标清']
            that.infos['channelnum'] = objs.bq.length
            that.infos['channeltitle'] = objs.titleList
            that.infos['knowledge'] = []
            that.infos['mainfile'] = [0, 0]
          }
          if (objs.gq.length > 0) {
            that.infos['channel'] = objs.gq
            that.infos['model'][that.infos['model'].length] = ['高清']
            that.infos['channelnum'] = objs.gq.length
            that.infos['channeltitle'] = objs.titleList
            that.infos['knowledge'] = []
            that.infos['mainfile'] = [0, 0]
          }
          if (objs.sq.length > 0) {
            that.infos['channelS'] = objs.sq
            that.infos['model'][that.infos['model'].length] = ['超清']
            that.infos['channelnum'] = objs.sq.length
            that.infos['channeltitle'] = objs.titleList
            that.infos['knowledge'] = []
            that.infos['mainfile'] = [0, 0]
          }
          that.infos['widhei'] = {wid: 889}
          that.infos['id'] = 'playerArealocal'
          that.infos['autoplay'] = true
					var video = [
					['01.mp4', 'video/mp4', '中文标清', 0],
					['02.mp4', 'video/mp4', '中文高清', 0]
				]
				
				that.infos['video']=video;
					debugger
        }
				 that.$Video(that.infos)
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

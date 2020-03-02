<template>
 	<div class="formwin">
 		<link rel="stylesheet" type="text/css" href="/static/cklive/css/indexvideo.css"/>
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :playflag="playflag" :style="'position:relative;height:' + wininfo.contenthei">
			 	<div id="playerArealocal" :channel="channel" :screens="screens" :info="info" style="position: relative;"></div>
 			</div>
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
import {warntxt, playurl, pathinfo} from '@/module/admin/config/resourceinfo'
export default {
  name: 'AJresourcepower',
  data () {
    return {
      msg: warntxt.msgplayN,
      wininfo: {
        widhei: ['909px', '561px'],
        btncancelleft: '735px',
        contenthei: '500px'
      },
      id: '',
      playflag: false,
      infos: {}
    }
  },
  methods: {
    cancelfn () {
      this.$router.go(-1);
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
    getplayurl () {
      let that = this
      this.axios({
        method: 'post',
        url: playurl,
        params: {
          params: {
            groupId: that.id
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.data, '', false)
        } else {
          that.infos = {}
          that.infos.id = 'playerArealocal'
          that.infos.channeltitle = []
          that.infos.model = []
          that.infos.mainfile = [0, 0]
          that.infos.channel = []
          that.infos.channelB = []
          that.infos.channelS = []
          that.infos.widhei = {}
          that.infos['autoplay'] = true
          that.infos.widhei.wid = 889
          that.infos.knowledge = []
          let objs = res.data.result
          for (let m = 0; m < objs.mainPathList.length; m++) {
            that.infos.channeltitle[m] = objs.mainPathList[m].name
            that.infos.channel[m] = objs.mainPathList[m].location
//          that.infos.channel[m] = 'http://img.ksbbs.com/asset/Mon_1605/25d705200a4eab4.mp4'
          }
          for (let m = 0; m < objs.subPathList.length; m++) {
            that.infos.channeltitle[m] = objs.subPathList[m].name
            that.infos.channelB[m] = objs.subPathList[m].location
//          that.infos.channelB[m] = 'http://img.ksbbs.com/asset/Mon_1605/25d705200a4eab4.mp4'
          }
          if (objs.mainPathList.length > 0 && objs.subPathList.length <= 0) {
            that.infos.model[0] = '高清'
            that.infos.channelnum = objs.mainPathList.length
          }
          if (objs.mainPathList.length <= 0 && objs.subPathList.length > 0) {
            that.infos.model[0] = '标清'
            that.infos.channelnum = objs.subPathList.length
          }
          if (objs.subPathList.length > 0 && objs.mainPathList.length > 0) {
            that.infos.model[0] = '标清'
            that.infos.model[1] = '高清'
            if (!that.infos.channelnum) {
              that.infos.channelnum = objs.subPathList.length || objs.subPathList.length
            }
          }
          if (that.infos.channeltitle.length <= 0) {
            that.win(warntxt.nodata, that.cancelfn, false)
          } else {
            that.$Video(that.infos)
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.groupId
      this.getplayurl()
    }
  }
}

</script>


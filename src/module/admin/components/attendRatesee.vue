<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div id="V_fullScreen" title="点击或者f11进入全屏" style="display: none;" class="fullscreen  iconfont icon-a"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
 				<div id="playerAreasee" :channel="channel" :screens="screens" :info="info"></div>
 			</div>
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
import '../../../../static/cklive/css/index.css'
// import '../../../../static/cklive/src/ckplayer/ckplayer.js'
import {pathinfo, basicinfo} from '@/module/admin/config/attendRateinfo'
export default {
  name: 'AJattendRatesee',
  data () {
    return {
      msg: basicinfo.msgseeN,
      wininfo: {
        widhei: ['909px', '601px'],
        btncancelleft: '735px',
        contenthei: '540px'
      },
      channelflag: false,
      infos: {},
      jsload: false
    }
  },
  created () {
    let _this = this
    let ckplay = document.createElement('script')
    ckplay.setAttribute('src', '/static/cklive/src/ckplayer/ckplayer.js')
    ckplay.setAttribute('id', 'ckscript')
    if (!document.getElementById('ckscript')) {
      document.body.appendChild(ckplay)
      ckplay.onload = function () {
        _this.jsload = true
      }
    } else {
      this.jsload = true
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
    }
  },
  mounted () {
    let that = this
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      if (obj.length === 0) {
        this.win(types.nodata, this.cancelfn, false)
      } else {
        this.infos['channel'] = []
        this.infos['title'] = []
        this.infos['channel'].push(obj.rtmpUrl)
        this.infos['title'].push(obj.title)
        if (this.jsload) {
          this.$CFCMXK({
            id: 'playerAreasee',
            channelnum: 1, // 分屏模式
            channelB: that.infos['channel'],
            channeltitle: that.infos['title'],
            channelflag: false,
            widhei: {
              wid: 889
            }
          })
        } else { //jsload未加载，等待加载
          let clear = null
          clear = setInterval(function () {
            console.log(that.jsload, 'this.jsload')
            that.$CFCMXK({
              id: 'playerAreasee',
              channelnum: 1, // 分屏模式
              channelB: that.infos['channel'],
              channeltitle: that.infos['title'],
              channelflag: false,
              widhei: {
                wid: 889
              }
            })
            clearInterval(clear)
          }, 100)
        }
      }
    }
  }
}
</script>

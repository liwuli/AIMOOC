<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{basicinfo.contentN}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata" style="padding: 0 10px;">{{basicinfo.delN}}</div>
 			</div>
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
import {stopliveurl, basicinfo, pathinfo, stopurl} from '@/module/admin/config/controloperationinfo'
export default {
  name: 'AJcontroloperationedit',
  data () {
    return {
      msg: basicinfo.msgdelN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '125px',
        contenthei: '153px'
      },
      ids: ''
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: stopurl,
        data: {
          classroomId: that.ids,
          classroomType: 'centralized'
        }
      })
      .then(function (res) {
		  debugger
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
          setTimeout(function () {
            that.cancelfn()
          }, 1200)
        } else {
          that.stoplive()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    stoplive () {
      let that = this
      this.axios({
        method: 'post',
        url: stopliveurl,
        data: {
          classroomId: that.ids
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
          setTimeout(function () {
            that.cancelfn()
          }, 1200)
        } else {
          if (res.data.liveId) {
            // that.$socket.emit('stoplive', {'userid': that.$store.state.userinfo.id, 'liveid': res.data.liveId})
            setTimeout(function () {
              that.cancelfn()
            }, 100)
          } else {
            that.cancelfn()
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
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
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.ids = obj.id
    }
  }
}
</script>

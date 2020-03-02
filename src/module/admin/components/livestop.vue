<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{basicinfo.stopcontentN}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{basicinfo.sureN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {basicinfo, pathinfo, stopurl} from '@/module/admin/config/liveinfo'
export default {
  name: 'AJlivestop',
  data () {
    return {
      msg: basicinfo.msgstopN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      liveId: ''
    }
  },
  methods: {
    savedata () {

      let that = this
      this.axios({
        method: 'post',
        url: stopurl,
        data: {
          liveId: that.liveId
        }
      })
      .then(function (res) {
				debugger
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
        } else {
					//不知道这个是干嘛的 注释了
          // that.$socket.emit('stoplive', {'userid': that.$store.state.userinfo.id, 'liveid': that.liveId})
					that.cancelfn()
					// setTimeout(function () {
     //       
     //      }, 500)
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
      this.win(types.back, this.cancel, false)
    } else {
      this.liveId = obj.id
    }
  }
}
</script>

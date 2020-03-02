<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{warntxt.uretodelcollect}}{{warntxt.question}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{delN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {faviratedelurl, warntxt, cancelN, delN} from '@/module/admin/usercenter/config/usercenterinfo'
export default {
  name: 'AJusercentercollect',
  data () {
    return {
      msg: delN,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      subjectIds: '',
      warntxt: warntxt,
      delN: delN,
      cancelN: cancelN
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: faviratedelurl,
        params: {
          par: {
            resourceId: that.item.id
          }
        }
      })
      .then(function (res) {
        if (res.data.isSuccess) {
          that.win(warntxt.delfaviratesucess, that.cancelfn, false)
        } else {
          that.win(warntxt.delfaviratefail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: 'AJusercentercollect', params: {showlive: true}})
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
      this.win(types.back, this.cancel)
    } else {
      this.item = obj
    }
  }
}
</script>

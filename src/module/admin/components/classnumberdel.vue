<template>
 	<div class="formwin" >
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{contentN}}
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
import {pathinfo, delurl, contentN, msgtemplatedelN, delN, cancelN} from '@/module/admin/config/classnumberinfo'
export default {
  name: 'AJclassnumberdel',
  data () {
    return {
      msg: msgtemplatedelN,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      ids: '',
      contentN: contentN,
      delN: delN,
      cancelN: cancelN
    }
  },
  methods: {
    valid () {
    },
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: delurl,
        data: {
          templateIdList: that.ids
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
        } else {
          that.cancelfn()
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
    let item = this.$route.params.item
    if (item.length <= 0) {
      this.win(types.back, this.cancelfn)
    } else {
      this.ids = this.$route.params.item
    }
  }
}
</script>

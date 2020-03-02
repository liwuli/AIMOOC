<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.hint}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{basicinfo.contentN}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{basicinfo.delN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {basicinfo, delUnMatchImageUrl} from '@/module/admin/config/userinfo'
export default {
  name: 'AJusermatchdel',
  data () {
    return {
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      basicinfo: basicinfo,
      iconId: ''
    }
  },
  methods: {
    init () {
      let obj = this.$route.params.item
      if (!obj) {
        this.win(types.back, this.cancel, false)
      } else {
        this.iconId = obj.iconId
      }
    },
    async savedata () {
      try {
        const res = await this.axios.post(delUnMatchImageUrl, {iconId: this.iconId})
        if (res.data.isSuccess) {
          this.win(res.data.content, this.cancelfn, false)
        } else {
          this.win(res.data.content, false, false)
        }
      } catch (err) {
        console.log(err)
      }
    },
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
  created () {
    this.init()
  }
}
</script>

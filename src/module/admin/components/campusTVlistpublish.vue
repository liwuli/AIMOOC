<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{schoolradioinfo.publish}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{schoolradioinfo.publishcontent}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{schoolradioinfo.cancel}}</div>
 				<div class="save" @click="savedata">{{schoolradioinfo.sure}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {programpathinfo, programocurl, schoolradioinfo} from '@/module/admin/config/campusTVlistinfo'
export default {
  name: 'AJcampusTVlistpublish',
  data () {
    return {
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      ids: '',
      schoolradioinfo: schoolradioinfo
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: programocurl,
        params: {
          par: {
            tvProgramId: that.ids,
            isOpen: 1
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.message, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: programpathinfo.prex})
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

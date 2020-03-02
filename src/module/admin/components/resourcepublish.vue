<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{warntxt.publishN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{msg}}?
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{sureN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfo, cancelN, sureN, warntxt, publishresourceurl} from '@/module/admin/config/resourceinfo'
export default {
  name: 'AJresourcepublish',
  data () {
    return {
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      resourceId: '',
      sureN: sureN,
      cancelN: cancelN,
      warntxt: warntxt,
      courseId: '',
      publish: ''
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: publishresourceurl,
        params: {
          par: {
            resourceId: that.resourceId,
            isPublish: that.isPublish
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
  computed: {
    isPublish: function () {
      if (this.publish === '未发布') {
        return 1
      } else {
        return 0
      }
    },
    msg: function () {
      if (this.publish === '未发布') {
        return warntxt.suretopublish
      } else {
        return warntxt.suretocancelpublish
      }
    }
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn)
    } else {
      this.resourceId = obj.id
      this.publish = obj.isPublish
    }
  }
}
</script>

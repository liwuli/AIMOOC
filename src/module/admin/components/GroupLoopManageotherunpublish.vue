<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{loopclassgroupinfo.unpublish}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{loopclassgroupinfo.unpublishcontent}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{loopclassgroupinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{loopclassgroupinfo.sureN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {loopclassgroupinfo, setmemeberurl, relotherpathinfo} from '@/module/admin/config/GroupLoopManageinfo'
export default {
  name: 'AJGroupLoopManagerelotherunpublish',
  data () {
    return {
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      ids: '',
      loopclassgroupinfo: loopclassgroupinfo,
      loopClassGroupId: '',
      grouptype: ''
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: setmemeberurl,
        data: {
          loopClassGroupId: that.loopClassGroupId,
          userId: that.ids,
          isHeader: 0
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
      this.$router.push({name: relotherpathinfo.prex, query: {ClassGroupId: this.loopClassGroupId, groupType: this.grouptype}})
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
      this.loopClassGroupId = obj.loopClassGroupId
      this.grouptype = obj.typeval
    }
  }
}
</script>

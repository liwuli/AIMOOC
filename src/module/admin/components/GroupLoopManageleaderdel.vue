<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{loopclassgroupinfo.contentassistant}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{loopclassgroupinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{loopclassgroupinfo.delN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {loopclassgroupinfo, delmemberurl, relleaderpathinfo} from '@/module/admin/config/GroupLoopManageinfo'
export default {
  name: 'AJGroupLoopManagerelleaderdel',
  data () {
    return {
      msg: loopclassgroupinfo.deluser,
      loopclassgroupinfo: loopclassgroupinfo,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      ids: '',
      loopClassGroupId: '',
      grouptype: ''
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: delmemberurl,
        data: {
          loopClassGroupId: that.loopClassGroupId,
          userId: that.ids
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
      this.$router.push({name: relleaderpathinfo.prex, query: {ClassGroupId: this.loopClassGroupId, groupType: this.grouptype}})
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

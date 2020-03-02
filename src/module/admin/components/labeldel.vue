<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{evaluationtempletsetinfo.delN}}{{groupName}}{{evaluationtempletsetinfo.rel}}
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
import {basicinfo, pathinfo, delurl, evaluationtempletsetinfo} from '@/module/admin/config/labelinfo'
export default {
  name: 'AJlabeldel',
  data () {
    return {
      msg: evaluationtempletsetinfo.delN,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      evaluationtempletsetinfo: evaluationtempletsetinfo,
      basicinfo: basicinfo,
      ids: '',
      groupName: ''
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: delurl,
        params: {
          params: {
            labelGroupId: that.ids
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.data, '', false)
        } else {
          that.$router.push({name: 'AJlabel', params: {labeldel: 'del'}})
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
      this.ids = obj.id
      this.groupName = obj.name
    }
  }
}
</script>

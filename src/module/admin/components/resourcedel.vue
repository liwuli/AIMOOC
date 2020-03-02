<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{delect_item.isPublish == '未发布' ? basicinfo.contentN :'此操作将永久删除该文件,将一并删除发布的章节'}}
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
import {basicinfo, pathinfo, delurl} from '@/module/admin/config/resourceinfo'
export default {
  name: 'AJresourcedel',
  data () {
    return {
      msg: basicinfo.msgdelN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      ids: '',
	  delect_item:{}
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: delurl,
        data: {
          params: {
            resourceIds: that.ids
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
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
    let obj = this.$route.params.item
	this.delect_item = this.$route.params.itself || {}
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.ids = obj
    }
  }
}
</script>

<template>
 	<div class="formwin">
		<!-- 发布资源 -->
 		<div v-if="item.isPublish==0" class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	{{basicinfo.releaseN}}
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{basicinfo.publishN}}</div>
 			</div>
 		</div>
		<!-- 取消发布 -->
		<div v-if="item.isPublish==1" class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
			<div class="title">
				<span class="menuname">取消发布</span>
				<span class="filename"></span>
			</div>
			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
			<div class="content" :style="'height:' + wininfo.contenthei">
				确定要取消发布吗？
			</div>
			<div class="btnline">
				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
				<div class="save" @click="savedata">取消发布</div>
			</div>
		</div>
		
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {basicinfo, pathinfo, releaseurl} from '@/module/admin/config/liveinfo'
export default {
  name: 'AJlivedel',
  data () {
    return {
      msg: basicinfo.publishN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['300px', '270px'],
        btncancelleft: '145px',
        contenthei: '153px'
      },
      liveId: '',
			item:null
    }
  },
  methods: {
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: releaseurl,
        params: {
          par: {
            liveId: that.liveId,
						isPublish:that.item.isPublish==1 ? 0 : 1
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
		let item = this.$route.params.list
    if (!obj) {
      this.win(types.back, this.cancel)
    } else {
      this.liveId = obj[0]
			this.item = item;
    }
  }
}
</script>

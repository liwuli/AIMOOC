<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{channelinfo.channeledit}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{channelinfo.channelname}}<i>*</i>：</span>
			 		<input type="text"  v-model="name" :value="name"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{channelinfo.channeldes}}<i>*</i>：</span>
			 		<textarea class="textarea" v-model="des" :value="des"></textarea>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{channelinfo.cancel}}</div>
 				<div class="save" @click="savedata">{{channelinfo.sure}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {channellistediturl, pathinfo, channelinfo, channelwarntxt} from '@/module/admin/config/campusTVchannelinfo'
export default {
  name: 'AJcampusTVchanneladd',
  data () {
    return {
      wininfo: {
        widhei: ['500px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      channelinfo: channelinfo,
      id: '',
      name: '',
      des: ''
    }
  },
  methods: {
    valid () {
      if (this.name.toString().replace(/\s/gi, '') === '') {
        this.win(channelwarntxt.channelname, '', false)
        return false
      } else {
        return true
      }
    },
    savedata () {
      if (this.valid()) {
        let that = this
        this.axios({
          method: 'post',
          url: channellistediturl,
          params: {
            par: {
              tvChannelId: that.id,
              tvChannelName: that.name,
              description: that.des
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
      }
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
    if (obj) {
      this.des = obj.des
      this.name = obj.name
      this.id = obj.id
    } else {
      this.win(types.back, '', false)
    }
  }
}
</script>

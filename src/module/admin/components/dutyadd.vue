<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.positionNameN}}<i>*</i>：</span>
			 		<input type="text"  v-model="positionName"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.descriptionN}}：</span>
			 		<textarea class="textarea" name="" v-model="description" rows="" cols=""></textarea>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{basicinfo.saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {basicinfo, warntxt, pathinfo, addurl} from '@/module/admin/config/dutyinfo'
export default {
  name: 'AJdutyadd',
  data () {
    return {
      msg: basicinfo.msgaddN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '320px'],
        btncancelleft: '345px',
        contenthei: '203px'
      },
      positionName: '',
      description: ''
    }
  },
  components: {
  },
  methods: {
    valid () {
      if (this.positionName.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.positionName, '', false)
        return false
      } else {
        return true
      }
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        params: {
          par: {
            postName: that.positionName,
            description: that.description
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
  }
}
</script>

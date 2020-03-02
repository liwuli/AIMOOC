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
			 		<span class="txt">{{basicinfo.channelnameN}}<i >*</i>：</span>
			 		<input type="text"  v-model="name" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.photoobjN}}：</span>
			 		<div id='select1'  style="margin-top: 3px;"></div>
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
import {basicinfo, warntxt, pathinfo, channeladd, photoobj} from '@/module/admin/config/controlrecordinfo'
export default {
  name: 'AJcontrolrecordaddchannel',
  data () {
    return {
      add: 'add',
      msg: basicinfo.msgaddchannelN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '300px'],
        btncancelleft: '345px',
        contenthei: '183px'
      },
      name: '',
      type: '',
      photoobj: photoobj,
      id: '',
      classroomId: ''
    }
  },
  methods: {
    valid () {
      if (this.name === '') {
        this.win(warntxt.channelname, '', false)
        return false
      } else if (this.type === '') {
        this.win(warntxt.channeltype, '', false)
        return false
      } else {
        return true
      }
    },
    radioevent (obj) {
      this.use = obj.val
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: channeladd,
        params: {
          params: {
            classroomId: that.classroomId,
            equipmentId: that.id,
            channelName: that.name,
            target: that.type
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message)
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
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      // 将已添加的通道从数组里删除
      // for (let item = 0; item < obj.channelarr.length; item++) {
      //   for (let sub = 0; sub < this.photoobj.length; sub++) {
      //     if (obj.channelarr[item] === this.photoobj[sub].value) {
      //       this.photoobj.splice(sub, 1)
      //       break
      //     }
      //   }
      // }
      this.id = obj.id
      this.classroomId = obj.classroomid
      let that = this
      this.$Select({
        'data': that.photoobj,
        'selectId': 'select1',
        'callback': function (obj) {
          that.type = obj.value
        },
        'cleartxt': '请选择'
      })
    }
  }
}
</script>

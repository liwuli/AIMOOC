<style type="text/css">
	.powerlist{
		float: left;
		color: #4e4e4e;
		min-height: 30px;
		line-height: 30px;
		width: 100%;
	}
	.powerlist .titles{
		background: #fff;
		border-bottom: 1px solid #4e4e4e;
		float: left;
		height: 30px;
		width: 100%;
	}
	.powerlist .checklist{
		float: left;
		min-height: 30px;
		padding: 0 10px 0 0;
		width: auto;
	}
	.check, .checked{
		width: auto;
	}
</style>
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
			 		<span class="txt">{{nameN}}：</span>
			 		<input type="text" disabled="disabled"  v-model="name" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{IPN}}：</span>
			 		<input type="text"  v-model="IP" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{useN}}：</span>
			 		<Radio :genderval="gender" :type="edit" @radioevent="radioevent" :radioinfo="radioinfo"></Radio>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import Radio from '@/components/extend/radio'
import {pathinfo, radioinfo, IPN, useN, nameN, editurl, msgeditN, saveN, cancelN} from '@/module/admin/config/dailyrecordinfo'
export default {
  name: 'AJdailyrecordedit',
  data () {
    return {
      msg: msgeditN,
      wininfo: {
        widhei: ['500px', '270px'],
        btncancelleft: '345px',
        contenthei: '153px'
      },
      edit: 'edit',
      name: '',
      IP: '',
      genderval: 0,
      gender: 0,
      radioinfo: radioinfo,
      nameN: nameN,
      useN: useN,
      IPN: IPN,
      saveN: saveN,
      cancelN: cancelN
    }
  },
  methods: {
    valid () {
    },
    radioevent (obj) {
      this.genderval = obj.val
    },
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        params: {
          'params': {
            classRoomId: that.id,
            deviceIp: that.IP,
            deviceName: that.name,
            isValid: that.genderval
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, that.cancelfn, false)
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
  components: {
    Radio
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.name = obj.name
      this.id = obj.id
      this.IP = obj.ip
      this.genderval = obj.use
      this.gender = obj.user
    }
  }
}
</script>

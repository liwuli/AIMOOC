<style type="text/css">
	.calendar{
		text-indent: -67px;
		overflow: hidden;
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
			 		<span class="txt">{{nameclassN}}<i>*</i>：</span>
			 		<input type="number" start="1"  min="0"  v-model="classnumber" value="1"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{sydateN}}<i>*</i>：</span>
			 		<Calendarme :clear="clear" :hmsshow="hmsshow" :valshow="valshow" :ymdhms="ymdhms" :dateval="sydate"  @startfn="startfn" :ids="start"></Calendarme>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{eydateN}}<i>*</i>：</span>
			 		<Calendarme  :clear="clear"  :hmsshow="hmsshow" :valshow="valshow"  :ymdhms="ymdhms" :dateval="eydate" @endfn="endfn" :ids="end"></Calendarme>
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
import Calendarme from '@/components/extend/calendar.vue'
import {warntxt, pathinfo, wintitle, adddetailurl, eydateN, msgaddN, nameclassN, sydateN, saveN, cancelN} from '@/module/admin/config/classnumberinfo'
export default {
  name: 'AJclassnumberadddetail',
  data () {
    return {
      msg: msgaddN,
      wininfo: {
        widhei: ['500px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      clear: false,
      hmsshow: true,
      valshow: true,
      classnumber: '',
      start: 'start',
      end: 'end',
      ymdhms: 'ymdhM',
      sydate: '',
      eydate: '',
      nameclassN: nameclassN,
      sydateN: sydateN,
      eydateN: eydateN,
      saveN: saveN,
      cancelN: cancelN,
      id: '',
      wintitle: wintitle
    }
  },
  created () {
    let obj = this.$route.params
    if (obj.length <= 0) {
      this.win(warntxt.nameNULL, '', false)
    } else {
      this.id = obj.info[0]
    }
  },
  components: {
    Calendarme
  },
  methods: {
    valid () {
      if (this.classnumber.replace(/\s/gi, '') === '') {
        this.win(warntxt.classnumber, '', false)
        return false
      } else if (this.sydate.replace(/\s/gi, '') === '') {
        this.win(warntxt.sydate, '', false)
        return false
      } else if (this.eydate.replace(/\s/gi, '') === '') {
        this.win(warntxt.eydate, '', false)
        return false
      } else {
        return true
      }
    },
    formcats (obj) {
      let objs = obj < 10 ? '0' + obj : obj
      return objs
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day) + ' ' + this.formcats(obj.hour) + ':' + this.formcats(obj.minutes)
    },
    startfn (obj) {
      this.sydate = this.formcat(obj)
    },
    endfn (obj) {
      this.eydate = this.formcat(obj)
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: adddetailurl,
        data: {
          startTime: that.sydate.split(' ')[1],
          endTime: that.eydate.split(' ')[1],
          templateId: that.id,
          classNo: that.classnumber
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

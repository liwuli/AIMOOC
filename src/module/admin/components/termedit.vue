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
			 		<span class="txt">{{basicinfo.syN}}<i>*</i>：</span>
			 		<input type="number"  min="0"  v-model="sy" :value="sy"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.eyN}}<i>*</i>：</span>
			 		<input type="number"  min="0"  v-model="ey"  :value="ey"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.termN}}<i>*</i>：</span>
			 		<input type="text"  v-model="term" :value="term"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.sydateN}}<i>*</i>：</span>
			 		<Calendar :valshow="valshow" :ymdhms="ymdhms"  :dateval="sydate" @startfn="startfn" :ids="start"></Calendar>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.eydateN}}<i>*</i>：</span>
			 		<Calendar :valshow="valshow" :ymdhms="ymdhms" :dateval="eydate" @endfn="endfn" :ids="end"></Calendar>
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
import Calendar from '@/components/extend/calendar.vue'
import {basicinfo, editurl, pathinfo, warntxt} from '@/module/admin/config/terminfo'
export default {
  name: 'AJtermedit',
  data () {
    return {
      msg: basicinfo.msgeditN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      valshow: true,
      id: '',
      term: '',
      sy: new Date().getFullYear(),
      ey: new Date().getFullYear(),
      sydate: '',
      eydate: '',
      start: 'start',
      end: 'end',
      ymdhms: 'ymd'
    }
  },
  components: {
    Calendar
  },
  methods: {
    valid () {
      if (this.sy.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.sy, '', false)
        return false
      } else if (this.ey.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.ey, '', false)
        return false
      } else if (this.term.replace(/\s/gi, '') === '') {
        this.win(warntxt.term, '', false)
        return false
      } else if (this.eydate.replace(/\s/gi, '') === '') {
        this.win(warntxt.eydate, '', false)
        return false
      } else if (this.sydate.replace(/\s/gi, '') === '') {
        this.win(warntxt.sydate, '', false)
        return false
      } else {
        return true
      }
    },
    formcat (obj) {
      return obj.year + '-' + (obj.month < 10 ? '0' + obj.month : obj.month) + '-' + (obj.day < 10 ? '0' + obj.day : obj.day)
    },
    startfn (obj) {
      this.sydate = this.formcat(obj)
    },
    endfn (obj) {
      this.eydate = this.formcat(obj)
    },
    savedata () {
      if (this.valid()) {
        let that = this
        this.axios({
          method: 'post',
          url: editurl,
          data: {
            lastPartName: that.term,
            fromYear: that.sy,
            toYear: that.ey,
            startTime: that.sydate,
            endTime: that.eydate,
            termId: that.id
          }
        })
        .then(function (res) {
          if (res.data.id === '0') {
            that.win(res.data.content, '', false)
          } else {
            that.$router.push({name: pathinfo.prex})
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
  },
  created () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn)
    } else {
      this.sy = obj.sy
      this.ey = obj.ey
      this.sydate = obj.sydate
      this.eydate = obj.eydate
      this.term = obj.lastPartName
      this.id = obj.id
    }
  }
}
</script>

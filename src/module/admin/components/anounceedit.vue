<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.msgeditN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.syN}}：</span>
			 		<input type="text"  v-model="sy" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.eyN}}：</span>
			 		<input type="text"  v-model="ey" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.termN}}：</span>
			 		<input type="text"  v-model="term" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.sydateN}}：</span>
			 		<Calendar :valshow="valshow" :ymdhms="ymdhms"  :dateval="sydate" @startfn="startfn" :ids="start"></Calendar>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.eydateN}}：</span>
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
import {basicinfo, pathinfo, editurl} from '@/module/admin/config/anounceinfo'
export default {
  name: 'AJannounceedit',
  data () {
    return {
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['500px', '370px'],
        btncancelleft: '345px',
        contenthei: '253px'
      },
      valshow: true,
      id: '',
      term: '',
      sy: '',
      ey: '',
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
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      //this.$router.push({name: pathinfo.prex})
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

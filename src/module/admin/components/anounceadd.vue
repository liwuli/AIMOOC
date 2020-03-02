<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.msgaddN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content"  id="imgM"  :style="'width:880px;height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.syN}}：</span>
			 		<input type="text"  v-model="sy"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.eyN}}：</span>
			 		<input type="text"  v-model="ey"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.termN}}：</span>
			 		<input type="text"  v-model="term" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.sydateN}}：</span>
			 		<Calendarme :valshow="valshow" :ymdhms="ymdhms" :dateval="sydate"  @startfn="startfn" :ids="start"></Calendarme>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.eydateN}}：</span>
			 		<Calendarme  :valshow="valshow"  :ymdhms="ymdhms" :dateval="eydate" @endfn="endfn" :ids="end"></Calendarme>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.eydateN}}：</span>
			 		<editor @editorcontent="editorcontent"></editor>
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
import Calendarme from '@/components/extend/calendar.vue'
import editor from '@/components/extend/editor.vue'
import {basicinfo, addurl, pathinfo} from '@/module/admin/config/anounceinfo'
export default {
  name: 'AJannounceadd',
  data () {
    return {
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['1000px', '740px'],
        btncancelleft: '345px',
        contenthei: '633px'
      },
      valshow: true,
      term: '',
      sy: '',
      ey: '',
      systart: 'systart',
      eyend: 'eyend',
      sydate: '',
      eydate: '',
      start: 'start',
      end: 'end',
      ymdhms: 'ymd',
      ymdhmsY: 'y',
      src: ''
    }
  },
  components: {
    Calendarme,
    editor
  },
  methods: {
    valid () {
    },
    editorcontent (content) {
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
    syfn (obj) {
      this.sy = this.formcat(obj)
    },
    eyfn (obj) {
      this.ey = this.formcat(obj)
    },
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        data: {
          lastPartName: that.term,
          fromYear: that.sy,
          toYear: that.ey,
          startTime: that.sydate,
          endTime: that.eydate
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
  }
}
</script>

<template>
 	<div class="formwin">
 		<transition name="fade">
      <router-view></router-view>
    </transition>
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{schoolradioinfo.programname}}<i>*</i>：</span>
			 		<input type="text"  v-model="name" maxlength="20"/>
			 		<span class="txt" style="width: auto;">{{name.length}}/20</span>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{schoolradioinfo.programtype}}<i>*</i>：</span>
			 		<Radio :type="edit" :genderval="genderval" @radioevent="radioevent" :radioinfo="editradioinfo"></Radio>
			 	</div>
			 	<div class="formline" v-show="!localflag">
			 		<span class="txt">{{schoolradioinfo.streamurl}}<i>*</i>：</span>
			 		<input type="text"  v-model="streamurl"/>
			 	</div>
			 	<div class="formline" v-show="!localflag">
			 		<span class="txt">{{schoolradioinfo.programrecord}}：</span>
			 		<Radio :type="edit" :genderval="genderrecordval"  @radioevent="addrecordradioevent" :radioinfo="editrecordradioinfo"></Radio>
			 	</div>
			 	<div class="formline"  style="display: none;">
					<span class="txt">{{schoolradioinfo.programfile}}<i>*</i>：</span> 
					<singlefile @fileevent='fileevent' :type='filetype'></singlefile>
					<span class="txt" style="color: #e2e2e2;font-size: 12px;width: 100%;text-indent: 100px;">{{schoolradioinfo.supporttype}}</span> 
				</div>
				<div class="formline">
					<span class="txt">{{schoolradioinfo.programtime}}：</span> 
					<Calendarme :hmsshow="hmsshow" :inputstyle="styles" :iconstyle="iconstyle" :iconclass="iconclass" :dateval="addstartval" :valshow="valshow" :part="part" :ymdhms="ymdhms"   @addstartfn="addstartfn" :ids="addstart"></Calendarme>
					<span class="to">{{schoolradioinfo.to}}</span>
					<Calendarme :hmsshow="hmsshow"  :inputstyle="styles" :iconstyle="iconstyle" :iconclass="iconclass" :dateval="addendval" :valshow="valshow" :part="part" :ymdhms="ymdhms"   @addendfn="addendfn" :ids="addend"></Calendarme>
				</div>
				<div class="formline"  v-show="localflag">
					<span class="txt red" style="font-size: 12px;width: 100%;">{{schoolradioinfo.warn}}</span> 
				</div>
				<div class="formline" :style="localflag ? '' : 'margin-top: 10px'">
					<span class="txt">{{schoolradioinfo.programpic}}：</span> 
					<div class="selectpic" @click="jumptouppic">{{schoolradioinfo.selectpic}}</div>
				</div>
				<div class="formline">
					<div class="img" style="margin-left: 100px;">
						<img :src="imgurl" v-if="imgurl"/>
					</div>
				</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{schoolradioinfo.cancel}}</div>
 				<div class="save" @click="savedata">{{schoolradioinfo.sure}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import Radio from '@/components/extend/radio'
import singlefile from '@/components/extend/singlefile'
import Calendarme from '@/components/extend/calendar.vue'
import {prgrameditstreamurl, editradioinfo1, filetype, warntxt, editrecordradioinfo, editradioinfo, schoolradioinfo, programpathinfo} from '@/module/admin/config/campusTVlistinfo'
export default {
  name: 'AJcampusTVlistedit',
  data () {
    return {
      msg: schoolradioinfo.edittitle,
      warntxt: warntxt,
      wininfo: {
        widhei: ['600px', '480px'],
        btncancelleft: '445px',
        contenthei: '363px'
      },
      iconstyle: 'position:absolute;right:6px; top:-7px;color:#3197fc',
      styles: 'width:150px;',
      iconclass: 'icon-time',
      localflag: false,
      valshow: true,
      ymdhms: 'ymdhMs',
      hmsshow: true,
      addstart: 'addstart',
      addstartval: '',
      addend: 'addend',
      addendval: '',
      part: document.body,
      pathinfo: programpathinfo,
      edit: 'edit',
      gender: 0,
      genderrecord: 0,
      genderval: 0,
      genderrecordval: 1,
      name: '',
      streamurl: '',
      files: '',
      schoolradioinfo: schoolradioinfo,
      editrecordradioinfo: editrecordradioinfo,
      filetype: filetype,
      programid: '',
      videourl: ''
    }
  },
  components: {
    Radio,
    singlefile,
    Calendarme
  },
  created () {
  },
  methods: {
    jumptouppic () {
      this.$router.push({name: 'AJcampusTVlisteditbasicupload'})
    },
    fileevent (obj) {
      this.files = obj.fileinfo
    },
    valid () {
      if (!this.localflag) {
        if (this.name.replace(/\s/gi, '') === '') {
          this.win(warntxt.name, '', false)
          return false
        } else if (this.streamurl.replace(/\s/gi, '') === '') {
          this.win(warntxt.streamurl, '', false)
          return false
        } else {
          return true
        }
      } else {
        if (this.name.replace(/\s/gi, '') === '') {
          this.win(warntxt.name, '', false)
          return false
        } else {
          return true
        }
      }
    },
    addrecordradioevent (obj) {
      this.genderrecord = obj.val
    },
    radioevent (obj) {
      if (obj.val === '1') {
        this.localflag = true
      } else {
        this.localflag = false
      }
      this.gender = obj.val
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      if (this.localflag) {
        // 视频文件
        this.videosavefn()
      } else {
        // 直播流
        this.livesavefn()
      }
    },
    videosavefn () {
      let that = this
//    if (obj.fileinfo.size > 300 * 1000) {
//      this.win(warntxt.tobig, '', false)
//      this.files = ''
//    } else {
//      let that = this
//      this.files = obj.fileinfo
//    }
      this.axios({
        method: 'post',
        url: prgrameditstreamurl,
        params: {
          par: {
            programType: 1,
            tvProgramName: that.name,
            tvChannelId: that.channelid,
            tvProgramId: that.programid,
            dayTime: that.addstartval.split(' ')[0],
            startTime: that.addstartval.split(' ')[1],
            endTime: that.addendval.split(' ')[1],
            videoUrl: that.videourl,
            thumbnailUrl: that.imgurl,
            isOpen: 0
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    livesavefn () {
      let that = this
      this.axios({
        method: 'post',
        url: prgrameditstreamurl,
        params: {
          par: {
            programType: 0,
            isRecord: that.genderrecord * 1,
            tvProgramName: that.name,
            tvProgramId: that.programid,
            tvChannelId: that.channelid,
            dayTime: that.addstartval.split(' ')[0],
            startTime: that.addstartval.split(' ')[1],
            endTime: that.addendval.split(' ')[1],
            liveUrl: that.streamurl,
            thumbnailUrl: that.imgurl,
            isOpen: 0
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
      this.$router.push({name: programpathinfo.prex})
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
    },
    addstartfn (obj) {
      this.addstartval = this.formcat(obj)
    },
    addendfn (obj) {
      this.addendval = this.formcat(obj)
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day) + ' ' + this.formcats(obj.hour) + ':' + this.formcats(obj.minutes) + ':' + this.formcats(obj.seconds)
    }
  },
  mounted () {
    let objs = this.$route.params.item
    if (!objs) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.channelid = objs.channelid
      if (objs.isRecord === null) {
        // 视频流
        this.editradioinfo = editradioinfo1
        this.genderval = 1
        this.gender = 1
        this.localflag = true
        this.videourl = objs.videoUrl
      } else {
        // 直播流
        this.localflag = false
        this.editradioinfo = editradioinfo
        this.genderrecord = objs.isRecord
        this.genderrecordval = objs.isRecord ? 1 : 0
        this.genderval = 0
        this.gender = 0
        this.streamurl = objs.liveUrl
      }
      this.name = objs.name
      this.programid = objs.id
      this.imgurl = objs.thumbnailUrl
      this.addstartval = objs.dateval + ' ' + objs.stime
      this.addendval = objs.dateval + ' ' + objs.etime
    }
  },
  destroyed () {
    document.body.removeChild(document.getElementById('addstart_calendar'))
    document.body.removeChild(document.getElementById('addend_calendar'))
  },
  watch: {
    '$route' (to, from) {
      if (to.name === programpathinfo.prex + 'edit') {
        if (to.params.allurl) {
          this.imgurl = to.params.allurl
        }
      }
    }
  }
}
</script>

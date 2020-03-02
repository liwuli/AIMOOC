<template>
 	<div class="formwin">
 		<transition name="fade">
      <router-view></router-view>
    </transition>
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<!-- 上传进度 -->
      <div v-show="progress_show" style="position: absolute; width: 100%;height: 100%;background-color: red;z-index: 999999;left: 0;top:0;text-align: center;background: rgba(0, 0, 0, 0.7);">
           <span style="float: left; font-size: 16px;color: #FFFFFF;width: 100%;margin-top: 35%;">上传进度</span>
           <el-progress :text-inside="true" :stroke-width="22" :percentage="upload_status" style="float: left;width: 60%;margin-left: 20%;padding-top: 20px;"></el-progress>
      </div>
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
			 		<Radio :type="add" @radioevent="radioevent" :radioinfo="addradioinfo"></Radio>
			 	</div>
			 	<div class="formline" v-show="!localflag">
			 		<span class="txt">{{schoolradioinfo.streamurl}}<i>*</i>：</span>
			 		<input type="text"  v-model="streamurl"/>
			 	</div>
			 	<div class="formline" v-show="!localflag">
			 		<span class="txt">{{schoolradioinfo.programrecord}}：</span>
			 		<Radio :type="add" @radioevent="addrecordradioevent" :radioinfo="addrecordradioinfo"></Radio>
			 	</div>
			 	<div class="formline" v-show="localflag">
					<span class="txt">{{schoolradioinfo.programfile}}<i>*</i>：</span>
					<singlefile @fileevent='fileevent' :type='filetype'></singlefile>
					<span class="txt" style="color: #e2e2e2;font-size: 12px;width: 100%;text-indent: 100px;">{{schoolradioinfo.supporttype}}</span>
				</div>
				<div class="formline" style=" display: flex;align-items: center;">
					<span class="txt">{{schoolradioinfo.programtime}}：</span>
          <el-time-picker
            v-model="addstartval"
            value-format="HH:mm:ss"
            @change="startChange" :clearable="false"
            placeholder="任意时间点" style="margin-right: 10px;">
          </el-time-picker>
					<!-- <Calendarme :hmsshow="hmsshow"   :inputstyle="styles" :iconstyle="iconstyle" :iconclass="iconclass" :dateval="addstartval" :valshow="valshow" :part="part" :ymdhms="ymdhms"   @addstartfn="addstartfn" :ids="addstart"></Calendarme> -->
					<span class="to">{{schoolradioinfo.to}}</span>
          <el-time-picker
            v-model="addendval"
            value-format="HH:mm:ss"
            @change="endChange" :clearable="false"
            placeholder="任意时间点">
          </el-time-picker>
					<!-- <Calendarme :hmsshow="hmsshow"    :inputstyle="styles" :iconstyle="iconstyle" :iconclass="iconclass" :dateval="addendval" :valshow="valshow" :part="part" :ymdhms="ymdhms"   @addendfn="addendfn" :ids="addend"></Calendarme> -->
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
import {programaddstramurl, programaddurl, filetype, warntxt, addrecordradioinfo, addradioinfo, schoolradioinfo, programpathinfo} from '@/module/admin/config/campusTVlistinfo'
export default {
  name: 'AJcampusTVlistadd',
  data () {
    return {
      msg: schoolradioinfo.addtitle,
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
      addradioinfo: addradioinfo,
      add: 'add',
      gender: 0,
      genderrecord: 0,
      name: '',
      streamurl: '',
      files: '',
      schoolradioinfo: schoolradioinfo,
      addrecordradioinfo: addrecordradioinfo,
      filetype: filetype,
      channelid: '',
      datevel: '',
      upload_status:0,
      progress_show:false
    }
  },
  components: {
    Radio,
    singlefile,
    Calendarme
  },
  created () {
    this.channelid = this.geturlparam('channelid', location.hash)
    this.datevel = this.geturlparam('dateval', location.hash)
    /* eslint-disable no-new */
    let nowhms = new Date()
    let hms = (nowhms.getHours() < 10 ? ('0' + nowhms.getHours()) : nowhms.getHours()) + ':' + (nowhms.getMinutes() < 10 ? ('0' + nowhms.getMinutes()) : nowhms.getMinutes()) + ':' + (nowhms.getSeconds() < 10 ? ('0' + nowhms.getSeconds()) : nowhms.getSeconds())
    this.addstartval = this.datevel + ' ' + hms
    this.addendval = this.datevel + ' 23:59:59'
  },
  methods: {
    geturlparam (name, url) {
      let urls = url.split('?')[1].split('&')
      let val = ''
      for (let item = 0; item < urls.length; item++) {
        if (name === urls[item].split('=')[0]) {
          val = urls[item].split('=')[1]
          break
        }
      }
      return val
    },
    jumptouppic () {
      this.$router.push({name: 'AJcampusTVlistaddbasicupload'})
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
        } else if(this.addstartval == null){
          this.win('开始时间不能为空', '', false)
          return false
        }else if(this.addendval == null){
          this.win('结束时间不能为空', '', false)
          return false
        }else if(new Date(this.addstartval).getTime() >= new Date(this.addendval).getTime()){
          this.win('开始时间必须大于结束时间', '', false)
          return false
        }else {
          return true
        }

      } else {
        if (this.name.replace(/\s/gi, '') === '') {
          this.win(warntxt.name, '', false)
          return false
        } else if (this.files === '') {
          this.win(warntxt.files, '', false)
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
      that.progress_show=true;
      let formData = new FormData()
      formData.append('file', this.files)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.axios({
        method: 'post',
        url: programaddurl,
        data: formData,
        headers: config.headers,
        params: {
          par: {
            programType: 1,
            tvProgramName: that.name,
            tvChannelId: that.channelid,
            dayTime: that.addstartval.split(' ')[0],
            startTime: that.addstartval.split(' ')[1],
            endTime: that.addendval.split(' ')[1],
            thumbnailUrl: that.imgurl,
            isOpen: 0
          }
        },
        transformRequest: [function (data) {
          return data
        }],
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          that.upload_status=(complete-2)>0 ? complete-2:0;
        }
      })
      .then(function (res) {
         that.progress_show=false;
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
           that.upload_status=0
        } else {
          that.upload_status=100;
          that.cancelfn()
          that.upload_status=0
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
        url: programaddstramurl,
        params: {
          par: {
            programType: 0,
            isRecord: that.genderrecord * 1,
            tvProgramName: that.name,
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
    startChange (val) {
      this.addstartval = (val==null ? null : this.datevel + ' ' + this.addstartval)
    },
    endChange (val) {
      this.addendval = (val==null ? null : this.datevel + ' ' + this.addendval)
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
  mounted () {},
  destroyed () {
    document.body.removeChild(document.getElementById('addstart_calendar'))
    document.body.removeChild(document.getElementById('addend_calendar'))
  },
  watch: {
    '$route' (to, from) {
      if (to.name === programpathinfo.prex + 'add') {
        if (to.params.allurl) {
          this.imgurl = to.params.allurl
        }
      }
    }
  }
}
</script>
<style>
.el-time-panel {
  z-index: 9999999 !important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 210px !important;
}

</style>

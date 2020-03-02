<style type="text/css">
	.optdirection{
		float: left;
		height: 35px;
		margin: 10px 0;
		width: 100%;
	}
	#servercontrolsee .up ,#servercontrolsee .down ,#servercontrolsee .right ,#servercontrolsee .left ,#servercontrolsee .big ,#servercontrolsee .small {
		cursor: pointer;
		font-size: 24px;
		height: 30px;
		line-height: 30px;
		width: 30px;
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
 				<div class="G_search" style="position: relative;margin-bottom: 10px;">
 					<div class="part">
				 	  <span class="txt">{{basicinfo.channelN}}:</span>
				 	  <div id='select7' style="margin-top: 3px;"></div>
						<select id="select8"></select>
				 	</div>
				 	<img id="circle" style="float: right;" usemap="#planetmap" src="/static/images/systemcontrol.png"/>
				 	<map name="planetmap" id="planetmap">
						<!-- <area shape="polygon" @mousedown='sxzyevent("left")' @mouseup='sxzyevent("stop")' coords="0,0,30,30, 0, 45"   :title="directioninfo.leftN"/>
						<area shape="polygon" @mousedown='sxzyevent("up")'  @mouseup='sxzyevent("stop")' coords="0,0,30,30, 60, 0"   :title="directioninfo.upN"/>
						<area shape="polygon" @mousedown='sxzyevent("right")' @mouseup='sxzyevent("stop")' coords="60,0,30,30, 60, 60"   :title="directioninfo.rightN"/>
						<area shape="polygon" @mousedown='sxzyevent("down")' @mouseup='sxzyevent("stop")' coords="60,60,30,30, 0, 60"   :title="directioninfo.downN" />
						<area shape="rectangle" @mousedown='sxzyevent("forward")'　 @mouseup='sxzyevent("stop")' coords="69,0,89,20"   :title="directioninfo.bigN"/>
						<area shape="rectangle" @mousedown='sxzyevent("backward")'　 @mouseup='sxzyevent("stop")' coords="69,39,89,59"   :title="directioninfo.smallN"/> -->
						<area shape="polygon" @mousedown='sxzyevent("left")' @mouseup='sxzyevent("stop")' coords="0,0,25,30, 0, 40"  :title="directioninfo.leftN"/>
						<area shape="polygon" @mousedown='sxzyevent("origin")' coords="40,20,40,40, 0, 30"  :title="'恢复'"/>
						<area shape="polygon" @mousedown='sxzyevent("up")'  @mouseup='sxzyevent("stop")' coords="0,0,30,20, 60, 0"   :title="directioninfo.upN"/>
						<area shape="polygon" @mousedown='sxzyevent("right")' @mouseup='sxzyevent("stop")' coords="60,20,30,20, 60, 60"   :title="directioninfo.rightN"/>
						<area shape="polygon" @mousedown='sxzyevent("down")' @mouseup='sxzyevent("stop")' coords="60,60,30,30, 0, 60"   :title="directioninfo.downN" />
						<area shape="rectangle" @mousedown='sxzyevent("forward")'　 @mouseup='sxzyevent("stop")' coords="69,0,89,20"   :title="directioninfo.bigN"/>
						<area shape="rectangle" @mousedown='sxzyevent("backward")'　 @mouseup='sxzyevent("stop")' coords="69,39,89,59"   :title="directioninfo.smallN"/>
					</map>
 					<div class="part" style="margin-right: 0;display: none;" id="servercontrolsee">
				 	  <span class="txt"　style="margin-left: 10px;">{{basicinfo.optN}}:</span>
				 	  <span class="up iconfont icon-up" @mousedown='sxzyevent("up")'  @mouseup='sxzyevent("stop")'　:title="directioninfo.upN"></span>
				 	  <span class="right iconfont icon-up-right" @mousedown='sxzyevent("right")' @mouseup='sxzyevent("stop")'　　:title="directioninfo.rightN"></span>
				 	  <span class="down iconfont icon-up-down"　 @mousedown='sxzyevent("down")' @mouseup='sxzyevent("stop")'　:title="directioninfo.downN"></span>
				 	  <span class="left iconfont icon-up-left" @mousedown='sxzyevent("left")' @mouseup='sxzyevent("stop")'　　:title="directioninfo.leftN"></span>
				 	  <span class="big iconfont icon-fangda" @mousedown='sxzyevent("forward")'　 @mouseup='sxzyevent("stop")'　　:title="directioninfo.bigN"></span>
				 	  <span class="small iconfont icon-suoxiao" @mousedown='sxzyevent("backward")'　 @mouseup='sxzyevent("stop")'　　:title="directioninfo.smallN"></span>
				 	</div>
 				</div>
 				<div id="V_fullScreen" class="fullscreen iconfont icon-a" title="点击或者f11进入全屏" style="display: none;"></div>
 				<div id="playerAreasee" :channel="channel" :screens="screens" :info="info"  ></div>
 			</div>
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
import '../../../../static/cklive/css/index.css'
// import '../../../../static/cklive/src/ckplayer/ckplayer.js'
import {directioninfo, basicinfo, pathinfo, exeurl} from '@/module/admin/config/loopclassinfo'
export default {
  name: 'AJloopClasssee',
  data () {
    return {
      msg: basicinfo.msgaddN,
      basicinfo: basicinfo,
      directioninfo: directioninfo,
      wininfo: {
        widhei: ['909px', '631px'],
        btncancelleft: '735px',
        contenthei: '570px'
      },
      channelflag: false,
      channelno: '',
      classroomid: '',
      equipmentid: '',
      equipmentip: '',
      equipmentport: '',
      equipmentManufacturer: '',
      channelTarget: '',
      channelobj: '',
      infos: {},
      jsload: false
    }
  },
  created () {
    let _this = this
    let ckplay = document.createElement('script')
    ckplay.setAttribute('src', '/static/cklive/src/ckplayer/ckplayer.js')
    ckplay.setAttribute('id', 'ckscript')
    if (!document.getElementById('ckscript')) {
      document.body.appendChild(ckplay)
      ckplay.onload = function () {
        _this.jsload = true
      }
    } else {
      this.jsload = true
    }
  },
  methods: {
    cancelfn () {
      this.$router.go(-1);
    },
    sxzyevent (direction) {
      let that = this
      this.axios({
        method: 'post',
        url: exeurl,
        data: {
          classroomId: that.classroomid,
          type: direction,
          equipmentId: that.equipmentid,
          equipmentIp: that.equipmentip,
          equipmentPort: that.equipmentport,
          equipmentManufacturer: that.equipmentManufacturer,
          channelno: that.channelno,
          channelTarget: that.channelTarget
        }
      })
      .then(function (res) {
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
		
		playvideo(e){
				var that = this;
				var num = 0;
				if(e!=undefined){
					num= e;
				}
				var video_array = new Array(); 
				video_array.push(that.infos['channel'][num]);
				var title_array = new Array(); 
				title_array.push(that.infos['title'][num]);
			  if (this.jsload) {
				this.$CFCMXK({
			    id: 'playerAreasee',
			    Fscreenid: 'V_fullScreensee',
			    keycodeevent: false,
			    channelnum: 1, // 分屏模式
			    channelB: video_array,
			    channeltitle: title_array,
			    channelflag: false,
			    controlhei: 0,
			    widhei: {
			      wid: 889
			    }
			  })
			} else { //jsload未加载，等待加载
			  let clear = null
			  clear = setInterval(function () {
			    that.$CFCMXK({
			      id: 'playerAreasee',
			      Fscreenid: 'V_fullScreensee',
			      keycodeevent: false,
			      channelnum: 1, // 分屏模式
			      channelB: video_array,
			      channeltitle: title_array,
			      channelflag: false,
			      controlhei: 0,
			      widhei: {
			        wid: 889
			      }
			    })
			    clearInterval(clear)
			  }, 100)
			}
		}
  },
  mounted () {
    let that = this
    let obj = this.$route.params.item
		debugger
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      if (obj.length === 0) {
        this.win(types.nodata, this.cancelfn, false)
      } else {
        this.infos['channel'] = []
        this.infos['title'] = []
        this.infos['select'] = []
        for (let i = 0; i < obj.length; i++) {
          this.infos['channel'].push(obj[i].rtmpUrl_high)
          this.infos['title'].push(obj[i].channelName)
          this.infos['select'].push({value: obj[i].channelNo, txt: obj[i].channelName})
          if (i === 0) {
            this.channelno = obj[i].channelNo
            that.classroomid = obj[i].classroomId
            that.equipmentid = obj[i].equipmentId
            that.equipmentip = obj[i].equipmentIp
            that.equipmentport = obj[i].equipmentPort
            that.equipmentManufacturer = obj[i].equipmentManufacturer
            that.channelno = obj[i].channelNo
            that.channelTarget = obj[i].target
          }
        }				
        that.channelobj = that.$Select({
          'data': that.infos['select'],
          'originS': 'multiple',
          'selectId': ['select8', 'select7'],
          'callback': function (objs) {
            that.channelno = objs.value
            that.classroomid = obj[objs.ind].classroomId
            that.equipmentid = obj[objs.ind].equipmentId
            that.equipmentip = obj[objs.ind].equipmentIp
            that.equipmentport = obj[objs.ind].equipmentPort
            that.equipmentManufacturer = obj[objs.ind].equipmentManufacturer
            that.channelno = obj[objs.ind].channelNo
            that.channelTarget = obj[objs.ind].target
						that.playvideo(objs.ind);
          }
        })
				this.playvideo();
      
      }
    }
  }
}
</script>

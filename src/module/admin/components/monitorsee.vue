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
 				<span class="menuname">{{basicinfo.sgseeN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'width:889px;height:' + wininfo.contenthei">
 				<div class="G_search" style="position: relative;height:80px;">
 					<div style="float: left;width:50%">
 						<div class="part">
					 	  <span class="txt" style="width: 100%;">{{servercontrolinfo.room}}：{{msg}}</span>
					 	</div>
	 					<div class="part">
					 	  <span class="txt">{{basicinfo.channelN}}:</span>
					 	  <div id='select7' style="margin-top: 3px;"></div>
						  <select id="select8"></select>
					 	</div>
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
				 	  <span class="txt"　style="margin-left: 10px;">{{directioninfo.optN}}:</span>
				 	  <span class="up iconfont icon-up" @mousedown='sxzyevent("up")'  @mouseup='sxzyevent("stop")'　:title="directioninfo.upN"></span>
				 	  <span class="right iconfont icon-up-right" @mousedown='sxzyevent("right")' @mouseup='sxzyevent("stop")'　　:title="directioninfo.rightN"></span>
				 	  <span class="down iconfont icon-up-down"　 @mousedown='sxzyevent("down")' @mouseup='sxzyevent("stop")'　:title="directioninfo.downN"></span>
				 	  <span class="left iconfont icon-up-left" @mousedown='sxzyevent("left")' @mouseup='sxzyevent("stop")'　　:title="directioninfo.leftN"></span>
				 	  <span class="big iconfont icon-fangda" @mousedown='sxzyevent("forward")'　 @mouseup='sxzyevent("stop")'　　:title="directioninfo.bigN"></span>
				 	  <span class="small iconfont icon-suoxiao" @mousedown='sxzyevent("backward")'　 @mouseup='sxzyevent("stop")'　　:title="directioninfo.smallN"></span>
				 	</div>
				 	<div id="V_fullScreen" title="点击或者f11进入全屏" style="top: 0;display: none;" class="fullscreen  iconfont icon-a">全屏</div>
 				</div>
 				<div id="playerAreasee" :channel="channel" style="width: 0; height: 0;" :screens="screens" :info="info"></div>
 			</div>
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
import '../../../../static/cklive/css/index.css'
import {directioninfo, basicinfo, servercontrolinfo, pathinfo, exeurl} from '@/module/admin/config/monitorinfo'
export default {
  name: 'AJmonitorseer',
  data () {
    return {
      msg: '',
      servercontrolinfo: servercontrolinfo,
      basicinfo: basicinfo,
      directioninfo: directioninfo,
      wininfo: {
        widhei: ['909px', '681px'],
        btncancelleft: '735px',
        contenthei: '620px'
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
      jsload: false,
			channel:null,
			screens:null,
			info:{}
    }
  },
  created () {
  try{
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
      }catch(e){
        //TODO handle the exception
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

			  let clear = setTimeout(function () {
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
			   }, 1000)
			}
		}
  },
  mounted () {
    let that = this
    let obj = this.$route.params.item
    let objs = this.$route.params.urlarr
    if (!obj || !objs) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.msg = obj.name
      if (objs.length > 0) {
        this.infos['channel'] = []
        this.infos['title'] = []
        this.infos['selectinfo'] = []
        let j = 0
        for (let i = 0; i < objs.length; i++) {
          this.infos['channel'].push(objs[i].rtmpUrl_high)
          this.infos['title'].push(objs[i].channelName)
          this.infos['selectinfo'].push({value: objs[i].channelNo.toString(), txt: objs[i].channelName})
          if (i === 0) {
            that.channelno = objs[i].channelNo
            that.classroomid = obj.id
            that.equipmentid = objs[i].equipmentId
            that.equipmentip = objs[i].equipmentIp
            that.equipmentport = objs[i].equipmentPort
            that.equipmentManufacturer = objs[i].equipmentManufacturer
            that.channelno = objs[i].channelNo
            that.channelTarget = objs[i].target
          }
          j++
        }
        // if (j === objs.length) {
        //   if (this.jsload) {
        //     this.$CFCMXK({
        //       id: 'playerAreasee',
        //       channelnum: objs.length, // 分屏模式
        //       channelB: that.infos['channel'],
        //       channeltitle: that.infos['title'],
        //       channelflag: false,
        //       widhei: {
        //         wid: 889
        //       }
        //     })
        //   } else { //jsload未加载，等待加载
        //     let clear = null
        //     clear = setInterval(function () {
        //       console.log(that.jsload, 'this.jsload')
        //       that.$CFCMXK({
        //         id: 'playerAreasee',
        //         channelnum: objs.length, // 分屏模式
        //         channelB: that.infos['channel'],
        //         channeltitle: that.infos['title'],
        //         channelflag: false,
        //         widhei: {
        //           wid: 889
        //         }
        //       })
        //       clearInterval(clear)
        //     }, 100)
        //   }
        //
        //  }
				 let datatemp = that.infos['selectinfo']
				 this.channelobj = this.$Select({
				   'data': datatemp,
				   'originS': 'multiple',
				   'selectId': ['select8', 'select7'],
				   'callback': function (param) {
				     that.classroomid = obj.id
				     that.equipmentid = objs[param.ind].equipmentId
				     that.equipmentip = objs[param.ind].equipmentIp
				     that.equipmentport = objs[param.ind].equipmentPort
				     that.equipmentManufacturer = objs[param.ind].equipmentManufacturer
				     that.channelno = objs[param.ind].channelNo
				     that.channelTarget = objs[param.ind].target
				 		that.playvideo(param.ind);
				   }
				 })
				 this.playvideo();
      } else {
        this.win(basicinfo.nourl, this.cancelfn, false)
      }
    }
  }
}
</script>

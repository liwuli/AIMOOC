<style type="text/css">
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
 			<div class="title" >
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'width:840px;height:' + wininfo.contenthei">
			 	<div class="G_search" style="position: relative;margin-bottom: 10px;">
			 		<div class="part" >
            <!-- {{basicinfo.equipmentN}} 修改为 {{basicinfo.channelN}} -->
				 	  <span class="txt">{{basicinfo.channelN}}:</span>
				 	  <div id='select5' style="margin-top: 3px;"></div>
						<select id="select6"></select>
				 	</div>
				 	<div class="part" style="display: none;">
				 	  <span class="txt">{{basicinfo.channelN}}:</span>
				 	  <div id='select7' style="margin-top: 3px;"></div>
						<select id="select8"></select>
				 	</div>
				 	<img id="circle" style="float: right;margin-right: 40px;" usemap="#planetmap" src="/static/images/systemcontrol.png"/>
				 	<map name="planetmap" id="planetmap">
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
				 	  <span class="up iconfont icon-up" @mousedown='sxzyevent("up")'  @mouseup='sxzyevent("stop")'　:title="upN"></span>
				 	  <span class="right iconfont icon-up-right" @mousedown='sxzyevent("right")' @mouseup='sxzyevent("stop")'　　:title="directioninfo.rightN"></span>
				 	  <span class="down iconfont icon-up-down"　 @mousedown='sxzyevent("down")' @mouseup='sxzyevent("stop")'　:title="directioninfo.downN"></span>
				 	  <span class="left iconfont icon-up-left" @mousedown='sxzyevent("left")' @mouseup='sxzyevent("stop")'　　:title="directioninfo.leftN"></span>
				 	  <span class="big iconfont icon-fangda" @mousedown='sxzyevent("forward")'　 @mouseup='sxzyevent("stop")'　　:title="directioninfo.bigN"></span>
				 	  <span class="small iconfont icon-suoxiao" @mousedown='sxzyevent("backward")'　 @mouseup='sxzyevent("stop")'　　:title="directioninfo.smallN"></span>
				 	</div>
				 	<div id="V_fullScreen" title="点击或者f11进入全屏" style="top: 0;right: 0" class="fullscreen  iconfont icon-a"></div>

    			</div>
    			<div id="playerAreasee" style="height: 473px;"  :channel="channel" :screens="screens" :info="info" ></div>
 			</div>
 		</div>
 	</div>
</template>
<script>
import * as types from '@/store/win-types'
import '../../../../static/cklive/css/index.css'
// import '../../../../static/cklive/src/ckplayer/ckplayer.js'
import {basicinfo, directioninfo, pathinfo, exeurl, stopurl} from '@/module/admin/config/controloperationinfo'
export default {
  name: 'AJcontroloperationdel',
  data () {
    return {
      add: 'add',
      basicinfo: basicinfo,
      msg: basicinfo.msgseeN,
      directioninfo: directioninfo,
      wininfo: {
        widhei: ['869px', '631px'],
        btncancelleft: '735px',
        contenthei: '570px'
      },
      ids: '',
      equipmentid: '',
      channel: '',
      channelno: '',
      classroomid: '',
      equipmentip: '',
      equipmentport: '',
      equipmentManufacturer: '',
      channelTarget: '',
      channelobj: '',
      infos: {},
      firstlevel: '',
      secondlevel: '',
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
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: stopurl,
        data: {
          classroomId: that.ids,
          classroomType: 'centralized'
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
    },

		playvideo(ind,enind){
				var that = this;
				let obj = this.$route.params.item.list
				var num = 0;
				var video_array = new Array();
				video_array.push(obj[ind].list[enind].rtmp);
				var title_array = new Array();
				title_array.push(obj[ind].list[enind].name);
				  if (this.jsload) {
				  that.$CFCMXK({
				    id: 'playerAreasee',
				    channelnum: 1, // 分屏模式
				    channelB: video_array,
				    channeltitle: title_array,
				    channelflag: false,
				    controlhei: 0,
				    widhei: {
				      wid: 840,
				      hei: 473
				    }
				  })
				} else { //jsload未加载，等待加载
				  let clear = null
				  clear = setInterval(function () {
				    that.$CFCMXK({
				      id: 'playerAreasee',
				      channelnum: 1, // 分屏模式
				      channelB: video_array,
				      channeltitle: title_array,
				      channelflag: false,
				      controlhei: 0,
				      widhei: {
				        wid: 840,
				        hei: 473
				      }
				    })
				    clearInterval(clear)
				  }, 100)
				}
		},

    palytrmp(obj){

      var video_array = new Array();
      video_array.push(obj.value);
      var title_array = new Array();
      title_array.push(obj.txt);

      this.$CFCMXK({
        id: 'playerAreasee',
        channelnum: 1, // 分屏模式
        channelB: video_array,
        channeltitle: title_array,
        channelflag: false,
        controlhei: 0,
        widhei: {
          wid: 840,
          hei: 473
        }
      })
    }
  },
  mounted () {
    let that = this
    let obj = this.$route.params.item

    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.ids = obj.id
      let objs = obj.list
      let temp = []
      let tempsub = []
      let temp_list=[]
      this.infos['channel'] = []
      this.infos['title'] = []
      for (let item = 0; item < objs.length; item++) {
        temp[item] = {}
        temp[item]['value'] = objs[item].id
        temp[item]['txt'] = objs[item].name
        tempsub[item] = []
        for (let items = 0; items < objs[item].list.length; items++) {
          // temp_list[items] = {}
          // temp_list[items]['value'] = objs[item].list[items].rtmp;
          // temp_list[items]['txt'] = objs[item].list[items].name;
          temp_list.push({
            value:objs[item].list[items].rtmp,
            txt:objs[item].list[items].name
          })

          tempsub[item][items] = {}
          tempsub[item][items]['value'] = objs[item].list[items].no
          tempsub[item][items]['txt'] = objs[item].list[items].name
          tempsub[item][items]['target'] = objs[item].list[items].target
          this.infos['channel'].push(objs[item].list[items].rtmp)
          this.infos['title'].push(objs[item].list[items].name)
          if (item === 0 && items === 0) {
            that.channelno = objs[item].list[items].no
            that.channelTarget = objs[item].list[items].target
          }
        }

        if (item === 0) {
          that.firstlevel = 0
          that.classroomid = objs[item].classroomid
          that.equipmentid = objs[item].id
          that.equipmentip = objs[item].ip
          that.equipmentport = objs[item].port
          that.equipmentManufacturer = objs[item].manu
        }
      }

      that.$Select({
        'data': temp_list,
        'originS': 'multiple',
        'selectId': ['select6', 'select5'],
        'callback': function (obj) {
          that.palytrmp(obj);

          that.firstlevel = obj.ind
          that.classroomid = objs[obj.ind].classroomid
          that.equipmentid = objs[obj.ind].id
          that.equipmentip = objs[obj.ind].ip
          that.equipmentport = objs[obj.ind].port
          that.equipmentManufacturer = objs[obj.ind].manu
          that.channelobj.cfg.data = tempsub[obj.ind]
          that.channelobj.cfg.domdata = false
          that.channelobj.initCommonVal()
					//that.playvideo(obj.ind,0)
        }
      })
     //  that.channelobj = that.$Select({
     //    'data': tempsub[0],
     //    'originS': 'multiple',
     //    'selectId': ['select8', 'select7'],
     //    'callback': function (obj) {
     //      that.channelno = obj.value
     //      that.channelTarget = objs[that.firstlevel].list[obj.ind].target
					// // that.playvideo(that.firstlevel,obj.ind);
     //    }
     //  })
     let clear = null
     clear = setTimeout(function () {
      that.palytrmp(temp_list[0]);
      }, 300)
    // that.playvideo(0,0)
//    let clear = null
//    clear = setTimeout(function () {
//      that.$CFCMXK({
//        id: 'playerAreasee',
//        channelnum: that.infos['channel'].length, // 分屏模式
//        channelB: that.infos['channel'],
//        channeltitle: that.infos['title'],
//        channelflag: false,
//        controlhei: 0,
//        widhei: {
//          wid: 840,
//          hei: 473
//        }
//      })
//      clearTimeout(clear)
//    }, 300)
    }
  }
}
</script>

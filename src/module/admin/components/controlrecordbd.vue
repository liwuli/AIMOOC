<style type="text/css">
	.bjlist{
		float: right;
		margin-left: 5px;
		width: 210px;
	}
	.bjlist .list{
		float: left;
		line-height: 30px;
		width: 100%;
	}
	.bjlist .list input{
		margin: 0 10px;
		width: 60px;
	}
	.bjlist .list .txt{
		line-height: 30px;
		padding: 0;
	}
	.bjlist .option{
		color: #f00;
		font-family: "arial, helvetica, sans-serif";
		float: left;
		line-height: 30px;
		width: 100%;
	}
	#jx,#jtjs,#freebd{
		margin-left: 0;
		margin-right: 5px;
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
 			<div class="content" :style="'width: 1180px;height:' + wininfo.contenthei">
			 	<canvas id="canvasbd" style="zoom: 0.5;float:left;" width="1920" height="1080"></canvas>
				<div class="bjlist">
					<div class="list">
						<span class="txt">{{basicinfo.deskwid}}</span>
						<input type="number" v-model = "width" :value="width"/> mm
					</div>
					<div class="list">
						<span class="txt">{{basicinfo.deskhei}}</span>
						<input type="number" v-model = "height" :value="height"/> mm
					</div>
					<div class="list">
						<div class="check" id="jtjs">
							<div class="icon"></div>
						</div>
						{{basicinfo.deskjtjs}}
					</div>
					<div class="list" style="display: none;">
						<div class="check" id="freebd">
							<div class="icon"></div>
						</div>
						{{basicinfo.deskfree}}
					</div>
					<div class="list">
						<div  :class="jxval ? 'checked' : 'check'" id="jx" >
							<div class="icon" @click="jxevent($event)"></div>
						</div>
						{{basicinfo.deskjx}}
					</div>
					<p class="option">1. shift+z 撤销</p>
					<p class="option">2. shift+y 恢复(仅限标定)</p>
					<p class="option">3. shift+x 清空</p>
					<p class="option">4. 如果是阶梯教室，请勾选阶梯教室按钮后，进行标定</p>
					<p class="option">5. 标定顺序为左侧标定，右侧标定，最后标定阶梯教室，每个区域两条线段</p>
					<p class="option">6. 标定图片大小为1920*1080</p>
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
import {basicinfo, pathinfo, imgurl, setchannelurl} from '@/module/admin/config/controlrecordinfo'
export default {
  name: 'AJcontrolrecordsetchannel',
  data () {
    return {
      msg: basicinfo.msgsetchannelN,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['1200px', '650px'],
        btncancelleft: '545px',
        contenthei: '540px'
      },
      width: 0,
      height: 0,
      jxval: 0,
      jtval: 0,
      bdval: '',
      freeval: '',
      bdobj: '',
      saveres: {},
      firstlinearr: [],
      secondlinearr: [],
      thirdlinearr: [],
      imgurl: ''
    }
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.channelid
      this.execanvasbd()
    }
  },
  methods: {
    radioevent (obj) {
      this.use = obj.val
    },
    execanvasbd () {
      let that = this
      this.axios({
        method: 'post',
        url: imgurl,
        params: {
          params: {
            channelId: that.id
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.content)
        } else {
          let obj = res.data.result.coordinates
          if (obj) { // 如果有原始值，执行赋值操作
            let initarr = obj.CalibrationParam
            that.width = initarr.Table.Width
            that.height = initarr.Table.Height
            if (initarr.LadderRoomFlag) {
              that.jxval = true
            }
            that.firstlinearr = initarr.PointArray1 ? initarr.PointArray1 : []
            that.secondlinearr = initarr.PointArray2 ? initarr.PointArray2 : []
            that.thirdlinearr = initarr.PointArray3 ? initarr.PointArray3 : []
          }
          that.imgurl = res.data.result.imagePath
        }
      })
      .then(function () {
        that.bdobj = that.$CANVASBD({
          id: 'canvasbd',
          firstlinearr: that.firstlinearr,
          secondlinearr: that.secondlinearr,
          thirdlinearr: that.thirdlinearr,
          imgsrc: that.imgurl
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jxevent (obj) {
      if (obj.srcElement.parentNode.className === 'check') {
        obj.srcElement.parentNode.className = 'checked'
        this.jxval = true
      } else {
        obj.srcElement.parentNode.className = 'check'
        this.jxval = false
      }
    },
    savedata () {
      let that = this
      if (!that.width || !that.height) {
        that.win(basicinfo.tableinfo, '', false)
      } else {
        if (this.jtval) {
          if (this.jtval && that.bdobj.cfg.imgarr.length < 7) {
            that.win(basicinfo.errorinfo, '', false)
          } else {
            this.savefn()
          }
        } else {
          if (that.bdobj.cfg.imgarr.length < 5) {
            that.win(basicinfo.errorinfo, '', false)
          } else {
            this.savefn()
          }
        }
      }
    },
    savefn () {
      let that = this
      let CalibrationParam = {}
      CalibrationParam.DistortionFlag = that.bdobj.cfg.countmax > 5 ? 1 : 0
      CalibrationParam.LadderRoomFlag = this.jxval ? 1 : 0
      let Table = {}
      Table.Width = this.width * 1
      Table.Height = this.height * 1
      let PointArray1 = []
      let PointArray2 = []
      let PointArray3 = []
      let objs = that.bdobj.cfg.bjXY
      for (let i = 0; i < objs.length; i++) {
        if (i !== 0) {
          if (i <= 2) {
            PointArray1.push({x: objs[i].x, y: objs[i].y})
            PointArray1.push({x: objs[i].x1, y: objs[i].y1})
          } else if (i > 2 && i <= 4) {
            PointArray2.push({x: objs[i].x, y: objs[i].y})
            PointArray2.push({x: objs[i].x1, y: objs[i].y1})
          } else if (i > 4 && i <= 6) {
            PointArray3.push({x: objs[i].x, y: objs[i].y})
            PointArray3.push({x: objs[i].x1, y: objs[i].y1})
          }
        }
      }
      CalibrationParam.Table = Table
      CalibrationParam.PointArray1 = PointArray1
      CalibrationParam.PointArray2 = PointArray2
      if (that.bdobj.cfg.countmax > 5) {
        CalibrationParam.PointArray3 = PointArray3
      }
      this.saveres.CalibrationParam = CalibrationParam
      this.axios({
        method: 'post',
        url: setchannelurl,
        params: {
          params: {
            channelId: that.id,
            coordinates: that.saveres
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
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

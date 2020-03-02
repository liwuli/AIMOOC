<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'pading:20px;height:' + wininfo.contenthei">
			 	<div class="upload" id="cutimg">
					<input type="file" name="files" id="files" :accept="liveinfo.accept" value="" style="position: absolute;top: -1000000px;"/>
					<div class="mrightcreate" id="uploadbtn" style="margin-bottom: 20px;"  onclick="document.getElementById('files').click()">上传本地图片</div>
					<div class="canvaspart" id="canvaspart">
						<img src=""  id="canvasimg"/>
						<div class="divcenter" id="divcenter"></div>
					</div>
					<div class="sliderpart">
						<div class="iconfont slidericon icon-suoxiao"></div>
						<div class="progress" id="progress">
							<div class="innergress" id="innergress"></div>
						</div>
						<div class="iconfont slidericon icon-fangda"></div>
						<div class="rate" id="rateshow" style="display: none;"></div>
					</div>
					<canvas id="realcanvas" width="230" height="128" ></canvas>
				</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{basicinfo.sureN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {basicinfo, liveinfo, uploadimgurl, pathinfo} from '@/module/admin/config/liveinfo'
export default {
  name: 'AJliveeditbasicupload',
  data () {
    return {
      msg: liveinfo.uploadP,
      basicinfo: basicinfo,
      liveinfo: liveinfo,
      name: '',
      pathinfo: pathinfo,
      styles: 'width: 450px;float: left;height: 200px;',
      wininfo: {
        widhei: ['576px', '495px'],
        btncancelleft: '200px',
        contenthei: '368px'
      },
      img: '',
      base64Data: '',
      locationUrl: '',
      allurl: ''
    }
  },
  mounted () {
    this.img = this.$CFCMimg()
  },
  methods: {
    filesevent () {
      document.getElementById('files').click()
    },
    savedata () {
      let that = this
      if (this.img.cfg.img.src) {
        var images = new Image()
        images.src = this.img.cfg.canvasobj.toDataURL('image/png')
        this.axios({
          method: 'post',
          url: uploadimgurl,
          data: {
            base64Data: images.src
          }
        })
        .then(function (res) {
          if (res.data.remoteFile) {
            that.locationUrl = res.data.remoteFile
            that.allurl = res.data.fileUrl
            that.$router.push({'name': that.pathinfo.prex + 'edit', params: {geturl: that.locationUrl, allurl: that.allurl}})
          } else {
            that.win(liveinfo.uperr, '', false)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        this.win(liveinfo.uploadimgN, '', false)
      }
    },
    cancelfn () {
      this.$router.push({'name': this.pathinfo.prex + 'edit'})
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

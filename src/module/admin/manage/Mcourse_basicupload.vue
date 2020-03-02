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
					<input type="file" name="files" id="files" value="" style="position: absolute;top: -1000000px;"/>
					<div class="mrightcreate" id="uploadbtn" style="margin-bottom: 20px;" onclick="document.getElementById('files').click()">上传本地图片</div>
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
 				<div class="save" @click="savedata" :style="'margin-left:' + wininfo.btncancelleft">{{sureN}}</div>
 				<div class="cancel" @click="cancelfn" >{{cancelN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {uploadP, uploadimgurl, uperr, uploadimgN, pathinfo, noticeaddcontentN, noticeaddnameN, sureN, cancelN} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManagebasicupload',
  data () {
    return {
      msg: uploadP,
      sureN: sureN,
      name: '',
      cancelN: cancelN,
      pathinfo: pathinfo,
      noticeaddnameN: noticeaddnameN,
      noticeaddcontentN: noticeaddcontentN,
      styles: 'width: 450px;float: left;height: 200px;',
      wininfo: {
        widhei: ['576px', '495px'],
        btncancelleft: '200px',
        contenthei: '368px'
      },
      img: '',
      base64Data: '',
      locationUrl: '',
      allurl: '',
      courseId: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
  },
  mounted () {
    this.img = this.$CFCMimg()
  },
  components: {
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
            that.$router.push({'name': that.pathinfo.prex, params: {geturl: that.locationUrl, allurl: that.allurl}, query: {courseId: that.courseId}})
          } else {
            that.win(uperr, '', false)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        this.win(uploadimgN, '', false)
      }
    },
    cancelfn () {
      this.$router.push({name: pathinfo.prex, query: {courseId: this.courseId}})
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

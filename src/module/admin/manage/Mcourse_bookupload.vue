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
						<div class="divcenter" style="width: 128px;height:165px" id="divcenter"></div>
					</div>
					<div class="sliderpart">
						<div class="iconfont slidericon icon-suoxiao"></div>
						<div class="progress" id="progress">
							<div class="innergress" id="innergress"></div>
						</div>
						<div class="iconfont slidericon icon-fangda"></div>
						<div class="rate" id="rateshow" style="display: none;"></div>
					</div>
					<canvas id="realcanvas" width="128" height="165" ></canvas>
				</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{sureN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {bookwarntxt, updatebookurl, uploadP, uploadimgurl, bookinfo, uploadimgN, pathinfo, noticeaddcontentN, noticeaddnameN, sureN, cancelN} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManagebookupload',
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
      bookinfo: bookinfo,
      img: '',
      base64Data: '',
      locationUrl: '',
      allurl: '',
      courseId: '',
      item: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.item = obj
    }
  },
  mounted () {
    this.img = this.$CFCMimg({wid: 128, hei: 165})
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
            that.updateimg(that.allurl)
          } else {
            that.win(bookinfo.bookuperr, '', false)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        this.win(uploadimgN, '', false)
      }
    },
    updateimg (allurl) {
      let that = this
      this.axios({
        method: 'post',
        url: updatebookurl,
        params: {
          params: {
            bookName: that.item.name,
            publishInfo: that.item.publisheditor,
            author: that.item.editor,
            cover: allurl,
            courseId: that.courseId,
            creator: '',
            id: that.item.id
          }
        }
      })
      .then(function (res) {
//      console.log(res, 'res img update')
        if (res.data.code !== 200) {
          this.win(bookwarntxt.updatepicerr, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: pathinfo.prex + 'book', query: {courseId: this.courseId}})
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

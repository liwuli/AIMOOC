<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{bookinfo.bookname}}<span class="red">*</span>：</span>
			 		<input type="text"  v-model="bookname" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{bookinfo.bookeditor}}<span class="red">*</span>：</span>
			 		<input type="text"  v-model="bookeditor" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{bookinfo.bookpublish}}<span class="red">*</span>：</span>
			 		<input type="text"  v-model="bookpublish" />
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {bookwarntxt, updatebookurl, pathinfo, bookinfo, saveN, cancelN} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJMcourseManagebookedit',
  data () {
    return {
      msg: bookinfo.bookaddbtnN,
      bookinfo: bookinfo,
      bookpublish: '',
      bookeditor: '',
      saveN: saveN,
      bookname: '',
      imgurl: '',
      cancelN: cancelN,
      wininfo: {
        widhei: ['376px', '245px'],
        btncancelleft: '200px',
        contenthei: '118px'
      },
      courseId: '',
      id: ''
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
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
    valid () {
      if (this.bookname.replace(/\s/gi, '') === '') {
        this.win(bookwarntxt.bookname, '', false)
        return false
      } else if (this.bookeditor.replace(/\s/gi, '') === '') {
        this.win(bookwarntxt.bookeditor, '', false)
        return false
      } else if (this.bookpublish.replace(/\s/gi, '') === '') {
        this.win(bookwarntxt.bookpublish, '', false)
        return false
      } else {
        return true
      }
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: updatebookurl,
        params: {
          params: {
            bookName: that.bookname,
            publishInfo: that.bookpublish,
            author: that.bookeditor,
            cover: that.imgurl,
            courseId: that.courseId,
            creator: '',
            id: that.id
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.$Win({
            'title': types.title,
            'type': 'txt',
            'content': res.data.message,
            'timeout': types.Timeout3,
            'cancel': function (obj) {
              obj.remove(obj.getid)
            }
          })
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
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.bookname = obj.name
      this.bookpublish = obj.publisheditor
      this.bookeditor = obj.editor
      this.id = obj.id
      this.imgurl = obj.imgurl
    }
  }
}
</script>

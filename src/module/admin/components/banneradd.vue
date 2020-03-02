<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.msgaddN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.linkN}}<i>*</i>：</span>
			 		<input type="text" :placeholder="basicinfo.linkdemo" v-model="linkval" :value="linkval"/>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.textareaN}}<i>*</i>：</span>
			 		<textarea name="" class="textarea" rows="" cols="" v-model="textareaval"></textarea>
			 	</div>
			 	<div class="formline ">
			 		<span class="txt">{{basicinfo.fileN}}<i>*</i>：</span>
			 		<singlefile @fileevent='fileevent' :type='filetype'></singlefile>
			 		<span class="txt red" style="min-width: 330px;">{{warntxt.picwarn}}</span>
			 		<img v-if="imgurl !== ''" style="height: 81px;float:left;margin-left:100px;max-width: 290px;" :src="imgurl" alt="" />
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" v-show="imgurl !== ''" @click="savedatafn">{{basicinfo.saveN}}</div>
 				<div class="save gray" v-show="imgurl === ''">{{basicinfo.saveN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import singlefile from '@/components/extend/singlefile'
import {basicinfo, uploadimgurl, addurl, pathinfo, warntxt, filetype, msgaddN, saveN, cancelN, textareaN, linkN, fileN} from '@/module/admin/config/bannerinfo'
export default {
  name: 'AJbanneradd',
  data () {
    return {
      basicinfo: basicinfo,
      filetype: filetype,
      warntxt: warntxt,
      wininfo: {
        widhei: ['500px', '410px'],
        btncancelleft: '345px',
        contenthei: '293px'
      },
      linkval: '',
      textareaval: '',
      files: '',
      imgurl: '',
      locationUrl: '',
      ids: ''
    }
  },
  components: {
    singlefile
  },
  methods: {
    fileevent (obj) {
      if (obj.fileinfo.size > 300 * 1000) {
        this.win(warntxt.tobig, '', false)
        this.files = ''
      } else {
        let that = this
        this.files = obj.fileinfo
        let formData = new FormData()
        formData.append('file', this.files)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.axios({
          method: 'post',
          url: uploadimgurl,
          data: formData,
          headers: config.headers
        })
        .then(function (res) {
          that.imgurl = res.data.fileUrl
          that.locationUrl = res.data.remoteFile
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    valid () {
      if (this.linkval.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.urlN, '', false)
        return false
      } else if (this.textareaval.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.desN, '', false)
        return false
      } else if (this.files.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.imgN, '', false)
        return false
      } else if (this.imgurl.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.imgurl, '', false)
        return false
      } else {
        return true
      }
    },
    savedatafn () {
      if (this.valid()) {
        let that = this
        this.axios({
          method: 'post',
          url: addurl,
          params: {
            par: {
              bannerUrl: that.imgurl,
              description: that.textareaval,
              imgUrl: that.linkval
            }
          }
        })
        .then(function (res) {
          if (!res.data.isSuccess) {
            that.win(res.data.message, '', false)
          } else {
            that.$router.push({name: pathinfo.prex})
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
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

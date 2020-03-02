<template>
  <div class="app">
  	<Ghead></Ghead>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<AJposition></AJposition>
    			<div class="GH_public">
    				<div class="formline">
					 		<span class="txt">{{pnameN}}：</span>
					 		<input type="text" v-model="name" :value='name'/>
					 	</div>
					 	<!--<div class="formline">
					 		<span class="txt">{{codeN}}：</span>
					 		<input type="text"  v-model="code" :value='code'/>
					 	</div>-->
					 	<div class="formline " style="margin-top: 20px;">
					 		<span class="txt">{{fileN}}<i>*</i>：</span>
					 		<singlefile @fileevent='fileevent' :type='filetype'></singlefile>
					 		<img v-if="imgurl !== ''" :src="imgurl" style="height: 30px;"/>
					 	</div>
					 	<!--<div class="formline">
					 		<span class="txt">{{statusN}}：</span>
					 		<Radio :genderval="genderval" :type="edit" @radioevent="radioevent" :radioinfo="radioinfo"></Radio>
					 	</div>-->
					 	<div class="formline" style="margin-top: 20px;">
					 		<span class="txt">{{footerN}}：</span>
					 		<textarea  v-model="footer" :value="footer"></textarea>
					 	</div>
					 	<div class="btnline">
			 				<!--<div class="cancel" @click="cancelfn">{{cancelN}}</div>-->
			 				<div class="save" @click="savedata" :style="active + 'margin-left:' + wininfo.btncancelleft">{{saveN}}</div>
			 			</div>
    			</div>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import singlefile from '@/components/extend/singlefile'
import Radio from '@/components/extend/radio'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import * as types from '@/store/win-types'
import {pathinfo, listurl, uploadimgurl, filetype, fileN, radioinfo, editurl, msgeditN, pnameN, codeN, statusN, footerN, saveN, cancelN, msgErr} from '@/module/admin/config/portalinfo'
// 权限处理
export default {
  name: 'AJportal',
  data () {
    return {
      msg: msgeditN,
      footerN: footerN,
      radioinfo: radioinfo,
      edit: 'edit',
      codeN: codeN,
      pnameN: pnameN,
      statusN: statusN,
      name: '',
      thumbnailId: '',
      imgurl: '',
      locationUrl: '',
      code: '',
      footer: '',
      saveN: saveN,
      cancelN: cancelN,
      fileN: fileN,
      filetype: filetype,
      genderval: 0,
      id: '',
      files: '',
      wininfo: {
        widhei: ['500px', '290px'],
        btncancelleft: '345px',
        contenthei: '173px'
      }
    }
  },
  computed: {
    active: function () {
      if (this.name && this.footer) {
        return 'background:#3197fc;'
      } else {
        return ''
      }
    }
  },
  created () {
    let that = this
    this.axios({
      method: 'post',
      url: listurl
    })
    .then(function (res) {
      let obj = res.data
      if (!obj.id) {
        that.win(msgErr, '', false)
      } else {
        that.genderval = obj.isDelete
        that.id = obj.id
        that.code = obj.code
        that.name = obj.name
        that.footer = obj.footer
        that.thumbnailId = obj.thumbnailId
        that.imgurl = obj.fileUrl
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  components: {
    Ghead,
    Radio,
    Gfoot,
    AJposition,
    singlefile,
    Linklist
  },
  methods: {
    fileevent (obj) {
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
    },
    radioevent (obj) {
      this.genderval = obj.val
    },
    savedata (obj) {
      if (!this.name || !this.footer) {
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        data: {
          id: that.id,
          name: that.name,
//        code: that.code,
//        isDelete: that.genderval,
          footer: that.footer,
          thumbnailId: that.thumbnailId,
          locationUrl: that.locationUrl
        }
      })
      .then(function (res) {
        if (!res.data.id) {
          that.win(res.data.content, that.cancelfn, false)
        } else {
          that.win(res.data.content)
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

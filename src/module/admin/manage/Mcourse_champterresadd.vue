<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1] + ';display:none;z-index:100000000;' + show">
        <span style="font-size: 16px;color: #FFFFFF;">上传进度</span>
        <el-progress :text-inside="true" :stroke-width="22" :percentage="upload_status" style="width: 60%;margin-left: 20%;margin-top: -35%;"></el-progress>
      </div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{champterresaddnameN}}<span class="red">*</span>：</span>
			 		<input type="text"  v-model="name" />
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{champterresinN}}<span class="red">*</span>：</span>
			 		<div id='select0'  style="margin-top: 3px;z-index: 1000004;">

					</div>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{restypeN}}：</span>
			 		<Radio :type="add" @radioevent="resevent" :radioinfo="radioinfo"></Radio>
			 	</div>
			 	<div class="formline" v-show = 'singleshow'>
			 		<span class="txt">{{filechooseN}}：</span>
			 		<input type="file" :accept="fileaccept" style="width: 90px;" name="fileup" id="fileup" @change='change($event)' class="fileup" value="" />
			 		<div class="filechoose">{{filechooseN}}</div>
			 		<div class="name">{{filename}}</div>
			 		<div class="warntxt">{{warntxt}}</div>
			 	</div>
			 	<div class="formline" v-show = '!singleshow' style="min-height: 170px;">
			 		<span class="txt">{{fileaddchoosetxtN}}</span>
			 		<div class="resaddbtn" v-show='!unadd' @click='listadd' style="width: 60px;margin-right: 10px;left: 0;position:relative;margin-left: 0;">{{resaddbtnN}}</div>
			 		<div class="unresaddbtn" v-show='unadd' style="width: 60px;margin-right: 10px;left: 0;position:relative;margin-left: 0;">{{resaddbtnN}}</div>
			 		<div class="warntxt" style="width:330px;text-indent: 0;">{{warntxt}}</div>
			 		<div class="warntxt" style="width:100%;text-indent: 0;color:#f00">{{mulscreenwarn}}</div>
			 		<div class="filelist" id="filelist">
			 			<div class="list" v-show="listshow[0]" :style="liststyle[0]">
			 				<input type="file" :accept="fileaccept" style="width: 130px;" id="filechoose1" @change='changemix($event, 1)' class="fileup" value="" />
					 		<div class="filechoose hides" :style="selected[0]" :title="filenamemixname1">{{filenamemixname1}}</div>
					 		<div class="fileclose iconfont icon-del" @click="filedel(1)"></div>
			 			</div>
			 			<div class="list" v-show="listshow[1]" :style="liststyle[1]">
			 				<input type="file" :accept="fileaccept" style="width: 130px;" id="filechoose2" @change='changemix($event, 2)' class="fileup" value="" />
					 		<div class="filechoose hides" :style="selected[1]" :title="filenamemixname2">{{filenamemixname2}}</div>
					 		<div class="fileclose iconfont icon-del" @click="filedel(2)"></div>
			 			</div>
			 			<div class="list" v-show="listshow[2]" :style="liststyle[2]">
			 				<input type="file" :accept="fileaccept" style="width: 130px;" id="filechoose3" @change='changemix($event, 3)' class="fileup" value="" />
					 		<div class="filechoose hides" :style="selected[2]" :title="filenamemixname3">{{filenamemixname3}}</div>
					 		<div class="fileclose iconfont icon-del" @click="filedel(3)"></div>
			 			</div>
			 			<div class="list" v-show="listshow[3]" :style="liststyle[3]">
			 				<input type="file" :accept="fileaccept" style="width: 130px;" id="filechoose4"  @change='changemix($event, 4)' class="fileup" value="" />
					 		<div class="filechoose hides" :style="selected[3]" :title="filenamemixname4">{{filenamemixname4}}</div>
					 		<div class="fileclose iconfont icon-del" @click="filedel(4)"></div>
			 			</div>
			 			<div class="list" v-show="listshow[4]" :style="liststyle[4]">
			 				<input type="file" :accept="fileaccept" style="width: 130px;" id="filechoose5"  @change='changemix($event, 5)' class="fileup" value="" />
					 		<div class="filechoose hides" :style="selected[4]" :title="filenamemixname5">{{filenamemixname5}}</div>
					 		<div class="fileclose iconfont icon-del" @click="filedel(5)"></div>
			 			</div>
			 		</div>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{publishavilidN}}：</span>
			 		<Radio :type="add" @radioevent="publishevent" :radioinfo="publishradioinfo"></Radio>
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
import Radio from '@/components/extend/radio'
import {warntxt, uploading, champterresaddN, fileaddchoosetxtN, listchampterurl, publishavilidN, publishradioinfo, resdefaultN, resaddbtnN, fileaddchooseN, radioinfo, fileaccept, filewarn, filechooseN, restypeN, champterresinN, champterresaddnameN, saveN, cancelN, addchampterresourceurl} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJMcourseManagechampterresadd',
  data () {
    return {
      msg: champterresaddN,
      champterresaddnameN: champterresaddnameN,
      champterresinN: champterresinN,
      fileaddchoosetxtN: fileaddchoosetxtN,
      fileaddchooseN: fileaddchooseN,
      publishradioinfo: publishradioinfo,
      publishavilidN: publishavilidN,
      restypeN: restypeN,
      resaddbtnN: resaddbtnN,
      uploading: uploading,
      selected: [],
      saveN: saveN,
      unadd: false,
      show: '',
      radioinfo: radioinfo,
      filechooseN: filechooseN,
      filenamemix1: '',
      filenamemix2: '',
      filenamemix3: '',
      filenamemix4: '',
      filenamemix5: '',
      filenamemixname1: resdefaultN,
      filenamemixname2: resdefaultN,
      filenamemixname3: resdefaultN,
      filenamemixname4: resdefaultN,
      filenamemixname5: resdefaultN,
      filename: '',
      filesingle: '',
      singleshow: true,
      liststyle: [],
      name: '',
      add: 'add',
      cancelN: cancelN,
      styles: 'width: 450px;float: left;height: 200px;',
      wininfo: {
        widhei: ['636px', '495px'],
        btncancelleft: '200px',
        contenthei: '368px'
      },
      type: '',
      fieltype: 0,
      warntxt: filewarn[0],
      mulscreenwarn: warntxt.mulscreenwarn,
      fileaccept: fileaccept[0],
      listshow: [true, true, true, false, false],
      listnum: 0,
      hide: 0,
      publishval: 1,
      courseId: '',
      lessonid: '',
      upload_status:0
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
  },
  components: {
    Radio
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
    publishevent (obj) {
      this.publishval = obj.val
    },
    resevent (obj) {
      this.fieltype = obj.val
      this.warntxt = filewarn[obj.val]
      this.fileaccept = fileaccept[obj.val]
      if (obj.val === '4') {
        this.singleshow = false
      } else {
        this.singleshow = true
      }
    },
    listadd () {
      this.hide = -1
      this.listnum = 0
      for (let i = 0; i < this.listshow.length; i++) {
        if (this.listshow[i]) {
          if (this.listnum < 3) {
            this.liststyle.splice(i, 1, 'position:absolute;left:' + this.listnum * 150 + 'px;top:0;margin-left: 0px;display:block')
          } else {
            this.liststyle.splice(i, 1, 'position:absolute;left:' + (this.listnum - 3) * 150 + 'px;top:50px;margin-left: 0px;display:block')
          }
          this.listnum++
        } else {
          if (this.hide < 0) {
            this.hide = i
          }
        }
      }
      if (this.hide >= 0 && this.listnum < 5) {
        this.listshow.splice(this.hide, 1, true)
        if (this.listnum < 3) {
          this.liststyle.splice(this.hide, 1, 'position:absolute;left:' + this.listnum * 150 + 'px;top:0;margin-left: 0px;display:block')
        } else {
          this.liststyle.splice(this.hide, 1, 'position:absolute;left:' + (this.listnum - 3) * 150 + 'px;top:50px;margin-left: 0px;display:block')
        }
      } else {
        this.unadd = true
      }
    },
    filedel (ind) {
      let count = 0
      for (let i = 0; i < this.listshow.length; i++) {
        if (this.listshow[i]) {
          count++
        }
      }
      if (count < 3) {
        return false
      }
      switch (ind) {
        case 1:
          this.filenamemix1 = ''
          this.filenamemixname1 = resdefaultN
          this.selected.splice(0, 1, '')
          this.listshow.splice(0, 1, false)
          document.getElementById('filechoose1').value = ''
          break
        case 2:
          this.filenamemix2 = ''
          this.filenamemixname2 = resdefaultN
          this.selected.splice(1, 1, '')
          this.listshow.splice(1, 1, false)
          document.getElementById('filechoose2').value = ''
          break
        case 3:
          this.filenamemix3 = ''
          this.filenamemixname3 = resdefaultN
          this.selected.splice(2, 1, '')
          this.listshow.splice(2, 1, false)
          document.getElementById('filechoose3').value = ''
          break
        case 4:
          this.filenamemix4 = ''
          this.filenamemixname4 = resdefaultN
          this.selected.splice(3, 1, '')
          this.listshow.splice(3, 1, false)
          document.getElementById('filechoose4').value = ''
          break
        case 5:
          this.filenamemix5 = ''
          this.filenamemixname5 = resdefaultN
          this.selected.splice(4, 1, '')
          this.listshow.splice(4, 1, false)
          document.getElementById('filechoose5').value = ''
          break
      }
      this.unadd = false
      this.listnum = 0
      for (let i = 0; i < this.listshow.length; i++) {
        if (this.listshow[i]) {
          if (this.listnum < 3) {
            this.liststyle.splice(i, 1, 'position:absolute;left:' + this.listnum * 150 + 'px;top:0;margin-left: 0px;display:block')
          } else {
            this.liststyle.splice(i, 1, 'position:absolute;left:' + (this.listnum - 3) * 150 + 'px;top:50px;margin-left: 0px;display:block')
          }
          this.listnum++
        } else {
          this.liststyle.splice(i, 1, 'display:none')
        }
      }
    },
    change (ev) {
      this.filesingle = ev.currentTarget.files[0]
      this.filename = ev.currentTarget.files[0].name
    },
    changemix (ev, ind) {
      switch (ind) {
        case 1:
          this.filenamemix1 = ev.currentTarget.files[0]
          this.filenamemixname1 = ev.currentTarget.files[0].name
          this.selected[0] = 'background:#d1e9fe;border:1px solid #d1e9fe;'
          break
        case 2:
          this.filenamemix2 = ev.currentTarget.files[0]
          this.filenamemixname2 = ev.currentTarget.files[0].name
          this.selected[1] = 'background:#d1e9fe;border:1px solid #d1e9fe;'
          break
        case 3:
          this.filenamemix3 = ev.currentTarget.files[0]
          this.filenamemixname3 = ev.currentTarget.files[0].name
          this.selected[2] = 'background:#d1e9fe;border:1px solid #d1e9fe;'
          break
        case 4:
          this.filenamemix4 = ev.currentTarget.files[0]
          this.filenamemixname4 = ev.currentTarget.files[0].name
          this.selected[3] = 'background:#d1e9fe;border:1px solid #d1e9fe;'
          break
        case 5:
          this.filenamemix5 = ev.currentTarget.files[0]
          this.filenamemixname5 = ev.currentTarget.files[0].name
          this.selected[4] = 'background:#d1e9fe;border:1px solid #d1e9fe;'
          break
      }
    },
    valid () {
      if (this.name.replace(/\s/gi, '') === '') {
        this.win(warntxt.resaddname, '', false)
        return false
      } else {
        if (this.fieltype < 4) {
          if (this.filesingle === '') {
            this.win(warntxt.resaddfile, '', false)
            return false
          } else {
            return true
          }
        } else if (this.fieltype >= 4) {
          let j = 0
          for (let i = 0; i < 5; i++) {
            if (!this['filenamemix' + (i + 1)]) {
              j++
            }
          }
          if (j === 5) {
            this.win(warntxt.resaddfile, '', false)
            return false
          } else {
            return true
          }
        }
      }
    },
    savedata () {
      if (!this.valid()) {
        return false
      }
      let that = this
      let params = {}
      params.par = {}
      params.par.resType = this.fieltype
      params.par.course = this.courseId
      params.par.lesson = this.lessonid
      params.par.isPublish = this.publishval * 1
      params.par.resourceName = this.name
      let formData = new FormData()
      if (this.fieltype < 4) {
        formData.append('file', this.filesingle)
      } else {
        for (let i = 0; i < 5; i++) {
          if (this['filenamemix' + (i + 1)]) {
            formData.append('file', this['filenamemix' + (i + 1)])
          } else {
            if (this.listshow[i]) {
              this.win(warntxt.addresource, '', false)
              return false
            }
          }
        }
      }
      this.show = 'display:block;line-height:495px;text-align:center;background: rgba(0, 0, 0, 0.5);font-size:24px;color:#fff;'
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.axios({
        method: 'post',
        url: addchampterresourceurl,
        data: formData,
        params: params,
        headers: config.headers,

        transformRequest: [function (data) {
          return data
        }],
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          that.upload_status=(complete-2)>0 ? complete-2:0;
        }

        // onUploadProgress: function (progressEvent) { // 原生获取上传进度的事件
        //   if (progressEvent.lengthComputable) {
        //     // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
        //     // 如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
        //     console.log(progressEvent.loaded)
        //     if (progressEvent.loaded === progressEvent.total) {
        //       that.show = ''
        //     }
        //   }
        // }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
          that.show = ''
          that.upload_status=0
        } else {
          that.upload_status=100;
          that.cancelfn()
          that.upload_status=0

        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.push({name: 'AJcourseManagechampter', query: {courseId: this.courseId}})
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
    if (obj) {
      this.lessonid = obj.id
      let that = this
      this.axios({
        method: 'post',
        url: listchampterurl,
        params: {
          par: {
            courseId: that.courseId
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.data
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['value'] = objs[item].lessonId
          temp[item]['txt'] = objs[item].lessonName
        }
        that.$Select({
          'data': temp,
          'selectId': 'select0',
          'callback': function (obj) {
            that.lessonid = obj.value
          },
          'matchval': [{val: that.lessonid}]
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    } else {
      this.win(types.back, this.cancelfn, false)
    }
  }
}
</script>

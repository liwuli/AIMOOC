<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.photoinfoN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
      <div class="content">{{rname}}-{{sex}}-{{code}}-{{college}}</div>
      <div class="list" :style="'height:' + wininfo.widhei[2]">
        <div class="wrap" style="width: 103%;">
          <div class="item" v-for="(item, ind) in usersList" @click="checkPhoto(item)" :style="item.iconId==iconId?'border-color: #3197fc':''">
            <img :src="item.localUrl" alt="">
          </div>
        </div>
      </div>
 			<div class="btnline">
        <div class="save" @click="setHead">{{basicinfo.setHeadN}}</div>
        <input type="file" @change="fileevent($event)" style="border:none;display: none;" :accept="uploadtype"/>
        <div class="save" @click="deldata">{{basicinfo.delN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import singlefile from '@/components/extend/singlefile'
import {delMatchImageUrl, updateUserurl, userIconsByIDurl, basicinfo, pathinfo, warntxt, phototype, batchuploadurl} from '@/module/admin/config/userinfo'
export default {
  name: 'AJusersinglephoto',
  data () {
    return {
      id: '',
      rname: '',
      sex: '',
      code: '',
      college: '',
      iconId: '',
      usersList: [],
      uploadtype: phototype,
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['560px', '400px', '275px'],
        btncancelleft: '305px',
        contenthei: '200px',
        contenttop: '30px',
        imagewid: '160px'
      },
      warntxt: warntxt
    }
  },
  components: {
    singlefile
  },
  methods: {
    async init () {
      try {
        const res = await this.axios.post(userIconsByIDurl, {userId: this.id})
        this.usersList = res.data.usersList
      } catch (err) {
        console.log(err)
      }
    },
    checkPhoto (item) {
      this.iconId = item.iconId
      this.iconUrl = item.localUrl
    },
    async setHead () {
      if (!this.iconUrl) {
        return
      }
      try {
        const res = await this.axios({
          method: 'post',
          url: updateUserurl,
          params: {
            params: {id: this.id, iconUrl: this.iconUrl}
          }
        })
        this.win(res.data.message, false, false)
      } catch (err) {
        console.log(err)
      }
    },
    deldata () {
      if (!this.iconId) {
        this.win('请选择照片')
        return
      } else{
        let that = this
        this.$Win({
          'title': types.title,
          'content': '确定删除照片?',
          'btn': [['.save', '确定', '130px'],['.cancel', '取消']],
          'cancel': function (obj) {
            obj.remove(obj.getid)
          },
          save: async function (obj) {
            obj.remove(obj.getid)
            try {
              const res = await that.axios.post(delMatchImageUrl, {iconId: that.iconId})
              if (res.data.isSuccess) {
                that.win(res.data.content, that.init, false)
              } else {
                that.win(res.data.content, false, false)
              }
            } catch (err) {
              console.log(err)
            }
          },
        })
      }
    },
    fileclick (ev) {
      ev.currentTarget.previousElementSibling.click()
    },
    fileevent (ev) {
      this.files = ev.currentTarget.files[0]
      let that = this
      let reader = new FileReader()
      reader.onload = function (e) {
        let data = e.target.result
        // 加载图片获取图片真实宽度和高度
        let image = new Image()
        image.onload = function () {
          let width = image.width
          let height = image.height
          if (width < 300 || height < 300) {
            that.win(warntxt.picwarn, '', false)
            this.files = ''
          } else {
            that.imgurl = data
          }
        }
        image.src = data
      }
      reader.readAsDataURL(this.files)

      let formData = new FormData()
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      formData.append('file', this.files)
      formData.append('code', this.code)
      this.axios({
        method: 'post',
        url: batchuploadurl,
        data: formData,
        headers: config.headers
      })
        .then(function (res) {
          that.win(res.data.errorMsg, that.cancelfn, false)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    savedata () {
      this.cancelfn()
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
  },
  watch: {
    '$route': 'init'
  },
  created () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.id
      this.rname = obj.rname
      this.sex = obj.sex
      this.code = obj.code
      this.college = obj.classesName || obj.school
    }
    this.init()
  }
}
</script>

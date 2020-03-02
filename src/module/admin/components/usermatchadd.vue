<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{classInfo}}</span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
      <div class="list" :style="'margin-top:' + wininfo.contenttop + ';height:' + wininfo.widhei[2]">
        <div class="wrap" style="width: 103%;">
          <div class="item" v-for="(item, ind) in classesStudentList" @click="checkPhoto(item)" :style="item.userId==userId?'border-color: #3197fc':''">
            <img :src="item.iconUrl" alt="">
            <div>{{item.realName}}</div>
          </div>
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
import singlefile from '@/components/extend/singlefile'
import {imageByClassIDUrl, matchStudentImageUrl, basicinfo, warntxt} from '@/module/admin/config/userinfo'
export default {
  name: 'AJusermatchadd',
  data () {
    return {
      classInfo: '',
      classesStudentList: [],
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['560px', '400px', '275px'],
        btncancelleft: '400px',
        contenthei: '200px',
        contenttop: '30px',
        imagewid: '160px'
      },
      warntxt: warntxt,
      userId: '',
      classesId: '',
      iconId: '',
      localUrl: '',
      stoareaId: ''
    }
  },
  components: {
    singlefile
  },
  methods: {
    async init () {
      let obj = this.$route.params.item
      if (!obj) {
        this.win(types.back, this.cancelfn, false)
      } else {
        this.classesId = obj.classesId
        this.iconId = obj.iconId
        this.localUrl = obj.localUrl
        this.stoareaId = obj.stoareaId
      }
      try {
        const res = await this.axios.post(imageByClassIDUrl, {classesId: this.classesId})
        this.classesStudentList = res.data.classesStudentList
        this.classInfo = res.data.classInfo
      } catch (err) {
        console.log(err)
      }
    },
    checkPhoto (item) {
      this.userId = item.userId
    },
    savedata () {
      if (!this.userId) {
        return
      }
      let that = this
      this.axios({
        method: 'post',
        url: matchStudentImageUrl,
        data: {
          userId: this.userId,
          iconId: this.iconId,
          localUrl: this.localUrl,
          stoareaId: this.stoareaId,
          classesId: this.classesId
        }
      })
      .then(function (res) {
        if (res.data.isSuccess) {
          that.win(warntxt.saveSuccess, that.cancelfn, false)
        } else {
          that.win(res.data.content, false, false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.go(-1)
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
  created () {
    this.init()
  }
}
</script>

<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
      <div v-if="multiple" class="content" :style="'overflow-y:auto;height:' + wininfo.contenthei[0]">
        <div><button class="button" type="button" v-for="item in tabN" @click="tabSource(item.value)" style="margin: 0 5px;">{{item.text}}</button>
        <button class="button" type="button" style="margin: 0 5px;" @click="downurlAll2">全部下载</button></div>
        <div class="formline" style="height: auto;">
          <a v-for="item in list" :href="item.url||(geturls + '?location=' + item.location + '&resourceId=' + item.resourceId + '&stoId=' + item.stoId)" :title="item.name" target="_blank" style="float: left;width: 140px;margin-right:10px;text-decoration: underline;">{{item.name}}</a>
        </div>
      </div>
      <div v-else class="content" :style="'height:' + wininfo.contenthei[1]">
            <div class="formline" style="height: 180px;overflow-y:auto;">
              <a :href="geturls + '?location=' + item.location + '&resourceId=' + item.resourceId + '&stoId=' + item.stoId" :title="item.name" v-for="item in info" class="txt hides" target="_blank" style="max-width: 200px;margin-right:10px;text-decoration: underline;">{{item.name}}</a>
            </div>
            <select v-model="type" @change="geturl" style="display:inline-block;padding: 5px;">
              <option v-for="item in options" :value="item.value">{{item.text}}</option>
            </select>
            <el-button size="small" style="margin-left: 30px;" @click="downurlAll">全部下载</el-button>
      </div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {tabN, basicinfo, pathinfo, geturl, downurl, definition, resourceDownPathUrl} from '@/module/admin/config/resourceinfo'
export default {
  name: 'AJresourcedown',
  data () {
    return {
      list: [],
      videoArr: [],
      pic: {},
      tabN: tabN,
      multiple: false,
      options: definition,
      msg: basicinfo.msgdownN,
      wininfo: {
        widhei: ['540px', '360px'],
        btncancelleft: '345px',
        contenthei: ['300px', '183px']
      },
      groupId: '',
      geturls: geturl,
      type: '',
      info: []
    }
  },
  methods: {
    downurlAll(){
      debugger
       this.info.forEach((item)=>{
         this.download(item.name,this.geturls +'?location='+ item.location+'&resourceId=' + item.resourceId + '&stoId=' + item.stoId)
       })
    },

    downurlAll2(){
       this.list.forEach((item)=>{         
         this.download(item.name,this.geturls +'?location='+ item.location+'&resourceId=' + item.resourceId + '&stoId=' + item.stoId)
       })
    },

   download(name, href) {
      var a = document.createElement("a"), //创建a标签
      e = document.createEvent("MouseEvents"); //创建鼠标事件对象
      e.initEvent("click", false, false); //初始化事件对象
      a.href = href; //设置下载地址
      a.download = name; //设置下载文件名
      a.dispatchEvent(e); //给指定的元素，执行事件click事件
  },

    tabSource (value) {
      this.list = value ? (this.pic[value] || []) : this.videoArr
    },
    async getDownPath () { // 智慧教学视频地址
      try {
        const res = await this.axios({
          method: 'post',
          url: resourceDownPathUrl,
          params: {params: {groupId: this.groupId, streamType: 0}}
        })
        this.list = this.videoArr = res.data.data || []
        this.pic = res.data.pic || []
      } catch (err) {
        console.log(err)
      }
    },
    geturl () { // 纯录制获取视频地址
      let that = this
      this.axios({
        method: 'post',
        url: downurl,
        params: {
          params: {
            groupId: that.groupId,
            streamType: that.type
          }
        }
      })
        .then(function (res) {
          if (res.status !== 200) {
            that.win(res.data.message, that.cancelfn, false)
          } else {
            that.info = res.data.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    cancelfn () {
      //this.$router.go(-1);
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
  created () {
    let obj = this.$route.params
    if (!obj.item) {
      this.win(types.back, this.cancelfn, false)
    }
    this.groupId = obj.item.downId
    if (obj.item.resourceFromWhere !== 4) {
      this.type = obj.type
      this.geturl()
    } else {
      this.multiple = true
      this.getDownPath()
    }
  }
}
</script>

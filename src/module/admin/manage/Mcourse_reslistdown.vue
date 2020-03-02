<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline" style="height: auto;">
		 			<span class="txt">{{warntxt.bq}}</span><a :href="item" :title="title[ind]" v-for="(item, ind) in infob" class="txt hides"  style="max-width: 200px;margin-right:10px;text-decoration: underline;">{{title[ind]}}</a>
			 	</div>
			 	<div class="formline" style="height: auto;">
		 			<span class="txt">{{warntxt.gq}}</span><a :href="item" :title="title[ind]" v-for="(item, ind) in infog" class="txt hides"  style="max-width: 200px;margin-right:10px;text-decoration: underline;">{{title[ind]}}</a>
			 	</div>
			 	<div class="formline" style="height: auto;">
		 			<span class="txt">{{warntxt.sq}}</span><a :href="item" :title="title[ind]" v-for="(item, ind) in infos" class="txt hides"  style="max-width: 200px;margin-right:10px;text-decoration: underline;">{{title[ind]}}</a>
			 	</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfores, warntxt, reslistgetresurl} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManageresdownlist',
  data () {
    return {
      msg: warntxt.download,
      warntxt: warntxt,
      wininfo: {
        widhei: ['500px', '300px'],
        btncancelleft: '345px',
        contenthei: '183px'
      },
      id: '',
      infob: [],
      infog: [],
      infos: [],
      title: [],
      courseId: '',
      downurl: '/base/resource/resouceDownloadForPlat?resourceId='
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.id
      this.getressee()
    }
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
    cancelfn () {
      this.$router.push({name: pathinfores.prex, query: {courseId: this.courseId}, params: {noreset: 'noreset'}})
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
    },
    getressee () {
      let that = this
      this.axios({
        method: 'post',
        url: reslistgetresurl,
        params: {
          par: {
            resourceId: that.id
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, that.cancelfn, false)
          return false
        } else {
          let objs = res.data
          objs.bq = objs.resourceIdList01
          objs.gq = objs.resourceIdList02
          objs.sq = objs.resourceIdList03
          that.infos['model'] = []
          if (objs.bq.length > 0) {
            for (let item = 0; item < objs.bq.length; item++) {
              that.infob.push(that.downurl + objs.bq[item])
            }
            that.title = objs.titleList
          }
          if (objs.gq.length > 0) {
            for (let item = 0; item < objs.gq.length; item++) {
              that.infog.push(that.downurl + objs.gq[item])
            }
            that.title = objs.titleList
          }
          if (objs.sq.length > 0) {
            for (let item = 0; item < objs.sq.length; item++) {
              that.infos.push(that.downurl + objs.sq[item])
            }
            that.title = objs.titleList
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

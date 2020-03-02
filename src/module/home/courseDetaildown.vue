<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline" style="height: auto;" v-show="infob.length > 0">
			 		<span class="txt" style="width: 100%;">{{warntxt.B}}</span>
		 			<a :href="item" :title="title[ind]" v-for="(item, ind) in infob" class="txt hides" target="_blank" style="max-width: 200px;margin-right:10px;text-decoration: underline;">{{title[ind]}}</a>
			 	</div>
			 	<div class="formline" style="height: auto;" v-show="infoh.length > 0">
			 		<span class="txt" style="width: 100%;">{{warntxt.G}}</span>
		 			<a :href="item" :title="title[ind]" v-for="(item, ind) in infoh" class="txt hides" target="_blank" style="max-width: 200px;margin-right:10px;text-decoration: underline;">{{title[ind]}}</a>
			 	</div>
			 	<div class="formline" style="height: auto;" v-show="infos.length > 0">
			 		<span class="txt" style="width: 100%;">{{warntxt.S}}</span>
		 			<a :href="item" :title="title[ind]" v-for="(item, ind) in infos" class="txt hides" target="_blank" style="max-width: 200px;margin-right:10px;text-decoration: underline;">{{title[ind]}}</a>
			 	</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {pathinfodetail, warntxt} from '@/module/home/config/courseinfo'
export default {
  name: 'FcourseDetaildown',
  data () {
    return {
      msg: warntxt.downres,
      warntxt: warntxt,
      wininfo: {
        widhei: ['500px', '405px'],
        btncancelleft: '345px',
        contenthei: '288px'
      },
      id: '',
      type: '',
      infob: [],
      infoh: [],
      infos: [],
      title: []
    }
  },
  methods: {
    cancelfn () {
      this.$router.push({
        name: pathinfodetail.prex,
        query: {
          courseId: this.geturlparam('courseId', location.hash),
          lessonId: this.geturlparam('lessonId', location.hash)
        }
      })
    },
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
    let obj = this.$route.params.downlist
    if (obj) {
      this.infob = obj.B
      this.infoh = obj.G
      this.infos = obj.S
      this.title = obj.T
    } else {
      this.win(types.back, this.cancelfn, false)
    }
  }
}
</script>

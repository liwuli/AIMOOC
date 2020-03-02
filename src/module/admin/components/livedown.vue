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
import {pathinfo, livedownurl, warntxt} from '@/module/admin/config/liveinfo'
export default {
  name: 'AJlivedown',
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
      title: [],
			liveFromWhere:null,
			lessonId:null
			
    }
  },
  methods: {
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
    },
    geturl () {          
      let that = this
      this.axios({
        method: 'post',
        url: livedownurl,
        params: {
          par: {
            liveId: that.id,
						liveFromWhere:that.liveFromWhere,
						lessonId:that.lessonId
          }
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, that.cancelfn, false)
        } else {
          that.infob = res.data.resList01
          that.infoh = res.data.resList02
          that.infos = res.data.resList03
          that.title = res.data.titleList
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    let obj = this.$route.params
    this.type = obj.type
    this.id = obj.item.id
		this.liveFromWhere = obj.item.liveFromWhere
		this.lessonId = obj.item.lessonId
    this.geturl()
  }
}
</script>

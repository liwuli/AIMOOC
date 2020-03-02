<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
 				<div class="formline" style="margin-bottom: 10px;">
			 		<span class="txt">{{warntxt.jiangN}} {{resname}} {{warntxt.fromN}} {{lessonname}} {{warntxt.movetoN}}</span>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{champterN}}:</span>
					<div id='select83'  style="margin-top: 3px;width:220px"></div>
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
import {pathinfores, resmoveN, saveN, cancelN, warntxt, champterN, editchampterresourceurl, listchampterurl} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJMcourseManagereslistmove',
  data () {
    return {
      msg: resmoveN,
      warntxt: warntxt,
      champterN: champterN,
      saveN: saveN,
      cancelN: cancelN,
      resname: '',
      wininfo: {
        widhei: ['576px', '295px'],
        btncancelleft: '215px',
        contenthei: '168px'
      },
      courseId: '',
      champter: '',
      sourceid: '',
      lessonname: ''
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
    savedata () {
      let that = this
      this.axios({
        method: 'post',
        url: editchampterresourceurl,
        params: {
          params: {
            lesson: that.lessonid,
            resourceId: that.sourceid
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.message, '', false)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
    getlesson () {
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
          'selectId': 'select83',
          'callback': function (obj) {
            that.lessonid = obj.value
          },
          'matchval': [{val: that.lessonid}]
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    let obj = this.$route.params.item
    if (obj) {
      this.lessonid = obj.lessonid
      this.lessonname = obj.champter
      this.resname = obj.name
      this.sourceid = obj.id
      this.getlesson()
    } else {
      this.win(types.back, this.cancelfn, false)
    }
  }
}
</script>

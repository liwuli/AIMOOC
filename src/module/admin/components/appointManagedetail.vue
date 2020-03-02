<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.msgdetailsN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.detailnameN}}：</span>
			 		{{item.room}}
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.detailuserN}}：</span>
			 		{{item.user}}
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.detailtimeN}}：</span>
			 		{{item.time}}
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.detailphoneN}}：</span>
			 		{{item.phone}}
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.detailreasonN}}：</span>
			 		{{item.remarks}}
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.detailstateN}}：</span>
			 		{{item.state}}
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.detailliveN}}：</span>
			 		{{item.living ? basicinfo.detailyesN : basicinfo.detailnoN}}
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.detailrecordN}}：</span>
			 		{{item.record ? basicinfo.detailyesN : basicinfo.detailnoN}}
			 	</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {basicinfo, pathinfo} from '@/module/admin/config/appointinfo'
export default {
  name: 'AJappointManagedel',
  data () {
    return {
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['700px', '470px'],
        contenthei: '316px'
      },
      ids: '',
      item: ''
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
    }
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.item = obj
    }
  }
}
</script>

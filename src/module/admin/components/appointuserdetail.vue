<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.msgdetailsN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'width:890px;height:' + wininfo.contenthei">
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.detailnameN}}：</span>
			 		{{item.name}}
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.detaildateN}}：</span>
			 		{{dateval}}
			 	</div>
			 	<div class='AA_listhead' >
					<div class='item' :class="percentinfo[ind]" v-for='(item, ind) in listhead'>
						{{item}}
					</div>
				</div>
				<div class='AA_list' >
					<div class="scrollfather" :id="scrollfather" :style="'width:890px;' + 'height:417px;'">
						<div class="scrollson" >
							<div class="lists"  v-for='item in datesinfo'>
								<div class="item hides" :class="percentinfo[ind]"  v-for='(items, ind) in optevent'>
									{{item[items] }}
								</div>
							</div>
						</div>
						<div class="scroll_ymove">
							<div class="scroll_y" ></div>
						</div>
						<div class="scroll_xmove">
							<div class="scroll_x"></div>
						</div>
					</div>
				</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {basicinfo, pathinfo, getdetailurl, listhead, optevent, percentinfo} from '@/module/admin/config/appointuserinfo'
export default {
  name: 'AJappointuserdetail',
  data () {
    return {
      basicinfo: basicinfo,
      listhead: listhead,
      optevent: optevent,
      percentinfo: percentinfo,
      scrollfather: 'classlist',
      scroll: false,
      wininfo: {
        widhei: ['909px', '561px'],
        btncancelleft: '735px',
        contenthei: '500px'
      },
      use: basicinfo.use,
      nouse: basicinfo.nouse,
      item: '',
      roomval: '',
      dateval: '',
      datesinfo: ''
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
    pagepost () { // 获取列表
      let dataval = {}
      if (this.roomval) {
        dataval.classroomId = this.roomval
      }
      dataval.templateList = [{startDate: this.dateval + ' ' + '00:00:00', endDate: this.dateval + ' ' + '23:59:59'}]
      let that = this
      this.axios({
        method: 'post',
        url: getdetailurl,
        data: dataval
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.result
        for (let i = 0; i < objs.length; i++) {
          temp.push({classs: basicinfo.pinkpre + (i + 1) + basicinfo.pinknext, state: objs[i].status === 0 ? that.nouse : that.use, time: objs[i].start + '--' + objs[i].end})
        }
        that.datesinfo = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.roomval = obj.id
      this.dateval = obj.dates
      this.item = obj
      this.pagepost()
    }
  },
  updated () {
    if (!this.scroll) {
      this.scroll = this.$Scroll({
        'father': 'classlist',
        'getfatheridPosition': document.querySelector('#classlist'),
        'scrollels': '.app'
      })
    } else {
      this.scroll.addElement()
    }
  }
}
</script>

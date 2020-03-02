<style type="text/css">
	.classroomlist{
		float: left;
		min-height: 30px;
		position: relative;
		width: 100%;
	}
	.classroomlist span{
		box-shadow: 0 1px 0 0px #4e4e4e;
		float: left;
		min-height: 30px;
		line-height: 30px;
		position: relative;
		text-align: center;
		width: 100%;
	}
	.classroomlist span.selected{
	   background: #4e4e4e;
	   color: #fff;
	}
	.classroomlist span.disable{
	   background: #ccc;
	   color: #4e4e4e;
	}
</style>
<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.msgaddN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
 				<div style="float: left;height: 100%;width: 50%;">
 					<div class="formline">
				 		<span class="txt">{{basicinfo.detailnameN}}：</span>
				 		{{item.name}}
				 	</div>
				 	<div class="formline">
				 		<span class="txt">{{basicinfo.detaildateN}}：</span>
				 		{{item.dates}}
				 	</div>
 					<div class="formline">
				 		<span class="txt">{{basicinfo.timeN}}<i>*</i>：</span>
				 		<div class="scrollfather" :id="scrollfather" :style="'width:200px;' + 'height:200px;box-shadow: 0 0 0 1px #4e4e4e;'">
							<div class="scrollson" >
								<div class="classroomlist" v-for="(item, ind) in datesinfo">
									<span v-if="item.state === 0" :class="selectarr[ind]" @click="classroomevent(item, ind)" >{{item.time}}</span>
									<span v-if="item.state !== 0" :class="selectarr[ind]" >{{item.time}}</span>
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
 				<div style="float: left;height: 100%;width: 50%;">
 					<div class="formline">
				 		<span class="txt">{{basicinfo.detailuserN}}：</span>
				 		{{item.user}}
				 	</div>
				 	<div class="formline">
				 		<span class="txt">{{basicinfo.detailphoneN}}<i>*</i>：</span>
				 		<input type="text" v-model="phone" :value="phone"/>
				 	</div>
				 	<div class="formline">
				 		<span class="txt">{{basicinfo.detailreasonN}}<i>*</i>：</span>
				 		<textarea name="" rows="" cols="" v-model="des"></textarea>
				 	</div>
				 	<div class="formline">
				 		<span class="txt">{{basicinfo.detailliveN}}：</span>
				 		<Radio :type="add" @radioevent="liveevent" :radioinfo="radioinfolive"></Radio>
				 	</div>
				 	<div class="formline">
				 		<span class="txt">{{basicinfo.detailrecordN}}：</span>
				 		<Radio :type="add" @radioevent="recordevent" :radioinfo="radioinforecord"></Radio>
				 	</div>
 				</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="savedata">{{basicinfo.addN}}</div>
 			</div>
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import Radio from '@/components/extend/radio'
import {basicinfo, pathinfo, useraddappointurl, radioinfolive, radioinforecord, getdetailurl} from '@/module/admin/config/appointuserinfo'
export default {
  name: 'AJappointuseradd',
  data () {
    return {
      basicinfo: basicinfo,
      add: 'add',
      wininfo: {
        widhei: ['700px', '470px'],
        btncancelleft: '545px',
        contenthei: '253px'
      },
      scrollfather: 'classroom',
      item: '',
      des: '',
      radioinfolive: radioinfolive,
      radioinforecord: radioinforecord,
      datesinfo: '',
      scroll: false,
      selectarr: [],
      record: 0,
      live: 0,
      user: '',
      details: [],
      phone: ''
    }
  },
  methods: {
    classroomevent (item, ind) {
      if (this.selectarr[ind] !== '') {
        this.selectarr.splice(ind, 1, '')
        this.details.splice(ind, 1, '')
      } else {
        this.details.splice(ind, 1, {startDate: this.dateval + ' ' + item.start + ':00', endDate: this.dateval + ' ' + item.end + ':00'})
        this.selectarr.splice(ind, 1, 'selected')
      }
    },
    recordevent (obj) {
      this.record = obj.val
    },
    liveevent (obj) {
      this.live = obj.val
    },
    check () {
      if (this.details.length) {
        let temp = []
        for (let i = 0; i < this.details.length; i++) {
          if (this.details[i] !== '') {
            temp.push(this.details[i])
          }
        }
        this.details = temp
      } else {
        this.win(basicinfo.classN, '', false)
        return false
      }
      if (!this.phone) {
        this.win(basicinfo.phoneN, '', false)
        return false
      }
      if (!this.des) {
        this.win(basicinfo.reasonN, '', false)
        return false
      }
      if (this.details.length > 0 && this.phone && this.des) {
        return true
      }
    },
    savedata () {
      if (this.check()) {
        let bookingtype = ''
        if (this.item.dailyrecord) {
          bookingtype = this.item.dailyrecord
        } else if (this.item.controlrecord) {
          bookingtype = this.item.controlrecord
        }
        let that = this
        this.axios({
          method: 'post',
          url: useraddappointurl,
          data: {
            classroom: that.item.id,
            isLiving: that.live,
            isRecord: that.record,
            remarks: that.des,
            bookingName: that.item.name,
//          booker: that.user,
            details: that.details,
            bookingType: bookingtype,
            telephone: that.phone
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
      }
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
    },
    pagepost () { // 获取列表
      let dataval = {}
      if (this.roomval) {
        dataval.classroomId = this.item.id
      }
      dataval.templateList = [{startDate: this.item.dates + ' ' + '00:00:00', endDate: this.item.dates + ' ' + '23:59:59'}]
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
          if (parseInt(objs[i].status) === 0) {
            that.selectarr[i] = ''
          } else {
            that.selectarr[i] = 'disable'
          }
          temp.push({state: parseInt(objs[i].status), time: objs[i].start + '--' + objs[i].end, start: objs[i].start, end: objs[i].end})
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
        'father': 'classroom',
        'getfatheridPosition': document.querySelector('#classroom'),
        'scrollels': '.app'
      })
    } else {
      this.scroll.addElement()
    }
  },
  components: {
    Radio
  }
}
</script>

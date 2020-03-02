<style type="text/css">
	.appointtermlist{
		float: left;
		min-height: 30px;
		line-height: 30px;
		margin-bottom: 10px;
		width: 100%;
	}
	.appointtermlist span{
		border-radius: 3px;
		float: left;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		padding: 0 5px;
		width: auto;
	}
	.appointtermlist span.selected{
		background: #4e4e4e;
		color: #fff;
	}
	.addlist {
		float: left;
		height: 30px;
		width: 100%;
	}
	.addlist .txts{
		float: left;
		line-height: 30px;
		padding: 0 10px;
		width: auto;
	}
</style>
<template>
 	<div class="formwin">
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]">
 			<div class="title">
 				<span class="menuname">{{basicinfo.msgtimeN}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'width:680px;height:' + wininfo.contenthei">
			
			<div class="scrollfather" :id="scrollfather" :style="'width:680px;' + 'height:' + wininfo.contenthei+ ';'">
				<div class="scrollson" >
					<div class="appointtermlist">
						<span>{{basicinfo.termN}}：</span>
						<span class="cursor" :class="termselect[ind]" v-for="(item, ind) in termarr" @click="termevent(item, ind)">{{item.name}}</span>
					</div>
					<div class="addlist" v-for="(item, ind) in jieci" style="margin-bottom: 5px;">
						<span class="txts">{{basicinfo.pinkpre}}{{item.pink}}{{basicinfo.pinknext}}</span>
						<input type="number" :disabled="item.disabled" :value ="item.hour"  min="0" max="23" step="1" />
						<span class="txts">{{basicinfo.hourN}}</span>
						<input  type="number" :disabled="item.disabled"  :value ="item.minutes"   min="0" max="59" step="1" />
						<span class="txts">{{basicinfo.minutesN}}&nbsp;&nbsp;&nbsp;&nbsp;----</span>
						<input type="number" :disabled="item.disabled"  :value ="item.hour1"    min="0" max="23" step="1" />
						<span class="txts">{{basicinfo.hourN}}</span>
						<input  type="number" :disabled="item.disabled"  :value ="item.minutes1"   min="0" max="59" step="1" />
						<span class="txts">{{basicinfo.minutesN}}</span>
						<div class="add" v-if="ind === jieci.length - 1" @click="delevent(item, ind)" style="border:none;border-radius: 3px;margin-right: 10px;">{{basicinfo.delN}}</div>
						<div class="add" @click="editevent(item, ind)" style="border:none;border-radius: 3px;">{{basicinfo.editN}}</div>
					</div>
					<div class="addlist">
						<span class="txts">{{basicinfo.pinkpre}}{{pink}}{{basicinfo.pinknext}}</span>
						<input type="number" v-model="hour" min="0" max="23" step="1" />
						<span class="txts">{{basicinfo.hourN}}</span>
						<input  type="number" v-model="minutes" min="0" max="59" step="1" />
						<span class="txts">{{basicinfo.minutesN}}&nbsp;&nbsp;&nbsp;&nbsp;----</span>
						<input type="number" v-model="hour1"  min="0" max="23" step="1" />
						<span class="txts">{{basicinfo.hourN}}</span>
						<input  type="number" v-model="minutes1" min="0" max="59" step="1" />
						<span class="txts">{{basicinfo.minutesN}}</span>
						<div class="add" @click="addevent" style="border:none;border-radius: 3px;">{{basicinfo.addN}}</div>
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
 			<!--<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{cancelN}}</div>
 				<div class="save" @click="savedata">{{saveN}}</div>
 			</div>-->
 		</div>
 	</div>
</template>

<script>
import * as types from '@/store/win-types'
import {basicinfo, pathinfo, deltimeurl, timelisturl, edittimeurl, addtimeurl, termurl} from '@/module/admin/config/appointinfo'
export default {
  name: 'AJappointtime',
  data () {
    return {
      basicinfo: basicinfo,
      wininfo: {
        widhei: ['700px', '390px'],
        btncancelleft: '545px',
        contenthei: '303px'
      },
      pink: 1,
      msgcompare: basicinfo.msgcompare,
      hour: 0,
      minutes: 0,
      hour1: 0,
      minutes1: 0,
      scrollfather: 'scrollfather',
      termarr: '',
      termselect: '',
      scroll: '',
      jieci: [],
      editflag: false,
      termid: ''
    }
  },
  methods: {
    termevent (item, ind) {
      this.termselect = []
      this.termselect[ind] = 'selected'
      this.termid = item.id
    },
    addevent () {
      if (this.editflag) { // 保存操作
        this.jieci.splice(this.pink - 1, 1, {hour: this.hour, hour1: this.hour1, minutes: this.minutes, minutes1: this.minutes1, pink: this.pink, disabled: 'true'})
        this.editflag = false
        this.editdata({hour: this.hour, hour1: this.hour1, minutes: this.minutes, minutes1: this.minutes1, pink: this.pink, url: edittimeurl})
        this.pink = this.jieci.length + 1
        this.hour = this.jieci[this.jieci.length - 1].hour1
        this.hour1 = this.jieci[this.jieci.length - 1].hour1
        this.minutes = this.jieci[this.jieci.length - 1].minutes1
        this.minutes1 = this.jieci[this.jieci.length - 1].minutes1
      } else { // 添加操作
        this.pink = this.jieci.length + 1
        this.jieci.push({hour: this.hour, hour1: this.hour1, minutes: this.minutes, minutes1: this.minutes1, pink: this.pink, disabled: 'true'})
        this.savedata({hour: this.hour, hour1: this.hour1, minutes: this.minutes, minutes1: this.minutes1, pink: this.pink, url: addtimeurl})
        this.hour = this.hour1
        this.hour1 = this.hour1
        this.minutes = this.minutes1
        this.minutes1 = this.minutes1
      }
    },
    editevent (item, ind) {
      this.hour = item.hour
      this.hour1 = item.hour1
      this.minutes = item.minutes
      this.minutes1 = item.minutes1
      this.pink = item.pink
      this.editflag = true
    },
    delevent (item, ind) {
      this.jieci.splice(ind, 1)
      this.pink = this.jieci.length
      this.deldata(item)
    },
    deldata (obj) {
      let that = this
      this.axios({
        method: 'post',
        url: deltimeurl,
        data: {
          bookingTemplateId: obj.id
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.content, '', false)
        } else {
          that.getdata()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    savedata (obj) {
      let that = this
      if (obj.hour > obj.hour1 || obj.hour === obj.hour1 && obj.minutes > obj.minutes1) {
        that.win(that.msgcompare, '', false)
      } else {
        this.axios({
          method: 'post',
          url: obj.url,
          data: {
            term: that.termid,
            startDate: (obj.hour < 10 ? '0' + obj.hour : obj.hour) + ':' + (obj.minutes < 10 ? '0' + obj.minutes : obj.minutes),
            endDate: (obj.hour1 < 10 ? '0' + obj.hour1 : obj.hour1) + ':' + (obj.minutes1 < 10 ? '0' + obj.minutes1 : obj.minutes1),
            status: 1,
            isLiving: 1
          }
        })
        .then(function (res) {
          if (res.data.code !== 200) {
            that.win(res.data.content, '', false)
          } else {
            that.getdata()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    editdata (obj) {
      let that = this
      if (obj.hour > obj.hour1 || obj.hour === obj.hour1 && obj.minutes > obj.minutes1) {
        that.win(that.msgcompare, '', false)
      } else {
        this.axios({
          method: 'post',
          url: obj.url,
          params: {
            params: {
              term: that.termid,
              startDate: (obj.hour < 10 ? '0' + obj.hour : obj.hour) + ':' + (obj.minutes < 10 ? '0' + obj.minutes : obj.minutes),
              endDate: (obj.hour1 < 10 ? '0' + obj.hour1 : obj.hour1) + ':' + (obj.minutes1 < 10 ? '0' + obj.minutes1 : obj.minutes1),
              status: 1,
              bookingTemplateId: obj.id,
              isLiving: 1
            }
          }
        })
        .then(function (res) {
          if (res.data.code !== 200) {
            that.win(res.data.content, '', false)
          } else {
            that.getdata()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    getdata () {
      let that = this
      this.axios({
        method: 'post',
        url: timelisturl,
        params: {
          params: {
            term: that.termid
          }
        }
      })
      .then(function (res) {
        if (res.data.code !== 200) {
          that.win(res.data.content, '', false)
        } else {
          that.jieci = []
          let obj = res.data.result
          for (let i = 0; i < obj.length; i++) {
            that.jieci.push({id: obj[i].bookingTemplateId, hour: obj[i].startDate.split(':')[0], hour1: obj[i].endDate.split(':')[0], minutes: obj[i].startDate.split(':')[1], minutes1: obj[i].endDate.split(':')[1], pink: i + 1, disabled: 'true'})
            if (i === obj.length - 1) {
              that.hour = obj[i].endDate.split(':')[0] * 1
              that.hour1 = that.hour
              that.minutes = obj[i].endDate.split(':')[1] * 1
              that.minutes1 = that.minutes
              that.pink = i + 1
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
  mounted () {
  },
  created () {
    let that = this
    this.axios({
      method: 'post',
      url: termurl,
      data: {
        page: {
          pageSize: 10000,
          pageIndex: 1
        },
        keywords: ''
      }
    })
    .then(function (res) {
      let temp = []
      for (let item = 0; item < res.data.termList.length; item++) {
        if (item === 0) {
          that.termid = res.data.termList[item].termId
        }
        temp[item] = {}
        temp[item]['id'] = res.data.termList[item].termId
        temp[item]['name'] = res.data.termList[item].termName
        if (!that.termselect) {
          that.termselect = []
          that.termselect[item] = 'selected'
        } else {
          that.termselect[item] = ''
        }
      }
      that.termarr = temp
      that.getdata()
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  updated () {
    if (!this.scroll) {
      this.scroll = this.$Scroll({
        'father': 'scrollfather',
        'getfatheridPosition': document.querySelector('.formwin'),
        'scrollels': '.app'
      })
    } else {
      this.scroll.addElement()
    }
  }
}
</script>

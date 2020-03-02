<style type="text/css">
	.AA_right .G_search .part input{
		width: 120px;
	}
	.railccondition{
		box-shadow:0 0 0 1px #4e4e4e;
		float: left;
		min-height: 120px;
		margin-top: 1px;
		width: 100%;
	}
	.railccondition .list{
		box-shadow: 0 1px 0 0 #4e4e4e;
		float: left;
		min-height: 30px;
		width: 100%;
	}
	.railccondition .list .txt{
		float: left;
		height: 30px;
		line-height: 30px;
		text-indent: 10px;
		width: 100px;
	}
	.railccondition .list .lists{
		float: left;
		line-height: 30px;
		min-height: 30px;
		width: 880px;
	}
	.railccondition .list .lists span{
		border-radius: 3px;
		cursor: pointer;
		float: left;
		line-height: 20px;
		padding: 0 5px;
		margin: 5px 5px;
		width: auto;
	}
	.railccondition .list .lists span.selected{
		background: #4e4e4e;
		color: #fff;
	}
	.addtime,.appointtime,.historytime,.anoucement{
		background: #4e4e4e;
		border-radius: 3px;
		color: #fff;
		cursor: pointer;
		float: left;
		height: 30px;
		line-height: 30px;
		padding: 0 5px;
		margin-left: 10px;
		width: auto;
	}
	.appointlist{
		float: left;
		width: 100%;
	}
	.appointlist .aplist{
		border:1px solid #4e4e4e;
		border-radius: 5px;
		float: left;
		height: 100px;
		line-height: 30px;
		margin: 15px 5px;
		text-align: center;
		width: 150px;
	}
	.appointlist .aplist span{
		float: left; 
    	height: 100%;
        width: 100%;
	}
</style>
<template>
  <div class="app">
  	<Ghead></Ghead>
  	
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<AJposition :pathobj = "pathobj"></AJposition>
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<div class="optline" style="margin-bottom: 10px;">
    				<div class="addtime" @click='timeMevent'>{{basicinfo.timeManageN}}</div>
    				<div class="appointtime" @click='appointManageevent'>{{basicinfo.appointManageN}}</div>
    				<div class="historytime" @click='appointhistoryevent'>{{basicinfo.historyManageN}}</div>
    				<div class="anoucement" @click='anoucementevent'>{{basicinfo.anoucementN}}</div>
    			</div>
    			<div class="G_search">
    				<div class="part" >
				 	  <span class="txt">{{basicinfo.SroomN}}:</span>
				 	  <input type="text" v-model="roomid" :value='roomid'/>
				 	</div>
				 	<div class="part" >
				 	  <span class="txt">{{basicinfo.dateN}}:</span>
				 	  <Calendarme  :inputstyle="styles" :dateval="dateval" :valshow="valshow" :part= "part" :ymdhms="ymdhms"   @startfn="startfn" :ids="start"></Calendarme>
				 	</div>
				 	<div class="btn" @click="pagepost" style="border-radius: 3px;float: right;">{{basicinfo.searchN}}</div>
    			</div>
		        <Railc :railid="appointdates" :show="show" :days="days" :lostday="lostday" @lessevent="lessevent" @addevent="addevent" @railcevent="railcevent" :dateval="dateval" :titleinfo="comments"></Railc>
		        <div class="railccondition">
					<div class="list">
						<span class="txt">{{basicinfo.timeN}}:</span>
						<div class="lists">
							<span :class="dateselect[0]"  @click="dateevent('', '')">{{basicinfo.allN}}</span>
							<span :class="dateselect[ind + 1]" v-for="(item, ind) in datesinfo" @click="dateevent(item, ind)">
								{{item.sdate}}--{{item.edate}}
							</span>
						</div>
					</div>
					<div class="list">
						<span class="txt">{{basicinfo.buildingN}}:</span>
						<div class="lists">
							<span :class="roomselect[0]" @click="buildevent('', '')">{{basicinfo.allN}}</span>
							<span :class="roomselect[ind + 1]" v-for="(item, ind) in roominfo" @click="buildevent(item, ind)">
								{{item.name}}
							</span>
						</div>
					</div>
					<div class="list">
						<span class="txt">{{basicinfo.typeN}}:</span>
						<div class="lists">
							<span :class="typeselect[0]" @click="typeevent('', '')">{{basicinfo.allN}}</span>
							<span :class="typeselect[ind + 1]" v-for="(item, ind) in typearr" @click="typeevent(item, ind)">
								{{item}}
							</span>
						</div>
					</div>
					<div class="list">
						<span class="txt">{{basicinfo.stateN}}:</span>
						<div class="lists">
							<span :class="stateselect[0]" @click="stateevent('', '')">{{basicinfo.allN}}</span>
							<span  :class="stateselect[ind + 1]"v-for="(item, ind) in statearr" @click="stateevent(item, ind)">
								{{item}}
							</span>
						</div>
					</div>
		        </div>
		        <div class="appointlist">
		        	<div class="aplist"   @click='detailevent(item)'  v-for="(item, ind) in apinfo">
		        		<span v-if="item.state" style="background: #4e4e4e;color:#fff">{{item.name}}--{{item.use}}</span>
		        		<span v-if="!item.state" >{{item.name}}--{{item.nouse}}</span>
		        	</div>
		        	
		        </div>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import Calendarme from '@/components/extend/calendar.vue'
import Railc from '@/components/extend/railc'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {basicinfo, timelisturl, findtimesurl, listurl, pathinfo, statearr, typearr, roomurl, pagesize} from '@/module/admin/config/appointinfo'
export default {
  name: 'AJappoint',
  data () {
    return {
      basicinfo: basicinfo,
      use: basicinfo.use,
      nouse: basicinfo.nouse,
      statearr: statearr,
      typearr: typearr,
      show: false,
      days: 14,
      appointdates: 'appointdates',
      ymdhms: 'ymd',
      valshow: true,
      dates: '',
      dateval: '',
      start: 'start',
      styles: '',
      roomid: '',
      part: document.body,
      roominfo: '',
      datesinfo: '',
      dateselect: ['selected'],
      roomselect: ['selected'],
      typeselect: ['selected'],
      stateselect: ['selected'],
      roomval: '',
      appointdateval: '',
      stateval: '',
      typeval: '',
      pathinfo: pathinfo,
      appointdate: [],
      tempbuild: {},
      tempdate: {},
      termid: '',
      apinfo: []
    }
  },
  created () {
    let that = this
    this.axios({
      method: 'post',
      url: roomurl,
      params: {
        params: {
          pageSize: 100000,
          pageIndex: 1
        }
      }
    })
    .then(function (res) {
      let temp = []
      let objs = res.data.result.data
      for (let item = 0; item < objs.length; item++) {
        if (item < pagesize) {
          temp[item] = {}
          temp[item]['id'] = objs[item].buildingId
          temp[item]['name'] = objs[item].buildingName
          temp[item]['des'] = objs[item].buildingDescription
          that.roomselect[item + 1] = ''
        }
      }
      that.roominfo = temp
    })
    .catch(function (error) {
      console.log(error)
    })
    this.axios({
      method: 'post',
      url: findtimesurl,
      params: {
        params: {
          pageSize: 100000,
          pageIndex: 1
        }
      }
    })
    .then(function (res) {
      that.termid = res.data.termId
      if (that.termid) {
        that.gettime()
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist,
    Calendarme,
    Railc
  },
  methods: {
    timeMevent () {
      this.$router.push({'name': this.pathinfo.prex + 'time'})
    },
    appointManageevent () {
      this.$router.push({'name': this.pathinfo.prex + 'Manage'})
    },
    appointhistoryevent () {
      this.$router.push({'name': this.pathinfo.prex + 'History'})
    },
    anoucementevent () {
      this.$router.push({'name': this.pathinfo.prex + 'anounce'})
    },
    detailevent (item) {
      this.$router.push({'name': this.pathinfo.prex + 'detail', params: {item: item}})
    },
    dateevent (item, ind) {
      if (item !== '') {
        this.dateselect.splice(0, 1, '')
        if (this.dateselect[ind + 1]) {
          this.dateselect.splice(ind + 1, 1, '')
        } else {
          this.dateselect.splice(ind + 1, 1, 'selected')
        }
      } else {
        this.dateselect = []
        this.tempdate = {}
        if (this.dateselect[0]) {
          this.dateselect.splice(0, 1, '')
        } else {
          this.dateselect.splice(0, 1, 'selected')
        }
      }
      if (this.tempdate[item.id]) {
        delete this.tempdate[item.id]
      } else {
        this.tempdate[item.id] = {sdate: item.sdate, edate: item.edate}
      }
      this.appointdateval = []
      for (let i in this.tempdate) {
        this.appointdateval.push({sdate: this.tempdate[i].sdate, edate: this.tempdate[i].edate})
      }
    },
    buildevent (item, ind) {
      if (item !== '') {
        this.roomselect.splice(0, 1, '')
        if (this.roomselect[ind + 1]) {
          this.roomselect.splice(ind + 1, 1, '')
        } else {
          this.roomselect.splice(ind + 1, 1, 'selected')
        }
      } else {
        this.roomselect = []
        this.tempbuild = []
        if (this.roomselect[0]) {
          this.roomselect.splice(0, 1, '')
        } else {
          this.roomselect.splice(0, 1, 'selected')
        }
      }
      if (this.tempbuild[item.id]) {
        delete this.tempbuild[item.id]
      } else {
        this.tempbuild[item.id] = item.id
      }
      this.roomval = []
      for (let k in this.tempbuild) {
        this.roomval.push(k)
      }
    },
    typeevent (item, ind) {
      this.typeselect = []
      if (item !== '') {
        this.typeselect[ind + 1] = 'selected'
      } else {
        this.typeselect[0] = 'selected'
      }
      if (ind === 0) {
        this.typeval = 'daily'
      } else {
        this.typeval = 'control'
      }
    },
    stateevent (item, ind) {
      this.stateselect = []
      if (item !== '') {
        this.stateselect[ind + 1] = 'selected'
      } else {
        this.stateselect[0] = 'selected'
      }
      this.stateval = ind
    },
    railcevent (obj) {
      this.dates = this.formcat(obj)
    },
    startfn (obj) {
      this.dates = this.formcat(obj)
      this.dateval = this.formcat(obj)
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
    },
    gettime () {
      let that = this
      this.axios({
        method: 'post',
        url: timelisturl
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.result
        for (let i = 0; i < objs.length; i++) {
          temp.push({sdate: objs[i].startDate, edate: objs[i].endDate, id: objs[i].bookingTemplateId})
        }
        that.datesinfo = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    pagepost () { // 获取列表
      let dataval = {}
      if (this.roomval.length > 0 || this.roomval) {
        dataval.buildingList = this.roomval
      }
      if (this.appointdateval.length > 0) {
        dataval.templateList = []
        for (let i = 0; i < this.appointdateval.length; i++) {
          dataval.templateList.push({startDate: this.dateval + ' ' + this.appointdateval[i].sdate + ':00', endDate: this.dateval + ' ' + this.appointdateval[i].edate + ':00'})
        }
      }
      if (this.stateval) {
        dataval.state = this.stateval + 1
      }
      if (this.typeval) {
        dataval.typeList = this.typeval
      }
      dataval.keyword = this.roomid
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: dataval
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.result
        for (let i = 0; i < objs.length; i++) {
          temp.push({dates: that.dateval, id: objs[i].classroomId, name: objs[i].classroomName, state: objs[i].Bookings.length, use: that.use, nouse: that.nouse})
        }
        that.apinfo = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    this.pagepost()
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJappoint') {
        this.pagepost()
      }
    }
  }
}
</script>

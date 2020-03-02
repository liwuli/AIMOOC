<style type="text/css">
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
</style>
<template>
  <div class="app" :style="appstyle">
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
    				<!--<div class="addtime" @click='timeMevent'>{{timeManageN}}</div>-->
    				<div class="appointtime" @click='appointManageevent'>{{basicinfo.appointManageN}}</div>
    				<div class="historytime" @click='appointhistoryevent'>{{basicinfo.historyManageN}}</div>
    				<div class="anoucement" @click='anoucementevent'>{{basicinfo.anoucementN}}</div>
    			</div>
		        <div class="railccondition" style="min-height: 90px;">
					<div class="list">
						<span class="txt">{{basicinfo.buildingN}}:</span>
						<div class="lists">
							<!--<span :class="roomselect[0]" @click="buildevent('', '')">{{allN}}</span>-->
							<span :class="roomselect[ind]" v-for="(item, ind) in roominfo" @click="buildevent(item, ind)">
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
						<span class="txt">{{basicinfo.stateManageN}}:</span>
						<div class="lists">
							<span :class="stateselect[0]" @click="stateevent('', '')">{{basicinfo.allN}}</span>
							<span  :class="stateselect[ind + 1]"v-for="(item, ind) in statearr" @click="stateevent(item, ind)">
								{{item}}
							</span>
						</div>
					</div>
		        </div>
		        <div class="AA_right" style="margin: 15px 0 0 0;">
			      <List :totalnum="totalnum" :delbtn='show' :addbtn='show' :pagesize="pagesizeten" :pageval = "pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
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
import List from '@/components/extend/list'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {basicinfo, bingos, pageval, optobjinfoAManageshow, optobjinfoAManage, pathinfo, opteventAManage, percentinfoAManage, columsAManage, pagesizeten, listheadAManage, getadminhistoryurl, pathinfohistory, statearrManage, typearr, roomurl} from '@/module/admin/config/appointinfo'
export default {
  name: 'AJappointHistory',
  data () {
    return {
      basicinfo: basicinfo,
      pagesizeten: pagesizeten,
      show: 'display:none',
      appstyle: 'min-height:' + window.innerHeight + 'px',
      statearr: statearrManage,
      typearr: typearr,
      roominfo: '',
      roomselect: ['selected'],
      typeselect: ['selected'],
      stateselect: ['selected'],
      roomval: '',
      stateval: '',
      typeval: '',
      products: [],
      infoval: [],
      percentinfo: percentinfoAManage,
      colums: columsAManage,
      listhead: listheadAManage,
      optevent: opteventAManage,
      optobjinfo: optobjinfoAManage,
      pathinfo: pathinfohistory,
      pathinfo1: pathinfo,
      bingos: bingos,
      pageval: pageval,
      totalnum: 0
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
        temp[item] = {}
        temp[item]['id'] = objs[item].buildingId
        temp[item]['name'] = objs[item].buildingName
        temp[item]['des'] = objs[item].buildingDescription
        that.roomselect[item + 1] = ''
      }
      that.roomval = temp[0].id
      that.roominfo = temp
      that.pagepost()
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
    List
  },
  methods: {
    timeMevent () {
      this.$router.push({'name': this.pathinfo1.prex + 'time'})
    },
    appointManageevent () {
      this.$router.push({'name': this.pathinfo1.prex + 'Manage'})
    },
    appointhistoryevent () {
      this.$router.push({'name': this.pathinfo1.prex + 'History'})
    },
    anoucementevent () {
      this.$router.push({'name': this.pathinfo1.prex + 'anounce'})
    },
    detailevent (item) {
      this.$router.push({'name': this.pathinfo1.prex + 'detail', params: {item: item}})
    },
    buildevent (item, ind) {
      this.roomselect = []
      if (this.roomselect[ind] !== '') {
        this.roomselect[ind] = 'selected'
      }
      this.roomval = item.id
      this.pagepost()
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
      this.pagepost()
    },
    stateevent (item, ind) {
      this.stateselect = []
      if (item !== '') {
        this.stateselect[ind + 1] = 'selected'
      } else {
        this.stateselect[0] = 'selected'
      }
      this.stateval = ind
      this.pagepost()
    },
    pagepost () { // 获取列表
      let dataval = {}
      if (this.roomval.length > 0 || this.roomval) {
        dataval.buildingId = this.roomval
      }
      if (this.stateval) {
        dataval.state = [this.stateval + 1]
      }
      if (this.typeval) {
        dataval.bookingTypeList = [this.typeval]
      }
      let that = this
      this.axios({
        method: 'post',
        url: getadminhistoryurl,
        data: dataval
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.result.length / pagesizeten)
        that.totalnum = res.data.result.length
        let temp = []
        let objs = res.data.result
        for (let i = 0; i < objs.length; i++) {
          if (i < pagesizeten) {
            temp.push({
              id: objs[i].bookingId,
              room: objs[i].bookingName,
              roomtype: objs[i].bookingType,
              time: objs[i].bookingStartDate + '--' + objs[i].bookingEndDate,
              state: statearrManage[objs[i].status],
              stateval: objs[i].status,
              opt: that.optobjinfo,
              selected: false,
              show: optobjinfoAManageshow,
              details: objs[i].BookingDetails,
              living: objs[i].isLiving,
              record: objs[i].isRecord ? objs[i].isRecord : 0,
              phone: objs[i].telephone,
              user: objs[i].booker ? objs[i].booker.bookerName : '',
              remarks: objs[i].remarks
            })
          }
        }
        that.products = temp
        that.bingos = []
        that.bingos[0] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJappointManage') {
        this.pagepost()
      }
    }
  }
}
</script>

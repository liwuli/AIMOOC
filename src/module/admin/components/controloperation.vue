<template>
  <div class="app">
  	<Ghead></Ghead>
    <transition name="fade">
        <router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<Linklist></Linklist>
    		<div class="AA_right">
    			<AJposition></AJposition>
    			<div class="G_search" style="marginBottom: 23px;">
           <!-- <div class="part" >
             <input type="text" v-model="classname" :placeholder="basicinfo.searchplaceholder"/>
           </div> -->
		   <div style="float: left;margin-right: 20px;margin-top: 20px;">
         <span class="txt" style="float: left;">教室:</span>
		     <el-input style="float: left;width: 150px;margin-left: 20px;"
		       placeholder="请输入教室名称"
		       v-model="classname"
		       clearable>
		     </el-input>
		   </div>
       
       <el-button type="primary" @click="search" style="float: left;margin-left: 20px;margin-top: 20px;" icon="el-icon-search">搜索</el-button>
           <!-- <div class="btn" style="float: left" @click="search">{{basicinfo.search}}</div> -->


          </div>
		      <List :seatBtn="basicinfo.seatBtn" :totalnum="totalnum" :addbtn="addbtn" :selectarr="selectarr" :roomoptevent="roomoptevent" :roominfo="roominfo" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :pagesize="pagesize" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/listOpen2check'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {powerinfo, basicinfo, roominfoAll, roomopteventAll, yes, no, bd, nobd, photoobj, channelinfo, channeloptevent, device, devicetype, manufacturerinfo, pageval, bingos, products, pagesize, percentinfo, colums, optevent, listurl, listhead, pathinfo} from '@/module/admin/config/controloperationinfo'
let roominfo = [] // '开始录制', '结束录制', '巡课'
let roomoptevent = [] // 'roomadd', 'editlist', 'dellist'
export default {
  name: 'AJcontroloperation',
  data () {
    return {
      basicinfo: basicinfo,
      products: products,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      roomopteventAll: roomopteventAll,
      roominfoAll: roominfoAll,
      optevent: optevent,
      pathinfo: pathinfo,
      channelinfo: channelinfo,
      channeloptevent: channeloptevent,
      bingos: bingos,
      pageval: pageval,
      devicetype: devicetype,
      manufacturerinfo: manufacturerinfo,
      device: device,
      roominfo: roominfo,
      photoobj: photoobj,
      roomoptevent: roomoptevent,
      bd: bd,
      live: basicinfo.live,
      nolive: basicinfo.nolive,
      connected: basicinfo.connected,
      noconnected: basicinfo.noconnected,
      recording: basicinfo.recording,
      norecording: basicinfo.norecording,
      nobd: nobd,
      yes: yes,
      no: no,
      selectarr: '',
      addbtn: 'display:none',
      add: 0,
      edit: 0,
      del: 0,
      totalnum: 0,
      pagesize: pagesize,
      loop: 0,
      classname: '',
      pageinfo: '',
      cashViews: ['AJcontroloperationadd']
    }
  },
  created () {
    this.pagepost({page: 1})
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist
  },
  methods: {
    search () {
      this.pagepost({page: 1})
    },
    changeval (val, type) {
      switch (type) {
        case 'manu':
          if (val !== undefined && val !== 101) {
            return this.devicetype[type] + this.manufacturerinfo[val].txt
          } else {
            return ''
          }
        case 'ip':
        case 'channelno':
          return this.devicetype[type] + val
        case 'phototype':
          return this.devicetype[type] + this.photoobj[val + 1].txt
        case 'use':
          return this.devicetype[type] + (val ? this.yes : this.no)
        case 'bd':
          return val ? this.bd : this.nobd
        case 'living':
          return val ? this.live : this.nolive
        case 'connected':
          return val ? this.connected : this.noconnected
        case 'recording':
          return val ? this.recording : this.norecording
      }
    },
    pagepost (obj) {
      this.roomoptevent = []
      this.roominfo = []
      this.add = 0
      this.del = 0
      this.edit = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.roomoptevent = this.roomopteventAll
        this.roominfo = this.roominfoAll
      } else {
        let power = this.$store.state.powerinfo['controloperation']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'start':
                if (!this.add) {
                  this.roomoptevent.push(powerinfo.OPstartlist)
                  this.roominfo.push(powerinfo.OstartN)
                  this.roomoptevent.push(powerinfo.OPendlist)
                  this.roominfo.push(powerinfo.OendN)
                }
                this.add++
                break
              case 'seeloop':
                if (!this.del) {
                  this.loop = i
                  this.roomoptevent.push(powerinfo.OPseelist)
                  this.roominfo.push(powerinfo.OseeN)
                }
                this.del++
                break
            }
          }
          this.roomoptevent.push(powerinfo.OPanalysis)
          this.roominfo.push(powerinfo.OanalysisN)
        }
      }
      let that = this
      that.selectarr = []
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          classroomType: 'centralized',
          classroomName: that.classname
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.length / pagesize)
        that.totalnum = res.data.length
        let temp = []
        let optobj = that.optobjinfo
        let objs = res.data
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['ind'] = item
          temp[item]['id'] = objs[item].buildingId
          temp[item]['name'] = objs[item].buildingName
          temp[item]['des'] = objs[item].buildingDescription
          temp[item]['list'] = []
          that.selectarr[item] = []
          let objsub = objs[item].classrooms
          for (let k = 0, kk = 0; k < objsub.length; k++) {
            temp[item]['list'][k] = {}
            temp[item]['list'][k]['id'] = objsub[k].classroomId
            temp[item]['list'][k]['name'] = objsub[k].classroomName
            temp[item]['list'][k]['address'] = objsub[k].classroomAddress
            temp[item]['list'][k]['onrecording'] = ['display:none', 'display:none', 'display:none', 'display:none', 'display:none']
            if (objsub[k].isAnalysis === 2) {
              // temp[item]['list'][k]['onrecording'][0] = 'display:block'
              // temp[item]['list'][k]['onrecording'][2] = 'display:block'
              temp[item]['list'][k]['onrecording'][3] = 'display:block'
              temp[item]['list'][k]['onrecording'][4] = 'display:block'
            } else {
              if (objsub[k].currentSectionId === '' || objsub[k].currentSectionId === null) {
                if (that.loop === 0) { // 巡课 开始 结束  val=结束录制 巡课
                  temp[item]['list'][k]['onrecording'] = ['display:block', 'display:none', 'display:block']
                } else { // 开始 结束 巡课 val=开始录制 巡课
                  temp[item]['list'][k]['onrecording'] = ['display:block', 'display:none', 'display:block']
                }
              } else {
                if (that.loop === 0) { // 巡课 开始 结束 val = 结束录制 巡课
                  temp[item]['list'][k]['onrecording'] = ['display:none', 'display:block', 'display:block']
                } else { // 开始 结束 巡课val = 开始录制 巡课
                  temp[item]['list'][k]['onrecording'] = ['display:none', 'display:block', 'display:block']
                }
              }
              temp[item]['list'][k]['onrecording'][3] = 'display:none'
            }
            if (objsub[k].isAnalysis !== 2) {
              temp[item]['list'][k]['onrecording'][4] = 'display:none'
            }
            if (objsub[k].isForControlRecording) {
              kk++
              that.selectarr[item].push(k)
              if (objsub.length === kk) {
                temp[item]['list'][k]['selectall'] = true
              }
            }
            temp[item]['list'][k]['list'] = []
            let objsubs = objsub[k].equipments
            temp[item]['list'][k]['deviceIp'] = objsubs[0] ? objsubs[0].deviceIp : ''
            temp[item]['list'][k]['port'] = objsubs[0] ? objsubs[0].port : ''
            for (let l = 0; l < objsubs.length; l++) {
              temp[item]['list'][k]['list'][l] = {}
              temp[item]['list'][k]['list'][l]['classroomid'] = objsub[k].classroomId
              temp[item]['list'][k]['list'][l]['id'] = objsubs[l].deviceId
              temp[item]['list'][k]['list'][l]['name'] = objsubs[l].deviceName
              temp[item]['list'][k]['list'][l]['ip'] = objsubs[l].deviceIp
              temp[item]['list'][k]['list'][l]['port'] = objsubs[l].port
              temp[item]['list'][k]['list'][l]['use'] = objsubs[l].isValid
              temp[item]['list'][k]['list'][l]['manu'] = objsubs[l].manufacturer
              temp[item]['list'][k]['list'][l]['protocolType'] = objsubs[l].protocolType
              temp[item]['list'][k]['list'][l]['type'] = objsubs[l].type
              temp[item]['list'][k]['list'][l]['des'] = that.changeval(objsubs[l].manufacturer + 1, 'manu') + ',  ' + that.changeval(objsubs[l].deviceIp, 'ip') + ',  ' + that.changeval(objsubs[l].isValid, 'use')
              temp[item]['list'][k]['list'][l].opt = optobj
              temp[item]['list'][k]['list'][l]['list'] = []
              let objsubss = objsubs[l].channels
              for (let m = 0; m < objsubss.length; m++) {
                temp[item]['list'][k]['list'][l]['list'][m] = {}
                temp[item]['list'][k]['list'][l]['list'][m]['id'] = objsubss[m].channelId
                temp[item]['list'][k]['list'][l]['list'][m]['parentid'] = temp[item]['list'][k]['list'][l]['id']
                temp[item]['list'][k]['list'][l]['list'][m]['name'] = objsubss[m].channelName
                temp[item]['list'][k]['list'][l]['list'][m]['no'] = objsubss[m].channelNo
                temp[item]['list'][k]['list'][l]['list'][m]['bd'] = objsubss[m].coordinates
                temp[item]['list'][k]['list'][l]['list'][m]['des'] = that.changeval(objsubss[m].channelNo, 'channelno') + ',  ' + that.changeval(temp[item]['list'][k]['list'][l]['protocolType'], 'phototype') + ',  ' + that.changeval(objsubss[m].coordinates, 'bd') + ',  ' + that.changeval(objsubss[m].living, 'living') + ',  ' + that.changeval(objsubss[m].connected, 'connected') + ',  ' + that.changeval(objsubss[m].recording, 'recording')
                temp[item]['list'][k]['list'][l]['list'][m]['rtmp'] = objsubss[m].rtmpUrl
                temp[item]['list'][k]['list'][l]['list'][m]['target'] = objsubss[m].target
                temp[item]['list'][k]['list'][l]['list'][m].opt = that.channelinfo
                temp[item]['list'][k]['list'][l]['list'][m].eventlist = that.channeloptevent
              }
            }
          }
        }       
        that.products = temp
      })
      .then(function () {
        if (that.classname !== '') {
          let obj = document.querySelectorAll('.op')
          Array.prototype.slice.call(obj).forEach(function (item) {
            if (!item.getAttribute('style')) {
              item.click()
            }
          })
        } else {
					// 点击添加 收缩问题解决  把下面删除样式注释了

          let obj = document.querySelectorAll('.op')
          Array.prototype.slice.call(obj).forEach(function (item) {
            //item.removeAttribute('style')
          })
          let objfirstlevel = document.querySelectorAll('.firstlevel')
          Array.prototype.slice.call(objfirstlevel).forEach(function (item) {
            //item.removeAttribute('style')
            if (item.querySelector('.secondlevel')) {
             // item.querySelector('.secondlevel').removeAttribute('style')
            }
            if (item.querySelector('.AA_listhead')) {
             // item.querySelector('.AA_listhead').removeAttribute('style')
            }
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJcontroloperation') {
        this.pagepost()
      }
    }
  }
}
</script>

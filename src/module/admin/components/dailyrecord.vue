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
    			<AJposition :pathobj = "pathobj"></AJposition>
		      <List  :totalnum="totalnum" :pagesize="pagesize" :addstyle="addbtn" :selectarr="selectarr" :roomoptevent="roomoptevent" :roominfo="roominfo"  @pagepost="pagepost"  :pathinfo="pathinfo" :info='products'  :head='listhead' :head1='listhead1' :optevent='optevent'  :percentinfo1='percentinfo1' :percentinfo='percentinfo'></List>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/listOpencheckfornormal'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {products, roominfoAll, roomopteventAll, pagesize, opteventAll, optobjinfoAll, percentinfo1, OaN, OeN, OPalist, OPelist, percentinfo, listurl, listhead1, listhead, pathinfo} from '@/module/admin/config/dailyrecordinfo'
// 权限处理
let roomoptevent = [] // 'addlist'
let roominfo = [] // '添加'
let optevent = [] // 'editlist'
let optobjinfo = [] // '编辑'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJdailyrecord',
  created () {
    this.pagepost({page: 1})
  },
  data () {
    return {
      products: products,
      percentinfo: percentinfo,
      listhead: listhead,
      listhead1: listhead1,
      optevent: optevent,
      optobjinfo: optobjinfo,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      percentinfo1: percentinfo1,
      roomoptevent: roomoptevent,
      roominfo: roominfo,
      roomopteventAll: roomopteventAll,
      roominfoAll: roominfoAll,
      addbtn: addbtn,
      delbtn: delbtn,
      selectarr: '',
      add: 0,
      edit: 0,
      totalnum: 0,
      pagesize: pagesize
    }
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist
  },
  methods: {
    pagepost () {
      this.optevent = []
      this.optobjinfo = []
      this.roomoptevent = []
      this.roominfo = []
      this.add = 0
      this.edit = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.addbtn = 'display:block'
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
        this.roomoptevent = this.roomopteventAll
        this.roominfo = this.roominfoAll
      } else {
        let power = this.$store.state.powerinfo['normalManage']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'addlist':
                if (!this.add) {
                  this.roomoptevent.push(OPalist)
                  this.roominfo.push(OaN)
                  this.addbtn = 'display:block'
                }
                this.add++
                break
              case 'editlist':
                if (!this.edit) {
                  this.optevent.push(OPelist)
                  this.optobjinfo.push(OeN)
                }
                this.edit++
                break
            }
          }
        }
      }
      let that = this
      this.axios({
        method: 'post',
        url: listurl
      })
      .then(function (res) {
        let temp = []
        that.selectarr = []
        let objs = res.data.result
        that.totalnum = objs.length
        let optobj = that.optobjinfo
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
            temp[item]['list'][k].opt = optobj
            if (objsub[k].isForDailyRecording) {
              kk++
              that.selectarr[item].push(objsub[k].classroomId)
              if (objsub.length === kk) {
                temp[item]['list'][k]['selectall'] = true
              }
            }
            let equipobj = objsub[k].equipments
            if (equipobj.length > 0) {
              temp[item]['list'][k]['ip'] = equipobj[0].deviceIp
              temp[item]['list'][k]['use'] = equipobj[0].isValid
            }
          }
        }
        that.products = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJdailyrecord') {
        this.pagepost()
      }
    }
  },
  mounted () {
  }
}
</script>

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
		      <List :totalnum="totalnum" :addstyle="addstyle" :selectarr="selectarr" :roomoptevent="roomoptevent" :roominfo="roominfo"  @pagepost="pagepost"  :pathinfo="pathinfo" :info='products'  :head='listhead' :head1='listhead1' :optevent='optevent'  :percentinfo1='percentinfo1' :percentinfo='percentinfo'></List>
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
import {roominfo, roomoptevent, products, percentinfo1, percentinfo, optevent, listurl, listhead1, listhead, pathinfo, optobjinfo} from '@/module/admin/config/dailyoperationinfo'
export default {
  name: 'AJdailyoperation',
  beforeCreate () {
    let that = this
    this.axios({
      method: 'post',
      url: listurl,
      data: {
        classroomType: 'normal'
      }
    })
    .then(function (res) {
      let temp = []
      that.selectarr = []
      let objs = res.data
      let optobj = optobjinfo
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
  },
  data () {
    return {
      products: products,
      percentinfo: percentinfo,
      listhead: listhead,
      listhead1: listhead1,
      optevent: optevent,
      pathinfo: pathinfo,
      percentinfo1: percentinfo1,
      roomoptevent: roomoptevent,
      roominfo: roominfo,
      selectarr: '',
      addstyle: 'display:none',
      totalnum: 0
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
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          classroomType: 'normal'
        }
      })
      .then(function (res) {
        let temp = []
        that.selectarr = []
        let objs = res.data
        let optobj = optobjinfo
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
      if (to.name === 'AJNormalM') {
        this.pagepost()
      }
    }
  },
  mounted () {
  }
}
</script>

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
          <div class="G_search">
          </div>
            <Railc :lostday='lostday' :dateval="dateval" :railid="railid" :show="show" @lessevent="lessevent" @addevent="addevent" @railcevent="railcevent" ></Railc>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import Railc from '@/components/extend/railcschool'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {pathinfo, msgN} from '@/module/admin/config/schoolradioinfo'
export default {
  name: 'AJcampusTVchannelN',
  data () {
    return {
      msgN: msgN,
      show: true,
      lostday: true,
      dateval: '',
      railid: 'schoolrailpart'
    }
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist,
    Railc
  },
  methods: {
    lessevent () {
    },
    addevent () {
    },
    railcevent (obj) {
      this.dateval = this.formcat(obj)
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
    },
    pagepost (obj) {
      let that = this
      this.axios({
        method: 'post',
        url: '',
        data: {
        }
      })
      .then(function (res) {
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    let nowdate = new Date()
    this.dateval = nowdate.getFullYear() + '-' + (nowdate.getMonth() + 1) + '-' + nowdate.getDate()
  },
  watch: {
    '$route' (to, from) {
      if (to.name === pathinfo.prex) {
      }
    }
  }
}
</script>

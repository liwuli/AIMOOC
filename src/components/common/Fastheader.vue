<style type="text/css">
  @import url("/static/css/default/Global.css");
  @import url("/static/iconfont/iconfont.css");
</style>
<template>
  <header class="G_home_head">
    <div class="centers1140">
      <div class="text" :title="name" style="margin-left: -260px;">
        <a >
          <img v-show="img" :src="img"/>
          {{name}}
        </a>
      </div>
      <div class="login iconfont icon-usermanage" v-if="cookie === ''" @click="login" style="color: #fff;cursor: pointer;display: none;">
        <span class="loginname">&nbsp;&nbsp;{{loginN}}</span>
      </div>
      <div class="login iconfont icon-usermanage" v-else @click="loginshow" style="color: #fff;cursor: pointer;display: none;">
        <span class="loginname">{{urseinfo.userName}}</span>
        <div class="show" v-show="show">
          <!-- <span @click="jump('analyze')">智慧教学分析</span> -->
          <span @click="jump('teachStatus')">教情学情分析</span>
          <span @click="jump('statistics')">无感考勤</span>
          <span @click="jump('admin')" v-show="linkarrflag">后台管理</span>
					<span @click="jump('bookmarkpage')">在线巡课</span>
          <!-- <span @click="jump('scheduleplan')">课表重构</span> -->
          <!-- <span @click="jump('admin')">智能设备管理</span> -->
        <!--  <span @click="jump('smartclassroom')">博瑞巡课</span>
					<span @click="jump('loopClass')">慕课巡课</span> -->
          <span v-show="version !== '1'" @click="jump('usercenter')">个人中心</span>
          <span @click="jump('out')">退出</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  function getCookie (cname) {
    if (document.cookie.length > 0) {
      let cstart = document.cookie.indexOf(cname + '=')
      if (cstart !== -1) {
        cstart = cstart + cname.length + 1
        let cend = document.cookie.indexOf(';', cstart)
        if (cend === -1) {
          cend = document.cookie.length
        }
        return unescape(document.cookie.substring(cstart, cend))
      }
    }
    return ''
  }
  import {loginN, logotxt} from '@/module/home/config/index'

  let cookie = getCookie('currentUser')
  let homeUrl = getCookie('homeurlcode')
  export default {
    name: 'Header',
    data () {
      return {
        loginN: loginN,
        logotxt: logotxt,
        cookie: cookie,
        homeUrl: homeUrl,
        urseinfo: {},
        show: false,
        version: this.$store.state.version,
        img: '',
        name: '',
        linkarrflag: false
      }
    },
    created () {
      this.urseinfo = this.$store.state.userinfo
      this.img = this.$store.state.headfooter.locationUrl
      this.name = this.$store.state.headfooter.name
    },
    methods: {
      login () {
        
      },
      loginshow () {

      },
      jump (type) {

      }
    },
    mounted () {
      // if (this.$store.state.roleinfolinkMenu.length > 0) {
      //   this.linkarrflag = true
      // }
    }
  }
</script>

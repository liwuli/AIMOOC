<style type="text/css">
@import url("/static/css/default/Global.css");
@import url("/static/iconfont/iconfont.css");
</style>
<template>
  <header class="G_home_Nhead">
		<div class="centers">
			<div class="text" :title="name" @click="jump('home')">
				<a href="/index.html">
					<img v-show="img" :src="img"/>
					{{name}}
				</a>
			</div>
			<div class="login iconfont icon-usermanage" v-if="cookie === ''" @click="login" style="color: #fff;cursor: pointer;">
				<span class="loginname">&nbsp;&nbsp;{{loginN}}</span>
			</div>
			<div class="login iconfont icon-usermanage" v-if="cookie !== ''" @click="loginshow" style="color: #fff;cursor: pointer;">
				<span class="loginname">{{urseinfo.userName}}</span>
				<div class="show" v-show="show">
          <span @click="jump('teachStatus')">教情学情分析</span>
          <span @click="jump('statistics')">无感考勤</span>
					<span @click="jump('admin')" v-show="linkarrflag">后台管理</span>
          <span @click="jump('bookmarkpage')">在线巡课</span>
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
      logotxt: logotxt,
      loginN: loginN,
      cookie: cookie,
      urseinfo: {},
      show: false,
      img: '',
      name: '',
      version: this.$store.state.version,
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
      window.location.href = '/base/login?beforeurl=' + location.href
    },
    loginshow () {
      if (this.show) {
        this.show = false
      } else {
        this.show = true
      }
    },
    jump (type) {
      if (type === 'admin') {
        // this.$router.push({'name': 'AJadmin'})
        this.$router.push({path: homeUrl })
      } else if (type === 'home') {
        this.$router.push({'name': 'AJhome'})
      } else if (type === 'usercenter') {
        this.$router.push({'name': 'AJusercenterme'})
      } else if (type === 'analyze') {
        this.$router.push({'name': 'Banalyze'})
      } else if (type === 'teachStatus') {
        this.$router.push({'name': 'NstatusMonitor'})
      } else if (type === 'bookmarkpage') {
        this.$router.push({'name': 'AJbookmarkpage'})
      }else if (type === 'loopClass') {
        this.$router.push({'name': 'AJloopClass'})
      } else if (type === 'smartclassroom') {
        this.$router.push({'name': 'AJsmartClassroom'})
      }else if (type === 'statistics') {
        this.$router.push({'name': 'AJstatistics'})
      }else if(type === 'scheduleplan'){
        this.$router.push({'name': 'AJscheduleplan'})
      
      
      // if (type === 'admin') {
      //   // this.$router.push({'name': 'AJadmin'})
      //   this.$router.push({path: homeUrl })
      // } else if (type === 'home') {
      //   this.$router.push({'name': 'AJhome'})
      // } else if (type === 'usercenter') {
      //   this.$router.push({'name': 'AJusercenterme'})
      } else {
        if (location.port) {
          window.location.href = '/base/logout'
//        window.location.href = '/cas/logout?service=' + location.protocol + '//' + location.host + ':' + location.port + '/index.html'
        } else {
          window.location.href = '/base/logout'
//        window.location.href = '/cas/logout?service=' + location.protocol + '//' + location.host + '/index.html'
        }
      }
    }
  },
  mounted () {
    if (this.$store.state.roleinfolinkMenu.length > 0) {
      this.linkarrflag = true
    }
  }
}
</script>

<style type="text/css">
  @import url("/static/css/default/Global.css");
  @import url("/static/iconfont/iconfont.css");
</style>
<template>
  <header class="G_home_head">
    <div class="centers1140">
      <div class="text" :title="name" @click="jump('home')">
        <a href="/index.html">
          <img v-show="img" :src="img"/>
          {{name}}
        </a>
      </div>
      <div class="login iconfont icon-usermanage" v-if="cookie === ''" @click="login" style="color: #fff;cursor: pointer;">
        <span class="loginname">&nbsp;&nbsp;{{loginN}}</span>
      </div>
      <div class="login iconfont icon-usermanage" v-else @click="loginshow" style="color: #fff;cursor: pointer;">
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
        // 部署环境登录走nginx代理
        window.location.href ='base/login?beforeurl=' + location.href;
        //window.location.href='http://172.16.161.43:8000/base/login?beforeurl=http://localhost:8000/index.html';
        // 开发环境登录走本地设置cookie
        // var cookieData = '"{\"code\":\"admin\",\"gender\":1,\"lastupdatedate\":1552358508000,\"telephone\":\"??\",\"roleType\":-1,\"userName\":\"admin\",\"picture\":\"http://172.16.178.43:5000/images/thumbnail/118d4c4e370c47f09d45d78da59b30bb.png\",\"organizationId\":\"729e25774e90465eb570490a51747f30\",\"number\":\"admin\",\"realName\":\"???\",\"password\":\"21232f297a57a5a743894a0e4a801fc3\",\"averageAttendanceRate\":0.0,\"phone\":\"\",\"organization\":\"729e25774e90465eb570490a51747f30\",\"id\":\"04ba1f28be7b4b599e564b9ee921cc9a\",\"isdelete\":0,\"email\":\"\"}"'
        // var SHRIOSESSIONID='c89929ae-f2b6-4cef-9460-67f480859b34';
        // document.cookie = 'currentUser= ' + cookieData
        // document.cookie = 'SHRIOSESSIONID= ' + SHRIOSESSIONID
        //document.cookie = 'homeurlcode= ' + "console"


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
        }else{
          if (location.port) {
            window.location.href = '/base/logout'
//        window.location.href = '/base/logout?service=' + location.protocol + '//' + location.host + ':' + location.port + '/index.html'
          } else {
            window.location.href = '/base/logout'
//        window.location.href = '/base/logout?service=' + location.protocol + '//' + location.host + '/index.html'
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

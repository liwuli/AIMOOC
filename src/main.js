// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 全局的样式
import '../static/css/admin/app.css';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'
import App from './App'
import axios from 'axios'
import vSelect from 'vue-select'
import * as types from '@/store/mutation-types'
// smartClassroom, loopClass,
import {analyzeRoute, analyze,statistics,bookmarkpage, nocookieroute, routeobj, coursemanageobj, usercenterobj, adminobj,scheduleplan} from '@/route/routeinfo'
import {developUrl,microteaching,delect_router,mockjs} from '../src/module/admin/config/urlPage'
import ElementUI from 'element-ui';

//只在测试环境下才引用 模拟数据
if(mockjs=='/moni'){
  require('./mock/publish.js');
}

// // 引入mock
var moni = JSON.parse(localStorage.getItem("moni"))
if(moni){
    console.log(window)
    require('./mock/index.js');
}

// import Mock from './mock.js'
// 启用mock开关
// Vue.config.productionTip = true

var Echarts = require('echarts')
Vue.prototype.$echarts = Echarts
/*
 * nocookieroute 前台路由
 * routeobj 全部路由json对象
 * coursemanageobj 课程管理路由
 * usercenterobj 用户中西路由
 * adminobj 后台模块列表
 * statistics,bookmarkpage 在线巡课模块
 * */
Vue.use(ElementUI,{size: 'small', zIndex: 3000 });
Vue.component('v-select', vSelect)
Vue.use(Router)

// axios 配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 500000
//axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.axios = axios
Vue.config.productionTip = false
let roleinfo = {}

// 模拟线上环境
 if(developUrl == 'api'){
  var cookieData = '"{\"code\":\"lwl\",\"gender\":1,\"lastupdatedate\":1552358508000,\"telephone\":\"??\",\"roleType\":2,\"userName\":\"lwl\",\"picture\":\"http://172.16.178.43:5000/images/thumbnail/118d4c4e370c47f09d45d78da59b30bb.png\",\"organizationId\":\"729e25774e90465eb570490a51747f30\",\"number\":\"lwl\",\"realName\":\"???\",\"password\":\"21232f297a57a5a743894a0e4a801fc3\",\"averageAttendanceRate\":0.0,\"phone\":\"\",\"organization\":\"729e25774e90465eb570490a51747f30\",\"id\":\"04ba1f28be7b4b599e564b9ee921cc9a\",\"isdelete\":0,\"email\":\"\"}"'
  var SHRIOSESSIONID = 'faba5d92-8185-4f75-ae11-45cbf5437cce'
  document.cookie = 'currentUser= ' + cookieData
  document.cookie = 'SHRIOSESSIONID= ' + SHRIOSESSIONID
}

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



let educationType = '' // 高教 普教
let version = ''
let cookieval = getCookie('currentUser')
let route = []
let Flinks = []
let headfooter = {}
// 获取前台首页导航数据
axios({
  method: 'post',
  url: developUrl + '/base/FrontModule/findFrontModuleList',
  params: {
    par: {
      status: 1
    }
  }
})
  .then(function (res) {
    // var weige = {
    //   createDate: "2017-11-28 20:45:54",
    //   isDelete: 0,
    //   moduleId: "4",
    //   moduleName: "微格教学",
    //   orderNum: 4,
    //   routeUrl: "Fmicroteaching",
    //   status: 1
    // }
    let temp = []
    let objs = res.data.data
    for (let item = 0; item < objs.length; item++) {
      temp[item] = {}
      temp[item]['name'] = objs[item].routeUrl
      temp[item]['title'] = objs[item].moduleName
    }

    headfooter = res.data.port

    if(microteaching){
      temp.push({
        name:'Fmicroteaching',
        title:'微格教学'
      })
    }
    Flinks = temp
    educationType = res.data.educationType
    exefn()
  })
  .catch(function (error) {
    console.log(error)
  })

function exefn () {
  if (!cookieval) { // 没有cookie只实例化前台路由
    /* eslint-disable no-new */
    const router = new Router({
      mode: 'hash',
      linkActiveClass: 'active',
      routes: nocookieroute
    })
    if (localStorage.getItem('linkoclose')) {
      localStorage.removeItem('linkoclose')
    }
    /* eslint-disable no-new */
    new Vue({
      beforeCreate () {
        this.$store.dispatch({
          type: types.Flinks,
          Flinks: Flinks,
          educationType: educationType
        })
        this.$store.dispatch({
          type: types.headfooter,
          headfooter: headfooter
        })
      },
      el: '#app',
      router,
      axios,
      store,
      template: '<App/>',
      components: { App },
      watch: {
        '$route' (to) {
          let cookie = getCookie('currentUser')
          if (!cookie && to.name.indexOf('AJ') >= 0) {
            window.location.href = '/base/logout'
          }
        }
      }
    })
  } else { // 有cookie=实例化前后台路由
    let cokieval = (cookieval.replace(/\s/g, '').replace(/\\/gi, ''))
    if (cokieval[0] === '"') {
      cokieval = cokieval.substr(1, cokieval.length - 2)
    }
    roleinfo = eval('(' + cokieval + ')')// 只取cookie的id作为区分使用，其他用户信息从接口获取
	axios({
      method: 'post',
      url: developUrl + '/base/user/getPersonalProfile',
      params: {
        par: {
          userId: roleinfo.id
        }
      }
    })
      .then(function (res) {
		//如果需要修改当前的登录角色 需要把线上的 接口返回的数据复制过来
        if(developUrl == 'api'){
          roleinfo = { "averageAttendanceRate": 0.0, "birthday": null, "classesName": null, "code": "admin", "createDate": null, "creator": null, "departments": null, "description": null, "email": "", "gender": 1, "hometown": null, "iconUrl": null, "id": "04ba1f28be7b4b599e564b9ee921cc9a", "isdelete": 0, "lastLoginDate": null, "lastLoginIp": null, "lastUpdater": null, "lastupdatedate": "2019-03-12 10:41:48", "majorId": null, "majorName": null, "nation": null, "number": "admin", "organization": "729e25774e90465eb570490a51747f30", "organizationId": "729e25774e90465eb570490a51747f30", "organizationName": null, "password": "21232f297a57a5a743894a0e4a801fc3", "phone": "", "picture": "http://172.16.178.43:5000/images/thumbnail/118d4c4e370c47f09d45d78da59b30bb.png", "postId": null, "qq": null, "realName": "崔大壮", "registType": null, "registrationDate": null, "roleList": [], "roleType": -1, "status": null, "telephone": "问题", "title": null, "userName": "admin" };
          // roleinfo ={"averageAttendanceRate":0.0,"birthday":null,"classesName":null,"code":"999","createDate":"2019-12-17 15:36:16","creator":null,"departments":"测试同步学院","description":null,"email":"","gender":1,"hometown":null,"iconUrl":"http://172.16.160.46:5000/images/thumbnail/999.png","id":"5c41e882128f454fb9e0a0cc47c1736e","isdelete":0,"lastLoginDate":null,"lastLoginIp":null,"lastUpdater":null,"lastupdatedate":"2019-12-18 11:04:10","majorId":"6d14fd2b30344c2cb9c5b3d79204a7d3","majorName":null,"nation":null,"number":null,"organization":"ba0c54a332454df2b7b66900bf631097","organizationId":"ba0c54a332454df2b7b66900bf631097","organizationName":null,"password":"e10adc3949ba59abbe56e057f20f883e","phone":"","picture":null,"postId":null,"qq":null,"realName":"朱zz","registType":null,"registrationDate":"2019-12-17 15:36:16","roleList":[],"roleType":3,"status":null,"telephone":"","title":null,"userName":"999"}
        }else{
          roleinfo = res.data
        }

        if (roleinfo.roleType === -1) {
          roleinfo.typerole = '管理员'
        } else if (roleinfo.roleType === 2) {
          roleinfo.typerole = '老师'
        } else {
          roleinfo.typerole = '学生'
        }
		Vue.prototype.roleinfo = roleinfo;
        let tempurl = ''
        let params = ''
        let postobj = {}
        postobj.method = 'post'
        if (roleinfo.userName === 'admin') {
          tempurl = developUrl + '/base/module/getModules'
        } else {
          params = {params: {userId: roleinfo.id}}
          postobj.params = params
          tempurl = developUrl + '/base/user/getUserPermission'
        }
        postobj.url = tempurl



        if(developUrl == 'api'){
          axios.get('/goods')
          .then(function (res) {
            if (res.data.code !== 200) {
              console.warn(res, 'error')
            } else {
              let objs = res.data.result.modules
              //前端控制微格教学的 学科管理
              if(delect_router.length>0){
                  for(var i = 0; i<objs.length;i++){
                     for(var j = 0; j<objs[i].childModules.length;j++){
                        // 根据屏蔽列表 删除 指定路由
                         for(var k = 0; k<delect_router.length;k++){
                            if(objs[i].childModules[j].moduleCode == delect_router[k]){
                                // 屏蔽指定路由isDelete
                                objs[i].childModules.splice(j, 1)
                            }
                        }

                  }
                }
             }

              version = res.data.result.sowillEduAimoocType
              let temp = []
              let temproutindex = []
              route = route.concat(usercenterobj.usercenterobj) // 将用户中心路由填充进去
              if (objs.length <= 0) { // 无后台权限
                init(temp, temproutindex)
              } else { // 有后台权限
                for (var t = 0; t < objs.length; t++) {
                  if (objs[t].childModules && objs[t].childModules.length > 0) {
                    document.cookie = 'homeurlcode' + '=' + escape(objs[t].childModules[0].moduleCode)
                    break
                  }
                }
                route = route.concat(adminobj.adminobj) // 将后台模块列表路由填充进去
                for (let i = 0; i < objs.length; i++) {
                  temp[i] = {}
                  let tempchildmodeuls = []
                  let objsub = objs[i].childModules
                  for (let k = 0; k < objsub.length; k++) {
                    let pushobj = {
                      'moduleId': objsub[k]['moduleId'],
                      'moduleCode': objsub[k]['moduleCode'],
                      'moduleName': objsub[k]['moduleName'],
                      'opt': objsub[k]['operations'],
                      'ind': i
                    }
                    tempchildmodeuls.push(pushobj)
                    temproutindex.push(pushobj)

                    if (objsub[k]['moduleCode'] === 'course') { // 如果是课程模块，需要填充课程管理路由
                      if (version === '1') {
                        route = route.concat(routeobj['courseonly'])
                      } else if (version === '2') {
                        route = route.concat(routeobj['courseOnlineonly'])
                      } else {
                        route = route.concat(routeobj[objsub[k]['moduleCode']])
                      }
                      route = route.concat(coursemanageobj.coursemanageobj)
                    } else {
                      if (routeobj[objsub[k]['moduleCode']]) {
                        route = route.concat(routeobj[objsub[k]['moduleCode']] || []) // 填充各模块的路由
                      }
                    }
                  }

                  temp[i]['moduleCode'] = objs[i].moduleCode
                  temp[i]['moduleName'] = objs[i].moduleName
                  temp[i]['childModules'] = tempchildmodeuls
                  temp[i]['ind'] = i
                  if (i === objs.length - 1) {
                    init(temp, temproutindex)
                  }
                }
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        }else{
          axios(postobj)
          .then(function (res) {

            if (res.data.code !== 200) {
              console.warn(res, 'error')
            } else {
              let objs = res.data.result.modules
              //前端控制微格教学的 学科管理
              if(delect_router.length>0){
                  for(var i = 0; i<objs.length;i++){
                     for(var j = 0; j<objs[i].childModules.length;j++){
                        // 根据屏蔽列表 删除 指定路由
                         for(var k = 0; k<delect_router.length;k++){
                            if(objs[i].childModules[j].moduleCode == delect_router[k]){
                                // 屏蔽指定路由isDelete
                                objs[i].childModules.splice(j, 1)
                            }
                        }

                  }
                }
             }

              version = res.data.result.sowillEduAimoocType
              let temp = []
              let temproutindex = []
              route = route.concat(usercenterobj.usercenterobj) // 将用户中心路由填充进去
              if (objs.length <= 0) { // 无后台权限
                init(temp, temproutindex)
              } else { // 有后台权限
                for (var t = 0; t < objs.length; t++) {
                  if (objs[t].childModules && objs[t].childModules.length > 0) {
                    document.cookie = 'homeurlcode' + '=' + escape(objs[t].childModules[0].moduleCode)
                    break
                  }
                }
                route = route.concat(adminobj.adminobj) // 将后台模块列表路由填充进去
                for (let i = 0; i < objs.length; i++) {
                  temp[i] = {}
                  let tempchildmodeuls = []
                  let objsub = objs[i].childModules
                  for (let k = 0; k < objsub.length; k++) {
                    let pushobj = {
                      'moduleId': objsub[k]['moduleId'],
                      'moduleCode': objsub[k]['moduleCode'],
                      'moduleName': objsub[k]['moduleName'],
                      'opt': objsub[k]['operations'],
                      'ind': i
                    }
                    tempchildmodeuls.push(pushobj)
                    temproutindex.push(pushobj)

                    if (objsub[k]['moduleCode'] === 'course') { // 如果是课程模块，需要填充课程管理路由
                      if (version === '1') {
                        route = route.concat(routeobj['courseonly'])
                      } else if (version === '2') {
                        route = route.concat(routeobj['courseOnlineonly'])
                      } else {
                        route = route.concat(routeobj[objsub[k]['moduleCode']])
                      }
                      route = route.concat(coursemanageobj.coursemanageobj)
                    } else {
                      if (routeobj[objsub[k]['moduleCode']]) {
                        route = route.concat(routeobj[objsub[k]['moduleCode']] || []) // 填充各模块的路由
                      }
                    }
                  }

                  temp[i]['moduleCode'] = objs[i].moduleCode
                  temp[i]['moduleName'] = objs[i].moduleName
                  temp[i]['childModules'] = tempchildmodeuls
                  temp[i]['ind'] = i
                  if (i === objs.length - 1) {
                    init(temp, temproutindex)
                  }
                }
              }
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        }

      })
      .catch(function (error) {
        //console.log(error)
      })
  }
  /* eslint-disable no-new */
  const init = function (rout, routdetail) {
    let temp = []
    route = route.concat(analyze)
    route = route.concat(analyzeRoute)
    route = route.concat(bookmarkpage);
    route = route.concat(scheduleplan);
    // route = route.concat(microteaching_page);




    // route = route.concat(loopClass)
    // route = route.concat(smartClassroom)
    route = route.concat(statistics)
    if (routdetail.length <= 0) {
      const router = new Router({
        mode: 'hash',
        linkActiveClass: 'active',
        routes: route.concat(nocookieroute)
      })
      new Vue({
        beforeCreate () {
          this.$store.dispatch({
            type: types.roleinfo,
            data: temp,
            datamenu: rout,
            roleinfo: roleinfo
          })
          this.$store.dispatch({
            type: types.Flinks,
            Flinks: Flinks,
            educationType: educationType
          })
          this.$store.dispatch({
            type: types.headfooter,
            headfooter: headfooter
          })
        },
        el: '#app',
        router,
        axios,
        store,
        template: '<App/>',
        components: { App },
        watch: {
          '$route' (to) {
            let cookie = getCookie('currentUser')
            if (!cookie && to.name.indexOf('AJ') >= 0) {
              window.location.href = '/base/logout'
            }
          }
        }
      })
    } else {
//    console.log(routdetail, 'routdetail')
      for (let i = 0; i < routdetail.length; i++) {
        temp[i] = {}
        temp[i]['path'] = routdetail[i]['moduleCode']
        temp[i]['ind'] = routdetail[i]['ind']
        temp[i]['pathname'] = routdetail[i]['moduleName']
        temp[i]['id'] = routdetail[i]['moduleId']
        temp[i]['opt'] = []
        for (let k = 0; k < routdetail[i]['opt'].length; k++) {
          temp[i]['opt'][k] = routdetail[i]['opt'][k]['operationCode']
        }
        if (i === routdetail.length - 1) {
          const router = new Router({
            mode: 'hash',
            linkActiveClass: 'active',
            routes: route.concat(nocookieroute)
          })
//        console.log('实例化')
          new Vue({
            beforeCreate () {
              this.$store.dispatch({
                type: types.roleinfo,
                data: temp,
                datamenu: rout,
                roleinfo: roleinfo,
                educationType: educationType
              })
              this.$store.dispatch({
                type: types.version,
                version: version
              })
              this.$store.dispatch({
                type: types.Flinks,
                Flinks: Flinks,
                educationType: educationType
              })
              this.$store.dispatch({
                type: types.headfooter,
                headfooter: headfooter
              })
            },
            el: '#app',
            router,
            axios,
            store,
            template: '<App/>',
            components: { App },
            watch: {
              '$route' (to) {
                let cookie = getCookie('currentUser')
                if (!cookie && to.name.indexOf('AJ') >= 0) {
                  window.location.href = developUrl + '/base/logout'
                }
              }
            }
          })
        }
      }
    }
  }
}

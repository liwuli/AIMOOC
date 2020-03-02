<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
      <router-view name="b"></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Flive.css" />
    <Links></Links>
    <div class="center centerbottom50">
      <div class="centers1100" :style="'min-height:' + Mlefthei + 'px;'">
        <div class="liveback"><span @click="go" style="cursor: pointer">
            <&nbsp; {{livename}} - {{mastername}} </span> </div> <div class="liveuserinfo" style="display: flex;align-items: center;">
              <span class="pinkuser">{{liveinfo.pinkuser}}{{totalcustomer}}{{liveinfo.pinkuserinfo}}</span>
              <div class="users" style="display: flex;align-items: center;margin-left: 10px;">
                <span class="usericon iconfont icon-seeperson"></span>
                <span class="txt">{{totalperson}}{{liveinfo.person}}</span>
              </div>
        </div>
        <div class="livedetailcenter">
          <div class="liveplayer" id="liveplayer">
            <div id="playerArea"></div>
            <div class="danmu">
              <div class="danmusub" id="danmusub"></div>
            </div>
            <div class="danmupart" id="danmupart"></div>
            <div class="favirate" @click="faviratefn($event)" style="display: flex;align-items: center;">
              <span class="staricon iconfont " :class="favirateclass"></span>
              <span style="margin-left: 10px;">{{liveinfo.favirate}}</span>
            </div>
          </div>
          <div class="chatpart" @mouseleave="hidelockpart($event)" @mouseenter="showlockpart($event)">
            <div class="title">
              {{liveinfo.chat}}
              <div class="forbid" v-show="adminmasterflag" @click="showforbidlist">{{chatinfo.forbidsayinfo}}</div>
              <div class="lockpart" v-show="adminmasterflag">
                <div class="half" @click="lockoption($event)">
                  <span class="halficon iconfont icon-unlock"></span>
                  <span>{{chatinfo.lock}}</span>
                </div>
                <div class="half" @click="clearoption($event)">
                  <span class="halficon iconfont icon-clear"></span>
                  <span>{{chatinfo.clear}}</span>
                </div>
              </div>
            </div>
            <div id="forbidlist" :style="forbidlistflag">
              <div class="search">
                <input type="text" class="input" v-model="forbidsearchval" />
                <div class="searchbtn" @click="forbidsearchvalfn">
                  <span class="searchicon iconfont icon-search1"></span>
                </div>
                <div class="scrollfather" :id="forbidscroll" style="width:220px;height:380px;margin-top: 10px;">
                  <div class="scrollson" id="checktop" style="min-height: 380px;">
                    <div class="forbidlist" :id="item.userid" v-for="(item, ind) in forbidarr" v-show="forbidarrshow[ind]">
                      <span class="check" style="margin-left: 0;">
                        <div class="icon"></div>
                        <input type="checkbox" :value="item.userid" />
                      </span>
                      <div class="img">
                        <img v-if="item.pic" :src="item.pic" />
                      </div>
                      <div class="forbidusername" :title="item.userName">{{item.userName}}</div>
                      <div class="unlockforbid" @click="tosay(item)">{{forbidlistinfo.unforbid}}</div>
                    </div>
                  </div>
                  <div class="scroll_ymove">
                    <div class="scroll_y"></div>
                  </div>
                  <div class="scroll_xmove">
                    <div class="scroll_x"></div>
                  </div>
                </div>
                <div class="forbidbtn" @click="tosayall">{{forbidlistinfo.unforbid}}</div>
                <div class="forbidbtn" @click="hideforbidlist">{{forbidlistinfo.cancel}}</div>
              </div>
            </div>
            <div class="scrollfather" :id="livechat" style="width:230px;height:410px">
              <div class="scrollson" style="min-height: 410px;">
                <div class="chatlist" v-for="(item, ind) in chatlist">
                  <div class="headline" v-if="item.type === 'system'">
                    <span class="headicon iconfont" :class="'bellcolor  icon-sysmsg'"></span>
                    <span class="headtxt">{{chatinfo.system}}</span>
                    <span class="headdate">{{item.date}}</span>
                  </div>
                  <div class="headline" :id="item.messageId" v-if="item.type === 'me'">
                    <span class="headicon iconfont" :class="'blulecolor icon-msg'"></span>
                    <span class="headtxt">{{chatinfo.me}}</span>
                    <!--<span class="headforbit" v-if="item.userName !== 'admin'"  @click="nosay(item, ind)" v-show="adminmasterflag">{{item.forbid}}</span>-->
                    <span class="headdate">{{item.date}}</span>
                  </div>
                  <div class="headline" :id="item.messageId" v-if="item.type === 'user'">
                    <span class="headicon iconfont" :class="'blulecolor icon-msg'"></span>
                    <span class="headtxt">{{item.realName}}</span>
                    <span class="headforbit" v-if="item.userName !== 'admin'" @click="nosay(item, ind)" v-show="adminmasterflag">{{item.forbid}}</span>
                    <span class="headdate">{{item.date}}</span>
                  </div>
                  <div class="headline" :id="item.messageId" v-if="item.type === 'master'">
                    <span class="headicon iconfont" :class="'mastercolor icon-hdmaster'"></span>
                    <span class="headtxt">{{chatinfo.master}}</span>
                    <span class="headdate">{{item.date}}</span>
                  </div>
                  <div class="content" v-html="item.messageContent"></div>
                  <span class="del iconfont icon-del" @click="delchat($event, item, ind)" v-show="adminmasterflag"></span>
                </div>
              </div>
              <div class="scroll_ymove">
                <div class="scroll_y"></div>
              </div>
              <div class="scroll_xmove">
                <div class="scroll_x"></div>
              </div>
            </div>
            <span class="emotion iconfont icon-emotion" style="margin-left: 10px;" flag="false"></span>
            <div class="emotions"></div>
            <div class="textareas" id="sendmessage" contenteditable="true" :title="liveinfo.controlenter" @keyup="keyup($event)"
              @keydown="keydown($event)"></div>
            <div :class="socketclass" id="sendmessagebtn" @click="socketsend($event)">{{liveinfo.send}}</div>
            <!--<div class="num">
							<span id="textareanum">0</span>/30
						</div>-->
            <div class="forbitpart" v-show="loginflag">
              <span class="txt">{{chatinfo.nologin}}</span>
              <span class="blue" @click="login">{{chatinfo.login}}</span>
            </div>
            <div class="forbitpart" v-show="forbitsayflag">
              <span class="txt">{{chatinfo.forbitsay}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
  import * as types from '@/store/win-types'
  import Ghead from '@/components/common/Homeheader'
  import Gfoot from '@/components/common/footer'
  import Links from '@/module/home/link'
  import '../../../static/cklive/css/index.css'
  // import '../../../static/cklive/src/ckplayer/ckplayer.js'
  import {
    danmu
  } from '../../../static/js/danmu.babel.min.js'
  import {
    getservertimeurl,
    faviratestateurl,
    favirateaddurl,
    faviratedelurl,
    getmsglisturl,
    warntxt,
    forbidlistaddurl,
    forbidlistdelurl,
    forbidlisturl,
    messagedelurl,
    messageaddurl,
    getliveinfourl,
    forbidlistinfo,
    liveinfo,
    chatinfo
  } from '@/module/home/config/liveinfo'
  export default {
    name: 'Flivedetail',
    data() {
      return {
        liveinfo: liveinfo,
        chatinfo: chatinfo,
        forbidlistinfo: forbidlistinfo,
        scroll: '',
        forbidscrolls: '',
        socketclass: 'send',
        livechat: 'livechat',
        forbidscroll: 'forbidscroll',
        id: '',
        chatlist: [],
        systemcount: 0,
        totalperson: 0,
        Mlefthei: window.innerHeight - 65 - 50 - 58,
        totalcustomer: 0,
        loginflag: true,
        danmu: '',
        danmuinfo: [],
        lockflag: false,
        forbitsayflag: false,
        adminmasterflag: false,
        forbidsearchval: '',
        forbidarr: [],
        forbidlistflag: 'height:0',
        liveId: location.hash.split('?')[1].split('=')[1],
        livename: '',
        channel: [],
        channelB: [],
        channelS: [],
        channeltitle: [],
        master: '',
        mastername: '',
        userid: '',
        checkforbidlist: {},
        favirateclass: 'icon-starbg',
        forbidarrshow: [],
        intervalcount: null,
        nowtime: 0,
        username: '',
        pic: '',
        realname: '',
        ctrlflag: false,
        jsload: false
      }
    },
    created() {
      let _this = this
      let ckplay = document.createElement('script')
      ckplay.setAttribute('src', '/static/cklive/src/ckplayer/ckplayer.js')
      ckplay.setAttribute('id', 'ckscript')
      if (!document.getElementById('ckscript')) {
        document.body.appendChild(ckplay)
        ckplay.onload = function() {
          _this.jsload = true
        }
      } else {
        this.jsload = true
      }
      if (this.$store.state.userinfo.realName) {
        this.realname = this.$store.state.userinfo.realName
        this.userid = this.$store.state.userinfo.id
        this.pic = this.$store.state.userinfo.picture
        this.username = this.$store.state.userinfo.userName
      } else {
        let temp = 'temp_' + new Date().getTime()
        if (localStorage.getItem('templiveuser')) {
          temp = localStorage.getItem('templiveuser')
        }
        this.realname = temp
        this.userid = temp
        this.pic = ''
        this.username = temp
      }
      // 获取直播信息
      this.getliveinfo()
    },
    components: {
      Ghead,
      Gfoot,
      Links
    },
    sockets: {
      connect() {
        this.id = this.$socket.id
        if (!this.systemcount) {
          this.$socket.emit('join', {
            realName: this.realname,
            pic: this.pic,
            userName: this.username,
            masterid: this.master,
            userid: this.userid,
            urls: location.href
          })
          this.systemcount++
        }
      },
      message(val) {
         // debugger
         // createDate: 1578478940398
         // messageContent: "<img src="/static/qqface/face/47.gif">"
         // messageId: "7ab7fbb1b96544bd8f0ce248208ebf76"
         // pic: null
         // scene: "d6752ed9b99b443cb3865865d0dbbf63"
         // send: "ef4f6f37f5a4472bab0f10fe42df788f"
         // sql: "insert base_message (messageId,pic,userName,send,scene,messageContent,createDate) values(#{messageId},#{pic},#{userName},#{send},#{scene},#{messageContent},#{createDate})"
         // type: "user"
         // userName: "张乐"



         // createDate: "2020-01-08 18:30:46"
         // date: "18:30"
         // forbid: "禁言"
         // masterid: "ef4f6f37f5a4472bab0f10fe42df788f"
         // messageContent: "<img src="/static/qqface/face/56.gif">"
         // messageId: "3cbaccfc9e3d40c484f55855cec66168"
         // pic: null
         // realName: "张乐"
         // receive: null
         // scene: "d6752ed9b99b443cb3865865d0dbbf63"
         // send: "ef4f6f37f5a4472bab0f10fe42df788f"
         // type: "user"
         // urls: "http://localhost:8000/#/Flivedetail?liveid=d6752ed9b99b443cb3865865d0dbbf63"
         // userName: "张乐"
         // userid: "ef4f6f37f5a4472bab0f10fe42df788f"

        if (this.userid === val.send) {
          val.type = 'me'
        } else {
          val.type = 'user'
        }
        val.createDate = this.formcatdate(val.createDate);
        val.date = val.createDate.split(' ')[1].substr(0, 5);
        val.forbid = "禁言"
        for (let forbiditem = 0; forbiditem < this.forbidarr.length; forbiditem++) {
          if (this.forbidarr[forbiditem].userid === val.send) {
          val.forbid = "解除禁言"
          }
        }
        val.masterid = val.send;
        val.receive = null
        val.urls = location.href;
        val.userid = val.send;
        val.realName = val.userName;
        this.chatlist.push(val)
        let that = this
        if (val.type !== 'system') {
          if (this.danmu) {
            this.danmu.cfg.info.push({
              content: val.messageContent
            })
          } else {
            this.danmuinfo.push({
              content: val.messageContent
            })
          }
        }
        if (!this.danmu) {
          this.danmu = danmu({
            info: that.danmuinfo
          })
        } else {
          if (this.danmu.cfg.danmuappendflag) {
            this.danmu.danmuevent()
          }
        }
      },
      livemessage(value) {
        debugger
        var val = JSON.parse(value)
        if (val.type !== 'master' && val.type !== 'system') {
          if (this.userid === val.userid) {
            val.type = 'me'
          } else {
            val.type = 'user'
          }
        }
        this.chatlist.push(val)
        if (val.person) {
          this.totalperson = val.person
        }
        if (val.type !== 'system') {
          if (this.danmu) {
            this.danmu.cfg.info.push({
              content: val.messageContent
            })
          } else {
            this.danmuinfo.push({
              content: val.messageContent
            })
          }
        }
        let that = this
        if (!this.danmu) {
          this.danmu = danmu({
            info: that.danmuinfo
          })
        } else {
          if (this.danmu.cfg.danmuappendflag) {
            this.danmu.danmuevent()
          }
        }
      },
      stoplive(val) {
        debugger
        let that = this
        console.log(val, 'val from stoplive livedetail')
        if (val.liveid === that.liveId) {
          console.warn('管理员触发了停止直播命令')
          localStorage.removeItem('templiveuser')
          this.win(liveinfo.stoplive, function() {
            that.$router.push({
              name: 'Flive'
            })
          }, false)
        }
      },
      forbidmsg(val) {
        debugger
        let forbidme = 0
        for (let forbiditem = 0; forbiditem < val.forbid.length; forbiditem++) {
          if (val.forbid[forbiditem].userid === this.userid) {
            this.forbitsayflag = true
            document.getElementById('sendmessage').blur()
            forbidme++
            break
          }
        }
        if (!forbidme) {
          this.forbitsayflag = false
        }
      },
      chatlist(val) {
        debugger
        this.chatlist = val
      }
    },
    methods: {
      formcatdate(time) {
        let dateval = new Date(time)
        return dateval.getFullYear() + '-' + this.doubleformcat(dateval.getMonth() + 1) + '-' + this.doubleformcat(
            dateval.getDate()) + ' ' + this.doubleformcat(dateval.getHours()) + ':' + this.doubleformcat(dateval.getMinutes()) +
          ':' + this.doubleformcat(dateval.getSeconds())
      },
      doubleformcat(val) {
        return val < 10 ? ('0' + val) : val
      },
      getservertime(endtime, stime) {
        let that = this
        this.axios({
            method: 'post',
            url: getservertimeurl
          })
          .then(function(res) {
            //      that.dateval = res.data.result.date.split(' ')[0]
            let time = res.data.result.date
            that.intervalcount = setInterval(function() {
              time = new Date(time).getTime() + 1000
              if (time - stime > endtime - stime) {
                // 直播结束了
                clearInterval(that.intervalcount)
                that.$socket.emit('stoplive', {
                  'liveid': that.liveId
                })
                //          that.$router.push({name: 'Flive'})
              }
              that.nowtime = that.formcatdate(time)
            }, 1000)
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      keydown(ev) {
        let obj = ev.target.innerHTML
        let that = this
        if ((ev.keyCode === 86 && ev.ctrlKey)) { // ctrl + v 复制
          obj = ev.target.innerHTML
          obj = obj.replace(/<(?!img)[^>]*>/g, '')
          obj = obj.replace(/\s+style="[^"]*"/gi, '')
          let host = location.protocol + '//' + location.hostname
          obj = obj.replace(new RegExp(host, 'g'), '')
          obj = obj.replace(/[\n|\r|\t]/g, '')
          if (navigator.userAgent.toLowerCase().match(/firefox/) != null) { // 针对火狐浏览器，过滤word特殊字符 需要检测一下word
            let start = obj.indexOf('}')
            obj = obj.substring(start + 1, obj.length)
          }
          ev.target.innerHTML = obj
        }
        if ((ev.keyCode === '13' || ev.keyCode === 13) && ev.ctrlKey) {
          if (this.userid.indexOf('temp') >= 0) {
            this.win(liveinfo.nologin, '', false)
            return false
          }
          obj = obj.replace(/\s+style="[^"]*"/gi, '')
          let host = location.protocol + '//' + location.hostname
          obj = obj.replace(new RegExp(host, 'g'), '')
          this.sendmsg(obj, function(messageId) {
            debugger
            if (that.master === that.userid) {
              that.$socket.emit('livemessage', {
                realName: that.realname,
                'messageId': messageId,
                'forbid': that.forbitsayflag ? forbidlistinfo.unforbid : forbidlistinfo.forbid,
                'pic': that.pic,
                'userName': that.username,
                'messageContent': obj,
                type: 'master',
                'masterid': that.master,
                'userid': that.userid,
                'urls': location.href
              })
            } else {
              that.$socket.emit('livemessage', {
                realName: that.realname,
                'messageId': messageId,
                'forbid': that.forbitsayflag ? forbidlistinfo.unforbid : forbidlistinfo.forbid,
                'pic': that.pic,
                'userName': that.username,
                'messageContent': obj,
                type: 'user',
                'masterid': that.master,
                'userid': that.userid,
                'urls': location.href
              })
            }
            document.getElementById('sendmessage').innerHTML = ''
            document.getElementById('sendmessagebtn').className = 'send'
          })
        }
      },
      keyup(ev) {
        let obj = ev.target.innerHTML
        if (obj) {
          document.getElementById('sendmessagebtn').className = 'sendblue'
        } else {
          document.getElementById('sendmessagebtn').className = 'send'
        }
      },

      go() {
        try {
          this.$socket.emit('leave')
        } catch (e) {
          //TODO handle the exception
        }
        this.$router.push({
          name: 'Fliveliving'
        })
        // this.$router.go(-1);
      },
      forbidsearchvalfn() {
        for (let item = 0; item < this.forbidarr.length; item++) {
          if (this.forbidarr[item].userName.indexOf(this.forbidsearchval) >= 0) {
            this.forbidarrshow.splice(item, 1, false)
          }
        }
      },
      getfaviratestate() {
        let that = this
        this.axios({
            method: 'post',
            url: faviratestateurl,
            data: {
              liveId: that.liveId,
              userId: that.userid
            }
          })
          .then(function(res) {
            if (res.data.liveIsCollected === 0) {
              that.favirateclass = 'icon-starbg'
            } else {
              that.favirateclass = 'icon-star'
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      faviratefn(ev) {
        if (!this.username) {
          this.win(warntxt.login, '', false)
        } else {
          if (ev.currentTarget.children[0].className.indexOf('icon-starbg') >= 0) {
            // 添加收藏
            this.addfavirate()
          } else {
            // 取消收藏
            this.delfavirate()
          }
        }
      },
      addfavirate() {
        let that = this
        this.axios({
            method: 'post',
            url: favirateaddurl,
            params: {
              par: {
                resourceId: that.liveId,
                collectType: 1,
                visitUrl: location.href
              }
            }
          })
          .then(function(res) {
            if (res.data.isSuccess) {
              that.win(warntxt.addfaviratesucess, '', false)
              that.favirateclass = 'icon-star'
            } else {
              that.win(warntxt.addfaviratefail, '', false)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      delfavirate() {
        let that = this
        this.axios({
            method: 'post',
            url: faviratedelurl,
            params: {
              par: {
                resourceId: that.liveId
              }
            }
          })
          .then(function(res) {
            if (res.data.isSuccess) {
              that.win(warntxt.delfaviratesucess, '', false)
              that.favirateclass = 'icon-starbg'
            } else {
              that.win(warntxt.delfaviratefail, '', false)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getmsglist() {
        // getmsglisturl
        let that = this
        this.axios({
            method: 'post',
            url: getmsglisturl,
            params: {
              params: {
                scene: that.liveId
              }
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              let objs = res.data.result
              for (let item = 0; item < objs.length; item++) {
                objs[item]['masterid'] = that.master
                objs[item]['userid'] = objs[item].send
                objs[item]['realName'] = objs[item].userName
                objs[item]['urls'] = location.href
                objs[item]['date'] = objs[item].createDate.split(' ')[1].substr(0, 5)
                if (that.userid === that.master) { // 当前用户是主讲
                  if (that.userid === objs[item].send) {
                    objs[item]['type'] = 'master'
                  } else {
                    objs[item]['type'] = 'user'
                  }
                } else {
                  if (that.userid === objs[item].send) {
                    objs[item]['type'] = 'me'
                  } else {
                    objs[item]['type'] = 'user'
                  }
                }
                objs[item]['forbid'] = forbidlistinfo.forbid // 赋初始值禁言
                for (let forbiditem = 0; forbiditem < that.forbidarr.length; forbiditem++) {
                  if (that.forbidarr[forbiditem].userid === objs[item].send) {
                    objs[item]['forbid'] = forbidlistinfo.unforbid // 修改初始值为解除禁言
                    break
                  }
                }
                that.$socket.emit('forbidmsg', {}, that.forbidarr)
              }
              that.chatlist = objs
            } else {
              that.win(warntxt.getmsglistfail, '', false)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getfobidlistadd(item, fn) {
        console.log(item, 'add item')
        let that = this
        this.axios({
            method: 'post',
            url: forbidlistaddurl,
            params: {
              params: {
                scene: that.liveId,
                userId: item.userid,
                icon: item.pic,
                userName: item.realName
              }
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              that.win(warntxt.forbidaddsuccess, '', false)
              fn()
            } else {
              that.win(warntxt.forbidaddfail, '', false)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getfobidlistdel(param, fn) {
        let that = this
        this.axios({
            method: 'post',
            url: forbidlistdelurl,
            params: {
              params: {
                blacklistId: param
              }
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              that.win(warntxt.delsucced, '', false)
              if (typeof fn === 'function') {
                fn()
              }
            } else {
              that.win(warntxt.undelsucced, '', false)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getforbidlist() {
        let that = this
        this.axios({
            method: 'post',
            url: forbidlisturl,
            params: {
              params: {
                scene: that.liveId
              }
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              let objs = res.data.result
              let temp = []
              for (let item = 0; item < objs.length; item++) {
                temp[item] = {}
                temp[item]['userid'] = objs[item].userId
                temp[item]['pic'] = objs[item].icon
                temp[item]['userName'] = objs[item].userName
                that.forbidarrshow.splice(item, 1, true)
              }
              that.forbidarr = temp
            } else {
              that.win(warntxt.getforbidlistfail, '', false)
            }
            that.getmsglist() // 获取消息列表
          })
          .then(function() {
            let clear = null
            setTimeout(function() {
              that.$Check({
                'father': '#forbidscroll .forbidlist span',
                'multline': {
                  'flag': true,
                  'classname': '#forbidscroll .forbidlist',
                  'index': []
                },
                'checktop': 'scrollson',
                'inputflag': true
              }, function(id, val, str) {
                that.checkforbidlist = str
              })
              clearTimeout(clear)
            }, 500)
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      delchat(ev, item, ind) {
        let that = this
        if (item.type === 'system') {
          ev.currentTarget.parentNode.parentNode.removeChild(ev.ccurrentTarget.parentNode)
        } else {
          this.delmsg(item.messageId, function() {
            that.chatlist.splice(ind, 1)
            that.$socket.emit('chatlist', that.chatlist)
          })
        }
      },
      delmsg(messageId, fn) {
        let that = this
        this.axios({
            method: 'post',
            url: messagedelurl,
            params: {
              params: {
                messageId: messageId
              }
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              fn()
            } else {
              that.win(warntxt.delmsgfailed, '', false)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      nosay(item, ind) {
        let that = this
        if (item.forbid === forbidlistinfo.unforbid) {
          item.forbid = forbidlistinfo.forbid
          for (let items = 0; items < this.forbidarr.length; items++) {
            if (this.forbidarr[items].userid === item.userid) {
              this.forbidarr.splice(items, 1)
              this.forbidarrshow.splice(item, 1)
              let temp = [{
                userId: item.userid,
                scene: this.liveId
              }]
              this.getfobidlistdel(temp, function() {
                that.tosaycallback(item)
              })
              break
            }
          }
        } else {
          item.forbid = forbidlistinfo.unforbid
          this.forbidarr.push(item)
          this.forbidarrshow.push(true)
          this.getfobidlistadd(item, function() {
            that.nosaycallback(item)
          })
        }
      },
      nosaycallback(item) {
        let that = this
        for (let items = 0; items < this.chatlist.length; items++) {
          if (this.chatlist[items].type !== 'system' && this.chatlist[items].type !== 'master') {
            if (this.chatlist[items].userid === item.userid) {
              this.chatlist[items].forbid = item.forbid
            }
          }
        }
        this.$socket.emit('forbidmsg', item, this.forbidarr)
        let clear = null
        clear = setTimeout(function() {
          that.$Check({
            'father': '#forbidscroll .forbidlist span',
            'multline': {
              'flag': true,
              'classname': '#forbidscroll .forbidlist',
              'index': []
            },
            'checktop': 'scrollson',
            'inputflag': true
          }, function(id, val, str) {
            that.checkforbidlist = str
          })
          clearTimeout(clear)
        }, 500)
      },
      tosayall() {
        let that = this
        console.log(this.checkforbidlist, 'this.checkforbidlist')
        let tempobj = ''
        let temp = []
        for (let k in this.checkforbidlist) {
          for (let items = 0; items < this.forbidarr.length; items++) {
            if (this.forbidarr[items].userid === k) {
              temp.push({
                userId: k,
                scene: this.liveId
              })
              tempobj = that.forbidarr[items]
              this.forbidarr.splice(items, 1)
              this.forbidarrshow.splice(items, 1)
              console.log('禁言列表不为空，执行删除操作，并触发socket')
              this.$socket.emit('forbidmsg', tempobj, this.forbidarr)
              break
            }
          }
          for (let items = 0; items < this.chatlist.length; items++) { //
            if (this.chatlist[items].type !== 'system' && this.chatlist[items].type !== 'master') {
              if (this.chatlist[items].userid === k) {
                this.chatlist[items].forbid = forbidlistinfo.forbid
              }
            }
          }
        }
        this.getfobidlistdel(temp)
        let clear = null
        clear = setTimeout(function() {
          that.$Check({
            'father': '#forbidscroll .forbidlist span',
            'multline': {
              'flag': true,
              'classname': '#forbidscroll .forbidlist',
              'index': []
            },
            'checktop': 'scrollson',
            'inputflag': true
          }, function(id, val, str) {
            that.checkforbidlist = str
          })
          clearTimeout(clear)
        }, 500)
      },
      tosay(item) {
        let that = this
        let temp = [{
          userId: item.userid,
          scene: this.liveId
        }]
        this.getfobidlistdel(temp, function() {
          that.tosaycallback(item)
        })
      },
      tosaycallback(item) {
        console.log(item, 'item-------------')
        let that = this
        for (let items = 0; items < this.forbidarr.length; items++) {
          if (this.forbidarr[items].userid === item.userid) {
            this.forbidarr.splice(items, 1)
            this.forbidarrshow.splice(item, 1)
            break
          }
        }
        for (let items = 0; items < this.chatlist.length; items++) {
          if (this.chatlist[items].type !== 'system' && this.chatlist[items].type !== 'master') {
            if (this.chatlist[items].userid === item.userid) {
              this.chatlist[items].forbid = forbidlistinfo.forbid
            }
          }
        }
        this.$socket.emit('forbidmsg', item, this.forbidarr)
        let clear = null
        clear = setTimeout(function() {
          that.$Check({
            'father': '#forbidscroll .forbidlist span',
            'multline': {
              'flag': true,
              'classname': '#forbidscroll .forbidlist',
              'index': []
            },
            'checktop': 'scrollson',
            'inputflag': true
          }, function(id, val, str) {
            that.checkforbidlist = str
          })
          clearTimeout(clear)
        }, 500)
      },
      sendmsg(content, fn) {
        let that = this
        this.axios({
            method: 'post',
            url: messageaddurl,
            params: {
              params: {
                scene: that.liveId, // 直播id
                send: that.userid, // 用户id
                messageContent: content,
                pic: that.pic,
                userName: that.realname
              }
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              fn(res.data.result.messageId)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getliveinfo() {
        let that = this
        this.axios({
            method: 'post',
            url: getliveinfourl,
            data: {
              liveId: that.liveId
            }
          })
          .then(function(res) {
            that.livename = res.data.liveName
            that.mastername = res.data.adminName
            that.totalcustomer = res.data.viewers
            let stime = new Date(res.data.beginTime).getTime()
            let endtime = new Date(res.data.endTime).getTime()
            let channeltemp = res.data.channel
            let channelBtemp = res.data.channelB
            let channelStemp = res.data.channelS
            that.channel = []
            that.channelB = []
            that.channelS = []
            that.channeltitle = []
            for (let item = 0; item < channeltemp.length; item++) {
              if (channeltemp[item].liveurl) {
                that.channel.push(channeltemp[item].liveurl)
                that.channeltitle.splice(item, 1, that.livename)
              }
            }
            for (let item = 0; item < channelBtemp.length; item++) {
              if (channelBtemp[item].liveurl) {
                that.channelB.push(channelBtemp[item].liveurl)
                that.channeltitle.splice(item, 1, that.livename)
              }
            }
            for (let item = 0; item < channelStemp.length; item++) {
              if (channelStemp[item].liveurl) {
                that.channelS.push(channelStemp[item].liveurl)
                that.channeltitle.splice(item, 1, that.livename)
              }
            }
            that.master = res.data.admin
            if (that.username === 'admin' || that.userid === that.master) { // admin或者主讲显示禁言黑名单，鼠标经过显示锁屏，以及相关操作
              that.adminmasterflag = true
            }
            let modelval = []
            if (that.channelB.length > 0) {
              modelval.push({
                type: 'normal',
                name: '标清'
              })
            }
            if (that.channel.length > 0) {
              modelval.push({
                type: 'high',
                name: '高清'
              })
            }
            if (that.channelS.length > 0) {
              modelval.push({
                type: 'super',
                name: '超清'
              })
            }
            var infos = {
              livecenter: true,
              channelflag: false,
              channelnum: that.channeltitle.length, // 分屏模式
              channel: that.channel,
              channelB: that.channelB,
              channelS: that.channelS,
              channeltitle: that.channeltitle,
              model: modelval,
              widhei: {
                wid: 854,
                hei: 561
              }
            }
            if (that.jsload) {
              that.$CFCMXK(infos)
            } else { // jsload未加载，等待加载
              let clear = null
              clear = setInterval(function() {
                that.$CFCMXK(infos)
                clearInterval(clear)
              }, 100)
            }
            that.getservertime(endtime, stime)
            that.getfaviratestate()
            if (that.username) {
              that.getforbidlist() // 获取禁言列表
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      socketsend(ev) {
        let that = this
        if (this.userid.indexOf('temp') >= 0) {
          this.win(liveinfo.nologin, '', false)
          return false
        }
        let obj = ev.currentTarget.previousElementSibling.innerHTML
        if (!obj) {
          return false
        }
        obj = obj.replace(/<(?!img)[^>]*>/g, '')
        obj = obj.replace(/\s+style="[^"]*"/gi, '')
        let host = location.protocol + '//' + location.hostname
        obj = obj.replace(new RegExp(host, 'g'), '')
        this.sendmsg(obj, function(messageId) {
          if (that.master === that.userid) {
            that.$socket.emit('livemessage', {
              realName: that.realname,
              'messageId': messageId,
              'forbid': that.forbitsayflag ? forbidlistinfo.unforbid : forbidlistinfo.forbid,
              'pic': that.pic,
              'userName': that.username,
              'messageContent': obj,
              type: 'master',
              'masterid': that.master,
              'userid': that.userid,
              'urls': location.href
            })
          } else {
            debugger
            that.$socket.emit('livemessage', {
              realName: that.realname,
              'messageId': messageId,
              'forbid': that.forbitsayflag ? forbidlistinfo.unforbid : forbidlistinfo.forbid,
              'pic': that.pic,
              'userName': that.username,
              'messageContent': obj,
               type: 'user',
              'masterid': that.master,
              'userid': that.userid,
              'urls': location.href
            })
          }
          document.getElementById('sendmessage').innerHTML = ''
          document.getElementById('sendmessagebtn').className = 'send'
        })
      },
      showlockpart(ev) {
        let flag = ev.currentTarget
        flag.querySelector('.lockpart').style.display = 'block'
        //    if (this.adminmasterflag) { // admin或者主讲有权限， 还差主讲获取
        //      flag.querySelector('.lockpart').style.display = 'block'
        //    }
      },
      hidelockpart(ev) {
        let flag = ev.currentTarget
        flag.querySelector('.lockpart').style.display = 'none'
        //    if (this.adminmasterflag) { // admin或者主讲有权限， 还差主讲获取
        //      flag.querySelector('.lockpart').style.display = 'none'
        //    }
      },
      hideforbidlist() {
        this.forbidlistflag = 'height:0'
      },
      showlockparts(ev) {
        ev.currentTarget.style.display = 'block'
      },
      hidelockparts(ev) {
        ev.currentTarget.style.display = 'none'
      },
      lockoption(ev) {
        let flag = ev.currentTarget
        if (flag.children[0].className.indexOf('icon-unlock') >= 0) {
          // 锁定操作
          flag.children[0].className = flag.children[0].className.replace(/(icon-unlock)/gi, 'icon-lock')
          flag.children[1].textContent = chatinfo.unlock
          this.lockflag = true
        } else {
          // 解锁操作
          flag.children[0].className = flag.children[0].className.replace(/(icon-lock)/gi, 'icon-unlock')
          flag.children[1].textContent = chatinfo.lock
          this.lockflag = false
        }
      },
      showforbidlist() {
        if (this.forbidlistflag) {
          this.forbidlistflag = ''
        } else {
          this.forbidlistflag = 'height:0'
        }
      },
      clearoption() {
        document.getElementById('livechat').querySelector('.scrollson').innerHTML = ''
        this.danmuinfo = []
        if (this.danmu) {
          this.danmu.cfg.info = []
        }
        //    this.chatlist = []
      },
      login() {
        window.location.href = '/base/login?beforeurl=' + location.href
      },
      win(content, backfn, flag) {
        if (flag === undefined) {
          flag = true
        }
        this.$Win({
          'title': types.title,
          'type': 'txt',
          'content': content,
          'timeout': types.Timeout3,
          'cancel': function(obj) {
            obj.remove(obj.getid)
          },
          'closeshow': flag,
          'timefn': function() {
            if (backfn) {
              backfn()
            }
          }
        })
      }
    },
    updated() {
      if (this.scroll && !this.lockflag) {
        if (document.querySelector('#livechat')) {
          this.scroll.addElement()
        }
      }
      if (this.forbidscrolls) {
        if (document.querySelector('#forbidscroll')) {
          this.forbidscrolls.addElement()
        }
      }
    },
    watch: {
      '$route'(to, from) {
        if (location.hash.indexOf('Flive') >= 0) {
          document.querySelector('a[href="#/Flive"]').setAttribute('class', 'a active')
        }
      }
    },
    mounted() {
      this.danmu = danmu({
        info: []
      })
      if (!this.scroll) {
        this.scroll = this.$Scroll({
          'father': 'livechat',
          'getfatheridPosition': document.querySelector('#livechat'),
          'scrolltop': 'bottom',
          'scrollels': '.app'
        })
      }
      if (!this.forbidscrolls) {
        this.forbidscrolls = this.$Scroll({
          'father': 'forbidscroll',
          'getfatheridPosition': document.querySelector('#livechat'),
          'scrolltop': 'top',
          'scrollels': '.app'
        })
      }
      if (this.username) {
        this.loginflag = false
        this.$socket.emit('connect')
      } else {
        this.loginflag = true
      }
      let qqface = document.createElement('script')
      qqface.setAttribute('src', '/static/qqface/qqface.js')
      document.body.appendChild(qqface)
      if (location.hash.indexOf('Flive') >= 0) {
        document.querySelector('a[href="#/Flive"]').setAttribute('class', 'a active')
      }
      if (localStorage.getItem('templiveuser')) { // 登陆后，删除node服务器端的临时id
        this.$socket.emit('deltemp', {
          id: localStorage.getItem('templiveuser'),
          'urls': location.href
        })
        localStorage.removeItem('templiveuser')
      }
    }
  }
</script>

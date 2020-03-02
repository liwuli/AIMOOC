<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
      <router-view name="b"></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Flive.css"/>
    <link rel="stylesheet" type="text/css" href="/static/cklive/css/indexvideo.css"/>
    <Link></Link>
    <div class="center centerbottom50">
      <div class="centers1100"  :style="'min-height:' + Mlefthei + 'px;'">
        <div class="liveback" @click="go"><&nbsp;{{livename}} - {{mastername}}</div>
        <div class="liveuserinfo">
        	<span class="pinkuser">{{liveinfo.pinkuser}}{{totalcustomer}}{{liveinfo.pinkuserinfo}}</span>
        	<!--<div class="users">
        		<span class="usericon iconfont icon-seeperson"></span>
        		<span class="txt">{{totalperson}}{{liveinfo.person}}</span>
        	</div>-->
        </div>
        <div class="livedetailcenter">
        	<div class="liveplayer" id="liveplayer">
						<div id="playerArealocal" ></div>
						<div class="favirate" @click="faviratefn($event)">
							<span class="staricon iconfont " :class="favirate"></span>
							<span class="txt">{{liveinfo.favirate}}</span>
						</div>
					</div>
					<div class="chatpart">
						<div class="title">
							{{liveinfo.chat}}
						</div>
						<div class="scrollfather" :id="livechat" style="box-shadow:none;width:230px;height:490px">
							<div class="scrollson" style="min-height: 490px;">
							  <div class="chatlist" v-for="(item, ind) in chatlist">
							  	<div class="headline" v-if="item.type === 'system'">
										<span class="headicon iconfont"  :class="'bellcolor  icon-sysmsg'"></span>
										<span class="headtxt">{{chatinfo.system}}</span>
										<span class="headdate">{{item.date}}</span>
									</div>
									<div class="headline" :id="item.messageId" v-if="item.type === 'me'">
										<span class="headicon iconfont"  :class="'blulecolor  icon-msg'"></span>
										<span class="headtxt">{{chatinfo.me}}</span>
										<span class="headdate">{{item.date}}</span>
									</div>
									<div class="headline"  :id="item.messageId" v-if="item.type === 'user'">
										<span class="headicon iconfont"  :class="'blulecolor  icon-msg'"></span>
										<span class="headtxt">{{item.userName}}</span>
										<span class="headdate">{{item.date}}</span>
									</div>
									<div class="headline"  :id="item.messageId" v-if="item.type === 'master'">
										<span class="headicon iconfont"  :class="'mastercolor  icon-hdmaster'"></span>
										<span class="headtxt">{{chatinfo.master}}</span>
										<span class="headdate">{{item.date}}</span>
									</div>
									<div class="content" v-html="item.messageContent"></div>
							  </div>
						 	</div>
							<div class="scroll_ymove">
								<div class="scroll_y" ></div>
							</div>
							<div class="scroll_xmove">
								<div class="scroll_x"></div>
							</div>
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
import Link from '@/module/home/link'
import {faviratestateurl, favirateaddurl, livereviewurl, faviratedelurl, getmsglisturl, warntxt, liveinfo, chatinfo} from '@/module/home/config/liveinfo'
export default {
  name: 'Fliveoverdetail',
  data () {
    return {
      liveinfo: liveinfo,
      chatinfo: chatinfo,
      scroll: '',
      forbidscrolls: '',
      livechat: 'livechat',
      forbidscroll: 'forbidscroll',
      id: '',
      chatlist: [],
      Mlefthei: window.innerHeight - 65 - 50 - 58,
      totalcustomer: 0,
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
      favirate: 'icon-starbg',
      infos: {}
    }
  },
  created () {
    // 获取直播信息
    this.getliveinfo()
    this.getfaviratestate()
  },
  components: {
    Ghead,
    Gfoot,
    Link
  },
  methods: {
    go () {

      this.$router.push({name: 'Fhome'})
    },
    getfaviratestate () {
      let that = this
      this.axios({
        method: 'post',
        url: faviratestateurl,
        data: {
          liveId: that.liveId,
          userId: that.$store.state.userinfo.id
        }
      })
      .then(function (res) {
        if (res.data.liveIsCollected === 0) {
          that.favirate = 'icon-starbg'
        } else {
          that.favirate = 'icon-star'
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    faviratefn (ev) {
      if (!this.$store.state.userinfo.userName) {
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
    addfavirate () {
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
      .then(function (res) {
        if (res.data.isSuccess) {
          that.win(warntxt.addfaviratesucess, '', false)
          that.favirate = 'icon-star'
        } else {
          that.win(warntxt.addfaviratefail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    delfavirate () {
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
      .then(function (res) {
        if (res.data.isSuccess) {
          that.win(warntxt.delfaviratesucess, '', false)
          that.favirate = 'icon-starbg'
        } else {
          that.win(warntxt.delfaviratefail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getmsglist () {
      // getmsglisturl
      let that = this
      this.axios({
        method: 'post',
        url: getmsglisturl,
        params: {
          params: {
            scene: that.liveId,
            send: that.userid // 用户id
          }
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          let objs = res.data.result
          for (let item = 0; item < objs.length; item++) {
            objs[item]['masterid'] = that.master
            objs[item]['userid'] = objs[item].send
            objs[item]['urls'] = location.href
            objs[item]['date'] = objs[item].createDate.split(' ')[1].substr(0, 5)
            if (that.userid === that.master) { // 主讲
              objs[item]['type'] = 'master'
            } else {
              if (that.userid === objs[item].send) {
                objs[item]['type'] = 'me'
              } else {
                objs[item]['type'] = 'user'
              }
            }
          }
          that.chatlist = objs
        } else {
          that.win(warntxt.getmsglistfail, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getliveinfo () {
      let that = this
      this.axios({
        method: 'post',
        url: livereviewurl,
        data: {
          liveId: that.liveId
        }
      })
      .then(function (res) {
        if (!res.data.isSuccess) {
          that.win(res.data.data, '', false)
        } else {
          that.livename = res.data.live.liveName
          that.mastername = res.data.live.adminName
          that.totalcustomer = res.data.live.viewers
          that.channel = res.data.resList02
          that.channelB = res.data.resList01
          that.channelS = res.data.resList03
          that.channeltitle = res.data.titleList
          that.master = res.data.admin
          that.userid = that.$store.state.userinfo.id
          if (that.$store.state.userinfo.userName === 'admin' || that.userid === that.master) { // admin或者主讲显示禁言黑名单，鼠标经过显示锁屏，以及相关操作
            that.adminmasterflag = true
          }
          let modelval = []
          if (that.channelB.length > 0) {
            modelval.push('标清')
          }
          if (that.channel.length > 0) {
            modelval.push('高清')
          }
          if (that.channelS.length > 0) {
            modelval.push('超清')
          }
          var infos = {
            id: 'playerArealocal',
            channelnum: 1, // 分屏模式
            channel: that.channel,
            channelB: that.channelB,
            channelS: that.channelS,
            channeltitle: that.channeltitle,
            model: modelval,
            autoplay: true,
            mainfile: [0, 0],
            knowledge: [],
            widhei: {
              wid: 854,
              hei: 481
            }
          }
          that.$Video(infos)
          if (that.$store.state.userinfo.userName) {
            that.getmsglist() // 获取禁言列表
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    win (content, backfn, flag) {
      if (flag === undefined) {
        flag = true
      }
      this.$Win({
        'title': types.title,
        'type': 'txt',
        'content': content,
        'timeout': types.Timeout3,
        'cancel': function (obj) {
          obj.remove(obj.getid)
        },
        'closeshow': flag,
        'timefn': function () {
          if (backfn) {
            backfn()
          }
        }
      })
    }
  },
  updated () {
    if (this.scroll && !this.lockflag) {
      if (document.querySelector('#livechat')) {
        this.scroll.addElement()
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (location.hash.indexOf('Flive') >= 0) {
        document.querySelector('a[href="#/Flive"]').setAttribute('class', 'a active')
      }
    }
  },
  mounted () {
    if (!this.scroll) {
      this.scroll = this.$Scroll({
        'father': 'livechat',
        'getfatheridPosition': document.querySelector('#livechat'),
        'scrolltop': 'bottom',
        'scrollels': '.app'
      })
    }
    if (location.hash.indexOf('Flive') >= 0) {
      document.querySelector('a[href="#/Flive"]').setAttribute('class', 'a active')
    }
  }
}
</script>

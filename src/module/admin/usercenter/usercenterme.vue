<template>
  <div class="app">
  	<Ghead></Ghead>
  	<link rel="stylesheet" type="text/css" href="../../../../static/css/default/Usercenter.css"/>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<div class="U_left" :style="'min-height:' + Mlefthei + 'px;'">
    			<div class="userinfo">
    				<div class="img" @click="jumptobasicupload">
    					<img v-if="!allurl" :src="userinfo.picture ? userinfo.picture : duserpath"/>
    					<img v-if="allurl" :src="allurl"/>
    					<div class="hover">
    						<span class="showicon iconfont icon-xiugai"></span>
    					</div>
    				</div>
    				<div class="name">{{userinfo.userName}}</div>
    				<!--<div class="edit iconfont icon-xiugai"></div>-->
    			</div>
		 			<div class="Manage" v-for="(items, ind) in links">
		 				<span class="iconfont iconcssed" :class="'icon-' + items.icon" v-if="ind === 0" ></span>
		 				<span class="iconfont iconcss" :class="'icon-' + items.icon" v-if="ind !== 0" ></span>
		 				<router-link :key="ind" class="a hides active" v-if="ind === 0" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
		 				<router-link :key="ind" class="a hides" v-if="ind !== 0 && ind !== 6" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
		 				<!--<a :href="editurl"  class="a hides" v-if="ind === 5"  target="_blank">{{items.name}}</a>-->
		 			</div>
			  </div>
    		<div class="U_right" :style="'min-height:' + Mlefthei + 'px;'">
    			<div class="tab">
						<span :class="tabselect[ind]" v-for="(item, ind) in metab" @click="changedata(ind)">{{item.name}}</span>
					</div>
					<div class="left30" v-show="tabselect[0] === 'span'">
						<div class="edit" @click="editflag" style="display: none;">{{basicinfo.edit}}</div>
						<div class="basicline">
							<span class="txt">{{basicinfo.type}}：</span>
							<span class="txt">{{userinfo.typerole}}</span>
						</div>
						<div class="basicline">
							<span class="txt">{{eduType?basicinfo.college:basicinfo.grade}}：</span>
							<span class="txt">{{userinfo.departments}}</span>
						</div>
						<div class="basicline">
							<span class="txt">{{basicinfo.code}}：</span>
							<span class="txt">{{userinfo.code}}</span>
						</div>
						<div class="basicline">
							<span class="txt">{{basicinfo.name}}：</span>
							<span class="txt">{{userinfo.realName}}</span>
						</div>
						<div class="basicline">
							<span class="txt">{{basicinfo.tel}}：</span>
							<span class="txt">{{userinfo.telephone}}</span>
						</div>
						<div class="save" @click="savefn" v-show="edit">{{basicinfo.save}}</div>
					</div>
					<div class="left30" v-show="tabselect[1] === 'span'">
						<div class="basicline">
							<span class="txt">{{basicinfo.orpass}}：</span>
							<input type="password" v-model="orpass" @blur="orpassvalid" class="input"/>
							<span class="icons iconfont" v-show="orpassval"  :class="!orflag ? 'icon-del red' : 'icon-bingo blue'"></span>
							<span class="txt"  :class="!orflag ? 'red' : 'blue'">{{orpassval}}</span>
						</div>
						<div class="basicline">
							<span class="txt">{{basicinfo.newpass}}：</span>
							<input type="password" v-model="newpass" @blur="newpassvalid"  class="input"/>
							<span class="icons iconfont" v-show="newpassval" :class="!newflag ? 'icon-del red' : 'icon-bingo blue'"></span>
							<span class="txt" :class="!newflag ? 'red' : 'blue'">{{newpassval}}</span>
							<span class="warn">{{basicinfo.warn}}</span>
						</div>
						<div class="basicline">
							<span class="txt">{{basicinfo.newpassrepeat}}：</span>
							<input type="password" v-model="newpassrepeat" @blur="newpassrepeatvalid"  class="input"/>
							<span class="icons iconfont"  v-show="newpassrepeatval" :class="!reflag ? 'icon-del red' : 'icon-bingo blue'"></span>
							<span class="txt" :class="!reflag ? 'red' : 'blue'">{{newpassrepeatval}}</span>
						</div>
						<div class="save" @click="savepassevent" >{{basicinfo.save}}</div>
					</div>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/Nheader'
import AJposition from '@/components/extend/position'
import {warntxt, passsaveurl, links, metab, basicinfo} from '@/module/admin/usercenter/config/usercenterinfo'
export default {
  name: 'AJusercenterme',
  data () {
    return {
      eduType: this.$store.state.educationType,
      links: links,
      basicinfo: basicinfo,
      metab: metab,
      Mlefthei: window.innerHeight - 65,
      userinfo: {},
      tabselect: ['span', ''],
      allurl: '',
      edit: false,
      orpass: '',
      newpass: '',
      newpassrepeat: '',
      orpassval: '',
      newpassval: '',
      newpassrepeatval: '',
      orflag: false,
      newflag: false,
      reflag: false,
      editurl: '',
      duserpath: '/static/images/D_user.png'
    }
  },
  created () {
    this.userinfo = Object.assign({}, this.$store.state.userinfo)
    this.editurl = 'http://192.168.20.152:9026/?token=' + this.userinfo.userName
  },
  components: {
    Ghead,
    AJposition
  },
  methods: {
    orpassvalid () {
      if (this.orpass.toString().replace(/\s/gi, '') === '') {
        this.orpassval = warntxt.orpass
        this.orpass = ''
        this.orflag = false
      } else {
        let that = this
        this.axios({
          method: 'post',
          url: passsaveurl,
          params: {
            par: {
              userId: that.userinfo.id,
              oldPassword: that.orpass
            }
          }
        })
        .then(function (res) {
          if (res.data.isSuccess) {
            that.orpassval = basicinfo.orpassok
            that.orflag = true
          } else {
            that.orpassval = basicinfo.orpassno
            that.orflag = false
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    newpassvalid () {
      if (this.newpass.toString().replace(/\s/gi, '') === '') {
        this.newpassval = warntxt.newpass
        this.newpass = ''
      } else {
        if (this.newpass.match(/^[a-z|A-Z|\d]{6,16}$/g) === null) {
          this.newpassval = basicinfo.passtypeno
          this.newflag = false
        } else {
          this.newpassval = basicinfo.passtypeok
          this.newflag = true
        }
      }
    },
    newpassrepeatvalid () {
      if (this.newpassrepeat.toString().replace(/\s/gi, '') === '') {
        this.newpassrepeatval = warntxt.newpassrepeat
        this.newpassrepeat = ''
        this.reflag = false
        return false
      }
      if (this.newpassrepeat.match(/^[a-z|A-Z|\d]{6,16}$/g) === null) {
        this.newpassrepeatval = basicinfo.passtypeno
        this.reflag = false
      } else {
        if (this.newpassrepeat === this.newpass) {
          this.newpassrepeatval = basicinfo.passnewtypeok
          this.reflag = true
        } else {
          this.newpassrepeatval = basicinfo.passnewtypeno
          this.reflag = false
        }
      }
    },
    savepassevent () {
      if (!(this.orflag && this.newflag && this.reflag)) {
        this.win(warntxt.check, '', false)
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: passsaveurl,
        params: {
          par: {
            userId: that.userinfo.id,
            oldPassword: that.orpass,
            newPassword: that.newpassrepeat
          }
        }
      })
      .then(function (res) {
        if (res.data.isSuccess) {
          that.win(res.data.data, '', false)
          that.orpass = ''
          that.newpass = ''
          that.newpassrepeat = ''
          that.orpassval = ''
          that.newpassval = ''
          that.newpassrepeatval = ''
          that.orflag = false
          that.newflag = false
          that.reflag = false
        } else {
          that.win(res.data.data, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    editflag () {
      this.edit = true
    },
    savefn () {
      this.edit = false
    },
    jumptobasicupload () {
      this.$router.push({name: 'AJusercentermeupload', query: {name: 'AJusercenterme'}})
    },
    changedata (ind) {
      this.tabselect = ['', '']
      this.tabselect.splice(ind, 1, 'span')
      if (ind === 1) {
        this.changetabflag = true
      } else {
        this.changetabflag = false
      }
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
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJusercenterme') {
        console.log(to, 'to')
        if (to.params.geturl) {
          this.allurl = to.params.allurl
        }
      }
    }
  }
}
</script>

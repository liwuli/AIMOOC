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
		 				<span class="iconfont iconcssed" :class="'icon-' + items.icon" v-if="ind === 1" ></span>
		 				<span class="iconfont iconcss" :class="'icon-' + items.icon" v-if="ind !== 1" ></span>
		 				<router-link :key="ind" class="a hides active" v-if="ind === 1" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
		 				<router-link :key="ind" class="a hides" v-if="ind !== 1 && ind !== 6" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
		 				<!--<a :href="editurl"  class="a hides" v-if="ind === 5"  target="_blank">{{items.name}}</a>-->
		 			</div>
			  </div>
    		<div class="U_right"  :style="'min-height:' + Mlefthei + 'px;'">
    				<div class="allmessage">{{msginfo.allmsg}}</div>
    				<div class="msglist" v-for="item in msglist">
    					<span class="lines">{{item.date}}</span>
    					<span class="lines">{{msginfo.focus}}{{item.content}} {{msginfo.update}}</span>
    				</div>
            <!-- v-if="button_show"       ({'page': (page + 1 > totalpage ? totalpage : page + 1)})-->
    				<div v-if="button_show"  class="msgmore" style="margin-bottom: 50px;"  @click="getmsglist">{{msginfo.more}}</div>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/Nheader'
import AJposition from '@/components/extend/position'
import {msglisturl, links, msginfo} from '@/module/admin/usercenter/config/usercenterinfo'
export default {
  name: 'AJusercenter',
  data () {
    return {
      links: links,
      msginfo: msginfo,
      Mlefthei: window.innerHeight - 65,
      msglist: [],
      userinfo: {},
      page: 1,
      pagesize: 10,
      totalpage: 0,
      allurl: '',
      editurl: '',
      duserpath: '/static/images/D_user.png',
      button_show:true
    }
  },
  created () {
    // 获取消息列表
    this.getmsglist({page: 1})
    this.userinfo = Object.assign({}, this.$store.state.userinfo)
    this.editurl = 'http://192.168.20.152:9026/?token=' + this.userinfo.userName
  },
  components: {
    Ghead,
    AJposition
  },
  methods: {
    getmsglist (obj) {
      let that = this
      // this.page = obj.page
      this.axios({
        method: 'post',
        url: msglisturl,
        params: {
          par: {
            userId: that.$store.state.userinfo.id,
            offset: (that.page - 1) * that.pagesize,
            pageSize: that.page * that.pagesize
          }
        }
      })
      .then(function (res) {
//         //判断后面还有没有数据
         var tot = Math.ceil(res.data.total/ that.pagesize);
         if(tot>that.page){
           // 如果返回结果小于等于10条 后面就不执行了
           // if(res.data.total<=that.pagesize){
           //   that.button_show=false;
           //   return;
           // }
           that.page=that.page+1
//            var num = res.data.total - (that.pagesize * that.page);
//            if(num>=that.pagesize){
//              //后面还有大于10条数据
//
//            }else {
//               // that.button_show=false;
//               // 隐藏按钮
//            }
         }else{
           that.button_show=false;
         }

        let temp = []
        let objs = res.data.data
        that.totalpage = Math.ceil(objs.length / that.pagesize)
        for (let item = 0; item < objs.length; item++) {
          // if (item < that.page * that.pagesize < objs.length ? that.page * that.pagesize : objs.length) {
            temp[item] = {}
            temp[item]['date'] = objs[item].createDate.substring(0, objs[item].createDate.length - 3)
            temp[item]['content'] = objs[item].courseName
            //that.msglist.push(temp)
          // }
        }
        that.msglist = that.msglist.concat(temp);
        // that.msglist = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumptobasicupload () {
      this.$router.push({name: 'AJusercenterbasicupload', query: {name: 'AJusercenter'}})
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
      if (to.name === 'AJusercenter') {
        if (to.params.geturl) {
          this.allurl = to.params.allurl
        }
      }
    }
  }
}
</script>

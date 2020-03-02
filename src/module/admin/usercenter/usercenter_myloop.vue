<template>
  <div class="app">
    <link rel="stylesheet" type="text/css" href="../../../../static/css/default/Usercenter.css"/>
    <Ghead></Ghead>
    <div class="center ">
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
          </div>
          <div class="Manage" v-for="(items, ind) in links">
            <span class="iconfont iconcssed" :class="'icon-' + items.icon" v-if="ind === 5" ></span>
            <span class="iconfont iconcss" :class="'icon-' + items.icon" v-if="ind !== 5" ></span>
            <router-link :key="ind" class="a hides active" v-if="ind === 5" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
            <router-link :key="ind" class="a hides" v-if="ind !== 5 && ind !== 6" :to="{path: items.path}" :title='items.name'>{{items.name}}</router-link>
          </div>
        </div>
        <div class="U_right" :style="'min-height:' + Mlefthei + 'px;'">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Ghead from '@/components/common/Nheader'
  import {links} from '@/module/admin/usercenter/config/usercenterinfo'
  export default {
    name: 'AJusercenterloop',
    data () {
      return {
        links: links,
        pagestyles: 'margin-left:30px',
        Mlefthei: window.innerHeight - 65,
        userinfo: {},
        allurl: '',
        duserpath: '/static/images/D_user.png'
      }
    },
    created () {
      this.userinfo = Object.assign({}, this.$store.state.userinfo)
    },
    components: {
      Ghead
    },
    methods: {
      jumptobasicupload () {
        // this.$router.push({name: 'AJusercenterloop', query: {name: 'AJusercenterloop'}})
      }
    }
  }
</script>

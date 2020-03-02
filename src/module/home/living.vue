<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
      <router-view name="b"></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Flive.css"/>
    <Link></Link>
    <div class="center centerbottom50">
      <div class="centers1100" :style="'min-height: ' + minhei + 'px'">
       <div class="livetab">
      	<span class="span" :class="livetabselectd[ind]" @click="changetype(ind)" v-for="(item, ind) in livetab">{{item}}</span>
      	<input type="text" class="searchinput" v-model="searchval"/>
      	<span class="searchbtn" @click="search">{{liveinfo.search}}</span>
       </div>
       <div class="livepink">
       	<span class="span">{{liveinfo.pink}}：</span>
       	<span class="span" :class="livepinkselectd[ind]" @click="changesee(ind)"  v-for="(item, ind) in livepink">{{item}}</span>
       </div>
      <div class="livelist" @click="jumpdetail(item)" v-for="(item, ind) in listinfo" :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right: 0;' :''">
        <div class="img" >
          <img :src="item.imgurl ? item.imgurl : dlivepath"/>
        </div>
        <span class="name hides" :title="item.name + liveinfo.info + ':' +item.des">{{item.name}}</span>
        <div class="half">
        	<span class="halficon iconfont icon-master"></span>
        	<span class="txt hides" :title="item.person">{{item.person}}</span>
        </div>
        <div class="halfright" >
        	<span class="halficon iconfont icon-seeperson" ></span>
        	<span class="txt">{{item.num}}</span>
        </div>
      </div>
      <page :totalnum="totalnum" :bingo="bingo" @pagepost="pagepost"  :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/Homeheader'
// import * as types from '@/store/win-types'
import Gfoot from '@/components/common/footer'
import Link from '@/module/home/link'
import page from '@/components/extend/page'
import {livecenterurl, pathinfolive, liveinfo, livepink, livepinkselectd, livetab, livetabselectd, products, bingo, pageval, unlivepagesize} from '@/module/home/config/liveinfo'
export default {
  name: 'Fliveliving',
  data () {
    return {
      products: products,
      dlivepath: '/static/images/Dlive.jpg',
      bingo: bingo,
      pageval: pageval,
      pagesize: unlivepagesize,
      totalpage: 0,
      pageindex: 1,
      liveinfo: liveinfo,
      livetabselectd: livetabselectd,
      livetab: livetab,
      livepinkselectd: livepinkselectd,
      livepink: livepink,
      listinfo: [],
      searchval: '',
      hotstate: 0,
      minhei: window.innerHeight - 65 - 50,
      totalnum: 0
    }
  },
  created () {
    this.pagepost({page: 1})
  },
  components: {
    Ghead,
    Gfoot,
    Link,
    page
  },
  methods: {
    jumpdetail (item) {
      switch (item.type) {
        case 1:
          this.$router.push({name: pathinfolive.prex + 'detail', query: {liveid: item.id}})
          break
        case 0:
          this.win(liveinfo.nostart, '', false)
          break
        case 2:
          this.$router.push({name: pathinfolive.prex + 'overdetail', query: {liveid: item.id}})
          break
      }
    },
    search () {
      this.$router.push({name: pathinfolive.prex + 'search', params: {searchval: this.searchval}})
    },
    changetype (num) {
      this.livetabselectd = []
      this.livetabselectd.splice(num, 1, 'selected')
      switch (num) {
        case 0:
          this.$router.push({name: pathinfolive.prex + 'living'})
          break
        case 1:
          this.$router.push({name: pathinfolive.prex + 'unlive'})
          break
        case 2:
          this.$router.push({name: pathinfolive.prex + 'lived'})
          break
      }
    },
    changesee (num) {
      this.hotstate = num
      this.livepinkselectd = ['', '']
      this.livepinkselectd.splice(num, 1, 'selected')
      this.pagepost({page: 1})
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      let that = this
      that.pageindex = obj.page ? obj.page : obj
      this.axios({
        method: 'post',
        url: livecenterurl,
        data: {
          page: {
            pageSize: unlivepagesize,
            pageIndex: that.pageindex
          },
          liveStatus: 1,
          orderType: that.hotstate.toString()
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.livingList
        that.totalnum = res.data.total
        that.totalpage = Math.ceil(that.totalnum  / unlivepagesize)
        for (let item = 0; item < objs.length; item++) {
          if (item < unlivepagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].liveId
            temp[item]['imgurl'] = objs[item].image
            temp[item]['name'] = objs[item].liveName
            temp[item]['person'] = objs[item].realName
            temp[item]['num'] = objs[item].viewers
            temp[item]['des'] = objs[item].description
            temp[item]['type'] = 1
          }
        }
        that.listinfo = temp
        that.bingo = []
        that.bingo[that.pageindex - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    if (location.hash.indexOf('Flive') >= 0) {
      document.querySelector('a[href="#/Flive"]').setAttribute('class', 'a active')
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'Flive') {
        this.pagepost({page: this.pageindex})
      }
    }
  }
}
</script>

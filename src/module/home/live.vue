<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
      <router-view name="b"></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Flive.css"/>
    <Links></Links>
    <div class="center centerbottom50" :style="'min-height:' + Mhei + 'px'">
      <div class="centers1100">
       <div class="livecenter">
      	<input type="text" class="searchinput" v-model="searchval"/>
      	<span class="searchbtn" @click="search">{{liveinfo.search}}</span>
       </div>
       <div class="livehead">
       	<span class="headicon iconfont icon-living blue"></span>
       	<span class="txt  blue">{{liveinfo.living}}</span>
       	<div class="right">
       		<span class="txt">{{liveinfo.living}}</span>
       		<span class="txt blue">{{livingtotal}}</span>
       		<span class="more txt" @click="jump(1)">{{liveinfo.more}}</span>
       	</div>
       </div>
       <div class="livelist" v-for="(item, ind) in listlivinginfo" :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right: 0;' :''" >
        <div class="img"  @click="jumpliving(item)">
          <img :src="item.imgurl ? item.imgurl : dlivepath"/>
        </div>
        <span class="name hides" :title="item.name + liveinfo.info + ':' +item.des">{{item.name}}</span>
        <div class="half">
        	<span class="halficon iconfont icon-master"></span>
        	<span class="txt hides" :title="item.person" style="color: #141414;">{{item.person}}</span>
        </div>
        <div class="halfright" >
        	<span class="halficon iconfont icon-seeperson" ></span>
        	<span class="txt">{{item.num}}</span>
        </div>
      </div>
       <div class="livehead">
       	<span class="headicon iconfont icon-waitplay green"></span>
       	<span class="txt green">{{liveinfo.wait}}</span>
       	<div class="right">
       		<span class="txt">{{liveinfo.wait}}</span>
       		<span class="txt blue">{{waittotal}}</span>
       		<span class="more txt" @click="jump(0)">{{liveinfo.more}}</span>
       	</div>
       </div>
       <div class="livelist" v-for="(item, ind) in listwaitinfo" :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right: 0;' :''">
        <div class="img" @click="jumpdetail(item)">
           <img :src="item.imgurl ? item.imgurl : dlivepath"/>
        </div>
        <span class="name hides" :title="item.name + liveinfo.info + ':' +item.des">{{item.name}}</span>
        <div class="half">
        	<span class="halficon iconfont icon-master"></span>
        	<span class="txt hides" :title="item.person" style="color: #141414;">{{item.person}}</span>
        </div>
        <div class="halfright" >
        	<span class="halficon iconfont icon-seetwo" ></span>
        	<span class="txt">{{item.num}}</span>
        </div>
        <div class="half" style="width: 100%;margin: 10px 0;">
        	<span class="halficon iconfont icon-waitplay" ></span>
        	<span class="txt">{{item.dateval}}</span>
        </div>
      </div>
       <div class="livehead">
       	<span class="headicon iconfont icon-resee yellow"></span>
       	<span class="txt yellow">{{liveinfo.lived}}</span>
       	<div class="right">
       		<span class="txt">{{liveinfo.lived}}</span>
       		<span class="txt blue">{{livedtotal}}</span>
       		<span class="more txt" @click="jump(2)">{{liveinfo.more}}</span>
       	</div>
       </div>
      <div class="livelist" v-for="(item, ind) in listlivedinfo" :style="((ind + 1) % 4 === 0 && ind !== 0) ? 'margin-right: 0;' :''">
        <div class="img"  @click="jumpresee(item)">
           <img :src="item.imgurl ? item.imgurl : dlivepath"/>
        </div>
        <span class="name hides" :title="item.name + liveinfo.info + ':' +item.des">{{item.name}}</span>
        <div class="half">
        	<span class="halficon iconfont icon-master"></span>
        	<span class="txt hides" :title="item.person" style="color: #141414;">{{item.person}}</span>
        </div>
        <div class="halfright" >
        	<span class="halficon iconfont icon-seetwo" ></span>
        	<span class="txt">{{item.num}}</span>
        </div>
        <div class="half" style="width: 100%;margin: 10px 0;">
        	<span class="halficon iconfont icon-waitplay" ></span>
        	<span class="txt">{{item.dateval}}</span>
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
import {pathinfolive, liveinfo, pagesize, livecenterurl} from '@/module/home/config/liveinfo'
export default {
  name: 'Flive',
  data () {
    return {
      liveinfo: liveinfo,
      dlivepath: '/static/images/Dlive.jpg',
      listlivinginfo: [],
      listwaitinfo: [],
      listlivedinfo: [],
      searchval: '',
      livingtotal: 0,
      livedtotal: 0,
      waittotal: 0,
			livedtotal: 0,
      Mhei: window.innerHeight - 65 - 58 - 50
    }
  },
  created () {
    this.pagepost({page: 1})
  },
  components: {
    Ghead,
    Gfoot,
    Links
  },
  methods: {
    search () {
      this.$router.push({name: pathinfolive.prex + 'search', params: {searchval: this.searchval}})
    },
    jumpdetail () {
      this.win(liveinfo.nostart, '', false)
    },
    jumpliving (item) {
      this.$router.push({name: pathinfolive.prex + 'detail', query: {liveid: item.id}})
    },
   /* jumpresee (item) {
      this.$router.push({name: pathinfolive.prex + 'overdetail', query: {liveid: item.id}})
    },*/
    jump (num) {
      switch (num) {
        case 1:
          this.$router.push({name: pathinfolive.prex + 'living'})
          break
        case 0:
          this.$router.push({name: pathinfolive.prex + 'unlive'})
          break
        case 2:
          this.$router.push({name: pathinfolive.prex + 'lived'})
          break
      }
    },
    pagepost () {
      let that = this
      that.listlivinginfo = []
      that.listwaitinfo = []
      that.listlivedinfo = []
      this.axios({
        method: 'post',
        url: livecenterurl,
        data: {}
      })
      .then(function (res) {
        let objs = res.data.livesList
        that.livingtotal = objs[1].total
        for (let item = 0; item < objs[1].livingList.length; item++) {
          if (item < pagesize) {
            that.listlivinginfo.splice(item, 1, {
              id: objs[1].livingList[item].liveId,
              imgurl: objs[1].livingList[item].image === ' ' ? '' : objs[1].livingList[item].image,
              name: objs[1].livingList[item].liveName,
              person: objs[1].livingList[item].adminName,
              num: objs[1].livingList[item].viewers,
              dateval: objs[1].livingList[item].beginTime.substring(0, objs[1].livingList[item].beginTime.length - 3) + '-' + objs[1].livingList[item].endTime.split(' ')[1].substr(0, 5),
              des: objs[1].livingList[item].description,
              type: 1
            })
          }
        }
        that.waittotal = objs[0].total
        for (let item = 0; item < objs[0].willLivingList.length; item++) {
          if (item < pagesize) {
            that.listwaitinfo.splice(item, 1, {
              id: objs[0].willLivingList[item].liveId,
              imgurl: objs[0].willLivingList[item].image === ' ' ? '' : objs[0].willLivingList[item].image,
              name: objs[0].willLivingList[item].liveName,
              person: objs[0].willLivingList[item].adminName,
              num: objs[0].willLivingList[item].viewers,
              dateval: objs[0].willLivingList[item].beginTime.substring(0, objs[0].willLivingList[item].beginTime.length - 3) + '-' + objs[0].willLivingList[item].endTime.split(' ')[1].substr(0, 5),
              des: objs[0].willLivingList[item].description,
              type: 0
            })
          }
        }
        that.livedtotal = objs[2].total
        for (let item = 0; item < objs[2].reviewLivingList.length; item++) {
          if (item < pagesize) {
            that.listlivedinfo.splice(item, 1, {
              id: objs[2].reviewLivingList[item].liveId,
              imgurl: objs[2].reviewLivingList[item].image === ' ' ? '' : objs[2].reviewLivingList[item].image,
              name: objs[2].reviewLivingList[item].liveName,
              person: objs[2].reviewLivingList[item].adminName,
              num: objs[2].reviewLivingList[item].viewers,
              dateval: objs[2].reviewLivingList[item].beginTime.substring(0, objs[2].reviewLivingList[item].beginTime.length - 3) + '-' + objs[2].reviewLivingList[item].endTime.split(' ')[1].substr(0, 5),
              des: objs[2].reviewLivingList[item].description,
              type: 2
            })
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
  watch: {
    '$route' (to, from) {
      if (to.name === 'Flive') {
        this.pagepost()
      }
    }
  }
}
</script>

<template>
  <div class="app">
    <Ghead></Ghead>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Fcourse.css"/>
    <link rel="stylesheet" type="text/css" href="/static/cklive/css/indexvideo.css"/>
    <Link></Link>
    <div class="center centerbottom50">
      <div class="centers1100">
        <span class="coursetitle">{{coursename}} > {{microname}}</span>
        <div class="cdetail_left" style="width: 100%;">
          <div class="video" id="playerArealocal"></div>
          <div class="videobottom">
            <div class="collect" @click="faviratefn($event)">
              <span class="collecticon iconfont" :class="favirate"></span>
              <span class="txt">{{microvideoseeinfo.collect}}</span>
            </div>
            <div class="download">
            	<a :href="'/base/courseMicroVideo/downloadMicroVideo?id=' + resourceid">
	              <span class="downloadicon iconfont icon-download"></span>
	              <span class="txt">{{microvideoseeinfo.download}}</span>
              </a>
            </div>
          </div>
          <div class="mixpart">
		        <div class="tab">
		          <span class="selected" style="width: 90px;">
		            {{microvideoseeinfo.microvideoappraise}}
		          </span>
		        </div>
		        <div class="microvideoappraisepart">
		        	<textarea name=""  v-model="textareaval" :placeholder="microvideoseeinfo.something" class="textarea" rows="" cols=""></textarea>
		        	<div class="createbtn" @click="publishappraiseevent">{{microvideoseeinfo.btn}}</div>
		        </div>
		        <div class="discusspart" style="height:auto">
		        	
              <div class="list" v-for="(item, ind) in discusslist">
                <div class="img">
                  <img v-if="item.imgurl" :src="item.imgurl" align="" title=""/>
                </div>
                <div class="right" style="width: 990px;">
                    <span class="title">{{item.name}}</span>
                    <span class="dates" style="float: left;margin-left: 50px;">{{item.dates}}</span>
                    <span class="content">{{item.content}}</span>
                </div>
              </div>
              <page  :totalnum="totalnum" :pagestyles="pagestyles" :bingo="bingo" @pagepost="getdiscuss" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page>
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
import page from '@/components/extend/page'
import {getmicroseeurl, addmicrodiscussurl, getmicrodiscussurl, faviratestateurl, favirateaddurl, faviratedelurl, microvideoseeinfo, detailinfo, warntxt} from '@/module/home/config/courseinfo'
export default {
  name: 'Fcoursemicrovideosee',
  data () {
    return {
      microvideoseeinfo: microvideoseeinfo,
      detailinfo: detailinfo,
      infos: '',
      discusslist: [],
      bingo: [],
      pageindex: 1,
      pagesize: 10,
      totalpage: 0,
      totalnum: 0,
      favirate: 'icon-starbg',
      resid: '',
      textareaval: '',
      coursename: '',
      microname: ''
    }
  },
  created () {
    this.resourceid = this.geturlparam('resourceid', location.hash)
    this.coursename = decodeURIComponent(this.geturlparam('coursename', location.hash))
    this.microname = decodeURIComponent(this.geturlparam('microname', location.hash))
    this.getvideo()
    this.getdiscuss({page: 1})
  },
  components: {
    Ghead,
    Gfoot,
    Link,
    page
  },
  methods: {
    getvideo () {
      let that = this
      this.axios({
        method: 'post',
        url: getmicroseeurl,
        params: {
          params: {
            id: that.geturlparam('resourceid', location.hash)
          }
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          let objs = res.data.result
          that.infos = {}
          that.infos['channel'] = []
          that.infos['channelS'] = []
          that.infos['channelB'] = [objs.location]
          that.infos['channeltitle'] = [objs.name]
          that.infos['channelnum'] = 1
          that.infos['model'] = ['标清']
          that.infos['knowledge'] = [] // {time: '00:00:30', content: '30s'}, {time: '00:01:30', content: '60s'}
          that.infos['mainfile'] = [0, 0]
          that.infos['widhei'] = {wid: 1100, hei: 620}
          that.infos['id'] = 'playerArealocal'
          that.infos['autoplaly'] = true
          that.$Video(that.infos)
        } else {
          that.win(res.data.message, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    geturlparam (name, url) {
      let urls = url.split('?')[1].split('&')
      let val = ''
      for (let item = 0; item < urls.length; item++) {
        if (name === urls[item].split('=')[0]) {
          val = urls[item].split('=')[1]
          break
        }
      }
      return val
    },
    getdiscuss (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageindex = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: getmicrodiscussurl,
        data: {
          resourceId: that.resourceid
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.CoursesForumMicroList
        that.totalpage = Math.ceil(objs.length / that.pagesize)
        that.totalnum = objs.length
        for (let item = 0; item < objs.length; item++) {
          temp[item] = {}
          temp[item]['id'] = objs[item].id
          temp[item]['name'] = objs[item].creator
          temp[item]['dates'] = objs[item].createdate.substr(0, objs[item].createdate.length - 3)
          temp[item]['content'] = objs[item].content
          temp[item]['appraisenum'] = objs[item].praise
          temp[item]['discuss'] = objs[item].postCount
          temp[item]['imgurl'] = objs[item].icon
          temp[item]['appraisearr'] = []
        }
        let temp1 = []
        for (let item = that.pagesize * (that.pageindex - 1); item < temp.length; item++) {
          if (item < (that.pagesize * that.pageindex - temp.length > 0 ? temp.length : that.pagesize * that.pageindex)) {
            temp1.push(temp[item])
          }
        }
        that.bingo = []
        that.bingo[that.pageindex - 1] = 'selected'
        that.discusslist = temp1
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    publishappraiseevent () {
      if (this.textareaval.toString().replace(/\s/gi, '') === '') {
        this.win(warntxt.textareaval, '', false)
        return false
      }
      let that = this
      this.axios({
        method: 'post',
        url: addmicrodiscussurl,
        data: {
          resourceId: that.geturlparam('resourceid', location.hash),
          name: '',
          content: that.textareaval
        }
      })
      .then(function (res) {
        if (res.data.code === 200) {
          that.textareaval = ''
          that.getdiscuss({page: that.pageindex})
        } else {
          that.win(res.data.message, '', false)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getfaviratestate () {
      if (!this.$store.state.userinfo.userName) {
        this.win(warntxt.login, '', false)
      } else {
        let that = this
        this.axios({
          method: 'post',
          url: faviratestateurl,
          data: {
            resourceId: that.resourceid,
            userId: that.$store.state.userinfo.id
          }
        })
        .then(function (res) {
          if (res.data.resourceIsCollected === 0) {
            that.favirate = 'icon-starbg'
          } else {
            that.favirate = 'icon-star'
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
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
            resourceId: that.resourceid,
            collectType: 0,
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
            resourceId: that.resourceid
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
          if (backfn === '-1') {
            window.history.go(-1)
          } else {
            if (backfn) {
              backfn()
            }
          }
        }
      })
    }
  },
  mounted () {
    if (location.hash.indexOf('Fcourse') >= 0) {
      document.querySelector('a[href="#/Fcourse"]').setAttribute('class', 'a active')
    }
  }
}
</script>

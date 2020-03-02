<template>
  <div class="app">
  	<Ghead></Ghead>
  	<link rel="stylesheet" type="text/css" href="../../../../static/css/default/Mcourse.css"/>
    <transition name="fade">
    	<router-view></router-view>
    </transition>
    <div class="center centerbottom50">
    	<div class="centers">
    		<div class="Firsttitle">{{courseName}}</div>
    		<div class="M_left" :style="'min-height:' + Mlefthei + 'px;'">
			 			<div class="Manage" v-for="(items, ind) in links">
			 				<span class="iconfont iconcss" :class="'icon-' + items.icon"></span>
			 				<router-link :key="ind"  class="a hides active" v-if="ind === 3"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 				<router-link :key="ind"  class="a hides" v-if="ind !== 3"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
			 			</div>
			  </div>
    		<div class="M_right"  :style="'min-height:' + Mlefthei + 'px;'">
    			<div class="optline" v-show="version !== '1' && hideversion">
    				<div class="mrightcreate" @click="jumpadd('add')">{{champtercreatebtnN}}</div>
    				<div class="mrightcreate" style="width: 58px;" @click="jumpadd('edit')">{{champtereditbtnN}}</div>
    				<div class="mrightcreate" style="width: 58px;" @click="jumpadd('del')">{{champterdelbtnN}}</div>
    			</div>
    			<div class="champterlist">
    				<div class="list hides" :title="item.name" v-for="(item, ind) in list" :style="bgarr[ind]" @click='selected(item, ind)'>
    					{{item.name}}
    					<span class="iconarr iconfont " :class="selectedarr[ind]"></span>
    				</div>
    			</div>
    			<div class="champterrightlist">
    				<div class="optline">
	    				<div class="mrightcreate" v-show="list.length > 0" @click="jumpadd('addres')">{{champtercreateresbtnN}}</div>
	    				<div class="mrightcreate gray" v-show="list.length <= 0" >{{champtercreateresbtnN}}</div>
	    			</div>
    				<div class="list" v-for="item in listsub">
    					<span class="text hides" :title="item.name">{{item.name}}</span>
    					<span class="iconarr iconfont icon-res1" ></span>
    					<div class="champteropt">
    						<span class="publish iconfont icon-publish" v-if="!item.isPublish" @click="publicitem(item)"></span>
    						<span class="publish iconfont icon-unpublish" v-if="item.isPublish"  @click="unpublicitem(item)"></span>
    						<!--<span class="edit iconfont icon-xiugai" @click="edit(item)"></span>-->
    						<span class="del iconfont icon-del" v-show="item.delflag !== 0 && hideversion" @click="del(item)"></span>
    					</div>
    				</div>
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
import {listurl, champtercreateresbtnN, champtercreatebtnN, champtereditbtnN, champterdelbtnN, pathinfo, links, FirsttitleN, listchampterurl, listchampterresourceurl} from '@/module/admin/manage/config/Mcourseinfo'
export default {
  name: 'AJcourseManagechampter',
  data () {
    return {
      links: links,
      champtercreatebtnN: champtercreatebtnN,
      champtereditbtnN: champtereditbtnN,
      champterdelbtnN: champterdelbtnN,
      champtercreateresbtnN: champtercreateresbtnN,
      FirsttitleN: FirsttitleN,
      Mlefthei: window.innerHeight - 65 - 50 - 53,
      pathinfo: pathinfo,
      list: [],
      listsub: [],
      selectedarr: ['icon-youjiantou'],
      bgarr: ['background:#d3e8fd;'],
      champterid: '',
      courseId: '',
      parentitem: '',
      courseName: '',
      version: this.$store.state.version,
      hideversion: true
    }
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
//  if (localStorage.getItem('coursemanagetype') === 'course') {
//    this.hideversion = false
//  } else {
//    this.hideversion = true
//  }
    this.getcoursename()
    this.getparent()
  },
  components: {
    Ghead,
    AJposition
  },
  methods: {
    concatTime (obj) {
      if (obj) {
        return '-' + obj.substring(obj.lastIndexOf(':'), 0).replace(/-/g, '').replace(/\s/, '-')
      } else {
        return ''
      }
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
    getcoursename () {
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          courseId: that.courseId
        }
      })
      .then(function (res) {
        let obj = res.data
        that.courseName = obj.courseName
        if (obj.courseType === '1') {
          that.hideversion = false
        } else if (obj.courseType === '2') {
          that.hideversion = true
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getparent () {
//    console.log('getparent')
      let that = this
      this.axios({
        method: 'post',
        url: listchampterurl,
        params: {
          par: {
            courseId: that.courseId
          }
        }
      })
      .then(function (res) {			
        let temp = []
        let objs = res.data.data
        let parentind = 0
        for (let item = 0; item < objs.length; item++) {
          temp.push({id: objs[item]['lessonId'], name: objs[item]['lessonName'] + that.concatTime(objs[item]['startTime'])})
          if (that.champterid !== '' && that.champterid === objs[item]['lessonId']) {
            parentind = item
          }
        }
        that.list = temp
        if (temp.length > 0) {
          that.parentitem = temp[parentind]
          that.champterid = temp[parentind].id
          that.selectedarr = []
          that.bgarr = []
          that.selectedarr[parentind] = 'icon-youjiantou'
          that.bgarr[parentind] = 'background:#d3e8fd;box-shadow: 0 0 0 1px #9cb4d0;color:#3197fc;'
          that.getsublist()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getsublist () {
      let that = this
      this.axios({
        method: 'post',
        url: listchampterresourceurl,
        params: {
          par: {
            lesson: that.champterid,
            course: that.courseId
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.result.data
        for (let item = 0; item < objs.length; item++) {
          temp.push({delflag: objs[item]['resourceFromWhere'], id: objs[item]['resourceId'], name: objs[item]['resourceName'], isPublish: objs[item]['isPublish'], lesson: objs[item]['lesson']})
        }
        that.listsub = temp
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    jumpadd (type) {
      switch (type) {
        case 'add':
          this.$router.push({'name': this.pathinfo.prex + 'champteradd', params: {champteradd: 'champteradd', courseId: this.courseId}, query: {courseId: this.courseId}})
          break
        case 'edit':
          this.$router.push({'name': this.pathinfo.prex + 'champteredit', params: {champteredit: 'champteredit', item: this.parentitem, courseId: this.courseId}, query: {courseId: this.courseId}})
          break
        case 'del':
          this.$router.push({'name': this.pathinfo.prex + 'champterdel', params: {champterdel: 'champterdel', item: this.parentitem, courseId: this.courseId}, query: {courseId: this.courseId}})
          break
        case 'addres':				
          this.$router.push({'name': this.pathinfo.prex + 'champterresadd', params: {champterresadd: 'champterresadd', item: this.parentitem, courseId: this.courseId}, query: {courseId: this.courseId}})
          break
      }
    },
    publicitem (item) {
//    console.log(item, 'publicitem')
      this.$router.push({'name': this.pathinfo.prex + 'champterrespublish', params: {champterrespublish: 'champterrespublish', item: item, courseId: this.courseId}, query: {courseId: this.courseId}})
    },
    unpublicitem (item) {
//    console.log(item, 'publicitem')
      this.$router.push({'name': this.pathinfo.prex + 'champterresunpublish', params: {champterresunpublish: 'champterresunpublish', item: item, courseId: this.courseId}, query: {courseId: this.courseId}})
    },
    edit (item) {
//    console.log(item, 'edit')
    },
    del (item) {
//    console.log(item, 'del')
      this.$router.push({'name': this.pathinfo.prex + 'champterresdel', params: {champterresdel: 'champterresdel', item: item, courseId: this.courseId}, query: {courseId: this.courseId}})
    },
    selected (item, ind) {
      this.selectedarr = []
      this.bgarr = []
      this.selectedarr[ind] = 'icon-youjiantou'
      this.bgarr[ind] = 'background:#d3e8fd;box-shadow: 0 0 0 1px #9cb4d0;color:#3197fc;'
      this.champterid = item.id
      this.parentitem = item
      // 点击之后，根据id,请求数据
      this.getsublist()
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
      if (to.name === 'AJcourseManagechampter') {
        if (to.params.publishsub) {
          this.champterid = to.params.parentid
          this.getsublist()
        }
        if (to.params.unpublishsub) {
          this.champterid = to.params.parentid
          this.getsublist()
        }
        if (!to.params.unpublishsub && !to.params.publishsub) {
          this.getparent()
        }
        if (from.name === 'AJcourseManagechampterresadd') {
          this.getsublist()
        }
      }
    }
  }
}
</script>

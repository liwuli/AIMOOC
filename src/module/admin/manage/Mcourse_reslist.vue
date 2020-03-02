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
               <router-link :key="ind"  class="a hides active" v-if="ind === 4"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
               <router-link :key="ind"  class="a hides" v-if="ind !== 4"   :to="{path: items.path, query: {courseId: courseId}}" :title='items.name'>{{items.name}}</router-link>
             </div>
        </div>
        <div class="M_right"  :style="'min-height:' + Mlefthei + 'px;'">
          <div class="G_search">
            <div class="part" :style="partstyle" >
               <span class="txt">{{filetypeN}}:</span>
               <Check :styles="checkstyle" @checkevent="checkevent" :selectarr="selectarr" :info="fileinfo"></Check>
             </div>
             <div class="part" id="rili" :style="partstyle" style="margin-left: 35px;">
               <span class="txt">{{sydateN}}：</span>
               <Calendarme :inputstyle='inputstyle' :valshow="valshowsy"  :ymdhms="ymdhms" :dateval="sydate" :part= "part" @startfn="startfn" :ids="start"></Calendarme>
               <span class="txt" style="width: auto;min-width: 0;margin-left: 15px;">—</span>
               <Calendarme :inputstyle='inputstyle' :valshow="valshowey"  :ymdhms="ymdhms" :dateval="eydate" :part= "part" @endfn="endfn" :ids="end"></Calendarme>
             </div>
             <div class="part"  :style="partstyle">
               <span class="txt">{{champterN}}:</span>
               <div id='select83'  style="margin-top: 3px;width:220px"></div>
             </div>
             <div class="part"  :style="partstyle" style="margin-left: 115px;">
               <span class="txt">{{filenameN}}:</span>
               <input type="text" v-model="filename" style="width:240px;"/>
             </div>
             <div class="btn" style="float: right;width:50px;text-align: center;" @click="search({page: 1})">{{searchN}}</div>
          </div>
          <div class="mrightcreate" style="margin-left: 0;" @click='uploadres'>{{uploadresbtnN}}</div>
            <List :totalnum="totalnum" :pagesize="pagesize" v-if="products.length > 0" :addbtn="addbtn" :delbtn="delbtn" :pageval="pageval" :bingos="bingos" @pagepost="search" :pageinfo="pageinfo"  :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
            <div class="nodata" v-if="products.length === 0 && hideversion" style="text-indent: 10px;">
            {{nodata}}
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
import Calendarme from '@/components/extend/calendar.vue'
import Check from '@/components/extend/check'
import List from '@/components/extend/listcheck'
import {opteventAllresnomovedelA, optobjinfoAllresnomovedelA, listurl, opteventAllres, pagesize, warntxt, optobjinfoAllresnomovedel, opteventAllresnomovedel, optobjinfoAllresA, listchampterresourceurl, champterN, opteventAllresA, optobjinfoAllres, infoval, columsres, percentinfores, listheadres, bingo, nodata, sydateN, selectarr, filenameN, filetypeN, fileinfo, searchN, pathinfores, uploadresbtnN, links, FirsttitleN, products, listchampterurl} from '@/module/admin/manage/config/Mcourseinfo'
let addbtn = 'display:none'
let delbtn = 'display:none'
export default {
  name: 'AJcourseManageres',
  data () {
    return {
      links: links,
      checkstyle: 'width:auto;line-height: 15px;text-indent: 5px;',
      inputstyle: 'width:80px',
      partstyle: 'margin-bottom:20px;',
      ymdhms: 'ymd',
      searchN: searchN,
      start: 'start',
      end: 'end',
      valshowsy: false,
      valshowey: false,
      listhead: listheadres,
      part: document.body,
      fileinfo: fileinfo,
      percentinfo: percentinfores,
      optevent: opteventAllres,
      addbtn: addbtn,
      delbtn: delbtn,
      eydate: '',
      champterN: champterN,
      FirsttitleN: FirsttitleN,
      Mlefthei: window.innerHeight - 65 - 50,
      pathinfo: pathinfores,
      uploadresbtnN: uploadresbtnN,
      sydateN: sydateN,
      filenameN: filenameN,
      nodata: nodata,
      infoval: infoval,
      products: products,
      colums: columsres,
      filename: '',
      sydate: '',
      lists: [],
      bingos: bingo,
      selectarr: selectarr,
      totalpage: 0,
      pagesize: pagesize,
      filetypeN: filetypeN,
      pageval: 1,
      courseId: '',
      courseName: '',
      totalnum: 0,
      hideversion: false
    }
  },
  components: {
    Ghead,
    AJposition,
    Check,
    Calendarme,
    List
  },
  created () {
    this.courseId = this.geturlparam('courseId', location.hash)
    if (localStorage.getItem('coursemanagetype') === 'course') {
      this.hideversion = false
    } else {
      this.hideversion = true
    }
    this.search({page: 1})
    this.getchampter()
    this.getcoursename()
  },
  methods: {
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
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    formcat (obj) {
      return obj.year + '-' + (obj.month < 10 ? '0' + obj.month : obj.month) + '-' + (obj.day < 10 ? '0' + obj.day : obj.day)
    },
    startfn (obj) {
      if (!this.valshowsy) {
        this.sydate = ''
        this.valshowsy = true
      } else {
        this.sydate = this.formcat(obj)
        document.querySelector('#start').value = this.sydate
      }
    },
    endfn (obj) {
      if (!this.valshowey) {
        this.eydate = ''
        this.valshowey = true
      } else {
        this.eydate = this.formcat(obj)
        document.querySelector('#end').value = this.eydate
      }
    },
    checkevent (obj) {
      if (this.selectarr[obj.id] === '') {
        this.selectarr.splice(obj.id, 1, obj.id)
      } else {
        this.selectarr.splice(obj.id, 1, '')
      }
    },
    uploadres () {
      this.$router.push({'name': this.pathinfo.prex + 'add', params: {resadd: 'resadd', item: {courseid: this.courseId}}, query: {courseId: this.courseId}})
    },
    search (obj) {
      let tempflag = []
      for (let i = 0; i < this.selectarr.length; i++) {
        if (this.selectarr[i] !== '') {
          tempflag.push(this.selectarr[i])
        }
      }
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      let that = this
      that.pageval = obj.page
      this.axios({
        method: 'post',
        url: listchampterresourceurl,
        params: {
          par: {
            resType: tempflag.toString(), // 文件类型
            resourceName: that.filename, // 文件名
            lesson: that.lessonid, // 章节 为空，默认为全部
            startTime: that.sydate, // 开始日期
            endTime: that.eydate, // 结束日期
            course: that.courseId
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.result.data.length / pagesize)
        that.totalnum = res.data.result.data.length
        let temp = []
        let objs = res.data.result.data
        let start = (that.pageval - 1) * pagesize
        for (let item = start; item < (that.pageval * pagesize < objs.length ? that.pageval * pagesize : objs.length); item++) {
          temp[item - start] = {}
          temp[item - start]['id'] = objs[item].resourceId
          temp[item - start]['Query'] = {courseId: that.courseId, typeval: that.getrestypeval(objs[item].resType), typevalflag: (objs[item].resType === 0 || objs[item].resType === 4) ? '' : 'pic'}
          temp[item - start]['name'] = objs[item].resourceName
          temp[item - start]['champter'] = objs[item].lessonName
          temp[item - start]['uploadDate'] = objs[item].uploadDate
          temp[item - start]['restype'] = that.getrestype(objs[item].resType)
          temp[item - start]['isPublishval'] = objs[item].isPublish ? warntxt.published : warntxt.unpublish
          if (objs[item].resourceFromWhere > 0) { // 可以删除和移动
            if (objs[item].isPublish) { // 发布
              temp[item - start]['publishstate'] = objs[item].publishstateA
              temp[item - start].opt = optobjinfoAllresA
              temp[item - start].optevent = opteventAllresA
            } else { // 撤销
              temp[item - start]['publishstate'] = objs[item].publishstate
              temp[item - start].opt = optobjinfoAllres
              temp[item - start].optevent = opteventAllres
            }
          } else {
            if (objs[item].isPublish) { // 发布
              temp[item - start].opt = optobjinfoAllresnomovedelA
              temp[item - start].optevent = opteventAllresnomovedelA
            } else { // 撤销
              temp[item - start].opt = optobjinfoAllresnomovedel
              temp[item - start].optevent = opteventAllresnomovedel
            }
          }
          temp[item - start].selected = false
        }
        that.products = temp
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getrestype (type) {
      switch (type) {
        case 0:
          return fileinfo[0].txt
        case 1:
          return fileinfo[1].txt
        case 2:
          return fileinfo[2].txt
        case 3:
          return fileinfo[3].txt
        case 4:
          return fileinfo[4].txt
      }
    },
    getrestypeval (type) {
      switch (type) {
        case 0:
          return fileinfo[0].typeval
        case 1:
          return fileinfo[1].typeval
        case 2:
          return fileinfo[2].typeval
        case 3:
          return fileinfo[3].typeval
        case 4:
          return fileinfo[4].typeval
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
    },
    getchampter () {
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
        temp[0] = {value: '', txt: '全部'}
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].lessonId
          temp[item + 1]['txt'] = objs[item].lessonName
        }
        if (temp.length === 1) {
          that.$Select({
            'data': temp,
            'selectId': 'select83',
            'callback': function (obj) {
              that.lessonid = obj.value
            }
          })
        } else {
          that.$Select({
            'data': temp,
            'selectId': 'select83',
            'callback': function (obj) {
              that.lessonid = obj.value
            }
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  beforeDestroy () {
    // 删除日历节点
    document.body.removeChild(document.getElementById('start_calendar'))
    document.body.removeChild(document.getElementById('end_calendar'))
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJcourseManageres') {
        this.search({page: this.pageval})
      }
    }
  }
}
</script>

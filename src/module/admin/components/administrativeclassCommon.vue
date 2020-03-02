<template>
  <div>
    <div class="G_search">
      <div class="part">
        <span class="txt" style="line-height: 30px;">{{administrativeclassinfo.gradeN}}:</span>
        <div id='select84' class="Select" style="width: 130px;"></div>
      </div>
      <div class="part">
        <span class="txt" style="line-height: 30px;">{{basicinfo.nameN}}:</span>
        <input type="text" :style="searchinput" v-model="val"/>
      </div>
      <div class="btn" style="float: left;" @click="search">{{basicinfo.searchN}}</div>
     </div>
    <List :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :pagesize="pagesize" :colums="colums" :percentinfo='percentinfo'></List>
  </div>
</template>

<script>
import List from '@/components/extend/listcheck'
import {getgradesurl, powerinfo, basicinfo, administrativeclassinfo, pageval, attab, infoval, opteventAllP, optobjinfoAllP, products, searchstyle, searchinput, bingos, percentinfoP, columsP, pagesize, listurl, listheadP, pathinfo} from '@/module/admin/config/administrativeclassinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist', 'addlist'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJadministrativeclass',
  data () {
    return {
      grade: '',
      eduType: this.$store.state.educationType,
      products: products,
      attab: attab,
      infoval: infoval,
      basicinfo: basicinfo,
      administrativeclassinfo: administrativeclassinfo,
      percentinfo: percentinfoP,
      colums: columsP,
      listhead: listheadP,
      optevent: optevent,
      opteventAll: opteventAllP,
      optobjinfoAll: optobjinfoAllP,
      pathinfo: pathinfo,
      searchinput: searchinput,
      searchstyle: searchstyle,
      addbtn: addbtn,
      delbtn: delbtn,
      bingos: bingos,
      pageval: pageval,
      pagesize: pagesize,
      edit: 0,
      del: 0,
      settemplate: 0,
      stlist: 0,
      rel: 0,
      totalnum: 0,
      val: '',
      college: '',
      major: '',
      pageinfo: ''
    }
  },
  components: {
    List
  },
  methods: {
    init () {
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.del = 0
      this.stlist = 0
      this.rel = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.delbtn = 'display:block'
        this.addbtn = 'display:block'
        this.optevent = opteventAllP
        this.optobjinfo = optobjinfoAllP
      } else {
        let power = this.$store.state.powerinfo['classmanage']
        if (power && power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'addlist':
                this.addbtn = 'display:block'
                break
              case 'editlist':
                if (!this.edit) {
                  this.optevent.push(powerinfo.OPelist)
                  this.optobjinfo.push(powerinfo.OeN)
                }
                this.edit++
                break
              case 'dellist':
                if (!this.del) {
                  this.optevent.push(powerinfo.OPdlist)
                  this.optobjinfo.push(powerinfo.OdN)
                  this.delbtn = 'display:block'
                }
                this.del++
                break
            }
          }
        }
      }
    },
    getgrade () {
      let that = this
      // 年级
      this.axios({
        method: 'post',
        url: getgradesurl,
        params: {
          'par': {
            pageSize: pagesize,
            pageIndex: 1
          }
        }
      })
        .then(function (res) {
          let temp = []
          let objs = res.data.data
          temp.push({value: -1, txt: '全部'})
          for (let item = 0; item < objs.length; item++) {
            temp[item + 1] = {}
            temp[item + 1]['value'] = objs[item].id
            temp[item + 1]['txt'] = objs[item].name
          }
          that.$Select({
            'data': temp,
            'selectId': 'select84',
            'callback': function (obj) {
              that.grade = obj.ind ? obj.value : ''
            },
            'matchval': [{val: -1}]
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    pagepost (obj) {
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      this.pageval = obj.page
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          studySectionId: that.grade,
          classesName: that.val,
          classesType: 0,
          page: {
            pageSize: pagesize,
            pageIndex: obj.page
          }
        }
      })
      .then(function (res) {
        that.pageinfo = Math.ceil(res.data.total / pagesize)
        that.totalnum = res.data.total
        let temp = []
        let objs = res.data.classesList
        for (let item = 0; item < objs.length; item++) {
          if (item < pagesize) {
            temp[item] = {}
            temp[item]['id'] = objs[item].classesId
            temp[item]['Query'] = {name: objs[item].classesName, MajorName: objs[item].majorName, CollegeName: objs[item].collegeName, ClassGroupId: objs[item].classesId, CollegeId: objs[item].collegeId, MajorId: objs[item].majorId}
            temp[item]['name'] = objs[item].classesName
            temp[item]['grade'] = objs[item].studySectionName
            temp[item]['gradeId'] = objs[item].studySectionId
            temp[item]['classtype'] = objs[item].classesType
            temp[item]['code'] = objs[item].classesCode
            temp[item]['teacher'] = objs[item].teacherName
            temp[item]['teacherId'] = objs[item].teacherId
            temp[item].opt = that.optobjinfo
            temp[item].selected = false
          }
        }
        that.products = temp
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    search () {
      this.pagepost({page: 1})
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === pathinfo.prex) {
        this.pagepost({page: this.pageval})
      }
    }
  },
  created () {
    this.init()
    this.pagepost({page: 1})
    this.getgrade()
  }
}
</script>

<template>
  <div>
    <div class="G_search">
      <!-- <div class="part"> -->

        <!-- <div id='select85' class="Select" style="width: 130px;"></div> -->
     <!-- </div> -->
     <div style="float: left; width: 400px;height: 35px;">
        <span class="txt" style="float: left; line-height: 35px;">{{administrativeclassinfo.collegeN}}:</span>
        <el-cascader placeholder="请输入学院或专业" :options="options" @change="cascader_update" clearable filterable style="width: 300px;margin-left: 20px;"></el-cascader>
      </div>
      <!-- <div class="part">
        <span class="txt" style="line-height: 30px;">{{administrativeclassinfo.majorN}}:</span>
        <div id='select86' class="Select" style="width: 130px;"></div>
      </div> -->
      <div class="part">
        <span class="txt" style="line-height: 30px;">{{basicinfo.nameN}}:</span>


        <!-- <input type="text" :style="searchinput" v-model="val" style="border-right: none;" />
        <div class="btn" style="float: left;" @click="search">{{basicinfo.searchN}}</div> -->
      </div>
	  <el-input style="float: left;width: 150px;"
	    placeholder="请输入班级名称"
	    v-model="val"
	    clearable>
	  </el-input>
	  <el-button type="primary" @click="search" style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
    </div>
    <List :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pageval="pageval" :bingos="bingos" @pagepost="pagepost"
      :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent'
      :pagesize="pagesize" :colums="colums" :percentinfo='percentinfo'></List>
  </div>
</template>

<script>
  import List from '@/components/extend/listcheck'
  import {
    powerinfo,
    basicinfo,
    collegemajorurl,
    administrativeclassinfo,
    pageval,
    attab,
    infoval,
    opteventAll,
    optobjinfoAll,
    products,
    searchstyle,
    searchinput,
    bingos,
    percentinfo,
    colums,
    pagesize,
    listurl,
    listhead,
    pathinfo
  } from '@/module/admin/config/administrativeclassinfo'
  // 权限处理
  let optevent = [] // 'editlist', 'dellist', 'addlist'
  let addbtn = 'display: none'
  let delbtn = 'display: none'
  export default {
    name: 'AJadministrativeclass',
    data() {
      return {
        products: products,
        attab: attab,
        infoval: infoval,
        basicinfo: basicinfo,
        administrativeclassinfo: administrativeclassinfo,
        percentinfo: percentinfo,
        colums: colums,
        listhead: listhead,
        optevent: optevent,
        opteventAll: opteventAll,
        optobjinfoAll: optobjinfoAll,
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
        collegeobj: '',
        majorobj: '',
        pageinfo: '',
        options: []
      }
    },
    components: {
      List
    },
    methods: {
      getcollegemajor() {
        let that = this
        this.axios({
            method: 'post',
            url: collegemajorurl
          })
          .then(function(res) {
            // let collegearr = [{value: '', txt: '全部'}]
            // let majorarr = [[{value: '', txt: '全部'}]]
            // let objs = res.data
            // for (let item = 0; item < objs.length; item++) {
            //   collegearr.push({value: objs[item].collegeId, txt: objs[item].collegeName})
            //   majorarr[item + 1] = [{value: '', txt: '全部'}]
            //   for (let items = 0; items < objs[item].majorList.length; items++) {
            //     majorarr[item + 1].push({value: objs[item].majorList[items].majorId, txt: objs[item].majorList[items].majorName})
            //   }
            // }
            // that.collegeobj = that.$Select({
            //   'data': collegearr,
            //   'selectId': 'select85',
            //   'callback': function (obj) {
            //     that.college = obj.value
            //     that.majorobj.cfg.data = majorarr[obj.ind]
            //     that.majorobj.cfg.domdata = false
            //     that.majorobj.initCommonVal()
            //   }
            // })
            // that.majorobj = that.$Select({
            //   'data': majorarr[0],
            //   'selectId': 'select86',
            //   'callback': function (obj) {
            //     that.major = obj.value
            //   }
            // })
            var collegearr = [];
            let objs = res.data
            for (let item = 0; item < objs.length; item++) {
              collegearr.push({
                value: objs[item].collegeId,
                label: objs[item].collegeName,
                children:[]
              })

              for (let items = 0; items < objs[item].majorList.length; items++) {
                collegearr[item].children.push({
                  value: objs[item].majorList[items].majorId,
                  label: objs[item].majorList[items].majorName
                })
              }
            }
            that.options=collegearr;



            // 巡课群组
            that.pagepost({
              page: 1
            })
          })
          .catch(function(error) {
            console.log(error)
          })
      },

      cascader_update(obj){
        this.college = obj[0];
        this.major = obj[1]
      },

      pagepost(obj) {
        if (typeof obj === 'number') {
          obj = {
            page: obj
          }
        }
        this.optevent = []
        this.optobjinfo = []
        this.edit = 0
        this.del = 0
        this.stlist = 0
        this.rel = 0
        if (this.$store.state.userinfo.userName === 'admin') {
          this.delbtn = 'display:block'
          this.addbtn = 'display:block'
          this.optevent = opteventAll
          this.optobjinfo = optobjinfoAll
        } else {
          let power = this.$store.state.powerinfo['classmanage']
          if (power.length !== 0) {
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
                case 'stlist': // 学生列表
                  if (!this.stlist) {
                    this.optevent.push(powerinfo.OPstlist)
                    this.optobjinfo.push(powerinfo.OstN)
                  }
                  this.stlist++
                  break
                case 'rel': // 指定辅导员
                  if (!this.rel) {
                    this.optevent.push(powerinfo.OPrellist)
                    this.optobjinfo.push(powerinfo.OrelN)
                  }
                  this.rel++
                  break
              }
            }
          }
        }
        this.pageval = obj.page
        let that = this
        this.axios({
            method: 'post',
            url: listurl,
            data: {
              majorId: that.major,
              classesName: that.val,
              collegeId: that.college,
              classesType: 0,
              page: {
                pageSize: pagesize,
                pageIndex: obj.page
              }
            }
          })
          .then(function(res) {
            that.pageinfo = Math.ceil(res.data.total / pagesize)
            that.totalnum = res.data.total
            let temp = []
            let objs = res.data.classesList
            for (let item = 0; item < objs.length; item++) {
              if (item < pagesize) {
                temp[item] = {}
                temp[item]['id'] = objs[item].classesId
                temp[item]['Query'] = {
                  name: objs[item].classesName,
                  MajorName: objs[item].majorName,
                  CollegeName: objs[item].collegeName,
                  ClassGroupId: objs[item].classesId,
                  CollegeId: objs[item].collegeId,
                  MajorId: objs[item].majorId
                }
                temp[item]['name'] = objs[item].classesName
                temp[item]['college'] = objs[item].collegeName
                temp[item]['collegeid'] = objs[item].collegeId
                temp[item]['major'] = objs[item].majorName
                temp[item]['majorid'] = objs[item].majorId
                temp[item]['classtype'] = objs[item].classesType
                temp[item]['teacherId'] = objs[item].teacherId
                temp[item]['code'] = objs[item].classesCode
                temp[item]['fdy'] = objs[item].teacherName
                temp[item].opt = that.optobjinfo
                temp[item].selected = false
              }
            }
            that.products = temp
            that.bingos = []
            that.bingos[that.pageval - 1] = 'selected'
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      search() {
        this.pagepost({
          page: 1
        })
      }
    },
    watch: {
      '$route'(to, from) {
        //这里把this.pathinfo.prex 换成  AJclassmanage
        if (to.name === 'AJclassmanage') {
          this.pagepost({
            page: this.pageval
          })
        }
      }
    },
    created() {
      this.getcollegemajor()
    }
  }
</script>

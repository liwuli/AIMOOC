<template>
  <div>
    <div class="G_search" style="margin-bottom: 10px;">
      <div class="part">
        <span class="txt">{{eduType ? basicinfo.ScollegeN : basicinfo.gradeN}}：</span>
        <!-- <div id='select3' :style="selectstyle"></div>
        <select id="select4"></select> -->

      </div>
      <el-select v-model="college" clearable  filterable placeholder="请选择" :popper-class="'el_selects_css'" style="float: left;">
        <el-option
          v-for="item in department"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!--<div class="part" >
        <span class="txt">{{basicinfo.majorN}}:</span>
        <div id='select7' :style="selectstyle"></div>
        <select id="select8"></select>
      </div>-->
      <div class="part" style="margin-left: 20px;">
        <span class="txt">{{basicinfo.roleN}}:</span>


        <!-- <div id='select5' :style="selectstyle"></div>
        <select id="select6"></select> -->
      </div>
       <el-select v-model="roleId" clearable  filterable placeholder="请选择角色" :popper-class="'el_selects_css'" style="float: left;">
        <el-option
          v-for="item in character"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <div class="part"  style="margin-left: 20px;">
        <span class="txt">{{selectinfo.name}}：</span>
        <!-- <input type="text" :style="searchinput" v-model="val"/> -->
      </div>
      <el-input style="float: left;width: 150px;"
        placeholder="请输入姓名"
        v-model="val"
        clearable>
      </el-input>


       <el-button type="primary" @click="pagepost({page: 1})" style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
      <!-- <div class="btn" @click="pagepost({page: 1})" style="float: left;">{{basicinfo.searchN}}</div> -->
    </div>
    <List :heigtinfoP="heigtinfoP" :addQuery="roleType" :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'>
      <div class="optline">
        <div class="btn" @click="batchupload">{{basicinfo.importPhotoN}}</div>
        <div class="btn" @click="importuser">{{basicinfo.importN}}</div>
      </div>
    </List>
  </div>
</template>

<script>
  import List from '@/components/extend/listcheck'
  import {heigtinfoP, roleType, selectstyle, selectinfo, findCollegeListNoPage, basicinfo, powerinfo, pageval, opteventAll, optobjinfoAll, searchinput, bingos, infoval, products, pagesize, percentinfo, colums, listhead, pathinfo, listheadP, columsP, percentinfoP, listurl, getgradesurl, roleurl} from '@/module/admin/config/userinfo'
  // 权限处理
  let hide = 'display: none;'
  let show = 'display: block;'
  export default {
    name: 'user',
    components: {
      List
    },
    data () {
      return {
        heigtinfoP: heigtinfoP,
        roleType: roleType,
        roleId: '',
        selectinfo: selectinfo,
        eduType: this.$store.state.educationType,
        percentinfo: this.$store.state.educationType ? percentinfo : percentinfoP,
        colums: this.$store.state.educationType ? colums : columsP,
        listhead: this.$store.state.educationType ? listhead : listheadP,
        basicinfo: basicinfo,
        products: products,
        imports: hide,
        infoval: infoval,
        optevent: opteventAll,
        optobjinfo: optobjinfoAll,
        pathinfo: pathinfo,
        bingos: bingos,
        addbtn: hide,
        delbtn: hide,
        uploadimgbtn: hide,
        val: '',
        selectstyle: selectstyle,
        searchinput: searchinput,
        pageval: pageval,
        pagesize: pagesize,
        addlist: 0,
        edit: 0,
        del: 0,
        importss: 0,
        resetpass: 0,
        uploadimg: 0,
        importflag: 0,
        pageinfo: '',
        totalnum: 0,
        college: '',
        grade: '',
        department:[],
        character:[]
      }
    },
    computed: {
      leftSize () {
        switch (this.importflag) {
          case 2:
            return 975
          case 1:
            return 1054
          default:
            return 1108
        }
      }
    },
    methods: {
      init () {
        if (this.$store.state.userinfo.userName === 'admin') {
          this.delbtn = show
          this.addbtn = show
          this.imports = show
          this.uploadimgbtn = show
          this.importflag = 2
        } else {
          this.optevent = []
          this.optobjinfo = []
          let power = this.$store.state.powerinfo['user']
          if (power.length !== 0) {
            for (let i = 0; i < power.length; i++) {
              switch (power[i].operationCode) {
                case 'addlist':
                  if (!this.addlist) {
                    this.addbtn = show
                    this.addlist++
                    this.importflag++
                  }
                  break
                case 'imports':
                  if (!this.importss) {
                    this.imports = show
                  }
                  this.importss++
                  break
                case 'editlist':
                  if (!this.edit) {
                    this.optevent.push(powerinfo.OPelist)
                    this.optobjinfo.push(powerinfo.OeN)
                  }
                  this.edit++
                  break
                case 'resetpass':
                  if (!this.resetpass) {
                    this.optevent.push(powerinfo.OPresetlist)
                    this.optobjinfo.push(powerinfo.OresetN)
                  }
                  this.resetpass++
                  break
                case 'dellist':
                  if (!this.del) {
                    this.importflag++
                    this.optevent.push(powerinfo.OPdlist)
                    this.optobjinfo.push(powerinfo.OdN)
                    this.delbtn = show
                  }
                  this.del++
                  break
                case 'uploadimg':
                  if (!this.uploadimg) {
                    this.optevent.push(powerinfo.OPphlist)
                    this.optobjinfo.push(powerinfo.OphotoN)
                    this.uploadimgbtn = show
                    this.uploadimg++
                  }
                  break
              }
            }
          }
        }
      },
      batchupload () {
        this.$router.push({name: 'AJuserbatchphoto', params: {roleType: this.roleType}})
      },
      importuser () {
        this.$router.push({name: 'AJuserimport', params: {roleType: this.roleType}})
      },
      async getcolleges () {// 学院
        try {
          const res = await this.axios({
            method: 'post',
            url: findCollegeListNoPage,
            params: {'par': {pageSize: pagesize, pageIndex: 1}}
          })
          let temp = []
          let objs = res.data
           for (let item = 0; item < objs.length; item++) {
            temp[item] = {}
            temp[item]['value'] = objs[item].id
            temp[item]['label'] = objs[item].collegeName
          }
          let that = this
          that.department = temp;
          // temp.push({value: '', txt: '全部'})
          // for (let item = 0; item < objs.length; item++) {
          //   temp[item + 1] = {}
          //   temp[item + 1]['value'] = objs[item].id
          //   temp[item + 1]['txt'] = objs[item].collegeName
          // }
          // let that = this
          // that.$Select({
          //   'data': temp,
          //   'originS': 'multiple',
          //   'selectId': ['select4', 'select3'],
          //   'callback': function (obj) {
          //     that.college = obj.value
          //   }
          // })
          that.pagepost({page: 1})
        } catch (err) {
          console.log(err)
        }
      },
      getgrades () {
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
            temp.push({value: '', txt: '全部'})
            for (let item = 0; item < objs.length; item++) {
              temp[item + 1] = {}
              temp[item + 1]['value'] = objs[item].id
              temp[item + 1]['txt'] = objs[item].name
            }
            that.$Select({
              'data': temp,
              'originS': 'multiple',
              'selectId': ['select4', 'select3'],
              'callback': function (obj) {
                that.grade = obj.value
              }
            })
            that.pagepost({page: 1})
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
          params: {
            'params': {
              roleType: that.roleType,
              roleId: that.roleId,
              pageSize: obj.pagesize ? obj.pagesize : pagesize,
              offset: (obj.page - 1) * pagesize,
              keyWord: that.val,
              organization: that.eduType ? that.college : that.grade
            }
          }
        })
          .then(function (res) {
            that.pageinfo = Math.ceil(res.data.result.total / pagesize)
            that.totalnum = res.data.result.total
            let temp = []
            let optobj = that.optobjinfo
            let objs = res.data.result.data
            for (let item = 0; item < objs.length; item++) {
              if (item < pagesize) {
                temp[item] = {}
                temp[item]['ind'] = item
                temp[item]['id'] = objs[item].id
                temp[item]['rname'] = objs[item].realName
                temp[item]['name'] = objs[item].userName
                temp[item]['code'] = objs[item].code
                temp[item]['sex'] = objs[item].gender === 1 ? '男' : '女'
                temp[item]['gender'] = objs[item].gender
                temp[item]['school'] = objs[item].organization
                temp[item]['schoolid'] = objs[item].organizationId
                temp[item]['phone'] = objs[item].phone
                temp[item]['tel'] = objs[item].telephone
                temp[item]['mail'] = objs[item].email
                temp[item]['passw'] = objs[item].password
                temp[item]['majorName'] = objs[item].majorName
                temp[item]['roleType'] = objs[item].roleType
                temp[item]['roleName'] = objs[item].roleType
                temp[item]['photo'] = objs[item].iconUrl

                objs[item].roleList &&
                (temp[item]['role'] = objs[item].roleList.map(function (item) {
                  for (let i in item) {
                    return item[i]
                  }
                }).join(','))
                temp[item].opt = optobj
                temp[item].selected = false
              }
            }
            that.products = temp
            that.bingos = []
            that.bingos[obj.page - 1] = 'selected'
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    created () {
      this.init()
      if (this.eduType) {
        // 高教-院系列表
        this.getcolleges()
      } else {
        // 普教-年级列表
        this.getgrades()
      }
    },
    mounted () {
      let that = this
      this.axios({
        method: 'post',
        url: roleurl
      })
        .then(function (res) {
          let temp = []
          let objs = res.data.result.data
          for (let item = 0; item < objs.length; item++) {
            temp[item] = {}
            temp[item]['value'] = objs[item].id
            temp[item]['label'] = objs[item].roleName
          }
          that.character = temp;
          // temp[0] = {value: '', txt: '请选择'}
          // for (let item = 0; item < objs.length; item++) {
          //   temp[item + 1] = {}
          //   temp[item + 1]['value'] = objs[item].id
          //   temp[item + 1]['txt'] = objs[item].roleName
          // }
          // that.$Select({
          //   'data': temp,
          //   'originS': 'multiple',
          //   'selectId': ['select6', 'select5'],
          //   'callback': function (obj) {
          //     that.roleId = obj.value
          //     console.log(that.roleId)
          //   }
          // })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'AJuser') {
          this.pagepost({page: this.pageval})
        }
      }
    }
  }
</script>

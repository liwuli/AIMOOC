<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="center centerbottom50">
      <div class="centers">
        <Linklist></Linklist>
        <div class="AA_right">
          <AJposition></AJposition>
          <div class="G_search" style="margin-bottom: 20px;">
            <!-- <div class="part">
              <span class="txt">{{basicinfo.SbuildingN}}:</span>
              <div id='select95' style="margin-top: 3px;"></div>
              <select id="select96"></select>
            </div> -->
            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.SbuildingN}}:</span>
              <el-cascader style="float: left;margin-left: 20px;height: 32px;"
                  v-model="select_data"
                  :options="Sbuilding_options"
                  @change="handleChange">
              </el-cascader>
            </div>

            <!-- <div class="part">
              <span class="txt">{{basicinfo.SclassroomN}}:</span>
              <div id='select97' style="margin-top: 3px;"></div>
              <select id="select98"></select>
            </div> -->
            <div class="optline" style="float: right;width:auto">

              <el-button @click="adddevice" type="primary" icon="el-icon-circle-plus-outline">{{basicinfo.addallN}}</el-button>
              <el-button @click="bulkimport" type="primary" icon="el-icon-upload2">批量导入</el-button>
              <el-button @click="exportEquipments" type="primary" icon="el-icon-download">批量导出</el-button>
              <!-- <div class="btn" @click="bulkimport">批量导入</div> -->
              <!-- <div :style="addbtn" class="addall" @click="adddevice">{{basicinfo.addallN}}</div> -->

						</div>
          </div>
          <List :totalnum="totalnum" :pagesize="pagesize" :bingos="bingos" :pathinfo="pathinfo" :info='products' :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'></List>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/list'
import Linklist from './linklist'
import * as types from '@/store/win-types'
import AJposition from '@/components/extend/position'
import {basicinfo, powerinfo, pagesize, optobjinfoAllA, opteventAllA, optobjinfoAll, opteventAll, photoobj, device, devicetype, manufacturerinfo, bingos, products, percentinfo, colums, buildinglisturl, getequipmentsurl, listhead, pathinfo,exportEquipments} from '@/module/admin/config/controlrecordinfo'
// 权限处理
let optevent = [] // 'addlist', 'editlist', 'dellist''channeleditlist', 'channelsetlist', 'channeldellist'
let optobjinfo = [] // '添加', '编辑', '删除''编辑', '标定', '删除'
let addbtn = 'display: none'
export default {
  name: 'AJcontrolrecord',
  data () {
    return {
      products: products,
      basicinfo: basicinfo,
      pagesize: pagesize,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      optevent: optevent,
      pathinfo: pathinfo,
      bingos: bingos,
      addbtn: addbtn,
      devicetype: devicetype,
      manufacturerinfo: manufacturerinfo,
      device: device,
      optobjinfo: optobjinfo,
      photoobj: photoobj,
      Sbuilding: '',
      Sclassroom: '',
      buildingS: '',
      classroomS: '',
      yes: basicinfo.yes,
      no: basicinfo.no,
      add: 0,
      edit: 0,
      del: 0,
      set: 0,
      cedit: 0,
      totalnum: 0,
      select_data:'',
      Sbuilding_options:[],
      equipmentList:[]
    }
  },
  created () {
    this.getBuildingAndClassrooms()
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist
  },
  methods: {
    exportEquipments(e){
        let that = this
        // 教学楼-教室
        this.axios({
          method: 'post',
          url: exportEquipments,
          data: {
            sourceType: 0,
            classRoomId: that.Sclassroom
          },
          responseType: 'blob',
        })
        .then(function (res) {
          const fileName = '集控录播管理设备列表';
          const blob = new Blob([res.data], {
          	type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
          });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName + '.xls';
          link.click();
        })

    },


    handleChange(e){
      var that = this;
      that.Sbuilding = e[0] || '';
      that.Sclassroom = e[1] || '';
      that.pagepost()
    },

    bulkimport () {
      this.$router.push({name: 'AJcontrolrecordimport'})
    },
    adddevice () {
      this.$router.push({name: 'AJcontrolrecordadd', params: {item: {id: this.Sclassroom}}})
    },
    getBuildingAndClassrooms () {
      let that = this
      // 教学楼-教室
      this.axios({
        method: 'post',
        url: buildinglisturl,
        data: {classroomType: '01'}
      })
      .then(function (res) {
        let temp = []
        let classroom = []
        let objs = res.data.result

        for (var i = 0; i<objs.length;i++) {
            temp.push({
              value:objs[i].buildingId,
              label:objs[i].buildingName,
              children:[]
            })
            let classrooms =  objs[i].classrooms;
            for(var j =0 ;j<classrooms.length;j++){
              temp[i].children.push({
                value:classrooms[j].classroomId,
                label:classrooms[j].classroomName,
              })
            }
        }
        that.select_data = temp[0].children[0].value;
        that.Sbuilding = temp[0].value;
        that.Sclassroom = temp[0].children[0].value;
        that.Sbuilding_options =temp;
        that.pagepost()
//         for (let item = 0, j = 0; item < objs.length; item++) {
//           let classroomList = objs[item].classrooms
//           if (classroomList.length > 0) {
//             classroom[j] = []
//             temp[j] = {}
//             temp[j]['value'] = objs[item].buildingId
//             temp[j]['txt'] = objs[item].buildingName
//             for (let k = 0; k < classroomList.length; k++) {
//               classroom[j].push({value: classroomList[k].classroomId, txt: classroomList[k].classroomName})
//             }
//             j++
//           }
//         }
//         if (classroom[0].length > 0) {
//           that.Sclassroom = classroom[0][0].value
//           that.pagepost()
//         }
//         that.buildingS = that.$Select({
//           'data': temp,
//           'originS': 'multiple',
//           'selectId': ['select96', 'select95'],
//           'callback': function (obj) {
//
//             that.Sbuilding = obj.value
//             that.classroomS.cfg.data = classroom[obj.ind]
//             that.classroomS.cfg.domdata = false
//             that.classroomS.initCommonVal()
//             if (classroom[obj.ind].length > 0) {
//               that.Sclassroom = classroom[obj.ind][0].value
//               that.pagepost()
//             }
//           }
//         })
//         that.classroomS = that.$Select({
//           'data': classroom[0],
//           'originS': 'multiple',
//           'selectId': ['select98', 'select97'],
//           'callback': function (obj) {
//             that.Sclassroom = obj.value
//             that.pagepost()
//           }
//         })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    changeval (val, type) {
      switch (type) {
        case 'manu':
          if (val !== undefined && val !== 101) {
            return this.devicetype[type] + this.manufacturerinfo[val].txt
          }
          break
        case 'ip':
        case 'channelno':
          return this.devicetype[type] + val
        case 'phototype':
          return this.devicetype[type] + this.photoobj[val + 1].txt
        case 'use':
          return this.devicetype[type] + (val ? this.yes : this.no)
        case 'bd':
          return val ? this.bd : this.nobd
      }
    },
    pagepost () {
      this.optevent = []
      this.optobjinfo = []
      this.add = 0
      this.edit = 0
      this.del = 0
      this.cedit = 0
      this.set = 0
      this.edit = 0
      if (this.$store.state.userinfo.userName === 'admin') {
        this.addbtn = 'display:block'
      } else {
        let power = this.$store.state.powerinfo['controlrecord']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'channeladdlist':
                if (!this.add) {
                  this.optevent.push(powerinfo.OPallist)
                  this.optobjinfo.push(powerinfo.OaN)
                  this.addbtn = 'display:block'
                }
                this.add++
                break
              case 'editlist':
                if (!this.edit) {
                  this.optevent.push(powerinfo.OPelist)
                  this.optobjinfo.push(powerinfo.OeN)
                }
                this.edit++
                break
              case 'channeleditlist':
                if (!this.cedit) {
                  this.optevent.push(powerinfo.OPechannellist)
                  this.optobjinfo.push(powerinfo.OecN)
                }
                this.cedit++
                break
              case 'dellist':
                if (!this.del) {
                  this.optevent.push(powerinfo.OPdlist)
                  this.optobjinfo.push(powerinfo.OdN)
                }
                this.del++
                break
              case 'channelsetlist':
                if (!this.set) {
                  this.optevent.push(powerinfo.OPschannellist)
                  this.optobjinfo.push(powerinfo.OsN)
                }
                this.set++
                break
            }
          }
        }
      }
      let that = this
      this.axios({
        method: 'post',
        url: getequipmentsurl,
        data: {
          sourceType: 0,
          classRoomId: that.Sclassroom
        }
      })
      .then(function (res) {

        if (res.data.code === 200) {
          let temp = []
          that.equipmentList = res.data.result.equipmentList;          
          let objs = res.data.result.equipmentList
//        that.totalnum = objs.length
          let channelarr = []
          for (let item = 0; item < objs.length; item++) {
            temp[item] = {}
            temp[item]['id'] = objs[item].deviceId
            temp[item]['name'] = objs[item].deviceName
            temp[item]['ip'] = objs[item].deviceIp
            temp[item]['useval'] = objs[item].isValid ? that.yes : that.no
            temp[item]['use'] = objs[item].isValid
            temp[item]['channelid'] = objs[item].channelId
            temp[item]['channelname'] = objs[item].channelName
            temp[item]['channelno'] = objs[item].channelNo
            temp[item]['manu'] = objs[item].manufacturer
            temp[item]['port'] = objs[item].port
            temp[item]['protocolType'] = objs[item].protocolType
            temp[item]['type'] = objs[item].type
            temp[item]['photoobj'] = objs[item].target !== null ? photoobj[objs[item].target + 1].txt : ''
            temp[item]['no'] = objs[item].target
            if (objs[item].target !== null) {
              channelarr.push(objs[item].target)
            }
            temp[item]['parentid'] = objs[item].equipmentId
            temp[item]['URL'] = objs[item].url
            temp[item]['classroomid'] = objs[item].classRoomId
            temp[item]['uname'] = objs[item].uname
            temp[item]['ukeyword'] = objs[item].ukeyword
            let channelname = !!objs[item].channelName
            if (that.$store.state.userinfo.userName === 'admin') {
              if (channelname) { // 编辑通道功能
                temp[item].opt = optobjinfoAll
                temp[item].optevent = opteventAll
              } else { // 添加通道功能
                temp[item].opt = optobjinfoAllA
                temp[item].optevent = opteventAllA
              }
            } else { // 普通用户
              if (channelname) { // 编辑通道功能
                let temps = []
                let tempinfos = []
                for (let items = 0; items < that.optevent.length; items++) {
                  if (that.optevent[items] !== 'channeladdlist') {
                    temps.push(that.optevent[items])
                    tempinfos.push(that.optobjinfo[items])
                  }
                }
                temp[item].opt = tempinfos
                temp[item].optevent = temps
              } else { // 添加通道功能
                let temps = []
                let tempinfos = []
                for (let items = 0; items < that.optevent.length; items++) {
                  if (that.optevent[items] !== 'channelsetlist' && that.optevent[items] !== 'channeleditlist') {
                    temps.push(that.optevent[items])
                    tempinfos.push(that.optobjinfo[items])
                  }
                }
                temp[item].opt = tempinfos
                temp[item].optevent = temps
                console.log(temps, 'temps----------')
              }
            }
          }
          for (let item = 0; item < objs.length; item++) {
            temp[item]['channelarr'] = channelarr
          }
          that.products = temp
        } else {
          that.win(res.data.message, '', false)
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
      if (to.name === 'AJcontrolrecord') {
        this.pagepost()
      }
    }
  }
}
</script>

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
          <div style="float:left;width: 100%;height: 60px;">
            <el-menu :default-active="activeIndex" class="el-menu1" mode="horizontal" @select="elmenuSelect">
             <el-menu-item index="1" style="width: 100px;text-align: center;">智慧教室</el-menu-item>
             <el-menu-item v-if="microteaching" index="2" style="margin-left: 20px !important;width: 100px;text-align: center;">微格教室</el-menu-item>
            </el-menu>
          </div>

          <div class="G_search" >
            <!-- <div class="part">
              <span class="txt">{{basicinfo.buildN}}:</span>
              <div id='select95' style="margin-top: 3px;"></div>
              <select id="select96"></select>
            </div>
            <div class="part">
              <span class="txt">{{basicinfo.classroomN}}:</span>
              <div id='select97' style="margin-top: 3px;"></div>
              <select id="select98"></select>
            </div> -->
            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.buildN}}:</span>
              <el-cascader style="float: left;margin-left: 20px;height: 32px;"
                  v-model="select_data"
                  :options="Sbuilding_options"  :props="{ checkStrictly: true }"
                  @change="handleChange" clearable>
              </el-cascader>
            </div>
             <el-button v-show="activeIndex=='1'" type="primary" @click="search" style="float: left;margin-left: 20px;margin-top: 20px;" icon="el-icon-search">搜索</el-button>
             <el-button v-show="activeIndex=='2'" type="primary" @click="gettable" style="float: left;margin-left: 20px;margin-top: 20px;" icon="el-icon-search">搜索</el-button>
             <el-button v-show="activeIndex=='2'" type="primary" @click="additem=true" style="float: right;margin-right: 20px;margin-top: 20px;" icon="el-icon-circle-plus-outline">添加终端</el-button>
             <!-- <div  style="float: right;margin-right: 20px;margin-top: 20px;" class="btn" @click="adddevice">添加终端</div> -->
          </div>
		      <List v-show="activeIndex=='1'" :totalnum="totalnum" :addbtn="addbtn" :delbtn="delbtn" :pagesize="pagesize" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent' :colums="colums" :percentinfo='percentinfo'>
            <div class="optline">
              <div class="btn" @click="adddevice">添加终端</div>
            </div>
          </List>

         <div v-show="activeIndex=='2'" style="float: left;width: 100%;margin-top: 20px;">
           <el-table
             v-loading="loading" element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             :data="data_list" border style="width: 100%;"
             :header-cell-style="{background:'#d5dfeb',color:'#606266',textAlign:'center'}"
             :cell-style="{'text-align': 'center'}" >
                 <el-table-column prop="buildingName" label="教学楼"></el-table-column>
                 <el-table-column prop="classroomName" label="教室"></el-table-column>
                 <el-table-column prop="deviceIp" label="博睿终端IP"></el-table-column>
                 <el-table-column prop="deviceIp"
                   label="操作">
                   <template slot-scope="scope">
                      <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button @click.native.prevent="deleteRow(scope.$index, data_list)" type="text" size="small">删除</el-button>
                      <el-button @click="openurl(scope.row)" type="text" size="small">管理</el-button>
                   </template>
                 </el-table-column>
             </el-table>
             <div style="text-align: center;width: 100%;margin-bottom: 60px;margin-top: 30px;">
               <el-pagination background :prev-text="'上一页'" :next-text="'下一页'" :popper-class="'pagination1'" @current-change="gettable"
                 :current-page.sync="table_pageindex" :page-size="table_pagesize"
                 layout="prev, pager, next, jumper,total" :total="table_totalnum">
               </el-pagination>
             </div>

         </div>

         <el-dialog title="添加终端" :visible.sync="additem" width="40%" center>
           <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
                 <span style="font-size: 14px;margin-right: 15px;">教学楼:</span>
                 <el-cascader style="height: 32px;width: 350px;" placeholder="请选择教学楼和教室"
                    v-model="select_value" :options="Sbuilding_options">
                 </el-cascader>
           </div>
           <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
                <span style="font-size: 14px;margin-right: 15px;">ip:</span>
                <el-input style="width: 350px;margin-left: 30px;"
                  placeholder="请输入ip地址"
                  v-model="ip"
                  clearable>
                </el-input>
           </div>
           <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
                <span style="font-size: 14px;margin-right: 15px;">端口:</span>
                <el-input style="width: 350px;margin-left: 15px;"
                  placeholder="请输入端口"
                  v-model="port"
                  clearable>
                </el-input>
           </div>
           <div slot="footer" class="dialog-footer">
             <el-button @click="additem = false">取 消</el-button>
             <el-button type="primary" @click="verify">确 定</el-button>
           </div>
         </el-dialog>


         <el-dialog title="编辑终端" :visible.sync="edititem" width="40%" center>
           <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
                 <span style="font-size: 14px;margin-right: 15px;">教学楼:</span>
                 <el-cascader style="height: 32px;width: 350px;" placeholder="请选择教学楼和教室"
                    v-model="select_value2" :options="Sbuilding_options" >
                 </el-cascader>
           </div>
           <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
                <span style="font-size: 14px;margin-right: 15px;">ip:</span>
                <el-input style="width: 350px;margin-left: 30px;"
                  placeholder="请输入ip地址"
                  v-model="editip"
                  clearable>
                </el-input>
           </div>
           <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
                <span style="font-size: 14px;margin-right: 15px;">端口:</span>
                <el-input style="width: 350px;margin-left: 15px;"
                  placeholder="请输入端口"
                  v-model="editport"
                  clearable>
                </el-input>
           </div>
           <div slot="footer" class="dialog-footer">
             <el-button @click="edititem = false">取 消</el-button>
             <el-button type="primary" @click="editsave">确 定</el-button>
           </div>
         </el-dialog>

    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/listcheck'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {microteaching} from '@/module/admin/config/urlPage'
import {buildinglisturl,addurl,editurl,delurl, basicinfo, powerinfo, pageval, opteventAll, optobjinfoAll, products, infoval, bingos, colums, percentinfo, pagesize, listurl, listhead, pathinfo} from '@/module/admin/config/Intelligentterminalinfo'
// 权限处理
let optevent = [] // 'editlist', 'dellist'
let optobjinfo = [] // '编辑', '删除'
let addbtn = 'display: none'
let delbtn = 'display: none'
export default {
  name: 'AJintelligentterminal',
  data () {
    return {
      microteaching:microteaching,
      activeIndex:'1',
      loading:true,
      data_list:[], //微格教学的列表集合
      table_pagesize:10,
      table_pageindex:1,
      table_totalnum:0,
      additem:false,
      class_options:[],//教学楼和教师的集合
      select_value:[],//选择的数据集合
      ip:'',
      port:'8080',
      edititem:false,
      select_value2:[], //编辑的功能 的数组
      editip:'',
      editport:'',
      deviceId:'',

      basicinfo: basicinfo,
      products: products,
      infoval: infoval,
      percentinfo: percentinfo,
      colums: colums,
      listhead: listhead,
      optevent: optevent,
      optobjinfo: optobjinfo,
      opteventAll: opteventAll,
      optobjinfoAll: optobjinfoAll,
      pathinfo: pathinfo,
      bingos: bingos,
      addbtn: addbtn,
      delbtn: delbtn,
      pageval: pageval,
      pageindex: 1,
      pagesize: pagesize,
      edit: 0,
      del: 0,
      totalnum: 0,
      keywords: '',
      buildingId: '',
      classroomId: '',
      Sbuilding_options:[],
      select_data:[]
    }
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist
  },
  computed: {
    pageinfo () {
      return Math.ceil(this.totalnum / this.pagesize)
    }
  },
  methods: {
    // 管理
    openurl(e){
      window.open('http://' + e.deviceIp + ':' + e.port + '/AiBrain/gotoLive.html#/?uuid=4')
    },


    //删除
    deleteRow(index, rows) {
        var that  = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {

                  this.axios({
                    method: 'post',
                    url: delurl,
                    params: {
                      params: {
                        deviceId: rows[index].deviceId
                      }
                    }
                  })
                  .then(function (res) {
                      // that.table_pageindex = 1;
                      var totalpage = Math.ceil((that.table_totalnum - 1) /that.table_pagesize);
                      var pageindex = that.table_pageindex > totalpage ? totalpage : that.table_pageindex
                      that.table_pageindex =  pageindex < 1 ? 1 :pageindex
                      that.gettable();
                      that.$message({
                         message: res.data.message,
                         type: 'success',
                         customClass:'message',
                         duration:1500
                      });
                  })
                }).catch(() => {

                });


    },


    editClick(e){
      var arr = [e.buildingId,e.classRoomId]
      this.select_value2 = arr;
      this.editip = e.deviceIp;
      this.editport = e.port;
      this.deviceId = e.deviceId;
      this.classroomId = e.classRoomId;
      this.edititem = true;

    },


    editsave(){
      let that = this
      this.axios({
        method: 'post',
        url: editurl,
        params: {
          params: {
            port: that.editport,
            classRoomId: that.classroomId,
            deviceIp: that.editip,
            deviceName: that.editip,
            url: '',
            type:14,
            deviceId: that.deviceId
          }
        }
      })
        .then(function (res) {
            that.classroomId = '';
            that.edititem = false;
            if(res.data.code == 200){

              that.$message({
                 message: res.data.message,
                 type: 'success',
                 customClass:'message',
                 duration:1500
              });
            }else{
              that.$message({
                  message: res.data.message,
                 type: 'warning',
                 customClass:'message',
                 duration:1500
              });
            }
            that.gettable();
        })
    },


    elmenuSelect(e){
      this.activeIndex = e;
      this.getBuildingAndClassrooms();
      this.select_data = []
      this.buildingId = '';
      this.classroomId = '';

      if(e=='2'){
        this.gettable();
      }
    },

    handleChange(e){
      this.buildingId = e[0] || '';
      this.classroomId = e[1] || '';
      // this.search();
    },



    gettable(e){
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          pageSize: this.table_pagesize,
          pageIndex: this.table_pageindex,
          classroomId: this.classroomId,
          buildingId: this.buildingId,
          type:14
        }
      })
      .then(function (res) {
        that.data_list = res.data.data
        that.table_totalnum = res.data.total;
        that.loading = false;
      })
    },

    verify () {
      if (!this.select_value[0]) {
        // this.win('请选择教学楼')
        this.$message({
           message: '请选择教学楼',
           type: 'warning',
           customClass:'message',
           duration:1500
        });
        return true;
      } else if (!this.select_value[1]) {
        this.$message({
           message: '请选择教室',
           type: 'warning',
           customClass:'message',
           duration:1500
        });
        return true
      } else if (!this.ip.toString().replace(/\s/g, '')) {
        // this.win('请填写IP')
         this.$message({
            message: '请填写正确IP',
            type: 'warning',
            customClass:'message',
            duration:1500
         });
        return true
      } else if (!this.port.toString().replace(/\s/g, '')) {
        // this.win('请填写端口')
        this.$message({
           message: '请填写正确端口',
           type: 'warning',
           customClass:'message',
           duration:1500
        });
        return true
      } else {
          this.addtable()
      }

    },

    //添加终端
    addtable(){
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        params: {
          params: {
            port: that.port,
            classRoomId: that.select_value[1],
            deviceIp: that.ip,
            deviceName: that.ip,
            url: '',
            type: 14
          }
        }
      })
        .then(function (res) {
          that.additem = false;
          that.select_value = [];
          that.ip ='';
          that.port = '8080';
          that.gettable();
          that.$message({
             message: res.data.message,
             type: 'success',
             customClass:'message',
             duration:1500
          });
        })
    },


    setStyleAndBindEvent () {
      let that = this
      setTimeout( () => {
        const classroomList = document.querySelector('#fatherlist').children
        let domList = []
        for (let i = 0; i < classroomList.length; i ++) {
          classroomList[i].children[1].setAttribute('index', i)
          domList.push(classroomList[i].children[1])
        }
        for (let j = 0; j < domList.length; j ++) {
          domList[j].style.textDecoration = 'underline'
          domList[j].style.cursor = 'pointer'
          domList[j].addEventListener('mouseover', function (e) {
            e.target.style.color = 'blue'
          })
          domList[j].addEventListener('mouseout', function (e) {
            e.target.style.color = '#6c6c6c'
          })
          domList[j].addEventListener('click', function (e) {
            let index = e.target.getAttribute('index')
            let ip = that.products[index].deip
            let port = that.products[index].port
            window.open('http://' + ip + ':' + port + '/AiBrain/gotoLive.html#/?uuid=4')
          })
        }
      }, 1000)
    },
    adddevice () {
      this.$router.push({name: 'AJintelligentterminaladd', params: { activeIndex: this.activeIndex}})
      },

    getBuildingAndClassrooms () { // 教学楼-教室
         let that = this
        // this.axios.post(buildinglisturl, {classroomType: this.activeIndex=='1' ? '2' :'3'})
        this.axios({
          method: 'post',
          url: buildinglisturl,
          data: {classroomType: this.activeIndex=='1' ? '2' :'3'}
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
            that.Sbuilding_options =temp;
        })




        // let i = 0
        // for (let len = objs.length, j = 0; j < len; j++) {
        //   let classroomList = objs[j].classrooms
        //   if (classroomList.length > 0) {
        //     classroom[i + 1] = [{value: -1, txt: '全部'}]
        //     temp[i + 1] = {value: objs[j].buildingId, txt: objs[j].buildingName}
        //     for (let k = 0; k < classroomList.length; k++) {
        //       classroom[i + 1][k + 1] = {value: classroomList[k].classroomId, txt: classroomList[k].classroomName}
        //     }
        //     i++
        //   }
        // }
        // that.buildingS = that.$Select({
        //   'data': temp,
        //   'originS': 'multiple',
        //   'selectId': ['select96', 'select95'],
        //   'callback': function (obj) {
        //     that.classroomId = ''
        //     that.buildingId = obj.ind ? obj.value : ''
        //     that.classroomS.cfg.data = classroom[obj.ind]
        //     that.classroomS.cfg.domdata = false
        //     that.classroomS.initCommonVal()
        //   }
        // })
        // that.classroomS = that.$Select({
        //   'data': classroom[0],
        //   'originS': 'multiple',
        //   'selectId': ['select98', 'select97'],
        //   'callback': function (obj) {
        //     that.classroomId = obj.ind ? obj.value : ''
        //   }
        // })

      this.setStyleAndBindEvent()
    },
    search () {
      this.pagepost({page: 1})
      this.setStyleAndBindEvent()
    },
    pagepost (obj) {
      this.optevent = []
      this.optobjinfo = []
      this.edit = 0
      this.del = 0
      this.mana = 0
      this.delbtn = 'display:none' // 隐藏批量删除
      this.addbtn = 'display:none' // 隐藏添加

      if (this.$store.state.userinfo.userName === 'admin') {
        this.optevent = this.opteventAll
        this.optobjinfo = this.optobjinfoAll
      } else {
        let power = this.$store.state.powerinfo['intelligentterminal']
        if (power.length !== 0) {
          for (let i = 0; i < power.length; i++) {
            switch (power[i].operationCode) {
              case 'addlist':
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
                }
                this.del++
                break
              case 'manlist':
                if (!this.mana) {
                  this.optevent.push(powerinfo.OPmalist)
                  this.optobjinfo.push(powerinfo.OmaN)
                }
                this.mana++
                break
            }
          }
        }
      }
      this.pageval = obj.page// 初始值是1
      this.bingos = []
      this.bingos[obj.page - 1] = 'selected'

      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        data: {
          pageSize: this.pagesize,
          pageIndex: this.pageval,
          classroomId: this.classroomId,
          buildingId: this.buildingId,
          type:12
        }
      })
      .then(function (res) {
        that.totalnum = res.data.total
        let obj = res.data.data
        let temp = []
        for (let i = 0; i < obj.length; i++) {
          let optobj = that.optobjinfo
          if (i < pagesize) {
            temp[i] = {}
            temp[i]['buid'] = obj[i].buildingId
            temp[i]['clid'] = obj[i].classroomId
            temp[i]['buildingName'] = obj[i].buildingName
            temp[i]['classroomName'] = obj[i].classroomName
            temp[i]['deip'] = obj[i].deviceIp // 取教室的第一个设备的IP
            temp[i]['deid'] = obj[i].deviceId
            temp[i]['port'] = obj[i].port
            temp[i]['deurl'] = obj[i].url
            temp[i]['detype'] = obj[i].type
            temp[i]['dename'] = obj[i].deviceName
            temp[i].opt = optobj
            temp[i].selected = false
          }
        }
        that.products = temp
      })
      .catch(function (error) {
        console.log(error)
      })
      this.setStyleAndBindEvent()
    }
  },
  created () {
    this.pagepost({page: 1})
  },
  mounted () {
    this.getBuildingAndClassrooms()
    this.setStyleAndBindEvent()
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AJintelligentterminal') {
        this.pagepost({page: this.pageval})
      }
    }
  }
}
</script>

<style>
  .message{
    margin-top: 60px;
    }
</style>

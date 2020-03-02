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
          <div style="float: left;width: 100%;height: 60px;">

            <div style="float: left; height: 100%;display: flex;align-items: center;">
              <span class="txt" style="margin-right: 20px;">学科:</span>
              <el-select v-model="subjectId" clearable placeholder="请选择专业" filterable style="width: 150px;margin-right: 150px;" :popper-class="'el_selects_css'">
                <el-option v-for="item in select_subject_list" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId">
                </el-option>
              </el-select>

              <!-- <el-input style="float: left;width: 150px;margin-right: 150px;" placeholder="请输入学科名称" v-model="subject_name"
                clearable>
              </el-input> -->

              <span class="txt" style="margin-right: 20px;">专业:</span>
              <el-select v-model="major_id" clearable placeholder="请选择专业" filterable style="width: 150px;" :popper-class="'el_selects_css'">
                <el-option v-for="item in major_list" :key="item.majorId" :label="item.majorName" :value="item.majorId">
                </el-option>
              </el-select>

              <!-- <el-input style="float: left;width: 150px;margin-right: 50px;"
                  placeholder="请输入专业名称"
                  v-model="profession_name"
                  clearable>
                </el-input> -->


              <el-button type="primary" @click="getMicroSubjectList" style="float: left;margin-left: 20px;" icon="el-icon-search">搜索</el-button>
            </div>
            <el-button type="primary" @click="add_subject" style="float: right;margin-right: 20px;margin-top: 14px;"
              icon="el-icon-circle-plus-outline">添加</el-button>
          </div>
          <div style="float: left;width: 100%;">
            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="subject_list" border style="width: 100%;"
              :header-cell-style="{background:'#d5dfeb',color:'#606266',textAlign:'center'}" :cell-style="{'text-align': 'center'}">
              <el-table-column prop="subjectName" label="学科名称"></el-table-column>
              <el-table-column prop="majors" label="对应专业">
                <template slot-scope="scope">
                  <span v-for="item in scope.row.majors" style="margin-right: 10px;">{{item.majorName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="majors" label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row),dialogFormVisible = true" type="text" size="small">编辑</el-button>
                  <el-button @click.native.prevent="deleteRow(scope.$index, subject_list)" type="text" size="small">删除</el-button>
                  <!-- <el-button type="primary" icon="el-icon-edit" >编辑</el-button>
                       <el-button type="danger" icon="el-icon-delete" >删除</el-button> -->
                </template>

              </el-table-column>
            </el-table>
            <div style="text-align: center;width: 100%;margin-bottom: 60px;margin-top: 30px;">
              <el-pagination background :prev-text="'上一页'" :next-text="'下一页'" :popper-class="'pagination1'" @current-change="getMicroSubjectList"
                :current-page.sync="pageIndex" :page-size="pageSize"
                layout="prev, pager, next, jumper,total" :total="totalnum">
              </el-pagination>
            </div>
          </div>

          <el-dialog title="编辑学科" :visible.sync="dialogFormVisible" width="30%" center>
            <div style="width: 100%;height: 50px;display: flex;align-items: center;">
              <span style="margin-right: 42px;margin-left: 30px;">学科:</span>
              <el-input style="width: 350px;" placeholder="请输入学科名称" v-model="update_subject_name" clearable>
              </el-input>
            </div>
            <div style="width: 100%;height: 50px;display: flex;align-items: center;">
              <span style="margin-right: 15px;margin-left: 30px;">对应专业:</span>
              <el-select v-model="update_profession" multiple placeholder="请选择" style="width: 350px;" :popper-class="'el_selects_css'">
               <el-option v-for="item in major_list" :key="item.majorId" :label="item.majorName" :value="item.majorId">
               </el-option>
              </el-select>
            </div>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateMicroSubject">确 定</el-button>
            </div>
          </el-dialog>


          <el-dialog title="添加学科" :visible.sync="addsubject" width="30%" center>
            <div style="width: 100%;height: 50px;display: flex;align-items: center;">
              <span style="margin-right: 42px;margin-left: 30px;">学科:</span>
              <el-input style="width: 350px;" placeholder="请输入学科名称" v-model="add_subject_name" clearable>
              </el-input>
            </div>
            <div style="width: 100%;height: auto;display: flex;align-items: center;">
              <span style="margin-right: 15px;margin-left: 30px;">对应专业:</span>
              <el-select v-model="add_profession" multiple placeholder="请选择" style="width: 350px;" :popper-class="'el_selects_css'">
                <el-option v-for="item in major_list" :key="item.majorId" :label="item.majorName" :value="item.majorId">
                </el-option>
              </el-select>
            </div>

            <div slot="footer" class="dialog-footer">
              <el-button @click="addsubject = false">取 消</el-button>
              <el-button type="primary" @click="addMicroSubject">确 定</el-button>
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
  // import Linklist from './linklist'
  import Linklist from './linklist'
  import AJposition from '@/components/extend/position'
  import {
    getMicroSubjectList,
    deleteMicroSubject,
    updateMicroSubject,
    findMajorList,
    addMicroSubject
  } from '@/module/admin/config/highteaching'
  export default {
    name: 'AJhighteaching',
    data() {
      return {
        subject_name: '', //输入的学科
        major_id: '', //专业的id
        pageIndex: 1,
        pageSize: 5,
        add_majorId: [], //添加学科选择的专业id
        profession_name: '', //输入的专业
        subject_list: [], //表格数据
        totalnum: 0,
        loading: true,
        dialogFormVisible: false, //修改弹窗是否打开
        addsubject: false, //添加弹窗是否打开

        update_subject_name: '', //修改的学科名称
        update_profession: [], //修改选择的专业
        update_subject_id:'', //修改的学科id

        add_subject_name: '', //新建学科输入的学科
        add_profession: [], //新建学科选择的 专业
        select_subject_list:[], //学科集合
        subjectId:'',

        major_list: [], //专业集合
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      }

    },
    components: {
      Ghead,
      Gfoot,
      AJposition,
      Linklist
    },
    created() {
      this.getselect_MicroSubjectList();
      this.getMicroSubjectList()
      this.findMajorList();
    },

    methods: {

      add_subject(){
        this.add_subject_name = '' //新建学科输入的学科
        this.add_profession = [] //新建学科选择的 专业
        this.addsubject=true;
      },

      //查询所有专业
      findMajorList() {
        var that = this;
        this.axios({
            method: 'post',
            url: findMajorList,
            params: {
              'par': {
                "collegeId": "",
                "majorName": "",
                "pageSize": 100000,
                "pageIndex": 1
              }
            }
          })
          // this.axios.post(findMajorList,{ par: {"collegeId":"","majorName":"","pageSize":100000,"pageIndex":1}})
          .then(function(res) {
            that.major_list = res.data.data;
          })
      },

      //修改学科
      updateMicroSubject(){
        var that = this;
        this.axios({
            method: 'post',
            url: updateMicroSubject,
            params: {
              'par': {
                "subjectId":that.update_subject_id,
                "subjectName": that.update_subject_name,
                "majorIds": that.update_profession
              }
            }
          })
          .then(function(res) {
            that.getMicroSubjectList();
            that.$notify({
              title: res.data.data,
              type: 'success',
              position: 'bottom-right',
              duration: 1500
            });
            that.dialogFormVisible = false
          })
          .catch(() => {
            that.dialogFormVisible = false
          });


      },


      //添加学科
      addMicroSubject() {
        var that = this;
        this.axios({
            method: 'post',
            url: addMicroSubject,
            params: {
              'par': {
                "subjectName": that.add_subject_name,
                "majorIds": that.add_profession
              }
            }
          })
          .then(function(res) {
            that.getMicroSubjectList();
            that.$notify({
              title: res.data.data,
              type: 'success',
              position: 'bottom-right',
              duration: 1500
            });
            that.addsubject = false
          })
          .catch(() => {
            that.addsubject = false
          });
      },



      //获取列表
      getMicroSubjectList() {
        var that = this;

        this.axios({
            method: 'post',
            url: getMicroSubjectList,
            params: {
              'par': {
                subjectName: that.subject_name,
                subjectId: that.subjectId,
                majorId: that.major_id,
                offset:(that.pageIndex -1 ) * that.pageSize,
                pageSize:that.pageSize,
              }
            }
          })
          .then(function(res) {
            that.subject_list = res.data.data
            that.totalnum = res.data.total
            that.loading = false
          })


      },


	  //获取学科列表
	  getselect_MicroSubjectList() {
	    var that = this;
	    this.axios({
	        method: 'post',
	        url: getMicroSubjectList,
	        params: {
	          'par': {
	            subjectName: "",
	            majorId: "",
	            offset: 0,
	            pageSize: 100000,
	          }
	        }
	      })
	      .then(function(res) {
	        that.select_subject_list = res.data.data
	      })
	  },

      //删除学科
      deleteRow(index, rows) {
        var that = this;
        this.$confirm('此操作将删除该学科, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var subjectId = rows[index].subjectId;

          var that = this;
          this.axios({
              method: 'post',
              url: deleteMicroSubject,
              params: {
                'par': {
                  "subjectIds": [subjectId]
                }
              }
            })

            .then(function(res) {

                var totalpage = Math.ceil((that.totalnum - 1) /that.pageSize);
                var pageindex = that.pageIndex > totalpage ? totalpage : that.pageIndex
                that.pageIndex =  pageindex < 1 ? 1 :pageindex

                that.getMicroSubjectList();
                that.$notify({
                  title: res.data.data,
                  type: 'success',
                  position: 'bottom-right',
                  duration: 1500
                });
                // rows.splice(index, 1);
              })
            })
            .catch(() => {

            });


      },

      handleClick(e) {
        this.update_subject_name=e.subjectName; //修改的学科名称
        this.update_subject_id=e.subjectId; //修改的学科id
        var arr = [];
        for(var i = 0 ; i< e.majors.length;i++){
          arr.push(e.majors[i].majorId)
        }
        this.update_profession = arr;//修改选择的专业
      }

    }

  }
</script>

<style>
</style>

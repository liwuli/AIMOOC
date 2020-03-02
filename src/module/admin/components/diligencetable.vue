<template>
  <div class="app">
    <div style="float: left; width: 100%;height: auto;margin-top: 20px;">
      <div style="width: 100%;height: auto;">
        <el-date-picker style="float: left; margin-left: 50px;margin-top: 20px;" v-model="select_time" type="daterange"
          align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          :picker-options="pickerOptions" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
        </el-date-picker>

        <el-radio-group v-model="select_radio" style="float: left;margin-left: 80px;margin-top: 20px;" @change="select_radio1">
          <el-radio-button label="课程名称"></el-radio-button>
          <el-radio-button label="课程代码"></el-radio-button>
        </el-radio-group>

        <el-select v-show="select_radio=='课程名称'" clearable v-model="selectname" filterable :placeholder="placeholder"
          size="small" :popper-class="'selectsss'" style="float:left; margin-left: 20px;margin-top: 20px;">
          <el-option v-for="item in course_list" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-show="select_radio!='课程名称'" clearable v-model="selectcode" filterable :placeholder="placeholder"
          size="small" :popper-class="'selectsss'" style="float:left; margin-left: 20px;margin-top: 20px;">
          <el-option v-for="item in code_list" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <div style="float: left;margin-left: 80px;margin-top: 20px;">
          <span class="span3" style="float: left;line-height: 36px;">教师名：</span>
          <el-input style="margin-left: 20px;width:200px;" placeholder="请输入教师名" suffix-icon="el-icon-search" size="small"
            :disabled="input_teacher" v-model="teacher_name">
          </el-input>
        </div>

      </div>
    </div>
    <div style="float: left;margin-top: 20px;">
      <span class="span3" style="float: left;line-height: 36px;margin-left: 50px;">上课班级：</span>
      <el-radio-group v-model="select_radio2" size="small" style="float: left;margin-left: 20px;" @change="select_radio_class">
        <el-radio-button label="行政班"></el-radio-button>
        <el-radio-button label="教学班"></el-radio-button>
      </el-radio-group>

      <el-cascader v-if="select_radio2=='行政班'" v-model="select_class" placeholder="请选择" :options="myclass" @change="handleChange" :props="{ checkStrictly: true,expandTrigger: 'hover' }"
        size="small" filterable clearable style="float: left;margin-left: 20px;height: 32px !important;">
      </el-cascader>

      <el-select v-if="select_radio2!='行政班'" v-model="select_class2" size="small" clearable filterable placeholder="请选择"
        :popper-class="'selectsss'" style="float: left;margin-left: 20px; ">
        <el-option v-for="item in class_options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>


      <span class="span3" style="float: left;line-height: 36px;margin-left: 50px;">教室类型：</span>
      <el-select v-model="isAnalysis" placeholder="请选择" :popper-class="'selectsss'" clearable  style="float: left;margin-left: 30px;">
        <el-option v-for="item in isAnalysis_type" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <span class="span3" style="float: left;line-height: 36px;margin-left: 50px;">到勤率排序：</span>
      <el-select v-model="isLess" placeholder="请选择" :popper-class="'selectsss'" clearable  style="float: left;margin-left: 30px;">
        <el-option v-for="item in minAttendanceRate_options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-button @click="findAnalysisGByUser2" type="primary" size="small" icon="el-icon-search" style="margin-left:35px">查询</el-button>
    </div>

    <div class="diligence_div3">
      <el-table :data="less_list" border style="width: 100%;" :header-cell-style="{background:'#d5dfeb',color:'#606266',textAlign:'center'}" :cell-style="{'text-align': 'center'}">
        <el-table-column prop="courseName" label="课程名" sortable></el-table-column>
        <el-table-column prop="courseCode" label="课程代码" sortable></el-table-column>
        <el-table-column prop="lessonName" label="章节" width="230" sortable></el-table-column>
        <el-table-column prop="userName" label="授课老师" sortable></el-table-column>
        <el-table-column prop="startTime" label="上课时间" sortable></el-table-column>
        <el-table-column prop="classesName" label="上课班级" sortable></el-table-column>
        <el-table-column prop="classroomName" label="上课教室" sortable></el-table-column>
        <el-table-column prop="classroomType" label="教室类型" sortable>
          <!-- <template slot-scope="scope">
          	<el-button v-if="scope.row.isAnalysis==0" style="color: #000000;" type="text" >云录播教室</el-button>
          	<el-button v-if="scope.row.isAnalysis==2" style="color: #000000;" type="text" >单机智慧教室</el-button>
          </template> -->
        </el-table-column>
        <el-table-column prop="studentsInPlan" label="应到" sortable></el-table-column>
        <el-table-column prop="studentsArrivalsMax" label="实到" sortable></el-table-column>
        <el-table-column prop="attendanceRate" label="到勤率" sortable>
          <template slot-scope="scope">
          	<el-button style="color: #000000;" type="text" >{{scope.row.attendanceRate!= null? scope.row.attendanceRate :0}}%</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="diligence_div2" style="text-align: center;margin-top: 30px;margin-bottom: 50px;">
    	<el-pagination background :prev-text="'上一页'" :next-text="'下一页'" :popper-class="'pagination1'" @size-change="handleSizeChange"
    	 @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize"
    	 layout="prev, pager, next, jumper,sizes,total" :total="currentTotal">
    	</el-pagination>
    </div>
	<Gfoot style="position: fixed;bottom: 0px;" ></Gfoot>
  </div>
</template>

<script>
  import Gfoot from '@/components/common/footer'
  import {
    findAllCourses,
    findCollegeAndMajor,
    findClassesByType,
    findAnalysisGByUser,
    findAnalysisDetail,
    updateUserAttendance,
    exportReport,
    findTermsLists,
    findAttendanceForLesson,
    exportAttendanceForLesson
  } from '@/module/admin/config/statisticsinfo'
  export default {
    name: 'diligencetable',
    data() {
      return {
        select_time: null,
        pickerOptions: {
          shortcuts: [{
            text: '近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '近一月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        select_radio: '课程名称',
        select_radio2: '行政班',
        selectcode: '',
        selectname: '',
        placeholder: '请输入课程名称',
        placeholder2: '请输入学生姓名',
        course_list: [],
        code_list:[],
        input_teacher: false, //教师名搜索框禁用状态
        teacher_name: '',
        select_class2: '', //单选班级
        select_class: [],
        myclass: [], //学院 专业 班级 下拉框集合
        class_collection: [], //班级集合 复用
        class_options: [], //教学班下拉框
        isAnalysis: '',
        isAnalysis_type: [{
          value: '0',
          label: '云录播教室'
        }, {
          value: '2',
          label: '单机智慧教室'
        }],
        currentPage: 1, //当前第几页
        pageSize: 10, //每页多少条
        currentTotal: 0, //总数据
        less_list: [] ,//表格数据
        isLess:null,
        minAttendanceRate:0,
        minAttendanceRate_options:[]
      }
    },
    components: {
      Gfoot
    },

    mounted() {
      this.findAllCourses();
      this.findCollegeAndMajor();
      this.findTermsLists();
      this.findAnalysisGByUser();
    },
    methods: {
      //导出表格
      exportReport() {
        var that = this;
        var data = {
          page: this.currentPage,
          pageSize: this.currentTotal,
          startDate: (this.select_time == null ? '' : this.select_time[0]),
          endDate: (this.select_time == null ? '' : this.select_time[1]),
          courseName: this.selectname,
          courseCode: this.selectcode,
          userName: this.teacher_name,
          classType: this.select_radio2 == '行政班' ? 0 : 1,
          classId: (this.select_radio2 == '行政班' ? (this.select_class[2] == undefined ? '' : this.select_class[2]) : this.select_class2),
          isAnalysis: this.isAnalysis,
          isLess:(this.isLess==='')?null:this.isLess
        };
        console.log(data)
        this.axios({
        	method: 'get',
        	url: exportAttendanceForLesson,
        	params:data,
        	responseType: 'blob',
        }).then((res) => {
        	const fileName = '考勤率回顾';
        	const blob = new Blob([res.data], {
        		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        	});
        	const link = document.createElement('a');
        	link.href = window.URL.createObjectURL(blob);
        	link.download = fileName + '.xls';
        	link.click();
        })

      },

      handleSizeChange(val) {
      	console.log(`每页 ${val} 条`);
      	this.pageSize = val;
      	this.findAnalysisGByUser();
      },

      handleCurrentChange(val) {
      	console.log(`当前页: ${val} `);
      	this.currentPage = val;
      	this.findAnalysisGByUser();
      },

      isequal( x, y ) {
      // If both x and y are null or undefined and exactly the same
      if ( x === y ) {
       return true;
      }

      // If they are not strictly equal, they both need to be Objects
      if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
       return false;
      }

      //They must have the exact same prototype chain,the closest we can do is
      //test the constructor.
      if ( x.constructor !== y.constructor ) {
       return false;
      }

      for ( var p in x ) {
       //Inherited properties were tested using x.constructor === y.constructor
       if ( x.hasOwnProperty( p ) ) {
       // Allows comparing x[ p ] and y[ p ] when set to undefined
       if ( ! y.hasOwnProperty( p ) ) {
        return false;
       }

       // If they have the same strict value or identity then they are equal
       if ( x[ p ] === y[ p ] ) {
        continue;
       }

       // Numbers, Strings, Functions, Booleans must be strictly equal
       if ( typeof( x[ p ] ) !== "object" ) {
        return false;
       }

       // Objects and Arrays must be tested recursively
       if ( ! Object.equals( x[ p ], y[ p ] ) ) {
        return false;
       }
       }
      }

      for ( p in y ) {
       // allows x[ p ] to be set to undefined
       if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
       return false;
       }
      }
      return true;
      },


      // 查询表格
      findAnalysisGByUser() {
        var that = this;

        // var eq_data = {
        //   startDate: (this.select_time == null ? '' : this.select_time[0]),
        //   endDate: (this.select_time == null ? '' : this.select_time[1]),
        //   courseName: this.selectname,
        //   courseCode: this.selectcode,
        //   userName: this.teacher_name,
        //   classType: this.select_radio2 == '行政班' ? 0 : 1,
        //   classId: (this.select_radio2 == '行政班' ? (this.select_class[2] == undefined ? '' : this.select_class[2]) :
        //     this.select_class2),
        //   isAnalysis: this.isAnalysis,
        //   isLess:(this.isLess==='')?null:this.isLess
        // }

        // if(that.data!=null){
        //   debugger
        //   if(that.isequal(that.data,eq_data)){

        //   }else{
        //     that.currentPage=1;
        //   }

        // }
        // that.data =eq_data

        var data = {
          page: this.currentPage,
          pageSize: this.pageSize,
          startDate: (this.select_time == null ? '' : this.select_time[0]),
          endDate: (this.select_time == null ? '' : this.select_time[1]),
          courseName: this.selectname,
          courseCode: this.selectcode,
          userName: this.teacher_name,
          classType: this.select_radio2 == '行政班' ? 0 : 1,
          classId: (this.select_radio2 == '行政班' ? (this.select_class[2] == undefined ? '' : this.select_class[2]) :
            this.select_class2),
          isAnalysis: this.isAnalysis,
          isLess:(this.isLess==='')?null:this.isLess
        };

        this.axios.post(findAttendanceForLesson, data)
          .then(function(response) {
            console.log(response)
            // if(response.data.result.list.length>0){
              that.less_list = response.data.result.list
              that.minAttendanceRate=response.data.minAttendanceRate;
              var temp= [
                {
                  value: '',
                  label: '全部'
                },
                {
                  value: 0,
                  label: '到勤率小于'+ response.data.minAttendanceRate+'%'
                },
                {
                  value: 1,
                  label: '到勤率大于等于'+ response.data.minAttendanceRate+'%'
                }
              ]
              that.minAttendanceRate_options = temp;
              that.currentTotal = response.data.result.total
              that.$emit('setcurrentTotal',response.data.result.total)
            // }else{
            //
            // }
          })
          .catch(function(error) {
            console.log(error)
          })
      },




      // 查询表格
      findAnalysisGByUser2() {
        var that = this;
        this.currentPage=1;
        var data = {
          page: this.currentPage,
          pageSize: this.pageSize,
          startDate: (this.select_time == null ? '' : this.select_time[0]),
          endDate: (this.select_time == null ? '' : this.select_time[1]),
          courseName: this.selectname,
          courseCode: this.selectcode,
          userName: this.teacher_name,
          classType: this.select_radio2 == '行政班' ? 0 : 1,
          classId: (this.select_radio2 == '行政班' ? (this.select_class[2] == undefined ? '' : this.select_class[2]) :
            this.select_class2),
          isAnalysis: this.isAnalysis,
          isLess:(this.isLess==='')?null:this.isLess
        };

        this.axios.post(findAttendanceForLesson, data)
          .then(function(response) {
            console.log(response)
            // if(response.data.result.list.length>0){
              that.less_list = response.data.result.list
              // that.minAttendanceRate=response.data.minAttendanceRate;
              // var temp= [
              //   {
              //     value: '',
              //     label: '全部'
              //   },
              //   {
              //     value: 0,
              //     label: '到勤率小于'+ response.data.minAttendanceRate+'%'
              //   },
              //   {
              //     value: 1,
              //     label: '到勤率大于'+ response.data.minAttendanceRate+'%'
              //   }
              // ]
              // that.minAttendanceRate_options = temp;
              that.currentTotal = response.data.result.total
              that.$emit('setcurrentTotal',response.data.result.total)
            // }else{
            //
            // }
          })
          .catch(function(error) {
            console.log(error)
          })
      },






      // 查询所有学期
      findTermsLists() {
        var that = this;
        this.axios({
            method: 'get',
            url: findTermsLists
          })
          .then(function(res) {
            if (res.data.termList.length > 0) {
              var arr = that.pickerOptions.shortcuts;
              // 获取学期后给 选择日期的组件 选择学期使用
              for (let i in res.data.termList) {
                var mydata = {
                  text: res.data.termList[i].termName,
                  onClick(picker) {
                    picker.$emit('pick', [res.data.termList[i].startTime.split(/\s+/)[0], res.data.termList[i].endTime
                      .split(/\s+/)[0]
                    ]);
                  }
                }
                arr.push(mydata)
              }
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },


      //联级选择器触发事件
      handleChange(value) {
        console.log(value);
      },

      // 教学班行政班选择
      select_radio_class(e) {
        if (e == "教学班") {
          this.select_class = [];
          this.findClassesByType();
        } else {
          console.log(this.select_class2)
          this.select_class2 = "";
        }
      },

      select_radio1(e) {
        this.placeholder = '请输入' + e;
        console.log(e);
        if (e == "课程名称") {
          this.selectcode = ""
        } else {
          this.selectname = ""
        }
        // this.updataoptions(this.course_data);
      },

      //查询所以的课名以及课的代码
      findAllCourses() {
        var that = this;
        this.axios({
            method: 'get',
            url: findAllCourses
          })
          .then(function(res) {
            if (res.data.courseLists != null) {
              that.course_data = res.data.courseLists;
              that.updataoptions(res.data.courseLists);
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },


      //整理班级与班级代码数据
      updataoptions(res) {
        var options = new Array();
        var options2 = new Array();
        // if (this.select_radio == "课程名称") {
          for (var i = 0; i < res.length; i++) {
            options.push({
              value: res[i].courseName,
              label: res[i].courseName
            });
            options2.push({
              value: res[i].courseNo,
              label: res[i].courseNo+'('+res[i].courseName+')'
            });
          }
          this.course_list = options;
        // } else {
          // for (var i = 0; i < res.length; i++) {
          //   options.push({
          //     value: res[i].courseNo,
          //     label: res[i].courseNo
          //   });
          // }
          this.code_list = options2;

        // }

      },



      //查慕课学院与专业接口
      findCollegeAndMajor() {
        var that = this;
        this.axios({
            method: 'get',
            url: findCollegeAndMajor
          })
          .then(function(res) {
            //先查询学院与专业 然后拼接数据
            //console.log(res);
            if (res.data != null) {
              that.class_list = res.data;
              that.findClassesByType(); //查班级列表
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },

      //根据classesType查询所有班级  0行政班 1教学班
      findClassesByType() {
        var that = this;
        var classesType = 0;
        if (this.select_radio2 == "教学班") {
          //如果已经加载数据就直接对结果集进行 避免请求频繁
          if (this.class_collection.length > 0) {
            this.jiaoxuedatasorting(this.class_collection);
            return;
          }
          classesType = 1;
        }
        this.axios.post(findClassesByType, {
            classesType: classesType,
          })
          .then(function(response) {
            //console.log(response);
            if (response.data.result != null) {
              if (classesType == 0) {
                //行政部整理后端数据
                that.xingzhendatasorting(response.data.result);
              } else {
                //教学班整理后端数据
                that.class_collection = response.data.result;
                that.jiaoxuedatasorting(response.data.result);
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },

      //行政班下拉框数据整理
      xingzhendatasorting(res) {
        var options = new Array();
        var list = this.class_list;
        for (var i = 0; i < list.length; i++) {
          options.push({
            value: list[i].collegeId,
            label: list[i].collegeName,
            children: []
          });
          if (list[i].majorList.length > 0) {
            for (var j = 0; j < list[i].majorList.length; j++) {
              options[i].children.push({
                value: list[i].majorList[j].majorId,
                label: list[i].majorList[j].majorName,
                children: []
              })
              if (res.length > 0) {
                for (var k = 0; k < res.length; k++) {

                  if (res[k].majorId == list[i].majorList[j].majorId) {
                    options[i].children[j].children.push({
                      value: res[k].classesId,
                      label: res[k].classesName,
                    })
                  }

                }
              }
            }
          }


        }
        this.myclass = options;
      },

      //教学班下拉框数据整理
      jiaoxuedatasorting(res) {
        var options = new Array();
        res.forEach((item, index) => {
          options.push({
            value: item.classesId,
            label: item.classesName
          });
        })
        this.class_options = options;
      }



    }
  }
</script>

<style>
</style>

<template>
	<div class="app">
		<Ghead></Ghead>
		<transition name="fade">
			<router-view></router-view>
		</transition>

		<div class="div1">
			<span class="span1" :style="selecttitle==1 ?'color:#459CFC;':''" @click="updatetitle(1)">{{title1}}</span>
			<span class="span2" :style="selecttitle==2 ?'color:#459CFC;':''" @click="updatetitle(2)">{{title2}}</span>

			<el-popover
			  placement="bottom"
			  width="160"
			  v-model="visible">
			  <p>您确定导出{{currentTotal}}条考勤记录吗？</p>
			  <div style="text-align: right; margin: 0">
				<el-button size="mini" type="text" @click="visible = false">取消</el-button>
				<el-button type="primary" size="mini" @click="exportReport" >确定</el-button>
			  </div>
			 <!-- <el-button slot="reference">删除</el-button> -->
			  <el-button type="primary" slot="reference"  class="daochu" >导出</el-button>
			</el-popover>


			<!-- <el-tooltip class="item" effect="dark" :content="'导出'+currentTotal+'条记录'" placement="left-end"> -->
				<!-- <el-button type="primary"  class="daochu" >导出</el-button> -->
			<!-- </el-tooltip> -->

		</div>
		<div class="div2">
			<div class="div3" >
				<div style="margin-top: 20px;margin-right: 50px;">
					<span class="span3">日期：</span>
					<el-date-picker v-model="timeselectvalue" style="float: left;" type="daterange" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期" size="small" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
					</el-date-picker>
				</div>

				<div style="margin-right: 50px;margin-top: 20px;">
					<el-radio-group v-model="radio1" size="small" style="float: left; margin-left: 20px;" @change="select_radio1">
						<el-radio-button label="课程名称"></el-radio-button>
						<el-radio-button label="课程代码"></el-radio-button>
					</el-radio-group>

					<el-select v-show="radio1=='课程名称'" clearable v-model="selectname" filterable :placeholder="placeholder" size="small"
					 :popper-class="'selectsss'" style="float:left; margin-left: 20px;">
						<el-option v-for="item in course_list" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select v-show="radio1!='课程名称'" clearable v-model="selectcode" filterable :placeholder="placeholder" size="small"
					 :popper-class="'selectsss'" style="float:left; margin-left: 20px;">
						<el-option v-for="item in code_list" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>

				<div style="margin-right: 50px;margin-top: 20px;">
					<span class="span3" style="float: left;margin-left: 20px;">教师名：</span>
					<el-input style="margin-left: 20px;width:200px;" placeholder="请输入教师名" suffix-icon="el-icon-search" size="small" :disabled="input_teacher"
					 v-model="teacher_name">
					</el-input>
				</div>

				<div style="margin-right: 50px;margin-top: 20px;">
					<span class="span3" style="float: left;">上课班级：</span>
					<el-radio-group v-model="select_radio2" size="small" style="float: left;" @change="select_radio">
						<el-radio-button label="行政班"></el-radio-button>
						<el-radio-button label="教学班"></el-radio-button>
					</el-radio-group>

					<el-cascader v-show="select_radio2=='行政班'" v-model="select_class" :props="{ checkStrictly: true }" placeholder="请选择" :options="myclass" @change="handleChange"
					 size="small" filterable clearable  style="float: left;margin-left: 20px;height: 32px !important;">
					</el-cascader>

					<el-select v-show="select_radio2!='行政班'" v-model="select_class2" size="small" filterable placeholder="请选择"
					 :popper-class="'selectsss2'" style="float: left;margin-left: 20px; ">
						<el-option v-for="item in class_options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>

				<div style="margin-top: 20px;">
					<el-radio-group v-model="select_radio3" size="small" style="float:left;" @change="selectradio3" :disabled="input_student">
						<el-radio-button label="学生姓名"></el-radio-button>
						<el-radio-button label="学生学号"></el-radio-button>
					</el-radio-group>

					<el-input v-if="select_radio3=='学生姓名'" clearable style="float: left; margin-left: 20px;width:200px;" :placeholder="placeholder2"
					 suffix-icon="el-icon-search" size="small" v-model="student_name" :disabled="input_student">
					</el-input>

					<el-input v-if="select_radio3!='学生姓名'" clearable style="float: left;margin-left: 20px;width:200px;" :placeholder="placeholder2"
					 suffix-icon="el-icon-search" size="small" v-model="student_id" :disabled="input_student">
					</el-input>
					<el-button @click="findAnalysisGByUser" type="primary" size="small" icon="el-icon-search" style="margin-left:95px">查询</el-button>
				</div>

			</div>
		</div>
		<div class="div2">
			<!-- :row-class-name="rowClassName"  给列表设置index的   可以通过ref="refTable" 打开关闭子列表-->
			<el-table :data="form_list" ref="refTable" :row-class-name="rowClassName" style="width: 100%;" border
			 :header-cell-style="{background:'#d5dfeb',color:'#606266',textAlign:'center'}" :cell-style="{'text-align': 'center'}"
			 @row-click="call_click" @expand-change="expandchange">
				<el-table-column type="expand" prop="rowlist">
					<template slot-scope="scope">
						<el-table :data="scope.row.rowlist" style="width: 100%" border :header-cell-style="{background:'#f2f2f2',color:'#606266',textAlign:'center',padding:'0px'}"
						 :cell-style="{'text-align': 'center'}">
							<el-table-column type="index" :index="indexMethod" label="序号">
							</el-table-column>
							<el-table-column prop="lessonName" label="章节名称" width="480">
							</el-table-column>
							<el-table-column prop="teacherName" label="授课老师" width="120">
							</el-table-column>
							<el-table-column prop="brainRoomName" label="教室" >
							</el-table-column>
							<el-table-column prop="week" label="星期" width="120">
							</el-table-column>
							<el-table-column prop="startTime" label="上课时间">
							</el-table-column>
							<el-table-column prop="isArrival" label="到勤状态" width="120">
								<template slot-scope="scope">
									<el-button v-if="scope.row.isArrival=='缺勤'" style="color: red;" type="text" >缺勤</el-button>
									<el-button v-if="scope.row.isArrival!='缺勤'" style="color: green;" type="text" >到勤</el-button>

								  </template>
							</el-table-column>
							<el-table-column v-if="roleType!=3" label="操作" width="120">
								<template slot-scope="scope">
									<el-button size="mini" type="danger" @click="updateUserAttendance(scope.$index, scope.row,$event)">{{scope.row.isArrival=='缺勤'?'补签':'取消签到'}}</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-table-column>
				<el-table-column label="学生姓名" prop="userName" width="120">
				</el-table-column>
				<el-table-column label="学号" prop="userCode" width="180">
				</el-table-column>
				<el-table-column label="院系" prop="collegeName" width="180">
				</el-table-column>
				<el-table-column label="专业" prop="majorName" width="120">
				</el-table-column>
				<el-table-column label="班级" prop="className" >
				</el-table-column>
				<el-table-column label="课程名" prop="courseName" >
				</el-table-column>
				<el-table-column label="课程代码" prop="courseCode">
				</el-table-column>
				<el-table-column label="授课老师" prop="teacherName" >
				</el-table-column>
				<el-table-column label="安排班次数" prop="total" width="120">
				</el-table-column>
				<el-table-column label="实际到勤次数" prop="actual" width="120">
				</el-table-column>
				<el-table-column label="缺勤次数" prop="absence" width="120">
				</el-table-column>
			</el-table>
		</div>
		<div class="div2" style="text-align: center;margin-top: 30px;margin-bottom: 60px;">
			<el-pagination background :prev-text="'上一页'" :next-text="'下一页'" :popper-class="'pagination1'" @size-change="handleSizeChange"
			 @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize"
			 layout="prev, pager, next, jumper,sizes,total" :total="currentTotal">
			</el-pagination>
		</div>
    <Gfoot style="position: fixed;bottom: 0px;" ></Gfoot>
	</div>

</template>

<script>
	import store from '@/store/index.js'
	import Ghead from '@/components/common/header'
	import Gfoot from '@/components/common/footer'
	import $ from 'jquery'
	import {
		title1,
		title2,
		Export,
		findAllCourses,
		findCollegeAndMajor,
		findClassesByType,
		findAnalysisGByUser,
		findAnalysisDetail,
		updateUserAttendance,
		exportReport
	} from '@/module/admin/config/statisticsinfo'


	function getCookie(cname) {
		if (document.cookie.length > 0) {
			let cstart = document.cookie.indexOf(cname + '=')
			if (cstart !== -1) {
				cstart = cstart + cname.length + 1
				let cend = document.cookie.indexOf(';', cstart)
				if (cend === -1) {
					cend = document.cookie.length
				}
				return unescape(document.cookie.substring(cstart, cend))
			}
		}
		return ''
	}

	//测试数据用
	  // var cookieData = "{\"code\":\"admin\",\"gender\":1,\"lastupdatedate\":1552358508000,\"telephone\":\"  \",\"roleType\":-1,\"userName\":\"admin\",\"picture\":\"http://172.16.178.43:5000/images/thumbnail/118d4c4e370c47f09d45d78da59b30bb.png\",\"organizationId\":\"729e25774e90465eb570490a51747f30\",\"number\":\"admin\",\"realName\":\"   \",\"password\":\"21232f297a57a5a743894a0e4a801fc3\",\"averageAttendanceRate\":0.0,\"phone\":\"\",\"organization\":\"729e25774e90465eb570490a51747f30\",\"id\":\"04ba1f28be7b4b599e564b9ee921cc9a\",\"isdelete\":0,\"email\":\"\"}"
	  // document.cookie = 'currentUser= ' + cookieData

	export default {
		name: 'AJstatistics',
		data() {
			return {
				currentPage: 1, //当前第几页
				pageSize: 10, //每页多少条
				currentTotal: 0, //总数据
				visible:false,  //控制显示
				title1: title1,
				title2: title2,
				Export: Export,
				value: '',
				selecttitle: 2, //设置选择默认是1
				timeselectvalue: [], //
				radio1: '课程名称',
				coursetitle: '', //课程名称选择的值
				selectname: '', //选择的课程名称
				selectcode: '', //课程代码
				teacher_name: '', //老师名字
				student_id: '', //学生名称
				select_radio2: '行政班',
				select_class2: '', //单选班级
				select_class: [],
				select_radio3: '学生姓名', //学生查看选择
				placeholder: '请输入课程名称',
				placeholder2: '请输入学生姓名',
				course_list: [], //课程下拉框集合
        code_list:[],
				course_data: [], //所有课程集合 复用
				class_list: [], //学院与专业集合
				class_collection: [], //班级集合 复用
				class_options: [], //教学班下拉框
				student_name: '', //学生名字
				student_id: '', //学生ID
				form_list: [], //表格数据集合
				myclass: [], //学院 专业 班级 下拉框集合
				roleType:3, //权限
				input_teacher:false,	//教师名搜索框禁用状态
				input_student:false,   //学生名输入框禁用状态
			}
		},
		created() {
			//创建vue完成后事件
			this.init();
			this.findAnalysisGByUser();
			this.findAllCourses(); //查询所以的课名以及课的代码
			this.findCollegeAndMajor(); //查慕课学院与专业接口

		},
		components: {
			Ghead,
			Gfoot,
		},
		methods: {

      updatetitle(e){
        if(e==1){
          this.$router.push({'name': 'AJdiligence'})
         }
      },

			//roleType  -1管理员，2 教师，3 学生
			init(){
			  // var currentUser = $.parseJSON(getCookie('currentUser'));
			  //var cookieval = getCookie('currentUser');
			  //let currentUser = JSON.parse((cookieval.replace(/\s/g, '').replace(/\\/gi, '')));
			  var currentUser =this.$store.state.userinfo

			  if(currentUser.roleType!=undefined){
				  this.roleType=currentUser.roleType;
				  if(currentUser.roleType==-1){

				  }else if(currentUser.roleType==2){
            this.teacher_name=currentUser.realName;
            this.input_teacher=true
				  }else if(currentUser.roleType==3){
            this.student_name=currentUser.realName;
            this.input_student=true
				  }else{
					  console.log("加载角色权限出现问题");
					  console.log(currentUser);
					   //出现问题锁死操作栏
					  this.roleType=3;
					 //  this.$alert('加载角色权限出现问题,系统将退出!', '提示', {
						//   confirmButtonText: '确定',
						//   showClose:false,
						//   callback: action => {
						// 	window.location.href = '/base/logout'
						//   }
						// });

				  }
			  }else{
				  console.log("加载角色权限出现问题");
				  console.log(currentUser);
				  //出现问题锁死操作栏
				  this.roleType=3;
			  }


			},

			//导出报表
			exportReport() {
				this.visible = false;
				if(this.currentTotal>0){
					var obj = {
						page: this.currentPage,
						pageSize: this.pageSize,
						startDate: (this.timeselectvalue[0] == undefined ? '' : this.timeselectvalue[0]),
						endDate: (this.timeselectvalue[1] == undefined ? '' : this.timeselectvalue[1]),
						courseName: this.selectname,
						courseCode: this.selectcode,
						teacherName: this.teacher_name,
						userName: this.student_name,
						userCode: this.student_id,
						collegeId: (this.select_class[0] == undefined ? '' : this.select_class[0]),
						majorId: (this.select_class[1] == undefined ? '' : this.select_class[1]),
						classId: (this.select_class[2] == undefined ? this.select_class2 : this.select_class[2]),
					}
					this.axios({
						method: 'get',
						url: exportReport,
						params:obj,
						responseType: 'blob',
					}).then((res) => {
						const fileName = '考勤统计';
						const blob = new Blob([res.data], {
							type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
						});
						const link = document.createElement('a');
						link.href = window.URL.createObjectURL(blob);
						link.download = fileName + '.xls';
						link.click();
					})

				}else{

				}

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


			//测试数据用
			search() {
				var data = {
					page: this.currentPage,
					pageSize: this.pageSize,
					startDate: (this.timeselectvalue== null ? '' : this.timeselectvalue[0]),
					endDate: (this.timeselectvalue== null ? '' : this.timeselectvalue[1]),
					courseName: this.selectname,
					courseCode: this.selectcode,
					teacherName: this.teacher_name,
					userName: this.student_name,
					userCode: this.student_id,
					collegeId: (this.select_class[0] == undefined ? '' : this.select_class[0]),
					majorId: (this.select_class[1] == undefined ? '' : this.select_class[1]),
					classId: (this.select_class[2] == undefined ? this.select_class2 : this.select_class[2]),
				};
				console.log(data)
			},

			//修改考勤状态
			updateUserAttendance(index, row, event) {
				if (event.target.innerHTML == "补签") {
					this.axios.post(updateUserAttendance, {
							id: row.id,
							isArrival: 1
						})
						.then(function(response) {
							if (response.data.code == 200) {
								row.isArrival = "已到勤";
								event.target.innerHTML = "取消签到"
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				} else {
					this.axios.post(updateUserAttendance, {
							id: row.id,
							isArrival: 0
						})
						.then(function(response) {
							if (response.data.code == 200) {
								row.isArrival = "缺勤";
								event.target.innerHTML = "补签"
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				}
			},


			//联级选择器触发事件
			handleChange(value) {
				console.log(value);
			},

			select_radio(e) {
				if (e == "教学班") {
					this.select_class = [];
					this.findClassesByType();
				} else {
					console.log(this.select_class2)
					this.select_class2 = "";
				}
			},

			call_click(row, event, column) {
				//点击展开下面
				this.$refs.refTable.toggleRowExpansion(row)
				// console.log(row);
				// console.log(event);
				// console.log(column);

			},

			expandchange(row, expandedRows) {
				// console.log(row);
				// console.log(expandedRows);
				if (expandedRows.length == 0) {
					return;
				}
				var that = this;
				this.axios.post(findAnalysisDetail, {
						userCode: row.userCode,
						teacherCode: row.teacherCode,
						courseCode: row.courseCode
					})
					.then(function(response) {

						if (response.data.result.length > 0) {
							console.log(response);
							response.data.result.forEach((item, index) => {
								if (item.isArrival == 0) {
									item.isArrival = "缺勤"
								} else {
									item.isArrival = "已到勤"
								}
								if (item.week == 0) {
									item.week = "7"
								}
								// if (item.week == 6) {
								// 	item.week = "周六"
								// }
							})

							that.form_list[row.index].rowlist = response.data.result;
						}

					})
					.catch(function(error) {
						console.log(error);
					});
			},

			//给列表设置index
			rowClassName({
				row,
				rowIndex
			}) {
				row.index = rowIndex;
			},

			//给子列表设置ID
			indexMethod(index) {
				return index + 1;
			},

			select_radio1(e) {
				this.placeholder = '请输入' + e;

				console.log(e);
				// if (e == "课程名称") {
				// 	this.selectcode = ""
				// } else {
				// 	this.selectname = ""
				// }
				// this.updataoptions(this.course_data);
			},


			selectradio3(e) {
				this.placeholder2 = '请输入' + e;
				if (e == "学生姓名") {
					this.student_id = '';
				} else {
					this.student_name = '';
				}
			},

			//查询表格
			findAnalysisGByUser() {
				var that = this;
				this.axios.post(findAnalysisGByUser, {
						page: this.currentPage,
						pageSize: this.pageSize,
						startDate: (this.timeselectvalue== null ? '' : this.timeselectvalue[0]),
						endDate: (this.timeselectvalue== null ? '' : this.timeselectvalue[1]),
						courseName: this.selectname,
						courseCode: this.selectcode,
						teacherName: this.teacher_name,
						userName: this.student_name,
						userCode: this.student_id,
						collegeId: (this.select_class[0] == undefined ? '' : this.select_class[0]),
						majorId: (this.select_class[1] == undefined ? '' : this.select_class[1]),
						classId: (this.select_class[2] == undefined ? this.select_class2 : this.select_class[2]),
					})
					.then(function(response) {
						console.log(response);
						//给每个元素一个 空集合 免得下面赋值的时候 会有延迟
						response.data.result.list.forEach((item, index) => {
							item.rowlist = [];
						})
						that.form_list = response.data.result.list;
						that.currentTotal = response.data.result.total;
					})
					.catch(function(error) {
						console.log(error);
					});
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

			//整理班级与班级代码数据
			updataoptions(res) {
				var options = new Array();
        var options2 = new Array();
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
					this.code_list = options2;

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

		},


		//导航守卫
		watch: {
			'$route'(to, from) {

			}
		}
	}
</script>

<style>
	@import url("../../../../static/css/admin/statistics.css");
</style>

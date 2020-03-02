<template>
  <div class="app">
    <Ghead></Ghead>
   <!-- <div class="center centerbottom50">
    	<div class="centers">
    		<div class="center" style="margin: 0 auto;">
    		<el-tabs v-model="activeName" @tab-click="handleClick" style="float: le;">
					<el-tab-pane label="集控教室" name="jikong">
					</el-tab-pane>
						<el-tab-pane label="智慧教室" name="zhihui">
						</el-tab-pane>
					</el-tabs>
    		</div>
    	</div>
    </div>
	 <div style="width: 100%;float: left;overflow: hidden;">

							<keep-alive v-if="$route.meta.keepAlive">
							 	<router-view></router-view>
							 </keep-alive>
							 <keep-alive v-if="!$route.meta.keepAlive">
							 	<router-view></router-view>
							 </keep-alive>
	</div> -->

  <div v-if="seedetail_status">
    <div style="width: 100%;background-color: #ffffff;height: 60px;display:flex;align-items: center;justify-content: space-between;">
      <span style="font-size: 18px;font-weight: 600;color: rgb(69, 156, 252);margin-left: 50px;">在线巡课</span>
      <!-- <el-switch style="margin-right:50px;"
        v-model="view"
        active-text="表格视图"
        inactive-text="图表视图">
      </el-switch> -->

      <el-tooltip :value="true" content="点击可以切换视图" placement="bottom-end" effect="light">
        <el-radio-group v-model="view" style="margin-right:150px;" @change="viewChange">
           <el-radio-button label="表格"> </el-radio-button>
           <el-radio-button label="图表"></el-radio-button>
         </el-radio-group>
      </el-tooltip>

    </div>

    <div style="float: left; width: calc(100% - 100px);height: 1px;background-color: #f4f4f4;margin-bottom: 20px;margin-left: 50px;"></div>

    <!-- 按区域 -->
    <div style="float: left; width: 400px;height: 50px;">
      <span style="float: left;font-size: 14px;margin-left: 50px;line-height: 50px;">区域:</span>
      <el-cascader style="float: left;margin-left: 10px;margin-top: 9px;" v-model="select_Sbuilding" :placeholder="'全部'"
        clearable :props="{ checkStrictly: true,expandTrigger: 'hover' }" filterable :options="Sbuilding_options"
        @change="quyu_Change">
      </el-cascader>
    </div>

    <!-- 正在上课 -->
    <div style="float: left; width: 400px;height: 50px;">
      <span style="float: left;font-size: 14px;margin-left: 50px;line-height: 50px;">正在上课:</span>
      <el-switch style="float: left;margin-top: 15px;margin-left: 10px;" v-model="class_status" @change="swith_change">
      </el-switch>
      <span style="float: left;font-size: 14px;line-height: 50px;margin-left: 10px;">{{class_status?'是':'否' }}</span>
    </div>

    <!-- 按学院 -->
    <div v-show="class_status" style="float: left; width: 400px;height: 50px;">
      <span style="float: left;font-size: 14px;margin-left: 50px;line-height: 50px;">学院:</span>
      <el-select clearable v-model="select_college" filterable placeholder="请选择学院" size="small" :popper-class="'el_selects_css'"
        style="float:left; margin-left: 20px;margin-top: 9px;">
        <el-option v-for="item in college" :key="item.value" :label="item.txt" :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!-- 按教师 -->
    <div v-show="class_status" style="float: left; width: 400px;height: 50px;">
      <span style="float: left;font-size: 14px;margin-left: 50px;line-height: 50px;">教师:</span>
      <el-select clearable v-model="select_teacher" filterable placeholder="请选择教师" size="small" :popper-class="'el_selects_css'"
        style="float:left; margin-left: 20px;margin-top: 9px;">
        <el-option v-for="item in selectItemlist" :key="item.value" :label="item.txt" :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!-- 按状态 -->
    <div v-if="view=='表格'" style="float: left; width: 550px;height: 50px;">
      <span style="float: left;font-size: 14px;margin-left: 50px;line-height: 50px;">状态:</span>
      <el-select v-model="select_Recording" multiple placeholder="请选择状态" popper-class="el_selects_css" style="float: left; margin-left: 20px;width:400px;margin-top: 9px;">
        <el-option v-for="item in Recording_suatus" :key="item.value" :label="item.txt" :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!-- 是否录制 -->
    <!-- <div style="float: left; width: 300px;height: 50px;">
        <span style="float: left;font-size: 14px;margin-left: 50px;line-height: 50px;">是否录制:</span>
        <div style="float: left;display: flex;align-items: center;height: 100%;margin-left: 20px;">
          <el-radio v-model="select_radio" label="1" >全部</el-radio>
          <el-radio v-model="select_radio" label="2" >录制</el-radio>
        </div>
      </div> -->

    <!-- 是否录制 -->
    <div style="float: left; width: 100px;height: 50px;margin-left: 50px;">
      <el-button v-show="view=='表格'" type="primary" @click="search(1)" style="float: left;margin-top: 9px;" icon="el-icon-search">查询</el-button>
      <el-button v-show="view=='图表'" type="primary" @click="tubiao_sousuo()" style="float: left;margin-top: 9px;" icon="el-icon-search">查询</el-button>
    </div>

    <div style="float: left; width: calc(100% - 100px);height: 1px;background-color: #f4f4f4;margin-left: 50px;margin-top: 20px;"></div>

    <div v-if="view=='表格'">
      <div style="float: left; width: 100%;height: 60px;display: flex;align-items: center;">
        <span style="width:15px;height: 15px;background-color: #000000;margin-left: 50px;"></span>
        <span style="margin-left: 10px;">暂无课程</span>

        <span style="width:15px;height: 15px;background-color: #17c295;margin-left: 25px;"></span>
        <span style="margin-left: 10px;">正常-到勤率大于等于{{minAttendanceRate}}%</span>

        <span style="width:15px;height: 15px;background-color: #ff6c5b;margin-left: 25px;"></span>
        <span style="margin-left: 10px;">异常-到勤率小于{{minAttendanceRate}}%</span>

        <span style="width:15px;height: 15px;background-color: #81d3f8;margin-left: 25px;"></span>
        <span style="margin-left: 10px;">等待分析</span>

        <span style="width:15px;height: 15px;background-color: #f8d436;margin-left: 25px;"></span>
        <span style="margin-left: 10px;">数据缺失</span>

        <span style="font-size: 14px;color: red;margin-left: 30px;">(页面数据每60秒更新一次)</span>
      </div>

      <div style="float: left; width: calc(100% - 100px);margin-left: 50px;">
        <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)" @row-click="table_dblclick" :data="data_list" border style="width: 100%;"
          :header-cell-style="{background:'#d5dfeb',color:'#606266',textAlign:'center'}" :cell-style="{'text-align': 'center'}" :row-class-name="tableRowClassName">
          <!-- <el-table-column type="index" label="#" :index="indexMethod"> -->
          </el-table-column>
          <el-table-column prop="buildingName" label="教学楼" sortable></el-table-column>
          <el-table-column prop="classroom.classroomName" label="教室" sortable></el-table-column>
          <el-table-column prop="classroom.isAnalysis" label="教室类型" sortable>
            <template slot-scope="scope">

              <span v-if="scope.row.classroom.isAnalysis==0" style="color: #000000;">云录播教室</span>
              <span v-if="scope.row.classroom.isAnalysis==2" style="color: #000000;">单机智慧教室</span>
            </template>
          </el-table-column>
          <el-table-column prop="lesson.courseName" label="课程名" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.lesson==null" style="color: #000000;">--</span>
              <span v-else style="color: #000000;">{{scope.row.lesson.courseName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="courseCode" label="课程代码" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.lesson==null" style="color: #000000;">--</span>
              <span v-else style="color: #000000;">{{scope.row.courseCode}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lesson.lessonName" label="章节" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.lesson==null" style="color: #000000;">--</span>
              <span v-else style="color: #000000;">{{scope.row.lesson.lessonName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="teacher.realName" label="授课老师" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.teacher==null" style="color: #000000;">--</span>
              <span v-else style="color: #000000;">{{scope.row.teacher.realName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="className" label="上课班级" sortable>

          </el-table-column>
          <el-table-column prop="lesson.studentsInPlan" label="应到" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.lesson==null" style="color: #000000;">--</span>
              <span v-else style="color: #000000;">{{scope.row.lesson.studentsInPlan}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="studentsArrivals" label="实到" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.lesson==null" style="color: #000000;">--</span>
              <span v-else style="color: #000000;">{{scope.row.lesson.studentsArrivals==null?'0':scope.row.lesson.studentsArrivals}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="attendanceRate" label="到勤率" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.lesson==null" style="color: #000000;">--</span>
              <span v-else style="color: #000000;">{{scope.row.lesson.attendanceRate==null?'0':scope.row.lesson.attendanceRate}}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="到勤状态" class-name="test1" sortable>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type===-1" color="#f8d436" style="color: #ffffff;">数据缺失</el-tag>
              <el-tag v-if="scope.row.type===0" color="#81d3f8" style="color: #ffffff;">等待分析</el-tag>
              <el-tag v-if="scope.row.type===1" color="#17c295" style="color: #ffffff;">正常</el-tag>
              <el-tag v-if="scope.row.type===2" color="#ff6c5b" style="color: #ffffff;">异常</el-tag>
              <el-tag v-if="scope.row.type===3" color="#000000" style="color: #ffffff;">暂无课程</el-tag>
              <!-- <span v-if="scope.row.type===-1" style="color: #000000;" >异常</span>
              <span v-if="scope.row.type===0"  style="color: #000000;" >数据缺失</span>
              <span v-if="scope.row.type===1"  style="color: #000000;" >正常</span>
              <span v-if="scope.row.type===2"  style="color: #000000;" >异常</span> -->
              <!-- <span v-if="scope.row.type===3"  style="color: #000000;" >暂无课程</span> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="float: right;text-align: center;width: 100%;margin-bottom: 60px;margin-top: 30px;">
        <el-pagination background :prev-text="'上一页'" :next-text="'下一页'" :popper-class="'pagination1'" @current-change="fenye"
          :current-page.sync="pageindex" :page-sizes="[5,10,15,30,50]" :page-size="pagesize" @size-change="handleSizeChange"
          layout="prev, pager, next, jumper,sizes,total" :total="totalnum">
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <div style="float: left; width: calc(70% - 100px);margin-left: 22%; height: 60px;display: flex;align-items: center;">

          <span style="font-size: 14px;line-height: 50px;">自动巡课:</span>
          <el-switch style="margin-left: 10px;" v-model="xunke_status" @change="xunke_change">
          </el-switch>
          <!-- <span style="font-size: 14px;line-height: 50px;margin-left: 10px;">{{xunke_status?'是':'否' }}</span> -->
          <span v-show="xunke_status" style="font-size: 14px;line-height: 50px;margin-left: 20px;">间隔:</span>
          <el-input-number v-show="xunke_status" :min="15" controls-position="right" @change="time_handleChange" style="margin-left: 10px;width: 100px;" size="small" v-model="time_num"></el-input-number>
          <span v-show="xunke_status" style="font-size: 14px;line-height: 50px;margin-left: 10px;">秒</span>

          <span style="float: left;font-size: 14px;margin-left: 50px;line-height: 50px;">默认通道:</span>
          <el-select v-model="select_tongdao" filterable placeholder="请选择通道" size="small" :popper-class="'el_selects_css'" @change="tongdao_change"
            style="float:left; margin-left: 20px;">
            <el-option v-for="item in xunke_options" :key="item.value" :label="item.txt" :value="item.value">
            </el-option>
          </el-select>

          <span style="float: left;font-size: 14px;margin-left: 50px;">分屏模式:</span>
          <div style="float: left;display: flex;align-items: center;height: 100%;margin-left: 20px;margin-top: 5px;">
          <el-radio-group v-model="select_fenpin" @change="radio_change">
            <el-radio :label="4" >4</el-radio>
            <el-radio :label="9" >9</el-radio>
          </el-radio-group>
          </div>
      </div>

      <div style="float: left; width: 100%;height: auto;">
        <List ref="ckplay" @seedetail="seedetail" :classroomid="classroomid" :channelnum="parseInt(select_fenpin)" :title="title" :info='info' :channel="channel" :screens="screens"></List>

        <div style="text-align: center;width: 100%;margin-bottom: 60px;margin-top: 30px;">
          <el-pagination background :prev-text="'上一页'" :next-text="'下一页'" :popper-class="'pagination1'" @current-change="zhengli"
            :current-page.sync="tubiao_pageindex" :page-size="select_fenpin"
            layout="prev, pager, next, jumper,total" :total="tubiao_totalnum">
          </el-pagination>
        </div>
      </div>
    </div>


    </div>
    <div v-else>
       <div style="float: left; width: 70%;height: 30px;margin-left: 16%;margin-top: 30px;">
         <span style="font-size: 16px;line-height: 30px;margin-left: 50px;">教学楼：</span>
         <span style="font-size: 16px;line-height: 30px;">{{roomInfo.buildingName}}</span>
         <span style="font-size: 16px;line-height: 30px;margin-left: 50px;">教室：</span>
         <span style="font-size: 16px;line-height: 30px;">{{roomInfo.classroomName}}</span>
         <img src="../../../../static/images/guanbi.png" @click="close_detail" style="float: right; width: 50px;height: 50px;"/>
       </div>
       <div style="float: left; width: 70%;height: 30px;margin-left: 16%;">
         <span style="font-size: 16px;line-height: 30px;margin-left: 50px;">老师：</span>
         <span style="font-size: 16px;line-height: 30px;">{{roomInfo.haveLesson ? roomInfo.teacherName :'未上课'}}</span>
         <span style="font-size: 16px;line-height: 30px;margin-left: 50px;">课程：</span>
         <span style="font-size: 16px;line-height: 30px;">{{roomInfo.courseName? roomInfo.courseName:'未上课'}}</span>
         <span style="font-size: 16px;line-height: 30px;margin-left: 50px;">上课班级：</span>
         <span style="font-size: 16px;line-height: 30px;">{{roomInfo.classesName? roomInfo.classesName:'未上课'}}</span>
       </div>
       <div style="float: left; width: 70%;height: 30px;margin-left: 16%;">
         <span style="font-size: 16px;line-height: 30px;margin-left: 50px;">状态：</span>
         <span style="font-size: 16px;line-height: 30px;">{{roomInfo.haveLesson ? '正在上课':'未上课'}}</span>
         <span style="font-size: 16px;line-height: 30px;margin-left: 50px;">到勤率：</span>
         <span style="font-size: 16px;line-height: 30px;">{{roomInfo.attendanceRate ? roomInfo.attendanceRate :0 }}%</span>
       </div>
       <div style="float: left; width: 100%;height: auto;margin-top: 30px;">
           <Detail :screens="screens" :title="detail_title" :channel="detail_channel" :info='detail_info'></Detail>
       </div>

       <div style="float: left; width: 100%;height: 50px;margin-top: 20px;margin-bottom: 120px;text-align: center;display: flex;justify-content: center;">
          <el-link v-if="prev!=null && view=='表格'" @click="table_dblclick(prev,prev.index)"  type="primary" :disabled="prev==null">上一条：{{prev.buildingName}}{{prev.classroom.classroomName}}</el-link>
          <el-link v-if="next!=null && view=='表格'" @click="table_dblclick(next,next.index)"  style="margin-left: 70px;" type="primary" :disabled="next==null">下一条：{{next.buildingName}}{{next.classroom.classroomName}}</el-link>

          <el-link v-if="prev!=null && view=='图表'" @click="seedetail(prev.classroomId)"  type="primary" :disabled="prev==null">上一条：{{prev.buildingName}}{{prev.classroomName}}</el-link>
          <el-link v-if="next!=null && view=='图表'" @click="seedetail(next.classroomId)"  style="margin-left: 70px;" type="primary" :disabled="next==null">下一条：{{next.buildingName}}{{next.classroomName}}</el-link>
       </div>
    </div>

    <Gfoot style="position: fixed;bottom: 0px;"></Gfoot>
  </div>
</template>

<script>
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  import {
    basicinfo,
    pathinfo,
    timeout,
    getinfourl,
    attendrateinfo,
    warntxt,
    controllisturl,
    findAllCourses,
    teacherurl
  } from '@/module/admin/config/attendRateinfo'
  import {
    collegeteacherurl,liveurl,findLoopByRoomId
  } from '@/module/admin/config/loopclassinfo'
  import List from '@/components/extend/ckplay'
  import Detail from '@/components/extend/detail'
  // import AJsmartClassroom from '@/module/admin/components/smartclassroom'
  // import loopclass from '@/module/admin/components/loopclass'
  export default {
    name: 'AJloopClass',
    data() {
      return {
        tip:true,
        minAttendanceRate: 0,
        activeName: 'jikong',
        view: '表格', //视图切换
        select_Sbuilding: '',
        Sbuilding_options: [], //所有教学楼
        class_status: true, //按上课状态
        select_college: '', //选择的学院
        select_teacher: '', //选择的教师
        college: [], //所有学院
        selectItemlist: [], //所有教师
        select_Recording: [], //选择的录制状态
        xunke_status:false, //自动巡课
        select_tongdao:3,//选择的通道
        select_fenpin:4, //分屏模式
        time_num:15,//自动巡课时间
        Recording_suatus: [{
          value: -1,
          txt: '数据缺失'
        }, {
          value: 0,
          txt: '等待分析'
        }, {
          value: 1,
          txt: '正常'
        }, {
          value: 2,
          txt: '异常'
        }],
        xunke_options:[
          {value:3,txt:'学生全景'},
          {value:0,txt:'学生近景'},
          {value:5,txt:'老师全景'},
          {value:1,txt:'老师近景'},
        ],
        select_radio: "1", //选择是否录制
        pagesize: 10,
        pageindex: 1,
        totalnum: 0,
        data_list: [],
        loading: false,
        title:[],
        info:[],
        channel:[],
        screens: '',
        threeList:[], //图表数据集合
        tubiao_pageindex:1,
        tubiao_totalnum:0,//图表数据长度
        classroomid:[],
        seedetail_status:true,  //查看详情开关
        detail_title : [],
        detail_channel : [],
        detail_info : [],
        roomInfo:null,  //教室详情
        prev:null,
        next:null,
        table_clock:null, //计时器 每30秒刷新 页面数据
      }
    },
    created() {
      this.$router.push({name: 'AJloopClass'})
      this.getBuildingAndClassrooms(); //获取所有教学楼
      this.getCollegeAndTeachers(); //获取所有学院和老师
      this.search(1); //获取表格数据
      this.table_clock = window.setInterval(() => {
          this.search(this.pageindex);
      },60000);
    },
    components: {
      Ghead,
      Gfoot,
      List,
      Detail
      // AJsmartClassroom,
      // loopclass
    },

    methods: {
      // 选项卡切换事件
    //   handleClick(tab, event) {
    //         console.log(tab, event);

    //   if(tab.index==0){
    //   	this.$router.push({name: 'AJloopClass'})
    //   }else{
    //   	this.$router.push({name: 'AJsmartClassroom'})
    //   }
    // },
      //
     //给表格每一行 一个index 索引
     tableRowClassName ({row, rowIndex}) {
          row.index = rowIndex;
     },

     //监听是否正在上课开关
     swith_change(e){
       if(!e){
          //重置条件
          this.select_college="";
          this.select_teacher="";
          this.Recording_suatus = [{
          value: -1,
          txt: '数据缺失'
        }, {
          value: 0,
          txt: '等待分析'
        }, {
          value: 1,
          txt: '正常'
        }, {
          value: 2,
          txt: '异常'
        }, {
          value: 3,
          txt: '暂无课程'
        }]
       }else{
        this.Recording_suatus=[{
          value: -1,
          txt: '数据缺失'
        }, {
          value: 0,
          txt: '等待分析'
        }, {
          value: 1,
          txt: '正常'
        }, {
          value: 2,
          txt: '异常'
        }]
       }
     },

      xunke_change(e){
        var that = this;
         if(e){
            this.clock = window.setInterval(() => {
               if((that.tubiao_pageindex*that.select_fenpin)<that.tubiao_totalnum){
                    that.tubiao_pageindex = that.tubiao_pageindex+1
                    that.zhengli(that.tubiao_pageindex);
               }else{
                    if(this.clock) {
                       clearInterval(this.clock);
                    }
                    that.xunke_status = false;
                    that.opentishi('当前已巡课到最后一页！');
               }
            },that.time_num*1000);
         }else{
            if(this.clock) {
                    clearInterval(this.clock);
            }

         }
      },

      //给表格每行赋值
       indexMethod(index) {
          return index +1;
       },

      //关闭详情页
      close_detail(){
         this.seedetail_status = true;
      },

      radio_change(e){
        this.select_fenpin=e;
        this.tubiao_pageindex = 1;
        this.zhengli(this.tubiao_pageindex);
      },

      //切换每页的条数
      handleSizeChange(e) {
        this.pagesize = e;
        this.search(this.pageindex);
      },

      //表格双击事件
      table_dblclick(e) {
          this.seedetail(e.classroom.classroomId,e.index);
      },
      //图表视图通道切换
      tongdao_change(e){
        this.select_tongdao = e;
        this.zhengli(this.tubiao_pageindex);
      },

      time_handleChange(e){
        if(e===undefined){
          this.time_num=30
        }
      },

      // 获取所有教学楼和教室
      getBuildingAndClassrooms() {
        let that = this
        // 教学楼-教室
        this.axios({
            method: 'post',
            url: controllisturl
          })
          .then(function(res) {
            let temp = []
            let objs = res.data.result
            for (var i = 0; i < objs.length; i++) {
              temp.push({
                value: objs[i].buildingId,
                label: objs[i].buildingName,
                children: []
              })
              for (var j = 0; j < objs[i].classrooms.length; j++) {
                temp[i].children.push({
                  value: objs[i].classrooms[j].classroomId,
                  label: objs[i].classrooms[j].classroomName,
                })
              }
            }
            that.Sbuilding_options = temp;
          })
          .catch(function(error) {
            console.log(error)
          })
      },

      getCollegeAndTeachers() {
        let that = this
        // 学院
        this.axios({
            method: 'post',
            url: collegeteacherurl,
            params: {
              'par': {
                // pageSize: pagesize,
                // pageIndex: 1
              }
            }
          })
          .then(function(res) {
            let temp = []
            let teacher = []
            let objs = res.data
            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['value'] = objs[item].id
              temp[item]['txt'] = objs[item].collegeName
              let userList = objs[item].userList
              for (let k = 0; k < userList.length; k++) {
                teacher.push({
                  value: userList[k].id,
                  txt: userList[k].realName + '(' + userList[k].userName + ')'
                })
              }
            }

            that.college = temp;
            that.selectItemlist = teacher;
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      //区域
      quyu_Change(e){

      },

      //视图切换
      viewChange(e) {

        if(e=='图表'){
          this.tubiao_sousuo();
        }else{
          this.search(this.pageindex);
        }
      },

      //图表的搜索
      tubiao_sousuo(){
        var that = this;
        this.tubiao_pageindex = 1;
        this.axios({
          method: 'post',
          url: liveurl,
          params: {
            par: {
              sourceType: 0,
              channelTarget: "0,1,3,5",
              collegeName: that.select_college, //学院
              teacherName: that.select_teacher, //教师名
              gradeId: '',  //未知字段
              classroomId: (that.select_Sbuilding[1] == undefined ? '' : this.select_Sbuilding[1]),  //教室名
              buildingId: (that.select_Sbuilding[0] == undefined ? '' : this.select_Sbuilding[0]),  //区域
              isStudy: that.class_status ? 1:0  // 0 全部  1录制中
            }
          }
        })
        .then(function (res) {
            that.threeList = res.data.threeList;
            that.tubiao_totalnum = res.data.threeList.length;
            var objs = res.data.threeList
            var title = []
            var info = []  //流
            var channel = []
            var classroomid = []
            if( parseInt(that.select_fenpin) > res.data.threeList.length){
                for (let i = 0; i < res.data.threeList.length; i++) {
                  title.push(objs[i].title)
                  classroomid.push(objs[i].classroomId)
                  if(objs[i].channelsOfOneClassroomList.length>0){
                      channel.push(objs[i].channelsOfOneClassroomList);
                      for(var k = 0; k<objs[i].channelsOfOneClassroomList.length;k++){
                           if(objs[i].channelsOfOneClassroomList[k].target == that.select_tongdao){
                               info.push(objs[i].channelsOfOneClassroomList[k].rtmpUrl)
                               break;
                           }else{
                              if(k==(objs[i].channelsOfOneClassroomList.length-1)){
                                    info.push('null');
                                    break;
                              }
                           }
                      }
                  }else{
                      info.push('null');
                      channel.push(null);
                  }
                }

            }else{

              for (let i = 0; i < parseInt(that.select_fenpin); i++) {
                title.push(objs[i].title)
                classroomid.push(objs[i].classroomId)
                if(objs[i].channelsOfOneClassroomList.length>0){
                    channel.push(objs[i].channelsOfOneClassroomList);
                    for(var k = 0; k<objs[i].channelsOfOneClassroomList.length;k++){
                         if(objs[i].channelsOfOneClassroomList[k].target == that.select_tongdao){
                             info.push(objs[i].channelsOfOneClassroomList[k].rtmpUrl)
                             break;
                         }else{
                            if(k==(objs[i].channelsOfOneClassroomList.length-1)){
                                  info.push('null');
                                  break;
                            }
                         }
                    }
                }else{
                    info.push('null');
                    channel.push(null);
                }
              }
            }
            that.title = title;
            that.info = info;
            that.channel = channel;
            that.classroomid = classroomid;
        })
        .catch(function (error) {
          console.log(error)
        })
      },

      //更新视频
      zhengli(obj){
         var that = this;
         var objs = that.threeList.slice(((obj-1)*that.select_fenpin),(obj*that.select_fenpin));

         var title = []
         var info = []  //流
         var channel = []
         var classroomid = []
         var totla = 0;
        if( parseInt(that.select_fenpin) > objs.length){
            for (let i = 0; i < objs.length; i++) {
              title.push(objs[i].title)
              classroomid.push(objs[i].classroomId)
              if(objs[i].channelsOfOneClassroomList.length>0){
                  channel.push(objs[i].channelsOfOneClassroomList);
                  for(var k = 0; k<objs[i].channelsOfOneClassroomList.length;k++){
                       if(objs[i].channelsOfOneClassroomList[k].target == that.select_tongdao){
                           info.push(objs[i].channelsOfOneClassroomList[k].rtmpUrl)
                           break;
                       }else{
                          if(k==(objs[i].channelsOfOneClassroomList.length-1)){
                                info.push('null');
                                break;
                          }
                       }
                  }
              }else{
                  info.push('null');
                  channel.push(null);
              }
            }
        }else{
          for (let i = 0; i < parseInt(that.select_fenpin); i++) {
            title.push(objs[i].title)
            classroomid.push(objs[i].classroomId)
            if(objs[i].channelsOfOneClassroomList.length>0){
                channel.push(objs[i].channelsOfOneClassroomList);
                for(var k = 0; k<objs[i].channelsOfOneClassroomList.length;k++){
                     if(objs[i].channelsOfOneClassroomList[k].target == that.select_tongdao){
                         info.push(objs[i].channelsOfOneClassroomList[k].rtmpUrl)
                         break;
                     }else{
                        if(k==(objs[i].channelsOfOneClassroomList.length-1)){
                              info.push('null');
                              break;
                        }
                     }
                }
            }else{
                info.push('null');
                channel.push(null);
            }
          }
        }
         that.title = title;
         that.info = info;
         that.channel = channel;
         that.classroomid = classroomid;

      },



      //搜索
      search(obj) {
        let that = this
        that.loading = true;
        that.pageindex = obj;
        this.axios({
            method: 'post',
            url: getinfourl,
            params: {
              params: {
                buildingId: (that.select_Sbuilding[0] == undefined ? '' : this.select_Sbuilding[0]),
                classroomId: (that.select_Sbuilding[1] == undefined ? '' : this.select_Sbuilding[1]),
                courseCode: "",
                courseName: "",
                collegeId:that.select_college,
                teacherId_: that.select_teacher,
                typeArr: that.select_Recording,
                isHavingClass:that.class_status,
                offset: (obj - 1) * that.pagesize,
                pageSize: that.pagesize,
                isTable:true
              }
            }
          })
          .then(function(res) {
            that.loading = false;
            if (res.status !== 200) {
              that.win(types.resback, that.cancelfn, false)
            } else {
                //按照指定规则排序
                var objs = []
                res.data.result.sort(function(a,b){
                    // order是规则  res.data.urlList是需要排序的数组
                    var guize = [2, 1, 0, -1, 3];  //下面是注释
                    // <el-tag v-if="scope.row.type===-1" color="#f8d436" style="color: #ffffff;">数据缺失</el-tag>
                    // <el-tag v-if="scope.row.type===0" color="#81d3f8" style="color: #ffffff;">等待分析</el-tag>
                    // <el-tag v-if="scope.row.type===1" color="#17c295" style="color: #ffffff;">正常</el-tag>
                    // <el-tag v-if="scope.row.type===2" color="#ff6c5b" style="color: #ffffff;">异常</el-tag>
                    // <el-tag v-if="scope.row.type===3" color="#000000" style="color: #ffffff;">暂无课程</el-tag>
                    return guize.indexOf(a.type) - guize.indexOf(b.type);
                });

                // 根据规则排序后新的数组
                 res.data.result.map(function(a){
                   objs.push(a);
                });
                that.minAttendanceRate = res.data.minAttendanceRate;
                let temp = []
                // let objs = res.data.result
                that.totalnum = res.data.total;
                //为分页的数据
                that.table_data = objs;
                var data = objs.slice(((obj-1)*that.pagesize),(obj*that.pagesize));
                //分页完成的数据
                that.data_list = data


            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },

      fenye(obj){
        var that = this;
        var data = that.table_data.slice(((obj-1)*that.pagesize),(obj*that.pagesize));
        //分页完成的数据
        that.data_list = data
      },

      opentishi(e) {
              this.$alert(e,'系统提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return;
                }
              });
        },

     //判断是否全屏
     isFullscreen(){
                 return document.fullscreenElement    ||
                        document.msFullscreenElement  ||
                        document.mozFullScreenElement ||
                        document.webkitFullscreenElement || false;
             },

      //退出全屏
     exitFullscreen() {
          if (document.exitFullscreen) {
              document.exitFullscreen();
          } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
          }
      },


      seedetail(e,num_index){

        var that = this;
              if(e==null){
                  return;
              }
                this.axios({
                  method: 'post',
                  url: findLoopByRoomId,
                  params: {
                    par: {
                      classRoomId:e
                    }
                  }
                })
                .then(function(res) {
                  if(res.data.urlList === undefined){
                      if(that.isFullscreen()){
                        that.exitFullscreen();
                      }
                      that.opentishi(res.data.msg);
                      return;
                  }
                  if(res.data.urlList.length == 0){
                    if(that.isFullscreen()){
                      that.exitFullscreen();
                    }
                    that.opentishi(res.data.roomInfo.classroomName+'未配置通道');
                  }else{
                    that.roomInfo = res.data.roomInfo;
                    that.seedetail_status =false
                    var detail_title = []
                    var detail_channel = []
                    var detail_info = []

                    //按照指定规则排序
                    var result = []
                    res.data.urlList.sort(function(a,b){
                        // order是规则  res.data.urlList是需要排序的数组
                        var guize = [3, 5, 0, 1, 2, 4];  //下面是注释
                          // {'txt': '学生', value: 0},
                          // {'txt': '老师', value: 1},
                          // {'txt': 'PPT', value: 2},
                          // {'txt': '学生全景', value: 3},
                          // {'txt': 'PGM', value: 4},
                          // {'txt': '老师全景', value: 5}
                        return guize.indexOf(a.target) - guize.indexOf(b.target);
                    });

                    // 根据规则排序后新的数组
                     res.data.urlList.map(function(a){
                       result.push(a);
                    });

                    for(var i=0; i< result.length;i++){
                      detail_title.push(res.data.urlList[i].channelName);
                      detail_info.push(res.data.urlList[i].url);
                      detail_channel.push(res.data.urlList[i])
                    }
                    that.detail_title = detail_title;
                    that.detail_channel = detail_channel;
                    that.detail_info = detail_info;

                    //计算下一页
                    if(that.view=='图表'){
                      var index = null
                      for(var i =0 ;i<that.threeList.length;i++){
                          if(e==that.threeList[i].classroomId){
                              index = i;
                          }
                      }
                       if(index>0){
                          that.prev = that.threeList[index-1];
                       }else{
                         that.prev = null;
                       }
                       if(index<that.tubiao_totalnum-1){
                          that.next = that.threeList[index+1];
                        }else{
                          that.next = null;
                        }
                        //自动翻页
                        var num = Math.ceil((index+1)/that.select_fenpin);
                        if(num!= that.tubiao_pageindex){
                           that.zhengli(num);
                           that.tubiao_pageindex= num;
                        }

                    }else{
                        var index = null
                        for(var i =0 ;i<that.table_data.length;i++){
                            if(e==that.table_data[i].classroom.classroomId){
                                index = i;
                            }
                        }
                        if(index>0){
                           that.prev = that.table_data[index - 1];
                        }else{
                          that.prev = null;
                        }
                        if(index<that.totalnum-1){
                           that.next = that.table_data[index + 1];
                         }else{
                           that.next = null;
                         }
                         //自动翻页
                         var num = Math.ceil((index+1)/that.pagesize);
                         if(num!= that.pageindex){
                            that.fenye(num);
                            that.pageindex= num;
                         }

                    }
                  }
                })
                .catch(function(error) {
                  console.log(error)
                })
      }

    },
    watch: {

    },
    beforeDestroy() {
        if(this.clock) {
             clearInterval(this.clock);
        }
        if(this.table_clock){
          clearInterval(this.table_clock);
        }

    }
  }
</script>
<style>
  /* .el-tabs__nav{
		margin-left: 50px;
	} */

  #channel_2 {
    top: 1.5px !important;
  }

  #channel_3 {
    top: 1.5px !important;
  }
</style>

<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="center centerbottom50">
      <div class="centers row">
        <Linklist></Linklist>
        <div class="AA_right">
          <AJposition></AJposition>

          <div style="float:left;width: 100%;height: 60px;">
            <el-menu :default-active="activeIndex" class="el-menu1" mode="horizontal" @select="elmenuSelect">
              <el-menu-item v-if="seelist" index="1" style="width: 100px;text-align: center;margin-right: 20px !important;">常态化教学</el-menu-item>
              <el-menu-item v-if="microteaching && micro_scanlist" index="2" style="width: 100px;text-align: center;">微格教学</el-menu-item>
            </el-menu>
          </div>

          <div v-show="activeIndex=='1'" class="G_search" style="margin-bottom: 20px;">
            <!-- 学院 -->
            <!-- <div class="part">
              <span class="txt">{{eduType?basicinfo.collegeN:basicinfo.gradeN}}:</span>
              <div id='select95' style="margin-top: 3px;"></div>
            </div> -->
            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;">{{eduType?basicinfo.collegeN:basicinfo.gradeN}}:</span>
              <el-select v-model="collegeId" filterable placeholder="请选择学院" popper-class="el_selects_css" clearable
                style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in collegeId_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!-- 班级 -->
            <!-- <div class="part" >
              <span class="txt">{{basicinfo.classN}}:</span>
              <div id='select81' style="margin-top: 3px;"></div>
              <select id="select82"></select>
            </div> -->

            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.classN}}:</span>
              <el-select v-model="classesId" filterable placeholder="请选择班级" popper-class="el_selects_css" clearable
                style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in classesId_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!-- 老师 -->
            <!-- <div class="part" >
              <span class="txt">{{basicinfo.teacherN}}:</span>
              <div id='select84' style="margin-top: 3px;">
                <select id="select85"></select>
              </div>
            </div> -->
            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.teacherN}}:</span>
              <el-select v-model="teacherId" filterable placeholder="请选择老师" popper-class="el_selects_css" clearable
                style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in teacherId_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!-- 时间 -->
            <!-- <div class="part">
              <span class="txt">{{basicinfo.temeN}}:</span>
              <Calendarme :dateval="dateval" :valshow="valshow" :clear="true" :part= "part" :ymdhms="ymdhms" @startfn="startfn" :ids="start"></Calendarme>
            </div> -->

            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.temeN}}:</span>
              <el-date-picker style="float: left; margin-left: 20px;" v-model="dateval" type="date" value-format="yyyy-MM-dd"
                placeholder="选择日期" @change="startfn">
              </el-date-picker>
            </div>


            <!-- 状态 -->
            <!-- <div class="part">
              <span class="txt">{{basicinfo.statusN}}:</span>
              <div id='select70' style="margin-top: 3px;"></div>
              <select id="select71"></select>
            </div> -->
            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.statusN}}:</span>
              <el-select v-model="isPublish" filterable placeholder="请选择状态" popper-class="el_selects_css" style="float: left;width: 200px;margin-left: 20px;">
                <el-option v-for="item in statusData" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>


            <!-- <div class="part">
              <span class="txt">{{basicinfo.typeN}}:</span>
              <div id='select20' class="select" style="margin-top: 3px;"></div>
            </div> -->
            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.typeN}}:</span>
              <el-select v-model="resourceFromWhere" filterable placeholder="请选择类型" popper-class="el_selects_css" style="float: left;margin-left: 20px;">
                <el-option v-for="item in typeData" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <el-button type="primary" @click="searchevent" style="float: left;margin-left: 20px;margin-top: 20px;" icon="el-icon-search">搜索</el-button>
            <!-- <div class="btn" @click="searchevent">{{basicinfo.searchN}}</div> -->
          </div>
          <List v-show="activeIndex=='1'" :totalnum="totalnum" :pagesize="pagesize" :delbtn="delbtn" @downhevent="downhevent"
            @downlevent="downlevent" :addbtn="addshow" :pageval="pageval" :bingos="bingos" @pagepost="pagepost"
            :pageinfo="pageinfo" :pathinfo="pathinfo" :info='products' :infoval="infoval" :head='listhead' :optevent='optevent'
            :colums="colums" :percentinfo='percentinfo'></List>

          <div v-show="activeIndex=='2' && micro_scanlist" style="float: left;width: 100%;display: flex;align-items: center;flex-wrap: wrap;">

            <div style="float: left;margin-top: 20px;margin-right: 30px;">
              <span class="txt" style="float: left;margin-right: 20px;">上课时间:</span>
              <el-date-picker v-model="timeselectvalue" style="float: left;" type="daterange" range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" size="small" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </div>


            <div style="float: left;margin-top: 20px;margin-right: 30px;">
              <span class="txt" style="float: left;margin-right: 20px;">课程名称(代码):</span>
              <el-select clearable v-model="selectcourse" filterable size="small" clearable :popper-class="'el_selects_css'"
                style="float:left;">
                <el-option v-for="item in courseLists" :key="item.courseId" :label="item.courseName+'('+item.courseCode+')'"
                  :value="item.courseId">
                </el-option>
              </el-select>
            </div>

            <div style="float: left;margin-top: 20px;margin-right: 30px;">
              <span class="txt" style="float: left;margin-right: 20px;">教师:</span>
              <el-select clearable v-model="teacher_name" filterable placeholder="请选择教师" size="small" :disabled="select_teacher_name" :popper-class="'el_selects_css'"
                style="float:left;">
                <el-option v-for="item in selectItemlist" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>

              <!-- <el-input style="width:200px;" placeholder="请输入教师名" suffix-icon="el-icon-search" size="small" v-model="teacher_name">
              </el-input> -->
            </div>

            <div style="float: left;margin-top: 20px;margin-right: 30px;">
              <span class="txt" style="float: left;margin-right: 20px;">教学班:</span>
              <el-select clearable v-model="selectclasse" filterable size="small" clearable :popper-class="'el_selects_css'"
                style="float:left;">
                <el-option v-for="item in classes_options" :key="item.classesCode" :label="item.classesName+'('+item.classesCode+')'"
                  :value="item.classesCode">
                </el-option>
              </el-select>
            </div>


            <div style="float: left;margin-top: 20px;margin-right: 30px;">
              <el-radio-group v-model="select_radio3" size="small" style="float:left;" @change="selectradio3" :disabled="rideo_status">
                <el-radio-button label="学生姓名"></el-radio-button>
                <el-radio-button label="学生学号"></el-radio-button>
              </el-radio-group>

              <el-input v-if="select_radio3=='学生姓名'" clearable style="float: left; margin-left: 20px;width:200px;"
                :placeholder="placeholder2" suffix-icon="el-icon-search" size="small" v-model="student_name">
              </el-input>

              <el-input v-if="select_radio3!='学生姓名'" clearable style="float: left;margin-left: 20px;width:200px;"
                :placeholder="placeholder2" suffix-icon="el-icon-search" size="small" :disabled="input_student_code" v-model="student_code">
              </el-input>
            </div>

            <div style="float: left;margin-top: 20px;margin-right: 30px;">
              <span class="txt" style="float: left;margin-right: 20px;">视频类型:</span>
              <el-radio-group v-model="select_video" size="small" style="float:left;">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="片段"></el-radio-button>
                <el-radio-button label="整课"></el-radio-button>
              </el-radio-group>
            </div>

            <div style="float: left;margin-top: 20px;margin-right: 30px;">
              <span class="txt" style="float: left;margin-right: 20px;">发布状态:</span>
              <el-radio-group v-model="select_publish" size="small" style="float:left;">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="未发布"></el-radio-button>
                <el-radio-button label="已发布"></el-radio-button>
              </el-radio-group>
            </div>

            <el-button @click="findtable2()" type="primary" size="small" icon="el-icon-search" style="float: left;margin-top: 20px; margin-left:95px">查询</el-button>

          </div>


          <div v-show="activeIndex=='2' && micro_scanlist" style="float: left;width: 100%;margin-top: 20px;">
            <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="data_list" border style=" width: 100%;"
              :header-cell-style="{background:'#d5dfeb',color:'#606266',textAlign:'center'}" :cell-style="{'text-align': 'center'}">
              <el-table-column label="学生基本信息">
                <el-table-column prop="userName" label="姓名"></el-table-column>
                <el-table-column prop="userCode" label="学号"></el-table-column>
                <el-table-column prop="majorName" label="专业"></el-table-column>
              </el-table-column>
              <el-table-column label="所选课程信息">
                <el-table-column prop="collegeName" label="开课学院"></el-table-column>
                <el-table-column prop="courseName" label="所属课程"></el-table-column>
                <el-table-column prop="teacherName" label="所属任课老师"></el-table-column>
              </el-table-column>
              <el-table-column label="实训情况">
                <el-table-column prop="subjectName" label="授课学科"></el-table-column>
                <el-table-column prop="lessonName" label="授课章节"></el-table-column>
                <el-table-column prop="classroomName" label="教室"></el-table-column>
                <el-table-column prop="startTime" label="上课时间" width="150"></el-table-column>
                <!-- <el-table-column prop="endTime" label="上课时间" width="150"></el-table-column> -->
                <el-table-column prop="endTime" label="时长">
                  <template slot-scope="scope">
                    <span>{{jisuan(scope.row)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="microType" label="视频类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.microType==0?'片段':'整课'}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="recording" label="资源状态">
                  <template slot-scope="scope">
                    <!-- <span v-if="scope.row.recording==0">未开始录制</span>
                    <span v-else-if="scope.row.recording==1">正在录制</span>
                    <span v-else-if="scope.row.recording==2">已结束</span>
                    <span v-else-if="scope.row.recording==3">录制失败</span>
                    <span v-else-if="scope.row.recording==4">录制成功</span>
                    <span v-else-if="scope.row.recording==5">已上传</span>
                    <span v-else="scope.row.recording==null">流程出错</span> -->
                    <span v-if="scope.row.recording==1 || scope.row.recording==2 || scope.row.recording==4">录制传输中</span>
                    <span v-else-if="scope.row.recording==0 || scope.row.recording==3">异常</span>
                    <span v-else="scope.row.recording==5">正常</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ispush" label="发布状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.ispush==0">未发布</span>
                    <span v-else>已发布</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="操作" width="230">
                <template slot-scope="scope">
                  <!-- <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click.native.prevent="deleteRow(scope.$index, data_list)" type="text" size="small">删除</el-button>
                  <el-button @click="openurl(scope.row)" type="text" size="small">管理</el-button -->
                  <el-button v-if="(scope.row.recording ==5 && (authority.micro_seelist.status))" @click="openurl(scope.row,5)" type="text" size="small">查看</el-button>
                  <el-button v-if="(scope.row.recording ==5 && (authority.micro_downlist.status))" @click="getdownurl(scope.row)" type="text" size="small">下载</el-button>
                  <el-button v-if="(scope.row.recording ==5 && (authority.micro_report.status))" @click="openurl(scope.row,6)" type="text" size="small">报告</el-button>
                  <el-button v-if="(scope.row.recording ==5 && (authority.micro_pushlist.status))" @click="publish_rosouce(scope.row)" type="text" size="small">{{scope.row.ispush == 0 ? '发布':'取消发布' }}</el-button>
                  <el-button v-if="((scope.row.recording==0 || scope.row.recording==3 || scope.row.recording==5) && (authority.micro_dellist.status))" @click="delect_rosouce(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
          <div v-show="activeIndex=='2' && micro_scanlist" style="float: left; text-align: center;width: 100%;margin-bottom: 60px;margin-top: 30px;">
            <el-pagination background :prev-text="'上一页'" :next-text="'下一页'" :popper-class="'pagination1'" :page-sizes="[5, 10, 15, 20]"
              @size-change="handleSizeChange" @current-change="findtable" :current-page.sync="table_pageindex"
              :page-size="table_pagesize"  layout="prev, pager, next, jumper, sizes,total " :total="table_totalnum">
            </el-pagination>
          </div>




        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
    <el-dialog
      title="下载资源"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <el-button type="primary" style="position: absolute;right: 20px;z-index: 99;" icon="el-icon-download"  @click="downurlAll('')">全部下载</el-button>
      <!-- @tab-click="handleClick" -->
      <el-tabs v-model="activeName" style="">
          <el-tab-pane label="视频文件" name="video">
            <a v-for="item in video" :href="geturls +'?location='+ item.location+'&resourceId=' + item.resourceId + '&stoId=' + item.stoId" target="_blank" style="margin-right: 20px;line-height: 30px;text-decoration: underline;">{{item.name}}</a>
            <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
              <el-button type="primary" style="" icon="el-icon-download"  @click="downurlAll(0)">下载本页</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="板书" name="blackboardsRes">
            <a v-for="item in blackboardsRes" :href="item.url +'?&stoId=' + video[0].stoId" target="_blank" style="margin-right: 20px;line-height: 30px;text-decoration: underline;">{{item.name}}</a>
            <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
              <el-button type="primary" style="" icon="el-icon-download"  @click="downurlAll(1)">下载本页</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="字幕文件" name="srtRes">
            <a v-for="item in srtRes" :href="item.url+'?&stoId=' + video[0].stoId" target="_blank" style="margin-right: 20px;line-height: 30px;text-decoration: underline;">{{item.name}}</a>
            <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
              <el-button type="primary" style="" icon="el-icon-download"  @click="downurlAll(2)">下载本页</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  import List from '@/components/extend/listcheck'
  import Calendarme from '@/components/extend/calendar.vue'
  import Linklist from './linklist'
  import AJposition from '@/components/extend/position'
  import {
    microteaching
  } from '@/module/admin/config/urlPage'
  import {
    findAllCourses,
    findClassesByType
  } from '@/module/admin/config/statisticsinfo'
  import {
    collegeteacherurl
  } from '@/module/admin/config/loopclassinfo'
  import {
    collegemajorurl,
    findCoursesForMicroTeaching,
    findMicroLesson,
    statusData,
    typeData,
    transcribeStatus,
    transcribeType,
    getclassesurl,
    getgradesurl,
    warntxt,
    usersByRolesurl,
    basicinfo,
    powerinfo,
    recordstate,
    state,
    opteventAll,
    optobjinfoAll,
    searchinput,
    searchstyle,
    pageval,
    products,
    bingos,
    infoval,
    pagesize,
    colums,
    percentinfo,
    listurl,
    listheadP,
    listheadH,
    pathinfo,
    getEquipments,
    deleteMicroLesson,
    downurl,
    resourceDownPathUrl,
    geturl,
    delurl,
    publishresourceurl
  } from '@/module/admin/config/resourceinfo'
  export default {
    name: 'AJresource',
    components: {
      Ghead,
      Gfoot,
      AJposition,
      Linklist,
      List,
      Calendarme
    },
    data() {
      return {
        activeName: 'video',
        centerDialogVisible:false,
        activeIndex: '2',
        microteaching: microteaching,
        timeselectvalue: [],
        courseLists: [],
        selectcourse: '',
        teacher_name: '',
        classes_options: [],
        selectclasse: '',
        select_radio3: '学生姓名', //学生查看选择
        placeholder2: '请输入学生姓名',
        student_name: '',
        student_code: '',
        select_video: '全部',
        select_publish:'全部',
        data_list: [],
        loading: false,
        selectItemlist: [], //所有老师
        table_pageindex: 1,
        table_pagesize: 5,
        table_totalnum: 0,
        authority: {
          micro_pushlist:{
          code: 'micro_pushlist',
          status: false,
          label: '发布资源-微格'
        },
          micro_downlist:{
          code: "micro_downlist",
          status: false,
          label: '下载资源-微格'
        },
          micro_scanlist:{
          code: "micro_scanlist",
          status: false,
          label: '浏览资源-微格'
        },
          micro_dellist:{
          code: "micro_dellist",
          status: false,
          label: "删除资源-微格"
        },
          micro_seelist:{
          code: "micro_seelist",
          status: false,
          label: "查看课程数据-微格"
        },
          micro_report:{
          code: "micro_report",
          status: false,
          label: "查看分析报告-微格"
        },
          micro_managelist:{
          code: "micro_managelist",
          status: false,
          label: "管理全部人的资源-微格"
        }
       },
        micro_managelist:false, //管理员权限
        select_teacher_name:false, //教室选择框 是否锁定
        input_student_code:false, //学号输入框是否锁定
        rideo_status:false, //学生姓名 学号切换 是否锁定
        video:[], //下载的所有链接
        blackboardsRes:[],//板书下载的链接
        srtRes:[],//字幕所有文件下载链接
        geturls:geturl,
        seelist:false, //控制当前页面
        micro_scanlist:false,

        collegeId: '',
        warntxt: warntxt,
        eduType: this.$store.state.educationType,
        studySectionId: '',
        classesId: '',
        teacherId: '',
        isPublish: '',
        dateval: '',
        start: 'start',
        ymdhms: 'ymd',
        part: document.body,
        valshow: false,
        pageinfo: '',
        basicinfo: basicinfo,
        addshow: 'display:none',
        searchbtnstyles: 'float:left',
        products: products,
        infoval: infoval,
        percentinfo: percentinfo,
        colums: colums,
        optevent: opteventAll,
        optobjinfo: optobjinfoAll,
        pathinfo: pathinfo,
        bingos: bingos,
        delbtn: 'display: none',
        pageval: pageval,
        pagesize: pagesize,
        searchstyle: searchstyle,
        styles: searchinput,
        state: state,
        recordstate: recordstate,
        pw: 0,
        del: 0,
        edit: 0,
        dh: 0,
        pub: 0,
        report: 0,
        totalnum: 0,
        keywords: '',
        resourceFromWhere: null,
        collegeId_options: [],
        classesId_options: [],
        teacherId_options: [],
        statusData: statusData,
        typeData: typeData
      }
    },
    computed: {
      listhead() {
        return this.eduType ? listheadH : listheadP
      }
    },
    methods: {



      delect_rosouce(e){
        let that = this
        this.$confirm( e.ispush == 0 ?'此操作将永久删除该文件, 是否继续?':'此操作将永久删除该文件,将一并删除发布的章节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          if(e.recording != 5 ){
            //新的接口
            that.axios.post(deleteMicroLesson, {
                lessonIdList: [{
                  lessonId: e.lessonId
                }]
              })
              .then(function(res) {
                if (res.data.code == 200) {
                  that.$notify({
                    type: 'success',
                    title: res.data.message,
                    showClose: false,
                    duration: 1000,
                    position: 'bottom-right'
                  });
                  that.findtable();
                } else {
                  that.$notify.error({
                    title: res.data.message,
                    showClose: false,
                    duration: 1000,
                    position: 'bottom-right'
                  });
                }
              })
              .catch(() => {


              });
          }else{
            //之前的资源管理
              that.axios({
                method: 'post',
                url: delurl,
                data: {
                  params: {
                    resourceIds: [e.resourceId]
                  }
                }
              })
              .then(function (res) {
                if (res.data.code == 200) {
                  that.$notify({
                    type: 'success',
                    title: res.data.message,
                    showClose: false,
                    duration: 1000,
                    position: 'bottom-right'
                  });
                  that.findtable();
                } else {
                  that.$notify.error({
                    title: res.data.message,
                    showClose: false,
                    duration: 1000,
                    position: 'bottom-right'
                  });
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },


      publish_rosouce(e){

        let that = this
        this.$confirm(e.ispush == 0 ? '确定发布此资源吗?':'确定要取消发布吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.axios({
           method: 'post',
           url: publishresourceurl,
           params: {
             par: {
               resourceId: e.resourceId || '',
               isPublish:  e.ispush == 0 ? '1':'0',
               publish_type:'1'
             }
           }
          })
          .then(function (res) {
            if (res.data.isSuccess === 1) {
              that.$notify({
                type: 'success',
                title: res.data.data,
                showClose: false,
                duration: 1000,
                position: 'bottom-right'
              });
              that.findtable();
            } else {
              that.$notify.error({
                title: res.data.data,
                showClose: false,
                duration: 1000,
                position: 'bottom-right'
              });
              that.findtable();
            }
          })
          .catch(function (error) {
            console.log(error)
          })

        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: e.ispush == 0 ? '已放弃发布':'已放弃取消发布'
          // });
        });
      },


      downurlAll(e){

         var stoId = this.video[0].stoId;
           if(e===0 || e===''){
             this.video.forEach((item)=>{
               stoId = item.stoId;
               this.download(item.name,this.geturls +'?location='+ item.location+'&resourceId=' + item.resourceId + '&stoId=' + item.stoId)
             })
           }

          if(e === 1 || e === ''){
            for(var i = 0; i<this.blackboardsRes.length;i++){
              this.download(this.blackboardsRes[i].name,this.blackboardsRes[i].url+'?&stoId=' + stoId);
            }
          }

          if(e === 2 || e === ''){
            this.srtRes.forEach((item)=>{
              this.download(item.name,item.url+'?&stoId=' + item.stoId)
            })
          }

      },




      download(name, href) {
          var elemIF = document.createElement("iframe");
          elemIF.src = href;
          elemIF.style.display = "none";
          document.body.appendChild(elemIF);
          // var a = document.createElement("a"), //创建a标签
          // e = document.createEvent("MouseEvents"); //创建鼠标事件对象
          // e.initEvent("click", false, false); //初始化事件对象
          // a.href = href; //设置下载地址
          // a.target="_blank"
          // a.download = name ; //设置下载文件名
          // a.dispatchEvent(e); //给指定的元素，执行事件click事件
      },


      getdownurl (e) { // 纯录制获取视频地址
        let that = this
        this.axios({
          method: 'post',
          url: downurl,
          params: {
            params: {
              groupId: e.resourceId,
              streamType: that.type
            }
          }
        })
          .then(function (res) {

            if (res.status !== 200) {
              that.win(res.data.message, that.cancelfn, false)
            } else {
              that.video = res.data.data;
              that.srtRes = res.data.pic.srtRes
              that.blackboardsRes = res.data.pic.blackboardsRes
              that.centerDialogVisible = true;
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },


      handleSizeChange(val) {
        var that = this;
        this.table_pagesize = val;
        this.findtable();

      },


      openurl(e, uuid) {
        if (uuid == 5) {
          // http://localhost:8000/dist/index.html#/demand?lessonId=34161fa3ee16423a8e8de5277cab88d3&teacherId=57a7657d1d784bdf809375f1609a5b86
          // var url = 'Http://' + res.data.result["0"].deviceIp + ':' + res.data.result["0"].port +
          var url ='Http://' + window.location.host+'/dist/index.html#/microTeaching?lessonId=' + e.lessonId + '&teacherId=' + e.teacherId;
          window.open(url);
        }
        if (uuid == 6) {
          // http://localhost:8000/dist/report.html#/?lessonId=34161fa3ee16423a8e8de5277cab88d3&teacherId=57a7657d1d784bdf809375f1609a5b86
          // var url = 'Http://' + res.data.result["0"].deviceIp + ':' + res.data.result["0"].port +
          var url ='Http://' + window.location.host+'/dist/report.html#/microteachingReport?lessonId=' + e.lessonId + '&teacherId=' + e.teacherId;
          window.open(url);
        }

        // var that = this;
        // this.axios({
        //     method: 'post',
        //     url: getEquipments,
        //     params: {
        //       params: {
        //         classRoomId: e.classroomId,
        //         type: 14
        //       }
        //     }
        //   })
        //   .then(function(res) {

        //   })
        //   .catch(() => {

        //   });
      },

      //已废弃
      deleteMicroLesson(e) {
        var that = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.axios.post(deleteMicroLesson, {
              lessonIdList: [{
                lessonId: e.lessonId
              }]
            })
            .then(function(res) {
              if (res.data.code == 200) {
                that.$notify({
                  type: 'success',
                  title: res.data.message,
                  showClose: false,
                  duration: 1000,
                  position: 'bottom-right'
                });
                that.findtable();
              } else {
                that.$notify.error({
                  title: res.data.message,
                  showClose: false,
                  duration: 1000,
                  position: 'bottom-right'
                });
              }
            })
            .catch(() => {

            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },




      jisuan(e) {
        var time1 = new Date(e.startTime);
        var time2 = new Date(e.endTime);
        var dateDiff = time2.getTime() - time1.getTime();

        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数

        var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)
        var leave4 = leave3 % (60 * 1000) //计算分钟数后剩余的毫秒数
        var minseconds = Math.round(leave4 / 1000)

        var timeFn = (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (
          seconds < 10 ? '0' + seconds : seconds); //dayDiff+"天 "+
        return timeFn;

      },

      //查询表格
      findtable() {
        var that = this;
        var select_video = null;
        var select_publish = null;

        if (this.select_video == '片段') {
          select_video = 0;
        }

        if (this.select_video == '整课') {
          select_video = 1;
        }

        if (this.select_publish == '未发布') {
          select_publish = 0;
        }

        if (this.select_publish == '已发布') {
          select_publish = 1;
        }


        if (this.timeselectvalue == null) {
          this.timeselectvalue = []
        }
        this.axios({
            method: 'post',
            url: findMicroLesson,
            data: {
              "lessonId": '',
              "resourceType":'groupName',
              "classes": that.selectclasse,
              "microType": select_video,
              "courseId": that.selectcourse,
              "teacherId": that.teacher_name,
              "userName": that.student_name,
              "userCode": that.student_code,
              "startTime": that.timeselectvalue[0] == undefined ? '' : that.timeselectvalue[0],
              "endTime": that.timeselectvalue[1] == undefined ? '' : that.timeselectvalue[1],
              "ispush": select_publish,
              "pageSize": that.table_pagesize,
              "offset": that.table_pageindex
            }
          })

          .then(function(res) {
            that.data_list = res.data.data
            that.table_totalnum = res.data.total;

          })
          .catch(function(error) {
            console.log(error)
          })
      },


      //查询表格
      findtable2() {
        var that = this;
        var select_video = null;
        var select_publish = null;

        if (this.select_video == '片段') {
          select_video = 0;
        }

        if (this.select_video == '整课') {
          select_video = 1;
        }

        if (this.select_publish == '未发布') {
          select_publish = 0;
        }

        if (this.select_publish == '已发布') {
          select_publish = 1;
        }


        if (this.timeselectvalue == null) {
          this.timeselectvalue = []
        }
        this.axios({
            method: 'post',
            url: findMicroLesson,
            data: {
              "lessonId": '',
              "resourceType":'groupName',
              "classes": that.selectclasse,
              "microType": select_video,
              "courseId": that.selectcourse,
              "teacherId": that.teacher_name,
              "userName": that.student_name,
              "userCode": that.student_code,
              "startTime": that.timeselectvalue[0] == undefined ? '' : that.timeselectvalue[0],
              "endTime": that.timeselectvalue[1] == undefined ? '' : that.timeselectvalue[1],
              "ispush": select_publish,
              "pageSize": that.table_pagesize,
              "offset": 1
            }
          })

          .then(function(res) {
            that.data_list = res.data.data
            that.table_totalnum = res.data.total;
            that.table_pageindex = 1;
          })
          .catch(function(error) {
            console.log(error)
          })
      },



      //获取所有老师
      getCollegeAndTeachers() {
        let that = this
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


      selectradio3(e) {
        this.placeholder2 = '请输入' + e;
        if (e == "学生姓名") {
          this.student_code = '';
        } else {
          this.student_name = '';
        }
      },


      elmenuSelect(e) {
        this.activeIndex = e;

        if(e == '1'){
          this.pagepost({
            page: 1
          })
        }

        if (e == '2') {
          this.findAllCourses();
          this.findjiaoxueban();
          this.getCollegeAndTeachers();


          let power = this.$store.state.powerinfo['resource'];
          var arr = []
          for( var i in this.authority){
               for (var j = 0;j<power.length;j++) {
                 if(this.authority[i].code == power[j].operationCode){
                   this.authority[i].status = true;
                   arr.push(this.authority[i].label);
                 }

                 if(power[j].operationCode == 'micro_scanlist'){
                   this.micro_scanlist = true
                 }

               }
          }
          console.log('已经授权的:')
          console.log(arr);

          let user = this.$store.state.userinfo
          // -1  管理员  2 老师   3 学生
          if(user.roleType === -1){

          }else if(user.roleType == 2){
            if(this.authority.micro_managelist.status){

            }else{
              this.teacher_name = user.id;
              this.select_teacher_name = true;
            }


          }else if(user.roleType == 3){
            if(this.authority.micro_managelist.status){

            }else{
              this.select_radio3 = '学生学号';
              this.student_code = user.code;
              this.rideo_status = true;
              this.input_student_code = true;
            }


          }
          console.log('用户'+user.roleType);

          // console.log(this.authority);
          //最后查询表格
          this.findtable();
        }
      },

      //查询所以的课名以及课的代码
      findAllCourses() {
        var that = this;
        this.axios({
            method: 'get',
            url: findCoursesForMicroTeaching
          })
          .then(function(res) {
            that.courseLists = res.data;
          })
          .catch(function(error) {
            console.log(error)
          })
      },


      //查询教学班
      findjiaoxueban() {
        var that = this;
        this.axios.post(findClassesByType, {
            classesType: 1, //根据type
          })
          .then(function(response) {
            that.classes_options = response.data.result
          })
          .catch(function(error) {
            console.log(error);
          });
      },






      startfn(obj) {
        if (!this.valshow) {
          this.valshow = true
        } else {
          // this.dateval = obj.clearflag ? '' : this.formcat(obj)
          this.dateval = obj.clearflag ? '' : obj
          document.querySelector('#start').value = this.dateval
        }
      },
      formcat(obj) {
        return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
      },
      formcats(obj) {
        let objs = obj < 10 ? ('0' + obj) : obj
        return objs
      },
      downlevent(obj) {
        this.$router.push({
          name: 'AJresourcedown',
          params: {
            item: obj.item,
            type: 0
          }
        })
      },
      downhevent(obj) {
        this.$router.push({
          name: 'AJresourcedown',
          params: {
            item: obj,
            type: 1
          }
        })
      },
      searchevent() {
        this.pagepost({
          page: 1
        })
      },
      pagepost(obj) {

        this.pw = 0
        this.del = 0
        this.edit = 0
        this.dh = 0
        this.pub = 0
        if (this.$store.state.userinfo.userName === 'admin') {
          this.delbtn = 'display:block'
          this.activeIndex = '1';
          this.seelist = true;
          this.authority.micro_scanlist.status = true;
        } else {
          this.optevent = []
          this.optobjinfo = []
          let power = this.$store.state.powerinfo['resource']
          if (power.length !== 0) {
            for (let i = 0; i < power.length; i++) {
              //添加权限判断
              if(power[i].operationCode == 'seelist'){
                this.activeIndex = '1';
                this.seelist = true;
              }
              if(power[i].operationCode == 'micro_scanlist'){
                this.authority.micro_scanlist.status = true;
              }


              switch (power[i].operationCode) {
                case 'publish':
                  if (!this.pub) {
                    this.optevent.push(powerinfo.OPpublist)
                    this.optobjinfo.push(powerinfo.OpubN)
                  }
                  this.pub++
                  break
                case 'dellist':
                  if (!this.del) {
                    this.optevent.push(powerinfo.OPdlist)
                    this.optobjinfo.push(powerinfo.OdN)
                    this.delbtn = 'display:block'
                  }
                  this.del++
                  break
                case 'powerlist':
                  if (!this.pw) {
                    this.optevent.push(powerinfo.OPplist)
                    this.optobjinfo.push(powerinfo.OpN)
                  }
                  this.pw++
                  break
                case 'downlist':
                  if (!this.dh) {
                    this.optevent.push(powerinfo.OPdownllist)
                    this.optobjinfo.push(powerinfo.OdownN)
                  }
                  this.dh++
                  break
                case 'report':
                  if (!this.report) {
                    this.optevent.push(powerinfo.OPreportllist)
                    this.optobjinfo.push(powerinfo.OreportN)
                  }
                  this.report++
                  break
              }

            }

          }

        }
        this.pageval = obj.page
        let that = this
        let data = {
          pageSize: pagesize,
          offset: obj.page,
          classesId: that.classesId,
          teacherId: that.teacherId,
          isPublish: that.isPublish == "" ? null : that.isPublish,
          time: that.dateval,
          resourceFromWhere: that.resourceFromWhere == null ? "" : that.resourceFromWhere + ""
        }
        if (this.eduType) {
          data.collegeId = that.collegeId
        } else {
          data.studySectionId = that.studySectionId
        }
        this.axios({
            method: 'post',
            url: listurl,
            params: {
              params: data
            }
          })
          .then(function(res) {

            that.pageinfo = Math.ceil(res.data.result.total / pagesize)
            that.totalnum = res.data.result.total
            let temp = []
            let optobj = that.optobjinfo
            let objs = res.data.result.data
            for (let item = 0; item < objs.length; item++) {
              if (item < pagesize) {
                temp[item] = {}
                temp[item]['id'] = objs[item].resourceId
                temp[item]['downId'] = objs[item].resourceFromWhere * 1 ? objs[item].resourceId : objs[item].groupName
                temp[item]['name'] = objs[item].courseName
                temp[item]['lessonName'] = objs[item].lessonName
                temp[item]['lessonId'] = objs[item].lesson
                temp[item]['teacherName'] = objs[item].teacherName
                temp[item]['teacherId'] = objs[item].teacherId
                temp[item]['studySectionName'] = that.eduType ? objs[item].collegeName : objs[item].studySectionName
                temp[item]['subjectName'] = objs[item].subjectName
                temp[item]['classesName'] = objs[item].deptName
                temp[item]['time'] = objs[item].time
                temp[item]['isPublish'] = objs[item].isPublish ? warntxt.published : warntxt.unpublish
                temp[item]['groupId'] = objs[item].groupName
                if (objs[item].duration) {
                  temp[item]['state'] = that.state[2] + ',' + that.recordstate[1]
                  temp[item].opt = [...optobj]
                } else {
                  temp[item]['state'] = that.state[objs[item].recordStatus] + ',' + that.recordstate[0]
                  temp[item].opt = []
                }
                temp[item]['author'] = objs[item].realName
                temp[item]['time'] = objs[item].startTime
                temp[item]['isTranscribe'] = transcribeStatus[objs[item].recordStatus]
                temp[item]['type'] = transcribeType[objs[item].resourceFromWhere]
                temp[item]['resourceFromWhere'] = objs[item].resourceFromWhere * 1
                let num = temp[item].opt.indexOf(powerinfo.OreportN)
                if (temp[item]['resourceFromWhere'] !== 4 && num !== -1) {
                  temp[item].opt.splice(num, 1)
                }
                temp[item].selected = false
              }
            }

            that.products = temp
            that.bingos = []
            that.bingos[obj.page - 1] = 'selected'
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      async getcolleges() { // 高教院系专业
        try {
          const res = await this.axios.post(collegemajorurl)
          let objs = res.data
          let collegearr = []
          for (let item = 0; item < objs.length; item++) {
            collegearr[item] = {
              value: objs[item].collegeId,
              txt: objs[item].collegeName
            }
          }
          this.collegeId_options = collegearr;

          // let that = this
          // this.collegeobj = that.$Select({
          //   'data': collegearr,
          //   'selectId': 'select95',
          //   'callback': function (obj) {
          //     that.collegeId = obj.ind ? obj.value : ''
          //   }
          // })
        } catch (err) {
          console.log(err)
        }
      },
      getclasses() { // 班级
        let that = this
        this.axios({
            method: 'post',
            url: getclassesurl,
            data: {
              'studySectionId': that.studySectionId
            }
          })
          .then(function(res) {
            let temp = []
            let objs = res.data.classesList
            // temp.push({value: '', txt: '全部'})
            for (let item = 0; item < objs.length; item++) {
              temp[item] = {}
              temp[item]['value'] = objs[item].classesId
              temp[item]['txt'] = objs[item].classesName
            }
            that.classesId_options = temp;

            // that.$Select({
            //   'data': temp,
            //   'originS': 'multiple',
            //   'selectId': ['select82', 'select81'],
            //   'callback': function (obj) {
            //     that.classesId = obj.value
            //   }
            // })
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getgrades() { // 年级
        let that = this
        this.axios.post(getgradesurl)
          .then(function(res) {
            let temp = []
            let objs = res.data.data
            temp.push({
              value: -1,
              txt: '全部'
            })
            for (let item = 0; item < objs.length; item++) {
              temp[item + 1] = {}
              temp[item + 1]['value'] = objs[item].id
              temp[item + 1]['txt'] = objs[item].name
            }
            that.$Select({
              'data': temp,
              'selectId': 'select95',
              'callback': function(obj) {
                that.studySectionId = obj.ind ? obj.value : ''
                that.getclasses()
              },
              'matchval': [{
                val: -1
              }]
            })
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.name === 'AJresource') {
          this.pagepost({
            page: this.pageval
          })
        }
      }
    },
    created() {
      this.pagepost({
        page: 1
      })
      this.elmenuSelect('2');
    },
    mounted() {
      let that = this
      // this.$Select({
      //   'data': typeData,
      //   'selectId': 'select20',
      //   'callback': function (obj) {
      //     that.resourceFromWhere = obj.value
      //   }
      // })
      // this.$Select({
      //   'data': statusData,
      //   'originS': 'multiple',
      //   'selectId': ['select71', 'select70'],
      //   'callback': function (obj) {
      //     that.isPublish = obj.value
      //   }
      // })
      this.axios.post(usersByRolesurl, {
          roleType: 2
        })
        .then(function(res) {
          let temp = []
          let objs = res.data
          // temp[0] = {value: '-1', txt: '全部'}
          for (let item = 0; item < objs.length; item++) {
            temp[item] = {}
            temp[item]['value'] = objs[item].id
            temp[item]['txt'] = objs[item].realName
          }
          that.teacherId_options = temp;
          // that.$Select({
          //   'data': temp,
          //   'originS': 'multiple',
          //   'selectId': ['select85', 'select84'],
          //   'callback': function (obj) {
          //     that.teacherId = obj.ind ? obj.value : ''
          //   }
          // })
        })
      if (this.eduType) {
        this.getcolleges()
        this.getclasses()
      } else {
        this.getgrades()
      }

      this.pagepost({
        page: 1
      });
    }
  }
</script>

<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
      <router-view name="b"></router-view>
    </transition>
    <link rel="stylesheet" type="text/css" href="/static/css/default/Fcourse.css" />
    <link rel="stylesheet" type="text/css" href="/static/cklive/css/indexvideo.css"/>
    <Links></Links>

    <div class="center centerbottom50">
      <div class="centers1100">
        <div style="float: left;width: 100%;height: 50px;display: flex;align-items: center;">
          <span @click="opendetail({name:'Fcourse',activeName:'ct'})">课程中心 ></span>
          <span @click="opendetail({name:'Fcourse',activeName:'wg'})">微格教学课程 ></span>
          <span>{{select_item.gradeName}}&nbsp{{select_item.subjectName}}</span>
        </div>
        <div style="float: left;width: 100%;height: auto;display: flex;">
          <div style="float: left;width: 65%;height: 450px;background-color: #000000;position: relative;border: 1px solid #000000;">
            <!-- <div class="video" id="playerArealocal"></div> -->
            	<div class="video" id="playerArealocal" :channel="channel" :screens="screens" :info="info" style="position: relative;"></div>
              <div style=""></div>
          </div>
          <div style="float: left;width: 35%;height: 450px;border: 1px solid #3197fc;">
             <div style="width: 100%;height: 130px;border-bottom: 1px solid #3197fc;">
                <div style="float: left;width: 50%;height: 100%;">
                   <div style="width: 90%;margin-left: 5%;height: 100%;">
                      <span style="font-size: 16px;line-height: 40px;">{{select_item.gradeName}}&nbsp{{select_item.subjectName}}</span>
                   </div>
                </div>
                <div style="float: right;width: 50%;height: 100%;display: flex;align-items: center;justify-content: center;">
                  <img src="/static/images/Dcourse.jpg" style="width: 90%;height: auto;"/>
                </div>
             </div>

             <div style="width: 100%;height: auto;display: flex;justify-content: space-between;">
                <div style="width: 100%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">当前选中的章节信息:</span>
                </div>

             </div>
             <div style="width: 100%;height: auto;display: flex;justify-content: space-between;font-size: 13px;">
                <div style="width: 30%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">章节名:</span>
                </div>
                <div style="width: 70%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">{{select_item.lessonName}}</span>
                </div>
             </div>
             <div style="width: 100%;height: auto;display: flex;justify-content: space-between;font-size: 13px;">
                <div style="width: 30%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">教师:</span>
                </div>
                <div style="width: 70%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">{{select_item.realName}}</span>
                </div>
             </div>
             <div style="width: 100%;height: auto;display: flex;justify-content: space-between;font-size: 13px;">
                <div style="width: 30%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">从属课程:</span>
                </div>
                <div style="width: 70%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">{{select_item.courseName}}</span>
                </div>
             </div>
             <div style="width: 100%;height: auto;display: flex;justify-content: space-between;font-size: 13px;">
                <div style="width: 30%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">课程开始时间:</span>
                </div>
                <div style="width: 70%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">{{select_item.startTime}}</span>
                </div>
             </div>

             <div style="width: 100%;height: auto;display: flex;justify-content: space-between;font-size: 13px;">
                <div style="width: 30%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">课程结束时间:</span>
                </div>
                <div style="width: 70%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">{{select_item.endTime}}</span>
                </div>
             </div>

             <div style="width: 100%;height: auto;display: flex;justify-content: space-between;font-size: 13px;">
                <div style="width: 30%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">课程时长:</span>
                </div>
                <div style="width: 70%;height: 40px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;">{{jisuan(select_item)}}</span>
                </div>
             </div>

          </div>
        </div>
        <div style="float: left;width: 100%;height: auto;border: 1px solid #3197fc;margin-top: 20px;margin-bottom: 50px;">
           <!-- <div style="width: 100%;height: 40px;display: flex;align-items: center;border-bottom: 1px solid #3197fc;">
              <span style="margin-left: 20px;">章节目录</span>
            </div> -->
            <div style="width: 100%;height: 300px;overflow: auto;">
              <!-- <div v-for="item in course_list" class="course_item" style="width: 100%;height: 50px;display: flex;align-items: center;">
                  <span style="margin-left: 20px;width: 35%;">{{item.lessonName}} {{item.realName}}</span>
                 <div style="width: 20%;height: 100%;display: flex;align-items: center;justify-content: center;">
                   <span style="margin-left: 20px;">{{item.courseName}}</span>
                 </div>
                 <div style="width: 20%;height: 100%;display: flex;align-items: center;justify-content: center;">
                   <span style="margin-left: 20px;">{{item.microType == 0 ? '片段':'整课'}}</span>
                 </div>
                 <div style="width: 25%;height: 100%;display: flex;align-items: center;justify-content: center;">
                   <span style="margin-left: 20px;">{{item.microType == 0 ? '片段':'整课'}}</span>
                 </div>
              </div> -->
              <el-table
                    :data="course_list" :border="false" :header-cell-style="{textAlign:'center'}"  ref="singleTable"
                     @row-click="row_click" :cell-style="{'text-align': 'center'}"  highlight-current-row
                    style="width: 100%;font-size: 13px;">
                    <el-table-column
                      prop="lessonName"
                      label="章节目录"
                      width="380">
                      <template slot-scope="scope">
                         <!-- {{scope.row.lessonName}}_{{scope.row.realName}} -->
                         <span>{{scope.row.classroomName}}_{{scope.row.realName}}_{{scope.row.startTime}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="courseName"
                      label="从属课程"
                      width="230">
                    </el-table-column>
                    <el-table-column
                      prop="microType"
                      label="视频类型"
                      width="150">
                      <template slot-scope="scope">
                         <span>{{scope.row.microType == 0 ? '片段':'整课'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="startTime"
                      label="时长"
                      width="150">
                      <template slot-scope="scope">
                        <div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
                          <img src="../../../static/images/video.png" style="width: 15px;" />
                          <span style="margin-left: 10px;">{{jisuan(scope.row)}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label="操作">
                      <template slot-scope="scope">
                        <el-button @click.stop="getdownurl(scope.row)" type="text" size="small">下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

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
      <el-tabs v-model="activeName" style="margin-bottom: 50px;">
          <el-tab-pane label="视频文件" name="video">
            <a v-for="item in video" :href="geturls +'?location='+ item.location+'&resourceId=' + item.resourceId + '&stoId=' + item.stoId" target="_blank" style="margin-right: 20px;line-height: 30px;text-decoration: underline;">{{item.name}}</a>
            <div style="width: 100%;height: 50px;display: flex;align-items: center;justify-content: center;">
              <el-button type="primary" style="" icon="el-icon-download"  @click="downurlAll(0)">下载本页</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="板书" name="blackboardsRes">
            <a v-for="item in blackboardsRes" :href="item.url +'?&stoId=' + video[0].stoId"  style="margin-right: 20px;line-height: 30px;text-decoration: underline;">{{item.name}}</a>
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
  import Ghead from '@/components/common/Homeheader'
  import Gfoot from '@/components/common/footer'
  import Links from '@/module/home/link'
  import page from '@/components/extend/page'
  import * as types from '@/store/win-types'
  import {
    getMicroLessons,
    addMicroPushClicks
  } from '@/module/admin/config/highteaching'
  import {playurl,downurl,geturl} from '@/module/admin/config/resourceinfo'
  export default {
    name: 'Fmicrovideo',
    data() {
      return {
        activeName: 'video',
        centerDialogVisible:false,
        select_item :[],
        course_list:[],
        course:{},
        geturls:geturl,
        screens:null,
        info:{},
        channel:[],
        video:[],
        blackboardsRes:[],
        srtRes:null

      }
    },
    created() {
      var course = this.$route.query
      this.course = course;
      this.addMicroPushClicks(course);
      this.getMicroLessons(course);
    },

    components: {
      Ghead,
      Gfoot,
      Links,
      page
    },
    methods: {

      name_chenge(e){
        var lesson_name = e.lessonName.split('-')
        return

      },

      opendetail(e) {
        this.$router.push({
          name: e.name,
          query: {
            activeName: e.activeName,
            select_acitv:this.course.select_acitv,
            select_subject:this.course.select_subject,
            select_grade:this.course.select_grade
          }
        })
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

      row_click(e){
        this.select_item = e;
        this.getplayurl();
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
          // // a.target="_blank"
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
              groupId: e.resourceId
            }
          }
        })
          .then(function (res) {
            if (res.status !== 200) {

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


      getplayurl () {
            let that = this
            this.axios({
              method: 'post',
              url: playurl,
              params: {
                params: {
                  groupId: that.select_item.resourceId
                }
              }
            })
            .then(function (res) {

              if (res.data.code !== 200) {

              } else {
                that.infos = {}
                that.infos.id = 'playerArealocal'
                that.infos.channeltitle = []
                that.infos.model = []
                that.infos.mainfile = [0, 0]
                that.infos.channel = []
                that.infos.channelB = []
                that.infos.channelS = []
                that.infos.widhei = {}
                that.infos['autoplay'] = true
                that.infos.widhei.wid = 713
                that.infos.knowledge = []
                let objs = res.data.result
                for (let m = 0; m < objs.mainPathList.length; m++) {
                  that.infos.channeltitle[m] = objs.mainPathList[m].name
                  that.infos.channel[m] = objs.mainPathList[m].location
      //          that.infos.channel[m] = 'http://img.ksbbs.com/asset/Mon_1605/25d705200a4eab4.mp4'
                }
                for (let m = 0; m < objs.subPathList.length; m++) {
                  that.infos.channeltitle[m] = objs.subPathList[m].name
                  that.infos.channelB[m] = objs.subPathList[m].location
      //          that.infos.channelB[m] = 'http://img.ksbbs.com/asset/Mon_1605/25d705200a4eab4.mp4'
                }
                if (objs.mainPathList.length > 0 && objs.subPathList.length <= 0) {
                  that.infos.model[0] = '高清'
                  that.infos.channelnum = objs.mainPathList.length
                }
                if (objs.mainPathList.length <= 0 && objs.subPathList.length > 0) {
                  that.infos.model[0] = '标清'
                  that.infos.channelnum = objs.subPathList.length
                }
                if (objs.subPathList.length > 0 && objs.mainPathList.length > 0) {
                  that.infos.model[0] = '标清'
                  that.infos.model[1] = '高清'
                  if (!that.infos.channelnum) {
                    that.infos.channelnum = objs.subPathList.length || objs.subPathList.length
                  }
                }
                if (that.infos.channeltitle.length <= 0) {
                  that.win(warntxt.nodata, that.cancelfn, false)
                } else {
                  that.$Video(that.infos)
                }
              }
            })
            .catch(function (error) {
              console.log(error)
            })
          },




      getMicroLessons(e) {
        var that = this;
        this.axios({
            method: 'post',
            url: getMicroLessons,
            data: {
              gradeId: e.gradeId,
              subjectId: e.subjectId
            }
          })
          .then(function(res) {
            that.select_item = res.data.data[0]
            that.$refs.singleTable.setCurrentRow(res.data.data[0]);
            that.course_list = res.data.data
            that.getplayurl();
          })
          .catch(function(error) {
            console.log(error)
          })
      },

      addMicroPushClicks(e) {
        var that = this;
        this.axios({
            method: 'post',
            url: addMicroPushClicks,
            data: {
              gradeId: e.gradeId,
              subjectId: e.subjectId
            }
          })
          .then(function(res) {

          })
      }


    }
  }
</script>


<style>
 .course_item:hover{
   background-color: #008DCF;
   color: #FFFFFF;
 }

 .video{
   position: absolute !important;
   width: 100% !important;
   height: 100% !important;
 }

</style>

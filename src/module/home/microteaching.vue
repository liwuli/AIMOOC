<template>
  <div class="app">
    <Fhead v-show="isFast"></Fhead>
    <Ghead v-show="!isFast"></Ghead>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Links v-show="!isFast"></Links>
    <div style="float: left; width: 100%;height: 70px;border-bottom: 1px solid #f4f4f4;">
      <div style="float: left;width: 65%;height: 100%;display: flex;align-items: center;justify-content: center; position: relative;">
        <span style="font-size:30px" :style="{color: is_recoding ? 'red':'#88d904'}">{{time}}</span>
        <span style="font-size:30px;margin-left: 30px;" :style="{color: is_recoding ? 'red':'#88d904'}">{{is_recoding ? '正在上课': '准备上课'}}</span>
      </div>
      <div style="float: right; width: 350px;height: 100%;">
        <span style="float: left;margin-left: 15px; font-size: 14px;line-height: 70px;">当前教室:</span>
        <!--  -->
        <el-select v-model="select_classid" filterable placeholder="请选择教室" size="small" :popper-class="'el_selects_css'" :disabled="is_recoding"
          style="float:left;margin-top: 19px;margin-left: 20px;" @change="select_classroom">
          <el-option v-for="item in class_list" :key="item.classroomId" :label="item.classroomName" :value="item.classroomId">
          </el-option>
        </el-select>
      </div>
    </div>
    <div style="float: left; width: 100%;">
      <div style="float: left; width: calc(65% - 1px);height: 700px;border-right: 1px solid #f4f4f4;overflow: hidden;">
        <div id="video1" style="position: relative; float: left; width: 80%;height: 100%;margin-left: 10%;">
          <Detail style="margin-top:10px" :screens="screens" :title="title" :channel="channel" :info='info'></Detail>
        </div>
      </div>

      <div style="float: left; width: 35%;height: 700px;" v-loading="loading" element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">

        <div style="width: 100%;height: 60px;display: flex;align-items: center;">
          <span style="float: left; font-size: 14px;margin-left: 30px;">学生学号:</span>
          <el-input style="float: left; width: 200px;margin-left: 20px;" placeholder="请输入学号" v-model="studentcode"
            :disabled="(select_classid=='' || is_recoding)" clearable>
          </el-input>
          <el-button v-if="!is_recoding" v-show="select_classid!=''" type="primary" style="margin-left: 30px;" icon="el-icon-search" @click="microTeachingInfo">搜索</el-button>
        </div>
        <div v-show="!select_status" style="width: 100%;height: 40px;font-size: 14px;">
          <span style="line-height: 40px;color: #7f7f7f;margin-left: 30px;">学生姓名: {{user_list.realName}}</span>
        </div>

        <div>
          <div style="width: 100%;height: 50px;font-size: 14px;display: flex;align-items: center;padding-bottom:10px; border-bottom: 1px solid #f4f4f4;">
            <span style="margin-left: 30px; margin-right: 20px;">所属课程:</span>
            <el-select v-model="select_courseId" filterable placeholder="请选择课程" :disabled="select_status" size="small"
              :popper-class="'el_selects_css'" @change="course_change">
              <el-option v-for="item in teachingCourses" :key="item.courseId" :label="item.courseName + '('+item.courseCode + ')'" :value="item.courseId">
              </el-option>
            </el-select>
          </div>
          <div style="width: 100%;height: 70px;font-size: 14px;display: flex;align-items: center;border-bottom: 1px solid #f4f4f4;">
            <span style="margin-left: 30px; margin-right: 20px;">目标学科:</span>
            <el-select v-model="select_subjectId" filterable placeholder="请选择学科" :disabled="select_status" size="small"
              :popper-class="'el_selects_css'">
              <el-option v-for="item in microSubjects" :key="item.subjectId" :label="item.subjectName" :value="item.subjectId">
              </el-option>
            </el-select>
          </div>

          <div style="width: 100%;height: 70px;font-size: 14px;display: flex;align-items: center;border-bottom: 1px solid #f4f4f4;">
            <span style="margin-left: 30px; margin-right: 20px;">目标年级:</span>
            <el-select v-model="select_gradeId" filterable placeholder="请选择年级" :disabled="select_status" size="small"
              :popper-class="'el_selects_css'">
              <el-option v-for="item in grades" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId">
              </el-option>
            </el-select>
          </div>

          <div style="width: 100%;height: 70px;font-size: 14px;display: flex;align-items: center;border-bottom: 1px solid #f4f4f4;">
            <span style="margin-left: 30px; margin-right: 20px;">课程类型:</span>
            <el-radio-group v-model="select_type" :disabled="select_status">
              <el-radio-button label="整课"></el-radio-button>
              <el-radio-button label="片段"></el-radio-button>
            </el-radio-group>
          </div>

          <div style="width: 100%;height: 70px;font-size: 14px;display: flex;align-items: center;border-bottom: 1px solid #f4f4f4;">
            <span style="margin-left: 30px; margin-right: 20px;">结束时间:</span>
            <el-time-picker :disabled="select_status" :clearable="false" value-format="HH:m:s" v-model="end_time" @change="time_change"
              placeholder="请选择结束时间">
            </el-time-picker>
            <span style="margin-left:10px;color:#7f7f7f;">(可不填)</span>
          </div>

          <div style="width: 100%;height: 70px;font-size: 14px;display: flex;align-items: center;border-bottom: 1px solid #f4f4f4;">
            <span style="margin-left: 30px;margin-right: 20px;line-height: 70px;">授课章节:</span>
            <el-input style="width: 300px;height: 32px;" :disabled="select_status" placeholder="默认名称为教室名称+开始时间" v-model="chapter" clearable>
            </el-input>
            <span style="margin-left:10px;color:#7f7f7f;">(可不填)</span>
          </div>

          <div v-show="!is_recoding" style="100%;height: 100px;margin-top: 30px;">
            <div @click="ckeckall" class="start1" style="width: 100px;height: 100px;border-radius: 50%;background-color: #88d904;margin-left: 200px;font-size: 20px;">
              <div style="width: 100%;height: 50px;display: flex;align-items: flex-end; justify-content: center;color: #ffffff;">
                开始
              </div>
              <div style="width: 100%;height: 50px;display: flex;justify-content: center;color: #ffffff;">
                上课
              </div>
            </div>
          </div>

          <div v-show="is_recoding" style="100%;height: 100px;margin-top: 30px;">
            <div @click="stopMicroLesson" class="start1" style="width: 100px;height: 100px;border-radius: 50%;background-color: red;margin-left: 200px;font-size: 20px;">
              <div style="width: 100%;height: 100px;display: flex;justify-content: center;color: #ffffff;align-items: center;">
                下课
              </div>
            </div>
          </div>

        </div>

      </div>


    </div>
  </div>
</template>

<script>
  import Fhead from '@/components/common/Fastheader'
  import Ghead from '@/components/common/Homeheader'
  import Gfoot from '@/components/common/footer'
  import Links from '@/module/home/link'
  import Detail from '@/components/extend/microgrid'
  import {
    getMicroClassrooms,
    microTeachingInfo,
    getLoopByClassRoomId,
    addMicroLesson,
    findMicroLesson,
    stopMicroLesson
  } from '@/module/home/config/microteaching'
  export default {
    name: 'microteaching',
    data() {
      return {
        classroomName:'', //教室名称
        select_classid: null,  //当前选择的微格教室
        class_list: [],    //微格所有教室集合
        loading: false, //loading加载
        studentcode: '',    //学生输入的学号
        select_status: true,  //选择框是否禁止选择  true 是开启  false是关闭
        select_courseId: '', //选择的课程
        classesId: '', //班级id
        teachingCourses: [], //根据学号查询的所有课程
        select_subjectId: '', //选择的学科
        microSubjects: [], //根据学号查询所有学科
        select_gradeId: '', //选择的年级
        grades: [], //根据学号查询的所有年级
        select_type: '整课', //录制课程类型
        user_list: {}, //用户对象集合
        end_time: '23:59:59',  //默认录制时间
        chapter: '', //章节

        is_recoding: false, //是否正在录制

        lessonId: '', //开始上课成功  后端返回的章节id
        title: [],  // 视频标题
        channel: [],  //视频单个的对象
        info: [],     //视频的所有rtmp流 地址
        screens: '',   //全屏功能

        time_Interval: null, // 初始化页面  更新当前时间  计时器
        time_Interval2: null, //轮巡 调用接口判断是否 录制了 计时器  0未开始录制,1正在录制,2已结束,3录制失败,4录制成功,5已上传
        time_Interval3: null, //开始上课 00:00:22 计时器
        time_Interval4: null, //轮巡 调用接口判断是否结束 计时器 0未开始录制,1正在录制,2已结束,3录制失败,4录制成功,5已上传
        time_Interval5:null, // 自动结束课程 倒计时
        time_Interval6:null, // 轮询 课程状态 方式 后端异常  C端重启
        time: null,

        isFast:false  //根据路由 屏蔽页面部分功能的
      }
    },
    components: {
      Ghead,
      Fhead,
      Gfoot,
      Links,
      Detail
    },
    created() {
      var url = this.$route.path
      //获取当前路由 根据名称 判断 是否是快捷方式 进来的  如果是快捷方式进来的  屏蔽 上面的操作栏 和登录 按钮
      //Fmicroteaching是从首页进来的  不需要屏蔽  Kmicroteaching是学生点击快捷方式进来的 需要屏蔽
      if(url == '/Kmicroteaching'){
          this.isFast = true;
      }

      // var select_classroom = JSON.parse(localStorage.getItem("select_classroom"));
      // this.select_classid = select_classroom == null ? '' : select_classroom;
      // if (select_classroom != null) {
      //   //如果 缓存 里面有教室 就去根据教室查询
      //   this.getLoopByClassRoomId(select_classroom);
      // }
      this.getMicroClassrooms();
    },

    methods: {

      time_change(){

      },


      get_Lesson_status() {
        var that = this;
        that.time_Interval6 = setTimeout(() => {
            this.axios.post(findMicroLesson, {
                "lessonId": that.lessonId,
                "endTime": that.select_end_time
              })
              .then(function(res) {
                if (res.data.code == 200 && res.data.data.length > 0) {
                  // 3异常 4录制完成 5传输中
                  if (res.data.data[0].recording == 3 || res.data.data[0].recording == 4 || res.data.data[0].recording == 5) {
                      //清楚开始录制计时器
                      if (that.time_Interval3) {
                        clearInterval(that.time_Interval3);
                      }

                      //清除定时 结束课程 计时器
                      if (that.time_Interval5) {
                        clearInterval(that.time_Interval5);
                      }

                      //清除当前请求计时器
                      if (that.time_Interval6) {
                        clearInterval(that.time_Interval6);
                      }
                      //开始计时
                      that.update_time();
                      //修改页面状态
                      that.chapter='';
                      that.is_recoding = false;
                      that.select_status = true;
                      that.loading = false;


                      if(res.data.data[0].recording == 3 ){
                          that.$notify.error({
                              title: '系统提示',
                              duration: 0,
                              position: 'bottom-right',
                              message:'当前录制的课程异常!,已停止录制!'
                            });
                      }

                      if(res.data.data[0].recording == 4 ){
                         that.$notify({
                             title: '系统提示',
                             type: 'warning',
                             duration: 0,
                             position: 'bottom-right',
                             message:'当前录制的课程已录制完成!'
                           });
                       }

                      if(res.data.data[0].recording == 5 ){
                         that.$notify({
                             title: '系统提示',
                             type: 'warning',
                             duration: 0,
                             position: 'bottom-right',
                             message:'当前录制的课程资源已传输完成!'
                           });
                      }

                  }else{
                    //如果收到回复 并且状态 不对  继续重复调用  防止接口阻塞  收到回复 才进行下一次请求
                    that.get_Lesson_status();
                  }
                }
              })
              .catch(() => {
                that.$notify.error({
                  title: '系统错误!',
                  showClose: false,
                  duration: 1000,
                  position: 'bottom-right'
                });
              });
        }, 30000)


      },




      time_out(e){
         var that = this;
         this.time_Interval5 = setTimeout(() => {
            //清除 计时器
            if (that.time_Interval3) {
              clearInterval(that.time_Interval3);
            }

            //线程启动  自动杀死 多余的请求的线程  防止多次执行
            if (that.time_Interval2) {
              clearInterval(that.time_Interval2);
            }

            if (that.time_Interval4) {
              clearInterval(that.time_Interval4);
            }
            //启动页面初始化计时器
            that.update_time();
            that.is_recoding = false;
            that.select_status = true;
            that.loading = false;
            that.showtotas('下课成功！')
         }, e)
      },


      //课程选择 触发事件
      course_change(e) {
        for (var i = 0; i < this.teachingCourses.length; i++) {
          if (e == this.teachingCourses[i].courseId) {
            this.classesId = this.teachingCourses[i].classesId
          }
        }
      },

      //开始后就计时
      update_time() {
        var that = this;
        that.time_Interval = setInterval(() => {
            //防止2个计时器 冲突  在当前计时器 启动的时候 销毁 开始录制计时器
            if (that.time_Interval3) {
              clearInterval(that.time_Interval3);
            }
            var myDate = new Date(); //实例一个时间对象；
            var hours = myDate.getHours(); //获取系统时，
            var min = myDate.getMinutes(); //分
            var second = myDate.getSeconds(); //秒
            that.time = hours + ':' + (min < 10 ? '0' + min : min) + ':' + (second < 10 ? '0' + second : second);
            console.log('开始更新时间:'+that.time);
        }, 1000)
      },

      //从 0秒开始计时
      start_time(t1) {
        var that = this;
        that.time_Interval3 = setInterval(() => {

        //清除原来的时间
        if (that.time_Interval) {
          clearInterval(that.time_Interval);
        }
        //线程启动  自动杀死 多余的请求的线程  防止多次执行
        if (that.time_Interval2) {
          clearInterval(that.time_Interval2);
        }

        var time1 = new Date(t1);
        var time2 = new Date();
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
        console.log('已录制时间:'+timeFn)
        that.time = timeFn;
       }, 1000)
      },

      ckeckall() {
        if (this.select_courseId == '') {
          this.showtotas('请选择课程!')
          return;
        }

        if (this.select_subjectId == '') {
          this.showtotas('请选择学科!')
          return;
        }

        if (this.select_gradeId == '') {
          this.showtotas('请选择年级!')
          return;
        }

        if (this.end_time != '') {
          var myDate = new Date(); //实例一个时间对象；
          var year = myDate.getFullYear(); //获取完整的年份(4位,1970-???)
          var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
          var date = myDate.getDate(); //获取当前日(1-31)
          var str = year + '-' + month + '-' + date + ' ' + this.end_time;
          var time2 = new Date(str);
          if (time2.getTime() <= myDate.getTime()) {
            this.showtotas('课程结束时间小于当前时间!')
            return;
          } else {
            this.select_end_time = str;
          }
        }
        this.addMicroLesson();
      },

      showtotas(message) {
        this.$notify({
          type: 'warning',
          title: message,
          showClose: false,
          duration: 1000,
          position: 'bottom-right'
        });
      },


      //下课
      stopMicroLesson() {
        var that = this;

        this.$confirm('课程已完成录制，是否保存？', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '保存',
            cancelButtonText: '不保存'
          })

          .then(() => {

            //清除 守护进程
            if (that.time_Interval6) {
              clearInterval(that.time_Interval6);
            }

            that.loading = true;
            that.axios.post(stopMicroLesson, {
                "classroomId": that.select_classid,
                "lessonId": that.lessonId,
                "saveType": 1
              })
              .then(function(res) {
                if (res.data.code == 200) {
                  //轮训 调接口 判断是否 是否结束
                  // that.time_Interval4 = setInterval(() => {
                    that.findMicroLesson_status();
                  // }, 1000)

                } else {
                  that.loading = false;
                  that.$notify.error({
                    title: res.data.message,
                    showClose: false,
                    duration: 1000,
                    position: 'bottom-right'
                  });
                }
              })
              .catch(() => {

              })
          })
          .catch(action => {
            if (action === 'cancel') {
              //清除 守护进程
              if (that.time_Interval6) {
                clearInterval(that.time_Interval6);
              }
              //这是点击了不保存
              that.loading = true;
              that.axios.post(stopMicroLesson, {
                  "classroomId": that.select_classid,
                  "lessonId": that.lessonId,
                  "saveType": 0
                })
                .then(function(res) {
                  if (res.data.code == 200) {
                    //清除 计时器
                    if (that.time_Interval3) {
                      clearInterval(that.time_Interval3);
                    }
                    if (that.time_Interval4) {
                      clearInterval(that.time_Interval4);
                    }
                    //开始计时
                    that.update_time();

                    that.chapter=''
                    that.is_recoding = false;
                    that.select_status = true;
                    that.loading = false;
                    that.end_time = "23:59:59"
                    that.select_type = '整课'
                    that.select_courseId = ''
                    that.select_subjectId = ''
                    that.select_gradeId = ''
                    that.classesId = ''

                    that.showtotas('下课成功！')

                  } else {
                    // 下课 报错
                    that.loading = false;
                    that.$notify.error({
                      title: res.data.message,
                      showClose: false,
                      duration: 1000,
                      position: 'bottom-right'
                    });
                  }
                })
                .catch(() => {

                })
            } else {
              //点击x
            }
          });
      },

      findMicroLesson_status() {
        var that = this;
        that.time_Interval4 = setTimeout(() => {
            this.axios.post(findMicroLesson, {
                "lessonId": that.lessonId,
                "endTime": that.select_end_time
              })
              .then(function(res) {
                if (res.data.code == 200 && res.data.data.length > 0) {
                  if (res.data.data[0].recording == 4) {
                      //清楚开始录制计时器
                      if (that.time_Interval3) {
                        clearInterval(that.time_Interval3);
                      }
                      //清除当前请求计时器
                      if (that.time_Interval4) {
                        clearInterval(that.time_Interval4);
                      }
                      //开始计时
                      that.update_time();
                      //修改页面状态
                       that.chapter=''
                       that.is_recoding = false;
                       that.select_status = true;
                       that.loading = false;
                       that.end_time = "23:59:59"
                       that.select_type = '整课'
                       that.select_courseId = ''
                       that.select_subjectId = ''
                       that.select_gradeId = ''
                       that.classesId = ''
                       that.showtotas('下课成功！')


                  }else{
                    //如果收到回复 并且状态 不对  继续重复调用  防止接口阻塞  收到回复 才进行下一次请求
                    that.findMicroLesson_status();
                  }
                }
              })
              .catch(() => {
                that.$notify.error({
                  title: '系统错误!',
                  showClose: false,
                  duration: 1000,
                  position: 'bottom-right'
                });
              });
        }, 1000)


      },



      //开始上课
      addMicroLesson() {
        var that = this;
        this.loading = true;
        //如果用户没有填写章节名称  默认的章节名称 为教室名 +  当时实际 年月日
        if(that.chapter == ''){
            var myDate = new Date(); //实例一个时间对象；
            var year = myDate.getFullYear(); //获取完整的年份(4位,1970-???)
            var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            var date = myDate.getDate(); //获取当前日(1-31)

            var hours = myDate.getHours(); //获取系统时，
            var minutes = myDate.getMinutes(); //分
            var seconds = myDate.getSeconds(); //秒
            var date_time =  year + '年' + month + '月' + date + '-' + (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (
              seconds < 10 ? '0' + seconds : seconds);
            that.chapter = that.classroomName + '-' + date_time;
        }


        this.axios.post(addMicroLesson, {
            "userCode": that.user_list.code,
            "classroomId": that.select_classid,
            "microType": that.select_type == '片段' ? 0 : 1,
            "subjectId": that.select_subjectId,
            "gradeId": that.select_gradeId,
            "endTime": that.select_end_time,
            "lessonName": that.chapter,
            "courseId": that.select_courseId,
            "classesId": that.classesId
          })
          .then(function(res) {
            if (res.data.code == 200) {
              that.lessonId = res.data.lesson.lessonId;
              that.findMicroLesson();
            } else {
              that.loading = false;
              that.$notify.error({
                type: 'success',
                title: res.data.message,
                showClose: false,
                duration: 1000,
                position: 'bottom-right'
              });
            }

          })
          .catch(() => {
            that.$notify.error({
              title: '系统错误!',
              showClose: false,
              duration: 1000,
              position: 'bottom-right'
            });
          });

      },

      //查询开始录制后的 章节状态 根据状态 来判断是否已经开始录制
      findMicroLesson() {
        var that = this;
        that.time_Interval2 = setTimeout(() => {
          that.axios.post(findMicroLesson, {
              "lessonId": that.lessonId,
              "endTime": that.select_end_time
            })
            .then(function(res) {
              if (res.data.code == 200 && res.data.data.length > 0) {
                if (res.data.data[0].recording == 1) {
                  if (that.time_Interval2) {
                    clearInterval(that.time_Interval2);
                  }
                  if (that.time_Interval) {
                    clearInterval(that.time_Interval);
                  }

                  //修改 按钮状态
                  that.is_recoding = true;
                  that.select_status = true;
                  // var myDate = new Date(); //实例一个时间对象；
                  // var year = myDate.getFullYear(); //获取完整的年份(4位,1970-???)
                  // var Month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
                  // var date = myDate.getDate(); //获取当前日(1-31)
                  // var hours = myDate.getHours(); //获取系统时，
                  // var minutes = myDate.getMinutes(); //分
                  // var seconds = myDate.getSeconds(); //秒
                  // that.start_recoding = year + '-' + Month + '-' + date + ' ' + (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (
                  // seconds < 10 ? '0' + seconds : seconds)
                  var t1 = new Date(res.data.data[0].startTime).getTime();
                  var t2 = new Date(res.data.data[0].endTime).getTime();
                  var t3 = parseInt(t2 - t1);
                  that.start_recoding = res.data.data[0].startTime

                  that.time_out(t3);
                  that.start_time(that.start_recoding);
                  that.loading = false;
                  //启动守护线程  实时监听 课程状态
                  that.get_Lesson_status();


                  that.$notify({
                    type: 'success',
                    title: '开始录制',
                    showClose: false,
                    duration: 1000,
                    position: 'bottom-right'
                  });
                } else if (res.data.data[0].recording == 3) {
                  if (that.time_Interval2) {
                    clearInterval(that.time_Interval2);
                  }
                  that.loading = false;
                  that.$notify.error({
                    title: '录制失败',
                    showClose: false,
                    duration: 1000,
                    position: 'bottom-right'
                  });
                } else {
                  //防止重复调用
                  that.findMicroLesson();
                  console.log("继续获取录制状态");
                }
              }
            })
            .catch(() => {
              that.$notify.error({
                title: '查询出错!',
                showClose: false,
                duration: 1000,
                position: 'bottom-right'
              });
            });
        }, 1000)

      },


      //选择教室的触发事件
      select_classroom(e) {
        localStorage.setItem("select_classroom", JSON.stringify(e));
        this.select_classid = e;
        this.getLoopByClassRoomId(e);
      },

      //根据教室id查询rtmp流
      getLoopByClassRoomId(e) {
        var that = this;
        this.axios({
            method: 'post',
            url: getLoopByClassRoomId,
            params: {
              'par': {
                classRoomId: e
              }
            }
          })
          .then(function(res) {
            var title = [];
            var info = [];
            that.classroomName = res.data.roomInfo.classroomName;

            //每次查询都销毁页面所有计时器  防止 用户切换 教室 和 计时器 重复调用

            if (that.time_Interval) {
              clearInterval(that.time_Interval);
            }

            if (that.time_Interval2) {
              clearInterval(that.time_Interval2);
            }

            if (that.time_Interval3) {
              clearInterval(that.time_Interval3);
            }

            if (that.time_Interval4) {
              clearInterval(that.time_Interval4);
            }

            if (that.time_Interval5) {
              clearInterval(that.time_Interval5);
            }

            if (that.time_Interval6) {
              clearInterval(that.time_Interval6);
            }

            if (res.data.urlList.length > 0) {
              //按照指定规则排序 5是老师全局  2是ppt
              var objs = []
              res.data.urlList.sort(function(a,b){
                  // order是规则  res.data.urlList是需要排序的数组
                  var guize = [5,2];  //下面是注释
                  return guize.indexOf(a.target) - guize.indexOf(b.target);
              });
              // 根据规则排序后新的数组
               res.data.urlList.map(function(a){
                 title.push(a.channelName);
                 info.push(a.url);
                 // objs.push(a);
              });
            }
            that.title = title,
            that.channel = res.data.urlList,
            that.info = info;


            //根据返回的lesson判断是否正在录制
            if (res.data.lesson.length > 0) {
              if (res.data.lesson[0].recording == 1) {

                that.studentcode = res.data.lesson[0].userCode;
                that.microTeachingInfo();

                  that.user_list.realName = res.data.lesson[0].userName //学生名
                  that.user_list.code = res.data.lesson[0].userCode // 学号
                  that.select_type = res.data.lesson[0].microType == 0 ? '片段' : '整课'
                  that.select_subjectId = res.data.lesson[0].subjectId  //学科id
                  that.select_gradeId = res.data.lesson[0].gradeId  //年级 id
                  that.select_end_time = res.data.lesson[0].endTime.split(" ")[1] //选择的录制结束时间
                  that.chapter = res.data.lesson[0].lessonName  //章节名称
                  that.select_courseId = res.data.lesson[0].courseId  //课程id
                  that.lessonId = res.data.lesson[0].lessonId //章节id
                  that.start_recoding = res.data.lesson[0].startTime   //开始时间
                  //计算开始时间和结束时间  相差多少秒  设置倒计时  到时间 自动结束课程 刷新页面
                  var t1 = new Date(res.data.lesson[0].startTime).getTime();
                  var t2 = new Date(res.data.lesson[0].endTime).getTime();
                  var t3 = parseInt(t2 - t1);

                  //清除原来的时间
                  if (that.time_Interval) {
                    clearInterval(that.time_Interval);
                  }

                  //启动计时器
                  that.time_out(t3);

                  //再启动 开始录制计时器
                  that.start_time(that.start_recoding);

                  //启动 守护线程 监听 课程实时状态
                  that.get_Lesson_status();


                  // 延迟修改  是否可选 状态
                  var time = setTimeout(() => {
                    //修改按钮状态
                    that.is_recoding = true;
                    that.select_status = true;
                  }, 1000)

              }else{
                that.init();
              }

            }else{
              that.init();

            }

          })
      },


      init(){
        var that = this;
        //防止切换教室出现问题

        that.user_list.realName = ''
        that.user_list.code = ''
        that.select_type = '整课'
        that.select_subjectId = '',
        that.select_gradeId = '',
        that.select_end_time = '23:59:59';
        that.chapter = '';
        that.select_courseId = '';
        that.lessonId = '';
        that.start_recoding = '';

        //清除 开始录制计时器
        if (that.time_Interval3) {
          clearInterval(that.time_Interval3);
        }

        //清除 倒计时
        if (that.time_Interval5) {
          clearInterval(that.time_Interval5);
        }

        //清除 倒计时
        if (that.time_Interval6) {
          clearInterval(that.time_Interval6);
        }

        //启动页面时间计时器
        that.update_time();

        //页面恢复 用户可操作状态
        that.is_recoding = false;
        that.select_status = true;
      },


      //获取微格所有教室
      getMicroClassrooms() {
        var that = this;
        this.axios.post(getMicroClassrooms, {
            par: {}
          })
          .then(function(res) {
            that.class_list = res.data.result.data
            var select_classroom = JSON.parse(localStorage.getItem("select_classroom"));
            if (select_classroom != null) {
              for(var i = 0; i<res.data.result.data.length;i++){
                if(res.data.result.data[i].classroomId == select_classroom){
                  that.select_classid = select_classroom;
                  //如果 缓存 里面有教室 就去根据教室查询
                  that.getLoopByClassRoomId(select_classroom);
                }
              }

            }

          })
      },

      //根据学号查询
      microTeachingInfo() {
        var that = this;
        // this.select_courseId = '';
        // this.select_subjectId = '';

        that.chapter=''
        that.is_recoding = false;
        that.select_status = true;
        that.loading = false;
        that.end_time = "23:59:59"
        that.select_type = '整课'
        that.select_courseId = ''
        that.select_subjectId = ''
        that.select_gradeId = ''
        that.classesId = ''


        this.axios.post(microTeachingInfo, {
            userCode: that.studentcode
          })
          .then(function(res) {
            if (res.data.code == 500) {
              that.showtotas(res.data.message);
              that.select_status = true;
              return;
            }
            that.teachingCourses = res.data.result.teachingCourses;
            that.microSubjects = res.data.result.microSubjects;
            that.grades = res.data.result.grades;
            that.select_status = false;
            that.user_list = res.data.result.user;
          })
      },

    },

    beforeDestroy() {
      //用户离开页面 销毁 所有计时器

      if (this.time_Interval) {
        clearInterval(this.time_Interval);
      }

      if (this.time_Interval2) {
        clearInterval(this.time_Interval2);
      }

      if (this.time_Interval3) {
        clearInterval(this.time_Interval3);
      }

      if (this.time_Interval4) {
        clearInterval(this.time_Interval4);
      }

      if (this.time_Interval5) {
        clearInterval(this.time_Interval5);
      }

      if (this.time_Interval6) {
        clearInterval(this.time_Interval6);
      }

    }
  }
</script>

<style>
  .message1 {
    margin-top: 50px;
  }

  .drawer1 {
    height: calc(100% + 30px) !important;
    z-index: 99999999;
    margin-top: -30px;
  }

  #video1 #list_0 {
    width: 100% !important;
    height: 100% !important;
    top: 0px !important;
  }
  /* 340 */

  #video1 #list_1 {
    position: absolute !important;
    width: 300px !important;
    height: 40% !important;
    top: 60% !important;
    right: 0px !important;
  }

  #video1 #playerArea .channel {
    display: none !important;
  }

  #video1 #V_fullScreen {
    display: none !important;
  }

  .start1 {
    position: relative;
    /** 相对布局 **/
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }

  .start1:active {
    top: 2px;
    /**向下偏移2px **/
    background-color: red !important;
  }
</style>

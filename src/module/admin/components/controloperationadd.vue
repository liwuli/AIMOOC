<template>
 	<div class="formwin">
		<transition name="fade">
        <router-view></router-view>
		</transition>
 		<div class="win_content" :style="'width:' + wininfo.widhei[0] + ';height:' + wininfo.widhei[1]"
    v-loading="loading"
    element-loading-text="请稍等!"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
 			<div class="title">
 				<span class="menuname">{{msg}}</span>
 				<span class="filename"></span>
 			</div>
 			<div class="winclose iconfont icon-guanbijiantou" @click="cancelfn"></div>
 			<div class="content" :style="'height:' + wininfo.contenthei">
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.chapternameN}}<i>*</i>：</span>
			 		<input type="text"   v-model="name" />
			 	</div>
			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.personN}}<i v-show="comeflag">*</i>：</span>
			 		<input type="number"  min="0" v-model="person" />
			 	</div>
			 	<div class="formline"  style="width: 50%;">
			 	  <span class="txt">{{basicinfo.ScourseN}}<i>*</i>:</span>
			 	  <div id='select5' style="margin-top: 3px;"></div>
					<select id="select6"></select>
			 	</div>
			 	<div class="formline"  style="width: 50%;">
			 	  <span class="txt">{{basicinfo.SteacherN}}<i>*</i>:</span>
			 	  <div id='select7' style="margin-top: 3px;"></div>
					<select id="select8"></select>
			 	</div>

		<!-- 		<div class="formline" style="width: 50%;">
					<span class="txt">开始日期：</span>
					<Calendarme :inputstyle="'width:190px'" :iconstyle="'margin-top:0px'" :valshow="true" :ymdhms="ymdhms" :dateval="sydate" @startfn="startfn" :ids="start"></Calendarme>
				</div> -->

				<div class="formline" style="width: 100%;">
					<span class="txt">录制结束时间：</span>
          <el-date-picker
            v-model="eydate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="endfn"
            placeholder="选择结束时间">
          </el-date-picker>
					<!-- <Calendarme :inputstyle="'width:190px'" :iconstyle="'margin-top:0px'" :valshow="true" :ymdhms="ymdhms" :dateval="eydate" @endfn="endfn" :ids="end" ></Calendarme> -->
					<span v-show="status_select" class="txt" style="color: #e6a23c;margin-left: 30px;">录制结束时间不能小于当前时间！</span>
				</div>

			<!-- 	<div class="formline" style="width: 50%;">

				</div> -->

			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.liveN}}：</span>
			 		<Radio :type="add" @radioevent="liveevent" :radioinfo="radioinfolive"></Radio>
			 	</div>

			 	<div class="formline" style="width: 50%;">
			 		<span class="txt">{{basicinfo.useN}}：</span>
			 		<Radio :type="add" @radioevent="radioevent" :radioinfo="radioinfo"></Radio>
			 	</div>
			 	<div class="formline">
			 		<span class="txt">{{basicinfo.desN}}：</span>
			 		<textarea name="" rows="" cols="" v-model="description"></textarea>
			 	</div>
 			</div>
 			<div class="btnline">
 				<div class="cancel" @click="cancelfn" :style="'margin-left:' + wininfo.btncancelleft">{{basicinfo.cancelN}}</div>
 				<div class="save" @click="chechstatus(0)" style="padding: 0 10px;">{{basicinfo.saveN}}</div>
 				<div class="save" @click="chechstatus(1)" style="padding: 0 10px;">{{basicinfo.save1N}}</div>
 			</div>
 		</div>

  <!--  <el-dialog
       title="提示" style="background-color:rgba(0,0,0,0.5);"
       :visible.sync="dialogVisible"
       width="30%" :top="'25%'">
       <span>{{dialog_msg}}</span>
       <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
       </span>
     </el-dialog> -->

 	</div>


</template>
<script>
import * as types from '@/store/win-types'
import Calendarme from '@/components/extend/calendar.vue'
import Radio from '@/components/extend/radio'
import {basicinfo, warntxt, pathinfo, pagesize, courselisturl, teacherurl, addradioinfolive, addradioinfo, addurl,searchLesson} from '@/module/admin/config/controloperationinfo'
export default {
  name: 'AJcontroloperationadd',
  data () {
    return {
      add: 'add',
      msg: basicinfo.msgaddN,
      basicinfo: basicinfo,
      person: 0,
      description: '',
      name: '',
      wininfo: {
        widhei: ['700px', '400px'],
        btncancelleft: '305px',
        contenthei: '283px'
      },
      radioinfo: addradioinfo,
      radioinfolive: addradioinfolive,
      id: '',
      live: 0,
      teacher: '',
      course: '',
      use: 0,
      comeflag: false,
			sydate: '',
			eydate:'',
			start: 'start',
			end: 'end',
			ymdhms: 'ymdhMs',
			status_select:false,
      dialogVisible: true,
      dialog_msg:'',
      loading:false
    }
  },
  methods: {


		formcat (obj) {
		  return obj.year + '-' + (obj.month < 10 ? '0' + obj.month : obj.month) + '-' + (obj.day < 10 ? '0' + obj.day : obj.day) + ' ' + (obj.hour < 10 ? '0' + obj.hour : obj.hour) + ':' + (obj.minutes < 10 ? '0' + obj.minutes : obj.minutes) + ':' + (obj.seconds < 10 ? '0' + obj.seconds : obj.seconds)
		},
		startfn (obj) {
		  this.sydate = this.formcat(obj)
		},
		endfn (obj) {
      var _d = new Date(obj)
      if(_d < new Date().valueOf()){
          this.status_select=true;
      }else{
          this.status_select=false;
      }
			// if(this.eydate==''){
			// 	// this.status_select=false;
			// 	// this.eydate = this.formcat(obj)
			// }else{
			// 	var _d = new Date(this.formcat(obj))
			// 				if(_d < new Date().valueOf()){
			// 					 // this.$alert('选择录制结束时间不能小于当前时间!', '提示', {
			// 						//  confirmButtonText: '确定',
			// 						//  callback: action => {
			// 						// 	 this.$message({
			// 						// 		 type: 'info',
			// 						// 		 message: `action: ${ action }`
			// 						// 	 });
			// 						//  }
			// 					 // });
			// 					 this.status_select=true;
			// 				}else{
			// 					 this.status_select=false;
			// 					 this.eydate = this.formcat(obj)
			// 				}
			// }

		},

    valid () {
      if (this.name.replace(/\s/gi, '') === '') {
        this.win(warntxt.name, '', false)
        return false
      } else if (this.teacher.replace(/\s/gi, '') === '') {
        this.win(warntxt.teacher, '', false)
        return false
      } else if (this.course.replace(/\s/gi, '') === '') {
        this.win(warntxt.course, '', false)
        return false
      } else {
        if (this.comeflag) { // 到勤率统计勾选是，需判断人数
          if (this.person.toString().replace(/\s/gi, '') === '') {
            this.win(warntxt.person.toString(), '', false)
            return false
          } else if (this.person <= 0) {
            this.win(warntxt.personnum, '', false)
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      }
    },
    radioevent (obj) {
      console.log(obj.val, '===')
      this.use = obj.val
      if (obj.val === '1') {
        this.comeflag = true
      } else {
        this.comeflag = false
      }
    },
    liveevent (obj) {
      this.live = obj.val
    },

		// 检查当前选择时间段是否有正在录制的课程
		chechstatus(ind){
        this.loading=true;
			  let that = this
				this.axios({
			  method: 'post',
			  url: searchLesson,
			  data: {
			    classroomId: that.id,
			    classroomType: 'centralized',
			    lessonName: that.name,
			    description: that.description,
			    courseId: that.course,
			    teacherId: that.teacher,
			    studentsInPlan: that.person,
			    liveable: that.live,
			    countable: that.use,
					endTime:that.eydate
			  }
			})
			.then(function (res) {
				if(res.data.id=="1"){
					  // that.cancelfn();
					 var mydata= {
			    classroomId: that.id,
			    classroomType: 'centralized',
			    lessonName: that.name,
			    description: that.description,
			    courseId: that.course,
			    teacherId: that.teacher,
			    studentsInPlan: that.person,
			    liveable: that.live,
			    countable: that.use,
					endTime:that.eydate
			  }
        // that.dialog_msg=res.data.content
        // that.dialogVisible=true;
        that.loading=false
				that.$router.push({name: 'AJcontroloperationalter', params: {item: {content: res,mydata:mydata,button:ind}}})
		}else if(res.data.id=="2"){
           that.loading=false
					 that.win(res.data.content, '', false)
				}else{
					if(ind==0){
						 that.savedata();
					}else{
						  that.savedata1();
					}
				}

			})
		},

    savedata () {
      if (!this.valid()) {
        this.loading=false
        return false
      }
      let that = this;
      this.axios({
        method: 'post',
        url: addurl,
        data: {
          classroomId: that.id,
          classroomType: 'centralized',
          lessonName: that.name,
          description: that.description,
          courseId: that.course,
          teacherId: that.teacher,
          studentsInPlan: that.person,
          liveable: that.live,
          countable: that.use,
					endTime:that.eydate
        }
      })
      .then(function (res) {
        that.loading=false
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
          // setTimeout(function () {
          //   that.cancelfn()
          // }, 1200)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    savedata1 () {
      let that = this
      this.axios({
        method: 'post',
        url: addurl,
        data: {
          classroomId: that.id,
          classroomType: 'centralized',
					endTime:that.eydate
        }
      })
      .then(function (res) {
        that.loading=false
        if (res.data.id === '0') {
          that.win(res.data.content, '', false)
          setTimeout(function () {
            that.cancelfn()
          }, 1200)
        } else {
          that.cancelfn()
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
			this.$router.push({name: 'AJcontroloperation'})
      // this.$router.go(-1)
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
    },
		dateFtt(fmt,date)
			{
			 var o = {
			 "M+" : date.getMonth()+1,     //月份
			 "d+" : date.getDate(),     //日
			 "h+" : date.getHours(),     //小时
			 "m+" : date.getMinutes(),     //分
			 "s+" : date.getSeconds(),     //秒
			 "q+" : Math.floor((date.getMonth()+3)/3), //季度
			 "S" : date.getMilliseconds()    //毫秒
			 };
			 if(/(y+)/.test(fmt))
			 fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
			 for(var k in o)
			 if(new RegExp("("+ k +")").test(fmt))
			 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			 return fmt;
			}
  },
  mounted () {
    let obj = this.$route.params.item
    if (!obj) {
      this.win(types.back, this.cancelfn, false)
    } else {
      this.id = obj.id
    }
		// 设置 45分钟 后
		var _d = new Date()
		_d = new Date(_d.valueOf() + 45* 60 * 1000);
		this.sydate = this.dateFtt("yyyy-MM-dd hh:mm:ss",new Date());
		this.eydate= this.dateFtt("yyyy-MM-dd hh:mm:ss",_d);
  },
  components: {
    Radio,
		Calendarme
  },
  created () {
    let that = this
    this.axios({
      method: 'post',
      url: teacherurl,
      data: {
        roleType: 2
      }
    })
    .then(function (res) {
      let temp = []
      temp[0] = {value: '-1', txt: '请选择...'}
      let objs = res.data
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = {}
        temp[item + 1]['value'] = objs[item].id
        temp[item + 1]['txt'] = objs[item].realName
      }
      that.$Select({
        'data': temp,
        'originS': 'multiple',
        'selectId': ['select8', 'select7'],
        'callback': function (obj) {
          that.teacher = obj.value
        }
      })
    })
    .catch(function (error) {
      console.log(error)
    })
    this.axios({
      method: 'post',
      url: courselisturl,
      data: {
        courseType: '1',
        page: {
          pageSize: pagesize,
          pageIndex: 1
        },
        keywords: ''
      }
    })
    .then(function (res) {
      let temp = []
      let objs = res.data.data
      temp[0] = {value: '-1', txt: '请选择...'}
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = {}
        temp[item + 1]['value'] = objs[item].courseId
        temp[item + 1]['txt'] = objs[item].courseName
      }
      that.$Select({
        'data': temp,
        'originS': 'multiple',
        'selectId': ['select6', 'select5'],
        'callback': function (obj) {
          that.course = obj.value
        }
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>
<style>
.el-picker-panel{
  z-index: 9999999 !important;
}
</style>
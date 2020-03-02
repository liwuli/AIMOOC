<template>
  <!-- <div class="app" :style="appstyle"> -->
    <div class="center centerbottom50">
    	<div class="centers">
    		<!-- <Linklist></Linklist> -->
    		<div class="AA_right" style="width: calc(100% - 50px);">
    			<!-- <AJposition></AJposition> -->
    			<div class="G_search" style="margin-top: 20px;">

            <div style="float: left;margin-top: 20px;margin-right: 20px;margin-left: 30px;">
              <span class="txt" style="float: left;">区域:</span>
              <!-- <el-select v-model="Sbuilding" filterable placeholder="请选择类型" popper-class="el_selects_css"
                style="float: left;margin-left: 20px;">
                <el-option v-for="item in Sbuilding_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select> -->
              <el-cascader style="float: left;margin-left: 20px;height: 32px;"
                  v-model="Sbuilding" :placeholder="'请选择'" clearable :props="{ checkStrictly: true,expandTrigger: 'hover' }" filterable
                  :options="Sbuilding_options"
                  @change="handleChange">
              </el-cascader>

            </div>

            <div style="float: left;margin-top: 20px;margin-right: 20px;">
              <!-- <span class="txt" style="float: left;">{{basicinfo.msg}}:</span> -->
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

            <div style="float: left;margin-top: 20px;margin-right: 20px;margin-left: 30px;">
              <span class="txt" style="float: left;">教师名:</span>
              <el-select v-model="tercher" filterable placeholder="请选择教师" clearable popper-class="el_selects_css"
                style="float: left;margin-left: 20px;">
                <el-option v-for="item in Steacher_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <el-button type="primary" @click="search" style="float: left;margin-left: 20px;margin-top: 20px;" icon="el-icon-search">查询</el-button>

    			</div>
    			<div class="servercontrolhead" style="margin-left: 30px;">
    				<span class="white"></span>
						<span class="txtdetail">{{warntxt.noclass}}</span>
						<span class="green"></span>
						<span class="txtdetail">{{warntxt.normal}}{{minAttendanceRate}}%</span>
						<span class="error"></span>
						<span class="txtdetail">{{warntxt.err}}{{minAttendanceRate}}%</span>
            <span class="blue"></span>
            <span class="txtdetail">{{warntxt.loading}}</span>
						<span class="errorppt"></span>
						<span class="txtdetail">{{warntxt.nodata}}</span>
            <span class="txtdetail" style="margin-left: 50px;color: green;">(页面数据每60秒更新一次)</span>
					</div>

		      <div class="listpart" id="comecontrol" style="margin-left: 30px;">
		      	<div class="list" :class="item.class" @click="seeevent(item)" v-for="(item, ind) in roolist">
              <div style="float: left;width: 100%;">
                <span style="float: left;width: 30px;height: 30px;border-radius: 15px;background-color: #ffffff;margin: 5px 0px 0px 5px;color: #000000;line-height: 30px !important;">{{item.isAnalysis}}</span>
                <span  style="position: absolute;left: 50px;width: 200px; color: #ffffff;line-height: 35px;text-align: left;" :title="item.title">{{item.title}}</span>
              </div>
                <span v-if="item.stutas" class="hides" :title="item.courseName">课程名称：{{item.courseName}}</span>
                <span v-if="item.stutas" class="hides" :title="item.courseName">老师：{{item.teacher}}</span>
                <span v-if="item.stutas" class="hides" :title="item.total">{{attendrateinfo.total}}: {{item.total}} {{attendrateinfo.person}}</span>
                <span v-if="item.stutas" class="hides" :title="item.come">{{attendrateinfo.come}}: {{item.come}} {{attendrateinfo.person}}</span>
                <span v-if="item.stutas" class="hides" :title="item.percent">{{attendrateinfo.dql}}: {{item.percent}}</span>



                <span v-else class="hides" style="margin-top: 70px;" :title="item.courseName">{{item.courseName}}</span>
                <span v-if="item.type==-1 && !item.stutas" class="hides" :title="item.message">{{item.message}}</span>

							<!--<img v-if="item.imgurl" :src="item.imgurl"/>-->
						</div>
		      </div>
          <div style="float: right;text-align: center;width: 100%;margin-bottom: 60px;margin-top: 10px;">
            <el-pagination background :prev-text="'上一页'" :next-text="'下一页'" :popper-class="'pagination1'"
             @current-change="pageindex_change" :current-page="pageindex" :page-sizes="[5,10,15,30,50]" :page-size="pagesize"  @size-change="handleSizeChange"
             layout="prev, pager, next, jumper,sizes,total" :total="totalnum">
            </el-pagination>
          </div>
		      <!-- <page :totalnum="totalnum" :bingo="bingo" @pagepost="pagepost" :pagesize="pagesize" :pageindex="pageindex" :totalpage="totalpage"></page> -->
        </div>
    	</div>
      <Gfoot style="position: fixed;bottom: 0px;" ></Gfoot>
    </div>

  <!-- </div> -->
</template>

<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import AJposition from '@/components/extend/position'
import {basicinfo, pathinfo, timeout, getinfourl, attendrateinfo, warntxt, controllisturl,findAllCourses,teacherurl} from '@/module/admin/config/attendRateinfo'
export default {
  name: 'AJdiligencedynamics',
  data () {
    return {
      wininfo: {
        contenthei: '500px'
      },
      appstyle: 'min-height:' + window.innerHeight + 'px',
      warntxt: warntxt,
      searchval: '',
      basicinfo: basicinfo,
      attendrateinfo: attendrateinfo,
      roolist: '',
      setinterval: '',
      timeout: timeout,
      totalnum: 0,
      bingo: [],
      Sbuilding: '',
      pagesize: 10,
      pageindex: 1,
      totalpage: 0,
      Sbuilding_options:[],
      radio1: '课程名称',
      selectname: '', //选择的课程名称
      selectcode: '', //课程代码
      placeholder: '请输入课程名称',
      course_list:[],
      code_list:[],
      Steacher_options:[],
      tercher:'',
      minAttendanceRate:'0'
    }
  },
  created () {
    this.pagepost(this.pageindex)
    this.setintervalfn()
    this.getBuildingAndClassrooms()
    this.findAllCourses();
    this.getAlltercher();
  },
  components: {
    Gfoot,
    AJposition
  },

  methods: {

  handleSizeChange(val) {
  	this.pagesize = val;
    this.pagepost()
  },

  pageindex_change(e){
    this.pageindex=e;
    this.pagepost();
  },

    select_radio1(e) {
    	this.placeholder = '请输入' + e;
    	if (e == "课程名称") {
    		this.selectcode = ""
    	} else {
    		this.selectname = ""
    	}
    	// this.updataoptions(this.course_data);
    },

    handleChange(e){

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
    	// if (this.radio1 == "课程名称") {
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
    		// 	options2.push({
    		// 		value: res[i].courseNo,
    		// 		label: res[i].courseNo
    		// 	});
    		// }
    		this.code_list = options2;

    	// }

    },

    getAlltercher(){
      let that = this
      // 老师
      this.axios({
          method: 'post',
          url: teacherurl,
          data: {
            roleType: 2
          }
        })
        .then(function(res) {

          let temp = []
          // temp[0] = {
          //   value: '-1',
          //   txt: '全部'
          // }
          let objs = res.data
          for (let item = 0; item < objs.length; item++) {
            temp[item] = {}
            temp[item]['value'] = objs[item].id
            temp[item]['txt'] = objs[item].realName+'('+objs[item].code+')'
          }

          that.Steacher_options=temp;
        })
        .catch(function(error) {
          console.log(error)
        })
    },


    // 获取所有教学楼和教室
    getBuildingAndClassrooms () {
      let that = this
      // 教学楼-教室
      this.axios({
        method: 'post',
        url: controllisturl
      })
      .then(function (res) {

        let temp = []
        let objs = res.data.result

        for(var i = 0 ; i<objs.length;i++){
          temp.push({
            value:objs[i].buildingId,
            label:objs[i].buildingName,
            children:[]
          })
          for(var j = 0; j<objs[i].classrooms.length;j++){
            temp[i].children.push({
              value:objs[i].classrooms[j].classroomId,
              label:objs[i].classrooms[j].classroomName,
            })
          }
        }

        // temp.push({value: '', txt: '全部'})
        // for (let item = 0; item < objs.length; item++) {
        //   temp.push({value: objs[item].buildingId, txt: objs[item].buildingName})
        // }
        // that.Sbuilding = ''
        that.Sbuilding_options=temp;
        // that.$Select({
        //   'data': temp,
        //   'originS': 'multiple',
        //   'selectId': ['select96', 'select95'],
        //   'callback': function (obj) {
        //     that.Sbuilding = obj.value
        //   },
        //   'cleartxt': '全部'
        // })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    search () {
      this.pagepost(this.pageindex);
      // this.setintervalfn()
    },
    setintervalfn () {
      let that = this
      // if (this.setinterval) {
      //   clearInterval(this.setinterval)
      // } else {
        this.setinterval = setInterval(function () {
          that.pagepost(that.pageindex)
        }, that.timeout)
      // }
    },
    seeevent (item) {
      if(item.type!=3 && item.type!=-1){
        if(item.isAnalysis=='博'){
           window.open('http://' + item.equipment.deviceIp + ':' + item.equipment.port + '/AiBrain/gotoLive.html#/?uuid=1')
        }else{
          this.$router.push({name: 'AJattendRatesee2', params: {item: item}})
        }
      }
    },
    pagepost (obj) {
      let that = this
      this.axios({
        method: 'post',
        url: getinfourl,
        params: {
          params: {
            buildingId: (that.Sbuilding[0] == undefined ? '' : this.Sbuilding[0]),
            classroomId: (that.Sbuilding[1] == undefined ? '' : this.Sbuilding[1]),
            courseCode: that.selectcode,
            courseName: that.selectname,
            teacherId_: that.tercher,
            offset:(that.pageindex-1)*that.pagesize,
            pageSize:that.pagesize
          }
        }
      })
      .then(function (res) {

        if (res.status !== 200) {
          that.win(types.resback, that.cancelfn, false)
        } else {
          // if (typeof obj === 'number') {
          //   obj = {page: obj}
          // }
//        console.log(res, 'res from come')
          // that.pageindex = obj.page
          that.minAttendanceRate= res.data.minAttendanceRate;
          let temp = []
          let objs = res.data.result
          // that.totalpage = Math.ceil(objs.length / that.pagesize)
          that.totalnum = res.data.total;
          // let start = (that.pageindex - 1) * that.pagesize
          // for (let i = start; i < (that.pageindex * that.pagesize < objs.length ? that.pageindex * that.pagesize : objs.length); i++) {
          for(let i =0 ; i<objs.length;i++){
            temp[i] = {}
            temp[i]['title'] = objs[i].classroom ? objs[i].classroom.classroomName : ''
            temp[i]['rtmpUrl'] = objs[i].urlPath
//          temp[i]['state'] = objs[i].message
//          temp[i]['imgurl'] = objs[i].imagePath教室名称、课程名称、应到人数、实到人数、到勤率百分比
            temp[i]['courseName'] = objs[i].courseName
            temp[i]['isAnalysis'] = objs[i].classroom.isAnalysis == 0 ?'慕':'博'
            if(objs[i].classroom.isAnalysis !== 0){
              temp[i]['equipment'] = objs[i].equipment
            }

            temp[i]['type'] = objs[i].type
            temp[i]['message'] = objs[i].message
            if(objs[i].teacher!=null){
              temp[i]['teacher'] = objs[i].teacher.realName
            }

            if (objs[i].type === -1) {  //设备异常无法找到学生通道
              if(objs[i].lesson==null){
                 temp[i]['stutas'] = false;  //表示当前无课程
              }
              temp[i]['class'] = 'errorppt'
              temp[i]['percent'] = '0%'
              temp[i]['total'] = 0
              temp[i]['come'] = 0
            } else if (objs[i].type === 0) {  //尚无到勤率或数据缺失
              temp[i]['stutas'] = true;
              temp[i]['class'] = 'blue'
              temp[i]['percent'] = '0%'
              temp[i]['total'] = 0
              temp[i]['come'] = 0
            } else if (objs[i].type === 2) {  //到勤率异常			
              temp[i]['stutas'] = true;
              temp[i]['class'] = 'errorbg'
              temp[i]['total'] = objs[i].lesson.studentsInPlan
              temp[i]['come'] = objs[i].lesson.studentsArrivals
              temp[i]['percent'] = objs[i].lesson.studentsInPlan==0 ? '0%': (objs[i].lesson.studentsArrivals / objs[i].lesson.studentsInPlan * 100).toFixed(1) + '%'
            } else if (objs[i].type === 3) { // 暂无课程
              temp[i]['stutas'] = false;
              temp[i]['class'] = 'white'
              temp[i]['percent'] = '0%'
              temp[i]['total'] = 0
              temp[i]['come'] = 0
            } else {
              temp[i]['stutas'] = true;
              temp[i]['class'] = 'green'
              temp[i]['total'] = objs[i].lesson.studentsInPlan
              temp[i]['come'] = objs[i].lesson.studentsArrivals
              temp[i]['percent'] = objs[i].lesson.studentsInPlan==0 ? '0%':(objs[i].lesson.studentsArrivals / objs[i].lesson.studentsInPlan * 100).toFixed(1) + '%'
            }
          }
          //

          that.roolist = temp
          that.bingo = []
          that.bingo[that.pageindex - 1] = 'selected'
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    cancelfn () {
      this.$router.go(-1);
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

  beforeDestroy() {
      if(this.setinterval) {
           clearInterval(this.setinterval);
      }
  }
}
</script>

<style>
  #comecontrol .list{
        width: 250px !important;
        line-height: 40px !important;
        height: 250px;
        margin-right: 50px !important;
  }

  #comecontrol .blue {
     background-color: rgba(129, 211, 248, 1);
  }

  .servercontrolhead{
    width:auto !important;
  }

  .servercontrolhead .blue {
     background-color: rgba(129, 211, 248, 1);
         float: left;
         height: 14px;
         width: 14px;
  }
</style>

<template>
  <div class="container">
    <Ghead></Ghead>
    <div style="float: left;width: 100%;background: #fff;">
      <div class="mid-fix">
        <div class="headtab">
          <el-page-header @back="goBack" style="float: left;line-height: 50px;font-size: 18px;margin-left: -105px;" ></el-page-header>
         <!-- <img src="../../../../../static/images/return.png" style="float: left; width: 25px;height: 25px;margin-top: 15px;margin-left: -125px;" /> -->
          <div class="headtab-tabs">

						<!-- <router-link to="courseContrast" class="headtab-tab">
							<img src="../../../../../static/images/return.png" style="width: 50px;height: 50px;" />
						</router-link> -->
            <div class="headtab-tab headtab-active">课程详情</div>
            <router-link to="courseContrast" class="headtab-tab">课程对比分析</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row mid-fix" style="padding: 15px 0;">
      <div class="row asbox">
        <div class="txt">课程</div>
        <div id='select1' :style="selectStyle[0]"></div>
        <div id='select2' :style="selectStyle[1]"></div>
        <div id='select12' :style="selectStyle[1]"></div>
        <div class="btn" @click="search">查询</div>
      </div>
    </div>
    <div class="row mid-fix">
      <div class="box" style="padding-right: 0;">
        <div class="header">
          <div class="title"><span class="card"></span><span>课堂基本信息</span></div>
        </div>
        <div>
          <p class="text">
            <span>学期: {{termName}}</span><span>院系: {{collegeName}}</span>
            <span>授课教师: {{teacherName}}</span><span>授课班级: {{deptName}}</span>
          </p>
          <div>
            <span v-show="lessonList.length>0" :class="[item===pageIndex?'selected':'','btn-reset', 'paging']" @click="pageIndex =item" v-for="item in lessonPages">{{((item-1)*10)+1||1}}-{{item*10}}</span>
          </div>
          <div style="height: 128px">
            <span :class="[index===lessonIndex?'selected':'','btn-reset', 'lesson-title', 'hides']" @click="showclass(index,item)" v-for="(item, index) in lessonListShow">{{item.lessonName}}</span>
          </div>
        </div>
      </div>
      <div class="row" style="margin-bottom: 20px">
        <div :class="[showNum===index?'active':'', 'tab-item']" v-for="(item, index) in tablist" @click="showTurn(index)">
          {{item.name}}
        </div>
      </div>
      <keep-alive>
        <component :is="currentComponent" :courseId="courseId"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  import CourseAnalysisCurriculum from './courseAnalysisCurriculum'
  import CourseAnalysisTeacher from './courseAnalysisTeacher'
  import CourseAnalysisStudent from './courseAnalysisStudent'
  import {findLessons, getCourseById} from '../config/urlConfig'

  import {termSelect, collegeSelect, findCourseListByCollegeId} from '@/module/admin/analyze/config'

  export default {
    name: 'courseDetail',
    components: {
      Ghead,
      Gfoot,
      CourseAnalysisCurriculum,
      CourseAnalysisTeacher,
      CourseAnalysisStudent
    },
    data () {
      return {
        substitute: '',
        courseId: '',
        lessonList: [],
        lessonPages: 1,
        collegeName: '',
        teacherName: '',
        deptName: '',
        termName: '',
        pageIndex: 1,
        lessonIndex: 0,
        collegeSelect: collegeSelect,
        showNum: 0,
        currentComponent: 'CourseAnalysisCurriculum',
        tablist: [
          {show: 'CourseAnalysisCurriculum', name: '课程质量'},
          {show: 'courseAnalysisTeacher', name: '教师教学质量'},
          {show: 'courseAnalysisStudent', name: '学生学习质量'}
        ],
        termSelect: termSelect,
        selectStyle: [{width: '220px', 'margin': '1px 8px 0'}, {width: '140px', 'margin': '1px 8px 0'}]
      }
    },
    computed: {
      lessonListShow () {
				var arr = [];
				if(this.lessonList.length>0){
					var lesslength = (this.pageIndex * 10)>this.lessonList.length?this.lessonList.length:(this.pageIndex * 10);
					for (var i = ((this.pageIndex - 1)*10 || 0); i <lesslength; i++) {
						arr.push(this.lessonList[i])
					}
				}
        return arr
      }
    },
    methods: {

      goBack(){
        this.$router.push({path: 'teachAnalyze'})
      },

			showclass(e,lession){        
				this.lessonIndex=e;
        let urls = location.protocol + '//' + location.host + '/dist/index.html#/' + 'demand' + '?lessonId=' + lession.lessonId +
        	'&teacherId=' + lession.teacherId
        window.open(urls, '_blank')
				console.log(e)
			},

      showTurn (index) {

        this.showNum = index
        this.currentComponent = this.tablist[index].show
      },
      async courseSelect (obj, arr, value) { // 课程选择下拉菜单
        try {
          let objs = []
          if (obj.value !== '-1') {
            const res = await this.axios.post(findCourseListByCollegeId, {collegeId: obj.value})
            objs = res.data.courseLists
			//console.log(res)
          }
          let temp = []
          temp[0] = {value: '-1', txt: '课程名称'}
          for (let item = 0, len = objs.length; item < len; item++) {
            temp[item + 1] = {value: objs[item].courseId, txt: objs[item].courseName}
          }
          let that = this
          this.$Select({
            'data': temp,
            'selectId': arr[value][1],
            'callback': function (obj) {
              that.substitute = obj.ind ? obj.value : ''
            },
            'matchval': [{val: -1}]
          })
        } catch (err) {
          console.log(err)
        }
      },
      async getBasicInfo () {
        try {
          if (!this.courseId) {
            return
          }
          const obj = await this.axios.post(getCourseById, {courseId: this.courseId})
					// console.log(obj);
          const res = await this.axios.post(findLessons, {courseId: this.courseId,isAnalysis:1})
					// console.log(res);
          this.collegeName = obj.data.collegeName || ''
          this.teacherName = obj.data.teacherName || ''
          this.deptName = obj.data.deptName || ''
          let arr = res.data.lessonList
          arr && (arr.constructor === Array) && (this.lessonPages = Math.ceil(arr.length / 10) || 1)
          let temp = []
          for (let i = 0; i < arr.length; i++) {
            temp.push({lessonName: arr[i].lessonName, lessonId: arr[i].lessonId,teacherId:arr[i].teacherId})
          }
          this.lessonList = temp
        } catch (err) {
          console.log(err)
        }
      },
      search () {
        this.courseId = this.substitute
				this.pageIndex = 1;
        this.getBasicInfo()
      },
      termIdCallback (obj) {
        this.termName = obj.ind ? obj.txt : ''
      }
    },
    mounted () {
      this.termSelect(['select1'], this.termIdCallback)
      this.collegeSelect([['select2', 'select12']], this.courseSelect)
    }
  }
</script>

<style lang="scss" scoped>
  .lessonItem{
    border: 1px solid;
    width: 200px;
    margin: 10px 30px 0 0;
  }
  .tab-item{
    background: #f1f1f1;
    float: left;
    width: 528px;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
    cursor: pointer;
    margin-right: 18px;
    &:last-child{
      margin-right: 0;
    }
  }
  .text{
    font-size: 16px;
    padding-left: 15px;
    margin: 5px 0 15px;
    span{
      margin-right: 150px;
    }
  }
  .btn-reset{
    color: #6f6f6f;
    display: inline-block;
    font-size: 16px;
    border: 1px solid #b5b5b5;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
  }
  .paging{
    width: 70px;
    line-height: 28px;
    margin: 15px;
  }
  .lesson-title{
    width: 240px;
    line-height: 32px;
    margin: 15px 60px 15px 15px;
  }
  .selected{
    background: #359bf8;
    color: #fff;
  }
  .active{background: #fff;color: #3198fa;}

</style>
<style>
  .el-page-header__content{font-size: 14px;}
</style>

<template>
  <div class="app">
    <Ghead></Ghead>
    <div class="content">
      <div class="nav-cnt">
        <div class="header-nav">
          <span class="link active" @click="handleTeacherAnalysisClick">学生学习情况</span>
          <span class="link" @click="handleTeacherContrastClick">学生对比分析</span>
        </div>
      </div>
      <div class="row mid-fix" style="padding-top: 15px;">
        <div class="row asbox">
          <div class="row" style="margin-bottom: 15px;">
            <div class="txt">学期</div>
            <div id='select10' :style="selectStyle[0]"></div>
          </div>
          <div>
            <div class="txt">学生</div>
            <div id='select1' :style="selectStyle[0]"></div>
            <div id='select2' :style="selectStyle[1]"></div>
            <div id='select3' :style="selectStyle[1]"></div>
            <div id='select4' :style="selectStyle[1]"></div>
            <div class="btn" @click="search">查询</div>
          </div>
        </div>
      </div>
      <div class="hint" v-show="!show">请选择学生</div>
        <div class="teacher-info group" v-show="show">
          <div class="title">
            <span class="card"></span>
            <span class="text">学生基本信息</span>
          </div>
          <div class="text-part" v-show="show">
            <div class="img-cnt">
              <img :src="httpUrl" alt="">
            </div>
            <div class="text-cnt" v-show="show">
              <div class="list">姓名: {{studentInfo.realName}}</div>
              <div class="list">学号: {{studentInfo.code}}</div>
              <div class="list">专业: {{studentInfo.major}}</div>
              <div class="list">性别: {{studentInfo.sex | sexFilter}}</div>
              <div class="list">院系: {{studentInfo.college}}</div>
              <div class="list">班级: {{studentInfo.class}}</div>
            </div>
          </div>
        </div>
        <div class="btn-group" v-show="show">
          <div class="flag" :class="{'active': !flag}" @click="handleChangeView(0)">学生情况分析</div>
          <div class="flag" :class="{'active': flag}" @click="handleChangeView(1)">学生成长曲线</div>
        </div>
        <keep-alive>
          <component v-show="show" :is="currentComponent" :maxWeekNo="maxWeekNo" :termId="termId" :studentId="studentId" ref="curComponent"></component>
        </keep-alive>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
  import StudentGrowUp from './studentGrowUp'
  import StudentQuality from './studentQuality'
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  import {termSelect, classSelect, selectStyle, findStudentStudyCondition, studentSelect} from '@/module/analyze/config'

  export default {
    name: 'student-analysis',
    components: {
      StudentGrowUp,
      StudentQuality,
      Ghead,
      Gfoot
    },
    data () {
      return {
        show: false,
        studentSelect: studentSelect,
        currentComponent: StudentQuality,
        selectStyle: selectStyle,
        termSelect: termSelect,
        classSelect: classSelect,
        maxWeekNo: 0,
        termId: '',
        studentId: '',
        flag: 0,
        httpUrl: '/static/images/D_user.png',
        studentInfo: {
          realName: '',
          code: '',
          sex: '',
          college: '',
          major: '',
          class: ''
        }
      }
    },
    filters: {
      sexFilter (val) {
        if (!val) return ''
        if (val === 1) return '男'
        if (val === 2) return '女'
      }
    },
    methods: {
      handleChangeView (value) {
        this.flag = value
        this.currentComponent = value ? StudentGrowUp : StudentQuality
      },
      handleTeacherAnalysisClick () {
        this.$router.push('/studentAnalysis')
      },
      handleTeacherContrastClick () {
        this.$router.push('/studentContrast')
      },
      search () {
        this.show = true
        this.getStudentInfo()
        this.$refs.curComponent.getAnalysisInfo()
      },
      getStudentInfo () {
        let _this = this
        this.axios({
          method: 'POST',
          data: {
            userId: _this.studentId,
            termId: _this.termId
          },
          url: findStudentStudyCondition
        })
          .then((data) => {
            let res = data.data
            if (res && res.code === 200) {
              _this.studentInfo.realName = res.data.realName
              _this.studentInfo.code = res.data.number
              _this.studentInfo.sex = res.data.gender
              _this.studentInfo.college = res.data.departments
              _this.studentInfo.major = res.data.majorName
              _this.studentInfo.class = res.data.classesName
              _this.httpUrl = res.data.picture
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getClassId (obj, num) {
        this.studentSelect('select4', obj.value, this.getStudent)
      },
      getStudent (obj) {
        this.studentId = obj.value
      },
      getTermId (obj, num) {
        this.termId = obj.value
        this.maxWeekNo = obj.maxWeekNo
      }
    },
    mounted () {
      this.termSelect(['select10'], this.getTermId)
      this.classSelect([['select1', 'select2', 'select3']], this.getClassId)
    }
  }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  .content {
    position: relative;
    width: 100%;
    background: #f4f9fa;
    /*height: 200px;*/
    overflow: hidden;
    .nav-cnt {
      background: #fff;
      width: 100%;
      height: 60px;
      .header-nav {
        margin: 0 auto;
        width: 1620px;
        height: 100%;
        background: #fff;
        border-bottom: 1px solid #3198fa;
        .link {
          cursor: pointer;
          display: inline-block;
          height: 100%;
          padding-top: 25px;
          font-size: 18px;
          color: #000;
          margin-right: 20px;
          &.active {
            border-bottom: 2px solid #3198fa;
          }
        }
      }
    }
    .group {
      width: 1620px;
      margin: 20px auto;
      background: #fff;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
      .title {
        display: inline-block;
        margin: 30px 0 0 30px;
        height: 20px;
        .card {
          display: inline-block;
          width: 6px;
          height: 100%;
          background: linear-gradient(to bottom, #aad7ff , #349afa); /* 标准的语法 */
          vertical-align: middle;
        }
        .text {
          margin-left: 10px;
          color: #000;
          font-size: 16px;
          vertical-align: middle;
        }
      }
    }
    .teacher-info {
      height: 244px;
      .text-part {
        margin: 20px auto 0;
        height: 125px;
        width: 800px;
        .img-cnt {
          display: inline-block;
          margin-left: 50px;
          margin-right: 50px;
          width: 90px;
          height: 125px;
          border: 1px solid #207196;
          vertical-align: middle;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text-cnt {
          font-size: 18px;
          display: inline-block;
          vertical-align: middle;
          width: calc(100% - 200px);
          height: 100%;
          .list {
            display: inline-block;
            width: 30%;
            margin-top: 25px;
          }
        }

      }
    }
    .btn-group {
      display: flex;
      justify-content: space-between;
      width: 1620px;
      height: 80px;
      margin: 20px auto;
      .flag {
        cursor: pointer;
        width: 800px;
        height: 100%;
        background: #f1f1f1;
        color: #000;
        line-height: 80px;
        text-align: center;
        font-size: 22px;
        &.active {
          color: #3298f8;
          background: #fff;
        }
      }
    }
  }
</style>

<template>
  <div class="app">
    <Ghead></Ghead>
    <div class="content row">
      <div class="nav-cnt">
        <div class="header-nav">
          <el-page-header @back="goBack" style="float: left;margin-top: 20px;font-size: 18px;margin-left: -105px;" ></el-page-header>
          <span class="link active" @click="handleTeacherAnalysisClick">教师教学分析</span>
          <span class="link" @click="handleTeacherContrastClick">教师对比分析</span>
        </div>
      </div>
      <div class="selects group">
        <div class="row asbox style-select" style="margin-bottom: 15px;box-shadow: none">
          <div class="txt">教师</div>
          <div class="Select" id='select10' :style="selectStyle[0]"></div>
          <div class="txt"></div>
          <div class="Select" id='select2' :style="selectStyle[1]"></div>
          <div class="Select" id='select3' :style="selectStyle[2]"></div>
          <div class="btn" @click="handleSearchClick">查询</div>
        </div>
      </div>
      <div class="hint" v-if="!show">请选择老师</div>
      <template v-else>
        <div class="teacher-info group">
          <div class="title">
            <span class="card"></span>
            <span class="text">老师基本信息</span>
          </div>
          <div class="text-part">
            <div class="img-cnt">
              <img :src="httpUrl" alt="">
            </div>
            <div class="text-cnt">
              <div class="list name">姓名:  {{teacherInfo.realName}}</div>
              <div class="list code">工号:   {{teacherInfo.code}}</div>
              <div class="list sex">性别:   {{teacherInfo.sex}}</div>
              <div class="list college">院系:   {{teacherInfo.college}}</div>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <div class="flag" :class="{'active': flag}" @click="flag=true">教学质量分析</div>
          <div class="flag" :class="{'active': !flag}" @click="flag=false">教师成长曲线</div>
        </div>
        <teach-quality v-if="flag" :teacherId="teacherId" :termId="termId" ref="teachQuality"></teach-quality>
        <teacher-grow-up v-if="!flag" :maxWeek="maxWeek" :teacherId="teacherId" :termId="termId" ref="teacherGrowUp"></teacher-grow-up>
      </template>
    </div>

    <Gfoot></Gfoot>
  </div>
</template>

<script>
  import teacherGrowUp from './teacherGrowUp'
  import teachQuality from './teachQuality'
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  import {termSelect, teacherSelect, selectStyle} from '@/module/analyze/config'

  export default {
    name: 'teacher-analysis',
    components: {
      teacherGrowUp,
      teachQuality,
      Ghead,
      Gfoot
    },
    data () {
      return {
        show: false,
        selectStyle: selectStyle,
        termSelect: termSelect,
        teacherSelect: teacherSelect,
        termId: '',
        teacherId: '',
        maxWeek: 0,
        flag: true,
        httpUrl: '',
        teacherInfo: {
          realName: '',
          code: '',
          sex: '',
          college: ''
        }
      }
    },
    methods: {

      goBack(){
        this.$router.push({path: 'teachAnalyze'})
      },

      handleSearchClick () {
        this.show = true
        if (this.flag) {
          this.$refs.teachQuality.getData()
        } else {
          this.$refs.teacherGrowUp.getData()
        }
      },
      handleTeacherAnalysisClick () {
        this.$router.push('/teacherAnalysis')
      },
      handleTeacherContrastClick () {
        this.$router.push('/teacherContrast')
      },
      getTermId (obj) {
        this.termId = obj.value
        this.maxWeek = obj.maxWeekNo
      },
      getTeacherId (obj) {
        this.teacherId = obj.value
        this.teacherInfo.realName = obj.info.teacherName
        if (obj.info.gender === 2) {
          this.teacherInfo.sex = '女'
        } else if (obj.info.gender === 1) {
          this.teacherInfo.sex = '男'
        }
        this.teacherInfo.college = obj.collegeName
        this.teacherInfo.code = obj.info.code
        this.httpUrl = obj.info.iconUrl
      }
    },
    mounted () {
      this.termSelect(['select10'], this.getTermId)
      this.teacherSelect([['select2', 'select3']], this.getTeacherId)
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    background: #f4f9fa;
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
            box-sizing: border-box;
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
    .selects {
      height: 90px;
      .style-select {
        padding-top: 30px;
      }
    }
    .teacher-info {
      height: 244px;
      .text-part {
        margin: 20px auto 0;
        height: 125px;
        width: 600px;
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
            width: 45%;
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

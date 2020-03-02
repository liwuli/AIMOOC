<template>
  <div class="app">
    <Ghead></Ghead>
    <div class="content">
      <div class="nav-cnt">
        <div class="header-nav">
          <span class="link active" @click="handleTeacherAnalysisClick">教师教学分析</span>
          <span class="link" @click="handleTeacherContrastClick">教师对比分析</span>
        </div>
      </div>
      <div class="selects group">
        <div class="row asbox style-select" style="margin-bottom: 15px;box-shadow: none">
          <div class="txt">学期</div>
          <div id='select10' :style="selectStyle[0]"></div>
          <div class="txt">课程</div>
          <div id='select2' :style="selectStyle[1]"></div>
          <div id='select3' :style="selectStyle[2]"></div>
          <div class="btn" @click="handleSearchClick">查询</div>
        </div>
      </div>
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
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
  import teacherGrowUp from './teacherGrowUp'
  import teachQuality from './teachQuality'
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  import {termSelect, teacherSelect, selectStyle} from '@/module/admin/analyze/config'

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
      handleSearchClick () {
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
        this.teacherInfo.realName = obj.info.realName
        if (obj.info.gender === 2) {
          this.teacherInfo.sex = '女'
        } else if (obj.info.gender === 1) {
          this.teacherInfo.sex = '男'
        }
        this.teacherInfo.college = obj.info.organizationName
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

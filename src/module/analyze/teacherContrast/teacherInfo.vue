<template>
  <div class="main">
    <div class="photo fleft">
      <img :src="teacherInfo.httpUrl" alt="">
    </div>
    <div class="desc fright">
      <div class="line">姓名: {{teacherInfo.realName}}</div>
      <div class="line">性别: {{teacherInfo.sex}}</div>
      <div class="line">工号: {{teacherInfo.code}}</div>
      <div class="line">院系: {{teacherInfo.collegeName}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'teacher-info',
    props: ['teacherInfo'],
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../styles/common/reset";
  .main {
    vertical-align: middle;
    display: inline-block;
    /*width: 310px;*/
    height: 125px;
    overflow: hidden;
    .photo {
      width: 90px;
      height: 125px;
      border: 1px solid #207196;
      margin-right: 35px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .desc {
      width: 180px;
      display: inline-block;
      font-size: 16px;
      color: #000;
      .line {
        margin-bottom: 12px;
        &:last-child {
          margin: 0;
        }
      }
    }
  }
</style>

<template>
  <div class="main">
    <div class="photo floatleft">
      <img :src="teacherInfo.httpUrl" alt="">
    </div>
    <div class="desc floatright">
      <div class="item">姓名: {{teacherInfo.realName}}</div>
      <div class="item">性别: {{teacherInfo.sex}}</div>
      <div class="item">工号: {{teacherInfo.code}}</div>
      <div class="item">院系: {{teacherInfo.collegeName}}</div>
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
  div{
    box-sizing: border-box;
  }
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
      .item {
        margin-bottom: 12px;
        &:last-child {
          margin: 0;
        }
      }
    }
  }
</style>

<template>
  <div class="main">
    <div class="headline">
      <span class="left white size30">
        <span style="padding-left: 20px">智慧分析监控:</span>
        <span style="color: #0adaf6;font-size: 36px;padding-left: 10px;">{{freeClassroomNum}}</span>
        <span>/{{allAnalysisClassroomNum}}</span>
      </span>
      <span v-for="(item, index) in statusName">
        <span class="pie" :style="'background:'+statusColor[index^1]"></span>
        <span class="size16" :style="'color:'+statusColor[index^1]">{{item.txt}}</span>
      </span>
      <span style="padding: 0 6px;"></span>
      <span v-for="item in titleList">
        <img class="image" :src="item.src" alt="">
        <span @click="getdata(pageIndex, item.value)" class="space size16" :class="item.value===orderType?'blue':'white'">{{item.text}}</span>
      </span>
      <img style="margin: 24px 20px 0 6px;" @click="toggleFullScreen" src="/static/images/fullscreen.png" class="right btn" alt="">
      <span class="right"><button class="search" @click="search" type="button">确定</button></span>
      <button type="button" class="right reset"><span class="size16 white left" style="padding: 0 10px;">上课状态</span><div id="select2" :style="selectStyle"></div></button>
      <button type="button" class="right reset"><span class="size16 white left" style="padding: 0 10px;">教学楼</span><div id="select1" :style="selectStyle"></div></button>
    </div>
    <div class="content">
      <div class="itemWrap" v-for="item in buildingList">
        <div class="item">
          <div class="upper">
            <span class="pie" :style="'background:'+statusColor[item.isHavingClass]"></span>
            <span class="white">{{item.classroomName}}</span>
						<!-- 敏感词图标 -->
            <img v-if="item.isHavingClass==1 && item.isHaveSensitiveWord" class="right image" style="margin: 4px 8px 0 0;" :src="titleList[0].src" alt="">
          </div>
          <div class="lower" :class="roomPalette[item.type]">
            <div class="left half" style="border-right: 1px solid #2c2e55;"><img :src="contentImgList[0]" alt=""><span :class="item.attendance?'red':'white'">{{parseFloat(item.attendanceRate*100).toFixed(0)}}%</span></div>
            <div class="right half"><img :src="contentImgList[1]" alt=""><span :class="item.concentrate?'red':'white'">{{parseFloat(item.concentrateRate*100).toFixed(0)}}%</span></div>
            <div class="left" style="width: 80%;border-top: 1px solid #2c2e55;margin: 0 10%;"></div>
            <div class="left half" style="border-right: 1px solid #2c2e55;"><img :src="contentImgList[2]" alt=""><span :class="item.illegalBehavior?'red':'white'">{{parseFloat(item.illegalBehaviorRate*100).toFixed(0)}}%</span></div>
            <div class="right half"><img :src="contentImgList[3]" alt=""><span :class="item.teacherIsIllegal?'red':'white'">{{statusName[item.isHavingClass^1].isillegal}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <img src="/static/images/logo.png" alt="">
    </div>
    <Pagination @pagePost="getdata" :pageSize="pageSize" :pageIndex="pageIndex" :totalNum="totalNum"></Pagination>
  </div>
</template>

<script>
  import Pagination from '@/components/extend/pagination'
  import {getAnalysisClassroomMonitor, getBuildings} from '@/module/admin/config/gatherinfo'
  export default {
    name: 'intelligentterminalmonitor',
    components: {
      Pagination
    },
    data () {
      return {
        selectStyle: {width: '120px', 'text-align': 'left'},
        buildingList: [],
        changeType: false,
        teachBuildingId: null,
        isHavingClass: null,
        orderType: 1,
        freeClassroomNum: '',
        allAnalysisClassroomNum: '',
        statusName: [{txt: '正在上课', value: 1, isillegal: '违规'}, {txt: '下课中', value: 0, isillegal: '暂无'}],
        statusColor: ['#d3d3d3', '#00dfff'],
        titleList: [
          {src: '/static/images/warning.png', text: '敏感词', value: 2},
          {src: '/static/images/attendance.png', text: '到勤率', value: 3},
          {src: '/static/images/attention.png', text: '注意力', value: 4},
          {src: '/static/images/stdillegal.png', text: '学生违规行为率', value: 5},
          {src: '/static/images/teaillegal.png', text: '老师违规', value: 6}
        ],
        contentImgList: [
          '/static/images/attendanceH.png',
          '/static/images/attentionH.png',
          '/static/images/stdillegalH.png',
          '/static/images/teaillegalH.png'
        ],
        roomPalette: ['high', 'middle', 'low'],
        pageSize: 10,
        pageIndex: '',
        totalNum: ''
      }
    },
    methods: {
      toggleFullScreen () {
        if (!document.fullscreenElement && // alternative standard method
          !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen()
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          }
        }
      },
      search () {
        if (this.changeType) {
          this.getdata(this.pageIndex)
        }
      },
      async getdata (value, type) {
        if (type) {
          if (this.orderType === type) {
            return
          } else {
            this.orderType = type
          }
        } else {
          this.pageIndex = value
        }
        try {
          const res = await this.axios.post(
            getAnalysisClassroomMonitor,
            {
              pageSize: this.pageSize,
              pageIndex: this.pageIndex,
              teachBuildingId: this.teachBuildingId,
              orderType: this.orderType,
              isHavingClass: this.isHavingClass
            }
          )
          this.allAnalysisClassroomNum = res.data.allAnalysisClassroomNum
          this.freeClassroomNum = res.data.freeClassroomNum
          this.totalNum = res.data.total
          let arr = res.data.data
          let attendance = res.data.attendanceRate
          let concentrate = res.data.concentrateRate
          let illegalBehavior = res.data.illegalBehaviorRate
          for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i].isHavingClass) {
              arr[i].attendance = this.isIllegal(attendance, arr[i].attendanceRate)
              arr[i].concentrate = this.isIllegal(concentrate, arr[i].concentrateRate)
              arr[i].illegalBehavior = !this.isIllegal(illegalBehavior, arr[i].illegalBehaviorRate)
              if (arr[i].attendance || arr[i].concentrate || arr[i].illegalBehavior || arr[i].teacherIsIllegal || arr[i].isHaveSensitiveWord) {
                arr[i].type = 0
              } else {
                arr[i].type = 1
              }
            } else {
              arr[i].type = 2
              arr[i].attendanceRate = 0
              arr[i].concentrateRate = 0
              arr[i].illegalBehaviorRate = 0
              arr[i].isTeacherMissClass = 0
              arr[i].teacherIsIllegal = 0
            }
          }
       
          this.buildingList = arr
          this.changeType = false
        } catch (err) {
          console.log(err)
        }
      },
      isIllegal (standard, value) {
        return value <= standard ? 1 : 0
      },
      async getBuildings () {
        try {
          const res = await this.axios.post(getBuildings)
          let arr = res.data.result.data
          let temp = [{value: null, txt: '全部'}]
          for (let i = 0; i < arr.length; i++) {
            temp[i + 1] = {value: arr[i].buildingId, txt: arr[i].buildingName}
          }
          let that = this
          this.$Select({
            'data': temp,
            'selectId': 'select1',
            'style': 'width: 100px',
            'callback': function (obj) {
              that.teachBuildingId = obj.value
              that.changeType = true
            }
          })
        } catch (err) {
          console.log(err)
        }
      }
    },
    created () {
      this.getdata(1)

      this.intervalId = setInterval(() => {
          this.getdata(1)
       }, 30000)

    },

    beforeDestroy() {
      if(this.intervalId) {
          clearInterval(this.intervalId);
      }
  },

    mounted () {
      let that = this
      let temp = [{value: null, txt: '全部'}, ...this.statusName]
      this.$Select({ // 上课状态
        'data': temp,
        'selectId': 'select2',
        'callback': function (obj) {
          that.isHavingClass = obj.value
          that.changeType = true
        }
      })
	  that.getBuildings()

    }
  }
</script>
<style>
  @import "/static/css/default/Global.css";
  @import "/static/iconfont/iconfont.css";
</style>
<style scoped>
  .main{
    position: absolute;
    overflow: hidden;
    background-color: #171B41;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .headline{
    background: #283054;
    width: 100%;
    line-height: 77px;
    text-align: center;
  }
  .content{
    width: 100%;
    padding: 10px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .itemWrap{
    float: left;
    min-width: 200px;
    width: 11.5%;
    padding: 25px;
  }
  .item{
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    height: 125px;
    overflow: hidden;
  }
  .foot{
    width: 100%;
    position: absolute;
    bottom: 0;
    padding-bottom: 20px;
  }
  .foot img{
    display: block;
    margin: 0 auto;
  }
  .pie{
    margin: 0 2px 0 8px;
    display: inline-block;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    transform: translateY(2px);
  }
  .search{
    outline: none;
    cursor: pointer;
    background: none;
    color: #00dfff; border: 1px solid #00dfff;
    height: 28px;
    margin: 0 12px; border-radius: 5px;
    padding: 0 10px;
  }
  .upper{background: #2c2e55;line-height: 30px;}
  .lower{height: 95px;padding: 8px 0;box-sizing: border-box;}
  .half{width: 50%;height: 49%; padding-left: 15px; box-sizing: border-box;line-height: 40px;}
  .half img{width: 20px; height: 20px;transform: translateY(4px)}
  .half span{font-family: Arial; font-size: 18px; padding-left: 12px;}
  .reset{background: none; border: none; outline: none;height: 80px;}
  .image{transform: translateY(2px); width: 18px; height: 18px;}
  .space{padding: 0 7px 0 3px; cursor: pointer;}
  .btn{cursor: pointer;}
  .white{color: #fff;}
  .blue{color: #00dfff;}
  .red{color: #b10000;}
  .high{background: linear-gradient(to left top, #ff9292, #fb7979, #f75669)}
  .middle{background: linear-gradient(to left top, #08e8b6, #1ec89a, #01a86f)}
  .low{background: linear-gradient(to left top, #d3d3d3, #b1b5b4, #8c908f)}
  .size30{font-size: 30px;}
  .size16{font-size: 16px;}
  .left{float: left;}
  .right{float: right;}
</style>

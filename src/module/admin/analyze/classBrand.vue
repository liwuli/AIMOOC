<template>
  <div class="class-brand">
    <div class="left">
      <div class="table-cnt">
        <div class="header">
          <div class="today-lesson">今日课程</div>
          <div class="border"></div>
          <div class="table-title">
            <div class="text margin">时间</div>
            <div class="text">课程</div>
          </div>
        </div>
        <div class="border"></div>
        <div class="scrollfather" id="table-body">
          <div class="scrollson">
            <div class="line" v-for="(item, index) of leftList" :class="{'now-time': item.NowClassNumber === 1, 'be-having-class': item.NowClassNumber === 1 && item.courseName}">
              <div class="text margin">{{item.startTime.substring(11, 16)}}~{{item.endTime.substring(11, 16)}}</div>
              <div class="text" :class="{'font-color': item.courseName}">{{item.courseName || '空闲'}}</div>
            </div>
          </div>
          <div class="scroll_ymove">
            <div class="scroll_y" ></div>
          </div>
          <div class="scroll_xmove">
            <div class="scroll_x"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="top-left">
          <div class="time">{{time}}</div>
          <div class="date-week">{{dateCn}}&nbsp;&nbsp;{{week | weekFilter}}</div>
        </div>
        <div class="top-right">
          <div class="classroom-seat">
            <div class="classroom-status">
              教室状态:
              <span class="status" :class="{'hav-class': isHavingClass === 1}">{{isHavingClass === 1 ? '上课中': '空闲'}}</span>
            </div>
            <div class="seat-status">
              座位空闲率:
              <span class="status" :class="{'hav-class': isHavingClass === 1}">{{seatFreeRate * 100 || 0}}%</span>
            </div>
          </div>
          <div class="two-time">
            <div class="lesson-time">
              {{isHavingClass === 1 ? '最近空闲时间:' : '最近授课时间:'}}
              <span class="">{{nextTime}}</span>
            </div>
            <div class="free-time">
              {{isHavingClass === 1 ? '等待时间:' : '持续空闲时长:'}}
              <span class="">{{waitTime}}</span>
            </div>
          </div>
        </div>
        <button class="full-screen" v-show="isExitFullScreen" @click="handleFullScreenClick"></button>
      </div>
      <div class="bottom">
        <div class="spare-classroom">
          <div class="platform" v-show="isHavingClass !== 1">
            <div class="center"></div>
          </div>
          <div class="student-spare">
            <div class="row" v-for="(item, index) of row">
              <div class="col" v-for="(msg, index) of col"></div>
            </div>
            <span class="people-icon"
                  v-for="item of heatMap"
                  :style="{'left': item.x * parentWid - 22 + 'px',
                   'top': item.y * parentHei - 22 + 'px'}">
            </span>
          </div>
        </div>
        <div class="having-classroom" v-show="isHavingClass === 1">
          <div class="text-class">上课中</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { findLessonsByDeviceIp, findStatusByDeviceIp, getClassroomSeatFreeRate } from './config/urlConfig'
  import $public from './config/common'
  export default {
    name: 'classBrand',
    data () {
      return {
        parentWid: 0,
        parentHei: 0,
        heatMap: [],
        isExitFullScreen: true,
        ip: '',
        leftList: [],
        scroll: null,
        time: '',
        date: '',
        week: 0,
        isHavingClass: 0,
        seatFreeRate: 0,
        nextTime: '',
        waitTime: '',
        row: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 行
        col: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] // 列
      }
    },
    filters: {
      weekFilter (val) {
        if (!val) {
          return ''
        } else {
          switch (val) {
            case 1: return '星期一'
            case 2: return '星期二'
            case 3: return '星期三'
            case 4: return '星期四'
            case 5: return '星期五'
            case 6: return '星期六'
            case 7: return '星期日'
            default: return ''
          }
        }
      }
    },
    computed: {
      classroomIp () {
        return $public.getHashStr('ip')
      },
      dateCn () {
        let yyyy = this.date.substring(0, 4)
        let MM = this.date.substring(5, 7)
        let dd = this.date.substring(8, 10)
        return yyyy + '年' + MM + '月' + dd + '日'
      }
    },
    methods: {
      getClassroomSeatFreeRate () {
        this.axios({
          method: 'POST',
          url: getClassroomSeatFreeRate,
          data: {
            deviceIp: this.classroomIp
          }
        })
          .then((res) => {
            const data = res.data
            if (data && data.code === 200) {
              this.heatMap = JSON.parse(data.heatMap)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      handleFullScreenClick () {
        this.parentWid = document.querySelector('.student-spare').offsetWidth
        this.parentHei = document.querySelector('.student-spare').offsetHeight
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen()
        }
      },
      findStatusByDeviceIp () {
        this.axios({
          method: 'POST',
          url: findStatusByDeviceIp,
          data: {
            deviceIp: this.classroomIp
          }
        })
          .then((res) => {
            const data = res.data
            if (data && data.code === 200) {
              this.date = data.dateTime.substring(0, 10)
              this.time = data.dateTime.substring(11, 16)
              this.week = data.weekday
              this.isHavingClass = data.isHavingClass
              this.seatFreeRate = data.seatFreeRate
              this.nextTime = data.nextTime === '--' ? '--' : data.nextTime.substring(11, 16)
              this.waitTime = data.waitTime === '--' ? '--' : data.waitTime.substring(0, 5)
            }
          })
      },
      findLessonsByDeviceIp () {
        this.axios({
          method: 'POST',
          url: findLessonsByDeviceIp,
          data: {
            deviceIp: this.classroomIp
          }
        })
          .then((res) => {
            const data = res.data
            if (data && data.code === 200) {
              let classNoList = data.classNumbers
              let lessonList = data.result
              // 将课表中多阶次课程 如 35, 39 处理成 [35, 36, 37, 38, 39]
              for (let i = 0; i < lessonList.length; i++) {
                let startStop = lessonList[i].classNo.split(',')
                let classNoArr = []
                for (let j = Number(startStop[0]); j <= Number(startStop[1]); j++) {
                  classNoArr.push(j)
                }
                lessonList[i].classNoArr = classNoArr
              }
              // 将课程对应节次放入节次列表中
              for (let i = 0; i < classNoList.length; i++) {
                for (let j = 0; j < lessonList.length; j++) {
                  for (let k = 0; k < lessonList[j].classNoArr.length; k++) {
                    if (lessonList[j].classNoArr[k] === classNoList[i].classNo) {
                      classNoList[i].lessonName = lessonList[j].lessonName
                      classNoList[i].courseName = lessonList[j].courseName
                    }
                  }
                }
              }
              this.leftList = classNoList
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    mounted () {
      let _this = this
      this.parentWid = document.querySelector('.student-spare').offsetWidth
      this.parentHei = document.querySelector('.student-spare').offsetHeight
      this.findLessonsByDeviceIp()
      this.findStatusByDeviceIp()
      this.getClassroomSeatFreeRate()
      setInterval(() => {
        _this.findLessonsByDeviceIp()
        _this.findStatusByDeviceIp()
        _this.getClassroomSeatFreeRate()
      }, 30000)
      setInterval(() => {
        _this.parentWid = document.querySelector('.student-spare').offsetWidth
        _this.parentHei = document.querySelector('.student-spare').offsetHeight
      }, 1000)
      this.scroll = this.$Scroll({
        'father': 'table-body',
        'getfatheridPosition': document.querySelector('#table-body'),
        'scrollels': '.class-brand'
      })
      document.addEventListener('fullscreenchange', function (e) {
        _this.isExitFullScreen = !_this.isExitFullScreen
      })
      document.addEventListener('mozfullscreenchange', function (e) {
        _this.isExitFullScreen = !_this.isExitFullScreen
      })
      document.addEventListener('webkitfullscreenchange', function (e) {
        _this.isExitFullScreen = !_this.isExitFullScreen
      })
      document.addEventListener('msfullscreenchange', function (e) {
        _this.isExitFullScreen = !_this.isExitFullScreen
      })
    }
  }
</script>

<style>
  @import "/static/css/default/Global.css";
</style>
<style scoped lang="scss">

  div{box-sizing: border-box}
  .class-brand {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #070c24;

    .scrollfather { overflow: hidden; position: relative; width: 300px; }
    .scrollfather .scrollson { float: left; min-height: 100px; width: 100%; }
    .scrollfather .scroll_ymove { background: none; display: none; height: 100%; position: absolute; right: 0; width: 4px; z-index: 2; }
    .scrollfather .scroll_ymove .scroll_y { background: #6376a0; position: absolute; right: 0px; width: 8px; border-radius: 4px; }
    .scrollfather .scroll_xmove { background: none; display: none; height: 4px; position: absolute; bottom: 0; width: 100%; z-index: 1; }
    .scrollfather .scroll_xmove .scroll_x { background: #6376a0; position: absolute; bottom: 0px; height: 4px; }


    .left {
      float: left;
      width: 25%;
      height: 100%;
      margin-right: 1px;
      background: #273054;
      .table-cnt {
        width: 96%;
        height: calc(100% - 20px);
        margin: 10px auto;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        background: #1f2643;
        .header {
          width: 100%;
          height: 158px;
          -webkit-border-radius: 10px 10px 0 0;
          -moz-border-radius: 10px 10px 0 0;
          border-radius: 10px 10px 0 0;
          background: -webkit-linear-gradient(left top, #3c41f8 , #0adbf5); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(bottom right, #3c41f8, #0adbf5); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(bottom right, #3c41f8, #0adbf5); /* Firefox 3.6 - 15 */
          background: linear-gradient(to bottom right, #3c41f8 , #0adbf5); /* 标准的语法 */
          .today-lesson {
            width: 100%;
            -webkit-border-radius: 10px 10px 0 0;
            -moz-border-radius: 10px 10px 0 0;
            border-radius: 10px 10px 0 0;
            height: 89px;
            font-size: 40px;
            color: #fff;
            line-height: 89px;
            text-align: center;
          }
          .border {
            width: 100%;
            height: 1px;
            background: #070c24;
          }
          .table-title {
            width: 100%;
            height: 69px;
            line-height: 69px;
            .text {
              float: left;
              width: 57%;
              height: 100%;
              text-align: center;
              color: #fff;
              font-size: 30px;
              &.margin {
                width: 43%;
                border-right: 1px solid #070c24;
              }
            }
          }
        }
        .border {
          width: 100%;
          height: 1px;
          background: #070c24;
        }
        .scrollfather {
          overflow: hidden;
          width: 100%;
          height: calc(100% - 160px);
          .line {
            width: 100%;
            height: 90px;
            border-bottom: 1px solid #070c24;
            &:last-child {
              border-bottom: 0;
            }
            .text {
              float: left;
              width: 57%;
              height: 100%;
              line-height: 90px;
              text-align: center;
              color: #00dfff;
              font-size: 24px;
              &.margin {
                width: 43%;
                color: #fff;
                border-right: 1px solid #070c24;
              }
              &.font-color {
                color: #fff;
              }
            }
            &.now-time {
              background: #151932;
              .text {
                float: left;
                width: 57%;
                height: 100%;
                line-height: 90px;
                text-align: center;
                color: #fff;
                font-size: 24px;
                &.margin {
                  width: 43%;
                  color: #00dfff;
                  border-right: 1px solid #070c24;
                }
              }
            }
            &.be-having-class {
              background: #151932;
              .text {
                float: left;
                width: 57%;
                height: 100%;
                line-height: 90px;
                text-align: center;
                color: #ed4e4a;
                font-size: 24px;
                &.margin {
                  width: 43%;
                  color: #ed4e4a;
                  border-right: 1px solid #070c24;
                }
              }
            }
          }
        }
      }
    }
    .right {
      float: right;
      width: calc(75% - 1px);
      height: 100%;
      .top {
        position: relative;
        width: 100%;
        height: 200px;
        .full-screen {
          cursor: pointer;
          border: 0;
          outline: none;
          position: absolute;
          right: 0;
          top: 0;
          width: 25px;
          height: 25px;
          background: url("../../../../static/images/full-screen.png") no-repeat center;
        }
        .top-left {
          float: left;
          width: 35%;
          height: 100%;
          margin-right: 1px;
          padding-top: 45px;
          background: #273054;
          .time {
            width: 100%;
            height: 44px;
            color: #02deff;
            text-align: center;
            font-size: 44px;
            font-weight: 900;
            margin-bottom: 35px;
          }
          .date-week {
            width: 100%;
            height: 30px;
            font-size: 26px;
            color: #fff;
            text-align: center;
          }
        }
        .top-right {
          float: right;
          width: calc(65% - 1px);
          height: 100%;
          background: #273054;
          padding-top: 45px;
          .classroom-seat {
            overflow: hidden;
            width: 100%;
            height: 40px;
            .classroom-status {
              padding-left: 115px;
              font-size: 26px;
              line-height: 40px;
              color: #fff;
              float: left;
              width: 50%;
              height: 100%;
              background: url("../../../../static/images/classroom-status.png") no-repeat 55px center;
              .status {
                color: #02defe;
                font-size: 30px;
                &.hav-class {
                  color: #ef4c4d;
                }
              }
            }
            .seat-status {
              padding-left: 50px;
              font-size: 26px;
              line-height: 40px;
              color: #fff;
              float: left;
              width: 50%;
              height: 100%;
              background: url("../../../../static/images/seat-status.png") no-repeat 0 center;
              .status {
                color: #02defe;
                font-size: 30px;
                &.hav-class {
                  color: #ef4c4d;
                }
              }
            }
          }
          .two-time {
            margin-top: 30px;
            overflow: hidden;
            width: 100%;
            height: 40px;
            .lesson-time {
              padding-left: 115px;
              font-size: 26px;
              line-height: 40px;
              color: #fff;
              float: left;
              width: 50%;
              height: 100%;
              background: url("../../../../static/images/time-all.png") no-repeat 55px center;
            }
            .free-time {
              padding-left: 50px;
              font-size: 26px;
              line-height: 40px;
              color: #fff;
              float: left;
              width: 50%;
              height: 100%;
              background: url("../../../../static/images/time-half.png") no-repeat 0 center;
            }
          }
        }
      }
      .bottom {
        position: relative;
        width: 100%;
        margin-top: 1px;
        height: calc(100% - 201px);
        background: #0f122e;
        .spare-classroom {
          position: relative;
          width: calc(100% - 120px);
          height: 100%;
          margin-left: 120px;
          .student-spare {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 80%;
            height: 95%;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            .people-icon {
              position: absolute;
              width: 45px;
              height: 45px;
              background: url("../../../../static/images/people-icon.png") no-repeat center;
            }
            .row {
              width: 100%;
              height: 45px;
              display: flex;
              justify-content: space-between;
              .col {
                width: 45px;
                height: 45px;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                background: #283054;
              }
            }
          }
        }
        .having-classroom {
          position: relative;
          width: 100%;
          height: 100%;
          background: url("../../../../static/images/be-having-class.png") no-repeat center;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
          .text-class {
            width: 520px;
            height: 260px;
            background: rgba(35, 40, 72, .8);
            color: #ed4e4a;
            font-size: 92px;
            line-height: 260px;
            text-align: center;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
          }
        }
        .platform {
          width: 20px;
          height: 78%;
          position: absolute;
          left: 0;
          top: 50%;
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          -o-transform: translateY(-50%);
          transform: translateY(-50%);
          background: #6e3a43;
          .center {
            width: 20px;
            height: 50%;
            position: absolute;
            left: 0;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -o-transform: translateY(-50%);
            transform: translateY(-50%);
            background: #1e1f4b;
          }
        }
        .people-cnt {
          position: absolute;
          left: 50%;
          top: 50%;
          -webkit-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          width: 75%;
          height: 82%;
        }
      }
    }
  }
</style>

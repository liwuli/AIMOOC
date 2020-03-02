<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="center centerbottom50">
      <div class="centers">
        <Linklist></Linklist>
        <div class="AA_right">
          <AJposition></AJposition>
          <div class="routeline">
            <!-- <div class="part" @click="toControloperation">
              <div class="left">
                <p class="title"><span>正在录制</span></p>
                <div style="padding-left: 10px;line-height: 80px;text-align: center"><span style="font-size: 38px;color: #2f97f8;">{{recordingNum}}</span> <span style="font-size: 18px;">间</span></div>
              </div>
              <div class="right"><span class="arrow"> 〉</span></div>
            </div> -->
      <el-tooltip  effect="dark" content="点击可导航至集控录播控制" placement="top-end">
            <div class="console_item" @click="toControloperation">
              <i class="el-icon-video-camera-solid" style="float: left; font-size: 45px;color: #409EFF;margin-left: 20px;line-height: 100px;"></i>
              <div style="float: left; width: 135px;height: 100%;">
                <div style="width: 100%;height: 50%;font-size: 16px;text-align: center;line-height: 50px;">正在录制</div>
                <div style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
                  <span style="line-height: 50px;font-size: 30px;color: #409EFF;">{{recordingNum}}
                  </span>
                  <span style="font-size: 16px;margin-left: 5px;">间</span>
                </div>
              </div>
            </div>
        </el-tooltip>

            <!-- <div class="part" @click="toResource" style="width: 300px;margin-left: 20px;">
              <div class="left">
                <p class="title"><span>现资源总量(个)</span> <span>已删资源(个)</span></p>
                <div :id="item" v-for="item in resourceStatus" style="float: left;height: 100px;width: 100px;margin-left: 25px;"></div>
              </div>
              <div class="right"><span class="arrow"> 〉 </span></div>
            </div> -->
          <el-tooltip  effect="dark" content="点击可导航至资源管理" placement="top-end">
            <div class="console_item" @click="toResource" style="margin-left: 40px;">
              <i class="el-icon-folder-checked" style="float: left; font-size: 45px;color: #409EFF;margin-left: 20px;line-height: 100px;"></i>
              <div style="float: left; width: 135px;height: 100%;">
                <div style="width: 100%;height: 50%;font-size: 16px;text-align: center;line-height: 50px;">现资源总量</div>
                <div style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
                  <span style="line-height: 50px;font-size: 30px;color: #409EFF;">{{resourceData[0]}}
                  </span>
                  <span style="font-size: 16px;margin-left: 5px;">个</span>
                </div>
              </div>
            </div>
          </el-tooltip>
          <el-tooltip  effect="dark" content="点击可导航至资源管理" placement="top-end">
            <div class="console_item" @click="toResource" style="margin-right: 60px;">
              <i class="el-icon-folder-delete" style="float: left; font-size: 45px;color: #b7b7b7;margin-left: 20px;line-height: 100px;"></i>
              <div style="float: left; width: 135px;height: 100%;">
                <div style="width: 100%;height: 50%;font-size: 16px;text-align: center;line-height: 50px;">已删资源</div>
                <div style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
                  <span style="line-height: 50px;font-size: 30px;color: #409EFF;">{{resourceData[1]}}
                  </span>
                  <span style="font-size: 16px;margin-left: 5px;">个</span>
                </div>
              </div>
            </div>
           </el-tooltip>

            <!-- <div class="part" @click="toStore" style="width: 400px;margin-left: 20px;">
              <div class="left">
                <p class="title"><span>存储空间</span></p>
                <div class="text" style="padding: 10px;" v-for="(item, index) in storeList">
                  <span>{{storeTitle[index]}}</span>
                  <span class="bar"><span class="inbar" :style="'background:#2f97f8;width:'+item.value/item.total*135+'px'"></span></span>
                  <span>{{item.value}}/{{item.total}}GB</span>
                </div>
              </div>
              <div class="right"><span class="arrow"> 〉 </span></div>
            </div> -->
          <el-tooltip  effect="dark" content="点击可导航至存储区管理" placement="top">
           <div class="console_item" @click="toStore">
              <div style="width: 100%;height: 35%;font-size: 16px;display: flex;align-items: center;justify-content: center;">
                <i class="el-icon-coin" style="font-size: 25px;color: #409EFF;"></i>

                <span style="line-height: 50px;margin-left: 5px;">录制存储区</span>
              </div>
              <div style="width: 100%;height: 30%;display: flex;align-items: center;justify-content: center;">
                <span style="line-height: 50px;font-size: 20px;color: #409EFF;">{{storeList[0].value}}/{{storeList[0].total}}GB
                </span>
              </div>
              <div style="width: 100%;height: 35%;display: flex;align-items: center;justify-content: center;">
                <el-progress style="width: 80%;" :text-inside="true" :stroke-width="16" :percentage="(storeList[0].value/storeList[0].total)?(Number(((storeList[0].value/storeList[0].total)*100).toFixed(2))):0"></el-progress>
              </div>
            </div>
          </el-tooltip>

          <el-tooltip  effect="dark" content="点击可导航至存储区管理" placement="top">
            <div class="console_item" @click="toStore">
              <div style="width: 100%;height: 35%;font-size: 16px;display: flex;align-items: center;justify-content: center;">
                <i class="el-icon-orange" style="font-size: 25px;color: #409EFF;"></i>
                <span style="line-height: 50px;margin-left: 5px;">中心存储区</span>
              </div>
              <div style="width: 100%;height: 30%;display: flex;align-items: center;justify-content: center;">
                <span style="line-height: 50px;font-size: 20px;color: #409EFF;">{{storeList[1].value}}/{{storeList[1].total}}GB
                </span>
              </div>
              <div style="width: 100%;height: 35%;display: flex;align-items: center;justify-content: center;">
                <el-progress style="width: 80%;" :text-inside="true" :stroke-width="16" :percentage="(storeList[1].value/storeList[1].total)?(Number(((storeList[1].value/storeList[1].total)*100).toFixed(2))):0"></el-progress>
              </div>
            </div>
          </el-tooltip>

            <div class="part" style="width: 100%;cursor: default;padding: 10px 0;height: auto;">
              <div style="overflow: hidden;">

                <div class="left" style="height: 100px;padding: 20px;">
                  <p style="font-size: 16px;margin-bottom: 20px;">录制情况</p>
                  <div>
                   <el-radio-group v-model="radio1" @change="radio_change">
                      <el-radio-button :label="item.text"  v-bind:key="item.value" v-for="(item, index) in tab" ></el-radio-button>
                   </el-radio-group>
                  <!-- <button class="btn" type="button" @click="handletab(item.value)" v-for="(item, index) in tab"
                      :style="item.value==dateType?clicked:''">
                      {{item.text}}
                    </button> -->
                  </div>
                </div>
                <div class="left" style="height: 80px;padding: 60px 15px 0;">
                  <span class="text" style="float: left;line-height: 32px;margin-right:10px;font-size: 14px;">时间:</span>
                  <!-- <Calendarme :valshow="valshows" :ymdhms="ymd" :part="part" :iconstyle="iconstyle" :dateval="begindate"
                    @beginfn="beginfn" :ids="begin"></Calendarme>
                  <span class="text" style="float: left;line-height: 32px;margin-right:10px;">至</span>
                  <Calendarme :valshow="valshows" :ymdhms="ymd" :part="part" :iconstyle="iconstyle" :dateval="enddate"
                    @endfn="endfn" :ids="end"></Calendarme> -->
                    <el-date-picker
                      ref="time_picker"
                      v-model="select_time"
                      type="daterange"
                      align="right"
                      unlink-panels
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      @change="getStatusList">
                    </el-date-picker>

                  <!-- <span class="btn" @click="getStatusList" style="font-size: 14px;margin: 3px 7px;">确定</span> -->
                </div>
              </div>
              <div style="overflow: hidden;">
                <!-- <div class="left" style="width: 350px;padding-left: 10px;padding-bottom: 30px;"> -->
                  <div style="width: 100%;height: auto;">
                    <p style="display: inline-block; font-size: 16px;padding-left: 20px;">云录播</p>
                    <p style="display: inline-block;font-size: 16px;padding-left: 500px;">智慧教学</p>
                  </div>
                  <!-- <div class="list" v-for="(item, index) in cloudList" :style="item.colour">
                    <div class="left text">
                      <p>{{item.text}}</p>
                      <p :style="item.colour">{{cloudData[item.value]}}</p>
                    </div>
                    <div class="right" style="right: 20px;margin-top: 15px;"><img :src="item.src" alt=""></div>
                  </div> -->


                <!-- </div> -->

                <div style="float: left; width: 500px;height: auto;margin-left: 20px;margin-bottom: 50px;">
                     <div class="console_item2">
                      <i class="el-icon-document" style="float: left; font-size: 45px;color: #409EFF;margin-left: 20px;line-height: 100px;"></i>
                      <div style="float: left; width: 135px;height: 100%;">
                        <div style="width: 100%;height: 50%;font-size: 16px;text-align: center;line-height: 50px;">计划录制</div>
                        <div style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
                          <span style="line-height: 50px;font-size: 20px;color: #409EFF;">{{cloudData.lessonRecordInPlan}}
                          </span>
                          <!-- <span style="font-size: 16px;margin-left: 5px;">个</span> -->
                        </div>
                      </div>
                    </div>

                    <div class="console_item2">
                      <i class="el-icon-document-checked" style="float: left; font-size: 45px;color: #ffa729;margin-left: 20px;line-height: 100px;"></i>
                      <div style="float: left; width: 135px;height: 100%;">
                        <div style="width: 100%;height: 50%;font-size: 16px;text-align: center;line-height: 50px;">录制成功</div>
                        <div style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
                          <span style="line-height: 50px;font-size: 20px;color: #409EFF;">{{cloudData.lessonCompleteResources}}
                          </span>
                          <!-- <span style="font-size: 16px;margin-left: 5px;">个</span> -->
                        </div>
                      </div>
                    </div>

                    <div class="console_item2">
                      <i class="el-icon-document-delete" style="float: left; font-size: 45px;color: #ff1515;margin-left: 20px;line-height: 100px;"></i>
                      <div style="float: left; width: 135px;height: 100%;">
                        <div style="width: 100%;height: 50%;font-size: 16px;text-align: center;line-height: 50px;">录制失败</div>
                        <div style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
                          <span style="line-height: 50px;font-size: 20px;color: #409EFF;">{{cloudData.lessonIncompleteResources}}
                          </span>
                          <!-- <span style="font-size: 16px;margin-left: 5px;">个</span> -->
                        </div>
                      </div>
                    </div>

                    <div class="console_item2">
                      <i class="el-icon-document-remove" style="float: left; font-size: 45px;color: #b7b7b7;margin-left: 20px;line-height: 100px;"></i>
                      <div style="float: left; width: 135px;height: 100%;">
                        <div style="width: 100%;height: 50%;font-size: 16px;text-align: center;line-height: 50px;">已经迁移</div>
                        <div style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
                          <span style="line-height: 50px;font-size: 20px;color: #409EFF;">{{cloudData.lessonNumMigrated}}
                          </span>
                          <!-- <span style="font-size: 16px;margin-left: 5px;">个</span> -->
                        </div>
                      </div>
                    </div>

                </div>

                <div class="console_item2" style="margin-left: 50px;">
                  <i class="el-icon-s-promotion" style="float: left; font-size: 45px;color: #b7b7b7;margin-left: 20px;line-height: 100px;"></i>
                  <div style="float: left; width: 135px;height: 100%;">
                    <div style="width: 100%;height: 50%;font-size: 16px;text-align: center;line-height: 50px;">已上传</div>
                    <div style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center;">
                      <span style="line-height: 50px;font-size: 20px;color: #409EFF;">{{witData[0]}}
                      </span>
                      <!-- <span style="font-size: 16px;margin-left: 5px;">个</span> -->
                    </div>
                  </div>
                </div>
               <!-- <div class="left" style="margin-left: 115px;"> -->
                  <!-- <p style="font-size: 16px;padding-left: 10px;">智慧教学</p> -->
                  <!-- <div class="list" v-for="(item, index) in witList">
                    <div class="left text">
                      <p>{{item.text}}</p>
                      <p>{{witData[index]}}</p>
                    </div>
                    <div class="right" style="right: 20px;margin-top: 15px;"><img :src="item.src" alt=""></div>
                  </div> -->

               <!-- </div> -->
                <!-- <div id="pie" style="float: left; width: 600px;height: 400px;"></div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>
<script>
  import Linklist from './linklist'
  import Ghead from '@/components/common/header'
  import Gfoot from '@/components/common/footer'
  import AJposition from '@/components/extend/position'
  import Calendarme from '@/components/extend/calendar.vue'
  import {
    storeTitle,
    aiResourceInfoUrl,
    consoleInfoUrl,
    classStatisticsUrl,
    tab,
    cloudList,
    witList
  } from '@/module/admin/config/consoleinfo'

  export default {
    name: 'console',
    components: {
      Linklist,
      Ghead,
      Gfoot,
      AJposition,
      Calendarme
    },
    data() {
      return {
        witData: [],
        witList: witList,
        cloudData: {},
        cloudList: cloudList,
        recordingNum: '',
        resourceData: [],
        storeTitle: storeTitle,
        storeList: [{
          total: 52097,
          value: 51070
        }, {
          total: 50476,
          value: 50239
        }],
        clicked: {
          background: '#2f97f8',
          color: '#fff'
        },
        dateType: 'today',
        resourceStatus: ['current', 'deleted'],
        palette: [
          ['#20c9e1', '#d1d1d1'],
          ['#eb8120', '#c4ccd3']
        ],
        tab: tab,
        begin: 'begin',
        end: 'end',
        begindate: '',
        enddate: '',
        ymd: 'ymd',
        part: document.body,
        iconstyle: 'margin-right: 10px;',
        valshows: true,
        radio1:'今天',
        select_time:[],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    methods: {

      radio_change(e){
        let day = new Date()
        let localDay = this.formatted(day)
        switch (e) {
          case '今天':
            var arr = new Array(localDay,localDay);
            this.select_time=arr;
            break
          case '最近三天':
            var start_time = this.formatted(new Date(day - 48 * 60 * 60 * 1000));
            var arr = new Array(start_time,localDay);
            this.select_time=arr;
            break
          case '本周':
            var start_time = this.formatted(new Date(day - 24 * 60 * 60 * 1000 * ((day.getDay() || 7) - 1)));
            var arr = new Array(start_time,localDay);
            this.select_time=arr;
            break
        }
        this.getStatusList()
      },


      async getBaseInfo() {
        try {
          let res = await this.axios.post(consoleInfoUrl)
          let obj = res.data
          this.recordingNum = obj.recordingNum
          this.resourceData[0] = obj.resAllNum
          this.resourceData[1] = obj.resDelNum
          this.storeList = [{
            total: obj.totalNum,
            value: obj.usedNum
          }, {
            total: obj.centTotalNum,
            value: obj.centUsedNum
          }]
          // 绘制图表
           // this.showSource()
        } catch (err) {
          console.log(err)
        }
      },
      async getStatusList() {
        try {
          let res = await this.axios.post(classStatisticsUrl, {
            datetype: '1',
            lessonType: '1',
            begindate: this.select_time[0],
            enddate: this.select_time[1]
          })
          this.cloudData = res.data
          let data = await this.axios.post(aiResourceInfoUrl, {
            begindate: this.select_time[0],
            enddate: this.select_time[1]
          })
          this.witData = [data.data.resMovNum]
        } catch (err) {
          console.log(err)
        }
      },
      formatted(str) {
        let year = str.getFullYear()
        let month = str.getMonth() + 1
        let day = str.getDate()
        return year + '-' + (month > 9 ? month : ('0' + month)) + '-' + (day < 10 ? ('0' + day) : day)
      },
      // handletab(value) {
      //   this.dateType = value
      //   let day = new Date()
      //   let localDay = this.formatted(day)
      //   this.formatted(new Date('2018.1.1'))
      //   switch (value) {
      //     case 'today':
      //       this.begindate = this.enddate = localDay
      //       break
      //     case 'triduum':
      //       this.enddate = localDay
      //       this.begindate = this.formatted(new Date(day - 48 * 60 * 60 * 1000))
      //       break
      //     case 'week':
      //       this.enddate = localDay
      //       this.begindate = this.formatted(new Date(day - 24 * 60 * 60 * 1000 * ((day.getDay() || 7) - 1)))
      //       break
      //   }
      //   this.getStatusList()
      // },
      // beginfn(obj) {
      //   this.begindate = obj.year + '-' + (obj.month > 9 ? obj.month : ('0' + obj.month)) + '-' + (obj.day < 10 ? ('0' +
      //     obj.day) : obj.day)
      // },
      // endfn(obj) {
      //   this.enddate = obj.year + '-' + (obj.month > 9 ? obj.month : ('0' + obj.month)) + '-' + (obj.day < 10 ? ('0' +
      //     obj.day) : obj.day)
      // },
      toControloperation() {
        this.$router.push({
          name: 'AJcontroloperation'
        })
      },
      toResource() {
        this.$router.push({
          name: 'AJresource'
        })
      },
      toStore() {
        this.$router.push({
          name: 'AJstore'
        })
      },
      showSource() {
        var echarts = require('echarts/lib/echarts')
        require('echarts/lib/chart/pie')
        let myChart = echarts.init(document.getElementById('pie'))
        // for (let i = 0; i < 2; i++) {
        //   let myChart = echarts.init(document.getElementById(this.resourceStatus[i]))
        //   let option = {
        //     series: [{
        //       hoverOffset: 0,
        //       label: {
        //         normal: {
        //           show: true,
        //           position: 'center',
        //           textStyle: {
        //             fontSize: '30',
        //             fontWeight: 'bold'
        //           }
        //         }
        //       },
        //       type: 'pie',
        //       radius: ['70%', '90%'],
        //       avoidLabelOverlap: false,
        //       labelLine: {
        //         normal: {
        //           show: false
        //         }
        //       },
        //       data: [{
        //           value: this.resourceData[i],
        //           name: this.resourceData[i].toString()
        //         },
        //         {
        //           value: this.resourceData[i ^ 1]
        //         }
        //       ],
        //       color: this.palette[i]
        //     }]
        //   }
        //   myChart.setOption(option)
        // }


      }
    },
    created() {

       this.radio_change('今天')
    },
    mounted() {
      this.getBaseInfo()
    }
  }
</script>

<style>
  .console_item {
    float: left;
    border-radius: 4px;
    width: 200px;
    height: 100px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: 25px;
    margin-right: 20px;
  }

  .console_item2 {
    float: left;
    border-radius: 4px;
    width: 200px;
    height: 100px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: 25px;
    margin-right: 20px;
  }

  .console_item:hover {
    background-color: #f4f4f4;
  }
</style>

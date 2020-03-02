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
    			<div class="G_search" style="margin-bottom: 20px;">
    				<!-- <div class="part" >
					 	  <span class="txt" style="line-height: 30px;">{{servercontrolinfo.state}}:</span>
					 	  <div id="select8" class="Select" style="width: 140px;"></div>
					 	</div> -->
            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{servercontrolinfo.state}}:</span>
              <el-select v-model="state" filterable popper-class="el_selects_css" @change="state_change"
                style="float: left;margin-left: 20px;">
                <el-option v-for="item in recordtype" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>

					 	<!-- <div class="part" >
					 	  <span class="txt" style="line-height: 30px;">{{servercontrolinfo.connectstate}}:</span>
					 	  <div id="select81" class="Select" style="width: 140px;"></div>
					 	</div> -->
            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{servercontrolinfo.connectstate}}:</span>
              <el-select v-model="connectstate" filterable popper-class="el_selects_css" @change="connectstate_change"
                style="float: left;margin-left: 20px;">
                <el-option v-for="item in connecttype" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>


					 	<!-- <div class="part" >
					 	  <span class="txt" style="line-height: 30px;">{{servercontrolinfo.building}}:</span>
					 	  <div id='select95'  style="width: 140px;"></div>
              <select id="select96"></select>
					 	</div> -->
            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{servercontrolinfo.building}}:</span>
              <el-select v-model="Sbuilding" filterable popper-class="el_selects_css" @change="search"
                style="float: left;margin-left: 20px;">
                <el-option v-for="item in Sbuilding_options" :key="item.value" :label="item.txt" :value="item.value">
                </el-option>
              </el-select>
            </div>


					 	<div class="part" style="display: none;">
					 	  <span class="txt">{{basicinfo.roomtype}}:</span>
					 	  <Check @checkevent="checkevent" :selectarr="selectarr" :info="channelinfo"></Check>
					 	</div>

					 	<!-- <div class="part" style="margin-right: 0;line-height: 30px;">
					 	  <span class="txt" style="line-height: 30px;">{{basicinfo.msg}}:</span>
					 	  <input type="text" v-model="searchval"/>
					 	</div> -->

            <div style="float: left;margin-right: 20px;margin-top: 20px;">
              <span class="txt" style="float: left;">{{basicinfo.msg}}:</span>
              <el-input style="float: left;width: 150px;margin-left: 20px;"
                placeholder="请输入教室"
                v-model="searchval"
                clearable>
              </el-input>
            </div>
            <el-button type="primary" @click="search" style="float: left;margin-left: 20px;margin-top: 20px;" icon="el-icon-search">搜索</el-button>
					 	<!-- <div class="btn" @click="search" style="float:left;margin-left: -1px;">{{basicinfo.searchN}}</div> -->
    			</div>
    			<div class="servercontrolhead" style="display: flex;align-items: center;">
						<span class="txt">{{servercontrolinfo.classroom}}</span>
						<span class="recording"></span>
						<span class="txtdetail">{{warntxt.recording}}</span>
						<span class="errorrecord"></span>
						<span class="txtdetail">{{warntxt.errorrecord}}</span>
						<span class="unrecord"></span>
						<span class="txtdetail">{{warntxt.unrecord}}</span>
						<span class="green"></span>
						<span class="txtdetail">{{warntxt.normal}}</span>
						<span class="error"></span>
						<span class="txtdetail">{{warntxt.err}}</span>
						<span class="errorppt"></span>
						<span class="txtdetail">{{warntxt.errppt}}</span>
					</div>
		      <div class="scrollfather" :id="servercontrol" :style="'width:100%;height:' + wininfo1.contenthei + ';'">
						<div class="scrollson" style="min-height: 290px;">
							<div class="lists" v-show="item.name" v-for="(item, ind) in roolist">
								<div class="list" :class="urllist[ind].length <= 0 ? 'greenbg' : item.connect" @click="listevent(item, urllist[ind])"  >
									<span class="hides title" :title="item.name">{{item.name}}</span>
									<span :class="item.record"></span>
									<span class="half hides" :title="items.channelName" :class="items.connected === 0 ? 'white' : ''" v-for="items in urllist[ind]">
										{{items.channelName}}
									</span>
								</div>
								<div class="arrow iconfont icon-open" v-if="urllist[ind].length > 4" @click="openevent($event)"></div>
							</div>
					 	</div>
						<div class="scroll_ymove">
							<div class="scroll_y"></div>
						</div>
						<div class="scroll_xmove">
							<div class="scroll_x"></div>
						</div>
				</div>
				<div class="servercontrolhead"  style="display: flex;align-items: center;">
					<span class="txt">{{servercontrolinfo.server}}</span>
					<span class="green"></span>
					<span class="txtdetail">{{warntxt.normal}}</span>
					<span class="error"></span>
					<span class="txtdetail">{{warntxt.err}}</span>
				</div>
				<div class="scrollfather" :id="servercontrol1" :style="'width:100%;height:' + wininfo.contenthei + ';'">
					<div class="scrollson">
						<div class="list" :class="item.connStatus !== 0 ? 'greenbg' : 'errorbg'"  v-for="(item, ind) in serverlist">
							<span class="hides title" :title="basicinfo.servernameN + '：' + item.serverName">{{item.serverName}}</span>
							<div class="linelist" v-for="items in item.stoAreaList">
								<span class="hides txtline" :title="items.stolocalpath + '(' + items.hasusedcontent + '/' + items.totalcontent + ')'">{{items.stolocalpath}}({{items.hasusedcontent}}/{{items.totalcontent}})</span>
								<div class="scrollline">
									<span :class="(items.hasusedcontent / items.totalcontent) * 100 >= items.alertconent ? 'red' : 'blue'" :style="'width:' + (items.hasusedcontent / items.totalcontent) * 100 + '%'"></span>
								</div>
							</div>
							<div class="arrow iconfont icon-open" v-if="item.stoAreaList.length > 2" @click="openevent($event)"></div>
						</div>
				 	</div>
					<div class="scroll_ymove">
						<div class="scroll_y"></div>
					</div>
					<div class="scroll_xmove">
						<div class="scroll_x"></div>
					</div>
				</div>
    		</div>
    	</div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import * as types from '@/store/win-types'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import Check from '@/components/extend/check'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import {basicinfo, connecttype, controllisturl, recordtype, servercontrolinfo, warntxt, pathinfo, serverurl, connectinfo, classinfo, recordinfo, listurl, channelinfo} from '@/module/admin/config/monitorinfo'
export default {
  name: 'AJmonitor',
  data () {
    return {
      scroll: '',
      basicinfo: basicinfo,
      warntxt: warntxt,
      servercontrolinfo: servercontrolinfo,
      wininfo: {
        contenthei: '130px'
      },
      wininfo1: {
        contenthei: '280px'
      },
      searchval: '',
      selectarr: [0, 1],
      channelinfo: channelinfo,
      servercontrol: 'servercontrol',
      servercontrol1: 'servercontrol1',
      roolist: '',
      recordinfo: recordinfo,
      classinfo: classinfo,
      connectinfo: connectinfo,
      urllist: '',
      serverlist: '',
      interval: '',
      state: -1,
      Sbuilding: '',
      connectstate: -1,
      recordtype:recordtype,
      connecttype:connecttype,
      Sbuilding_options:[]
    }
  },
  created () {
    this.pagepost()
    this.serverpost()
    this.getBuildingAndClassrooms()
    let that = this
    this.interval = setInterval(function () {
      that.serverpost()
      that.pagepost()
    }, 30000)
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist,
    Check
  },
  methods: {
    getBuildingAndClassrooms () {
      let that = this
      // 教学楼-教室
      this.axios({
        method: 'post',
        url: controllisturl,
        data: {classroomType: '01'}
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.result
        temp.push({value: '', txt: '全部'})
        for (let item = 0; item < objs.length; item++) {
          temp.push({value: objs[item].buildingId, txt: objs[item].buildingName})
        }
        that.Sbuilding = ''
        that.Sbuilding_options=temp;
        // that.$Select({
        //   'data': temp,
        //   'originS': 'multiple',
        //   'selectId': ['select96', 'select95'],
        //   'callback': function (obj) {
        //     that.Sbuilding = obj.value
        //     that.search()
        //   }
        // })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    openevent (ev) {
      let flag = ev.currentTarget
      if (!flag.getAttribute('style')) {
        flag.parentElement.setAttribute('style', 'height:auto')
        flag.setAttribute('style', 'transform: rotate(180deg);')
      } else {
        flag.parentElement.removeAttribute('style')
        flag.removeAttribute('style')
      }
    },
    listevent (item, urlarr) {
      if (!item.equipmentType) {
        this.$router.push({name: 'AJmonitorsee', params: {item: item, urlarr: urlarr}})
      } else {
      }
    },
    checkevent (obj) {
      if (!this.selectarr[obj.id]) {
        this.selectarr.splice(obj.id, 1, obj.id)
      } else {
        this.selectarr.splice(obj.id, 1)
      }
    },
    search () {
      this.pagepost()
    },
    pagepost () {
      let that = this
      this.axios({
        method: 'post',
        url: listurl,
        params: {
          par: {
            classroomName: that.searchval,
            deviceType: that.selectarr.toString(),
            buildingId: that.Sbuilding,
            recordType: that.state,
            connectType: that.connectstate
          }
        }
      })
      .then(function (res) {
        if (res.status !== 200) {
          that.win(types.resback, that.cancelfn, false)
        } else {
          let temp = []
          let temps = []
          let pptarr = []
          let pptchannelind = []
          let obj = res.data.classroomList
          for (let item = 0; item < obj.length; item++) {
            // 遍历教室，获取教室数据
            temps[item] = {}
            temp[item] = []
            pptarr[item] = []
            for (let sub = 0; sub < obj[item].length; sub++) {
              if (!temps[item]['name']) { // 从子项获取该教室的名称 和id
                temps[item]['name'] = obj[item][sub].name
                temps[item]['id'] = obj[item][sub].id
              }
              // 获取子通道除ppt外的通道有无
              if (obj[item][sub].isClassroomOverallRecording !== undefined) {
                temp[item].push('isClassroomOverall')
              }
              if (obj[item][sub].isStudentOverallRecording !== undefined) {
                temp[item].push('isStudentOverall')
              }
              if (obj[item][sub].isStudentRecording !== undefined) {
                temp[item].push('isStudent')
              }
              if (obj[item][sub].isTeacherRecording !== undefined) {
                temp[item].push('isTeacher')
              }
              if (obj[item][sub].isPPTRecording !== undefined) {
                pptarr[item].push('isPPT')
                pptchannelind[item] = sub
              }
            }
          }
          for (let item = 0; item < obj.length; item++) {
            let connectnum = 0
            let unrecordnum = 0
            let recordnum = 0
            let errrecordnum = 0
            for (let k = 0; k < temp[item].length; k++) { // 获取子通道链接状态，录制状态，并进行计算取值，ppt除外
              if (obj[item][k][temp[item][k] + 'Connected'] === 0) {
                connectnum++
              }
              if (obj[item][k][temp[item][k] + 'Recording'] === 0) { // 未录制
                unrecordnum++
              }
              if (obj[item][k][temp[item][k] + 'Recording'] === 1) { // 正在录制
                recordnum++
              }
              if (obj[item][k][temp[item][k] + 'Recording'] === '2') { // 录制异常
                errrecordnum++
              }
            }
            // 判断录制是否异常，有一个异常，为异常（ppt除外）
            if (errrecordnum > 0) { // 只要有一个通道录制异常，都为录制异常
              temps[item]['record'] = 'errorrecord'
            } else {
              // 没有录制异常，正常判断录制状态
              if (recordnum > 0) { // 有在录制的通道
                temps[item]['record'] = 'recording'
                // 添加ppt情况判断
                if (pptarr[item].length > 0) {
                // 有ppt通道，判断ppt通道状态
                  if (obj[item][pptarr[item][0] + 'Recording'] === '2') { // 录制异常
                    temps[item]['record'] = 'errorrecord'
                  }
                }
              } else { // 没有录制的通道
                // console.log('全部状态为未录制，包含没有任何通道的情况')
                temps[item]['record'] = 'unrecord'
                // 添加ppt情况判断
                if (pptarr[item].length > 0) {
                // 有ppt通道，判断ppt通道状态
                  if (obj[item][pptarr[item][0] + 'Recording'] === 1) { // 正在录制
                    temps[item]['record'] = 'recording'
                  }
                  if (obj[item][pptarr[item][0] + 'Recording'] === '2') { // 录制异常
                    temps[item]['record'] = 'errorrecord'
                  }
                }
              }
            }
            // 判断链接状态
            if (connectnum > 0) { // （除ppt外）的连接状态有异常
              temps[item]['connect'] = 'errorbg'
            } else {
              // 两种情况，ppt异常或者正常
              if (pptarr[item].length > 0) {
                if (obj[item][pptchannelind[item]][pptarr[item][0] + 'Connected'] === 0) {
                  // console.log('有ppt通道，连接异常')
                  temps[item]['connect'] = 'errorppt'
                } else {
                  // console.log('有ppt通道，连接正常')
                  temps[item]['connect'] = 'greenbg'
                }
              } else { // 没有ppt
                // console.log('正常，没有ppt')
                temps[item]['connect'] = 'greenbg'
              }
            }
          }
          that.roolist = temps
          that.urllist = res.data.threeList
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    serverpost () {
      let that = this
      this.axios({
        method: 'post',
        url: serverurl
      })
      .then(function (res) {
        if (res.status !== 200) {
          that.win(types.resback, that.cancelfn, false)
        } else {
          that.serverlist = res.data.data
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
    },

    state_change(e){
      var obj = {
        value:e
      }
      var that =this;
      let objs = document.getElementById('servercontrol').querySelectorAll('.lists')
      if (obj.value === 1) { // 正常录制
        Array.prototype.slice.call(objs).forEach(function (item) {
          item.style.display = 'block'
          if (that.connectstate === -1) { // 全部
            if (item.querySelector('.recording') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 0) { // 设备异常errorbg
            if (item.querySelector('.recording') === null || item.querySelector('.errorbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 1) { // 连接正常
            if (item.querySelector('.recording') === null || item.querySelector('.greenbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 2) { // ppt异常
            if (item.querySelector('.recording') === null || item.querySelector('.errorppt') === null) {
              item.style.display = 'none'
            }
          }
        })
      } else if (obj.value === 2) { // 录制异常
        Array.prototype.slice.call(objs).forEach(function (item) {
          item.style.display = 'block'
          if (that.connectstate === -1) { // 全部
            if (item.querySelector('.errorrecord') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 0) { // 设备异常errorbg
            if (item.querySelector('.errorrecord') === null || item.querySelector('.errorbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 1) { // 连接正常
            if (item.querySelector('.errorrecord') === null || item.querySelector('.greenbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 2) { // ppt异常
            if (item.querySelector('.errorrecord') === null || item.querySelector('.errorppt') === null) {
              item.style.display = 'none'
            }
          }
        })
      } else if (obj.value === 0) { // 为录制
        Array.prototype.slice.call(objs).forEach(function (item) {
          item.style.display = 'block'
          if (that.connectstate === -1) { // 全部
            if (item.querySelector('.unrecord') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 0) { // 设备异常errorbg
            if (item.querySelector('.unrecord') === null || item.querySelector('.errorbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 1) { // 连接正常
            if (item.querySelector('.unrecord') === null || item.querySelector('.greenbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 2) { // ppt异常
            if (item.querySelector('.unrecord') === null || item.querySelector('.errorppt') === null) {
              item.style.display = 'none'
            }
          }
        })
      } else { // 全部
        Array.prototype.slice.call(objs).forEach(function (item) {
          item.style.display = 'block'
          if (that.connectstate === -1) { // 全部
          } else if (that.connectstate === 0) { // 设备异常errorbg
            if (item.querySelector('.errorbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 1) { // 连接正常
            if (item.querySelector('.greenbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.connectstate === 2) { // ppt异常
            if (item.querySelector('.errorppt') === null) {
              item.style.display = 'none'
            }
          }
        })
      }
      that.state = obj.value
    },


    connectstate_change(e){
      var obj = {
        value:e
      }
      var that =this;
      let objs = document.getElementById('servercontrol').querySelectorAll('.lists')
      if (obj.value === -1) { // 全部
        Array.prototype.slice.call(objs).forEach(function (item) {
          item.style.display = 'block'
          if (that.state === -1) { // 全部
          } else if (that.state === 0) { // 为录制
            if (item.querySelector('.unrecord') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 1) { // 正常录制
            if (item.querySelector('.recording') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 2) { // 录制异常
            if (item.querySelector('.errorrecord') === null) {
              item.style.display = 'none'
            }
          }
        })
      } else if (obj.value === 0) { // 设备异常errorbg
        Array.prototype.slice.call(objs).forEach(function (item) {
          item.style.display = 'block'
          if (that.state === -1) { // 全部
            if (item.querySelector('.errorbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 0) { // 为录制
            if (item.querySelector('.unrecord') === null || item.querySelector('.errorbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 1) { // 正常录制
            if (item.querySelector('.recording') === null || item.querySelector('.errorbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 2) { // 录制异常
            if (item.querySelector('.errorrecord') === null || item.querySelector('.errorbg') === null) {
              item.style.display = 'none'
            }
          }
        })
      } else if (obj.value === 1) { // 正常连接
        Array.prototype.slice.call(objs).forEach(function (item) {
          item.style.display = 'block'
          if (that.state === -1) { // 全部
            if (item.querySelector('.greenbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 0) { // 为录制
            if (item.querySelector('.unrecord') === null || item.querySelector('.greenbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 1) { // 正常录制
            if (item.querySelector('.recording') === null || item.querySelector('.greenbg') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 2) { // 录制异常
            if (item.querySelector('.errorrecord') === null || item.querySelector('.greenbg') === null) {
              item.style.display = 'none'
            }
          }
        })
      } else if (obj.value === 2) { // ppt异常
        Array.prototype.slice.call(objs).forEach(function (item) {
          item.style.display = 'block'
          if (that.state === -1) { // 全部
            if (item.querySelector('.errorppt') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 0) { // 为录制
            if (item.querySelector('.unrecord') === null || item.querySelector('.errorppt') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 1) { // 正常录制
            if (item.querySelector('.recording') === null || item.querySelector('.errorppt') === null) {
              item.style.display = 'none'
            }
          } else if (that.state === 2) { // 录制异常
            if (item.querySelector('.errorrecord') === null || item.querySelector('.errorppt') === null) {
              item.style.display = 'none'
            }
          }
        })
      }
      that.connectstate = obj.value
    }



  },
  updated () {
    if (!this.scroll) {
      this.scroll = this.$Scroll({
        'father': 'servercontrol',
        'getfatheridPosition': document.querySelector('#servercontrol'),
        'scrollels': '.app'
      })
      this.scroll1 = this.$Scroll({
        'father': 'servercontrol1',
        'getfatheridPosition': document.querySelector('#servercontrol'),
        'scrollels': '.app'
      })
    } else {
      if (document.querySelector('#servercontrol')) {
        this.scroll.addElement()
      }
      if (document.querySelector('#servercontrol1')) {
        this.scroll1.addElement()
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    let that = this
    that.$Select({
      'data': connecttype,
      'selectId': 'select81',
      'callback': function (obj) {

      }
    })
    that.$Select({
      'data': recordtype,
      'selectId': 'select8',
      'callback': function (obj) {

      }
    })
  }
}
</script>

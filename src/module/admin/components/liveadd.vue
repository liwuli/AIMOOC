<template>
  <div class="app">
    <Ghead></Ghead>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="center centerbottom50"
	  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="centers">
        <link rel="stylesheet" type="text/css" href="/static/css/default/AJlive.css"/>
        <Linklist></Linklist>
        <div class="AA_right">
          <div class="G_positon">
            <div class="item"><a href="#/live" class="active">直播管理</a>></div>
            <div class="item"><a href="#/livemanageadd" class="active">添加直播</a></div>
          </div>
          <div class="AJlive_right">
            <div class="formline">
              <span class="txt">{{liveinfo.name}}<i>*</i>：</span>
              <input type="text" class="input" v-model="name" maxlength="20" style="width: 550px;">
              <span class="number">{{name.length}}/20</span>
            </div>
            <div class="formline">
              <span class="txt">{{liveinfo.des}}：</span>
              <textarea name="" class="textarea" rows="" v-model="des" maxlength="200"  cols="" style="width: 550px;height: 110px;"></textarea>
              <span class="number" style="top: 125px;">{{des.length}}/200</span>
            </div>
            <div class="formline">
               <span class="txt">{{liveinfo.record}}<i>*</i>：</span>
               <Radio :type="add" @radioevent="radioevent" :radioinfo="addradioinfo"></Radio>
             </div>
             <div class="formline" id="date">
               <span class="txt">{{liveinfo.time}}<i>*</i>：</span>
               <el-date-picker
                v-model="shmdateval"
                type="datetime" :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择开始时间">
              </el-date-picker>
               <!-- <Calendarme  :inputstyle="styles" :dateval="sdateval" :valshow="valshow" :part="part" :ymdhms="ymdhms"   @livestartfn="livestartfn" :ids="livestart"></Calendarme> -->
               <!-- <Calendarme :hmsshow="hmsshow" :inputstyle="styles" :dateval="shmdateval" :valshow="valshow" :part="part" :ymdhms="ymdhm"   @livestarthmfn="livestarthmfn" :ids="livestarthm"></Calendarme> -->
               <span class="to" style="float:none">--</span>
               <el-date-picker
                v-model="ehmdateval"
                type="datetime" :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择结束时间">
              </el-date-picker>
               <!-- <Calendarme  :inputstyle="styles" :dateval="edateval" :valshow="valshow" :part="part" :ymdhms="ymdhms"   @liveendfn="liveendfn" :ids="liveend"></Calendarme> -->
               <!-- <Calendarme :hmsshow="hmsshow" :inputstyle="styles" :dateval="ehmdateval" :valshow="valshow" :part="part" :ymdhms="ymdhm"   @liveendhmfn="liveendhmfn" :ids="liveendhm"></Calendarme> -->
             </div>
             <div class="formline">
              <span class="txt">{{liveinfo.master}}<i>*</i>：</span>
              <input type="text" class="input" v-model="master" :placeholder="liveinfo.masterplaceholder" style="width: 200px;">
              <div class="selectbtn" style="position: relative;float: left;margin-left: 20px;left: 0;margin-top: -3px;" @click="jumpto('master')">{{liveinfo.masterbtn}}</div>
            </div>
            <div class="formline">
               <span class="txt">{{liveinfo.type}}：</span>
               <Radio :type="add" @radioevent="radiotypeevent" :radioinfo="addtyperadioinfo"></Radio>
             </div>
             <div class="formline">
              <span class="txt">{{liveinfo.pic}}：</span>
              <div class="selectbtn" @click="jumpto('basicupload')">{{liveinfo.selectpic}}</div>
            </div>
            <div class="formline">
              <div id="imgPreview">
                <img id="img1" :src="allurl"/>
              </div>
            </div>
            <div class="formline borderbottom">
              <span class="txt">{{liveinfo.addlivertmp}}</span>
              <span class="txt commit">{{liveinfo.addlivertmpcommit}}</span>
            </div>
            <div class="single" v-show="singlemultiple">
              <div class="line">
                <span class="txt">{{liveinfo.singleB}}</span>
                <input type="text" class="input" :placeholder="liveinfo.rtmpplaceholder" v-model="singleB" />
              </div>
              <div class="line">
                <span class="txt">{{liveinfo.singleG}}</span>
                <input type="text" class="input" :placeholder="liveinfo.rtmpplaceholder" v-model="singleG" />
              </div>
              <div class="line">
                <span class="txt">{{liveinfo.singleS}}</span>
                <input type="text" class="input" :placeholder="liveinfo.rtmpplaceholder" v-model="singleS" />
              </div>
            </div>
            <div class="multiple" v-show="!singlemultiple">
              <div class="formline" style="min-height: 30px; padding-top: 0;">
                <div class="selectbtn" :style="gray" style="left: 0;" @click="mulitpleadd">{{liveinfo.multipleadd}}</div>
              </div>
              <div class="linepart" v-show="mutiplearr[0]">
                <div class="line">
                  <span class="txt shorttxt">{{liveinfo.screen}}1</span>
                  <input type="text" class="input screen" :placeholder="liveinfo.screenplaceholder" v-model="screen1" />
                  <span class="txt">{{liveinfo.singleB}}</span>
                  <input type="text" class="input" @blur="checkblur(1, screenoneB, 'b')" :placeholder="liveinfo.rtmpplaceholder" v-model="screenoneB" :value="screenoneB"/>
                </div>
                <div class="line">
                  <span class="empty"></span>
                  <span class="txt">{{liveinfo.singleG}}</span>
                  <input type="text" class="input" @blur="checkblur(1, screenoneG, 'g')"  :placeholder="liveinfo.rtmpplaceholder" v-model="screenoneG" :value="screenoneG"/>
                </div>
                <div class="line">
                  <span class="empty"></span>
                  <span class="txt">{{liveinfo.singleS}}</span>
                  <input type="text" class="input"  @blur="checkblur(1, screenoneS, 's')" :placeholder="liveinfo.rtmpplaceholder" v-model="screenoneS" :value="screenoneS"/>
                </div>
              </div>
              <div class="linepart" v-show="mutiplearr[1]">
                <div class="line">
                  <span class="txt shorttxt">{{liveinfo.screen}}2</span>
                  <input type="text" class="input screen" :placeholder="liveinfo.screenplaceholder" v-model="screen2" />
                  <span class="txt">{{liveinfo.singleB}}</span>
                  <input type="text" class="input"  @blur="checkblur(2, screentwoB, 'b')" :placeholder="liveinfo.rtmpplaceholder" v-model="screentwoB" :value="screentwoB"/>
                </div>
                <div class="line">
                  <span class="empty"></span>
                  <span class="txt">{{liveinfo.singleG}}</span>
                  <input type="text" class="input"  @blur="checkblur(2, screentwoG, 'g')" :placeholder="liveinfo.rtmpplaceholder" v-model="screentwoG" :value="screentwoG"/>
                </div>
                <div class="line">
                  <span class="empty"></span>
                  <span class="txt">{{liveinfo.singleS}}</span>
                  <input type="text" class="input"  @blur="checkblur(2, screentwoS, 's')" :placeholder="liveinfo.rtmpplaceholder" v-model="screentwoS" :value="screentwoS"/>
                </div>
              </div>
              <div class="linepart" v-show="mutiplearr[2]">
                <div class="line">
                  <span class="txt shorttxt">{{liveinfo.screen}}3</span>
                  <input type="text" class="input screen" :placeholder="liveinfo.screenplaceholder" v-model="screen3" />
                  <span class="txt">{{liveinfo.singleB}}</span>
                  <input type="text" class="input" @blur="checkblur(3, screenthreeB, 'b')"  :placeholder="liveinfo.rtmpplaceholder" v-model="screenthreeB" :value="screenthreeB"/>
                  <span class="del iconfont icon-dellist" @click="screendel(2)"></span>
                </div>
                <div class="line">
                  <span class="empty"></span>
                  <span class="txt">{{liveinfo.singleG}}</span>
                  <input type="text" class="input"  @blur="checkblur(3, screenthreeG, 'g')" :placeholder="liveinfo.rtmpplaceholder" v-model="screenthreeG" :value="screenthreeG"/>
                </div>
                <div class="line">
                  <span class="empty"></span>
                  <span class="txt">{{liveinfo.singleS}}</span>
                  <input type="text" class="input"  @blur="checkblur(3, screenthreeS, 's')" :placeholder="liveinfo.rtmpplaceholder" v-model="screenthreeS" :value="screenthreeS"/>
                </div>
              </div>
              <div class="linepart" v-show="mutiplearr[3]">
                <div class="line">
                  <span class="txt shorttxt">{{liveinfo.screen}}4</span>
                  <input type="text" class="input screen" :placeholder="liveinfo.screenplaceholder" v-model="screen4" />
                  <span class="txt">{{liveinfo.singleB}}</span>
                  <input type="text" class="input" @blur="checkblur(4, screenfourB, 'b')"  :placeholder="liveinfo.rtmpplaceholder" v-model="screenfourB" :value="screenfourB"/>
                  <span class="del iconfont icon-dellist" @click="screendel(3)"></span>
                </div>
                <div class="line">
                  <span class="empty"></span>
                  <span class="txt">{{liveinfo.singleG}}</span>
                  <input type="text" class="input"  @blur="checkblur(4, screenfourG, 'g')" :placeholder="liveinfo.rtmpplaceholder" v-model="screenfourG" :value="screenfourG"/>
                </div>
                <div class="line">
                  <span class="empty"></span>
                  <span class="txt">{{liveinfo.singleS}}</span>
                  <input type="text" class="input"  @blur="checkblur(4, screenfourS, 's')" :placeholder="liveinfo.rtmpplaceholder" v-model="screenfourS" :value="screenfourS"/>
                </div>
              </div>
              <div class="linepart" v-show="mutiplearr[4]">
                <div class="line">
                  <span class="txt shorttxt">{{liveinfo.screen}}5</span>
                  <input type="text" class="input screen" :placeholder="liveinfo.screenplaceholder" v-model="screen5" />
                  <span class="txt">{{liveinfo.singleB}}</span>
                  <input type="text" class="input"  @blur="checkblur(5, screenfiveB, 'b')" :placeholder="liveinfo.rtmpplaceholder" v-model="screenfiveB" :value="screenfiveB"/>
                  <span class="del iconfont icon-dellist" @click="screendel(4)"></span>
                </div>
                <div class="line">
                  <span class="empty"></span>
                  <span class="txt">{{liveinfo.singleG}}</span>
                  <input type="text" class="input"  @blur="checkblur(5, screenfiveG, 'g')" :placeholder="liveinfo.rtmpplaceholder" v-model="screenfiveG" :value="screenfiveG"/>
                </div>
                <div class="line">
                  <span class="empty"></span>
                  <span class="txt">{{liveinfo.singleS}}</span>
                  <input type="text" class="input"  @blur="checkblur(5, screenfiveS, 's')" :placeholder="liveinfo.rtmpplaceholder" v-model="screenfiveS" :value="screenfiveS"/>
                </div>
              </div>
            </div>
            <div class="formline">
              <span class="cancel" @click="cancelfn" style="margin-left: 360px;">{{liveinfo.cancel}}</span>
              <span class="save" @click="savedata">{{liveinfo.save}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Gfoot></Gfoot>
  </div>
</template>

<script>
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import Radio from '@/components/extend/radio'
import Calendarme from '@/components/extend/calendar'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import * as types from '@/store/win-types'
import {warntxt, pathinfo, liveinfo, mutiplearr, addradioinfo, addtyperadioinfo, addurl} from '@/module/admin/config/liveinfo'
export default {
  name: 'AJliveadd',
  data () {
    return {
      liveinfo: liveinfo,
      name: '',
      des: '',
      mutiplearr: mutiplearr,
      singlemultiple: true,
      add: 'add',
      addradioinfo: addradioinfo,
      addtyperadioinfo: addtyperadioinfo,
      gender: 0,
      typegender: 0,
      genderval: '1',
      typegenderval: '1',
      master: '',
      masterid: '',
      valshow: true,
      ymdhms: 'ymd',
      ymdhm: 'ymdhM',
      hmsshow: true,
      part: document.body,
      livestart: 'livestart',
      liveend: 'liveend',
      livestarthm: 'livestarthm',
      liveendhm: 'liveendhm',
      sdateval: '',
      shmdateval: '',
      ehmdateval: '',
      edateval: '',
      gray: '',
      styles: '',
      allurl: '',
      geturl: '',
      singleB: '',
      singleG: '',
      singleS: '',
      screen1: '',
      screen2: '',
      screen3: '',
      screen4: '',
      screen5: '',
      screenoneB: '',
      screenoneG: '',
      screenoneS: '',
      screentwoB: '',
      screentwoG: '',
      screentwoS: '',
      screenthreeB: '',
      screenthreeG: '',
      screenthreeS: '',
      screenfourB: '',
      screenfourG: '',
      screenfourS: '',
      screenfiveB: '',
      screenfiveG: '',
      screenfiveS: '',
      multiplecount: 0,
      isManualAdmin: 0,
      checkarr: {
        1: [false, false, false],
        2: [false, false, false],
        3: [false, false, false],
        4: [false, false, false],
        5: [false, false, false]
      },
      checkarrnumflag: [0, 0, 0, 0, 0],
      loading:false
    }
  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    Linklist,
    Radio,
    Calendarme
  },
  methods: {
    valid () {      
      if (this.name.replace(/\s/gi, '') === '') {
        this.win(warntxt.name, '', false)
        return false
      } else if (this.master.replace(/\s/gi, '') === '') {
        this.win(warntxt.master, '', false)
        return false
      } else if(this.shmdateval == null){
        this.win('开始时间不能为空！', '', false)
        return false
      }else if(this.ehmdateval == null){
        this.win('结束时间不能为空！', '', false)
        return false
      }else if(new Date(this.shmdateval).getTime() >=  new Date(this.ehmdateval).getTime()){
        this.win('开始时间不能大于结束时间!', '', false)
        return false
      }else{
        return true
      }
    },
    checkarrvalid (keys, val, type) {
      if (val.toString().replace(/\s/gi, '') === '') {
        if (type === 'b') {
          this.checkarr[keys][0] = false
        } else if (type === 'g') {
          this.checkarr[keys][1] = false
        } else {
          this.checkarr[keys][2] = false
        }
      } else {
        if (type === 'b') {
          this.checkarr[keys][0] = true
        } else if (type === 'g') {
          this.checkarr[keys][1] = true
        } else {
          this.checkarr[keys][2] = true
        }
      }
    },
    checkblur (keys, val, type) {
      this.checkarrvalid(keys, val, type)
      this.checkarrnumflag.splice(keys - 1, 1, this.checkarr[keys].toString().match(/(true)/gi) === null ? 0 : this.checkarr[keys].toString().match(/(true)/gi).length)
    },
    savemulitplevalid () {
      // 取最大值  确定那一项填写的最多，如果都一样，按第一个来判断
      // 获取checkarrnumflag不等于0的项   最大值项 的索引
      let max = {ind: 0, val: 0}
      let need = {}
      for (let num = 0; num < this.checkarrnumflag.length; num++) {
        if (this.checkarrnumflag[num] !== 0) {
          need[num] = num
          if (this.checkarrnumflag[num] > max.val) {
            max = {ind: num, val: this.checkarrnumflag[num]}
          }
        }
      }
      // 去除checkarrnumflag不等于0的项的当前项
      if (max.ind === need[max.ind]) {
        delete need[max.ind]
      }
      console.log(need, 'need----')
      console.log(max, 'max---', this.checkarr)
      // 比对
      let continues = 0
      for (let k in need) {
        for (let nee = 0; nee < this.checkarr[need[k] + 1].length; nee++) {
          if (this.checkarr[need[k] + 1][nee] !== this.checkarr[max.ind + 1][nee]) {
            if (!continues) {
              if (nee === 0) {
                if (this.checkarr[max.ind + 1][nee]) {
                  this.win((warntxt.multiplescreen + (need[k] + 1) + warntxt.B), '', false)
                } else {
                  this.win((warntxt.multiplescreen + (need[k]) + warntxt.B), '', false)
                }
              } else if (nee === 1) {
                if (this.checkarr[max.ind + 1][nee]) {
                  this.win((warntxt.multiplescreen + (need[k] + 1) + warntxt.G), '', false)
                } else {
                  this.win((warntxt.multiplescreen + (need[k]) + warntxt.G), '', false)
                }
              } else {
                if (this.checkarr[max.ind + 1][nee]) {
                  this.win((warntxt.multiplescreen + (need[k] + 1) + warntxt.S), '', false)
                } else {
                  this.win((warntxt.multiplescreen + (need[k]) + warntxt.S), '', false)
                }
              }
            }
            continues++
            break
          }
        }
        if (continues) {
          continue
        }
      }
      if (continues) {
        return false
      } else {
        return true
      }
    },
    mulitpleadd () {
//    if (!this.checkblur()) {
//      this.win(warntxt.writepink, '', false)
//      return false
//    }
      for (let item = 0; item < this.mutiplearr.length; item++) {
        if (!this.mutiplearr[item]) {
          this.multiplecount = item
          break
        }
      }
      if (this.multiplecount === 4) {
        this.gray = 'background: #cecece;border:1px solid #cecece;color: #141414;'
      } else {
        this.gray = ''
      }
      this.mutiplearr.splice(this.multiplecount, 1, true)
    },
    screendel (num) {
      this.mutiplearr.splice(num, 1, false)
      this.gray = ''
      switch (num) {
        case '2':
        case 2:
          this.screen3 = ''
          this.screenthreeB = ''
          this.screenthreeG = ''
          this.screenthreeS = ''
          break
        case '3':
        case 3:
          this.screen4 = ''
          this.screenfourB = ''
          this.screenfourG = ''
          this.screenfourS = ''
          break
        case 4:
        case '4':
          this.screen5 = ''
          this.screenfiveB = ''
          this.screenfiveG = ''
          this.screenfiveS = ''
          break
      }
    },
    radioevent (obj) {
      this.genderval = obj.val
    },
    radiotypeevent (obj) {
      if (obj.val === '2') {
        this.singlemultiple = false
      } else {
        this.singlemultiple = true
      }
      this.typegenderval = obj.val
    },
    livestartfn (obj) {
      this.sdateval = this.formcat(obj)
    },
    liveendfn (obj) {
      this.edateval = this.formcat(obj)
    },
    livestarthmfn (obj) {
      this.shmdateval = this.formcathm(obj)
    },
    liveendhmfn (obj) {
      this.ehmdateval = this.formcathm(obj)
    },
    formcats (obj) {
      let objs = obj < 10 ? ('0' + obj) : obj
      return objs
    },
    formcat (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day)
    },
    formcathm (obj) {
      return obj.year + '-' + this.formcats(obj.month) + '-' + this.formcats(obj.day) + ' ' + this.formcats(obj.hour) + ':' + this.formcats(obj.minutes)
    },
    jumpto (param) {
      switch (param) {
        case 'master':
          this.$router.push({name: pathinfo.prex + 'master'})
          break
        case 'basicupload':
          this.$router.push({name: pathinfo.prex + 'basicupload'})
          break
      }
    },
    savedata () {
      if (this.valid()) {
        let that = this
        let params = {}
        params.beginTime = this.shmdateval
        params.endTime = this.ehmdateval
        params.liveName = this.name
        params.admin = this.masterid // 主持人
        params.adminName = this.master // 主持人
        params.isManualAdmin = this.isManualAdmin // 主持人是否手动输入
        params.isRecord = this.genderval // 是否录制
        params.livetype = this.typegenderval // 直播类型
        params.description = this.des // 直播描述
        params.image = this.allurl
        params.views = []
        if (this.typegenderval === '1') { // 单分屏
          if (this.singleG.toString().replace(/(^\s*)|(\s*$)/gi, '') === '' && this.singleB.toString().replace(/(^\s*)|(\s*$)/gi, '') === '' && this.singleS.toString().replace(/(^\s*)|(\s*$)/gi, '') === '') {
            this.win(warntxt.nourl, '', false)
            return false
          }
          if (this.singleG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
            if (this.singleG.indexOf('rtmp') >= 0) {
              params.views.push({view0: '单分屏', liveurl: this.singleG, definitionType: 2, viewNumber: 0})
            } else {
              this.win(warntxt.rtmp, '', false)
              return false
            }
          }
          if (this.singleB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
            if (this.singleB.indexOf('rtmp') >= 0) {
              params.views.push({view0: '单分屏', liveurl: this.singleB, definitionType: 1, viewNumber: 0})
            } else {
              this.win(warntxt.rtmp, '', false)
              return false
            }
          }
          if (this.singleS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
            if (this.singleS.indexOf('rtmp') >= 0) {
              params.views.push({view0: '单分屏', liveurl: this.singleS, definitionType: 3, viewNumber: 0})
            } else {
              this.win(warntxt.rtmp, '', false)
              return false
            }
          }
        } else {
          if (!this.savemulitplevalid()) {
            return false
          }
          let screencount = 0
          if (this.screen1) {
            if (this.screenoneG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenoneG.indexOf('rtmp') >= 0) {
                params.views.push({view1: this.screen1, liveurl: this.screenoneG, definitionType: 2, viewNumber: 1})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
            if (this.screenoneB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenoneB.indexOf('rtmp') >= 0) {
                params.views.push({view1: this.screen1, liveurl: this.screenoneB, definitionType: 1, viewNumber: 1})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
            if (this.screenoneS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenoneS.indexOf('rtmp') >= 0) {
                params.views.push({view1: this.screen1, liveurl: this.screenoneS, definitionType: 3, viewNumber: 1})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
          } else {
            if (this.screenoneG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '' || this.screenoneB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '' || this.screenoneS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              this.win(warntxt.screenname + ' 1 ' + warntxt.screenname1, '', false)
              return false
            }
          }
          if (this.screen2) {
            if (this.screentwoG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screentwoG.indexOf('rtmp') >= 0) {
                params.views.push({view2: this.screen2, liveurl: this.screentwoG, definitionType: 2, viewNumber: 2})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
            if (this.screentwoB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screentwoB.indexOf('rtmp') >= 0) {
                params.views.push({view2: this.screen2, liveurl: this.screentwoB, definitionType: 1, viewNumber: 2})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
            if (this.screentwoS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screentwoS.indexOf('rtmp') >= 0) {
                params.views.push({view2: this.screen2, liveurl: this.screentwoS, definitionType: 3, viewNumber: 2})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
          } else {
            if (this.screentwoG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '' || this.screentwoB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '' || this.screentwoS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              this.win(warntxt.screenname + ' 2 ' + warntxt.screenname1, '', false)
              return false
            }
          }
          if (this.screen3) {
            if (this.screenthreeG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenthreeG.indexOf('rtmp') >= 0) {
                params.views.push({view3: this.screen3, liveurl: this.screenthreeG, definitionType: 2, viewNumber: 3})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
            if (this.screenthreeB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenthreeB.indexOf('rtmp') >= 0) {
                params.views.push({view3: this.screen3, liveurl: this.screenthreeB, definitionType: 1, viewNumber: 3})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
            if (this.screenthreeS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenthreeS.indexOf('rtmp') >= 0) {
                params.views.push({view3: this.screen3, liveurl: this.screenthreeS, definitionType: 3, viewNumber: 3})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
          } else {
            if (this.screenthreeG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '' || this.screenthreeB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '' || this.screenthreeS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              this.win(warntxt.screenname + ' 3 ' + warntxt.screenname1, '', false)
              return false
            }
          }
          if (this.screen4) {
            if (this.screenfourG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenfourG.indexOf('rtmp') >= 0) {
                params.views.push({view4: this.screen4, liveurl: this.screenfourG, definitionType: 2, viewNumber: 4})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
            if (this.screenfourB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenfourB.indexOf('rtmp') >= 0) {
                params.views.push({view4: this.screen4, liveurl: this.screenfourB, definitionType: 1, viewNumber: 4})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
            if (this.screenfourS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenfourS.indexOf('rtmp') >= 0) {
                params.views.push({view4: this.screen4, liveurl: this.screenfourS, definitionType: 3, viewNumber: 4})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
          } else {
            if (this.screenfourG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '' || this.screenfourB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '' || this.screenfourS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              this.win(warntxt.screenname + ' 4 ' + warntxt.screenname1, '', false)
              return false
            }
          }
          if (this.screen5) {
            if (this.screenfiveG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenfiveG.indexOf('rtmp') >= 0) {
                params.views.push({view5: this.screen5, liveurl: this.screenfiveG, definitionType: 2, viewNumber: 5})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
            if (this.screenfiveB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenfiveB.indexOf('rtmp') >= 0) {
                params.views.push({view5: this.screen5, liveurl: this.screenfiveB, definitionType: 1, viewNumber: 5})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
            if (this.screenfiveS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              if (this.screenfiveS.indexOf('rtmp') >= 0) {
                params.views.push({view5: this.screen5, liveurl: this.screenfiveS, definitionType: 3, viewNumber: 5})
              } else {
                this.win(warntxt.rtmp, '', false)
                return false
              }
            }
          } else {
            if (this.screenfiveG.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '' || this.screenfiveB.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '' || this.screenfiveS.toString().replace(/(^\s*)|(\s*$)/gi, '') !== '') {
              this.win(warntxt.screenname + ' 5 ' + warntxt.screenname1, '', false)
              return false
            }
          }
          if (params.views.length === 0) {
            this.win(warntxt.nourl, '', false)
            return false
          }
          if (params.views.length <= 1) {
            this.win(warntxt.screenneed, '', false)
            return false
          }
        }
        that.loading=true;
        this.axios({
          method: 'post',
          url: addurl,
          data: params
        })
        .then(function (res) {
          if (!res.data.isSuccess) {
            that.loading=false;
            that.win(res.data.data, '', false)
          } else {
            that.loading=false;
            that.$router.push({name: pathinfo.prex})
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
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
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.isManualAdmin) {
        this.isManualAdmin = 1
        this.master = to.params.isManualAdmin.name
        this.masterid = to.params.isManualAdmin.id
      }
      if (to.params.allurl) {
        this.allurl = to.params.allurl
        this.geturl = to.params.geturl
      }
    }
  },
  beforeDestroy () {
//  document.body.removeChild(document.getElementById('livestart_calendar'))
//  document.body.removeChild(document.getElementById('liveend_calendar'))
//  document.body.removeChild(document.getElementById('livestarthm_calendar'))
//  document.body.removeChild(document.getElementById('liveendhm_calendar'))
  }
}
</script>

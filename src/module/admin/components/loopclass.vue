<template>
  <div class="app">
  <!-- 	<Ghead></Ghead> -->

    <div class="center centerbottom50">
    	<div class="centers">
    		<!-- <Linklist></Linklist> -->
    		<div class="center" style="margin: 0 auto;">

					<!-- <AJposition style="padding-left: 50px;"></AJposition> -->
					 <transition name="fade">
						<router-view></router-view>
					</transition>

    			<div class="G_search" style="margin:0 0 30px 50px;">
    				<div class="part" >
					 	  <span class="txt">{{eduType ? basicinfo.ScollegeN : basicinfo.gradeN}}:</span>
					 	  <div id='select85' class="Select" style="margin-top: 3px;"></div>
							<select id="select86"></select>
					 	</div>
					 	<div class="part" >
					 	  <span class="txt">{{msg}}:</span>
					 	  <!-- <input type="text" v-model="Sclassname"/> -->
              <el-select v-model="Sclassname" filterable placeholder="请选择教室" :popper-class="'selectsss'">
                <el-option
                  v-for="item in class_name_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
					 	</div>
					 	<div class="part" >
					 	  <span class="txt">{{basicinfo.channelN}}:</span>
					 	  <Check @checkevent="checkevent" :selectarr="selectarr" :info="channelinfo" :styles="checkStyle"></Check>
					 	</div>
					 	<div class="part">
					 	  <span class="txt">{{basicinfo.SteacherN}}:</span>
					 	  <!-- <div id='select87' class="Select" style="margin-top: 3px;width: 150px"></div>
							<select id="select88"></select> -->

              <DropdownThx @selectFunc="selectFunc" :itemlist="selectItemlist" :checkedId="selectItemCheckedId" :placeholder="selectPlaceholder" :nodatatext="selectNodatatext"></DropdownThx>
					 	</div>
					 	<div class="part" >
					 	  <span class="txt" style="line-height: 39px">{{basicinfo.stateN}}:</span>
					 	  <Radio :type="add" @radioevent="radioeventstate" :radioinfo="radioinfostate"></Radio>
					 	</div>
					 	<div class="part" >
					 	  <span class="txt" style="line-height: 39px">{{basicinfo.screenN}}:</span>
					 	  <Radio :type="add" @radioevent="radioeventscreen" :radioinfo="radioinfoscreen"></Radio>
					 	</div>
					 	<div class="part" >
					 	  <span class="txt" style="line-height: 39px">{{basicinfo.autoN}}:</span>
					 	  <Radio :type="add" @radioevent="radioeventauto" :radioinfo="radioinfoauto"></Radio>
					 	</div>
            <div class="part">
              <span class="txt">{{basicinfo.timeN}}:</span>
              <input type="number" style="width: 40px;margin-top: 3px" v-model="times" start="15" :value="times" placeholder="15s"/>
            </div>
					 	<div class="part" v-show="autoval">
					 	  <span class="txt">{{basicinfo.typeN}}:</span>
					 	  <Radio :genderval="type" :type="edit" @radioevent="radioeventtype" :radioinfo="radioinfotype"></Radio>
					 	</div>
            <div class="part">
              <div class="btn" @click="search" style="margin-top: 3px">{{basicinfo.searchN}}</div>
            </div>
    			</div>
					<List :totalnum="totalnum" :pagesize="pagesize" :screens="screens" :title="title" :channel="channel" :pageval="pageval" :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo"  :info='info'></List>
    		</div>
    	</div>
    </div>

<!--    <Gfoot></Gfoot> -->
  </div>
</template>

<script>
import Radio from '@/components/extend/radio'
import Check from '@/components/extend/check'
import Ghead from '@/components/common/header'
import Gfoot from '@/components/common/footer'
import List from '@/components/extend/listLoopClass'
import Linklist from './linklist'
import AJposition from '@/components/extend/position'
import DropdownThx from '@/components/extend/dropdownThx'
import {basicinfo, radioinfotype, bingos, liveurl, channelinfo, radioinfoauto, radioinfoscreen, radioinfostate, collegeteacherurl, pageval, pagesize, getteachersurl, getgradesurl,dropdownSelect,findCentralizedControlList} from '@/module/admin/config/loopclassinfo'
export default {
  name: 'AJloopClass',
  data () {
    return {
      checkStyle: 'width: auto;text-indent: 5px;line-height: 15px;',
      eduType: this.$store.state.educationType,
      basicinfo: basicinfo,
      pageval: pageval,
      msg: basicinfo.msgN,
      autoval: false,
      add: 'add',
      edit: 'edit',
      state: 0,
      screens: '',
      auto: '',
      radioinfostate: radioinfostate,
      radioinfoscreen: radioinfoscreen,
      radioinfoauto: radioinfoauto,
      radioinfotype: radioinfotype,
      channelinfo: channelinfo,
      collegeS: '',
      teacherS: '',
      times: 15,
      Scollege: '',
      Steacher: '',
      info: [],
      title: [],
      pageinfo: '',
      channel: [],
      bingos: bingos,
      total: '',
      intervalcount: '',
      selectarr: [0, 1, 2, 3, 4, 5],
      type: 0,
      totalnum: 0,
      pagesize: pagesize,
      Sclassname: '',
      grade: '',
      selectItemlist: [],
      selectItemCheckedId: '',
      selectPlaceholder: dropdownSelect.placeholder,
      selectNodatatext: dropdownSelect.nodatatext,
      class_name_list:[],  //所有教室名
    }
  },
  created () {
    if (this.eduType) {
      // 高教-院系、老师列表
      this.getCollegeAndTeachers()
    } else {
      // 普教-年级列表
      this.getgrades()
      // 普教-老师列表
      this.getteachers()
    }
    // 直播
    this.pagepost({page: 1})
    this.getclassAll();

  },
  components: {
    Ghead,
    Gfoot,
    AJposition,
    List,
    Linklist,
    Radio,
    DropdownThx,
    Check
  },
  methods: {

    getclassAll(){
      var that = this;
      this.axios({
        method: 'post',
        url: findCentralizedControlList,
       data: {
           classroomName: "",
           classroomType: "centralized"
        }
      })
      .then(function (res) {
          console.log(res);
          var class_item = new Array();
          res.data.forEach((item)=>{
            item.classrooms.forEach((i)=>{
                class_item.push({
                  value:i.classroomName,
                  label:i.classroomName
                })
            })
          })
          that.class_name_list = class_item;
      })
    },

    selectFunc:function(obj){
     if (obj.ind !== 0) {
        this.Steacher = obj.value
      } else {
        this.Steacher = ''
      }
    },
    checkevent (obj) {
      let ind = obj.id * 1
      if (this.selectarr[ind] === '') {
        this.selectarr.splice(ind, 1, ind)
      } else {
        this.selectarr.splice(ind, 1, '')
      }
    },
    search () {
      this.pagepost({page: 1})
    },
    radioeventtype (obj) {
      if (this.auto === 1) {
        this.type = 0
        this.auto = 0
        clearInterval(this.intervalcount)
      } else {
        this.type = obj.val
        this.search()
      }
    },
    radioeventstate (obj) {
      this.state = obj.val
    },
    radioeventscreen (obj) {
      this.screens = obj.val
      if (obj.val === '1') {
        this.pagesize = 9
      } else {
        this.pagesize = 4
      }
      this.pageval = 1
      this.pageinfo = Math.ceil(this.total / this.pagesize)
    },
    radioeventauto (obj) { // 自动巡课
      this.auto = obj.val
      let that = this
      if (obj.val === '1') {
        this.autoval = false
        this.intervalcount = setInterval(function () {
          if (that.pageinfo < that.pageval + 1) {
            that.pageval = 0
          }
          that.pagepost({page: that.pageval + 1})
        }, that.times * 1000)
      } else {
        this.autoval = false
        clearInterval(this.intervalcount)
      }
    },
    pagepost (obj) {
      
      let that = this
      if (typeof obj === 'number') {
        obj = {page: obj}
      }
      that.pageval = obj.page
      if (this.screens === '1') {
        this.pagesize = 9
      } else {
        this.pagesize = 4
      }
      let channelTargetstr = ''
      for (let item = 0; item < that.selectarr.length; item++) {
        if (that.selectarr[item] !== '') {
          if (item === that.selectarr.length - 1) {
            channelTargetstr += that.selectarr[item]
          } else {
            channelTargetstr += that.selectarr[item] + ','
          }
        }
      }
      this.axios({
        method: 'post',
        url: liveurl,
        params: {
          par: {
            sourceType: that.type,
            channelTarget: channelTargetstr,
            collegeName: that.Scollege,
            teacherName: that.Steacher,
            gradeId: that.grade,
            classroomName: that.Sclassname,
            isStudy: that.state
          }
        }
      })
      .then(function (res) {
        let total = 0
        let objs = res.data.threeList
        let objstitle = res.data.title
        that.title = []
        that.info = []
        that.channel = []
        for (let i = 0; i < objs.length; i++) {
          for (let k = 0; k < objs[i].channelsOfOneClassroomList.length; k++) {
            objs[i].channelsOfOneClassroomList[k]['classroomId'] = objs[i].classroomId
            that.info.splice(total, 1, objs[i].channelsOfOneClassroomList[k].rtmpUrl)
            that.title.splice(total, 1, objstitle[i].channelTitleOfOneClassroomList[k])
            that.channel.splice(total, 1, objs[i].channelsOfOneClassroomList)
            total++
          }
        }        
        that.total = total
        that.pageinfo = Math.ceil(total / that.pagesize)
        that.totalnum = total
        that.bingos = []
        that.bingos[that.pageval - 1] = 'selected'
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getCollegeAndTeachers () {
      let that = this
      // 学院
      this.axios({
        method: 'post',
        url: collegeteacherurl,
        params: {
          'par': {
            pageSize: pagesize,
            pageIndex: 1
          }
        }
      })
      .then(function (res) {
        let temp = []
        let teacher = []
        temp[0] = {value: '-1', txt: '全部'}
        teacher[0] = {value: '-1', txt: '全部'}
        let objs = res.data
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['txt'] = objs[item].collegeName
          let userList = objs[item].userList
          for (let k = 0; k < userList.length; k++) {
            teacher.push({value: userList[k].id, txt: userList[k].realName})
          }
        }
        that.collegeS = that.$Select({
          'data': temp,
          'originS': 'multiple',
          'selectId': ['select86', 'select85'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.Scollege = obj.value
            } else {
              that.Scollege = ''
            }
          }
        })


        that.selectItemlist = teacher;
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getgrades () {
      let that = this
      // 年级
      this.axios({
        method: 'post',
        url: getgradesurl,
        params: {
          'par': {
            pageSize: pagesize,
            pageIndex: 1
          }
        }
      })
      .then(function (res) {
        let temp = []
        let objs = res.data.data
        temp.push({value: '', txt: '全部'})
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['txt'] = objs[item].name
        }
        that.$Select({
          'data': temp,
          'originS': 'multiple',
          'selectId': ['select86', 'select85'],
          'callback': function (obj) {
            if (obj.ind !== 0) {
              that.grade = obj.value
            } else {
              that.grade = ''
            }
          }
        })
        that.pagepost({page: 1})
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getteachers () {
      let that = this
      // 普教老师
      this.axios({
        method: 'post',
        url: getteachersurl,
        params: {
          'params': {
            roleType: 2,
            organization: that.grade
          }
        }
      })
      .then(function (res) {
        let temp = []
        temp[0] = {value: '-1', txt: '全部'}
        let objs = res.data.result.data
        for (let item = 0; item < objs.length; item++) {
          temp[item + 1] = {}
          temp[item + 1]['value'] = objs[item].id
          temp[item + 1]['txt'] = objs[item].realName
        }

        that.selectItemlist = temp;
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  watch: {
    '$route' (to, from) {
//    if (to.name === 'AJloopClass') {
//      this.pagepost({page: this.pageval})
//    }
    }
  }
}
</script>
<style>
	.el-tabs__nav{
		margin-left: 50px;
	}
	#playerArea .channel{
		display: inline-block !important;
	}

  .el-input__icon{
  	height: auto!important;
  }

  .selectsss{
  	margin-top:40px !important;
  }
</style>

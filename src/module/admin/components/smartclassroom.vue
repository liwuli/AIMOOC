<template>
	<div class="app">
		<!-- <Ghead></Ghead> -->
		<!-- <transition name="fade">
			<router-view></router-view>
		</transition> -->
		<div class="center centerbottom50">
			<div class="centers">

				<div class="center" style="overflow: hidden;">
					<!-- <AJposition style="margin-left: 50px;"></AJposition> -->
					<div class="G_search" style="display: flex;align-content: center;">
						<div style="margin-left: 150px;">
							<span style="float:left;line-height: 35px;">教室名：</span>
							<DropdownThx @selectFunc="selectFunc" :itemlist="selectItemlist" :checkedId="selectItemCheckedId" :placeholder="selectPlaceholder"
							 :nodatatext="selectNodatatext" style="margin-left:30px;"></DropdownThx>
							<!-- <div class="btn" @click="search" style="height: 28px;display: flex;justify-content: center;align-items: center;margin-top: 1.5px;margin-left: 30px;">{{basicinfo.searchN}}</div> -->
						</div>
					</div>

					<div style="float: left; width: 94%;height: 1px;background-color: #0092D7;margin-left: 3%;margin-top: 20px;"></div>

					<directory @getlive="getlive" :classroom="classroom" :checkedId="selectid" ref="mychild" style="margin-top: 30px;"></directory>
					<div style="float: left;width: 60%;height: auto;margin-top: 20px;margin-left: 50px;margin-bottom: 30px;">
						<div style="width: 100%;height: 40px;display: flex;align-items: center;">
							<!-- <span v-if="collegeName!=null" style="font-size: 18px;margin-right: 30px;">学院：<span>{{collegeName}}</span>  </span> -->
							<span v-if="collegeName!=null" style="font-size: 16px;font-weight: 600; margin-right: 30px;">学院：<span style="font-weight: 500;">{{collegeName}}</span>
							</span>
							<span style="font-size: 16px;font-weight: 600; margin-right: 30px;">教学楼：<span style="font-weight: 500;">{{buildingName}}</span>
							</span>
							<span style="font-size: 16px;font-weight: 600; margin-right: 30px;">教室：<span style="font-weight: 500;">{{classroomName}}</span>
							</span>
							<!-- <span style="font-size: 16px;margin-right: 30px;">教室：{{classroomName}}</span> -->
							<span style="font-size: 16px;font-weight: 600; margin-right: 30px;">状态：<span style="font-weight: 500;">{{course_status? '正在上课':'没有上课'}}</span>
							</span>
							<!-- <span style="font-size: 16px;margin-right: 30px;">状态：{{course_status? '正在上课':'没有上课'}}</span> -->
							<span v-if="course_status" style="font-size: 16px;font-weight: 600; margin-right: 30px;">课程：<span style="font-weight: 500;">{{courseName}}</span>
							</span>
							<!-- <span v-if="course_status" style="font-size: 16px;margin-right: 30px;">课程：{{courseName}}</span> -->
							<span v-if="course_status" style="font-size: 16px;font-weight: 600; margin-right: 30px;">教师：<span style="font-weight: 500;">{{teacherName}}</span>
							</span>
							<!-- <span v-if="course_status" style="font-size: 16px;">教师：{{teacherName}}</span> -->

						</div>
						<div style="width: 100%;height:610px;">
							<List :totalnum="totalnum" :pagesize="pagesize" :screens="screens" :title="title" :channel="channel" :pageval="pageval"
							 :bingos="bingos" @pagepost="pagepost" :pageinfo="pageinfo" :info='info'></List>
						</div>

					</div>

				</div>

			</div>

		</div>

		<!-- <Gfoot></Gfoot> -->
	</div>
</template>

<script>
	import Radio from '@/components/extend/radio'
	import Check from '@/components/extend/check'
	import Ghead from '@/components/common/header'
	import Gfoot from '@/components/common/footer'
	import List from '@/components/extend/listLoopclassroom'
	import directory from '@/components/extend/directory'
	import Linklist from './linklist'
	import AJposition from '@/components/extend/position'
	import DropdownThx from '@/components/extend/dropdownThx'
	import {
		basicinfo,
		radioinfotype,
		bingos,
		liveurl,
		channelinfo,
		radioinfoauto,
		radioinfoscreen,
		radioinfostate,
		collegeteacherurl,
		pageval,
		pagesize,
		getteachersurl,
		getgradesurl,
		dropdownSelect,
		BrainRoomForBuilding
	} from '@/module/admin/config/smartclassroominfo'
	export default {
		name: 'AJloopClass',
		data() {
			return {
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
				classroom: [],
				selectid: "",
				buildingName: "", //教学楼名称
				classroomName: "", //教室名
				collegeName: null, //学校名
				num_stutas: true,
				course_status: false,
				courseName: null,
				teacherName: null


			}
		},
		created() {

			if (this.eduType) {
				// 高教-院系、老师列表
				this.getCollegeAndTeachers();
				this.getBrainRoomForBuilding();
			} else {
				// 普教-年级列表
				this.getgrades()
				// 普教-老师列表
				this.getteachers()
			}
			// 直播
			// this.pagepost({
			// 	page: 1
			// })
		},
		components: {
			Ghead,
			Gfoot,
			AJposition,
			List,
			Linklist,
			Radio,
			DropdownThx,
			Check,
			directory
		},
		methods: {
			// 获取教室列表
			getBrainRoomForBuilding() {

				var that = this;
				this.axios({
						method: 'post',
						url: BrainRoomForBuilding,
						params: {}
					})
					.then(function(res) {
						console.log("进来了")
						console.log(res)
						that.classroom = res.data.result;
						that.getlive(res.data.result[0].classRooms[0], res.data.result[0]);
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			//选择框选择参数
			selectFunc: function(obj) {
				this.selectid = obj.value;
			},

			getlive: function(obj, obj2) {

				var that = this;
				//初始化的时候调用子组件的方法
				this.buildingName = obj2.buildingName;
				this.classroomName = obj.classroomName;
				var url = "http://" + obj.deviceIp + ":" + obj.port + "/AiBrain/channelTemplate/findPatrolChannelInfo";
				//var url = "http://172.16.161.28:8080/AiBrain/channelTemplate/findPatrolChannelInfo";


				this.axios({
						method: 'post',
						url: url,
						params: {}
					})
					.then(function(res) {
						console.log(res);
						if (that.num_stutas) {
							that.$refs.mychild.opendiv();
							that.num_stutas = false;
						}
						if (res.data.result.onlineLessonInfo != null) {
							that.collegeName = res.data.result.onlineLessonInfo.collegeName;
							that.course_status = true;
							that.courseName = res.data.result.onlineLessonInfo.courseName;
							that.teacherName = res.data.result.onlineLessonInfo.teacherName;
						}
						let info = []
						let title = ["教师全景", "学生全景", "教师近景", "教师机画面", "学生近景"]
						res.data.result.channelList.forEach((item, index) => {
							//console.log(item);
							if (item.channelNo == 1) {
								info[0] = item.channelUrl
							} else if (item.channelNo == 3) {
								info[1] = item.channelUrl
							} else if (item.channelNo == 0) {
								info[2] = item.channelUrl
							} else if (item.channelNo == 6) {
								info[3] = item.channelUrl
							} else if (item.channelNo == 2) {
								info[4] = item.channelUrl
							}
						})
						that.info = info;
						that.title = title;
					})
					.catch(function(error) {
						//console.log(error)
						that.num_stutas = false;
						that.course_status = false;
						that.info = []
						that.title = ["教师全景", "学生全景", "教师近景", "教师机画面", "学生近景"]
						//alert("网络错误！请选择其他教室！");
					})

				// var data = {
				// 	"result": {
				// 		"channelList": [{
				// 			"channelNo": 0,
				// 			"channelUrl": "rtmp://172.16.149.139/live/chn_0",
				// 			"channelType": 0,
				// 			"channelName": "老师近景"
				// 		}, {
				// 			"channelNo": 1,
				// 			"channelUrl": "rtmp://172.16.149.139/live/chn_1",
				// 			"channelType": 0,
				// 			"channelName": "老师全景"
				// 		}, {
				// 			"channelNo": 2,
				// 			"channelUrl": "rtmp://172.16.149.139/live/chn_2",
				// 			"channelType": 1,
				// 			"channelName": "学生近景"
				// 		}, {
				// 			"channelNo": 3,
				// 			"channelUrl": "rtmp://172.16.149.139/live/chn_3",
				// 			"channelType": 1,
				// 			"channelName": "学生全景"
				// 		}, {
				// 			"channelNo": 4,
				// 			"channelUrl": "rtmp://172.16.149.139/live/chn_4",
				// 			"channelType": 1,
				// 			"channelName": "考勤巡航"
				// 		}, {
				// 			"channelNo": 6,
				// 			"channelUrl": "rtmp://172.16.161.49/live/chn_7",
				// 			"channelType": 2,
				// 			"channelName": "教师机画面"
				// 		}, {
				// 			"channelNo": 7,
				// 			"channelUrl": "rtmp://172.16.149.139/live/chn_pgm_35",
				// 			"channelType": 3,
				// 			"channelName": "PGM通道画面"
				// 		}],
				// 		"onlineLessonInfo": null
				// 	},
				// 	"code": 200,
				// 	"message": "查询成功"
				// }

			},

			checkevent(obj) {
				let ind = obj.id * 1
				if (this.selectarr[ind] === '') {
					this.selectarr.splice(ind, 1, ind)
				} else {
					this.selectarr.splice(ind, 1, '')
				}
			},
			search() {
				this.pagepost({
					page: 1
				})
			},
			radioeventtype(obj) {
				if (this.auto === 1) {
					this.type = 0
					this.auto = 0
					clearInterval(this.intervalcount)
				} else {
					this.type = obj.val
					this.search()
				}
			},
			radioeventstate(obj) {
				this.state = obj.val
			},
			radioeventscreen(obj) {
				this.screens = obj.val
				if (obj.val === '1') {
					this.pagesize = 9
				} else {
					this.pagesize = 4
				}
				this.pageval = 1
				this.pageinfo = Math.ceil(this.total / this.pagesize)
			},
			radioeventauto(obj) { // 自动巡课
				this.auto = obj.val
				let that = this
				if (obj.val === '1') {
					this.autoval = false
					this.intervalcount = setInterval(function() {
						if (that.pageinfo < that.pageval + 1) {
							that.pageval = 0
						}
						that.pagepost({
							page: that.pageval + 1
						})
					}, that.times * 1000)
				} else {
					this.autoval = false
					clearInterval(this.intervalcount)
				}
			},
			pagepost(obj) {

				// let that = this
				// if (typeof obj === 'number') {
				// 	obj = {
				// 		page: obj
				// 	}
				// }
				// that.pageval = obj.page
				// if (this.screens === '1') {
				// 	this.pagesize = 9
				// } else {
				// 	this.pagesize = 4
				// }
				// let channelTargetstr = ''
				// for (let item = 0; item < that.selectarr.length; item++) {
				// 	if (that.selectarr[item] !== '') {
				// 		if (item === that.selectarr.length - 1) {
				// 			channelTargetstr += that.selectarr[item]
				// 		} else {
				// 			channelTargetstr += that.selectarr[item] + ','
				// 		}
				// 	}
				// }
				// 
				// this.axios({
				// 		method: 'post',
				// 		url: liveurl,
				// 		params: {
				// 			par: {
				// 				sourceType: that.type,
				// 				channelTarget: channelTargetstr,
				// 				collegeName: that.Scollege,
				// 				teacherName: that.Steacher,
				// 				gradeId: that.grade,
				// 				classroomName: that.Sclassname,
				// 				isStudy: that.state
				// 			}
				// 		}
				// 	})
				// 	.then(function(res) {
				// 		
				// 		let total = 0
				// 		let objs = res.data.threeList
				// 		let objstitle = res.data.title
				// 		that.title = []
				// 		that.info = []
				// 		that.channel = []
				// 		for (let i = 0; i < objs.length; i++) {
				// 			for (let k = 0; k < objs[i].channelsOfOneClassroomList.length; k++) {
				// 			
				// 				objs[i].channelsOfOneClassroomList[k]['classroomId'] = objs[i].classroomId
				// 				that.info.splice(total, 1, objs[i].channelsOfOneClassroomList[k].rtmpUrl)
				// 				that.title.splice(total, 1, objstitle[i].channelTitleOfOneClassroomList[k])
				// 				that.channel.splice(total, 1, objs[i].channelsOfOneClassroomList)
				// 				total++
				// 			}
				// 		}
				// 		that.total = total
				// 		that.pageinfo = Math.ceil(total / that.pagesize)
				// 		that.totalnum = total
				// 		that.bingos = []
				// 		that.bingos[that.pageval - 1] = 'selected'
				// 	})
				// 	.catch(function(error) {
				// 		console.log(error)
				// 	})
			},
			getCollegeAndTeachers() {
				let that = this
				// 学院
				this.axios({
						method: 'post',
						url: collegeteacherurl,
						params: {
							params: {
								"classroomName": ""
							}
						}
					})
					.then(function(res) {
						let temp = [];
						let teacher = [];
						temp[0] = {
							value: '-1',
							txt: '全部'
						}
						teacher[0] = {
							value: '-1',
							txt: '全部'
						}
						let objs = res.data.result
						for (let item = 0; item < objs.length; item++) {
							temp[item + 1] = {}
							temp[item + 1]['value'] = objs[item].classroomId
							temp[item + 1]['txt'] = objs[item].classroomName
							let userList = objs
							for (let k = 0; k < userList.length; k++) {
								teacher.push({
									value: userList[k].classroomId,
									txt: userList[k].classroomName
								})
							}
						}
						// that.collegeS = that.$Select({
						//   'data': temp,
						//   'originS': 'multiple',
						//   'selectId': ['select86', 'select85'],
						//   'callback': function (obj) {
						//     if (obj.ind !== 0) {
						//       that.Scollege = obj.value
						//     } else {
						//       that.Scollege = ''
						//     }
						//   }
						// })


						that.selectItemlist = temp;
					})
					.catch(function(error) {
						console.log(error)
					})

			},
			getgrades() {
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
					.then(function(res) {
						let temp = []
						let objs = res.data.data
						temp.push({
							value: '',
							txt: '全部'
						})
						for (let item = 0; item < objs.length; item++) {
							temp[item + 1] = {}
							temp[item + 1]['value'] = objs[item].id
							temp[item + 1]['txt'] = objs[item].name
						}
						that.$Select({
							'data': temp,
							'originS': 'multiple',
							'selectId': ['select86', 'select85'],
							'callback': function(obj) {
								if (obj.ind !== 0) {
									that.grade = obj.value
								} else {
									that.grade = ''
								}
							}
						})
						that.pagepost({
							page: 1
						})
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			getteachers() {
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
					.then(function(res) {
						let temp = []
						temp[0] = {
							value: '-1',
							txt: '全部'
						}
						let objs = res.data.result.data
						for (let item = 0; item < objs.length; item++) {
							temp[item + 1] = {}
							temp[item + 1]['value'] = objs[item].id
							temp[item + 1]['txt'] = objs[item].realName
						}

						that.selectItemlist = temp;
					})
					.catch(function(error) {
						console.log(error)
					})
			}
		},
		watch: {
			'$route'(to, from) {
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
</style>
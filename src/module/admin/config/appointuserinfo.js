import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl+'/control/booking/findBookingClassroom'
export const roomurl = developUrl+'/base/building/getBuildings'
export const termurl = developUrl+'/control/term/findTermsLists'
export const pathinfo = {'prex': 'AJappointuser', 'optname': '预约'}
export const addtimeurl = developUrl+'/control/booking/addBookingTemplate'
export const edittimeurl = developUrl+ '/control/booking/updateBookingTemplate'
export const deltimeurl =  developUrl+'/control/booking/deleteBookingTemplate'
export const timelisturl =  developUrl+'/control/booking/findBookingTemplate'
export const findtimesurl = developUrl+'/control/term/findCurrentTerm'
export const getdetailurl = developUrl+'/control/booking/findBookingClassroomDetail'
export const pagesize = 1000
export const pagesizeten = 10
export const pageval = 1
export const bingos = []
export const statearr = ['空闲', '已占满']
export const statearrManage = ['未审核', '已审核', '审核失败']
export const typearr = ['常态教室', '集控教室']
export const listhead = ['节次', '时间', '状态']
export const percentinfo = ['wid10', 'wid80', 'wid10']
export const optevent = ['classs', 'time', 'state']
// 用户添加预约
export const radioinfolive = {
  classname: 'radiofather live',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    'father': '.live span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const radioinforecord = {
  classname: 'radiofather record',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    'father': '.record span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const basicinfo = {
  msgtimeN: '时间预约',
  editN: '编辑',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  SroomN: '教室',
  searchN: '查询',
  msgN: '课程名',
  dateN: '时间',
  roomN: '教室',
  stateN: '教室状态',
  stateManageN: '预约状态',
  typeN: '教室类型',
  buildingN: '教学楼',
  timeN: '预约时间',
  allN: '全部',
  timeManageN: '预约时间管理',
  historyManageN: '历史记录',
  appointManageN: '我要预约',
  msgcompare: '开始时间不能大于结束时间',
  use: '占用',
  nouse: '空闲',
  msgdetailN: '详情',
  detaildateN: '预约日期',
  msgaddN: '添加预约',
  addN: '添加',
  pinknext: '节',
  pinkpre: '第',
  classN: '请选择节次',
  reasonN: '请填写事由',
  phoneN: '请填写手机',
  msgpassN: '审核',
  passN: '审核',
  contentpassN: '确定要审核通过吗？',
  msgbackN: '撤销',
  backN: '撤销',
  msgdetailsN: '查看详情',
  detailN: '查看详情',
  detailnameN: '教室',
  detailtimeN: '预约时间',
  detailuserN: '申请人',
  detailphoneN: '联系方式',
  detailyesN: '是',
  detailnoN: '否',
  detailreasonN: '事由',
  detailstateN: '状态',
  detailliveN: '直播',
  detailrecordN: '录制'
}
export const useraddappointurl = developUrl+'/control/booking/addBooking'

// 详情界面数据
export const getappointlisturl = developUrl+'/control/booking/findBooking'
export const updateappointurl = developUrl+'/control/booking/updateBooking'
export const listheadAManage = ['教室', '教室类型', '时间', '状态', '操作']
export const percentinfoAManage = ['wid30', 'wid20', 'wid20', 'wid10', 'wid20']
export const opteventAManage = ['addlist', 'editlist', 'jumplist'] // dellist
export const columsAManage = ['room', 'roomtype', 'time', 'state', 'opt']
export const optobjinfoAManage = ['审核', '撤销', '详情']
export const optobjinfoAManage1 = ['详情']
export const optobjinfoAManageshow = ['none', 'none', 'block']
export const jumpinfo = {'prex': 'AJappointuserHistory', 'optname': '预约'}
// 获取记录
export const getappointhistoryurl =developUrl+ '/control/booking/findPastBooking'

export const basicinfo = {
  liveNameN: '直播名称',
  liveStatusN: '直播状态',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  sureN: '确定',
  contentN: '确定要删除吗？',
  stopcontentN: '确定要停止直播吗？',
	releaseN:'确定要发布吗？',
	publishN: '发布资源',
  msgaddN: '直播添加',
  msgeditN: '直播编辑',
  msgdelN: '直播删除',
  searchN: '查询',
  msgstopN: '停止直播'
}
export const listhead = ['check', '直播名称', '开始时间', '结束时间', '描述', '状态', '操作']
export const pathinfo = {'prex': 'AJlive', 'optname': '直播管理'}
export const colums = ['check', 'liveName', 'beginTime', 'endTime', 'description', 'liveStatus', 'opt']
export const percentinfo = ['wid0', 'wid20noboxshadow', 'wid20', 'wid20', 'wid10', 'wid10', 'wid20']
export const optobjinfoAll = ['查看', '停止直播']
export const opteventAll = ['seedetail', 'stoplive']
export const optobjinfoAllA = ['修改', '删除']
export const opteventAllA = ['editlist', 'dellist']
export const optobjinfoAllB = ['回看', '下载', '删除']
export const opteventAllB = ['see', 'downlist', 'dellist']
// 配置的按钮
export const optobjinfoAllBwait = ['播放','下载','删除','发布']
export const opteventAllBwait = ['play','download','dellist','release']

export const bingos = []
export const searchinput = 'width:150px;'
export const searchstyle = 'position:absolute;width:300px;'
export const pageval = 1
export const products = []
export const infoval = []

import {developUrl} from '@/module/admin/config/urlPage'
export const playurl = developUrl + '/live/live/liveResReview'
export const listurl = developUrl + '/live/live/getLiveList'
export const addurl = developUrl + '/live/live/addLive'
export const editurl = developUrl + '/live/live/updateLive'
export const delurl = developUrl + '/live/live/delLive'
export const stopurl = developUrl + 'live/live/closeLiveManually'
// 发布直播
export const releaseurl = developUrl + 'live/live/livePublishOrNot'

export const pagesize = 10
export const powerinfo = {
  OeN: '编辑',
  OdN: '删除',
  OaN: '添加',
  OstopN: '停止直播',
  OseedetailN: '查看',
  OseeN: '回看',
  OdownN: '下载',
  OPdownlist: 'downlist',
  OPseelist: 'see',
  OPseedetaillist: 'seedetail',
  OPalist: 'addlist',
  OPelist: 'editlist',
  OPdlist: 'dellist',
  OPstoplist: 'stoplive'
}
export const liveinfo = {
  accept: '.jpg,.png,.bmp,.jpeg',
  stoplive: '管理员停止直播',
  mastername: '姓名',
  name: '直播名称',
  des: '直播描述',
  record: '直播录制',
  time: '时间',
  to: '到',
  master: '直播主持人',
  masterplaceholder: '选择主持人或者填写主讲人姓名',
  masterbtn: '选择主持人',
  type: '直播类型',
  pic: '直播封面图',
  selectpic: '选择图片',
  uploadP: '上传图片',
  uperr: '上传失败',
  uploadimgN: '请上传图片',
  addlivertmp: '添加直播地址',
  addlivertmpcommit: '(目前平台仅支持rtmp)',
  rtmpplaceholder: '请输入直播地址，如rtmp://xx.xx.xx.xx',
  screen: '画面',
  singleB: '标清地址',
  singleG: '高清地址',
  singleS: '超高清地址',
  multipleadd: '添加直播画面',
  screenplaceholder: '请输入画面名称',
  save: '保存',
  cancel: '取消',
  search: '查询',
  schoolnumber: '学号/工号',
  masterselectplaceholder: '请输入工号或真实姓名',
  pink: '排序',
  stime: '开始时间',
  etime: '结束时间',
  livestatus: '直播状态',
  livename: '直播名称'
}
export const mutiplearr = [true, true, false, false, false]
export const warntxt = {
  name: '请完善直播信息',
  master: '请输入或选择主持人',
  writepink: '请填写完毕，再添加',
  selectmaster: '请选择主持人',
  multiplescreen: '填写格式不对应，请填写画面',
  B: '标清地址',
  G: '高清地址',
  S: '超清地址',
  rtmp: '请填写正确的直播地址',
  downres: '直播资源下载',
  ressee: '直播资源查看',
  nourl: '请填写直播地址',
  screenname: '请填写画面',
  screenname1: '名称',
  screenneed: '请完善多画面信息',
  nodata: '暂无数据',
  msgplayN: '资源播放',
  publishok: '发布成功',
  suretocancelpublish: '确定取消发布资源',
  suretopublish: '确定要发布',
  publishN: '发布资源',
  published: '已发布',
  unpublish: '未发布'
}
export const addradioinfo = {
  classname: 'radiofather',
  val: [1, 0],
  title: ['是', '否'],
  opt: {
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const editradioinfo = {
  classname: 'radiofather',
  val: [1, 0],
  title: ['是', '否'],
  opt: {
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const addtyperadioinfo = {
  classname: 'radiofather addtype',
  val: [1, 2],
  title: ['单画面直播', '多画面直播'],
  opt: {
    'father': '.addtype span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const edittyperadioinfo = {
  classname: 'radiofather addtype',
  val: [1, 2],
  title: ['单画面直播', '多画面直播'],
  opt: {
    'father': '.addtype span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const uploadimgurl = developUrl + '/base/dubbo/uploadImgStream'
export const getuserurl = developUrl + 'base/user/getUsers2'
export const masterroletypearr = [
  {value: '4', txt: '全部'},
  {value: '3', txt: '学生'},
  {value: '2', txt: '老师'}
]
export const livetypearr = [
  {value: '3', txt: '全部'},
  {value: '1', txt: '直播中'},
  {value: '0', txt: '待直播'},
  {value: '2', txt: '已结束'},
	{value: '4', txt: '已录制'},
	{value: '5', txt: '已发布'}
]
export const ordertypearr = [
  {value: '0', txt: '默认'},
  {value: '1', txt: '按开始时间'},
  {value: '2', txt: '按结束时间'}
]

export const stutasarr = [
  {value: '', txt: '全部'},
  {value: '1', txt: '已发布'},
  {value: '0', txt: '未发布'}
]

export const livedownurl = developUrl + '/live/live/listDownloadResources'
export const livereviewurl = developUrl + '/live/live/liveResReview'

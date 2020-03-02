export const basicinfo = {
  seatBtn: '空闲座位推送',
  userNameN: '集控录播名',
  realNameN: '真实姓名',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgaddN: '集控录播添加',
  msgeditN: '集控录播编辑',
  msgdelN: '集控录播删除',
  msgroomaddN: '教室添加',
  addallN: '添加设备',
  msgaddchannelN: '通道添加',
  msgeditchannelN: '通道编辑',
  msgdelchannelN: '通道删除',
  msgsetchannelN: '通道标定',
  errorinfo: '标定数据不完整',
  tableinfo: '请正确填写桌长桌高数据',
  addressN: '地点',
  manuN: '制造商',
  passN: '密码',
  userN: '用户名',
  useN: '有效设备',
  tipN: '请选择要管理设备的教室',
  SbuildingN: '教学楼',
  SclassroomN: '教室',
  photoobjN: '拍摄对象',
  yes: '是',
  no: '否',
  nameN: '设备名称',
  channelnameN: '通道名称',
  httpN: '协议类型',
  URLN: 'URL地址',
  IPN: 'IP地址',
  PORTN: '端口号',
  deviceN: '设备类型',
  deskwid: '桌长',
  deskhei: '桌高',
  deskjtjs: '阶梯教室',
  deskfree: '自由屏蔽',
  deskjx: '畸形'
}
export const devicetype = {ip: 'ip地址：', manu: '制造商：', type: '设备类型：', use: '设备是否有效：', channelno: '通道号： ', phototype: '拍摄类型： '}
// '标定',
export const optobjinfoAll = ['修改', '编辑通道',  '删除']
// 'channelsetlist',
export const opteventAll = ['editlist', 'channeleditlist',  'dellist']

export const optobjinfoAllA = ['修改', '添加通道', '删除']
export const opteventAllA = ['editlist', 'channeladdlist', 'dellist']

export const listhead = ['设备名称', '设备IP', '设备是否有效', '通道名称', '通道号', '拍摄对象', '操作']
export const colums = ['name', 'ip', 'useval', 'channelname', 'channelno', 'photoobj', 'opt']
export const percentinfo = ['wid15', 'wid15', 'wid10', 'wid10', 'wid8', 'wid12', 'wid30']
export const pathinfo = {'prex': 'AJcontrolrecord', 'optname': '集控录播'}
export const products = []
export const infoval = []
export const bingos = []
export const searchinput = 'width:150px;'
export const searchstyle = 'position:absolute;width:300px;'
export const pageval = 1

import { developUrl } from '@/module/admin/config/urlPage'
export const buildingurl = developUrl + '/base/building/getBuildings'
export const buildinglisturl = developUrl + '/control/controlRecording/findBuildingList'
export const controllisturl = developUrl + '/control/controlRecording/getBuildingForControl'
export const dailylisturl = developUrl + '/control/dailyRecording/getBuildingForDaily'
export const getequipmentsurl = developUrl + '/base/equipment/findEquipmentsAndChannels'
export const addurl = developUrl + '/control/controlRecording/addEquipment'
export const editurl = developUrl + '/control/controlRecording/editEquipment'
export const delurl = developUrl + '/control/controlRecording/deleteEquipment'
export const channeladd = developUrl + '/control/controlRecording/addChannel'
export const channeledit = developUrl + '/control/controlRecording/updateChannel'
export const channeldel = developUrl + '/control/controlRecording/deleteChannel'
export const saveurl = developUrl + '/control/controlRecording/editControlClassRoom'
export const imgurl = developUrl + '/control/controlRecording/findChannelImage'
export const setchannelurl = developUrl + '/control/controlRecording/setCoordinates'
export const exportEquipments = developUrl + '/base/equipment/exportEquipments'
export const pagesize = 10000
export const manufacturerinfo = [
  {'txt': '请选择...', value: -1},
  {'txt': '未设置...', port: '0', value: 0},
  {'txt': '屏幕', port: '6301', value: 1},
  {'txt': '明日', port: '0', value: 2},
  {'txt': '天地伟业', port: '0', value: 3, user: 'admin', pass: 'admin'},
  {'txt': '晨安视讯', port: '80', value: 4, user: 'admin', pass: '123456'},
  {'txt': '录播', port: '5560', value: 5},
  {'txt': '维海德', port: '81', value: 6},
  {'txt': '千视VGA', port: '8080', value: 7},
  {'txt': '保凌', port: '8091', value: 8},
  {'txt': '海康威视', port: '80', value: 9, user: 'admin', pass: 'admin123'},
  {'txt': '汉邦高科', port: '8101', value: 10},
  {'txt': '宇视', port: '1000', value: 11},
  {'txt': '日立', port: '81', value: 12},
  {'txt': '大华', port: '80', value: 13, user: 'admin', pass: 'admin'},
  {'txt': '保凌新版本', port: '0', value: 14},
  {'txt': '海康E系列', port: '0', value: 15},
  {'txt': '华为', port: '80', value: 16, user: 'admin', pass: 'HuaWei123'},
  {'txt': '耐杰', port: '8080', value: 17, user: 'system', pass: 'system'},
  {'txt': '竞业达', port: '80', value: 18, user: 'admin', pass: '12345'},
  {'txt': 'V500', port: '0', value: 19}
]
export const device = [
  {'txt': '请选择...', value: -1},
  {'txt': '教师机', value: 0},
  {'txt': '网络摄像机', value: 1},
  {'txt': '录播', value: 2},
  {'txt': 'VGA', value: 3},
  {'txt': '跟踪终端', value: 4}
// {'txt': '集控工作站', value: 5},
// {'txt': '转发录播服务器', value: 6},
// {'txt': '流媒体服务器', value: 7},
// {'txt': '分析服务器', value: 8},
// {'txt': '本地录播服务器', value: 9},
// {'txt': '常态录播设备', value: 10},
// {'txt': '中控设备', value: 11}
]
export const photoobj = [
  {'txt': '请选择...', value: -1},
  {'txt': '学生', value: 0},
  {'txt': '老师', value: 1},
  {'txt': 'PPT', value: 2},
  {'txt': '学生全景', value: 3},
  {'txt': 'PGM', value: 4},
  {'txt': '老师全景', value: 5}
]

export const radioinfo = {
  classname: 'radiofather',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    init: {
      val: true,
      index: 1
    },
    inputflag: true
  }
}
export const addradioinfo = {
  classname: 'radiofather',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    init: {
      val: true,
      index: 1
    },
    inputflag: true
  }
}
export const powerinfo = {
  OaN: '添加通道',
  OecN: '编辑通道',
  OeN: '修改',
  OdN: '删除',
  OsN: '标定',
  OPallist: 'channeladdlist',
  OPdlist: 'dellist',
  OPechannellist: 'channeleditlist',
  OPschannellist: 'channelsetlist',
  OPelist: 'editlist'
}
export const warntxt = {
  name: '设备名称不能为空',
  http: '请选择协议类型',
  manu: '请选择制造商',
  PORT: '请填写端口号',
  type: '请选择设备类型',
  IP: '请填写IP地址',
  IPright: '请填写正确格式的IP地址',
  URL: '请填写URL',
  user: '请填写用户名',
  pass: '请填写密码',
  channelname: '通道名称不能为空',
  channeltype: '请选择拍摄对象'
}

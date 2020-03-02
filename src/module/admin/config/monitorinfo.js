export const basicinfo = {
  msg: '教室名',
  roomtype: '教室类别',
  deviceNameN: '名称',
  servernameN: '名称',
  serverstateN: '状态',
  serveruseN: '使用情况',
  serverpathN: '盘符',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgaddN: '系统分析添加',
  msgseeN: '预览',
  msgeditN: '系统分析编辑',
  msgdelN: '系统分析删除',
  serverN: '服务器情况监控',
  channelN: '通道',
  nourl: '暂无数据',
  searchN: '查询'
}

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/control/MonitorAction/getClassroomInitStatusJSON'
export const serverurl = developUrl + '/control/MonitorAction/getServerInitStatusJSON'
export const exeurl = developUrl + '/control/command/azimuthControl'
export const channelinfo = [
  {'txt': '集控教室', val: 0},
  {'txt': '常态教室', val: 1}
]
export const pathinfo = {'prex': 'AJmonitor', 'optname': '服务器管理'}
export const recordinfo = ['未录制', '录制中']
export const connectinfo = ['连接异常', '连接正常', '连接异常', '连接异常']
export const classinfo = ['errors', 'normal', 'errors', 'errors']
export const radioinfo = {
  classname: 'radiofather',
  val: [0, 1, 2, 3, 4],
  title: ['学生全景', '老师全景', '学生', '老师', 'PPT'],
  opt: {
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const directioninfo = {
  bigN: '放大',
  smallN: '缩小',
  upN: '上移',
  rightN: '右移',
  downN: '下移',
  leftN: '左移',
  optN: '请选择通道，操作',
  speedN: '速度'
}
export const warntxt = {
  normal: '正常',
  err: '异常',
  errppt: 'PPT异常',
  recording: '正在录制',
  errorrecord: '录制异常',
  unrecord: '未录制'
}
export const servercontrolinfo = {
  state: '状态',
  building: '教学楼',
  classroom: '教室服务监控',
  server: '服务器情况监控',
  room: '教室',
  connectstate: '连接状态'
}
export const recordtype = [
  {txt: '全部', 'value': -1},
  {txt: '正在录制', 'value': 1},
  {txt: '录制异常', 'value': 2},
  {txt: '未录制', 'value': 0}
]
export const connecttype = [
  {txt: '全部', 'value': -1},
  {txt: '连接正常', 'value': 1},
  {txt: '设备异常', 'value': 0},
  {txt: 'PPT异常', 'value': 2}
]
export const controllisturl = developUrl + '/control/controlRecording/getBuildingForControl'

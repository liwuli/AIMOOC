export const basicinfo = {
  contentN: '确定要删除吗？',
  optN: '操作',
  ScollegeN: '学院',
  SteacherN: '教师',
  searchN: '查询',
  msgN: '教室名',
  msgaddN: '预览',
  saveN: '保存',
  cancelN: '取消',
  SclassnameN: '教室名',
  stateN: '状态',
  typeN: '类型',
  screenN: '分屏模式',
  autoN: '自动巡课',
  channelN: '通道',
  timeN: '间隔',
  gradeN:'年级'
}

import {developUrl} from '@/module/admin/config/urlPage'
export const collegeteacherurl = developUrl + '/base/building/getBrainRoomByName'
export const BrainRoomForBuilding = developUrl +'/base/building/getBrainRoomForBuilding'
export const liveurl = developUrl + '/control/OnlineLoopClassAction/findLoopClassList'
export const exeurl = developUrl + '/control/command/azimuthControl'
export const getteachersurl = developUrl + '/base/user/getUsers'
export const getgradesurl = developUrl + '/base/StudySection/getStudySectionList'
export const pagesize = 4
export const pageval = 1
export const bingos = []
export const pathinfo = {'prex': 'AJloopClass', 'optname': '巡课'}
export const channelinfo = [
  {'txt': '学生', val: 0},
  {'txt': '老师', val: 1},
  {'txt': 'PPT', val: 2},
  {'txt': '学生全景', val: 3},
  {'txt': 'PGM', val: 4},
  {'txt': '教室全景', val: 5}
]
export const radioinfostate = {
  classname: 'radiofather state floatleft',
  val: [0, 1],
  title: ['全部', '录制中'],
  opt: {
    father: '.state span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const radioinfoscreen = {
  classname: 'radiofather screen floatleft',
  val: [0, 1],
  title: ['4', '9'],
  opt: {
    father: '.screen span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const radioinfoauto = {
  classname: 'radiofather auto floatleft',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    father: '.auto  span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const radioinfotype = {
  classname: 'radiofather type ',
  val: [0, 1],
  title: ['集控', '常态'],
  opt: {
    father: '.type  span',
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
  speedN: '速度'
}
export const dropdownSelect = {
  placeholder: '请选择...',
  nodatatext: '暂无数据'
}

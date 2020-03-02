export const basicinfo = {
  msg: '教室名称',
  msgseeN: '教室详情',
  deviceNameN: '名称',
  buildingN: '教学楼',
  searchN: '查询',
  nourl: '暂无数据'
}
export const pathinfo = {'prex': 'AJattendRate', 'optname': '到勤率'}
export const timeout = 60000
export const warntxt = {
  normal: '正常-到勤率大于等于',
  err: '异常-到勤率小于',
  nodata: '数据缺失',
  noclass: '暂无课程',
  loading:'等待分析'

}
export const attendrateinfo = {
  total: '应到人数',
  come: '实到人数',
  dql: '到勤率',
  person: '人'
}

import {developUrl} from '@/module/admin/config/urlPage'
export const controllisturl = developUrl + '/control/controlRecording/getBuildingForControl'
export const getinfourl = developUrl + '/control/attendRateMonitor/findClassRooms'
export const findAllCourses = developUrl + '/control/course/findAllCourses';   //查所有课程
export const teacherurl = developUrl + '/base/user/findUsersByRole' //根据roleType 查询 老师或者其他

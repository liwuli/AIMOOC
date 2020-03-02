export const listhead = ['教室/统计数', '今日课时', '计划课时', '已录课时', '资源完整课时', '资源不完整课时', '录制失败课时', '录制异常课时', '已迁移课时', '录制完成率']
export const percentinfo = ['wid10', 'wid10', 'wid10', 'wid10', 'wid10', 'wid10', 'wid10', 'wid10', 'wid10', 'wid10']
export const pathinfo = {'prex': 'AJanalysis', 'optname': '统计'}

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/control/ClassStatisticsAction/getClassStatistics'
export const roomurl = developUrl + '/base/building/getBuildings'
export const termurl = developUrl + '/control/term/findTermsLists'
export const basicinfo = {
  buildingN: '教学楼',
  roomN: '教室',
  StypeN: '筛选方式',
  recordtypeN: '录制类型',
  searchN: '查询',
  dateN: '开始月份',
  edateN: '结束月份',
  sdateN: '开始日期',
  eedateN: '结束日期',
  nameNULL: '教室为空',
  termN: '学期',
  endWeekN: '结束周',
  startWeekN: '开始周'
}
export const autolist = {
  auto: '自动',
  noauto: '手动'
}
export const timetype = {
  free: '自由时间',
  week: '学期周次',
  month: '月份'
}

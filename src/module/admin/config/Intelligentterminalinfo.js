export const basicinfo = {
  search: '查询',
  buildN: '教学楼',
  classroomN: '教室',
  IPN: 'IP',
  msgaddN: '添加智慧终端',
  nameN: '教学楼',
  inputN: 'IP',
  saveN: '保存',
  port: '端口',
  cancelN: '取消',
  msgeditN: '修改智慧终端',
  msgdelN: '删除智慧终端',
  contentN: '确定要删除吗？',
  delN: '删除',
  confirm: '确定'
}

export const listhead = ['教学楼', '教室', 'IP', '操作']
export const pathinfo = {'prex': 'AJintelligentterminal', 'optname': '智慧终端'}
export const percentinfo = ['wid25', 'wid25', 'wid25', 'wid25']
export const optobjinfoAll = ['修改', '删除', '管理'] // 弃用
export const opteventAll = ['editlist', 'dellist', 'manlist'] // 弃用
export const colums = ['buildingName', 'classroomName', 'deip', 'opt']
export const products = []
export const infoval = []
export const bingos = []
export const pageval = 1
import {developUrl} from './urlPage'
export const buildinglisturl = developUrl + '/control/controlRecording/findBuildingList'
export const listurl = developUrl + '/control/aiBrainController/findEquipmentListForAiBrain'
export const optionurl = developUrl + '/control/controlRecording/findBuildingList'
export const addurl = developUrl + '/control/aiBrainController/addEquipment'
export const editurl = developUrl + '/control/aiBrainController/editEquipment'
export const delurl = developUrl + '/control/aiBrainController/deleteEquipment'
export const showurl = developUrl + '/control/aiBrainController/findBuildingEquipmentListForAiBrain'
export const anaSerMonitorUrl = developUrl + '/control/MonitorAction/analysisServersMonitor'
export const sensitiveWordUrl = '/AiBrain_Server/sensitive/querySensitiveWordByLessonId'
export const emotionWarningUrl = '/AiBrain_Server/emotion/queryEmotionWarningByLessonId'
export const buildingsUrl = developUrl + '/base/building/getBuildings'

export const pagesize = 10

export const powerinfo = {
  OeN: '修改',
  OdN: '删除',
  OaN: '添加',
  OmaN: '管理',
  OPalist: 'addlist',
  OPelist: 'editlist',
  OPdlist: 'dellist',
  OPmalist: 'manlist'
}

export const warntxt = {
  bu: '教学楼不能为空',
  cl: '教室不能为空',
  ip: 'IP不能为空'
}

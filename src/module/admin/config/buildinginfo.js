export const basicinfo = {
  addressN: '地点',
  nameN: '名称',
  roomipN: '教室IP',
  desN: '描述',
  roomN: '教室名称',
  pointN: '允许预约',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgaddN: '教室添加',
  msgroomaddN: '教学楼添加',
  msgroomeditN: '教学楼编辑',
  msgroomdelN: '教学楼删除',
  msgeditN: '教室编辑',
  msgdelN: '教室删除',
  nameNULL: '名称不能为空！'
}
export const optobjinfoAll = ['编辑', '删除'] // 原始数据操作，无需修改
export const opteventAll = ['editlist', 'dellist'] // 原始数据操作，无需修改
export const powerinfo = {
  OeN: '编辑',
  OdN: '删除',
  OheN: '修改',
  OhdN: '删除教学楼',
  OaN: '添加教室',
  OpN: '授权',
  OPalist: 'addlist',
  OPelist: 'editlist',
  OPdlist: 'dellist',
  OPhalist: 'headoptadd',
  OPhelist: 'headoptedit',
  OPhdlist: 'headoptdel'
}
export const listhead = ['check', '名称', '信息', 'opt']
export const listheadoptinfoAll = ['添加教室', '修改', '删除教学楼'] // 原始数据操作，无需修改
export const listheadoptoptAll = ['headoptadd', 'headoptedit', 'headoptdel'] // 原始数据操作，无需修改
export const pathinfo = {'prex': 'AJbuilding', 'optname': '教室'}
export const percentinfo = ['wid7', 'wid28', 'wid40', 'wid25']
export const colums = ['check', 'name', 'classType', 'opt']

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/base/building/getBuildings'
export const addurl = developUrl + '/base/building/addBuilding'
export const adddetailurl = developUrl + '/base/classroom/addClassroom'
export const editdetailurl = developUrl + '/base/classroom/updateClassroom'
export const deldetailurl = developUrl + '/base/classroom/deleteClassroom'
export const editurl = developUrl + '/base/building/updateBuilding'
export const delurl = developUrl + '/base/building/deleteBuilding'
export const singledelurl = developUrl + '/base/building/deleteSingleBuilding'
export const pagesize = 10
export const pageval = 1
export const radioinfo = {
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
export const warntxt = {
  name: '请填写教学楼名称',
  room: '请填写教室名称'
}


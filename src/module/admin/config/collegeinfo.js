export const basicinfo = {
  nameN: '名称',
  codeN: '代码',
  desN: '描述',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgaddN: '学院添加',
  msgeditN: '学院编辑',
  msgdelN: '学院删除'
}
export const optobjinfoAll = ['编辑', '删除']
export const listhead = ['check', '名称', '代码', '描述', '操作']
export const percentinfo = ['wid5', 'wid25', 'wid15', 'wid40', 'wid15']
export const colums = ['check', 'name', 'code', 'des', 'opt']
export const opteventAll = ['editlist', 'dellist']
export const pageval = 1
export const bingos = []
export const pathinfo = {'prex': 'AJcollege', 'optname': '学院'}

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/base/CollegeManageAction/findCollegeList'
export const addurl = developUrl + '/base/CollegeManageAction/addCollege'
export const editurl = developUrl + '/base/CollegeManageAction/updateCollege'
export const delurl = developUrl + '/base/CollegeManageAction/deleteCollege'
export const pagesize = 10
export const powerinfo = {
  OeN: '编辑',
  OdN: '删除',
  OaN: '添加',
  OPalist: 'addlist',
  OPelist: 'editlist',
  OPdlist: 'dellist'
}
export const warntxt = {
  name: '请填写院系名称',
  code: '请填写院系代码'
}

export const basicinfo = {
  majorN: '名称',
  descriptionN: '专业描述',
  searchN: '查询',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgaddN: '专业添加',
  msgeditN: '专业编辑',
  msgdelN: '专业删除',
  ScollegeN: '院系',
  addallN: '添加'
}
export const optobjinfoAll = ['编辑', '删除']
export const listhead = ['专业名称', '所在院系', '操作']
export const pathinfo = {'prex': 'AJmajor', 'optname': '专业'}
export const colums = ['major', 'collegeName', 'opt']
export const percentinfo = ['wid30', 'wid50', 'wid20']
export const opteventAll = ['editlist', 'dellist']
export const bingos = []
export const searchinput = 'width:150px;'
export const searchstyle = 'position:absolute;width:300px;'
export const pageval = 1
export const products = []
export const infoval = []

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/base/Major/findMajorList'
export const addurl = developUrl + '/base/Major/addMajor'
export const editurl = developUrl + '/base/Major/updateMajor'
export const delurl = developUrl + '/base/Major/deleteMajor'
export const collegeurl = developUrl + '/base/CollegeManageAction/findCollegeListNoPage'
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
  major: '请填写专业名称',
  Scollege: '请选择院系',
  placeholder: '请输入专业名称'
}

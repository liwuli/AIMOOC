export const basicinfo = {
  nameN: '名称',
  desN: '描述',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgaddN: '角色添加',
  msgeditN: '角色编辑',
  msgdelN: '角色删除',
  msgpowerN: '角色权限分配',
  roletypeN: '类型'
}
export const optobjinfoAll = ['编辑', '删除', '权限'] // 弃用
export const listhead = ['check', '名称', '描述', '操作']
export const pathinfo = {'prex': 'AJrole', 'optname': '角色'}
export const colums = ['check', 'roleName', 'description', 'opt']
export const percentinfo = ['wid5', 'wid35', 'wid30', 'wid30']
export const opteventAll = ['editlist', 'dellist', 'powerlist'] // 弃用
export const bingos = []
export const searchinput = 'margin-left:710px'
export const pageval = 1
export const products = []
export const infoval = []

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/base/role/getRoles'
export const addurl = developUrl + '/base/role/addRole'
export const editurl = developUrl + '/base/role/updateRole'
export const delurl = developUrl + '/base/role/deleteRole'
export const pagesize = 10
export const powerinfo = {
  OeN: '编辑',
  OdN: '删除',
  OaN: '添加',
  OpN: '权限',
  OPalist: 'addlist',
  OPelist: 'editlist',
  OPdlist: 'dellist',
  OPplist: 'powerlist'
}
export const roletype = [
  {'txt': '身份', value: -1},
  {'txt': '角色', value: 0}
]
export const warntxt = {
  name: '请填写角色名称'
}


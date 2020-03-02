export const basicinfo = {
  syN: '开始学年',
  eyN: '结束学年',
  termN: '学期名称',
  firsttermN: '第一学期',
  sydateN: '开始日期',
  eydateN: '结束日期',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgaddN: '学期添加',
  msgeditN: '学期编辑',
  msgdelN: '学期删除'
}
export const listhead = ['check', '开始学年', '结束学年', '学期名称', '开始日期', '结束日期', '操作']
export const pathinfo = {'prex': 'AJterm', 'optname': '学期'}
export const optobjinfoAll = ['编辑', '删除'] // 弃用
export const percentinfo = ['wid5', 'wid10', 'wid10', 'wid20', 'wid15', 'wid15', 'wid25']
export const colums = ['check', 'sy', 'ey', 'lastPartName', 'sydate', 'eydate', 'opt']
export const opteventAll = ['editlist', 'dellist'] // 弃用
export const products = []
export const infoval = []
export const bingos = []
export const searchinput = 'width:150px;border-right:none'
export const searchstyle = 'width:300px;'
export const pageval = 1

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/control/term/findTermsLists'
export const addurl = developUrl + '/control/term/addTerm'
export const editurl = developUrl + '/control/term/updateTerm'
export const delurl = developUrl + '/control/term/deleteTerm'
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
  sy: '开始学年不能为空',
  ey: '结束学年不能为空',
  term: '学期名称不能为空',
  sydate: '开始日期不能为空',
  eydate: '结束日期不能为空'
}

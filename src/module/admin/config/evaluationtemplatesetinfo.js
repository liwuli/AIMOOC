export const FirsttitleN = '设置评价模板'
export const pathinfo = {'prex': 'AJevaluateTemplate', 'optname': '评价模板'}
export const saveN = '保存'
export const cancelN = '取消'
export const delN = '删除'
export const msgeditN = '编辑'
export const delcontentN = '确定要删除吗？'
export const createcontentbtnN = '添加评价内容'
export const createbtnN = '创建评价标准维度'
export const editbtnN = '编辑'
export const delbtnN = '删除'
export const totaltxt = '当前总分'
export const listheadsub = ['描述', '分值', '操作']
export const percentnfosub = ['wid70', 'wid10', 'wid20']
export const columssub = ['name', 'scole', 'opt']
export const opteventsubAll = ['edit icon-xiugai', 'del icon-del']

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/evaluate/EvaluateDetail/getEvaluateDetailList'
export const addurl = developUrl + '/evaluate/EvaluateDetail/addEvaluateDetail'
export const editurl = developUrl + '/evaluate/EvaluateDetail/updateEvaluateDetail'
export const delurl = developUrl + '/evaluate/EvaluateDetail/deleteEvaluateDetail'
export const findChildrenurl = developUrl + '/evaluate/EvaluateDetail/getChildEvaluateDetailByParentEvaluateDetailId'
export const evaluationtempletsetinfo = {
  title: '创建评价维度',
  edittitle: '编辑评价维度',
  name: '维度名称',
  subname: '评价内容',
  scole: '分值',
  delN: '确定要删除',
  rel: '及对应评价内容？',
  contenttitle: '添加评价内容',
  contenttitleedit: '编辑评价内容',
  contentdes: '请输入评价内容描述，不要超过30个字',
  contentscole: '分值可在0-100之间',
  templatename: '评价模板名称:',
  one: '评价模板管理',
  two: '设置评价模板',
  delcontent: '删除评价内容',
  del: '确定要删除当前评价内容？'
}
export const warntxt = {
  name: '请填写评价标准维度名称',
  nameconent: '请填写评价内容',
  scole: '请填写分值',
  totalscole: '总分已超过100，请修改分值',
  toolargescole: '评价内容总分已超过评价维度分值，请修改分值'
}

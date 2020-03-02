export const pathinfo = {'prex': 'AJlabel', 'optname': '标签组'}
export const basicinfo = {
  FirsttitleN: '设置评价模板',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  msgeditN: '编辑',
  delcontentN: '确定要删除吗？',
  createcontentbtnN: '添加标签',
  createbtnN: '创建标签组',
  editbtnN: '编辑',
  delbtnN: '删除',
  totaltxt: '当前总分'
}
import {developUrl} from '@/module/admin/config/urlPage'
export const listheadsub = ['名称', '操作']
export const percentnfosub = ['wid80', 'wid20']
export const columssub = ['labelName', 'opt']
export const opteventsubAll = ['edit icon-xiugai', 'del icon-del']
export const listurl = developUrl+'/learning/label/findLabelGroups'
export const addurl = developUrl+'/learning/label/addLabelGroup'
export const editurl =developUrl+ '/learning/label/updateLabelGroup'
export const delurl = developUrl+'/learning/label/deleteLabelGroup'
export const addcontenturl = developUrl+'/learning/label/addLabel'
export const editcontenturl = developUrl+'/learning/label/updateLabel'
export const delcontenturl = developUrl+'/learning/label/deleteLabel'
export const evaluationtempletsetinfo = {
  title: '创建标签组',
  edittitle: '编辑标签组',
  name: '名称',
  scole: '分值',
  delN: '确定要删除',
  rel: '及标签组内容？',
  contenttitle: '添加标签',
  contenttitleedit: '编辑标签内容',
  contentdes: '请输入标签内容描述，不要超过30个字'
}
export const warntxt = {
  name: '请填写名称',
  contentname: '请填写标签内容'
}

export const evaluateTemplateNameN = '名称'
export const evaluatetab = [
  {
    name: '课程资源评价',
    pathname: 'AJevaluateTemplate'
  },
  {
    name: '巡课评价',
    pathname: 'AJevaluateTemplateloop'
  }
]
export const warntxt = {
  evaluateTemplateName: '请填写模板名称'
}
export const listhead = ['评价模板名称', '状态', '操作']
export const pathinfo = {'prex': 'AJevaluateTemplateloop', 'optname': '巡课评价'}
export const colums = ['evaluateTemplateName', 'isOpen', 'opt']
export const percentinfo = ['wid55', 'wid15', 'wid30']
export const searchstyle = 'position:absolute;width:300px;'
export const searchinput = 'width:150px;'
export const bingos = []
export const pageval = 1
export const products = []
export const infoval = []
export const pagesize = 10
export const OeN = '编辑'
export const OdN = '删除'
export const OaN = '添加'
export const OpublishN = '发布'
export const OunpublishN = '取消'
export const OsettemplateN = '设置评价模板'
export const OPalist = 'addlist'
export const OPelist = 'editlist'
export const OPdlist = 'dellist'
export const OPpublishlist = 'publish'
export const OPunpublishlist = 'unpublish'
export const OPsettemplatelist = 'settemplate'
export const optobjinfoAll = ['发布', '编辑', '设置评价模板', '删除']
export const optobjinfoAllA = ['取消', '编辑', '设置评价模板', '删除']
export const opteventAll = ['publish', 'editlist', 'settemplate', 'dellist']
export const opteventAllA = ['unpublish', 'editlist', 'settemplate', 'dellist']
export const evaluateTemplateinfo = {
  publish: '确定要启用',
  unpublish: '确定要取消启用',
  start: '一旦启用',
  startend: ', 评价模板所有信息将无法修改, 确定启用？',
  ma: '吗?',
  unpublishN: '取消启用',
  published: '启用',
  unpublished: '未启用',
  addN: '添加模板',
  searchN: '搜索',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  sureN: '确定',
  msgaddN: '模板添加',
  msgeditN: '模板编辑',
  msgdelN: '模板删除',
  msgpublishN: '模板启用',
  evaluateTemplateNameN: '模板名称',
  contentN: '确定要删除吗？',
  isOpenN: '是否启用'
}
import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/evaluate/EvaluateTemplate/getEvaluateTemplateList'
export const addurl = developUrl + '/evaluate/EvaluateTemplate/addEvaluateTemplate'
export const editurl = developUrl + '/evaluate/EvaluateTemplate/updateEvaluateTemplate'
export const delurl = developUrl + '/evaluate/EvaluateTemplate/deleteEvaluateTemplate'
export const publishurl = developUrl + '/evaluate/EvaluateTemplate/changeOpenOrClose'
export const loopurl = developUrl + '/control/loopConfig/loopModelList'
export const addloopurl = developUrl + '/control/loopConfig/addLoopModel'
export const editloopurl = developUrl + '/control/loopConfig/editLoopModel'
export const delloopurl = developUrl + '/control/loopConfig/editLoopModel'
export const unorpublishurl = developUrl + '/control/loopConfig/editLoopModel'

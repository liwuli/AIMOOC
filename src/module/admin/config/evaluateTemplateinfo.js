export const evaluateTemplateNameN = '名称'
export const descriptionN = '描述'
export const isOpenN = '是否发布'
export const saveN = '保存'
export const cancelN = '取消'
export const delN = '删除'
export const sureN = '确定'
export const contentN = '确定要删除吗？'
export const msgaddN = '模板添加'
export const msgeditN = '模板编辑'
export const msgdelN = '模板删除'
export const msgpublishN = '模板发布'
export const msgroomaddN = '关联学科'
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
export const listhead = ['check', '名称', '描述', '角色', '是否发布', '操作']
export const pathinfo = {'prex': 'AJevaluateTemplate', 'optname': '评价模板'}
export const colums = ['check', 'evaluateTemplateName', 'description', 'role', 'isOpen', 'opt']
export const percentinfo = ['wid5', 'wid15', 'wid25', 'wid15', 'wid10', 'wid30']
export const optobjinfoAll = ['编辑', '删除', '发布', '设置评价模板']
export const optobjinfoAllA = ['取消发布', '设置评价模板']
export const opteventAll = ['editlist', 'dellist', 'publish', 'settemplate']
export const opteventAllA = ['unpublish', 'settemplate']
export const bingos = []
export const searchinput = 'width:150px;'
export const validN = '是否发布'
export const roleN = '关联角色'
export const roleurl = '/base/role/getRoles'
export const searchstyle = 'position:absolute;width:300px;'
export const pageval = 1
export const products = []
export const infoval = []

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/evaluate/EvaluateTemplate/getEvaluateTemplateList'
export const addurl = developUrl + '/evaluate/EvaluateTemplate/addEvaluateTemplate'
export const editurl = developUrl + '/evaluate/EvaluateTemplate/updateEvaluateTemplate'
export const delurl = developUrl + '/evaluate/EvaluateTemplate/deleteEvaluateTemplate'
export const publishurl = developUrl + '/evaluate/EvaluateTemplate/changeOpenOrClose'
export const pagesize = 10
export const OeN = '编辑'
export const OdN = '删除'
export const OaN = '添加'
export const OpublishN = '发布'
export const OunpublishN = '取消发布'
export const OsettemplateN = '设置评价模板'
export const OPalist = 'addlist'
export const OPelist = 'editlist'
export const OPdlist = 'dellist'
export const OPpublishlist = 'publish'
export const OPunpublishlist = 'unpublish'
export const OPsettemplatelist = 'settemplate'
export const evaluatetemplateaddinfo = {
  classname: 'radiofather roletype',
  val: [1, 0],
  title: ['是', '否'],
  opt: {
    father: '.roletype span',
    init: {
      val: true,
      index: 1
    },
    inputflag: true,
    disabled: true
  }
}
export const evaluatetemplateeditinfo = {
  classname: 'radiofather roletype',
  val: [1, 0],
  title: ['是', '否'],
  opt: {
    father: '.roletype span',
    init: {
      val: true,
      index: 1
    },
    inputflag: true
  }
}
export const evaluateTemplateinfo = {
  publish: '确定要发布',
  unpublish: '确定要取消发布',
  ma: '吗?',
  unpublishN: '取消发布',
  published: '已发布',
  unpublished: '未发布',
  lock: '当前模板已评价，不允许取消发布'
}
export const warntxt = {
  evaluateTemplateName: '请填写模板名称',
  rolerel: '请选择关联角色'
}

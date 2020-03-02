export const basicinfo = {
  serverN: '服务器',
  nameN: '名称',
  ipN: 'IP',
  typeN: '类型',
  trueN: '是',
  falseN: '否',
  avalidN: '有效设备',
  saveN: '保存',
  cancelN: '取消',
  relN: '关联',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgaddN: '服务器添加',
  msgeditN: '服务器编辑',
  msgdelN: '服务器删除',
  msgrelN: '关联教室',
  msgrelstoreN: '关联存储区'
}
export const editradioinfo = {
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
export const pathinforel = ['check', '名称', '地点']
export const listheadrel = ['check', '名称', '地点']
export const listhead = ['check', '名称', 'IP', '设备类型', '有效设备', '操作']
export const pathinfo = {'prex': 'AJserver', 'optname': '服务器'}
export const optobjinfoAll = ['编辑', '删除', '关联教室', '关联存储区']
export const optobjinfo1All = ['编辑', '删除', '关联教室']
export const serverinfos = [{value: 6, txt: '转发录播服务器'}, {value: 7, txt: '流媒体服务器'}, {value: 8, txt: '集控分析服务器'}]
export const opteventAll = ['editlist', 'dellist', 'rela', 'store']
export const colums = ['check', 'name', 'ip', 'type', 'device', 'opt']
export const percentinfo = ['wid5', 'wid20', 'wid15', 'wid20', 'wid10', 'wid30']
export const products = []
export const infoval = []
export const bingos = []
export const pageval = 1

import { developUrl } from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/base/ServerManageAction/findServerList'
export const addurl = developUrl + '/base/ServerManageAction/addServerManage'
export const editurl = developUrl + '/base/ServerManageAction/editServerManage'
export const delurl = developUrl + '/base/ServerManageAction/deleteServerManage'
export const relurl = developUrl + '/base/ServerManageAction/getClassroomsByDeviceId'
export const relsaveurl = developUrl + '/base/ServerManageAction/linkClassroom'
export const relstoreurl = developUrl + '/base/ServerManageAction/getStoAreaByDeviceId'
export const relsavestoreurl = developUrl + '/base/ServerManageAction/linkStoArea'
export const pagesize = 10
export const storelistheadrel = ['check', '名称', '存储本地路径', '存储网络路径', '磁盘空间GB', '已使用GB']
export const storecolums = ['check', 'name', 'local', 'net', 'total', 'use']
export const storepercentinfo = ['wid5', 'wid15', 'wid15', 'wid15', 'wid15', 'wid15']
export const powerinfo = {
  OeN: '编辑',
  OdN: '删除',
  OaN: '添加',
  OrelaN: '关联教室',
  OstoreN: '关联存储区',
  OPalist: 'addlist',
  OPelist: 'editlist',
  OPdlist: 'dellist',
  OPrelalist: 'rela',
  OPstorelist: 'store'
}
export const warntxt = {
  ip: '请填写ip地址',
  server: '请填写服务器名称',
  type: '请选择服务器类型'
}

export const basicinfo = {
  ipN: 'IP',
  deviceNameN: '名称',
  saveN: '保存',
  cancelN: '取消',
  relN: '关联',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgaddN: '巡视工作站添加',
  msgeditN: '巡视工作站编辑',
  msgdelN: '巡视工作站删除',
  msgrelN: '巡视工作站关联教室',
  avalidN: '是否有效'
}
import {developUrl} from '@/module/admin/config/urlPage'
export const optobjinfoAll = ['编辑', '删除', '关联教室']
export const listhead = ['check', '名称', 'IP', '是否有效', '操作']
export const pathinfo = {'prex': 'AJworkstation', 'optname': '巡视工作站'}
export const listheadrel = ['check', '名称', '地点']
export const percentinfo = ['wid5', 'wid25', 'wid25', 'wid20', 'wid25']
export const colums = ['check', 'name', 'ip', 'gendervalshow', 'opt']
export const opteventAll = ['editlist', 'dellist', 'rela']
export const pathinforel = {'prex': 'AJworkstation', 'optname': '巡视工作站'}
export const products = []
export const infoval = []
export const bingos = []
export const searchinput = 'width:150px;margin-left:790px'
export const pageval = 1
export const listurl = developUrl+ '/base/WorkstationManageAction/findEquipmentList'
export const addurl = developUrl+'/base/WorkstationManageAction/addWorkstationManage'
export const editurl = developUrl+ '/base/WorkstationManageAction/editWorkstationManage'
export const delurl = developUrl+'/base/WorkstationManageAction/deleteWorkstationManage'
export const relurl = developUrl+'/base/WorkstationManageAction/getClassroomsByDeviceId'
export const saveurl = developUrl+'/base/WorkstationManageAction/linkClassroom'
export const pagesize = 10
export const powerinfo = {
  OeN: '编辑',
  OdN: '删除',
  OaN: '添加',
  OrelaN: '关联教室',
  OPalist: 'addlist',
  OPelist: 'editlist',
  OPdlist: 'dellist',
  OPrelalist: 'rela'
}
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
  ip: '请填写ip',
  deviceName: '请填写名称'
}

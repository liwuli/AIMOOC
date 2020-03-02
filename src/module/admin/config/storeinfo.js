export const basicinfo = {
  nameN: '名称',
  localN: 'UNC路径',
  passwordN: 'UNC密码',
  localaddressN: '本地路径',
  httpN: 'HTTP映射',
  rtmpN: 'RTMP映射',
  totalN: '磁盘总量GB',
  useN: '已使用GB',
  accountN: 'UNC账号',
  alertN: '警戒线%',
  saveN: '保存',
  cancelN: '取消',
  ftpipN: 'ftp服务器Ip',
  ftpaccountN: 'ftp登陆名',
  ftppassN: 'ftp密码',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgaddN: '存储区添加',
  msgeditN: '存储区编辑',
  msgdelN: '存储区删除'
}
export const optobjinfoAll = ['编辑', '删除']
export const listhead = ['check', '名称', '本地路径', '网络路径', 'HTTP映射', 'RTMP映射', '磁盘总量GB', '已使用GB', '警告值%', '操作']
export const pathinfo = {'prex': 'AJstore', 'optname': '存储区'}
export const colums = ['check', 'name', 'local', 'net', 'http', 'rtmp', 'total', 'use', 'alert', 'opt']
export const percentinfo = ['wid5', 'wid15', 'wid10', 'wid10', 'wid10', 'wid10', 'wid10', 'wid10', 'wid7', 'wid13']
export const opteventAll = ['editlist', 'dellist']
export const bingos = []
export const searchinput = 'width:150px;'
export const searchstyle = 'position:absolute;width:300px;'
export const pageval = 1
export const products = []
export const infoval = []

import {developUrl} from '@/module/admin/config/urlPage'

export const listurl = developUrl + '/base/StoAreaManageAction/findStoAreaList'
export const addurl = developUrl + '/base/StoAreaManageAction/addStoArea'
export const editurl = developUrl + '/base/StoAreaManageAction/updateStoArea'
export const delurl = developUrl + '/base/StoAreaManageAction/deleteStoArea'
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
  name: '请填写名称',
  local: '请填写UNC路径',
  account: '请填写UNC账号',
  password: '请填写UNC密码',
  localaddress: '请填写本地路径',
  http: '请填写http地址',
  rtmp: '请填写rtmp地址',
  total: '请填写磁盘总量',
  alert: '请填写警戒线值',
  localplaceholder: 'UNC路径之间不能相互包含',
  localaddressplaceholder: '请输入本地存储路径',
  httpplaceholder: 'web服务器虚拟路径,http://x.x.x.x',
  rtmpplaceholder: 'FMS虚拟路径,rtmp://x.x:1939/VOD/MP4',
  ftpip: '请填写ftp IP',
  ftpaccount: '请填写ftp 账号',
  ftppass: '请填写ftp 密码'
}

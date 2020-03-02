export const msgN = '校园电视台'
export const listhead = ['check', '频道名称', '描述', '操作']
export const pathinfo = {'prex': 'AJcampusTVchannel', 'optname': '校园电视台管理'}
export const colums = ['check', 'name', 'des', 'opt']
export const percentinfo = ['wid5', 'wid40', 'wid40', 'wid15']
export const opteventAll = ['editlist', 'dellist']
export const optobjinfoAll = ['编辑', '删除']

import {developUrl} from '@/module/admin/config/urlPage'
// 频道管理
export const channellisturl = developUrl + '/station/TvChannel/findTvChannelList'
export const channellistaddurl = developUrl + '/station/TvChannel/addTvChannel'
export const channellistediturl = developUrl + '/station/TvChannel/updateTvChannel'
export const channellistdelurl = developUrl + '/station/TvChannel/deleteTvChannel'
export const pagesize = 10
export const bingo = []
export const pageval = 1
export const totalpage = 0
export const products = []
export const powerinfo = {
  OeN: '编辑',
  OdN: '删除',
  OaN: '添加',
  OPalist: 'addlist',
  OPelist: 'editlist',
  OPdlist: 'dellist'
}
export const channelinfo = {
  channeladd: '频道添加',
  channeledit: '频道编辑',
  channelname: '频道名称',
  channeldes: '频道描述',
  sure: '确定',
  cancel: '取消',
  del: '删除',
  channeldel: '频道删除',
  channelcontent: '确定要删除吗？'
}
export const channelwarntxt = {
  channelname: '请填写频道名称',
  channeldes: '请填写描述'
}

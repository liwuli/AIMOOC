export const tabinfo = ['频道直播', '全部节目']
export const tabselected = ['selected', '']
export const tabselected1 = ['', 'selected']
export const liststate = ['回看', '直播中', '即将直播', '未直播']
export const campustvinfo = {
  seeall: '查看全部节目单',
  back: '返回校园电视台主页',
  to: '到',
  time: '时间',
  search: '搜索',
  placeholder: '请输入节目关键词进行搜索'
}
export const bingo = []
export const pageval = 1
export const pagesize = 10
export const pagesize8 = 8

import {developUrl} from '@/module/admin/config/urlPage'
// 频道管理
export const channellisturl = developUrl + '/station/TvChannel/findTvChannelList'
// 节目单
export const programlisturl = developUrl + '/station/TvProgram/findTvProgramList'
export const programalllisturl = developUrl + '/station/TvProgram/findTvProgramListForFront'
// 前台根据节目id查询当前节目信息
export const searchurl = developUrl + '/station/TvProgram/getTvProgramByTvProgramId'
export const programseelisturl = developUrl + '/station/TvProgram/addOneViewNum'
export const getservertimeurl = developUrl + '/base/mobilebase/getTime'

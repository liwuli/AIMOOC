export const pathinfolive = {'prex': 'Flive', 'optname': '直播中心'}
export const bingo = []
export const products = []
export const pageval = 1
export const pagesize = 8
export const unlivepagesize = 12
export const livetabselectd = ['selected']
export const livetabstartselectd = ['', 'selected']
export const livetabendselectd = ['', '', 'selected']
export const livetab = ['正在直播', '即将开播', '直播回顾']
export const livepinkselectd = ['selected']
export const livepink = ['按最近直播', '按观看人数']
export const liveinfo = {
  nologin: '请登录',
  pink: '排序',
  controlenter: 'ctrl + enter 发送',
  stoplive: '该直播已结束',
  search: '搜索',
  find: '筛选',
  to: '到',
  living: '正在直播',
  wait: '即将开播',
  lived: '直播回顾',
  more: '查看更多 》',
  back: '<返回直播列表页',
  res: '的结果',
  total: '共有',
  about: '门关于',
  update: '直播日期',
  state: '直播状态',
  info: '\n直播简介',
  nostart: '直播尚未开始，敬请期待！',
  pinkuser: '第',
  pinkuserinfo: '位访客，欢迎您',
  person: '人',
  chat: '公共聊天',
  send: '发送',
  favirate: '收藏',
  download: '下载',
}
export const chatinfo = {
  system: '系统消息',
  master: '主持人',
  me: '我',
  lock: '锁定',
  clear: '清屏',
  unlock: '解锁',
  nologin: '游客状态无法聊天，请先',
  login: '登录',
  forbitsay: '当前已被禁言',
  forbidsayinfo: '禁言黑名单',
  headforbid: '禁言'
}
export const forbidlistinfo = {
  forbid: '禁言',
  unforbid: '解除禁言',
  cancel: '取消'
}
export const liveselectinfo = [
  {
    value: '',
    txt: '全部'
  },
  {
    value: '1',
    txt: '正在直播'
  },
  {
    value: '0',
    txt: '即将开播'
  }
]

import {developUrl} from '@/module/admin/config/urlPage'
// 直播中心- 首页
export const livecenterurl = developUrl + '/live/live/findLivingList'
// 直播中心-查询
export const livesearchurl = developUrl + '/live/live/findLivesListBySearch'
// 根据课程查询课程下的章节和资源列表  （* 课程详情页-课程目录*）
export const lessonresourcesurl = developUrl + '/live/live/liveResReview'
// 直播中心-详情页
export const getliveinfourl = developUrl + '/live/live/enterLive'
export const getmsglisturl = developUrl + '/base/message/findMessages'
export const messageaddurl = developUrl + '/base/message/addMessage'
export const messagedelurl = developUrl + '/base/message/deleteMessage'
export const forbidlisturl = developUrl + '/live/live/findBlacklist'
export const forbidlistaddurl = developUrl + '/live/live/addBlacklist'
export const forbidlistdelurl = developUrl + '/live/live/deleteBlacklist'
export const favirateaddurl = developUrl + '/learning/collect/addCollect'
export const faviratedelurl = developUrl + '/learning/collect/delCollect'
export const faviratestateurl = developUrl + '/live/live/liveIsCollected'
export const livereviewurl = developUrl + '/live/live/liveReviewOnFront'
export const getservertimeurl = developUrl + '/base/mobilebase/getTime'
export const warntxt = {
  delsucced: '解除禁言成功',
  undelsucced: '解除禁言失败',
  delmsgfailed: '删除消息失败',
  getforbidlistfail: '获取禁言列表失败',
  forbidaddfail: '消息添加失败',
  getmsglistfail: '获取消息列表失败',
  forbidaddsuccess: '添加禁言列表成功',
  login: '您还未登录',
  addfaviratesucess: '收藏成功',
  addfaviratefail: '收藏失败',
  delfaviratesucess: '取消收藏成功',
  delfaviratefail: '取消收藏失败',
  getfaviratestatefail: '获取收藏状态失败',
  illegaldom: '您尝试输入非法的字符的引入，请重新填写'
}

// 详情页
// export const detailinfo = {
//   title: '返回课程主页',
//   collect: '收藏',
//   download: '下载',
//   resdownload: '配套资源下载',
//   learn: '学过了',
//   resdownloadtogether: '资源打包下载',
//   reshot: '相关课程推荐',
//   courseDpic: '课程图',
//   teacher: '讲师：',
//   personnum: '浏览：',
//   teachercharge: '课程负责人：',
//   time: '时间',
//   play: '正在播放'
// }

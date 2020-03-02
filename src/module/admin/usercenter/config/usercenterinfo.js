export const links = [
  {
    name: '个人资料',
    path: '/AJusercenterme',
    icon: 'usercenteredit'
  },
  {
    name: '我的消息',
    path: '/AJusercenter',
    icon: 'usercentermsg'
  },
  {
    name: '我的课程',
    path: '/AJusercenterbook',
    icon: 'usercenterbook'
  },
  {
    name: '我的收藏',
    path: '/AJusercentercollect',
    icon: 'starbg'
  },
  {
    name: '我的关注',
    path: '/AJusercenterfocus',
    icon: 'focus'
  },
  {
    name: '巡课任务',
    path: '/AJusercenterloop',
    icon: 'usercenterloop'
  }
// ,
// {
//  name: '我的编辑',
//  path: 'AJusercenteredit',
//  icon: 'centeredit'
// }
]
export const headlist = ['成员', '工号', '任务数', '完成数', '巡课节数', '巡课总时长', '操作']
export const uploadimgN = '上传图片'
export const msginfo = {
  allmsg: '全部消息',
  more: '查看更多',
  fail: '获取消息列表失败',
  focus: '你关注的 ',
  update: '课程有更新了'
}
export const focusinfo = {
  head: '我关注的课程',
  teacher: '讲师',
  person: '人浏览',
  manage: '课程管理',
  scole: '评分'
}
export const collecttab = [
  {name: '我收藏的资源'},
  {name: '我收藏的直播'}
]
export const metab = [
  {name: '基本资料'},
  {name: '修改密码'}
]
export const collectbooktab = [
  {name: '我加入的课程'},
  {name: '我负责的课程'}
]
export const collectbooksdudenttab = [
  {name: '我加入的课程'}
]
export const collectinfo = {
  type: '资源类型',
  date: '收藏时间',
  dateN: '日期',
  toN: '到',
  searchbtn: '搜索',
  total: '共',
  resdes: '个资源',
  livestate: '直播状态',
  resdeslive: '个直播'
}
export const liveinfo = {
  fail: '直播失效',
  living: '正在直播',
  wait: '即将开播',
  lived: '直播回顾',
  jumpfail: '对不起，该资源地址不可用'
}
export const liveselectinfo = [
  {
    value: '',
    txt: '全部'
  },
  {
    value: '1',
    txt: '正在直播'
  }
]
export const warntxt = {
  taskName: '请填写任务名称',
  sydate: '请选择任务开始时间',
  eydate: '请选择任务结束时间',
  dateError: '结束时间不能小于开始时间',
  times: '巡课节次总数必须是整数',
  modelId: '请选择评价模板',
  addfaviratesucess: '收藏成功',
  addfaviratefail: '收藏失败',
  delfaviratesucess: '取消收藏成功',
  delfaviratefail: '取消收藏失败',
  nostart: '直播尚未开始，敬请期待！',
  suretodel: '确定要移除修改',
  uretodelcollect: '确定要移除收藏',
  question: '吗？',
  orpass: '请输入原密码',
  newpass: '请输入新密码',
  newpassrepeat: '请确认新密码',
  check: '请检查填写格式是否正确'
}
import {developUrl} from '@/module/admin/config/urlPage'
export const editurl = developUrl + '/base/user/updateUser'
export const msglisturl = developUrl + '/base/notice/getNoticeList'
export const myfocuscourseurl = developUrl + '/learning/interest/getInterestList'
export const collecturl = developUrl + '/learning/collect/getCollectList'
export const collectliveurl = developUrl + '/live/live/findMyCollectedLives'
export const incouseurl = developUrl + '/learning/courseCenterManage/findMyStudyCoursesList'
export const mychargeurl = developUrl + '/learning/courseCenterManage/findMyTeachCoursesList'
export const faviratedelurl = developUrl + '/learning/collect/delCollect'
export const uploadimgurl = developUrl + '/base/dubbo/uploadImgStream'
export const passsaveurl = developUrl + '/base/user/updatePassword'
export const classForDetailUrl = developUrl + '/control/loopClassTask/findloopClassForDetail'
export const personalProfileUrl = developUrl + '/base/user/getPersonalProfile'
export const taskCompleteStatustUrl = developUrl + '/control/loopClassTask/findTaskCompleteStatusForDetail'
export const buildingsUrl = developUrl + '/base/building/getBuildings'
export const coursesListUrl = developUrl + '/control/course/findCoursesList'
export const collegeAndTeacherUrl = developUrl + '/base/CollegeManageAction/findCollegeAndTeacher'
export const membersTasktUrl = developUrl + '/control/loopClassTask/findMembersTaskCompleteStatus'
export const loopClassGroup = developUrl + '/control/loopClassTask/findLoopClassGroupByLoginUserId'
export const loopClassTasks = developUrl + '/control/loopClassTask/findLoopClassTasks'
export const addLoopClassTasksUrl = developUrl + '/control/loopClassTask/addLoopClassTasks'
export const publishLoopClassTasksUrl = developUrl + '/control/loopClassTask/publishLoopClassTasks'
export const findTasksByIdUrl = developUrl + '/control/loopClassTask/findLoopClassTasksById'
export const updateTasksUrl = developUrl + '/control/loopClassTask/updateLoopClassTasks'
export const usersByCollegeAndRoleUrl = developUrl + '/base/user/findUsersByCollegeAndRole'
export const loopurl = developUrl + '/control/loopConfig/loopModelList'
export const deleteTaskurl = developUrl + '/control/loopClassTask/deleteLoopClassTask'
export const currentTermurl = developUrl + '/control/term/findCurrentTerm'

export const delN = '删除'
export const cancelN = '取消'
export const sureN = '确定'
export const uploadN = '课程图片'
export const uploadP = '上传图片'
export const uperr = '上传失败'
export const basicinfo = {
  type: '类型',
  code: '工号',
  college: '院系',
  grade: '年级',
  name: '姓名',
  tel: '电话',
  edit: '修改',
  save: '保存',
  orpass: '原密码',
  newpass: '新密码',
  newpassrepeat: '确认密码',
  orpassok: '密码输入正确',
  orpassno: '密码输入错误',
  passtypeok: '密码格式正确',
  passtypeno: '密码格式错误',
  passnewtypeno: '密码输入不一致',
  passnewtypeok: '密码输入一致',
  warn: '6-16位，区分大小写，只能使用字母、数字'
}
export const restype = {
  0: '视频',
  1: '文档',
  2: '图片',
  3: '音频',
  4: '多分屏'
}

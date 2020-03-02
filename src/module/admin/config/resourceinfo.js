export const basicinfo = {
  typeN: '类型',
  stime: '开始时间',
  etime: '结束时间',
  collegeN: '学院',
  gradeN: '年级',
  classN: '班级',
  subjectN: '科目',
  teacherN: '老师',
  temeN: '时间',
  statusN: '状态',
  searchN: '查询',
  nameN: '名称',
  desN: '描述',
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  contentN: '确定要删除吗？',
  msgeditN: '资源编辑',
  msgdelN: '资源删除',
  msgdownN: '资源下载',
  msgplayN: '资源播放',
  nameNULL: '名称不能为空!',
  msgN: '资源名'
}

export const statusData = [{txt: '全部', value: ''}, {txt: '已发布', value: 1}, {txt: '未发布', value: '0'}]
export const typeData = [{txt: '全部', value: null}, {txt: '云录播', value: 0}, {txt: '精品录播', value: 1}, {txt: '智慧教学', value: '4'}]
export const transcribeType = ['云录播', '精品录播', '', '', '智慧教学']
export const transcribeStatus = ['故障', '录制中', '录制成功', '故障', '故障']

export const pathinfo = {'prex': 'AJresource', 'optname': '资源'}
export const optobjinfoAll = ['播放', '下载', '删除', '发布', '报告']
export const opteventAll = ['powerlist', 'downllist', 'dellist', 'publish', 'report']
// 普教表头
export const listheadP = ['check', '课程名称', '章节', '老师', '年级', '班级', '上课时间', '录制状态', '发布状态', '类型', '操作']
// 高教表头
export const listheadH = ['check', '课程名称', '章节', '老师', '院系', '班级', '上课时间', '录制状态', '发布状态', '类型', '操作']
export const percentinfo = ['wid5', 'wid8', 'wid10', 'wid7', 'wid8', 'wid8', 'wid8', 'wid7', 'wid7', 'wid7', 'wid25']
export const colums = ['check', 'name', 'lessonName', 'teacherName', 'studySectionName', 'classesName', 'time', 'isTranscribe', 'isPublish', 'type', 'opt']

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/base/resource/getResource'
export const editurl = developUrl + '/base/resource/updateResource'
export const delurl = developUrl + '/base/resource/deleteResource'
export const playurl = developUrl + '/base/resource/getResourcePlaypath'
export const downurl = developUrl + '/base/resource/getResourceDownloadPath'
export const geturl = developUrl + '/base/resource/resouceDownload'
export const studySecAndSubsurl = developUrl + '/base/StudySection/findStudySectionAndSubjects'
export const usersByRolesurl = developUrl + '/base/user/findUsersByRole'
export const classesList2url = developUrl + '/base/classes/findClassesList2'
export const publishresourceurl = developUrl + '/base/resource/publishOrNot'
export const resourceDownPathUrl = developUrl + '/base/resource/getResourceDownloadPath'
export const getclassesurl = developUrl + '/base/classes/findClassesListByStudySectionId'
export const getgradesurl = developUrl + '/base/StudySection/getStudySectionList'
export const collegemajorurl = developUrl + '/base/CollegeManageAction/findCollegeAndMajor'
export const findCoursesForMicroTeaching = developUrl + '/control/course/findCoursesForMicroTeaching'
export const findMicroLesson = developUrl + '/control/microTeaching/findMicroLesson'
export const getEquipments = developUrl + '/base/equipment/getEquipments'
export const deleteMicroLesson = developUrl + '/control/microTeaching/deleteMicroLesson'




export const tabN = [{ text: '视频', value: 0 }, { text: '板书', value: 'blackboardsRes' }, { text: '语音文本', value: 'srtRes' }]
export const definition = [{ text: '标清下载', value: 0 }, { text: '高清下载', value: 1 }]
export const sureN = '确定'
export const cancelN = '取消'
export const pagesize = 10
export const searchinput = 'width:130px;'
export const searchstyle = 'width:300px;'
export const bingos = []
export const pageval = 1
export const state = ['不存在', '录制中', '录制完成', '录制崩溃']
export const recordstate = ['资源不可用', '资源可操作']
export const infoval = []
export const powerinfo = {
  OpubN: '发布',
  OdownN: '下载',
  OeN: '编辑',
  OdN: '删除',
  OpN: '播放',
  OdhN: '高清下载',
  OdlN: '标清下载',
  OreportN: '报告',
  OPpublist: 'publish',
  OPelist: 'editlist',
  OPdlist: 'dellist',
  OPplist: 'powerlist',
  OPdownhlist: 'downhlist',
  OPdownllist: 'downllist',
  OPreportllist: 'report'
}
export const products = []
export const warntxt = {
  nodata: '暂无数据',
  msgplayN: '资源播放',
  publishok: '发布成功',
  suretocancelpublish: '确定取消发布资源',
  suretopublish: '确定要发布',
  publishN: '发布资源',
  published: '已发布',
  unpublish: '未发布'
}

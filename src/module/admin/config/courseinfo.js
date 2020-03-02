export const saveN = '保存'
export const importbtnN = '导入'
export const cancelN = '取消'
export const delN = '删除'
export const classroom = ['教室', '直播', '录制']
export const yes = '是'
export const no = '否'
export const contentN = '确定要删除课程及其全部章节吗？'
export const msgaddN = '课程添加'
export const msgeditN = '课程编辑'
export const msgdelN = '课程删除'
export const msgClassDelN = '章节删除'
export const msgseeN = '课程查看'
export const msgeditdetailN = '章节编辑'
export const coursetypes = [
  {'txt': '校内课程', value: 1},
  {'txt': '在线课程', value: 2}
]
export const evaluatetab = [
  {
    name: '校内课程',
    pathname: 'AJcourse'
  },
  {
    name: '在线课程',
    pathname: 'AJcourseOnline'
  }
]
export const classmanageList = [{'txt': '教学班级', value: 1}, {'txt': '行政班级', value: 0}]
export const optobjinfoAll = ['编辑', '删除']
export const opteventAll = ['editlist', 'dellist', 'see']
export const listheadoptinfoAll = ['节次', '编辑', '删除', '管理']
export const listheadoptoptAll = ['lesson', 'headoptedit', 'headoptdel', 'Mlist']
export const listheadoptinfoAllversion12 = ['添加', '编辑', '删除']
export const listheadoptoptAllversion12 = ['headoptadd', 'headoptedit', 'headoptdel']

export const pathinfo = {'prex': 'AJcourse', 'optname': '课程'}

// 普教-校内课程
export const listhead = ['check', '课程名称', '年级', '科目', '课程负责人', '班级', '学期', '操作']
export const colums = ['check', 'name', 'grade', 'subject', 'teacher', 'class', 'term', 'opt']
export const percentinfo = ['wid5', 'wid15', 'wid10', 'wid10', 'wid10', 'wid10', 'wid15', 'wid25']
// 高教-校内课程
export const listheadG = ['check', '课程名称', '院系', '课程负责人', '班级', '学期', '操作']
export const columsG = ['check', 'name', 'college', 'teacher', 'class', 'term', 'opt']
export const percentinfoG = ['wid10', 'wid15', 'wid10', 'wid10', 'wid15', 'wid15', 'wid25']

import {developUrl} from '@/module/admin/config/urlPage'
export const getclassesurl = developUrl + '/base/classes/findClassesListByStudySectionId'
export const listurl = developUrl + '/control/course/findCoursesList'
export const getsuburl = developUrl + '/control/course/findLessonsAndResourcesByCourseId'
export const addurl = developUrl + '/control/course/addCourse'
export const editurl = developUrl + '/control/course/updateCourse'
export const delurl = developUrl + '/control/course/deleteCourse'
export const termurl = developUrl + '/control/term/findTermsLists'
export const collegeurl = developUrl + '/base/CollegeManageAction/findCollegeListNoPage'
export const templateurl = developUrl + '/control/classNumber/findClassNumberTemplatesList'
export const teacherurl = developUrl + '/base/user/findUsersByRole'
export const collegeteacherurl = developUrl + '/base/CollegeManageAction/findCollegeAndTeacher'
export const studySectionSubjecturl = developUrl + '/base/StudySection/findStudySectionAndSubjects'
export const addlesson = developUrl + '/control/lesson/addLesson'
export const dellessonurl = developUrl + '/control/lesson/deleteLesson'
export const editlessonurl = developUrl + '/control/lesson/updateLesson'
export const classroomurl = developUrl + '/base/classroom/getClassrooms'
export const importurl = developUrl + '/control/lesson/addLessonsBatch'
export const courseUrl = developUrl + '/control/mobileCourse/findAllClassesList'
export const analysismodulesUrl = developUrl + '/control/controlRecording/getAnalysismodulesByClassroomId'
export const pagesize = 10
export const filetype = '.xlsx,.xls'
export const nameNULL = '名称不能为空！'
export const searchinput = 'width:150px;'
export const searchstyle = 'position:absolute;width:300px;'
export const sydateN = '开始日期'
export const eydateN = '结束日期'
export const pageval = 1
export const importN = '课表导入'
export const fileN = '课表文件'
export const templatedownN = '课表模板下载'
export const nameN = '课程名'
export const codeN = '课程代码'
export const typeN = '课程类型'
export const desN = '描述'
export const termN = '学期'
export const collegeN = '院系'
export const teacherN = '讲师'
export const sweekN = '开始周'
export const eweekN = '结束周'
export const classN = '科目'
export const templateN = '节次模板'
export const templatesN = '上课时间表'
export const classnameN = '班级名称'
export const ScollegeN = '学院'
export const SteacherN = '教师'
export const StermN = '学期'
export const SroomN = '教室'
export const searchN = '查询'
export const SweekN = '周次'
export const SweekdayN = '星期'
export const StypeN = '类型'
export const msgN = '课程名'
export const SclassnameN = '课程名'
export const msgadddetailN = '章节添加'
export const namedetailN = '章节名称'
export const dateN = '时间方式'
export const sclassN = '开始节次'
export const eclassN = '结束节次'
export const roomN = '教室'
export const personN = '人数'
export const liveN = '直播'
export const recordN = '录制'
export const comeN = '到勤率'
export const radioinfocome = {
  classname: 'radiofather come',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    father: '.come span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const radioinforecord = {
  classname: 'radiofather record',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    father: '.record span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const radioinfolive = {
  classname: 'radiofather live',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    father: '.live span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const addradioinfocome = {
  classname: 'radiofather come',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    father: '.come span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const addradioinforecord = {
  classname: 'radiofather record',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    father: '.record span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const addradioinfolive = {
  classname: 'radiofather live',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    father: '.live span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const bingos = []
export const OlN = '节次'
export const OaN = '添加'
export const OeN = '编辑'
export const OdN = '删除'
export const OmN = '管理'
export const OsN = '查看'
export const OPllist = 'lesson'
export const OPalist = 'addlist'
export const OPelist = 'editlist'
export const OPdlist = 'dellist'
export const OPmlist = 'Mlist'
export const OPslist = 'see'
export const OPhalist = 'headoptadd'
export const OPhelist = 'headoptedit'
export const OPhdlist = 'headoptdel'

export const SgradeN = '年级'
export const SsubjectN = '科目'

export const labelinfo = {
  title: '设置标签',
  saveN: '保存',
  labelN: '设置标签',
  selectlabelN: '选择标签'
}
export const getlabelsurl = developUrl+'/learning/label/findLabelGroups'
export const warntxt = {
  classesId: '请选择班级',
  name: '名称不能为空！',
  code: '课程代码不能为空',
  term: '请选择学期',
  teacher: '请选择老师',
  college: '请选择学院',
  Sgrade: '请选择年级',
  Ssubject: '请选择科目',
  sweek: '请填写开始周',
  eweek: '请填写结束周',
  classname: '请填写班级名称',
  template: '请选择节次模板',
  nodata: '暂无数据'
}
export const classwarntxt = {
  name: '请填写章节名称',
  Sweek: '请填写周次',
  weeknum: '请选择星期',
  sclass: '请选择开始节次',
  eclass: '请选择结束节次',
  classroomid: '请选择教室',
  Steacher: '请选择教师',
  person: '请填写人数',
  personnum: '执行到勤率分析时人数需大于零！'
}
export const coursetypeinfo = {
  week: '周次-星期-节次',
  free: '自由时间'
}
export const oneweek = {
  select: '请选择..,',
  monday: '星期一',
  tuesday: '星期二',
  wednesday: '星期三',
  thursday: '星期四',
  friday: '星期五',
  saturday: '星期六',
  sunday: '星期日'
}

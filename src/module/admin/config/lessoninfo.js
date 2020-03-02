import {developUrl} from '@/module/admin/config/urlPage'

export const pathinfo = {'prex': 'AJlesson', 'optname': '课表'}
export const listurl = developUrl + '/control/course/findCoursesList'
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
export const courselisturl = developUrl + '/control/lesson/findLessonWeekList'
export const coursesurl = developUrl + '/control/course/findCourses'
export const pagesize = 10
export const basicinfo = {
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  startTimeN: '开始时间',
  endTimeN: '结束时间',
  contentN: '确定要删除吗？',
  msgaddN: '课表添加',
  msgeditN: '课表编辑',
  msgdelN: '课表删除',
  optadd: '增加',
  optedit: '编辑',
  optdel: '删除',
  nameN: '章节名',
  personN: '人数',
  sweekN: '周次',
  pinkN: '第',
  weekN: '周',
  courseN: '课程',
  smallN: '当前周次小于该课程周次,请重新选择课程',
  bigN: '当前周次大于该课程周次,请重新选择课程',
  typeN: '课程类型',
  termN: '学期',
  collegeN: '学院',
  SgradeN: '年级',
  teacherN: '讲师',
  templateN: '节次模板',
  ScollegeN: '学院',
  SteacherN: '教师',
  StermN: '学期',
  SroomN: '教室',
  searchN: '查询',
  StypeN: '类型',
  msgN: '课程名',
  desN: '描述',
  dateN: '时间',
  roomN: '教室',
  railpartcomment: '节次/周',
  railpartcommentdate: '年月日时分秒',
  liveN: '直播',
  recordN: '录制',
  comeN: '到勤率'
}
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
export const warntxt = {
  courseId: '请选择所属课程',
  name: '请填写章节名',
  Steacher: '请选择教师',
  person: '请填写上课人数',
  weekno: '请填写周次',
  personnum: '执行到勤率分析时人数需大于零！'
}
export const timetype = {
  week: '周星期节次',
  free: '年月日时分秒'
}
export const dropdownSelect = {
  placeholder: '请选择...',
  nodatatext: '暂无数据'
}
export const OnlineCourseType = '2'

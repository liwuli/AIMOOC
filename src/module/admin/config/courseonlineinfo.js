export const searchN = '查询'
export const saveN = '保存'
export const cancelN = '取消'
export const delN = '删除'
export const contentN = '确定要删除课程及其全部章节吗？'
export const msgaddN = '课程添加'
export const msgeditN = '课程编辑'
export const msgdelN = '课程删除'
export const optobjinfoAll = ['修改', '删除', '管理']
export const pathinfo = {'prex': 'AJcourseOnline', 'optname': '在线课程'}
export const pathinfocourse = {'prex': 'AJcourse', 'optname': '在线课程'}
// 普教-校内课程
export const listhead = ['check', '课程名称', '年级', '科目', '课程负责人', '学期', '操作']
export const colums = ['check', 'name', 'grade', 'subject', 'teacher', 'term', 'opt']
export const percentinfo = ['wid5', 'wid15', 'wid10', 'wid10', 'wid15', 'wid20', 'wid25']
// 高教-在线课程
export const listheadG = ['check', '课程名称', '课程代码', '讲师', '院系', '操作']
export const columsG = ['check', 'name', 'code', 'teacher', 'college', 'opt']
export const percentinfoG = ['wid5', 'wid30', 'wid20', 'wid15', 'wid15', 'wid15']

export const opteventAll = ['editlist', 'dellist', 'Mlist']
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
export const products = []
export const infoval = []
export const bingos = []
export const searchinput = 'width:150px;'
export const searchstyle = 'width:300px;'
export const pageval = 1
export const pagesize = 10
export const OeN = '编辑'
export const OdN = '删除'
export const OaN = '添加'
export const OmN = '管理'
export const OPmlist = 'Mlist'
export const OPalist = 'addlist'
export const OPelist = 'editlist'
export const OPdlist = 'dellist'

// import {developUrl} from '../../../../src/module/admin/config/urlPage'
import {developUrl} from '@/module/admin/config/urlPage'

export const listurl = developUrl + '/control/course/findCourseList'
export const addurl = developUrl + '/control/course/addCourse'
export const editurl = developUrl + '/control/course/updateCourse'
export const delurl = developUrl + '/control/course/deleteCourse'
export const termurl = developUrl + '/control/term/findTermsLists'
export const collegeurl = developUrl + '/base/CollegeManageAction/findCollegeListNoPage'
export const templateurl = developUrl + '/control/classNumber/findClassNumberTemplatesList'
export const teacherurl = developUrl + '/base/user/findUsersByRole'
export const collegeteacherurl = developUrl + '/base/CollegeManageAction/findCollegeAndTeacher'
export const classroomurl = developUrl + '/base/classroom/getClassrooms'
export const studySectionSubjecturl = developUrl + '/base/StudySection/findStudySectionAndSubjects'
export const collegeteacherurlall = developUrl + '/base/CollegeManageAction/findCollegeAndTeacher'
export const ScollegeN = '院系'
export const SteacherN = '讲师'
export const termN = '学期'
export const SroomN = '教室'
export const SgradeN = '年级'
export const SsubjectN = '科目'
export const CnameN = '课程名'
export const classnameN = '班级名称'
export const templateN = '节次模板'
export const codeN = '课程代码'
export const nameNULL = '请填写课程名称！'
export const desN = '描述'

export const labelinfo = {
  title: '设置标签',
  saveN: '保存',
  labelN: '设置标签',
  selectlabelN: '选择标签'
}
export const getlabelsurl = developUrl + '/learning/label/findLabelGroups'
export const warntxt = {
  college: '请选择课程院系',
  teacher: '请选择课程讲师'
}

export const basicinfo = {
  saveN: '保存',
  cancelN: '取消',
  delN: '删除',
  sureN: '确定',
  contentN: '确定要删除吗？',
  msgaddN: '添加',
  msgeditN: '编辑',
  msgdelN: '删除',
  nameN: '班级名称',
  searchN: '查询'
}
export const attab = [
  {
    name: '行政班级',
    pathname: 'AJadministrativeclass'
  },
  {
    name: '教学班级',
    pathname: 'AJteachclass'
  }
]
// 高教表头
export const listhead = ['check', '班级名称', '院系', '专业', '班级代码', '辅导员', '操作']
export const colums = ['check', 'name', 'college', 'major', 'code', 'fdy', 'opt']
export const percentinfo = ['wid5', 'wid15', 'wid15', 'wid10', 'wid15', 'wid10', 'wid30']
export const optobjinfoAll = ['编辑', '删除']
export const opteventAll = ['editlist', 'dellist']
// 普教表头
export const listheadP = ['check', '班级名称', '年级', '班级代码', '班主任', '操作']
export const columsP = ['check', 'name', 'grade', 'code', 'teacher', 'opt']
export const percentinfoP = ['wid5', 'wid20', 'wid20', 'wid15', 'wid15', 'wid25']
export const optobjinfoAllP = ['编辑', '删除']
export const opteventAllP = ['editlist', 'dellist']

export const pathinfo = {'prex': 'AJadministrativeclass', 'optname': '行政班级'}
export const bingos = []
export const searchinput = 'width:140px;'
export const searchstyle = 'position:absolute;width:300px;'
export const pageval = 1
export const products = []
export const infoval = []

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/base/classes/findClassesList'
export const addurl = developUrl + '/base/classes/addClasses'
export const editurl = developUrl + '/base/classes/updateClasses'
export const delurl = developUrl + '/base/classes/deleteClasses'
export const collegemajorurl = developUrl + '/base/CollegeManageAction/findCollegeAndMajor'
export const getgradesurl = developUrl + '/base/StudySection/getStudySectionList'
export const getusersurl = developUrl + '/base/user/findUsersByCollegeIdAndRoleType'
export const pagesize = 10
export const powerinfo = {
  OeN: '编辑',
  OPelist: 'editlist',
  OdN: '删除',
  OPdlist: 'dellist',
  OaN: '添加',
  OPalist: 'addlist'
}
export const administrativeclassinfo = {
  teacherN: '班主任',
  gradeN: '年级',
  collegeN: '学院',
  majorN: '专业',
  name: '班级名称',
  type: '班级类型',
  typexz: '行政班级',
  typejx: '教学班级',
  code: '班级代码',
  instructor: '辅导员',
  adduser: '指定辅导员',
  searchN: '查询',
  cancelN: '取消',
  sureN: '保存',
  add: '添加',
  assistantadduserplaceholder: '请输入用户姓名或工号',
  stlist: '学生列表',
  username: '请输入用户姓名',
  classinfo: '班级信息',
  userlist: '用户列表'
}
export const warntxt = {
  teacher: '请选择班主任',
  name: '请填写班级名称',
  major: '请选择专业',
  grade: '请选择年级',
  code: '请填写班级代码',
  selectmaster: '请选择辅导员'
}
export const getcollegeurl = developUrl + '/base/CollegeManageAction/findCollegeList'
export const assistantlisturl = developUrl + '/control/loopClassGroup/findMembersList'
export const assistantaddurl = developUrl + '/base/user/findUsersByCollegeAndRole'
export const delmemberurl = developUrl + '/control/loopClassGroup/deleteMembers'
export const setmemeberurl = developUrl + '/base/classes/updateClassesSetTeacher'
export const relassistantpercentinfoadd = ['wid5', 'wid30', 'wid15', 'wid25', 'wid25']
export const relassistantlistheadadd = ['check', '院系', '职务', '工号', '姓名']
export const relassistantcolumsadd = ['check', 'college', 'duty', 'code', 'name']

// 学生列表
export const stpathinfo = {'prex': 'AJadministrativeclassstlist', 'optname': '行政班级学生列表'}
export const stlisturl = developUrl + '/base/classes/findClassesStudentList'
export const stgetaddlisturl = developUrl + '/base/user/findUsersLists' // 获取学生列表
export const stsetaddurl = developUrl + '/base/classes/addClassesStudent' // 增加学生
export const stdellisturl = developUrl + '/base/classes/deleteClassesStudents' // 删除学生
export const stoptobjinfoAll = ['删除']
export const stopteventAll = ['dellist']
export const stpercentinfoadd = ['wid5', 'wid30', 'wid15', 'wid25', 'wid15', 'wid10']
export const stlistheadadd = ['check', '院系', '专业', '学号', '姓名', '操作']
export const stcolumsadd = ['check', 'college', 'major', 'code', 'name', 'opt']

export const stpercentinfoaddcopy = ['wid5', 'wid30', 'wid15', 'wid25', 'wid25']
export const stlistheadaddcopy = ['check', '院系', '专业', '学号', '姓名']
export const stcolumsaddcopy = ['check', 'college', 'duty', 'code', 'name']


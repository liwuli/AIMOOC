export const nameN = '班级名称'
export const saveN = '保存'
export const cancelN = '取消'
export const delN = '删除'
export const sureN = '确定'
export const contentN = '确定要删除吗？'
export const msgaddN = '添加'
export const msgeditN = '编辑'
export const msgdelN = '删除'
export const attab = [
  {
    name: '行政班级',
    pathname: 'AJclassmanage'   // AJadministrativeclass
  },
  {
    name: '教学班级',
    pathname: 'AJteachclass'
  }
]
export const listhead = ['check', '班级名称', '学期', '课程名', '课程院系', '课程讲师', '用户管理']
export const pathinfo = {'prex': 'AJteachclass', 'optname': '教学班级'}
export const colums = ['check', 'classesName', 'termName', 'courseName', 'collegeName', 'teacherName', 'opt']
export const percentinfo = ['wid5', 'wid15', 'wid25', 'wid15', 'wid15', 'wid15', 'wid10']
export const optobjinfoAll = ['学生列表']
export const opteventAll = ['stlist']
export const bingos = []
export const searchinput = 'width:150px;'
export const searchstyle = 'position:absolute;width:300px;'
export const pageval = 1
export const products = []
export const infoval = []

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/base/classes/findClassesList'
export const pagesize = 10
export const OstN = '学生列表'
export const OPstlist = 'stlist'
export const teachclassinfo = {
  name: '班级名称',
  type: '班级类型',
  typexz: '行政班级',
  typejx: '教学班级',
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
  name: '请填写班级名称',
  major: '请选择专业',
  code: '请填写班级代码',
  selectmaster: '请选择辅导员'
}

// 学生列表
export const stpathinfo = {'prex': 'AJteachclassstlist', 'optname': '教学班级学生列表'}
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


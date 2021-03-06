export const basicinfo = {
  navN: '用户管理',
  hint: '提示',
  title: '说明：\n1.格式为可为png、jpg;\n2.文件小于2M;\n3.分辨率大于300*300.',
  setHeadN: '设置头像',
  uploadN: '上传',
  photoinfoN: '全部照片',
  importPhotoN: '批量导入照片',
  userNameN: '用户名',
  realNameN: '真实姓名',
  sexN: '性别',
  departmentsN: '学院',
  majorN: '科目',
  classN: '班级',
  gradeN: '年级',
  phoneN: '手机',
  teacherCodeN: '用户名(工号)',
  studentCodeN: '用户名(学号)',
  telephoneN: '固话',
  emailN: '邮箱',
  passwN: '密码',
  importN: '用户导入',
  fileN: '文件',
  templatedownN: '用户模板下载',
  searchN: '查询',
  importbtnN: '导入',
  roletypeN: '类型',
  roleN: '角色',
  manN: '男',
  femenN: '女',
  saveN: '保存',
  cancelN: '取消',
  addN: '加入',
  delN: '删除',
  contentN: '确定要删除吗？',
  resetcontentN: '确定要重置密码吗？',
  msgaddT: '新增老师',
  msgaddS: '新增学生',
  msgeditT: '老师编辑',
  msgeditS: '学生编辑',
  resetN: '密码重置',
  msgdelN: '用户删除',
  ScollegeN: '院系'
}
export const btnN = '人员库匹配'
export const roleType = 2
export const filetype = '.xlsx,.xls'
export const phototype = '.jpg,.png'
export const batchuploadtype = '.zip'
export const evaluatetab = [{name: '老师', value: 'Teacher'}, {name: '学生', value: 'Student'}]
export const addradioinfo = {
  classname: 'radiofather sex',
  val: [1, 2],
  title: ['男', '女'],
  opt: {
    father: '.sex span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const radioinfo = {
  classname: 'radiofather sex',
  val: [1, 2],
  title: ['男', '女'],
  opt: {
    father: '.sex span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const roleinfo = {
  classname: 'radiofather roletype',
  val: [2, 3],
  title: ['老师', '学生'],
  opt: {
    father: '.roletype span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
// 高教版 表头 老师
export const listhead = ['check', '图像', '用户名(工号)', '姓名', '性别', '学院', '角色', '操作']
export const colums = ['check', 'photo', 'code', 'rname', 'sex', 'school', 'role', 'opt']
export const percentinfo = ['wid5', 'wid10', 'wid10', 'wid10', 'wid5', 'wid10', 'wid20', 'wid30']
// 普教版 表头 老师
export const listheadP = ['check', '图像', '用户名(工号)', '姓名', '性别', '年级', '角色', '操作']
export const columsP = ['check', 'photo', 'code', 'rname', 'sex', 'school', 'role', 'opt']
export const percentinfoP = ['wid5', 'wid10', 'wid10', 'wid10', 'wid5', 'wid10', 'wid20', 'wid30']

export const importSrc = {teacher: '/base/models/teacher_template_gj.zip', student: '/base/models/student_template_gj.zip'}
export const importSrcP = {teacher: '/base/models/teacher_template_pj.zip', student: '/base/models/student_template_pj.zip'}
export const pathinfo = {'prex': 'AJuser', 'optname': '用户'}
export const optobjinfoAll = ['编辑', '删除', '密码重置', '照片'] // 原始数据操作，无需修改弃用
export const opteventAll = ['editlist', 'dellist', 'resetpass', 'singlephoto'] // 原始数据操作，无需修改弃用
export const products = []
export const infoval = []
export const bingos = []
export const heigtinfoP = {height: '50px', 'line-height': '50px'}
export const selectstyle = 'margin-top: 3px;width: 150px;'
export const searchinput = 'width:132px;'
export const pageval = 1

import {developUrl} from '@/module/admin/config/urlPage'
export const listurl = developUrl + '/base/user/getUsers'
export const addurl = developUrl + '/base/user/addUser'
export const editurl = developUrl + '/base/user/updateUser'
export const delurl = developUrl + '/base/user/deleteUser'
export const roleurl = developUrl + '/base/role/getRoles'
export const collegeurl = developUrl + '/base/CollegeManageAction/findCollegeList'
export const getuseroleurl = developUrl + '/base/user/getUserRole'
export const importurl = developUrl + '/base/user/addUserBatch'
export const collegeteacherurlall = developUrl + '/base/CollegeManageAction/findCollegeAndTeacher'
export const resetpassurl = developUrl + '/base/user/resetPassword'
export const getgradesurl = developUrl + '/base/StudySection/getStudySectionList'
export const getclassesurl = developUrl + '/base/classes/findClassesListByStudySectionId'
export const batchuploadurl = developUrl + '/base/dubbo/uploadImgZipFile'
export const userIconsByIDurl = developUrl + '/base/user/findUserIconsByID'
export const updateUserurl = developUrl + '/base/user/updateUser'
export const courseUrl = developUrl + '/control/mobileCourse/findAllClassesList'
export const unMatchImagetUrl = developUrl + '/base/classes/findUnMatchStudentImageList'
export const imageByClassIDUrl = developUrl + '/base/classes/findStudentImageListByClassID'
export const matchStudentImageUrl = developUrl + '/base/classes/matchStudentImage'
export const delUnMatchImageUrl = developUrl + '/base/classesUserIcon/deleteUnMatchStudentImage'
export const delMatchImageUrl = developUrl + '/base/classesUserIcon/deleteMatchStudentImage'
export const collegemajorurl = developUrl + '/base/CollegeManageAction/findCollegeAndMajor'
export const classesListurl = developUrl + '/base/classes/findClassesList'
export const findCollegeListNoPage = developUrl + 'base/CollegeManageAction/findCollegeListNoPage'

export const pagesize = 10
export const powerinfo = {
  OeN: '编辑',
  OdN: '删除',
  OaN: '添加',
  OresetN: '密码重置',
  OphotoN: '照片',
  OPalist: 'addlist',
  OPelist: 'editlist',
  OPdlist: 'dellist',
  OPresetlist: 'resetpass',
  OPphlist: 'singlephoto'
}
export const warntxt = {
  userName: '请填写用户名',
  realName: '请填写真实姓名',
  code: '请填写学号/工号',
  passw: '请填写密码',
  bingo: '用户表导入成功',
  filetypeerr: '错误的文件类型',
  college: '请选择学院',
  grade: '请选择年级',
  major: '请选择专业',
  classN: '请选择班级',
  email: '请输入正确的邮箱',
  phone: '请输入正确的手机',
  illegalrealName: '用户名非法',
  norole: '请选择角色',
  saveSuccess: '保存成功'
}
export const usertab = [
  {
    name: '教师',
    jumpname: 'AJuser'
  },
  {
    name: '学生',
    jumpname: 'AJuserstudent'
  },
  {
    name: '机构人员',
    jumpname: 'AJuserdept'
  }
]
export const usertabind = ['selected', '', '']
export const selectinfo = {
  college: '院系',
  major: '专业',
  duty: '职务',
  name: '姓名',
  dept: '机构',
  grade: '年级',
  classN: '班级'
}

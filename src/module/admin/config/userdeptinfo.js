export const userNameN = '用户名'
export const realNameN = '真实姓名'
export const sexN = '性别'
export const departmentsN = '学院'
export const phoneN = '手机'
export const codeN = '学号/工号'
export const telephoneN = '固话'
export const emailN = '邮箱'
export const passwN = '密码'
export const importN = '用户导入'
export const fileN = '文件'
export const templatedownN = '用户模板下载'
export const filetype = '.xlsx,.xls'
export const importbtnN = '导入'
export const searchN = '查询'
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
export const addroleinfo = {
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
export const roletypeN = '类型'
export const manN = '男'
export const femenN = '女'
export const saveN = '保存'
export const cancelN = '取消'
export const delN = '删除'
export const contentN = '确定要删除吗？'
export const msgaddN = '用户添加'
export const msgeditN = '用户编辑'
export const msgdelN = '用户删除'
export const optobjinfoAll = ['编辑', '删除'] // 原始数据操作，无需修改弃用
export const listhead = ['check', '用户名', '真实姓名', '序号/工号', '性别', '学院', '手机', '固话', '邮箱', '操作']
export const pathinfo = {'prex': 'AJuser', 'optname': '用户'}
export const percentinfo = ['wid5', 'wid10', 'wid10', 'wid10', 'wid5', 'wid10', 'wid13', 'wid12', 'wid15', 'wid10']
export const colums = ['check', 'name', 'rname', 'code', 'sex', 'school', 'phone', 'tel', 'mail', 'opt']
export const opteventAll = ['editlist', 'dellist'] // 原始数据操作，无需修改弃用
export const products = []
export const infoval = []
export const bingos = []
export const searchinput = 'width:132px;'
export const searchstyle = 'margin-bottom:15px'
export const pageval = 1
export const listurl = '/base/user/getUsers'
export const addurl = '/base/user/addUser'
export const editurl = '/base/user/updateUser'
export const delurl = '/base/user/deleteUser'
export const roleurl = '/base/role/getRoles'
export const collegeurl = '/base/CollegeManageAction/findCollegeList'
export const getuseroleurl = '/base/user/getUserRole'
export const importurl = '/base/user/addUserBatch'
export const roleN = '角色'
export const pagesize = 10
export const OeN = '编辑'
export const OdN = '删除'
export const OaN = '添加'
export const OPalist = 'addlist'
export const OPelist = 'editlist'
export const OPdlist = 'dellist'
export const warntxt = {
  userName: '请填写用户名',
  realName: '请填写真实姓名',
  code: '请填写学号/工号',
  passw: '请填写密码',
  bingo: '用户表导入成功',
  filetypeerr: '错误的文件类型'
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
export const teacherinfo = {
  college: '院系',
  major: '专业',
  duty: '职务',
  name: '姓名'
}

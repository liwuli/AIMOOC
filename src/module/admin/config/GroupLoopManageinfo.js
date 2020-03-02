export const pathinfo = {'prex': 'AJGroupLoopManage', 'optname': '巡课群组管理'}
export const percentinfo = ['wid30', 'wid30', 'wid40']
export const listhead = ['群组名称', '群组类别', '操作']
export const colums = ['name', 'type', 'opt']
export const opteventAll = ['rel', 'editlist', 'dellist']
export const optobjinfoAll = ['查看成员', '编辑', '删除']
export const totalnum = 0
export const pageindex=1
export const products = []
export const bingos = []
export const pageval = 1
export const pagesize = 10
export const OrelaN = '查看成员'
export const OeN = '编辑'
export const OdN = '删除'
export const OaN = '添加'
export const OPalist = 'addlist'
export const OPelist = 'editlist'
export const OPdlist = 'dellist'
export const OPrelalist = 'rel'
export const loopclassgroupinfo = {
  assistant: '查看成员',
  list: '巡课群组管理',
  add: '添加巡课群组',
  edit: '编辑巡课群组',
  del: '删除巡课群组',
  deluser: '删除辅导员',
  adduser: '新增成员',
  saveN: '保存',
  sureN: '确定',
  cancelN: '取消',
  delN: '删除',
  name: '群组名称',
  type: '群组类别',
  rel: '关联巡课评价表',
  contentN: '确定要删除该群组吗？',
  collegeN: '院系',
  gradeN: '年级',
  majorN: '专业',
  searchN: '查询',
  searchplaceholder: '请输入成员姓名',
  publish: '设置为负责人',
  unpublish: '取消设置为负责人',
  publishcontent: '确定设置为负责人吗？',
  unpublishcontent: '确定取消设置为负责人吗？',
  delassistant: '删除辅导员',
  contentassistant: '确定要删除该成员吗？',
  assistantadduserplaceholder: '请输入用户姓名或工号'
}
export const group = [
  {
    value: 1,
    txt: '校领导'
  },
  {
    value: 2,
    txt: '院系领导'
  },
  {
    value: 3,
    txt: '辅导员'
  },
  {
    value: 4,
    txt: '督导'
  },
  {
    value: 5,
    txt: '巡课员'
  }
]
export const warntxt = {
  name: '请填写群组名称',
  rel: '请选择巡课评价表'
}
import {developUrl} from '@/module/admin/config/urlPage'
export const addurl = developUrl + '/control/loopClassGroup/addLoopClassGroup'
export const delurl = developUrl + '/control/loopClassGroup/deleteLoopClassGroup'
export const editurl = developUrl + '/control/loopClassGroup/updateLoopClassGroup'
export const listurl = developUrl + '/control/loopClassGroup/findLoopClassGroupList'
export const loopurl = developUrl + '/control/loopConfig/loopModelList'
// 辅导员查看成员
export const relassistantpathinfo = {'prex': 'AJGroupLoopManagerelassistant', 'optname': '查看成员'}
export const relassistantpercentinfo = ['wid15', 'wid10', 'wid15', 'wid20', 'wid15', 'wid25']
export const relassistantlisthead = ['成员', '工号', '负责班级', '班级所在院系', '班级所在专业', '操作']
export const relassistantcolums = ['member', 'code', 'CCLASS', 'CCOLLEGE', 'CMAJOR', 'opt']
export const relassistantopteventAll = ['publish', 'dellist']
export const relassistantoptobjinfoAll = ['设置为负责人', '删除']
export const relassistantopteventAllcancel = ['unpublish', 'dellist']
export const relassistantoptobjinfoAllcancel = ['取消设置为负责人', '删除']
export const assistantlisturl = developUrl + '/control/loopClassGroup/findMembersList'
export const assistantaddurl = developUrl + '/base/classes/findClassesTeachers'
export const getcollegeurl = developUrl + '/base/CollegeManageAction/findCollegeList'
export const assistantaddmemberurl = developUrl + '/control/loopClassGroup/addLoopClassGroupUser'
export const collegemajorurl = developUrl + '/base/CollegeManageAction/findCollegeAndMajor'
export const delmemberurl = developUrl + '/control/loopClassGroup/deleteMembers'
export const setmemeberurl = developUrl + '/control/loopClassGroup/settingHeadMembers'
export const leaderlisturl = developUrl + '/control/loopClassGroup/findMembersList'
export const othermemeberurl = developUrl + '/control/loopClassGroup/findUnselectedMembersList'
export const getgradesurl = developUrl + '/base/StudySection/getStudySectionList'

export const relassistantpercentinfoadd = ['wid10', 'wid30', 'wid30', 'wid30']
export const relassistantlistheadadd = ['check', '院系', '工号', '姓名']
export const relassistantcolumsadd = ['check', 'college', 'code', 'name']
export const relassistantlistheadaddP = ['check', '年级', '工号', '姓名']
export const relassistantcolumsaddP = ['check', 'grade', 'code', 'name']

export const relleaderpercentinfo = ['wid15', 'wid15', 'wid25', 'wid20', 'wid25']
export const relleaderlisthead = ['成员', '工号', '职务', '院系', '操作']
export const relleadercolums = ['member', 'code', 'duty', 'college', 'opt']
export const relleaderpathinfo = {'prex': 'AJGroupLoopManagerelleader', 'optname': '查看成员'}

export const relotherpercentinfo = ['wid20', 'wid20', 'wid25', 'wid35']
export const relotherlisthead = ['成员', '工号', '院系', '操作']
export const relothercolums = ['member', 'code', 'college', 'opt']
export const relotherlistheadP = ['成员', '工号', '年级', '操作']
export const relothercolumsP = ['member', 'code', 'grade', 'opt']
export const relotherpathinfo = {'prex': 'AJGroupLoopManagerelother', 'optname': '查看成员'}

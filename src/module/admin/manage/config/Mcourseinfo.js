import {developUrl} from '@/module/admin/config/urlPage'
export const links = [
  {
    name: '基本信息',
    path: 'AJcourseManage',
    icon: 'basic'
  },
  {
    name: '公告管理',
    path: 'AJcourseManagenotice',
    icon: 'notice'
  },
  {
    name: '课程大纲',
    path: 'AJcourseManagesynopsis',
    icon: 'champter'
  },
  {
    name: '章节内容',
    path: 'AJcourseManagechampter',
    icon: 'zhangjie1'
  },
  {
    name: '资源管理',
    path: 'AJcourseManageres',
    icon: 'res'
  },
  {
    name: '教学团队管理',
    path: 'AJcourseManageteam',
    icon: 'team'
  },
  {
    name: '参考教材管理',
    path: 'AJcourseManagebook',
    icon: 'book'
  }
]
export const localinfo = {
  content: '课程编辑成功',
  msg: '提示'
}
export const uploading = '上传中......'
export const FirsttitleN = '标题管理'
export const nameN = '课程名称'
export const desN = '课程简介'
export const selectN = '选择图片'
export const uploadN = '课程图片'
export const uploadP = '上传图片'
export const nullN = '名称不能为空'
export const uploadimgurl = '/base/dubbo/uploadImgStream'
export const pathinfo = {'prex': 'AJcourseManage', 'optname': '课程'}
export const pathinfores = {'prex': 'AJcourseManageres', 'optname': '课程'}
export const pagesize = 10
export const noticepagesize = 5
export const pageval = 1
export const bingo = []

export const sureN = '确定'
export const uploadimgN = '请上传图片'
// 公告部分
export const noticecreatebtnN = '新建公告'
export const msgaddN = '添加公告'

export const optobj = ['编辑', '删除'] // 弃用
export const noticeaddurl = developUrl + '/base/courseAnnouncement/addAnnouncement'
export const saveN = '保存'
export const cancelN = '取消'
export const delN = '删除'
export const msgeditN = '编辑'
export const noticeaddnameN = '公告名称'
export const noticeaddcontentN = '公告内容'
export const delcontentN = '确定要删除吗？'
export const delchampetercontentN = '确定要删除当前章节及对应的资源吗？'
export const synopsisaddN = '大纲添加'
export const synopsiscreatebtnN = '新建大纲'
export const synopsiseditN = '编辑大纲'
export const synopsisdelN = '删除大纲'

// 补充
export const listcoursenoticeurl = developUrl + '/base/courseAnnouncement/getAnnouncementList'
export const addcoursenoticeurl = developUrl + '/base/courseAnnouncement/addAnnouncement'
export const editcoursenoticeurl = developUrl + '/base/courseAnnouncement/updateAnnouncement'
export const delcoursenoticeurl = developUrl + '/base/courseAnnouncement/deleteAnnouncement'
// 大纲操作url
export const listsynopsisurl = developUrl + '/base/courseOutline/getOutlineList'
export const addsynopsisurl = developUrl + '/base/courseOutline/addOutline'
export const savesynopsisurl = developUrl + '/base/courseOutline/saveOutline'
export const editsynopsisurl = developUrl + '/base/courseOutline/updateOutline'
export const delsynopsisurl = developUrl + '/base/courseOutline/deleteOutline'
export const synopsisdefault = {'content': ''}

export const listurl = developUrl + '/control/course/getCourseById'
export const editurl = developUrl + '/control/course/updateCourse'

// 章节
export const champtercreatebtnN = '添加章节'
export const champtereditbtnN = '编辑'
export const champterdelbtnN = '删除'
export const champtercreateresbtnN = '添加资源'
export const champteraddN = '添加章节'
export const champtereditN = '编辑章节'
export const champterdelN = '删除章节'
export const champteraddnameN = '章节名称'
export const publishN = '发布'
export const unpublishN = '取消发布'
export const champterresdelN = '删除资源'

// 章节地址
export const listchampterurl = developUrl + '/control/lesson/findOnlineLesson'
export const addchampterurl = developUrl + '/control/lesson/addOnlineLesson'
export const editchampterurl = developUrl + '/control/lesson/updateOnlineLesson'
export const delchampterurl = developUrl + '/control/lesson/deleteOnlineLesson'

// 章节下对应资源地址
export const listchampterresourceurl = developUrl + '/base/resource/getResourceForPlat'
export const addchampterresourceurl = developUrl + '/base/resource/addResource'
export const editchampterresourceurl = developUrl + '/base/resource/updateResource'
export const delchampterresourceurl = developUrl + '/base/resource/deleteResource'

// 资源管理模块下发布
export const publishresourceurl = developUrl + '/base/resource/publishOrNot'

// 资源上传
export const champterresaddnameN = '资源名称'
export const champterresinN = '所属章节'
export const restypeN = '资源类型'
export const champterresaddN = '资源添加'
export const radioinfo = {
  classname: 'radiofather restype',
  val: [0, 1, 2, 3, 4],
  title: ['视频', '文档', '图片', '音频', '多分屏'],
  opt: {
    father: '.restype span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const publishradioinfo = {
  classname: 'radiofather publish',
  val: [1, 0],
  title: ['是', '否'],
  opt: {
    father: '.publish span',
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const publishavilidN = '是否发布'
export const filechooseN = '选择文件'
export const fileaddchooseN = '添加'
export const fileaddchoosetxtN = '文件选择'
export const resaddbtnN = '添加'
export const resdefaultN = '选择文件'
export const filewarn = ['支持mp4,wmv,mxf,avi,mkv,flv文件格式的上传', '支持doc,docx,ppt,pptx,pdf,txt,xls,xlsx文件格式的上传', '支持png,jpg,bmp文件格式的上传', '支持mp3文件格式的上传', '支持mp4,wmv,mxf,avi,mkv,flv文件格式的上传']
export const fileaccept = ['.mp4,.wmv,.mxf,.avi,.mkv,.flv', '.doc,.docx,.ppt,.pptx,.pdf,.txt,.xls,.xlsx', '.png,.jpg,.bmp', '.mp3', '.mp4,.wmv,.mxf,.avi,.mkv,.flv']

// 资源管理
export const uploadresbtnN = '上传资源'
export const searchN = '查询'
export const fileinfo = [
  {'txt': '视频', val: 0, typeval: ''},
  {'txt': '文档', val: 1, typeval: 'pdf'},
  {'txt': '图片', val: 2, typeval: 'pic'},
  {'txt': '音频', val: 3, typeval: 'audio'},
  {'txt': '多分屏', val: 4, typeval: ''}
]
export const filetypeN = '文件类型'
export const filenameN = '资源名称'
export const selectarr = [0, 1, 2, 3, 4]
export const sydateN = '上传时间'
export const nodata = '暂无相关结果，请更改条件搜索'
export const listheadres = ['check', '资源名称', '所属章节', '上传时间', '资源类型', '发布状态', '操作']
export const percentinfores = ['wid5', 'wid15', 'wid15', 'wid20', 'wid10', 'wid10', 'wid25']
export const columsres = ['check', 'name', 'champter', 'uploadDate', 'restype', 'isPublishval', 'opt']
export const optobjinfoAllres = ['查看', '下载', '移动', '发布', '删除']
export const opteventAllresnomovedel = ['see', 'downlist', 'publish']
export const optobjinfoAllresnomovedel = ['查看', '下载', '发布']
export const opteventAllresnomovedelA = ['see', 'downlist', 'unpublish']
export const optobjinfoAllresnomovedelA = ['查看', '下载', '取消发布']
export const opteventAllres = ['see', 'downlist', 'move', 'publish', 'dellist']
export const optobjinfoAllresA = ['查看', '下载', '移动', '取消发布', '删除']
export const opteventAllresA = ['see', 'downlist', 'move', 'unpublish', 'dellist']
export const products = []
export const infoval = []
export const champterN = '章节内容'
export const resdelN = '删除资源'
export const resmoveN = '资源移动'
export const reslistgetresurl = developUrl + '/base/resource/resoucePreviewForPlat'
export const warntxt = { // 资源管理文本信息
  addresource: '请完善所有通道资源!',
  synopsisnull: '请填写大纲内容',
  cancelpublish: '已取消发布',
  res: '资源',
  publishok: '发布成功',
  suretocancelpublish: '确定取消发布资源',
  suretopublish: '确定要发布',
  delok: '删除成功',
  suretodel: '确定要删除吗？',
  suretodelsynopsis: '确定要删除大纲吗？',
  suretodelbook: '确定要删除教材吗？',
  cancelpublshN: '取消发布',
  jiangN: '将',
  fromN: '从',
  movetoN: '移动到',
  delN: '删除资源',
  publishN: '发布资源',
  published: '已发布',
  unpublish: '未发布',
  see: '查看',
  download: '下载',
  bq: '标清',
  gq: '高清',
  sq: '超清',
  name: '请填写章节名称',
  noticename: '请填写公告名称',
  noticecontent: '请填写公告内容',
  resaddname: '请填写资源名称',
  resaddfile: '请选择资源文件',
  mulscreenwarn: '请上传时长一样的视频'
}

// 教学团队
export const teaminfo = {
  teamteacherbtnN: '添加课程老师',
  teacherchargetitle: '课程负责人',
  courseteacher: '课程教师',
  nodata: '暂时未设定',
  placeholder: '请输入姓名或工号',
  dept: '院系',
  grade: '年级'
}
// 教学团队 添加课程老师假数据接口及配置信息
export const listheadrel = ['check', '院系', '工号', '姓名']
export const columsrel = ['check', 'dept', 'num', 'name']
export const percentinforel = ['wid5', 'wid40', 'wid40', 'wid15']
export const listheadrelB = ['check', '工号', '姓名']
export const columsrelB = ['check', 'num', 'name']
export const percentinforelB = ['wid5', 'wid45', 'wid50']
export const relurl = developUrl + '/base/ServerManageAction/getClassroomsByDeviceId'
export const relsaveurl = developUrl + '/base/ServerManageAction/linkClassroom'
export const relstoreurl = developUrl + '/base/ServerManageAction/getStoAreaByDeviceId'
export const relsavestoreurl = developUrl + '/base/ServerManageAction/linkStoArea'
export const opteventteamadd = []

// 参考教材
export const bookinfo = {
  bookaddbtnN: '添加参考教材',
  booktitle: '参考教材列表',
  courseteacher: '课程教师',
  nodata: '暂时未设定',
  defaultval: '教材缩略图',
  upload: '上传缩略图',
  bookname: '教材名称',
  bookeditor: '教材主编',
  bookpublish: '出版社',
  bookuperr: '上传失败'
}
export const bookwarntxt = {
  bookname: '请填写教材名称',
  bookeditor: '请填写主编名称',
  bookpublish: '请填写出版社名称',
  updatepicerr: '保存图片信息失败，请重试'
}
export const uperr = '上传失败'
export const addbookurl = developUrl + '/base/courseTextbook/addTextbook'
export const booklisturl = developUrl + '/base/courseTextbook/getTextbookList'
export const delbookurl = developUrl + '/base/courseTextbook/deleteTextbook'
export const updatebookurl = developUrl + '/base/courseTextbook/updateTextbook'

// 教学团队
export const teamlisturl = developUrl + '/base/courseTeachingGroup/getTeachingGroupList'
export const teamaddurl = developUrl + '/base/courseTeachingGroup/addTeachingGroup'
export const teamdelurl = developUrl + '/base/courseTeachingGroup/deleteTeachingGroup'
export const teamteacherurl = developUrl + '/base/courseTeachingGroup/showAdd'
export const teamdeparturl = developUrl + '/base/CollegeManageAction/findCollegeListNoPage'
export const teamgradeurl = developUrl + '/base/StudySection/getStudySectionList'

export const getdownotherfileurl = developUrl + '/base/resource/resouceDownloadForPlat'
// 课程默认图片
export const dcoursepath = '/static/images/Dcourse.jpg'

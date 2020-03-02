import {developUrl} from '@/module/admin/config/urlPage'
export const channellisturl = developUrl + '/station/TvChannel/findTvChannelList'
export const pagesize = 10
export const bingo = []
export const pageval = 1
export const totalpage = 0
export const products = []
export const powerinfo = {
  OeN: '编辑',
  OdN: '删除',
  OaN: '添加',
  OPalist: 'addlist',
  OPelist: 'editlist',
  OPdlist: 'dellist',
  OpublishN: '开启',
  OunpublishN: '关闭',
  OPpublishlist: 'publish',
  OPunpublishlist: 'unpublish',
  OingN: '正在直播',
  OPinglist: 'living'
}
// 节目单信息
export const schoolradioinfo = {
  title: '节目单管理',
  channelname: '节目单名称',
  searchtxt: '请选择要添加节目的频道',
  search: '查询',
  add: '添加节目',
  keywords: '请输入节目关键词',
  sure: '确定',
  copy: '将节目单复制至',
  cancel: '取消',
  addtitle: '节目单添加',
  edittitle: '节目单编辑',
  programname: '节目名称',
  programtype: '节目类型',
  programfile: '选择文件',
  upfile: '选择文件',
  supporttype: '支持mp4,wmv,mxf,avi,mkv,flv文件格式的上传',
  programtime: '时间',
  to: '到',
  warn: '提示：选择的播放时间段若大于视频文件的时间，将在该时间段内循环播放',
  programpic: '节目缩略图',
  selectpic: '选择文件',
  programrecord: '节目录制',
  streamurl: '流地址',
  del: '删除',
  content: '确定要删除吗？',
  publish: '发布',
  unpublish: '取消发布',
  copytitle: '复制节目单',
  unpublishcontent: '确定要关闭该节目吗？',
  publishcontent: '确定要开启该节目吗？'
}
export const filetype = '.mp4,.wmv,.mxf,.avi,..mkv,.flv'
export const programlisthead = ['check', '开始时间', '结束时间', '节目名称', '操作']
export const programpathinfo = {'prex': 'AJcampusTVlist', 'optname': '节目单管理'}
export const programcolums = ['check', 'stime', 'etime', 'name', 'opt']
export const programpercentinfo = ['wid5', 'wid15', 'wid15', 'wid40', 'wid25']
export const programpagesize = 10
export const programpageval = 1
export const programtotalpage = 0
export const programtotalnum = 0
export const editradioinfo = {
  classname: 'radiofather',
  val: [0, 1],
  title: ['直播流', '视频文件'],
  opt: {
    init: {
      val: true,
      index: 0
    },
    inputflag: true,
    disabled: true
  }
}
export const editradioinfo1 = {
  classname: 'radiofather',
  val: [0, 1],
  title: ['直播流', '视频文件'],
  opt: {
    init: {
      val: true,
      index: 0
    },
    inputflag: true,
    disabled: true
  }
}
export const addradioinfo = {
  classname: 'radiofather',
  val: [0, 1],
  title: ['直播流', '视频文件'],
  opt: {
    init: {
      val: true,
      index: 0
    },
    inputflag: true
  }
}
export const editrecordradioinfo = {
  classname: 'record',
  val: [1, 0],
  title: ['是', '否'],
  opt: {
    'father': '.record span',
    init: {
      val: true,
      index: 1
    },
    inputflag: true
  }
}
export const addrecordradioinfo = {
  classname: 'record',
  val: [1, 0],
  title: ['是', '否'],
  opt: {
    'father': '.record span',
    init: {
      val: true,
      index: 1
    },
    inputflag: true
  }
}
export const warntxt = {
  name: '请填写节目名称',
  uploadP: '上传图片',
  uperr: '上传失败',
  uploadimgN: '请上传图片',
  accept: '.jpg,.png,.bmp,.jpeg',
  streamurl: '请输入直播流地址',
  files: '请上传视频文件',
  channelnodata: '暂无频道信息，请添加频道'
}
export const uploadimgurl = developUrl + '/base/dubbo/uploadImgStream'
export const programlisturl = developUrl + '/station/TvProgram/findTvProgramList'
export const programaddurl = developUrl + '/station/TvProgram/addTvProgramHasFile'
export const programdelurl = developUrl + '/station/TvProgram/deleteTvProgram'
export const programaddstramurl = developUrl + '/station/TvProgram/addTvProgramNoFile'
export const programediturl = developUrl + '/station/TvProgram/updateTvProgram'
export const programcopyurl = developUrl + '/station/TvProgram/tvProgramCopy'
export const programocurl = developUrl + '/station/TvProgram/openOrClose'
export const prgrameditstreamurl = developUrl + '/station/TvProgram/updateTvProgramNoFile'
export const prgrameditfileurl = developUrl + '/station/TvProgram/updateTvProgramHasFile'

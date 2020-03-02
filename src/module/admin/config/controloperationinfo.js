import {developUrl} from '@/module/admin/config/urlPage'

export const basicinfo = {
  searchplaceholder: '请输入教室名称',
  search: '查询',
  userNameN: '集控录播名',
  realNameN: '真实姓名',
  saveN: '保存并开始录制',
  cancelN: '取消',
  delN: '停止录制',
  msgdelN: '提示信息',
  msgseeN: '巡课',
  contentN: '确定要停止录制吗？',
  msgaddN: '集控添加',
  connected: '已连接',
  noconnected: '未连接',
  live: '直播中',
  nolive: '未直播',
  recording: '录制中',
  norecording: '未录制',
  channelN: '通道',
  errorinfo: '标定数据不完整',
  tableinfo: '桌长桌宽不合法',
  userN: '用户名',
  useN: '到勤率',
  desN: '描述',
  liveN: '直播',
  personN: '上课人数',
  save1N: '按默认信息开始录制',
  chapternameN: '章节名称',
  SteacherN: '讲师',
  ScourseN: '所属课程',
  equipmentN: '设备'
}
export const optobjinfo = [] // ['添加', '编辑', '删除']
export const channelinfo = [] // ['编辑', '标定', '删除']
export const roominfoAll = ['开始录制', '结束录制', '巡课', '智慧分析', '智慧班牌']
export const roomopteventAll = ['roomadd', 'editlist', 'dellist', 'analysis', 'classBrand']
export const listhead = ['check', '信息', 'opt']
export const listhead1 = ['check', '信息']
export const percentinfo1 = ['wid10', 'wid90']
export const pathinfo = {'prex': 'AJcontroloperation', 'optname': '集控'}
export const percentinfo = ['wid20', 'wid60', 'wid20']
export const colums = ['check', 'des', 'opt']
export const optevent = ['addlist', 'editlist', 'dellist']
export const channeloptevent = ['channeleditlist', 'channelsetlist', 'channeldellist']
export const products = []
export const infoval = []
export const bingos = []
export const pageval = 1
export const listurl = developUrl + '/control/centralizedControl/findCentralizedControlList'
export const addurl = developUrl + '/control/centralizedControl/startRecording'
export const stopurl = developUrl + '/control/centralizedControl/stopRecording'
export const stopliveurl = developUrl + '/live/live/closeLiveManually'
export const exeurl = developUrl + '/control/command/azimuthControl'
export const searchLesson = developUrl + '/control/centralizedControl/searchLesson'
export const pagesize = 10000
export const manufacturerinfo = [
  {'txt': '请选择...', value: -1},
  {'txt': '未设置...', port: '0', value: 0},
  {'txt': '屏幕', port: '6301', value: 1},
  {'txt': '明日', port: '0', value: 2},
  {'txt': '天地伟业', port: '0', value: 3, user: 'admin', pass: 'admin'},
  {'txt': '晨安视讯', port: '80', value: 4, user: 'admin', pass: '123456'},
  {'txt': '录播', port: '5560', value: 5},
  {'txt': '维海德', port: '81', value: 6},
  {'txt': '千视VGA', port: '8080', value: 7},
  {'txt': '保凌', port: '8091', value: 8},
  {'txt': '海康威视', port: '80', value: 9, user: 'admin', pass: 'admin123'},
  {'txt': '汉邦高科', port: '8101', value: 10},
  {'txt': '宇视', port: '1000', value: 11},
  {'txt': '日立', port: '81', value: 12},
  {'txt': '大华', port: '80', value: 13, user: 'admin', pass: 'admin'},
  {'txt': '保凌新版本', port: '0', value: 14},
  {'txt': '海康E系列', port: '0', value: 15},
  {'txt': '华为', port: '80', value: 16, user: 'admin', pass: 'HuaWei123'},
  {'txt': '耐杰', port: '8080', value: 17, user: 'system', pass: 'system'},
  {'txt': '竞业达', port: '80', value: 18, user: 'admin', pass: '12345'},
  {'txt': 'V500', port: '0', value: 19}
]
export const device = [
  {'txt': '请选择...', value: -1},
  {'txt': '教师机', value: 0},
  {'txt': '网络摄像机', value: 1},
  {'txt': '录播', value: 2},
  {'txt': 'VGA', value: 3},
  {'txt': '跟踪终端', value: 4},
  {'txt': '集控工作站', value: 5},
  {'txt': '转发录播服务器', value: 6},
  {'txt': '流媒体服务器', value: 7},
  {'txt': '分析服务器', value: 8},
  {'txt': '本地录播服务器', value: 9},
  {'txt': '常态录播设备', value: 10},
  {'txt': '中控设备', value: 11}
]
export const photoobj = [
  {'txt': '请选择...', value: -1},
  {'txt': '学生', value: 0},
  {'txt': '老师', value: 1},
  {'txt': 'PPT', value: 2},
  {'txt': '学生全景', value: 3},
  {'txt': 'PGM', value: 4},
  {'txt': '教室全景', value: 5}
]
export const photoobjN = '拍摄对象'
export const nobd = '未标定'
export const bd = '已标定'
export const yes = '是'
export const no = '否'
export const devicetype = {ip: 'ip地址：', manu: '制造商：', type: '设备类型：', use: '设备是否有效：', channelno: '通道号： ', phototype: '拍摄类型： '}
export const nameN = '设备名称'
export const httpN = '协议类型'
export const URLN = 'URL地址'
export const IPN = 'IP地址'
export const PORTN = '端口号'
export const deviceN = '设备类型'
export const teacherurl = developUrl + '/base/user/findUsersByRole'
export const courselisturl = developUrl + '/control/course/findCourses'
export const radioinfo = {
  classname: 'radiofather daoqinlv',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    father: '.daoqinlv span',
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
export const addradioinfo = {
  classname: 'radiofather daoqinlv',
  val: [0, 1],
  title: ['否', '是'],
  opt: {
    father: '.daoqinlv span',
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
export const directioninfo = {
  bigN: '放大',
  smallN: '缩小',
  upN: '上移',
  rightN: '右移',
  downN: '下移',
  leftN: '左移',
  equipmentN: '设备',
  optN: '操作'
}

export const powerinfo = {
  OstartN: '开始录制',
  OendN: '结束录制',
  OseeN: '巡课',
  OanalysisN: '智慧分析',
  OPstartlist: 'roomadd',
  OPendlist: 'editlist',
  OPseelist: 'dellist',
  OPanalysis: 'analysis'
}

export const warntxt = {
  name: '请填写名称',
  person: '请填写上课人数',
  teacher: '请选择教师',
  course: '请选择所属课程',
  personnum: '执行到勤率分析时人数需大于零！'
}


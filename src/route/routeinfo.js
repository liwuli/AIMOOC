/*
 *
 * 后台路由
 *
 * */
const AJadmin = resolve => require(['@/module/admin/components/link'], resolve)
// 控制台
const AJconsole = resolve => require(['@/module/admin/components/console'], resolve)
// 用户教师
const AJuser = resolve => require(['@/module/admin/components/user'], resolve)
const AJuseradd = resolve => require(['@/module/admin/components/useradd'], resolve)
const AJuseredit = resolve => require(['@/module/admin/components/useredit'], resolve)
const AJuserdel = resolve => require(['@/module/admin/components/userdel'], resolve)
const AJuserimport = resolve => require(['@/module/admin/components/userimport'], resolve)
const AJuserresetpass = resolve => require(['@/module/admin/components/userresetpass'], resolve)
const AJworkstation = resolve => require(['@/module/admin/components/workstation'], resolve)
const AJworkstationadd = resolve => require(['@/module/admin/components/workstationadd'], resolve)
const AJworkstationedit = resolve => require(['@/module/admin/components/workstationedit'], resolve)
const AJworkstationdel = resolve => require(['@/module/admin/components/workstationdel'], resolve)
const AJworkstationrel = resolve => require(['@/module/admin/components/workstationrel'], resolve)
const AJuserbatchphoto = resolve => require(['@/module/admin/components/userbatchphoto'], resolve)
const AJusersinglephoto = resolve => require(['@/module/admin/components/usersinglephoto'], resolve)
const AJusermatch = resolve => require(['@/module/admin/components/usermatch'], resolve)
const AJusermatchadd = resolve => require(['@/module/admin/components/usermatchadd'], resolve)
const AJusermatchdel = resolve => require(['@/module/admin/components/usermatchdel'], resolve)
// 学期
const AJterm = resolve => require(['@/module/admin/components/term'], resolve)
const AJtermadd = resolve => require(['@/module/admin/components/termadd'], resolve)
const AJtermedit = resolve => require(['@/module/admin/components/termedit'], resolve)
const AJtermdel = resolve => require(['@/module/admin/components/termdel'], resolve)
// 角色
const AJrole = resolve => require(['@/module/admin/components/role'], resolve)
const AJroleadd = resolve => require(['@/module/admin/components/roleadd'], resolve)
const AJroleedit = resolve => require(['@/module/admin/components/roleedit'], resolve)
const AJroledel = resolve => require(['@/module/admin/components/roledel'], resolve)
// 人员库管理
const AJuserLibraryIndex = resolve => require(['@/module/admin/userLibrary/index'], resolve)
const AJuserLibrary = resolve => require(['@/module/admin/userLibrary/userLibrary'], resolve)
const AJuserLibraryMatch = resolve => require(['@/module/admin/userLibrary/userLibraryMatch'], resolve)

// 院系
const AJcollege = resolve => require(['@/module/admin/components/college'], resolve)
const AJcollegeadd = resolve => require(['@/module/admin/components/collegeadd'], resolve)
const AJcollegeedit = resolve => require(['@/module/admin/components/collegeedit'], resolve)
const AJcollegedel = resolve => require(['@/module/admin/components/collegedel'], resolve)
// 节次模板
const AJclassnumber = resolve => require(['@/module/admin/components/classnumber'], resolve)
const AJclassnumberadd = resolve => require(['@/module/admin/components/classnumberadd'], resolve)
const AJclassnumberdefault = resolve => require(['@/module/admin/components/classnumberdefault'], resolve)
const AJclassnumberedit = resolve => require(['@/module/admin/components/classnumberedit'], resolve)
const AJclassnumberdel = resolve => require(['@/module/admin/components/classnumberdel'], resolve)
const AJclassnumberadddetail = resolve => require(['@/module/admin/components/classnumberadddetail'], resolve)
const AJclassnumbereditdetail = resolve => require(['@/module/admin/components/classnumbereditdetail'], resolve)
const AJclassnumberdeldetail = resolve => require(['@/module/admin/components/classnumberdeldetail'], resolve)
const AJclassnumberdelalldetail = resolve => require(['@/module/admin/components/classnumberdelalldetail'], resolve)
// 服务器
const AJserver = resolve => require(['@/module/admin/components/server'], resolve)
const AJserveradd = resolve => require(['@/module/admin/components/serveradd'], resolve)
const AJserveredit = resolve => require(['@/module/admin/components/serveredit'], resolve)
const AJserverrel = resolve => require(['@/module/admin/components/serverrel'], resolve)
const AJserverstorerel = resolve => require(['@/module/admin/components/serverstorerel'], resolve)
const AJserverdel = resolve => require(['@/module/admin/components/serverdel'], resolve)
// 日志
const AJlog = resolve => require(['@/module/admin/components/log'], resolve)
const AJlogdel = resolve => require(['@/module/admin/components/logdel'], resolve)
// 存储区
const AJstore = resolve => require(['@/module/admin/components/store'], resolve)
const AJstoreadd = resolve => require(['@/module/admin/components/storeadd'], resolve)
const AJstoreedit = resolve => require(['@/module/admin/components/storeedit'], resolve)
const AJstoredel = resolve => require(['@/module/admin/components/storedel'], resolve)
// 教室管理
const AJbuilding = resolve => require(['@/module/admin/components/building'], resolve)
const AJbuildingadd = resolve => require(['@/module/admin/components/buildingadd'], resolve)
const AJbuildingedit = resolve => require(['@/module/admin/components/buildingedit'], resolve)
const AJbuildingdel = resolve => require(['@/module/admin/components/buildingdel'], resolve)
const AJbuildingadddetail = resolve => require(['@/module/admin/components/buildingadddetail'], resolve)
const AJbuildingeditdetail = resolve => require(['@/module/admin/components/buildingeditdetail'], resolve)
const AJbuildingdeldetail = resolve => require(['@/module/admin/components/buildingdeldetail'], resolve)
const AJbuildingimport = resolve => require(['@/module/admin/components/buildingimport'], resolve)
// 权限分配
const AJpower = resolve => require(['@/module/admin/components/power'], resolve)
// 常态
const AJdailyrecord = resolve => require(['@/module/admin/components/dailyrecord'], resolve)
const AJdailyrecordedit = resolve => require(['@/module/admin/components/dailyrecordedit'], resolve)
const AJdailyrecordroomadd = resolve => require(['@/module/admin/components/dailyrecordroomadd'], resolve)
// 巡课
const AJloopClass = resolve => require(['@/module/admin/components/loopclass'], resolve)
const AJloopClasssee = resolve => require(['@/module/admin/components/loopclasssee'], resolve)

//博瑞巡课
const AJsmartClassroom = resolve => require(['@/module/admin/components/smartclassroom'], resolve)

//bookmarkpage巡课公用标签头
const AJbookmarkpage = resolve => require(['@/module/admin/components/bookmarkpage'], resolve)


//考勤统计
const AJstatistics = resolve => require(['@/module/admin/components/statistics'], resolve)
// 到勤率回顾
const AJdiligence = resolve => require(['@/module/admin/components/diligence'], resolve)

// 巡课群组管理
const AJGroupLoopManage = resolve => require(['@/module/admin/components/GroupLoopManage'], resolve)
const AJGroupLoopManageadd = resolve => require(['@/module/admin/components/GroupLoopManageadd'], resolve)
const AJGroupLoopManageedit = resolve => require(['@/module/admin/components/GroupLoopManageedit'], resolve)
const AJGroupLoopManagedel = resolve => require(['@/module/admin/components/GroupLoopManagedel'], resolve)
// 巡课群组管理--查看成员--辅导员
const AJGroupLoopManagerelassistant = resolve => require(['@/module/admin/components/GroupLoopManageassistant'],
  resolve)
const AJGroupLoopManagerelassistantunpublish = resolve => require([
  '@/module/admin/components/GroupLoopManageassistantunpublish'
], resolve)
const AJGroupLoopManagerelassistantpublish = resolve => require([
  '@/module/admin/components/GroupLoopManageassistantpublish'
], resolve)
const AJGroupLoopManagerelassistantdel = resolve => require(['@/module/admin/components/GroupLoopManageassistantdel'],
  resolve)
const AJGroupLoopManagerelassistantadd = resolve => require(['@/module/admin/components/GroupLoopManageassistantadd'],
  resolve)
// 巡课群组管理--查看成员--院系领导
const AJGroupLoopManagerelleader = resolve => require(['@/module/admin/components/GroupLoopManageleader'], resolve)
const AJGroupLoopManagerelleaderunpublish = resolve => require([
  '@/module/admin/components/GroupLoopManageleaderunpublish'
], resolve)
const AJGroupLoopManagerelleaderpublish = resolve => require(['@/module/admin/components/GroupLoopManageleaderpublish'],
  resolve)
const AJGroupLoopManagerelleaderdel = resolve => require(['@/module/admin/components/GroupLoopManageleaderdel'],
  resolve)
const AJGroupLoopManagerelleaderadd = resolve => require(['@/module/admin/components/GroupLoopManageleaderadd'],
  resolve)
// 巡课群组管理--查看成员--其他
const AJGroupLoopManagerelother = resolve => require(['@/module/admin/components/GroupLoopManageother'], resolve)
const AJGroupLoopManagerelotherunpublish = resolve => require([
  '@/module/admin/components/GroupLoopManageotherunpublish'
], resolve)
const AJGroupLoopManagerelotherpublish = resolve => require(['@/module/admin/components/GroupLoopManageotherpublish'],
  resolve)
const AJGroupLoopManagerelotherdel = resolve => require(['@/module/admin/components/GroupLoopManageotherdel'], resolve)
const AJGroupLoopManagerelotheradd = resolve => require(['@/module/admin/components/GroupLoopManageotheradd'], resolve)
// 集控录播
const AJcontrolrecord = resolve => require(['@/module/admin/components/controlrecord'], resolve)
const AJcontrolrecordimport = resolve => require(['@/module/admin/components/controlrecordimport'], resolve)
const AJcontrolrecordadd = resolve => require(['@/module/admin/components/controlrecordadd'], resolve)
const AJcontrolrecordedit = resolve => require(['@/module/admin/components/controlrecordedit'], resolve)
const AJcontrolrecorddel = resolve => require(['@/module/admin/components/controlrecorddel'], resolve)
const AJcontrolrecordadddetail = resolve => require(['@/module/admin/components/controlrecordadddetail'], resolve)
const AJcontrolrecordeditdetail = resolve => require(['@/module/admin/components/controlrecordeditdetail'], resolve)
const AJcontrolrecorddeldetail = resolve => require(['@/module/admin/components/controlrecorddeldetail'], resolve)
const AJcontrolrecordsetchannel = resolve => require(['@/module/admin/components/controlrecordbd'], resolve)
// 课程
const AJcourse = resolve => require(['@/module/admin/components/course'], resolve)
const AJcourselessonlist = resolve => require(['@/module/admin/components/courselessonlist'], resolve)
const AJcoursesee = resolve => require(['@/module/admin/components/coursesee'], resolve)
const AJcourseimport = resolve => require(['@/module/admin/components/courseimport'], resolve)
const AJcourseadd = resolve => require(['@/module/admin/components/courseadd'], resolve)
const AJcourselabel = resolve => require(['@/module/admin/components/courselabel'], resolve)
const AJcourselabeledit = resolve => require(['@/module/admin/components/courselabeledit'], resolve)
const AJcourseedit = resolve => require(['@/module/admin/components/courseedit'], resolve)
const AJcoursedel = resolve => require(['@/module/admin/components/coursedel'], resolve)
const AJcourseclassadd = resolve => require(['@/module/admin/components/courseClassadd'], resolve)
const AJcourseeditdetail = resolve => require(['@/module/admin/components/courseClassedit'], resolve)
const AJcoursedeldetail = resolve => require(['@/module/admin/components/courseClassdel'], resolve)
const AJcoursedelalldetail = resolve => require(['@/module/admin/components/courseClassdelalldetail'], resolve)
// 在线课程
const AJcourseOnline = resolve => require(['@/module/admin/components/courseOnline'], resolve)
const AJcourseOnlineadd = resolve => require(['@/module/admin/components/courseOnlineadd'], resolve)
const AJcourseOnlineedit = resolve => require(['@/module/admin/components/courseOnlineedit'], resolve)
const AJcourseOnlinedel = resolve => require(['@/module/admin/components/courseOnlinedel'], resolve)
const AJcourseOnlinelabel = resolve => require(['@/module/admin/components/courseOnlinelabel'], resolve)
const AJcourseOnlinelabeledit = resolve => require(['@/module/admin/components/courseOnlinelabeledit'], resolve)
// 课程管理
const AJcourseManage = resolve => require(['@/module/admin/manage/Mcourse'], resolve)
const AJcourseManagebasicupload = resolve => require(['@/module/admin/manage/Mcourse_basicupload'], resolve)
const AJcourseManagenotice = resolve => require(['@/module/admin/manage/Mcourse_noticelist'], resolve)
const AJcourseManagenoticeadd = resolve => require(['@/module/admin/manage/Mcourse_noticelistadd'], resolve)
const AJcourseManagenoticeedit = resolve => require(['@/module/admin/manage/Mcourse_noticelistedit'], resolve)
const AJcourseManagenoticedel = resolve => require(['@/module/admin/manage/Mcourse_noticelistdel'], resolve)
const AJcourseManagesynopsis = resolve => require(['@/module/admin/manage/Mcourse_synopsislist'], resolve)
const AJcourseManagesynopsisdel = resolve => require(['@/module/admin/manage/Mcourse_synopsislistdel'], resolve)
const AJcourseManagechampter = resolve => require(['@/module/admin/manage/Mcourse_champter'], resolve)
const AJcourseManagechampteradd = resolve => require(['@/module/admin/manage/Mcourse_champteradd'], resolve)
const AJcourseManagechampteredit = resolve => require(['@/module/admin/manage/Mcourse_champteredit'], resolve)
const AJcourseManagechampterdel = resolve => require(['@/module/admin/manage/Mcourse_champterdel'], resolve)
const AJcourseManagechampterresdel = resolve => require(['@/module/admin/manage/Mcourse_champterresdel'], resolve)
const AJcourseManagechampterrespublish = resolve => require(['@/module/admin/manage/Mcourse_champterrespublish'],
  resolve)
const AJcourseManagechampterresunpublish = resolve => require(['@/module/admin/manage/Mcourse_champterresunpublish'],
  resolve)
const AJcourseManagechampterresadd = resolve => require(['@/module/admin/manage/Mcourse_champterresadd'], resolve)
const AJcourseManageres = resolve => require(['@/module/admin/manage/Mcourse_reslist'], resolve)
const AJcourseManageresadd = resolve => require(['@/module/admin/manage/Mcourse_reslistresadd'], resolve)
const AJcourseManageresdel = resolve => require(['@/module/admin/manage/Mcourse_reslistdel'], resolve)
const AJcourseManageressee = resolve => require(['@/module/admin/manage/Mcourse_reslistsee'], resolve)
const AJcourseManageresseepic = resolve => require(['@/module/admin/manage/Mcourse_reslistseepic'], resolve)
const AJcourseManageresseeaudio = resolve => require(['@/module/admin/manage/Mcourse_reslistseeaudio'], resolve)
const AJcourseManageresseepdf = resolve => require(['@/module/admin/manage/Mcourse_reslistseepdf'], resolve)
const AJcourseManageresdownlist = resolve => require(['@/module/admin/manage/Mcourse_reslistdown'], resolve)
const AJcourseManageresdownlistpic = resolve => require(['@/module/admin/manage/Mcourse_reslistdownother'], resolve)
const AJcourseManageresmove = resolve => require(['@/module/admin/manage/Mcourse_reslistmove'], resolve)
const AJcourseManagerespublish = resolve => require(['@/module/admin/manage/Mcourse_reslistpublish'], resolve)
const AJcourseManageresunpublish = resolve => require(['@/module/admin/manage/Mcourse_reslistunpublish'], resolve)
const AJcourseManageteam = resolve => require(['@/module/admin/manage/Mcourse_teamlist'], resolve)
const AJcourseManageteamadd = resolve => require(['@/module/admin/manage/Mcourse_teamlistadd'], resolve)
const AJcourseManageteamdel = resolve => require(['@/module/admin/manage/Mcourse_teamlistdel'], resolve)
const AJcourseManagebook = resolve => require(['@/module/admin/manage/Mcourse_booklist'], resolve)
const AJcourseManagebookadd = resolve => require(['@/module/admin/manage/Mcourse_booklistadd'], resolve)
const AJcourseManagebookedit = resolve => require(['@/module/admin/manage/Mcourse_booklistedit'], resolve)
const AJcourseManagebookdel = resolve => require(['@/module/admin/manage/Mcourse_booklistdel'], resolve)
const AJcourseManagebookupload = resolve => require(['@/module/admin/manage/Mcourse_bookupload'], resolve)

// 课表
const AJlesson = resolve => require(['@/module/admin/components/lesson'], resolve)
const AJlessonadd = resolve => require(['@/module/admin/components/lessonadd'], resolve)
const AJlessonfreeadd = resolve => require(['@/module/admin/components/lessonfreeadd'], resolve)
const AJlessonedit = resolve => require(['@/module/admin/components/lessonedit'], resolve)
const AJlessondel = resolve => require(['@/module/admin/components/lessondel'], resolve)


//课表重构
const AJscheduleplan = resolve => require(['@/module/admin/components/scheduleplan'], resolve)



// 资源
const AJresource = resolve => require(['@/module/admin/components/resource'], resolve)
const AJresourceedit = resolve => require(['@/module/admin/components/resourceedit'], resolve)
const AJresourcedel = resolve => require(['@/module/admin/components/resourcedel'], resolve)
const AJresourcepower = resolve => require(['@/module/admin/components/resourceplay'], resolve)
const AJresourcedown = resolve => require(['@/module/admin/components/resourcedown'], resolve)
const AJresourcepublish = resolve => require(['@/module/admin/components/resourcepublish'], resolve)
// 服务器控制
const AJmonitor = resolve => require(['@/module/admin/components/monitor'], resolve)
const AJmonitorsee = resolve => require(['@/module/admin/components/monitorsee'], resolve)
// 预约
const AJappoint = resolve => require(['@/module/admin/components/appoint'], resolve)
const AJappointtime = resolve => require(['@/module/admin/components/appointtime'], resolve)
const AJappointdetail = resolve => require(['@/module/admin/components/appointdetail'], resolve)
const AJappointanounce = resolve => require(['@/module/admin/components/appointanounce'], resolve)
const AJappointanounceadd = resolve => require(['@/module/admin/components/appointanounceadd'], resolve)
const AJappointanounceedit = resolve => require(['@/module/admin/components/appointanounceedit'], resolve)
const AJappointanouncedel = resolve => require(['@/module/admin/components/appointanouncedel'], resolve)

// 预约管理
const AJappointManage = resolve => require(['@/module/admin/components/appointManage'], resolve)
const AJappointManageadd = resolve => require(['@/module/admin/components/appointManageadd'], resolve)
const AJappointManageedit = resolve => require(['@/module/admin/components/appointManageback'], resolve)
const AJappointManagedel = resolve => require(['@/module/admin/components/appointManagedetail'], resolve)

// 预约历史记录
const AJappointHistory = resolve => require(['@/module/admin/components/appointHistory'], resolve)
const AJappointHistorydel = resolve => require(['@/module/admin/components/appointHistorydetail'], resolve)

// 录制分析
const AJanalysis = resolve => require(['@/module/admin/components/analysis'], resolve)
// 日志管理
const AJlogManage = resolve => require(['@/module/admin/components/logManage'], resolve)
// 集中控制
const AJcontroloperation = resolve => require(['@/module/admin/components/controloperation'], resolve)
const AJcontroloperationadd = resolve => require(['@/module/admin/components/controloperationadd'], resolve)
const AJcontroloperationalter = resolve => require(['@/module/admin/components/controloperationalter'], resolve)
const AJcontroloperationstop = resolve => require(['@/module/admin/components/controloperationstop'], resolve)
const AJcontroloperationsee = resolve => require(['@/module/admin/components/controloperationsee'], resolve)
const AJintelligentterminalmonitor = resolve => require(['@/module/admin/analyze/intelligentterminalmonitor'], resolve)

// 到勤率动态分析
const AJattendRate = resolve => require(['@/module/admin/components/attendRate'], resolve)
const AJattendRatesee = resolve => require(['@/module/admin/components/attendRatesee'], resolve)
// 常态
const AJdailyoperation = resolve => require(['@/module/admin/components/dailyoperation'], resolve)

// 用户预约 后期移到个人中心
// 预约
const AJappointuser = resolve => require(['@/module/admin/components/appointuser'], resolve)
const AJappointuseradd = resolve => require(['@/module/admin/components/appointuseradd'], resolve)
const AJappointuserdetail = resolve => require(['@/module/admin/components/appointuserdetail'], resolve)

const AJappointuserHistory = resolve => require(['@/module/admin/components/appointuserHistory'], resolve)
const AJappointuserHistoryjump = resolve => require(['@/module/admin/components/appointuserHistorydetail'], resolve)

// 门户
const AJportal = resolve => require(['@/module/admin/components/portal'], resolve)

// 公告管理
const AJannounce = resolve => require(['@/module/admin/components/anounce'], resolve)
const AJannounceadd = resolve => require(['@/module/admin/components/anounceadd'], resolve)
const AJannounceedit = resolve => require(['@/module/admin/components/anounceedit'], resolve)
const AJannouncedel = resolve => require(['@/module/admin/components/anouncedel'], resolve)

// 学科
const AJsubject = resolve => require(['@/module/admin/components/subject'], resolve)
const AJsubjectadd = resolve => require(['@/module/admin/components/subjectadd'], resolve)
const AJsubjectedit = resolve => require(['@/module/admin/components/subjectedit'], resolve)
const AJsubjectdel = resolve => require(['@/module/admin/components/subjectdel'], resolve)

// 学段
const AJstudySection = resolve => require(['@/module/admin/components/studySection'], resolve)
const AJstudySectionadd = resolve => require(['@/module/admin/components/studySectionadd'], resolve)
const AJstudySectionedit = resolve => require(['@/module/admin/components/studySectionedit'], resolve)
const AJstudySectiondel = resolve => require(['@/module/admin/components/studySectiondel'], resolve)
const AJstudySectionrel = resolve => require(['@/module/admin/components/studySectionrel'], resolve)

// 评价模板
const AJevaluateTemplate = resolve => require(['@/module/admin/components/evaluateTemplate'], resolve)
const AJevaluateTemplateadd = resolve => require(['@/module/admin/components/evaluateTemplateadd'], resolve)
const AJevaluateTemplateedit = resolve => require(['@/module/admin/components/evaluateTemplateedit'], resolve)
const AJevaluateTemplatedel = resolve => require(['@/module/admin/components/evaluateTemplatedel'], resolve)
const AJevaluateTemplatepublish = resolve => require(['@/module/admin/components/evaluateTemplatepublish'], resolve)
const AJevaluateTemplateunpublish = resolve => require(['@/module/admin/components/evaluateTemplateunpublish'], resolve)
// 评价模板巡课管理
const AJevaluateTemplateloop = resolve => require(['@/module/admin/components/evaluateTemplateloop'], resolve)
const AJevaluateTemplateloopadd = resolve => require(['@/module/admin/components/evaluateTemplateloopadd'], resolve)
const AJevaluateTemplateloopedit = resolve => require(['@/module/admin/components/evaluateTemplateloopedit'], resolve)
const AJevaluateTemplateloopdel = resolve => require(['@/module/admin/components/evaluateTemplateloopdel'], resolve)
const AJevaluateTemplatelooppublish = resolve => require(['@/module/admin/components/evaluateTemplatelooppublish'],
  resolve)
const AJevaluateTemplateloopunpublish = resolve => require(['@/module/admin/components/evaluateTemplateloopunpublish'],
  resolve)
const AJevaluateTemplateloopsettemplate = resolve => require(['@/module/admin/components/evaluatetemplateloopset'],
  resolve)
const AJevaluateTemplateloopsettemplatedel = resolve => require(['@/module/admin/components/evaluatetemplateloopsetdel'],
  resolve)
const AJevaluateTemplateloopsettemplateresee = resolve => require([
  '@/module/admin/components/evaluateTemplateloopresee'
], resolve)
const AJevaluateTemplateloopsettemplateRadioadd = resolve => require([
  '@/module/admin/components/evaluateTemplateloopradioadd'
], resolve)
const AJevaluateTemplateloopsettemplateRadioedit = resolve => require([
  '@/module/admin/components/evaluateTemplateloopradioedit'
], resolve)
const AJevaluateTemplateloopsettemplateCheckadd = resolve => require([
  '@/module/admin/components/evaluateTemplateloopcheckadd'
], resolve)
const AJevaluateTemplateloopsettemplateCheckedit = resolve => require([
  '@/module/admin/components/evaluateTemplateloopcheckedit'
], resolve)
const AJevaluateTemplateloopsettemplateScoleadd = resolve => require([
  '@/module/admin/components/evaluateTemplateloopscoleadd'
], resolve)
const AJevaluateTemplateloopsettemplateScoleedit = resolve => require([
  '@/module/admin/components/evaluateTemplateloopscoleedit'
], resolve)
const AJevaluateTemplateloopsettemplateCountadd = resolve => require([
  '@/module/admin/components/evaluateTemplateloopcountadd'
], resolve)
const AJevaluateTemplateloopsettemplateCountedit = resolve => require([
  '@/module/admin/components/evaluateTemplateloopcountedit'
], resolve)
const AJevaluateTemplateloopsettemplateQuestionadd = resolve => require([
  '@/module/admin/components/evaluateTemplateloopquestionadd'
], resolve)
const AJevaluateTemplateloopsettemplateQuestionedit = resolve => require([
  '@/module/admin/components/evaluateTemplateloopquestionedit'
], resolve)

// 直播管理
const AJlive = resolve => require(['@/module/admin/components/live'], resolve)
const AJlivepower = resolve => require(['@/module/admin/components/liveplay'], resolve)
const AJlivebasicupload = resolve => require(['@/module/admin/components/livebasicupload'], resolve)
const AJliveeditbasicupload = resolve => require(['@/module/admin/components/liveeditbasicupload'], resolve)
const AJlivemaster = resolve => require(['@/module/admin/components/livemaster'], resolve)
const AJliveeditmaster = resolve => require(['@/module/admin/components/liveeditmaster'], resolve)
const AJliveadd = resolve => require(['@/module/admin/components/liveadd'], resolve)
const AJliveedit = resolve => require(['@/module/admin/components/liveedit'], resolve)
const AJlivedel = resolve => require(['@/module/admin/components/livedel'], resolve)
const AJlivedownlist = resolve => require(['@/module/admin/components/livedown'], resolve)
const AJlivesee = resolve => require(['@/module/admin/components/livesee'], resolve)
const AJlivestoplive = resolve => require(['@/module/admin/components/livestop'], resolve)
// 直播管理 发布视频
const AJliverelease = resolve => require(['@/module/admin/components/liverelease'], resolve)

// 设置评价模板
const AJevaluateTemplatesettemplate = resolve => require(['@/module/admin/components/evaluationtemplateset'], resolve)
const AJevaluateTemplatesettemplateadd = resolve => require(['@/module/admin/components/evaluationtemplatesetadd'],
  resolve)
const AJevaluateTemplatesettemplateedit = resolve => require(['@/module/admin/components/evaluationtemplatesetedit'],
  resolve)
const AJevaluateTemplatesettemplatedel = resolve => require(['@/module/admin/components/evaluationtemplatesetdel'],
  resolve)
const AJevaluateTemplatesettemplatecontentadd = resolve => require([
  '@/module/admin/components/evaluationtemplatesetcontentadd'
], resolve)
const AJevaluateTemplatesettemplatecontentedit = resolve => require([
  '@/module/admin/components/evaluationtemplatesetcontentedit'
], resolve)
const AJevaluateTemplatesettemplatecontentdel = resolve => require([
  '@/module/admin/components/evaluationtemplatesetcontentdel'
], resolve)

// 标签组
const AJlabel = resolve => require(['@/module/admin/components/label'], resolve)
const AJlabeladd = resolve => require(['@/module/admin/components/labeladd'], resolve)
const AJlabeledit = resolve => require(['@/module/admin/components/labeledit'], resolve)
const AJlabeldel = resolve => require(['@/module/admin/components/labeldel'], resolve)
const AJlabelcontentadd = resolve => require(['@/module/admin/components/labelcontentadd'], resolve)
const AJlabelcontentedit = resolve => require(['@/module/admin/components/labelcontentedit'], resolve)
const AJlabelcontentdel = resolve => require(['@/module/admin/components/labelcontentdel'], resolve)

// 模块管理
const AJmodule = resolve => require(['@/module/admin/components/module'], resolve)
const AJmoduleedit = resolve => require(['@/module/admin/components/moduleedit'], resolve)

// 课程筛选条件管理
const AJcurriculum = resolve => require(['@/module/admin/components/curriculum'], resolve)
const AJcurriculumimport = resolve => require(['@/module/admin/components/curriculumimport'], resolve)
const AJcurriculumdel = resolve => require(['@/module/admin/components/curriculumdel'], resolve)

// 工具管理
export const AJtool = resolve => require(['@/module/admin/components/tool'], resolve)
export const AJtoolseetranscode = resolve => require(['@/module/admin/components/tooltranscodelist'], resolve)
export const AJtoolseetranscoded = resolve => require(['@/module/admin/components/tooltranscodedlist'], resolve)
export const AJtoolsee = resolve => require(['@/module/admin/components/tooltranscodesee'], resolve)
export const AJtooldel = resolve => require(['@/module/admin/components/tooltranscodeddel'], resolve)

// 用户中心
export const AJusercenter = resolve => require(['@/module/admin/usercenter/usercenter'], resolve)
export const AJusercenterme = resolve => require(['@/module/admin/usercenter/usercenterme'], resolve)
export const AJusercenterfocus = resolve => require(['@/module/admin/usercenter/usercenter_myfocus'], resolve)
export const AJusercentercollect = resolve => require(['@/module/admin/usercenter/usercenter_mycollect'], resolve)
export const AJusercenterbook = resolve => require(['@/module/admin/usercenter/usercenter_mybook'], resolve)
export const AJusercentercollectdel = resolve => require(['@/module/admin/usercenter/usercenter_mycollectdel'], resolve)
export const AJusercenterbasicupload = resolve => require(['@/module/admin/usercenter/usercenter_basicupload'], resolve)
export const AJusercentermeupload = resolve => require(['@/module/admin/usercenter/usercenter_basicupload'], resolve)
export const AJusercenterbookupload = resolve => require(['@/module/admin/usercenter/usercenter_basicupload'], resolve)
export const AJusercentercollectupload = resolve => require(['@/module/admin/usercenter/usercenter_basicupload'],
  resolve)
export const AJusercenterfocusupload = resolve => require(['@/module/admin/usercenter/usercenter_basicupload'], resolve)
export const AJusercenterloop = resolve => require(['@/module/admin/usercenter/usercenter_myloop'], resolve)
export const AJusercenterloopGroup = resolve => require(['@/module/admin/usercenter/loopGroup'], resolve)
export const AJusercenterloopAllot = resolve => require(['@/module/admin/usercenter/loopAllot'], resolve)
export const AJusercenterloopDetails = resolve => require(['@/module/admin/usercenter/loopDetails'], resolve)
export const AJusercenterloopTaskLeader = resolve => require(['@/module/admin/usercenter/loopTaskLeader'], resolve)
export const AJusercenterloopTaskCommon = resolve => require(['@/module/admin/usercenter/loopTaskCommon'], resolve)
export const AJusercenterloopTaskSupervisor = resolve => require(['@/module/admin/usercenter/loopTaskSupervisor'],
  resolve)

// 机构管理
export const AJorganization = resolve => require(['@/module/admin/components/organization'], resolve)
export const AJorganizationadd = resolve => require(['@/module/admin/components/organizationadd'], resolve)
export const AJorganizationedit = resolve => require(['@/module/admin/components/organizationedit'], resolve)
export const AJorganizationdel = resolve => require(['@/module/admin/components/organizationdel'], resolve)

//高教-- 学科管理 还有一个普教 学科
export const AJhighteaching = resolve => require(['@/module/admin/components/highteaching'], resolve)



// 专业管理
export const AJmajor = resolve => require(['@/module/admin/components/major'], resolve)
export const AJmajoradd = resolve => require(['@/module/admin/components/majoradd'], resolve)
export const AJmajoredit = resolve => require(['@/module/admin/components/majoredit'], resolve)
export const AJmajordel = resolve => require(['@/module/admin/components/majordel'], resolve)

// 职务管理
export const AJduty = resolve => require(['@/module/admin/components/duty'], resolve)
export const AJdutyadd = resolve => require(['@/module/admin/components/dutyadd'], resolve)
export const AJdutyedit = resolve => require(['@/module/admin/components/dutyedit'], resolve)
export const AJdutydel = resolve => require(['@/module/admin/components/dutydel'], resolve)

// 焦点图管理
export const AJbanner = resolve => require(['@/module/admin/components/banner'], resolve)
export const AJbanneradd = resolve => require(['@/module/admin/components/banneradd'], resolve)
export const AJbanneredit = resolve => require(['@/module/admin/components/banneredit'], resolve)
export const AJbannerdel = resolve => require(['@/module/admin/components/bannerdel'], resolve)
export const AJbannerpublish = resolve => require(['@/module/admin/components/bannerpublish'], resolve)
export const AJbannerunpublish = resolve => require(['@/module/admin/components/bannerunpublish'], resolve)
// 模块管理
export const AJrankmanage = resolve => require(['@/module/admin/components/rankmanage'], resolve)
export const AJrankmanageedit = resolve => require(['@/module/admin/components/rankmanageedit'], resolve)

// 校园电视台管理
export const AJcampusTVchannel = resolve => require(['@/module/admin/components/campusTVchannel'], resolve)
export const AJcampusTVchanneladd = resolve => require(['@/module/admin/components/campusTVchanneladd'], resolve)
export const AJcampusTVchanneledit = resolve => require(['@/module/admin/components/campusTVchanneledit'], resolve)
export const AJcampusTVchanneldel = resolve => require(['@/module/admin/components/campusTVchanneldel'], resolve)

// 校园电视台节目单管理
export const AJcampusTVlist = resolve => require(['@/module/admin/components/campusTVlist'], resolve)
export const AJcampusTVlistcopy = resolve => require(['@/module/admin/components/campusTVlistcopy'], resolve)
export const AJcampusTVlistadd = resolve => require(['@/module/admin/components/campusTVlistadd'], resolve)
export const AJcampusTVlistpublish = resolve => require(['@/module/admin/components/campusTVlistpublish'], resolve)
export const AJcampusTVlistunpublish = resolve => require(['@/module/admin/components/campusTVlistunpublish'], resolve)
export const AJcampusTVlistdel = resolve => require(['@/module/admin/components/campusTVlistdel'], resolve)
export const AJcampusTVlistaddbasicupload = resolve => require(['@/module/admin/components/campusTVlistbasicupload'],
  resolve)
export const AJcampusTVlistedit = resolve => require(['@/module/admin/components/campusTVlistedit'], resolve)
export const AJcampusTVlisteditbasicupload = resolve => require([
  '@/module/admin/components/campusTVlisteditbasicupload'
], resolve)

// 班级管理--行政班级
export const AJadministrativeclass = resolve => require(['@/module/admin/components/administrativeclass'], resolve)

export const AJadministrativeclassadd = resolve => require(['@/module/admin/components/administrativeclassadd'],
  resolve)
export const AJadministrativeclassedit = resolve => require(['@/module/admin/components/administrativeclassedit'],
  resolve)
export const AJadministrativeclassdel = resolve => require(['@/module/admin/components/administrativeclassdel'],
  resolve)
export const AJadministrativeclassrel = resolve => require(['@/module/admin/components/administrativeclassassistantadd'],
  resolve)
export const AJadministrativeclassstlist = resolve => require(['@/module/admin/components/administrativeclassstlist'],
  resolve)
export const AJadministrativeclassstlistadd = resolve => require([
  '@/module/admin/components/administrativeclassstlistadd'
], resolve)
export const AJadministrativeclassstlistdel = resolve => require([
  '@/module/admin/components/administrativeclassstlistdel'
], resolve)

// 班级管理--教学班级
export const AJteachclass = resolve => require(['@/module/admin/components/teachclass'], resolve)
export const AJteachclassimport = resolve => require(['@/module/admin/components/teachclassimport'], resolve)
export const AJteachclassstlist = resolve => require(['@/module/admin/components/teachclassstlist'], resolve)
export const AJteachclassstlistadd = resolve => require(['@/module/admin/components/teachclassstlistadd'], resolve)
export const AJteachclassstlistdel = resolve => require(['@/module/admin/components/teachclassstlistdel'], resolve)

// 智慧终端管理
const AJintelligentterminal = resolve => require(['@/module/admin/components/intelligentterminal'], resolve)
const AJintelligentterminaladd = resolve => require(['@/module/admin/components/intelligentterminaladd'], resolve)
const AJintelligentterminaledit = resolve => require(['@/module/admin/components/intelligentterminaledit'], resolve)
const AJintelligentterminaldel = resolve => require(['@/module/admin/components/intelligentterminaldel'], resolve)

/*
 *
 * 前台路由
 *
 * */
const Fhome = resolve => require(['@/module/home/index'], resolve)
const Fcourse = resolve => require(['@/module/home/course'], resolve)
const Fcourseres = resolve => require(['@/module/home/courseRes'], resolve)
const Fcourseintroduction = resolve => require(['@/module/home/courseintroduction'], resolve)

// 微格教学课程视频详情
const Fmicrovideo = resolve => require(['@/module/home/microvideo'], resolve)

const Fcoursedirectory = resolve => require(['@/module/home/coursedirectory'], resolve)
const Fcourseappraise = resolve => require(['@/module/home/courseappraise'], resolve)
const Fcourseannouncement = resolve => require(['@/module/home/courseannounce'], resolve)
const FcourseDetail = resolve => require(['@/module/home/courseDetail'], resolve)
const Fcoursedetailmynotedel = resolve => require(['@/module/home/courseDetailmynotedel'], resolve)
const Fcoursedetailmicrovideodel = resolve => require(['@/module/home/coursedetailmicrovideodel'], resolve)
const Fcoursedetailappraiseadd = resolve => require(['@/module/home/coursedetaildiscussappraiseadd'], resolve)
const Fcoursedetailappraiseadd1 = resolve => require(['@/module/home/coursedetailteacherquestiontitleadd'], resolve)
const Fcoursedetailiappraiseadd = resolve => require(['@/module/home/coursedetailteacherquestionappraiseadd'], resolve)
const Fcoursedetailmicrovideosee = resolve => require(['@/module/home/coursedetailmicrovideosee'], resolve)
const Fcoursedetailfilesee = resolve => require(['@/module/home/coursedetailfilesee'], resolve)
const Fcoursedetailfileseepic = resolve => require(['@/module/home/coursedetailfileseepic'], resolve)
const Fcoursedetailfileseeaudio = resolve => require(['@/module/home/coursedetailfileseeaudio'], resolve)
const FcourseDetaildown = resolve => require(['@/module/home/courseDetaildown'], resolve)
// 直播
const Flive = resolve => require(['@/module/home/live'], resolve)
const Flivesearch = resolve => require(['@/module/home/livesearch'], resolve)
const Fliveliving = resolve => require(['@/module/home/living'], resolve)
const Fliveunlive = resolve => require(['@/module/home/unlive'], resolve)
const Flivelived = resolve => require(['@/module/home/lived'], resolve)
const Flivedetail = resolve => require(['@/module/home/livedetail'], resolve)
const Fliveoverdetail = resolve => require(['@/module/home/liveoverdetail'], resolve)
const Flivereview = resolve => require(['@/module/home/livereview'], resolve)
const Flivedownlist = resolve => require(['@/module/admin/components/livedown'], resolve)

// 校园电视台
const Fcampustv = resolve => require(['@/module/home/campustv'], resolve)
const Fcampustvall = resolve => require(['@/module/home/campustvall'], resolve)
const Fcampustvallprogram = resolve => require(['@/module/home/campustvallprogram'], resolve)
const Fcampustvlive = resolve => require(['@/module/home/campustvlive'], resolve)
const Fcampustvliveplay = resolve => require(['@/module/home/campustvliveplay'], resolve)
const Fcampustvsee = resolve => require(['@/module/home/campustvsee'], resolve)

//微格教学

const Fmicroteaching = resolve => require(['@/module/home/microteaching'], resolve)


// 4004
const Nothing = resolve => require(['@/components/common/nothing'], resolve)

// 教情学情分析
const NstatusMonitor = resolve => require(['@/module/admin/analyze/statusMonitor'], resolve)
const NteachAnalyze = resolve => require(['@/module/admin/analyze/teachAnalyze'], resolve)
const NcourseAnalysis = resolve => require(['@/module/admin/analyze/courseAnalysis/courseAnalysis'], resolve)
const NcourseContrast = resolve => require(['@/module/admin/analyze/courseContrast'], resolve)
const HTeacherContrast = resolve => require(['@/module/admin/analyze/teacherContrast/teacherContrast'], resolve)
const HTeacherAnalysis = resolve => require(['@/module/admin/analyze/teacherAnalysis/teacherAnalysis'], resolve)
const NclassContrast = resolve => require(['@/module/admin/analyze/classContrast'], resolve)

// 智慧班牌
const ClassBrand = resolve => require(['@/module/admin/analyze/classBrand'], resolve)

// 智慧教学分析
const Banalyze = resolve => require(['@/module/analyze/analyze'], resolve)
const BcourseContrast = resolve => require(['@/module/analyze/courseContrast'], resolve)
const BclassContrast = resolve => require(['@/module/analyze/classContrast'], resolve)
const BstudentAnalysis = resolve => require(['@/module/analyze/studentAnalysis'], resolve)
const BstudentContrast = resolve => require(['@/module/analyze/studentContrast'], resolve)
const TeacherContrast = resolve => require(['@/module/analyze/teacherContrast/teacherContrast'], resolve)
const TeacherAnalysis = resolve => require(['@/module/analyze/teacherAnalysis/teacherAnalysis'], resolve)

import * as names from '@/route/breadName'
import * as Fnames from '@/route/FbreadName'

/*
 *
 * 学情分析路由
 *
 */
export const analyzeRoute = [{
    path: '/statusMonitor',
    name: 'NstatusMonitor',
    component: NstatusMonitor
  },
  {
    path: '/teachAnalyze',
    name: 'NteachAnalyze',
    component: NteachAnalyze
  },
  {
    path: '/courseAnalysis',
    name: 'NcourseAnalysis',
    component: NcourseAnalysis
  },
  {
    path: '/courseContrast',
    name: 'NcourseContrast',
    component: NcourseContrast
  },
  {
    path: '/HTeacherContrast',
    name: 'HTeacherContrast',
    component: HTeacherContrast
  },
  {
    path: '/HteacherAnalysis',
    name: 'HTeacherAnalysis',
    component: HTeacherAnalysis
  },
  {
    path: '/classContrast',
    name: 'NclassContrast',
    component: NclassContrast
  },
  {
    path: '/intelligentterminalmonitor',
    name: 'AJintelligentterminalmonitor',
    component: AJintelligentterminalmonitor
  }
]

/*
 *
 * 智慧教学分析
 *
 * */
export const analyze = [{
    path: '/analyze',
    name: 'Banalyze',
    component: Banalyze
  },
  {
    path: '/courseContrast',
    name: 'BcourseContrast',
    component: BcourseContrast
  },
  {
    path: '/classContrast',
    name: 'BclassContrast',
    component: BclassContrast
  },
  {
    path: '/teacherContrast',
    name: 'TeacherContrast',
    component: TeacherContrast
  },
  {
    path: '/teacherAnalysis',
    name: 'TeacherAnalysis',
    component: TeacherAnalysis
  },
  {
    path: '/studentAnalysis',
    name: 'BstudentAnalysis',
    component: BstudentAnalysis
  },
  {
    path: '/studentContrast',
    name: 'BstudentContrast',
    component: BstudentContrast
  }
]
/*
 *
 * 在线巡课
 *
 * */
export const loopClass = [{
  path: '/loopClass',
  name: 'AJloopClass',
  component: AJloopClass,
  meta: {
    breadcrumbName: names.AJloopClassN
  },
  children: [{
    name: 'AJloopClasssee',
    path: 'see',
    component: AJloopClasssee,
    meta: {
      breadcrumbName: names.AJloopClassseeN
    }
  }]
}]



export const bookmarkpage = [{
  path: '/bookmarkpage',
  name: 'AJbookmarkpage',
  component: AJbookmarkpage,
  meta: {
    breadcrumbName: names.AJbookmarkpageN
  },
  children: [{
      name: 'AJloopClass',
      path: 'loopClass',
      component: AJloopClass,
      meta: {
        keepAlive: true, // 不需要被缓存
        breadcrumbName: names.AJloopClassN
      },
      children: [{
        name: 'AJloopClasssee',
        path: 'see',
        component: AJloopClasssee,
        meta: {
          breadcrumbName: names.AJloopClassseeN
        }
      }]
    },
    {
      path: 'smartClassroom',
      name: 'AJsmartClassroom',
      component: AJsmartClassroom,
      meta: {
        keepAlive: false, // 不需要被缓存
        breadcrumbName: names.AJsmartClassroomN
      }
    }
  ]
}]



//课表重构路由
export const scheduleplan = [{
  path: '/scheduleplan',
  name: 'AJscheduleplan',
  component: AJscheduleplan,
  meta: {
    breadcrumbName: names.AJscheduleplanN
  },
  children: []
}]


// children: [
// 		{
// 		name: 'AJloopClass',
// 		path: 'loopClass',
// 		component: AJloopClass,
// 		meta: {
// 			breadcrumbName: names.AJloopClassN
// 		}
// 	 },
// 	 {
// 	 	path: 'smartClassroom',
// 	 	name: 'AJsmartClassroom',
// 	 	component: AJsmartClassroom,
// 			meta: {
// 				breadcrumbName: names.AJsmartClassroomN
// 			}
// 		}
// 	]

/*
 *
 * 博瑞巡课
 *
 * */
export const smartClassroom = [{
  path: '/smartClassroom',
  name: 'AJsmartClassroom',
  component: AJsmartClassroom,
  meta: {
    breadcrumbName: names.AJsmartClassroomN
  },
  children: []
}]


/*
 *
 * 考勤统计
 *
 * */
export const statistics = [{
    path: '/statistics',
    name: 'AJstatistics',
    component: AJstatistics,
    meta: {
      breadcrumbName: names.AJstatisticsN
    },
    children: []
  },
  {
    path: '/diligence',
    name: 'AJdiligence',
    component: AJdiligence,
    meta: {
      breadcrumbName: names.AJdiligenceN
    },
    children: [{
      name: 'AJattendRatesee2',
      path: 'comesee',
      component: AJattendRatesee,
      meta: {
        breadcrumbName: names.AJattendRateseeN
      }
    }]
  },
]


/*
 *
 * 前台路由
 *
 * */
export const nocookieroute = [{
    path: '/',
    redirect: {
      name: 'Fhome'
    }
  },
  {
    path: '/index',
    name: 'Fhome',
    meta: {
      breadcrumbName: Fnames.FhomeN
    },
    component: Fhome
  },
  {
    path: '/Fcourse',
    name: 'Fcourse',
    meta: {
      breadcrumbName: Fnames.FcourseN
    },
    component: Fcourse
  },
  
  {
    path: '/Fcourseres',
    name: 'Fcourseres',
    meta: {
      breadcrumbName: Fnames.FcourseN
    },
    component: Fcourseres
  },
  {
    name: 'Fmicrovideo',
    path: '/Fmicrovideo',
    meta: {
      breadcrumbName: Fnames.FmicrovideoN
    },
    component: Fmicrovideo
  },
  {
    name: 'Fcourseintroduction',
    path: '/Fcourseintroduction',
    meta: {
      breadcrumbName: Fnames.FcourseintroductionN
    },
    component: Fcourseintroduction
  },
  {
    name: 'Fcoursedirectory',
    path: '/Fcoursedirectory',
    meta: {
      breadcrumbName: Fnames.FcoursedirectoryN
    },
    component: Fcoursedirectory
  },
  {
    name: 'Fcourseappraise',
    path: '/Fcourseappraise',
    meta: {
      breadcrumbName: Fnames.FcourseappraiseN
    },
    component: Fcourseappraise
  },
  {
    name: 'Fcourseannouncement',
    path: '/Fcourseannouncement',
    meta: {
      breadcrumbName: Fnames.FcourseannouncementN
    },
    component: Fcourseannouncement
  },
  {
    name: 'FcourseDetail',
    path: '/FcourseDetail',
    meta: {
      breadcrumbName: Fnames.FcourseDetailN
    },
    component: FcourseDetail,
    children: [{
        name: 'FcourseDetaildown',
        path: '/FcourseDetaildown',
        meta: {
          breadcrumbName: Fnames.FcourseDetaildownN
        },
        component: FcourseDetaildown
      },
      {
        name: 'Fcoursedetailmynotedel',
        path: '/Fcoursedetailmynotedel',
        meta: {
          breadcrumbName: Fnames.FcoursedetailmynotedelN
        },
        component: Fcoursedetailmynotedel
      },
      {
        name: 'Fcoursedetailmicrovideodel',
        path: '/Fcoursedetailmicrovideodel',
        meta: {
          breadcrumbName: Fnames.FcoursedetailmicrovideodelN
        },
        component: Fcoursedetailmicrovideodel
      },
      {
        name: 'Fcoursedetailappraiseadd',
        path: '/Fcoursedetailappraiseadd',
        meta: {
          breadcrumbName: Fnames.FcoursedetailappraiseaddN
        },
        component: Fcoursedetailappraiseadd
      },
      {
        name: 'Fcoursedetailappraiseadd1',
        path: '/Fcoursedetailappraiseadd1',
        meta: {
          breadcrumbName: Fnames.FcoursedetailappraiseaddN
        },
        component: Fcoursedetailappraiseadd1
      },
      {
        name: 'Fcoursedetailiappraiseadd',
        path: '/Fcoursedetailiappraiseadd',
        meta: {
          breadcrumbName: Fnames.FcoursedetailiappraiseaddN
        },
        component: Fcoursedetailiappraiseadd
      }
    ]
  },
  {
    name: 'Fcoursedetailmicrovideosee',
    path: '/Fcoursedetailmicrovideosee',
    meta: {
      breadcrumbName: Fnames.FcoursedetailmicrovideoseeN
    },
    component: Fcoursedetailmicrovideosee
  },
  {
    name: 'Fcoursedetailfilesee',
    path: '/Fcoursedetailfilesee',
    meta: {
      breadcrumbName: Fnames.FcoursedetailfileseeN
    },
    component: Fcoursedetailfilesee
  },
  {
    name: 'Fcoursedetailfileseepic',
    path: '/Fcoursedetailfileseepic',
    meta: {
      breadcrumbName: Fnames.FcoursedetailfileseepicN
    },
    component: Fcoursedetailfileseepic
  },
  {
    name: 'Fcoursedetailfileseeaudio',
    path: '/Fcoursedetailfileseeaudio',
    meta: {
      breadcrumbName: Fnames.FcoursedetailfileseeaudioN
    },
    component: Fcoursedetailfileseeaudio
  },
  {
    name: 'Flive',
    path: '/Flive',
    meta: {
      breadcrumbName: Fnames.FliveN
    },
    component: Flive
  },
  {
    name: 'Flivesearch',
    path: '/Flivesearch',
    meta: {
      breadcrumbName: Fnames.FlivesearchN
    },
    component: Flivesearch
  },
  {
    name: 'Fliveliving',
    path: '/Fliveliving',
    meta: {
      breadcrumbName: Fnames.FlivelivingN
    },
    component: Fliveliving
  },
  {
    name: 'Fliveunlive',
    path: '/Fliveunlive',
    meta: {
      breadcrumbName: Fnames.FliveunliveN
    },
    component: Fliveunlive
  },
  {
    name: 'Flivelived',
    path: '/Flivelived',
    meta: {
      breadcrumbName: Fnames.FlivelivedN
    },
    component: Flivelived
  },
  {
    name: 'Flivedetail',
    path: '/Flivedetail',
    meta: {
      breadcrumbName: Fnames.FlivedetailN
    },
    component: Flivedetail
  },
  {
    name: 'Fliveoverdetail',
    path: '/Fliveoverdetail',
    meta: {
      breadcrumbName: Fnames.FliveoverdetailN
    },
    component: Fliveoverdetail
  }, {
    name: 'Flivereview',
    path: '/Flivereview',
    meta: {
      breadcrumbName: Fnames.FlivereviewN
    },
    component: Flivereview,
    children: [{
      name: 'Flivedownlist',
      path: 'downlist',
      component: Flivedownlist,
      meta: {
        breadcrumbName: names.FlivedownlistN
      }
    }]
  }, {
    name: 'Fcampustv',
    path: '/Fcampustv',
    meta: {
      breadcrumbName: Fnames.FcampustvN
    },
    component: Fcampustv
  },
  {
    name: 'Fcampustvall',
    path: '/Fcampustvall',
    meta: {
      breadcrumbName: Fnames.FcampustvallN
    },
    component: Fcampustvall
  },
  {
    name: 'Fcampustvallprogram',
    path: '/Fcampustvallprogram',
    meta: {
      breadcrumbName: Fnames.FcampustvallprogramN
    },
    component: Fcampustvallprogram
  },
  {
    name: 'Fcampustvlive',
    path: '/Fcampustvlive',
    meta: {
      breadcrumbName: Fnames.FcampustvliveN
    },
    component: Fcampustvlive
  },
  {
    name: 'Fcampustvliveplay',
    path: '/Fcampustvliveplay',
    meta: {
      breadcrumbName: Fnames.FcampustvliveN
    },
    component: Fcampustvliveplay
  },
  {
    name: 'Fcampustvsee',
    path: '/Fcampustvsee',
    meta: {
      breadcrumbName: Fnames.FcampustvseeN
    },
    component: Fcampustvsee
  },
  {
    name: 'Nothing',
    path: '/Nothing',
    redirect: {
      name: 'Fhome'
    },
    meta: {
      breadcrumbName: Fnames.NothingN
    },
    component: Nothing
  },
  //微格教学
  {
    path: '/Fmicroteaching',
    name: 'Fmicroteaching',
    meta: {
      breadcrumbName: Fnames.FmicroteachingN
    },
    component: Fmicroteaching
  },

  //微格教学
  {
    path: '/Kmicroteaching',
    name: 'Fmicroteaching',
    meta: {
      breadcrumbName: Fnames.FmicroteachingN
    },
    component: Fmicroteaching
  },


  {
    path: '*',
    redirect: '/'
  }
]




/*
 *
 * 后台路由
 *
 * */
// 路由对象
export const routeobj = {
  console: [{
    path: '/console',
    name: 'AJconsole',
    component: AJconsole,
    meta: {
      breadcrumbName: names.AJconsole
    }
  }],
  user: [{
      path: '/user',
      name: 'AJuser',
      component: AJuser,
      meta: {
        breadcrumbName: names.AJuserN
      },
      children: [{
          name: 'AJuserimport',
          path: 'import',
          component: AJuserimport,
          meta: {
            breadcrumbName: names.AJuserimportN
          }
        },
        {
          name: 'AJuserbatchphoto',
          path: 'userbatchphoto',
          component: AJuserbatchphoto,
          meta: {
            breadcrumbName: names.AJuserbatchphotoN
          }
        },
        {
          name: 'AJusersinglephoto',
          path: 'usersinglephoto',
          component: AJusersinglephoto,
          meta: {
            breadcrumbName: names.AJusersinglephotoN
          }
        },
        {
          name: 'AJuserresetpass',
          path: 'resetpass',
          component: AJuserresetpass,
          meta: {
            breadcrumbName: names.AJuserresetpassN
          }
        },
        {
          name: 'AJuseradd',
          path: 'add',
          component: AJuseradd,
          meta: {
            breadcrumbName: names.AJuseraddN
          }
        },
        {
          name: 'AJuseredit',
          path: 'edit',
          component: AJuseredit,
          meta: {
            breadcrumbName: names.AJusereditN
          }
        },
        {
          name: 'AJuserdel',
          path: 'del',
          component: AJuserdel,
          meta: {
            breadcrumbName: names.AJuserdelN
          }
        }
      ]
    },
    {
      path: '/usermatch',
      name: 'AJusermatch',
      component: AJusermatch,
      meta: {
        breadcrumbName: names.AJusermatchN
      },
      children: [{
          name: 'AJusermatchadd',
          path: 'add',
          component: AJusermatchadd,
          meta: {
            breadcrumbName: names.AJusermatchadd
          }
        },
        {
          name: 'AJusermatchdel',
          path: 'del',
          component: AJusermatchdel,
          meta: {
            breadcrumbName: names.AJusermatchdel
          }
        }
      ]
    }
  ],
  workstation: [{
    path: '/workstation',
    name: 'AJworkstation',
    component: AJworkstation,
    meta: {
      //    requireauth: true
      breadcrumbName: names.AJworkstationN
    },
    children: [{
        name: 'AJworkstationadd',
        path: 'add',
        component: AJworkstationadd,
        meta: {
          breadcrumbName: names.AJworkstationaddN
        }
      },
      {
        name: 'AJworkstationedit',
        path: 'edit',
        component: AJworkstationedit,
        meta: {
          breadcrumbName: names.AJworkstationeditN
        }
      },
      {
        name: 'AJworkstationdel',
        path: 'del',
        component: AJworkstationdel,
        meta: {
          breadcrumbName: names.AJworkstationdelN
        }
      },
      {
        name: 'AJworkstationrel',
        path: 'rel',
        component: AJworkstationrel,
        meta: {
          breadcrumbName: names.AJworkstationrelN
        }
      }
    ]
  }],
  term: [{
    path: '/term',
    name: 'AJterm',
    component: AJterm,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJtermN
    },
    children: [{
        name: 'AJtermadd',
        path: 'add',
        component: AJtermadd,
        meta: {
          breadcrumbName: names.AJtermaddN
        }
      },
      {
        name: 'AJtermedit',
        path: 'edit',
        component: AJtermedit,
        meta: {
          breadcrumbName: names.AJtermeditN
        }
      },
      {
        name: 'AJtermdel',
        path: 'del',
        component: AJtermdel,
        meta: {
          breadcrumbName: names.AJtermdelN
        }
      }
    ]
  }],
  role: [{
    path: '/role',
    name: 'AJrole',
    component: AJrole,
    meta: {
      requireauth: true,
      breadcrumbName: names.AJroleN
    },
    children: [{
        name: 'AJroleadd',
        path: 'add',
        component: AJroleadd,
        meta: {
          breadcrumbName: names.AJroleaddN
        }
      },
      {
        name: 'AJroleedit',
        path: 'edit',
        component: AJroleedit,
        meta: {
          breadcrumbName: names.AJroleeditN
        }
      },
      {
        name: 'AJroledel',
        path: 'del',
        component: AJroledel,
        meta: {
          breadcrumbName: names.AJroledelN
        }
      },
      {
        path: '/power',
        name: 'AJrolepower',
        component: AJpower,
        meta: {
          breadcrumbName: names.AJpowerN
        }
      }
    ]
  }],
  college: [{
    path: '/college',
    name: 'AJcollege',
    component: AJcollege,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJcollegeN
    },
    children: [{
        name: 'AJcollegeadd',
        path: 'add',
        component: AJcollegeadd,
        meta: {
          breadcrumbName: names.AJcollegeaddN
        }
      },
      {
        name: 'AJcollegeedit',
        path: 'edit',
        component: AJcollegeedit,
        meta: {
          breadcrumbName: names.AJcollegeeditN
        }
      },
      {
        name: 'AJcollegedel',
        path: 'del',
        component: AJcollegedel,
        meta: {
          breadcrumbName: names.AJcollegedelN
        }
      }
    ]
  }],
  classnumber: [{
    path: '/classnumber',
    name: 'AJclassnumber',
    component: AJclassnumber,
    meta: {
      breadcrumbName: names.AJclassnumberN
    },
    children: [{
        name: 'AJclassnumberadd',
        path: 'add',
        component: AJclassnumberadd,
        meta: {
          breadcrumbName: names.AJclassnumberaddN
        }
      },
      {
        name: 'AJclassnumberadddetail',
        path: 'adddetail',
        component: AJclassnumberadddetail,
        meta: {
          breadcrumbName: names.AJclassnumberadddetailN
        }
      },
      {
        name: 'AJclassnumberedit',
        path: 'edit',
        component: AJclassnumberedit,
        meta: {
          breadcrumbName: names.AJclassnumbereditN
        }
      },
      {
        name: 'AJclassnumberdefault',
        path: 'default',
        component: AJclassnumberdefault,
        meta: {
          breadcrumbName: names.AJclassnumberdefaultN
        }
      },
      {
        name: 'AJclassnumberdel',
        path: 'del',
        component: AJclassnumberdel,
        meta: {
          breadcrumbName: names.AJclassnumberdelN
        }
      },
      {
        name: 'AJclassnumbereditdetail',
        path: 'editdetail',
        component: AJclassnumbereditdetail,
        meta: {
          breadcrumbName: names.AJclassnumbereditdetailN
        }
      },
      {
        name: 'AJclassnumberdeldetail',
        path: 'deldetail',
        component: AJclassnumberdeldetail,
        meta: {
          breadcrumbName: names.AJclassnumberdeldetailN
        }
      },
      {
        name: 'AJclassnumberdelalldetail',
        path: 'delalldetail',
        component: AJclassnumberdelalldetail,
        meta: {
          breadcrumbName: names.AJclassnumberdeldetailN
        }
      }
    ]
  }],
  server: [{
    path: '/server',
    name: 'AJserver',
    component: AJserver,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJserverN
    },
    children: [{
        name: 'AJserveradd',
        path: 'add',
        component: AJserveradd,
        meta: {
          breadcrumbName: names.AJserveraddN
        }
      },
      {
        name: 'AJserveredit',
        path: 'edit',
        component: AJserveredit,
        meta: {
          breadcrumbName: names.AJservereditN
        }
      },
      {
        name: 'AJserverdel',
        path: 'del',
        component: AJserverdel,
        meta: {
          breadcrumbName: names.AJserverdelN
        }
      },
      {
        name: 'AJserverrel',
        path: 'rel',
        component: AJserverrel,
        meta: {
          breadcrumbName: names.AJserverrelN
        }
      },
      {
        name: 'AJserverstorerel',
        path: 'store',
        component: AJserverstorerel,
        meta: {
          breadcrumbName: names.AJserverstorerelN
        }
      }
    ]
  }],
  log: [{
    path: '/log',
    name: 'AJlog',
    component: AJlog,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJlogN
    },
    children: [{
      name: 'AJlogdel',
      path: 'del',
      component: AJlogdel,
      meta: {
        breadcrumbName: names.AJlogdelN
      }
    }]
  }],
  store: [{
    path: '/store',
    name: 'AJstore',
    component: AJstore,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJstoreN
    },
    children: [{
        name: 'AJstoreadd',
        path: 'add',
        component: AJstoreadd,
        meta: {
          breadcrumbName: names.AJstoreaddN
        }
      },
      {
        name: 'AJstoreedit',
        path: 'edit',
        component: AJstoreedit,
        meta: {
          breadcrumbName: names.AJstoreeditN
        }
      },
      {
        name: 'AJstoredel',
        path: 'del',
        component: AJstoredel,
        meta: {
          breadcrumbName: names.AJstoredelN
        }
      }
    ]
  }],
  building: [{
    path: '/building',
    name: 'AJbuilding',
    component: AJbuilding,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJbuildingN
    },
    children: [{
        name: 'AJbuildingadd',
        path: 'add',
        component: AJbuildingadd,
        meta: {
          breadcrumbName: names.AJbuildingaddN
        }
      },
      {
        name: 'AJbuildingedit',
        path: 'edit',
        component: AJbuildingedit,
        meta: {
          breadcrumbName: names.AJbuildingeditN
        }
      },
      {
        name: 'AJbuildingdel',
        path: 'del',
        component: AJbuildingdel,
        meta: {
          breadcrumbName: names.AJbuildingdelN
        }
      },
      {
        name: 'AJbuildingadddetail',
        path: 'adddetail',
        component: AJbuildingadddetail,
        meta: {
          breadcrumbName: names.AJbuildingadddetailN
        }
      },
      {
        name: 'AJbuildingeditdetail',
        path: 'editdetail',
        component: AJbuildingeditdetail,
        meta: {
          breadcrumbName: names.AJbuildingeditdetailN
        }
      },
      {
        name: 'AJbuildingdeldetail',
        path: 'deldetail',
        component: AJbuildingdeldetail,
        meta: {
          breadcrumbName: names.AJbuildingdeldetailN
        }
      },
      {
        name: 'AJbuildingimport',
        path: 'import',
        component: AJbuildingimport
      }
    ]
  }],
  dailyrecord: [{
    path: '/dailyrecord',
    name: 'AJdailyrecord',
    component: AJdailyrecord,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJdailyrecordN
    },
    children: [{
        name: 'AJdailyrecordedit',
        path: 'edit',
        component: AJdailyrecordedit,
        meta: {
          breadcrumbName: names.AJdailyrecordeditN
        }
      },
      {
        name: 'AJdailyrecordroomadd',
        path: 'roomadd',
        component: AJdailyrecordroomadd,
        meta: {
          breadcrumbName: names.AJdailyrecordroomaddN
        }
      }
    ]
  }],
  GroupLoopManage: [{
      path: '/GroupLoopManage',
      name: 'AJGroupLoopManage',
      component: AJGroupLoopManage,
      meta: {
        breadcrumbName: names.AJGroupLoopManageN
      },
      children: [{
          name: 'AJGroupLoopManageadd',
          path: 'add',
          component: AJGroupLoopManageadd,
          meta: {
            breadcrumbName: names.AJGroupLoopManageaddN
          }
        },
        {
          name: 'AJGroupLoopManageedit',
          path: 'edit',
          component: AJGroupLoopManageedit,
          meta: {
            breadcrumbName: names.AJGroupLoopManageeditN
          }
        },
        {
          name: 'AJGroupLoopManagedel',
          path: 'del',
          component: AJGroupLoopManagedel,
          meta: {
            breadcrumbName: names.AJGroupLoopManagedelN
          }
        }
      ]
    },
    {
      path: '/GroupLoopManagerelother',
      name: 'AJGroupLoopManagerelother',
      component: AJGroupLoopManagerelother,
      meta: {
        breadcrumbName: names.AJGroupLoopManagerelotherN
      },
      children: [{
          name: 'AJGroupLoopManagerelotherpublish',
          path: 'publish',
          component: AJGroupLoopManagerelotherpublish,
          meta: {
            breadcrumbName: names.AJGroupLoopManagerelotherpublishN
          }
        },
        {
          name: 'AJGroupLoopManagerelotherunpublish',
          path: 'unpublish',
          component: AJGroupLoopManagerelotherunpublish,
          meta: {
            breadcrumbName: names.AJGroupLoopManagerelotherunpublishN
          }
        },
        {
          name: 'AJGroupLoopManagerelotherdel',
          path: 'del',
          component: AJGroupLoopManagerelotherdel,
          meta: {
            breadcrumbName: names.AJGroupLoopManagerelotherdelN
          }
        },
        {
          name: 'AJGroupLoopManagerelotheradd',
          path: 'add',
          component: AJGroupLoopManagerelotheradd,
          meta: {
            breadcrumbName: names.AJGroupLoopManagereladdN
          }
        }
      ]
    },
    {
      path: '/GroupLoopManagerelleader',
      name: 'AJGroupLoopManagerelleader',
      component: AJGroupLoopManagerelleader,
      meta: {
        breadcrumbName: names.AJGroupLoopManagerelleaderN
      },
      children: [{
          name: 'AJGroupLoopManagerelleaderpublish',
          path: 'publish',
          component: AJGroupLoopManagerelleaderpublish,
          meta: {
            breadcrumbName: names.AJGroupLoopManagerelleaderpublishN
          }
        },
        {
          name: 'AJGroupLoopManagerelleaderunpublish',
          path: 'unpublish',
          component: AJGroupLoopManagerelleaderunpublish,
          meta: {
            breadcrumbName: names.AJGroupLoopManagerelleaderunpublishN
          }
        },
        {
          name: 'AJGroupLoopManagerelleaderdel',
          path: 'del',
          component: AJGroupLoopManagerelleaderdel,
          meta: {
            breadcrumbName: names.AJGroupLoopManagerelleaderdelN
          }
        },
        {
          name: 'AJGroupLoopManagerelleaderadd',
          path: 'add',
          component: AJGroupLoopManagerelleaderadd,
          meta: {
            breadcrumbName: names.AJGroupLoopManagereladdN
          }
        }
      ]
    },
    {
      path: '/GroupLoopManagerelassistant',
      name: 'AJGroupLoopManagerelassistant',
      component: AJGroupLoopManagerelassistant,
      meta: {
        breadcrumbName: names.AJGroupLoopManagerelassistantN
      },
      children: [{
          name: 'AJGroupLoopManagerelassistantpublish',
          path: 'publish',
          component: AJGroupLoopManagerelassistantpublish,
          meta: {
            breadcrumbName: names.AJGroupLoopManagerelassistantpublishN
          }
        },
        {
          name: 'AJGroupLoopManagerelassistantunpublish',
          path: 'unpublish',
          component: AJGroupLoopManagerelassistantunpublish,
          meta: {
            breadcrumbName: names.AJGroupLoopManagerelassistantunpublishN
          }
        },
        {
          name: 'AJGroupLoopManagerelassistantdel',
          path: 'del',
          component: AJGroupLoopManagerelassistantdel,
          meta: {
            breadcrumbName: names.AJGroupLoopManagerelassistantdelN
          }
        },
        {
          name: 'AJGroupLoopManagerelassistantadd',
          path: 'add',
          component: AJGroupLoopManagerelassistantadd,
          meta: {
            breadcrumbName: names.AJGroupLoopManagereladdN
          }
        }
      ]
    }
  ],
  controlrecord: [{
    path: '/controlrecord',
    name: 'AJcontrolrecord',
    component: AJcontrolrecord,
    meta: {
      breadcrumbName: names.AJcontrolrecordN
    },
    children: [{
        name: 'AJcontrolrecordadd',
        path: 'add',
        component: AJcontrolrecordadd,
        meta: {
          breadcrumbName: names.AJcontrolrecordaddN
        }
      },
      {
        name: 'AJcontrolrecordedit',
        path: 'edit',
        component: AJcontrolrecordedit,
        meta: {
          breadcrumbName: names.AJcontrolrecordeditN
        }
      },
      {
        name: 'AJcontrolrecorddel',
        path: 'del',
        component: AJcontrolrecorddel,
        meta: {
          breadcrumbName: names.AJcontrolrecorddelN
        }
      },
      {
        name: 'AJcontrolrecordaddchannel',
        path: 'addchannel',
        component: AJcontrolrecordadddetail,
        meta: {
          breadcrumbName: names.AJcontrolrecordadddetailN
        }
      },
      {
        name: 'AJcontrolrecordeditchannel',
        path: 'editchannel',
        component: AJcontrolrecordeditdetail,
        meta: {
          breadcrumbName: names.AJcontrolrecordeditdetailN
        }
      },
      {
        name: 'AJcontrolrecorddelchannel',
        path: 'delchannel',
        component: AJcontrolrecorddeldetail,
        meta: {
          breadcrumbName: names.AJcontrolrecorddeldetailN
        }
      },
      {
        name: 'AJcontrolrecordsetchannel',
        path: 'setchannel',
        component: AJcontrolrecordsetchannel,
        meta: {
          breadcrumbName: names.AJcontrolrecordsetchannelN
        }
      },
      {
        name: 'AJcontrolrecordimport',
        path: 'import',
        component: AJcontrolrecordimport
      }
    ]
  }],
  course: [{
      path: '/course',
      name: 'AJcourse',
      component: AJcourse,
      meta: {
        breadcrumbName: names.AJcourseN
      },
      children: [{
          name: 'AJcourseimport',
          path: 'import',
          component: AJcourseimport,
          meta: {
            breadcrumbName: names.AJcourseimportN
          }
        },
        {
          name: 'AJcourseadd',
          path: 'add',
          component: AJcourseadd,
          meta: {
            breadcrumbName: names.AJcourseddN
          },
          children: [{
            name: 'AJcourselabel',
            path: 'courselabel',
            component: AJcourselabel
          }]
        },
        {
          name: 'AJcourseedit',
          path: 'edit',
          component: AJcourseedit,
          meta: {
            breadcrumbName: names.AJcourseeditN
          },
          children: [{
            name: 'AJcourselabeledit',
            path: 'courselabel',
            component: AJcourselabeledit
          }]
        },
        {
          name: 'AJcoursedel',
          path: 'del',
          component: AJcoursedel,
          meta: {
            breadcrumbName: names.AJcoursedelN
          }
        },
        {
          name: 'AJcoursedelalldetail',
          path: 'delalldetail',
          component: AJcoursedelalldetail,
          meta: {
            breadcrumbName: names.AJcoursedeldetailN
          }
        }
      ]
    },
    {
      name: 'AJcourselessonlist',
      path: '/courselessonlist',
      component: AJcourselessonlist,
      meta: {
        breadcrumbName: names.AJcourselessonlistN
      },
      children: [{
          name: 'AJcourselessonlistsee',
          path: 'seevideo',
          component: AJcoursesee,
          meta: {
            breadcrumbName: names.AJcourseseeN
          }
        },
        {
          name: 'AJcourselessonlistedit',
          path: 'editdetail',
          component: AJcourseeditdetail,
          meta: {
            breadcrumbName: names.AJcourseclasseditN
          }
        },
        {
          name: 'AJcourselessonlistdel',
          path: 'deldetail',
          component: AJcoursedeldetail,
          meta: {
            breadcrumbName: names.AJcoursedeldetailN
          }
        },
        {
          name: 'AJcourselessonlistadd',
          path: 'add',
          component: AJcourseclassadd,
          meta: {
            breadcrumbName: names.AJcourseclassaddN
          }
        }
      ]
    },
    {
      name: 'AJcourseOnlineManage',
      path: '/AJcourseOnlineManage',
      redirect: '/AJcoursemanage'
    },
    {
      name: 'AJcourseOnline',
      path: '/courseOnline',
      component: AJcourseOnline,
      meta: {
        breadcrumbName: names.AJcourseOnlineN
      },
      children: [{
          name: 'AJcourseOnlineadd',
          path: 'add',
          component: AJcourseOnlineadd,
          meta: {
            breadcrumbName: names.AJcourseOnlineaddN
          },
          children: [{
            name: 'AJcourseOnlinelabel',
            path: 'courseOnlinelabel',
            component: AJcourseOnlinelabel
          }]
        },
        {
          name: 'AJcourseOnlineedit',
          path: 'edit',
          component: AJcourseOnlineedit,
          meta: {
            breadcrumbName: names.AJcourseOnlineeditN
          },
          children: [{
            name: 'AJcourseOnlinelabeledit',
            path: 'courseOnlinelabel',
            component: AJcourseOnlinelabeledit
          }]
        },
        {
          name: 'AJcourseOnlinedel',
          path: 'del',
          component: AJcourseOnlinedel,
          meta: {
            breadcrumbName: names.AJcourseOnlinedelN
          }
        }
      ]
    }
  ],
  courseonly: [{
    path: '/course',
    name: 'AJcourse',
    component: AJcourse,
    meta: {
      breadcrumbName: names.AJcourseN
    },
    children: [{
        name: 'AJcourseimport',
        path: 'import',
        component: AJcourseimport,
        meta: {
          breadcrumbName: names.AJcourseimportN
        }
      },
      {
        name: 'AJcoursesee',
        path: 'see',
        component: AJcoursesee,
        meta: {
          breadcrumbName: names.AJcourseseeN
        }
      },
      {
        name: 'AJcourseadd',
        path: 'add',
        component: AJcourseadd,
        meta: {
          breadcrumbName: names.AJcourseddN
        },
        children: [{
          name: 'AJcourselabel',
          path: 'courselabel',
          component: AJcourselabel
        }]
      },
      {
        name: 'AJcourseedit',
        path: 'edit',
        component: AJcourseedit,
        meta: {
          breadcrumbName: names.AJcourseeditN
        },
        children: [{
          name: 'AJcourselabeledit',
          path: 'courselabel',
          component: AJcourselabeledit
        }]
      },
      {
        name: 'AJcoursedel',
        path: 'del',
        component: AJcoursedel,
        meta: {
          breadcrumbName: names.AJcoursedelN
        }
      },
      {
        name: 'AJcourseadddetail',
        path: 'adddetail',
        component: AJcourseclassadd,
        meta: {
          breadcrumbName: names.AJcourseclassaddN
        }
      },
      {
        name: 'AJcoursedeldetail',
        path: 'deldetail',
        component: AJcoursedeldetail,
        meta: {
          breadcrumbName: names.AJcoursedeldetailN
        }
      },
      {
        name: 'AJcourseeditdetail',
        path: 'editdetail',
        component: AJcourseeditdetail,
        meta: {
          breadcrumbName: names.AJcourseclasseditN
        }
      }
    ]
  }],
  courseOnlineonly: [{
      name: 'AJcourseOnlineManage',
      path: '/AJcourseOnlineManage',
      redirect: '/AJcoursemanage'
    },
    {
      name: 'AJcourse',
      path: '/course',
      redirect: '/courseOnline'
    },
    {
      name: 'AJcourseOnline',
      path: '/courseOnline',
      component: AJcourseOnline,
      meta: {
        breadcrumbName: names.AJcourseOnlineN
      },
      children: [{
          name: 'AJcourseOnlineadd',
          path: 'add',
          component: AJcourseOnlineadd,
          meta: {
            breadcrumbName: names.AJcourseOnlineaddN
          },
          children: [{
            name: 'AJcourseOnlinelabel',
            path: 'courseOnlinelabel',
            component: AJcourseOnlinelabel
          }]
        },
        {
          name: 'AJcourseOnlineedit',
          path: 'edit',
          component: AJcourseOnlineedit,
          meta: {
            breadcrumbName: names.AJcourseOnlineeditN
          },
          children: [{
            name: 'AJcourseOnlinelabeledit',
            path: 'courseOnlinelabel',
            component: AJcourseOnlinelabeledit
          }]
        },
        {
          name: 'AJcourseOnlinedel',
          path: 'del',
          component: AJcourseOnlinedel,
          meta: {
            breadcrumbName: names.AJcourseOnlinedelN
          }
        }
      ]
    }
  ],
  lesson: [{
    path: '/lesson',
    name: 'AJlesson',
    component: AJlesson,
    meta: {
      breadcrumbName: names.AJlessonN
    },
    children: [{
        name: 'AJlessonadd',
        path: 'add',
        component: AJlessonadd,
        meta: {
          breadcrumbName: names.AJlessonaddN
        }
      },
      {
        name: 'AJlessonedit',
        path: 'edit',
        component: AJlessonedit,
        meta: {
          breadcrumbName: names.AJlessoneditN
        }
      },
      {
        name: 'AJlessondel',
        path: 'del',
        component: AJlessondel,
        meta: {
          breadcrumbName: names.AJlessondelN
        }
      },
      {
        name: 'AJlessonfreeadd',
        path: 'add',
        component: AJlessonfreeadd,
        meta: {
          breadcrumbName: names.AJlessonfreeaddN
        }
      }
    ]
  }],
  resource: [{
    path: '/resource',
    name: 'AJresource',
    component: AJresource,
    meta: {
      breadcrumbName: names.AJresourceN
    },
    children: [{
        name: 'AJresourceedit',
        path: 'edit',
        component: AJresourceedit,
        meta: {
          breadcrumbName: names.AJresourceeditN
        }
      },
      {
        name: 'AJresourcedel',
        path: 'del',
        component: AJresourcedel,
        meta: {
          breadcrumbName: names.AJresourcedelN
        }
      },
      {
        name: 'AJresourcepower', // 播放
        path: 'power',
        component: AJresourcepower,
        meta: {
          breadcrumbName: names.AJresourcepowerN
        }
      },
      {
        name: 'AJresourcepublish', // 播放
        path: 'publish',
        component: AJresourcepublish,
        meta: {
          breadcrumbName: names.AJresourcepublishN
        }
      },
      {
        name: 'AJresourcedown', // 播放
        path: 'down',
        component: AJresourcedown,
        meta: {
          breadcrumbName: names.AJresourcedownN
        }
      }
    ]
  }],
  monitor: [{
    path: '/monitor',
    name: 'AJmonitor',
    component: AJmonitor,
    meta: {
      breadcrumbName: names.AJmonitorN
    },
    children: [{
      name: 'AJmonitorsee',
      path: 'servercontrolsee',
      component: AJmonitorsee,
      meta: {
        breadcrumbName: names.AJmonitorseeN
      }
    }]
  }],
  appoint: [{
      path: '/appoint',
      name: 'AJappoint',
      component: AJappoint,
      meta: {
        breadcrumbName: names.AJappointN
      },
      children: [{
          name: 'AJappointtime',
          path: 'appointtime',
          component: AJappointtime,
          meta: {
            breadcrumbName: names.AJappointtimeN
          }
        },
        {
          name: 'AJappointdetail',
          path: 'appointdetail',
          component: AJappointdetail,
          meta: {
            breadcrumbName: names.AJappointdetailN
          }
        },
        {
          name: 'AJappointanounce',
          path: 'appointanounce',
          redirect: {
            name: 'AJappointanouncer'
          }
        }
      ]
    },
    {
      name: 'AJappointuser',
      path: '/appointuser',
      component: AJappointuser,
      meta: {
        breadcrumbName: names.AJappointuserN
      },
      children: [{
          name: 'AJappointuseradd',
          path: 'appointuseradd',
          component: AJappointuseradd,
          meta: {
            breadcrumbName: names.AJappointuseraddN
          }
        },
        {
          name: 'AJappointuserdetail',
          path: 'appointuserdetail',
          component: AJappointuserdetail,
          meta: {
            breadcrumbName: names.AJappointuserdetailN
          }
        }
      ]
    },
    {
      name: 'AJappointuserHistory',
      path: '/appointuserhistory',
      component: AJappointuserHistory,
      meta: {
        breadcrumbName: names.AJappointuserHistoryN
      },
      children: [{
        name: 'AJappointuserHistoryjump', // 详情
        path: 'appointuserhistorydetail',
        component: AJappointuserHistoryjump,
        meta: {
          breadcrumbName: names.AJappointuserHistorydetailN
        }
      }]
    },
    {
      name: 'AJappointManage',
      path: '/appointManage',
      component: AJappointManage,
      meta: {
        breadcrumbName: names.AJappointManageN
      },
      children: [{
          name: 'AJappointManageadd', // 审核
          path: 'appointManageadd',
          component: AJappointManageadd,
          meta: {
            breadcrumbName: names.AJappointManageaddN
          }
        },
        {
          name: 'AJappointManageedit', // 撤销
          path: 'appointManageedit',
          component: AJappointManageedit,
          meta: {
            breadcrumbName: names.AJappointManageeditN
          }
        },
        {
          name: 'AJappointManagedel', // 详情
          path: 'appointManagedel',
          component: AJappointManagedel,
          meta: {
            breadcrumbName: names.AJappointManagedelN
          }
        }
      ]
    },
    {
      name: 'AJappointHistory',
      path: '/appointHistory',
      component: AJappointHistory,
      meta: {
        breadcrumbName: names.AJappointHistoryN
      },
      children: [{
        name: 'AJappointHistorydel', // 详情
        path: 'appointHistorydel',
        component: AJappointHistorydel,
        meta: {
          breadcrumbName: names.AJappointHistorydelN
        }
      }]
    },
    {
      name: 'AJappointanouncer',
      path: '/appointanouncer',
      component: AJappointanounce,
      meta: {
        breadcrumbName: names.AJappointanounceN
      },
      children: [{
          name: 'AJappointadd',
          path: 'AJappointadd',
          component: AJappointanounceadd,
          meta: {
            breadcrumbName: names.AJappointanounceaddN
          }
        },
        {
          name: 'AJappointedit',
          path: 'AJappointedit',
          component: AJappointanounceedit,
          meta: {
            breadcrumbName: names.AJappointanounceeditN
          }
        },
        {
          name: 'AJappointdel',
          path: 'AJappointdel',
          component: AJappointanouncedel,
          meta: {
            breadcrumbName: names.AJappointanouncedelN
          }
        }
      ]
    }
  ],
  analysis: [{
    name: 'AJanalysis',
    path: '/analysis',
    component: AJanalysis,
    meta: {
      breadcrumbName: names.AJanalysisN
    }
  }],
  controloperation: [{
      path: '/classBrand',
      name: 'ClassBrand',
      component: ClassBrand
    },
    {
      path: '/controloperation',
      name: 'AJcontroloperation',
      component: AJcontroloperation,
      meta: {
        breadcrumbName: names.AJcontroloperationN
      },
      children: [{
          name: 'AJcontroloperationadd',
          path: 'add',
          component: AJcontroloperationadd,
          meta: {
            breadcrumbName: names.AJcontroloperationaddN
          },
          children: [{
            name: 'AJcontroloperationalter',
            path: 'alert',
            component: AJcontroloperationalter,
            meta: {
              breadcrumbName: names.AJcontroloperationalterN
            }
          }]
        },
        {
          name: 'AJcontroloperationedit',
          path: 'edit',
          component: AJcontroloperationstop,
          meta: {
            breadcrumbName: names.AJcontroloperationstopN
          }
        },
        { // 巡课
          name: 'AJcontroloperationdel',
          path: 'see',
          component: AJcontroloperationsee,
          meta: {
            breadcrumbName: names.AJcontroloperationseeN
          }
        }
      ]
    }
  ],
  // intelligentterminalmonitor: [{
  // 	path: '/intelligentterminalmonitor',
  // 	name: 'AJintelligentterminalmonitor',
  // 	component: AJintelligentterminalmonitor
  // }],
  attendRate: [{
    path: '/attendRate',
    name: 'AJattendRate',
    component: AJattendRate,
    meta: {
      breadcrumbName: names.AJattendRateN
    },
    children: [{
      name: 'AJattendRatesee',
      path: 'comesee',
      component: AJattendRatesee,
      meta: {
        breadcrumbName: names.AJattendRateseeN
      }
    }]
  }],
  dailyoperation: [{
    path: '/dailyoperation',
    name: 'AJdailyoperation',
    component: AJdailyoperation,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJdailyoperationN
    }
  }],
  portal: [{
    path: '/portal',
    name: 'AJportal',
    component: AJportal,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJportalN
    }
  }],
  announce: [{
    path: '/announce',
    name: 'AJannounce',
    component: AJannounce,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJannounceN
    },
    children: [{
        name: 'AJannounceedit',
        path: 'edit',
        component: AJannounceedit,
        meta: {
          breadcrumbName: names.AJannounceeditN
        }
      },
      {
        name: 'AJannounceadd',
        path: 'add',
        component: AJannounceadd,
        meta: {
          breadcrumbName: names.AJannounceaddN
        }
      },
      {
        name: 'AJannouncedel',
        path: 'del',
        component: AJannouncedel,
        meta: {
          breadcrumbName: names.AJannouncedelN
        }
      }
    ]
  }],
  subject: [{
    path: '/subject',
    name: 'AJsubject',
    component: AJsubject,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJsubjectN
    },
    children: [{
        name: 'AJsubjectadd',
        path: 'add',
        component: AJsubjectadd,
        meta: {
          breadcrumbName: names.AJsubjectaddN
        }
      },
      {
        name: 'AJsubjectedit',
        path: 'edit',
        component: AJsubjectedit,
        meta: {
          breadcrumbName: names.AJsubjecteditN
        }
      },
      {
        name: 'AJsubjectdel',
        path: 'del',
        component: AJsubjectdel,
        meta: {
          breadcrumbName: names.AJsubjectdelN
        }
      }
    ]
  }],
  studySection: [{
    path: '/studySection',
    name: 'AJstudySection',
    component: AJstudySection,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJstudySectionN
    },
    children: [{
        name: 'AJstudySectionadd',
        path: 'add',
        component: AJstudySectionadd,
        meta: {
          breadcrumbName: names.AJstudySectionaddN
        }
      },
      {
        name: 'AJstudySectionedit',
        path: 'edit',
        component: AJstudySectionedit,
        meta: {
          breadcrumbName: names.AJstudySectioneditN
        }
      },
      {
        name: 'AJstudySectiondel',
        path: 'del',
        component: AJstudySectiondel,
        meta: {
          breadcrumbName: names.AJstudySectiondelN
        }
      },
      {
        name: 'AJstudySectionrel',
        path: 'rel',
        component: AJstudySectionrel,
        meta: {
          breadcrumbName: names.AJstudySectionrelN
        }
      }
    ]
  }],
  evaluateTemplate: [{
      path: '/evaluateTemplate',
      name: 'AJevaluateTemplate',
      component: AJevaluateTemplate,
      meta: {
        breadcrumbName: names.AJevaluateTemplateN
      },
      children: [{
          name: 'AJevaluateTemplateadd',
          path: 'add',
          component: AJevaluateTemplateadd,
          meta: {
            breadcrumbName: names.AJevaluateTemplateaddN
          }
        },
        {
          name: 'AJevaluateTemplateedit',
          path: 'edit',
          component: AJevaluateTemplateedit,
          meta: {
            breadcrumbName: names.AJevaluateTemplateeditN
          }
        },
        {
          name: 'AJevaluateTemplatedel',
          path: 'del',
          component: AJevaluateTemplatedel,
          meta: {
            breadcrumbName: names.AJevaluateTemplatedelN
          }
        },
        {
          name: 'AJevaluateTemplatepublish',
          path: 'AJevaluateTemplatepublish',
          component: AJevaluateTemplatepublish,
          meta: {
            breadcrumbName: names.AJevaluateTemplatepublishN
          }
        },
        {
          name: 'AJevaluateTemplateunpublish',
          path: 'AJevaluateTemplateunpublish',
          component: AJevaluateTemplateunpublish,
          meta: {
            breadcrumbName: names.AJevaluateTemplateunpublishN
          }
        }
      ]
    },
    {
      path: '/settemplate',
      name: 'AJevaluateTemplatesettemplate',
      component: AJevaluateTemplatesettemplate,
      meta: {
        breadcrumbName: names.AJevaluateTemplatesettemplateN
      },
      children: [{
          name: 'AJevaluateTemplatesettemplateadd',
          path: 'settemplateadd',
          component: AJevaluateTemplatesettemplateadd,
          meta: {
            breadcrumbName: names.AJevaluateTemplatesettemplateaddN
          }
        },
        {
          name: 'AJevaluateTemplatesettemplateedit',
          path: 'settemplateedit',
          component: AJevaluateTemplatesettemplateedit,
          meta: {
            breadcrumbName: names.AJevaluateTemplatesettemplateeditN
          }
        },
        {
          name: 'AJevaluateTemplatesettemplatedel',
          path: 'settemplatedel',
          component: AJevaluateTemplatesettemplatedel,
          meta: {
            breadcrumbName: names.AJevaluateTemplatesettemplatedelN
          }
        },
        {
          name: 'AJevaluateTemplatesettemplatecontentadd',
          path: 'settemplatecontentadd',
          component: AJevaluateTemplatesettemplatecontentadd,
          meta: {
            breadcrumbName: names.AJevaluateTemplatesettemplatecontentaddN
          }
        },
        {
          name: 'AJevaluateTemplatesettemplatecontentedit',
          path: 'settemplatecontentedit',
          component: AJevaluateTemplatesettemplatecontentedit,
          meta: {
            breadcrumbName: names.AJevaluateTemplatesettemplatecontenteditN
          }
        },
        {
          name: 'AJevaluateTemplatesettemplatecontentdel',
          path: 'settemplatecontentdel',
          component: AJevaluateTemplatesettemplatecontentdel,
          meta: {
            breadcrumbName: names.AJevaluateTemplatesettemplatecontentdelN
          }
        }
      ]
    },
    {
      path: '/evaluateTemplateloop',
      name: 'AJevaluateTemplateloop',
      component: AJevaluateTemplateloop,
      meta: {
        breadcrumbName: names.AJevaluateTemplateloopN
      },
      children: [{
          name: 'AJevaluateTemplateloopadd',
          path: 'add',
          component: AJevaluateTemplateloopadd,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopaddN
          }
        },
        {
          name: 'AJevaluateTemplateloopedit',
          path: 'edit',
          component: AJevaluateTemplateloopedit,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopeditN
          }
        },
        {
          name: 'AJevaluateTemplateloopdel',
          path: 'del',
          component: AJevaluateTemplateloopdel,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopdelN
          }
        },
        {
          name: 'AJevaluateTemplatelooppublish',
          path: 'AJevaluateTemplatelooppublish',
          component: AJevaluateTemplatelooppublish,
          meta: {
            breadcrumbName: names.AJevaluateTemplatelooppublishN
          }
        },
        {
          name: 'AJevaluateTemplateloopunpublish',
          path: 'AJevaluateTemplateloopunpublish',
          component: AJevaluateTemplateloopunpublish,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopunpublishN
          }
        }
      ]
    },
    {
      path: '/evaluateTemplateloopsettemplateresee',
      name: 'AJevaluateTemplateloopsettemplateresee',
      component: AJevaluateTemplateloopsettemplateresee,
      meta: {
        breadcrumbName: names.AJevaluateTemplateloopsettemplatereseeN
      }
    },
    {
      path: '/evaluateTemplateloopsettemplate',
      name: 'AJevaluateTemplateloopsettemplate',
      component: AJevaluateTemplateloopsettemplate,
      meta: {
        breadcrumbName: names.AJevaluateTemplateloopsettemplateN
      },
      children: [{
          path: 'loopsettemplatedel',
          name: 'AJevaluateTemplateloopsettemplatedel',
          component: AJevaluateTemplateloopsettemplatedel,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplatedelN
          }
        },
        {
          path: 'loopsettemplateradioadd',
          name: 'AJevaluateTemplateloopsettemplateRadioadd',
          component: AJevaluateTemplateloopsettemplateRadioadd,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplateRadioaddN
          }
        },
        {
          path: 'loopsettemplateradioedit',
          name: 'AJevaluateTemplateloopsettemplateRadioedit',
          component: AJevaluateTemplateloopsettemplateRadioedit,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplateRadioeditN
          }
        },
        {
          path: 'loopsettemplatecheckadd',
          name: 'AJevaluateTemplateloopsettemplateCheckadd',
          component: AJevaluateTemplateloopsettemplateCheckadd,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplateCheckaddN
          }
        },
        {
          path: 'loopsettemplatecheckedit',
          name: 'AJevaluateTemplateloopsettemplateCheckedit',
          component: AJevaluateTemplateloopsettemplateCheckedit,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplateCheckeditN
          }
        },
        {
          path: 'loopsettemplatescoleadd',
          name: 'AJevaluateTemplateloopsettemplateScoleadd',
          component: AJevaluateTemplateloopsettemplateScoleadd,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplateScoleaddN
          }
        },
        {
          path: 'loopsettemplatescoleedit',
          name: 'AJevaluateTemplateloopsettemplateScoleedit',
          component: AJevaluateTemplateloopsettemplateScoleedit,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplateScoleeditN
          }
        },
        {
          path: 'loopsettemplatecountadd',
          name: 'AJevaluateTemplateloopsettemplateCountadd',
          component: AJevaluateTemplateloopsettemplateCountadd,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplateCountaddN
          }
        },
        {
          path: 'loopsettemplatecountedit',
          name: 'AJevaluateTemplateloopsettemplateCountedit',
          component: AJevaluateTemplateloopsettemplateCountedit,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplateCounteditN
          }
        },
        {
          path: 'loopsettemplatequestionadd',
          name: 'AJevaluateTemplateloopsettemplateQuestionadd',
          component: AJevaluateTemplateloopsettemplateQuestionadd,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplateQuestionaddN
          }
        },
        {
          path: 'loopsettemplatequestionedit',
          name: 'AJevaluateTemplateloopsettemplateQuestionedit',
          component: AJevaluateTemplateloopsettemplateQuestionedit,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplateQuestioneditN
          }
        }
      ]
    }
  ],

  // review: [{
  //   path: '/Flivereview',
  //   name: 'livereview',
  //   component: Flivereview,
  //   meta: {
  //     breadcrumbName: names.FlivereviewN
  //   },
  //   children: [{
  //     name: 'Flivedownlist',
  //     path: 'downlist',
  //     component: Flivedownlist,
  //     meta: {
  //       breadcrumbName: names.FlivedownlistN
  //     }
  //   }]
  // }],

  live: [{
      path: '/live',
      name: 'AJlive',
      component: AJlive,
      meta: {
        breadcrumbName: names.AJliveN
      },
      children: [{
          name: 'AJlivepower',
          path: 'power',
          component: AJlivepower,
          meta: {
            breadcrumbName: names.AJlivepowerN
          }
        }, {
          name: 'AJlivedel',
          path: 'del',
          component: AJlivedel,
          meta: {
            breadcrumbName: names.AJlivedelN
          }
        },
        {
          name: 'AJlivedownlist',
          path: 'down',
          component: AJlivedownlist,
          meta: {
            breadcrumbName: names.AJlivedownlistN
          }
        },
        {
          name: 'AJlivesee',
          path: 'see',
          component: AJlivesee,
          meta: {
            breadcrumbName: names.AJliveseeN
          }
        },
        {
          name: 'AJlivestoplive',
          path: 'stop',
          component: AJlivestoplive,
          meta: {
            breadcrumbName: names.AJlivestopN
          }
        },
        {
          name: 'AJliverelease',
          path: 'release',
          component: AJliverelease,
          meta: {
            breadcrumbName: names.AJlivereleaseN
          }
        }

      ]
    },
    {
      name: 'AJliveedit',
      path: '/livemanageedit',
      component: AJliveedit,
      meta: {
        breadcrumbName: names.AJliveeditN
      },
      children: [{
          name: 'AJliveeditbasicupload',
          path: 'AJliveeditbasicupload',
          component: AJliveeditbasicupload,
          meta: {
            breadcrumbName: names.AJlivebasicuploadN
          }
        },
        {
          name: 'AJliveeditmaster',
          path: 'AJlivemaster',
          component: AJliveeditmaster,
          meta: {
            breadcrumbName: names.AJlivemasterN
          }
        }
      ]
    },
    {
      path: '/livemanageadd',
      name: 'AJliveadd',
      component: AJliveadd,
      meta: {
        breadcrumbName: names.AJliveaddN
      },
      children: [{
          name: 'AJlivebasicupload',
          path: 'AJlivebasicupload',
          component: AJlivebasicupload,
          meta: {
            breadcrumbName: names.AJlivebasicuploadN
          }
        },
        {
          name: 'AJlivemaster',
          path: 'AJlivemaster',
          component: AJlivemaster,
          meta: {
            breadcrumbName: names.AJlivemasterN
          }
        }
      ]
    }
  ],
  label: [{
    path: '/label',
    name: 'AJlabel',
    component: AJlabel,
    meta: {
      breadcrumbName: names.AJlabelN
    },
    children: [{
        name: 'AJlabeladd',
        path: 'add',
        component: AJlabeladd,
        meta: {
          breadcrumbName: names.AJlabeladdN
        }
      },
      {
        name: 'AJlabeledit',
        path: 'edit',
        component: AJlabeledit,
        meta: {
          breadcrumbName: names.AJlabeleditN
        }
      },
      {
        name: 'AJlabeldel',
        path: 'del',
        component: AJlabeldel,
        meta: {
          breadcrumbName: names.AJlabeldelN
        }
      },
      {
        name: 'AJlabelcontentadd',
        path: 'contentadd',
        component: AJlabelcontentadd,
        meta: {
          breadcrumbName: names.AJlabelcontentaddN
        }
      },
      {
        name: 'AJlabelcontentedit',
        path: 'contentedit',
        component: AJlabelcontentedit,
        meta: {
          breadcrumbName: names.AJlabelcontenteditN
        }
      },
      {
        name: 'AJlabelcontentdel',
        path: 'contentdel',
        component: AJlabelcontentdel,
        meta: {
          breadcrumbName: names.AJlabelcontentdelN
        }
      }
    ]
  }],
  module: [{
    path: '/module',
    name: 'AJmodule',
    component: AJmodule,
    meta: {
      breadcrumbName: names.AJmoduleN
    },
    children: [{
      name: 'AJmoduleedit',
      path: 'edit',
      component: AJmoduleedit,
      meta: {
        breadcrumbName: names.AJmoduleeditN
      }
    }]
  }],
  curriculum: [{
    path: '/curriculum',
    name: 'AJcurriculum',
    component: AJcurriculum,
    meta: {
      breadcrumbName: names.AJcurriculumN
    },
    children: [{
        name: 'AJcurriculumimport',
        path: 'AJcurriculumimport',
        component: AJcurriculumimport,
        meta: {
          breadcrumbName: names.AJcurriculumimportN
        }
      },
      {
        name: 'AJcurriculumdel',
        path: 'AJcurriculumdel',
        component: AJcurriculumdel,
        meta: {
          breadcrumbName: names.AJcurriculumdelN
        }
      }
    ]
  }],
  tool: [{
      name: 'AJtool',
      path: '/tool',
      component: AJtool,
      meta: {
        breadcrumbName: names.AJtoolN
      }
    },
    {
      name: 'AJtoolseetranscode',
      path: '/AJtoolseetranscode',
      component: AJtoolseetranscode,
      meta: {
        breadcrumbName: names.AJtoolseetranscodeN
      }
    },
    {
      name: 'AJtoolseetranscoded',
      path: '/AJtoolseetranscoded',
      component: AJtoolseetranscoded,
      meta: {
        breadcrumbName: names.AJtoolseetranscodedN
      },
      children: [{
          name: 'AJtoolsee',
          path: '/see',
          component: AJtoolsee,
          meta: {
            breadcrumbName: names.AJtoolseeN
          }
        },
        {
          name: 'AJtooldel',
          path: '/del',
          component: AJtooldel,
          meta: {
            breadcrumbName: names.AJtooldelN
          }
        }
      ]
    }
  ],
  organization: [{
    path: '/organization',
    name: 'AJorganization',
    component: AJorganization,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJorganizationN
    },
    children: [{
        name: 'AJorganizationadd',
        path: 'add',
        component: AJorganizationadd,
        meta: {
          breadcrumbName: names.AJorganizationaddN
        }
      },
      {
        name: 'AJorganizationedit',
        path: 'edit',
        component: AJorganizationedit,
        meta: {
          breadcrumbName: names.AJorganizationeditN
        }
      },
      {
        name: 'AJorganizationdel',
        path: 'del',
        component: AJorganizationdel,
        meta: {
          breadcrumbName: names.AJorganizationdelN
        }
      }
    ]
  }],

  //学科管理
  highteaching: [{
    path: '/highteaching',
    name: 'AJhighteaching',
    component: AJhighteaching,
    meta: {
      breadcrumbName: names.AJhighteachingN
    }
  }],


  major: [{
    path: '/major',
    name: 'AJmajor',
    component: AJmajor,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJmajorN
    },
    children: [{
        name: 'AJmajoradd',
        path: 'add',
        component: AJmajoradd,
        meta: {
          breadcrumbName: names.AJmajoraddN
        }
      },
      {
        name: 'AJmajoredit',
        path: 'edit',
        component: AJmajoredit,
        meta: {
          breadcrumbName: names.AJmajoreditN
        }
      },
      {
        name: 'AJmajordel',
        path: 'del',
        component: AJmajordel,
        meta: {
          breadcrumbName: names.AJmajordelN
        }
      }
    ]
  }],
  duty: [{
    path: '/duty',
    name: 'AJduty',
    component: AJduty,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJdutyN
    },
    children: [{
        name: 'AJdutyadd',
        path: 'add',
        component: AJdutyadd,
        meta: {
          breadcrumbName: names.AJdutyaddN
        }
      },
      {
        name: 'AJdutyedit',
        path: 'edit',
        component: AJdutyedit,
        meta: {
          breadcrumbName: names.AJdutyeditN
        }
      },
      {
        name: 'AJdutydel',
        path: 'del',
        component: AJdutydel,
        meta: {
          breadcrumbName: names.AJdutydelN
        }
      }
    ]
  }],
  banner: [{
    path: '/banner',
    name: 'AJbanner',
    component: AJbanner,
    meta: {
      //      requireauth: true
      breadcrumbName: names.AJbannerN
    },
    children: [{
        name: 'AJbanneradd',
        path: 'add',
        component: AJbanneradd,
        meta: {
          breadcrumbName: names.AJbanneraddN
        }
      },
      {
        name: 'AJbanneredit',
        path: 'edit',
        component: AJbanneredit,
        meta: {
          breadcrumbName: names.AJbannereditN
        }
      },
      {
        name: 'AJbannerdel',
        path: 'del',
        component: AJbannerdel,
        meta: {
          breadcrumbName: names.AJbannerdelN
        }
      },
      {
        name: 'AJbannerpublish',
        path: 'publish',
        component: AJbannerpublish,
        meta: {
          breadcrumbName: names.AJbannerpublishN
        }
      },
      {
        name: 'AJbannerunpublish',
        path: 'unpublish',
        component: AJbannerunpublish,
        meta: {
          breadcrumbName: names.AJbannerunpublishN
        }
      }
    ]
  }],
  rankmanage: [{
    path: '/rankmanage',
    name: 'AJrankmanage',
    component: AJrankmanage,
    meta: {
      breadcrumbName: names.AJrankmanageN
    },
    children: [{
      name: 'AJrankmanageedit',
      path: 'edit',
      component: AJrankmanageedit,
      meta: {
        breadcrumbName: names.AJrankmanageeditN
      }
    }]
  }],
  campusTVchannel: [{
    path: '/campusTVchannel',
    name: 'AJcampusTVchannel',
    component: AJcampusTVchannel,
    meta: {
      breadcrumbName: names.AJcampusTVchannelN
    },
    children: [{
        path: 'campusTVchanneladd',
        name: 'AJcampusTVchanneladd',
        component: AJcampusTVchanneladd,
        meta: {
          breadcrumbName: names.AJcampusTVchanneladdN
        }
      },
      {
        path: 'campusTVchanneledit',
        name: 'AJcampusTVchanneledit',
        component: AJcampusTVchanneledit,
        meta: {
          breadcrumbName: names.AJcampusTVchanneleditN
        }
      },
      {
        path: 'campusTVchanneldel',
        name: 'AJcampusTVchanneldel',
        component: AJcampusTVchanneldel,
        meta: {
          breadcrumbName: names.AJcampusTVchanneldelN
        }
      }
    ]
  }],
  campusTVlist: [{
      path: '/Fcampustvlive',
      name: 'AJcampusTVlistliving',
      component: Fcampustvlive
    },
    {
      path: '/campusTVlist',
      name: 'AJcampusTVlist',
      component: AJcampusTVlist,
      meta: {
        breadcrumbName: names.AJcampusTVlistN
      },
      children: [{
          path: 'campusTVlistadd',
          name: 'AJcampusTVlistadd',
          component: AJcampusTVlistadd,
          meta: {
            breadcrumbName: names.AJcampusTVlistaddN
          },
          children: [{
            path: 'campusTVlistaddbasicupload',
            name: 'AJcampusTVlistaddbasicupload',
            component: AJcampusTVlistaddbasicupload,
            meta: {
              breadcrumbName: names.AJcampusTVlistaddbasicuploadN
            }
          }]
        },
        {
          path: 'campusTVlistedit',
          name: 'AJcampusTVlistedit',
          component: AJcampusTVlistedit,
          meta: {
            breadcrumbName: names.AJcampusTVlisteditN
          },
          children: [{
            path: 'campusTVlisteditbasicupload',
            name: 'AJcampusTVlisteditbasicupload',
            component: AJcampusTVlisteditbasicupload,
            meta: {
              breadcrumbName: names.AJcampusTVlisteditbasicuploadN
            }
          }]
        },
        {
          path: 'campusTVlistpublish',
          name: 'AJcampusTVlistpublish',
          component: AJcampusTVlistpublish,
          meta: {
            breadcrumbName: names.AJcampusTVlistpublishN
          }
        },
        {
          path: 'campusTVlistunpublish',
          name: 'AJcampusTVlistunpublish',
          component: AJcampusTVlistunpublish,
          meta: {
            breadcrumbName: names.AJcampusTVlistunpublishN
          }
        },
        {
          path: 'campusTVlistdel',
          name: 'AJcampusTVlistdel',
          component: AJcampusTVlistdel,
          meta: {
            breadcrumbName: names.AJcampusTVlistdelN
          }
        },
        {
          path: 'campusTVlistcopy',
          name: 'AJcampusTVlistcopy',
          component: AJcampusTVlistcopy,
          meta: {
            breadcrumbName: names.AJcampusTVlistcopyN
          }
        }
      ]
    }
  ],
  administrativeclass: [{
      path: '/administrativeclass',
      name: 'AJadministrativeclass',
      component: AJadministrativeclass,
      meta: {
        breadcrumbName: names.AJadministrativeclassN
      },
      children: [{
          path: 'add',
          name: 'AJadministrativeclassadd',
          component: AJadministrativeclassadd,
          meta: {
            breadcrumbName: names.AJadministrativeclassaddN
          }
        },
        {
          path: 'edit',
          name: 'AJadministrativeclassedit',
          component: AJadministrativeclassedit,
          meta: {
            breadcrumbName: names.AJadministrativeclasseditN
          }
        },
        {
          path: 'del',
          name: 'AJadministrativeclassdel',
          component: AJadministrativeclassdel,
          meta: {
            breadcrumbName: names.AJadministrativeclassdelN
          }
        },
        {
          path: 'rel',
          name: 'AJadministrativeclassrel',
          component: AJadministrativeclassrel,
          meta: {
            breadcrumbName: names.AJadministrativeclassrelN
          }
        }
      ]
    },
    {
      path: '/administrativeclassstlist',
      name: 'AJadministrativeclassstlist',
      component: AJadministrativeclassstlist,
      meta: {
        breadcrumbName: names.AJadministrativeclassstlistN
      },
      children: [{
          path: 'add',
          name: 'AJadministrativeclassstlistadd',
          component: AJadministrativeclassstlistadd,
          meta: {
            breadcrumbName: names.AJadministrativeclassstlistaddN
          }
        },
        {
          path: 'del',
          name: 'AJadministrativeclassstlistdel',
          component: AJadministrativeclassstlistdel,
          meta: {
            breadcrumbName: names.AJadministrativeclassstlistdelN
          }
        }
      ]
    }
  ],
  // 重复的路由
  teachclass: [{
      path: '/teachclass',
      name: 'AJteachclass',
      component: AJteachclass,
      meta: {
        breadcrumbName: names.AJteachclassN
      },
      children: [{
        name: 'AJteachclassimport',
        path: 'import',
        component: AJteachclassimport
      }]
    },
    {
      path: '/teachclassstlist',
      name: 'AJteachclassstlist',
      component: AJteachclassstlist,
      meta: {
        breadcrumbName: names.AJteachclassstlistN
      },
      children: [{
          path: 'add',
          name: 'AJteachclassstlistadd',
          component: AJteachclassstlistadd,
          meta: {
            breadcrumbName: names.AJteachclassstlistaddN
          }
        },
        {
          path: 'del',
          name: 'AJteachclassstlistdel',
          component: AJteachclassstlistdel,
          meta: {
            breadcrumbName: names.AJteachclassstlistdelN
          }
        }
      ]
    }
  ],


  intelligentterminal: [{
    path: '/intelligentterminal',
    name: 'AJintelligentterminal',
    component: AJintelligentterminal,
    meta: {
      breadcrumbName: names.AJintelligentterminalN
    },
    children: [{
        path: 'edit',
        name: 'AJintelligentterminaledit',
        component: AJintelligentterminaledit,
        meta: {
          breadcrumbName: names.AJintelligentterminaleditN
        }
      },
      {
        name: 'AJintelligentterminaladd',
        path: 'add',
        component: AJintelligentterminaladd,
        meta: {
          breadcrumbName: names.AJintelligentterminaladdN
        }
      },
      {
        name: 'AJintelligentterminaldel',
        path: 'del',
        component: AJintelligentterminaldel,
        meta: {
          breadcrumbName: names.AJintelligentterminaldelN
        }
      }
    ]
  }],
  logManagement: [{
    name: 'AJlogManage',
    path: '/logManage',
    component: AJlogManage,
    meta: {
      breadcrumbName: names.AJlogManage
    }
  }],

  // userLibraryMatch: [{
  //       path: '/userLibraryMatch',
  //       name: 'AJuserLibraryMatch',
  //       component: AJuserLibraryMatch,
  //       meta: {
  //         breadcrumbName: names.AJuserLibrary
  //       }
  // }],

  userLibrary: [{
    name: 'AJuserLibraryIndex',
    path: '/userLibrary',
    component: AJuserLibraryIndex,
    children: [
      {
        path: '/',
        name: 'AJuserLibrary',
        component: AJuserLibrary,
        meta: {
          breadcrumbName: names.AJuserLibrary
        }
      },
      {
        path: 'userLibraryMatch',
        name: 'AJuserLibraryMatch',
        component: AJuserLibraryMatch
      }
    ]
  }],




  classmanage: [{
      path: '/classmanage',
      name: 'AJclassmanage',

      component: AJadministrativeclass,
      meta: {
        breadcrumbName: names.AJadministrativeclassN
      },
      children: [{
          path: 'add',
          name: 'AJadministrativeclassadd',
          component: AJadministrativeclassadd,
          meta: {
            breadcrumbName: names.AJadministrativeclassaddN
          }
        },
        {
          path: 'edit',
          name: 'AJadministrativeclassedit',
          component: AJadministrativeclassedit,
          meta: {
            breadcrumbName: names.AJadministrativeclasseditN
          }
        },
        {
          path: 'del',
          name: 'AJadministrativeclassdel',
          component: AJadministrativeclassdel,
          meta: {
            breadcrumbName: names.AJadministrativeclassdelN
          }
        },
        {
          path: 'rel',
          name: 'AJadministrativeclassrel',
          component: AJadministrativeclassrel,
          meta: {
            breadcrumbName: names.AJadministrativeclassrelN
          }
        }
      ]
    },
    {
      path: '/administrativeclassstlist',
      name: 'AJadministrativeclassstlist',
      component: AJadministrativeclassstlist,
      meta: {
        breadcrumbName: names.AJadministrativeclassstlistN
      },
      children: [{
          path: 'add',
          name: 'AJadministrativeclassstlistadd',
          component: AJadministrativeclassstlistadd,
          meta: {
            breadcrumbName: names.AJadministrativeclassstlistaddN
          }
        },
        {
          path: 'del',
          name: 'AJadministrativeclassstlistdel',
          component: AJadministrativeclassstlistdel,
          meta: {
            breadcrumbName: names.AJadministrativeclassstlistdelN
          }
        }
      ]
    },
    {
      path: '/teachclass',
      name: 'AJteachclass',
      component: AJteachclass,
      meta: {
        breadcrumbName: names.AJteachclassN
      },
      children: [{
        name: 'AJteachclassimport',
        path: 'import',
        component: AJteachclassimport
      }]
    },
    {
      path: '/teachclassstlist',
      name: 'AJteachclassstlist',
      component: AJteachclassstlist,
      meta: {
        breadcrumbName: names.AJteachclassstlistN
      },
      children: [{
          path: 'add',
          name: 'AJteachclassstlistadd',
          component: AJteachclassstlistadd,
          meta: {
            breadcrumbName: names.AJteachclassstlistaddN
          }
        },
        {
          path: 'del',
          name: 'AJteachclassstlistdel',
          component: AJteachclassstlistdel,
          meta: {
            breadcrumbName: names.AJteachclassstlistdelN
          }
        }
      ]
    }
  ]
}

// 课程管理路由
export const coursemanageobj = {
  coursemanageobj: [{
      path: '/AJcourseManage',
      name: 'AJcourseManage',
      component: AJcourseManage,
      meta: {
        breadcrumbName: names.AJcourseManageN
      },
      children: [{
        name: 'AJcourseManagebasicupload',
        path: 'basicupload',
        component: AJcourseManagebasicupload,
        meta: {
          breadcrumbName: names.AJcourseManagebasicuploadN
        }
      }]
    },
    {
      path: '/AJcourseManagenotice',
      name: 'AJcourseManagenotice',
      component: AJcourseManagenotice,
      meta: {
        breadcrumbName: names.AJcourseManagenoticeN
      },
      children: [{
          name: 'AJcourseManagenoticeadd',
          path: 'noticeadd',
          component: AJcourseManagenoticeadd,
          meta: {
            breadcrumbName: names.AJcourseManagenoticeaddN
          }
        },
        {
          name: 'AJcourseManagenoticeedit',
          path: 'noticeedit',
          component: AJcourseManagenoticeedit,
          meta: {
            breadcrumbName: names.AJcourseManagenoticeeditN
          }
        },
        {
          name: 'AJcourseManagenoticedel',
          path: 'noticedel',
          component: AJcourseManagenoticedel,
          meta: {
            breadcrumbName: names.AJcourseManagenoticedelN
          }
        }
      ]
    },
    {
      name: 'AJcourseManagesynopsis',
      path: '/AJcourseManagesynopsis',
      component: AJcourseManagesynopsis,
      meta: {
        breadcrumbName: names.AJcourseManagesynopsisN
      },
      children: [{
        name: 'AJcourseManagesynopsisdel',
        path: 'del',
        component: AJcourseManagesynopsisdel,
        meta: {
          breadcrumbName: names.AJcourseManagesynopsisdelN
        }
      }]
    },
    {
      name: 'AJcourseManagechampter',
      path: '/AJcourseManagechampter',
      component: AJcourseManagechampter,
      meta: {
        breadcrumbName: names.AJcourseManagechampterN
      },
      children: [{
          name: 'AJcourseManagechampteradd',
          path: 'champteradd',
          component: AJcourseManagechampteradd,
          meta: {
            breadcrumbName: names.AJcourseManagechampteraddN
          }
        },
        {
          name: 'AJcourseManagechampteredit',
          path: 'champteredit',
          component: AJcourseManagechampteredit,
          meta: {
            breadcrumbName: names.AJcourseManagechamptereditN
          }
        },
        {
          name: 'AJcourseManagechampterdel',
          path: 'champterdel',
          component: AJcourseManagechampterdel,
          meta: {
            breadcrumbName: names.AJcourseManagechampterdelN
          }
        },
        {
          name: 'AJcourseManagechampterrespublish',
          path: 'champterrespublish',
          component: AJcourseManagechampterrespublish,
          meta: {
            breadcrumbName: names.AJcourseManagechampterrespublishN
          }
        },
        {
          name: 'AJcourseManagechampterresunpublish',
          path: 'champterresunpublish',
          component: AJcourseManagechampterresunpublish,
          meta: {
            breadcrumbName: names.AJcourseManagechampterresunpublishN
          }
        },
        {
          name: 'AJcourseManagechampterresdel',
          path: 'champterresdel',
          component: AJcourseManagechampterresdel,
          meta: {
            breadcrumbName: names.AJcourseManagechampterresdelN
          }
        },
        {
          name: 'AJcourseManagechampterresadd',
          path: 'champterresadd',
          component: AJcourseManagechampterresadd,
          meta: {
            breadcrumbName: names.AJcourseManagechampterresaddN
          }
        }
      ]
    },
    {
      name: 'AJcourseManageres',
      path: '/AJcourseManageres',
      component: AJcourseManageres,
      meta: {
        breadcrumbName: names.AJcourseManageresN
      },
      children: [{
          name: 'AJcourseManageresadd',
          path: 'AJcourseManageresadd',
          component: AJcourseManageresadd,
          meta: {
            breadcrumbName: names.AJcourseManageresaddN
          }
        },
        {
          name: 'AJcourseManageresdel',
          path: 'AJcourseManageresdel',
          component: AJcourseManageresdel,
          meta: {
            breadcrumbName: names.AJcourseManageresdelN
          }
        },
        {
          name: 'AJcourseManageressee',
          path: 'AJcourseManageressee',
          component: AJcourseManageressee,
          meta: {
            breadcrumbName: names.AJcourseManageresseeN
          }
        },
        {
          name: 'AJcourseManageresseepic',
          path: 'AJcourseManageresseepic',
          component: AJcourseManageresseepic,
          meta: {
            breadcrumbName: names.AJcourseManageresseepicN
          }
        },
        {
          name: 'AJcourseManageresseeaudio',
          path: 'AJcourseManageresseeaudio',
          component: AJcourseManageresseeaudio,
          meta: {
            breadcrumbName: names.AJcourseManageresseeaudioN
          }
        },
        {
          name: 'AJcourseManageresseepdf',
          path: 'AJcourseManageresseepdf',
          component: AJcourseManageresseepdf,
          meta: {
            breadcrumbName: names.AJcourseManageresseepdfN
          }
        },
        {
          name: 'AJcourseManageresdownlist',
          path: 'AJcourseManageresdownlist',
          component: AJcourseManageresdownlist,
          meta: {
            breadcrumbName: names.AJcourseManageresdownlistN
          }
        },
        {
          name: 'AJcourseManageresdownlistpic',
          path: 'AJcourseManageresdownlistpic',
          component: AJcourseManageresdownlistpic,
          meta: {
            breadcrumbName: names.AJcourseManageresdownlistpicN
          }
        },
        {
          name: 'AJcourseManageresmove',
          path: 'AJcourseManageresmove',
          component: AJcourseManageresmove,
          meta: {
            breadcrumbName: names.AJcourseManageresmoveN
          }
        },
        {
          name: 'AJcourseManagerespublish',
          path: 'AJcourseManagerespublish',
          component: AJcourseManagerespublish,
          meta: {
            breadcrumbName: names.AJcourseManagerespublishN
          }
        },
        {
          name: 'AJcourseManageresunpublish',
          path: 'AJcourseManageresunpublish',
          component: AJcourseManageresunpublish,
          meta: {
            breadcrumbName: names.AJcourseManageresunpublishN
          }
        }
      ]
    },
    {
      name: 'AJcourseManageteam',
      path: '/AJcourseManageteam',
      component: AJcourseManageteam,
      meta: {
        breadcrumbName: names.AJcourseManageteamN
      },
      children: [{
          name: 'AJcourseManageteamadd',
          path: 'AJcourseManageteamadd',
          component: AJcourseManageteamadd,
          meta: {
            breadcrumbName: names.AJcourseManageteamaddN
          }
        },
        {
          name: 'AJcourseManageteamdel',
          path: 'AJcourseManageteamdel',
          component: AJcourseManageteamdel,
          meta: {
            breadcrumbName: names.AJcourseManageteamdelN
          }
        }
      ]
    },
    {
      name: 'AJcourseManagebook',
      path: '/AJcourseManagebook',
      component: AJcourseManagebook,
      meta: {
        breadcrumbName: names.AJcourseManagebookN
      },
      children: [{
          name: 'AJcourseManagebookupload',
          path: 'AJcourseManagebookupload',
          component: AJcourseManagebookupload,
          meta: {
            breadcrumbName: names.AJcourseManagebookuploadN
          }
        },
        {
          name: 'AJcourseManagebookadd',
          path: 'AJcourseManagebookadd',
          component: AJcourseManagebookadd,
          meta: {
            breadcrumbName: names.AJcourseManagebookaddN
          }
        },
        {
          name: 'AJcourseManagebookedit',
          path: 'AJcourseManagebookedit',
          component: AJcourseManagebookedit,
          meta: {
            breadcrumbName: names.AJcourseManagebookeditN
          }
        },
        {
          name: 'AJcourseManagebookdel',
          path: 'AJcourseManagebookdel',
          component: AJcourseManagebookdel,
          meta: {
            breadcrumbName: names.AJcourseManagebookdelN
          }
        }
      ]
    }
  ]
}
// 用户中心路由
export const usercenterobj = {
  usercenterobj: [{
      name: 'AJusercenterme',
      path: '/AJusercenterme',
      component: AJusercenterme,
      meta: {
        breadcrumbName: names.AJusercentermeN
      },
      children: [{
        name: 'AJusercentermeupload',
        path: 'AJusercentermeupload',
        component: AJusercentermeupload,
        meta: {
          breadcrumbName: names.AJusercenterbasicuploadN
        }
      }]
    },
    {
      name: 'AJusercenter',
      path: '/AJusercenter',
      component: AJusercenter,
      meta: {
        breadcrumbName: names.AJusercenterN
      },
      children: [{
        name: 'AJusercenterbasicupload',
        path: 'AJusercenterbasicupload',
        component: AJusercenterbasicupload,
        meta: {
          breadcrumbName: names.AJusercenterbasicuploadN
        }
      }]
    },
    {
      name: 'AJusercenterfocus',
      path: '/AJusercenterfocus',
      component: AJusercenterfocus,
      meta: {
        breadcrumbName: names.AJusercenterfocusN
      },
      children: [{
        name: 'AJusercenterfocusupload',
        path: 'AJusercenterfocusupload',
        component: AJusercenterfocusupload,
        meta: {
          breadcrumbName: names.AJusercenterbasicuploadN
        }
      }]
    },
    {
      name: 'AJusercentercollect',
      path: '/AJusercentercollect',
      component: AJusercentercollect,
      meta: {
        breadcrumbName: names.AJusercentercollectN
      },
      children: [{
          name: 'AJusercentercollectdel',
          path: 'AJusercentercollectdel',
          component: AJusercentercollectdel,
          meta: {
            breadcrumbName: names.AJusercentercollectdelN
          }
        },
        {
          name: 'AJusercentercollectupload',
          path: 'AJusercentercollectupload',
          component: AJusercentercollectupload,
          meta: {
            breadcrumbName: names.AJusercenterbasicuploadN
          }
        }
      ]
    },
    {
      name: 'AJusercenterbook',
      path: '/AJusercenterbook',
      component: AJusercenterbook,
      meta: {
        breadcrumbName: names.AJusercenterbookN
      },
      children: [{
        name: 'AJusercenterbookupload',
        path: 'AJusercenterbookupload',
        component: AJusercenterbookupload,
        meta: {
          breadcrumbName: names.AJusercenterbasicuploadN
        }
      }]
    },
    {
      path: '/AJusercenterloop',
      component: AJusercenterloop,
      children: [{
          name: 'loopGroup',
          path: 'loopGroup',
          component: AJusercenterloopGroup
        },
        {
          name: 'loopAllot',
          path: 'loopAllot',
          component: AJusercenterloopAllot
        },
        {
          name: 'loopDetails',
          path: '',
          component: AJusercenterloopDetails
        },
        {
          name: 'loopTaskLeader',
          path: 'loopTaskLeader',
          component: AJusercenterloopTaskLeader
        },
        {
          name: 'loopTaskCommon',
          path: 'loopTaskCommon',
          component: AJusercenterloopTaskCommon
        },
        {
          name: 'loopTaskSupervisor',
          path: 'loopTaskSupervisor',
          component: AJusercenterloopTaskSupervisor
        },
        {
          path: 'evaluateTemplateloopresee',
          name: 'loopevaluateTemplateloopresee',
          component: AJevaluateTemplateloopsettemplateresee,
          meta: {
            breadcrumbName: names.AJevaluateTemplateloopsettemplatereseeN
          }
        }
      ]
    }
  ]
}
export const adminobj = {
  adminobj: [{
    path: '/admin',
    name: 'AJadmin',
    meta: {
      breadcrumbName: '',
      requireauth: true
    },
    component: AJadmin
  }]
}

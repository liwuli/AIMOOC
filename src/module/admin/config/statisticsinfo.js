//导入环境
import {developUrl} from '@/module/admin/config/urlPage'
export const title1="无感考勤"
export const title2="考勤统计"
export const Export="导出"
export const findCollegeAndMajor = developUrl + '/base/CollegeManageAction/findCollegeAndMajor'    //查慕课学院与专业接口
export const findAllCourses = developUrl + '/control/course/findAllCourses';   //查所有课程
export const findClassesByType = developUrl + '/base/classes/findClassesByType';   //查班级列表
export const findAnalysisGByUser = developUrl + '/statistic/brainAttendance/findAnalysisGByUser';   //查班级列表
export const findAnalysisDetail = developUrl + '/statistic/brainAttendance/findAnalysisDetail'; //查询列表详情
export const updateUserAttendance = developUrl + '/statistic/brainAttendance/updateUserAttendance'; //修改考勤状态
export const exportReport = developUrl + '/statistic/brainAttendance/export'; //导出报表


// 考勤回顾
export const findTermsLists = developUrl + '/control/term/findTermsLists'; //查询所有学期接口
export const findAttendanceForLesson = developUrl + '/statistic/brainAttendance/findAttendanceForLesson' //查询列表
export const exportAttendanceForLesson = developUrl + '/statistic/brainAttendance/exportAttendanceForLesson'; //导出报表

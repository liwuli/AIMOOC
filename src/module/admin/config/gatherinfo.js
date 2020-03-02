import {developUrl,moni} from '@/module/admin/config/urlPage'
export const getSeatFreeRate = developUrl + '/base/classroom/getSeatFreeRate'
export const getAnalysisClassroomMonitor = (localStorage.getItem('moni')=="true"?'/moni':developUrl) + '/base/classroom/getAnalysisClassroomMonitor'
export const getBuildings = developUrl + '/base/building/getBuildings'

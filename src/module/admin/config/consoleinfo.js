import {developUrl} from '@/module/admin/config/urlPage'

export const consoleInfoUrl = developUrl + '/control/ClassStatisticsAction/getConsoleInfo'
export const classStatisticsUrl = developUrl + '/control/ClassStatisticsAction/getConsoleStatisticsInfoByDate'
export const aiResourceInfoUrl = developUrl + '/control/ClassStatisticsAction/getAiResourceInfo'

export const basicinfo = {
}
export const storeTitle = ['录制存储区', '中心存储区']
export const tab = [{text: '今天', value: 'today'}, {text: '最近三天', value: 'triduum'}, {text: '本周', value: 'week'}]
export const cloudList = [
  {text: '计划录制', colour: {color: '#2f97f8'}, value: 'lessonRecordInPlan', src: 'static/images/cloud1.png'},
  {text: '已录制', colour: {color: '#ff9600'}, value: 'lessonCompleteResources', src: 'static/images/cloud2.png'},
  {text: '录制失败', colour: {color: '#ff0000'}, value: 'lessonIncompleteResources', src: 'static/images/cloud3.png'},
  {text: '已迁移', colour: {color: '#b1b1b1'}, value: 'lessonNumMigrated', src: 'static/images/cloud4.png'}]
export const witList = [
  {text: '已上传', value: {background: '#06d401'}, src: 'static/images/wit1.png'}]
//{text: '录制失败', value: {background: 'red'}, src: 'static/images/wit2.png'}]

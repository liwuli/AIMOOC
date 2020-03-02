import {developUrl,mockjs} from '../../../../src/module/admin/config/urlPage'

export const getMicroClassrooms = (mockjs == '' ? developUrl : mockjs ) +'/base/classroom/getMicroClassrooms'
export const microTeachingInfo =(mockjs =='' ? developUrl :  mockjs ) +'/control/microTeaching/microTeachingInfo'
export const getLoopByClassRoomId = (mockjs =='' ? developUrl : mockjs ) + '/base/classroom/getLoopByClassRoomId'
export const addMicroLesson = (mockjs == '' ? developUrl :  mockjs ) +'/control/microTeaching/addMicroLesson'
export const findMicroLesson = (mockjs == '' ? developUrl :  mockjs ) +'/control/microTeaching/findMicroLesson'
export const stopMicroLesson = (mockjs == '' ? developUrl :  mockjs ) +'/control/microTeaching/stopMicroLesson'



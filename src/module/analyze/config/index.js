import {developUrl,moni} from '@/module/admin/config/urlPage'
export const findTermsLists = developUrl + '/control/term/findTermsLists'
export const findAllClassesList = developUrl + '/control/mobileCourse/findAllClassesList'
export const findAllUserLibClassesList = developUrl + '/base/classes/findAllUserLibClassesList'
export const findCourseListByCollegeId = developUrl + '/control/course/findCourseListByCollegeId'
export const findLessonsEventInfo = (localStorage.getItem('moni')=="true"?'/moni':developUrl) + '/statistic/studentAnalysis/findLessonsEventInfo'
export const getTeachingModel = (localStorage.getItem('moni')=="true"?'/moni':developUrl) + '/statistic/teacherAnalysis/getTeachingModel'
export const findLessonAttendanceRate = (localStorage.getItem('moni')=="true"?'/moni':developUrl) + '/statistic/studentAnalysis/findLessonAttendanceRate'
export const findCollegeAndTeacher = developUrl + '/base/CollegeManageAction/findCollegeAndTeacher'
export const getOnClassStudentsStatusForTeacher = (localStorage.getItem('moni')=="true"?'/moni':developUrl) + '/statistic/teacherAnalysis/getOnClassStudentsStatusForTeacher'
export const getAttendanceRateForTeacher = (localStorage.getItem('moni')=="true"?'/moni':developUrl) + '/statistic/teacherAnalysis/getAttendanceRateForTeacher'
export const getClassAnalysInfoList = (localStorage.getItem('moni')=="true"?'/moni':developUrl) + '/statistic/lessonInfo/getClassAnalysInfoList'
export const findStudentStudyCondition = developUrl + '/statistic/studentAnalysis/findStudentStudyCondition'
export const findStudentGrowuprecords = developUrl + '/statistic/studentAnalysis/findStudentGrowuprecords'
export const getTeacherActAnalysis = (localStorage.getItem('moni')=="true"?'/moni':developUrl) + '/statistic/lessonInfo/getTeacherActAnalysis'
export const getOnClassStudentsStatus = (localStorage.getItem('moni')=="true"?'/moni':developUrl) + '/statistic/lessonInfo/getOnClassStudentsStatus'
export const getInteractionRateInfos = (localStorage.getItem('moni')=="true"?'/moni':developUrl) + '/statistic/lessonInfo/getInteractionRateInfos'
export const findClassesStudentList = developUrl + '/base/classes/findClassesStudentList'
export const getCollegeAndCourseForAnalysis = developUrl + '/statistic/lessonInfo/getCollegeAndCourseForAnalysis'
export const getCollegeAndTeachersForAnalysis = developUrl + '/statistic/lessonInfo/getCollegeAndTeachersForAnalysis'
export const getCollegeAndClassForAnalysis = developUrl + '/statistic/lessonInfo/getCollegeAndClassForAnalysis'

export const selectStyle = [{width: '180px', 'margin': '1px 8px 0'}, {width: '140px', 'margin': '1px 8px 0'}, {width: '120px', 'margin': '1px 8px 0'}]
export const studentSelect = async function (id, classesId, callback, num) { // 选择学生
  try {
    const res = await this.axios.post(findClassesStudentList, {classesId: classesId})
    let objs = res.data.classesStudentList || []
    let temp = []
    temp[0] = {value: '-1', txt: '选择学生'}
    for (let item = 0, len = objs.length; item < len; item++) {
      temp[item + 1] = {value: objs[item].userId, txt: objs[item].realName}
    }
    this.$Select({
      'data': temp,
      'selectId': id,
      'callback': function (obj) {
        if (callback) {
          callback(obj, num)
        }
      },
      'matchval': [{val: -1}]
    })
  } catch (err) {
    console.log(err)
  }
}
export const teacherSelect = async function (arr, callback) {
  try {
    const res = await this.axios.post(getCollegeAndTeachersForAnalysis)
    let objs = res.data.data || []
    for (let i = 0, len = arr.length; i < len; i++) {
      let temp = []
      temp[0] = {value: '-1', txt: '选择院系', list: []}
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = {value: objs[item].collegeId, txt: objs[item].collegeName, list: objs[item].teachers}
      }
      let that = this
      that.$Select({
        'data': temp,
        'selectId': arr[i][0],
        'callback': function (obj) {
          let objs = obj.list
          let temp = []
          temp[0] = {value: '', txt: '选择教师', info: {}, collegeName: ''}
          for (let item = 0; item < objs.length; item++) {
            temp[item + 1] = {value: objs[item].teacherId, txt: objs[item].teacherName, info: objs[item], collegeName: obj.txt}
          }
          that.classList = that.$Select({
            'data': temp,
            'selectId': arr[i][1],
            'callback': function (obj) {
              if (callback) {
                callback(obj, i)
              }
            }
          })
        },
        'matchval': [{val: -1}]
      })
    }
  } catch (err) {
    console.log(err)
  }
}
export const termSelect = async function (arr, callback) {
  try {
    const res = await this.axios.post(findTermsLists)
    let objs = res.data.termList || []
    let temp = []
    temp[0] = {value: '-1', txt: '选择学期'}
    for (let item = 0, len = objs.length; item < len; item++) {
      temp[item + 1] = {value: objs[item].termId, txt: objs[item].termName, maxWeekNo: objs[item].maxWeekNo}
    }
    for (let i = 0, len = arr.length; i < len; i++) {
      this.$Select({
        'data': temp,
        'selectId': arr[i],
        'callback': function (obj) {
          if (callback) {
            callback(obj, i)
          }
        },
        'matchval': [{val: -1}]
      })
    }
  } catch (err) {
    console.log(err)
  }
}
export const gangedSelect = async function (arr, callback) { // 高教院系课程班级联动
  try {
    let that = this
    const res = await this.axios.post(getCollegeAndClassForAnalysis,{classType:arr[2]})
    let objs = res.data.data
    for (let i = 0, len = arr.length; i < len; i++) {
      let temp = []
      temp[0] = {value: '-1', txt: '选择院系', list: []}
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = {value: objs[item].collegeId, txt: objs[item].collegeName, list: objs[item].courseList}
      }
      this.$Select({
        'data': temp,
        'selectId': arr[i][0],
        'callback': function (obj) {
          let objs = obj.list
          let temp = []
          temp[0] = {value: '-1', txt: arr[2]==0 ? '选择专业' :'选择课程', item: obj}
          for (let item = 0; item < objs.length; item++) {
            if(arr[2]==0){
              temp[item + 1] = {value: objs[item].majorId, txt: objs[item].majorName, item: objs[item]}
            }else{
              temp[item + 1] = {value: objs[item].courseId, txt: objs[item].courseName, item: objs[item]}
            }
          }
          that.$Select({
            'data': temp,
            'selectId': arr[i][1],
            'callback': function (obj) {
              if (arr[i][2]) {
                let objs = obj.item.classesList || []
                let temp = []
                temp[0] = {value: '-1', txt: '选择班级'}
                for (let item = 0; item < objs.length; item++) {
                  temp[item + 1] = {value: objs[item].classesId, txt: objs[item].classesName}
                }
                that.classList = that.$Select({
                  'data': temp,
                  'selectId': arr[i][2],
                  'callback': function (obj) {
                    if (callback) {
                      callback(obj, i)
                    }
                  },
                  'matchval': [{val: -1}]
                })
              } else {
                if (callback) {
                  callback(obj, i)
                }
              }
            },
            'matchval': [{val: -1}]
          })
        },
        'matchval': [{val: -1}]
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export const classSelect = async function (arr, callback) { // 高教院系专业班级联动
  try {
    let that = this
    const res = await this.axios.post(findAllClassesList)
    let objs = res.data.classesList
    for (let i = 0, len = arr.length; i < len; i++) {
      let temp = []
      temp[0] = { value: '-1', txt: '选择院系', list: [] }
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = { value: objs[item].collegeId, txt: objs[item].collegeName, list: objs[item].majorList }
      }
      this.$Select({
        'data': temp,
        'selectId': arr[i][0],
        'callback': function (obj) {
          let objs = obj.list
          let temp = []
          temp[0] = { value: '-1', txt: '选择专业', item: obj }
          for (let item = 0; item < objs.length; item++) {
            temp[item + 1] = { value: objs[item].majorId, txt: objs[item].majorName, item: objs[item] }
          }
          that.$Select({
            'data': temp,
            'selectId': arr[i][1],
            'callback': function (obj) {
              if (arr[i][2]) {
                let objs = obj.item.classesList || []
                let temp = []
                temp[0] = { value: '-1', txt: '选择班级' }
                for (let item = 0; item < objs.length; item++) {
                  temp[item + 1] = { value: objs[item].classesId, txt: objs[item].classesName }
                }
                that.classList = that.$Select({
                  'data': temp,
                  'selectId': arr[i][2],
                  'callback': function (obj) {
                    if (callback) {
                      callback(obj, i)
                    }
                  },
                  'matchval': [{ val: -1 }]
                })
              } else {
                if (callback) {
                  callback(obj, i)
                }
              }
            },
            'matchval': [{ val: -1 }]
          })
        },
        'matchval': [{ val: -1 }]
      })
    }
  } catch (err) {
    console.log(err)
  }
}

export const classBasicInfo = [
  {text: '院系', value: 'collegeName'},
  {text: '专业名称', value: 'majorName'},
  {text: '班级名称', value: 'classesName'},
  {text: '上课教师', value: 'teacherName'},
  {text: '教师工号', value: 'teacherCode'}
]

export const classBasicInfo2 = [
  {text: '院系', value: 'collegeName'},
  {text: '课程名称', value: 'courseName'},
  {text: '班级名称', value: 'classesName'},
  {text: '上课教师', value: 'teacherName'},
  {text: '教师工号', value: 'teacherCode'}
]

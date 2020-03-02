import {developUrl} from '@/module/admin/config/urlPage'
export const findTermsLists = developUrl + '/control/term/findTermsLists'
export const findAllClassesList = developUrl + '/control/mobileCourse/findAllClassesList'
export const findCourseListByCollegeId = developUrl + '/control/course/findCourseListByCollegeId'
export const findLessonsEventInfo = developUrl + '/statistic/studentAnalysis/findLessonsEventInfo'
export const getTeachingModel = developUrl + '/statistic/teacherAnalysis/getTeachingModel'
export const findLessonAttendanceRate = developUrl + '/statistic/studentAnalysis/findLessonAttendanceRate'
export const findCollegeAndTeacher = developUrl + '/base/CollegeManageAction/findCollegeAndTeacher'
export const getOnClassStudentsStatusForTeacher = developUrl + '/statistic/teacherAnalysis/getOnClassStudentsStatusForTeacher'
export const getAttendanceRateForTeacher = developUrl + '/statistic/teacherAnalysis/getAttendanceRateForTeacher'
export const getClassAnalysInfoList = developUrl + '/statistic/lessonInfo/getClassAnalysInfoList'
export const getTeacherActAnalysis = developUrl + '/statistic/lessonInfo/getTeacherActAnalysis'
export const getOnClassStudentsStatus = developUrl + '/statistic/lessonInfo/getOnClassStudentsStatus'
export const getInteractionRateInfos = developUrl + '/statistic/lessonInfo/getInteractionRateInfos'
export const findClassesStudentList = developUrl + '/base/classes/findClassesStudentList'

export const selectStyle = [{width: '180px', 'margin': '1px 8px 0'}, {width: '140px', 'margin': '1px 8px 0'}, {width: '120px', 'margin': '1px 8px 0'}]
export const collegeSelect = async function (arr, callback) { // 学院选择下拉菜单
  try {
    const res = await this.axios.post(findAllClassesList)
    let objs = res.data.classesList || []
    let temp = []
    temp[0] = {value: '-1', txt: '学院名称'}
    for (let item = 0, len = objs.length; item < len; item++) {
      temp[item + 1] = {value: objs[item].collegeId, txt: objs[item].collegeName}
    }
    let that = this
    for (let i = 0, len = arr.length; i < len; i++) {
      this.$Select({
        'data': temp,
        'selectId': arr[i][0],
        'callback': function (obj) {
          callback && callback(obj, arr, i)
        },
        'matchval': [{val: -1}]
      })
    }
  } catch (err) {
    console.log(err)
  }
}
export const studentSelect = async function (id, classesId, callback) { // 选择学生
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
          callback(obj)
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
    const res = await this.axios.post(findCollegeAndTeacher)
    let objs = res.data || []
    for (let i = 0, len = arr.length; i < len; i++) {
      let temp = []
      temp[0] = {value: '-1', txt: '选择院系', list: []}
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = {value: objs[item].collegeId, txt: objs[item].collegeName, list: objs[item].userList}
      }
      let that = this
      that.$Select({
        'data': temp,
        'selectId': arr[i][0],
        'callback': function (obj) {
          let objs = obj.list
          let temp = []
          temp[0] = {value: '-1', txt: '选择教师'}
          for (let item = 0; item < objs.length; item++) {
            temp[item + 1] = {value: objs[item].id, txt: objs[item].realName, info: objs[item]}
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
export const gangedSelect = async function (arr, callback) { // 高教班级
  try {
    let that = this
    const res = await this.axios.post(findAllClassesList)
    let objs = res.data.classesList
    for (let i = 0, len = arr.length; i < len; i++) {
      let temp = []
      temp[0] = {value: '-1', txt: '选择院系', list: []}
      for (let item = 0; item < objs.length; item++) {
        temp[item + 1] = {value: objs[item].collegeId, txt: objs[item].collegeName, list: objs[item].majorList}
      }
      this.$Select({
        'data': temp,
        'selectId': arr[i][0],
        'callback': function (obj) {
          let objs = obj.list
          let temp = []
          temp[0] = {value: '-1', txt: '选择专业', list: []}
          for (let item = 0; item < objs.length; item++) {
            temp[item + 1] = {value: objs[item].majorId, txt: objs[item].majorName, list: objs[item].classesList}
          }
          that.$Select({
            'data': temp,
            'selectId': arr[i][1],
            'callback': function (obj) {
              let objs = obj.list
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
export const classBasicInfo = [
  {text: '班级名称', value: 'classesName'},
  {text: '班级代码', value: 'classesCode'},
  {text: '院系', value: 'collegeName'},
  {text: '专业', value: 'majorName'},
  {text: '辅导员', value: 'teacherName'},
  {text: '工号', value: 'teacherCode'}
]

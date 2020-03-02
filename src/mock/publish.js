import Mock from "mockjs";
const Random = Mock.Random;

//开始上课
Mock.mock('/moni/control/microTeaching/addMicroLesson', 'post', () => {
   return {
     "code": 200, "message": "操作成功"
   }
})


//根据教室id 获取rtmp
Mock.mock('/moni/base/classroom/getLoopByClassRoomId', 'post', () => {
  return {
    "urlList": [{
      "channelName": "教师机画面",
      "url": "rtmp://172.16.149.125/live/172.16.149.215_0_1",
      "target": 2
    }, {
      "channelName": "老师全景",
      "url": "rtmp://172.16.149.125/live/172.16.149.201_1_1",
      "target": 1
    }],
    "roomInfo": {
      "isAnalysis": 3,
      "buildingName": "花果山",
      "classroomName": "五老峰",
      "classroomId": "626fd97678594eb9ac0245ff69eccb44",
      "currentSectionId": ""
    }
  }
})

// 模拟微格教室
Mock.mock('/moni/control/microTeaching/microTeachingInfo', 'post', () => {
  return {
    "result": {
      "teachingCourses": [{
        "classesName": "测试245",
        "classesId": "6b879cf0b57e44118832d5d650172e50",
        "courseName": '李武林测试课程',
        "courseId": "38cb7b85b79e48088a202df228975d99"
      }],
      "microSubjects": [{
        "majorId": "83c7fbd1fe484ba0a5113d44b95697bc",
        "subjectId": "22e28b4e29564e2681215ef8a2522dff",
        "subjectName": "旅游学科"
      }],
      "grades": [{
          "createDateTime": "2019-11-19 14:40:50",
          "gradeCode": "1",
          "gradeId": "1",
          "gradeName": "1",
          "isDelete": 0,
          "updateTime": "2019-11-19 14:40:53"
        },
        {
          "createDateTime": "2019-11-21 11:59:35",
          "gradeCode": "2",
          "gradeId": "2",
          "gradeName": "2",
          "isDelete": 0,
          "updateTime": "2019-11-21 11:59:40"
        },
        {
          "createDateTime": "2019-11-21 11:59:40",
          "gradeCode": "3",
          "gradeId": "3",
          "gradeName": "3",
          "isDelete": 0,
          "updateTime": "2019-11-21 11:59:40"
        },
        {
          "createDateTime": "2019-11-21 11:59:40",
          "gradeCode": "4",
          "gradeId": "4",
          "gradeName": "4",
          "isDelete": 0,
          "updateTime": "2019-11-21 11:59:40"
        },
        {
          "createDateTime": "2019-11-21 11:59:40",
          "gradeCode": "5",
          "gradeId": "5",
          "gradeName": "5",
          "isDelete": 0,
          "updateTime": "2019-11-21 11:59:40"
        },
        {
          "createDateTime": "2019-11-21 11:59:40",
          "gradeCode": "6",
          "gradeId": "6",
          "gradeName": "6",
          "isDelete": 0,
          "updateTime": "2019-11-21 11:59:40"
        }
      ]
    },
    "code": 200,
    "message": "查询成功"
  }
})



// 模拟微格教室
Mock.mock('/moni/base/classroom/getMicroClassrooms', 'post', () => {
  return {
    "result": {
      "total": 1,
      "data": [{
        "bookable": null,
        "classroomName": "五老峰",
        "classroomId": "626fd97678594eb9ac0245ff69eccb44",
        "classroomAddress": "五老峰"
      }]
    },
    "code": 200,
    "message": "查询成功"
  }
})


// 查询学科列表  模拟数据
Mock.mock('/moni/base/microSubject/getMicroSubjectList', 'post', () => {
  return {
    "total": 1,
    "data": [{
      "createDateTime": "2019-11-19 16:23:27.0",
      "isDelete": 0,
      "majors": [{
        "majorId": "0519",
        "majorName": "旅游管理"
      }, {
        "majorId": "0423",
        "majorName": "管理专业"
      }],
      "subjectCode": "sb001",
      "subjectId": "22e28b4e29564e2681215ef8a2522dff",
      "subjectName": "旅游学科",
      "updateTime": "2019-11-19 16:23:27.0"
    }, {
      "createDateTime": "2019-11-19 16:23:27.0",
      "isDelete": 0,
      "majors": [{
        "majorId": "0519",
        "majorName": "旅游管理"
      }, {
        "majorId": "0423",
        "majorName": "管理专业"
      }],
      "subjectCode": "sb001",
      "subjectId": "22e28b4e29564e2681215ef8a2522dff",
      "subjectName": "旅游学科",
      "updateTime": "2019-11-19 16:23:27.0"
    }, {
      "createDateTime": "2019-11-19 16:23:27.0",
      "isDelete": 0,
      "majors": [{
        "majorId": "0519",
        "majorName": "旅游管理"
      }, {
        "majorId": "0423",
        "majorName": "管理专业"
      }],
      "subjectCode": "sb001",
      "subjectId": "22e28b4e29564e2681215ef8a2522dff",
      "subjectName": "旅游学科",
      "updateTime": "2019-11-19 16:23:27.0"
    }, {
      "createDateTime": "2019-11-19 16:23:27.0",
      "isDelete": 0,
      "majors": [{
        "majorId": "0519",
        "majorName": "旅游管理"
      }, {
        "majorId": "0423",
        "majorName": "管理专业"
      }],
      "subjectCode": "sb001",
      "subjectId": "22e28b4e29564e2681215ef8a2522dff",
      "subjectName": "旅游学科",
      "updateTime": "2019-11-19 16:23:27.0"
    }, {
      "createDateTime": "2019-11-19 16:23:27.0",
      "isDelete": 0,
      "majors": [{
        "majorId": "0519",
        "majorName": "旅游管理"
      }, {
        "majorId": "0423",
        "majorName": "管理专业"
      }],
      "subjectCode": "sb001",
      "subjectId": "22e28b4e29564e2681215ef8a2522dff",
      "subjectName": "旅游学科",
      "updateTime": "2019-11-19 16:23:27.0"
    }]
  }
})


// 资源
Mock.mock('/moni/base/microSubject/deleteMicroSubject', 'post', () => {
  return {
    "data": "删除成功",
    "isSuccess": 1
  }
})

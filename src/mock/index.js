import Mock from "mockjs";
const Random = Mock.Random;

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
// Mock.setup({
//   timeout: 500
// })

// 资源
Mock.mock('/moni/base/classroom/findAllResCount', 'post', () => {
  return {
    knowledgeCount: 1200,
    liveCount: 180,
    micVideoCount: 10,
    noteCount: 800,
    videoCount: 1030,
  }
})



// 课程
Mock.mock('/moni/statistic/lessonInfo/findSchoolParticipateRateAvg', 'post', () => {
  return {
    "colleges": [{
      "ts_interactionRate": 0.50,
      "concentrateRate": 0.5404595828102847,
      "collegeName": "信息工程学院",
      "participateRate": 0.54076096916965642
    }, {
      "ts_interactionRate": 0.52,
      "concentrateRate": 0.5404595828102847,
      "collegeName": "行政管理学院",
      "participateRate": 0.57076096916965642
    }, {
      "ts_interactionRate": 0.60,
      "concentrateRate": 0.604595828102847,
      "collegeName": "计算机学院",
      "participateRate": 0.64076096916965642
    }, {
      "ts_interactionRate": 0.70,
      "concentrateRate": 0.7404595828102847,
      "collegeName": "土木工程管理学院",
      "participateRate": 0.70076096916965642
    }],
    "schoolJson": {
      "ts_interactionRate": 0.70,
      "concentrateRate": 0.85045958281028468,
      "participateRate": 0.7407609691696564,
      "groupFlag": 1
    }
  }
})


// 教学互动
Mock.mock('/moni/statistic/lessonInfo/getInteractionForIndex', 'post', () => {
  return {
    "data": [{
      "ts_interactionRate": 80,
      "collegeName": "土木工程管理学院",
    }, {
      "ts_interactionRate": 75,
      "collegeName": "行政管理学院",
    }, {
      "ts_interactionRate": 70,
      "collegeName": "计算机学院"
    }, {
      "ts_interactionRate": 69,
      "collegeName": "信息工程学院"
    }],
    "threeInteractionType": {
      "invalidInteraction": 96,
      "normalInteraction": 120,
      "complexInteraction": 50
    }
  }
})

//教师行为分析曲线
Mock.mock('/moni/statistic/lessonInfo/getTeacherActAnalysis', 'post', () => {
  return {
    "totalteacherEventRate": 1.8409090909090908,
    "data": [{
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 1
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 2
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 3
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 4
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 5
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 6
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 7
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 8
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 9
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 10
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 11
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 12
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 13
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 14
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 15
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 16
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 17
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 18
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 19
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 20
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 21
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 22
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 23
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 24
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 25
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 26
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 27
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 28
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 29
    }, {
      "teacherEventRate": Random.int(50, 100),
      "actionRate": Random.int(50, 100),
      "languageRate": Random.int(50, 100),
      "weekNo": 30
    }],
    "totalactionRate": 0.8409090909090909,
    "totallanguageRate": 1.4318181818181819
  }
})



// 课上学生状态曲线
Mock.mock('/moni/statistic/lessonInfo/getOnClassStudentsStatus', 'post', () => {
  return {
    "totaldoubtRate": 0.18739587095315305,
    "data": [{
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 1,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 2,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 3,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 4,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 5,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 6,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 7,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 8,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 9,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 10,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 11,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 12,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 13,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 14,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 15,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 16,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 17,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 18,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 19,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 20,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 21,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 22,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 23,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 24,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 25,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 26,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 27,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 28,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 29,
      "activityRate": Random.int(50, 100)
    }, {
      "concentrateRate": Random.int(50, 100),
      "participateRate": Random.int(50, 100),
      "doubtRate": Random.int(50, 100),
      "weekNo": 30,
      "activityRate": Random.int(50, 100)
    }],
    "totalconcentrateRate": 0.5353094974674864,
    "totalactivityRate": 0.19578731625752274,
    "totalparticipateRate": 0.5361086279658205
  }
})

// 师生互动情况曲线
Mock.mock('/moni/statistic/lessonInfo/getInteractionRateInfos', 'post', () => {
  return {
    "data": [{
      "weekNo": 1,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 2,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 3,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 4,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 5,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 6,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 7,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 8,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 9,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 10,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 11,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 12,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 13,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 14,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 15,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 16,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 17,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 18,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 19,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 20,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 21,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 22,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 23,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 24,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 25,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 26,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 27,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 28,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 29,
      "value": Random.int(30, 80)
    }, {
      "weekNo": 30,
      "value": Random.int(30, 80)
    }],
    "avgInteractionRate": 0.0
  }
})


// 教师教学分析
Mock.mock('/moni/statistic/teacherAnalysis/getAttendanceRateForTeacher', 'post', () => {
  return {
    "data": 1
  }
})

// 智慧分析监控
Mock.mock('/moni/base/classroom/getAnalysisClassroomMonitor', 'post', () => {
  return {
    "concentrateRate": "0.2",
    "total": 5,
    "allAnalysisClassroomNum": 5,
    "data": [{
      "isHavingClass": 1,
      "heatMap": "[{\"x\":0.350,\"y\":0.250},{\"x\":0.310,\"y\":0.270},{\"x\":0.320,\"y\":0.30},{\"x\":0.230,\"y\":0.310},{\"x\":0.10,\"y\":0.210},{\"x\":0.310,\"y\":0.310},{\"x\":0.230,\"y\":0.290},{\"x\":0.090,\"y\":0.420},{\"x\":0.07000000000000001,\"y\":0.460},{\"x\":0.080,\"y\":0.370},{\"x\":0.170,\"y\":0.430},{\"x\":0.210,\"y\":0.290},{\"x\":0.060,\"y\":0.30}]",
      "isHaveSensitiveWord": 0,
      "illegalItemsNum": 0,
      "classroomId": "7543331141e3402f8f82b7d35ec4afc7",
      "lessonId": "10b278fdacde462b820be8394f1159f0",
      "concentrateRate": 0.84, //注意力
      "createTime": "2019-06-25 18:10:16",
      "classroomName": "博瑞教室1",
      "seatFreeRate": 0,
      "attendanceRate": 1,  //到勤率
      "isTeacherMissClass": 0,
      "teacherIsIllegal": 0,
      "illegalBehaviorRate": 0, //敏感词
      "lastUpdateTime": "2019-07-11 15:21:05"
    }, {
       "isHavingClass": 1,
       "heatMap": "[{\"x\":0.350,\"y\":0.250},{\"x\":0.310,\"y\":0.270},{\"x\":0.320,\"y\":0.30},{\"x\":0.230,\"y\":0.310},{\"x\":0.10,\"y\":0.210},{\"x\":0.310,\"y\":0.310},{\"x\":0.230,\"y\":0.290},{\"x\":0.090,\"y\":0.420},{\"x\":0.07000000000000001,\"y\":0.460},{\"x\":0.080,\"y\":0.370},{\"x\":0.170,\"y\":0.430},{\"x\":0.210,\"y\":0.290},{\"x\":0.060,\"y\":0.30}]",
       "isHaveSensitiveWord": 0,
       "illegalItemsNum": 0,
       "classroomId": "7543331141e3402f8f82b7d35ec4afc7",
       "lessonId": "10b278fdacde462b820be8394f1159f0",
       "concentrateRate": 0.88,  //注意力
       "createTime": "2019-06-25 18:10:16",
       "classroomName": "博瑞教室2",
       "seatFreeRate": 0,
       "attendanceRate": 0.99,  //到勤率
       "isTeacherMissClass": 0,
       "teacherIsIllegal": 0,
       "illegalBehaviorRate": 0, //敏感词
       "lastUpdateTime": "2019-07-11 15:21:05"
    }, {
      "isHavingClass": 1,
      "heatMap": "[{\"x\":0.350,\"y\":0.250},{\"x\":0.310,\"y\":0.270},{\"x\":0.320,\"y\":0.30},{\"x\":0.230,\"y\":0.310},{\"x\":0.10,\"y\":0.210},{\"x\":0.310,\"y\":0.310},{\"x\":0.230,\"y\":0.290},{\"x\":0.090,\"y\":0.420},{\"x\":0.07000000000000001,\"y\":0.460},{\"x\":0.080,\"y\":0.370},{\"x\":0.170,\"y\":0.430},{\"x\":0.210,\"y\":0.290},{\"x\":0.060,\"y\":0.30}]",
      "isHaveSensitiveWord": 0,
      "illegalItemsNum": 0,
      "classroomId": "7543331141e3402f8f82b7d35ec4afc7",
      "lessonId": "10b278fdacde462b820be8394f1159f0",
      "concentrateRate": 0.79,  //注意力
      "createTime": "2019-06-25 18:10:16",
      "classroomName": "博瑞教室3",
      "seatFreeRate": 0,
      "attendanceRate": 0.97,  //到勤率
      "isTeacherMissClass": 0,
      "teacherIsIllegal": 0.02,
      "illegalBehaviorRate": 0, //敏感词
      "lastUpdateTime": "2019-07-11 15:21:05"
    }, {
      "isHavingClass": 1,
      "heatMap": "[{\"x\":0.350,\"y\":0.250},{\"x\":0.310,\"y\":0.270},{\"x\":0.320,\"y\":0.30},{\"x\":0.230,\"y\":0.310},{\"x\":0.10,\"y\":0.210},{\"x\":0.310,\"y\":0.310},{\"x\":0.230,\"y\":0.290},{\"x\":0.090,\"y\":0.420},{\"x\":0.07000000000000001,\"y\":0.460},{\"x\":0.080,\"y\":0.370},{\"x\":0.170,\"y\":0.430},{\"x\":0.210,\"y\":0.290},{\"x\":0.060,\"y\":0.30}]",
      "isHaveSensitiveWord": 0,
      "illegalItemsNum": 0,
      "classroomId": "7543331141e3402f8f82b7d35ec4afc7",
      "lessonId": "10b278fdacde462b820be8394f1159f0",
      "concentrateRate": 0.88,  //注意力
      "createTime": "2019-06-25 18:10:16",
      "classroomName": "博瑞教室4",
      "seatFreeRate": 0,
      "attendanceRate": 0.97,  //到勤率
      "isTeacherMissClass": 0,
      "teacherIsIllegal": 0,
      "illegalBehaviorRate": 0.03, //敏感词
      "lastUpdateTime": "2019-07-11 15:21:05"
    },{
      "isHavingClass": 0,
      "heatMap": "[{\"x\":0.350,\"y\":0.250},{\"x\":0.310,\"y\":0.270},{\"x\":0.320,\"y\":0.30},{\"x\":0.230,\"y\":0.310},{\"x\":0.10,\"y\":0.210},{\"x\":0.310,\"y\":0.310},{\"x\":0.230,\"y\":0.290},{\"x\":0.090,\"y\":0.420},{\"x\":0.07000000000000001,\"y\":0.460},{\"x\":0.080,\"y\":0.370},{\"x\":0.170,\"y\":0.430},{\"x\":0.210,\"y\":0.290},{\"x\":0.060,\"y\":0.30}]",
      "isHaveSensitiveWord": 0,
      "illegalItemsNum": 0,
      "classroomId": "7543331141e3402f8f82b7d35ec4afc7",
      "lessonId": "10b278fdacde462b820be8394f1159f0",
      "concentrateRate": 0.88,  //注意力
      "createTime": "2019-06-25 18:10:16",
      "classroomName": "博瑞教室5",
      "seatFreeRate": 0,
      "attendanceRate": 0.97,  //到勤率
      "isTeacherMissClass": 0,
      "teacherIsIllegal": 0,
      "illegalBehaviorRate": 0, //敏感词
      "lastUpdateTime": "2019-07-11 15:21:05"
    }],
    "freeClassroomNum": 4,
    "attendanceRate": "0.2",
    "illegalBehaviorRate": "0.0"
  }
})


// 教情学情监测
Mock.mock('/moni/base/classroom/findTotalAiBrainStatus', 'post', () => {
  return {
    "result": {
      "dateTime": "2019-10-14 14:13:13",
      "seatFreeRateM": "0.33",
      "isHavingClass": 4, //正在上课
      "isHaveSensitiveWord": 1, //敏感词
      "illegalBehavior": 1, //违规行为(学生)
      "seatFreeRateL": "0.67",
      "classroomRate": "0.20",
      "weekday": 1,
      "seatFreeRateH": "0.00",
      "isTeacherMissClass": 0, //老师缺课
      "teacherIsIllegal": 0 //违规行为(老师)
    },
    "code": 200,
    "message": "查询成功"
  }
})

// 教学模式
Mock.mock('/moni/statistic/teacherAnalysis/getTeachingModel', 'post', () => {
  return {
    "data": [
      ["对话型", "练习型", "混合型", "讲授型"],
      ["90", "45", "70.0", "100"]
    ]
  }
})



// 教室
Mock.mock('/moni/statistic/lessonInfo/getStudentStatusForIndex', 'post', () => {
  return {
    "data": [{
      "classesName": "土木工程管理学院",
      "concentrateRate": 0.6504021349589991, //注意力
      "participateRate": 0.45066584802344934, //参与度
      "doubtRate": 0.08364619358269935, //疑惑度
      "activityRate": 0.54600003766630874 //活跃度
    }, {
      "classesName": "计算机学院",
      "concentrateRate": 0.604021349589991, //注意力
      "participateRate": 0.42066584802344934, //参与度
      "doubtRate": 0.10364619358269935, //疑惑度
      "activityRate": 0.52600003766630874 //活跃度
    }, {
      "classesName": "信息工程学院",
      "concentrateRate": 0.5804021349589991, //注意力
      "participateRate": 0.39066584802344934, //参与度
      "doubtRate": 0.11364619358269935, //疑惑度
      "activityRate": 0.51600003766630874 //活跃度
    }, {
      "classesName": "行政管理学院",
      "concentrateRate": 0.5504021349589991, //注意力
      "participateRate": 0.37066584802344934, //参与度
      "doubtRate": 0.1364619358269935, //疑惑度
      "activityRate": 0.47600003766630874 //活跃度
    }],
    "doubtRateAvg": 0.08364619358269935, //疑惑度
    "participateRateAvg": 0.61066584802344934, //参与度
    "activityRateAvg": 0.5600003766630874, //活跃度
    "concentrateRateAvg": 0.7104021349589991 //注意力
  }
})


// 课程详情
Mock.mock('/moni/statistic/lessonInfo/getAttendRateForEveryLesson', 'post', () => {
  return {
    "data": [{
      "attendAvg": 96.6667,
      "lessonName": "1(第33周周1第20节)"
    }, {
      "attendAvg": 98.6667,
      "lessonName": "1(第33周周1第17节)"
    }, {
      "attendAvg": 100.0000,
      "lessonName": "默认章节"
    }, {
      "attendAvg": 98.0000,
      "lessonName": "1(第33周周1第15节)"
    }, {
      "attendAvg": 94.0000,
      "lessonName": "1(第33周周1第14节)"
    }, {
      "attendAvg": 95.6667,
      "lessonName": "1(第33周周1第21节)"
    }, {
      "attendAvg": 100.0000,
      "lessonName": "1(第33周周1第16节)"
    }, {
      "attendAvg": 96.6667,
      "lessonName": "1(第33周周1第19节)"
    }]
  }
})



// 学生学习质量-课堂学生状态
Mock.mock('/moni/statistic/lessonInfo/getStudentStatusForEveryLesson', 'post', () => {
  return {
    "data": [{
      "concentrateRate": 19.68954296088686,
      "participateRate": 19.68954296088686,
      "doubtRate": 17.81045800330592,
      "activityRate": 8.952776612896546,
      "lessonName": "1(第33周周1第20节)"
    }, {
      "concentrateRate": 40.18987420993515,
      "participateRate": 40.400844661495356,
      "doubtRate": 7.96413521600675,
      "activityRate": 16.6366609591472,
      "lessonName": "1(第33周周1第17节)"
    }, {
      "concentrateRate": 40.18987420993515,
      "participateRate": 40.400844661495356,
      "doubtRate": 7.96413521600675,
      "activityRate": 16.6366609591472,
      "lessonName": "默认章节"
    }, {
      "concentrateRate": 14.5985401459854,
      "participateRate": 14.5985401459854,
      "doubtRate": 8.0,
      "activityRate": 8.612119630115094,
      "lessonName": "1(第33周周1第15节)"
    }, {
      "concentrateRate": 18.666666666666668,
      "participateRate": 18.666666666666668,
      "doubtRate": 10.0,
      "activityRate": 4.584733681210007,
      "lessonName": "1(第33周周1第14节)"
    }, {
      "concentrateRate": 26.04166668127565,
      "participateRate": 26.04166668127565,
      "doubtRate": 13.541666681275649,
      "activityRate": 3.245208439115873,
      "lessonName": "1(第33周周1第21节)"
    }, {
      "concentrateRate": 27.00000063578288,
      "participateRate": 27.00000063578288,
      "doubtRate": 17.444444934527077,
      "activityRate": 9.112178641060988,
      "lessonName": "1(第33周周1第16节)"
    }, {
      "concentrateRate": 22.135416666666664,
      "participateRate": 22.135416666666664,
      "doubtRate": 10.156250031044085,
      "activityRate": 9.656352169501286,
      "lessonName": "1(第33周周1第19节)"
    }]
  }
})


// 学生学习质量
Mock.mock('/moni/statistic/studentAnalysis/findLessonsEventInfo', 'post', () => {
  return {
    "lessonsEventInfo": {
      "invalidInteraction": Random.int(40, 90),
      'TSInteractionRate': Random.int(50, 100),
      "studentArea": Random.int(40, 90), //学生区域
      "normalInteraction": Random.int(40, 90),
      "teacherEvent": {
        "event1": Random.int(20, 100), //讲授
        "event7": Random.int(20, 100),
        "event6": Random.int(20, 100),
        "event5": Random.int(20, 100),
        "event4": Random.int(20, 100),
        "event3": Random.int(20, 100),
        "event2": Random.int(20, 100)
      },
      "knowledgeNum": 50,
      "studentLanguageRate": 0.0,
      "complexInteraction": Random.int(40, 90),
      "studentEvent": {
        "event1": Random.int(20, 100),
        "event7": Random.int(20, 100),
        "event6": Random.int(20, 100), //笔记
        "event5": Random.int(20, 100), //阅读
        "event4": Random.int(20, 100),
        "event3": Random.int(20, 100),
        "event2": Random.int(20, 100)
      },
      "conversionRate": 0.0,
      "studentEventRate": Random.int(50, 100),
      "studentCoverRate": 0.0,
      "blackboardArea": Random.int(40, 90), //黑板区域
      "screenArea": Random.int(40, 90), //大屏
      "teacherEventRate": Random.int(50, 100),
      "knowledgePointCoverage": 0.875,
      "studentEmotion": {
        "emotion4": 0.22,
        "emotion3": 0.22,
        "emotion2": 0.22,
        "emotion1": 0.22,
        "emotion0": 0.22
      },
      "teacherEmotion": {
        "emotion4": Random.float(0, 0, 5, 10),
        "emotion3": Random.float(0, 0, 5, 10),
        "emotion2": Random.float(0, 0, 5, 10),
        "emotion1": Random.float(0, 0, 5, 10),
        "emotion0": Random.float(0, 0, 5, 10)
      },
      "studentActionRate": 0.0,
      "teacherLanguageRate": Random.int(50, 100),
      "multimediaRate": Random.int(50, 100),
      "teacherActionRate": Random.int(50, 100)
    },
    "msg": "查询成功！",
    "isSuccess": 1
  }
})


// 到勤率
Mock.mock('/moni/statistic/studentAnalysis/findLessonAttendanceRate', 'post', () => {
  return {
    "msg": "查询成功！",
    "lessonsList": [{
      "courseName": "测试同步课程",
      "teacherName": "朱999",
      "attendanceRate": 0.0000,
      "lessonId": "959370e93dd04f838e7f59cc5c7029e4",
      "startTime": "2019-09-30 14:26:00",
      "endTime": "2019-09-30 14:36:00",
      "courseId": "07f0f6fed25e4e4f911b6bce9bb3c749",
      "lessonName": "1(第33周周1第14节)"
    }, {
      "courseName": "测试同步课程",
      "teacherName": "朱999",
      "attendanceRate": 0.0000,
      "lessonId": "82ec3fd6793b49a3a166f6ef45286a34",
      "startTime": "2019-09-30 14:37:00",
      "endTime": "2019-09-30 14:47:00",
      "courseId": "07f0f6fed25e4e4f911b6bce9bb3c749",
      "lessonName": "1(第33周周1第15节)"
    }, {
      "courseName": "测试同步课程",
      "teacherName": "杨",
      "attendanceRate": 50.0000,
      "lessonId": "9b1d5740c1574154b542934a93994f46",
      "startTime": "2019-09-30 14:48:00",
      "endTime": "2019-09-30 14:58:00",
      "courseId": "07f0f6fed25e4e4f911b6bce9bb3c749",
      "lessonName": "1(第33周周1第16节)"
    }, {
      "courseName": "测试同步课程",
      "teacherName": "朱999",
      "attendanceRate": 66.6667,
      "lessonId": "1a69661f627b47c289a6a39341cb24a7",
      "startTime": "2019-09-30 14:59:00",
      "endTime": "2019-09-30 15:09:00",
      "courseId": "07f0f6fed25e4e4f911b6bce9bb3c749",
      "lessonName": "1(第33周周1第17节)"
    }, {
      "courseName": "测试同步课程",
      "teacherName": "朱999",
      "attendanceRate": 66.6667,
      "lessonId": "d8de7b3d81274cb6a1fb6a9fc08bc95f",
      "startTime": "2019-09-30 15:21:00",
      "endTime": "2019-09-30 15:31:00",
      "courseId": "07f0f6fed25e4e4f911b6bce9bb3c749",
      "lessonName": "1(第33周周1第19节)"
    }, {
      "courseName": "测试同步课程",
      "teacherName": "朱999",
      "attendanceRate": 66.6667,
      "lessonId": "0e0f50033b454e72b5857a2b1d3e44c0",
      "startTime": "2019-09-30 15:32:00",
      "endTime": "2019-09-30 15:42:00",
      "courseId": "07f0f6fed25e4e4f911b6bce9bb3c749",
      "lessonName": "1(第33周周1第20节)"
    }, {
      "courseName": "测试同步课程",
      "teacherName": "朱999",
      "attendanceRate": 66.6667,
      "lessonId": "98ad715c89214813aaceae8ac692c072",
      "startTime": "2019-09-30 15:43:00",
      "endTime": "2019-09-30 15:53:00",
      "courseId": "07f0f6fed25e4e4f911b6bce9bb3c749",
      "lessonName": "1(第33周周1第21节)"
    }],
    "attendanceRates": Random.float(70, 100, 5, 10),
    "isSuccess": 1
  }
})

// 教学模式
Mock.mock('/moni/statistic/teacherAnalysis/getTeachingModel', 'post', () => {
  return {
    "data": [
      ["对话型", "练习型", "混合型", "讲授型"],
      [Random.int(50, 80), Random.int(30, 100), Random.int(50, 70), Random.int(50, 100)]
    ]
  }
})


//班级对比分析
Mock.mock('/moni/statistic/lessonInfo/getClassAnalysInfoList', 'post', () => {
  return {
    "classAnalysInfoList": [{
      "classesName": "测试同步班级",
      "concentrateRate": Random.float(0, 0, 5, 10),
      "classesId": "c988b86afd3648f4a0e554376cd4d918",
      "participateRate": Random.float(0, 0, 5, 10),
      "doubtRate": Random.float(0, 0, 5, 10),
      "attendanceRate": 0.98,
      "activityRate": Random.float(0, 0, 5, 10),
      "classesCode": "999"
    }, {
      "classesName": "行政班级1",
      "concentrateRate": Random.float(0, 0, 5, 10),
      "classesId": "f06e8082b41546d888cf96da4c0fdc4d",
      "participateRate": Random.float(0, 0, 5, 10),
      "doubtRate": Random.float(0, 0, 5, 10),
      "attendanceRate": 0.97,
      "activityRate": Random.float(0, 0, 5, 10),
      "classesCode": "xz001"
    }],
    "classesInfos": [{
      "creator": "admin",
      "majorId": "6d14fd2b30344c2cb9c5b3d79204a7d3",
      "classesType": "0",
      "teacherName": "朱999",
      "lastUpdateDate": "2019-09-25 14:45:23",
      "isDelete": "0",
      "remark": null,
      "teacherCode": "9527",
      "studySectionId": null,
      "classesCode": "999",
      "classesName": "测试同步班级",
      "termId": null,
      "collegeName": "测试同步学院",
      "classesId": "c988b86afd3648f4a0e554376cd4d918",
      "teacherId": "57a7657d1d784bdf809375f1609a5b86",
      "collegeId": "ba0c54a332454df2b7b66900bf631097",
      "majorName": "测试同步专业",
      "courseId": null,
      "lastUpdator": null,
      "createDate": "2019-09-25 14:45:23"
    }, {
      "creator": "admin",
      "majorId": "068a34a3e8bb4e03a6adb959d9ed4442",
      "classesType": "0",
      "teacherName": "杨书航",
      "lastUpdateDate": "2019-08-28 09:54:58",
      "isDelete": "0",
      "remark": null,
      "teacherCode": "12408112004",
      "studySectionId": null,
      "classesCode": "xz001",
      "classesName": "行政班级1",
      "termId": null,
      "collegeName": "索贝数码学院4",
      "classesId": "f06e8082b41546d888cf96da4c0fdc4d",
      "teacherId": "2f89622c19f8463ab93a73bea5bfb7c8",
      "collegeId": "6b17a48e7b0a4937963b3554ccb9d87b",
      "majorName": "计算机软件4",
      "courseId": null,
      "lastUpdator": "admin",
      "createDate": "2019-06-14 17:51:43"
    }],
    "isSuccess": 1
  }
})


Mock.mock('/moni/statistic/teacherAnalysis/getOnClassStudentsStatusForTeacher', 'post', () => {
  return {
    "data": {
      "concentrateRate": Random.float(0, 0, 5, 10),
      "participateRate": Random.float(0, 0, 5, 10),
      "doubtRate": Random.float(0, 0, 5, 10),
      "activityRate": Random.float(0, 0, 5, 10)
    }
  }
})


// 教室
Mock.mock('/moni/statistic/lessonInfo/getStudentAttendRateForIndex', 'post', () => {
  return {
    "avgPoint": 0.97,
    "data": [{
      "classesName": "土木工程管理学院",
      "attendRate": 0.94585000
    }, {
      "classesName": "计算机学院",
      "attendRate": 0.92585000
    }, {
      "classesName": "信息工程学院",
      "attendRate": 0.90585000
    }, {
      "classesName": "行政管理学院",
      "attendRate": 0.89585000
    }]
  }
})


// 教室
Mock.mock('/moni/base/classroom/classroomsCount', 'post', () => {
  return {
    "controlClassroomTotal": 120,
    "anslysisClassroomTotal": 150,
    "analysisClassroomPercent": 0.55,
    "controlClassroomPercent": 0.45
  }
})


// 教学行为
Mock.mock('/moni/statistic/lessonInfo/getTeacherActAnalysisForIndex', 'post', () => {
  return {
    "data": {
      "teacherEvent2": Random.float(20, 90, 5, 10), //提问
      "teacherEvent3": Random.float(20, 90, 5, 10), //板书
      "studentEvent2": Random.float(20, 90, 5, 10), //讨论
      "teacherEvent1": Random.float(20, 90, 5, 10), //讲授
      "teacherEvent6": Random.float(20, 90, 5, 10), //个别指导
      "studentEvent4": Random.float(20, 90, 5, 10), //听讲或思考
      "teacherEvent7": Random.float(20, 90, 5, 10), //媒体使用
      "studentEvent3": Random.float(20, 90, 5, 10), //讲读演
      "teacherEvent4": Random.float(20, 90, 5, 10), //演示或展示
      "studentEvent6": Random.float(20, 90, 5, 10), //笔记
      "studentEvent5": Random.float(20, 90, 5, 10), //阅读
      "studentEvent7": Random.float(20, 90, 5, 10), //媒体使用
      "studentLanguageRate": 0.0,
      "studentEventRate": 19.3125,
      "teacherEventRate": 80.6875,
      "teacherLanguageRate": 65.0625,
      "studentActionRate": 33.642857142857146,
      "teacherActionRate": 34.9375
    }
  }
})


// 教学行为
Mock.mock('/moni/statistic/lessonInfo/getMultimediaRateForIndex', 'post', () => {
  return {
    "avgMultimediaRate": 90,
    "data": [{
      "collegeName": "土木工程管理学院",
      "multimediaRate": 97
    }, {
      "collegeName": "计算机学院",
      "multimediaRate": 95
    }, {
      "collegeName": "信息工程学院",
      "multimediaRate": 93
    }, {
      "collegeName": "行政管理学院",
      "multimediaRate": 89
    }]
  }
})


// 教学学风指数 以及下面的排行榜
Mock.mock('/moni/base/classroom/getTeachingStyleIndex', 'post', (options) => {
  var orderType = JSON.parse(options.body).orderType;
  if (orderType == "1") {
    return {
      "avgPoint": 95, //教学学风指数
      // 学院排名
      "data": [{
        "collegeName": "计算机学院",
        "avgIllegalBehaviorRate": 26.0,
        "avgAttendanceRate": 97.55, //出勤率
        "avgTeachingQuality": 72.0, //
      }, {
        "collegeName": '土木工程管理学院',
        "avgIllegalBehaviorRate": 2.616438,
        "avgAttendanceRate": 96.876712,
        "avgTeachingQuality": 50.082192,
      }, {
        "collegeName": "行政管理学院",
        "avgIllegalBehaviorRate": 26.272727,
        "avgAttendanceRate": 83.40,
        "avgTeachingQuality": 31.363636,
      }, {
        "collegeName": '信息工程学院',
        "avgIllegalBehaviorRate": 11.666667,
        "avgAttendanceRate": 81.666667,
        "avgTeachingQuality": 20.666667,
      }]
    }
  } else if (orderType == "2") {
    return {
      "avgPoint": 95, //教学学风指数
      // 学院排名
      "data": [{
        "collegeName": "计算机学院",
        "avgIllegalBehaviorRate": 26.0,
        "avgAttendanceRate": 97.55, //出勤率
        "avgTeachingQuality": 72.0, //
      }, {
        "collegeName": '土木工程管理学院',
        "avgIllegalBehaviorRate": 2.616438,
        "avgAttendanceRate": 96.876712,
        "avgTeachingQuality": 50.082192,
      }, {
        "collegeName": "行政管理学院",
        "avgIllegalBehaviorRate": 26.272727,
        "avgAttendanceRate": 83.40,
        "avgTeachingQuality": 31.363636,
      }, {
        "collegeName": '信息工程学院',
        "avgIllegalBehaviorRate": 11.666667,
        "avgAttendanceRate": 81.666667,
        "avgTeachingQuality": 20.666667,
      }]
    }
  } else if (orderType == "3") {

    return {
      "data": [{
        "collegeName": "计算机学院",
        "isHaveSensitiveWordTotal": 6,
        "total": 22
      }, {
        "collegeName": "行政管理学院",
        "isHaveSensitiveWordTotal": 5.5,
        "total": 3
      }, {
        "collegeName": "信息工程学院",
        "isHaveSensitiveWordTotal": 5,
        "total": 73
      }, {
        "collegeName": "土木工程管理学院",
        "isHaveSensitiveWordTotal": 3,
        "total": 1
      }],
      "upIsHaveSensitiveWordPercent": 98
    }
  } else if (orderType == "4") {
    return {
      "avgPoint": 90,
      "data": [{
        "collegeName": "信息工程学院",
        "avgIllegalBehaviorRate": 26.272727,
        "avgAttendanceRate": 13.409091,
        "avgTeachingQuality": 31.363636
      }, {
        "collegeName": "行政管理学院",
        "avgIllegalBehaviorRate": 26.0,
        "avgAttendanceRate": 0.0,
        "avgTeachingQuality": 72.0
      }, {
        "collegeName": "计算机学院",
        "avgIllegalBehaviorRate": 11.666667,
        "avgAttendanceRate": 6.666667,
        "avgTeachingQuality": 20.666667
      }, {
        "collegeName": "土木工程管理学院",
        "avgIllegalBehaviorRate": 2.616438,
        "avgAttendanceRate": 7.876712,
        "avgTeachingQuality": 4.082192
      }]
    }
  } else {
    return {
      "data": [{
        "collegeName": "信息工程学院",
        "total": 3,
        "teacherIsIllegalTotal": 8
      }, {
        "collegeName": "行政管理学院",
        "total": 22,
        "teacherIsIllegalTotal": 5.6
      }, {
        "collegeName": "计算机学院",
        "total": 1,
        "teacherIsIllegalTotal": 5
      }, {
        "collegeName": "土木工程管理学院",
        "total": 73,
        "teacherIsIllegalTotal": 3
      }],
      "upTeacherIsIllegalTotalPercent": 97
    }
  }
})

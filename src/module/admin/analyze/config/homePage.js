export const getWeek = function (date) {
  let num = new Date(date).getDay()
  switch (num) {
    case 0: return '星期日'
    case 1: return '星期一'
    case 2: return '星期二'
    case 3: return '星期三'
    case 4: return '星期四'
    case 5: return '星期五'
    case 6: return '星期六'
  }
}
export const classes = {Select: 'Select', show: 'show-noborder', arrow: 'arrow-white', list: 'list', listinfo: 'listinfo'}

export const btnList = [
  {name: '出勤率', type: 'record', icon: 'icon-record', value: '2'},
  {name: '敏感词', type: 'sensitiveWord', icon: 'icon-sensitiveWord', value: '3'},
  {name: '学生违规', type: 'student', icon: 'icon-student', value: '4'},
  {name: '老师违规', type: 'teacher', icon: 'icon-teacher', value: '5'}
]
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/legend')
require('echarts/lib/component/title')
export const paletteHalf = [
  [new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#ff625b'}, {offset: 1, color: '#fc635b'}]), '#1d235f', '#ff625b'],
  [new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#3a47f6'}, {offset: 1, color: '#0eb2fa'}]), '#1d235f', '#3a47f6'],
  [new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#1aac6e'}, {offset: 1, color: '#78b766'}]), '#1d235f', '#1aac6e']
]
export const paletteRoom = [
  [new echarts.graphic.LinearGradient(1, 0, 0, 1, [{offset: 0, color: '#afbe61'}, {offset: 1, color: '#fe585c'}]), '#1d235f', '#ff625b', '#09a96d'],
  [new echarts.graphic.LinearGradient(1, 0, 0, 1, [{offset: 0, color: '#f79d61'}, {offset: 1, color: '#fc615c'}]), '#1d235f', '#3a47f6', '#fc615c']
]
export const seatRateCreate = function () {
  let option = {
    animation: false,
    title: {
      text: '空闲教室自习率',
      x: '170px',
      y: '60px',
      textStyle: {
        fontWeight: 'normal',
        color: '#fff'
      }
    },
    legend: {
      icon: 'circle',
      orient: 'vertical',
      x: '170px',
      y: '100px',
      selectedMode: false,
      textStyle: {color: '#fff'}
    },
    series: [
      {
        type: 'pie',
        radius: '58%',
        silent: true,
        startAngle: 155,
        center: ['26%', '50%'],
        hoverOffset: 0,
        label: {
          position: 'inner',
          formatter: '{c}%',
          fontSize: '18',
          fontWeight: 'bold'
        },
        data: [
          {name: '高于50%', value: this.seatFreeRateH, label: {color: '#0a545e'}},
          {name: '20%~50%', value: this.seatFreeRateM, label: {color: '#682b1f'}},
          {name: '小于20%', value: this.seatFreeRateL, label: {color: '#441241'}}
        ]
      }
    ],
    color: ['#00dfff', '#fa7860', '#b651af']
  }
  echarts.init(document.getElementById('seatRate')).setOption(option)
}

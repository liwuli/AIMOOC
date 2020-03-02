<template>
  <div :id="id" class="main" :style="size">
  </div>
</template>

<script>
  import Echarts from 'echarts'
  export default {
    name: 'single-graph',
    props: ['id', 'graphValue', 'graphText', 'size', 'titleTxt'],
    data () {
      return {
        lineChart: null
      }
    },
    methods: {
      setEcharts () {
        this.lineChart = Echarts.init(document.getElementById(this.id))
        this.lineChart.setOption({
          title: {
            show: false
          },
          legend: {
            type: 'plain',
            top: 0,
            right: 160,
            show: true,
            data: this.titleTxt
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'line', // 默认为直线，可选为：'line' | 'shadow'
              lineStyle: {
                color: '#606060'
              }
            },
            // triggerOn: 'click',
            formatter: function (params) {
              let desc = params[0].axisValue
              let name = []
              let data = []
              for (let i = 0; i < params.length; i++) {
                name.push(params[i].seriesName)
                data.push(Math.round(params[i].data * 100) / 100)
              }
              return desc + '<br />' + name[0] + ':  ' + data[0] + '%'
            },
            backgroundColor: 'rgba(0,0,0,0.7)', // 背景
            padding: [20, 40, 15, 16] // 内边距
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              formatter: function (params) {
                return params
              }
            },
            axisTick: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
            data: this.graphText
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#000',
              formatter: function (params) {
                return parseInt(params) + '%'
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#000'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#96cafc',
                type: 'dashed'
              }
            }
          },
          series: [{
            name: this.titleTxt,
            type: 'line',
            symbolSize: 1, // 标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10[ default: 4 ]
            symbol: 'circle', // 标记的图形。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            smooth: true, // 是否平滑曲线显示
            showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
            areaStyle: {
              normal: {
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#362e2b'
                }, {
                  offset: 1,
                  color: '#d8ceca'
                }], false),
                shadowBlur: 0,
                opacity: 0.5
              }
            },
            itemStyle: {
              normal: {
                color: '#000',
                lineStyle: {
                  width: 1,
                  type: 'solid' // 'dotted'虚线 'solid'实线
                },
                borderColor: '#000', // 图形的描边颜色。支持的格式同 color
                borderWidth: 0, // 描边线宽。为 0 时无描边。[ default: 0 ]
                barBorderRadius: 0,
                label: {
                  show: false
                },
                opacity: 0.5
              }
            },
            data: this.graphValue
          }],
          grid: {
            top: 10,
            bottom: 30
          }
        })
      }
    },
    mounted () {
      this.setEcharts()
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
  }
</style>

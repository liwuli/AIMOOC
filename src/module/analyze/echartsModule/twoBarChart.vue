<template>
  <div :id="id" :style="size"></div>
</template>

<script>
  export default {
    name: 'two-bar-chart',
    props: ['id', 'xAxisLegend', 'size', 'data1', 'data2', 'name1', 'name2'],
    methods: {
      setEcharts: function () {

        // 基于准备好的dom，初始化echarts实例
        let data1 = this.data1.join(',').replace('undefined', '').split(',')
        let data2 = this.data2.join(',').replace('undefined', '').split(',')
        this.behaviorContrast = this.$echarts.init(document.getElementById(this.id))
        // 绘制图表
        
        this.behaviorContrast.setOption({
          tooltip: { // 提示框组件
            trigger: 'axis',
            formatter: '{b}<br />{a0}: {c0}%<br />{a1}: {c1}%',
            axisPointer: {
              type: 'shadow',
              label: {
                backgroundColor: '#6a7985'
              }
            },
            textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          grid: {
            left: '3%',
            right: 120,
            bottom: '6%',
            top: 50,
            padding: '0 0 10 0',
            containLabel: true
          },
          legend: { // 图例组件，颜色和名字
            orient: 'vertical',
            right: 10,
            top: 80,
            itemGap: 16,
            itemWidth: 18,
            itemHeight: 10,
            data: [{name: (this.name1 == this.name2 ? this.name1+'(1)': this.name1)}, {name: (this.name1 == this.name2 ? this.name2+'(2)': this.name2)}],
            textStyle: {
              color: '#000',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            }
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true, // 坐标轴两边留白
              data: this.xAxisLegend,
              axisLabel: { // 坐标轴刻度标签的相关设置。
                interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                textStyle: {
                  color: '#000',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12
                }
              },
              axisTick: {// 坐标轴刻度相关设置。
                show: false
              },
              axisLine: {// 坐标轴轴线相关设置
                lineStyle: {
                  color: '#000'
                }
              },
              splitLine: { // 坐标轴在 grid 区域中的分隔线。
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitNumber: 5,
              axisLabel: {
                textStyle: {
                  color: '#000',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12
                },
                formatter: function (params) {
                  return parseInt(params) + '%'
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#000'
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: ['#000'],
                  opacity: 0.06
                }
              }
            }
          ],
          series: [
            {
              name: this.name1 == this.name2 ? this.name1+'(1)': this.name1,
              type: 'bar',
              data: data1,
              barWidth: 15,
              barGap: 1, // 柱间距离
              label: { // 图形上的文本标签
                normal: {
                  formatter: function (params) {
                    return parseInt(params.data) + '%'
                  },
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#000',
                    fontSize: 12
                  }
                }
              },
              itemStyle: {// 图形样式
                normal: {
                  barBorderRadius: [7, 7, 0, 0],
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 1, color: '#1de0dd'
                  }, {
                    offset: 0, color: '#3099fb'
                  }], false)
                }
              }
            },
            {
              name: this.name1 == this.name2 ? this.name2+'(2)': this.name2,
              type: 'bar',
              data: data2,
              barWidth: 15,
              barGap: 1, // 柱间距离
              label: { // 图形上的文本标签
                normal: {
                  formatter: function (params) {
                    return parseInt(params.data) + '%'
                  },
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#000',
                    fontSize: 12
                  }
                }
              },
              itemStyle: { // 图形样式
                normal: {
                  barBorderRadius: [7, 7, 0, 0],
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 1, color: '#e9578e'
                  }, {
                    offset: 0, color: '#6449df'
                  }], false)
                }
              }
            }
          ]
        })
      }
    },
    mounted () {
      this.setEcharts()
    }
  }
</script>

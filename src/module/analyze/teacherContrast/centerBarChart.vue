<template>
  <div :id="id" class="barChart"></div>
</template>

<script>
  export default {
    name: 'center-bar-chart',
    props: ['id', 'xAxisLegend', 'name1', 'name2', 'data1', 'data2'],
    data () {
      return {

      }
    },

    methods: {
      setEcharts: function () {
        // 基于准备好的dom，初始化echarts实例
        this.behaviorContrast = this.$echarts.init(document.getElementById(this.id))
        // 绘制图表
        this.behaviorContrast.setOption({
          tooltip: { // 提示框组件
            trigger: 'axis',
            formatter: '{b}<br />{a0} : {c0}%<br />{a1}: {c1}%',
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
            right: '20%',
            bottom: '6%',
            top: 50,
            padding: '0 0 10 0',
            containLabel: true
          },
          legend: {// 图例组件，颜色和名字
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
              data: this.data1,
              barWidth: 15,
              barGap: 1, // 柱间距离
              label: {// 图形上的文本标签
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
                  barBorderRadius: [7, 7, 7, 7],
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
              data: this.data2,
              barWidth: 15,
              barGap: 1, // 柱间距离
              label: {// 图形上的文本标签
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
                  barBorderRadius: [7, 7, 7, 7],
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

<style scoped lang="scss">
  @import "../../../styles/common/reset";
  .barChart {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
</style>

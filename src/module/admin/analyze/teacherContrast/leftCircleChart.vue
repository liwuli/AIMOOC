<template>
  <div :id="id" class="chart"></div>
</template>

<script>
  import Echarts from 'echarts'
  export default {
    name: 'circle-chart',
    props: ['id', 'data', 'circleColor'],
    data () {
      return {}
    },
    methods: {
      initCircleChart () {
        const elem = document.getElementById(this.id)
        const echartsLeft = Echarts.init(elem)
        const options = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}\n\n{d}%'
          },
          series: [
            {
              name: '学生行为',
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              color: this.circleColor,
              data: this.data,							
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        echartsLeft.setOption(options)
      }
    },
    mounted () {
      this.initCircleChart()
    }
  }
</script>

<style lang="scss" scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>

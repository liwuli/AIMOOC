<template>
  <div :id="id" class="chart"></div>
</template>

<script>
  export default {
    name: 'circle-chart',
    props: ['id', 'data', 'circleColor'],
    data () {
      return {}
    },
    methods: {
      initCircleChart () {
        const elem = document.getElementById(this.id)
        const echartsLeft = this.$echarts.init(elem)
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
							labelLine: {
							  length: 30,
							  length2: 50
							},
							label: {
							  formatter: ['{a|{d}%}\n\n{a|{b}}'].join('\n'),
							  padding: [0, -85],
							  rich: {
							    a: {
							      align: 'middle',
							      width: 120
							    }
							  }
							},
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

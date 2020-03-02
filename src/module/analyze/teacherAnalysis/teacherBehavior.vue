<template>
  <div id="teacherBehavior" class="teacherBehavior"></div>
</template>

<script>
  export default {
    name: 'circle-chart',
    props: ['data'],
    data () {
      return {}
    },
    methods: {
      initCircleChart () {
        const elem = document.getElementById('teacherBehavior')
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
              color: ['#ec6969', '#d34c2d', '#f98324', '#d0569e', '#b755c6', '#dc4611', 'f9bb4f'],
							// labelLine: {
							//   length: 30,
							//   length2: 50
							// },
							label: {
							  formatter: ['{b}\n\n{d}%'].join('\n'),
							  // padding: [0, -85],
							  // rich: {
							  //   a: {
							  //     align: 'middle',
							  //     width: 160
							  //   }
							  // }
							},
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
  .teacherBehavior {
    width: 100%;
    height: 100%;
  }
</style>

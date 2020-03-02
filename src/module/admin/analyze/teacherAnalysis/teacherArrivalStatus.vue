<template>
  <div id="circleChart" class="teacher-arrival-stauts">

  </div>
</template>

<script>
  import Echarts from 'echarts'
  export default {
    name: 'circle-chart',
    props: ['teacherArrivalStatus'],
    watch: {
      teacherArrivalStatus () {
        this.initCircleChart()
      }
    },
    data () {
      return {

      }
    },
    methods: {
      initCircleChart () {
        const elem = document.getElementById('circleChart')
        const chart = Echarts.init(elem)
        const options = {
          title: {
            text: '',
            left: 'left',
            bottom: 0,
            textStyle: {
              color: '#fff',
              fontSize: '18'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{d}%'
          },
          color: [new Echarts.graphic.LinearGradient(0, 0, 0, 1,
            [
              { offset: 0, color: '#3197fc' },
              // { offset: 0.5, color: '#1ddfde' },
              { offset: 1, color: '#1ddfde' }
            ]
          ), '#3b638b'],
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['84px', '110px'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [this.teacherArrivalStatus, 100 - this.teacherArrivalStatus]
            }
          ]
        }
        chart.setOption(options)
      }
    },
    mounted () {
      this.initCircleChart()
    }
  }
</script>

<style lang="scss" scoped>
  .teacher-arrival-stauts {
    width: 100%;
    height: 100%;
  }
</style>

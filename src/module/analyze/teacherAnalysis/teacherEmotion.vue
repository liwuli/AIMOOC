<template>
  <div id="radarChart" class="teacher-emotion">

  </div>
</template>

<script>
  export default {
    name: 'radar-chart',
    props: ['emotionList'],
    data () {
      return {

      }
    },
    methods: {
      initRadarChart () {
        const elem = document.getElementById('radarChart')
        const chart = this.$echarts.init(elem)
        const options = {
          legend: {
            show: false,
            bottom: 0,
            data: ['老师'],
            textStyle: {
              color: '#000',
              fontSize: 14
            },
            selectedMode: 'single'
          },
          radar: {
            nameGap: 5,
            indicator: [
              {name: '不悦', max: 1},
              {name: '不屑', max: 1},
              {name: '愉悦', max: 1},
              {name: '专注', max: 1},
              {name: '自然', max: 1}
            ],
            radius: 100,
            shape: 'circle',
            splitNumber: 4,
            name: {
              textStyle: {
                color: '#000'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#96cbff'
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#5eb0fd'
              }
            }
          },
          series: [
            {
              name: '老师',
              type: 'radar',
              lineStyle: {
                normal: {
                  width: 2,
                  opacity: 0.8
                }
              },
              data: [{
                value: this.emotionList
              }],
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#5eb0fd'
                }
              },
              areaStyle: {
                normal: {
                  opacity: 0.8
                }
              }
            }
          ]
        }
        chart.setOption(options)
      }
    },
    mounted () {
      this.initRadarChart()
    },
    watch: {
      emotionList: 'initRadarChart'
    }
  }
</script>

<style lang="scss" scoped>
  .teacher-emotion {
    width: 100%;
    height: 100%;
  }
</style>

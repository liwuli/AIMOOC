<template>
    <div :id="id" :size="size" class="main"></div>
</template>

<script>
  var echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/radar')
  export default {
    name: 'radar01',
    props: ['id', 'valueList', 'indicator', 'size'],
    methods: {
      setEcharts () {
        let option = {
          radar: [
            {
              indicator: this.indicator,
              center: ['50%', '50%'],
              radius: '60%',
              startAngle: 90,
              splitNumber: 4,
              shape: 'circle',
              name: {
                formatter: '{value}',
                textStyle: {
                  fontWeight: 700,
                  color: '#000'
                }
              },
              splitArea: {
                areaStyle: {
                  color: '#fff'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#62aefc'
                }
              },
              splitLine: {
                lineStyle: {
                  color: ['#d6e8fe', '#74b9fe', '#96cbff', '#d7ecff']
                }
              }
            }
          ],
          series: [
            {
              name: '雷达图',
              type: 'radar',
              itemStyle: {
                emphasis: false
              },
              data: [
                {
                  symbolSize: 0,
                  value: this.valueList,
                  lineStyle: {
                    normal: {
                      width: 0
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: '#5aadfd'
                    }
                  }
                }
              ]
            }
          ]
        }
        echarts.init(document.getElementById(this.id)).setOption(option)
      }
    },
    mounted () {
      this.setEcharts()
    }
  }
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100%;
  }
</style>

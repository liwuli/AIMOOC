<template>
  <div :id="id" :style="size"></div>
</template>

<script>
  var echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/pie')
  export default {
    name: 'pieOutChart',
    props: ['id', 'pieData', 'size'],
    methods: {
      setEcharts () {
        let option = {
          series: [
            {
              type: 'pie',
              radius: '75%',
              startAngle: 155,
              center: ['50%', '60%'],
              labelLine: {
                length: 5,
                length2: 90
              },
              label: {
                normal: {
                  formatter: '{c}\n\n{b}',
                  borderWidth: 20,
                  borderRadius: 4,
                  padding: [0, -85]
                }
              },
              data: this.pieData
            }
          ],
          color: ['#00dfff', '#fa7860', '#b651af']
        }
        echarts.init(document.getElementById(this.id)).setOption(option)
      }
    },
    mounted () {
      this.setEcharts()
    },
    watch: {
      pieData: 'setEcharts'
    }
  }
</script>

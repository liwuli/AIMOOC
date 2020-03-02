<template>
  <div :id="id" :style="size" class="canvas"></div>
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
              radius: '70%',
              startAngle: 155,
              center: ['50%', '55%'],
              labelLine: {
                length: 5,
                length2: 90
              },
              label: {
// 								 normal: {
//                     show: true,
//                     formatter: '{a}{b}:\n\n {c}({d}%)' //自定义显示格式(b:name, c:value, d:百分比)
//                 },
// 
                formatter: ['{a|{d}%}\n\n{a|{b}}'].join('\n'),
                padding: [0, -85],
                rich: {
                  a: {
                    align: 'middle',
                    width: 90
                  }
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

<style scoped>
  .canvas{
    margin: 0 auto;
  }
</style>
